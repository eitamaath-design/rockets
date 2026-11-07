import * as THREE from 'three';

/**
 * First-Person Stealth Fighter Cockpit
 * Features high-tech tactical flight deck, multi-function avionics displays,
 * reinforced canopy roll-cage with hexagonal shield tint, and heavy wing-mounted
 * plasma autocannons with heat-sink cowlings.
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
    this.accentMaterials = [];
    this.consoleWarningMat = null;

    this.createCockpitModel();
  }

  createCockpitModel() {
    // High-grade dark carbon-titanium frame material
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x141820,
      roughness: 0.38,
      metalness: 0.85,
      flatShading: true
    });

    // Dark alloy housing
    const alloyMat = new THREE.MeshStandardMaterial({
      color: 0x222a36,
      roughness: 0.5,
      metalness: 0.75,
      flatShading: true
    });

    // Tactical cyan display glow
    const cyanDisplayMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: false
    });
    this.accentMaterials.push(cyanDisplayMat);

    // Tactical amber status glow
    const amberDisplayMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      wireframe: false
    });
    this.accentMaterials.push(amberDisplayMat);

    // Warning alert material
    this.consoleWarningMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: false
    });

    // ==========================================
    // 1. Lower Flight Deck & Instrument Dashboard
    // ==========================================
    // Center angled console coaming
    const dashCenterGeom = new THREE.BoxGeometry(0.55, 0.22, 0.45);
    const dashCenter = new THREE.Mesh(dashCenterGeom, frameMat);
    dashCenter.position.set(0, -0.44, -0.62);
    dashCenter.rotation.x = 0.42;
    this.group.add(dashCenter);

    // Left angled avionics dash wing
    const dashLeftGeom = new THREE.BoxGeometry(0.52, 0.20, 0.42);
    const dashLeft = new THREE.Mesh(dashLeftGeom, frameMat);
    dashLeft.position.set(-0.48, -0.45, -0.58);
    dashLeft.rotation.set(0.38, 0.26, -0.10);
    this.group.add(dashLeft);

    // Right angled avionics dash wing
    const dashRightGeom = new THREE.BoxGeometry(0.52, 0.20, 0.42);
    const dashRight = new THREE.Mesh(dashRightGeom, frameMat);
    dashRight.position.set(0.48, -0.45, -0.58);
    dashRight.rotation.set(0.38, -0.26, 0.10);
    this.group.add(dashRight);

    // Left Multi-Function Display (MFD) screen (Tactical Vector Screen)
    const mfdScreenGeom = new THREE.PlaneGeometry(0.24, 0.14);
    const leftScreen = new THREE.Mesh(mfdScreenGeom, new THREE.MeshBasicMaterial({ color: 0x001a26 }));
    leftScreen.position.set(-0.46, -0.37, -0.52);
    leftScreen.rotation.set(0.38, 0.26, -0.10);
    this.group.add(leftScreen);

    // Left screen glowing vector lines
    const mfdLine1 = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.005), cyanDisplayMat);
    mfdLine1.position.set(-0.46, -0.35, -0.518);
    mfdLine1.rotation.set(0.38, 0.26, -0.10);
    this.group.add(mfdLine1);

    const mfdLine2 = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.004), cyanDisplayMat);
    mfdLine2.position.set(-0.46, -0.39, -0.518);
    mfdLine2.rotation.set(0.38, 0.26, -0.10);
    this.group.add(mfdLine2);

    // Right Multi-Function Display (Engine & Shield Telemetry Screen)
    const rightScreen = new THREE.Mesh(mfdScreenGeom, new THREE.MeshBasicMaterial({ color: 0x221500 }));
    rightScreen.position.set(0.46, -0.37, -0.52);
    rightScreen.rotation.set(0.38, -0.26, 0.10);
    this.group.add(rightScreen);

    const mfdLine3 = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.005), amberDisplayMat);
    mfdLine3.position.set(0.46, -0.35, -0.518);
    mfdLine3.rotation.set(0.38, -0.26, 0.10);
    this.group.add(mfdLine3);

    // Center Flight Attitude / Gyro Display Bezel
    const gyroRingGeom = new THREE.RingGeometry(0.045, 0.055, 16);
    const gyroRing = new THREE.Mesh(gyroRingGeom, cyanDisplayMat);
    gyroRing.position.set(0, -0.36, -0.54);
    gyroRing.rotation.x = -Math.PI / 3.2;
    this.group.add(gyroRing);

    // Center HUD warning diode
    const diodeGeom = new THREE.CircleGeometry(0.012, 8);
    const diode = new THREE.Mesh(diodeGeom, this.consoleWarningMat);
    diode.position.set(0, -0.30, -0.56);
    diode.rotation.x = -Math.PI / 3.2;
    this.group.add(diode);

    // Glowing Fiber-Optic Telemetry Conduit running along dash edge
    const conduitGeom = new THREE.CylinderGeometry(0.004, 0.004, 1.4, 6);
    conduitGeom.rotateZ(Math.PI / 2);
    const conduit = new THREE.Mesh(conduitGeom, cyanDisplayMat);
    conduit.position.set(0, -0.40, -0.53);
    conduit.rotation.x = 0.38;
    this.group.add(conduit);

    // ==========================================
    // 2. Reinforced Aerospace Canopy Frame & Visor
    // ==========================================
    // Left A-Pillar (stealth faceted angle)
    const pillarGeom = new THREE.BoxGeometry(0.038, 1.05, 0.05);
    const leftPillar = new THREE.Mesh(pillarGeom, frameMat);
    leftPillar.position.set(-0.76, 0.12, -0.52);
    leftPillar.rotation.set(-0.16, 0.16, 0.44);
    this.group.add(leftPillar);

    const rightPillar = leftPillar.clone();
    rightPillar.position.set(0.76, 0.12, -0.52);
    rightPillar.rotation.set(-0.16, -0.16, -0.44);
    this.group.add(rightPillar);

    // Structural Gusset Brackets at canopy base
    const gussetGeom = new THREE.BoxGeometry(0.06, 0.08, 0.12);
    const leftGusset = new THREE.Mesh(gussetGeom, alloyMat);
    leftGusset.position.set(-0.72, -0.28, -0.54);
    this.group.add(leftGusset);

    const rightGusset = leftGusset.clone();
    rightGusset.position.set(0.72, -0.28, -0.54);
    this.group.add(rightGusset);

    // Overhead Cockpit Visor Brow
    const visorBrowGeom = new THREE.BoxGeometry(1.3, 0.06, 0.22);
    const visorBrow = new THREE.Mesh(visorBrowGeom, frameMat);
    visorBrow.position.set(0, 0.58, -0.56);
    visorBrow.rotation.x = -0.24;
    this.group.add(visorBrow);

    // Overhead cabin amber status light
    const cabinLightGeom = new THREE.BoxGeometry(0.18, 0.008, 0.015);
    const cabinLight = new THREE.Mesh(cabinLightGeom, amberDisplayMat);
    cabinLight.position.set(0, 0.56, -0.54);
    cabinLight.rotation.x = -0.24;
    this.group.add(cabinLight);

    // Panoramic Hexagonal-Tint Shield Glass
    const glassGeom = new THREE.SphereGeometry(0.78, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.46);
    this.shieldGlassMat = new THREE.MeshBasicMaterial({
      color: 0x00e1ff,
      transparent: true,
      opacity: 0.035,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const glassMesh = new THREE.Mesh(glassGeom, this.shieldGlassMat);
    glassMesh.position.set(0, 0, 0.08);
    this.group.add(glassMesh);

    // ==========================================
    // 3. Heavy Wing Plasma Autocannons
    // ==========================================
    this.createCannonAssembly(-0.56, -0.32, -0.72, frameMat, alloyMat, cyanDisplayMat);
    this.createCannonAssembly(0.56, -0.32, -0.72, frameMat, alloyMat, cyanDisplayMat);
  }

  createCannonAssembly(x, y, z, frameMat, alloyMat, cyanGlowMat) {
    const cannonGroup = new THREE.Group();
    cannonGroup.position.set(x, y, z);

    // 1. Heavy Armored Cannon Nacelle Cowling
    const nacelleGeom = new THREE.BoxGeometry(0.09, 0.08, 0.48);
    const nacelle = new THREE.Mesh(nacelleGeom, frameMat);
    nacelle.position.set(0, 0, 0.12);
    cannonGroup.add(nacelle);

    // Heat-sink cooling vent fins on nacelle top
    for (let f = 0; f < 3; f++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.012, 0.02), alloyMat);
      fin.position.set(0, 0.045, 0.02 + f * 0.06);
      cannonGroup.add(fin);
    }

    // 2. Heavy Alloy Fluted Gun Barrel
    const barrelGeom = new THREE.CylinderGeometry(0.022, 0.028, 0.65, 8);
    barrelGeom.rotateX(Math.PI / 2);
    const barrel = new THREE.Mesh(barrelGeom, alloyMat);
    barrel.position.set(0, 0, -0.28);
    cannonGroup.add(barrel);

    // 3. Heavy Multi-Port Muzzle Brake
    const muzzleBrakeGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.09, 8);
    muzzleBrakeGeom.rotateX(Math.PI / 2);
    const muzzleBrake = new THREE.Mesh(muzzleBrakeGeom, frameMat);
    muzzleBrake.position.set(0, 0, -0.62);
    cannonGroup.add(muzzleBrake);

    // 4. Glowing Plasma Accelerator Coil Rings
    const coilGeom = new THREE.TorusGeometry(0.029, 0.005, 6, 12);
    const coil1 = new THREE.Mesh(coilGeom, cyanGlowMat);
    coil1.position.set(0, 0, -0.16);
    cannonGroup.add(coil1);

    const coil2 = coil1.clone();
    coil2.position.set(0, 0, -0.38);
    cannonGroup.add(coil2);

    this.group.add(cannonGroup);
  }

  triggerDamageFlash() {
    this.damageFlashTimer = 0.40;
  }

  update(dt, flightInput, velocity) {
    // Dynamic cockpit inertia & G-force reaction
    const accelG = flightInput.thrust ? 0.016 : (flightInput.brake ? -0.016 : 0);
    const strafeG = flightInput.strafe * 0.022;
    const pitchG = flightInput.pitch * 0.014;
    const rollG = flightInput.roll * 0.022;

    this.targetOffset.set(-strafeG, -pitchG, accelG);
    this.targetRotation.set(-pitchG * 1.5, -strafeG * 1.2, -rollG);

    // Smooth damp
    this.currentOffset.lerp(this.targetOffset, dt * 10);
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * dt * 10;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * dt * 10;
    this.currentRotation.z += (this.targetRotation.z - this.currentRotation.z) * dt * 10;

    this.group.position.copy(this.currentOffset);
    this.group.rotation.copy(this.currentRotation);

    // Shield glass hit flash & warning diode
    if (this.damageFlashTimer > 0) {
      this.damageFlashTimer -= dt;
      if (this.shieldGlassMat) {
        this.shieldGlassMat.color.setHex(0xff2244);
        this.shieldGlassMat.opacity = Math.max(0.04, this.damageFlashTimer * 0.9);
      }
      if (this.consoleWarningMat) {
        this.consoleWarningMat.color.setHex(0xff1122);
      }
    } else {
      if (this.shieldGlassMat) {
        this.shieldGlassMat.color.setHex(0x00e1ff);
        this.shieldGlassMat.opacity = 0.035;
      }
      if (this.consoleWarningMat) {
        this.consoleWarningMat.color.setHex(0x00ff88);
      }
    }
  }
}
