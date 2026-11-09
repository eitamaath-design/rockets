import * as THREE from 'three';
import { clamp } from '../utils/math.js';

export class PlayerShip {
  constructor(camera, spaceEnv) {
    this.camera = camera;
    this.spaceEnv = spaceEnv;

    // Transform & Physics
    this.position = new THREE.Vector3(0, 80, 3200);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.quaternion = new THREE.Quaternion();
    this.desiredQuaternion = new THREE.Quaternion();
    this.radius = 2.8; // Standard fighter collision/bounding radius
    // Upgradeable ship capability ceiling (rotational rate limit in rad/s)
    this.capabilities = {
      maxTurnRate: 0.75
    };

    // Flight parameters
    this.maxSpeed = 140.0; // units per second
    this.forwardAccel = 45.0; // units per second squared
    this.decelRate = (this.maxSpeed / 2.0) * 3.0; // 3x effective deceleration (stops in ~0.67s instead of 2.0s)
    this.strafeAccel = 40.0;
    this.maxStrafeSpeed = 35.0;

    // Charged Double-Tap Warp Drive (charge up to 3.0s, hold until released, proportional displacement)
    this.warpCooldown = 2.0; // seconds
    this.warpCooldownTimer = 0.0;
    this.isWarpCharging = false;
    this.warpChargeTime = 0.0;
    this.maxWarpCharge = 3.0; // seconds
    this.maxWarpDistance = 750.0; // units at 100% charge
    this.lastThrustTapTime = 0.0;

    // Rotation speeds (radians per second)
    this.pitchSpeed = 3.2;
    this.yawSpeed = 3.2;
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
    this.storedPowerUp = null; // { type, name, icon, color }

    // Fire Laser Upgrade State & Dual-Gate Enemy Engagement Persistence
    this.hasFireLaser = false;
    this.fireLaserTimer = 0.0;
    this.fireLaserBaseDuration = 75.0; // Generous 75s (60s-90s)
    this.engagementsCompleted = 0;
    this.inCombatEngagement = false;
    this.engagementCooldown = 0.0;

    this.isDead = false;
    this.respawnTimer = 0;
    this.invulnerableTimer = 2.5; // seconds of shield protection on spawn
    this.asteroidImpactDebounceTimer = 0.0; // Debounce cooldown preventing multi-frame collision grinds
    this.shipCollisionDebounceTimer = 0.0; // Debounce cooldown for ship-to-ship bumper collisions
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
    this.camera.quaternion.copy(this.desiredQuaternion);
  }

  get maxTurnRate() {
    return this.capabilities.maxTurnRate;
  }

  set maxTurnRate(val) {
    this.capabilities.maxTurnRate = val;
  }

  get boostCooldownTimer() {
    return this.warpCooldownTimer;
  }

  set boostCooldownTimer(val) {
    this.warpCooldownTimer = val;
  }

  get boostCooldown() {
    return this.warpCooldown;
  }

  /**
   * Helper methods returning laser carving dimensions scaled with ship radius
   * so carving volume is just a little bit bigger than ship size regardless of asteroid size,
   * enabling automatic scaling for future larger ships.
   */
  getLaserCarveRadius(isFireLaser = false) {
    const scaleFactor = isFireLaser ? 1.4 : 1.25;
    return this.radius * scaleFactor;
  }

  getLaserCarveDepth(isFireLaser = false) {
    const scaleFactor = isFireLaser ? 1.25 : 1.1;
    return this.radius * scaleFactor;
  }

  /**
   * Instantaneously rotates the Pilot POV (desiredQuaternion & camera) without any
   * ship rotational rate limit, while the physical ship hull (this.quaternion)
   * turns to catch up based on this.capabilities.maxTurnRate.
   */
  applyMouseLook(deltaYaw, deltaPitch) {
    if (this.isDead) return;
    const pitchAxis = new THREE.Vector3(1, 0, 0);
    const yawAxis = new THREE.Vector3(0, 1, 0);
    if (deltaPitch !== 0) {
      const qPitch = new THREE.Quaternion().setFromAxisAngle(pitchAxis, deltaPitch);
      this.desiredQuaternion.multiply(qPitch);
    }
    if (deltaYaw !== 0) {
      const qYaw = new THREE.Quaternion().setFromAxisAngle(yawAxis, deltaYaw);
      this.desiredQuaternion.multiply(qYaw);
    }
    this.desiredQuaternion.normalize();
    if (this.camera) {
      this.camera.quaternion.copy(this.desiredQuaternion);
    }
  }

