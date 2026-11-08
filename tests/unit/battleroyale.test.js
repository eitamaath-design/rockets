import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { BlackHoleSystem } from '../../src/game/blackhole.js';
import { PowerUpSystem, POWERUP_TYPES } from '../../src/game/powerups.js';
import { SpaceEnvironment } from '../../src/game/space.js';
import { PlayerShip } from '../../src/game/ship.js';

describe('Battle Royale Mechanics: Black Hole, Safe Zone & Tactical Power-Ups', () => {
  let scene;
  let mockSpaceEnv;
  let blackHole;
  let powerups;
  let ship;

  beforeEach(() => {
    scene = new THREE.Scene();
    mockSpaceEnv = {
      asteroids: [],
      checkCollision: () => null
    };

    blackHole = new BlackHoleSystem(scene, mockSpaceEnv);
    powerups = new PowerUpSystem(scene, blackHole);
    const camera = new THREE.PerspectiveCamera();
    ship = new PlayerShip(camera, mockSpaceEnv);
    ship.invulnerableTimer = 0;
  });

  describe('Black Hole & Safe Zone Contraction', () => {
    it('should start with initial safe zone radius of 1100u and shrink to 120u over 10 minutes', () => {
      expect(blackHole.getSafeRadius()).toBeCloseTo(1100, 0);

      // Advance by 300 seconds (5 minutes, halfway through match)
      blackHole.update(300, ship, new Map(), null, () => {});
      expect(blackHole.getSafeRadius()).toBeLessThan(1100);
      expect(blackHole.getSafeRadius()).toBeGreaterThan(120);

      // Advance to full 600 seconds (10 minutes)
      blackHole.update(300, ship, new Map(), null, () => {});
      expect(blackHole.getSafeRadius()).toBeCloseTo(120, 0);
    });

    it('should exert gravitational pull on entities pulling them towards the singularity', () => {
      // Advance black hole position and place ship 200 units away along Z
      blackHole.update(0.016, ship, new Map(), null, () => {});
      ship.position.copy(blackHole.position).add(new THREE.Vector3(0, 0, 200));
      ship.velocity.set(0, 0, 0);

      // Update black hole physics
      blackHole.update(1.0, ship, new Map(), null, () => {});

      // Gravitational acceleration must pull ship towards blackHole.position
      expect(ship.velocity.z).toBeLessThan(0);
    });

    it('should instantly devour and eliminate ships that cross the event horizon', () => {
      let deathNotice = null;
      // First update to initialize singularity trajectory position
      blackHole.update(0.016, ship, new Map(), null, () => {});

      // Place ship directly at the event horizon of the singularity
      ship.position.copy(blackHole.position).add(new THREE.Vector3(0, 0, 10));

      blackHole.update(0.016, ship, new Map(), null, (notice) => {
        deathNotice = notice;
      });

      expect(ship.isDead).toBe(true);
      expect(ship.hp).toBe(0);
      expect(deathNotice).toContain('Black Hole');
    });

    it('should support 6-argument signature with spaceEnv and meteorSystem without TypeError', () => {
      let deathNotice = null;
      blackHole.update(0.016, ship, new Map(), mockSpaceEnv, null, () => {});

      // Position ship inside singularity event horizon
      ship.isDead = false;
      ship.hp = 100;
      ship.position.copy(blackHole.position);

      const fakeMeteorSystem = { destroyMeteor: () => {} };

      // 6-argument update call
      expect(() => {
        blackHole.update(0.016, ship, new Map(), mockSpaceEnv, fakeMeteorSystem, (notice) => {
          deathNotice = notice;
        });
      }).not.toThrow();

      expect(ship.isDead).toBe(true);
      expect(deathNotice).toContain('Black Hole');
    });
  });

  describe('Tactical Power-Ups (10s Spawns, 60s Lifetime)', () => {
    it('should spawn power-up entities and expire them after 60s', () => {
      expect(powerups.powerups.length).toBe(0);

      // Advance past full spawn interval (10.0s) in small 1s steps
      for (let i = 0; i < 11; i++) {
        powerups.update(1.0, null, () => {});
      }
      expect(powerups.powerups.length).toBe(1);

      const p = powerups.powerups[0];
      expect(p.maxLife).toBe(60.0);
      expect(p.life).toBeGreaterThan(50.0);

      // Advance 45 seconds: still alive
      for (let i = 0; i < 45; i++) {
        powerups.update(1.0, null, () => {});
      }
      expect(powerups.powerups.some(item => item === p)).toBe(true);

      // Advance past 60s total: expired and removed from scene
      for (let i = 0; i < 20; i++) {
        powerups.update(1.0, null, () => {});
      }
      expect(powerups.powerups.some(item => item === p)).toBe(false);
    });

    it('should collect Shield Replenish and store it, then activate upon use', () => {
      ship.shield = 0;
      ship.isShieldBroken = true;

      powerups.applyPowerUp(POWERUP_TYPES.SHIELD_REPAIR, ship, () => {});
      expect(ship.storedPowerUp).toBeDefined();
      expect(ship.storedPowerUp.type).toBe(POWERUP_TYPES.SHIELD_REPAIR);

      ship.useSpecialPowerUp();
      expect(ship.shield).toBe(100);
      expect(ship.isShieldBroken).toBe(false);
      expect(ship.storedPowerUp).toBeNull();
    });

    it('should collect Cloaking Invisibility and store it, then grant 60s stealth upon use', () => {
      expect(ship.isInvisible).toBe(false);

      powerups.applyPowerUp(POWERUP_TYPES.INVISIBILITY, ship, () => {});
      expect(ship.storedPowerUp.type).toBe(POWERUP_TYPES.INVISIBILITY);

      ship.useSpecialPowerUp();
      expect(ship.isInvisible).toBe(true);
      expect(ship.invisibilityTimer).toBe(60.0);
      expect(ship.storedPowerUp).toBeNull();
    });

    it('should collect Hologram Decoy Clone powerup and store it, then deploy upon use', () => {
      let deployed = false;
      const fakeEngine = {
        weaponsSystem: {
          deployDecoyClone: () => { deployed = true; }
        }
      };

      powerups.applyPowerUp(POWERUP_TYPES.HOLOGRAM_CLONE, ship, () => {});
      expect(ship.storedPowerUp.type).toBe(POWERUP_TYPES.HOLOGRAM_CLONE);

      ship.useSpecialPowerUp(fakeEngine);
      expect(deployed).toBe(true);
      expect(ship.storedPowerUp).toBeNull();
    });
  });

  describe('Asteroid Dynamic Carving', () => {
    it('should deform asteroid geometry at impact point allowing players to dig through asteroids', () => {
      const space = new SpaceEnvironment(scene, 12345);
      const asteroid = space.asteroids[0];
      expect(asteroid).toBeDefined();

      // Ensure matrixWorld is updated
      asteroid.mesh.updateMatrixWorld(true);

      const geom = asteroid.mesh.geometry;
      const posAttr = geom.attributes.position;
      const initialPos = new Float32Array(posAttr.array);

      // Strike the surface of the asteroid
      const hitPoint = asteroid.position.clone().add(new THREE.Vector3(asteroid.radius, 0, 0));
      const hitDir = new THREE.Vector3(1, 0, 0);

      space.carveAsteroid(asteroid, hitPoint, hitDir, asteroid.radius * 0.8, 15.0);

      // Verify at least one vertex was displaced inward
      let vertexMoved = false;
      for (let i = 0; i < posAttr.array.length; i++) {
        if (Math.abs(posAttr.array[i] - initialPos[i]) > 0.001) {
          vertexMoved = true;
          break;
        }
      }
      expect(vertexMoved).toBe(true);

      // Verify carving metadata is tracked
      expect(asteroid.carvings).toBeDefined();
      expect(asteroid.carvings.length).toBeGreaterThan(0);
      expect(asteroid.carvings[0].carveRadius).toBe(asteroid.radius * 0.8);
    });

    it('should grant flight collision clearance when ship is inside a carved crater cavity', () => {
      const space = new SpaceEnvironment(scene, 999);
      const asteroid = space.asteroids[0];
      asteroid.mesh.updateMatrixWorld(true);

      // Carve deep tunnel into the asteroid
      const hitPoint = asteroid.position.clone().add(new THREE.Vector3(asteroid.radius, 0, 0));
      const hitDir = new THREE.Vector3(-1, 0, 0); // Carve inward
      space.carveAsteroid(asteroid, hitPoint, hitDir, 35.0, 25.0);

      expect(asteroid.carvings.length).toBe(1);

      // Place ship directly inside the carved cavern cavity
      const shipInCavityPos = hitPoint.clone().addScaledVector(hitDir, 10.0);
      const shipVelocity = new THREE.Vector3(0, 0, 0);

      // resolveShipCollision should detect the ship is inside carved cavity and allow flight (no collision bounce)
      const collision = space.resolveShipCollision(shipInCavityPos, shipVelocity, 2.8, 1200);
      expect(collision).toBeNull();
    });

    it('should debounce collision damage on ship so consecutive frames do not inflict multi-frame lethal grinds', () => {
      const space = new SpaceEnvironment(scene, 888);
      ship.spaceEnv = space;
      ship.invulnerableTimer = 0;
      ship.hp = 100;
      ship.shield = 100;

      const asteroid = space.asteroids[0];
      // Position ship right on the uncarved asteroid perimeter
      ship.position.copy(asteroid.position).add(new THREE.Vector3(asteroid.radius + 1.0, 0, 0));
      ship.velocity.set(-15, 0, 0); // Moving into asteroid

      // Frame 1: collision occurs and inflicts damage
      ship.handleAsteroidCollisions();
      const hpAfterFirst = ship.hp + ship.shield;
      expect(hpAfterFirst).toBeLessThan(200);
      expect(ship.asteroidImpactDebounceTimer).toBeGreaterThan(0);

      // Frame 2 (immediate consecutive frame, dt=0.016s): debounce prevents damage
      ship.velocity.set(-15, 0, 0);
      ship.handleAsteroidCollisions();
      const hpAfterSecond = ship.hp + ship.shield;
      expect(hpAfterSecond).toBe(hpAfterFirst); // No duplicate damage!
    });

    it('should generate Central Colossus Mega-Asteroid at (0,0,0) with R=2800 and Keplerian orbital belt with Poisson-spaced non-overlap', () => {
      const space = new SpaceEnvironment(scene, 12345);
      const mega = space.asteroids[0];
      expect(mega.radius).toBe(2800);
      expect(mega.position.x).toBe(0);
      expect(mega.position.y).toBe(0);
      expect(mega.position.z).toBe(0);
      expect(mega.isMegaAsteroid).toBe(true);

      const belt = space.asteroids.slice(1);
      expect(belt.length).toBeGreaterThanOrEqual(90);
      expect(belt.length).toBeLessThanOrEqual(110);

      // Verify orbital belt radius range [3300, 5500]
      for (const a of belt) {
        const orbitR = Math.hypot(a.position.x, a.position.z);
        expect(orbitR).toBeGreaterThanOrEqual(3250);
        expect(orbitR).toBeLessThanOrEqual(5550);
      }

      // Verify pairwise non-overlap across all belt asteroids
      for (let i = 0; i < belt.length; i++) {
        const a1 = belt[i];
        for (let j = i + 1; j < belt.length; j++) {
          const a2 = belt[j];
          const dist = a1.position.distanceTo(a2.position);
          expect(dist).toBeGreaterThanOrEqual(a1.radius + a2.radius + 15.0);
        }
      }
    });

    it('should manage destructible HP for small asteroids and disintegrate them via damageAsteroid', () => {
      const space = new SpaceEnvironment(scene, 42);
      const smallAsteroids = space.asteroids.filter(a => a.radius <= 42.0);
      expect(smallAsteroids.length).toBeGreaterThan(0);

      const target = smallAsteroids[0];
      expect(target.hp).toBe(20);

      // Tick 1-3: deals damage without destroying
      const hitPoint = target.position.clone();
      const hitDir = new THREE.Vector3(0, 0, 1);
      const res1 = space.damageAsteroid(target, 5, hitPoint, hitDir);
      expect(res1.destroyed).toBe(false);
      expect(target.hp).toBe(15);

      // Finish off asteroid with remaining damage
      const res2 = space.damageAsteroid(target, 15, hitPoint, hitDir);
      expect(res2.destroyed).toBe(true);
      expect(space.asteroids.includes(target)).toBe(false);
      expect(space.asteroidGroup.children.includes(target.mesh)).toBe(false);
    });

    it('should safely detach swallowed asteroids from asteroidGroup in Black Hole devour', () => {
      const space = new SpaceEnvironment(scene, 77);
      const blackHole = new BlackHoleSystem(scene);
      const a = space.asteroids[0];

      // Position black hole directly at the asteroid
      blackHole.startPosition.copy(a.position);
      blackHole.targetPosition.copy(a.position);
      blackHole.position.copy(a.position);
      const initialCount = space.asteroids.length;

      blackHole.update(0.016, ship, new Map(), space, null, () => {});
      expect(space.asteroids.length).toBe(initialCount - 1);
      expect(space.asteroidGroup.children.includes(a.mesh)).toBe(false);
    });
  });
});
