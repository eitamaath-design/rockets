import * as THREE from 'three';
import { audio } from './audio.js';
import { logger } from '../utils/logger.js';

/**
 * Dynamic particle fire trail system for kinetic projectiles and missiles.
 * Emits blazing white/yellow/orange/red plasma flame particles that billow
 * behind projectiles as they streak through space.
 */
class FireTrailSystem {
  constructor(scene) {
    this.scene = scene;
    this.maxParticles = 900;
    this.particles = [];

    this.geom = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.maxParticles * 3);
    this.colors = new Float32Array(this.maxParticles * 3);

    this.geom.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geom.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));

    this.material = new THREE.PointsMaterial({
      size: 4.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    this.points = new THREE.Points(this.geom, this.material);
    this.scene.add(this.points);
  }

  emit(pos, dir, count = 2) {
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= this.maxParticles) break;
      const jitter = new THREE.Vector3(
        (Math.random() - 0.5) * 0.45,
        (Math.random() - 0.5) * 0.45,
        (Math.random() - 0.5) * 0.45
      );
      const pPos = pos.clone().add(jitter);
      const pVel = dir.clone().multiplyScalar(-24.0).add(new THREE.Vector3(
        (Math.random() - 0.5) * 9.0,
        (Math.random() - 0.5) * 9.0,
        (Math.random() - 0.5) * 9.0
      ));
      const life = 0.32 + Math.random() * 0.22;
      this.particles.push({
        pos: pPos,
        vel: pVel,
        life,
        maxLife: life
      });
    }
  }

  update(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      p.pos.addScaledVector(p.vel, dt);
    }

    const activeCount = this.particles.length;
    for (let i = 0; i < activeCount; i++) {
      const p = this.particles[i];
      const idx = i * 3;
      this.positions[idx] = p.pos.x;
      this.positions[idx + 1] = p.pos.y;
      this.positions[idx + 2] = p.pos.z;

      const progress = 1.0 - (p.life / p.maxLife);
      if (progress < 0.25) {
        this.colors[idx] = 1.0;
        this.colors[idx + 1] = 0.98;
        this.colors[idx + 2] = 0.70;
      } else if (progress < 0.65) {
        this.colors[idx] = 1.0;
        this.colors[idx + 1] = 0.55 * (1.0 - (progress - 0.25) / 0.4);
        this.colors[idx + 2] = 0.05;
      } else {
        const fade = (1.0 - progress) / 0.35;
        this.colors[idx] = 0.85 * fade;
        this.colors[idx + 1] = 0.15 * fade;
        this.colors[idx + 2] = 0.02 * fade;
      }
    }

    for (let i = activeCount; i < this.maxParticles; i++) {
      const idx = i * 3;
      this.positions[idx] = 99999;
      this.positions[idx + 1] = 99999;
      this.positions[idx + 2] = 99999;
      this.colors[idx] = 0;
      this.colors[idx + 1] = 0;
      this.colors[idx + 2] = 0;
    }

    this.geom.attributes.position.needsUpdate = true;
    this.geom.attributes.color.needsUpdate = true;
  }

  cleanup() {
    if (this.points && this.points.parent) {
      this.points.parent.remove(this.points);
    }
    this.geom.dispose();
    this.material.dispose();
  }
}

/**
 * Modular Homing Guidance Architecture:
 * Standard Pursuit Guidance tracks the target smoothly with angular rate clamping.
 * Designed so future upgrades (such as asteroid avoidance or lead navigation) can inherit or plug in cleanly!
 */
export class StandardPursuitGuidance {
  constructor({ maxTurnRate = 3.2, initialSpeed = 85.0, maxSpeed = 210.0, accel = 50.0 } = {}) {
    this.maxTurnRate = maxTurnRate; // Radians per second
    this.currentSpeed = initialSpeed;
    this.maxSpeed = maxSpeed;
    this.accel = accel;
  }

  steer(dt, missilePos, missileDir, targetPos) {
    this.currentSpeed = Math.min(this.maxSpeed, this.currentSpeed + this.accel * dt);

    const toTarget = targetPos.clone().sub(missilePos);
    const dist = toTarget.length();
    if (dist < 0.001) {
      return { newDir: missileDir.clone(), speed: this.currentSpeed, dist: 0 };
    }

    const desiredDir = toTarget.clone().divideScalar(dist);
    const currentQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), missileDir);
    const desiredQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), desiredDir);

    const maxAngle = this.maxTurnRate * dt;
    const angle = currentQuat.angleTo(desiredQuat);
    const t = angle > 0.0001 ? Math.min(1.0, maxAngle / angle) : 1.0;

    currentQuat.slerp(desiredQuat, t);
    const newDir = new THREE.Vector3(0, 0, 1).applyQuaternion(currentQuat).normalize();

    return { newDir, speed: this.currentSpeed, dist };
  }
}

/**
 * Missile Target Lock System:
 * Maintains target acquisition over 3.0 seconds of uninterrupted line of sight
 * within the pilot's forward crosshair cone.
 */
export class MissileLockSystem {
  constructor() {
    this.lockRequiredTime = 3.0; // 3.0 seconds continuous lock required
    this.lockTimer = 0.0;
    this.isLocked = false;
    this.currentTargetId = null;
    this.lockTickTimer = 0.0;
    this.maxLockDistance = 650.0;
    this.lockConeDot = 0.86; // ~30 degrees cone
    this.targetScreenPos = { x: 0, y: 0, visible: false, dist: 0 };
  }

