import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GameHUD } from '../../src/game/hud.js';

describe('Room Master Debug Monitor UX', () => {
  let container;
  let hud;
  let mockEngine;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    mockEngine = {
      network: {
        roomName: 'Test Sector',
        roomId: 'test-room',
        isMaster: true,
        getAveragePing: () => 35,
        onMapResetVote: vi.fn()
      },
      config: {
        voxelQuality: 'medium',
        asteroidCount: 100,
        megaRadius: 2800,
        meteorFrequency: 10
      },
      playerShip: {
        input: {
          analogPitch: 0,
          analogYaw: 0
        }
      }
    };

    hud = new GameHUD(container, mockEngine);
  });

  afterEach(() => {
    if (hud) hud.destroy();
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    vi.restoreAllMocks();
  });

  it('should initialize #hud-master-monitor in the DOM, initially hidden', () => {
    const monitor = document.getElementById('hud-master-monitor');
    expect(monitor).not.toBeNull();
    expect(monitor.style.display).toBe('none');
  });

  it('should toggle monitor visibility based on isMaster status', () => {
    const monitor = document.getElementById('hud-master-monitor');

    // Not master -> hidden
    hud.update({ isMaster: false });
    expect(monitor.style.display).toBe('none');

    // Elected master -> visible
    hud.update({ isMaster: true });
    expect(monitor.style.display).toBe('block');

    // Master failover / step-down -> hidden
    hud.update({ isMaster: false });
    expect(monitor.style.display).toBe('none');
  });

  it('should categorize telemetry metrics into nominal, warning, and alert threshold badges', () => {
    // 1. Nominal test state
    hud.lastMonitorUpdateTime = 0;
    hud.updateMasterMonitor({
      fps: 60,
      frameTime: 16.4,
      drawCalls: 65,
      triangles: 120000,
      memory: 95,
      avgPing: 32,
      megaDistance: 3300,
      speed: 85
    });

    expect(document.getElementById('mon-fps-badge').className).toContain('nominal');
    expect(document.getElementById('mon-fps-badge').textContent).toBe('60');

    expect(document.getElementById('mon-frame-badge').className).toContain('nominal');
    expect(document.getElementById('mon-frame-badge').textContent).toBe('16.4ms');

    expect(document.getElementById('mon-calls-badge').className).toContain('nominal');
    expect(document.getElementById('mon-calls-badge').textContent).toBe('65');

    expect(document.getElementById('mon-tris-badge').className).toContain('nominal');
    expect(document.getElementById('mon-tris-badge').textContent).toBe('120k');

    expect(document.getElementById('mon-mem-badge').className).toContain('nominal');
    expect(document.getElementById('mon-mem-badge').textContent).toBe('95MB');

    expect(document.getElementById('mon-ping-badge').className).toContain('nominal');
    expect(document.getElementById('mon-ping-badge').textContent).toBe('32ms');

    expect(document.getElementById('mon-mega-badge').className).toContain('nominal');
    expect(document.getElementById('mon-mega-badge').textContent).toBe('3300u Orbit');

    expect(document.getElementById('mon-speed-badge').className).toContain('nominal');
    expect(document.getElementById('mon-speed-badge').textContent).toBe('85u/s');

    // 2. Warning test state
    hud.updateMasterMonitor({
      fps: 42,
      frameTime: 24.5,
      drawCalls: 180,
      triangles: 380000,
      memory: 220,
      avgPing: 85,
      megaDistance: 2900,
      speed: 120
    });

    expect(document.getElementById('mon-fps-badge').className).toContain('warning');
    expect(document.getElementById('mon-frame-badge').className).toContain('warning');
    expect(document.getElementById('mon-calls-badge').className).toContain('warning');
    expect(document.getElementById('mon-tris-badge').className).toContain('warning');
    expect(document.getElementById('mon-mem-badge').className).toContain('warning');
    expect(document.getElementById('mon-ping-badge').className).toContain('warning');
    expect(document.getElementById('mon-mega-badge').className).toContain('warning');
    expect(document.getElementById('mon-mega-badge').textContent).toBe('2900u Surface');
    expect(document.getElementById('mon-speed-badge').className).toContain('warning');

    // 3. Alert & Cavern test state
    hud.updateMasterMonitor({
      fps: 22,
      frameTime: 45.0,
      drawCalls: 320,
      triangles: 650000,
      memory: 380,
      avgPing: 160,
      megaDistance: 2400,
      speed: 90
    });

    expect(document.getElementById('mon-fps-badge').className).toContain('alert');
    expect(document.getElementById('mon-frame-badge').className).toContain('alert');
    expect(document.getElementById('mon-calls-badge').className).toContain('alert');
    expect(document.getElementById('mon-tris-badge').className).toContain('alert');
    expect(document.getElementById('mon-mem-badge').className).toContain('alert');
    expect(document.getElementById('mon-ping-badge').className).toContain('alert');
    expect(document.getElementById('mon-mega-badge').className).toContain('cavern');
    expect(document.getElementById('mon-mega-badge').textContent).toBe('2400u Cavern');
  });

  it('should handle unavailable memory gracefully as nominal N/A', () => {
    hud.updateMasterMonitor({
      memory: null
    });
    const memBadge = document.getElementById('mon-mem-badge');
    expect(memBadge.textContent).toBe('N/A');
    expect(memBadge.className).toContain('nominal');
  });

  it('should throttle DOM updates to 10Hz (every 100ms)', () => {
    const updateSpy = vi.spyOn(hud, 'updateMasterMonitor');

    // Initial update at t = 1000ms
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    hud.update({ isMaster: true, fps: 60 });
    expect(updateSpy).toHaveBeenCalledTimes(1);

    // Rapid frame at t = 1016ms (within 100ms window) -> throttled
    vi.spyOn(performance, 'now').mockReturnValue(1016);
    hud.update({ isMaster: true, fps: 59 });
    expect(updateSpy).toHaveBeenCalledTimes(1);

    // Frame at t = 1050ms -> still throttled
    vi.spyOn(performance, 'now').mockReturnValue(1050);
    hud.update({ isMaster: true, fps: 58 });
    expect(updateSpy).toHaveBeenCalledTimes(1);

    // Frame at t = 1105ms (105ms elapsed > 100ms throttle) -> executed!
    vi.spyOn(performance, 'now').mockReturnValue(1105);
    hud.update({ isMaster: true, fps: 60 });
    expect(updateSpy).toHaveBeenCalledTimes(2);
  });
});

