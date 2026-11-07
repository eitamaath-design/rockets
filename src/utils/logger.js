/**
 * Client-Side Diagnostic & Telemetry Logger
 * Captures real-time engine metrics, WebGL capabilities, console logs, and uncaught errors
 * for 1-click clipboard export.
 */
class DiagnosticLogger {
  constructor() {
    this.logs = [];
    this.maxLogs = 250;
    this.engineRef = null;
    this.startTime = Date.now();
    this.webglInfo = null;
    this.lastFps = 0;
    this.frameCount = 0;
    this.fpsTimer = performance.now();

    this.interceptConsole();
    this.listenToErrors();
  }

  setEngine(engine) {
    this.engineRef = engine;
    if (engine && engine.renderer) {
      try {
        const gl = engine.renderer.getContext();
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        this.webglInfo = {
          renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
          vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR),
          version: gl.getParameter(gl.VERSION),
          shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
          maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE)
        };
        this.log('SYS', `WebGL Initialized: ${this.webglInfo.renderer}`);
      } catch (err) {
        this.log('SYS', `WebGL info inspection error: ${err.message}`);
      }
    }
  }

  interceptConsole() {
    const origLog = console.log.bind(console);
    const origWarn = console.warn.bind(console);
    const origError = console.error.bind(console);

    console.log = (...args) => {
      this.log('LOG', args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      origLog(...args);
    };

    console.warn = (...args) => {
      this.log('WARN', args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      origWarn(...args);
    };

    console.error = (...args) => {
      this.log('ERROR', args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      origError(...args);
    };
  }

  listenToErrors() {
    window.addEventListener('error', (event) => {
      this.log('UNCAUGHT', `${event.message} at ${event.filename}:${event.lineno}:${event.colno}`);
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.log('REJECTION', `${event.reason?.message || event.reason}`);
    });
  }

  log(level, msg) {
    const timeMs = (Date.now() - this.startTime) / 1000;
    const entry = `[${timeMs.toFixed(2)}s][${level}] ${msg}`;
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  recordFrame() {
    this.frameCount++;
    const now = performance.now();
    if (now - this.fpsTimer >= 1000) {
      this.lastFps = Math.round((this.frameCount * 1000) / (now - this.fpsTimer));
      this.frameCount = 0;
      this.fpsTimer = now;
    }
  }

  generateDiagnosticReport() {
    const lines = [];
    lines.push('================ ROCKETS CLIENT DIAGNOSTICS ================');
    lines.push(`Timestamp: ${new Date().toISOString()}`);
    lines.push(`User Agent: ${navigator.userAgent}`);
    lines.push(`Screen Resolution: ${window.screen.width}x${window.screen.height} (Pixel Ratio: ${window.devicePixelRatio})`);
    lines.push(`Window Inner Size: ${window.innerWidth}x${window.innerHeight}`);
    lines.push(`Orientation: ${screen.orientation?.type || 'unknown'}`);
    lines.push(`Touch Supported: ${'ontouchstart' in window || navigator.maxTouchPoints > 0} (Max Points: ${navigator.maxTouchPoints})`);
    lines.push('');

    // WebGL info
    lines.push('--- WebGL Environment ---');
    if (this.webglInfo) {
      lines.push(`Renderer: ${this.webglInfo.renderer}`);
      lines.push(`Vendor: ${this.webglInfo.vendor}`);
      lines.push(`WebGL Version: ${this.webglInfo.version}`);
      lines.push(`Max Texture Size: ${this.webglInfo.maxTextureSize}`);
    } else {
      lines.push('WebGL Info: Not yet captured or WebGL unavailable');
    }
    lines.push('');

    // Engine & Scene metrics
    lines.push('--- Engine & Simulation State ---');
    if (this.engineRef) {
      const e = this.engineRef;
      lines.push(`Is Engine Running: ${e.isRunning}`);
      lines.push(`Render FPS: ${this.lastFps}`);
      lines.push(`Canvas Size: ${e.renderer?.domElement?.width}x${e.renderer?.domElement?.height}`);
      lines.push(`Canvas Container Size: ${e.container?.clientWidth}x${e.container?.clientHeight}`);
      lines.push(`Scene Children Count: ${e.scene?.children?.length || 0}`);
      lines.push(`Asteroids Spawned: ${e.spaceEnv?.asteroids?.length || 0}`);

      if (e.playerShip) {
        const s = e.playerShip;
        lines.push(`Ship Position: (${s.position.x.toFixed(2)}, ${s.position.y.toFixed(2)}, ${s.position.z.toFixed(2)})`);
        lines.push(`Ship Velocity: (${s.velocity.x.toFixed(2)}, ${s.velocity.y.toFixed(2)}, ${s.velocity.z.toFixed(2)}) [Speed: ${s.getSpeed().toFixed(1)}]`);
        lines.push(`Ship Quaternion: (${s.quaternion.x.toFixed(3)}, ${s.quaternion.y.toFixed(3)}, ${s.quaternion.z.toFixed(3)}, ${s.quaternion.w.toFixed(3)})`);
        lines.push(`Ship HP: ${s.hp}/${s.maxHp} (isDead: ${s.isDead}, invuln: ${s.invulnerableTimer.toFixed(1)})`);
        lines.push(`Active Inputs: thrust=${s.input.thrust}, brake=${s.input.brake}, strafeL=${s.input.strafeLeft}, strafeR=${s.input.strafeRight}, analogPitch=${s.input.analogPitch.toFixed(2)}, analogYaw=${s.input.analogYaw.toFixed(2)}`);
      }

      if (e.network) {
        lines.push(`Network Self ID: ${e.network.selfId}`);
        lines.push(`Network Room ID: ${e.network.roomId}`);
        lines.push(`Network isMaster: ${e.network.isMaster}`);
        lines.push(`Connected Peers: ${e.network.peers?.size || 0}`);
      }
    } else {
      lines.push('Engine Reference: None (Engine not attached)');
    }
    lines.push('');

    // Console logs
    lines.push('--- Recent Event Stream (Last 50 Logs) ---');
    const recent = this.logs.slice(-50);
    for (const log of recent) {
      lines.push(log);
    }
    lines.push('============================================================');

    return lines.join('\n');
  }

  async copyToClipboard() {
    const text = this.generateDiagnosticReport();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        // Fallback
      }
    }
    // Fallback prompt
    window.prompt('Copy diagnostic report below (Ctrl+C / Cmd+C):', text);
    return true;
  }
}

export const logger = new DiagnosticLogger();
