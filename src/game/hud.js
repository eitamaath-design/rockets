import * as THREE from 'three';
import { logger } from '../utils/logger.js';
import { audio } from './audio.js';

export class GameHUD {
  constructor(container, engine) {
    this.container = container;
    this.engine = engine;
    this.hudElement = null;
    this.isVoteActive = false;
    this.lastMonitorUpdateTime = 0;
    this.monitorThrottleMs = 100; // 10Hz throttle (100ms)
    this.isMonitorMinimized = false;
    this._windowListeners = [];
    this._documentListeners = [];
    this._lastValues = {};

    this.createDom();
    this.bindJoystick();
    this.bindTouchControls();
    this.bindFullscreen();
    this.bindDiagnostics();
    this.bindMapResetVoting();
    this.bindMasterMonitorControls();

    // Initialize room title immediately
    const roomTitle = document.getElementById('hud-room-title');
    if (roomTitle && this.engine && this.engine.network) {
      roomTitle.textContent = this.engine.network.roomName || this.engine.network.roomId || 'Orion Sector';
    }

    // Initialize room config pill immediately
    const configPill = document.getElementById('hud-config-pill');
    if (configPill && this.engine && this.engine.config) {
      const cfg = this.engine.config;
      const q = (cfg.voxelQuality || 'low').toUpperCase();
      const resMap = { low: '32³', medium: '48³', high: '64³' };
      const res = resMap[cfg.voxelQuality] || '32³';
      const belt = cfg.asteroidCount !== undefined ? cfg.asteroidCount : 100;
      const meteor = cfg.meteorFrequency ? `${cfg.meteorFrequency}s` : 'OFF';
      const fpsLabel = cfg.maxFps ? cfg.maxFps : 'MAX';
      const scaleLabel = cfg.renderScale || 1.0;
      configPill.textContent = `VOX: ${q} (${res}) | BELT: ${belt} | METEOR: ${meteor} | FPS: ${fpsLabel} | DPI: ${scaleLabel}x`;
    }
  }

