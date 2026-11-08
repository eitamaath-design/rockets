import * as THREE from 'three';
import { audio } from './audio.js';
import { logger } from '../utils/logger.js';

/**
 * Battle Royale Black Hole & Safe Zone System
 * Represents a colossal celestial singularity encroaching upon the asteroid sector.
 * Over a 10-minute match, the safe area shrinks from R=1100 down to R=100.
 * Exerts Newtonian gravitational pull on all entities (ships, asteroids, meteors).
 * Any object crossing the event horizon is instantly devoured and destroyed.
 */
export class BlackHoleSystem {
  constructor(scene, spaceEnv) {
    this.scene = scene;
    this.spaceEnv = spaceEnv;

    // Match duration: 10 minutes (600 seconds)
    this.matchDuration = 600.0;
    this.matchTime = 0.0;

    // Safe zone radii
    this.initialSafeRadius = 1100.0;
    this.finalSafeRadius = 120.0;
    this.currentSafeRadius = this.initialSafeRadius;

    // Position of singularity: enters from high sector coordinate (0, 350, -400) and moves to sector center (0, 0, 0)
    this.startPosition = new THREE.Vector3(0, 450, -600);
    this.targetPosition = new THREE.Vector3(0, 0, 0);
    this.position = this.startPosition.clone();

    // Event Horizon radius
    this.eventHorizonRadius = 65.0;

    // Gravitational constant * Mass parameter for pull
    this.gravityStrength = 450000.0;

    // 3D Visual Mesh Components
    this.group = new THREE.Group();
    this.group.position.copy(this.position);

    this.createBlackHoleVisuals();
    this.createSafeZonePerimeterVisuals();

    this.scene.add(this.group);
  }