  update(dt, playerShip, remoteShipsMap, spaceEnv, camera) {
    if (playerShip.isDead) {
      this.reset();
      return;
    }

    const fwd = playerShip.getForwardVector();
    let bestTarget = null;
    let bestDot = this.lockConeDot;
    let bestDist = this.maxLockDistance;

    // Evaluate all active, visible remote ships
    for (const [peerId, remote] of remoteShipsMap.entries()) {
      if (!remote || remote.isDead || remote.isInvisible) continue;

      const toTarget = remote.position.clone().sub(playerShip.position);
      const dist = toTarget.length();
      if (dist > this.maxLockDistance) continue;

      const dirToTarget = toTarget.clone().divideScalar(dist);
      const dot = fwd.dot(dirToTarget);

      if (dot > bestDot) {
        // Line-of-sight check: must NOT be obstructed by asteroids
        const blocked = spaceEnv && typeof spaceEnv.checkRayBlocked === 'function'
          ? spaceEnv.checkRayBlocked(playerShip.position, remote.position)
          : false;

        if (!blocked) {
          bestDot = dot;
          bestDist = dist;
          bestTarget = { id: peerId, remote, dist, dot };
        }
      }
    }

    if (bestTarget) {
      if (this.currentTargetId === bestTarget.id) {
        this.lockTimer = Math.min(this.lockRequiredTime, this.lockTimer + dt);
        this.lockTickTimer += dt;

        // Ascending audio lock ticks
        if (this.lockTickTimer >= 0.38 && !this.isLocked) {
          this.lockTickTimer = 0;
          audio.playLockTick(this.lockTimer / this.lockRequiredTime);
        }

        if (this.lockTimer >= this.lockRequiredTime && !this.isLocked) {
          this.isLocked = true;
          audio.playLockChime();
          logger.log('WEAPON', `Missile lock ACQUIRED on target [${bestTarget.id.slice(0, 5)}]`);
        }
      } else {
        // New target acquired
        this.currentTargetId = bestTarget.id;
        this.lockTimer = dt;
        this.isLocked = (this.lockTimer >= this.lockRequiredTime);
        this.lockTickTimer = 0;
        audio.playLockTick(Math.min(1.0, this.lockTimer / this.lockRequiredTime));
      }

      // Compute on-screen 2D coordinates for lock-on HUD brackets
      if (camera && typeof camera.project === 'function') {
        try {
          const proj = bestTarget.remote.position.clone().project(camera);
          this.targetScreenPos = {
            x: (proj.x * 0.5 + 0.5) * 100, // percentage 0 - 100
            y: (-(proj.y * 0.5) + 0.5) * 100,
            inFront: proj.z < 1.0,
            dist: Math.round(bestDist),
            id: bestTarget.id
          };
        } catch (_) {}
      }
    } else {
      // Line of sight lost or broke cone: decay lock rapidly
      if (this.lockTimer > 0) {
        this.lockTimer = Math.max(0, this.lockTimer - dt * 2.8);
      }
      if (this.lockTimer <= 0) {
        this.reset();
      }
      this.targetScreenPos.visible = false;
    }
  }

  consumeLock() {
    const targetId = this.currentTargetId;
    this.reset();
    return targetId;
  }

  reset() {
    this.lockTimer = 0;
    this.isLocked = false;
    this.currentTargetId = null;
    this.lockTickTimer = 0;
    this.targetScreenPos = { x: 0, y: 0, inFront: false, dist: 0 };
  }

  getProgress() {
    return Math.min(1.0, this.lockTimer / this.lockRequiredTime);
  }
}

/**
 * Complete Weapons System:
 * - Primary: Authentic Instantaneous Coherent Laser Beam (2.4x vs Shield, 0.35x vs Hull)
 *   Twin converging beams from wing emitters. Carves tunnels/craters through asteroids!
 * - Secondary: Homing Missile System (3-Second Line-of-Sight Target Lock required)
 *   2.2x vs Hull (devastating to unshielded ships). Blasts deep craters into asteroids on impact!
 * - Special Power-Up Deploy: Hologram Decoy Clone (15-second lifetime)
 */
export class WeaponsSystem {
  constructor(scene, spaceEnv, network) {
    this.scene = scene;
    this.spaceEnv = spaceEnv;
    this.network = network;

    // 1. Primary Weapon: Directed Energy Laser Beam
    this.laserMaxEnergy = 100.0;
    this.laserEnergy = 100.0;
    this.laserShotCost = 25.0; // 4 shots per full charge
    this.laserCooldownDelay = 0.70;
    this.laserCooldownTimer = 0;
    this.laserRechargeRate = 32.0;
    this.laserFireInterval = 0.25; // max 4 pulses/sec
    this.laserLastFireTime = 0;
    this.laserDamage = 22.0; // 2.4x vs shield = 52.8, 0.35x vs hull = 7.7
    this.laserMaxRange = 750.0;
    this.laserSpeed = 480.0;

    // 2. Secondary Weapon: Homing Missile System
    this.lockSystem = new MissileLockSystem();
    this.missileDamage = 55.0; // 2.2x vs hull = 121.0 (deadly finish)
    this.missileFireCooldown = 1.0;
    this.missileLastFireTime = 0;
    this.cannonDamage = 6.0;
    this.cannonSpeed = 185.0;

    // Active weapon entities
    this.laserBeams = []; // { group, life, maxLife, isLocal }
    this.projectileLasers = []; // projectile lasers (compatibility)
    this.missiles = []; // { group, dir, guidance, targetId, isLocal, id, life }
    this.projectiles = []; // legacy / compatibility projectiles
    this.mines = []; // legacy mines
    this.explosions = []; // { mesh, life, maxLife, maxRadius }
    this.decoys = []; // { group, dir, speed, life, maxLife, isLocal, id }

    // Dynamic fire particle trails for missiles and explosions
    this.fireTrails = new FireTrailSystem(this.scene);

    this.initGeometriesAndMaterials();
    this.listenToNetworkEvents();
  }

