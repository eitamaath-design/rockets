import * as THREE from 'three';
import { SpaceEnvironment } from './space.js';
import { Cockpit } from './cockpit.js';
import { PlayerShip } from './ship.js';
import { WeaponsSystem } from './weapons.js';
import { RemoteShip } from './remoteShip.js';
import { ThrusterTrailSystem } from './trail.js';
import { EngagementBeaconSystem } from './beacon.js';
import { MeteorSystem } from './meteor.js';
import { PowerUpSystem } from './powerups.js';
import { audio } from './audio.js';
import { logger } from '../utils/logger.js';

export class GameEngine {
  constructor({ container, network, mapSeed, config, onHudUpdate, onDeathNotice }) {
    this.container = container;
    this.network = network;
    this.mapSeed = mapSeed;
    this.config = {
      voxelQuality: 'high',
      asteroidCount: 100,
      megaRadius: 2800,
      meteorFrequency: 10,
      renderScale: 1.0,
      maxFps: 60,
      shaderQuality: 'balanced',
      particleDensity: 'balanced',
      showStats: true,
      ...(config || {})
    };
    this._lastRenderTime = 0;
    this.onHudUpdate = onHudUpdate || (() => {});
    this.onDeathNotice = onDeathNotice || (() => {});

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.spaceEnv = null;
    this.cockpit = null;
    this.playerShip = null;
    this.weaponsSystem = null;
    this.remoteShips = new Map(); // peerId -> RemoteShip

    this.isRunning = false;
    this.lastTime = performance.now();
    this.animFrameId = null;

    this.lastWidth = 0;
    this.lastHeight = 0;

    // Mouse look state (unthrottled instant Pilot POV look target)
    this.isPointerLocked = false;
    this.mouseSensitivity = 0.0022;
    this.lastMouseX = null;
    this.lastMouseY = null;

    // Firing state
    this.isFiringLaser = false;
    this.isFiringCannon = false;
    this.powerUpSystem = null;

    // State broadcast timer (20Hz)
    this.broadcastTimer = 0;
    this.broadcastInterval = 1 / 20;

    // Subsystem instances
    this.thrusterTrails = null;
    this.beaconSystem = null;
    this.meteorSystem = null;
    this.trailEmitTimer = 0;
    this.timeSinceLastCombat = 0;
    this.beaconPulseTimer = 0;
    this.netStatsTimer = 0;
    this.fpsRolling = 60;

    this.initThree();
    this.setupNetworkHandlers();
    this.setupInputListeners();

    logger.setEngine(this);
    logger.log('ENGINE', `GameEngine initialized with seed ${this.mapSeed}`);
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x040814);
    this.scene.fog = new THREE.FogExp2(0x040814, 0.00004);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 12000);
    this.scene.add(this.camera); // Ensure camera and its children (3D cockpit) are in the scene

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'highp',
      stencil: false,
      alpha: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.domElement.style.transform = 'translateZ(0)';
    this.renderer.domElement.style.willChange = 'transform';
    this.container.appendChild(this.renderer.domElement);

    // Initialize subsystems
    this.initSpaceEnv(this.mapSeed);
    this.playerShip = new PlayerShip(this.camera, this.spaceEnv);
    this.playerShip.resetSpawn();

    this.cockpit = new Cockpit(this.camera);
    this.weaponsSystem = new WeaponsSystem(this.scene, this.spaceEnv, this.network);
    this.weapons = this.weaponsSystem;

    this.thrusterTrails = new ThrusterTrailSystem(this.scene);
    this.beaconSystem = new EngagementBeaconSystem(this.scene);
    this.powerUpSystem = new PowerUpSystem(this.scene);
    this.meteorSystem = new MeteorSystem(this.scene, this.spaceEnv, {
      frequency: this.config.meteorFrequency !== undefined ? this.config.meteorFrequency : 10,
      powerUpSystem: this.powerUpSystem
    });

    this.applyPerformanceConfig(this.config);

    // Pre-warm and compile all WebGL materials and shaders upfront
    // This completely eliminates in-game shader compilation freezes when shots are fired!
    try {
      this.renderer.compile(this.scene, this.camera);
    } catch (_) {}

    if (typeof window !== 'undefined') {
      window.gameEngine = this;
    }

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  applyPerformanceConfig(newConfig = {}) {
    if (newConfig && typeof newConfig === 'object') {
      this.config = { ...this.config, ...newConfig };
    }
    const scale = Number(this.config.renderScale) || 1.0;
    if (this.renderer && typeof this.renderer.setPixelRatio === 'function') {
      const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) ? window.devicePixelRatio : 1;
      const effectivePixelRatio = Math.min(2.0, Math.max(0.5, scale * Math.min(dpr, 1.5)));
      this.renderer.setPixelRatio(effectivePixelRatio);
      if (this.container) {
        const w = this.container.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1280);
        const h = this.container.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 720);
        if (w > 0 && h > 0) {
          this.renderer.setSize(w, h, false);
        }
      }
    }
    const pDensity = this.config.particleDensity || 'balanced';
    const sQuality = this.config.shaderQuality || 'balanced';
    if (this.spaceEnv && typeof this.spaceEnv.setPerformanceConfig === 'function') {
      this.spaceEnv.setPerformanceConfig({ shaderQuality: sQuality, particleDensity: pDensity });
    }
    if (this.thrusterTrails && typeof this.thrusterTrails.setParticleDensity === 'function') {
      this.thrusterTrails.setParticleDensity(pDensity);
    }
    if (this.weaponsSystem && typeof this.weaponsSystem.setParticleDensity === 'function') {
      this.weaponsSystem.setParticleDensity(pDensity);
    }
    if (this.meteorSystem && typeof this.meteorSystem.setParticleDensity === 'function') {
      this.meteorSystem.setParticleDensity(pDensity);
    }
    if (this.config.showStats === undefined) {
      this.config.showStats = true;
    } else {
      this.config.showStats = Boolean(this.config.showStats);
    }
  }

  setupNetworkHandlers() {
    // When peers join or leave, track 3D remote ships
    this.network.onPeerJoined = (peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      if (!this.remoteShips.has(peerId)) {
        const remote = new RemoteShip(peerId, this.scene, `Pilot-${peerId.slice(0, 4)}`);
        this.remoteShips.set(peerId, remote);
      }
      logger.log('NET', `Peer joined: ${peerId}`);
    };

    this.network.onPeerLeft = (peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      if (this.remoteShips.has(peerId)) {
        const remote = this.remoteShips.get(peerId);
        remote.destroy();
        this.remoteShips.delete(peerId);
      }
      logger.log('NET', `Peer left: ${peerId}`);
    };

    // Incoming damage from other peers
    this.network.onHit((data) => {
      this.timeSinceLastCombat = 0; // Combat activity reset!
      if (data.targetId === this.network.selfId) {
        if (typeof this.playerShip.recordEngagementHit === 'function') {
          this.playerShip.recordEngagementHit();
        }
        const wasKilled = this.playerShip.takeDamage(data.damage);
        this.cockpit.triggerDamageFlash();
        audio.playDamageHit();

        if (wasKilled) {
          audio.playExplosion(2.2);
          this.network.broadcastKill(this.network.selfId, data.attackerId, data.attackerName);
          this.onDeathNotice(`💥 Destroyed by ${data.attackerName || 'Unknown Pilot'}`);
        }
      } else if (this.remoteShips.has(data.targetId)) {
        const targetShip = this.remoteShips.get(data.targetId);
        targetShip.triggerShieldFlash();
      }
    });

    // Reset combat inactivity when network shots fire
    if (this.weaponsSystem) {
      this.network.onCannon(() => { this.timeSinceLastCombat = 0; });
      this.network.onMine(() => { this.timeSinceLastCombat = 0; });
    }

    // Kill feed events
    this.network.onKill((data) => {
      this.timeSinceLastCombat = 0;
      if (data.killerId === this.network.selfId) {
        this.playerShip.recordKill();
        audio.playScoreChime();
        this.onDeathNotice(`🎯 You eliminated ${data.victimId ? data.victimId.slice(0, 5) : 'Enemy'}! (+100 PTS)`);
      }
    });

    // Synchronized Map Reset
    this.network.onMapReset((seed) => {
      this.resetMap(seed);
    });

    // Synchronized Asteroid Carving across peers
    if (this.network && typeof this.network.onAsteroidCarve === 'function') {
      this.network.onAsteroidCarve((data, peerId) => {
        if (this.spaceEnv && typeof this.spaceEnv.applyRemoteCarve === 'function') {
          this.spaceEnv.applyRemoteCarve(data);
        }
      });
    }

    // Synchronized World Sync (Asteroid Carve History) for newly joined peers
    if (this.network && typeof this.network.onAsteroidWorldSync === 'function') {
      this.network.onAsteroidWorldSync((data, peerId) => {
        const history = (data && Array.isArray(data.carveHistory)) ? data.carveHistory : (Array.isArray(data) ? data : (data?.history));
        if (this.spaceEnv && typeof this.spaceEnv.applyCarveHistory === 'function' && history) {
          this.spaceEnv.applyCarveHistory(history);
        }
      });
    }

    // When a peer connects to the mesh room, send historical carves
    if (this.network) {
      this.network.onPeerNeedWorldSync = (peerId) => {
        if (this.spaceEnv && typeof this.spaceEnv.getCarveHistory === 'function') {
          const history = this.spaceEnv.getCarveHistory();
          if (history && history.length > 0 && typeof this.network.broadcastAsteroidWorldSync === 'function') {
            this.network.broadcastAsteroidWorldSync({ carveHistory: history }, peerId);
          }
        }
      };
    }

    // Synchronized Room Configuration Handshake
    if (this.network && typeof this.network.onConfig === 'function') {
      this.network.onConfig((newConfig) => {
        if (!newConfig) return;
        this.config = { ...this.config, ...newConfig };
        logger.log('CONFIG', `Received room config update: ${JSON.stringify(this.config)}`);
        this.initSpaceEnv(this.mapSeed);
        if (this.meteorSystem) {
          this.meteorSystem.spawnInterval = this.config.meteorFrequency !== undefined ? this.config.meteorFrequency : 10;
          this.meteorSystem.enabled = this.meteorSystem.spawnInterval > 0;
        }
        this.applyPerformanceConfig(this.config);
      });
    }
  }

  initSpaceEnv(seed) {
    if (this.spaceEnv) {
      this.spaceEnv.destroy();
    }
    this.spaceEnv = new SpaceEnvironment(this.scene, seed, this.config);
    this.spaceEnv.onCarve = (carveData) => {
      if (this.network && typeof this.network.broadcastAsteroidCarve === 'function') {
        this.network.broadcastAsteroidCarve(carveData);
      }
    };
    if (this.weaponsSystem) this.weaponsSystem.spaceEnv = this.spaceEnv;
    if (this.meteorSystem) this.meteorSystem.spaceEnv = this.spaceEnv;
    if (this.playerShip) this.playerShip.spaceEnv = this.spaceEnv;
    return this.spaceEnv;
  }

  resetMap(newSeed, newConfig = null) {
    this.mapSeed = newSeed;
    if (newConfig) {
      this.config = { ...this.config, ...newConfig };
    }
    this.initSpaceEnv(newSeed);
    if (this.weaponsSystem) this.weaponsSystem.spaceEnv = this.spaceEnv;
    if (this.meteorSystem) {
      this.meteorSystem.spaceEnv = this.spaceEnv;
      this.meteorSystem.spawnInterval = this.config.meteorFrequency !== undefined ? this.config.meteorFrequency : 10;
      this.meteorSystem.enabled = this.meteorSystem.spawnInterval > 0;
    }
    if (this.playerShip) {
      this.playerShip.spaceEnv = this.spaceEnv;
      this.playerShip.position.set(0, 80, 3200);
      this.playerShip.velocity.set(0, 0, 0);
      this.playerShip.quaternion.set(0, 0, 0, 1);
    }
    this.applyPerformanceConfig(this.config);
    logger.log('MAP', `Map reseeded with ${newSeed}`);
    this.onDeathNotice(`🔄 Sector reseeded! Map reset complete.`);
  }

  requestMapResetVote() {
    return this.network.requestMapResetVote();
  }

  castMapResetVote(choice) {
    return this.network.castMapResetVote(choice);
  }

  triggerThrustStart() {
    if (!this.playerShip) return false;
    const warpCharging = this.playerShip.triggerThrustPress(performance.now());
    if (warpCharging) {
      audio.startWarpCharge();
      return true;
    }
    return false;
  }

  triggerThrustEnd() {
    if (!this.playerShip) return null;
    if (this.playerShip.isWarpCharging) {
      const warpResult = this.playerShip.releaseWarpCharge(this.spaceEnv);
      audio.stopWarpCharge();
      if (warpResult && warpResult.success) {
        audio.playWarpJump(warpResult.chargeRatio);
        if (this.cockpit) this.cockpit.triggerBoostFlash();
        if (this.thrusterTrails) {
          this.thrusterTrails.emit(this.playerShip.position, this.playerShip.getForwardVector(), false, 'local', true);
        }
      }
      return warpResult;
    }
    return null;
  }

  triggerBoostAction() {
    return this.triggerThrustStart();
  }

  isInteractiveTarget(target) {
    return Boolean(
      target && typeof target.closest === 'function' &&
      target.closest('.hud-top-bar, .hud-diag-modal, .hud-vote-banner, .touch-joystick-container, .hud-master-monitor, .action-touch-btn, .touch-btn')
    );
  }

  setupInputListeners() {
    // Keyboard handlers
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'KeyW':
          if (!this.playerShip.input.thrust) {
            this.triggerThrustStart();
          }
          this.playerShip.input.thrust = true;
          break;
        case 'KeyS':
          this.playerShip.input.brake = true;
          break;
        case 'KeyA':
          if (!this.playerShip.input.strafeLeft) audio.playStrafeBurst();
          this.playerShip.input.strafeLeft = true;
          break;
        case 'KeyD':
          if (!this.playerShip.input.strafeRight) audio.playStrafeBurst();
          this.playerShip.input.strafeRight = true;
          break;
        case 'KeyQ':
          this.playerShip.input.rollLeft = true;
          break;
        case 'KeyE':
          this.playerShip.input.rollRight = true;
          break;
        case 'ArrowUp':
          this.playerShip.input.pitchUp = true;
          break;
        case 'ArrowDown':
          this.playerShip.input.pitchDown = true;
          break;
        case 'ArrowLeft':
          this.playerShip.input.yawLeft = true;
          break;
        case 'ArrowRight':
          this.playerShip.input.yawRight = true;
          break;
        case 'Space':
          this.isFiringLaser = true;
          e.preventDefault();
          break;
        case 'KeyF':
          this.weaponsSystem.triggerSecondary(true, this.playerShip, performance.now());
          break;
        case 'KeyR': {
          const res = this.playerShip.useSpecialPowerUp(this);
          if (res) this.onDeathNotice(res.message);
          break;
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW':
          this.triggerThrustEnd();
          this.playerShip.input.thrust = false;
          break;
        case 'KeyS':
          this.playerShip.input.brake = false;
          break;
        case 'KeyA':
          this.playerShip.input.strafeLeft = false;
          break;
        case 'KeyD':
          this.playerShip.input.strafeRight = false;
          break;
        case 'KeyQ':
          this.playerShip.input.rollLeft = false;
          break;
        case 'KeyE':
          this.playerShip.input.rollRight = false;
          break;
        case 'ArrowUp':
          this.playerShip.input.pitchUp = false;
          break;
        case 'ArrowDown':
          this.playerShip.input.pitchDown = false;
          break;
        case 'ArrowLeft':
          this.playerShip.input.yawLeft = false;
          break;
        case 'ArrowRight':
          this.playerShip.input.yawRight = false;
          break;
        case 'Space':
          this.isFiringLaser = false;
          break;
      }
    });

    // Mouse flight & weapons
    this.renderer.domElement.addEventListener('mousedown', (e) => {
      if (!document.pointerLockElement) {
        this.renderer.domElement.requestPointerLock?.();
      }
      if (e.button === 0) {
        // Left click: Laser fire
        this.isFiringLaser = true;
      } else if (e.button === 2) {
        // Right click: Homing Missile (locked)
        this.weaponsSystem.triggerSecondary(true, this.playerShip, performance.now());
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        this.isFiringLaser = false;
      }
    });

    // Prevent context menu on right click
    this.renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

    // Mouse look with pointer lock on canvas click
    this.renderer.domElement.addEventListener('click', () => {
      if (!document.pointerLockElement) {
        this.renderer.domElement.requestPointerLock?.();
      }
    });

    document.addEventListener('pointerlockchange', () => {
      this.isPointerLocked = (document.pointerLockElement === this.renderer.domElement);
      this.lastMouseX = null;
      this.lastMouseY = null;
    });

    document.addEventListener('mousemove', (e) => {
      const target = e.target;
      const isOverInteractiveUI = this.isInteractiveTarget(target);

      let movementX = typeof e.movementX === 'number' ? e.movementX : undefined;
      let movementY = typeof e.movementY === 'number' ? e.movementY : undefined;

      if (movementX === undefined || movementY === undefined || (!this.isPointerLocked && movementX === 0 && movementY === 0 && this.lastMouseX !== null)) {
        if (this.lastMouseX !== null && this.lastMouseY !== null && typeof e.clientX === 'number' && typeof e.clientY === 'number') {
          movementX = e.clientX - this.lastMouseX;
          movementY = e.clientY - this.lastMouseY;
        } else {
          movementX = movementX || 0;
          movementY = movementY || 0;
        }
      }

      if (typeof e.clientX === 'number') this.lastMouseX = e.clientX;
      if (typeof e.clientY === 'number') this.lastMouseY = e.clientY;

      if (!this.isRunning || !this.playerShip) {
        return;
      }

      if (!this.isPointerLocked && isOverInteractiveUI) {
        return;
      }

      if (movementX !== 0 || movementY !== 0) {
        const deltaYaw = -movementX * this.mouseSensitivity;
        const deltaPitch = -movementY * this.mouseSensitivity;
        this.playerShip.applyMouseLook(deltaYaw, deltaPitch);
      }
    });
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    const scale = Number(this.config?.renderScale) || 1.0;
    const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) ? window.devicePixelRatio : 1;
    const effectivePixelRatio = Math.min(2.0, Math.max(0.5, scale * Math.min(dpr, 1.5)));
    if (typeof this.renderer.setPixelRatio === 'function') {
      this.renderer.setPixelRatio(effectivePixelRatio);
    }
    this.renderer.setSize(width, height);
  }

  start() {
    this.isRunning = true;
    this.lastTime = performance.now();
    this._lastRenderTime = 0;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  loop(rafTimestamp) {
    if (!this.isRunning) return;
    this.animFrameId = requestAnimationFrame(this.loop.bind(this));

    const nowFrame = typeof rafTimestamp === 'number' ? rafTimestamp : performance.now();
    const maxFps = Number(this.config?.maxFps) || 0;
    if (maxFps > 0 && this._lastRenderTime > 0) {
      const elapsedMs = nowFrame - this._lastRenderTime;
      const minFrameIntervalMs = (1000 / maxFps) - 0.75;
      if (elapsedMs > 0.5 && elapsedMs < minFrameIntervalMs) {
        return;
      }
    }
    this._lastRenderTime = nowFrame;

    try {
      logger.recordFrame();

      // Dynamic canvas & aspect verification (handles mobile rotation & delayed layout reflow)
      const cw = this.container.clientWidth || window.innerWidth;
      const ch = this.container.clientHeight || window.innerHeight;
      if (cw > 0 && ch > 0 && (cw !== this.lastWidth || ch !== this.lastHeight)) {
        this.lastWidth = cw;
        this.lastHeight = ch;
        this.camera.aspect = cw / ch;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(cw, ch, false);
      }

      const now = performance.now();
      const dt = Math.min(0.1, (now - this.lastTime) / 1000);
      this.lastTime = now;

      // Rolling average FPS
      const currentFps = dt > 0 ? (1 / dt) : 60;
      this.fpsRolling = this.fpsRolling * 0.9 + currentFps * 0.1;

      // 1. Update Player Ship Physics
      this.playerShip.update(dt);

      // 3D Spatial Audio: track pilot head/camera in world coordinates
      audio.updateListener(this.camera);

      // Dynamic engine audio updates (smooth thrust & reverse brake sound)
      audio.updateEngine(this.playerShip.input.thrust, this.playerShip.input.brake, dt);

      // 2. Dual Forward Weapon Firing
      if (this.isFiringLaser || this.isFiringCannon) {
        this.timeSinceLastCombat = 0;
      }
      this.weaponsSystem.triggerPrimary(this.isFiringLaser, this.playerShip, now);

      // Update Missile Lock System
      if (this.weaponsSystem && this.weaponsSystem.lockSystem) {
        this.weaponsSystem.lockSystem.update(dt, this.playerShip, this.remoteShips, this.spaceEnv, this.camera);
      }

      // 3. Update Weapons & Explosions
      this.weaponsSystem.update(dt, this.playerShip, this.remoteShips, (dmg, weapon, attacker) => {
        this.timeSinceLastCombat = 0;
        if (typeof this.playerShip.recordEngagementHit === 'function') {
          this.playerShip.recordEngagementHit();
        }
        this.cockpit.triggerDamageFlash();
      }, this.camera);

      // Tactical Space Power-Ups (Shield Replenish, Cloak Invisibility, Hologram Decoy)
      if (this.powerUpSystem) {
        this.powerUpSystem.update(dt, this.playerShip, (notice) => {
          this.onDeathNotice(notice);
        });
      }

      // 4. Update Remote Ships from network packets
      for (const [peerId, peerData] of this.network.peers.entries()) {
        if (!peerId || typeof peerId !== 'string') continue;
        if (!this.remoteShips.has(peerId)) {
          const remoteName = peerData?.name || `Pilot-${peerId.slice(0, 4)}`;
          const remote = new RemoteShip(peerId, this.scene, remoteName);
          this.remoteShips.set(peerId, remote);
        }
        const remote = this.remoteShips.get(peerId);
        if (remote && peerData?.lastState) {
          remote.receiveNetworkState(peerData.lastState);
        }
        if (remote) {
          remote.update(dt, this.camera);
        }
      }

      // 4b. Ship-to-Ship Elastic Bumper Collision Bounce
      if (!this.playerShip.isDead) {
        const shipRadius = 2.8;
        const minShipDist = shipRadius * 2.0; // 5.6u
        for (const remote of this.remoteShips.values()) {
          if (!remote || remote.isDead) continue;
          const p1 = this.playerShip.position;
          const p2 = remote.position;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < minShipDist * minShipDist && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const nx = dx / dist;
            const ny = dy / dist;
            const nz = dz / dist;

            // Elastic separation push
            const overlap = minShipDist - dist;
            p1.x += nx * overlap * 0.55;
            p1.y += ny * overlap * 0.55;
            p1.z += nz * overlap * 0.55;

            p2.x -= nx * overlap * 0.45;
            p2.y -= ny * overlap * 0.45;
            p2.z -= nz * overlap * 0.45;

            // Velocity deflection along collision normal
            const rVel = this.playerShip.velocity.clone().sub(remote.velocity || new THREE.Vector3());
            const vNorm = rVel.x * nx + rVel.y * ny + rVel.z * nz;

            if (vNorm < 0) {
              const restitution = 0.85; // Bouncy energy shield bumper restitution
              const impulse = -(1 + restitution) * vNorm * 0.5;

              this.playerShip.velocity.x += nx * impulse;
              this.playerShip.velocity.y += ny * impulse;
              this.playerShip.velocity.z += nz * impulse;

              if (remote.velocity) {
                remote.velocity.x -= nx * impulse;
                remote.velocity.y -= ny * impulse;
                remote.velocity.z -= nz * impulse;
              }

              // Sound & Shield Flash
              audio.playExplosion(0.65, p1);
              if (typeof remote.triggerShieldFlash === 'function') {
                remote.triggerShieldFlash();
              }

              // Debounced collision damage
              if (this.playerShip.shipCollisionDebounceTimer <= 0) {
                const impactSpeed = Math.abs(vNorm);
                const bumpDamage = Math.round(Math.min(25, Math.max(8, impactSpeed * 0.6)));
                this.playerShip.takeDamage(bumpDamage);
                this.playerShip.shipCollisionDebounceTimer = 0.25;
                this.cockpit.triggerDamageFlash();
              }
            }
          }
        }
      }

      // 5. Inactivity Engagement Beacon (30s+ no combat between ships)
      this.timeSinceLastCombat += dt;
      if (this.network.peers.size > 0 && this.timeSinceLastCombat >= 30.0) {
        this.beaconPulseTimer += dt;
        if (this.beaconPulseTimer >= 3.5) {
          this.beaconPulseTimer = 0;
          this.beaconSystem.emitRipple(this.playerShip.position, 0x00d4ff);
          for (const remote of this.remoteShips.values()) {
            if (!remote.isDead) {
              this.beaconSystem.emitRipple(remote.position, 0xff3355);
            }
          }
          audio.playEngagementBeacon();
          logger.log('BEACON', `Engagement beacon pulse emitted across sector (inactivity: ${Math.round(this.timeSinceLastCombat)}s)`);
        }
      } else {
        this.beaconPulseTimer = 0;
      }

      // 6. Decaying Ship Thruster Trails (15s lifetime)
      // Thruster trails are emitted ONLY when active engine propulsion is engaged
      // Sub-frame interpolation ensures a dense, gapless, glowing plasma wake
      if (this.playerShip.input.thrust) {
        this.thrusterTrails.emit(this.playerShip.position, this.playerShip.getForwardVector(), false, 'local');
      }
      for (const [peerId, remote] of this.remoteShips.entries()) {
        if (!remote.isDead && remote.isThrusting) {
          const rFwd = new THREE.Vector3(0, 0, -1).applyQuaternion(remote.quaternion);
          this.thrusterTrails.emit(remote.position, rFwd, true, peerId);
        }
      }
      this.thrusterTrails.update(dt, this.camera);
      this.beaconSystem.update(dt);

      // 7. Chaotic Fiery Meteor Event (Every 10 seconds)
      if (this.meteorSystem) {
        this.meteorSystem.update(dt, this.playerShip, this.remoteShips, (notice) => {
          this.cockpit.triggerDamageFlash();
          this.onDeathNotice(notice);
        }, this.camera);
      }

      // 7. 5-Second Diagnostics Telemetry Stats
      this.netStatsTimer += dt;
      if (this.netStatsTimer >= 5.0) {
        this.netStatsTimer = 0;
        const peers = Array.from(this.network.peers.entries());
        if (peers.length === 0) {
          logger.log('NET_STATS', `Connected Peers: 0 | Inactivity: ${Math.round(this.timeSinceLastCombat)}s | Master: ${this.network.isMaster}`);
        } else {
          const stats = peers.map(([pId, pData]) => {
            const remote = this.remoteShips.get(pId);
            const dist = remote ? Math.round(this.playerShip.position.distanceTo(remote.position)) : 'N/A';
            const rate = pData.packetsReceived ? (pData.packetsReceived / 5.0).toFixed(1) : '0.0';
            const lastSeenMs = Date.now() - (pData.lastSeen || Date.now());
            pData.packetsReceived = 0; // reset window
            const posStr = remote ? `(${remote.position.x.toFixed(1)}, ${remote.position.y.toFixed(1)}, ${remote.position.z.toFixed(1)})` : 'N/A';
            return `Peer[${pId.slice(0, 5)}]: ${rate} pkt/s, ping ${pData.ping || 0}ms, seen ${lastSeenMs}ms ago, dist ${dist}u, pos ${posStr}, inScene: ${remote ? !!remote.group.parent : false}`;
          }).join(' | ');
          logger.log('NET_STATS', `Peers (${peers.length}): ${stats}`);
        }
      }

      // 8. Update Cockpit visual tilt and dynamic lag relative to Pilot POV
      const flightInput = {
        thrust: this.playerShip.input.thrust,
        brake: this.playerShip.input.brake,
        strafe: (this.playerShip.input.strafeRight ? 1 : 0) - (this.playerShip.input.strafeLeft ? 1 : 0),
        pitch: (this.playerShip.input.pitchUp ? 1 : 0) - (this.playerShip.input.pitchDown ? 1 : 0) + this.playerShip.input.analogPitch,
        roll: (this.playerShip.input.rollRight ? 1 : 0) - (this.playerShip.input.rollLeft ? 1 : 0)
      };
      this.cockpit.update(dt, flightInput, this.playerShip.velocity, this.playerShip.quaternion, this.playerShip.desiredQuaternion);

      // Dynamic Ship Bore-Sight Reticle Projection (Physical hull vs Pilot POV camera)
      let boreScreen = {
        x: 50,
        y: 50,
        inFront: true,
        isOffscreen: false,
        edgeAngle: 0,
        angleError: 0
      };

      if (this.playerShip && this.camera) {
        const shipFwd = this.playerShip.getForwardVector();
        const camFwd = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
        const dot = Math.min(1.0, Math.max(-1.0, shipFwd.dot(camFwd)));
        const angleError = Math.acos(dot);
        const inFront = dot > 0;

        let x = 50;
        let y = 50;
        let isOffscreen = false;
        let edgeAngle = 0;

        if (typeof this.camera.project === 'function' || (this.camera.projectionMatrix && typeof this.camera.matrixWorldInverse !== 'undefined')) {
          try {
            const boreTarget = this.camera.position.clone().addScaledVector(shipFwd, 100.0);
            const proj = boreTarget.clone().project(this.camera);

            // Screen space box (-0.88 to 0.88 NDC allows margin before clamping to edge)
            if (inFront && proj.x >= -0.88 && proj.x <= 0.88 && proj.y >= -0.88 && proj.y <= 0.88) {
              x = (proj.x * 0.5 + 0.5) * 100;
              y = (-proj.y * 0.5 + 0.5) * 100;
              isOffscreen = false;
            } else {
              isOffscreen = true;
              const localDir = shipFwd.clone().applyQuaternion(this.camera.quaternion.clone().invert());
              const dirX = inFront ? proj.x : localDir.x;
              const dirY = inFront ? -proj.y : -localDir.y;
              const len = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
              const normX = dirX / len;
              const normY = dirY / len;
              const edgeDist = Math.min(42 / Math.abs(normX || 0.0001), 42 / Math.abs(normY || 0.0001));
              x = 50 + normX * edgeDist;
              y = 50 + normY * edgeDist;
              edgeAngle = Math.atan2(normY, normX) * (180 / Math.PI);
            }
          } catch (e) {
            // fallback gracefully
          }
        }

        boreScreen = {
          x: Math.round(x * 10) / 10,
          y: Math.round(y * 10) / 10,
          inFront,
          isOffscreen,
          edgeAngle: Math.round(edgeAngle),
          angleError
        };
      }

      // 9. Update Space Environment (asteroid physics & pairwise collisions)
      this.spaceEnv.update(dt, this.playerShip.position, this.playerShip.velocity, this.camera);

      // 10. Network State Broadcast (20Hz)
      this.broadcastTimer += dt;
      if (this.broadcastTimer >= this.broadcastInterval) {
        this.broadcastTimer = 0;
        this.network.broadcastLocalState({
          pos: { x: this.playerShip.position.x, y: this.playerShip.position.y, z: this.playerShip.position.z },
          quat: {
            x: this.playerShip.quaternion.x,
            y: this.playerShip.quaternion.y,
            z: this.playerShip.quaternion.z,
            w: this.playerShip.quaternion.w
          },
          vel: { x: this.playerShip.velocity.x, y: this.playerShip.velocity.y, z: this.playerShip.velocity.z },
          thrust: this.playerShip.input.thrust,
          strafe: (this.playerShip.input.strafeRight ? 1 : 0) - (this.playerShip.input.strafeLeft ? 1 : 0),
          hp: this.playerShip.hp,
          shield: this.playerShip.shield,
          isDead: this.playerShip.isDead,
          score: this.playerShip.score,
          kills: this.playerShip.kills,
          deaths: this.playerShip.deaths,
          isInvisible: this.playerShip.isInvisible
        });
      }

      // 11. Render Scene
      this.renderer.render(this.scene, this.camera);

      // 12. Inform HUD
      this.onHudUpdate({
        hp: this.playerShip.hp,
        maxHp: this.playerShip.maxHp,
        shield: Math.round(this.playerShip.shield),
        maxShield: this.playerShip.maxShield,
        speed: Math.round(this.playerShip.getSpeed()),
        maxSpeed: Math.round(this.playerShip.maxSpeed),
        laserEnergy: Math.round(this.weaponsSystem.laserEnergy),
        laserMaxEnergy: this.weaponsSystem.laserMaxEnergy,
        laserRecharging: (this.weaponsSystem.laserCooldownTimer <= 0 && this.weaponsSystem.laserEnergy < this.weaponsSystem.laserMaxEnergy),
        hasFireLaser: !!this.playerShip.hasFireLaser,
        fireLaserTimer: Math.max(0, this.playerShip.fireLaserTimer || 0),
        engagementsCompleted: this.playerShip.engagementsCompleted || 0,
        inCombatEngagement: !!this.playerShip.inCombatEngagement,
        missileLocked: this.weaponsSystem.lockSystem.isLocked,
        missileLockProgress: this.weaponsSystem.lockSystem.getProgress(),
        missileTarget: this.weaponsSystem.lockSystem.targetScreenPos,
        shipBore: boreScreen,
        storedPowerUp: this.playerShip.storedPowerUp,
        cannonEnergy: Math.round(this.weaponsSystem.cannonEnergy),
        cannonMaxEnergy: this.weaponsSystem.cannonMaxEnergy,
        cannonRecharging: (this.weaponsSystem.cannonCooldownTimer <= 0 && this.weaponsSystem.cannonEnergy < this.weaponsSystem.cannonMaxEnergy),
        isShieldBroken: this.playerShip.isShieldBroken,
        isInvisible: this.playerShip.isInvisible,
        hasHologramDecoy: this.playerShip.hasHologramDecoy,
        alivePilotsCount: [this.playerShip, ...this.remoteShips.values()].filter(s => !s.isDead).length,
        isDead: this.playerShip.isDead,
        respawnCountdown: Math.ceil(this.playerShip.respawnTimer),
        invulnerable: (this.playerShip.invulnerableTimer > 0),
        warpReady: (this.playerShip.warpCooldownTimer <= 0),
        warpCooldown: Math.ceil(this.playerShip.warpCooldownTimer),
        isWarpCharging: this.playerShip.isWarpCharging,
        warpChargeTime: this.playerShip.warpChargeTime,
        warpChargeRatio: this.playerShip.maxWarpCharge > 0 ? (this.playerShip.warpChargeTime / this.playerShip.maxWarpCharge) : 0,
        boostReady: (this.playerShip.warpCooldownTimer <= 0),
        boostCooldown: Math.ceil(this.playerShip.warpCooldownTimer),
        inactivityBeacon: (this.network.peers.size > 0 && this.timeSinceLastCombat >= 30.0),
        score: this.playerShip.score,
        kills: this.playerShip.kills,
        deaths: this.playerShip.deaths,
        activePeersCount: this.network.peers.size + 1,
        isMaster: this.network.isMaster,
        showStats: this.config.showStats !== false,
        masterId: this.network.currentMasterId,
        avgPing: this.network.getAveragePing(),
        fps: Math.round(this.fpsRolling),
        frameTime: Number((dt * 1000).toFixed(1)),
        drawCalls: (this.renderer && this.renderer.info) ? this.renderer.info.render.calls : 0,
        triangles: (this.renderer && this.renderer.info) ? this.renderer.info.render.triangles : 0,
        memory: (typeof performance !== 'undefined' && performance.memory) ? Number((performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1)) : null,
        megaDistance: Math.round(this.playerShip.position.length()),
        telemetry: {
          fps: Math.round(this.fpsRolling),
          frameTime: Number((dt * 1000).toFixed(1)),
          drawCalls: (this.renderer && this.renderer.info) ? this.renderer.info.render.calls : 0,
          triangles: (this.renderer && this.renderer.info) ? this.renderer.info.render.triangles : 0,
          memory: (typeof performance !== 'undefined' && performance.memory) ? Number((performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1)) : null,
          ping: typeof this.network.getAveragePing === 'function' ? this.network.getAveragePing() : 0,
          megaDistance: Math.round(this.playerShip.position.length()),
          speed: Math.round(this.playerShip.getSpeed()),
          isMaster: !!this.network.isMaster
        }
      });
    } catch (loopErr) {
      logger.log('CRASH', `Render loop exception: ${loopErr.message}\n${loopErr.stack}`);
    }
  }

  destroy() {
    this.stop();
    if (this.spaceEnv) this.spaceEnv.destroy();
    if (this.weaponsSystem) this.weaponsSystem.cleanup();
    if (this.thrusterTrails) this.thrusterTrails.cleanup();
    if (this.beaconSystem) this.beaconSystem.cleanup();
    if (this.meteorSystem) this.meteorSystem.cleanup();
    if (this.powerUpSystem) this.powerUpSystem.cleanup();
    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
