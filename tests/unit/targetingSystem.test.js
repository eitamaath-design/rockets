import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { GameHUD } from '../../src/game/hud.js';
import { RemoteShip } from '../../src/game/remoteShip.js';

describe('Line-of-Sight Corner Bracket Targeting System', () => {
  let container;
  let engineMock;
  let hud;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    container = document.getElementById('app');

    engineMock = {
      playerShip: {
        position: new THREE.Vector3(0, 0, 0)
      },
      remoteShips: new Map(),
      camera: new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 10000),
      spaceEnv: {
        checkRayBlocked: vi.fn().mockReturnValue(false)
      },
      network: { roomName: 'Test Room' },
      config: { voxelQuality: 'low', asteroidCount: 50 }
    };

    engineMock.camera.position.set(0, 0, 10);
    engineMock.camera.lookAt(0, 0, 0);
    engineMock.camera.updateMatrixWorld(true);

    hud = new GameHUD(container, engineMock);
  });

  it('should create targeting container `#hud-targeting-container` inside `.hud-root` / overlay', () => {
    const targetingContainer = document.getElementById('hud-targeting-container');
    expect(targetingContainer).not.toBeNull();
    expect(targetingContainer.classList.contains('hud-targeting-container')).toBe(true);
  });

  it('should filter out dead ships (remote.isDead === true)', () => {
    const scene = new THREE.Scene();
    const deadShip = new RemoteShip('dead-1', scene, 'DeadPilot');
    deadShip.isDead = true;
    deadShip.position.set(0, 0, -50);
    engineMock.remoteShips.set('dead-1', deadShip);

    hud.updateMasterMonitor({ fps: 60, frameTime: 16.6 });

    const targetBox = document.getElementById('hud-target-dead-1');
    expect(targetBox).toBeNull();
    scene.clear();
  });

  it('should filter out cloaked/invisible ships (remote.isInvisible === true)', () => {
    const scene = new THREE.Scene();
    const cloakedShip = new RemoteShip('cloak-1', scene, 'CloakedPilot');
    cloakedShip.isInvisible = true;
    cloakedShip.position.set(0, 0, -50);
    engineMock.remoteShips.set('cloak-1', cloakedShip);

    hud.updateMasterMonitor({ fps: 60, frameTime: 16.6 });

    const targetBox = document.getElementById('hud-target-cloak-1');
    expect(targetBox).toBeNull();
    scene.clear();
  });

  it('should filter out ships behind camera (screenPos.z >= 1.0)', () => {
    const scene = new THREE.Scene();
    const behindShip = new RemoteShip('behind-1', scene, 'BehindPilot');
    // Position behind the camera (camera is at z=10 looking down -z)
    behindShip.position.set(0, 0, 50);
    engineMock.remoteShips.set('behind-1', behindShip);

    hud.updateMasterMonitor({ fps: 60, frameTime: 16.6 });

    const targetBox = document.getElementById('hud-target-behind-1');
    expect(targetBox).toBeNull();
    scene.clear();
  });

  it('should filter out ships blocked by obstacles/asteroids (checkRayBlocked === true)', () => {
    const scene = new THREE.Scene();
    const blockedShip = new RemoteShip('blocked-1', scene, 'BlockedPilot');
    blockedShip.position.set(0, 0, -50);
    engineMock.remoteShips.set('blocked-1', blockedShip);

    engineMock.spaceEnv.checkRayBlocked.mockReturnValue(true);

    hud.updateMasterMonitor({ fps: 60, frameTime: 16.6 });

    const targetBox = document.getElementById('hud-target-blocked-1');
    expect(targetBox).toBeNull();
    scene.clear();
  });

  it('should render rectangular crosshair with corner brackets and dual status bars for in-LOS enemy ship', () => {
    const scene = new THREE.Scene();
    const enemyShip = new RemoteShip('enemy-1', scene, 'ViperAce');
    enemyShip.position.set(0, 0, -100);
    enemyShip.shield = 75;
    enemyShip.maxShield = 100;
    enemyShip.hp = 80;
    enemyShip.maxHp = 100;
    engineMock.remoteShips.set('enemy-1', enemyShip);

    engineMock.spaceEnv.checkRayBlocked.mockReturnValue(false);

    hud.updateMasterMonitor({ fps: 60, frameTime: 16.6 });

    const targetBox = document.getElementById('hud-target-enemy-1');
    expect(targetBox).not.toBeNull();

    // Verify corner brackets exist
    expect(targetBox.querySelector('.target-bracket.tl')).not.toBeNull();
    expect(targetBox.querySelector('.target-bracket.tr')).not.toBeNull();
    expect(targetBox.querySelector('.target-bracket.bl')).not.toBeNull();
    expect(targetBox.querySelector('.target-bracket.br')).not.toBeNull();

    // Verify status bars and fill widths
    const shieldFill = targetBox.querySelector('.target-shield-fill');
    const hpFill = targetBox.querySelector('.target-hp-fill');
    expect(shieldFill).not.toBeNull();
    expect(hpFill).not.toBeNull();
    expect(shieldFill.style.width).toBe('75%');
    expect(hpFill.style.width).toBe('80%');

    // Verify pilot callsign
    const pilotNameEl = targetBox.querySelector('.target-pilot-name');
    expect(pilotNameEl).not.toBeNull();
    expect(pilotNameEl.textContent).toBe('ViperAce');

    scene.clear();
  });
});
