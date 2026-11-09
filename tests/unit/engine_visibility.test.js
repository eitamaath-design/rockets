import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { RemoteShip } from '../../src/game/remoteShip.js';
import { ThrusterTrailSystem } from '../../src/game/trail.js';
import { PlayerShip } from '../../src/game/ship.js';

describe('Long-Distance Engine Visibility & Dynamic Nozzle Flares', () => {
  let scene;
  let camera;

  beforeEach(() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 12000);
    camera.position.set(0, 0, 0);
  });

  describe('RemoteShip Engine Nozzle Flares & Idle Reactor Glow', () => {
    let remote;

    beforeEach(() => {
      remote = new RemoteShip('peer-bogey-1', scene, 'RedBaron');
    });

    it('should create dual rear nozzle core flares and directional exhaust plumes with additive blending', () => {
      expect(remote.coreFlares.length).toBe(2);
      expect(remote.engineFlares.length).toBe(2);

      for (const core of remote.coreFlares) {
        expect(core).toBeInstanceOf(THREE.Mesh);
        expect(core.material.blending).toBe(THREE.AdditiveBlending);
        expect(core.material.transparent).toBe(true);
      }

      for (const plume of remote.engineFlares) {
        expect(plume).toBeInstanceOf(THREE.Mesh);
        expect(plume.material.blending).toBe(THREE.AdditiveBlending);
        expect(plume.material.transparent).toBe(true);
      }
    });

    it('should display soft idle reactor glow when coasting (thrust = false)', () => {
      remote.position.set(0, 0, 100);
      remote.isThrusting = false;
      remote.update(0.016, camera);

      const state = remote.getEngineFlareState();
      expect(state.isThrusting).toBe(false);
      // Plume cone should be retracted when idle
      expect(state.plumeScale).toBeLessThan(0.01);
      // Core nozzle glow should be actively visible for deep space identification
      expect(state.coreScale).toBeGreaterThan(0.4);
      expect(remote.coreFlares[0].visible).toBe(true);
      expect(remote.coreFlares[0].material.opacity).toBeCloseTo(0.55, 2);
    });

    it('should amplify flare size and core opacity during active thrust', () => {
      remote.position.set(0, 0, 100);
      remote.isThrusting = true;
      remote.update(0.016, camera);

      const state = remote.getEngineFlareState();
      expect(state.isThrusting).toBe(true);
      // Both plume cone and core flare should scale up
      expect(state.plumeScale).toBeGreaterThan(1.0);
      expect(state.coreScale).toBeGreaterThan(0.9);
      expect(remote.engineFlares[0].visible).toBe(true);
      expect(remote.coreFlares[0].material.opacity).toBeCloseTo(0.95, 2);
    });

    it('should hide all engine flares and core beacons when ship is destroyed', () => {
      remote.isDead = true;
      remote.update(0.016, camera);

      expect(remote.group.visible).toBe(false);
      for (const flare of remote.engineFlares) {
        expect(flare.visible).toBe(false);
      }
      for (const core of remote.coreFlares) {
        expect(core.visible).toBe(false);
      }
    });

    it('should scale engine flares adaptively with standoff distance up to 3500u', () => {
      // 1. Close-up formation (dist = 20u): distScale = 1.0 (no overblown blinding)
      remote.position.set(0, 0, 20);
      remote.isThrusting = false;
      remote.update(0.016, camera);
      const closeCoreScale = remote.getEngineFlareState().coreScale;

      // 2. Medium standoff (dist = 500u): distScale should expand significantly
      remote.position.set(0, 0, 500);
      remote.update(0.016, camera);
      const midCoreScale = remote.getEngineFlareState().coreScale;
      expect(midCoreScale).toBeGreaterThan(closeCoreScale * 2.0);

      // 3. Maximum orbital standoff range (dist = 3000u): should reach distance cap (<= 8.0x)
      remote.position.set(0, 0, 3000);
      remote.update(0.016, camera);
      const farCoreScale = remote.getEngineFlareState().coreScale;
      expect(farCoreScale).toBeGreaterThan(midCoreScale);
      expect(farCoreScale).toBeLessThanOrEqual(closeCoreScale * 8.5);
    });
  });

  describe('ThrusterTrailSystem Standoff Visibility & Dynamic Sizing', () => {
    let trails;

    beforeEach(() => {
      trails = new ThrusterTrailSystem(scene);
    });

    it('should initialize trail particles with enhanced base size (>= 3.0u)', () => {
      trails.emit(new THREE.Vector3(0, 0, 10), new THREE.Vector3(0, 0, -1), false, 'p1', false);
      expect(trails.particles.length).toBe(1);
      const p = trails.particles[0];
      expect(p.baseScale).toBeGreaterThanOrEqual(3.0);
    });

    it('should spawn larger plumes during evasive boost (>= 4.6u)', () => {
      trails.emit(new THREE.Vector3(0, 0, 10), new THREE.Vector3(0, 0, -1), false, 'p-boost', true);
      const p = trails.particles[0];
      expect(p.baseScale).toBeGreaterThanOrEqual(4.6);
    });

    it('should apply camera-distance scale compensation to distant trail quads', () => {
      // Emit particle at z = 1000u (standoff combat range)
      trails.emit(new THREE.Vector3(0, 0, 1000), new THREE.Vector3(0, 0, -1), false, 'far-ship');
      camera.position.set(0, 0, 0);

      trails.update(0.1, camera);

      const mat = new THREE.Matrix4();
      trails.mesh.getMatrixAt(0, mat);
      const pos = new THREE.Vector3();
      const rot = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      mat.decompose(pos, rot, scale);

      // Base scale (~3.5u) multiplied by distFactor (~2.5x) should yield scale.x > 7.0u
      expect(scale.x).toBeGreaterThan(6.0);
    });
  });

  describe('PlayerShip Nozzle Geometry & Engine State Helpers', () => {
    let player;

    beforeEach(() => {
      player = new PlayerShip(camera, null);
    });

    it('should provide symmetrical left and right nozzle positions behind ship hull', () => {
      player.position.set(100, 50, -200);
      const nozzles = player.getNozzlePositions();
      expect(nozzles.left).toBeInstanceOf(THREE.Vector3);
      expect(nozzles.right).toBeInstanceOf(THREE.Vector3);

      // Distance between dual nozzles should be ~0.96u
      const nozzleSeparation = nozzles.left.distanceTo(nozzles.right);
      expect(nozzleSeparation).toBeCloseTo(0.96, 2);

      // Nozzles should be positioned aft of player center
      const centerToLeft = nozzles.left.clone().sub(player.position);
      expect(centerToLeft.z).toBeGreaterThan(2.0);
    });

    it('should accurately report engine thrust and boosting states', () => {
      let state = player.getEngineState();
      expect(state.thrust).toBe(false);
      expect(state.speed).toBe(0);
      expect(state.isBoosting).toBe(false);

      player.input.thrust = true;
      player.velocity.set(0, 0, -50);
      state = player.getEngineState();
      expect(state.thrust).toBe(true);
      expect(state.speed).toBe(50);
    });
  });
});
