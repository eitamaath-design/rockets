import * as THREE from 'three';
import { audio } from './audio.js';
import { logger } from '../utils/logger.js';

/**
 * Dynamic particle fire trail system for kinetic projectiles.
 * Emits blazing white/yellow/orange/red plasma flame particles that billow
 * behind projectiles as they streak through space.
 */
class FireTrailSystem {
  constructor(scene) {
    this.scene = scene;
    this.maxParticles = 800;
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
      const pVel = dir.clone().multiplyScalar(-18.0).add(new THREE.Vector3(
        (Math.random() - 0.5) * 8.0,
        (Math.random() - 0.5) * 8.0,
        (Math.random() - 0.5) * 8.0
      ));
      const life = 0.28 + Math.random() * 0.18;
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
 * Complete Weapons System:
 * - Primary: High-Energy Forward Directed Laser (2.4x vs Shields, 0.35x vs Hull)
 *   When ship.hasHologramDecoy is active, firing primary deploys a 15-second Hologram Decoy Clone!
 * - Secondary: High-Velocity Forward Kinetic Cannon (2.2x vs Hull, 0.35x vs Shields)
 *   Striking asteroids calls spaceEnv.carveAsteroid() to drill craters and tunnels through asteroids!
 */
export class WeaponsSystem {
  constructor(scene, spaceEnv, network) {
    this.scene = scene;
    this.spaceEnv = spaceEnv;
    this.network = network;

    // 1. Forward Laser parameters (Primary weapon: strong vs shields, longer cooldown)
    this.laserMaxEnergy = 100.0;
    this.laserEnergy = 100.0;
    this.laserShotCost = 28.0; // ~3.5 shots per full charge
    this.laserCooldownDelay = 0.85; // 0.85s delay after shot before recharge starts
    this.laserCooldownTimer = 0;
    this.laserRechargeRate = 28.0; // units per second
    this.laserFireInterval = 0.40; // max ~2.5 blasts/sec
    this.laserLastFireTime = 0;
    this.laserDamage = 22.0; // In ship.js: 2.4x vs shield = 52.8, 0.35x vs hull = 7.7
    this.laserSpeed = 480.0; // High-velocity coherent beam

    // 2. Forward Kinetic Cannon parameters (Secondary weapon: strong vs hull, rapid fire)
    this.cannonMaxEnergy = 100.0;
    this.cannonEnergy = 100.0;
    this.cannonShotCost = 2.5; // 40 shots per charge
    this.cannonCooldownDelay = 0.8;
    this.cannonCooldownTimer = 0;
    this.cannonRechargeRate = 35.0;
    this.cannonFireInterval = 0.1; // 10 shots/sec
    this.cannonLastFireTime = 0;
    this.cannonDamage = 6.0; // In ship.js: 2.2x vs hull = 13.2, 0.35x vs shield = 2.1
    this.cannonSpeed = 185.0; // Perceptible trackable flight speed

    // Rear Mine parameters (fallback / legacy support)
    this.mineMaxCharges = 2;
    this.mineCharges = 2;
    this.mineRechargeTime = 6.0;
    this.mineRechargeProgress = 0;
    this.mineFuseTime = 3.0;

    // Active weapon entities
    this.lasers = []; // { mesh, dir, speed, life, maxLife, isLocal, id }
    this.projectiles = []; // { mesh, dir, speed, life, isLocal, id }
    this.mines = []; // { mesh, life, id, isLocal }
    this.explosions = []; // { mesh, life, maxLife, maxRadius }
    this.decoys = []; // { group, dir, speed, life, maxLife, isLocal, id }

    // Dynamic fire particle trails for kinetic cannon slugs
    this.fireTrails = new FireTrailSystem(this.scene);

    // Geometries & Materials
    this.initGeometriesAndMaterials();
    this.listenToNetworkEvents();
  }

  initGeometriesAndMaterials() {
    // Laser Beam geometry: elongated sleek energy cylinder aligned along Z
    this.laserGeom = new THREE.CylinderGeometry(0.24, 0.24, 9.0, 8);
    this.laserGeom.rotateX(Math.PI / 2);

    this.localLaserMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });

    this.remoteLaserMat = new THREE.MeshBasicMaterial({
      color: 0xff0066,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });

    // Outer laser glow sheath
    this.laserGlowGeom = new THREE.CylinderGeometry(0.55, 0.55, 9.4, 8);
    this.laserGlowGeom.rotateX(Math.PI / 2);
    this.localLaserGlowMat = new THREE.MeshBasicMaterial({
      color: 0x0088ff,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    this.remoteLaserGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff3300,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    // 3D Kinetic Cannon rocket slug
    this.slugBodyGeom = new THREE.CylinderGeometry(0.24, 0.32, 2.0, 8);
    this.slugBodyGeom.rotateX(Math.PI / 2);

    this.slugNoseGeom = new THREE.ConeGeometry(0.24, 0.9, 8);
    this.slugNoseGeom.rotateX(-Math.PI / 2);

    this.slugTailGeom = new THREE.CylinderGeometry(0.18, 0.28, 0.45, 8);
    this.slugTailGeom.rotateX(Math.PI / 2);

    this.slugBodyMat = new THREE.MeshStandardMaterial({
      color: 0x242e3d,
      roughness: 0.35,
      metalness: 0.85,
      flatShading: true
    });

    this.localSlugNoseMat = new THREE.MeshBasicMaterial({ color: 0xffcc33 });
    this.remoteSlugNoseMat = new THREE.MeshBasicMaterial({ color: 0xff3344 });
    this.slugThrusterMat = new THREE.MeshBasicMaterial({ color: 0xff6600 });

    // Mine geometry
    this.mineGeom = new THREE.DodecahedronGeometry(1.6, 1);
    this.mineMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.3,
      metalness: 0.9,
      emissive: 0xff1100,
      emissiveIntensity: 0.4
    });

    // Hologram Decoy Clone wireframe material
    this.decoyMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
  }

