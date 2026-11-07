import * as THREE from 'three';
import { clamp } from '../utils/math.js';

export class PlayerShip {
  constructor(camera, spaceEnv) {
    this.camera = camera;
    this.spaceEnv = spaceEnv;

    // Transform & Physics
    this.position = new THREE.Vector3(0, 0, 100);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.quaternion = new THREE.Quaternion();

    // Flight parameters
    this.maxSpeed = 90.0; // units per second
    this.forwardAccel = 45.0; // units per second squared
    this.decelRate = (this.maxSpeed / 2.0) * 3.0; // 3x effective deceleration (stops in ~0.67s instead of 2.0s)
    this.strafeAccel = 40.0;
    this.maxStrafeSpeed = 35.0;

    // Double-tap Thrust Boost (instant dodge surge forward every 2.0s, 300% stronger)
    this.boostCooldown = 2.0; // seconds
    this.boostCooldownTimer = 0.0;
    this.lastThrustTapTime = 0.0;
    this.boostImpulse = 180.0; // 300% stronger forward surge impulse

    // Rotation speeds (radians per second)
    this.pitchSpeed = 1.6;
    this.yawSpeed = 1.6;
    this.rollSpeed = 2.0;

    // Health, Shield & Tactical Powerups
    this.maxHp = 100;
    this.hp = 100;
    this.maxShield = 100;
    this.shield = 100;
    this.isShieldBroken = false; // Once fully depleted, shields do NOT recharge without powerup
    this.shieldRechargeDelay = 2.0;
    this.shieldRechargeTimer = 0;
    this.shieldRechargeRate = 100 / 15.0; // 15 seconds full recharge
    this.mass = 1200; // Ship inertial mass in kg

    // Powerup Active States
    this.isInvisible = false;
    this.invisibilityTimer = 0.0;
    this.hasHologramDecoy = false;

    this.isDead = false;
    this.respawnTimer = 0;
    this.invulnerableTimer = 2.5; // seconds of shield protection on spawn
    this.score = 0;
    this.kills = 0;
    this.deaths = 0;

    // Input state flags (fed by keyboard, mouse, or touch D-pad)
    this.input = {
      thrust: false,
      brake: false,
      strafeLeft: false,
      strafeRight: false,
      pitchUp: false,
      pitchDown: false,
      yawLeft: false,
      yawRight: false,
      rollLeft: false,
      rollRight: false,
      // Continuous analog overrides for mouse/virtual sticks (-1 to +1)
      analogPitch: 0,
      analogYaw: 0,
      analogRoll: 0
    };

    // Camera initial orientation
    this.camera.position.copy(this.position);
    this.camera.quaternion.copy(this.quaternion);
  }

  resetSpawn() {
    // Clear initial spawn coordinate facing directly forward down -Z into asteroid field
    this.position.set(0, 0, 180);
    this.velocity.set(0, 0, 0);
    this.quaternion.set(0, 0, 0, 1); // Looking straight down -Z

    this.hp = this.maxHp;
    this.shield = this.maxShield;
    this.isShieldBroken = false;
    this.shieldRechargeTimer = 0;
    this.boostCooldownTimer = 0;
    this.lastThrustTapTime = 0;
    this.isInvisible = false;
    this.invisibilityTimer = 0;
    this.hasHologramDecoy = false;
    this.isDead = false;
    this.respawnTimer = 0;
    this.invulnerableTimer = 2.5;

    this.camera.position.copy(this.position);
    this.camera.quaternion.copy(this.quaternion);
  }

  takeDamage(amount, weaponType = 'generic', bypassInvuln = false) {
    if (typeof weaponType === 'boolean') {
      bypassInvuln = weaponType;
      weaponType = 'generic';
    }

    if (this.isDead) return false;
    if (!bypassInvuln && this.invulnerableTimer > 0) return false;

    // Reset shield recharge cooldown timer
    this.shieldRechargeTimer = this.shieldRechargeDelay;

    // 1. Calculate weapon effectiveness against Shield vs Hull
    // Laser is devastating to energy shields (2.4x) but weak vs metallic hull (0.35x)
    // Cannon is weak vs energy shields (0.35x) but tears apart unshielded hull (2.2x)
    let shieldDmg = amount;
    let hullDmg = amount;

    if (weaponType === 'laser') {
      shieldDmg = amount * 2.4;
      hullDmg = amount * 0.35;
    } else if (weaponType === 'cannon') {
      shieldDmg = amount * 0.35;
      hullDmg = amount * 2.2;
    }

    // 2. Shield absorbs impact first (if active and not broken)
    if (this.shield > 0) {
      const absorbed = Math.min(this.shield, shieldDmg);
      this.shield -= absorbed;

      // Check if shield was FULLY destroyed
      if (this.shield <= 0) {
        this.shield = 0;
        this.isShieldBroken = true; // Permanently broken until Shield Repair powerup is collected!
      }

      // Remaining unabsorbed damage penetrates into hull
      const remainderRatio = 1.0 - (absorbed / (shieldDmg || 1.0));
      if (remainderRatio > 0.01) {
        this.hp = Math.max(0, this.hp - (hullDmg * remainderRatio));
      }
    } else {
      // Direct hull hit (shields depleted or broken)
      this.hp = Math.max(0, this.hp - hullDmg);
    }

    if (this.hp <= 0) {
      this.isDead = true;
      this.deaths++;
      this.respawnTimer = 3.0; // 3 second death delay
      return true; // lethal
    }
    return false;
  }

