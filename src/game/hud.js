import { logger } from '../utils/logger.js';
import { audio } from './audio.js';

export class GameHUD {
  constructor(container, engine) {
    this.container = container;
    this.engine = engine;
    this.hudElement = null;

    this.createDom();
    this.bindJoystick();
    this.bindTouchControls();
    this.bindFullscreen();
    this.bindDiagnostics();

    // Initialize room title immediately
    const roomTitle = document.getElementById('hud-room-title');
    if (roomTitle && this.engine && this.engine.network) {
      roomTitle.textContent = this.engine.network.roomName || this.engine.network.roomId || 'Orion Sector';
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
          </div>
        </div>

        <div class="hud-top-center">
          <div class="hud-header-scoreboard" id="hud-header-scoreboard">
            <span>⏳ <strong id="hud-timer-val">10:00</strong></span>
            <span>🌀 SAFE: <strong id="hud-safe-val">1100u</strong></span>
            <span>👥 <strong id="hud-alive-val">1</strong> Alive</span>
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
              <span class="meter-label">LASER [SHIELD]</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-laser" id="hud-laser-bar" style="width: 100%;"></div>
              </div>
              <span class="meter-val" id="hud-laser-pct">100%</span>
            </div>

            <div class="hud-compact-meter meter-cannon">
              <span class="meter-label">CANNON [HULL/DIG]</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-cannon" id="hud-cannon-bar" style="width: 100%;"></div>
              </div>
              <span class="meter-val" id="hud-cannon-pct">100%</span>
            </div>

            <div class="hud-powerup-badge" id="hud-powerup-badge" style="display: none;"></div>

            <div class="hud-beacon-pill" id="hud-beacon-pill" style="display: none;">
              📡 BEACON ACTIVE
            </div>
          </div>
        </div>

        <div class="hud-top-right">
          <div class="hud-stat-pill" id="hud-peers-count">👥 1</div>
          <div class="hud-stat-pill" id="hud-ping-val">📡 0ms</div>
          <button class="hud-btn-diag" id="hud-btn-diag" title="Client Diagnostics & Telemetry Logs">🐞 Logs</button>
          <button class="hud-btn-fullscreen" id="hud-btn-fullscreen" title="Toggle Fullscreen">⛶</button>
          <button class="hud-btn-leave" id="hud-btn-leave" title="Leave Match">✕</button>
        </div>
      </div>

      <!-- Center Reticle & Alerts -->
      <div class="hud-center-crosshair">
        <div class="crosshair-ring"></div>
        <div class="crosshair-dot"></div>
      </div>

      <div class="hud-combat-feed" id="hud-combat-feed"></div>
      <div class="hud-victory-banner" id="hud-victory-banner" style="display: none;">
        🏆 VICTORY ROYALE: LAST PILOT ALIVE!
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

          <!-- Dual Forward Arsenals -->
          <div class="touch-weapon-cluster">
            <button class="action-touch-btn btn-laser" id="btn-laser" title="Hold to Fire Laser Beam / Hologram Decoy (Space / LMB)">
              ⚡ <strong>LASER</strong>
              <small class="weapon-subtext">[SHIELD]</small>
            </button>
            <button class="action-touch-btn btn-cannon" id="btn-cannon" title="Hold to Fire Kinetic Cannon / Dig Asteroids (F / RMB)">
              🔥 <strong>CANNON</strong>
              <small class="weapon-subtext">[HULL/DIG]</small>
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

    // Dual Forward Weapons
    setupHoldButton('btn-laser', () => this.engine.isFiringLaser = true, () => this.engine.isFiringLaser = false);
    setupHoldButton('btn-cannon', () => this.engine.isFiringCannon = true, () => this.engine.isFiringCannon = false);

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

    // Battle Royale Match Timer & Safe Zone
    const timerVal = document.getElementById('hud-timer-val');
    if (timerVal && state.matchTimeRemaining !== undefined) {
      const mins = Math.floor(state.matchTimeRemaining / 60);
      const secs = state.matchTimeRemaining % 60;
      timerVal.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    const safeVal = document.getElementById('hud-safe-val');
    if (safeVal && state.safeRadius !== undefined) {
      safeVal.textContent = `${state.safeRadius}u`;
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

    // Laser Bar
    const laserBar = document.getElementById('hud-laser-bar');
    const laserPct = document.getElementById('hud-laser-pct');
    if (laserBar) laserBar.style.width = `${state.laserEnergy || 0}%`;
    if (laserPct) laserPct.textContent = `${state.laserEnergy || 0}%`;

    // Cannon Bar
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

    // Victory Royale Banner
    const victoryBanner = document.getElementById('hud-victory-banner');
    if (victoryBanner) {
      victoryBanner.style.display = state.isVictoryRoyale ? 'block' : 'none';
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
  }

  destroy() {
    if (this.hudElement && this.hudElement.parentNode) {
      this.hudElement.parentNode.removeChild(this.hudElement);
    }
  }
}