  listenToNetworkEvents() {
    if (!this.network) return;

    // Remote peer fired laser
    if (typeof this.network.onLaser === 'function') {
      this.network.onLaser((data, peerId) => {
        this.spawnRemoteLaser(data, peerId);
      });
    }

    // Remote peer fired cannon
    this.network.onCannon((data, peerId) => {
      this.spawnRemoteProjectile(data, peerId);
    });

    // Remote peer deployed hologram decoy clone
    if (typeof this.network.onDecoy === 'function') {
      this.network.onDecoy((data, peerId) => {
        this.spawnRemoteDecoy(data, peerId);
      });
    }

    // Remote peer dropped mine
    this.network.onMine((data, peerId) => {
      this.spawnRemoteMine(data, peerId);
    });
  }

  /**
   * Primary Weapon Trigger: Directed Energy Laser Beam (or Hologram Decoy Clone if armed)
   */
  triggerPrimary(isHolding, ship, now) {
    if (!isHolding || ship.isDead) return;

    // Break invisibility on weapon trigger
    if (typeof ship.breakInvisibility === 'function') {
      ship.breakInvisibility();
    }

    // 1. If Hologram Decoy is armed, deploy the clone decoy!
    if (ship.hasHologramDecoy) {
      ship.hasHologramDecoy = false;
      const fwd = ship.getForwardVector();
      const origin = ship.position.clone().addScaledVector(fwd, 4.0);
      const decoyId = `decoy-${this.network.selfId}-${Date.now()}`;

      this.spawnDecoy(origin, fwd, true, decoyId);
      audio.playDecoyDeploy();
      logger.log('WEAPON', 'Hologram Decoy Clone launched forward!');

      if (this.network && typeof this.network.broadcastDecoy === 'function') {
        this.network.broadcastDecoy({
          id: decoyId,
          pos: { x: origin.x, y: origin.y, z: origin.z },
          dir: { x: fwd.x, y: fwd.y, z: fwd.z },
          time: Date.now()
        });
      }
      return;
    }

    // 2. Fire Forward High-Energy Laser Beam
    const nowSec = now > 1000 ? now * 0.001 : now;
    if (this.laserEnergy >= this.laserShotCost && (nowSec - this.laserLastFireTime) >= this.laserFireInterval) {
      this.laserLastFireTime = nowSec;
      this.laserCooldownTimer = this.laserCooldownDelay;
      this.laserEnergy = Math.max(0, this.laserEnergy - this.laserShotCost);

      const fwd = ship.getForwardVector();
      const origin = ship.position.clone()
        .addScaledVector(fwd, 3.2)
        .add(new THREE.Vector3(0, -0.25, 0));

      const shotId = `laser-${this.network.selfId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      this.spawnLaser(origin, fwd, true, shotId);
      audio.playLaserShot(true);

      if (this.network && typeof this.network.broadcastLaser === 'function') {
        this.network.broadcastLaser({
          id: shotId,
          origin: { x: origin.x, y: origin.y, z: origin.z },
          dir: { x: fwd.x, y: fwd.y, z: fwd.z },
          time: now
        });
      }
    }
  }

  /**
   * Secondary Weapon Trigger: Forward High-Velocity Kinetic Cannon
   * Strong against hull, carves chunks out of asteroids!
   */
  triggerSecondary(isHolding, ship, now) {
    if (!isHolding || ship.isDead) return;

    // Break invisibility on weapon trigger
    if (typeof ship.breakInvisibility === 'function') {
      ship.breakInvisibility();
    }

    const nowSec = now > 1000 ? now * 0.001 : now;
    this.cannonCooldownTimer = this.cannonCooldownDelay;

    if (this.cannonEnergy >= this.cannonShotCost && (nowSec - this.cannonLastFireTime) >= this.cannonFireInterval) {
      this.cannonLastFireTime = nowSec;
      this.cannonEnergy = Math.max(0, this.cannonEnergy - this.cannonShotCost);

      // Alternating wing barrels
      const fwd = ship.getForwardVector();
      const right = ship.getRightVector();
      const wingOffset = (Math.random() > 0.5 ? 1 : -1) * 0.72;
      const origin = ship.position.clone()
        .addScaledVector(fwd, 2.8)
        .addScaledVector(right, wingOffset)
        .add(new THREE.Vector3(0, -0.28, 0));

      const shotId = `cannon-${this.network.selfId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      this.spawnProjectile(origin, fwd, ship.velocity, true, shotId);
      audio.playCannonShot(true);

      this.network.broadcastCannon({
        id: shotId,
        origin: { x: origin.x, y: origin.y, z: origin.z },
        dir: { x: fwd.x, y: fwd.y, z: fwd.z },
        vel: { x: ship.velocity.x, y: ship.velocity.y, z: ship.velocity.z },
        time: now
      });
    }
  }

  // Backwards compatibility alias
  triggerCannon(isHolding, ship, now) {
    this.triggerSecondary(isHolding, ship, now);
  }

  triggerLaser(isHolding, ship, now) {
    this.triggerPrimary(isHolding, ship, now);
  }

  triggerRearMine(ship) {
    // Secondary forward weapon replaced mine, but keep method for safe fallback
    return this.triggerSecondary(true, ship, performance.now());
  }

  spawnLaser(origin, dir, isLocal, id) {
    const group = new THREE.Group();
    group.position.copy(origin);
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);

    // Core beam
    const core = new THREE.Mesh(this.laserGeom, isLocal ? this.localLaserMat : this.remoteLaserMat);
    group.add(core);

    // Glowing energy sheath
    const glow = new THREE.Mesh(this.laserGlowGeom, isLocal ? this.localLaserGlowMat : this.remoteLaserGlowMat);
    group.add(glow);

    this.scene.add(group);
    this.lasers.push({
      mesh: group,
      dir: dir.clone().normalize(),
      speed: this.laserSpeed,
      life: 1.4,
      maxLife: 1.4,
      isLocal,
      id
    });
  }

