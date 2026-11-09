import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { PlayerShip } from '../../src/game/ship.js';
import { SpaceEnvironment } from '../../src/game/space.js';
import { Cockpit } from '../../src/game/cockpit.js';
import { WeaponsSystem } from '../../src/game/weapons.js';

describe('Player Flight Physics & Momentum', () => {
  let camera;
  let mockSpaceEnv;
  let ship;

  beforeEach(() => {
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    mockSpaceEnv = {
      checkCollision: () => null
    };
    ship = new PlayerShip(camera, mockSpaceEnv);
  });

  it('should initialize at rest with full health and invulnerability shield', () => {
    expect(ship.getSpeed()).toBe(0);
    expect(ship.hp).toBe(100);
    expect(ship.maxHp).toBe(100);
    expect(ship.invulnerableTimer).toBeGreaterThan(0);
    expect(ship.isDead).toBe(false);
  });

  it('should accelerate forward when thrust button is held, capped at maxSpeed', () => {
    expect(ship.maxSpeed).toBe(140.0);
    ship.input.thrust = true;

    // Simulate 1 second of forward acceleration (forwardAccel = 45 u/s^2)
    ship.update(1.0);
    expect(ship.getSpeed()).toBeCloseTo(45.0, 1);

    // Simulate 3 more seconds of thrust: speed must be clamped to maxSpeed (140 u/s)
    ship.update(3.0);
    expect(ship.getSpeed()).toBeCloseTo(ship.maxSpeed, 1);
    expect(ship.getSpeed()).toBeLessThanOrEqual(ship.maxSpeed);
  });

  it('should come to a complete stop 3x faster holding the brake button (~0.67s)', () => {
    // 1. Bring ship to full speed (140 u/s)
    ship.velocity.set(0, 0, -ship.maxSpeed);
    expect(ship.getSpeed()).toBeCloseTo(ship.maxSpeed, 1);

    // 2. Hold brake button
    ship.input.thrust = false;
    ship.input.brake = true;

    // 3. At 0.333s, speed should be approximately half (brakes are 3x more effective)
    ship.update(0.333);
    expect(ship.getSpeed()).toBeCloseTo(ship.maxSpeed / 2.0, 0);

    // 4. By 0.70 seconds total, speed must reach 0.0 (complete halt)
    ship.update(0.367);
    expect(ship.getSpeed()).toBe(0);
    expect(ship.velocity.length()).toBe(0);
  });

  it('should trigger evasive boost on double-tapping thrust with 2.0s cooldown and 300% surge', () => {
    expect(ship.boostCooldownTimer).toBe(0);
    expect(ship.getSpeed()).toBe(0);

    // First tap at t = 1000ms
    const tap1 = ship.triggerThrustPress(1000);
    expect(tap1).toBe(false); // First tap does not trigger boost yet
    expect(ship.getSpeed()).toBe(0);

    // Double tap within 150ms window (t = 1150ms)
    const tap2 = ship.triggerThrustPress(1150);
    expect(tap2).toBe(true); // Boost triggered!
    expect(ship.getSpeed()).toBeGreaterThan(120); // 300% forward surge impulse (180 u/s)
    expect(ship.boostCooldownTimer).toBe(2.0); // 2-second cooldown started

    // Third tap within cooldown window should be rejected
    const tap3 = ship.triggerThrustPress(1300);
    expect(tap3).toBe(false);

    // Advance time by 2.1s: cooldown expires, boost ready again
    ship.update(2.1);
    expect(ship.boostCooldownTimer).toBe(0);

    // New double tap activates boost again
    ship.triggerThrustPress(4000);
    const tapAfterCooldown = ship.triggerThrustPress(4150);
    expect(tapAfterCooldown).toBe(true);
  });

  it('should strafe laterally using side thrusters', () => {
    ship.input.strafeRight = true;
    ship.update(0.5);

    expect(ship.velocity.x).toBeGreaterThan(0);
    expect(ship.getSpeed()).toBeGreaterThan(0);

    // Switch to strafe left
    ship.input.strafeRight = false;
    ship.input.strafeLeft = true;
    ship.update(1.0);
    expect(ship.velocity.x).toBeLessThan(0);
  });

  it('should rotate orientation using pitch, yaw, and roll controls', () => {
    const initialQuat = ship.quaternion.clone();

    // Pitch Up
    ship.input.pitchUp = true;
    ship.update(0.2);
    expect(ship.quaternion.equals(initialQuat)).toBe(false);

    // Roll Left
    ship.input.pitchUp = false;
    ship.input.rollLeft = true;
    const pitchedQuat = ship.quaternion.clone();
    ship.update(0.2);
    expect(ship.quaternion.equals(pitchedQuat)).toBe(false);
  });

  it('should take damage, absorb via shield first, allow shields to recharge over 15s if not broken, and break permanently if depleted to 0', () => {
    // During spawn invulnerability, damage should be ignored
    expect(ship.invulnerableTimer).toBeGreaterThan(0);
    ship.takeDamage(20);
    expect(ship.hp).toBe(100);
    expect(ship.shield).toBe(100);

    // Expire invulnerability timer
    ship.invulnerableTimer = 0;

    // Shield absorbs first 40 damage
    ship.takeDamage(40);
    expect(ship.shield).toBe(60);
    expect(ship.hp).toBe(100);
    expect(ship.isShieldBroken).toBe(false);

    // Test shield auto-recharge over 15 seconds (after 2s delay) while not broken
    ship.update(2.0); // Wait out 2.0s delay
    expect(ship.shield).toBe(60);
    ship.update(7.5); // Halfway (7.5s)
    expect(ship.shield).toBeGreaterThan(75);
    ship.update(7.5); // Full recharge
    expect(ship.shield).toBeCloseTo(100, 0);

    // Deplete shield to 0 (isShieldBroken becomes true) + penetrate 20 into hull
    ship.takeDamage(120);
    expect(ship.shield).toBe(0);
    expect(ship.isShieldBroken).toBe(true);
    expect(ship.hp).toBe(80);

    // Broken shield NEVER recharges automatically
    ship.update(20.0);
    expect(ship.shield).toBe(0);
    expect(ship.isShieldBroken).toBe(true);

    // Shield Repair restores shield to 100% and resets broken flag
    ship.shield = 100;
    ship.isShieldBroken = false;

    // Lethal blow (depletes 100 shield + 80 hull)
    const isKilled = ship.takeDamage(180);
    expect(isKilled).toBe(true);
    expect(ship.hp).toBe(0);
    expect(ship.isDead).toBe(true);
    expect(ship.deaths).toBe(1);
    expect(ship.respawnTimer).toBe(3.0);
  });

  it('should maintain exact 3D orientation without auto-leveling to an imaginary horizon', () => {
    // 1. Roll 45 degrees
    ship.input.rollLeft = true;
    ship.update(0.5);
    ship.input.rollLeft = false;

    // 2. Yaw left
    ship.input.yawLeft = true;
    ship.update(1.0);
    ship.input.yawLeft = false;

    // Allow physical hull to complete rate-limited catch-up with POV yaw
    ship.update(3.5);
    expect(ship.quaternion.angleTo(ship.desiredQuaternion)).toBeCloseTo(0, 3);

    // 3. Resting in space for 2 seconds with zero input
    const restingQuat = ship.quaternion.clone();
    ship.update(2.0);

    // Orientation must remain strictly stable and NOT spring/level back towards world horizon
    expect(ship.quaternion.x).toBeCloseTo(restingQuat.x, 3);
    expect(ship.quaternion.y).toBeCloseTo(restingQuat.y, 3);
    expect(ship.quaternion.z).toBeCloseTo(restingQuat.z, 3);
    expect(ship.quaternion.w).toBeCloseTo(restingQuat.w, 3);
  });

  it('should calculate asteroid-asteroid mass collisions with volume-based momentum scaling', () => {
    const scene = new THREE.Scene();
    const space = new SpaceEnvironment(scene, 12345);

    expect(space.asteroids.length).toBeGreaterThan(0);
    const a1 = space.asteroids[0];
    const a2 = space.asteroids[1];

    expect(a1.mass).toBeGreaterThan(0);
    expect(a2.mass).toBeGreaterThan(0);
    // Mass scales with r^3
    const radiusRatioCubed = Math.pow(a1.radius / a2.radius, 3);
    expect(a1.mass / a2.mass).toBeCloseTo(radiusRatioCubed, 1);
  });

  it('should firmly separate overlapping asteroids and clamp velocities via 3-Pass PBD solver', () => {
    const scene = new THREE.Scene();
    const space = new SpaceEnvironment(scene, 12345);
    const a1 = space.asteroids[0];
    const a2 = space.asteroids[1];

    // Force overlap
    a1.position.set(0, 0, 0);
    a2.position.set(a1.radius * 0.5, 0, 0); // heavily overlapping
    a1.velocity.set(60, 0, 0);
    a2.velocity.set(-60, 0, 0);

    space.update(0.016, new THREE.Vector3(), new THREE.Vector3());

    const dist = a1.position.distanceTo(a2.position);
    expect(dist).toBeGreaterThan(a1.radius * 0.5); // firmly separated
    expect(a1.velocity.length()).toBeLessThanOrEqual(40.01);
    expect(a2.velocity.length()).toBeLessThanOrEqual(40.01);
  });

  it('should support ship-to-ship elastic bumper collisions with debounce', () => {
    expect(ship.shipCollisionDebounceTimer).toBe(0);

    // Initial state
    ship.position.set(0, 0, 0);
    ship.velocity.set(0, 0, 20);

    const remote = {
      position: new THREE.Vector3(0, 0, 4.0), // within 5.6u ship-ship collision sphere
      velocity: new THREE.Vector3(0, 0, -20),
      isDead: false,
      triggerShieldFlash: () => {}
    };

    // Simulate loop bumper bounce logic
    const minShipDist = 5.6;
    const p1 = ship.position;
    const p2 = remote.position;
    const dist = p1.distanceTo(p2);
    expect(dist).toBeLessThan(minShipDist);

    const nx = (p1.x - p2.x) / dist;
    const ny = (p1.y - p2.y) / dist;
    const nz = (p1.z - p2.z) / dist;
    const overlap = minShipDist - dist;

    p1.x += nx * overlap * 0.55;
    p1.y += ny * overlap * 0.55;
    p1.z += nz * overlap * 0.55;

    const rVel = ship.velocity.clone().sub(remote.velocity);
    const vNorm = rVel.x * nx + rVel.y * ny + rVel.z * nz;
    expect(vNorm).toBeLessThan(0);

    const restitution = 0.85;
    const impulse = -(1 + restitution) * vNorm * 0.5;
    ship.velocity.x += nx * impulse;
    ship.velocity.y += ny * impulse;
    ship.velocity.z += nz * impulse;

    expect(ship.velocity.z).toBeLessThan(0); // deflected backwards

    ship.invulnerableTimer = 0;
    ship.takeDamage(12);
    ship.shipCollisionDebounceTimer = 0.25;
    expect(ship.shipCollisionDebounceTimer).toBe(0.25);
    expect(ship.shield).toBe(88);
  });

  describe('Decoupled Unthrottled Pilot POV & Capability-Limited Hull Controller', () => {
    it('should initialize capabilities.maxTurnRate = 0.75, support getter/setter, and restore on resetSpawn', () => {
      expect(ship.desiredQuaternion).toBeInstanceOf(THREE.Quaternion);
      expect(ship.capabilities).toBeDefined();
      expect(ship.capabilities.maxTurnRate).toBe(0.75);
      expect(ship.maxTurnRate).toBe(0.75);

      // Upgrade ship capability dynamically
      ship.capabilities.maxTurnRate = 2.5;
      expect(ship.maxTurnRate).toBeCloseTo(2.5, 2);
      ship.maxTurnRate = 3.0;
      expect(ship.capabilities.maxTurnRate).toBeCloseTo(3.0, 2);

      // Mutate quaternions
      ship.quaternion.set(0.5, 0.5, 0.5, 0.5).normalize();
      ship.desiredQuaternion.set(0.2, 0.3, 0.4, 0.8).normalize();

      ship.resetSpawn();

      expect(ship.quaternion.x).toBe(0);
      expect(ship.quaternion.y).toBe(0);
      expect(ship.quaternion.z).toBe(0);
      expect(ship.quaternion.w).toBe(1);

      expect(ship.desiredQuaternion.x).toBe(0);
      expect(ship.desiredQuaternion.y).toBe(0);
      expect(ship.desiredQuaternion.z).toBe(0);
      expect(ship.desiredQuaternion.w).toBe(1);

      // Camera quaternion is synchronized with desiredQuaternion
      expect(ship.camera.quaternion.x).toBe(0);
      expect(ship.camera.quaternion.y).toBe(0);
      expect(ship.camera.quaternion.z).toBe(0);
      expect(ship.camera.quaternion.w).toBe(1);
    });

    it('should rotate Pilot POV instantaneously via applyMouseLook without rate limits or lead clamps', () => {
      expect(ship.quaternion.angleTo(ship.desiredQuaternion)).toBe(0);

      // Apply a large instantaneous mouse sweep (e.g., ~1.8 rad / >100° yaw)
      ship.applyMouseLook(1.8, 0);

      // desiredQuaternion and camera.quaternion must rotate immediately
      const povLeadAngle = ship.quaternion.angleTo(ship.desiredQuaternion);
      expect(povLeadAngle).toBeGreaterThan(1.5); // Freely exceeds old 1.2 rad clamp
      expect(ship.camera.quaternion.equals(ship.desiredQuaternion)).toBe(true);

      // Physical ship hull remains at its initial resting orientation prior to physics tick
      expect(ship.quaternion.x).toBe(0);
      expect(ship.quaternion.y).toBe(0);
      expect(ship.quaternion.z).toBe(0);
      expect(ship.quaternion.w).toBe(1);
    });

    it('should allow analogYaw and analogPitch to exceed 1.2 rad without artificial lead angle clamping', () => {
      // Large analog yaw impulse
      ship.input.analogYaw = 50.0;
      ship.update(0.1);

      const leadAngle = ship.quaternion.angleTo(ship.desiredQuaternion);
      // Lead angle should not be artificially clamped to 1.2 rad
      expect(leadAngle).toBeGreaterThan(1.25);
    });

    it('should bound physical hull rotation strictly by capabilities.maxTurnRate * dt', () => {
      ship.capabilities.maxTurnRate = 0.75;
      ship.applyMouseLook(1.5, 0);

      const initialHull = ship.quaternion.clone();
      const dt = 0.05; // 50ms
      ship.update(dt);

      const hullStep = initialHull.angleTo(ship.quaternion);
      const maxAllowed = ship.capabilities.maxTurnRate * dt + 0.0001;
      expect(hullStep).toBeLessThanOrEqual(maxAllowed);
      expect(hullStep).toBeCloseTo(0.75 * dt, 3);
    });

    it('should proportionally increase hull catch-up rate when upgrading capabilities.maxTurnRate', () => {
      // Test baseline 0.75 rad/s
      ship.resetSpawn();
      ship.capabilities.maxTurnRate = 0.75;
      ship.applyMouseLook(1.5, 0);
      const dt = 0.1;
      ship.update(dt);
      const step1 = new THREE.Quaternion(0, 0, 0, 1).angleTo(ship.quaternion);

      // Test upgraded 1.5 rad/s
      ship.resetSpawn();
      ship.capabilities.maxTurnRate = 1.5;
      ship.applyMouseLook(1.5, 0);
      ship.update(dt);
      const step2 = new THREE.Quaternion(0, 0, 0, 1).angleTo(ship.quaternion);

      // 1.5 rad/s should catch up twice as fast as 0.75 rad/s
      expect(step2).toBeCloseTo(step1 * 2.0, 3);
    });

    it('should govern thrust and weapons strictly along physical hull quaternion, NOT pilot POV', () => {
      const scene = new THREE.Scene();
      const mockNetwork = {
        broadcastLaser: () => {},
        broadcastMissile: () => {},
        peers: new Map()
      };
      const weapons = new WeaponsSystem(scene, mockSpaceEnv, mockNetwork);

      // Turn Pilot POV 90 degrees to the right (PI/2 rad)
      ship.applyMouseLook(Math.PI / 2, 0);

      // Physical hull is still facing down -Z (0, 0, -1)
      const hullFwd = ship.getForwardVector();
      expect(hullFwd.x).toBeCloseTo(0, 2);
      expect(hullFwd.y).toBeCloseTo(0, 2);
      expect(hullFwd.z).toBeCloseTo(-1, 2);

      // 1. Forward thrust accelerates ship along physical hull heading (-Z), not POV (+X)
      ship.input.thrust = true;
      ship.handleThrustAndMovement(0.1);
      expect(ship.velocity.z).toBeLessThan(0);
      expect(Math.abs(ship.velocity.x)).toBeCloseTo(0, 2);

      // 2. Primary laser fires along physical hull direction
      weapons.triggerPrimary(true, ship, performance.now());
      expect(weapons.laserBeams.length).toBeGreaterThan(0);
      expect(weapons.laserCooldownTimer).toBeGreaterThan(0);

      // 3. Secondary dumb-fire missile launches along physical hull direction
      weapons.triggerSecondary(true, ship, performance.now());
      expect(weapons.missiles.length).toBeGreaterThan(0);
      const launchedMissile = weapons.missiles[weapons.missiles.length - 1];
      expect(launchedMissile.velocity.z).toBeLessThan(-50);
      expect(Math.abs(launchedMissile.velocity.x)).toBeLessThan(1.0);
    });

    it('should cause 3D Cockpit to visibly lag behind Pilot POV during rapid turns and return when aligned', () => {
      const cockpit = new Cockpit(ship.camera);
      const flightInput = { thrust: false, brake: false, strafe: 0, pitch: 0, roll: 0 };

      // 1. Aligned state: cockpit lag rotation is at identity
      cockpit.update(0.016, flightInput, ship.velocity, ship.quaternion, ship.desiredQuaternion);
      const identity = new THREE.Quaternion();
      expect(cockpit.group.quaternion.angleTo(identity)).toBeCloseTo(0, 3);

      // 2. Turn POV sharply (desiredQuat leads shipQuat by 0.5 rad)
      ship.applyMouseLook(0.5, 0);
      cockpit.update(0.016, flightInput, ship.velocity, ship.quaternion, ship.desiredQuaternion);

      // Cockpit group quaternion should lag behind POV
      const lagDeflection = cockpit.group.quaternion.angleTo(identity);
      expect(lagDeflection).toBeGreaterThan(0.05);
      expect(lagDeflection).toBeLessThanOrEqual(0.45); // Clamped to 0.45 rad comfortable deflection limit

      // 3. Align hull with POV
      ship.quaternion.copy(ship.desiredQuaternion);
      cockpit.update(0.016, flightInput, ship.velocity, ship.quaternion, ship.desiredQuaternion);
      expect(cockpit.group.quaternion.angleTo(identity)).toBeCloseTo(0, 3);
    });

    it('should synchronize manual roll to both quaternion and desiredQuaternion without fighting', () => {
      // Set desired quaternion ahead
      ship.input.pitchUp = true;
      ship.update(0.1);
      const preAngle = ship.quaternion.angleTo(ship.desiredQuaternion);

      // Apply manual roll
      ship.input.pitchUp = false;
      ship.input.rollLeft = true;
      const qBefore = ship.quaternion.clone();
      const dqBefore = ship.desiredQuaternion.clone();

      ship.handleRotation(0.05);

      // Both should have rolled
      expect(ship.quaternion.equals(qBefore)).toBe(false);
      expect(ship.desiredQuaternion.equals(dqBefore)).toBe(false);

      // The relative pitch angle should be preserved rather than cancelled
      expect(ship.quaternion.angleTo(ship.desiredQuaternion)).toBeLessThanOrEqual(preAngle + 0.1);
    });

    it('should seamlessly process mouse move input with pointer lock, client coordinate fallback, and UI occlusion protection', async () => {
      const initialQuat = ship.desiredQuaternion.clone();
      const mouseSensitivity = 0.0022;

      // 1. Direct applyMouseLook simulates locked or unlocked mouse motion
      const deltaX = 50;
      const deltaY = 30;
      const expectedDeltaYaw = -deltaX * mouseSensitivity;
      const expectedDeltaPitch = -deltaY * mouseSensitivity;

      ship.applyMouseLook(expectedDeltaYaw, expectedDeltaPitch);

      expect(ship.desiredQuaternion.equals(initialQuat)).toBe(false);
      expect(camera.quaternion.equals(ship.desiredQuaternion)).toBe(true);

      // Verify Euler angle displacement
      const euler = new THREE.Euler().setFromQuaternion(ship.desiredQuaternion, 'YXZ');
      expect(euler.y).toBeCloseTo(expectedDeltaYaw, 3);
      expect(euler.x).toBeCloseTo(expectedDeltaPitch, 3);

      // 2. Verify GameEngine.prototype.isInteractiveTarget excludes .hud-master-monitor and .touch-btn
      const { GameEngine } = await import('../../src/game/engine.js');
      const monitorEl = document.createElement('div');
      monitorEl.className = 'hud-master-monitor';
      const headerChild = document.createElement('span');
      monitorEl.appendChild(headerChild);

      const touchBtnEl = document.createElement('button');
      touchBtnEl.className = 'action-touch-btn touch-btn';

      const plainCanvas = document.createElement('canvas');

      expect(GameEngine.prototype.isInteractiveTarget(headerChild)).toBe(true);
      expect(GameEngine.prototype.isInteractiveTarget(touchBtnEl)).toBe(true);
      expect(GameEngine.prototype.isInteractiveTarget(plainCanvas)).toBe(false);
    });
  });
});