  initGeometriesAndMaterials() {
    // Laser Beam cylinder geometry (scaled dynamically along Z)
    this.laserCoreGeom = new THREE.CylinderGeometry(0.12, 0.12, 1.0, 8);
    this.laserCoreGeom.rotateX(Math.PI / 2);
    this.laserGlowGeom = new THREE.CylinderGeometry(0.38, 0.38, 1.0, 8);
    this.laserGlowGeom.rotateX(Math.PI / 2);

    this.localLaserCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.98,
      blending: THREE.AdditiveBlending
    });
    this.localLaserGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    this.remoteLaserCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.98,
      blending: THREE.AdditiveBlending
    });
    this.remoteLaserGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff0066,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    // 3D Homing Missile Fuselage & Fins
    this.missileBodyGeom = new THREE.CylinderGeometry(0.30, 0.30, 2.6, 8);
    this.missileBodyGeom.rotateX(Math.PI / 2);

    this.missileNoseGeom = new THREE.ConeGeometry(0.30, 0.9, 8);
    this.missileNoseGeom.rotateX(-Math.PI / 2);

    this.missileFinGeom = new THREE.BoxGeometry(1.4, 0.05, 0.65);
    this.missileNozzleGeom = new THREE.CylinderGeometry(0.20, 0.28, 0.45, 8);
    this.missileNozzleGeom.rotateX(Math.PI / 2);

    this.missileBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e2430,
      roughness: 0.35,
      metalness: 0.9,
      flatShading: true
    });
    this.missileNoseMat = new THREE.MeshBasicMaterial({ color: 0xff3322 });
    this.missileFinMat = new THREE.MeshStandardMaterial({ color: 0x3a4454, roughness: 0.5 });
    this.missileNozzleMat = new THREE.MeshBasicMaterial({ color: 0xff7700 });

    // Kinetic Cannon geometries for compatibility
    this.slugBodyGeom = new THREE.CylinderGeometry(0.24, 0.32, 2.0, 8);
    this.slugBodyGeom.rotateX(Math.PI / 2);
    this.slugNoseGeom = new THREE.ConeGeometry(0.24, 0.9, 8);
    this.slugNoseGeom.rotateX(-Math.PI / 2);
    this.slugTailGeom = new THREE.CylinderGeometry(0.18, 0.28, 0.45, 8);
    this.slugTailGeom.rotateX(Math.PI / 2);
    this.slugBodyMat = new THREE.MeshStandardMaterial({ color: 0x242e3d, roughness: 0.35, metalness: 0.85 });
    this.localSlugNoseMat = new THREE.MeshBasicMaterial({ color: 0xffcc33 });
    this.remoteSlugNoseMat = new THREE.MeshBasicMaterial({ color: 0xff3344 });
    this.slugThrusterMat = new THREE.MeshBasicMaterial({ color: 0xff6600 });

    // Hologram Decoy Wireframe
    this.decoyMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    // Legacy mine geometry
    this.mineGeom = new THREE.DodecahedronGeometry(1.6, 1);
    this.mineMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.3,
      metalness: 0.9,
      emissive: 0xff1100,
      emissiveIntensity: 0.4
    });
  }

  listenToNetworkEvents() {
    if (!this.network) return;

    if (typeof this.network.onLaser === 'function') {
      this.network.onLaser((data, peerId) => {
        this.spawnRemoteLaserBeam(data, peerId);
      });
    }

    if (typeof this.network.onMissile === 'function') {
      this.network.onMissile((data, peerId) => {
        this.spawnRemoteMissile(data, peerId);
      });
    }

    if (typeof this.network.onDecoy === 'function') {
      this.network.onDecoy((data, peerId) => {
        this.spawnRemoteDecoy(data, peerId);
      });
    }

    if (typeof this.network.onCannon === 'function') {
      this.network.onCannon((data, peerId) => {
        // Compatibility handler
        this.spawnRemoteLaserBeam(data, peerId);
      });
    }

    if (typeof this.network.onMine === 'function') {
      this.network.onMine((data, peerId) => {
        this.spawnRemoteMine(data, peerId);
      });
    }
  }

  /**
   * Primary Weapon: Authentic Instantaneous Coherent Twin Laser Beam
   * Fires twin converging beams from wing emitters to target/impact point.
   * Carves tunnels and craters through asteroids!
   */
  triggerPrimary(isHolding, ship, now) {
    if (!isHolding || ship.isDead) return;

    if (typeof ship.breakInvisibility === 'function') {
      ship.breakInvisibility();
    }

    const nowSec = now > 1000 ? now * 0.001 : now;
    if (this.laserEnergy >= this.laserShotCost && (nowSec - this.laserLastFireTime) >= this.laserFireInterval) {
      this.laserLastFireTime = nowSec;
      this.laserCooldownTimer = this.laserCooldownDelay;
      this.laserEnergy = Math.max(0, this.laserEnergy - this.laserShotCost);

      const fwd = ship.getForwardVector();
      const right = ship.getRightVector();
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(ship.quaternion);

      // Wing emitter origins
      const leftEmitter = ship.position.clone()
        .addScaledVector(fwd, 2.2)
        .addScaledVector(right, -0.72)
        .addScaledVector(up, -0.28);

      const rightEmitter = ship.position.clone()
        .addScaledVector(fwd, 2.2)
        .addScaledVector(right, 0.72)
        .addScaledVector(up, -0.28);

      const centerOrigin = ship.position.clone().addScaledVector(fwd, 2.0);

      // Perform raycast hitscan against asteroids and targets
      let hitPoint = null;
      let hitDistance = this.laserMaxRange;
      let hitTargetType = null;
      let hitTargetObj = null;

      // 1. Raycast vs Asteroids
      if (this.spaceEnv && typeof this.spaceEnv.checkRayCollision === 'function') {
        const astHit = this.spaceEnv.checkRayCollision(centerOrigin, fwd, this.laserMaxRange);
        if (astHit) {
          hitPoint = astHit.hitPoint;
          hitDistance = astHit.distance;
          hitTargetType = 'asteroid';
          hitTargetObj = astHit.asteroid;
        }
      }

      // 2. Raycast vs Remote Ships (if closer than asteroid hit)
      if (this.network && this.network.peers) {
        for (const [peerId, peerData] of this.network.peers.entries()) {
          const remoteState = peerData?.lastState;
          if (!remoteState || remoteState.isDead || remoteState.isInvisible) continue;

          const rPos = new THREE.Vector3(remoteState.pos.x, remoteState.pos.y, remoteState.pos.z);
          const toR = rPos.clone().sub(centerOrigin);
          const proj = toR.dot(fwd);
          if (proj > 0 && proj < hitDistance) {
            const perpDistSq = toR.lengthSq() - (proj * proj);
            if (perpDistSq < 16.0) { // 4u hit radius
              hitDistance = proj;
              hitPoint = centerOrigin.clone().addScaledVector(fwd, proj);
              hitTargetType = 'ship';
              hitTargetObj = peerId;
            }
          }
        }
      }

      // If nothing hit, project beam to max range
      if (!hitPoint) {
        hitPoint = centerOrigin.clone().addScaledVector(fwd, this.laserMaxRange);
      }

      const shotId = `laser-${this.network ? this.network.selfId : 'local'}-${Date.now()}`;

      // Spawn visual twin laser beams
      this.spawnTwinLaserBeam(leftEmitter, rightEmitter, hitPoint, true);
      audio.playLaserShot(true);

      // Resolve Impact
      if (hitTargetType === 'asteroid' && hitTargetObj) {
        this.spawnExplosion(hitPoint, 6, 0x00d4ff);
        if (typeof this.spaceEnv.carveAsteroid === 'function') {
          // Primary laser carves and melts through asteroid!
          this.spaceEnv.carveAsteroid(hitTargetObj, hitPoint, fwd, 20.0, 14.0);
        }
      } else if (hitTargetType === 'ship' && hitTargetObj) {
        this.spawnExplosion(hitPoint, 8, 0x00ffff);
        if (this.network && typeof this.network.sendHitTarget === 'function') {
          this.network.sendHitTarget(hitTargetObj, this.laserDamage, 'laser');
        }
      }

      // Broadcast laser beam over network
      if (this.network && typeof this.network.broadcastLaser === 'function') {
        this.network.broadcastLaser({
          id: shotId,
          leftOrigin: { x: leftEmitter.x, y: leftEmitter.y, z: leftEmitter.z },
          rightOrigin: { x: rightEmitter.x, y: rightEmitter.y, z: rightEmitter.z },
          hitPoint: { x: hitPoint.x, y: hitPoint.y, z: hitPoint.z },
          dir: { x: fwd.x, y: fwd.y, z: fwd.z },
          targetType: hitTargetType,
          time: now
        });
      }
    }
  }

  spawnTwinLaserBeam(leftOrigin, rightOrigin, hitPoint, isLocal) {
    const group = new THREE.Group();
    const coreMat = isLocal ? this.localLaserCoreMat : this.remoteLaserCoreMat;
    const glowMat = isLocal ? this.localLaserGlowMat : this.remoteLaserGlowMat;

    // Create left beam
    const leftDist = leftOrigin.distanceTo(hitPoint);
    const leftMid = leftOrigin.clone().add(hitPoint).multiplyScalar(0.5);
    const leftCore = new THREE.Mesh(this.laserCoreGeom, coreMat);
    leftCore.scale.set(1, 1, leftDist);
    leftCore.position.copy(leftMid);
    leftCore.lookAt(hitPoint);
    group.add(leftCore);

    const leftGlow = new THREE.Mesh(this.laserGlowGeom, glowMat);
    leftGlow.scale.set(1, 1, leftDist);
    leftGlow.position.copy(leftMid);
    leftGlow.lookAt(hitPoint);
    group.add(leftGlow);

    // Create right beam
    const rightDist = rightOrigin.distanceTo(hitPoint);
    const rightMid = rightOrigin.clone().add(hitPoint).multiplyScalar(0.5);
    const rightCore = new THREE.Mesh(this.laserCoreGeom, coreMat);
    rightCore.scale.set(1, 1, rightDist);
    rightCore.position.copy(rightMid);
    rightCore.lookAt(hitPoint);
    group.add(rightCore);

    const rightGlow = new THREE.Mesh(this.laserGlowGeom, glowMat);
    rightGlow.scale.set(1, 1, rightDist);
    rightGlow.position.copy(rightMid);
    rightGlow.lookAt(hitPoint);
    group.add(rightGlow);

    this.scene.add(group);
    this.laserBeams.push({
      group,
      life: 0.14,
      maxLife: 0.14,
      isLocal
    });
  }

  spawnRemoteLaserBeam(data, peerId) {
    const leftOrigin = data.leftOrigin
      ? new THREE.Vector3(data.leftOrigin.x, data.leftOrigin.y, data.leftOrigin.z)
      : new THREE.Vector3(data.origin.x, data.origin.y, data.origin.z);

    const rightOrigin = data.rightOrigin
      ? new THREE.Vector3(data.rightOrigin.x, data.rightOrigin.y, data.rightOrigin.z)
      : leftOrigin;

    const hitPoint = data.hitPoint
      ? new THREE.Vector3(data.hitPoint.x, data.hitPoint.y, data.hitPoint.z)
      : leftOrigin.clone().add(new THREE.Vector3(data.dir.x, data.dir.y, data.dir.z).multiplyScalar(500));

    this.spawnTwinLaserBeam(leftOrigin, rightOrigin, hitPoint, false);
    audio.playLaserShot(false, leftOrigin);

    if (data.targetType === 'asteroid') {
      this.spawnExplosion(hitPoint, 6, 0xff0066);
    }
  }

  /**
   * Secondary Weapon: Homing Missile (Requires 3.0s Continuous Target Lock)
   * Tracks locked target. Carves deep craters if hitting asteroids!
   */
  triggerSecondary(isHolding, ship, now) {
    if (!isHolding || ship.isDead) return false;

    // Check if target is locked!
    if (!this.lockSystem.isLocked || !this.lockSystem.currentTargetId) {
      return false; // Cannot fire without 3s lock-on!
    }

    const nowSec = now > 1000 ? now * 0.001 : now;
    if ((nowSec - this.missileLastFireTime) < this.missileFireCooldown) return false;
    this.missileLastFireTime = nowSec;

    if (typeof ship.breakInvisibility === 'function') {
      ship.breakInvisibility();
    }

    const targetId = this.lockSystem.consumeLock();
    const fwd = ship.getForwardVector();
    const origin = ship.position.clone()
      .addScaledVector(fwd, 3.5)
      .add(new THREE.Vector3(0, -0.4, 0));

    const missileId = `missile-${this.network ? this.network.selfId : 'local'}-${Date.now()}`;
    this.spawnMissile(origin, fwd, targetId, true, missileId);
    audio.playMissileLaunch(true);
    logger.log('WEAPON', `🚀 Homing Missile LAUNCHED tracking target [${targetId.slice(0, 5)}]`);

    if (this.network && typeof this.network.broadcastMissile === 'function') {
      this.network.broadcastMissile({
        id: missileId,
        origin: { x: origin.x, y: origin.y, z: origin.z },
        dir: { x: fwd.x, y: fwd.y, z: fwd.z },
        targetPeerId: targetId,
        time: now
      });
    }
    return true;
  }

  spawnMissile(origin, dir, targetId, isLocal, id) {
    const group = new THREE.Group();
    group.position.copy(origin);
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);

    // 1. Fuselage
    const body = new THREE.Mesh(this.missileBodyGeom, this.missileBodyMat);
    group.add(body);

    // 2. High-explosive warhead nose
    const nose = new THREE.Mesh(this.missileNoseGeom, this.missileNoseMat);
    nose.position.set(0, 0, 1.7);
    group.add(nose);

    // 3. Cruciform steering fins
    const finH = new THREE.Mesh(this.missileFinGeom, this.missileFinMat);
    finH.position.set(0, 0, -0.9);
    group.add(finH);

    const finV = new THREE.Mesh(this.missileFinGeom, this.missileFinMat);
    finV.position.set(0, 0, -0.9);
    finV.rotation.z = Math.PI / 2;
    group.add(finV);

    // 4. Rocket motor nozzle
    const nozzle = new THREE.Mesh(this.missileNozzleGeom, this.missileNozzleMat);
    nozzle.position.set(0, 0, -1.5);
    group.add(nozzle);

    this.scene.add(group);

    this.missiles.push({
      group,
      dir: dir.clone().normalize(),
      guidance: new StandardPursuitGuidance(),
      targetId,
      isLocal,
      id,
      life: 9.0 // 9 seconds fuel
    });
  }

  spawnRemoteMissile(data, peerId) {
    const origin = new THREE.Vector3(data.origin.x, data.origin.y, data.origin.z);
    const dir = new THREE.Vector3(data.dir.x, data.dir.y, data.dir.z);
    this.spawnMissile(origin, dir, data.targetPeerId, false, data.id);
    audio.playMissileLaunch(false, origin);
  }

  /**
   * Special Power-Up Action: Deploy Holographic Starfighter Decoy Clone
   */
  deployDecoyClone(ship) {
    const fwd = ship.getForwardVector();
    const origin = ship.position.clone().addScaledVector(fwd, 4.0);
    const decoyId = `decoy-${this.network ? this.network.selfId : 'local'}-${Date.now()}`;

    this.spawnDecoy(origin, fwd, true, decoyId);
    audio.playDecoyDeploy();
    logger.log('POWERUP', 'Hologram Decoy Clone deployed forward!');

    if (this.network && typeof this.network.broadcastDecoy === 'function') {
      this.network.broadcastDecoy({
        id: decoyId,
        pos: { x: origin.x, y: origin.y, z: origin.z },
        dir: { x: fwd.x, y: fwd.y, z: fwd.z },
        time: Date.now()
      });
    }
  }

  spawnDecoy(origin, dir, isLocal, id) {
    const group = new THREE.Group();
    group.position.copy(origin);
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), dir);

    const hullGeom = new THREE.ConeGeometry(1.2, 4.0, 5);
    hullGeom.rotateX(-Math.PI / 2);
    const hull = new THREE.Mesh(hullGeom, this.decoyMat);
    group.add(hull);

    const wingGeom = new THREE.BoxGeometry(5.0, 0.08, 1.8);
    const wings = new THREE.Mesh(wingGeom, this.decoyMat);
    wings.position.set(0, 0, 0.8);
    group.add(wings);

    const flareGeom = new THREE.SphereGeometry(0.5, 8, 8);
    const flareMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const flare = new THREE.Mesh(flareGeom, flareMat);
    flare.position.set(0, 0, 2.2);
    group.add(flare);

    this.scene.add(group);
    this.decoys.push({
      group,
      dir: dir.clone().normalize(),
      speed: 95.0,
      life: 15.0,
      maxLife: 15.0,
      isLocal,
      id
    });
  }

  spawnRemoteDecoy(data, peerId) {
    const origin = new THREE.Vector3(data.pos.x, data.pos.y, data.pos.z);
    const dir = new THREE.Vector3(data.dir.x, data.dir.y, data.dir.z);
    this.spawnDecoy(origin, dir, false, data.id);
    audio.playDecoyDeploy();
  }

  spawnRemoteMine(data, peerId) {
    const pos = new THREE.Vector3(data.pos.x, data.pos.y, data.pos.z);
    const mesh = new THREE.Mesh(this.mineGeom, this.mineMat);
    mesh.position.copy(pos);
    this.scene.add(mesh);
    this.mines.push({ mesh, pos, life: 3.0, id: data.id, isLocal: false });
  }

  spawnExplosion(pos, radius = 12, color = 0xff6600) {
    const geom = new THREE.SphereGeometry(radius * 0.45, 12, 10);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(pos);

    this.scene.add(mesh);
    audio.playExplosion(radius > 15 ? 1.6 : 0.85, pos);

    if (this.spaceEnv && typeof this.spaceEnv.triggerCombatFlash === 'function') {
      this.spaceEnv.triggerCombatFlash(pos, color, radius > 15 ? 4.5 : 2.5);
    }

    this.explosions.push({
      mesh,
      maxLife: 0.45,
      life: 0.45,
      maxRadius: radius
    });
  }

  spawnLaser(origin, dir, isLocal, id) {
    const group = new THREE.Group();
    group.position.copy(origin);
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);

    const core = new THREE.Mesh(this.laserCoreGeom, isLocal ? this.localLaserCoreMat : this.remoteLaserCoreMat);
    core.scale.set(1, 1, 9.0);
    group.add(core);

    const glow = new THREE.Mesh(this.laserGlowGeom, isLocal ? this.localLaserGlowMat : this.remoteLaserGlowMat);
    glow.scale.set(1, 1, 9.4);
    group.add(glow);

    this.scene.add(group);
    this.projectileLasers.push({
      mesh: group,
      dir: dir.clone().normalize(),
      speed: this.laserSpeed,
      life: 1.4,
      isLocal,
      id
    });
  }

  spawnProjectile(origin, dir, initialVel, isLocal, id) {
    const group = new THREE.Group();
    group.position.copy(origin);
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);

    const body = new THREE.Mesh(this.slugBodyGeom, this.slugBodyMat);
    group.add(body);

    const nose = new THREE.Mesh(this.slugNoseGeom, isLocal ? this.localSlugNoseMat : this.remoteSlugNoseMat);
    nose.position.set(0, 0, -1.45);
    group.add(nose);

    const tail = new THREE.Mesh(this.slugTailGeom, this.slugThrusterMat);
    tail.position.set(0, 0, 1.15);
    group.add(tail);

    this.scene.add(group);
    this.projectiles.push({
      mesh: group,
      dir: dir.clone().normalize(),
      speed: this.cannonSpeed,
      initialVel: initialVel ? initialVel.clone() : new THREE.Vector3(),
      life: 2.8,
      isLocal,
      id
    });
  }

  // Compatibility aliases
  triggerCannon(isHolding, ship, now) {
    return this.triggerSecondary(isHolding, ship, now);
  }

  triggerLaser(isHolding, ship, now) {
    this.triggerPrimary(isHolding, ship, now);
  }

  triggerRearMine(ship) {
    return this.triggerSecondary(true, ship, performance.now());
  }

  update(dt, localShip, remoteShipsMap, onDamageEvent) {
    // 1. Weapon Energy Recharging
    if (this.laserCooldownTimer > 0) {
      const elapsed = Math.min(this.laserCooldownTimer, dt);
      this.laserCooldownTimer -= elapsed;
      const remDt = dt - elapsed;
      if (remDt > 0 && this.laserEnergy < this.laserMaxEnergy) {
        this.laserEnergy = Math.min(this.laserMaxEnergy, this.laserEnergy + this.laserRechargeRate * remDt);
      }
    } else if (this.laserEnergy < this.laserMaxEnergy) {
      this.laserEnergy = Math.min(this.laserMaxEnergy, this.laserEnergy + this.laserRechargeRate * dt);
    }

    // 2. Update Laser Beam Visuals
    for (let i = this.laserBeams.length - 1; i >= 0; i--) {
      const b = this.laserBeams[i];
      b.life -= dt;
      if (b.life <= 0) {
        this.scene.remove(b.group);
        this.laserBeams.splice(i, 1);
        continue;
      }
      const alpha = b.life / b.maxLife;
      b.group.children.forEach(c => {
        if (c.material && c.material.opacity !== undefined) {
          c.material.opacity = alpha * 0.95;
        }
      });
    }

    // 3. Update Homing Missiles
    for (let i = this.missiles.length - 1; i >= 0; i--) {
      const m = this.missiles[i];
      m.life -= dt;

      // Find locked target position
      let targetPos = null;
      if (m.targetId === (this.network ? this.network.selfId : null)) {
        targetPos = localShip.position;
      } else if (remoteShipsMap.has(m.targetId)) {
        const remote = remoteShipsMap.get(m.targetId);
        if (!remote.isDead) targetPos = remote.position;
      }

      // If target exists, guide missile towards target; otherwise continue straight
      if (targetPos) {
        const steering = m.guidance.steer(dt, m.group.position, m.dir, targetPos);
        m.dir.copy(steering.newDir);
        m.group.position.addScaledVector(m.dir, steering.speed * dt);
      } else {
        m.group.position.addScaledVector(m.dir, m.guidance.currentSpeed * dt);
      }

      m.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), m.dir);

      // Rocket fire trail billowing behind missile
      const tailPos = m.group.position.clone().addScaledVector(m.dir, -1.5);
      this.fireTrails.emit(tailPos, m.dir, 3);

      let detonated = false;

      // Asteroid collision: MISSILE BLASTS DEEP CRATER!
      const hitAsteroid = this.spaceEnv.checkCollision(m.group.position, 1.8);
      if (hitAsteroid) {
        this.spawnExplosion(m.group.position, 16, 0xff5500);
        if (typeof this.spaceEnv.carveAsteroid === 'function') {
          this.spaceEnv.carveAsteroid(hitAsteroid, m.group.position, m.dir, 28.0, 18.0);
        }
        detonated = true;
      }

      // Hit Local Player
      if (!detonated && !m.isLocal && !localShip.isDead && localShip.invulnerableTimer <= 0) {
        if (m.group.position.distanceToSquared(localShip.position) < 24.0) {
          this.spawnExplosion(m.group.position, 20, 0xff2200);
          localShip.takeDamage(this.missileDamage, 'missile');
          if (onDamageEvent) onDamageEvent(this.missileDamage, 'missile', null);
          detonated = true;
        }
      }

      // Hit Remote Target
      if (!detonated && m.isLocal && m.targetId && remoteShipsMap.has(m.targetId)) {
        const remote = remoteShipsMap.get(m.targetId);
        if (!remote.isDead && m.group.position.distanceToSquared(remote.position) < 24.0) {
          this.spawnExplosion(m.group.position, 20, 0xff2200);
          if (this.network && typeof this.network.sendHitTarget === 'function') {
            this.network.sendHitTarget(m.targetId, this.missileDamage, 'missile');
          }
          detonated = true;
        }
      }

      if (detonated || m.life <= 0) {
        if (m.life <= 0 && !detonated) {
          this.spawnExplosion(m.group.position, 10, 0xff4400); // Fuel exhaustion burst
        }
        this.scene.remove(m.group);
        this.missiles.splice(i, 1);
      }
    }

    // 3b. Update Projectile Lasers (compatibility)
    for (let i = this.projectileLasers.length - 1; i >= 0; i--) {
      const l = this.projectileLasers[i];
      l.life -= dt;
      l.mesh.position.addScaledVector(l.dir, l.speed * dt);
      let destroyed = false;

      const hitAsteroid = this.spaceEnv.checkCollision(l.mesh.position, 1.2);
      if (hitAsteroid) {
        this.spawnExplosion(l.mesh.position, 6, 0x00d4ff);
        destroyed = true;
      }

      if (!destroyed && !l.isLocal && !localShip.isDead && localShip.invulnerableTimer <= 0) {
        if (l.mesh.position.distanceToSquared(localShip.position) < 18.0) {
          this.spawnExplosion(l.mesh.position, 8, 0x00ffff);
          localShip.takeDamage(this.laserDamage, 'laser');
          if (onDamageEvent) onDamageEvent(this.laserDamage, 'laser', null);
          destroyed = true;
        }
      }

      if (!destroyed && l.isLocal) {
        for (const [peerId, remote] of remoteShipsMap.entries()) {
          if (!remote.isDead && l.mesh.position.distanceToSquared(remote.position) < 18.0) {
            this.spawnExplosion(l.mesh.position, 8, 0x00ffff);
            if (this.network && typeof this.network.sendHitTarget === 'function') {
              this.network.sendHitTarget(peerId, this.laserDamage, 'laser');
            }
            destroyed = true;
            break;
          }
        }
      }

      if (destroyed || l.life <= 0) {
        this.scene.remove(l.mesh);
        this.projectileLasers.splice(i, 1);
      }
    }

    // 3c. Update Kinetic Projectiles (compatibility)
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;
      p.mesh.position.addScaledVector(p.dir, p.speed * dt);

      let destroyed = false;
      const hitAsteroid = this.spaceEnv.checkCollision(p.mesh.position, 1.2);
      if (hitAsteroid) {
        this.spawnExplosion(p.mesh.position, 5, 0xff7700);
        if (typeof this.spaceEnv.carveAsteroid === 'function') {
          this.spaceEnv.carveAsteroid(hitAsteroid, p.mesh.position, p.dir);
        }
        destroyed = true;
      }

      if (!destroyed && !p.isLocal && !localShip.isDead && localShip.invulnerableTimer <= 0) {
        if (p.mesh.position.distanceToSquared(localShip.position) < 16.0) {
          this.spawnExplosion(p.mesh.position, 6, 0xff3300);
          localShip.takeDamage(this.cannonDamage, 'cannon');
          if (onDamageEvent) onDamageEvent(this.cannonDamage, 'cannon', null);
          destroyed = true;
        }
      }

      if (!destroyed && p.isLocal) {
        for (const [peerId, remote] of remoteShipsMap.entries()) {
          if (!remote.isDead && p.mesh.position.distanceToSquared(remote.position) < 16.0) {
            this.spawnExplosion(p.mesh.position, 6, 0xff5500);
            if (this.network && typeof this.network.sendHitTarget === 'function') {
              this.network.sendHitTarget(peerId, this.cannonDamage, 'cannon');
            }
            destroyed = true;
            break;
          }
        }
      }

      if (destroyed || p.life <= 0) {
        this.scene.remove(p.mesh);
        this.projectiles.splice(i, 1);
      }
    }

    // 4. Update Hologram Decoy Clones (15-second lifetime, no collisions)
    for (let i = this.decoys.length - 1; i >= 0; i--) {
      const d = this.decoys[i];
      d.life -= dt;
      d.group.position.addScaledVector(d.dir, d.speed * dt);

      // Shimmering holographic flicker
      const pulse = 0.5 + Math.sin(d.life * 14.0) * 0.25;
      d.group.children.forEach(c => {
        if (c.material && c.material.opacity !== undefined) {
          c.material.opacity = pulse;
        }
      });

      if (d.life <= 0) {
        this.spawnExplosion(d.group.position, 6, 0x00ffff);
        this.scene.remove(d.group);
        this.decoys.splice(i, 1);
      }
    }

    // 5. Update Legacy Mines
    for (let i = this.mines.length - 1; i >= 0; i--) {
      const m = this.mines[i];
      m.life -= dt;
      m.mesh.rotation.y += dt * 2.0;

      if (m.life <= 0) {
        this.spawnExplosion(m.pos, 16, 0xff2200);
        this.scene.remove(m.mesh);
        this.mines.splice(i, 1);
      }
    }

    // 6. Update Explosions
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const exp = this.explosions[i];
      exp.life -= dt;
      if (exp.life <= 0) {
        this.scene.remove(exp.mesh);
        this.explosions.splice(i, 1);
        continue;
      }
      const progress = 1.0 - (exp.life / exp.maxLife);
      const scale = 1.0 + progress * 2.2;
      exp.mesh.scale.set(scale, scale, scale);
      exp.mesh.material.opacity = (exp.life / exp.maxLife) * 0.9;
    }

    // 7. Update Fire Trails
    this.fireTrails.update(dt);
  }

  // Compatibility getter
  get lasers() {
    return this.projectileLasers.length > 0 ? this.projectileLasers : this.laserBeams;
  }

  get cannonEnergy() {
    return this.lockSystem.isLocked ? 100 : Math.round(this.lockSystem.getProgress() * 100);
  }

  get cannonMaxEnergy() {
    return 100;
  }

  get cannonCooldownTimer() {
    return this.lockSystem.isLocked ? 0 : (3.0 - this.lockSystem.lockTimer);
  }

  cleanup() {
    for (const b of this.laserBeams) this.scene.remove(b.group);
    for (const m of this.missiles) this.scene.remove(m.group);
    for (const d of this.decoys) this.scene.remove(d.group);
    for (const mine of this.mines) this.scene.remove(mine.mesh);
    for (const e of this.explosions) this.scene.remove(e.mesh);
    this.fireTrails.cleanup();
  }
}
