import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { PlayerShip } from '../../src/game/ship.js';

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

  it('should come to a complete stop from full speed in EXACTLY 2.0 seconds holding the brake button', () => {
    // 1. Bring ship to full speed (90 u/s)
    ship.velocity.set(0, 0, -ship.maxSpeed);
    expect(ship.getSpeed()).toBeCloseTo(ship.maxSpeed, 1);

    // 2. Hold brake button
    ship.input.thrust = false;
    ship.input.brake = true;

    // 3. At 1.0 second, speed should be exactly half (45 u/s)
    ship.update(1.0);
    expect(ship.getSpeed()).toBeCloseTo(ship.maxSpeed / 2.0, 1);

    // 4. At 2.0 seconds total, speed must reach exactly 0.0 (complete halt)
    ship.update(1.0);
    expect(ship.getSpeed()).toBe(0);
    expect(ship.velocity.length()).toBe(0);
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

  it('should take damage, prevent lethal damage during invulnerability, and die when depleted', () => {
    // During spawn invulnerability, damage should be ignored
    expect(ship.invulnerableTimer).toBeGreaterThan(0);
    ship.takeDamage(20);
    expect(ship.hp).toBe(100);

    // Expire invulnerability timer
    ship.invulnerableTimer = 0;
    ship.takeDamage(40);
    expect(ship.hp).toBe(60);

    // Lethal blow
    const isKilled = ship.takeDamage(70);
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
});
