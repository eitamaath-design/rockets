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
      color: 0x181c24,
      roughness: 0.4,
      metalness: 0.8,
      flatShading: true
    });

    const interiorPanelMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f131a,
      roughness: 0.6,
      metalness: 0.5
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: false
    });

    // 1. Lower Dashboard Console
    const dashGeom = new THREE.CylinderGeometry(0.55, 0.65, 0.4, 8, 1, false, Math.PI * 0.7, Math.PI * 0.6);
    const dashMesh = new THREE.Mesh(dashGeom, interiorPanelMaterial);
    dashMesh.position.set(0, -0.28, -0.45);
    dashMesh.rotation.x = 0.35;
    this.group.add(dashMesh);

    // 2. Cockpit Canopy Frame Struts (Left, Right, Top arch)
    // Left Strut
    const leftStrutGeom = new THREE.BoxGeometry(0.025, 0.7, 0.035);
    const leftStrut = new THREE.Mesh(leftStrutGeom, frameMaterial);
    leftStrut.position.set(-0.45, 0.05, -0.45);
    leftStrut.rotation.set(-0.25, 0.2, 0.3);
    this.group.add(leftStrut);

    // Right Strut
    const rightStrut = leftStrut.clone();
    rightStrut.position.set(0.45, 0.05, -0.45);
    rightStrut.rotation.set(-0.25, -0.2, -0.3);
    this.group.add(rightStrut);

    // Top Overhead Canopy Arch
    const topArchGeom = new THREE.BoxGeometry(0.85, 0.025, 0.04);
    const topArch = new THREE.Mesh(topArchGeom, frameMaterial);
    topArch.position.set(0, 0.38, -0.5);
    this.group.add(topArch);

    // Center Overhead Spine Strut
    const centerSpineGeom = new THREE.BoxGeometry(0.03, 0.025, 0.8);
    const centerSpine = new THREE.Mesh(centerSpineGeom, frameMaterial);
    centerSpine.position.set(0, 0.39, -0.1);
    this.group.add(centerSpine);

    // 3. Dashboard Displays / Holographic Screens
    // Center holographic radar plate
    const radarPlateGeom = new THREE.CircleGeometry(0.08, 16);
    const radarMat = new THREE.MeshBasicMaterial({
      color: 0x00ffcc,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      depthWrite: false
    });
    const radarMesh = new THREE.Mesh(radarPlateGeom, radarMat);
    radarMesh.position.set(0, -0.21, -0.46);
    radarMesh.rotation.x = -0.5;
    this.group.add(radarMesh);

    // Left Console Monitor (Shields / Status)
    const monitorGeom = new THREE.PlaneGeometry(0.12, 0.08);
    const monitorLeftMat = new THREE.MeshBasicMaterial({
      color: 0x0088ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false
    });
    const monitorLeft = new THREE.Mesh(monitorGeom, monitorLeftMat);
    monitorLeft.position.set(-0.22, -0.2, -0.47);
    monitorLeft.rotation.set(-0.4, 0.3, 0);
    this.group.add(monitorLeft);

    // Right Console Monitor (Weapons / Mines)
    const monitorRightMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false
    });
    const monitorRight = new THREE.Mesh(monitorGeom, monitorRightMat);
    monitorRight.position.set(0.22, -0.2, -0.47);
    monitorRight.rotation.set(-0.4, -0.3, 0);
    this.group.add(monitorRight);

    // 4. Subtle Glass Canopy with Shield Flash Effect
    const glassGeom = new THREE.SphereGeometry(0.75, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.45);
    this.shieldGlassMat = new THREE.MeshBasicMaterial({
      color: 0x00e1ff,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false // Essential: never write depth on transparent canopy or it blocks the outer 3D world!
    });
    const glassMesh = new THREE.Mesh(glassGeom, this.shieldGlassMat);
    glassMesh.position.set(0, 0, 0.1);
    this.group.add(glassMesh);

    // 5. Cannon Barrels visible at lower periphery
    const barrelGeom = new THREE.CylinderGeometry(0.02, 0.025, 0.6, 8);
    const leftBarrel = new THREE.Mesh(barrelGeom, frameMaterial);
    leftBarrel.position.set(-0.48, -0.25, -0.6);
    leftBarrel.rotation.x = Math.PI / 2;
    this.group.add(leftBarrel);

    const rightBarrel = leftBarrel.clone();
    rightBarrel.position.set(0.48, -0.25, -0.6);
    this.group.add(rightBarrel);
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
