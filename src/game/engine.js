import * as THREE from 'three';
import { SpaceEnvironment } from './space.js';
import { Cockpit } from './cockpit.js';
import { PlayerShip } from './ship.js';
import { WeaponsSystem } from './weapons.js';
import { RemoteShip } from './remoteShip.js';
import { ThrusterTrailSystem } from './trail.js';
import { EngagementBeaconSystem } from './beacon.js';
import { MeteorSystem } from './meteor.js';
import { BlackHoleSystem } from './blackhole.js';
import { PowerUpSystem } from './powerups.js';
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

    // Mouse look state (3x sensitivity for rapid agile tracking)
    this.isPointerLocked = false;
    this.mouseSensitivity = 0.0066;

    // Firing state
    this.isFiringLaser = false;
    this.isFiringCannon = false;
    this.blackHoleSystem = null;
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

    this.thrusterTrails = new ThrusterTrailSystem(this.scene);
    this.beaconSystem = new EngagementBeaconSystem(this.scene);
    this.meteorSystem = new MeteorSystem(this.scene, this.spaceEnv);
    this.blackHoleSystem = new BlackHoleSystem(this.scene, this.spaceEnv);
    this.powerUpSystem = new PowerUpSystem(this.scene, this.blackHoleSystem);

    // Pre-warm and compile all WebGL materials and shaders upfront
    // This completely eliminates in-game shader compilation freezes when shots are fired!
    try {
      this.renderer.compile(this.scene, this.camera);
    } catch (_) {}

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
  }

  triggerBoostAction() {
    if (!this.playerShip) return false;
    const boosted = this.playerShip.triggerThrustPress(performance.now());
    if (boosted) {
      audio.playBoost();
      this.cockpit.triggerBoostFlash();
      if (this.thrusterTrails) {
        this.thrusterTrails.emit(this.playerShip.position, this.playerShip.getForwardVector(), false);
      }
      return true;
    }
    return false;
  }

  setupInputListeners() {
    // Keyboard handlers
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'KeyW':
          if (!this.playerShip.input.thrust) {
            this.triggerBoostAction();
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

      // 3D Spatial Audio: track pilot head/camera in world coordinates
      audio.updateListener(this.camera);

      // Dynamic engine audio updates (smooth thrust & reverse brake sound)
      audio.updateEngine(this.playerShip.input.thrust, this.playerShip.input.brake, dt);

      // 2. Dual Forward Weapon Firing
      if (this.isFiringLaser || this.isFiringCannon) {
        this.timeSinceLastCombat = 0;
      }
      this.weaponsSystem.triggerPrimary(this.isFiringLaser, this.playerShip, now);
      this.weaponsSystem.triggerSecondary(this.isFiringCannon, this.playerShip, now);

      // 3. Update Weapons & Explosions
      this.weaponsSystem.update(dt, this.playerShip, this.remoteShips, (dmg, weapon, attacker) => {
        this.timeSinceLastCombat = 0;
        this.cockpit.triggerDamageFlash();
      });

      // Battle Royale: Encroaching Cosmic Black Hole & Safe Zone Gravity
      if (this.blackHoleSystem) {
        this.blackHoleSystem.update(dt, this.playerShip, this.remoteShips, this.spaceEnv, this.meteorSystem, (notice) => {
          this.cockpit.triggerDamageFlash();
          this.onDeathNotice(notice);
        });
      }

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
          remote.update(dt);
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
      this.trailEmitTimer += dt;
      if (this.trailEmitTimer >= 0.12) {
        this.trailEmitTimer = 0;
        // Thruster trails are emitted ONLY when active engine propulsion is engaged
        // If drifting with momentum, no trail is left behind
        if (this.playerShip.input.thrust) {
          this.thrusterTrails.emit(this.playerShip.position, this.playerShip.getForwardVector(), false);
        }
        for (const remote of this.remoteShips.values()) {
          if (!remote.isDead && remote.isThrusting) {
            const rFwd = new THREE.Vector3(0, 0, -1).applyQuaternion(remote.quaternion);
            this.thrusterTrails.emit(remote.position, rFwd, true);
          }
        }
      }
      this.thrusterTrails.update(dt);
      this.beaconSystem.update(dt);

      // 7. Chaotic Fiery Meteor Event (Every 10 seconds)
      if (this.meteorSystem) {
        this.meteorSystem.update(dt, this.playerShip, this.remoteShips, (notice) => {
          this.cockpit.triggerDamageFlash();
          this.onDeathNotice(notice);
        });
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

      // 8. Update Cockpit visual tilt and shield glass
      const flightInput = {
        thrust: this.playerShip.input.thrust,
        brake: this.playerShip.input.brake,
        strafe: (this.playerShip.input.strafeRight ? 1 : 0) - (this.playerShip.input.strafeLeft ? 1 : 0),
        pitch: (this.playerShip.input.pitchUp ? 1 : 0) - (this.playerShip.input.pitchDown ? 1 : 0) + this.playerShip.input.analogPitch,
        roll: (this.playerShip.input.rollRight ? 1 : 0) - (this.playerShip.input.rollLeft ? 1 : 0)
      };
      this.cockpit.update(dt, flightInput, this.playerShip.velocity);

      // 9. Update Space Environment (asteroid physics & pairwise collisions)
      this.spaceEnv.update(dt, this.playerShip.position, this.playerShip.velocity);

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
        cannonEnergy: Math.round(this.weaponsSystem.cannonEnergy),
        cannonMaxEnergy: this.weaponsSystem.cannonMaxEnergy,
        cannonRecharging: (this.weaponsSystem.cannonCooldownTimer <= 0 && this.weaponsSystem.cannonEnergy < this.weaponsSystem.cannonMaxEnergy),
        safeRadius: Math.round(this.blackHoleSystem ? this.blackHoleSystem.getSafeRadius() : 1000),
        matchTimeRemaining: Math.max(0, Math.round(this.blackHoleSystem ? this.blackHoleSystem.getMatchTimeRemaining() : 600)),
        isShieldBroken: this.playerShip.isShieldBroken,
        isInvisible: this.playerShip.isInvisible,
        hasHologramDecoy: this.playerShip.hasHologramDecoy,
        alivePilotsCount: [this.playerShip, ...this.remoteShips.values()].filter(s => !s.isDead).length,
        isVictoryRoyale: (this.network.peers.size > 0 && !this.playerShip.isDead && Array.from(this.remoteShips.values()).every(r => r.isDead)),
        isDead: this.playerShip.isDead,
        respawnCountdown: Math.ceil(this.playerShip.respawnTimer),
        invulnerable: (this.playerShip.invulnerableTimer > 0),
        boostReady: (this.playerShip.boostCooldownTimer <= 0),
        boostCooldown: Math.ceil(this.playerShip.boostCooldownTimer),
        inactivityBeacon: (this.network.peers.size > 0 && this.timeSinceLastCombat >= 30.0),
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
    if (this.thrusterTrails) this.thrusterTrails.cleanup();
    if (this.beaconSystem) this.beaconSystem.cleanup();
    if (this.meteorSystem) this.meteorSystem.cleanup();
    if (this.blackHoleSystem) this.blackHoleSystem.cleanup();
    if (this.powerUpSystem) this.powerUpSystem.cleanup();
    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