  activateFireLaser(duration = 75.0) {
    this.hasFireLaser = true;
    this.fireLaserTimer = duration;
    this.engagementsCompleted = 0;
    this.inCombatEngagement = false;
    this.engagementCooldown = 0.0;
  }

  deactivateFireLaser() {
    this.hasFireLaser = false;
    this.fireLaserTimer = 0.0;
    this.inCombatEngagement = false;
    this.engagementCooldown = 0.0;
  }

  recordEngagementHit() {
    this.inCombatEngagement = true;
    this.engagementCooldown = 8.0;
  }

  concludeEngagement() {
    if (this.inCombatEngagement) {
      this.inCombatEngagement = false;
      this.engagementCooldown = 0.0;
      this.engagementsCompleted += 1;
    } else if (this.engagementsCompleted === 0) {
      this.engagementsCompleted = 1;
    }
  }

  resetSpawn() {
    // Clear initial spawn coordinate in orbital safe space facing forward
    this.position.set(0, 80, 3200);
    this.velocity.set(0, 0, 0);
    this.quaternion.set(0, 0, 0, 1); // Looking straight down -Z
    this.desiredQuaternion.set(0, 0, 0, 1);

    this.hp = this.maxHp;
    this.shield = this.maxShield;
    this.isShieldBroken = false;
    this.shieldRechargeTimer = 0;
    this.warpCooldownTimer = 0;
    this.isWarpCharging = false;
    this.warpChargeTime = 0;
    this.lastThrustTapTime = 0;
    this.isInvisible = false;
    this.invisibilityTimer = 0;
    this.hasHologramDecoy = false;
    this.deactivateFireLaser();
    this.engagementsCompleted = 0;
    this.isDead = false;
    this.respawnTimer = 0;
    this.invulnerableTimer = 2.5;
    this.asteroidImpactDebounceTimer = 0.0;
    this.shipCollisionDebounceTimer = 0.0;

    this.camera.position.copy(this.position);
    this.camera.quaternion.copy(this.desiredQuaternion);
  }

  takeDamage(amount, weaponType = 'generic', bypassInvuln = false) {
    if (typeof weaponType === 'boolean') {
      bypassInvuln = weaponType;
      weaponType = 'generic';
    }

    if (this.isDead) return false;
    if (!bypassInvuln && this.invulnerableTimer > 0) return false;

    if (['laser', 'cannon', 'missile'].includes(weaponType)) {
      this.recordEngagementHit();
    }

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
    } else if (weaponType === 'cannon' || weaponType === 'missile') {
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
    this.concludeEngagement();
  }

  /**
   * Double-tap thrust detection to start charging warp drive
   * @param {number} now Timestamp in ms
   * @returns {boolean} True if warp charging was initiated
   */
  triggerThrustPress(now = performance.now()) {
    const elapsed = now - this.lastThrustTapTime;
    this.lastThrustTapTime = now;

    // Double tap within 40ms to 380ms window
    if (elapsed >= 40 && elapsed <= 380) {
      if (this.warpCooldownTimer <= 0 && !this.isDead) {
        this.isWarpCharging = true;
        this.warpChargeTime = 0.0;
        return true;
      }
    }
    return false;
  }

  /**
   * Releases warp charge upon key/button release, executing proportional displacement
   * with collision raycasting against obstacles.
   * @param {SpaceEnvironment} [spaceEnv]
   * @returns {Object|null} Result of warp jump or null if not charging
   */
  releaseWarpCharge(spaceEnv = null) {
    if (!this.isWarpCharging) return null;

    const chargeRatio = Math.min(1.0, this.warpChargeTime / this.maxWarpCharge);
    let result = { success: false, chargeRatio, distance: 0 };

    if (chargeRatio > 0.03 && !this.isDead) {
      const env = spaceEnv || this.spaceEnv;
      const fwd = this.getForwardVector();
      let warpDist = chargeRatio * this.maxWarpDistance;

      // Obstacle collision check along forward raycast to prevent warping inside rock
      if (env && typeof env.checkRayCollision === 'function') {
        const hit = env.checkRayCollision(this.position, fwd, warpDist + this.radius);
        if (hit && hit.hit && typeof hit.distance === 'number') {
          warpDist = Math.max(0, hit.distance - this.radius - 2.0);
        }
      }

      this.position.addScaledVector(fwd, warpDist);

      // Forward velocity pulse proportional to charge
      const warpSpeed = this.maxSpeed * (1.0 + chargeRatio * 1.5);
      this.velocity.copy(fwd).multiplyScalar(warpSpeed);

      this.warpCooldownTimer = this.warpCooldown;
      result = { success: true, chargeRatio, distance: warpDist };
    }

    this.isWarpCharging = false;
    this.warpChargeTime = 0.0;
    return result;
  }

