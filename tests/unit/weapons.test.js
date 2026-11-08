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

    it('should break invisibility when firing laser', () => {
      ship.isInvisible = true;
      weapons.triggerPrimary(true, ship, 1000);
      expect(ship.isInvisible).toBe(false);
    });

    it('should carve asteroid when laser strikes an asteroid', () => {
      let carved = false;
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
      };

      weapons.triggerPrimary(true, ship, 1000);
      expect(carved).toBe(true);
    });

    it('should recharge laser energy after cooldown period', () => {
      weapons.triggerPrimary(true, ship, 1000);
      const depleted = weapons.laserEnergy;
      expect(depleted).toBeLessThan(100);

      // In cooldown delay (0.70s)
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

  describe('Secondary Homing Missile & 3-Second Target Lock', () => {
    it('should reject firing missile if target is not locked', () => {
      expect(weapons.lockSystem.isLocked).toBe(false);
      const fired = weapons.triggerSecondary(true, ship, 1000);
      expect(fired).toBe(false);
      expect(weapons.missiles.length).toBe(0);
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
      mockSpaceEnv.carveAsteroid = (ast, pos, dir, r, d) => {
        expect(ast).toBe(fakeAsteroid);
        carved = true;
      };

      // Force spawn a missile
      weapons.spawnMissile(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1), 'pilot-beta', true, 'm-1');
      expect(weapons.missiles.length).toBe(1);

      // Update: missile collides with asteroid and carves crater
      weapons.update(0.016, ship, new Map(), () => {});
      expect(carved).toBe(true);
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
