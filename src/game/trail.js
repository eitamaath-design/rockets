import * as THREE from 'three';

/**
 * Creates a headless-safe radial soft-glow DataTexture.
 * Works uniformly in Node/Vitest and WebGL browsers with zero hard square edges.
 */
export function createRadialGlowTexture(size = 128) {
  const data = new Uint8Array(size * size * 4);
  const center = (size - 1) / 2;
  const maxR = center;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - center) / maxR;
      const dy = (y - center) / maxR;
      const d = Math.sqrt(dx * dx + dy * dy);
      const idx = (y * size + x) * 4;

      if (d >= 1.0) {
        data[idx] = 0;
        data[idx + 1] = 0;
        data[idx + 2] = 0;
        data[idx + 3] = 0;
      } else {
        // High-contrast Gaussian-exponential core-to-perimeter decay
        const coreFalloff = Math.exp(-d * d * 3.8);
        const edgeFade = Math.cos(d * Math.PI * 0.5);
        const intensity = Math.max(0, Math.min(1, coreFalloff * edgeFade));
        const val = Math.round(255 * Math.min(1, intensity * 1.2));
        const alpha = Math.round(255 * intensity);

        data[idx] = val;
        data[idx + 1] = val;
        data[idx + 2] = val;
        data[idx + 3] = alpha;
      }
    }
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

// Module-scoped scratch objects to guarantee zero runtime heap allocations
const _dummy = new THREE.Object3D();
const _color = new THREE.Color();
const _camQuat = new THREE.Quaternion();
const _hideMatrix = new THREE.Matrix4().makeScale(0, 0, 0);
const _scratchVecA = new THREE.Vector3();
const _scratchVecB = new THREE.Vector3();

/**
 * Ship Thruster Exhaust Trail System.
 * High-performance GPU THREE.InstancedMesh quad billboarding with sub-frame distance
 * interpolation, pseudo-curl turbulence, and 15-second non-linear dissipation.
 */
export class ThrusterTrailSystem {
  constructor(scene) {
    this.scene = scene;
    this.maxParticles = 2400;
    this.particles = [];
    this.simTime = 0;
    this.maxAge = 15.0; // Lingers across 15 seconds

    // Shared plane quad geometry for GPU instancing
    this.planeGeo = new THREE.PlaneGeometry(1, 1);
    this.glowTexture = createRadialGlowTexture(64);

    this.material = new THREE.MeshBasicMaterial({
      map: this.glowTexture,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.InstancedMesh(this.planeGeo, this.material, this.maxParticles);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles * 3), 3);
    this.mesh.instanceColor.setUsage(THREE.DynamicDrawUsage);

    // Disable frustum culling so trails never vanish when looking away or turning
    this.mesh.frustumCulled = false;

    // Backwards compatibility alias for points property
    this.points = this.mesh;

    // Initialize all instance matrices off-screen
    for (let i = 0; i < this.maxParticles; i++) {
      this.mesh.setMatrixAt(i, _hideMatrix);
    }
    this.mesh.instanceMatrix.needsUpdate = true;

    this.scene.add(this.mesh);

    // Per-emitter last position for sub-frame distance interpolation
    this.lastEmitPos = new Map();
  }

  /**
   * Internal puff spawner
   */
  _spawnPuff(pos, isHostile, jitterScale = 1.0) {
    if (this.particles.length >= this.maxParticles) {
      this.particles.shift();
    }

    const jitterX = (Math.random() - 0.5) * 0.45 * jitterScale;
    const jitterY = (Math.random() - 0.5) * 0.45 * jitterScale;
    const jitterZ = (Math.random() - 0.5) * 0.45 * jitterScale;

    this.particles.push({
      x: pos.x + jitterX,
      y: pos.y + jitterY,
      z: pos.z + jitterZ,
      vx: jitterX * 0.4,
      vy: jitterY * 0.4,
      vz: jitterZ * 0.4,
      age: 0,
      maxAge: this.maxAge,
      isHostile,
      baseScale: 1.8 + Math.random() * 1.4
    });
  }

