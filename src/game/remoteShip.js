import * as THREE from 'three';

export class RemoteShip {
  constructor(peerId, scene, playerName = 'Pilot') {
    this.peerId = peerId;
    this.scene = scene;
    this.playerName = playerName;

    this.group = new THREE.Group();
    this.position = this.group.position;
    this.quaternion = this.group.quaternion;

    // Netcode / Interpolation buffers
    this.lastReceivedState = null;
    this.targetPosition = new THREE.Vector3();
    this.targetQuaternion = new THREE.Quaternion();
    this.targetVelocity = new THREE.Vector3();
    this.velocity = this.targetVelocity;
    this.lastPacketTime = performance.now();

    // Stats
    this.hp = 100;
    this.maxHp = 100;
    this.shield = 100;
    this.maxShield = 100;
    this.isDead = false;
    this.isThrusting = false;
    this.strafeState = 0; // -1, 0, 1

    // Visual meshes & effects
    this.coreFlares = [];
    this.engineFlares = [];
    this.sideThrusterFlares = [];
    this.shieldMesh = null;
    this.starGlowMesh = null;
    this.nameCanvas = null;
    this.nameSprite = null;

    // Reusable vector for zero-allocation distance calculation in update
    this._worldPos = new THREE.Vector3();

    this.createShipMesh();
    this.createNameplate();
    this.scene.add(this.group);

    // Scale the entire remote ship group 5x (matching PlayerShip 5x scaling: radius 14.0, length 28.0)
    this.group.scale.set(5.0, 5.0, 5.0);
  }