  recordKill() {
    this.kills++;
    this.score += 100;
  }

  /**
   * Double-tap thrust detection to activate instant evasive boost
   * @param {number} now Timestamp in ms
   * @returns {boolean} True if boost was successfully triggered
   */
  triggerThrustPress(now = performance.now()) {
    const elapsed = now - this.lastThrustTapTime;
    this.lastThrustTapTime = now;

    // Double tap within 40ms to 380ms window
    if (elapsed >= 40 && elapsed <= 380) {
      if (this.boostCooldownTimer <= 0 && !this.isDead) {
        return this.activateBoost();
      }
    }
    return false;
  }

  breakInvisibility() {
    this.isInvisible = false;
    this.invisibilityTimer = 0;
  }

  activateBoost() {
    this.boostCooldownTimer = this.boostCooldown;
    const fwd = this.getForwardVector();
    this.velocity.addScaledVector(fwd, this.boostImpulse);
    // Allow high velocity surge during 300% boost dodge
    const maxBoostSpeed = this.maxSpeed * 3.0;
    if (this.velocity.length() > maxBoostSpeed) {
      this.velocity.setLength(maxBoostSpeed);
    }
    return true;
  }

  applyImpulse(impulseVector) {
    this.velocity.add(impulseVector);
    const speed = this.velocity.length();
    if (speed > this.maxSpeed * 1.35) {
      this.velocity.setLength(this.maxSpeed * 1.35);
    }
  }

  update(dt) {
    if (this.invulnerableTimer > 0) {
      this.invulnerableTimer = Math.max(0, this.invulnerableTimer - dt);
    }

    if (this.boostCooldownTimer > 0) {
      this.boostCooldownTimer = Math.max(0, this.boostCooldownTimer - dt);
    }

    if (this.invisibilityTimer > 0) {
      this.invisibilityTimer = Math.max(0, this.invisibilityTimer - dt);
      if (this.invisibilityTimer <= 0) {
        this.isInvisible = false;
      }
    }

    if (this.isDead) {
      this.respawnTimer -= dt;
      if (this.respawnTimer <= 0) {
        this.resetSpawn();
      }
      return;
    }

    // Dynamic shield recharge: recharges to 100% over 15s ONLY IF NOT FULLY DESTROYED
    // If shield hits 0 (isShieldBroken), it NEVER recharges unless replenished by a power-up!
    if (!this.isShieldBroken && this.shield < this.maxShield) {
      if (this.shieldRechargeTimer > 0) {
        this.shieldRechargeTimer -= dt;
      } else {
        this.shield = Math.min(this.maxShield, this.shield + this.shieldRechargeRate * dt);
      }
    }

    // Safety checks against NaN corruption
    if (isNaN(this.position.x) || isNaN(this.position.y) || isNaN(this.position.z)) {
      this.position.set(0, 0, 180);
      this.velocity.set(0, 0, 0);
    }
    if (isNaN(this.velocity.x) || isNaN(this.velocity.y) || isNaN(this.velocity.z)) {
      this.velocity.set(0, 0, 0);
    }
    if (isNaN(this.quaternion.x) || isNaN(this.quaternion.w)) {
      this.quaternion.set(0, 0, 0, 1);
    }

    this.handleRotation(dt);
    this.handleThrustAndMovement(dt);
    this.handleAsteroidCollisions();

    // Sync camera
    this.camera.position.copy(this.position);
    this.camera.quaternion.copy(this.quaternion);
  }

