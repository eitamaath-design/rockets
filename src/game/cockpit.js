import * as THREE from 'three';

/**
 * Slim Low-Profile Panoramic Cockpit
 * Redesigned to maximize the pilot's view of the galaxy, black hole, and asteroid field.
 * Lowers instrument consoles and pushes canopy pillars to the extreme periphery.
 */
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

    // Damage flash material & interactive lights
    this.shieldGlassMat = null;
    this.damageFlashTimer = 0;
    this.boostKickZ = 0;
    this.accentMaterials = [];
    this.consoleWarningMat = null;

    this.createCockpitModel();
  }

  createCockpitModel() {
    // Ultra-slim dark titanium frame material
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x111620,
      roughness: 0.35,
      metalness: 0.90,
      flatShading: true
    });

    const alloyMat = new THREE.MeshStandardMaterial({
      color: 0x1e2430,
      roughness: 0.45,
      metalness: 0.80,
      flatShading: true
    });

    // Tactical cyan display glow
    const cyanDisplayMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff
    });
    this.accentMaterials.push(cyanDisplayMat);

    // Tactical amber status glow
    const amberDisplayMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00
    });
    this.accentMaterials.push(amberDisplayMat);

    this.consoleWarningMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88
    });

    // ==========================================
    // 1. Ultra-Low Profile Flight Console
    // Tucked way below sightline at y = -0.58
    // ==========================================
    const dashCenterGeom = new THREE.BoxGeometry(0.50, 0.14, 0.35);
    const dashCenter = new THREE.Mesh(dashCenterGeom, frameMat);
    dashCenter.position.set(0, -0.58, -0.55);
    dashCenter.rotation.x = 0.55;
    this.group.add(dashCenter);

    // Slim Left & Right wing coamings
    const dashLeftGeom = new THREE.BoxGeometry(0.48, 0.12, 0.32);
    const dashLeft = new THREE.Mesh(dashLeftGeom, frameMat);
    dashLeft.position.set(-0.52, -0.59, -0.52);
    dashLeft.rotation.set(0.50, 0.28, -0.12);
    this.group.add(dashLeft);

    const dashRightGeom = new THREE.BoxGeometry(0.48, 0.12, 0.32);
    const dashRight = new THREE.Mesh(dashRightGeom, frameMat);
    dashRight.position.set(0.52, -0.59, -0.52);
    dashRight.rotation.set(0.50, -0.28, 0.12);
    this.group.add(dashRight);

    // Slim MFD Screen bezels
    const mfdScreenGeom = new THREE.PlaneGeometry(0.18, 0.08);
    const leftScreen = new THREE.Mesh(mfdScreenGeom, new THREE.MeshBasicMaterial({ color: 0x001824 }));
    leftScreen.position.set(-0.50, -0.53, -0.47);
    leftScreen.rotation.set(0.50, 0.28, -0.12);
    this.group.add(leftScreen);

    const rightScreen = new THREE.Mesh(mfdScreenGeom, new THREE.MeshBasicMaterial({ color: 0x201400 }));
    rightScreen.position.set(0.50, -0.53, -0.47);
    rightScreen.rotation.set(0.50, -0.28, 0.12);
    this.group.add(rightScreen);

    // Glowing tactical telemetry line along lower coaming
    const conduitGeom = new THREE.CylinderGeometry(0.003, 0.003, 1.4, 6);
    conduitGeom.rotateZ(Math.PI / 2);
    const conduit = new THREE.Mesh(conduitGeom, cyanDisplayMat);
    conduit.position.set(0, -0.54, -0.48);
    conduit.rotation.x = 0.50;
    this.group.add(conduit);

    // ==========================================
    // 2. Peripheral Canopy Arches (Pushed far to sides x = +/-0.92)
    // ==========================================
    const pillarGeom = new THREE.BoxGeometry(0.024, 1.15, 0.035);
    const leftPillar = new THREE.Mesh(pillarGeom, frameMat);
    leftPillar.position.set(-0.92, 0.16, -0.48);
    leftPillar.rotation.set(-0.12, 0.12, 0.52);
    this.group.add(leftPillar);

    const rightPillar = leftPillar.clone();
    rightPillar.position.set(0.92, 0.16, -0.48);
    rightPillar.rotation.set(-0.12, -0.12, -0.52);
    this.group.add(rightPillar);

    // Slim overhead canopy arch (lifted way up to y = 0.72)
    const visorBrowGeom = new THREE.BoxGeometry(1.6, 0.03, 0.14);
    const visorBrow = new THREE.Mesh(visorBrowGeom, frameMat);
    visorBrow.position.set(0, 0.72, -0.52);
    visorBrow.rotation.x = -0.22;
    this.group.add(visorBrow);

    // Panoramic Hexagonal-Tint Shield Glass
    const glassGeom = new THREE.SphereGeometry(0.82, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.46);
    this.shieldGlassMat = new THREE.MeshBasicMaterial({
      color: 0x00e1ff,
      transparent: true,
      opacity: 0.025,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const glassMesh = new THREE.Mesh(glassGeom, this.shieldGlassMat);
    glassMesh.position.set(0, 0, 0.08);
    this.group.add(glassMesh);

    // ==========================================
    // 3. Compact Wing Cannon Barrels (Pushed outwards)
    // ==========================================
    this.createCompactCannon(-0.72, -0.44, -0.65, frameMat, alloyMat, cyanDisplayMat);
    this.createCompactCannon(0.72, -0.44, -0.65, frameMat, alloyMat, cyanDisplayMat);
  }

  createCompactCannon(x, y, z, frameMat, alloyMat, cyanGlowMat) {
    const cannonGroup = new THREE.Group();
    cannonGroup.position.set(x, y, z);

    // Compact Fluted Alloy Barrel
    const barrelGeom = new THREE.CylinderGeometry(0.018, 0.022, 0.55, 8);
    barrelGeom.rotateX(Math.PI / 2);
    const barrel = new THREE.Mesh(barrelGeom, alloyMat);
    barrel.position.set(0, 0, -0.22);
    cannonGroup.add(barrel);

    // Glowing plasma emitter muzzle ring
    const coilGeom = new THREE.TorusGeometry(0.024, 0.004, 6, 12);
    const coil = new THREE.Mesh(coilGeom, cyanGlowMat);
    coil.position.set(0, 0, -0.48);
    cannonGroup.add(coil);

    this.group.add(cannonGroup);
  }

  triggerDamageFlash() {
    this.damageFlashTimer = 0.38;
  }

  triggerBoostFlash() {
    this.boostKickZ = -0.06; // Sharp G-force pushback into seat
    if (this.shieldGlassMat) {
      this.shieldGlassMat.color.setHex(0x00ffff);
      this.shieldGlassMat.opacity = 0.20;
    }
  }

  update(dt, flightInput, velocity) {
    if (!this.boostKickZ) this.boostKickZ = 0;
    this.boostKickZ += (0 - this.boostKickZ) * dt * 9.0;

    // Cockpit inertia tilt
    const accelG = (flightInput.thrust ? 0.016 : (flightInput.brake ? -0.016 : 0)) + this.boostKickZ;
    const strafeG = flightInput.strafe * 0.020;
    const pitchG = flightInput.pitch * 0.012;
    const rollG = flightInput.roll * 0.018;

    this.targetOffset.set(-strafeG, -pitchG, accelG);
    this.targetRotation.set(-pitchG * 1.4, -strafeG * 1.1, -rollG);

    this.currentOffset.lerp(this.targetOffset, dt * 10);
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * dt * 10;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * dt * 10;
    this.currentRotation.z += (this.targetRotation.z - this.currentRotation.z) * dt * 10;

    this.group.position.copy(this.currentOffset);
    this.group.rotation.copy(this.currentRotation);

    // Shield glass damage flash
    if (this.damageFlashTimer > 0) {
      this.damageFlashTimer -= dt;
      if (this.shieldGlassMat) {
        this.shieldGlassMat.color.setHex(0xff2244);
        this.shieldGlassMat.opacity = Math.max(0.03, this.damageFlashTimer * 0.9);
      }
    } else {
      if (this.shieldGlassMat) {
        this.shieldGlassMat.color.setHex(0x00e1ff);
        this.shieldGlassMat.opacity = 0.025;
      }
    }
  }
}
