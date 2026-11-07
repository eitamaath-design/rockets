import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { WeaponsSystem } from '../../src/game/weapons.js';
import { PlayerShip } from '../../src/game/ship.js';

describe('Weapons System: Dual Forward Arsenals (Laser & Cannon)', () => {
  let scene;
  let mockSpaceEnv;
  let mockNetwork;
  let weapons;
  let ship;

  beforeEach(() => {
    scene = new THREE.Scene();
    mockSpaceEnv = {
      checkCollision: () => null,
      carveAsteroid: () => {}
    };
    mockNetwork = {
      selfId: 'pilot-alpha',
      broadcastLaser: () => {},
      broadcastCannon: () => {},
      broadcastDecoy: () => {},
      broadcastMine: () => {},
      sendHitTarget: () => {},
      onLaser: () => () => {},
      onCannon: () => () => {},
      onDecoy: () => () => {},
      onMine: () => () => {}
    };

    weapons = new WeaponsSystem(scene, mockSpaceEnv, mockNetwork);
    const camera = new THREE.PerspectiveCamera();
    ship = new PlayerShip(camera, mockSpaceEnv);
  });

  describe('Primary Directed Laser Beam', () => {
    it('should fire forward laser beam and deplete energy', () => {
      const initialEnergy = weapons.laserEnergy;
      expect(initialEnergy).toBe(100.0);

      weapons.triggerPrimary(true, ship, 1000);
      expect(weapons.lasers.length).toBe(1);
      expect(weapons.laserEnergy).toBeLessThan(initialEnergy);
    });

    it('should break invisibility when firing laser', () => {
      ship.isInvisible = true;
      weapons.triggerPrimary(true, ship, 1000);
      expect(ship.isInvisible).toBe(false);
    });

    it('should deploy Hologram Decoy Clone when decoy power-up is active instead of laser', () => {
      ship.hasHologramDecoy = true;
      expect(weapons.decoys.length).toBe(0);

      weapons.triggerPrimary(true, ship, 1000);
      expect(weapons.decoys.length).toBe(1);
      expect(ship.hasHologramDecoy).toBe(false); // Consumed
      expect(weapons.lasers.length).toBe(0); // Laser was replaced by decoy
    });

    it('should recharge laser energy after cooldown period', () => {
      weapons.triggerPrimary(true, ship, 1000);
      const depleted = weapons.laserEnergy;
      expect(depleted).toBeLessThan(100);

      // In cooldown (0.85s delay)
      weapons.update(0.4, ship, new Map(), () => {});
      expect(weapons.laserEnergy).toBe(depleted);

      // Advance past cooldown into recharge
      weapons.update(0.6, ship, new Map(), () => {});
      expect(weapons.laserEnergy).toBeGreaterThan(depleted);

      // Full recharge
      weapons.update(5.0, ship, new Map(), () => {});
      expect(weapons.laserEnergy).toBe(100.0);
    });
  });

  describe('Secondary Forward Kinetic Cannon', () => {
    it('should fire alternating forward kinetic slugs', () => {
      weapons.triggerSecondary(true, ship, 1000);
      expect(weapons.projectiles.length).toBe(1);
      expect(weapons.cannonEnergy).toBeLessThan(100.0);
    });

    it('should break invisibility when firing cannon', () => {
      ship.isInvisible = true;
      weapons.triggerSecondary(true, ship, 1000);
      expect(ship.isInvisible).toBe(false);
    });

    it('should call carveAsteroid when kinetic projectile hits an asteroid', () => {
      let carved = false;
      const fakeAsteroid = { mesh: new THREE.Mesh(), radius: 30 };
      mockSpaceEnv.checkCollision = () => fakeAsteroid;
      mockSpaceEnv.carveAsteroid = (ast, pos, dir) => {
        expect(ast).toBe(fakeAsteroid);
        carved = true;
      };

      weapons.triggerSecondary(true, ship, 1000);
      expect(weapons.projectiles.length).toBe(1);

      // Update weapons: projectile collides with asteroid
      weapons.update(0.016, ship, new Map(), () => {});
      expect(carved).toBe(true);
      expect(weapons.projectiles.length).toBe(0); // Destroyed on impact
    });
  });
});