  handleRotation(dt) {
    // 1. Calculate pitch rate (local X axis)
    let pitchInput = 0;
    if (this.input.pitchUp) pitchInput += 1;
    if (this.input.pitchDown) pitchInput -= 1;
    pitchInput += this.input.analogPitch;
    pitchInput = clamp(pitchInput, -1, 1);

    // 2. Calculate yaw rate (local Y axis)
    let yawInput = 0;
    if (this.input.yawLeft) yawInput += 1;
    if (this.input.yawRight) yawInput -= 1;
    yawInput += this.input.analogYaw;
    yawInput = clamp(yawInput, -1, 1);

    // 3. Calculate roll rate (local Z axis)
    let rollInput = 0;
    if (this.input.rollLeft) rollInput += 1;
    if (this.input.rollRight) rollInput -= 1;
    rollInput += this.input.analogRoll;
    rollInput = clamp(rollInput, -1.0, 1.0);

    // Local rotation axes
    const pitchAxis = new THREE.Vector3(1, 0, 0);
    const yawAxis = new THREE.Vector3(0, 1, 0);
    const rollAxis = new THREE.Vector3(0, 0, 1);

    // Apply pitch
    if (pitchInput !== 0) {
      const qPitch = new THREE.Quaternion().setFromAxisAngle(pitchAxis, pitchInput * this.pitchSpeed * dt);
      this.quaternion.multiply(qPitch);
    }

    // Apply yaw
    if (yawInput !== 0) {
      const qYaw = new THREE.Quaternion().setFromAxisAngle(yawAxis, yawInput * this.yawSpeed * dt);
      this.quaternion.multiply(qYaw);
    }

    // Apply roll
    if (rollInput !== 0) {
      const qRoll = new THREE.Quaternion().setFromAxisAngle(rollAxis, rollInput * this.rollSpeed * dt);
      this.quaternion.multiply(qRoll);
    }

    this.quaternion.normalize();
  }

  handleThrustAndMovement(dt) {
    // Direction vectors from current orientation
    // Three.js camera looks down -Z in local space
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.quaternion).normalize();
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.quaternion).normalize();

    // 1. Forward Thrust
    if (this.input.thrust) {
      this.velocity.addScaledVector(forward, this.forwardAccel * dt);
      if (this.velocity.length() > this.maxSpeed) {
        this.velocity.setLength(this.maxSpeed);
      }
    }

    // 2. Slow down / Brake
    // "Holding it progressively slows down the ship to halt. Coming to a complete stop from full speed take 2 seconds holding the button."
    if (this.input.brake) {
      const currentSpeed = this.velocity.length();
      if (currentSpeed > 0.001) {
        const speedReduction = this.decelRate * dt;
        const newSpeed = Math.max(0, currentSpeed - speedReduction);
        if (newSpeed === 0) {
          this.velocity.set(0, 0, 0);
        } else {
          this.velocity.setLength(newSpeed);
        }
      } else {
        this.velocity.set(0, 0, 0);
      }
    }

    // 3. Strafing (Side Thrusters)
    let strafeDir = 0;
    if (this.input.strafeLeft) strafeDir -= 1;
    if (this.input.strafeRight) strafeDir += 1;

    if (strafeDir !== 0) {
      this.velocity.addScaledVector(right, strafeDir * this.strafeAccel * dt);
      // Clamp lateral velocity
      const totalSpeed = this.velocity.length();
      if (totalSpeed > this.maxSpeed) {
        this.velocity.setLength(this.maxSpeed);
      }
    }

    // 4. Update Position
    this.position.addScaledVector(this.velocity, dt);

    // Keep ship within universe bounds (~1100 units from center)
    const distFromOrigin = this.position.length();
    if (distFromOrigin > 1100) {
      // Elastic soft barrier pushing back inward
      const pull = this.position.clone().normalize().multiplyScalar(-30 * dt);
      this.velocity.add(pull);
    }
  }

  handleAsteroidCollisions() {
    const shipRadius = 2.8;

    // Use full Newtonian momentum resolution if supported by space environment
    if (this.spaceEnv && typeof this.spaceEnv.resolveShipCollision === 'function') {
      const collisionResult = this.spaceEnv.resolveShipCollision(this.position, this.velocity, shipRadius, this.mass);
      if (collisionResult) {
        this.takeDamage(collisionResult.impactDamage);
        return collisionResult;
      }
    } else if (this.spaceEnv && typeof this.spaceEnv.checkCollision === 'function') {
      const hitAsteroid = this.spaceEnv.checkCollision(this.position, shipRadius);
      if (hitAsteroid) {
        const normal = this.position.clone().sub(hitAsteroid.position);
        if (normal.lengthSq() < 0.001) normal.set(0, 1, 0);
        else normal.normalize();

        this.position.copy(hitAsteroid.position).addScaledVector(normal, hitAsteroid.radius + shipRadius + 0.4);
        const dot = this.velocity.dot(normal);
        if (dot < 0) {
          this.velocity.subScaledVector(normal, 1.8 * dot);
        }
        this.takeDamage(15);
      }
    }
  }

  getForwardVector() {
    return new THREE.Vector3(0, 0, -1).applyQuaternion(this.quaternion).normalize();
  }

  getRightVector() {
    return new THREE.Vector3(1, 0, 0).applyQuaternion(this.quaternion).normalize();
  }

  getSpeed() {
    return this.velocity.length();
  }
}