  createDom() {
    this.hudElement = document.createElement('div');
    this.hudElement.className = 'game-hud-overlay';
    this.hudElement.innerHTML = `
      <!-- Orientation Warning for Mobile Portrait -->
      <div class="hud-rotate-notice" id="hud-rotate-notice">
        <span>🔄 Rotate phone to landscape for flight stick controls</span>
        <button class="hud-btn-mini-fullscreen" id="btn-rotate-fullscreen">⛶ Fullscreen</button>
      </div>

      <!-- Floating Fullscreen Exit Button for Android & Mobile Touch Ergonomics -->
      <button class="hud-float-exit-fullscreen" id="hud-float-exit-fullscreen" style="display: none;" title="Exit Fullscreen">✕ Exit Fullscreen</button>

      <!-- Top Status Bar with Integrated Compact Gauges -->
      <div class="hud-top-bar">
        <div class="hud-top-left">
          <div class="hud-room-info">
            <span class="hud-room-title" id="hud-room-title">Orion Sector</span>
            <button class="hud-btn-copy" id="hud-btn-copy" title="Copy Shareable Link">📋 Invite</button>
            <button class="hud-btn-reset-map" id="hud-btn-reset-map" title="Vote to Reset Sector Map">🔄 Reset Map</button>
          </div>
        </div>

        <div class="hud-top-center">
          <div class="hud-header-scoreboard" id="hud-header-scoreboard">
            <span>👥 <strong id="hud-alive-val">1</strong> Pilot</span>
            <span>SPD: <strong id="hud-speed-val">0</strong></span>
          </div>

          <!-- Integrated Compact Flight & Combat Gauges -->
          <div class="hud-top-meters">
            <div class="hud-compact-meter meter-shield">
              <span class="meter-label" id="hud-shield-title">SHIELD</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-shield" id="hud-shield-bar" style="width: 100%;"></div>
              </div>
              <span class="meter-val" id="hud-shield-num">100%</span>
            </div>

            <div class="hud-compact-meter meter-hp">
              <span class="meter-label">HULL</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-hp" id="hud-hp-bar" style="width: 100%;"></div>
              </div>
              <span class="meter-val" id="hud-hp-num">100%</span>
            </div>

            <div class="hud-compact-meter meter-laser">
              <span class="meter-label" id="hud-laser-label">LASER [SHIELD/DIG]</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-laser" id="hud-laser-bar" style="width: 100%;"></div>
              </div>
              <span class="meter-val" id="hud-laser-pct">100%</span>
            </div>

            <div class="hud-compact-meter meter-missile">
              <span class="meter-label">MISSILE</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-missile" id="hud-missile-bar" style="width: 0%;"></div>
              </div>
              <span class="meter-val" id="hud-missile-pct">DUMB-FIRE</span>
            </div>

            <div class="hud-powerup-badge" id="hud-powerup-badge" style="display: none;"></div>

            <div class="hud-beacon-pill" id="hud-beacon-pill" style="display: none;">
              📡 BEACON ACTIVE
            </div>
          </div>
        </div>

        <div class="hud-top-right">
          <div class="hud-stat-pill hud-config-pill" id="hud-config-pill">VOX: LOW (32³) | BELT: 100 | METEOR: 10s</div>
          <div class="hud-stat-pill" id="hud-peers-count">👥 1</div>
          <div class="hud-stat-pill" id="hud-ping-val">📡 0ms</div>
          <button class="hud-btn-diag" id="hud-btn-diag" title="Client Diagnostics & Telemetry Logs">🐞 Logs</button>
          <button class="hud-btn-fullscreen" id="hud-btn-fullscreen" title="Toggle Fullscreen">⛶</button>
          <button class="hud-btn-leave" id="hud-btn-leave" title="Leave Match">✕</button>
        </div>
      </div>

      <!-- Room Master Real-Time Debug & Diagnostics Monitor -->
      <div class="hud-master-monitor" id="hud-master-monitor" style="display: none;">
        <div class="master-monitor-header" id="master-monitor-header">
          <span class="master-pulse-dot">●</span>
          <span class="master-monitor-title">ROOM MASTER DIAGNOSTICS</span>
          <span class="master-monitor-freq">10Hz</span>
          <button class="master-monitor-min-btn" id="btn-minimize-monitor" title="Minimize Statistics View">_</button>
        </div>
        <button class="master-monitor-dock-tab" id="btn-restore-monitor" title="Restore Statistics View">
          <span class="dock-tab-icon">📊</span>
          <span class="dock-tab-label">STATS</span>
        </button>
        <div class="master-monitor-grid" id="master-monitor-grid">
          <div class="monitor-metric" id="metric-fps">
            <span class="metric-key">FPS</span>
            <span class="metric-badge nominal" id="mon-fps-badge">--</span>
          </div>
          <div class="monitor-metric" id="metric-frame-time">
            <span class="metric-key">FRAME</span>
            <span class="metric-badge nominal" id="mon-frame-badge">-- ms</span>
          </div>
          <div class="monitor-metric" id="metric-draw-calls">
            <span class="metric-key">CALLS</span>
            <span class="metric-badge nominal" id="mon-calls-badge">--</span>
          </div>
          <div class="monitor-metric" id="metric-triangles">
            <span class="metric-key">TRIS</span>
            <span class="metric-badge nominal" id="mon-tris-badge">--</span>
          </div>
          <div class="monitor-metric" id="metric-memory">
            <span class="metric-key">HEAP</span>
            <span class="metric-badge nominal" id="mon-mem-badge">-- MB</span>
          </div>
          <div class="monitor-metric" id="metric-ping">
            <span class="metric-key">PING</span>
            <span class="metric-badge nominal" id="mon-ping-badge">-- ms</span>
          </div>
          <div class="monitor-metric" id="metric-mega">
            <span class="metric-key">MEGA DIST</span>
            <span class="metric-badge nominal" id="mon-mega-badge">-- u</span>
          </div>
          <div class="monitor-metric" id="metric-speed">
            <span class="metric-key">SPEED</span>
            <span class="metric-badge nominal" id="mon-speed-badge">-- u/s</span>
          </div>
        </div>
      </div>

      <!-- Center Reticle & Alerts -->
      <div class="hud-center-crosshair">
        <div class="crosshair-ring"></div>
        <div class="crosshair-dot"></div>
      </div>

      <!-- Line-of-Sight Corner Bracket Targeting System -->
      <div class="hud-targeting-container" id="hud-targeting-container"></div>

      <!-- Dynamic Ship Bore-Sight Reticle (Actual Hull Orientation vs Pilot POV) -->
      <div class="hud-ship-boresight tracking" id="hud-ship-boresight">
        <div class="boresight-reticle">
          <div class="boresight-cross-h"></div>
          <div class="boresight-cross-v"></div>
          <div class="boresight-ring"></div>
          <div class="boresight-pointer"></div>
        </div>
        <span class="boresight-label" id="hud-boresight-label">0°</span>
      </div>

      <!-- 3D Target Lock Brackets -->
      <div class="hud-missile-lock-box" id="hud-missile-lock-box" style="display: none;">
        <div class="lock-bracket tl"></div>
        <div class="lock-bracket tr"></div>
        <div class="lock-bracket bl"></div>
        <div class="lock-bracket br"></div>
        <span class="lock-label" id="hud-lock-label">TRACKING 0%</span>
      </div>

      <div class="hud-combat-feed" id="hud-combat-feed"></div>

      <!-- 2D Viewpoint Tactical Radar (3-Second Refresh Interval) -->
      <div class="hud-radar" id="hud-radar">
        <div class="hud-radar-dial">
          <div class="hud-radar-ring ring-1"></div>
          <div class="hud-radar-ring ring-2"></div>
          <div class="hud-radar-ring ring-3"></div>
          <div class="hud-radar-axis-h"></div>
          <div class="hud-radar-axis-v"></div>
          <div class="hud-radar-center"></div>
          <div class="hud-radar-sweep"></div>
          <div class="hud-radar-blips" id="hud-radar-blips"></div>
        </div>
        <div class="hud-radar-footer">
          <span class="hud-radar-title">RADAR</span>
          <span class="hud-radar-cadence" id="hud-radar-cadence">3.0s</span>
        </div>
      </div>

      <!-- 10-Second Democratic Map Reset Vote Interactive Banner -->
      <div class="hud-vote-banner" id="hud-vote-banner" style="display: none;">
        <div class="vote-header">
          <span class="vote-icon">🔄</span>
          <span class="vote-title">SECTOR RE-SEED VOTE</span>
          <span class="vote-countdown" id="hud-vote-countdown">10s</span>
        </div>
        <div class="vote-info" id="hud-vote-info">Initiated by Host</div>
        <div class="vote-tally-bar">
          <span class="vote-tally-label" id="hud-vote-tally">Votes: 1/1 agreed</span>
        </div>
        <div class="vote-buttons" id="hud-vote-buttons">
          <button class="vote-btn-accept" id="btn-vote-accept">✓ Accept (Y)</button>
          <button class="vote-btn-decline" id="btn-vote-decline">✕ Decline (N)</button>
        </div>
      </div>

      <div class="hud-respawn-overlay" id="hud-respawn-overlay" style="display: none;">
        <div class="respawn-title" id="hud-respawn-title">SHIP DESTROYED</div>
        <div class="respawn-counter" id="hud-respawn-counter">Respawning in 3...</div>
      </div>

      <!-- On-Screen Flight & Combat Controls (Clean, Minimalist Translucent) -->
      <div class="hud-touch-controls">
        <!-- Left: Drag D-Pad Joystick (Pitch Up/Down, Turn Left/Right with Auto-Roll Banking) -->
        <div class="touch-controls-left">
          <div class="touch-joystick-container" id="touch-joystick-container">
            <div class="joystick-base" id="joystick-base">
              <div class="joystick-axis-h"></div>
              <div class="joystick-axis-v"></div>
              <div class="joystick-knob" id="joystick-knob"></div>
            </div>
          </div>

          <!-- Manual Roll Buttons -->
          <div class="touch-roll-cluster">
            <button class="action-touch-btn touch-btn btn-roll" id="btn-roll-left" title="Roll Left (Q)">↺ Roll L</button>
            <button class="action-touch-btn touch-btn btn-roll" id="btn-roll-right" title="Roll Right (E)">Roll R ↻</button>
          </div>
        </div>

        <!-- Right: Side Strafing, Main Thrusters & Weapons -->
        <div class="touch-controls-right">
          <!-- Side Thrusters (Strafing) -->
          <div class="touch-strafe-cluster">
            <button class="action-touch-btn touch-btn btn-strafe" id="btn-strafe-left" title="Strafe Left Side Thruster (A)">⬅ Strafe L</button>
            <button class="action-touch-btn touch-btn btn-strafe" id="btn-strafe-right" title="Strafe Right Side Thruster (D)">Strafe R ➡</button>
          </div>

          <!-- Main Thrusters -->
          <div class="touch-thrust-cluster">
            <button class="action-touch-btn touch-btn btn-thrust" id="btn-thrust" title="Hold to Thrust (W) | Double-Tap & Hold to BLINK">
              🚀 <strong>THRUST</strong>
              <span class="hud-boost-badge" id="hud-boost-badge">⚡ BLINK</span>
            </button>
            <button class="action-touch-btn touch-btn btn-brake" id="btn-brake" title="Hold to Slow Down / Stop in 0.67s (S)">🛑 <strong>BRAKE</strong></button>
          </div>

          <!-- Dual Forward Arsenals & Dedicated Special Powerup -->
          <div class="touch-weapon-cluster">
            <button class="action-touch-btn touch-btn btn-laser" id="btn-laser" title="Hold to Fire Laser Beam & Dig Asteroids (Space / LMB)">
              <span id="btn-laser-icon">⚡</span> <strong id="btn-laser-text">LASER</strong>
              <small class="weapon-subtext" id="btn-laser-subtext">[SHIELD/DIG]</small>
            </button>
            <button class="action-touch-btn touch-btn btn-missile" id="btn-missile" title="Homing Missile (F / RMB) - Aim at target for 3s to lock">
              <span id="btn-missile-icon">🚀</span> <strong id="btn-missile-text">MISSILE</strong>
              <small class="weapon-subtext" id="btn-missile-status">[AIM TO LOCK]</small>
            </button>
            <button class="action-touch-btn touch-btn btn-special disabled" id="btn-special" title="Activate Special Power-Up (Key R)">
              <span id="btn-special-icon">✨</span> <strong id="btn-special-text">SPECIAL</strong>
              <small class="weapon-subtext" id="btn-special-desc">[EMPTY]</small>
            </button>
          </div>
        </div>
      </div>

      <!-- Client Diagnostic & Telemetry Log Modal -->
      <div class="hud-diag-backdrop" id="hud-diag-backdrop" style="display: none;">
        <div class="hud-diag-modal">
          <div class="diag-header">
            <h3>🛠️ Client Diagnostics & Engine Logs</h3>
            <button class="diag-close-btn" id="btn-close-diag">✕ Close</button>
          </div>
          <div class="diag-body">
            <pre class="diag-text" id="diag-text-display">Loading diagnostics...</pre>
          </div>
          <div class="diag-footer">
            <button class="btn-primary" id="btn-copy-diag-text">📋 Copy Log to Clipboard</button>
          </div>
        </div>
      </div>
    `;

    this.container.appendChild(this.hudElement);
  }

  bindJoystick() {
    const container = document.getElementById('touch-joystick-container');
    const base = document.getElementById('joystick-base');
    const knob = document.getElementById('joystick-knob');
    if (!container || !base || !knob) return;

    const shipInput = this.engine.playerShip.input;
    const maxRadius = 45; // max drag radius in pixels
    let activeTouchId = null;
    let pointerDragging = false;
    let originX = 0;
    let originY = 0;

    const getRestingCenter = () => {
      const prevTransform = base.style.transform;
      base.style.transform = 'none';
      const rect = base.getBoundingClientRect();
      base.style.transform = prevTransform;
      let cx = rect.left + (rect.width || 120) / 2;
      let cy = rect.top + (rect.height || 120) / 2;
      if (rect.left === 0 && rect.top === 0 && rect.width === 0 && rect.height === 0) {
        cx = 100;
        cy = 100;
      }
      return { x: cx, y: cy };
    };

    const startJoystick = (clientX, clientY, identifier = null) => {
      activeTouchId = identifier;
      originX = clientX;
      originY = clientY;

      const resting = getRestingCenter();
      const baseDx = originX - resting.x;
      const baseDy = originY - resting.y;

      base.style.transition = 'none';
      knob.style.transition = 'none';
      base.style.transform = `translate(${baseDx}px, ${baseDy}px)`;
      knob.style.transform = `translate(0px, 0px)`;
      base.classList.add('active');

      shipInput.analogPitch = 0;
      shipInput.analogYaw = 0;

      logger.log('TOUCH', `Dynamic D-Pad centered at (${Math.round(originX)}, ${Math.round(originY)}) id=${identifier}`);
    };

    const moveJoystick = (clientX, clientY) => {
      let dx = clientX - originX;
      let dy = clientY - originY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > maxRadius) {
        dx = (dx / dist) * maxRadius;
        dy = (dy / dist) * maxRadius;
      }

      knob.style.transform = `translate(${dx}px, ${dy}px)`;

      // Normalized analog inputs: -1 to +1
      // Drag UP -> Pitch Up (+1), Drag DOWN -> Pitch Down (-1)
      shipInput.analogPitch = -(dy / maxRadius);
      // Drag RIGHT -> Turn Right (-1), Drag LEFT -> Turn Left (+1)
      shipInput.analogYaw = -(dx / maxRadius);
    };