  spawnRemoteLaser(data, peerId) {
    const origin = new THREE.Vector3(data.origin.x, data.origin.y, data.origin.z);
    const dir = new THREE.Vector3(data.dir.x, data.dir.y, data.dir.z);
    this.spawnLaser(origin, dir, false, data.id);
    audio.playLaserShot(false, origin);
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

  spawnRemoteProjectile(data, peerId) {
    const origin = new THREE.Vector3(data.origin.x, data.origin.y, data.origin.z);
    const dir = new THREE.Vector3(data.dir.x, data.dir.y, data.dir.z);
    const vel = data.vel ? new THREE.Vector3(data.vel.x, data.vel.y, data.vel.z) : new THREE.Vector3();
    this.spawnProjectile(origin, dir, vel, false, data.id);
    audio.playCannonShot(false, origin);
  }

  spawnDecoy(origin, dir, isLocal, id) {
    const group = new THREE.Group();
    group.position.copy(origin);
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), dir);

    // Phantom starfighter mesh
    const hullGeom = new THREE.ConeGeometry(1.2, 4.0, 5);
    hullGeom.rotateX(-Math.PI / 2);
    const hull = new THREE.Mesh(hullGeom, this.decoyMat);
    group.add(hull);

    const wingGeom = new THREE.BoxGeometry(5.0, 0.08, 1.8);
    const wings = new THREE.Mesh(wingGeom, this.decoyMat);
    wings.position.set(0, 0, 0.8);
    group.add(wings);

