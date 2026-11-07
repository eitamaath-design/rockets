export class GameHUD {
  constructor(container, engine) {
    this.container = container;
    this.engine = engine;
    this.hudElement = null;

    this.createDom();
    this.bindTouchControls();
    this.bindFullscreen();

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
        <span>🔄 Rotate phone to landscape for optimal flight controls</span>
        <button class="hud-btn-mini-fullscreen" id="btn-rotate-fullscreen">⛶ Fullscreen</button>
      </div>

      <!-- Top Status Bar -->
      <div class="hud-top-bar">
        <div class="hud-top-left">
          <div class="hud-room-info">
            <span class="hud-room-title" id="hud-room-title">Orion Sector</span>
            <button class="hud-btn-copy" id="hud-btn-copy" title="Copy Shareable Link">📋 Invite</button>
          </div>
        </div>

        <div class="hud-top-center">
          <div class="hud-master-badge" id="hud-master-badge">
            <span class="badge-icon">👑</span>
            <span class="badge-text" id="hud-master-text">Determining Master...</span>
          </div>

          <!-- Compact Header Scoreboard -->
          <div class="hud-header-scoreboard" id="hud-header-scoreboard">
            <span>SCR: <strong id="hud-score-val">0</strong></span>
            <span>K: <strong id="hud-kills-val">0</strong></span>
            <span>D: <strong id="hud-deaths-val">0</strong></span>
            <span>SPD: <strong id="hud-speed-val">0</strong></span>
          </div>
        </div>

        <div class="hud-top-right">
          <div class="hud-stat-pill" id="hud-peers-count">👥 1</div>
          <div class="hud-stat-pill" id="hud-ping-val">📡 0ms</div>
          <button class="hud-btn-fullscreen" id="hud-btn-fullscreen" title="Toggle Fullscreen">⛶ Fullscreen</button>
          <button class="hud-btn-leave" id="hud-btn-leave" title="Leave Match">✕</button>
        </div>
      </div>

      <!-- Floating Compact Gauges (Mobile/Tablet Friendly) -->
      <div class="hud-gauges-floating">
        <!-- Shield & Hull Float (Top Left) -->
        <div class="hud-gauge-pill gauge-shield-pill">
          <div class="gauge-pill-header">
            <span>SHIELDS & HULL</span>
            <span id="hud-hp-num">100%</span>
          </div>
          <div class="gauge-pill-track">
            <div class="gauge-bar-fill bar-hp" id="hud-hp-bar" style="width: 100%;"></div>
          </div>
          <div class="gauge-pill-sub" id="hud-shield-status">ACTIVE</div>
        </div>

        <!-- Cannon & Mine Float (Top Right) -->
        <div class="hud-gauge-pill gauge-weapons-pill">
          <div class="gauge-pill-header">
            <span>CANNON</span>
            <span id="hud-cannon-pct">100%</span>
          </div>
          <div class="gauge-pill-track">
            <div class="gauge-bar-fill bar-cannon" id="hud-cannon-bar" style="width: 100%;"></div>
          </div>
          <div class="weapons-pill-sub">
            <span id="hud-cannon-status">READY</span>
            <div class="mine-mini-row">
              <span class="mine-mini-title">MINES:</span>
              <div class="mine-dot" id="mine-dot-1">💣</div>
              <div class="mine-dot" id="mine-dot-2">💣</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Center Reticle & Alerts -->
      <div class="hud-center-crosshair">
        <div class="crosshair-ring"></div>
        <div class="crosshair-dot"></div>
      </div>

      <div class="hud-combat-feed" id="hud-combat-feed"></div>
      <div class="hud-respawn-overlay" id="hud-respawn-overlay" style="display: none;">
        <div class="respawn-title">SHIP DESTROYED</div>
        <div class="respawn-counter" id="hud-respawn-counter">Respawning in 3...</div>
      </div>

      <!-- On-Screen Responsive Controls (Anchored cleanly to bottom corners) -->
      <div class="hud-touch-controls">
        <!-- Left Corner: Flight D-Pad & Roll Controls -->
        <div class="touch-controls-left">
          <div class="touch-dpad-cluster">
            <div class="dpad-btn dpad-up" id="btn-pitch-up" title="Pitch Up">▲</div>
            <div class="dpad-btn dpad-left" id="btn-yaw-left" title="Pan Left">◀</div>
            <div class="dpad-center-label">D-PAD</div>
            <div class="dpad-btn dpad-right" id="btn-yaw-right" title="Pan Right">▶</div>
            <div class="dpad-btn dpad-down" id="btn-pitch-down" title="Pitch Down">▼</div>
          </div>
          <div class="touch-roll-cluster">
            <button class="action-touch-btn btn-roll" id="btn-roll-left" title="Roll Left (Q)">↺ Roll L</button>
            <button class="action-touch-btn btn-roll" id="btn-roll-right" title="Roll Right (E)">Roll R ↻</button>
          </div>
        </div>

        <!-- Right Corner: Strafing, Thrusters & Weapons -->
        <div class="touch-controls-right">
          <!-- Side Thrusters (Strafing) -->
          <div class="touch-strafe-cluster">
            <button class="action-touch-btn btn-strafe" id="btn-strafe-left" title="Strafe Left (A)">⬅ Strafe L</button>
            <button class="action-touch-btn btn-strafe" id="btn-strafe-right" title="Strafe Right (D)">Strafe R ➡</button>
          </div>

          <!-- Main Thrusters -->
          <div class="touch-thrust-cluster">
            <button class="action-touch-btn btn-thrust" id="btn-thrust" title="Hold to Thrust (W)">🚀 <strong>THRUST</strong></button>
            <button class="action-touch-btn btn-brake" id="btn-brake" title="Hold to Brake (S)">🛑 <strong>BRAKE</strong></button>
          </div>

          <!-- Combat Weapons -->
          <div class="touch-weapon-cluster">
            <button class="action-touch-btn btn-cannon" id="btn-cannon" title="Hold to Fire Cannon (Space)">⚡ <strong>CANNON</strong></button>
            <button class="action-touch-btn btn-mine" id="btn-mine" title="Tap to Drop Rear Mine (F)">💣 <strong>MINE</strong></button>
          </div>
        </div>
      </div>
    `;

    this.container.appendChild(this.hudElement);
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

    // Update button text on fullscreen change
    const updateFsBtnText = () => {
      const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      if (fsBtn) fsBtn.textContent = isFs ? '⛶ Exit' : '⛶ Fullscreen';
    };
    document.addEventListener('fullscreenchange', updateFsBtnText);
    document.addEventListener('webkitfullscreenchange', updateFsBtnText);
  }

  bindTouchControls() {
    const shipInput = this.engine.playerShip.input;

    const setupHoldButton = (elementId, onActive, onInactive) => {
      const el = document.getElementById(elementId);
      if (!el) return;

      const start = (e) => {
        e.preventDefault();
        onActive();
        el.classList.add('active');
      };

      const stop = (e) => {
        e.preventDefault();
        onInactive();
        el.classList.remove('active');
      };

      el.addEventListener('pointerdown', start);
      el.addEventListener('pointerup', stop);
      el.addEventListener('pointercancel', stop);
      el.addEventListener('pointerleave', stop);
    };

    // D-Pad buttons
    setupHoldButton('btn-pitch-up', () => shipInput.pitchUp = true, () => shipInput.pitchUp = false);
    setupHoldButton('btn-pitch-down', () => shipInput.pitchDown = true, () => shipInput.pitchDown = false);
    setupHoldButton('btn-yaw-left', () => shipInput.yawLeft = true, () => shipInput.yawLeft = false);
    setupHoldButton('btn-yaw-right', () => shipInput.yawRight = true, () => shipInput.yawRight = false);

    // Roll
    setupHoldButton('btn-roll-left', () => shipInput.rollLeft = true, () => shipInput.rollLeft = false);
    setupHoldButton('btn-roll-right', () => shipInput.rollRight = true, () => shipInput.rollRight = false);

    // Strafing
    setupHoldButton('btn-strafe-left', () => shipInput.strafeLeft = true, () => shipInput.strafeLeft = false);
    setupHoldButton('btn-strafe-right', () => shipInput.strafeRight = true, () => shipInput.strafeRight = false);

    // Thrust & Brake
    setupHoldButton('btn-thrust', () => shipInput.thrust = true, () => shipInput.thrust = false);
    setupHoldButton('btn-brake', () => shipInput.brake = true, () => shipInput.brake = false);

    // Weapons
    setupHoldButton('btn-cannon', () => this.engine.isFiringCannon = true, () => this.engine.isFiringCannon = false);

    const mineBtn = document.getElementById('btn-mine');
    if (mineBtn) {
      mineBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.engine.weaponsSystem.triggerRearMine(this.engine.playerShip);
        mineBtn.classList.add('active');
        setTimeout(() => mineBtn.classList.remove('active'), 150);
      });
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

    // Master session status badge
    const masterBadge = document.getElementById('hud-master-badge');
    const masterText = document.getElementById('hud-master-text');
    if (masterText && masterBadge) {
      if (state.isMaster) {
        masterBadge.className = 'hud-master-badge master-active';
        masterText.innerHTML = `👑 <strong>MASTER</strong> (TTL Active)`;
      } else {
        masterBadge.className = 'hud-master-badge master-peer';
        const hostTag = state.masterId ? state.masterId.slice(0, 4) : 'Host';
        masterText.innerHTML = `⚡ Mesh (Host: ${hostTag})`;
      }
    }

    // Network stats
    const peersEl = document.getElementById('hud-peers-count');
    if (peersEl) peersEl.textContent = `👥 ${state.activePeersCount}`;

    const pingEl = document.getElementById('hud-ping-val');
    if (pingEl) pingEl.textContent = `📡 ${state.avgPing}ms`;

    // Health Bar
    const hpBar = document.getElementById('hud-hp-bar');
    const hpNum = document.getElementById('hud-hp-num');
    const hpPct = Math.round((state.hp / state.maxHp) * 100);
    if (hpBar) {
      hpBar.style.width = `${hpPct}%`;
      hpBar.className = hpPct > 35 ? 'gauge-bar-fill bar-hp' : 'gauge-bar-fill bar-hp bar-hp-critical';
    }
    if (hpNum) hpNum.textContent = `${hpPct}%`;

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

    // Cannon Ammo
    const cannonBar = document.getElementById('hud-cannon-bar');
    const cannonPct = document.getElementById('hud-cannon-pct');
    const cannonStatus = document.getElementById('hud-cannon-status');
    if (cannonBar) cannonBar.style.width = `${state.cannonEnergy}%`;
    if (cannonPct) cannonPct.textContent = `${state.cannonEnergy}%`;
    if (cannonStatus) {
      if (state.cannonRecharging) {
        cannonStatus.textContent = 'RECHARGING...';
        cannonStatus.style.color = '#00ffff';
      } else if (state.cannonEnergy < 15) {
        cannonStatus.textContent = 'COOLDOWN';
        cannonStatus.style.color = '#ffaa00';
      } else {
        cannonStatus.textContent = 'READY';
        cannonStatus.style.color = '#88aacc';
      }
    }

    // Mine Charges
    const dot1 = document.getElementById('mine-dot-1');
    const dot2 = document.getElementById('mine-dot-2');
    if (dot1) dot1.className = state.mineCharges >= 1 ? 'mine-dot active' : 'mine-dot empty';
    if (dot2) dot2.className = state.mineCharges >= 2 ? 'mine-dot active' : 'mine-dot empty';

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