    const resetJoystick = () => {
      activeTouchId = null;
      pointerDragging = false;
      base.classList.remove('active');

      knob.style.transition = 'transform 0.15s ease-out';
      knob.style.transform = `translate(0px, 0px)`;

      base.style.transition = 'transform 0.2s ease-out';
      base.style.transform = `translate(0px, 0px)`;

      shipInput.analogPitch = 0;
      shipInput.analogYaw = 0;
    };

    const findTouchById = (touchList, id) => {
      if (!touchList) return null;
      for (let i = 0; i < touchList.length; i++) {
        if (touchList[i].identifier === id) return touchList[i];
      }
      return null;
    };

    // 1. Direct Touch Events (iOS & Android Multi-Touch Aware)
    container.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (activeTouchId !== null) return;

      const touches = (e.changedTouches && e.changedTouches.length > 0)
        ? e.changedTouches
        : ((e.targetTouches && e.targetTouches.length > 0) ? e.targetTouches : e.touches);

      if (touches && touches.length > 0) {
        const touch = touches[0];
        const id = touch.identifier !== undefined ? touch.identifier : 0;
        startJoystick(touch.clientX, touch.clientY, id);
      }
    }, { passive: false });

    const onTouchMove = (e) => {
      if (activeTouchId === null) return;
      const touch = findTouchById(e.touches, activeTouchId) || findTouchById(e.changedTouches, activeTouchId);
      if (touch) {
        if (e.cancelable) e.preventDefault();
        moveJoystick(touch.clientX, touch.clientY);
      }
    };

    const onTouchEnd = (e) => {
      if (activeTouchId === null) return;
      if (e.changedTouches && e.changedTouches.length > 0) {
        const endedTouch = findTouchById(e.changedTouches, activeTouchId);
        if (endedTouch) {
          if (e.cancelable) e.preventDefault();
          resetJoystick();
        }
      } else if (!e.touches || !findTouchById(e.touches, activeTouchId)) {
        if (e.cancelable) e.preventDefault();
        resetJoystick();
      }
    };

    container.addEventListener('touchmove', (e) => {
      e.stopPropagation();
      onTouchMove(e);
    }, { passive: false });

    container.addEventListener('touchend', (e) => {
      e.stopPropagation();
      onTouchEnd(e);
    }, { passive: false });

    container.addEventListener('touchcancel', (e) => {
      e.stopPropagation();
      onTouchEnd(e);
    }, { passive: false });

    // Floating Joystick Screen Fallback:
    // When pilot touches anywhere on left navigation zone (outside interactive buttons/HUD),
    // center the D-pad at that touch position.
    const onWindowTouchStart = (e) => {
      if (activeTouchId !== null) return;
      const touches = e.changedTouches || e.touches;
      if (!touches || touches.length === 0) return;

      for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        const target = e.target;
        if (container.contains(target)) return;

        if (target && typeof target.closest === 'function') {
          if (target.closest('.hud-top-bar, .hud-diag-modal, .hud-vote-banner, .action-touch-btn, .touch-btn, button, input')) {
            continue;
          }
        }

        const vpWidth = window.innerWidth || (document.documentElement ? document.documentElement.clientWidth : 800);
        const vpHeight = window.innerHeight || (document.documentElement ? document.documentElement.clientHeight : 600);
        if (touch.clientX < vpWidth * 0.45 && touch.clientY > vpHeight * 0.15) {
          if (e.cancelable) e.preventDefault();
          const id = touch.identifier !== undefined ? touch.identifier : 0;
          startJoystick(touch.clientX, touch.clientY, id);
          break;
        }
      }
    };

    this._addWindowListener('touchstart', onWindowTouchStart, { passive: false });
    this._addWindowListener('touchmove', onTouchMove, { passive: false });
    this._addWindowListener('touchend', onTouchEnd, { passive: false });
    this._addWindowListener('touchcancel', onTouchEnd, { passive: false });

    // 2. Pointer / Mouse Events (Desktop)
    container.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      e.preventDefault();
      pointerDragging = true;
      startJoystick(e.clientX, e.clientY, null);
    });

    this._addWindowListener('pointermove', (e) => {
      if (pointerDragging && e.pointerType !== 'touch') {
        moveJoystick(e.clientX, e.clientY);
      }
    });

    this._addWindowListener('pointerup', (e) => {
      if (pointerDragging && e.pointerType !== 'touch') {
        resetJoystick();
      }
    });
  }

  _addWindowListener(type, handler, options) {
    if (typeof window !== 'undefined') {
      window.addEventListener(type, handler, options);
      this._windowListeners.push({ type, handler, options });
    }
  }

  _addDocumentListener(type, handler, options) {
    if (typeof document !== 'undefined') {
      document.addEventListener(type, handler, options);
      if (!this._documentListeners) this._documentListeners = [];
      this._documentListeners.push({ type, handler, options });
    }
  }

  bindTouchControls() {
    const shipInput = this.engine.playerShip.input;

    const setupHoldButton = (elementId, onActive, onInactive) => {
      const el = document.getElementById(elementId);
      if (!el) return;

      let isHeld = false;
      const activeTouchIds = new Set();
      let isPointerDown = false;

      const activate = () => {
        if (isHeld) return;
        isHeld = true;
        onActive();
        el.classList.add('active');
        logger.log('INPUT', `Button [${elementId}] ACTIVATED`);
      };

      const deactivateIfNoInputs = () => {
        if (!isHeld) return;
        if (activeTouchIds.size > 0 || isPointerDown) return;
        isHeld = false;
        onInactive();
        el.classList.remove('active');
        logger.log('INPUT', `Button [${elementId}] RELEASED`);
      };

      // Native Touch Handlers (Multi-Touch Identifier Aware)
      el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.changedTouches && e.changedTouches.length > 0) {
          for (let i = 0; i < e.changedTouches.length; i++) {
            const id = e.changedTouches[i].identifier !== undefined ? e.changedTouches[i].identifier : 0;
            activeTouchIds.add(id);
          }
        } else {
          activeTouchIds.add(0);
        }
        activate();
      }, { passive: false });

      const handleTouchEnd = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (e && e.changedTouches && e.changedTouches.length > 0) {
          for (let i = 0; i < e.changedTouches.length; i++) {
            const id = e.changedTouches[i].identifier !== undefined ? e.changedTouches[i].identifier : 0;
            activeTouchIds.delete(id);
          }
        } else {
          activeTouchIds.clear();
        }
        deactivateIfNoInputs();
      };

      el.addEventListener('touchend', handleTouchEnd, { passive: false });
      el.addEventListener('touchcancel', handleTouchEnd, { passive: false });

      // Pointer / Mouse Handlers
      el.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch') return;
        e.preventDefault();
        e.stopPropagation();
        isPointerDown = true;
        activate();
      });

      const handlePointerStop = (e) => {
        if (e && e.pointerType === 'touch') return;
        if (!isPointerDown) return;
        isPointerDown = false;
        deactivateIfNoInputs();
      };

      el.addEventListener('pointerup', handlePointerStop);
      el.addEventListener('pointerleave', handlePointerStop);
      this._addWindowListener('pointerup', handlePointerStop);
    };

    // Manual Roll
    setupHoldButton('btn-roll-left', () => shipInput.rollLeft = true, () => shipInput.rollLeft = false);
    setupHoldButton('btn-roll-right', () => shipInput.rollRight = true, () => shipInput.rollRight = false);

    // Lateral Strafing (Side thrusters)
    setupHoldButton('btn-strafe-left', () => {
      audio.playStrafeBurst();
      shipInput.strafeLeft = true;
    }, () => shipInput.strafeLeft = false);
    setupHoldButton('btn-strafe-right', () => {
      audio.playStrafeBurst();
      shipInput.strafeRight = true;
    }, () => shipInput.strafeRight = false);

    // Main Thrust & Brake
    setupHoldButton('btn-thrust', () => {
      if (this.engine.triggerThrustStart) {
        this.engine.triggerThrustStart();
      } else if (this.engine.triggerBoostAction) {
        this.engine.triggerBoostAction();
      }
      shipInput.thrust = true;
    }, () => {
      if (this.engine.triggerThrustEnd) {
        this.engine.triggerThrustEnd();
      }
      shipInput.thrust = false;
    });
    setupHoldButton('btn-brake', () => shipInput.brake = true, () => shipInput.brake = false);

    // Dual Forward Weapons & Special Powerup
    setupHoldButton('btn-laser', () => this.engine.isFiringLaser = true, () => this.engine.isFiringLaser = false);

    const missileBtn = document.getElementById('btn-missile');
    if (missileBtn) {
      const handleMissile = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        this.engine.weaponsSystem.triggerSecondary(true, this.engine.playerShip, performance.now());
      };
      missileBtn.addEventListener('click', handleMissile);
      missileBtn.addEventListener('touchstart', handleMissile, { passive: false });
    }

    const specialBtn = document.getElementById('btn-special');
    if (specialBtn) {
      const handleSpecial = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const res = this.engine.playerShip.useSpecialPowerUp(this.engine);
        if (res) {
          this.showCombatMessage(res.message);
        }
      };
      specialBtn.addEventListener('click', handleSpecial);
      specialBtn.addEventListener('touchstart', handleSpecial, { passive: false });
    }

    // Copy invite link
    const copyBtn = document.getElementById('hud-btn-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const url = window.location.origin + window.location.pathname + `?room=${encodeURIComponent(this.engine.network.roomId)}`;
        navigator.clipboard.writeText(url).then(() => {
          copyBtn.textContent = '✅ Copied!';
          setTimeout(() => copyBtn.textContent = '📋 Invite', 2000);
        }).catch(() => {
          prompt('Share this match link:', url);
        });
      });
    }

    // Exit match
    const leaveBtn = document.getElementById('hud-btn-leave');
    if (leaveBtn) {
      leaveBtn.addEventListener('click', () => {
        if (confirm('Leave current match and return to lobby?')) {
          window.location.href = window.location.origin + window.location.pathname;
        }
      });
    }
  }

  bindDiagnostics() {
    const diagBtn = document.getElementById('hud-btn-diag');
    const backdrop = document.getElementById('hud-diag-backdrop');
    const closeBtn = document.getElementById('btn-close-diag');
    const copyBtn = document.getElementById('btn-copy-diag-text');
    const textDisplay = document.getElementById('diag-text-display');

    if (!diagBtn || !backdrop) return;

    diagBtn.addEventListener('click', () => {
      if (textDisplay) {
        textDisplay.textContent = logger.generateDiagnosticReport();
      }
      backdrop.style.display = 'flex';
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        backdrop.style.display = 'none';
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        await logger.copyToClipboard();
        copyBtn.textContent = '✅ Copied to Clipboard!';
        setTimeout(() => {
          copyBtn.textContent = '📋 Copy Log to Clipboard';
        }, 2500);
      });
    }
  }

  bindFullscreen() {
    const fsBtn = document.getElementById('hud-btn-fullscreen');
    const rotateFsBtn = document.getElementById('btn-rotate-fullscreen');
    const floatExitBtn = document.getElementById('hud-float-exit-fullscreen');

    const exitFs = (e) => {
      if (e) {
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
        if (typeof e.preventDefault === 'function') e.preventDefault();
      }
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    };

    const toggleFs = (e) => {
      if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const root = document.documentElement;
        if (root.requestFullscreen) {
          root.requestFullscreen().catch(() => {});
        } else if (root.webkitRequestFullscreen) {
          root.webkitRequestFullscreen();
        }
        try {
          if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(() => {});
          }
        } catch (err) {}
      } else {
        exitFs(e);
      }
    };

    if (fsBtn) fsBtn.addEventListener('click', toggleFs);
    if (rotateFsBtn) rotateFsBtn.addEventListener('click', toggleFs);
    if (floatExitBtn) {
      floatExitBtn.addEventListener('click', exitFs);
      floatExitBtn.addEventListener('touchstart', exitFs, { passive: false });
    }

    const updateFsState = () => {
      const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      if (fsBtn) fsBtn.textContent = isFs ? '⛶ Exit' : '⛶ Fullscreen';
      if (floatExitBtn) {
        floatExitBtn.style.display = isFs ? 'flex' : 'none';
      }
    };
    this._addDocumentListener('fullscreenchange', updateFsState);
    this._addDocumentListener('webkitfullscreenchange', updateFsState);
  }

  bindMapResetVoting() {
    const resetBtn = document.getElementById('hud-btn-reset-map');
    const voteBanner = document.getElementById('hud-vote-banner');
    const acceptBtn = document.getElementById('btn-vote-accept');
    const declineBtn = document.getElementById('btn-vote-decline');
    const countdownEl = document.getElementById('hud-vote-countdown');
    const infoEl = document.getElementById('hud-vote-info');
    const tallyEl = document.getElementById('hud-vote-tally');

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (this.engine) {
          const res = this.engine.requestMapResetVote();
          if (res && res.error) {
            this.showCombatMessage(`⚠️ ${res.error}`);
          }
        }
      });
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        if (this.engine) this.engine.castMapResetVote(true);
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        if (this.engine) this.engine.castMapResetVote(false);
      });
    }

    this._addWindowListener('keydown', (e) => {
      if (this.isVoteActive) {
        if (e.code === 'KeyY') {
          if (this.engine) this.engine.castMapResetVote(true);
          e.preventDefault();
        } else if (e.code === 'KeyN') {
          if (this.engine) this.engine.castMapResetVote(false);
          e.preventDefault();
        }
      }
    });

    if (this.engine && this.engine.network && typeof this.engine.network.onMapResetVote === 'function') {
      this.engine.network.onMapResetVote((voteData) => {
        if (!voteBanner) return;
        if (voteData.active) {
          this.isVoteActive = true;
          voteBanner.style.display = 'flex';
          if (countdownEl) countdownEl.textContent = `${voteData.remainingTime}s`;
          if (infoEl) infoEl.textContent = `Initiated by ${voteData.initiatorName || 'Host'}`;
          if (tallyEl) tallyEl.textContent = `Votes: ${voteData.yesCount}/${voteData.totalPeers} agreed (${voteData.remainingTime}s left)`;
        } else {
          this.isVoteActive = false;
          voteBanner.style.display = 'none';
        }
      });
    }
  }

  bindMasterMonitorControls() {
    const monitorEl = document.getElementById('hud-master-monitor');
    const headerEl = document.getElementById('master-monitor-header');
    const minBtn = document.getElementById('btn-minimize-monitor');
    const restoreBtn = document.getElementById('btn-restore-monitor');
    if (!monitorEl || !headerEl) return;

    const getViewportSize = () => {
      const vw = (this.container && this.container.clientWidth > 0)
        ? this.container.clientWidth
        : ((typeof window !== 'undefined' && window.innerWidth > 0) ? window.innerWidth : 1280);
      const vh = (this.container && this.container.clientHeight > 0)
        ? this.container.clientHeight
        : ((typeof window !== 'undefined' && window.innerHeight > 0) ? window.innerHeight : 720);
      return { vw, vh };
    };

    const getMonitorBounds = () => {
      const rect = monitorEl.getBoundingClientRect ? monitorEl.getBoundingClientRect() : { left: 12, top: 58, width: 220, height: 140 };
      const parsedLeft = parseFloat(monitorEl.style.left);
      const parsedTop = parseFloat(monitorEl.style.top);
      const left = !Number.isNaN(parsedLeft) ? parsedLeft : (rect.left || 12);
      const top = !Number.isNaN(parsedTop) ? parsedTop : (rect.top || 58);
      const width = rect.width > 0 ? rect.width : (monitorEl.offsetWidth > 0 ? monitorEl.offsetWidth : 220);
      const height = rect.height > 0 ? rect.height : (monitorEl.offsetHeight > 0 ? monitorEl.offsetHeight : 140);
      return { left, top, width, height };
    };

    const setMinimized = (minimized) => {
      this.isMonitorMinimized = minimized;
      if (minimized) {
        const { vw, vh } = getViewportSize();
        const bounds = getMonitorBounds();
        this._savedMonitorPos = { left: bounds.left, top: bounds.top };
        const centerX = bounds.left + bounds.width / 2;
        const dockRight = centerX > vw / 2;
        monitorEl.classList.add('minimized');
        const clampedTop = Math.max(8, Math.min(vh - 48, bounds.top));
        monitorEl.style.top = `${Math.round(clampedTop)}px`;
        if (dockRight) {
          monitorEl.classList.add('docked-right');
          monitorEl.style.left = 'auto';
          monitorEl.style.right = '0px';
        } else {
          monitorEl.classList.remove('docked-right');
          monitorEl.style.right = 'auto';
          monitorEl.style.left = '0px';
        }
      } else {
        monitorEl.classList.remove('minimized');
        monitorEl.classList.remove('docked-right');
        monitorEl.style.right = 'auto';
        const { vw, vh } = getViewportSize();
        const bounds = getMonitorBounds();
        const restoreLeft = this._savedMonitorPos ? this._savedMonitorPos.left : 12;
        const restoreTop = this._savedMonitorPos ? this._savedMonitorPos.top : 58;
        const clampedLeft = Math.max(0, Math.min(Math.max(0, vw - bounds.width), restoreLeft));
        const clampedTop = Math.max(0, Math.min(Math.max(0, vh - bounds.height), restoreTop));
        monitorEl.style.left = `${Math.round(clampedLeft)}px`;
        monitorEl.style.top = `${Math.round(clampedTop)}px`;
      }
    };

    if (minBtn) {
      minBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMinimized(true);
      });
      minBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMinimized(true);
      }, { passive: false });
    }

    if (restoreBtn) {
      restoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMinimized(false);
      });
      restoreBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMinimized(false);
      }, { passive: false });
    }

    // Floating window drag state (Mouse & Multi-Touch)
    let isDraggingMouse = false;
    let activeDragTouchId = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let startLeft = 12;
    let startTop = 58;

    const beginDrag = (clientX, clientY) => {
      const bounds = getMonitorBounds();
      dragStartX = clientX;
      dragStartY = clientY;
      startLeft = bounds.left;
      startTop = bounds.top;
      monitorEl.classList.add('dragging');
      monitorEl.style.right = 'auto';
      monitorEl.style.left = `${Math.round(startLeft)}px`;
      monitorEl.style.top = `${Math.round(startTop)}px`;
    };

    const moveDrag = (clientX, clientY) => {
      const { vw, vh } = getViewportSize();
      const bounds = getMonitorBounds();
      const dx = clientX - dragStartX;
      const dy = clientY - dragStartY;
      const maxLeft = Math.max(0, vw - bounds.width);
      const maxTop = Math.max(0, vh - bounds.height);
      const nextLeft = Math.max(0, Math.min(maxLeft, startLeft + dx));
      const nextTop = Math.max(0, Math.min(maxTop, startTop + dy));
      monitorEl.style.left = `${Math.round(nextLeft)}px`;
      monitorEl.style.top = `${Math.round(nextTop)}px`;
      this._savedMonitorPos = { left: nextLeft, top: nextTop };
    };

    const endDrag = () => {
      isDraggingMouse = false;
      activeDragTouchId = null;
      monitorEl.classList.remove('dragging');
    };

    // Mouse Dragging on Header
    headerEl.addEventListener('mousedown', (e) => {
      if (this.isMonitorMinimized) return;
      if (e.target && typeof e.target.closest === 'function' && e.target.closest('#btn-minimize-monitor')) return;
      e.preventDefault();
      e.stopPropagation();
      isDraggingMouse = true;
      beginDrag(e.clientX, e.clientY);
    });

    this._addWindowListener('mousemove', (e) => {
      if (!isDraggingMouse) return;
      moveDrag(e.clientX, e.clientY);
    });

    this._addWindowListener('mouseup', () => {
      if (isDraggingMouse) {
        endDrag();
      }
    });

    // Multi-Touch Dragging on Header
    const findTouch = (touchList, id) => {
      if (!touchList) return null;
      for (let i = 0; i < touchList.length; i++) {
        if (touchList[i].identifier === id) return touchList[i];
      }
      return null;
    };

    headerEl.addEventListener('touchstart', (e) => {
      if (this.isMonitorMinimized) return;
      if (e.target && typeof e.target.closest === 'function' && e.target.closest('#btn-minimize-monitor')) return;
      const touches = (e.changedTouches && e.changedTouches.length > 0) ? e.changedTouches : e.touches;
      if (activeDragTouchId === null && touches && touches.length > 0) {
        e.preventDefault();
        e.stopPropagation();
        const t = touches[0];
        activeDragTouchId = t.identifier !== undefined ? t.identifier : 0;
        beginDrag(t.clientX, t.clientY);
      }
    }, { passive: false });

    const onHeaderTouchMove = (e) => {
      if (activeDragTouchId === null) return;
      const t = findTouch(e.touches, activeDragTouchId) || findTouch(e.changedTouches, activeDragTouchId);
      if (t) {
        if (e.cancelable) e.preventDefault();
        moveDrag(t.clientX, t.clientY);
      }
    };

    const onHeaderTouchEnd = (e) => {
      if (activeDragTouchId === null) return;
      if (e.changedTouches && e.changedTouches.length > 0) {
        if (findTouch(e.changedTouches, activeDragTouchId)) {
          endDrag();
        }
      } else if (!e.touches || !findTouch(e.touches, activeDragTouchId)) {
        endDrag();
      }
    };

    headerEl.addEventListener('touchmove', (e) => {
      e.stopPropagation();
      onHeaderTouchMove(e);
    }, { passive: false });

    headerEl.addEventListener('touchend', (e) => {
      e.stopPropagation();
      onHeaderTouchEnd(e);
    }, { passive: false });

    headerEl.addEventListener('touchcancel', (e) => {
      e.stopPropagation();
      onHeaderTouchEnd(e);
    }, { passive: false });

    this._addWindowListener('touchmove', onHeaderTouchMove, { passive: false });
    this._addWindowListener('touchend', onHeaderTouchEnd, { passive: false });
    this._addWindowListener('touchcancel', onHeaderTouchEnd, { passive: false });
  }

  showCombatMessage(text) {
    const feed = document.getElementById('hud-combat-feed');
    if (!feed) return;
    const msg = document.createElement('div');
    msg.className = 'combat-feed-item';
    msg.textContent = text;
    feed.appendChild(msg);
    setTimeout(() => {
      msg.classList.add('fade-out');
      setTimeout(() => msg.remove(), 400);
    }, 3500);
  }

  update(state) {
    // Room title
    const roomTitle = document.getElementById('hud-room-title');
    if (roomTitle) roomTitle.textContent = this.engine.network.roomName || 'Orion Sector';

    // Network stats
    const peersEl = document.getElementById('hud-peers-count');
    if (peersEl) peersEl.textContent = `👥 ${state.activePeersCount} Pilot${state.activePeersCount === 1 ? '' : 's'}`;

    const pingEl = document.getElementById('hud-ping-val');
    if (pingEl) pingEl.textContent = `📡 ${state.avgPing}ms`;

    // Active Room Configuration Pill
    const configPill = document.getElementById('hud-config-pill');
    if (configPill && this.engine && this.engine.config) {
      const cfg = this.engine.config;
      const q = (cfg.voxelQuality || 'low').toUpperCase();
      const resMap = { low: '32³', medium: '48³', high: '64³' };
      const res = resMap[cfg.voxelQuality] || '32³';
      const belt = cfg.asteroidCount !== undefined ? cfg.asteroidCount : 100;
      const meteor = cfg.meteorFrequency ? `${cfg.meteorFrequency}s` : 'OFF';
      const fpsLabel = cfg.maxFps ? cfg.maxFps : 'MAX';
      const scaleLabel = cfg.renderScale || 1.0;
      configPill.textContent = `VOX: ${q} (${res}) | BELT: ${belt} | METEOR: ${meteor} | FPS: ${fpsLabel} | DPI: ${scaleLabel}x`;
    }

    // Shield Bar (recharges over 15s) with dirty-checking
    const shieldPct = Math.round(((state.shield !== undefined ? state.shield : 100) / (state.maxShield || 100)) * 100);
    if (shieldPct !== this._lastValues.shieldPct) {
      this._lastValues.shieldPct = shieldPct;
      const shieldBar = document.getElementById('hud-shield-bar');
      const shieldNum = document.getElementById('hud-shield-num');
      if (shieldBar) shieldBar.style.width = `${shieldPct}%`;
      if (shieldNum) shieldNum.textContent = `${shieldPct}%`;
    }

    // Health Bar with dirty-checking
    const hpPct = Math.round((state.hp / state.maxHp) * 100);
    if (hpPct !== this._lastValues.hpPct) {
      this._lastValues.hpPct = hpPct;
      const hpBar = document.getElementById('hud-hp-bar');
      const hpNum = document.getElementById('hud-hp-num');
      if (hpBar) {
        hpBar.style.width = `${hpPct}%`;
        hpBar.className = hpPct > 35 ? 'gauge-bar-fill bar-hp' : 'gauge-bar-fill bar-hp bar-hp-critical';
      }
      if (hpNum) hpNum.textContent = `${hpPct}%`;
    }

    // 30s Inactivity Beacon Indicator
    if (state.inactivityBeacon !== this._lastValues.inactivityBeacon) {
      this._lastValues.inactivityBeacon = state.inactivityBeacon;
      const beaconPill = document.getElementById('hud-beacon-pill');
      if (beaconPill) {
        beaconPill.style.display = state.inactivityBeacon ? 'inline-flex' : 'none';
      }
    }

    // Scoreboard with dirty-checking
    if (state.score !== this._lastValues.score) {
      this._lastValues.score = state.score;
      const scoreVal = document.getElementById('hud-score-val');
      if (scoreVal) scoreVal.textContent = state.score;
    }

    if (state.kills !== this._lastValues.kills) {
      this._lastValues.kills = state.kills;
      const killsVal = document.getElementById('hud-kills-val');
      if (killsVal) killsVal.textContent = state.kills;
    }

    if (state.deaths !== this._lastValues.deaths) {
      this._lastValues.deaths = state.deaths;
      const deathsVal = document.getElementById('hud-deaths-val');
      if (deathsVal) deathsVal.textContent = state.deaths;
    }

    // Speedometer with dirty-checking
    if (state.speed !== this._lastValues.speed) {
      this._lastValues.speed = state.speed;
      const speedVal = document.getElementById('hud-speed-val');
      if (speedVal) speedVal.textContent = state.speed;
    }

    // Blink Badge (Double-tap & hold thrust charged blink)
    const boostBadge = document.getElementById('hud-boost-badge');
    const thrustBtn = document.getElementById('btn-thrust');
    if (boostBadge) {
      if (state.isWarpCharging) {
        const pct = Math.min(100, Math.round((state.warpChargeRatio || 0) * 100));
        boostBadge.textContent = `BLINK ${pct}%`;
        boostBadge.className = 'hud-boost-badge charging';
        if (thrustBtn) thrustBtn.classList.add('warp-charging');
      } else if (state.warpReady ?? state.boostReady) {
        boostBadge.textContent = '⚡ BLINK';
        boostBadge.className = 'hud-boost-badge ready';
        if (thrustBtn) {
          thrustBtn.classList.remove('warp-charging');
          thrustBtn.classList.add('boost-ready');
        }
      } else {
        const cd = state.warpCooldown !== undefined ? state.warpCooldown : state.boostCooldown;
        boostBadge.textContent = `${cd}s`;
        boostBadge.className = 'hud-boost-badge cooling';
        if (thrustBtn) {
          thrustBtn.classList.remove('warp-charging');
          thrustBtn.classList.remove('boost-ready');
        }
      }
    }

    const aliveVal = document.getElementById('hud-alive-val');
    if (aliveVal && state.alivePilotsCount !== undefined) {
      aliveVal.textContent = state.alivePilotsCount;
    }

    // Broken Shield Alert
    const shieldTitle = document.getElementById('hud-shield-title');
    if (shieldTitle) {
      if (state.isShieldBroken) {
        shieldTitle.textContent = 'SHIELD [BROKEN]';
        shieldTitle.style.color = '#ff3344';
      } else {
        shieldTitle.textContent = 'SHIELD';
        shieldTitle.style.color = '#00ffff';
      }
    }

    // Laser Energy Bar (Smooth rendering & Fire Laser visual state)
    const laserBar = document.getElementById('hud-laser-bar');
    const laserPct = document.getElementById('hud-laser-pct');
    const laserLabel = document.getElementById('hud-laser-label');
    const laserBtn = document.getElementById('btn-laser');
    const laserBtnIcon = document.getElementById('btn-laser-icon');
    const laserBtnText = document.getElementById('btn-laser-text');
    const laserBtnSubtext = document.getElementById('btn-laser-subtext');

    const laserEnergyPct = Math.max(0, Math.min(100, Math.round(state.laserEnergy !== undefined ? state.laserEnergy : 100)));
    if (laserBar) {
      laserBar.style.width = `${laserEnergyPct}%`;
      if (state.hasFireLaser) {
        laserBar.classList.add('fire-laser');
      } else {
        laserBar.classList.remove('fire-laser');
      }
    }
    if (laserPct) {
      laserPct.textContent = state.hasFireLaser ? `${laserEnergyPct}% 🔥` : `${laserEnergyPct}%`;
    }
    if (laserLabel) {
      laserLabel.textContent = state.hasFireLaser ? '🔥 FIRE LASER [1.75x]' : 'LASER [SHIELD/DIG]';
      laserLabel.style.color = state.hasFireLaser ? '#ffaa00' : '#94a3b8';
    }
    if (laserBtn) {
      if (state.hasFireLaser) {
        laserBtn.classList.add('fire-active');
        if (laserBtnIcon) laserBtnIcon.textContent = '🔥';
        if (laserBtnText) laserBtnText.textContent = 'FIRE LASER';
        if (laserBtnSubtext) laserBtnSubtext.textContent = '[1.75x FLAME]';
      } else {
        laserBtn.classList.remove('fire-active');
        if (laserBtnIcon) laserBtnIcon.textContent = '⚡';
        if (laserBtnText) laserBtnText.textContent = 'LASER';
        if (laserBtnSubtext) laserBtnSubtext.textContent = '[SHIELD/DIG]';
      }
    }

    // Missile Lock Gauge & Status Bar
    const missileBar = document.getElementById('hud-missile-bar');
    const missilePct = document.getElementById('hud-missile-pct');
    const missileBtn = document.getElementById('btn-missile');
    const missileText = document.getElementById('btn-missile-text');
    const missileStatus = document.getElementById('btn-missile-status');

    const lockProgress = state.missileLockProgress || 0;
    const isLocked = !!state.missileLocked;

    if (missileBar) {
      missileBar.style.width = `${Math.round(lockProgress * 100)}%`;
      missileBar.className = isLocked ? 'gauge-bar-fill bar-missile locked' : 'gauge-bar-fill bar-missile';
    }

    if (missilePct) {
      if (isLocked) {
        missilePct.textContent = 'LOCKED';
        missilePct.style.color = '#ff3344';
      } else if (lockProgress > 0) {
        missilePct.textContent = `${Math.round(lockProgress * 100)}%`;
        missilePct.style.color = '#ffcc00';
      } else {
        missilePct.textContent = 'DUMB-FIRE';
        missilePct.style.color = '#00ffff';
      }
    }

    if (missileBtn) {
      if (isLocked) {
        missileBtn.classList.add('missile-locked');
        if (missileText) missileText.textContent = 'MISSILE [LOCKED]';
        if (missileStatus) missileStatus.textContent = '🎯 [LOCKED - GUIDED]';
      } else if (lockProgress > 0) {
        missileBtn.classList.remove('missile-locked');
        if (missileText) missileText.textContent = 'LOCKING...';
        const remSecs = (3.0 * (1.0 - lockProgress)).toFixed(1);
        if (missileStatus) missileStatus.textContent = `${Math.round(lockProgress * 100)}% (${remSecs}s)`;
      } else {
        missileBtn.classList.remove('missile-locked');
        if (missileText) missileText.textContent = 'MISSILE [DUMB-FIRE]';
        if (missileStatus) missileStatus.textContent = '[DUMB-FIRE / AIM 3s]';
      }
    }

    // Dedicated Special Power-Up Button
    const specialBtn = document.getElementById('btn-special');
    const specialIcon = document.getElementById('btn-special-icon');
    const specialText = document.getElementById('btn-special-text');
    const specialDesc = document.getElementById('btn-special-desc');

    if (specialBtn) {
      if (state.storedPowerUp) {
        specialBtn.classList.remove('disabled');
        specialBtn.classList.add('ready');
        specialBtn.style.setProperty('--powerup-glow', state.storedPowerUp.color || '#00ffff');
        if (specialIcon) specialIcon.textContent = state.storedPowerUp.icon || '✨';
        if (specialText) specialText.textContent = state.storedPowerUp.name || 'SPECIAL';
        if (specialDesc) specialDesc.textContent = '[USE (KEY R)]';
      } else {
        specialBtn.classList.add('disabled');
        specialBtn.classList.remove('ready');
        specialBtn.style.removeProperty('--powerup-glow');
        if (specialIcon) specialIcon.textContent = '✨';
        if (specialText) specialText.textContent = 'SPECIAL';
        if (specialDesc) specialDesc.textContent = '[EMPTY]';
      }
    }

    // 3D Target Lock-on Brackets Overlay
    const lockBox = document.getElementById('hud-missile-lock-box');
    const lockLabel = document.getElementById('hud-lock-label');
    if (lockBox && lockLabel) {
      const tgt = state.missileTarget;
      if (tgt && tgt.inFront && lockProgress > 0) {
        lockBox.style.display = 'block';
        lockBox.style.left = `${tgt.x}%`;
        lockBox.style.top = `${tgt.y}%`;

        if (isLocked) {
          lockBox.className = 'hud-missile-lock-box locked';
          lockLabel.textContent = `🎯 LOCKED [${tgt.dist}u]`;
        } else {
          lockBox.className = 'hud-missile-lock-box tracking';
          lockLabel.textContent = `TRACKING ${Math.round(lockProgress * 100)}% [${tgt.dist}u]`;
        }
      } else {
        lockBox.style.display = 'none';
      }
    }

    // Dynamic Ship Bore-Sight Reticle (Actual Hull Orientation vs Pilot POV)
    const boreEl = document.getElementById('hud-ship-boresight');
    const boreLabel = document.getElementById('hud-boresight-label');
    if (boreEl && state.shipBore) {
      const b = state.shipBore;
      boreEl.style.left = `${b.x}%`;
      boreEl.style.top = `${b.y}%`;
      if (b.edgeAngle !== undefined) {
        boreEl.style.setProperty('--edge-angle', `${b.edgeAngle}deg`);
      }

      if (b.isOffscreen) {
        boreEl.className = 'hud-ship-boresight offscreen';
        if (boreLabel) {
          const deg = Math.round((b.angleError || 0) * (180 / Math.PI));
          boreLabel.textContent = `${deg}°`;
        }
      } else {
        boreEl.className = 'hud-ship-boresight tracking';
        if (boreLabel) {
          const deg = Math.round((b.angleError || 0) * (180 / Math.PI));
          boreLabel.textContent = `${deg}°`;
        }
      }
    }

    // Cannon Bar (Compatibility)
    const cannonBar = document.getElementById('hud-cannon-bar');
    const cannonPct = document.getElementById('hud-cannon-pct');
    if (cannonBar) cannonBar.style.width = `${state.cannonEnergy || 0}%`;
    if (cannonPct) cannonPct.textContent = `${state.cannonEnergy || 0}%`;

    // Tactical Power-Up Badges
    const powerupBadge = document.getElementById('hud-powerup-badge');
    if (powerupBadge) {
      if (state.hasFireLaser) {
        powerupBadge.style.display = 'inline-flex';
        const remSec = Math.ceil(state.fireLaserTimer || 0);
        if (remSec > 0) {
          powerupBadge.textContent = `🔥 FIRE LASER (${remSec}s)`;
        } else {
          powerupBadge.textContent = '🔥 FIRE LASER [LOCKED TO ENEMY]';
        }
        powerupBadge.className = 'hud-powerup-badge fire-laser';
      } else if (state.isInvisible) {
        powerupBadge.style.display = 'inline-flex';
        powerupBadge.textContent = '👁️ CLOAKED';
        powerupBadge.className = 'hud-powerup-badge cloak';
      } else if (state.hasHologramDecoy) {
        powerupBadge.style.display = 'inline-flex';
        powerupBadge.textContent = '👥 DECOY ARMED';
        powerupBadge.className = 'hud-powerup-badge decoy';
      } else {
        powerupBadge.style.display = 'none';
      }
    }

    // Respawn Overlay
    const respawnOverlay = document.getElementById('hud-respawn-overlay');
    const respawnCounter = document.getElementById('hud-respawn-counter');
    if (respawnOverlay && respawnCounter) {
      if (state.isDead) {
        respawnOverlay.style.display = 'flex';
        respawnCounter.textContent = `Respawning in ${state.respawnCountdown}s...`;
      } else {
        respawnOverlay.style.display = 'none';
      }
    }

    // Room Master Real-Time Debug & Diagnostics Monitor (10Hz Throttled)
    const monitorEl = document.getElementById('hud-master-monitor');
    if (monitorEl) {
      const isMaster = !!state.isMaster;
      const showStats = state.showStats !== undefined
        ? !!state.showStats
        : (this.engine?.config?.showStats !== false);
      if (!isMaster || !showStats) {
        monitorEl.style.display = 'none';
      } else {
        monitorEl.style.display = 'block';
        if (!this.isMonitorMinimized) {
          const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
          if (now - this.lastMonitorUpdateTime >= this.monitorThrottleMs) {
            this.lastMonitorUpdateTime = now;
            this.updateMasterMonitor(state);
          }
        }
      }
    }
  }

  updateMasterMonitor(state) {
    // 1. FPS: >=50 (nominal), 30-49 (warning), <30 (alert)
    const fps = state.fps !== undefined ? state.fps : (state.telemetry?.fps ?? 60);
    const fpsBadge = document.getElementById('mon-fps-badge');
    if (fpsBadge) {
      fpsBadge.textContent = `${fps}`;
      fpsBadge.className = 'metric-badge ' + (fps >= 50 ? 'nominal' : (fps >= 30 ? 'warning' : 'alert'));
    }

    // 2. Frame Time: <=16.7ms (nominal), 16.8-33ms (warning), >33ms (alert)
    const frameTime = state.frameTime !== undefined ? state.frameTime : (state.telemetry?.frameTime ?? 16.6);
    const frameBadge = document.getElementById('mon-frame-badge');
    if (frameBadge) {
      frameBadge.textContent = `${frameTime}ms`;
      frameBadge.className = 'metric-badge ' + (frameTime <= 16.7 ? 'nominal' : (frameTime <= 33.0 ? 'warning' : 'alert'));
    }

    // 3. Draw Calls: <=100 (nominal), 101-250 (warning), >250 (alert)
    const calls = state.drawCalls !== undefined ? state.drawCalls : (state.telemetry?.drawCalls ?? 0);
    const callsBadge = document.getElementById('mon-calls-badge');
    if (callsBadge) {
      callsBadge.textContent = `${calls}`;
      callsBadge.className = 'metric-badge ' + (calls <= 100 ? 'nominal' : (calls <= 250 ? 'warning' : 'alert'));
    }

    // 4. Triangles: <=250k (nominal), 250k-500k (warning), >500k (alert)
    const tris = state.triangles !== undefined ? state.triangles : (state.telemetry?.triangles ?? 0);
    const trisBadge = document.getElementById('mon-tris-badge');
    if (trisBadge) {
      const trisStr = tris >= 1000 ? `${Math.round(tris / 1000)}k` : `${tris}`;
      trisBadge.textContent = trisStr;
      trisBadge.className = 'metric-badge ' + (tris <= 250000 ? 'nominal' : (tris <= 500000 ? 'warning' : 'alert'));
    }

    // 5. Memory: <=150MB (nominal), 151-300MB (warning), >300MB (alert), or 'N/A' (nominal)
    const mem = state.memory !== undefined ? state.memory : state.telemetry?.memory;
    const memBadge = document.getElementById('mon-mem-badge');
    if (memBadge) {
      if (mem === null || mem === undefined) {
        memBadge.textContent = 'N/A';
        memBadge.className = 'metric-badge nominal';
      } else {
        memBadge.textContent = `${mem}MB`;
        memBadge.className = 'metric-badge ' + (mem <= 150 ? 'nominal' : (mem <= 300 ? 'warning' : 'alert'));
      }
    }

    // 6. Latency / Ping: <=60ms (nominal), 61-120ms (warning), >120ms (alert)
    const ping = state.avgPing !== undefined ? state.avgPing : (state.telemetry?.ping ?? 0);
    const pingBadge = document.getElementById('mon-ping-badge');
    if (pingBadge) {
      pingBadge.textContent = `${ping}ms`;
      pingBadge.className = 'metric-badge ' + (ping <= 60 ? 'nominal' : (ping <= 120 ? 'warning' : 'alert'));
    }

    // 7. Mega Proximity: >3000u Safe Orbit (nominal), 2800-3000u Surface (warning), <2800u Cavern (cyan)
    const megaDist = state.megaDistance !== undefined ? state.megaDistance : (state.telemetry?.megaDistance ?? 3200);
    const megaBadge = document.getElementById('mon-mega-badge');
    if (megaBadge) {
      if (megaDist > 3000) {
        megaBadge.textContent = `${megaDist}u Orbit`;
        megaBadge.className = 'metric-badge nominal';
      } else if (megaDist >= 2800) {
        megaBadge.textContent = `${megaDist}u Surface`;
        megaBadge.className = 'metric-badge warning';
      } else {
        megaBadge.textContent = `${megaDist}u Cavern`;
        megaBadge.className = 'metric-badge cavern';
      }
    }

    // 8. Speed: <=100u/s (nominal), >100u/s (warning)
    const speed = state.speed !== undefined ? state.speed : (state.telemetry?.speed ?? 0);
    const speedBadge = document.getElementById('mon-speed-badge');
    if (speedBadge) {
      speedBadge.textContent = `${speed}u/s`;
      speedBadge.className = 'metric-badge ' + (speed <= 100 ? 'nominal' : 'warning');
    }

    // 9. Update Targeting System
    const dt = state.frameTime !== undefined ? (state.frameTime / 1000) : 0.016;
    this.updateTargetingSystem();

    // 10. Update 2D Tactical Radar (Refreshes every 3 seconds)
    this.updateRadar(dt);
  }

  updateTargetingSystem() {
    const container = document.getElementById('hud-targeting-container');
    if (!container || !this.engine) return;

    const playerShip = this.engine.playerShip;
    const remoteShips = this.engine.remoteShips;
    const camera = this.engine.camera;
    const spaceEnv = this.engine.spaceEnv;

    if (!playerShip || !camera || !remoteShips) {
      container.innerHTML = '';
      return;
    }

    const vpWidth = window.innerWidth || (document.documentElement ? document.documentElement.clientWidth : 800);
    const vpHeight = window.innerHeight || (document.documentElement ? document.documentElement.clientHeight : 600);

    let html = '';

    for (const [peerId, remote] of remoteShips.entries()) {
      if (!remote || remote.isDead || remote.isInvisible) continue;

      // Project remote ship position to NDC screen coordinates
      const pos = remote.position.clone();
      const screenPos = pos.clone().project(camera);

      // Check if behind camera or outside screen margins
      if (screenPos.z >= 1.0 || Math.abs(screenPos.x) > 1.2 || Math.abs(screenPos.y) > 1.2) {
        continue;
      }

      // Check Line of Sight against obstacles / asteroids
      let isBlocked = false;
      if (spaceEnv && typeof spaceEnv.checkRayBlocked === 'function') {
        isBlocked = spaceEnv.checkRayBlocked(playerShip.position, remote.position);
      }
      if (isBlocked) {
        continue;
      }

      // Convert NDC (-1 to +1) to pixel screen coordinates
      const screenX = (screenPos.x * 0.5 + 0.5) * vpWidth;
      const screenY = (-(screenPos.y * 0.5) + 0.5) * vpHeight;

      // Distance-scaled bracket dimensions (e.g. 38px to 100px based on distance)
      const dist = Math.max(1.0, playerShip.position.distanceTo(remote.position));
      const boxSize = Math.max(38, Math.min(100, Math.round(1400 / dist)));

      const shieldVal = remote.shield !== undefined ? remote.shield : 100;
      const maxShieldVal = remote.maxShield !== undefined ? remote.maxShield : 100;
      const shieldPct = Math.max(0, Math.min(100, (shieldVal / maxShieldVal) * 100));

      const hpVal = remote.hp !== undefined ? remote.hp : 100;
      const maxHpVal = remote.maxHp !== undefined ? remote.maxHp : 100;
      const hpPct = Math.max(0, Math.min(100, (hpVal / maxHpVal) * 100));

      const pilotName = remote.playerName || 'Pilot';

      const leftPx = Math.round(screenX - boxSize / 2);
      const topPx = Math.round(screenY - boxSize / 2);

      html += `
        <div class="hud-target-box" id="hud-target-${peerId}" style="left: ${leftPx}px; top: ${topPx}px; width: ${boxSize}px; height: ${boxSize}px;">
          <div class="target-bars-wrapper">
            <div class="target-bar target-bar-shield"><div class="target-shield-fill" style="width: ${shieldPct.toFixed(1)}%;"></div></div>
            <div class="target-bar target-bar-hp"><div class="target-hp-fill" style="width: ${hpPct.toFixed(1)}%;"></div></div>
          </div>
          <div class="target-bracket tl"></div>
          <div class="target-bracket tr"></div>
          <div class="target-bracket bl"></div>
          <div class="target-bracket br"></div>
          <div class="target-pilot-name">${pilotName}</div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  updateRadar(dt = 0.016) {
    if (!this.engine || !this.engine.playerShip) return;
    const playerShip = this.engine.playerShip;
    const remoteShips = this.engine.remoteShips;
    const camera = this.engine.camera;
    const blipsContainer = document.getElementById('hud-radar-blips');
    const cadenceEl = document.getElementById('hud-radar-cadence');
    if (!blipsContainer) return;

    this.radarRefreshTimer = (this.radarRefreshTimer || 0) + dt;
    const remaining = Math.max(0, 3.0 - (this.radarRefreshTimer % 3.0));
    if (cadenceEl) {
      cadenceEl.textContent = `${remaining.toFixed(1)}s`;
    }

    if (this.radarRefreshTimer >= 3.0) {
      this.radarRefreshTimer = 0.0;
      // Refresh radar blips!
      const quat = camera ? camera.quaternion : playerShip.quaternion;
      const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(quat);
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(quat);
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(quat);
      const playerPos = playerShip.position;

      const radarRadiusPx = 48;
      const radarCenterX = 55;
      const radarCenterY = 55;
      const maxWorldRange = 4500.0; // Standoff detection range

      let html = '';
      if (remoteShips && remoteShips.size > 0) {
        for (const [peerId, remote] of remoteShips.entries()) {
          if (!remote || remote.isDead || remote.isInvisible) continue;

          const rel = remote.position.clone().sub(playerPos);
          const x = rel.dot(right);
          const y = rel.dot(fwd);
          const z = rel.dot(up);

          const horizDist = Math.sqrt(x * x + y * y);
          const normDist = Math.min(1.0, horizDist / maxWorldRange);

          // Elevation angle in degrees relative to the pilot's viewpoint plane
          const elevationDeg = Math.round(Math.atan2(z, Math.max(1.0, horizDist)) * (180 / Math.PI));

          // Angle on radar 2D plane (forward is up: -Y screen axis, right is +X)
          let px = radarCenterX;
          let py = radarCenterY;
          if (horizDist > 0.001) {
            px = radarCenterX + (x / horizDist) * (normDist * radarRadiusPx);
            py = radarCenterY - (y / horizDist) * (normDist * radarRadiusPx);
          }

          let indicatorSymbol = '●';
          let indicatorClass = 'level';
          let angleText = '0°';
          if (elevationDeg >= 3) {
            indicatorSymbol = '▲';
            indicatorClass = 'up';
            angleText = `+${elevationDeg}°`;
          } else if (elevationDeg <= -3) {
            indicatorSymbol = '▼';
            indicatorClass = 'down';
            angleText = `${elevationDeg}°`;
          }

          html += `
            <div class="hud-radar-blip ${indicatorClass}" style="left: ${px.toFixed(1)}px; top: ${py.toFixed(1)}px;" title="Enemy Ship: ${elevationDeg}°">
              <span class="blip-arrow">${indicatorSymbol}</span>
              <span class="blip-angle">${angleText}</span>
            </div>
          `;
        }
      }
      blipsContainer.innerHTML = html;
    }
  }

  destroy() {
    if (this._windowListeners && typeof window !== 'undefined') {
      for (const { type, handler, options } of this._windowListeners) {
        window.removeEventListener(type, handler, options);
      }
      this._windowListeners = [];
    }
    if (this._documentListeners && typeof document !== 'undefined') {
      for (const { type, handler, options } of this._documentListeners) {
        document.removeEventListener(type, handler, options);
      }
      this._documentListeners = [];
    }
    if (this.hudElement && this.hudElement.parentNode) {
      this.hudElement.parentNode.removeChild(this.hudElement);
    }
  }
}
