import * as THREE from 'three';
import { audio } from './audio.js';
import { logger } from '../utils/logger.js';
import { createRadialGlowTexture } from './trail.js';

// Module-level scratch objects for GPU InstancedMesh particles
const _meteorDummy = new THREE.Object3D();
const _meteorColor = new THREE.Color();
const _meteorCamQuat = new THREE.Quaternion();
const _meteorHideMat = new THREE.Matrix4().makeScale(0, 0, 0);

/**
 * Fiery Meteor Hazard System
 * Generates a periodic blazing meteor every 10 seconds that streaks across
 * the sector, transferring explosive kinetic momentum into asteroids and
 * completely incinerating ships on collision.
 */
export class MeteorSystem {
  constructor(scene, spaceEnv, options = {}) {
    this.scene = scene;
    this.spaceEnv = spaceEnv;

    const freq = typeof options === 'number'
      ? options
      : (options?.frequency !== undefined ? options.frequency : 10.0);
    this.spawnInterval = freq;
    this.enabled = freq > 0;
    this.spawnTimer = 4.0; // First meteor enters 4s after spawn

    this.activeMeteor = null;

    // Pre-allocated GPU InstancedMesh for the meteor's roaring fire & smoke trail
    this.maxParticles = 250;
    this.particles = [];
    this.trailPlaneGeo = new THREE.PlaneGeometry(1, 1);
    this.glowTexture = createRadialGlowTexture(64);

    this.trailMat = new THREE.MeshBasicMaterial({
      map: this.glowTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    this.trailMesh = new THREE.InstancedMesh(this.trailPlaneGeo, this.trailMat, this.maxParticles);
    this.trailMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.trailMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles * 3), 3);
    this.trailMesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
    this.trailMesh.frustumCulled = false;

    // Backwards compatibility
    this.trailPoints = this.trailMesh;
    this.trailPositions = new Float32Array(this.maxParticles * 3);
    this.trailColors = new Float32Array(this.maxParticles * 3);

    for (let i = 0; i < this.maxParticles; i++) {
      this.trailMesh.setMatrixAt(i, _meteorHideMat);
    }
    this.trailMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(this.trailMesh);

    // Pre-allocated GPU InstancedMesh for meteor impact explosions
    this.maxExplosionQuads = 200;
    this.explosionQuads = [];
    this.explosionMat = new THREE.MeshBasicMaterial({
      map: this.glowTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.explosionMesh = new THREE.InstancedMesh(this.trailPlaneGeo, this.explosionMat, this.maxExplosionQuads);
    this.explosionMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.explosionMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(this.maxExplosionQuads * 3), 3);
    this.explosionMesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
    this.explosionMesh.frustumCulled = false;
    for (let i = 0; i < this.maxExplosionQuads; i++) {
      this.explosionMesh.setMatrixAt(i, _meteorHideMat);
    }
    this.explosionMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(this.explosionMesh);
  }

  spawnMeteor() {
    if (this.activeMeteor) return;

    // 1. Coordinates: Outside asteroid sector at radius 6500-7000u
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2.0 * Math.random() - 1.0);
    const spawnDist = 6500 + Math.random() * 500;

    const spawnPos = new THREE.Vector3(
      spawnDist * Math.sin(phi) * Math.cos(theta),
      spawnDist * Math.sin(phi) * Math.sin(theta) * 0.4,
      spawnDist * Math.cos(phi)
    );

    // 2. Trajectory: Heading across the central colossus or orbital belt
    let targetPos = new THREE.Vector3(
      (Math.random() - 0.5) * 600,
      (Math.random() - 0.5) * 300,
      (Math.random() - 0.5) * 600
    );

    if (this.spaceEnv && this.spaceEnv.asteroids.length > 1 && Math.random() < 0.45) {
      const luckyIdx = Math.floor(1 + Math.random() * (this.spaceEnv.asteroids.length - 1));
      const luckyAsteroid = this.spaceEnv.asteroids[luckyIdx];
      if (luckyAsteroid) {
        targetPos.copy(luckyAsteroid.position);
      }
    }

    const dir = targetPos.clone().sub(spawnPos).normalize();
    const speed = 260; // Roaring speed across sector
    const velocity = dir.clone().multiplyScalar(speed);
    const radius = 56.0; // Asteroid-sized massive planetary impactor
    const mass = 1200000; // Colossal planetary mass

    // 3. 3D Model: Molten craggy rock core with glowing lava crust & roaring fire aura
    const group = new THREE.Group();
    group.position.copy(spawnPos);

    const coreGeom = new THREE.DodecahedronGeometry(radius, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1a0802,
      emissive: 0xff3300,
      emissiveIntensity: 4.2,
      roughness: 0.88,
      metalness: 0.25
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    group.add(coreMesh);

    // Blazing white-hot incandescent inner core
    const coronaGeom = new THREE.SphereGeometry(radius * 0.75, 16, 12);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const coronaMesh = new THREE.Mesh(coronaGeom, coronaMat);
    group.add(coronaMesh);

    // Surrounding raging turbulent fire envelope (fire around the asteroid)
    const fireEnvelopeGeom = new THREE.IcosahedronGeometry(radius * 1.25, 2);
    const fireEnvelopeMat = new THREE.MeshBasicMaterial({
      color: 0xff4400,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const fireEnvelopeMesh = new THREE.Mesh(fireEnvelopeGeom, fireEnvelopeMat);
    group.add(fireEnvelopeMesh);

    // Outer blazing yellow plasma halo
    const haloGeom = new THREE.IcosahedronGeometry(radius * 1.40, 2);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const haloMesh = new THREE.Mesh(haloGeom, haloMat);
    group.add(haloMesh);

    this.scene.add(group);

    this.activeMeteor = {
      group,
      coreMesh,
      fireEnvelopeMesh,
      haloMesh,
      position: group.position,
      velocity,
      dir,
      speed,
      radius,
      mass,
      flybyPlayed: false,
      age: 0
    };

    // Activate pre-allocated sector meteor light
    if (this.spaceEnv && this.spaceEnv.meteorLight) {
      this.spaceEnv.meteorLight.intensity = 4.5;
      this.spaceEnv.meteorLight.position.copy(spawnPos);
    }

    logger.log('METEOR', `Flaming meteor entered sector at (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.y)}, ${Math.round(spawnPos.z)}) heading speed ${speed} u/s`);
  }

  update(dt, playerShip, remoteShipsMap, onPlayerKilled, camera = null) {
    // 1. Periodic spawn timer
    if (this.enabled && this.spawnInterval > 0) {
      this.spawnTimer += dt;
      if (this.spawnTimer >= this.spawnInterval) {
        this.spawnTimer = 0;
        this.spawnMeteor();
      }
    }

    // 2. Update active meteor
    if (this.activeMeteor) {
      const m = this.activeMeteor;
      m.age += dt;

      // Kinematic translation & fire aura churning
      m.position.addScaledVector(m.velocity, dt);
      m.coreMesh.rotation.x += dt * 1.8;
      m.coreMesh.rotation.y += dt * 2.2;

      // Roaring fire envelopes counter-rotate with turbulent pulsing
      if (m.fireEnvelopeMesh) {
        m.fireEnvelopeMesh.rotation.x -= dt * 3.5;
        m.fireEnvelopeMesh.rotation.z += dt * 4.0;
        const pulse = 1.0 + Math.sin(m.age * 14.0) * 0.06;
        m.fireEnvelopeMesh.scale.set(pulse, pulse, pulse);
      }
      if (m.haloMesh) {
        m.haloMesh.rotation.y += dt * 2.8;
        m.haloMesh.rotation.z -= dt * 2.5;
        const haloPulse = 1.0 + Math.cos(m.age * 10.0) * 0.08;
        m.haloMesh.scale.set(haloPulse, haloPulse, haloPulse);
      }

      // Sync pre-allocated meteor light
      if (this.spaceEnv && this.spaceEnv.meteorLight) {
        this.spaceEnv.meteorLight.position.copy(m.position);
      }

      // Emit turbulent massive fire and smoke plume behind the asteroid
      this.emitTrailParticles(m.position, m.dir, 6);

      // Cockpit flyby audio trigger
      if (!m.flybyPlayed && playerShip && !playerShip.isDead) {
        const distToCockpit = m.position.distanceTo(playerShip.position);
        if (distToCockpit < 450) {
          m.flybyPlayed = true;
          audio.playMeteorFlyby(m.position);
        }
      }

      let destroyed = false;

      // Collision Check 1: Against Asteroids
      for (let i = 0; i < this.spaceEnv.asteroids.length; i++) {
        const a = this.spaceEnv.asteroids[i];
        const distSq = m.position.distanceToSquared(a.position);
        const minDist = a.radius + m.radius;

        if (distSq < minDist * minDist) {
          const isMega = (a.radius >= 2500 || a.isMegaAsteroid);
          if (isMega) {
            // Stationary Mega-Asteroid: blast massive crater without shifting its position
            logger.log('METEOR', 'Meteor IMPACT with Central Mega-Asteroid! Blasting massive crater.');
            const hitPoint = m.position.clone();
            const hitDir = m.dir.clone();
            if (typeof this.spaceEnv.carveAsteroid === 'function') {
              this.spaceEnv.carveAsteroid(a, hitPoint, hitDir, 130.0, 90.0);
            }
            this.triggerExplosion(m.position, 65, 0xff3300);
          } else {
            // Deliver clamped kinetic momentum impulse to the belt asteroid
            const normal = a.position.clone().sub(m.position).normalize();
            const rawImpulse = (m.mass / Math.max(1, a.mass)) * m.speed * 1.8;
            const impactImpulse = Math.min(30.0, rawImpulse);
            a.velocity.addScaledVector(normal, impactImpulse);

            // Cap asteroid velocity to physically plausible limit
            if (a.velocity.length() > 40.0) {
              a.velocity.setLength(40.0);
            }

            // Also carve crater into belt asteroid if MarchingCubes
            if (typeof this.spaceEnv.carveAsteroid === 'function') {
              this.spaceEnv.carveAsteroid(a, m.position.clone(), m.dir.clone(), 36.0, 25.0);
            }

            // Give the asteroid a violent rotational kick
            a.rotationSpeed.add(new THREE.Vector3(
              (Math.random() - 0.5) * 1.2,
              (Math.random() - 0.5) * 1.2,
              (Math.random() - 0.5) * 1.2
            ));

            logger.log('METEOR', `Meteor IMPACT with belt asteroid! Transferred impulse ${Math.round(impactImpulse)} u/s`);
            this.triggerExplosion(m.position, 28, 0xff5500);
          }
          destroyed = true;
          break;
        }
      }

      // Collision Check 2: Against Local Player Ship
      if (!destroyed && playerShip && !playerShip.isDead) {
        const distToShip = m.position.distanceTo(playerShip.position);
        const shipRadius = 3.2;
        if (distToShip < (m.radius + shipRadius)) {
          logger.log('METEOR', 'Meteor DIRECT HIT on player ship! Instant lethal incineration.');
          this.triggerExplosion(m.position, 36, 0xff2200);
          playerShip.takeDamage(1000, true); // Fatal damage bypassing shields & invuln
          if (onPlayerKilled) {
            onPlayerKilled('🔥 Incinerated by rogue flaming meteor!');
          }
          destroyed = true;
        }
      }

      // Collision Check 3: Against Remote Opponent Ships
      if (!destroyed && remoteShipsMap) {
        for (const [peerId, remote] of remoteShipsMap.entries()) {
          if (!remote.isDead && m.position.distanceTo(remote.position) < (m.radius + 3.2)) {
            logger.log('METEOR', `Meteor DIRECT HIT on remote ship ${peerId.slice(0, 5)}!`);
            this.triggerExplosion(m.position, 36, 0xff2200);
            remote.takeDamage?.(1000);
            destroyed = true;
            break;
          }
        }
      }

      // Clean despawn when meteor passes outside the sector boundary (r > 8000)
      if (!destroyed && m.position.length() > 8000) {
        destroyed = true;
      }

      if (destroyed) {
        this.destroyMeteor();
      }
    }

    // 3. Update trailing particle plume
    this.updateTrailParticles(dt, camera);

    // 4. Update GPU Instanced Meteor Impact Explosions
    if (this.explosionQuads && this.explosionQuads.length > 0) {
      if (camera && camera.quaternion) {
        _meteorCamQuat.copy(camera.quaternion);
      } else {
        _meteorCamQuat.identity();
      }
      for (let i = this.explosionQuads.length - 1; i >= 0; i--) {
        const q = this.explosionQuads[i];
        q.life -= dt;
        if (q.life <= 0) {
          this.explosionQuads.splice(i, 1);
          continue;
        }
        q.pos.addScaledVector(q.vel, dt);
        q.vel.multiplyScalar(Math.pow(0.88, dt * 60));
        q.pos.x += Math.sin(q.pos.y * 0.2 + q.life * 4.0) * 0.8 * dt;
        q.pos.y += Math.cos(q.pos.x * 0.2 + q.life * 4.0) * 0.8 * dt;
        q.pos.z += Math.sin(q.pos.z * 0.2 + q.life * 4.0) * 0.8 * dt;
      }

      const activeQuadCount = this.explosionQuads.length;
      for (let i = 0; i < activeQuadCount; i++) {
        const q = this.explosionQuads[i];
        const progress = 1.0 - (q.life / q.maxLife);
        const fade = q.life / q.maxLife;
        const scale = q.baseScale * (1.0 + progress * 2.5);

        _meteorDummy.position.copy(q.pos);
        _meteorDummy.quaternion.copy(_meteorCamQuat);
        _meteorDummy.scale.set(scale, scale, scale);
        _meteorDummy.updateMatrix();
        this.explosionMesh.setMatrixAt(i, _meteorDummy.matrix);

        if (q.isCore) {
          if (progress < 0.25) {
            _meteorColor.setRGB(1.0 * fade, 0.95 * fade, 0.8 * fade);
          } else {
            _meteorColor.copy(q.color).multiplyScalar(fade * 1.2);
          }
        } else {
          _meteorColor.copy(q.color).multiplyScalar(fade * 1.5);
        }
        this.explosionMesh.setColorAt(i, _meteorColor);
      }

      for (let i = activeQuadCount; i < this.maxExplosionQuads; i++) {
        this.explosionMesh.setMatrixAt(i, _meteorHideMat);
      }

      this.explosionMesh.instanceMatrix.needsUpdate = true;
      if (this.explosionMesh.instanceColor) this.explosionMesh.instanceColor.needsUpdate = true;
    }
  }

  emitTrailParticles(pos, dir, count = 6) {
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= this.maxParticles) break;
      const jitter = new THREE.Vector3(
        (Math.random() - 0.5) * 45.0,
        (Math.random() - 0.5) * 45.0,
        (Math.random() - 0.5) * 45.0
      );
      const pPos = pos.clone().add(jitter);
      const pVel = dir.clone().multiplyScalar(-40.0).add(new THREE.Vector3(
        (Math.random() - 0.5) * 25.0,
        (Math.random() - 0.5) * 25.0,
        (Math.random() - 0.5) * 25.0
      ));
      const life = 0.65 + Math.random() * 0.45;
      this.particles.push({
        pos: pPos,
        vel: pVel,
        life,
        maxLife: life,
        baseScale: 38.0 + Math.random() * 24.0
      });
    }
  }

  updateTrailParticles(dt, camera = null) {
    if (camera && camera.quaternion) {
      _meteorCamQuat.copy(camera.quaternion);
    } else {
      _meteorCamQuat.identity();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      p.pos.addScaledVector(p.vel, dt);
      p.vel.multiplyScalar(Math.pow(0.92, dt * 60));
    }

    const activeCount = this.particles.length;
    for (let i = 0; i < activeCount; i++) {
      const p = this.particles[i];
      const progress = 1.0 - (p.life / p.maxLife);
      const scale = p.baseScale * (1.0 + progress * 2.8);

      _meteorDummy.position.copy(p.pos);
      _meteorDummy.quaternion.copy(_meteorCamQuat);
      _meteorDummy.scale.set(scale, scale, scale);
      _meteorDummy.updateMatrix();
      this.trailMesh.setMatrixAt(i, _meteorDummy.matrix);

      if (progress < 0.2) {
        _meteorColor.setRGB(1.0, 0.95, 0.8);
      } else if (progress < 0.6) {
        _meteorColor.setRGB(1.0, 0.45 * (1.0 - (progress - 0.2) / 0.4), 0.05);
      } else {
        const fade = (1.0 - progress) / 0.4;
        _meteorColor.setRGB(0.6 * fade, 0.1 * fade, 0.02 * fade);
      }
      this.trailMesh.setColorAt(i, _meteorColor);

      const idx = i * 3;
      this.trailPositions[idx] = p.pos.x;
      this.trailPositions[idx + 1] = p.pos.y;
      this.trailPositions[idx + 2] = p.pos.z;
      this.trailColors[idx] = _meteorColor.r;
      this.trailColors[idx + 1] = _meteorColor.g;
      this.trailColors[idx + 2] = _meteorColor.b;
    }

    for (let i = activeCount; i < this.maxParticles; i++) {
      this.trailMesh.setMatrixAt(i, _meteorHideMat);
      const idx = i * 3;
      this.trailPositions[idx] = 0;
      this.trailPositions[idx + 1] = 0;
      this.trailPositions[idx + 2] = 999999;
      this.trailColors[idx] = 0;
      this.trailColors[idx + 1] = 0;
      this.trailColors[idx + 2] = 0;
    }

    this.trailMesh.instanceMatrix.needsUpdate = true;
    if (this.trailMesh.instanceColor) this.trailMesh.instanceColor.needsUpdate = true;
  }

  triggerExplosion(pos, radius = 28, color = 0xff5500) {
    audio.playExplosion(2.5, pos);

    if (this.spaceEnv && typeof this.spaceEnv.triggerCombatFlash === 'function') {
      this.spaceEnv.triggerCombatFlash(pos, color, 6.0);
    }

    // Spawn 60 GPU InstancedMesh explosion quads
    const count = 60;
    const baseColor = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      if (this.explosionQuads.length >= this.maxExplosionQuads) {
        this.explosionQuads.shift();
      }
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2.0 * Math.random() - 1.0);
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      );
      const speed = (radius * 1.5) + Math.random() * (radius * 3.0);
      const life = 0.4 + Math.random() * 0.35;
      const isCore = i < count * 0.4;