  useSpecialPowerUp(engine) {
    if (!this.storedPowerUp || this.isDead) return null;
    const pu = this.storedPowerUp;
    this.storedPowerUp = null;

    if (pu.type === 'shield_repair') {
      this.shield = this.maxShield;
      this.isShieldBroken = false;
      return { success: true, message: '🛡️ SHIELD REPAIRED: 100%' };
    } else if (pu.type === 'invisibility') {
      this.isInvisible = true;
      this.invisibilityTimer = 60.0;
      return { success: true, message: '👁️ CLOAK ACTIVATED (60s)' };
    } else if (pu.type === 'hologram_clone') {
      if (engine && engine.weaponsSystem) {
        engine.weaponsSystem.deployDecoyClone(this);
      }
      return { success: true, message: '👥 HOLOGRAM CLONE LAUNCHED' };
    }
    return null;
  }

  breakInvisibility() {
    this.isInvisible = false;
    this.invisibilityTimer = 0;
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
    if (this.asteroidImpactDebounceTimer > 0) {
      this.asteroidImpactDebounceTimer = Math.max(0, this.asteroidImpactDebounceTimer - dt);
    }
    if (this.shipCollisionDebounceTimer > 0) {
      this.shipCollisionDebounceTimer = Math.max(0, this.shipCollisionDebounceTimer - dt);
    }

    if (this.warpCooldownTimer > 0) {
      this.warpCooldownTimer = Math.max(0, this.warpCooldownTimer - dt);
    }

    if (this.isWarpCharging) {
      // Charges continuously until the button is released
      this.warpChargeTime = Math.min(this.maxWarpCharge, this.warpChargeTime + dt);
    }

    if (this.invisibilityTimer > 0) {
      this.invisibilityTimer = Math.max(0, this.invisibilityTimer - dt);
      if (this.invisibilityTimer <= 0) {
        this.isInvisible = false;
      }
    }

    // Active combat engagement tracking
    if (this.inCombatEngagement) {
      this.engagementCooldown = Math.max(0, this.engagementCooldown - dt);
      if (this.engagementCooldown <= 0) {
        this.inCombatEngagement = false;
        this.engagementsCompleted += 1;
      }
    }

    // Fire Laser Dual-Gate Persistence:
    // Lasts at least 1 combat engagement against an enemy AND for the duration of the timer.
    // It only expires once BOTH the timer <= 0 AND at least 1 engagement has concluded.
    if (this.hasFireLaser) {
      if (this.fireLaserTimer > 0) {
        this.fireLaserTimer = Math.max(0, this.fireLaserTimer - dt);
      }
      if (this.fireLaserTimer <= 0 && this.engagementsCompleted >= 1) {
        this.deactivateFireLaser();
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
      this.position.set(0, 80, 3200);
      this.velocity.set(0, 0, 0);
    }
    if (isNaN(this.velocity.x) || isNaN(this.velocity.y) || isNaN(this.velocity.z)) {
      this.velocity.set(0, 0, 0);
    }
    if (isNaN(this.quaternion.x) || isNaN(this.quaternion.w)) {
      this.quaternion.set(0, 0, 0, 1);
    }
    if (isNaN(this.desiredQuaternion.x) || isNaN(this.desiredQuaternion.w)) {
      this.desiredQuaternion.copy(this.quaternion);
    }

    this.handleRotation(dt);
    this.handleThrustAndMovement(dt);
    this.handleAsteroidCollisions(dt);

    // Sync camera to Pilot POV (desiredQuaternion)
    this.camera.position.copy(this.position);
    this.camera.quaternion.copy(this.desiredQuaternion);
  }

  handleRotation(dt) {
    // 1. Calculate pitch rate (local X axis)
    let pitchInput = 0;
    if (this.input.pitchUp) pitchInput += 1;
    if (this.input.pitchDown) pitchInput -= 1;
    pitchInput = clamp(pitchInput, -1, 1) + (this.input.analogPitch || 0);

    // 2. Calculate yaw rate (local Y axis)
    let yawInput = 0;
    if (this.input.yawLeft) yawInput += 1;
    if (this.input.yawRight) yawInput -= 1;
    yawInput = clamp(yawInput, -1, 1) + (this.input.analogYaw || 0);

    // 3. Calculate roll rate (local Z axis)
    let rollInput = 0;
    if (this.input.rollLeft) rollInput += 1;
    if (this.input.rollRight) rollInput -= 1;
    rollInput = clamp(rollInput, -1.0, 1.0) + (this.input.analogRoll || 0);

    // Local rotation axes
    const pitchAxis = new THREE.Vector3(1, 0, 0);
    const yawAxis = new THREE.Vector3(0, 1, 0);
    const rollAxis = new THREE.Vector3(0, 0, 1);

    // Pitch & Yaw steer desiredQuaternion (unthrottled Pilot POV)
    if (pitchInput !== 0) {
      const qPitch = new THREE.Quaternion().setFromAxisAngle(pitchAxis, pitchInput * this.pitchSpeed * dt);
      this.desiredQuaternion.multiply(qPitch);
    }

    if (yawInput !== 0) {
      const qYaw = new THREE.Quaternion().setFromAxisAngle(yawAxis, yawInput * this.yawSpeed * dt);
      this.desiredQuaternion.multiply(qYaw);
    }

    // Manual roll inputs directly rotate both quaternion and desiredQuaternion
    // so automated alignment controller does not fight or unwind manual banking
    if (rollInput !== 0) {
      const qRoll = new THREE.Quaternion().setFromAxisAngle(rollAxis, rollInput * this.rollSpeed * dt);
      this.quaternion.multiply(qRoll);
      this.desiredQuaternion.multiply(qRoll);
    }

    // Physical ship hull alignment towards desired target orientation bounded strictly by capability ceiling
    const angle = this.quaternion.angleTo(this.desiredQuaternion);
    if (angle > 0.0001) {
      const step = Math.min(angle, this.capabilities.maxTurnRate * dt);
      this.quaternion.rotateTowards(this.desiredQuaternion, step);
    }

    this.quaternion.normalize();
    this.desiredQuaternion.normalize();
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

    // Keep ship within universe bounds (~6500 units from center)
    const distFromOrigin = this.position.length();
    if (distFromOrigin > 6500) {
      // Elastic soft barrier pushing back inward
      const pull = this.position.clone().normalize().multiplyScalar(-30 * dt);
      this.velocity.add(pull);
    }
  }

  handleAsteroidCollisions(dt = 0.016) {
    const shipRadius = 2.8;

    // Use full Newtonian momentum resolution if supported by space environment
    if (this.spaceEnv && typeof this.spaceEnv.resolveShipCollision === 'function') {
      const collisionResult = this.spaceEnv.resolveShipCollision(this.position, this.velocity, shipRadius, this.mass, this.quaternion, dt);
      if (collisionResult) {
        if (this.asteroidImpactDebounceTimer <= 0) {
          this.takeDamage(collisionResult.impactDamage);
          this.asteroidImpactDebounceTimer = 0.25; // 0.25s impact debounce prevents multi-frame lethal grinds
        }
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
        if (this.asteroidImpactDebounceTimer <= 0) {
          this.takeDamage(15);
          this.asteroidImpactDebounceTimer = 0.25;
        }
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

  getNozzlePositions() {
    // Dual rear thruster nozzles positioned symmetrically relative to ship hull
    const leftNozzle = new THREE.Vector3(-0.48, 0, 2.35).applyQuaternion(this.quaternion).add(this.position);
    const rightNozzle = new THREE.Vector3(0.48, 0, 2.35).applyQuaternion(this.quaternion).add(this.position);
    return { left: leftNozzle, right: rightNozzle };
  }

  getEngineState() {
    return {
      thrust: this.input.thrust,
      brake: this.input.brake,
      speed: this.getSpeed(),
      isWarpCharging: this.isWarpCharging,
      warpChargeTime: this.warpChargeTime,
      warpChargeRatio: this.maxWarpCharge > 0 ? (this.warpChargeTime / this.maxWarpCharge) : 0,
      isBoosting: this.isWarpCharging
    };
  }
}
