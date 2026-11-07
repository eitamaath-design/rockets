import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { WeaponsSystem } from '../../src/game/weapons.js';
import { PlayerShip } from '../../src/game/ship.js';

describe('Weapons System: Cannon & Rear Mines', () => {
  let scene;
  let mockSpaceEnv;
  let mockNetwork;
  let weapons;
  let ship;

  beforeEach(() => {
    scene = new THREE.Scene();
    mockSpaceEnv = {
      checkCollision: () => null
    };
    mockNetwork = {
      selfId: 'pilot-alpha',
      broadcastCannon: () => {},
      broadcastMine: () => {},
      sendHitTarget: () => {},
      onCannon: () => () => {},
      onMine: () => () => {}
    };

    weapons = new WeaponsSystem(scene, mockSpaceEnv, mockNetwork);
    const camera = new THREE.PerspectiveCamera();
    ship = new PlayerShip(camera, mockSpaceEnv);
  });

  describe('Front Firing Cannon', () => {
    it('should fire while button is held and deplete energy', () => {
      const initialEnergy = weapons.cannonEnergy;
      expect(initialEnergy).toBe(100.0);

      // Fire cannon at t = 0
      weapons.triggerCannon(true, ship, 1000);
      expect(weapons.projectiles.length).toBe(1);
      expect(weapons.cannonEnergy).toBeLessThan(initialEnergy);
    });

    it('should satisfy TTK of exactly 2.0 seconds if all shots hit', () => {
      // 10 shots per second * 2 seconds = 20 shots
      // Each shot deals 5 damage: 20 * 5 = 100 HP (full player health)
      const shotsInTwoSeconds = (1.0 / weapons.cannonFireInterval) * 2.0;
      const totalDamageInTwoSeconds = shotsInTwoSeconds * weapons.cannonDamage;

      expect(shotsInTwoSeconds).toBe(20);
      expect(weapons.cannonDamage).toBe(5.0);
      expect(totalDamageInTwoSeconds).toBe(100.0); // Exactly 100 HP in 2.0s!
    });

    it('should recharge automatically after 1.0s cooldown without needing to be completely empty', () => {
      // Fire a single shot to partially deplete ammo (from 100 to 97.2)
      weapons.triggerCannon(true, ship, 1000);
      const depletedVal = weapons.cannonEnergy;
      expect(depletedVal).toBeLessThan(100);
      expect(weapons.cannonCooldownTimer).toBe(1.0); // 1s cooldown initialized

      // Stop firing for 0.5s: still in cooldown, no recharge yet
      weapons.update(0.5, ship, new Map(), () => {});
      expect(weapons.cannonCooldownTimer).toBe(0.5);
      expect(weapons.cannonEnergy).toBe(depletedVal);

      // Advance another 0.6s: cooldown timer expires (<= 0), recharge begins!
      weapons.update(0.6, ship, new Map(), () => {});
      expect(weapons.cannonCooldownTimer).toBe(0);
      expect(weapons.cannonEnergy).toBeGreaterThan(depletedVal);

      // After sufficient time, refills completely to 100%
      weapons.update(4.0, ship, new Map(), () => {});
      expect(weapons.cannonEnergy).toBe(100.0);
    });
  });

  describe('Rear End Mine Discharge', () => {
    it('should have max 2 charges', () => {
      expect(weapons.mineCharges).toBe(2);
      expect(weapons.mineMaxCharges).toBe(2);
    });

    it('should apply forward thrust to ship and spawn mine at ship position on discharge', () => {
      ship.position.set(50, 0, 100);
      ship.velocity.set(0, 0, 0);

      const fired = weapons.triggerRearMine(ship);
      expect(fired).toBe(true);
      expect(weapons.mineCharges).toBe(1);

      // Ship must receive forward impulse
      expect(ship.velocity.length()).toBeGreaterThan(0);

      // Mine is spawned in scene near ship release coordinates
      expect(weapons.mines.length).toBe(1);
      const spawnedMine = weapons.mines[0];
      expect(spawnedMine.pos.distanceTo(new THREE.Vector3(50, 0, 100))).toBeLessThan(3.0);
    });

    it('should detonate after 3.0 seconds fuse timer', () => {
      weapons.triggerRearMine(ship);
      expect(weapons.mines.length).toBe(1);

      // Ship moves away in space
      ship.position.set(0, 0, 500);

      // Advance 2.8 seconds in small realistic ticks: mine still alive
      for (let t = 0; t < 28; t++) {
        weapons.update(0.1, ship, new Map(), () => {});
      }
      expect(weapons.mines.length).toBe(1);

      // Advance past 3.0s fuse -> detonates!
      weapons.update(0.3, ship, new Map(), () => {});
      expect(weapons.mines.length).toBe(0);
    });

    it('should detonate when another player enters proximity', () => {
      weapons.triggerRearMine(ship);
      const mine = weapons.mines[0];

      // Local ship thrusts away
      ship.position.set(0, 0, 500);

      // Pursuing opponent flies into mine proximity radius
      const remote = {
        position: mine.pos.clone(),
        isDead: false
      };
      const remotesMap = new Map([['pilot-pursuer', remote]]);

      weapons.update(0.016, ship, remotesMap, () => {});
      expect(weapons.mines.length).toBe(0);
    });

    it('should auto-recharge mine charges over time back to 2', () => {
      weapons.triggerRearMine(ship);
      weapons.triggerRearMine(ship);
      expect(weapons.mineCharges).toBe(0);

      // Advance recharge time
      weapons.update(weapons.mineRechargeTime + 0.1, ship, new Map(), () => {});
      expect(weapons.mineCharges).toBe(1);

      weapons.update(weapons.mineRechargeTime + 0.1, ship, new Map(), () => {});
      expect(weapons.mineCharges).toBe(2);
    });
  });
});