describe('Dual-Reticle HUD Bore-Sight Reticle', () => {
  let container;
  let hud;
  let mockEngine;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    mockEngine = {
      network: {
        roomName: 'Test Sector',
        roomId: 'test-room',
        isMaster: false,
        getAveragePing: () => 35,
        onMapResetVote: vi.fn()
      },
      config: {
        voxelQuality: 'medium',
        asteroidCount: 100,
        megaRadius: 2800,
        meteorFrequency: 10
      },
      playerShip: {
        input: {
          analogPitch: 0,
          analogYaw: 0
        }
      }
    };

    hud = new GameHUD(container, mockEngine);
  });

  afterEach(() => {
    if (hud) hud.destroy();
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    vi.restoreAllMocks();
  });

  it('should initialize #hud-ship-boresight in the DOM with default aligned state', () => {
    const boreEl = document.getElementById('hud-ship-boresight');
    expect(boreEl).not.toBeNull();
    expect(boreEl.classList.contains('aligned')).toBe(true);

    const label = document.getElementById('hud-boresight-label');
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('LOCKED');
  });

  it('should render aligned state when ship hull is boresighted with pilot POV', () => {
    const boreEl = document.getElementById('hud-ship-boresight');
    const label = document.getElementById('hud-boresight-label');

    hud.update({
      shipBore: {
        x: 50.0,
        y: 50.0,
        inFront: true,
        isOffscreen: false,
        edgeAngle: 0,
        angleError: 0.015,
        isAligned: true
      }
    });

    expect(boreEl.classList.contains('aligned')).toBe(true);
    expect(boreEl.classList.contains('tracking')).toBe(false);
    expect(boreEl.classList.contains('offscreen')).toBe(false);
    expect(boreEl.style.left).toBe('50%');
    expect(boreEl.style.top).toBe('50%');
    expect(label.textContent).toBe('LOCKED');
  });

  it('should render tracking state with angular offset when ship hull lags behind pilot POV', () => {
    const boreEl = document.getElementById('hud-ship-boresight');
    const label = document.getElementById('hud-boresight-label');

    const errorRad = 0.2618; // ~15 degrees
    hud.update({
      shipBore: {
        x: 62.5,
        y: 45.0,
        inFront: true,
        isOffscreen: false,
        edgeAngle: 0,
        angleError: errorRad,
        isAligned: false
      }
    });

    expect(boreEl.classList.contains('tracking')).toBe(true);
    expect(boreEl.classList.contains('aligned')).toBe(false);
    expect(boreEl.classList.contains('offscreen')).toBe(false);
    expect(boreEl.style.left).toBe('62.5%');
    expect(boreEl.style.top).toBe('45%');
    expect(label.textContent).toBe('15°');
  });

  it('should render offscreen state clamped to edge with directional angle pointer', () => {
    const boreEl = document.getElementById('hud-ship-boresight');
    const label = document.getElementById('hud-boresight-label');

    const errorRad = 1.658; // ~95 degrees
    hud.update({
      shipBore: {
        x: 92.0,
        y: 50.0,
        inFront: false,
        isOffscreen: true,
        edgeAngle: 0,
        angleError: errorRad,
        isAligned: false
      }
    });

    expect(boreEl.classList.contains('offscreen')).toBe(true);
    expect(boreEl.classList.contains('aligned')).toBe(false);
    expect(boreEl.classList.contains('tracking')).toBe(false);
    expect(boreEl.style.left).toBe('92%');
    expect(boreEl.style.top).toBe('50%');
    expect(boreEl.style.getPropertyValue('--edge-angle')).toBe('0deg');
    expect(label.textContent).toBe('95°');
  });
});