  createShipMesh() {
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x9e2424, // Opponent crimson stealth armor
      roughness: 0.35,
      metalness: 0.85,
      flatShading: true
    });

    const darkAlloyMat = new THREE.MeshStandardMaterial({
      color: 0x181c24,
      roughness: 0.45,
      metalness: 0.80,
      flatShading: true
    });

    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      roughness: 0.12,
      metalness: 0.95,
      emissive: 0x003b52,
      emissiveIntensity: 0.6
    });

    const glowAccentMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff
    });

    // 1. Chiseled Forward Stealth Nosecone (Faceted needle nose)
    const noseGeom = new THREE.ConeGeometry(0.75, 2.6, 5);
    noseGeom.rotateX(-Math.PI / 2);
    const nose = new THREE.Mesh(noseGeom, hullMat);
    nose.position.set(0, 0, -2.1);
    this.group.add(nose);

    // Forward Canard Wings
    const canardGeom = new THREE.BoxGeometry(1.8, 0.04, 0.6);
    const canards = new THREE.Mesh(canardGeom, darkAlloyMat);
    canards.position.set(0, 0.05, -1.5);
    this.group.add(canards);

    // 2. Main Center Hull Chassis
    const hullGeom = new THREE.BoxGeometry(1.4, 0.8, 3.2);
    const mainHull = new THREE.Mesh(hullGeom, hullMat);
    mainHull.position.set(0, 0, 0.2);
    this.group.add(mainHull);

    // Lateral Recessed Plasma Intake Cowlings
    const intakeGeom = new THREE.BoxGeometry(0.35, 0.55, 1.8);
    const leftIntake = new THREE.Mesh(intakeGeom, darkAlloyMat);
    leftIntake.position.set(-0.85, -0.05, 0.1);
    this.group.add(leftIntake);

    const rightIntake = leftIntake.clone();
    rightIntake.position.set(0.85, -0.05, 0.1);
    this.group.add(rightIntake);

    // 3. Faceted Stealth Cockpit Canopy
    const canopyGeom = new THREE.ConeGeometry(0.48, 1.8, 5);
    canopyGeom.rotateX(-Math.PI / 2);
    const canopy = new THREE.Mesh(canopyGeom, canopyMat);
    canopy.position.set(0, 0.44, -0.4);
    this.group.add(canopy);

    // 4. Swept Compound Delta Wings
    const wingGeom = new THREE.BoxGeometry(5.8, 0.08, 2.0);
    const wing = new THREE.Mesh(wingGeom, hullMat);
    wing.position.set(0, -0.08, 0.6);
    this.group.add(wing);

    // Underwing Heavy Plasma Cannon Pods
    const podGeom = new THREE.CylinderGeometry(0.10, 0.12, 1.6, 8);
    podGeom.rotateX(Math.PI / 2);
    const leftPod = new THREE.Mesh(podGeom, darkAlloyMat);
    leftPod.position.set(-1.8, -0.22, 0.3);
    this.group.add(leftPod);

    const rightPod = leftPod.clone();
    rightPod.position.set(1.8, -0.22, 0.3);
    this.group.add(rightPod);

    // Wingtip Plasma Accelerator Rings
    const ringGeom = new THREE.TorusGeometry(0.12, 0.02, 6, 12);
    const leftRing = new THREE.Mesh(ringGeom, glowAccentMat);
    leftRing.position.set(-1.8, -0.22, -0.5);
    this.group.add(leftRing);

    const rightRing = leftRing.clone();
    rightRing.position.set(1.8, -0.22, -0.5);
    this.group.add(rightRing);

    // 5. Twin Canted Vertical Stabilizer Tailfins (Stealth V-Tail)
    const finGeom = new THREE.BoxGeometry(0.08, 1.25, 1.2);
    const leftFin = new THREE.Mesh(finGeom, darkAlloyMat);
    leftFin.position.set(-0.65, 0.62, 1.2);
    leftFin.rotation.z = -0.32; // canted outwards
    this.group.add(leftFin);

    const rightFin = leftFin.clone();
    rightFin.position.set(0.65, 0.62, 1.2);
    rightFin.rotation.z = 0.32;
    this.group.add(rightFin);

    // 6. Dual Heavy Ion Thruster Nozzles
    const nozzleGeom = new THREE.CylinderGeometry(0.32, 0.42, 0.75, 10);
    nozzleGeom.rotateX(Math.PI / 2);

    const leftNozzle = new THREE.Mesh(nozzleGeom, darkAlloyMat);
    leftNozzle.position.set(-0.48, 0, 1.95);
    this.group.add(leftNozzle);

    const rightNozzle = leftNozzle.clone();
    rightNozzle.position.set(0.48, 0, 1.95);
    this.group.add(rightNozzle);

    // Glowing Ion Thruster Exhaust Coils
    const nozzleRingGeom = new THREE.TorusGeometry(0.30, 0.03, 6, 12);
    const leftNozzleRing = new THREE.Mesh(nozzleRingGeom, glowAccentMat);
    leftNozzleRing.position.set(-0.48, 0, 2.32);
    this.group.add(leftNozzleRing);

    const rightNozzleRing = leftNozzleRing.clone();
    rightNozzleRing.position.set(0.48, 0, 2.32);
    this.group.add(rightNozzleRing);

    // 7. Dynamic Plasma Thruster Exhaust Flares (Visible during active thrust)
    const flareGeom = new THREE.ConeGeometry(0.32, 2.6, 8);
    flareGeom.rotateX(-Math.PI / 2);
    const flareMat = new THREE.MeshBasicMaterial({
      color: 0x00c8ff,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending
    });

    const leftFlare = new THREE.Mesh(flareGeom, flareMat);
    leftFlare.position.set(-0.48, 0, 3.6);
    this.group.add(leftFlare);
    this.engineFlares.push(leftFlare);

    const rightFlare = leftFlare.clone();
    rightFlare.position.set(0.48, 0, 3.6);
    this.group.add(rightFlare);
    this.engineFlares.push(rightFlare);

    // Dedicated Bright Emissive Core Nozzle Flares (Long-distance engine visibility beacon)
    const coreFlareGeom = new THREE.SphereGeometry(0.55, 8, 8);
    const coreFlareMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });

    const leftCoreFlare = new THREE.Mesh(coreFlareGeom, coreFlareMat);
    leftCoreFlare.position.set(-0.48, 0, 2.35);
    this.group.add(leftCoreFlare);
    this.coreFlares.push(leftCoreFlare);

    const rightCoreFlare = new THREE.Mesh(coreFlareGeom, coreFlareMat.clone());
    rightCoreFlare.position.set(0.48, 0, 2.35);
    this.group.add(rightCoreFlare);
    this.coreFlares.push(rightCoreFlare);

    // 8. Shield Dome (flashes when taking hits)
    const shieldGeom = new THREE.SphereGeometry(3.4, 16, 12);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.0
    });
    this.shieldMesh = new THREE.Mesh(shieldGeom, shieldMat);
    this.group.add(this.shieldMesh);

    // 9. Dedicated Celestial Star-Glow Billboard Mesh (AdditiveBlending, depthWrite: false)
    const starGlowGeom = new THREE.PlaneGeometry(12.0, 12.0);
    const starGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.starGlowMesh = new THREE.Mesh(starGlowGeom, starGlowMat);
    this.starGlowMesh.position.set(0, 0, 0);
    this.group.add(this.starGlowMesh);
  }

  createNameplate() {
    this.nameCanvas = document.createElement('canvas');
    this.nameCanvas.width = 256;
    this.nameCanvas.height = 64;
    this.updateNameplateTexture();

    const texture = new THREE.CanvasTexture(this.nameCanvas);
    const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    this.nameSprite = new THREE.Sprite(mat);
    this.nameSprite.position.set(0, 3.2, 0);
    this.nameSprite.scale.set(7.5, 1.8, 1);
    this.group.add(this.nameSprite);
  }

  updateNameplateTexture() {
    if (!this.nameCanvas) return;
    const ctx = this.nameCanvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, 256, 64);

    // Background pill
    ctx.fillStyle = 'rgba(10, 16, 26, 0.75)';
    ctx.roundRect ? ctx.roundRect(10, 8, 236, 48, 8) : ctx.fillRect(10, 8, 236, 48);
    ctx.fill();

    // Border
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Player Name
    ctx.font = 'bold 20px "Segoe UI", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(this.playerName, 128, 30);

    // Health Bar
    const hpRatio = Math.max(0, this.hp / this.maxHp);
    ctx.fillStyle = '#222';
    ctx.fillRect(30, 38, 196, 10);
    ctx.fillStyle = hpRatio > 0.4 ? '#00ff88' : '#ff3344';
    ctx.fillRect(30, 38, 196 * hpRatio, 10);

    if (this.nameSprite && this.nameSprite.material.map) {
      this.nameSprite.material.map.needsUpdate = true;
    }
  }

  receiveNetworkState(state) {
    if (!state) return;
    this.lastPacketTime = performance.now();

    if (state.name && state.name !== this.playerName) {
      this.playerName = state.name;
      this.updateNameplateTexture();
    }

    if (state.hp !== undefined && state.hp !== this.hp) {
      this.hp = state.hp;
      this.updateNameplateTexture();
    }

    if (state.shield !== undefined) {
      this.shield = state.shield;
    }
    if (state.maxShield !== undefined) {
      this.maxShield = state.maxShield;
    }

    this.isDead = !!state.isDead;
    this.isInvisible = !!state.isInvisible;
    this.isThrusting = !!state.thrust;
    this.strafeState = state.strafe || 0;

    // Target transforms
    this.targetPosition.set(state.pos.x, state.pos.y, state.pos.z);
    this.targetQuaternion.set(state.quat._x || state.quat.x, state.quat._y || state.quat.y, state.quat._z || state.quat.z, state.quat._w || state.quat.w);
    if (state.vel) {
      this.targetVelocity.set(state.vel.x, state.vel.y, state.vel.z);
    }
  }

  triggerShieldFlash() {
    if (this.shieldMesh) {
      this.shieldMesh.material.opacity = 0.55;
    }
  }

  update(dt, camera = null) {
    if (this.isDead) {
      this.group.visible = false;
      for (const flare of this.engineFlares) {
        flare.visible = false;
      }
      for (const core of this.coreFlares) {
        core.visible = false;
      }
      if (this.starGlowMesh) {
        this.starGlowMesh.visible = false;
        this.starGlowMesh.material.opacity = 0;
      }
      return;
    }
    this.group.visible = true;

    // High Ping Compensation: Dead Reckoning & Hermite / Lerp Smoothing
    // Calculate elapsed time since the packet was received
    const now = performance.now();
    const packetAgeSeconds = Math.min(0.25, (now - this.lastPacketTime) / 1000);

    // Extrapolate expected position based on velocity
    const extrapolatedPos = this.targetPosition.clone().addScaledVector(this.targetVelocity, packetAgeSeconds);

    // Smoothly interpolate towards extrapolated position (prevents rubber-banding)
    const lerpFactor = Math.min(1.0, dt * 12.0);
    this.position.lerp(extrapolatedPos, lerpFactor);
    this.quaternion.slerp(this.targetQuaternion, Math.min(1.0, dt * 10.0));

    // Distance-adaptive scaling factor for engine visibility across standoff ranges (up to 3500u)
    let distToCamera = 0;
    if (camera && camera.position) {
      distToCamera = this.position.distanceTo(camera.position);
    }
    const distScale = distToCamera > 30 
      ? Math.min(8.0, 1.0 + (distToCamera - 30) * 0.0035) 
      : 1.0;

    // Update engine flare visuals
    const plumeScale = this.isThrusting ? ((1.2 + Math.random() * 0.4) * distScale) : 0.001;
    const coreScale = this.isThrusting 
      ? ((1.0 + Math.random() * 0.25) * distScale) 
      : (0.45 * distScale); // Soft idle glow when coasting
    const coreOpacity = this.isThrusting ? 0.95 : 0.55;

    for (const flare of this.engineFlares) {
      flare.scale.set(plumeScale, plumeScale, plumeScale);
      flare.visible = this.isThrusting && !this.isDead;
    }

    for (const core of this.coreFlares) {
      core.scale.set(coreScale, coreScale, coreScale);
      core.visible = !this.isDead;
      if (core.material) {
        core.material.opacity = coreOpacity;
      }
    }

    // Distance-based Star-Glow Billboard calculation (zero heap allocations)
    if (this.starGlowMesh) {
      if (this.isDead || this.isInvisible) {
        this.starGlowMesh.visible = false;
        this.starGlowMesh.material.opacity = 0;
      } else {
        this.starGlowMesh.visible = true;
        this.group.getWorldPosition(this._worldPos);
        let dist = 0;
        if (camera && camera.position) {
          dist = this._worldPos.distanceTo(camera.position);
        }

        let glowOpacity = 0.0;
        let glowScale = 1.0;

        if (dist <= 100) {
          glowOpacity = 0.0;
          glowScale = 4.0;
        } else if (dist <= 200) {
          const t = (dist - 100) / 100;
          glowOpacity = t * 0.95;
          glowScale = 4.0 + t * 4.0;
        } else {
          glowOpacity = 0.95;
          const farT = Math.min(1.0, (dist - 200) / 5800);
          glowScale = 8.0 + farT * 16.0;
        }

        this.starGlowMesh.material.opacity = glowOpacity;
        this.starGlowMesh.scale.set(glowScale, glowScale, 1.0);

        if (camera) {
          this.starGlowMesh.quaternion.copy(camera.quaternion);
        }
      }
    }

    // Fade shield hit flash
    if (this.shieldMesh && this.shieldMesh.material.opacity > 0) {
      this.shieldMesh.material.opacity = Math.max(0, this.shieldMesh.material.opacity - dt * 2.5);
    }
  }

  getEngineFlareState() {
    return {
      isThrusting: this.isThrusting,
      coreFlaresCount: this.coreFlares.length,
      engineFlaresCount: this.engineFlares.length,
      coreScale: this.coreFlares[0] ? this.coreFlares[0].scale.x : 0,
      plumeScale: this.engineFlares[0] ? this.engineFlares[0].scale.x : 0
    };
  }

  destroy() {
    this.scene.remove(this.group);
  }
}
