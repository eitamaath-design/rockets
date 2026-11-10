import * as THREE from 'three';
import { audio } from './audio.js';
import { logger } from '../utils/logger.js';
import { createRadialGlowTexture } from './trail.js';

// Module-scoped scratch objects for zero runtime heap allocations
const _dummy = new THREE.Object3D();
const _color = new THREE.Color();
const _camQuat = new THREE.Quaternion();
const _hideMatrix = new THREE.Matrix4().makeScale(0, 0, 0);
const _scratchVecA = new THREE.Vector3();

/**
 * Dynamic GPU InstancedMesh fire trail system for kinetic projectiles and missiles.
 * Emits blazing white/yellow/orange/red plasma flame particles that billow
 * behind projectiles as they streak through space.
 */
class FireTrailSystem {
  constructor(scene) {
    this.scene = scene;
    this.maxParticles = 1500;
    this.particles = [];
    this.simTime = 0;

    this.planeGeo = new THREE.PlaneGeometry(1, 1);
    this.glowTexture = createRadialGlowTexture(128);

    this.material = new THREE.MeshBasicMaterial({
      map: this.glowTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.InstancedMesh(this.planeGeo, this.material, this.maxParticles);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles * 3), 3);
    this.mesh.instanceColor.setUsage(THREE.DynamicDrawUsage);

    // CRITICAL: Disable frustum culling so particles never vanish when turning or looking away
    this.mesh.frustumCulled = false;

    // Backwards compatibility
    this.points = this.mesh;
    this.positions = new Float32Array(this.maxParticles * 3);
    this.colors = new Float32Array(this.maxParticles * 3);

    for (let i = 0; i < this.maxParticles; i++) {
      this.mesh.setMatrixAt(i, _hideMatrix);
      const idx = i * 3;
      this.positions[idx] = 99999;
      this.positions[idx + 1] = 99999;
      this.positions[idx + 2] = 99999;
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    this._prevActiveCount = 0;
    this.particleDensity = 'balanced';
    this.particleDensityMultiplier = 1.0;

    this.scene.add(this.mesh);

    // Emitter tracking for sub-frame distance interpolation
    this.lastEmitPos = new Map();
  }

  _spawnPuff(pos, dir, count = 2) {
    const scaledCount = this.particleDensity === 'balanced'
      ? count
      : Math.max(1, Math.round(count * (this.particleDensityMultiplier || 1.0)));
    for (let i = 0; i < scaledCount; i++) {
      if (this.particles.length >= this.maxParticles) {
        this.particles.shift();
      }
      const jitter = new THREE.Vector3(
        (Math.random() - 0.5) * 0.55,
        (Math.random() - 0.5) * 0.55,
        (Math.random() - 0.5) * 0.55
      );
      const pPos = pos.clone().add(jitter);
      const pVel = dir.clone().multiplyScalar(-20.0).add(new THREE.Vector3(
        (Math.random() - 0.5) * 8.0,
        (Math.random() - 0.5) * 8.0,
        (Math.random() - 0.5) * 8.0
      ));
      // Particle lifetime 0.8s to 1.4s for expansive billowing exhaust plume
      const life = 0.8 + Math.random() * 0.6;
      this.particles.push({
        pos: pPos,
        vel: pVel,
        life,
        maxLife: life,
        baseScale: 2.2 + Math.random() * 1.6
      });
    }
  }

  emit(pos, dir, count = 2, emitterId = null) {
    if (emitterId) {
      let lastPos = this.lastEmitPos.get(emitterId);
      if (lastPos) {
        const dist = pos.distanceTo(lastPos);
        if (dist > 0.5 && dist < 30.0) {
          const steps = Math.min(8, Math.floor(dist / 0.8));
          for (let s = 1; s <= steps; s++) {
            const alpha = s / (steps + 1);
            _scratchVecA.copy(lastPos).lerp(pos, alpha);
            this._spawnPuff(_scratchVecA, dir, 1);
          }
        }
        lastPos.copy(pos);
      } else {
        this.lastEmitPos.set(emitterId, pos.clone());
      }
    }

    this._spawnPuff(pos, dir, count);
  }

  update(dt, camera = null) {
    this.simTime += dt;
    if (camera && camera.quaternion) {
      _camQuat.copy(camera.quaternion);
    } else {
      _camQuat.identity();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      p.pos.addScaledVector(p.vel, dt);
      // Expanding billowing puffs slowly decelerate
      p.vel.multiplyScalar(Math.pow(0.92, dt * 60));

      // Billowing pseudo-curl turbulence
      p.pos.x += Math.sin(p.pos.y * 0.2 + this.simTime * 2.0) * 0.5 * dt;
      p.pos.y += Math.cos(p.pos.x * 0.2 + this.simTime * 2.0) * 0.5 * dt;
      p.pos.z += Math.sin(p.pos.z * 0.2 + this.simTime * 2.0) * 0.5 * dt;
    }

    const activeCount = this.particles.length;
    for (let i = 0; i < activeCount; i++) {
      const p = this.particles[i];
      const progress = 1.0 - (p.life / p.maxLife);

      // Scale grows from 1.4x to 4.5x as it billows into space
      const scale = p.baseScale * (1.0 + progress * 3.5);
      _dummy.position.copy(p.pos);
      _dummy.quaternion.copy(_camQuat);
      _dummy.scale.set(scale, scale, scale);
      _dummy.updateMatrix();

      this.mesh.setMatrixAt(i, _dummy.matrix);

      if (progress < 0.20) {
        // Blazing incandescent white/yellow core
        _color.setRGB(1.0, 0.98, 0.75);
      } else if (progress < 0.55) {
        // Fiery expanding orange plasma flame
        const t = (progress - 0.20) / 0.35;
        _color.setRGB(1.0, 0.52 * (1.0 - t), 0.05 * (1.0 - t));
      } else {
        // Cool charcoal grey smoke puff fading into space
        const fade = (1.0 - progress) / 0.45;
        const grey = 0.26 * fade;
        _color.setRGB(grey, grey, grey + 0.03 * fade);
      }

      this.mesh.setColorAt(i, _color);

      // Populate positions and colors array for backward compatibility
      const idx = i * 3;
      this.positions[idx] = p.pos.x;
      this.positions[idx + 1] = p.pos.y;
      this.positions[idx + 2] = p.pos.z;
      this.colors[idx] = _color.r;
      this.colors[idx + 1] = _color.g;
      this.colors[idx + 2] = _color.b;
    }

    const prevCount = this._prevActiveCount || 0;
    for (let i = activeCount; i < prevCount; i++) {
      this.mesh.setMatrixAt(i, _hideMatrix);
      const idx = i * 3;
      this.positions[idx] = 99999;
      this.positions[idx + 1] = 99999;
      this.positions[idx + 2] = 99999;
      this.colors[idx] = 0;
      this.colors[idx + 1] = 0;
      this.colors[idx + 2] = 0;
    }

    if (activeCount > 0 || prevCount > 0) {
      this.mesh.instanceMatrix.needsUpdate = true;
      if (this.mesh.instanceColor) {
        this.mesh.instanceColor.needsUpdate = true;
      }
    }
    this._prevActiveCount = activeCount;
  }

  cleanup() {
    if (this.mesh && this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
    this.planeGeo.dispose();
    this.glowTexture.dispose();
    this.material.dispose();
    this.particles = [];
    this.lastEmitPos.clear();
  }
}

/**
 * Modular Homing Guidance Architecture:
 * Standard Pursuit Guidance tracks the target smoothly with angular rate clamping.
 * Designed so future upgrades (such as asteroid avoidance or lead navigation) can inherit or plug in cleanly!
 */
export class StandardPursuitGuidance {
  constructor({
    maxTurnRate = 3.2,
    initialSpeed = 85.0,
    maxSpeed = 210.0,
    accel = 50.0,
    initialVelocity = null,
    launchDir = null,
    inheritedSpeed = null
  } = {}) {
    this.maxTurnRate = maxTurnRate; // Radians per second
    this.baseInitialSpeed = initialSpeed;
    this.baseMaxSpeed = maxSpeed;
    this.accel = accel;

    let inherited = 0;
    if (inheritedSpeed !== null && Number.isFinite(inheritedSpeed)) {
      inherited = Math.max(0, inheritedSpeed);
    } else if (initialVelocity) {
      const velVec = (initialVelocity instanceof THREE.Vector3)
        ? initialVelocity
        : new THREE.Vector3(initialVelocity.x || 0, initialVelocity.y || 0, initialVelocity.z || 0);
      if (launchDir) {
        const dirVec = (launchDir instanceof THREE.Vector3)
          ? launchDir.clone().normalize()
          : new THREE.Vector3(launchDir.x || 0, launchDir.y || 0, launchDir.z || 0).normalize();
        inherited = Math.max(0, velVec.dot(dirVec));
      } else {
        inherited = velVec.length();
      }
    }
    this.inheritedSpeed = inherited;
    this.currentSpeed = this.baseInitialSpeed + inherited;
    this.maxSpeed = Math.max(this.baseMaxSpeed, this.baseMaxSpeed + inherited);
  }

  accelerate(dt) {
    this.currentSpeed = Math.min(this.maxSpeed, this.currentSpeed + this.accel * dt);
    return this.currentSpeed;
  }

  ensureSeparationSpeed(firingShipSpeed) {
    if (!Number.isFinite(firingShipSpeed) || firingShipSpeed <= 0) return;
    const minSpeed = firingShipSpeed + this.baseInitialSpeed;
    if (this.currentSpeed < minSpeed) {
      this.currentSpeed = minSpeed;
    }
    const minMaxSpeed = firingShipSpeed + this.baseMaxSpeed;
    if (this.maxSpeed < minMaxSpeed) {
      this.maxSpeed = minMaxSpeed;
    }
  }

  steer(dt, missilePos, missileDir, targetPos) {
    this.accelerate(dt);

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

    // 1. Primary Weapon: Directed Energy Laser Beam (Continuous Sustained Beam ~5s)
    this.laserMaxEnergy = 100.0;
    this.laserEnergy = 100.0;
    this.laserFireInterval = 0.16; // 6.25 ticks per second for seamless continuous beam
    this.laserShotCost = 3.2; // 3.2 * 6.25 = 20.0 energy/s -> exactly 5.0 seconds continuous sustained fire!
    this.laserCooldownDelay = 0.50;
    this.laserCooldownTimer = 0;
    this.laserRechargeRate = 25.0; // Smooth 4-second recharge
    this.laserLastFireTime = 0;
    this.laserDamage = 2.4; // 2.4 per tick (30 dps; 72 shield dps)
    this.laserMaxRange = 3500.0;
    this.laserSpeed = 160.0;

    // 2. Secondary Weapon: Dual-Mode Missile System (Guided 3s Lock + Unguided Dumb-Fire)
    this.lockSystem = new MissileLockSystem();
    this.missileDamage = 55.0; // 2.2x vs hull = 121.0 (deadly finish)
    this.missileFireCooldown = 0.8;
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

    // High-performance GPU InstancedMesh explosion & impact spark pool
    this.maxExplosionQuads = 1500;
    this.explosionQuads = [];
    this.explosionPlaneGeo = new THREE.PlaneGeometry(1, 1);
    this.explosionGlowTex = createRadialGlowTexture(128);
    this.explosionMat = new THREE.MeshBasicMaterial({
      map: this.explosionGlowTex,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.explosionMesh = new THREE.InstancedMesh(this.explosionPlaneGeo, this.explosionMat, this.maxExplosionQuads);
    this.explosionMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.explosionMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(this.maxExplosionQuads * 3), 3);
    this.explosionMesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
    this.explosionMesh.frustumCulled = false;
    for (let i = 0; i < this.maxExplosionQuads; i++) {
      this.explosionMesh.setMatrixAt(i, _hideMatrix);
    }
    this.explosionMesh.instanceMatrix.needsUpdate = true;
    this._prevExplosionQuadCount = 0;
    this.particleDensity = 'balanced';
    this.particleDensityMultiplier = 1.0;
    this.scene.add(this.explosionMesh);

    this.initGeometriesAndMaterials();
    this.listenToNetworkEvents();
  }

  setParticleDensity(density = 'balanced') {
    if (['low', 'balanced', 'high'].includes(density)) {
      this.particleDensity = density;
      this.particleDensityMultiplier = density === 'low' ? 0.5 : (density === 'high' ? 1.5 : 1.0);
      if (this.fireTrails) {
        this.fireTrails.particleDensity = density;
        this.fireTrails.particleDensityMultiplier = this.particleDensityMultiplier;
      }
    }
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

    // Fire Laser materials (fiery white core + blazing incandescent orange/gold/red glow)
    this.fireLaserCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.98,
      blending: THREE.AdditiveBlending
    });
    this.fireLaserGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending
    });
    this.remoteFireLaserGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff3300,
      transparent: true,
      opacity: 0.92,
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
    if (this.laserEnergy >= this.laserShotCost && (nowSec - this.laserLastFireTime) >= (this.laserFireInterval - 0.001)) {
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

      const isFireLaser = !!ship.hasFireLaser;
      const dmgMultiplier = isFireLaser ? 1.75 : 1.0;
      const effectiveLaserDamage = this.laserDamage * dmgMultiplier;
      // Derive laser carving dimensions dynamically from ship radius so carving volume
      // is just a little bit bigger than ship size regardless of asteroid size (~3.5u for r=2.8,
      // scaling automatically for future larger ships), replacing legacy hardcoded 60u/84u values.
      const shipRadius = (ship && typeof ship.radius === 'number') ? ship.radius : 14.0;
      const carveRadius = (ship && typeof ship.getLaserCarveRadius === 'function')
        ? ship.getLaserCarveRadius(isFireLaser)
        : (shipRadius * (isFireLaser ? 1.4 : 1.25));
      const carveDepth = (ship && typeof ship.getLaserCarveDepth === 'function')
        ? ship.getLaserCarveDepth(isFireLaser)
        : (shipRadius * (isFireLaser ? 1.25 : 1.1));
      const beamSparkColor = isFireLaser ? 0xff5500 : 0x00d4ff;

      const shotId = `laser-${this.network ? this.network.selfId : 'local'}-${Date.now()}`;

      // Spawn visual twin laser beams
      this.spawnTwinLaserBeam(leftEmitter, rightEmitter, hitPoint, true, isFireLaser);
      audio.playLaserShot(true);

      // Resolve Impact
      if (hitTargetType === 'asteroid' && hitTargetObj) {
        this.spawnExplosion(hitPoint, isFireLaser ? 9 : 6, beamSparkColor);
        this.spawnLaserImpactSparks(hitPoint, null, beamSparkColor);
        let dmgResult = null;
        const reducedCarveRadius = carveRadius * 0.464;
        const reducedCarveDepth = carveDepth * 0.464;
        if (typeof this.spaceEnv.damageAsteroid === 'function') {
          // Primary laser requires 50 shots (20 HP / 0.4 damage = 50 shots) to destroy small asteroids or excavate rock volumes (10x less effective)
          const dmgAmount = (hitTargetObj.hp !== undefined && hitTargetObj.hp <= 36) ? (0.4 * dmgMultiplier) : (4.5 * dmgMultiplier);
          dmgResult = this.spaceEnv.damageAsteroid(hitTargetObj, dmgAmount, hitPoint, fwd, reducedCarveRadius, reducedCarveDepth, 16.0, false, 50);
        } else if (typeof this.spaceEnv.carveAsteroid === 'function') {
          const carveResult = this.spaceEnv.carveAsteroid(hitTargetObj, hitPoint, fwd, reducedCarveRadius, reducedCarveDepth, 16.0);
          dmgResult = { carveResult };
        }
        const cRes = dmgResult?.carveResult;
        logger.log('WEAPON_HIT', JSON.stringify({
          weapon: isFireLaser ? 'fire_laser' : 'laser',
          asteroidId: hitTargetObj.id || (hitTargetObj.isMegaAsteroid ? 'mega' : 'asteroid'),
          isMega: !!hitTargetObj.isMegaAsteroid,
          dist: Number(hitDistance.toFixed(1)),
          point: [Number(hitPoint.x.toFixed(1)), Number(hitPoint.y.toFixed(1)), Number(hitPoint.z.toFixed(1))],
          crackStage: dmgResult?.crackStage ?? cRes?.crackStage ?? 0,
          voxelsModified: cRes?.voxelsModified ?? 0,
          isosurfaceCrossed: cRes?.isosurfaceCrossed ?? false,
          totalDensityDelta: cRes?.totalDensityDelta ?? 0
        }));
      } else if (hitTargetType === 'ship' && hitTargetObj) {
        if (typeof ship.recordEngagementHit === 'function') {
          ship.recordEngagementHit();
        }
        this.spawnExplosion(hitPoint, isFireLaser ? 10 : 8, isFireLaser ? 0xff4400 : 0x00ffff);
        this.spawnLaserImpactSparks(hitPoint, null, isFireLaser ? 0xff6600 : 0x00ffff);
        if (this.network && typeof this.network.sendHitTarget === 'function') {
          this.network.sendHitTarget(hitTargetObj, effectiveLaserDamage, 'laser');
        }
      } else if (!hitTargetType) {
        logger.log('WEAPON_MISS', JSON.stringify({
          weapon: isFireLaser ? 'fire_laser' : 'laser',
          origin: [Number(centerOrigin.x.toFixed(1)), Number(centerOrigin.y.toFixed(1)), Number(centerOrigin.z.toFixed(1))],
          dir: [Number(fwd.x.toFixed(2)), Number(fwd.y.toFixed(2)), Number(fwd.z.toFixed(2))],
          maxRange: this.laserMaxRange
        }));
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
          isFireLaser,
          time: now
        });
      }
    }
  }

  spawnTwinLaserBeam(leftOrigin, rightOrigin, hitPoint, isLocal, isFireLaser = false) {
    const group = new THREE.Group();
    const coreMat = isFireLaser ? this.fireLaserCoreMat : (isLocal ? this.localLaserCoreMat : this.remoteLaserCoreMat);
    const glowMat = isFireLaser ? (isLocal ? this.fireLaserGlowMat : this.remoteFireLaserGlowMat) : (isLocal ? this.localLaserGlowMat : this.remoteLaserGlowMat);

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
      life: 0.18,
      maxLife: 0.18,
      isLocal
    });
  }

  spawnRemoteLaserBeam(data, peerId) {
    const isFireLaser = !!data.isFireLaser;
    const leftOrigin = data.leftOrigin
      ? new THREE.Vector3(data.leftOrigin.x, data.leftOrigin.y, data.leftOrigin.z)
      : new THREE.Vector3(data.origin.x, data.origin.y, data.origin.z);

    const rightOrigin = data.rightOrigin
      ? new THREE.Vector3(data.rightOrigin.x, data.rightOrigin.y, data.rightOrigin.z)
      : leftOrigin;

    const hitPoint = data.hitPoint
      ? new THREE.Vector3(data.hitPoint.x, data.hitPoint.y, data.hitPoint.z)
      : leftOrigin.clone().add(new THREE.Vector3(data.dir.x, data.dir.y, data.dir.z).multiplyScalar(500));

    this.spawnTwinLaserBeam(leftOrigin, rightOrigin, hitPoint, false, isFireLaser);
    audio.playLaserShot(false, leftOrigin);

    if (data.targetType === 'asteroid') {
      const sparkCol = isFireLaser ? 0xff5500 : 0xff0066;
      this.spawnExplosion(hitPoint, isFireLaser ? 9 : 6, sparkCol);
      this.spawnLaserImpactSparks(hitPoint, null, sparkCol);
    }
  }

  /**
   * Secondary Weapon: Dual-Mode Missile (Guided with 3s Lock + Unguided Dumb-Fire)
   * Tracks locked target when lock-on achieved; otherwise fires straight ahead as dumb-fire.
   * Blasts massive crater chunks when impacting asteroids!
   */
  triggerSecondary(isHolding, ship, now) {
    if (!isHolding || ship.isDead) return false;

    const nowSec = now > 1000 ? now * 0.001 : now;
    if ((nowSec - this.missileLastFireTime) < this.missileFireCooldown) return false;
    this.missileLastFireTime = nowSec;

    if (typeof ship.breakInvisibility === 'function') {
      ship.breakInvisibility();
    }

    let targetId = null;
    let isLocked = false;
    if (this.lockSystem.isLocked && this.lockSystem.currentTargetId) {
      targetId = this.lockSystem.consumeLock();
      isLocked = true;
    }

    const fwd = ship.getForwardVector();
    const origin = ship.position.clone()
      .addScaledVector(fwd, 3.5)
      .add(new THREE.Vector3(0, -0.4, 0));

    const shipVel = (ship && ship.velocity) ? ship.velocity.clone() : new THREE.Vector3(0, 0, 0);
    const missileId = `missile-${this.network ? this.network.selfId : 'local'}-${Date.now()}`;
    this.spawnMissile(origin, fwd, targetId, true, missileId, shipVel);
    audio.playMissileLaunch(true);

    if (isLocked) {
      logger.log('WEAPON', `🚀 Guided Homing Missile LAUNCHED tracking target [${targetId.slice(0, 5)}]`);
    } else {
      logger.log('WEAPON', `🚀 Unguided Dumb-Fire Missile LAUNCHED straight ahead`);
    }

    if (this.network && typeof this.network.broadcastMissile === 'function') {
      this.network.broadcastMissile({
        id: missileId,
        origin: { x: origin.x, y: origin.y, z: origin.z },
        dir: { x: fwd.x, y: fwd.y, z: fwd.z },
        velocity: { x: shipVel.x, y: shipVel.y, z: shipVel.z },
        targetPeerId: targetId,
        time: now
      });
    }
    return true;
  }

  spawnMissile(origin, dir, targetId = null, isLocal = true, id = null, initialVelocity = null, ownerId = null) {
    const normDir = dir.clone().normalize();
    const group = new THREE.Group();
    group.position.copy(origin);
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normDir);

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

    let initVelVec = null;
    if (initialVelocity) {
      initVelVec = (initialVelocity instanceof THREE.Vector3)
        ? initialVelocity.clone()
        : new THREE.Vector3(initialVelocity.x || 0, initialVelocity.y || 0, initialVelocity.z || 0);
    }
    const fwdSpeed = initVelVec ? Math.max(0, initVelVec.dot(normDir)) : 0;
    const lateralVelocity = initVelVec
      ? initVelVec.clone().addScaledVector(normDir, - initVelVec.dot(normDir))
      : new THREE.Vector3(0, 0, 0);

    const guidance = new StandardPursuitGuidance({
      initialVelocity: initVelVec,
      launchDir: normDir,
      inheritedSpeed: fwdSpeed
    });

    const instantaneousVel = normDir.clone().multiplyScalar(guidance.currentSpeed).add(lateralVelocity);

    const missile = {
      group,
      dir: normDir,
      velocity: instantaneousVel,
      initialVelocity: initVelVec ? initVelVec.clone() : new THREE.Vector3(0, 0, 0),
      lateralVelocity,
      guidance,
      targetId,
      isLocal,
      id,
      ownerId: ownerId || (isLocal ? (this.network ? this.network.selfId : 'local') : null),
      life: 9.0 // 9 seconds fuel
    };

    this.missiles.push(missile);
    return missile;
  }

  spawnRemoteMissile(data, peerId) {
    const origin = new THREE.Vector3(data.origin.x, data.origin.y, data.origin.z);
    const dir = new THREE.Vector3(data.dir.x, data.dir.y, data.dir.z);
    const initialVelocity = data.velocity
      ? new THREE.Vector3(data.velocity.x || 0, data.velocity.y || 0, data.velocity.z || 0)
      : new THREE.Vector3(0, 0, 0);
    this.spawnMissile(origin, dir, data.targetPeerId, false, data.id, initialVelocity, peerId);
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
    const group = new THREE.Group();
    group.position.copy(pos);
    group.visible = false; // Mock container to avoid rendering low-poly geometries in WebGL

    // Lightweight mock objects for compatibility with unit tests and queries without GPU allocations
    const fireball = {
      scale: new THREE.Vector3(1, 1, 1),
      position: new THREE.Vector3(),
      material: { opacity: 0.95 },
      frustumCulled: false,
      visible: false
    };
    const ring = {
      scale: new THREE.Vector3(1, 1, 1),
      position: new THREE.Vector3(),
      rotation: new THREE.Euler(),
      material: { opacity: 0.90 },
      frustumCulled: false,
      visible: false
    };
    const sparkCount = radius > 15 ? 12 : 6;
    const sparks = [];
    for (let s = 0; s < sparkCount; s++) {
      sparks.push({
        mesh: {
          position: pos.clone(),
          scale: new THREE.Vector3(1, 1, 1),
          material: { opacity: 0.95 },
          frustumCulled: false,
          visible: false
        },
        vel: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize().multiplyScalar((radius * 1.5) + Math.random() * (radius * 1.8))
      });
    }

    audio.playExplosion(radius > 15 ? 1.6 : 0.85, pos);

    if (this.spaceEnv && typeof this.spaceEnv.triggerCombatFlash === 'function') {
      this.spaceEnv.triggerCombatFlash(pos, color, radius > 15 ? 4.5 : 2.5);
    }

    this.explosions.push({
      group,
      mesh: group, // Backwards compatibility for tests and queries
      fireball,
      ring,
      sparks,
      maxLife: 0.55,
      life: 0.55,
      maxRadius: radius
    });

    // Rich GPU InstancedMesh burst: multi-stage core, fireball, shockwave ring, sparks & smoke
    this._spawnInstancedExplosionBurst(pos, radius, color);
  }

  _spawnInstancedExplosionBurst(pos, radius, colorHex) {
    if (!this.explosionQuads) this.explosionQuads = [];
    const baseColor = new THREE.Color(colorHex);
    const mult = this.particleDensity === 'balanced' ? 1.0 : (this.particleDensityMultiplier || 1.0);

    // Multi-stage InstancedMesh particle allocations
    // Stage 1: Blinding white-yellow incandescent core quads expanding rapidly
    const coreCount = Math.max(1, Math.round((radius > 15 ? 26 : 14) * mult));
    for (let i = 0; i < coreCount; i++) {
      if (this.explosionQuads.length >= this.maxExplosionQuads) this.explosionQuads.shift();
      const dir = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      const speed = (radius * 0.4) + Math.random() * (radius * 0.8);
      const life = 0.35 + Math.random() * 0.20;
      this.explosionQuads.push({
        pos: pos.clone().addScaledVector(dir, Math.random() * (radius * 0.15)),
        vel: dir.multiplyScalar(speed),
        life,
        maxLife: life,
        baseScale: radius * 0.70 + Math.random() * (radius * 0.45),
        type: 'core',
        color: new THREE.Color(0xffffff)
      });
    }

    // Stage 2A: Expanding shockwave ring quads (arranged planar with random normal tilt)
    const ringCount = Math.max(1, Math.round((radius > 15 ? 36 : 20) * mult));
    const ringNormal = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();
    const ringU = new THREE.Vector3();
    if (Math.abs(ringNormal.y) < 0.9) ringU.crossVectors(ringNormal, new THREE.Vector3(0, 1, 0)).normalize();
    else ringU.crossVectors(ringNormal, new THREE.Vector3(1, 0, 0)).normalize();
    const ringV = new THREE.Vector3().crossVectors(ringNormal, ringU).normalize();

    for (let i = 0; i < ringCount; i++) {
      if (this.explosionQuads.length >= this.maxExplosionQuads) this.explosionQuads.shift();
      const angle = (i / ringCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
      const radDir = new THREE.Vector3()
        .addScaledVector(ringU, Math.cos(angle))
        .addScaledVector(ringV, Math.sin(angle))
        .normalize();
      const ringSpeed = (radius * 2.2) + Math.random() * (radius * 1.5);
      const life = 0.42 + Math.random() * 0.22;
      this.explosionQuads.push({
        pos: pos.clone().addScaledVector(radDir, radius * 0.15),
        vel: radDir.multiplyScalar(ringSpeed),
        life,
        maxLife: life,
        baseScale: radius * 0.42 + Math.random() * (radius * 0.25),
        type: 'ring',
        color: new THREE.Color(0xffaa22)
      });
    }

    // Stage 2B: Volumetric fireball plasma puffs
    const fireballCount = Math.max(1, Math.round((radius > 15 ? 42 : 22) * mult));
    for (let i = 0; i < fireballCount; i++) {
      if (this.explosionQuads.length >= this.maxExplosionQuads) this.explosionQuads.shift();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2.0 * Math.random() - 1.0);
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      );
      const speed = (radius * 1.1) + Math.random() * (radius * 1.8);
      const life = 0.48 + Math.random() * 0.28;
      this.explosionQuads.push({
        pos: pos.clone().addScaledVector(dir, Math.random() * (radius * 0.25)),
        vel: dir.multiplyScalar(speed),
        life,
        maxLife: life,
        baseScale: radius * 0.50 + Math.random() * (radius * 0.35),
        type: 'fireball',
        color: baseColor.clone()
      });
    }

    // Stage 3A: High-velocity radial incandescent sparks
    const sparkCount = Math.max(1, Math.round((radius > 15 ? 35 : 18) * mult));
    for (let i = 0; i < sparkCount; i++) {
      if (this.explosionQuads.length >= this.maxExplosionQuads) this.explosionQuads.shift();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2.0 * Math.random() - 1.0);
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      );
      const speed = (radius * 3.2) + Math.random() * (radius * 4.5);
      const life = 0.28 + Math.random() * 0.26;
      this.explosionQuads.push({
        pos: pos.clone(),
        vel: dir.multiplyScalar(speed),
        life,
        maxLife: life,
        baseScale: 1.2 + Math.random() * 1.4,
        type: 'spark',
        color: new THREE.Color(0xffe066)
      });
    }

    // Stage 3B: Dark smoke outer puffs
    const smokeCount = Math.max(1, Math.round((radius > 15 ? 20 : 10) * mult));
    for (let i = 0; i < smokeCount; i++) {
      if (this.explosionQuads.length >= this.maxExplosionQuads) this.explosionQuads.shift();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2.0 * Math.random() - 1.0);
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      );
      const speed = (radius * 0.6) + Math.random() * (radius * 0.9);
      const life = 0.70 + Math.random() * 0.45;
      this.explosionQuads.push({
        pos: pos.clone().addScaledVector(dir, Math.random() * (radius * 0.3)),
        vel: dir.multiplyScalar(speed),
        life,
        maxLife: life,
        baseScale: radius * 0.55 + Math.random() * (radius * 0.4),
        type: 'smoke',
        color: new THREE.Color(0x332822)
      });
    }
  }

  spawnLaserImpactSparks(pos, normal = null, colorHex = 0x00d4ff) {
    if (!this.explosionQuads) this.explosionQuads = [];
    const mult = this.particleDensity === 'balanced' ? 1.0 : (this.particleDensityMultiplier || 1.0);
    const count = Math.max(1, Math.round(14 * mult));
    const baseColor = new THREE.Color(colorHex);
    for (let i = 0; i < count; i++) {
      if (this.explosionQuads.length >= this.maxExplosionQuads) {
        this.explosionQuads.shift();
      }
      const dir = new THREE.Vector3(
        (Math.random() - 0.5),
        (Math.random() - 0.5),
        (Math.random() - 0.5)
      ).normalize();
      if (normal) {
        dir.addScaledVector(normal, 1.2).normalize();
      }
      const speed = 25.0 + Math.random() * 45.0;
      const life = 0.2 + Math.random() * 0.25;
      this.explosionQuads.push({
        pos: pos.clone(),
        vel: dir.multiplyScalar(speed),
        life,
        maxLife: life,
        baseScale: 1.5 + Math.random() * 1.8,
        isCore: false,
        color: baseColor.clone()
      });
    }
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

  update(dt, localShip, remoteShipsMap, onDamageEvent, camera = null) {
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

      // Dynamic separation speed enforcement so starfighters can never overtake missiles
      if (m.isLocal && localShip && !localShip.isDead) {
        const shipSpeed = localShip.velocity
          ? Math.max(localShip.velocity.length(), localShip.velocity.dot(m.dir))
          : (typeof localShip.getSpeed === 'function' ? localShip.getSpeed() : 0);
        m.guidance.ensureSeparationSpeed(shipSpeed);
      } else if (!m.isLocal && m.ownerId && remoteShipsMap && remoteShipsMap.has(m.ownerId)) {
        const remoteOwner = remoteShipsMap.get(m.ownerId);
        if (remoteOwner) {
          const remoteSpeed = remoteOwner.velocity
            ? (typeof remoteOwner.velocity.length === 'function' ? remoteOwner.velocity.length() : Math.hypot(remoteOwner.velocity.x || 0, remoteOwner.velocity.y || 0, remoteOwner.velocity.z || 0))
            : (typeof remoteOwner.getSpeed === 'function' ? remoteOwner.getSpeed() : 0);
          if (remoteSpeed > 0) {
            m.guidance.ensureSeparationSpeed(remoteSpeed);
          }
        }
      }

      // Find locked target position
      let targetPos = null;
      if (m.targetId === (this.network ? this.network.selfId : null)) {
        targetPos = (localShip && !localShip.isDead) ? localShip.position : null;
      } else if (remoteShipsMap && remoteShipsMap.has(m.targetId)) {
        const remote = remoteShipsMap.get(m.targetId);
        if (remote && !remote.isDead) targetPos = remote.position;
      }

      // If target exists, guide missile towards target; otherwise continue straight
      if (targetPos) {
        const steering = m.guidance.steer(dt, m.group.position, m.dir, targetPos);
        m.dir.copy(steering.newDir);
        m.group.position.addScaledVector(m.dir, steering.speed * dt);
      } else {
        const speed = m.guidance.accelerate(dt);
        m.group.position.addScaledVector(m.dir, speed * dt);
      }

      // Lateral velocity integration and aerodynamic damping
      if (m.lateralVelocity && m.lateralVelocity.lengthSq() > 0.0001) {
        m.group.position.addScaledVector(m.lateralVelocity, dt);
        m.lateralVelocity.multiplyScalar(Math.pow(0.85, dt * 60));
      }

      // Instantaneous 3D velocity vector update
      if (m.velocity) {
        m.velocity.copy(m.dir).multiplyScalar(m.guidance.currentSpeed);
        if (m.lateralVelocity) {
          m.velocity.add(m.lateralVelocity);
        }
      }

      m.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), m.dir);

      // Rocket fire trail billowing behind missile
      const tailPos = m.group.position.clone().addScaledVector(m.dir, -1.5);
      this.fireTrails.emit(tailPos, m.dir, 3);

      let detonated = false;

      // Asteroid collision: MISSILE BLASTS MASSIVE CRATER CHUNK!
      const hitAsteroid = this.spaceEnv.checkCollision(m.group.position, 1.8);
      if (hitAsteroid) {
        this.spawnExplosion(m.group.position, 22, 0xff5500);
        let dmgResult = null;
        if (m.isLocal) {
          if (typeof this.spaceEnv.damageAsteroid === 'function') {
            dmgResult = this.spaceEnv.damageAsteroid(hitAsteroid, 50.0, m.group.position, m.dir, 55.0, 45.0, 160.0);
          } else if (typeof this.spaceEnv.carveAsteroid === 'function') {
            const carveResult = this.spaceEnv.carveAsteroid(hitAsteroid, m.group.position, m.dir, 55.0, 45.0, 160.0);
            dmgResult = { carveResult };
          }
        }
        const cRes = dmgResult?.carveResult;
        logger.log('WEAPON_HIT', JSON.stringify({
          weapon: 'missile',
          asteroidId: hitAsteroid.id || (hitAsteroid.isMegaAsteroid ? 'mega' : 'asteroid'),
          isMega: !!hitAsteroid.isMegaAsteroid,
          point: [Number(m.group.position.x.toFixed(1)), Number(m.group.position.y.toFixed(1)), Number(m.group.position.z.toFixed(1))],
          voxelsModified: cRes?.voxelsModified ?? 0,
          isosurfaceCrossed: cRes?.isosurfaceCrossed ?? false,
          totalDensityDelta: cRes?.totalDensityDelta ?? 0
        }));
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

      // Hit Remote Target (Guided locked target or unguided dumb-fire proximity hit)
      if (!detonated && m.isLocal) {
        if (m.targetId && remoteShipsMap.has(m.targetId)) {
          const remote = remoteShipsMap.get(m.targetId);
          if (!remote.isDead && m.group.position.distanceToSquared(remote.position) < 24.0) {
            this.spawnExplosion(m.group.position, 20, 0xff2200);
            if (this.network && typeof this.network.sendHitTarget === 'function') {
              this.network.sendHitTarget(m.targetId, this.missileDamage, 'missile');
            }
            detonated = true;
          }
        } else if (!m.targetId && remoteShipsMap) {
          for (const [peerId, remote] of remoteShipsMap.entries()) {
            if (!remote.isDead && m.group.position.distanceToSquared(remote.position) < 24.0) {
              this.spawnExplosion(m.group.position, 20, 0xff2200);
              if (this.network && typeof this.network.sendHitTarget === 'function') {
                this.network.sendHitTarget(peerId, this.missileDamage, 'missile');
              }
              detonated = true;
              break;
            }
          }
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
        if (p.isLocal && typeof this.spaceEnv.carveAsteroid === 'function') {
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

    // 6. Update Multi-Stage Explosions (fireball, shockwave ring, spark plume)
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const exp = this.explosions[i];
      exp.life -= dt;
      if (exp.life <= 0) {
        if (exp.group && exp.group.parent) {
          exp.group.parent.remove(exp.group);
        } else if (exp.mesh && exp.mesh.parent) {
          exp.mesh.parent.remove(exp.mesh);
        }
        this.explosions.splice(i, 1);
        continue;
      }
      const progress = 1.0 - (exp.life / exp.maxLife);
      const fade = exp.life / exp.maxLife;

      // Stage 1: Expanding fireball
      if (exp.fireball) {
        const fbScale = 1.0 + progress * 2.4;
        exp.fireball.scale.set(fbScale, fbScale, fbScale);
        if (exp.fireball.material) {
          exp.fireball.material.opacity = Math.max(0, fade * 0.95);
        }
      } else if (exp.mesh && exp.mesh.material) {
        const scale = 1.0 + progress * 2.2;
        exp.mesh.scale.set(scale, scale, scale);
        exp.mesh.material.opacity = fade * 0.9;
      }

      // Stage 2: Rapid shockwave ring expansion
      if (exp.ring) {
        const ringScale = 1.0 + progress * 4.2;
        exp.ring.scale.set(ringScale, ringScale, ringScale);
        if (exp.ring.material) {
          exp.ring.material.opacity = Math.max(0, (1.0 - progress) * 0.85);
        }
      }

      // Stage 3: Radial spark plume dispersal
      if (exp.sparks) {
        for (let s = 0; s < exp.sparks.length; s++) {
          const spark = exp.sparks[s];
          spark.mesh.position.addScaledVector(spark.vel, dt);
          spark.vel.multiplyScalar(Math.pow(0.90, dt * 60));
          if (spark.mesh.material) {
            spark.mesh.material.opacity = Math.max(0, (1.0 - progress) * 0.9);
          }
        }
      }
    }

    // 7. Update GPU Instanced Explosions & Laser Sparks
    const prevQuadCount = this._prevExplosionQuadCount || 0;
    if ((this.explosionQuads && this.explosionQuads.length > 0) || prevQuadCount > 0) {
      const expCamQuat = (camera && camera.quaternion) ? camera.quaternion : _camQuat.identity();
      for (let i = this.explosionQuads.length - 1; i >= 0; i--) {
        const q = this.explosionQuads[i];
        q.life -= dt;
        if (q.life <= 0) {
          this.explosionQuads.splice(i, 1);
          continue;
        }
        q.pos.addScaledVector(q.vel, dt);
        q.vel.multiplyScalar(Math.pow(0.88, dt * 60));
        q.pos.x += Math.sin(q.pos.y * 0.3 + q.life * 4.0) * 0.6 * dt;
        q.pos.y += Math.cos(q.pos.x * 0.3 + q.life * 4.0) * 0.6 * dt;
        q.pos.z += Math.sin(q.pos.z * 0.3 + q.life * 4.0) * 0.6 * dt;
      }

      const activeQuadCount = this.explosionQuads.length;
      for (let i = 0; i < activeQuadCount; i++) {
        const q = this.explosionQuads[i];
        const progress = 1.0 - (q.life / q.maxLife);
        const fade = q.life / q.maxLife;

        let scale = q.baseScale;
        if (q.type === 'core') {
          scale = q.baseScale * (1.0 + progress * 3.2);
          if (progress < 0.3) {
            _color.setRGB(1.0 * fade, 0.98 * fade, 0.9 * fade);
          } else {
            _color.setRGB(1.0 * fade, 0.7 * fade, 0.2 * fade);
          }
        } else if (q.type === 'ring') {
          scale = q.baseScale * (1.0 + progress * 4.5);
          _color.copy(q.color).multiplyScalar(fade * (1.0 - progress * 0.4) * 1.5);
        } else if (q.type === 'fireball') {
          scale = q.baseScale * (1.0 + progress * 2.8);
          _color.copy(q.color).multiplyScalar(fade * 1.4);
        } else if (q.type === 'spark') {
          scale = q.baseScale * Math.max(0.2, 1.0 - progress * 0.7);
          _color.copy(q.color).multiplyScalar(fade * 2.0);
        } else if (q.type === 'smoke') {
          scale = q.baseScale * (1.0 + progress * 3.8);
          const smokeFade = Math.sin(progress * Math.PI) * 0.4;
          _color.copy(q.color).multiplyScalar(smokeFade);
        } else {
          // fallback (e.g. laser sparks)
          scale = q.baseScale * (1.0 + progress * 2.5);
          _color.copy(q.color).multiplyScalar(fade * 1.5);
        }

        _dummy.position.copy(q.pos);
        _dummy.quaternion.copy(expCamQuat);
        _dummy.scale.set(scale, scale, scale);
        _dummy.updateMatrix();
        this.explosionMesh.setMatrixAt(i, _dummy.matrix);
        this.explosionMesh.setColorAt(i, _color);
      }

      for (let i = activeQuadCount; i < prevQuadCount; i++) {
        this.explosionMesh.setMatrixAt(i, _hideMatrix);
      }

      if (activeQuadCount > 0 || prevQuadCount > 0) {
        this.explosionMesh.instanceMatrix.needsUpdate = true;
        if (this.explosionMesh.instanceColor) {
          this.explosionMesh.instanceColor.needsUpdate = true;
        }
      }
      this._prevExplosionQuadCount = activeQuadCount;
    }

    // 8. Update Fire Trails
    this.fireTrails.update(dt, camera);
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
    for (const e of this.explosions) {
      if (e.group && e.group.parent) e.group.parent.remove(e.group);
      else if (e.mesh && e.mesh.parent) e.mesh.parent.remove(e.mesh);
    }
    if (this.explosionMesh) {
      if (this.explosionMesh.parent) this.explosionMesh.parent.remove(this.explosionMesh);
      if (this.explosionPlaneGeo) this.explosionPlaneGeo.dispose();
      if (this.explosionGlowTex) this.explosionGlowTex.dispose();
      if (this.explosionMat) this.explosionMat.dispose();
    }
    if (this.fireLaserCoreMat) this.fireLaserCoreMat.dispose();
    if (this.fireLaserGlowMat) this.fireLaserGlowMat.dispose();
    if (this.remoteFireLaserGlowMat) this.remoteFireLaserGlowMat.dispose();
    this.fireTrails.cleanup();
  }
}
