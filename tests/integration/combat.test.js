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
    mockSpaceEnv = { checkCollision: () => null };

    const mockNetwork = {
      selfId: 'pilot-hero',
      broadcastCannon: () => {},
      broadcastMine: () => {},
      sendHitTarget: (targetId, dmg, weapon) => {
        sentHits.push({ targetId, dmg, weapon });
      },
      broadcastKill: (victimId, killerId, name) => {
        sentKills.push({ victimId, killerId, name });
      },
      onCannon: () => () => {},
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

  it('should hit remote opponent with cannon and dispatch hit packet', () => {
    const remotesMap = new Map();
    remotesMap.set('pilot-villain', remoteShip);

    // Spawn a local projectile flying towards remote ship
    const origin = new THREE.Vector3(0, 0, 0);
    const dir = new THREE.Vector3(0, 0, -1);
    weapons.spawnProjectile(origin, dir, new THREE.Vector3(), true, 'shot-1');

    expect(weapons.projectiles.length).toBe(1);

    // Update weapons simulation (projectile flies forward and intersects remote ship bounding area)
    weapons.update(0.12, localShip, remotesMap, () => {});

    // Hit should be detected and packet dispatched to network
    expect(sentHits.length).toBe(1);
    expect(sentHits[0].targetId).toBe('pilot-villain');
    expect(sentHits[0].dmg).toBe(5.0);
  });

  it('should handle victim taking fatal damage, recording death, and granting killer a score boost', () => {
    // Local ship takes lethal damage
    expect(localShip.kills).toBe(0);
    expect(localShip.deaths).toBe(0);
    expect(localShip.score).toBe(0);

    const isFatal = localShip.takeDamage(200);
    expect(isFatal).toBe(true);
    expect(localShip.isDead).toBe(true);
    expect(localShip.deaths).toBe(1);
    expect(localShip.respawnTimer).toBe(3.0);

    // When killer receives kill confirmation:
    localShip.recordKill();
    expect(localShip.kills).toBe(1);
    expect(localShip.score).toBe(100);
  });

  it('should detonate rear mine against trailing pursuer and apply damage', () => {
    // Local ship drops rear mine
    weapons.triggerRearMine(localShip);
    expect(weapons.mines.length).toBe(1);
    const mine = weapons.mines[0];

    // Pursuing remote ship flies close to mine position
    remoteShip.position.copy(mine.pos).add(new THREE.Vector3(0, 0, 3)); // within 8 units proximity

    const remotesMap = new Map();
    remotesMap.set('pilot-villain', remoteShip);

    // Update weapons -> mine detects proximity and explodes!
    weapons.update(0.016, localShip, remotesMap, () => {});
    expect(weapons.mines.length).toBe(0);
    expect(weapons.explosions.length).toBeGreaterThan(0);
    expect(sentHits.some(h => h.targetId === 'pilot-villain' && h.weapon === 'mine')).toBe(true);
  });
});
