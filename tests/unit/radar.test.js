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
});