    // Thruster glow
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
      speed: 90.0,
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
    // Mines are supported if received from network
    const pos = new THREE.Vector3(data.pos.x, data.pos.y, data.pos.z);
    const mesh = new THREE.Mesh(this.mineGeom, this.mineMat);
    mesh.position.copy(pos);
    this.scene.add(mesh);
    this.mines.push({ mesh, pos, life: 3.0, id: data.id, isLocal: false });
  }

  spawnExplosion(pos, radius = 12, color = 0xff6600) {
    const geom = new THREE.SphereGeometry(radius * 0.4, 12, 10);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(pos);

    this.scene.add(mesh);
    audio.playExplosion(radius > 15 ? 1.5 : 0.8, pos);

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

  update(dt, localShip, remoteShipsMap, onDamageEvent) {
    // 1. Weapon Energy Recharging
    // Laser recharge
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

    // Cannon recharge
    if (this.cannonCooldownTimer > 0) {
      this.cannonCooldownTimer = Math.max(0, this.cannonCooldownTimer - dt);
    } else if (this.cannonEnergy < this.cannonMaxEnergy) {
      this.cannonEnergy = Math.min(this.cannonMaxEnergy, this.cannonEnergy + this.cannonRechargeRate * dt);
    }

    // 2. Update Laser Beams (Primary Weapon: strong vs shields)
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const l = this.lasers[i];
      l.life -= dt;

      l.mesh.position.addScaledVector(l.dir, l.speed * dt);
      let destroyed = false;

      // Check collision with asteroids
      const hitAsteroid = this.spaceEnv.checkCollision(l.mesh.position, 1.2);
      if (hitAsteroid) {
        this.spawnExplosion(l.mesh.position, 6, 0x00d4ff);
        destroyed = true;
      }

      // Check hits on local player
      if (!destroyed && !l.isLocal && !localShip.isDead && localShip.invulnerableTimer <= 0) {
        if (l.mesh.position.distanceToSquared(localShip.position) < 18.0) {
          this.spawnExplosion(l.mesh.position, 8, 0x00ffff);
          localShip.takeDamage(this.laserDamage, 'laser');
          if (onDamageEvent) onDamageEvent(this.laserDamage, 'laser', null);
          destroyed = true;
        }
      }

      // Check hits on remote players
      if (!destroyed && l.isLocal) {
        for (const [peerId, remote] of remoteShipsMap.entries()) {
          if (!remote.isDead && l.mesh.position.distanceToSquared(remote.position) < 18.0) {
            this.spawnExplosion(l.mesh.position, 8, 0x00ffff);
            this.network.sendHitTarget(peerId, this.laserDamage, 'laser');
            destroyed = true;
            break;
          }
        }
      }

      if (destroyed || l.life <= 0) {
        this.scene.remove(l.mesh);
        this.lasers.splice(i, 1);
      }
    }

    // 3. Update Kinetic Cannon Slugs (Secondary Weapon: strong vs hull, carves asteroids!)
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;

      p.mesh.position.addScaledVector(p.dir, p.speed * dt);

      // Fire trail billowing behind slug
      const tailPos = p.mesh.position.clone().addScaledVector(p.dir, -1.2);
      this.fireTrails.emit(tailPos, p.dir, 3);

      let destroyed = false;

      // Striking Asteroid: CANNON CARVES CHUNKS OUT OF ASTEROID!
      const hitAsteroid = this.spaceEnv.checkCollision(p.mesh.position, 1.2);
      if (hitAsteroid) {
        this.spawnExplosion(p.mesh.position, 5, 0xff7700);
        if (typeof this.spaceEnv.carveAsteroid === 'function') {
          this.spaceEnv.carveAsteroid(hitAsteroid, p.mesh.position, p.dir);
        }
        destroyed = true;
      }

      // Check hits on local player
      if (!destroyed && !p.isLocal && !localShip.isDead && localShip.invulnerableTimer <= 0) {
        if (p.mesh.position.distanceToSquared(localShip.position) < 16.0) {
          this.spawnExplosion(p.mesh.position, 6, 0xff3300);
          localShip.takeDamage(this.cannonDamage, 'cannon');
          if (onDamageEvent) onDamageEvent(this.cannonDamage, 'cannon', null);
          destroyed = true;
        }
      }

      // Check hits on remote players
      if (!destroyed && p.isLocal) {
        for (const [peerId, remote] of remoteShipsMap.entries()) {
          if (!remote.isDead && p.mesh.position.distanceToSquared(remote.position) < 16.0) {
            this.spawnExplosion(p.mesh.position, 6, 0xff5500);
            this.network.sendHitTarget(peerId, this.cannonDamage, 'cannon');
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

      // Moves smoothly forward without any collision
      d.group.position.addScaledVector(d.dir, d.speed * dt);

      // Holographic shimmer / flicker
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

  cleanup() {
    for (const l of this.lasers) this.scene.remove(l.mesh);
    for (const p of this.projectiles) this.scene.remove(p.mesh);
    for (const d of this.decoys) this.scene.remove(d.group);
    for (const m of this.mines) this.scene.remove(m.mesh);
    for (const e of this.explosions) this.scene.remove(e.mesh);
    this.fireTrails.cleanup();
  }
}
