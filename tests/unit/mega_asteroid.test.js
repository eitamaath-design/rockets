import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { SpaceEnvironment } from '../../src/game/space.js';
import { PlayerShip } from '../../src/game/ship.js';

describe('Persistent Planetary Exploration & Orbital Dogfighting Arena', () => {
  let scene;

  beforeEach(() => {
    scene = new THREE.Scene();
  });

  describe('Central Mega-Asteroid & Keplerian Orbital Belt', () => {
    it('should generate Central Colossus Mega-Asteroid at index 0 at (0,0,0) with R=2800 and stationary velocity', () => {
      const space = new SpaceEnvironment(scene, 42);
      expect(space.asteroids.length).toBeGreaterThan(90);

      const mega = space.asteroids[0];
      expect(mega).toBeDefined();
      expect(mega.isMegaAsteroid).toBe(true);
      expect(mega.radius).toBe(2800);
      expect(mega.position.x).toBe(0);
      expect(mega.position.y).toBe(0);
      expect(mega.position.z).toBe(0);
      expect(mega.velocity.length()).toBe(0);
      expect(mega.hp).toBe(Infinity);

      // Verify stationary persistence across physics update
      space.update(1.0, new THREE.Vector3(0, 80, 3200), new THREE.Vector3());
      expect(mega.position.x).toBe(0);
      expect(mega.position.y).toBe(0);
      expect(mega.position.z).toBe(0);
      expect(mega.velocity.length()).toBe(0);
    });

    it('should generate 90-110 asteroids in the Keplerian orbital belt between R=3300 and 5500', () => {
      const space = new SpaceEnvironment(scene, 12345);
      const beltAsteroids = space.asteroids.slice(1);

      expect(beltAsteroids.length).toBeGreaterThanOrEqual(90);
      expect(beltAsteroids.length).toBeLessThanOrEqual(110);

      // Verify radii and orbital belt distribution
      let smallCount = 0;
      let mediumCount = 0;

      for (const a of beltAsteroids) {
        const orbitR = Math.hypot(a.position.x, a.position.z);
        expect(orbitR).toBeGreaterThanOrEqual(3250);
        expect(orbitR).toBeLessThanOrEqual(5550);

        if (a.radius <= 36) {
          smallCount++;
          expect(a.hp).toBe(20); // Small asteroids have destructible HP
        } else {
          mediumCount++;
          expect(a.radius).toBeGreaterThanOrEqual(38);
        }

        // Tangential orbital velocity: v should have significant tangential component
        const speed = a.velocity.length();
        expect(speed).toBeGreaterThanOrEqual(10);
      }

      expect(smallCount).toBeGreaterThan(0);
      expect(mediumCount).toBeGreaterThan(0);
    });

    it('should maintain stable orbital motion via centripetal steering during update', () => {
      const space = new SpaceEnvironment(scene, 999);
      const beltAsteroid = space.asteroids[1];
      const initialDist = Math.hypot(beltAsteroid.position.x, beltAsteroid.position.z);

      // Step physics 5 seconds
      for (let step = 0; step < 50; step++) {
        space.update(0.1, new THREE.Vector3(0, 80, 3200), new THREE.Vector3());
      }

      const updatedDist = Math.hypot(beltAsteroid.position.x, beltAsteroid.position.z);
      // Must remain comfortably within orbital belt boundaries [3000, 5800]
      expect(updatedDist).toBeGreaterThanOrEqual(3000);
      expect(updatedDist).toBeLessThanOrEqual(5800);
    });
  });

  describe('Through-and-Through Cylindrical Tunnel Carving & Cavity Raycast Penetration', () => {
    it('should carve through-and-through cylindrical tunnel in medium asteroids by displacing vertices radially away from ray axis', () => {
      const space = new SpaceEnvironment(scene, 777);
      // Find a medium asteroid
      const mediumAsteroid = space.asteroids.slice(1).find(a => a.radius >= 40);
      expect(mediumAsteroid).toBeDefined();

      mediumAsteroid.mesh.updateMatrixWorld(true);
      const geom = mediumAsteroid.mesh.geometry;
      const posAttr = geom.attributes.position;
      const initialPos = new Float32Array(posAttr.array);

      // Pierce through the asteroid along Z axis
      const hitPoint = mediumAsteroid.position.clone().add(new THREE.Vector3(0, 0, mediumAsteroid.radius));
      const hitDir = new THREE.Vector3(0, 0, -1);

      space.carveAsteroid(mediumAsteroid, hitPoint, hitDir, 32.0, 36.0);

      // Carving recorded with isThroughTunnel true
      expect(mediumAsteroid.carvings.length).toBeGreaterThan(0);
      const c = mediumAsteroid.carvings[0];
      expect(c.isThroughTunnel).toBe(true);
      expect(c.carveRadius).toBeGreaterThanOrEqual(28.0);
      expect(c.carveRadius).toBeLessThanOrEqual(36.0);

      // Verify vertices moved
      let movedCount = 0;
      for (let i = 0; i < posAttr.array.length; i += 3) {
        const dx = posAttr.array[i] - initialPos[i];
        const dy = posAttr.array[i + 1] - initialPos[i + 1];
        const dz = posAttr.array[i + 2] - initialPos[i + 2];
        if (Math.hypot(dx, dy, dz) > 0.01) {
          movedCount++;
        }
      }
      expect(movedCount).toBeGreaterThan(0);
    });

    it('should allow raycast in checkRayCollision to penetrate through carved tunnel without hitting outer sphere shell', () => {
      const space = new SpaceEnvironment(scene, 111);
      const mediumAsteroid = space.asteroids.slice(1).find(a => a.radius >= 40);
      expect(mediumAsteroid).toBeDefined();
      mediumAsteroid.mesh.updateMatrixWorld(true);

      const astPos = mediumAsteroid.position.clone();
      const r = mediumAsteroid.radius;

      // Carve tunnel straight through the asteroid along X axis
      const hitPoint = astPos.clone().add(new THREE.Vector3(-r, 0, 0));
      const hitDir = new THREE.Vector3(1, 0, 0); // Along +X
      space.carveAsteroid(mediumAsteroid, hitPoint, hitDir, 32.0, 36.0);

      // Cast a ray directly through the tunnel from outside
      const rayOrigin = astPos.clone().add(new THREE.Vector3(-r - 100, 0, 0));
      const rayDir = new THREE.Vector3(1, 0, 0);

      // checkRayCollision should allow ray to pass cleanly through the through-and-through tunnel
      const hit = space.checkRayCollision(rayOrigin, rayDir, 1000.0);
      // Ray passes completely through this asteroid (hit should either be null or hit an asteroid further downfield)
      if (hit) {
        expect(hit.asteroid).not.toBe(mediumAsteroid);
      } else {
        expect(hit).toBeNull();
      }
    });

    it('should grant continuous capsule corridor collision clearance when ship flies through tunnel', () => {
      const space = new SpaceEnvironment(scene, 222);
      const mediumAsteroid = space.asteroids.slice(1).find(a => a.radius >= 40);
      mediumAsteroid.mesh.updateMatrixWorld(true);

      const astPos = mediumAsteroid.position.clone();
      const r = mediumAsteroid.radius;

      // Carve tunnel straight along Z axis
      const hitPoint = astPos.clone().add(new THREE.Vector3(0, 0, r));
      const hitDir = new THREE.Vector3(0, 0, -1);
      space.carveAsteroid(mediumAsteroid, hitPoint, hitDir, 32.0, 36.0);

      // Place ship inside the tunnel corridor along the axis
      const shipInTunnel = hitPoint.clone().addScaledVector(hitDir, r * 0.8);
      const shipVel = new THREE.Vector3(0, 0, -20);

      const col = space.resolveShipCollision(shipInTunnel, shipVel, 2.8, 1200);
      // No collision! Free corridor flight
      expect(col).toBeNull();
    });

    it('should bore deep subterranean caverns into the Central Mega-Asteroid', () => {
      const space = new SpaceEnvironment(scene, 333);
      const mega = space.asteroids[0];
      expect(mega.isMegaAsteroid).toBe(true);

      const hitPoint = mega.position.clone().add(new THREE.Vector3(0, mega.radius, 0));
      const hitDir = new THREE.Vector3(0, -1, 0);

      space.carveAsteroid(mega, hitPoint, hitDir, 45.0, 36.0);

      expect(mega.carvings.length).toBe(1);
      const c = mega.carvings[0];
      expect(c.isThroughTunnel).toBe(false);
      // Mega asteroid caverns are bored deep (>= 120u)
      expect(c.carveDepth).toBeGreaterThanOrEqual(120.0);
    });

    it('should initialize Central Mega-Asteroid with MarchingCubes volumetric density field', () => {
      const space = new SpaceEnvironment(scene, 444);
      const mega = space.asteroids[0];
      expect(mega.mc).toBeDefined();
      expect(mega.mc.isMarchingCubes).toBe(true);
      expect(mega.mc.field).toBeInstanceOf(Float32Array);
      expect(mega.mc.field.length).toBe(32 * 32 * 32);
      expect(mega.mc.isolation).toBe(80);
    });

    it('should support configurable voxelQuality: low (32³), medium (48³), high (64³)', () => {
      const spaceLow = new SpaceEnvironment(scene, 101, { voxelQuality: 'low' });
      expect(spaceLow.megaResolution).toBe(32);
      expect(spaceLow.asteroids[0].mc.resolution).toBe(32);

      const spaceMed = new SpaceEnvironment(scene, 102, { voxelQuality: 'medium' });
      expect(spaceMed.megaResolution).toBe(48);
      expect(spaceMed.asteroids[0].mc.resolution).toBe(48);

      const spaceHigh = new SpaceEnvironment(scene, 103, { voxelQuality: 'high' });
      expect(spaceHigh.megaResolution).toBe(64);
      expect(spaceHigh.asteroids[0].mc.resolution).toBe(64);
    });

    it('should support configurable asteroidCount and megaRadius', () => {
      const spaceCustom = new SpaceEnvironment(scene, 202, { asteroidCount: 50, megaRadius: 1400 });
      expect(spaceCustom.asteroidCount).toBe(50);
      expect(spaceCustom.megaRadius).toBe(1400);
      expect(spaceCustom.asteroids.length).toBe(51); // 1 mega + 50 belt
      expect(spaceCustom.asteroids[0].radius).toBe(1400);
    });

    it('should subtract volumetric density and record carved volume on carveAsteroid', () => {
      const space = new SpaceEnvironment(scene, 303);
      const mega = space.asteroids[0];
      const initialField = new Float32Array(mega.mc.field);

      const hitPoint = mega.position.clone().add(new THREE.Vector3(0, mega.radius * 0.9, 0));
      const hitDir = new THREE.Vector3(0, -1, 0);

      space.carveAsteroid(mega, hitPoint, hitDir, 60.0, 50.0);

      const c = mega.carvings[0];
      expect(c).toBeDefined();
      expect(c.carvedVolume).toBeGreaterThan(0);
      expect(c.carvedCells).toBeGreaterThan(0);

      // Verify density decreased in field
      let decreasedCount = 0;
      for (let i = 0; i < mega.mc.field.length; i++) {
        if (mega.mc.field[i] < initialField[i]) {
          decreasedCount++;
        }
      }
      expect(decreasedCount).toBeGreaterThan(0);
    });

    it('should cleanly dispose all resources in destroy and cleanup', () => {
      const space = new SpaceEnvironment(scene, 555);
      expect(space.asteroids.length).toBeGreaterThan(0);
      expect(scene.children.length).toBeGreaterThan(0);

      space.destroy();
      expect(space.asteroids.length).toBe(0);
      expect(space.debrisList.length).toBe(0);
    });
  });
});
