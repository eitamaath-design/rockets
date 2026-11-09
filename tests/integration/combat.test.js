import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { PlayerShip } from '../../src/game/ship.js';
import { WeaponsSystem } from '../../src/game/weapons.js';
import { RemoteShip } from '../../src/game/remoteShip.js';

describe('Combat Integration: Multi-Player Engagement', () => {
  let scene;
  let mockSpaceEnv;
  let localShip;
  let remoteShip;
  let weapons;
  let sentHits = [];
  let sentKills = [];

  beforeEach(() => {
    scene = new THREE.Scene();
    mockSpaceEnv = { checkCollision: () => null, carveAsteroid: () => {} };

    const mockNetwork = {
      selfId: 'pilot-hero',
      broadcastLaser: () => {},
      broadcastCannon: () => {},
      broadcastDecoy: () => {},
      broadcastMine: () => {},
      sendHitTarget: (targetId, dmg, weapon) => {
        sentHits.push({ targetId, dmg, weapon });
      },
      broadcastKill: (victimId, killerId, name) => {
        sentKills.push({ victimId, killerId, name });
      },
      onLaser: () => () => {},
      onCannon: () => () => {},
      onDecoy: () => () => {},
      onMine: () => () => {}
    };

    sentHits = [];
    sentKills = [];

    const camera = new THREE.PerspectiveCamera();
    localShip = new PlayerShip(camera, mockSpaceEnv);
    localShip.invulnerableTimer = 0; // combat active

    remoteShip = new RemoteShip('pilot-villain', scene, 'Bandit');
    remoteShip.position.set(0, 0, -20); // 20 units ahead of local ship

    weapons = new WeaponsSystem(scene, mockSpaceEnv, mockNetwork);
  });

  it('should hit remote opponent with laser and dispatch laser hit packet', () => {
    const remotesMap = new Map();
    remotesMap.set('pilot-villain', remoteShip);

    const origin = new THREE.Vector3(0, 0, 0);
    const dir = new THREE.Vector3(0, 0, -1);
    weapons.spawnLaser(origin, dir, true, 'laser-1');

    expect(weapons.lasers.length).toBe(1);

    // Update weapons simulation (laser flies at 160 u/s, dt = 0.15s covers 24u)
    weapons.update(0.15, localShip, remotesMap, () => {});

    // Hit should be detected and packet dispatched
    expect(sentHits.length).toBe(1);
    expect(sentHits[0].targetId).toBe('pilot-villain');
    expect(sentHits[0].weapon).toBe('laser');
    expect(sentHits[0].dmg).toBe(weapons.laserDamage);
  });

  it('should hit remote opponent with cannon and dispatch cannon hit packet', () => {
    const remotesMap = new Map();
    remotesMap.set('pilot-villain', remoteShip);

    const origin = new THREE.Vector3(0, 0, 0);
    const dir = new THREE.Vector3(0, 0, -1);
    weapons.spawnProjectile(origin, dir, new THREE.Vector3(), true, 'shot-1');

    expect(weapons.projectiles.length).toBe(1);

    // Update weapons simulation (projectile flies forward and intersects remote ship bounding area)
    weapons.update(0.12, localShip, remotesMap, () => {});

    // Hit should be detected and packet dispatched to network
    expect(sentHits.length).toBe(1);
    expect(sentHits[0].targetId).toBe('pilot-villain');
    expect(sentHits[0].weapon).toBe('cannon');
    expect(sentHits[0].dmg).toBe(weapons.cannonDamage);
  });

  it('should handle victim taking fatal damage, recording death, and granting killer a score boost', () => {
    expect(localShip.kills).toBe(0);
    expect(localShip.deaths).toBe(0);
    expect(localShip.score).toBe(0);

    const isFatal = localShip.takeDamage(200, 'generic', true);
    expect(isFatal).toBe(true);
    expect(localShip.isDead).toBe(true);
    expect(localShip.deaths).toBe(1);
    expect(localShip.respawnTimer).toBe(3.0);

    // When killer receives kill confirmation:
    localShip.recordKill();
    expect(localShip.kills).toBe(1);
    expect(localShip.score).toBe(100);
  });
});
