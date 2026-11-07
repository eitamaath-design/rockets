import * as THREE from 'three';

/**
 * Inactivity Engagement Beacon System.
 * Emits expanding light ripples and holographic shockwaves from ships when
 * neither player has engaged in combat for over 30 seconds.
 */
export class EngagementBeaconSystem {
  constructor(scene) {
    this.scene = scene;
    this.ripples = [];

    // Reusable ripple geometries
    this.ringGeom = new THREE.RingGeometry(0.8, 1.2, 32);
    this.ringGeom.rotateX(Math.PI / 2);

    this.sphereGeom = new THREE.IcosahedronGeometry(1.0, 2);
  }

  /**
   * Spawns a high-visibility engagement ripple wave expanding outward from ship
   */
  emitRipple(origin, color = 0x00e5ff) {
    const group = new THREE.Group();
    group.position.copy(origin);

    // 1. Expanding wireframe holographic sphere
    const sphereMat = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const sphereMesh = new THREE.Mesh(this.sphereGeom, sphereMat);
    group.add(sphereMesh);

    // 2. Horizon ripple ring
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const ringMesh = new THREE.Mesh(this.ringGeom, ringMat);
    group.add(ringMesh);

    // 3. Dynamic pulsed point light
    const light = new THREE.PointLight(color, 4.0, 180);
    group.add(light);

    this.scene.add(group);

    this.ripples.push({
      group,
      sphereMesh,
      ringMesh,
      light,
      age: 0,
      maxAge: 2.5, // 2.5s expansion
      maxRadius: 280
    });
  }

  update(dt) {
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.age += dt;

      if (r.age >= r.maxAge) {
        this.scene.remove(r.group);
        this.ripples.splice(i, 1);
        continue;
      }

      const progress = r.age / r.maxAge;
      // Exponential outward expansion wave
      const currentRadius = 2.0 + Math.pow(progress, 0.75) * r.maxRadius;
      const opacity = Math.max(0, (1.0 - progress) * 0.9);

      r.sphereMesh.scale.set(currentRadius, currentRadius, currentRadius);
      r.sphereMesh.material.opacity = opacity;

      r.ringMesh.scale.set(currentRadius * 1.05, currentRadius * 1.05, currentRadius * 1.05);
      r.ringMesh.material.opacity = opacity * 1.2;

      r.light.distance = currentRadius * 1.5;
      r.light.intensity = Math.max(0, (1.0 - progress) * 4.5);
    }
  }

  cleanup() {
    for (const r of this.ripples) {
      this.scene.remove(r.group);
    }
    this.ripples = [];
  }
}
