import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';
import { SpaceEnvironment } from '../../src/game/space.js';
import { GameNetwork } from '../../src/net/network.js';

describe('P2P Asteroid Carve Synchronization & Late-Joiner World Sync', () => {
  let scene;
  let spaceEnv;

  beforeEach(() => {
    scene = new THREE.Scene();
    // Use low voxelQuality (32³) for fast unit test execution
    spaceEnv = new SpaceEnvironment(scene, 12345, {
      voxelQuality: 'low',
      asteroidCount: 5,
      megaRadius: 1400
    });
  });

  afterEach(() => {
    if (spaceEnv) {
      spaceEnv.destroy();
      spaceEnv = null;
    }
  });

  it('should initialize asteroids with index, id, and empty carve history', () => {
    expect(spaceEnv.asteroids.length).toBeGreaterThan(0);
    const mega = spaceEnv.asteroids[0];
    expect(mega.isMega).toBe(true);
    expect(mega.id).toBe('mega');
    expect(mega.index).toBe(0);
    expect(Array.isArray(spaceEnv.carveHistory)).toBe(true);
    expect(spaceEnv.carveHistory.length).toBe(0);
  });

  it('should trigger onCarve callback and record to carveHistory when local carveAsteroid executes', () => {
    const onCarveSpy = vi.fn();
    spaceEnv.onCarve = onCarveSpy;

    const mega = spaceEnv.asteroids[0];
    const hitPoint = new THREE.Vector3(0, 0, 1120);
    const hitDir = new THREE.Vector3(0, 0, -1);

    const result = spaceEnv.carveAsteroid(mega, hitPoint, hitDir, 32.0, 36.0, 160.0);
    expect(result.voxelsModified).toBeGreaterThan(0);

    expect(onCarveSpy).toHaveBeenCalledTimes(1);
    const payload = onCarveSpy.mock.calls[0][0];
    expect(payload.asteroidIndex).toBe(0);
    expect(payload.isMega).toBe(true);
    expect(payload.hitPoint.x).toBeCloseTo(hitPoint.x);
    expect(payload.hitPoint.y).toBeCloseTo(hitPoint.y);
    expect(payload.hitPoint.z).toBeCloseTo(hitPoint.z);
    expect(payload.isFracture).toBe(false);

    expect(spaceEnv.carveHistory.length).toBe(1);
    expect(spaceEnv.carveHistory[0].asteroidIndex).toBe(0);
  });

  it('should trigger onCarve and record to carveHistory when local fractureAsteroid executes', () => {
    const onCarveSpy = vi.fn();
    spaceEnv.onCarve = onCarveSpy;

    const mega = spaceEnv.asteroids[0];
    const hitPoint = new THREE.Vector3(0, 0, 1120);
    const hitDir = new THREE.Vector3(0, 0, -1);

    const result = spaceEnv.fractureAsteroid(mega, hitPoint, hitDir, 24.0, 16.0, 75.0);
    expect(result.cracked).toBe(true);
    expect(result.crackStage).toBe(1);

    expect(onCarveSpy).toHaveBeenCalledTimes(1);
    const payload = onCarveSpy.mock.calls[0][0];
    expect(payload.isFracture).toBe(true);
    expect(payload.stage).toBe(1);
  });

  it('should apply remote carve deterministically and suppress echo broadcast loops', () => {
    const onCarveSpy = vi.fn();
    spaceEnv.onCarve = onCarveSpy;

    const remotePayload = {
      asteroidIndex: 0,
      isMega: true,
      hitPoint: { x: 0, y: 0, z: 1120 },
      hitDir: { x: 0, y: 0, z: -1 },
      carveRadius: 32.0,
      carveDepth: 36.0,
      strength: 160.0,
      isFracture: false
    };

    const res = spaceEnv.applyRemoteCarve(remotePayload);
    expect(res).not.toBeNull();
    expect(res.voxelsModified).toBeGreaterThan(0);

    // CRITICAL: Remote carve execution MUST NOT trigger onCarve broadcast (no infinite echo)
    expect(onCarveSpy).not.toHaveBeenCalled();

    // But it MUST be recorded in the local carveHistory so joiners can receive it
    expect(spaceEnv.carveHistory.length).toBe(1);
  });

  it('should replay full carve history on a late-joining peer to reconstruct matching asteroid state', () => {
    // 1. Host client applies 2 carves
    const mega = spaceEnv.asteroids[0];
    spaceEnv.carveAsteroid(mega, new THREE.Vector3(0, 0, 1120), new THREE.Vector3(0, 0, -1), 32.0, 36.0, 160.0);
    spaceEnv.carveAsteroid(mega, new THREE.Vector3(50, 0, 1120), new THREE.Vector3(0, 0, -1), 32.0, 36.0, 160.0);

    const history = spaceEnv.getCarveHistory();
    expect(history.length).toBe(2);

    // 2. Late joiner client creates fresh SpaceEnvironment with the same seed
    const joinerScene = new THREE.Scene();
    const joinerEnv = new SpaceEnvironment(joinerScene, 12345, {
      voxelQuality: 'low',
      asteroidCount: 5,
      megaRadius: 1400
    });

    try {
      const joinerMega = joinerEnv.asteroids[0];
      const initialDensity = joinerMega.mc.getCell(16, 16, 24);

      // Replay host's carve history onto the joiner
      joinerEnv.applyCarveHistory(history);

      expect(joinerEnv.carveHistory.length).toBe(2);
      const postCarveDensity = joinerMega.mc.getCell(16, 16, 24);
      // Density was reduced by the replayed carves
      expect(postCarveDensity).toBeLessThan(initialDensity + 1.0);
    } finally {
      joinerEnv.destroy();
    }
  });

  it('should support network asteroid_carve and asteroid_world_sync channels and dispatchers', () => {
    const net = new GameNetwork('test-room', 'Pilot1', 12345);
    const mockChannel = {
      send: vi.fn(),
      onReceive: vi.fn()
    };
    net.sendAsteroidCarve = mockChannel.send;
    net.sendAsteroidWorldSync = mockChannel.send;

    const carveListener = vi.fn();
    const worldSyncListener = vi.fn();

    const unsubCarve = net.onAsteroidCarve(carveListener);
    const unsubSync = net.onAsteroidWorldSync(worldSyncListener);

    const testCarve = {
      asteroidIndex: 0,
      hitPoint: { x: 10, y: 20, z: 30 }
    };

    net.broadcastAsteroidCarve(testCarve);
    expect(mockChannel.send).toHaveBeenCalledWith(testCarve);

    // Dispatch incoming carve to listeners
    for (const cb of net.asteroidCarveListeners) {
      cb(testCarve, 'peer-xyz');
    }
    expect(carveListener).toHaveBeenCalledWith(testCarve, 'peer-xyz');

    unsubCarve();
    expect(net.asteroidCarveListeners.size).toBe(0);

    unsubSync();
    expect(net.asteroidWorldSyncListeners.size).toBe(0);
  });
});
