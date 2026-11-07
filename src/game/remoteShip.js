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
    this.lastPacketTime = performance.now();

    // Stats
    this.hp = 100;
    this.maxHp = 100;
    this.isDead = false;
    this.isThrusting = false;
    this.strafeState = 0; // -1, 0, 1

    // Visual meshes & effects
    this.engineFlares = [];
    this.sideThrusterFlares = [];
    this.shieldMesh = null;
    this.nameCanvas = null;
    this.nameSprite = null;

    this.createShipMesh();
    this.createNameplate();
    this.scene.add(this.group);
  }

  createShipMesh() {
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x992222, // Opponent red / crimson fighter
      roughness: 0.35,
      metalness: 0.8,
      flatShading: true
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x22252a,
      roughness: 0.5,
      metalness: 0.6
    });

    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x004466,
      emissiveIntensity: 0.5
    });

    // 1. Main Fuselage
    const fuselageGeom = new THREE.ConeGeometry(1.2, 5.0, 5);
    fuselageGeom.rotateX(Math.PI / 2);
    const fuselage = new THREE.Mesh(fuselageGeom, hullMat);
    this.group.add(fuselage);

    // 2. Cockpit Canopy
    const canopyGeom = new THREE.ConeGeometry(0.55, 2.2, 4);
    canopyGeom.rotateX(Math.PI / 2);
    const canopy = new THREE.Mesh(canopyGeom, canopyMat);
    canopy.position.set(0, 0.45, -0.4);
    this.group.add(canopy);

    // 3. Swept Wings
    const wingGeom = new THREE.BoxGeometry(5.2, 0.1, 1.8);
    const wing = new THREE.Mesh(wingGeom, hullMat);
    wing.position.set(0, -0.1, 0.5);
    wing.rotation.y = 0.1;
    this.group.add(wing);

    // Wingtip fins
    const finGeom = new THREE.BoxGeometry(0.1, 1.2, 1.4);
    const leftFin = new THREE.Mesh(finGeom, darkMat);
    leftFin.position.set(-2.55, 0.45, 0.6);
    this.group.add(leftFin);

    const rightFin = leftFin.clone();
    rightFin.position.set(2.55, 0.45, 0.6);
    this.group.add(rightFin);

    // 4. Rear Engine Thruster Nozzles
    const nozzleGeom = new THREE.CylinderGeometry(0.4, 0.5, 0.8, 8);
    nozzleGeom.rotateX(Math.PI / 2);

    const leftNozzle = new THREE.Mesh(nozzleGeom, darkMat);
    leftNozzle.position.set(-0.7, 0, 2.3);
    this.group.add(leftNozzle);

    const rightNozzle = leftNozzle.clone();
    rightNozzle.position.set(0.7, 0, 2.3);
    this.group.add(rightNozzle);

    // 5. Thruster Exhaust Flares (Visible when thrusting)
    const flareGeom = new THREE.ConeGeometry(0.35, 2.2, 8);
    flareGeom.rotateX(-Math.PI / 2);
    const flareMat = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const leftFlare = new THREE.Mesh(flareGeom, flareMat);
    leftFlare.position.set(-0.7, 0, 3.4);
    this.group.add(leftFlare);
    this.engineFlares.push(leftFlare);

    const rightFlare = leftFlare.clone();
    rightFlare.position.set(0.7, 0, 3.4);
    this.group.add(rightFlare);
    this.engineFlares.push(rightFlare);

    // 6. Shield Dome (flashes when taking hits)
    const shieldGeom = new THREE.SphereGeometry(3.2, 16, 12);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.0
    });
    this.shieldMesh = new THREE.Mesh(shieldGeom, shieldMat);
    this.group.add(this.shieldMesh);
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

    this.isDead = !!state.isDead;
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

  update(dt) {
    if (this.isDead) {
      this.group.visible = false;
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

    // Update engine flare visuals
    const flareScale = this.isThrusting ? (0.8 + Math.random() * 0.4) : 0.001;
    for (const flare of this.engineFlares) {
      flare.scale.set(flareScale, flareScale, flareScale);
      flare.visible = this.isThrusting;
    }

    // Fade shield hit flash
    if (this.shieldMesh && this.shieldMesh.material.opacity > 0) {
      this.shieldMesh.material.opacity = Math.max(0, this.shieldMesh.material.opacity - dt * 2.5);
    }
  }

  destroy() {
    this.scene.remove(this.group);
  }
}
