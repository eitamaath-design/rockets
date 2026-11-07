import * as THREE from 'three';

/**
 * Ship Thruster Exhaust Trail System.
 * Leaves lingering visible plumes in 3D space that decay over exactly 15 seconds,
 * allowing players to hunt and dogfight across the asteroid sector.
 */
export class ThrusterTrailSystem {
  constructor(scene) {
    this.scene = scene;
    this.maxParticles = 2400;
    this.particles = [];

    this.geom = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.maxParticles * 3);
    this.colors = new Float32Array(this.maxParticles * 3);

    this.geom.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geom.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));

    // Glow point sprite
    let circleTexture = null;
    if (typeof document !== 'undefined') {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
          grad.addColorStop(0.0, 'rgba(255, 255, 255, 1)');
          grad.addColorStop(0.2, 'rgba(0, 220, 255, 0.85)');
          grad.addColorStop(0.5, 'rgba(0, 140, 255, 0.35)');
          grad.addColorStop(0.8, 'rgba(0, 60, 255, 0.1)');
          grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 64, 64);
          circleTexture = new THREE.CanvasTexture(canvas);
        }
      } catch (_) {}
    }

    this.mat = new THREE.PointsMaterial({
      size: 5.5,
      map: circleTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    this.points = new THREE.Points(this.geom, this.mat);
    this.points.frustumCulled = false;
    this.scene.add(this.points);

    this.emitTimer = 0;
  }

  /**
   * Drops a thruster trail puff behind a ship nozzle
   */
  emit(shipPosition, forwardVector, isHostile = false) {
    if (this.particles.length >= this.maxParticles) {
      // Recycle oldest particle
      this.particles.shift();
    }

    // Slightly turbulent exhaust dispersion
    const jitterX = (Math.random() - 0.5) * 0.6;
    const jitterY = (Math.random() - 0.5) * 0.6;
    const jitterZ = (Math.random() - 0.5) * 0.6;

    // Place puff behind ship along -forward
    const nozzlePos = shipPosition.clone().addScaledVector(forwardVector, -2.4);

    this.particles.push({
      x: nozzlePos.x + jitterX,
      y: nozzlePos.y + jitterY,
      z: nozzlePos.z + jitterZ,
      vx: jitterX * 0.4,
      vy: jitterY * 0.4,
      vz: jitterZ * 0.4,
      age: 0,
      maxAge: 15.0, // Decays over exactly 15 seconds!
      isHostile
    });
  }

  update(dt) {
    const posAttr = this.geom.attributes.position;
    const colAttr = this.geom.attributes.color;
    const activeCount = this.particles.length;

    for (let i = activeCount - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age += dt;

      if (p.age >= p.maxAge) {
        this.particles.splice(i, 1);
        continue;
      }

      // Very slow drift & expansion in zero-g
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;

      // 15-second decay curve: strong initial luminescence, fading gradually into deep space vapor
      const lifeRatio = 1.0 - (p.age / p.maxAge);
      const intensity = Math.pow(lifeRatio, 1.6); // smooth non-linear dissipation

      const idx = i * 3;
      this.positions[idx] = p.x;
      this.positions[idx + 1] = p.y;
      this.positions[idx + 2] = p.z;

      if (p.isHostile) {
        // Crimson / fiery orange trail for hostile opponent
        this.colors[idx] = 1.0 * intensity;
        this.colors[idx + 1] = 0.35 * intensity;
        this.colors[idx + 2] = 0.15 * intensity;
      } else {
        // Cyan / electric blue trail for player ship
        this.colors[idx] = 0.15 * intensity;
        this.colors[idx + 1] = 0.85 * intensity;
        this.colors[idx + 2] = 1.0 * intensity;
      }
    }

    // Zero out unused buffer tail
    const remaining = this.maxParticles - this.particles.length;
    for (let i = this.particles.length; i < this.maxParticles; i++) {
      const idx = i * 3;
      this.positions[idx] = 0;
      this.positions[idx + 1] = 0;
      this.positions[idx + 2] = 0;
      this.colors[idx] = 0;
      this.colors[idx + 1] = 0;
      this.colors[idx + 2] = 0;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  }

  cleanup() {
    this.scene.remove(this.points);
    this.particles = [];
  }
}
