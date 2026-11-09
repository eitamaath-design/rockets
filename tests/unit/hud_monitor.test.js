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

  it('should toggle monitor visibility based on isMaster status and showStats room configuration', () => {
    const monitor = document.getElementById('hud-master-monitor');

    // Not master -> hidden
    hud.update({ isMaster: false });
    expect(monitor.style.display).toBe('none');

    // Elected master -> visible
    hud.update({ isMaster: true });
    expect(monitor.style.display).toBe('block');

    // Master but showStats is false -> hidden
    hud.update({ isMaster: true, showStats: false });
    expect(monitor.style.display).toBe('none');

    // Master and showStats is true -> visible again
    hud.update({ isMaster: true, showStats: true });
    expect(monitor.style.display).toBe('block');

    // Engine config fallback when state.showStats is omitted
    mockEngine.config.showStats = false;
    hud.update({ isMaster: true });
    expect(monitor.style.display).toBe('none');
    mockEngine.config.showStats = true;
    hud.update({ isMaster: true });
    expect(monitor.style.display).toBe('block');

    // Master failover / step-down -> hidden
    hud.update({ isMaster: false });
    expect(monitor.style.display).toBe('none');
  });

  it('should support minimizing #hud-master-monitor to left or right screen edge and restoring via dock tab', () => {
    Object.defineProperty(container, 'clientWidth', { value: 1000, configurable: true });
    Object.defineProperty(container, 'clientHeight', { value: 600, configurable: true });

    const monitor = document.getElementById('hud-master-monitor');
    const minBtn = document.getElementById('btn-minimize-monitor');
    const restoreBtn = document.getElementById('btn-restore-monitor');

    expect(minBtn).not.toBeNull();
    expect(restoreBtn).not.toBeNull();

    hud.update({ isMaster: true });
    expect(monitor.style.display).toBe('block');
    expect(monitor.classList.contains('minimized')).toBe(false);

    // 1. Minimize when near left edge (default left = 12px) -> docks left
    monitor.style.left = '20px';
    monitor.style.top = '80px';
    minBtn.click();

    expect(monitor.classList.contains('minimized')).toBe(true);
    expect(monitor.classList.contains('docked-right')).toBe(false);
    expect(monitor.style.left).toBe('0px');

    // Restore from left dock
    restoreBtn.click();
    expect(monitor.classList.contains('minimized')).toBe(false);
    expect(monitor.style.left).toBe('20px');
    expect(monitor.style.top).toBe('80px');

    // 2. Move closer to right edge (left = 750px on 1000px viewport) and minimize -> docks right
    monitor.style.left = '750px';
    monitor.style.top = '120px';
    minBtn.click();

    expect(monitor.classList.contains('minimized')).toBe(true);
    expect(monitor.classList.contains('docked-right')).toBe(true);
    expect(monitor.style.right).toBe('0px');

    // Restore from right dock
    restoreBtn.click();
    expect(monitor.classList.contains('minimized')).toBe(false);
    expect(monitor.classList.contains('docked-right')).toBe(false);
    expect(monitor.style.left).toBe('750px');
    expect(monitor.style.top).toBe('120px');
  });

  it('should allow dragging #hud-master-monitor like a floating window via mouse and touch, clamped to viewport bounds', () => {
    Object.defineProperty(container, 'clientWidth', { value: 1000, configurable: true });
    Object.defineProperty(container, 'clientHeight', { value: 600, configurable: true });

    const monitor = document.getElementById('hud-master-monitor');
    const header = document.getElementById('master-monitor-header');
    hud.update({ isMaster: true });

    monitor.style.left = '50px';
    monitor.style.top = '60px';

    // 1. Mouse drag test
    header.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 100, bubbles: true }));
    expect(monitor.classList.contains('dragging')).toBe(true);

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 250, clientY: 180, bubbles: true }));
    expect(monitor.style.left).toBe('200px');
    expect(monitor.style.top).toBe('140px');

    // Clamp to negative / beyond screen bounds
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: -500, clientY: -500, bubbles: true }));
    expect(monitor.style.left).toBe('0px');
    expect(monitor.style.top).toBe('0px');

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 5000, clientY: 5000, bubbles: true }));
    expect(parseFloat(monitor.style.left)).toBeLessThanOrEqual(1000);
    expect(parseFloat(monitor.style.top)).toBeLessThanOrEqual(600);

    window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    expect(monitor.classList.contains('dragging')).toBe(false);

    // 2. Touch drag test with touch identifier tracking
    monitor.style.left = '100px';
    monitor.style.top = '100px';

    const touchStartEvt = new Event('touchstart', { bubbles: true, cancelable: true });
    touchStartEvt.changedTouches = [{ identifier: 7, clientX: 120, clientY: 120 }];
    touchStartEvt.touches = touchStartEvt.changedTouches;
    header.dispatchEvent(touchStartEvt);
    expect(monitor.classList.contains('dragging')).toBe(true);

    const touchMoveEvt = new Event('touchmove', { bubbles: true, cancelable: true });
    touchMoveEvt.touches = [{ identifier: 7, clientX: 320, clientY: 220 }];
    touchMoveEvt.changedTouches = touchMoveEvt.touches;
    window.dispatchEvent(touchMoveEvt);
    expect(monitor.style.left).toBe('300px');
    expect(monitor.style.top).toBe('200px');

    const touchEndEvt = new Event('touchend', { bubbles: true, cancelable: true });
    touchEndEvt.changedTouches = [{ identifier: 7, clientX: 320, clientY: 220 }];
    touchEndEvt.touches = [];
    window.dispatchEvent(touchEndEvt);
    expect(monitor.classList.contains('dragging')).toBe(false);
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

