import * as THREE from 'three';
import { lobbyService } from './net/lobby.js';
import { GameNetwork } from './net/network.js';
import { GameEngine } from './game/engine.js';
import { GameHUD } from './game/hud.js';
import { logger } from './utils/logger.js';
import { RemoteShip } from './game/remoteShip.js';

window.THREE = THREE;
window.logger = logger;
window.__RemoteShip = RemoteShip;

const app = document.getElementById('app');

const SECTOR_NAMES = [
  'Nebula-Orion',
  'Andromeda-Deep',
  'Centauri-Prime',
  'Cygnus-Rift',
  'Cassiopeia-Void',
  'Pegasus-Belt',
  'Vela-Pulsar',
  'Perseus-Arm'
];

function getRandomSectorName() {
  const base = SECTOR_NAMES[Math.floor(Math.random() * SECTOR_NAMES.length)];
  const num = Math.floor(100 + Math.random() * 900);
  return `${base}-${num}`;
}

class AppRouter {
  constructor() {
    this.currentMode = 'lobby'; // 'lobby' | 'game'
    this.engine = null;
    this.network = null;
    this.hud = null;

    this.playerName = localStorage.getItem('rockets_pilot_name') || `Pilot-${Math.floor(1000 + Math.random() * 9000)}`;

    this.init();
  }

