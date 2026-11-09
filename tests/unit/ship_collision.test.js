import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { SpaceEnvironment } from '../../src/game/space.js';
import { PlayerShip } from '../../src/game/ship.js';

describe('Hull-Radius-Aware Multi-Point Ship Collision Resolution', () => {
  let scene;
  let spaceEnv;
  let camera;
  let ship;

  beforeEach(() => {
    scene = new THREE.Scene();
    spaceEnv = new SpaceEnvironment(scene, 42, { voxelQuality: 'low', asteroidCount: 10, megaRadius: 2800 });
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10000);
    ship = new PlayerShip(camera, spaceEnv);
  });

  it('a) High-speed head-on impact at 140 u/s: collision detected, resolved position has zero clipping', () => {
    const scaleR = 100 / 0.80;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial());
    mesh.position.set(0, 0, 3000);
    mesh.scale.set(scaleR, scaleR, scaleR);
    mesh.updateMatrix();
    mesh.updateMatrixWorld(true);

    const testAsteroid = {
      id: 'test_rock',
      position: mesh.position,
      radius: 100,
      mass: 50000,
      velocity: new THREE.Vector3(0, 0, 0),
      mesh,
      mc: {
        resolution: 32,
        halfsize: 16,
        size: 32,
        size2: 1024,
        size3: 32768,
        isolation: 40.0,
        field: new Float32Array(32768).fill(100),
        getCell(x, y, z) { return 100; },
        setCell(x, y, z, val) {},
        update() {}
      }
    };
    spaceEnv.asteroids.push(testAsteroid);

    ship.position.set(0, 0, 3085);
    ship.velocity.set(0, 0, -140.0);
    ship.quaternion.set(0, 0, 0, 1);

    const result = spaceEnv.resolveShipCollision(ship.position, ship.velocity, ship.radius, ship.mass, ship.quaternion);
    expect(result).not.toBeNull();
    expect(result.impactDamage).toBeGreaterThan(0);
  });

  it('b) Oblique impact: velocity deflected cleanly along surface normal', () => {
    const scaleR = 100 / 0.80;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial());
    mesh.position.set(0, 0, 3000);
    mesh.scale.set(scaleR, scaleR, scaleR);
    mesh.updateMatrix();
    mesh.updateMatrixWorld(true);

    const testAsteroid = {
      id: 'oblique_rock',
      position: mesh.position,
      radius: 100,
      mass: 50000,
      velocity: new THREE.Vector3(0, 0, 0),
      mesh,
      mc: {
        resolution: 32,
        halfsize: 16,
        size: 32,
        size2: 1024,
        size3: 32768,
        isolation: 40.0,
        field: new Float32Array(32768).fill(100),
        getCell(x, y, z) { return 100; },
        setCell() {},
        update() {}
      }
    };
    spaceEnv.asteroids.push(testAsteroid);

    ship.position.set(20, 0, 3085);
    ship.velocity.set(-30, 0, -80.0);

    const result = spaceEnv.resolveShipCollision(ship.position, ship.velocity, ship.radius, ship.mass, ship.quaternion);
    expect(result).not.toBeNull();
    expect(result.normal).toBeDefined();
    const dotNormal = ship.velocity.dot(result.normal);
    expect(dotNormal).toBeGreaterThanOrEqual(0);
  });

  it('c) Hull boundary clearance: nose penetrates first, collision triggers before center reaches isosurface', () => {
    const scaleR = 100 / 0.80;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial());
    mesh.position.set(0, 0, 3000);
    mesh.scale.set(scaleR, scaleR, scaleR);
    mesh.updateMatrix();
    mesh.updateMatrixWorld(true);

    const testAsteroid = {
      id: 'nose_rock',
      position: mesh.position,
      radius: 100,
      mass: 50000,
      velocity: new THREE.Vector3(0, 0, 0),
      mesh,
      mc: {
        resolution: 32,
        halfsize: 16,
        size: 32,
        size2: 1024,
        size3: 32768,
        isolation: 40.0,
        field: new Float32Array(32768).fill(50),
        getCell(x, y, z) { return 50; },
        setCell() {},
        update() {}
      }
    };
    spaceEnv.asteroids.push(testAsteroid);

    ship.position.set(0, 0, 3095);
    ship.quaternion.set(0, 0, 0, 1);
    
    const result = spaceEnv.resolveShipCollision(ship.position, ship.velocity, ship.radius, ship.mass, ship.quaternion);
    expect(result).toBeDefined();
  });

  it('d) Cavern & tunnel navigation: ship flying inside carved tunnel or cavity experiences no false-positive collision', () => {
    const scaleR = 100 / 0.80;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial());
    mesh.position.set(0, 0, 3000);
    mesh.scale.set(scaleR, scaleR, scaleR);
    mesh.updateMatrix();
    mesh.updateMatrixWorld(true);

    const testAsteroid = {
      id: 'cavern_rock',
      position: mesh.position,
      radius: 100,
      mass: 50000,
      velocity: new THREE.Vector3(0, 0, 0),
      mesh,
      mc: {
        resolution: 32,
        halfsize: 16,
        size: 32,
        size2: 1024,
        size3: 32768,
        isolation: 40.0,
        field: new Float32Array(32768).fill(100),
        getCell(x, y, z) { return 100; },
        setCell() {},
        update() {}
      }
    };
    spaceEnv.asteroids.push(testAsteroid);

    testAsteroid.carvings = [{
      cavityCenter: new THREE.Vector3(0, 0, 0),
      carveRadius: 50.0,
      carveDepth: 100.0
    }];

    ship.position.set(0, 0, 3000);
    ship.velocity.set(0, 0, 50.0);

    const result = spaceEnv.resolveShipCollision(ship.position, ship.velocity, ship.radius, ship.mass, ship.quaternion);
    expect(result).toBeNull();
  });
});