  /**
   * Drops thruster trail puffs behind a ship nozzle with sub-frame distance interpolation.
   */
  emit(shipPosition, forwardVector, isHostile = false, emitterId = 'default') {
    // Nozzle offset along -forward
    _scratchVecA.copy(shipPosition).addScaledVector(forwardVector, -2.4);

    let lastPos = this.lastEmitPos.get(emitterId);
    if (lastPos) {
      const dist = _scratchVecA.distanceTo(lastPos);
      if (dist > 0.6 && dist < 40.0) {
        // Interpolate intermediate sub-frame puffs so fast turns & high-speed flight
        // create a continuous, dense glowing ribbon without discrete dot gaps
        const steps = Math.min(10, Math.floor(dist / 0.7));
        for (let s = 1; s <= steps; s++) {
          const alpha = s / (steps + 1);
          _scratchVecB.copy(lastPos).lerp(_scratchVecA, alpha);
          this._spawnPuff(_scratchVecB, isHostile, 0.8);
        }
      }
      lastPos.copy(_scratchVecA);
    } else {
      this.lastEmitPos.set(emitterId, _scratchVecA.clone());
    }

    // Dual-nozzle or central high-density puff at current position
    this._spawnPuff(_scratchVecA, isHostile, 1.0);
  }

  /**
   * Updates particle simulation and billboards InstancedMesh quads toward camera
   */
  update(dt, camera = null) {
    this.simTime += dt;

    if (camera && camera.quaternion) {
      _camQuat.copy(camera.quaternion);
    } else {
      _camQuat.identity();
    }

    const activeCount = this.particles.length;

    for (let i = activeCount - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age += dt;

      if (p.age >= p.maxAge) {
        this.particles.splice(i, 1);
        continue;
      }

      // Pseudo-curl turbulence and zero-g drift
      p.x += (p.vx + Math.sin(p.y * 0.25 + this.simTime * 2.2) * 0.28) * dt;
      p.y += (p.vy + Math.cos(p.x * 0.25 + this.simTime * 2.2) * 0.28) * dt;
      p.z += (p.vz + Math.sin(p.z * 0.25 + this.simTime * 2.2) * 0.28) * dt;

      // Dynamic scale expansion as plasma plume diffuses in space vacuum
      const normAge = p.age / p.maxAge;
      const scale = p.baseScale * (1.0 + normAge * 3.8);

      _dummy.position.set(p.x, p.y, p.z);
      _dummy.quaternion.copy(_camQuat);
      _dummy.scale.set(scale, scale, scale);
      _dummy.updateMatrix();

      this.mesh.setMatrixAt(i, _dummy.matrix);

      // 15-second non-linear dissipation curve
      const lifeRatio = 1.0 - normAge;
      const intensity = Math.pow(lifeRatio, 1.6);

      if (p.isHostile) {
        // Incandescent fiery orange core -> deep crimson smoke
        if (normAge < 0.15) {
          _color.setRGB(1.0 * intensity, 0.85 * intensity, 0.3 * intensity);
        } else {
          _color.setRGB(1.0 * intensity, 0.32 * intensity, 0.08 * intensity);
        }
      } else {
        // Blazing electric cyan/white core -> deep azure space wake
        if (normAge < 0.15) {
          _color.setRGB(0.75 * intensity, 0.95 * intensity, 1.0 * intensity);
        } else {
          _color.setRGB(0.12 * intensity, 0.72 * intensity, 1.0 * intensity);
        }
      }

      this.mesh.setColorAt(i, _color);
    }

    // Hide inactive instances beyond active particle count
    for (let i = this.particles.length; i < this.maxParticles; i++) {
      this.mesh.setMatrixAt(i, _hideMatrix);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) {
      this.mesh.instanceColor.needsUpdate = true;
    }
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
