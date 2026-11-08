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

    this.createDom();
    this.bindJoystick();
    this.bindTouchControls();
    this.bindFullscreen();
    this.bindDiagnostics();
    this.bindMapResetVoting();

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
      configPill.textContent = `VOX: ${q} (${res}) | BELT: ${belt} | METEOR: ${meteor}`;
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
              <span class="meter-label">LASER [SHIELD/DIG]</span>
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
        <div class="master-monitor-header">
          <span class="master-pulse-dot">●</span>
          <span class="master-monitor-title">ROOM MASTER DIAGNOSTICS</span>
          <span class="master-monitor-freq">10Hz</span>
        </div>
        <div class="master-monitor-grid">
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

      <!-- 3D Target Lock Brackets -->
      <div class="hud-missile-lock-box" id="hud-missile-lock-box" style="display: none;">
        <div class="lock-bracket tl"></div>
        <div class="lock-bracket tr"></div>
        <div class="lock-bracket bl"></div>
        <div class="lock-bracket br"></div>
        <span class="lock-label" id="hud-lock-label">TRACKING 0%</span>
      </div>

      <div class="hud-combat-feed" id="hud-combat-feed"></div>

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
            <button class="action-touch-btn btn-roll" id="btn-roll-left" title="Roll Left (Q)">↺ Roll L</button>
            <button class="action-touch-btn btn-roll" id="btn-roll-right" title="Roll Right (E)">Roll R ↻</button>
          </div>
        </div>

        <!-- Right: Side Strafing, Main Thrusters & Weapons -->
        <div class="touch-controls-right">
          <!-- Side Thrusters (Strafing) -->
          <div class="touch-strafe-cluster">
            <button class="action-touch-btn btn-strafe" id="btn-strafe-left" title="Strafe Left Side Thruster (A)">⬅ Strafe L</button>
            <button class="action-touch-btn btn-strafe" id="btn-strafe-right" title="Strafe Right Side Thruster (D)">Strafe R ➡</button>
          </div>

          <!-- Main Thrusters -->
          <div class="touch-thrust-cluster">
            <button class="action-touch-btn btn-thrust" id="btn-thrust" title="Hold to Thrust (W) | Double-Tap to BOOST">
              🚀 <strong>THRUST</strong>
              <span class="hud-boost-badge" id="hud-boost-badge">⚡ BOOST</span>
            </button>
            <button class="action-touch-btn btn-brake" id="btn-brake" title="Hold to Slow Down / Stop in 0.67s (S)">🛑 <strong>BRAKE</strong></button>
          </div>

          <!-- Dual Forward Arsenals & Dedicated Special Powerup -->
          <div class="touch-weapon-cluster">
            <button class="action-touch-btn btn-laser" id="btn-laser" title="Hold to Fire Laser Beam & Dig Asteroids (Space / LMB)">
              ⚡ <strong>LASER</strong>
              <small class="weapon-subtext">[SHIELD/DIG]</small>
            </button>
            <button class="action-touch-btn btn-missile" id="btn-missile" title="Homing Missile (F / RMB) - Aim at target for 3s to lock">
              <span id="btn-missile-icon">🚀</span> <strong id="btn-missile-text">MISSILE</strong>
              <small class="weapon-subtext" id="btn-missile-status">[AIM TO LOCK]</small>
            </button>
            <button class="action-touch-btn btn-special disabled" id="btn-special" title="Activate Special Power-Up (Key R)">
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

    const handleCoord = (clientX, clientY) => {
      const rect = base.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = clientX - centerX;
      let dy = clientY - centerY;
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

    const resetKnob = () => {
      activeTouchId = null;
      pointerDragging = false;
      knob.style.transform = `translate(0px, 0px)`;
      shipInput.analogPitch = 0;
      shipInput.analogYaw = 0;
    };

    // 1. Direct Touch Events (iOS & Android)
    container.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (activeTouchId === null && e.touches.length > 0) {
        const touch = e.touches[0];
        activeTouchId = touch.identifier;
        handleCoord(touch.clientX, touch.clientY);
        logger.log('TOUCH', `Joystick touchstart at (${Math.round(touch.clientX)}, ${Math.round(touch.clientY)})`);
      }
    }, { passive: false });

    container.addEventListener('touchmove', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (activeTouchId !== null) {
        for (let i = 0; i < e.touches.length; i++) {
          if (e.touches[i].identifier === activeTouchId) {
            handleCoord(e.touches[i].clientX, e.touches[i].clientY);
            break;
          }
        }
      }
    }, { passive: false });

    container.addEventListener('touchend', (e) => {
      e.preventDefault();
      resetKnob();
    }, { passive: false });

    container.addEventListener('touchcancel', (e) => {
      resetKnob();
    }, { passive: false });

    // 2. Pointer / Mouse Events (Desktop)
    container.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      e.preventDefault();
      pointerDragging = true;
      handleCoord(e.clientX, e.clientY);
    });

    window.addEventListener('pointermove', (e) => {
      if (pointerDragging) {
        handleCoord(e.clientX, e.clientY);
      }
    });

    window.addEventListener('pointerup', () => {
      if (pointerDragging) {
        resetKnob();
      }
    });
  }

  bindTouchControls() {
    const shipInput = this.engine.playerShip.input;

    const setupHoldButton = (elementId, onActive, onInactive) => {
      const el = document.getElementById(elementId);
      if (!el) return;

      let isHeld = false;

      const triggerStart = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (isHeld) return;
        isHeld = true;
        onActive();
        el.classList.add('active');
        logger.log('INPUT', `Button [${elementId}] ACTIVATED`);
      };

      const triggerStop = (e) => {
        if (!isHeld) return;
        isHeld = false;
        onInactive();
        el.classList.remove('active');
        logger.log('INPUT', `Button [${elementId}] RELEASED`);
      };

      // Native Touch Handlers
      el.addEventListener('touchstart', triggerStart, { passive: false });
      el.addEventListener('touchend', triggerStop, { passive: false });
      el.addEventListener('touchcancel', triggerStop, { passive: false });

      // Pointer / Mouse Handlers
      el.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch') return;
        triggerStart(e);
      });
      el.addEventListener('pointerup', triggerStop);
      el.addEventListener('pointerleave', triggerStop);
      window.addEventListener('pointerup', triggerStop);
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
      this.engine.triggerBoostAction();
      shipInput.thrust = true;
    }, () => shipInput.thrust = false);
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

    const toggleFs = () => {
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
        } catch (e) {}
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    };

    if (fsBtn) fsBtn.addEventListener('click', toggleFs);
    if (rotateFsBtn) rotateFsBtn.addEventListener('click', toggleFs);

    const updateFsBtnText = () => {
      const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      if (fsBtn) fsBtn.textContent = isFs ? '⛶ Exit' : '⛶ Fullscreen';
    };
    document.addEventListener('fullscreenchange', updateFsBtnText);
    document.addEventListener('webkitfullscreenchange', updateFsBtnText);
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

    window.addEventListener('keydown', (e) => {
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
      configPill.textContent = `VOX: ${q} (${res}) | BELT: ${belt} | METEOR: ${meteor}`;
    }

    // Shield Bar (recharges over 15s)
    const shieldBar = document.getElementById('hud-shield-bar');
    const shieldNum = document.getElementById('hud-shield-num');
    const shieldPct = Math.round(((state.shield !== undefined ? state.shield : 100) / (state.maxShield || 100)) * 100);
    if (shieldBar) {
      shieldBar.style.width = `${shieldPct}%`;
    }
    if (shieldNum) shieldNum.textContent = `${shieldPct}%`;

    // Health Bar
    const hpBar = document.getElementById('hud-hp-bar');
    const hpNum = document.getElementById('hud-hp-num');
    const hpPct = Math.round((state.hp / state.maxHp) * 100);
    if (hpBar) {
      hpBar.style.width = `${hpPct}%`;
      hpBar.className = hpPct > 35 ? 'gauge-bar-fill bar-hp' : 'gauge-bar-fill bar-hp bar-hp-critical';
    }
    if (hpNum) hpNum.textContent = `${hpPct}%`;

    // 30s Inactivity Beacon Indicator
    const beaconPill = document.getElementById('hud-beacon-pill');
    if (beaconPill) {
      beaconPill.style.display = state.inactivityBeacon ? 'inline-flex' : 'none';
    }

    const shieldStatus = document.getElementById('hud-shield-status');
    if (shieldStatus) {
      if (state.invulnerable) {
        shieldStatus.textContent = '🛡️ INVULNERABLE';
        shieldStatus.style.color = '#00ffff';
      } else if (state.hp <= 35) {
        shieldStatus.textContent = 'CRITICAL';
        shieldStatus.style.color = '#ff3344';
      } else {
        shieldStatus.textContent = 'ACTIVE';
        shieldStatus.style.color = '#00ff88';
      }
    }

    // Scoreboard
    const scoreVal = document.getElementById('hud-score-val');
    if (scoreVal) scoreVal.textContent = state.score;

    const killsVal = document.getElementById('hud-kills-val');
    if (killsVal) killsVal.textContent = state.kills;

    const deathsVal = document.getElementById('hud-deaths-val');
    if (deathsVal) deathsVal.textContent = state.deaths;

    // Speedometer
    const speedVal = document.getElementById('hud-speed-val');
    if (speedVal) speedVal.textContent = state.speed;

    // Boost Badge (Double-tap thrust evasive boost)
    const boostBadge = document.getElementById('hud-boost-badge');
    const thrustBtn = document.getElementById('btn-thrust');
    if (boostBadge) {
      if (state.boostReady) {
        boostBadge.textContent = '⚡ BOOST';
        boostBadge.className = 'hud-boost-badge ready';
        if (thrustBtn) thrustBtn.classList.add('boost-ready');
      } else {
        boostBadge.textContent = `${state.boostCooldown}s`;
        boostBadge.className = 'hud-boost-badge cooling';
        if (thrustBtn) thrustBtn.classList.remove('boost-ready');
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

    // Laser Energy Bar (Smooth rendering)
    const laserBar = document.getElementById('hud-laser-bar');
    const laserPct = document.getElementById('hud-laser-pct');
    const laserEnergyPct = Math.max(0, Math.min(100, Math.round(state.laserEnergy !== undefined ? state.laserEnergy : 100)));
    if (laserBar) laserBar.style.width = `${laserEnergyPct}%`;
    if (laserPct) laserPct.textContent = `${laserEnergyPct}%`;

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

    // Cannon Bar (Compatibility)
    const cannonBar = document.getElementById('hud-cannon-bar');
    const cannonPct = document.getElementById('hud-cannon-pct');
    if (cannonBar) cannonBar.style.width = `${state.cannonEnergy || 0}%`;
    if (cannonPct) cannonPct.textContent = `${state.cannonEnergy || 0}%`;

    // Tactical Power-Up Badges
    const powerupBadge = document.getElementById('hud-powerup-badge');
    if (powerupBadge) {
      if (state.isInvisible) {
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
      if (!isMaster) {
        monitorEl.style.display = 'none';
      } else {
        monitorEl.style.display = 'block';
        const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
        if (now - this.lastMonitorUpdateTime >= this.monitorThrottleMs) {
          this.lastMonitorUpdateTime = now;
          this.updateMasterMonitor(state);
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
  }

  destroy() {
    if (this.hudElement && this.hudElement.parentNode) {
      this.hudElement.parentNode.removeChild(this.hudElement);
    }
  }
}