  createBlackHoleVisuals() {
    // 1. Pitch-Black Singularity Sphere (Absolute Black Event Horizon)
    const horizonGeom = new THREE.SphereGeometry(this.eventHorizonRadius, 32, 24);
    const horizonMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      fog: false
    });
    this.horizonMesh = new THREE.Mesh(horizonGeom, horizonMat);
    this.group.add(this.horizonMesh);

    // 2. Gravitational Lensing Einstein Ring (Outer Distortion Corona)
    const lensGeom = new THREE.SphereGeometry(this.eventHorizonRadius * 1.15, 28, 20);
    const lensMat = new THREE.MeshBasicMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      fog: false
    });
    this.lensMesh = new THREE.Mesh(lensGeom, lensMat);
    this.group.add(this.lensMesh);

    // 3. Swirling Accretion Disk (Blazing Ultra-Hot Plasma Ring)
    const diskGeom = new THREE.RingGeometry(this.eventHorizonRadius * 1.08, this.eventHorizonRadius * 3.8, 48, 8);
    diskGeom.rotateX(Math.PI / 2.3);

    const diskMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending,
      fog: false
    });
    this.diskMesh = new THREE.Mesh(diskGeom, diskMat);
    this.group.add(this.diskMesh);

    // Secondary inner high-energy violet/cyan ring
    const innerDiskGeom = new THREE.RingGeometry(this.eventHorizonRadius * 1.05, this.eventHorizonRadius * 1.9, 48, 4);
    innerDiskGeom.rotateX(Math.PI / 2.3);
    const innerDiskMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      fog: false
    });
    this.innerDiskMesh = new THREE.Mesh(innerDiskGeom, innerDiskMat);
    this.group.add(this.innerDiskMesh);

    // 4. Inward Relativistic Particle Infall Vortex
    this.infallParticleCount = 180;
    this.infallGeom = new THREE.BufferGeometry();
    this.infallPositions = new Float32Array(this.infallParticleCount * 3);
    this.infallColors = new Float32Array(this.infallParticleCount * 3);
    this.infallData = [];

    for (let i = 0; i < this.infallParticleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = this.eventHorizonRadius * (1.2 + Math.random() * 2.8);
      const height = (Math.random() - 0.5) * 30.0;
      const speed = 40.0 + Math.random() * 60.0;

      this.infallData.push({ angle, dist, height, speed });

      const idx = i * 3;
      this.infallPositions[idx] = Math.cos(angle) * dist;
      this.infallPositions[idx + 1] = height;
      this.infallPositions[idx + 2] = Math.sin(angle) * dist;

      this.infallColors[idx] = 1.0;
      this.infallColors[idx + 1] = 0.5 + Math.random() * 0.5;
      this.infallColors[idx + 2] = 0.2;
    }

    this.infallGeom.setAttribute('position', new THREE.BufferAttribute(this.infallPositions, 3));
    this.infallGeom.setAttribute('color', new THREE.BufferAttribute(this.infallColors, 3));

    const infallMat = new THREE.PointsMaterial({
      size: 6.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.infallPoints = new THREE.Points(this.infallGeom, infallMat);
    this.group.add(this.infallPoints);
  }

  createSafeZonePerimeterVisuals() {
    // Holographic warning boundary cylinder indicating the shrinking safe zone
    const ringRadius = this.currentSafeRadius;
    const ringGeom = new THREE.TorusGeometry(ringRadius, 2.5, 8, 64);
    ringGeom.rotateX(Math.PI / 2);

    this.perimeterMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.55,
      wireframe: true,
      blending: THREE.AdditiveBlending
    });

    this.perimeterMesh = new THREE.Mesh(ringGeom, this.perimeterMat);
    this.perimeterMesh.position.set(0, 0, 0);
    this.scene.add(this.perimeterMesh);
  }

  update(dt, playerShip, remoteShipsMap, arg4, arg5, arg6) {
    // Robust dual-signature support:
    // (dt, playerShip, remoteShipsMap, meteorSystem, onPlayerDevoured) OR
    // (dt, playerShip, remoteShipsMap, spaceEnv, meteorSystem, onPlayerDevoured)
    let spaceEnv = this.spaceEnv;
    let meteorSystem = null;
    let onPlayerDevoured = null;

    if (typeof arg4 === 'function') {
      onPlayerDevoured = arg4;
    } else if (typeof arg5 === 'function') {
      if (arg4 && typeof arg4.destroyMeteor === 'function') {
        meteorSystem = arg4;
      } else if (arg4 && (arg4.asteroids || arg4.scene)) {
        spaceEnv = arg4;
      } else {
        meteorSystem = arg4;
      }
      onPlayerDevoured = arg5;
    } else if (typeof arg6 === 'function') {
      if (arg4) spaceEnv = arg4;
      if (arg5) meteorSystem = arg5;
      onPlayerDevoured = arg6;
    } else {
      if (arg4 && typeof arg4.destroyMeteor === 'function') {
        meteorSystem = arg4;
      } else if (arg4 && (arg4.asteroids || arg4.scene)) {
        spaceEnv = arg4;
      }
      if (arg5 && typeof arg5.destroyMeteor === 'function') {
        meteorSystem = arg5;
      }
    }

    if (spaceEnv) {
      this.spaceEnv = spaceEnv;
    }

    this.matchTime += dt;
    const matchProgress = Math.min(1.0, this.matchTime / this.matchDuration);

    // 1. Shrink Safe Zone Boundary over 10 minutes
    this.currentSafeRadius = this.initialSafeRadius - matchProgress * (this.initialSafeRadius - this.finalSafeRadius);
    const perimeterScale = this.currentSafeRadius / this.initialSafeRadius;
    if (this.perimeterMesh) {
      this.perimeterMesh.scale.set(perimeterScale, 1.0, perimeterScale);
      // As match nears conclusion, boundary shifts to alarming crimson
      if (matchProgress > 0.7) {
        this.perimeterMat.color.setHex(0xff2244);
        this.perimeterMat.opacity = 0.75 + Math.sin(this.matchTime * 6.0) * 0.2;
      } else {
        this.perimeterMat.color.setHex(0x00d4ff);
        this.perimeterMat.opacity = 0.45 + Math.sin(this.matchTime * 2.0) * 0.15;
      }
    }

    // 2. Black Hole Encroachment: Moves from initial outer point toward sector center
    this.position.lerpVectors(this.startPosition, this.targetPosition, Math.pow(matchProgress, 0.7));
    this.group.position.copy(this.position);

    // 3. Accretion Disk & Vortex Kinematics
    if (this.diskMesh) {
      this.diskMesh.rotation.z += dt * 0.75;
    }
    if (this.innerDiskMesh) {
      this.innerDiskMesh.rotation.z -= dt * 1.35;
    }

    // Infall particles swirling toward event horizon
    if (this.infallData) {
      for (let i = 0; i < this.infallParticleCount; i++) {
        const p = this.infallData[i];
        p.angle += (p.speed / (p.dist + 1.0)) * dt;
        p.dist -= dt * 14.0;
        if (p.dist <= this.eventHorizonRadius * 1.02) {
          p.dist = this.eventHorizonRadius * (2.2 + Math.random() * 1.8);
        }

        const idx = i * 3;
        this.infallPositions[idx] = Math.cos(p.angle) * p.dist;
        this.infallPositions[idx + 1] = p.height;
        this.infallPositions[idx + 2] = Math.sin(p.angle) * p.dist;
      }
      this.infallGeom.attributes.position.needsUpdate = true;
    }

    // 4. Gravitational Pull on Player Ship
    if (playerShip && !playerShip.isDead) {
      const delta = this.position.clone().sub(playerShip.position);
      const dist = delta.length();
      const pullDir = delta.normalize();

      // Gravity pulls everything toward the singularity
      // Stronger as the black hole comes closer
      const gravForce = Math.min(65.0, this.gravityStrength / (dist * dist + 1000.0));
      playerShip.velocity.addScaledVector(pullDir, gravForce * dt);

      // Event Horizon check: instant annihilation
      if (dist <= this.eventHorizonRadius) {
        logger.log('BLACK_HOLE', 'Player ship devoured by the Black Hole event horizon!');
        playerShip.takeDamage(9999, true);
        if (typeof onPlayerDevoured === 'function') {
          onPlayerDevoured('🕳️ Devoured by the encroaching Cosmic Black Hole!');
        }
      }
    }

    // 5. Gravitational Pull on Remote Ships
    if (remoteShipsMap) {
      for (const [peerId, remote] of remoteShipsMap.entries()) {
        if (!remote.isDead) {
          const dist = this.position.distanceTo(remote.position);
          if (dist <= this.eventHorizonRadius) {
            remote.takeDamage?.(9999);
          }
        }
      }
    }

    // 6. Gravitational Pull & Destruction of Asteroids
    if (this.spaceEnv && this.spaceEnv.asteroids) {
      for (let i = this.spaceEnv.asteroids.length - 1; i >= 0; i--) {
        const a = this.spaceEnv.asteroids[i];
        const delta = this.position.clone().sub(a.position);
        const dist = delta.length();
        if (dist > 0.1) {
          const grav = Math.min(25.0, (this.gravityStrength * 0.4) / (dist * dist + 2000.0));
          a.velocity.addScaledVector(delta.normalize(), grav * dt);
        }

        // Swallowed by event horizon
        if (dist <= (this.eventHorizonRadius + a.radius * 0.3)) {
          // Remove swallowed asteroid
          this.spaceEnv.scene.remove(a.mesh);
          this.spaceEnv.asteroids.splice(i, 1);
          audio.playExplosion(2.2, this.position);
          logger.log('BLACK_HOLE', `Asteroid swallowed by singularity! (${this.spaceEnv.asteroids.length} remaining)`);
        }
      }
    }

    // 7. Gravitational Pull on Active Rogue Meteor
    if (meteorSystem && meteorSystem.activeMeteor) {
      const m = meteorSystem.activeMeteor;
      const delta = this.position.clone().sub(m.position);
      const dist = delta.length();
      if (dist <= this.eventHorizonRadius + m.radius) {
        logger.log('BLACK_HOLE', 'Rogue flaming meteor sucked into the Black Hole!');
        meteorSystem.destroyMeteor();
        audio.playExplosion(3.0, this.position);
      } else {
        m.velocity.addScaledVector(delta.normalize(), 60.0 * dt);
      }
    }
  }

  getSafeRadius() {
    return this.currentSafeRadius;
  }

  getMatchProgress() {
    return Math.min(1.0, this.matchTime / this.matchDuration);
  }

  getTimeRemaining() {
    return Math.max(0, this.matchDuration - this.matchTime);
  }

  getMatchTimeRemaining() {
    return this.getTimeRemaining();
  }

  cleanup() {
    this.scene.remove(this.group);
    if (this.perimeterMesh) {
      this.scene.remove(this.perimeterMesh);
    }
    this.infallGeom.dispose();
  }
}
