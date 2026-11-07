import * as THREE from 'three';
import { SpaceEnvironment } from './space.js';
import { Cockpit } from './cockpit.js';
import { PlayerShip } from './ship.js';
import { WeaponsSystem } from './weapons.js';
import { RemoteShip } from './remoteShip.js';
import { audio } from './audio.js';
import { logger } from '../utils/logger.js';

export class GameEngine {
  constructor({ container, network, mapSeed, onHudUpdate, onDeathNotice }) {
    this.container = container;
    this.network = network;
    this.mapSeed = mapSeed;
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

    // Mouse look state
    this.isPointerLocked = false;
    this.mouseSensitivity = 0.0022;

    // Firing state
    this.isFiringCannon = false;

    // State broadcast timer (20Hz)
    this.broadcastTimer = 0;
    this.broadcastInterval = 1 / 20;

    this.initThree();
    this.setupNetworkHandlers();
    this.setupInputListeners();

    logger.setEngine(this);
    logger.log('ENGINE', `GameEngine initialized with seed ${this.mapSeed}`);
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x040814);
    this.scene.fog = new THREE.FogExp2(0x040814, 0.0001);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 4000);
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
    this.spaceEnv = new SpaceEnvironment(this.scene, this.mapSeed);
    this.playerShip = new PlayerShip(this.camera, this.spaceEnv);
    this.playerShip.resetSpawn();

    this.cockpit = new Cockpit(this.camera);
    this.weaponsSystem = new WeaponsSystem(this.scene, this.spaceEnv, this.network);

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  setupNetworkHandlers() {
    // When peers join or leave, track 3D remote ships
    this.network.onPeerJoined = (peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      if (!this.remoteShips.has(peerId)) {
        const remote = new RemoteShip(peerId, this.scene, `Pilot-${peerId.slice(0, 4)}`);
        this.remoteShips.set(peerId, remote);
      }
    };

    this.network.onPeerLeft = (peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      if (this.remoteShips.has(peerId)) {
        const remote = this.remoteShips.get(peerId);
        remote.destroy();
        this.remoteShips.delete(peerId);
      }
    };

    // Incoming damage from other peers
    this.network.onHit((data) => {
      if (data.targetId === this.network.selfId) {
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

    // Kill feed events
    this.network.onKill((data) => {
      if (data.killerId === this.network.selfId) {
        this.playerShip.recordKill();
        audio.playScoreChime();
        this.onDeathNotice(`🎯 You eliminated ${data.victimId ? data.victimId.slice(0, 5) : 'Enemy'}! (+100 PTS)`);
      }
    });
  }

  setupInputListeners() {
    // Keyboard handlers
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'KeyW':
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
          this.isFiringCannon = true;
          e.preventDefault();
          break;
        case 'KeyF':
          this.weaponsSystem.triggerRearMine(this.playerShip);
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW':
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
          this.isFiringCannon = false;
          break;
      }
    });

    // Mouse flight & weapons
    this.renderer.domElement.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        // Left click: Cannon fire
        this.isFiringCannon = true;
      } else if (e.button === 2) {
        // Right click: Rear mine
        this.weaponsSystem.triggerRearMine(this.playerShip);
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        this.isFiringCannon = false;
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
    });

    document.addEventListener('mousemove', (e) => {
      if (this.isPointerLocked) {
        this.playerShip.input.analogYaw = -e.movementX * this.mouseSensitivity * 25.0;
        this.playerShip.input.analogPitch = -e.movementY * this.mouseSensitivity * 25.0;
      }
    });
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  start() {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.animFrameId = requestAnimationFrame(this.loop.bind(this));

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

      // Decay mouse analog inputs smoothly
      if (this.isPointerLocked) {
        this.playerShip.input.analogPitch *= 0.7;
        this.playerShip.input.analogYaw *= 0.7;
      }

      // 1. Update Player Ship Physics
      this.playerShip.update(dt);

      // Dynamic engine audio updates (smooth thrust & reverse brake sound)
      audio.updateEngine(this.playerShip.input.thrust, this.playerShip.input.brake, dt);

      // 2. Continuous Cannon Firing
      this.weaponsSystem.triggerCannon(this.isFiringCannon, this.playerShip, now);

      // 3. Update Weapons & Explosions
      this.weaponsSystem.update(dt, this.playerShip, this.remoteShips, (dmg, weapon, attacker) => {
        this.cockpit.triggerDamageFlash();
      });

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
          remote.update(dt);
        }
      }

      // 5. Update Cockpit visual tilt and shield glass
      const flightInput = {
        thrust: this.playerShip.input.thrust,
        brake: this.playerShip.input.brake,
        strafe: (this.playerShip.input.strafeRight ? 1 : 0) - (this.playerShip.input.strafeLeft ? 1 : 0),
        pitch: (this.playerShip.input.pitchUp ? 1 : 0) - (this.playerShip.input.pitchDown ? 1 : 0) + this.playerShip.input.analogPitch,
        roll: (this.playerShip.input.rollRight ? 1 : 0) - (this.playerShip.input.rollLeft ? 1 : 0)
      };
      this.cockpit.update(dt, flightInput, this.playerShip.velocity);

      // 6. Update Space Environment (asteroids rotation, speed dust)
      this.spaceEnv.update(dt, this.playerShip.position, this.playerShip.velocity);

      // 7. Network State Broadcast (20Hz)
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
          isDead: this.playerShip.isDead,
          score: this.playerShip.score,
          kills: this.playerShip.kills,
          deaths: this.playerShip.deaths
        });
      }

      // 8. Render Scene
      this.renderer.render(this.scene, this.camera);

      // 9. Inform HUD
      this.onHudUpdate({
        hp: this.playerShip.hp,
        maxHp: this.playerShip.maxHp,
        speed: Math.round(this.playerShip.getSpeed()),
        maxSpeed: Math.round(this.playerShip.maxSpeed),
        cannonEnergy: Math.round(this.weaponsSystem.cannonEnergy),
        cannonMaxEnergy: this.weaponsSystem.cannonMaxEnergy,
        cannonRecharging: (this.weaponsSystem.cannonCooldownTimer <= 0 && this.weaponsSystem.cannonEnergy < this.weaponsSystem.cannonMaxEnergy),
        mineCharges: this.weaponsSystem.mineCharges,
        mineMaxCharges: this.weaponsSystem.mineMaxCharges,
        mineRechargeProgress: this.weaponsSystem.mineRechargeProgress,
        isDead: this.playerShip.isDead,
        respawnCountdown: Math.ceil(this.playerShip.respawnTimer),
        invulnerable: (this.playerShip.invulnerableTimer > 0),
        score: this.playerShip.score,
        kills: this.playerShip.kills,
        deaths: this.playerShip.deaths,
        activePeersCount: this.network.peers.size + 1,
        isMaster: this.network.isMaster,
        masterId: this.network.currentMasterId,
        avgPing: this.network.getAveragePing()
      });
    } catch (loopErr) {
      logger.log('CRASH', `Render loop exception: ${loopErr.message}\n${loopErr.stack}`);
    }
  }

  destroy() {
    this.stop();
    if (this.weaponsSystem) this.weaponsSystem.cleanup();
    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
