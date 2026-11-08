import * as THREE from 'three';
import { audio } from './audio.js';
import { logger } from '../utils/logger.js';

/**
 * Fiery Meteor Hazard System
 * Generates a periodic blazing meteor every 10 seconds that streaks across
 * the sector, transferring explosive kinetic momentum into asteroids and
 * completely incinerating ships on collision.
 */
export class MeteorSystem {
  constructor(scene, spaceEnv) {
    this.scene = scene;
    this.spaceEnv = spaceEnv;

    this.spawnInterval = 10.0; // Every 10 seconds
    this.spawnTimer = 4.0; // First meteor enters 4s after spawn

    this.activeMeteor = null;

    // Pre-allocated particle buffer for the meteor's roaring fire & smoke trail
    this.maxParticles = 250;
    this.particles = [];
    this.trailGeom = new THREE.BufferGeometry();
    this.trailPositions = new Float32Array(this.maxParticles * 3);
    this.trailColors = new Float32Array(this.maxParticles * 3);

    this.trailGeom.setAttribute('position', new THREE.BufferAttribute(this.trailPositions, 3));
    this.trailGeom.setAttribute('color', new THREE.BufferAttribute(this.trailColors, 3));

    this.trailMat = new THREE.PointsMaterial({
      size: 48.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    this.trailPoints = new THREE.Points(this.trailGeom, this.trailMat);
    this.scene.add(this.trailPoints);
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

  update(dt, playerShip, remoteShipsMap, onPlayerKilled) {
    // 1. Periodic 10-second spawn timer
    this.spawnTimer += dt;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnTimer = 0;
      this.spawnMeteor();
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
    this.updateTrailParticles(dt);
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
        maxLife: life
      });
    }
  }

  updateTrailParticles(dt) {
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
      this.trailPositions[idx] = p.pos.x;
      this.trailPositions[idx + 1] = p.pos.y;
      this.trailPositions[idx + 2] = p.pos.z;

      const progress = 1.0 - (p.life / p.maxLife);
      if (progress < 0.2) {
        this.trailColors[idx] = 1.0;
        this.trailColors[idx + 1] = 0.95;
        this.trailColors[idx + 2] = 0.8;
      } else if (progress < 0.6) {
        this.trailColors[idx] = 1.0;
        this.trailColors[idx + 1] = 0.45 * (1.0 - (progress - 0.2) / 0.4);
        this.trailColors[idx + 2] = 0.05;
      } else {
        const fade = (1.0 - progress) / 0.4;
        this.trailColors[idx] = 0.6 * fade;
        this.trailColors[idx + 1] = 0.1 * fade;
        this.trailColors[idx + 2] = 0.02 * fade;
      }
    }

    for (let i = activeCount; i < this.maxParticles; i++) {
      const idx = i * 3;
      this.trailPositions[idx] = 0;
      this.trailPositions[idx + 1] = 0;
      this.trailPositions[idx + 2] = 999999;
    }

    this.trailGeom.attributes.position.needsUpdate = true;
    this.trailGeom.attributes.color.needsUpdate = true;
  }

  triggerExplosion(pos, radius = 28, color = 0xff5500) {
    // Large fireball sphere
    const geom = new THREE.SphereGeometry(radius * 0.4, 16, 12);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(pos);
    this.scene.add(mesh);

    audio.playExplosion(2.5);

    if (this.spaceEnv && typeof this.spaceEnv.triggerCombatFlash === 'function') {
      this.spaceEnv.triggerCombatFlash(pos, color, 6.0);
    }

    const startTime = performance.now();
    const duration = 550; // ms

    const animateExplosion = () => {
      const elapsed = performance.now() - startTime;
      const progress = elapsed / duration;
      if (progress >= 1.0) {
        this.scene.remove(mesh);
        geom.dispose();
        mat.dispose();
        return;
      }
      const scale = 1.0 + progress * 3.5;
      mesh.scale.set(scale, scale, scale);
      mat.opacity = Math.max(0, 1.0 - progress);
      requestAnimationFrame(animateExplosion);
    };
    requestAnimationFrame(animateExplosion);
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
    this.scene.remove(this.trailPoints);
    this.trailGeom.dispose();
    this.trailMat.dispose();
  }
}
