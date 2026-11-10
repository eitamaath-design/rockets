import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { GameHUD } from '../../src/game/hud.js';

describe('2D Tactical Radar with 3-Second Refresh and Viewpoint Elevation Indicators', () => {
  let hud;
  let mockEngine;
  let playerShip;
  let remoteShips;
  let camera;

  beforeEach(() => {
    document.body.innerHTML = '';

    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.quaternion.set(0, 0, 0, 1);

    playerShip = {
      position: new THREE.Vector3(0, 0, 0),
      quaternion: new THREE.Quaternion(),
      score: 0,
      kills: 0,
      deaths: 0,
      storedPowerUp: null,
      isShieldBroken: false,
      isInvisible: false,
      hasHologramDecoy: false,
      isDead: false,
      respawnTimer: 0,
      invulnerableTimer: 0,
      warpCooldownTimer: 0,
      isWarpCharging: false,
      warpChargeTime: 0,
      maxWarpCharge: 1.0
    };

    remoteShips = new Map();

    mockEngine = {
      network: {
        roomName: 'Test Sector',
        peers: new Map(),
        isMaster: true,
        currentMasterId: 'p1',
        getAveragePing: () => 42
      },
      config: {
        showStats: false
      },
      playerShip,
      remoteShips,
      camera,
      weaponsSystem: {
        lockSystem: {
          isLocked: false,
          getProgress: () => 0,
          targetScreenPos: null
        },
        cannonEnergy: 100,
        cannonMaxEnergy: 100,
        cannonCooldownTimer: 0
      }
    };

    const container = document.createElement('div');
    document.body.appendChild(container);
    mockEngine.container = container;

    hud = new GameHUD(container, mockEngine);
  });

  it('should render the radar container and dial in the HUD', () => {
    const radar = document.getElementById('hud-radar');
    expect(radar).not.toBeNull();
    const dial = radar.querySelector('.hud-radar-dial');
    expect(dial).not.toBeNull();
    const blips = document.getElementById('hud-radar-blips');
    expect(blips).not.toBeNull();
    const cadence = document.getElementById('hud-radar-cadence');
    expect(cadence).not.toBeNull();
  });

  it('should display countdown and refresh blips strictly every 3 seconds', () => {
    const remote1 = {
      position: new THREE.Vector3(0, 0, -200), // Straight ahead
      isDead: false,
      isInvisible: false
    };
    remoteShips.set('enemy1', remote1);

    // Initial state: radarRefreshTimer is undefined/0
    hud.updateRadar(0.5);
    const cadence = document.getElementById('hud-radar-cadence');
    expect(cadence.textContent).toBe('2.5s');

    // Advance by 1.5s (total 2.0s < 3.0s) -> blips not yet computed
    hud.updateRadar(1.5);
    expect(cadence.textContent).toBe('1.0s');
    let blipsContainer = document.getElementById('hud-radar-blips');
    expect(blipsContainer.children.length).toBe(0);

    // Advance by another 1.0s (total 3.0s) -> blips refresh!
    hud.updateRadar(1.0);
    blipsContainer = document.getElementById('hud-radar-blips');
    expect(blipsContainer.children.length).toBe(1);
  });

  it('should calculate elevation angles and display UP arrow when enemy is above viewpoint plane', () => {
    // Enemy is 200u ahead and 100u above player
    const enemyAbove = {
      position: new THREE.Vector3(0, 100, -200),
      isDead: false,
      isInvisible: false
    };
    remoteShips.set('above1', enemyAbove);

    // Trigger 3s refresh
    hud.updateRadar(3.0);
    const blips = document.getElementById('hud-radar-blips');
    expect(blips.children.length).toBe(1);

    const blip = blips.children[0];
    expect(blip.classList.contains('up')).toBe(true);
    const arrow = blip.querySelector('.blip-arrow');
    expect(arrow.textContent).toBe('▲');
    const angle = blip.querySelector('.blip-angle');
    // angle = atan2(100, 200) = 26.56° -> 27°
    expect(angle.textContent).toBe('+27°');
  });

  it('should calculate elevation angles and display DOWN arrow when enemy is below viewpoint plane', () => {
    // Enemy is 150u ahead and -80u below player
    const enemyBelow = {
      position: new THREE.Vector3(0, -80, -150),
      isDead: false,
      isInvisible: false
    };
    remoteShips.set('below1', enemyBelow);

    // Trigger 3s refresh
    hud.updateRadar(3.0);
    const blips = document.getElementById('hud-radar-blips');
    expect(blips.children.length).toBe(1);

    const blip = blips.children[0];
    expect(blip.classList.contains('down')).toBe(true);
    const arrow = blip.querySelector('.blip-arrow');
    expect(arrow.textContent).toBe('▼');
    const angle = blip.querySelector('.blip-angle');
    // angle = atan2(-80, 150) = -28.07° -> -28°
    expect(angle.textContent).toBe('-28°');
  });

  it('should display level indicator when enemy is within level threshold (between -2° and +2°)', () => {
    // Enemy is 500u ahead and 5u above player (atan2(5, 500) = 0.57° < 3°)
    const enemyLevel = {
      position: new THREE.Vector3(0, 5, -500),
      isDead: false,
      isInvisible: false
    };
    remoteShips.set('level1', enemyLevel);

    // Trigger 3s refresh
    hud.updateRadar(3.0);
    const blips = document.getElementById('hud-radar-blips');
    expect(blips.children.length).toBe(1);

    const blip = blips.children[0];
    expect(blip.classList.contains('level')).toBe(true);
    const arrow = blip.querySelector('.blip-arrow');
    expect(arrow.textContent).toBe('●');
    const angle = blip.querySelector('.blip-angle');
    expect(angle.textContent).toBe('0°');
  });

  it('should filter out dead and cloaked/invisible enemies from radar', () => {
    const deadEnemy = {
      position: new THREE.Vector3(50, 0, -100),
      isDead: true,
      isInvisible: false
    };
    const cloakedEnemy = {
      position: new THREE.Vector3(-50, 0, -100),
      isDead: false,
      isInvisible: true
    };
    const visibleEnemy = {
      position: new THREE.Vector3(0, 0, -100),
      isDead: false,
      isInvisible: false
    };

    remoteShips.set('dead', deadEnemy);
    remoteShips.set('cloaked', cloakedEnemy);
    remoteShips.set('visible', visibleEnemy);

    hud.updateRadar(3.0);
    const blips = document.getElementById('hud-radar-blips');
    // Only the visible enemy should be displayed
    expect(blips.children.length).toBe(1);
  });

  it('should trigger an immediate initial scan on the first frame of hud.update', () => {
    const enemy = {
      position: new THREE.Vector3(0, 0, -300),
      isDead: false,
      isInvisible: false
    };
    remoteShips.set('enemy-init', enemy);

    const blips = document.getElementById('hud-radar-blips');
    expect(blips.children.length).toBe(0);

    // Call hud.update with a small frameTime
    hud.update({ frameTime: 16 });

    // Should immediately refresh blips on first frame
    expect(blips.children.length).toBe(1);
    expect(hud._hasInitialRadarScan).toBe(true);

    // Second frame should not force refresh unless 3s elapses
    remoteShips.set('enemy-init2', {
      position: new THREE.Vector3(100, 0, -300),
      isDead: false,
      isInvisible: false
    });
    hud.update({ frameTime: 16 });
    // Still 1 blip because timer has only advanced 16ms < 3.0s
    expect(blips.children.length).toBe(1);
  });

  it('should immediately refresh blips when forceRefresh parameter is true regardless of timer', () => {
    const enemy = {
      position: new THREE.Vector3(0, 0, -150),
      isDead: false,
      isInvisible: false
    };
    remoteShips.set('forced-enemy', enemy);

    const blips = document.getElementById('hud-radar-blips');
    // Normal call with 0.1s dt does not refresh blips (timer 0.1 < 3.0)
    hud.updateRadar(0.1, false);
    expect(blips.children.length).toBe(0);

    // Force refresh with 0.016s dt
    hud.updateRadar(0.016, true);
    expect(blips.children.length).toBe(1);
    expect(hud.radarRefreshTimer).toBe(0.0);
  });

  it('should tolerate remoteShips provided as an Array or plain Object dictionary with plain coordinate objects', () => {
    const blips = document.getElementById('hud-radar-blips');

    // Test Array of ships with plain { x, y, z } position
    mockEngine.remoteShips = [
      {
        id: 'array-ship-1',
        position: { x: 0, y: 50, z: -200 },
        isDead: false,
        isInvisible: false
      },
      {
        peerId: 'array-ship-2',
        position: { x: 100, y: -50, z: -300 },
        isDead: false,
        isInvisible: false
      }
    ];

    hud.updateRadar(3.0);
    expect(blips.children.length).toBe(2);

    // Test plain Object dictionary of ships
    mockEngine.remoteShips = {
      'obj-ship-1': {
        position: { x: 50, y: 0, z: -100 },
        isDead: false,
        isInvisible: false
      }
    };

    hud.updateRadar(3.0);
    expect(blips.children.length).toBe(1);
  });

  it('should safely render contacts very close to the player position at dial center without NaN or div-by-zero', () => {
    const closeEnemy = {
      position: new THREE.Vector3(0.0001, 0, 0.0001), // horizDist <= 0.001
      isDead: false,
      isInvisible: false
    };
    remoteShips.set('close-enemy', closeEnemy);

    hud.updateRadar(3.0);
    const blips = document.getElementById('hud-radar-blips');
    expect(blips.children.length).toBe(1);

    const blip = blips.children[0];
    // Center coordinate is 55px, 55px
    expect(parseFloat(blip.style.left)).toBe(55);
    expect(parseFloat(blip.style.top)).toBe(55);
  });

  it('should not redundantly call updateRadar from updateMasterMonitor preventing double-ticking', () => {
    const radarSpy = vi.spyOn(hud, 'updateRadar');

    // Simulate monitor tick
    hud.updateMasterMonitor({
      fps: 60,
      frameTime: 16.6,
      drawCalls: 50,
      triangles: 100000,
      isMaster: true,
      showStats: true
    });

    expect(radarSpy).not.toHaveBeenCalled();
    radarSpy.mockRestore();
  });
});