describe('Mobile Multi-Touch Navigation & Circular Touch Controls', () => {
  let container;
  let hud;
  let mockEngine;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    mockEngine = {
      isFiringLaser: false,
      triggerBoostAction: vi.fn(),
      weaponsSystem: {
        triggerSecondary: vi.fn()
      },
      network: {
        roomName: 'Mobile Sector',
        roomId: 'mobile-room',
        isMaster: true,
        getAveragePing: () => 25,
        onMapResetVote: vi.fn()
      },
      config: {
        voxelQuality: 'high',
        asteroidCount: 100,
        megaRadius: 2800,
        meteorFrequency: 10,
        showStats: true
      },
      playerShip: {
        input: {
          thrust: false,
          brake: false,
          strafeLeft: false,
          strafeRight: false,
          rollLeft: false,
          rollRight: false,
          analogPitch: 0,
          analogYaw: 0
        },
        useSpecialPowerUp: vi.fn()
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

  it('should render all mobile action buttons with both .action-touch-btn and .touch-btn circular classes', () => {
    const buttonIds = [
      'btn-roll-left',
      'btn-roll-right',
      'btn-strafe-left',
      'btn-strafe-right',
      'btn-thrust',
      'btn-brake',
      'btn-laser',
      'btn-missile',
      'btn-special'
    ];

    for (const id of buttonIds) {
      const btn = document.getElementById(id);
      expect(btn).not.toBeNull();
      expect(btn.classList.contains('action-touch-btn')).toBe(true);
      expect(btn.classList.contains('touch-btn')).toBe(true);
    }
  });

  it('should support simultaneous multi-touch: holding Thrust with finger 1 while steering Joystick with finger 2', () => {
    const thrustBtn = document.getElementById('btn-thrust');
    const joyContainer = document.getElementById('touch-joystick-container');
    const joyBase = document.getElementById('joystick-base');

    // Mock joystick bounding rect centered at (100, 100)
    vi.spyOn(joyBase, 'getBoundingClientRect').mockReturnValue({
      left: 40,
      top: 40,
      width: 120,
      height: 120
    });

    // 1. Finger 1 (identifier = 1) touches and holds #btn-thrust
    const t1Start = new Event('touchstart', { bubbles: true, cancelable: true });
    t1Start.changedTouches = [{ identifier: 1, clientX: 800, clientY: 500 }];
    t1Start.touches = [{ identifier: 1, clientX: 800, clientY: 500 }];
    thrustBtn.dispatchEvent(t1Start);

    expect(mockEngine.playerShip.input.thrust).toBe(true);
    expect(thrustBtn.classList.contains('active')).toBe(true);

    // 2. While Finger 1 is STILL held in e.touches[0], Finger 2 (identifier = 2) touches #touch-joystick-container!
    // Previously, e.touches[0] grabbed Finger 1 at (800, 500) instead of Finger 2 in e.changedTouches[0]!
    const t2Start = new Event('touchstart', { bubbles: true, cancelable: true });
    t2Start.touches = [
      { identifier: 1, clientX: 800, clientY: 500 },
      { identifier: 2, clientX: 100, clientY: 55 } // 45px above center (100, 100) -> full pitch up (+1.0)
    ];
    t2Start.changedTouches = [
      { identifier: 2, clientX: 100, clientY: 55 }
    ];
    joyContainer.dispatchEvent(t2Start);

    // Thrust remains active AND joystick accurately tracks Finger 2 (pitch = +1, yaw = 0)
    expect(mockEngine.playerShip.input.thrust).toBe(true);
    expect(mockEngine.playerShip.input.analogPitch).toBeCloseTo(1.0, 2);
    expect(mockEngine.playerShip.input.analogYaw).toBeCloseTo(0.0, 2);

    // 3. Finger 2 drags right to (145, 100) while Finger 1 stays on Thrust
    const t2Move = new Event('touchmove', { bubbles: true, cancelable: true });
    t2Move.touches = [
      { identifier: 1, clientX: 800, clientY: 500 },
      { identifier: 2, clientX: 145, clientY: 100 }
    ];
    t2Move.changedTouches = [
      { identifier: 2, clientX: 145, clientY: 100 }
    ];
    joyContainer.dispatchEvent(t2Move);

    expect(mockEngine.playerShip.input.thrust).toBe(true);
    expect(mockEngine.playerShip.input.analogPitch).toBeCloseTo(0.0, 2);
    expect(mockEngine.playerShip.input.analogYaw).toBeCloseTo(-1.0, 2);

    // 4. Unrelated Finger 3 (identifier = 3) lifts elsewhere -> neither Joystick nor Thrust should reset!
    const t3End = new Event('touchend', { bubbles: true, cancelable: true });
    t3End.touches = [
      { identifier: 1, clientX: 800, clientY: 500 },
      { identifier: 2, clientX: 145, clientY: 100 }
    ];
    t3End.changedTouches = [
      { identifier: 3, clientX: 500, clientY: 500 }
    ];
    window.dispatchEvent(t3End);

    expect(mockEngine.playerShip.input.thrust).toBe(true);
    expect(mockEngine.playerShip.input.analogYaw).toBeCloseTo(-1.0, 2);

    // 5. Finger 1 releases Thrust while Finger 2 keeps steering Joystick
    const t1End = new Event('touchend', { bubbles: true, cancelable: true });
    t1End.touches = [
      { identifier: 2, clientX: 145, clientY: 100 }
    ];
    t1End.changedTouches = [
      { identifier: 1, clientX: 800, clientY: 500 }
    ];
    thrustBtn.dispatchEvent(t1End);

    expect(mockEngine.playerShip.input.thrust).toBe(false);
    expect(thrustBtn.classList.contains('active')).toBe(false);
    // Joystick is still steering!
    expect(mockEngine.playerShip.input.analogYaw).toBeCloseTo(-1.0, 2);

    // 6. Finger 2 releases Joystick
    const t2End = new Event('touchend', { bubbles: true, cancelable: true });
    t2End.touches = [];
    t2End.changedTouches = [
      { identifier: 2, clientX: 145, clientY: 100 }
    ];
    joyContainer.dispatchEvent(t2End);

    expect(mockEngine.playerShip.input.analogPitch).toBe(0);
    expect(mockEngine.playerShip.input.analogYaw).toBe(0);
  });

  it('should support steering Joystick first with finger 1 and then pressing Thrust & Laser with fingers 2 & 3', () => {
    const joyContainer = document.getElementById('touch-joystick-container');
    const joyBase = document.getElementById('joystick-base');
    const thrustBtn = document.getElementById('btn-thrust');
    const laserBtn = document.getElementById('btn-laser');

    vi.spyOn(joyBase, 'getBoundingClientRect').mockReturnValue({
      left: 40,
      top: 40,
      width: 120,
      height: 120
    });

    // 1. Finger 1 starts steering Joystick
    const jStart = new Event('touchstart', { bubbles: true, cancelable: true });
    jStart.changedTouches = [{ identifier: 10, clientX: 100, clientY: 55 }];
    jStart.touches = jStart.changedTouches;
    joyContainer.dispatchEvent(jStart);
    expect(mockEngine.playerShip.input.analogPitch).toBeCloseTo(1.0, 2);

    // 2. Finger 2 holds Thrust
    const tStart = new Event('touchstart', { bubbles: true, cancelable: true });
    tStart.changedTouches = [{ identifier: 11, clientX: 800, clientY: 500 }];
    tStart.touches = [
      { identifier: 10, clientX: 100, clientY: 55 },
      { identifier: 11, clientX: 800, clientY: 500 }
    ];
    thrustBtn.dispatchEvent(tStart);
    expect(mockEngine.playerShip.input.thrust).toBe(true);
    expect(mockEngine.playerShip.input.analogPitch).toBeCloseTo(1.0, 2);

    // 3. Finger 3 holds Laser
    const lStart = new Event('touchstart', { bubbles: true, cancelable: true });
    lStart.changedTouches = [{ identifier: 12, clientX: 880, clientY: 500 }];
    lStart.touches = [
      { identifier: 10, clientX: 100, clientY: 55 },
      { identifier: 11, clientX: 800, clientY: 500 },
      { identifier: 12, clientX: 880, clientY: 500 }
    ];
    laserBtn.dispatchEvent(lStart);
    expect(mockEngine.isFiringLaser).toBe(true);
    expect(mockEngine.playerShip.input.thrust).toBe(true);
    expect(mockEngine.playerShip.input.analogPitch).toBeCloseTo(1.0, 2);
  });
});
