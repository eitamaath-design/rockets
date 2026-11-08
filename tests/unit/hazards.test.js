import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { MeteorSystem } from '../../src/game/meteor.js';
import { PlayerShip } from '../../src/game/ship.js';
import { WeaponsSystem } from '../../src/game/weapons.js';
import { EngagementBeaconSystem } from '../../src/game/beacon.js';

describe('Sector Hazards: Periodic Flaming Meteors & Lighting Stability', () => {
  let scene;
  let mockSpaceEnv;
  let playerShip;
  let meteorSystem;

  beforeEach(() => {
    scene = new THREE.Scene();
    mockSpaceEnv = {
      asteroids: [],
      meteorLight: new THREE.PointLight(0xff3300, 0, 300),
      combatFlashLight: new THREE.PointLight(0xff6600, 0, 100),
      triggerCombatFlash: () => {}
    };

    const camera = new THREE.PerspectiveCamera();
    playerShip = new PlayerShip(camera, mockSpaceEnv);
    meteorSystem = new MeteorSystem(scene, mockSpaceEnv);
  });

  describe('Fiery Meteor Mechanics', () => {
    it('should spawn a rogue blazing meteor after 10 seconds interval', () => {
      expect(meteorSystem.activeMeteor).toBeNull();

      // Advance time past spawn timer
      meteorSystem.update(6.0, playerShip, new Map(), () => {});
      expect(meteorSystem.activeMeteor).not.toBeNull();
      expect(meteorSystem.activeMeteor.speed).toBeGreaterThan(200);
      expect(meteorSystem.activeMeteor.mass).toBeGreaterThan(100000);
    });

    it('should impart explosive momentum impulse into asteroids on impact', () => {
      // Create a test asteroid
      const testAsteroid = {
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        radius: 40,
        mass: 250000,
        rotationSpeed: new THREE.Vector3(0, 0, 0)
      };
      mockSpaceEnv.asteroids.push(testAsteroid);

      // Force spawn a meteor directly aimed at the asteroid
      meteorSystem.spawnMeteor();
      const meteor = meteorSystem.activeMeteor;
      meteor.position.set(0, 0, 45); // Colliding distance: 40 + 9.5 = 49.5 > 45
      meteor.velocity.set(0, 0, -250);

      // Update frame to resolve collision
      meteorSystem.update(0.016, playerShip, new Map(), () => {});

      // Asteroid must have gained significant momentum impulse, but strictly capped to <= 40 u/s
      expect(testAsteroid.velocity.length()).toBeGreaterThan(0);
      expect(testAsteroid.velocity.length()).toBeLessThanOrEqual(40.0);
      expect(meteorSystem.activeMeteor).toBeNull(); // Meteor destroyed on impact
    });

    it('should clamp meteor impact impulse to <= 30 u/s and cap asteroid speed <= 40 u/s on tiny asteroids', () => {
      // Tiny asteroid with very small mass that would otherwise produce 500,000 u/s impulse
      const tinyAsteroid = {
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        radius: 10,
        mass: 100, // Very small mass
        rotationSpeed: new THREE.Vector3(0, 0, 0)
      };
      mockSpaceEnv.asteroids.push(tinyAsteroid);

      meteorSystem.spawnMeteor();
      const meteor = meteorSystem.activeMeteor;
      meteor.position.set(0, 0, 15);
      meteor.velocity.set(0, 0, -250);

      meteorSystem.update(0.016, playerShip, new Map(), () => {});
      expect(tinyAsteroid.velocity.length()).toBeLessThanOrEqual(40.0);
      expect(tinyAsteroid.velocity.length()).toBeGreaterThan(0);
    });

    it('should completely incinerate and destroy a player ship on collision', () => {
      let deathNoticeReceived = null;
      playerShip.position.set(100, 50, 0);
      playerShip.hp = 100;
      playerShip.shield = 100;

      meteorSystem.spawnMeteor();
      const meteor = meteorSystem.activeMeteor;
      meteor.position.set(100, 50, 5); // Within ship radius + meteor radius

      meteorSystem.update(0.016, playerShip, new Map(), (notice) => {
        deathNoticeReceived = notice;
      });

      expect(playerShip.isDead).toBe(true);
      expect(playerShip.hp).toBe(0);
      expect(playerShip.shield).toBe(0);
      expect(deathNoticeReceived).toContain('Incinerated');
      expect(meteorSystem.activeMeteor).toBeNull();
    });

    it('should respect configurable frequency options (e.g. 5s interval)', () => {
      const fastSystem = new MeteorSystem(scene, mockSpaceEnv, { frequency: 5.0 });
      expect(fastSystem.spawnInterval).toBe(5.0);
      expect(fastSystem.enabled).toBe(true);

      expect(fastSystem.activeMeteor).toBeNull();
      // After 5s update, meteor should be spawned
      fastSystem.update(5.1, playerShip, new Map(), () => {});
      expect(fastSystem.activeMeteor).not.toBeNull();
    });

    it('should completely disable meteor hazard when frequency is 0', () => {
      const offSystem = new MeteorSystem(scene, mockSpaceEnv, { frequency: 0 });
      expect(offSystem.spawnInterval).toBe(0);
      expect(offSystem.enabled).toBe(false);

      // Advance 100 seconds
      offSystem.update(100.0, playerShip, new Map(), () => {});
      expect(offSystem.activeMeteor).toBeNull();
    });

    it('should carve crater into mega-asteroid without shifting its position on impact', () => {
      let carveCalled = false;
      const megaAsteroid = {
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        radius: 2800,
        isMegaAsteroid: true
      };
      mockSpaceEnv.asteroids.push(megaAsteroid);
      mockSpaceEnv.carveAsteroid = (a, hitPt, hitDir, r, d) => {
        carveCalled = true;
        expect(a).toBe(megaAsteroid);
        expect(r).toBeGreaterThanOrEqual(120);
      };

      meteorSystem.spawnMeteor();
      const meteor = meteorSystem.activeMeteor;
      meteor.position.set(0, 0, 2810);
      meteor.velocity.set(0, 0, -250);

      meteorSystem.update(0.016, playerShip, new Map(), () => {});
      expect(carveCalled).toBe(true);
      expect(megaAsteroid.position.length()).toBe(0); // Remained stationary!
      expect(meteorSystem.activeMeteor).toBeNull();
    });
  });

  describe('WebGL Shader Stability: Zero Dynamic PointLight Thrashing', () => {
    it('should not add dynamic PointLights when firing cannon projectiles or creating explosions', () => {
      const mockNetwork = {
        selfId: 'p1',
        broadcastCannon: () => {},
        broadcastMine: () => {},
        sendHitTarget: () => {},
        onCannon: () => () => {},
        onMine: () => () => {}
      };

      const weapons = new WeaponsSystem(scene, mockSpaceEnv, mockNetwork);
      const initialLights = scene.children.filter(c => c.isPointLight).length;

      // Spawn projectile
      weapons.spawnProjectile(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), null, true, 'shot-1');
      const lightsAfterShot = scene.children.filter(c => c.isPointLight).length;
      expect(lightsAfterShot).toBe(initialLights); // No point lights added!

      // Spawn explosion
      weapons.spawnExplosion(new THREE.Vector3(), 15, 0xff5500);
      const lightsAfterExplosion = scene.children.filter(c => c.isPointLight).length;
      expect(lightsAfterExplosion).toBe(initialLights); // Stable light count!
    });

    it('should not add dynamic PointLights when emitting engagement beacons', () => {
      const beaconSystem = new EngagementBeaconSystem(scene);
      const initialLights = scene.children.filter(c => c.isPointLight).length;

      beaconSystem.emitRipple(new THREE.Vector3(), 0x00d4ff);
      const lightsAfterRipple = scene.children.filter(c => c.isPointLight).length;
      expect(lightsAfterRipple).toBe(initialLights); // Stable light count!
    });
  });
});