  init() {
    // Check if URL has ?room= and optional config params
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');

    const config = {
      voxelQuality: params.get('quality') || 'high',
      asteroidCount: params.get('density') ? parseInt(params.get('density'), 10) : 100,
      megaRadius: params.get('mega') ? parseInt(params.get('mega'), 10) : 2800,
      meteorFrequency: params.get('meteor') !== null ? parseInt(params.get('meteor'), 10) : 10,
      forwardAccel: params.get('accel') !== null ? Math.min(180, Math.max(20, parseInt(params.get('accel'), 10) || 180)) : 180,
      momentumShearing: params.get('shear') !== null ? Math.min(1.0, Math.max(0.0, (Number.isNaN(parseFloat(params.get('shear'))) ? 0.1 : parseFloat(params.get('shear'))))) : 0.1,
      carveRadius: params.get('carve') !== null ? Math.min(20.0, Math.max(2.0, parseFloat(params.get('carve')) || 6.5)) : 6.5,
      blinkTranslucency: (params.get('blinktrans') !== null || params.get('translucency') !== null)
        ? Math.min(95, Math.max(10, parseInt(params.get('blinktrans') !== null ? params.get('blinktrans') : params.get('translucency'), 10) || 80))
        : 80,
      blinkDuration: params.get('blinkdur') !== null ? Math.min(2000, Math.max(200, parseInt(params.get('blinkdur'), 10) || 750)) : 750,
      turnRate: params.get('turnrate') !== null ? Math.min(6.0, Math.max(0.25, parseFloat(params.get('turnrate')) || 0.75)) : 0.75,
      renderScale: params.get('scale') ? parseFloat(params.get('scale')) : 1.0,
      maxFps: params.get('fps') !== null ? parseInt(params.get('fps'), 10) : 0,
      shaderQuality: params.get('shader') || 'balanced',
      particleDensity: params.get('particles') || 'balanced',
      showStats: params.get('stats') !== null ? (params.get('stats') !== 'false' && params.get('stats') !== '0') : false
    };

    if (roomParam) {
      this.startMatch({
        roomId: roomParam,
        roomName: roomParam,
        mapSeed: Math.abs(this.hashCode(roomParam)),
        config
      });
    } else {
      this.renderLobby();
    }
  }

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  renderLobby() {
    this.currentMode = 'lobby';
    app.innerHTML = `
      <div class="lobby-container">
        <header class="lobby-header">
          <h1 class="lobby-title">🚀 ROCKETS</h1>
          <p class="lobby-subtitle">Serverless P2P WebRTC 3D Multiplayer Space Combat</p>
        </header>

        <div class="lobby-pilot-config">
          <label for="pilot-name-input">CALLSIGN:</label>
          <input type="text" id="pilot-name-input" value="${this.playerName}" maxlength="16" placeholder="Pilot Name" />
        </div>

        <div class="pwa-install-banner" id="pwa-install-banner">
          <span>📲 Install Rockets as Fullscreen App on your phone:</span>
          <button class="btn-pwa-install" id="btn-pwa-install">INSTALL</button>
        </div>

        <div class="lobby-grid">
          <!-- Create Match Card -->
          <div class="lobby-card">
            <h2 class="card-title"><span>🛰️</span> Create New Sector</h2>
            <p class="card-description">
              Initialize a new procedural asteroid map. You become the initial Master peer broadcasting session TTL heartbeats.
            </p>
            <div class="lobby-form-row">
              <label for="sector-name-input">Sector / Room Name</label>
              <input type="text" id="sector-name-input" class="lobby-input" value="${getRandomSectorName()}" />
            </div>

            <!-- Room Configuration Drawer -->
            <div class="room-config-drawer" id="room-config-drawer">
              <div class="drawer-header">⚙️ Sector Physics & Performance Parameters</div>
              <div class="config-grid">
                <div class="config-field">
                  <label for="voxel-quality-select">Voxel Quality</label>
                  <select id="voxel-quality-select" class="lobby-select">
                    <option value="low">Low (32³)</option>
                    <option value="medium">Medium (48³)</option>
                    <option value="high" selected>High (64³)</option>
                  </select>
                </div>
                <div class="config-field">
                  <label for="asteroid-count-select">Belt Asteroids</label>
                  <select id="asteroid-count-select" class="lobby-select">
                    <option value="50">50 Asteroids</option>
                    <option value="100" selected>100 Asteroids</option>
                    <option value="150">150 Asteroids</option>
                  </select>
                </div>
                <div class="config-field">
                  <label for="mega-radius-select">Mega Asteroid Radius</label>
                  <select id="mega-radius-select" class="lobby-select">
                    <option value="1400">1,400u (Compact)</option>
                    <option value="2800" selected>2,800u (Standard)</option>
                    <option value="4000">4,000u (Colossal)</option>
                  </select>
                </div>
                <div class="config-field">
                  <label for="meteor-freq-select">Meteor Hazard</label>
                  <select id="meteor-freq-select" class="lobby-select">
                    <option value="0">0 (Off)</option>
                    <option value="20">20s (Mild)</option>
                    <option value="10" selected>10s (Standard)</option>
                    <option value="5">5s (Chaos)</option>
                  </select>
                </div>
                <div class="config-field">
                  <label for="accel-slider">Forward Accel: <span id="accel-val-badge">180</span> u/s²</label>
                  <input type="range" id="accel-slider" class="lobby-slider" min="20" max="180" step="5" value="180" />
                </div>
                <div class="config-field">
                  <label for="shear-slider">Momentum Shear: <span id="shear-val-badge">0.10</span></label>
                  <input type="range" id="shear-slider" class="lobby-slider" min="0.0" max="1.0" step="0.05" value="0.1" />
                </div>
                <div class="config-field">
                  <label for="carve-slider">Laser Carve Radius: <span id="carve-val-badge">6.5</span>u</label>
                  <input type="range" id="carve-slider" class="lobby-slider" min="2.0" max="20.0" step="0.5" value="6.5" />
                </div>
                <div class="config-field">
                  <label for="blink-trans-slider">Blink Translucency: <span id="blink-trans-val-badge">80</span>%</label>
                  <input type="range" id="blink-trans-slider" class="lobby-slider" min="10" max="95" step="5" value="80" />
                </div>
                <div class="config-field">
                  <label for="blink-dur-slider">Blink Effect Duration: <span id="blink-dur-val-badge">750</span> ms</label>
                  <input type="range" id="blink-dur-slider" class="lobby-slider" min="200" max="2000" step="50" value="750" />
                </div>
                <div class="config-field">
                  <label for="turn-rate-slider">Ship Rotation Speed: <span id="turn-rate-val-badge">0.75</span> rad/s</label>
                  <input type="range" id="turn-rate-slider" class="lobby-slider" min="0.25" max="6.0" step="0.05" value="0.75" />
                </div>
                <div class="config-field">
                  <label for="render-scale-select">Render Scale (DPI)</label>
                  <select id="render-scale-select" class="lobby-select">
                    <option value="0.75">0.75x (Ultra Fast)</option>
                    <option value="1.0" selected>1.0x (Native 1x)</option>
                    <option value="1.5">1.5x (Sharp)</option>
                    <option value="2.0">2.0x (Retina Max)</option>
                  </select>
                </div>
                <div class="config-field">
                  <label for="max-fps-select">Frame Rate Cap</label>
                  <select id="max-fps-select" class="lobby-select">
                    <option value="0" selected>Unlimited (200+ FPS)</option>
                    <option value="240">240 FPS (Ultra)</option>
                    <option value="120">120 FPS (Pro)</option>
                    <option value="90">90 FPS (High)</option>
                    <option value="60">60 FPS (Eco)</option>
                  </select>
                </div>
                <div class="config-field">
                  <label for="shader-quality-select">Rock Shader Detail</label>
                  <select id="shader-quality-select" class="lobby-select">
                    <option value="low">Low (Fast Grain)</option>
                    <option value="balanced" selected>Balanced (dFdx Bump)</option>
                    <option value="high">Ultra (Full Triplanar)</option>
                  </select>
                </div>
                <div class="config-field">
                  <label for="particle-density-select">Particle Density</label>
                  <select id="particle-density-select" class="lobby-select">
                    <option value="low">Low (50%)</option>
                    <option value="balanced" selected>Balanced (100%)</option>
                    <option value="high">High (150%)</option>
                  </select>
                </div>
                <div class="config-field">
                  <label for="show-stats-select">Real-Time Statistics</label>
                  <select id="show-stats-select" class="lobby-select">
                    <option value="true">Show (Master)</option>
                    <option value="false" selected>Hide (Off)</option>
                  </select>
                </div>
              </div>
            </div>

            <button class="btn-primary" id="btn-create-match">LAUNCH SECTOR</button>
          </div>

          <!-- Join by Code Card -->
          <div class="lobby-card">
            <h2 class="card-title"><span>⚡</span> Direct Join</h2>
            <p class="card-description">
              Connect directly to an existing peer mesh using a known Room ID or invite link.
            </p>
            <div class="lobby-form-row">
              <label for="join-room-input">Room Code or Sector ID</label>
              <input type="text" id="join-room-input" class="lobby-input" placeholder="e.g. Nebula-Orion-412" />
            </div>
            <button class="btn-secondary" id="btn-direct-join">JOIN DIRECTLY</button>
          </div>
        </div>

        <!-- Live Public Lobbies Browser -->
        <section class="lobby-browser-section">
          <div class="browser-header">
            <h2 class="card-title"><span>📡</span> Public Sector Directory (Live Keep-Alive TTL)</h2>
            <button class="btn-refresh-rooms" id="btn-refresh-rooms">🔄 Refresh</button>
          </div>
          <div class="rooms-list" id="rooms-list-container">
            <div class="rooms-empty">Scanning decentralized relays for active sectors...</div>
          </div>
        </section>

        <!-- Controls Guide -->
        <section class="lobby-controls-card">
          <strong>PILOT FLIGHT & COMBAT MANUAL:</strong>
          <div class="controls-grid">
            <div class="control-item">
              <span class="control-key">W / 🚀 Thrust:</span> Accelerate forward up to max speed
            </div>
            <div class="control-item">
              <span class="control-key">S / 🛑 Brake:</span> Progressive deceleration (full stop in 2.0s)
            </div>
            <div class="control-item">
              <span class="control-key">A & D / ⬅ ➡ Strafe:</span> Fire lateral side thrusters
            </div>
            <div class="control-item">
              <span class="control-key">D-Pad / Arrows / Mouse:</span> Pitch (up/down) & Pan/Yaw (left/right)
            </div>
            <div class="control-item">
              <span class="control-key">Q & E / ↺ ↻:</span> Roll left & right
            </div>
            <div class="control-item">
              <span class="control-key">Space / LMB:</span> Front Cannon (rapid fire, 2.0s TTK, auto-recharge)
            </div>
            <div class="control-item">
              <span class="control-key">F / RMB:</span> Rear Mine (forward boost + 3s proximity fuse)
            </div>
          </div>
        </section>
      </div>
    `;

    // Hook Pilot Name change
    const nameInput = document.getElementById('pilot-name-input');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        this.playerName = e.target.value.trim() || 'Pilot';
        localStorage.setItem('rockets_pilot_name', this.playerName);
      });
    }

    // Hook Sliders value change badges
    const accelSlider = document.getElementById('accel-slider');
    const accelBadge = document.getElementById('accel-val-badge');
    if (accelSlider && accelBadge) {
      accelSlider.addEventListener('input', (e) => {
        accelBadge.textContent = e.target.value;
      });
    }

    const shearSlider = document.getElementById('shear-slider');
    const shearBadge = document.getElementById('shear-val-badge');
    if (shearSlider && shearBadge) {
      shearSlider.addEventListener('input', (e) => {
        shearBadge.textContent = parseFloat(e.target.value).toFixed(2);
      });
    }

    const carveSlider = document.getElementById('carve-slider');
    const carveBadge = document.getElementById('carve-val-badge');
    if (carveSlider && carveBadge) {
      carveSlider.addEventListener('input', (e) => {
        carveBadge.textContent = parseFloat(e.target.value).toFixed(1);
      });
    }

    const blinkTransSlider = document.getElementById('blink-trans-slider');
    const blinkTransBadge = document.getElementById('blink-trans-val-badge');
    if (blinkTransSlider && blinkTransBadge) {
      blinkTransSlider.addEventListener('input', (e) => {
        blinkTransBadge.textContent = e.target.value;
      });
    }

    const blinkDurSlider = document.getElementById('blink-dur-slider');
    const blinkDurBadge = document.getElementById('blink-dur-val-badge');
    if (blinkDurSlider && blinkDurBadge) {
      blinkDurSlider.addEventListener('input', (e) => {
        blinkDurBadge.textContent = e.target.value;
      });
    }

    const turnRateSlider = document.getElementById('turn-rate-slider');
    const turnRateBadge = document.getElementById('turn-rate-val-badge');
    if (turnRateSlider && turnRateBadge) {
      turnRateSlider.addEventListener('input', (e) => {
        turnRateBadge.textContent = parseFloat(e.target.value).toFixed(2);
      });
    }

    // Hook PWA Installation
    let deferredPrompt = window.__pwaDeferredPrompt;
    const pwaBanner = document.getElementById('pwa-install-banner');
    const pwaBtn = document.getElementById('btn-pwa-install');
    if (deferredPrompt && pwaBanner) {
      pwaBanner.style.display = 'flex';
    }
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      window.__pwaDeferredPrompt = e;
      if (pwaBanner) pwaBanner.style.display = 'flex';
    });
    if (pwaBtn) {
      pwaBtn.addEventListener('click', () => {
        const promptEvent = window.__pwaDeferredPrompt;
        if (promptEvent) {
          promptEvent.prompt();
          promptEvent.userChoice.then(() => {
            if (pwaBanner) pwaBanner.style.display = 'none';
          });
        }
      });
    }

    // Hook Create Match
    const createBtn = document.getElementById('btn-create-match');
    const sectorInput = document.getElementById('sector-name-input');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        const roomName = (sectorInput.value.trim()) || getRandomSectorName();
        const roomId = roomName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
        const config = {
          voxelQuality: document.getElementById('voxel-quality-select')?.value || 'high',
          asteroidCount: parseInt(document.getElementById('asteroid-count-select')?.value, 10) || 100,
          megaRadius: parseInt(document.getElementById('mega-radius-select')?.value, 10) || 2800,
          meteorFrequency: document.getElementById('meteor-freq-select') ? parseInt(document.getElementById('meteor-freq-select').value, 10) : 10,
          forwardAccel: parseInt(document.getElementById('accel-slider')?.value, 10) || 180,
          momentumShearing: (Number.isNaN(parseFloat(document.getElementById('shear-slider')?.value)) ? 0.1 : parseFloat(document.getElementById('shear-slider')?.value)),
          carveRadius: parseFloat(document.getElementById('carve-slider')?.value) || 6.5,
          blinkTranslucency: parseInt(document.getElementById('blink-trans-slider')?.value, 10) || 80,
      blinkDuration: parseInt(document.getElementById('blink-dur-slider')?.value, 10) || 750,
      turnRate: parseFloat(document.getElementById('turn-rate-slider')?.value) || 0.75,
          renderScale: parseFloat(document.getElementById('render-scale-select')?.value) || 1.0,
          maxFps: document.getElementById('max-fps-select') ? parseInt(document.getElementById('max-fps-select').value, 10) : 60,
          shaderQuality: document.getElementById('shader-quality-select')?.value || 'balanced',
          particleDensity: document.getElementById('particle-density-select')?.value || 'balanced',
          showStats: document.getElementById('show-stats-select') ? document.getElementById('show-stats-select').value !== 'false' : false
        };
        this.startMatch({
          roomId,
          roomName,
          mapSeed: Math.abs(this.hashCode(roomId)),
          config
        });
      });
    }

    // Hook Direct Join
    const joinBtn = document.getElementById('btn-direct-join');
    const joinInput = document.getElementById('join-room-input');
    if (joinBtn) {
      joinBtn.addEventListener('click', () => {
        const val = joinInput.value.trim();
        if (!val) {
          alert('Please enter a Room Code or Sector ID to join.');
          return;
        }
        const roomId = val.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
        this.startMatch({
          roomId,
          roomName: val,
          mapSeed: Math.abs(this.hashCode(roomId))
        });
      });
    }

    // Hook Refresh Rooms
    const refreshBtn = document.getElementById('btn-refresh-rooms');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        lobbyService.refreshRooms();
      });
    }

    // Initialize lobby directory & subscribe to updates
    lobbyService.init();
    lobbyService.onRoomsUpdated((rooms) => {
      this.updateRoomsListUI(rooms);
    });
  }

  updateRoomsListUI(rooms) {
    const container = document.getElementById('rooms-list-container');
    if (!container) return;

    if (!rooms || rooms.length === 0) {
      container.innerHTML = `<div class="rooms-empty">No active matches found. Click <strong>LAUNCH SECTOR</strong> above to host one!</div>`;
      return;
    }

    container.innerHTML = rooms.map(room => `
      <div class="room-list-item">
        <div class="room-item-meta">
          <span class="room-item-name">🛰️ ${escapeHtml(room.roomName || room.roomId)}</span>
          <div class="room-item-details">
            <span>👥 ${room.playerCount || 1} Pilot${room.playerCount === 1 ? '' : 's'}</span>
            <span>👑 Host: Pilot-${(room.masterId || 'Host').slice(0, 4)}</span>
            <span class="room-ttl-badge">⏳ TTL: ${room.ttlSecondsRemaining}s</span>
          </div>
          <div class="room-config-badges">
            <span class="room-badge badge-vox">VOX: ${(room.config?.voxelQuality || 'high').toUpperCase()}</span>
            <span class="room-badge badge-belt">BELT: ${room.config?.asteroidCount ?? 100}</span>
            <span class="room-badge badge-mega">MEGA: ${room.config?.megaRadius ?? 2800}u</span>
            <span class="room-badge badge-meteor">METEOR: ${room.config?.meteorFrequency ? room.config.meteorFrequency + 's' : 'OFF'}</span>
            <span class="room-badge badge-accel">ACC: ${room.config?.forwardAccel ?? 60}u/s²</span>
            <span class="room-badge badge-shear">SHEAR: ${Number(room.config?.momentumShearing ?? 0.0).toFixed(2)}</span>
            <span class="room-badge badge-carve">CARVE: ${Number(room.config?.carveRadius ?? 6.5).toFixed(1)}u</span>
            <span class="room-badge badge-blink">HOLO: ${room.config?.blinkTranslucency ?? 80}%</span>
              <span class="room-badge badge-blinkdur">BLINK FX: ${room.config?.blinkDuration ?? 750}ms</span>
              <span class="room-badge badge-turn">TURN: ${Number(room.config?.turnRate ?? 0.75).toFixed(2)}r/s</span>
          </div>
        </div>
        <button class="btn-join-room-item" data-room-id="${escapeHtml(room.roomId)}" data-room-name="${escapeHtml(room.roomName || room.roomId)}" data-seed="${room.mapSeed || 42}" data-config='${JSON.stringify(room.config || {})}'>
          JOIN SECTOR
        </button>
      </div>
    `).join('');

    // Attach click listeners to join buttons
    const joinButtons = container.querySelectorAll('.btn-join-room-item');
    joinButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const roomId = btn.getAttribute('data-room-id');
        const roomName = btn.getAttribute('data-room-name');
        const mapSeed = parseInt(btn.getAttribute('data-seed'), 10) || 42;
        let config = null;
        try {
          config = JSON.parse(btn.getAttribute('data-config'));
        } catch (_) {}
        this.startMatch({ roomId, roomName, mapSeed, config });
      });
    });
  }

  startMatch({ roomId, roomName, mapSeed, config }) {
    this.currentMode = 'game';

    const activeConfig = {
      voxelQuality: 'high',
      asteroidCount: 100,
      megaRadius: 2800,
      meteorFrequency: 10,
      forwardAccel: 180,
      momentumShearing: 0.1,
      carveRadius: 6.5,
      blinkTranslucency: 80,
      blinkDuration: 750,
      turnRate: 0.75,
      renderScale: 1.0,
      maxFps: 60,
      shaderQuality: 'balanced',
      particleDensity: 'balanced',
      showStats: false,
      ...(config || {})
    };

    // Clear DOM
    app.innerHTML = '';
    const gameContainer = document.createElement('div');
    gameContainer.id = 'game-canvas-container';
    gameContainer.style.width = '100%';
    gameContainer.style.height = '100%';
    gameContainer.style.position = 'relative';
    gameContainer.style.overflow = 'hidden';
    app.appendChild(gameContainer);

    // Update browser URL query without reload
    const newUrl = `${window.location.pathname}?room=${encodeURIComponent(roomId)}&quality=${encodeURIComponent(activeConfig.voxelQuality)}&density=${activeConfig.asteroidCount}&mega=${activeConfig.megaRadius}&meteor=${activeConfig.meteorFrequency}&accel=${activeConfig.forwardAccel}&shear=${activeConfig.momentumShearing}&carve=${activeConfig.carveRadius}&blinktrans=${activeConfig.blinkTranslucency}&blinkdur=${activeConfig.blinkDuration}&turnrate=${activeConfig.turnRate}&scale=${activeConfig.renderScale}&fps=${activeConfig.maxFps}&shader=${encodeURIComponent(activeConfig.shaderQuality)}&particles=${encodeURIComponent(activeConfig.particleDensity)}&stats=${activeConfig.showStats !== false}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    // Initialize Network Mesh
    this.network = new GameNetwork({
      roomId,
      roomName,
      mapSeed,
      config: activeConfig,
      playerName: this.playerName,
      onCombatLog: (msg) => {
        if (this.hud) this.hud.showCombatMessage(msg);
      }
    });

    // Initialize Game Engine
    this.engine = new GameEngine({
      container: gameContainer,
      network: this.network,
      mapSeed,
      config: activeConfig,
      onHudUpdate: (hudState) => {
        if (this.hud) this.hud.update(hudState);
      },
      onDeathNotice: (notice) => {
        if (this.hud) this.hud.showCombatMessage(notice);
      }
    });

    // Initialize Responsive HUD
    this.hud = new GameHUD(gameContainer, this.engine);

    // Join room & start engine
    try {
      this.network.join();
    } catch (netErr) {
      console.error('[Network] joinRoom exception:', netErr?.message || netErr);
    }
    this.engine.start();
    window.__engine = this.engine;
    window.gameEngine = this.engine;
    window.__hud = this.hud;
    window.logger = logger;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

new AppRouter();
