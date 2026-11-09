import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { SpaceEnvironment } from '../../src/game/space.js';
import { PlayerShip } from '../../src/game/ship.js';
import { WeaponsSystem } from '../../src/game/weapons.js';
import { logger } from '../../src/utils/logger.js';

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

    it('should initialize Central Mega-Asteroid with MarchingCubes volumetric density field and solid core', () => {
      const space = new SpaceEnvironment(scene, 444);
      const mega = space.asteroids[0];
      expect(mega.mc).toBeDefined();
      expect(mega.mc.isMarchingCubes).toBe(true);
      expect(mega.mc.field).toBeInstanceOf(Float32Array);
      expect(mega.mc.field.length).toBe(32 * 32 * 32);
      expect(mega.mc.isolation).toBe(40.0);

      // Solid core density at center >= 70 (nominal 100)
      const half = mega.mc.halfsize;
      const centerDensity = mega.mc.getCell(half, half, half);
      expect(centerDensity).toBeGreaterThanOrEqual(70);

      // maxPolys buffer allocation >= 100000 for mega colossus, >= 30000 for belt asteroids
      expect(mega.mc.maxPolys).toBeGreaterThanOrEqual(100000);
      const beltAsteroid = space.asteroids[1];
      expect(beltAsteroid.mc.maxPolys).toBeGreaterThanOrEqual(30000);

      // mc.scale.x is approximately radius / 0.80
      expect(mega.mc.scale.x).toBeCloseTo(mega.radius / 0.80, 1);
      expect(beltAsteroid.mc.scale.x).toBeCloseTo(beltAsteroid.radius / 0.80, 1);
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

    it('should support multi-shot progressive laser tunnel drilling advancing hit distance deeper with each carve', () => {
      const space = new SpaceEnvironment(scene, 123);
      const mega = space.asteroids[0];
      expect(mega.isMegaAsteroid).toBe(true);

      const rayOrigin = new THREE.Vector3(0, 0, 5600);
      const rayDir = new THREE.Vector3(0, 0, -1);

      // Shot 1: hits outer surface of Mega Asteroid
      const hit1 = space.checkRayCollision(rayOrigin, rayDir, 7000.0);
      expect(hit1).not.toBeNull();
      expect(hit1.asteroid).toBe(mega);
      const dist1 = hit1.distance;

      // Carve at hit 1 point forward along rayDir
      space.carveAsteroid(mega, hit1.hitPoint, rayDir, 45.0, 36.0);

      // Shot 2: ray penetrates into the carved tunnel and strikes deeper solid rock
      const hit2 = space.checkRayCollision(rayOrigin, rayDir, 7000.0);
      expect(hit2).not.toBeNull();
      expect(hit2.asteroid).toBe(mega);
      const dist2 = hit2.distance;
      expect(dist2).toBeGreaterThan(dist1 + 30.0);

      // Carve at hit 2 point
      space.carveAsteroid(mega, hit2.hitPoint, rayDir, 45.0, 36.0);

      // Shot 3: penetrates even deeper
      const hit3 = space.checkRayCollision(rayOrigin, rayDir, 7000.0);
      expect(hit3).not.toBeNull();
      expect(hit3.asteroid).toBe(mega);
      const dist3 = hit3.distance;
      expect(dist3).toBeGreaterThan(dist2 + 30.0);
    });

    it('should enforce boundary safety with D === 0 on all outer boundary faces of mc.field to eliminate flat cube clipping', () => {
      const space = new SpaceEnvironment(scene, 456);
      const mega = space.asteroids[0];
      const res = mega.mc.resolution;

      for (let z = 0; z < res; z++) {
        for (let y = 0; y < res; y++) {
          for (let x = 0; x < res; x++) {
            if (x === 0 || x === res - 1 || y === 0 || y === res - 1 || z === 0 || z === res - 1) {
              const d = mega.mc.getCell(x, y, z);
              expect(d).toBe(0);
            }
          }
        }
      }
    });

    it('should initialize MarchingCubes with enableColors true and populate mc.palette with geological strata', () => {
      const space = new SpaceEnvironment(scene, 789);
      const mega = space.asteroids[0];
      expect(mega.mc.enableColors).toBe(true);
      expect(mega.mc.palette).toBeInstanceOf(Float32Array);
      expect(mega.mc.palette.length).toBe(mega.mc.resolution ** 3 * 3);

      // Verify non-zero color channels across the palette
      let hasColors = false;
      for (let i = 0; i < mega.mc.palette.length; i++) {
        if (mega.mc.palette[i] > 0.05) {
          hasColors = true;
          break;
        }
      }
      expect(hasColors).toBe(true);
    });

    it('should guarantee core density excavation (isosurfaceCrossed === true, voxelsModified > 0) across all 3 voxel quality presets (low, medium, high)', () => {
      const presets = ['low', 'medium', 'high'];
      for (const preset of presets) {
        const testScene = new THREE.Scene();
        const space = new SpaceEnvironment(testScene, 888, { voxelQuality: preset });
        const mega = space.asteroids[0];
        expect(mega.isMegaAsteroid).toBe(true);

        const rayOrigin = new THREE.Vector3(0, 0, 4000);
        const rayDir = new THREE.Vector3(0, 0, -1);
        const hit = space.checkRayCollision(rayOrigin, rayDir, 6000.0);
        expect(hit).not.toBeNull();
        expect(hit.asteroid).toBe(mega);

        const result = space.carveAsteroid(mega, hit.hitPoint, rayDir, 60.0, 50.0);
        expect(result.voxelsModified).toBeGreaterThan(0);
        expect(result.isosurfaceCrossed).toBe(true);
        expect(result.isosurfaceCrossedCount).toBeGreaterThan(0);
        expect(result.totalDensityDelta).toBeGreaterThan(0);
        expect(result.isMega).toBe(true);
        expect(result.reason).toBe('ok');
        space.destroy();
      }
    });

    it('should return structured carveResult metadata from carveAsteroid and damageAsteroid', () => {
      const space = new SpaceEnvironment(scene, 1122);
      const mega = space.asteroids[0];

      const hitPoint = new THREE.Vector3(0, 0, 2750);
      const hitDir = new THREE.Vector3(0, 0, -1);

      const carveResult = space.carveAsteroid(mega, hitPoint, hitDir, 60.0, 50.0, 160.0);
      expect(carveResult).toHaveProperty('voxelsModified');
      expect(carveResult).toHaveProperty('isosurfaceCrossed');
      expect(carveResult).toHaveProperty('isosurfaceCrossedCount');
      expect(carveResult).toHaveProperty('totalDensityDelta');
      expect(carveResult).toHaveProperty('maxDensityDelta');
      expect(carveResult).toHaveProperty('carveRadius');
      expect(carveResult).toHaveProperty('carveDepth');
      expect(carveResult).toHaveProperty('isMega', true);
      expect(carveResult).toHaveProperty('reason', 'ok');

      const dmgResult = space.damageAsteroid(mega, 45.0, hitPoint, hitDir, 60.0, 50.0, 160.0);
      expect(dmgResult.destroyed).toBe(false);
      expect(dmgResult.asteroid).toBe(mega);
      expect(dmgResult.carveResult).toBeDefined();
      expect(dmgResult.carveResult.voxelsModified).toBeGreaterThanOrEqual(0);
      expect(dmgResult.carveResult.isMega).toBe(true);
    });

    it('should provide narrowphase density checkCollision clearance allowing missiles to fly inside carved tunnels', () => {
      const space = new SpaceEnvironment(scene, 3344);
      const mega = space.asteroids[0];

      const startOrigin = new THREE.Vector3(0, 0, 3500);
      const rayDir = new THREE.Vector3(0, 0, -1);
      const hit1 = space.checkRayCollision(startOrigin, rayDir, 5000.0);
      expect(hit1).not.toBeNull();

      // Carve a deep shaft at the surface
      const carveRes = space.carveAsteroid(mega, hit1.hitPoint, rayDir, 60.0, 100.0, 160.0);
      expect(carveRes.isosurfaceCrossed).toBe(true);

      // Point inside the tunnel corridor (past the outer surface radius R=2800, but in hollow carved air)
      const tunnelCorridorPoint = hit1.hitPoint.clone().addScaledVector(rayDir, 40.0);
      expect(tunnelCorridorPoint.length()).toBeLessThan(mega.radius);

      // In the carved air, checkCollision should return null (free flight clearance!)
      const missileInsideTunnel = space.checkCollision(tunnelCorridorPoint, 1.8);
      expect(missileInsideTunnel).toBeNull();

      // Deep solid rock point far past the excavation should return the asteroid
      const solidRockPoint = hit1.hitPoint.clone().addScaledVector(rayDir, 600.0);
      const missileInSolidRock = space.checkCollision(solidRockPoint, 1.8);
      expect(missileInSolidRock).toBe(mega);
    });

    it('should record structured CARVE and WEAPON_HIT telemetry logs in logger.logs for every impact', () => {
      logger.logs = [];
      const space = new SpaceEnvironment(scene, 5566);
      const weapons = new WeaponsSystem(scene, space, null);
      const ship = new PlayerShip(scene);
      ship.position.set(0, 0, 3400);
      ship.quaternion.set(0, 0, 0, 1); // facing -Z towards mega-asteroid at (0,0,0)

      weapons.triggerPrimary(true, ship, performance.now());

      const hitLogs = logger.logs.filter(l => l.includes('[WEAPON_HIT]'));
      const carveLogs = logger.logs.filter(l => l.includes('[CARVE]'));

      expect(hitLogs.length).toBeGreaterThan(0);
      expect(carveLogs.length).toBeGreaterThan(0);

      // Verify payload of WEAPON_HIT log
      const hitEntry = hitLogs[hitLogs.length - 1];
      expect(hitEntry).toContain('"weapon":"laser"');
      expect(hitEntry).toContain('"isMega":true');
      expect(hitEntry).toContain('"voxelsModified":');
      expect(hitEntry).toContain('"isosurfaceCrossed":');

      // Verify diagnostic report includes the telemetry section
      const report = logger.generateDiagnosticReport();
      expect(report).toContain('--- Recent Weapon & Excavation Telemetry (Last 25 Events) ---');
      expect(report).toContain('[WEAPON_HIT]');
    });

    it('should support complete through-tunnel drilling simulation penetrating through to the far side of Mega-Asteroid', () => {
      // Use low resolution for fast headless simulation
      const space = new SpaceEnvironment(scene, 7788, { voxelQuality: 'low' });
      const mega = space.asteroids[0];

      const rayOrigin = new THREE.Vector3(0, 0, 4000);
      const rayDir = new THREE.Vector3(0, 0, -1);

      let prevDist = 0;
      let breakthrough = false;

      // Repeatedly fire laser/carve through the colossus
      for (let shot = 0; shot < 35; shot++) {
        const hit = space.checkRayCollision(rayOrigin, rayDir, 10000.0);
        if (!hit || hit.asteroid !== mega) {
          // Ray passed completely through the asteroid!
          breakthrough = true;
          break;
        }

        expect(hit.distance).toBeGreaterThanOrEqual(prevDist);
        prevDist = hit.distance;

        // Bore deep forward
        const res = space.carveAsteroid(mega, hit.hitPoint, rayDir, 60.0, 80.0, 160.0);
        expect(res.voxelsModified).toBeGreaterThan(0);
      }

      expect(breakthrough).toBe(true);
      // Now a ray cast from (0, 0, 4000) straight down (0, 0, -1) sees clear space all the way through!
      const postHit = space.checkRayCollision(rayOrigin, rayDir, 10000.0);
      if (postHit) {
        expect(postHit.asteroid).not.toBe(mega);
      } else {
        expect(postHit).toBeNull();
      }
    });

    it('should require 5 progressive fracture hits (stages 1 -> 2 -> 3 -> 4 -> 5) via damageAsteroid / fractureAsteroid before excavating a rock part', () => {
      const space = new SpaceEnvironment(scene, 9090, { voxelQuality: 'low', asteroidCount: 10 });
      const mega = space.asteroids[0];
      expect(mega.mc.crackField).toBeInstanceOf(Float32Array);
      expect(mega.mc.basePalette).toBeInstanceOf(Float32Array);
      expect(Array.isArray(mega.crackZones)).toBe(true);

      const rayOrigin = new THREE.Vector3(0, 0, 4000);
      const rayDir = new THREE.Vector3(0, 0, -1);
      const hit = space.checkRayCollision(rayOrigin, rayDir, 6000.0);
      expect(hit).not.toBeNull();
      const impactPt = hit.hitPoint.clone();

      // Track average palette luminance in modified voxels across stages 1 to 4
      const getZonePaletteLuma = () => {
        let sum = 0;
        let count = 0;
        for (let i = 0; i < mega.mc.crackField.length; i++) {
          if (mega.mc.crackField[i] > 0) {
            const pIdx = i * 3;
            sum += mega.mc.palette[pIdx] * 0.299 + mega.mc.palette[pIdx + 1] * 0.587 + mega.mc.palette[pIdx + 2] * 0.114;
            count++;
          }
        }
        return count > 0 ? sum / count : 1.0;
      };

      let prevLuma = 1.0;
      for (let stage = 1; stage <= 4; stage++) {
        const dmgRes = space.damageAsteroid(mega, 45.0, impactPt, rayDir, 60.0, 50.0, 160.0);
        expect(dmgRes.destroyed).toBe(false);
        expect(dmgRes.cracked).toBe(true);
        expect(dmgRes.carved).toBe(false);
        expect(dmgRes.crackStage).toBe(stage);
        expect(dmgRes.carveResult.crackStage).toBe(stage);
        expect(dmgRes.carveResult.maxCrackStage).toBe(5);
        expect(dmgRes.carveResult.isosurfaceCrossed).toBe(false);
        expect(dmgRes.carveResult.excavated).toBe(false);
        expect(dmgRes.carveResult.voxelsModified).toBeGreaterThan(0);

        expect(space.getCrackStageAt(mega, impactPt)).toBe(stage);

        const curLuma = getZonePaletteLuma();
        expect(curLuma).toBeLessThan(prevLuma);
        prevLuma = curLuma;
      }

      // 5th shot at the same zone excavates the rock volume and removes the crack zone!
      const shot5Res = space.damageAsteroid(mega, 45.0, impactPt, rayDir, 60.0, 50.0, 160.0);
      expect(shot5Res.destroyed).toBe(false);
      expect(shot5Res.cracked).toBe(false);
      expect(shot5Res.carved).toBe(true);
      expect(shot5Res.crackStage).toBe(5);
      expect(shot5Res.carveResult.crackStage).toBe(5);
      expect(shot5Res.carveResult.excavated).toBe(true);
      expect(shot5Res.carveResult.isosurfaceCrossed).toBe(true);
      expect(mega.crackZones.length).toBe(0);
    });
  });
});
