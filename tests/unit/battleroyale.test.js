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
    });
  });
});
