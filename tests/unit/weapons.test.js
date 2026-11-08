import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { WeaponsSystem } from '../../src/game/weapons.js';
import { PlayerShip } from '../../src/game/ship.js';

describe('Weapons System: Laser Beam & Homing Missile with 3-Second Lock', () => {
  let scene;
  let mockSpaceEnv;
  let mockNetwork;
  let weapons;
  let ship;

  beforeEach(() => {
    scene = new THREE.Scene();
    mockSpaceEnv = {
      checkCollision: () => null,
      checkRayCollision: () => null,
      checkRayBlocked: () => false,
      carveAsteroid: () => {}
    };
    mockNetwork = {
      selfId: 'pilot-alpha',
      broadcastLaser: () => {},
      broadcastMissile: () => {},
      broadcastDecoy: () => {},
      broadcastCannon: () => {},
      broadcastMine: () => {},
      sendHitTarget: () => {},
      onLaser: () => () => {},
      onMissile: () => () => {},
      onDecoy: () => () => {},
      onCannon: () => () => {},
      onMine: () => () => {}
    };

    weapons = new WeaponsSystem(scene, mockSpaceEnv, mockNetwork);
    const camera = new THREE.PerspectiveCamera();
    ship = new PlayerShip(camera, mockSpaceEnv);
  });

  describe('Primary Directed Laser Beam', () => {
    it('should fire forward twin laser beams and deplete energy', () => {
      const initialEnergy = weapons.laserEnergy;
      expect(initialEnergy).toBe(100.0);

      weapons.triggerPrimary(true, ship, 1000);
      expect(weapons.laserBeams.length).toBe(1);
      expect(weapons.laserEnergy).toBeLessThan(initialEnergy);
    });

    it('should sustain continuous laser beam fire for approximately 5 seconds', () => {
      expect(weapons.laserEnergy).toBe(100.0);
      // Fire for 5 seconds at 0.08s ticks
      let now = 1000;
      let shots = 0;
      for (let t = 0; t <= 5.0; t += 0.08) {
        now += 80;
        weapons.triggerPrimary(true, ship, now);
        shots++;
      }
      expect(shots).toBeGreaterThanOrEqual(60);
      // Energy should be depleted or near 0 after 5s continuous firing
      expect(weapons.laserEnergy).toBeLessThan(5.0);
    });

    it('should break invisibility when firing laser', () => {
      ship.isInvisible = true;
      weapons.triggerPrimary(true, ship, 1000);
      expect(ship.isInvisible).toBe(false);
    });

    it('should carve asteroid when laser strikes an asteroid', () => {
      let carved = false;
      let carveRadius = 0;
      const fakeAsteroid = { mesh: new THREE.Mesh(), radius: 40 };
      mockSpaceEnv.checkRayCollision = (origin, dir, maxDist) => {
        return {
          asteroid: fakeAsteroid,
          distance: 120,
          hitPoint: new THREE.Vector3(0, 0, 0)
        };
      };
      mockSpaceEnv.carveAsteroid = (ast, pos, dir, radius, depth) => {
        expect(ast).toBe(fakeAsteroid);
        carved = true;
        carveRadius = radius;
      };

      weapons.triggerPrimary(true, ship, 1000);
      expect(carved).toBe(true);
      expect(carveRadius).toBeGreaterThanOrEqual(30.0);
    });

    it('should recharge laser energy after cooldown period', () => {
      weapons.triggerPrimary(true, ship, 1000);
      const depleted = weapons.laserEnergy;
      expect(depleted).toBeLessThan(100);

      // In cooldown delay (0.50s)
      weapons.update(0.3, ship, new Map(), () => {});
      expect(weapons.laserEnergy).toBe(depleted);

      // Advance past cooldown into recharge
      weapons.update(0.5, ship, new Map(), () => {});
      expect(weapons.laserEnergy).toBeGreaterThan(depleted);

      // Full recharge
      weapons.update(5.0, ship, new Map(), () => {});
      expect(weapons.laserEnergy).toBe(100.0);
    });
  });

  describe('Secondary Dual-Mode Missile: Guided with 3s Lock + Unguided Dumb-Fire', () => {
    it('should launch unguided dumb-fire missile straight ahead if target is not locked', () => {
      expect(weapons.lockSystem.isLocked).toBe(false);
      const fired = weapons.triggerSecondary(true, ship, 1000);
      expect(fired).toBe(true);
      expect(weapons.missiles.length).toBe(1);
      expect(weapons.missiles[0].targetId).toBeNull();
    });

    it('should hit remote opponent with unguided dumb-fire missile proximity detonation', () => {
      let hitTargetCalled = false;
      let hitPeer = null;
      let hitDamage = 0;
      mockNetwork.sendHitTarget = (peerId, dmg, type) => {
        hitTargetCalled = true;
        hitPeer = peerId;
        hitDamage = dmg;
      };

      // Spawn unguided dumb-fire missile (targetId = null)
      weapons.spawnMissile(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1), null, true, 'm-dumb');
      expect(weapons.missiles.length).toBe(1);

      // Remote ship positioned directly in path of dumb-fire missile
      const remoteShip = {
        position: new THREE.Vector3(0, 0, -3), // Close within proximity (distSq < 24)
        isDead: false,
        isInvisible: false
      };
      const remoteMap = new Map([['pilot-gamma', remoteShip]]);

      weapons.update(0.016, ship, remoteMap, () => {});
      expect(hitTargetCalled).toBe(true);
      expect(hitPeer).toBe('pilot-gamma');
      expect(hitDamage).toBe(weapons.missileDamage);
      expect(weapons.missiles.length).toBe(0); // Detonated
    });

    it('should track target in forward line-of-sight and lock after 3.0 seconds', () => {
      const remoteShip = {
        position: new THREE.Vector3(0, 0, -200), // Directly ahead
        isDead: false,
        isInvisible: false
      };
      const remoteMap = new Map([['pilot-beta', remoteShip]]);

      // Update lock system over 2.0 seconds -> progress ~67%
      weapons.lockSystem.update(2.0, ship, remoteMap, mockSpaceEnv, ship.camera);
      expect(weapons.lockSystem.isLocked).toBe(false);
      expect(weapons.lockSystem.getProgress()).toBeCloseTo(0.67, 1);

      // Update past 3.0 seconds -> LOCKED!
      weapons.lockSystem.update(1.2, ship, remoteMap, mockSpaceEnv, ship.camera);
      expect(weapons.lockSystem.isLocked).toBe(true);
      expect(weapons.lockSystem.currentTargetId).toBe('pilot-beta');

      // Now firing missile succeeds!
      const fired = weapons.triggerSecondary(true, ship, 1000);
      expect(fired).toBe(true);
      expect(weapons.missiles.length).toBe(1);
      expect(weapons.lockSystem.isLocked).toBe(false); // Consumed
    });

    it('should call carveAsteroid with crater blast when missile hits an asteroid', () => {
      let carved = false;
      const fakeAsteroid = { mesh: new THREE.Mesh(), radius: 35 };
      mockSpaceEnv.checkCollision = () => fakeAsteroid;
      let carveRadius = 0;
      let carveDepth = 0;
      mockSpaceEnv.carveAsteroid = (ast, pos, dir, r, d) => {
        expect(ast).toBe(fakeAsteroid);
        carved = true;
        carveRadius = r;
        carveDepth = d;
      };

      // Force spawn a missile
      weapons.spawnMissile(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1), 'pilot-beta', true, 'm-1');
      expect(weapons.missiles.length).toBe(1);

      // Update: missile collides with asteroid and carves crater
      weapons.update(0.016, ship, new Map(), () => {});
      expect(carved).toBe(true);
      expect(carveRadius).toBeGreaterThanOrEqual(40.0);
      expect(carveDepth).toBeGreaterThanOrEqual(30.0);
      expect(weapons.missiles.length).toBe(0); // Detonated
    });

    it('should deploy Hologram Decoy Clone when requested', () => {
      expect(weapons.decoys.length).toBe(0);
      weapons.deployDecoyClone(ship);
      expect(weapons.decoys.length).toBe(1);
      expect(weapons.decoys[0].speed).toBeGreaterThan(50);
    });
  });
});