      this.explosionQuads.push({
        pos: pos.clone().addScaledVector(dir, Math.random() * (radius * 0.3)),
        vel: dir.multiplyScalar(speed),
        life,
        maxLife: life,
        baseScale: isCore ? (radius * 0.6 + Math.random() * (radius * 0.4)) : (radius * 0.25 + Math.random() * (radius * 0.3)),
        isCore,
        color: baseColor.clone()
      });
    }
  }

  destroyMeteor() {
    if (!this.activeMeteor) return;
    this.scene.remove(this.activeMeteor.group);
    if (this.spaceEnv && this.spaceEnv.meteorLight) {
      this.spaceEnv.meteorLight.intensity = 0.0;
    }
    this.activeMeteor = null;
  }

  cleanup() {
    this.destroyMeteor();
    if (this.trailMesh && this.trailMesh.parent) {
      this.trailMesh.parent.remove(this.trailMesh);
    }
    if (this.explosionMesh && this.explosionMesh.parent) {
      this.explosionMesh.parent.remove(this.explosionMesh);
    }
    if (this.trailPlaneGeo) this.trailPlaneGeo.dispose();
    if (this.glowTexture) this.glowTexture.dispose();
    if (this.trailMat) this.trailMat.dispose();
    if (this.explosionMat) this.explosionMat.dispose();
    this.particles = [];
    this.explosionQuads = [];
  }
}
