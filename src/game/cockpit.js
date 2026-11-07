import * as THREE from 'three';

export class Cockpit {
  constructor(camera) {
    this.camera = camera;
    this.group = new THREE.Group();
    this.camera.add(this.group);

    // Subtle inertia tilt offsets
    this.targetOffset = new THREE.Vector3();
    this.currentOffset = new THREE.Vector3();
    this.targetRotation = new THREE.Euler();
    this.currentRotation = new THREE.Euler();

    // Damage flash material
    this.shieldGlassMat = null;
    this.damageFlashTimer = 0;

    this.createCockpitModel();
  }

  createCockpitModel() {
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a2230,
      roughness: 0.3,
      metalness: 0.85,
      flatShading: true
    });

    const glowAccentMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: false
    });

    // 1. Sleek low-profile lower cockpit rim (tucked way below sightline at y = -0.42)
    const rimGeom = new THREE.BoxGeometry(1.6, 0.04, 0.2);
    const rimMesh = new THREE.Mesh(rimGeom, frameMaterial);
    rimMesh.position.set(0, -0.42, -0.55);
    rimMesh.rotation.x = 0.25;
    this.group.add(rimMesh);

    // Glowing telemetry line along bottom rim
    const glowLineGeom = new THREE.BoxGeometry(1.2, 0.006, 0.01);
    const glowLine = new THREE.Mesh(glowLineGeom, glowAccentMaterial);
    glowLine.position.set(0, -0.40, -0.54);
    glowLine.rotation.x = 0.25;
    this.group.add(glowLine);

    // 2. Peripheral Outer Canopy Pillars (pushed far to the outer sides at x = +/-0.72)
    const pillarGeom = new THREE.BoxGeometry(0.03, 0.9, 0.04);
    const leftPillar = new THREE.Mesh(pillarGeom, frameMaterial);
    leftPillar.position.set(-0.72, 0.08, -0.5);
    leftPillar.rotation.set(-0.15, 0.15, 0.42);
    this.group.add(leftPillar);

    const rightPillar = leftPillar.clone();
    rightPillar.position.set(0.72, 0.08, -0.5);
    rightPillar.rotation.set(-0.15, -0.15, -0.42);
    this.group.add(rightPillar);

    // 3. Subtle Glass Canopy with Shield Flash Effect (depthWrite: false is essential)
    const glassGeom = new THREE.SphereGeometry(0.75, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.45);
    this.shieldGlassMat = new THREE.MeshBasicMaterial({
      color: 0x00e1ff,
      transparent: true,
      opacity: 0.03,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const glassMesh = new THREE.Mesh(glassGeom, this.shieldGlassMat);
    glassMesh.position.set(0, 0, 0.1);
    this.group.add(glassMesh);

    // 4. Dual Wing Cannon Barrels at lower periphery corners (x = +/-0.52, y = -0.32)
    const barrelGeom = new THREE.CylinderGeometry(0.022, 0.03, 0.55, 8);
    const leftBarrel = new THREE.Mesh(barrelGeom, frameMaterial);
    leftBarrel.position.set(-0.52, -0.32, -0.65);
    leftBarrel.rotation.x = Math.PI / 2;
    this.group.add(leftBarrel);

    const rightBarrel = leftBarrel.clone();
    rightBarrel.position.set(0.52, -0.32, -0.65);
    this.group.add(rightBarrel);

    // Muzzle emitter rings on barrels
    const muzzleRingGeom = new THREE.TorusGeometry(0.026, 0.006, 6, 12);
    const leftMuzzle = new THREE.Mesh(muzzleRingGeom, glowAccentMaterial);
    leftMuzzle.position.set(-0.52, -0.32, -0.92);
    this.group.add(leftMuzzle);

    const rightMuzzle = leftMuzzle.clone();
    rightMuzzle.position.set(0.52, -0.32, -0.92);
    this.group.add(rightMuzzle);
  }

  triggerDamageFlash() {
    this.damageFlashTimer = 0.35; // seconds
  }

  update(dt, flightInput, velocity) {
    // Dynamic cockpit inertia & G-force reaction
    const speed = velocity ? velocity.length() : 0;
    const accelG = flightInput.thrust ? 0.015 : (flightInput.brake ? -0.015 : 0);
    const strafeG = flightInput.strafe * 0.02;
    const pitchG = flightInput.pitch * 0.012;
    const rollG = flightInput.roll * 0.02;

    this.targetOffset.set(-strafeG, -pitchG, accelG);
    this.targetRotation.set(-pitchG * 1.5, -strafeG * 1.2, -rollG);

    // Smooth damp
    this.currentOffset.lerp(this.targetOffset, dt * 10);
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * dt * 10;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * dt * 10;
    this.currentRotation.z += (this.targetRotation.z - this.currentRotation.z) * dt * 10;

    this.group.position.copy(this.currentOffset);
    this.group.rotation.copy(this.currentRotation);

    // Shield glass hit flash
    if (this.damageFlashTimer > 0) {
      this.damageFlashTimer -= dt;
      if (this.shieldGlassMat) {
        this.shieldGlassMat.color.setHex(0xff2244);
        this.shieldGlassMat.opacity = Math.max(0.04, this.damageFlashTimer * 0.8);
      }
    } else {
      if (this.shieldGlassMat) {
        this.shieldGlassMat.color.setHex(0x00e1ff);
        this.shieldGlassMat.opacity = 0.04;
      }
    }
  }
}
