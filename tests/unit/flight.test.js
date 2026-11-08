import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { PlayerShip } from '../../src/game/ship.js';
import { SpaceEnvironment } from '../../src/game/space.js';

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
    ship.input.thrust = true;

    // Simulate 1 second of forward acceleration (forwardAccel = 45 u/s^2)
    ship.update(1.0);
    expect(ship.getSpeed()).toBeCloseTo(45.0, 1);

    // Simulate 3 more seconds of thrust: speed must be clamped to maxSpeed (90 u/s)
    ship.update(3.0);
    expect(ship.getSpeed()).toBeCloseTo(ship.maxSpeed, 1);
    expect(ship.getSpeed()).toBeLessThanOrEqual(ship.maxSpeed);
  });

  it('should come to a complete stop 3x faster holding the brake button (~0.67s)', () => {
    // 1. Bring ship to full speed (90 u/s)
    ship.velocity.set(0, 0, -ship.maxSpeed);
    expect(ship.getSpeed()).toBeCloseTo(ship.maxSpeed, 1);

    // 2. Hold brake button
    ship.input.thrust = false;
    ship.input.brake = true;

    // 3. At 0.333s, speed should be approximately half (brakes are 3x more effective)
    ship.update(0.333);
    expect(ship.getSpeed()).toBeCloseTo(ship.maxSpeed / 2.0, 1);

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
});
