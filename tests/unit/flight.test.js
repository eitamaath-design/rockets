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

  it('should accelerate forward when thrust button is held, reaching maxSpeed and then hyperSpeed', () => {
    expect(ship.maxSpeed).toBe(280.0);
    expect(ship.hyperSpeed).toBe(560.0);
    ship.input.thrust = true;

    // Simulate 1 second of forward acceleration (forwardAccel = 60 u/s^2)
    ship.update(1.0);
    expect(ship.getSpeed()).toBeCloseTo(60.0, 1);

    // Simulate reaching maxSpeed (280 u/s)
    // Set speed right at maxSpeed
    ship.velocity.set(0, 0, -280.0);
    expect(ship.getSpeed()).toBeCloseTo(280.0, 1);

    // Continuing to hold thrust accelerates into hyper-speed
    ship.update(1.0); // +90 u/s -> 370 u/s
    expect(ship.getSpeed()).toBeCloseTo(370.0, 1);
    expect(ship.isHyperSpeed).toBe(true);

    // Continue holding thrust until reaching hyperSpeed cap (560.0 u/s)
    ship.update(5.0);
    expect(ship.getSpeed()).toBeCloseTo(560.0, 1);
    expect(ship.getSpeed()).toBeLessThanOrEqual(560.0);
  });

  it('should decelerate back to maxSpeed when thrust is released from hyper-speed', () => {
    ship.velocity.set(0, 0, -560.0);
    expect(ship.getSpeed()).toBe(560.0);
    expect(ship.isHyperSpeed).toBe(true);

    ship.input.thrust = false;
    // Decelerate at 350 u/s^2 for 0.5s: 560 - 175 = 385 u/s
    ship.update(0.5);
    expect(ship.getSpeed()).toBeCloseTo(385.0, 1);

    // Decelerate for another 0.5s: 385 - 175 = 210, but clamped at maxSpeed 280.0
    ship.update(0.5);
    expect(ship.getSpeed()).toBeCloseTo(280.0, 1);

    // Further frames without thrust preserve momentum at maxSpeed (no drag)
    ship.update(1.0);
    expect(ship.getSpeed()).toBeCloseTo(280.0, 1);
  });

  it('should come to a complete stop 3x faster holding the brake button (~0.67s)', () => {
    // 1. Bring ship to full sustained speed (280 u/s)
    ship.velocity.set(0, 0, -ship.maxSpeed);
    expect(ship.getSpeed()).toBeCloseTo(ship.maxSpeed, 1);

    // 2. Hold brake button
    ship.input.thrust = false;
    ship.input.brake = true;

    // 3. At 0.333s, speed should be approximately half (brakes are 3x more effective, decelRate = 420)
    ship.update(0.333);
    expect(ship.getSpeed()).toBeCloseTo(ship.maxSpeed / 2.0, 0);

    // 4. By 0.70 seconds total, speed must reach 0.0 (complete halt)
    ship.update(0.367);
    expect(ship.getSpeed()).toBe(0);
    expect(ship.velocity.length()).toBe(0);
  });

  it('should trigger blink charging on double tap within expanded 40ms to 550ms window', () => {
    ship.resetSpawn();
    // First tap at t = 1000ms
    ship.triggerThrustPress(1000);
    expect(ship.isWarpCharging).toBe(false);

    // Second tap at t = 1450ms (elapsed = 450ms, which exceeds old 380ms window but is within new 550ms window)
    const res = ship.triggerThrustPress(1450);
    expect(res).toBe(true);
    expect(ship.isWarpCharging).toBe(true);
  });

  it('should charge blink on double-tapping thrust up to 1.0s max and execute momentum-directed blink without affecting ship speed', () => {
    expect(ship.warpCooldownTimer).toBe(0);
    expect(ship.isWarpCharging).toBe(false);
    expect(ship.warpChargeTime).toBe(0);
    expect(ship.getSpeed()).toBe(0);
    expect(ship.length).toBe(28.0);
    expect(ship.minBlinkDistance).toBe(28.0);
    expect(ship.maxBlinkDistance).toBe(280.0);

    // First tap at t = 1000ms
    const tap1 = ship.triggerThrustPress(1000);
    expect(tap1).toBe(false); // First tap does not initiate blink charge
    expect(ship.isWarpCharging).toBe(false);
    expect(ship.getSpeed()).toBe(0);

    // Double tap within 150ms window (t = 1150ms)
    const tap2 = ship.triggerThrustPress(1150);
    expect(tap2).toBe(true); // Blink charging initiated!
    expect(ship.isWarpCharging).toBe(true);
    expect(ship.warpChargeTime).toBe(0);
    expect(ship.getSpeed()).toBe(0);

    // Holding thrust charges blink continuously up to 1.0s
    ship.update(0.5);
    expect(ship.isWarpCharging).toBe(true);
    expect(ship.warpChargeTime).toBeCloseTo(0.5, 2);

    // Continue charging past max charge: should cap at maxWarpCharge (1.0s)
    ship.update(1.0);
    expect(ship.isWarpCharging).toBe(true);
    expect(ship.warpChargeTime).toBe(1.0);

    // Predictive hologram simulation returns landing position (10x ship length = 280.0u)
    const landing = ship.getBlinkLandingPosition();
    expect(landing.distance).toBe(280.0);
    expect(landing.chargeRatio).toBe(1.0);
    expect(landing.targetPosition.z).toBeCloseTo(ship.position.z - 280.0, 1);

    // Button released: execute blink!
    const initialZ = ship.position.z;
    const initialSpeed = ship.getSpeed();
    const blinkResult = ship.releaseWarpCharge();
    expect(blinkResult).not.toBeNull();
    expect(blinkResult.success).toBe(true);
    expect(blinkResult.chargeRatio).toBe(1.0);
    expect(blinkResult.distance).toBe(ship.maxBlinkDistance); // Exactly 10x ship length (56.0u)

    // Ship moved forward along -Z (looking straight down -Z at spawn)
    expect(ship.position.z).toBeCloseTo(initialZ - ship.maxBlinkDistance, 1);
    expect(ship.isWarpCharging).toBe(false);
    expect(ship.warpChargeTime).toBe(0);
    expect(ship.warpCooldownTimer).toBe(2.0); // 2-second cooldown started

    // Speed / velocity is completely preserved! (Not a boost, just a blink)
    expect(ship.getSpeed()).toBe(initialSpeed);

    // Advance time by 2.1s: cooldown expires, blink ready again
    ship.update(2.1);
    expect(ship.warpCooldownTimer).toBe(0);
  });

  it('should blink exactly 1x ship length when double-tapping without charging at all', () => {
    ship.resetSpawn();
    const initialPos = ship.position.clone();
    ship.triggerThrustPress(1000);
    ship.triggerThrustPress(1150);
    expect(ship.isWarpCharging).toBe(true);
    expect(ship.warpChargeTime).toBe(0); // 0s charge

    // Immediate release without holding
    const result = ship.releaseWarpCharge();
    expect(result.success).toBe(true);
    expect(result.chargeRatio).toBe(0);
    expect(result.distance).toBe(ship.length); // Exactly 1x ship length (5.6u)
    expect(ship.position.z).toBeCloseTo(initialPos.z - ship.length, 1);
    expect(ship.getSpeed()).toBe(0); // Speed unchanged
  });

  it('should blink strictly in the direction of the ship momentum rather than viewpoint orientation', () => {
    ship.resetSpawn();
    // Give ship lateral velocity along +X (moving sideways to the right at 50 u/s)
    ship.velocity.set(50, 0, 0);
    const initialPos = ship.position.clone();
    const initialSpeed = ship.getSpeed();
    const initialQuat = ship.quaternion.clone();

    // Rotate viewpoint 45 degrees to the left (yaw) so viewpoint and heading diverge
    ship.applyMouseLook(-0.785, 0);

    // Initiate double tap and charge to max (1.0s)
    ship.triggerThrustPress(1000);
    ship.triggerThrustPress(1150);
    ship.update(1.0);

    // Check landing prediction along momentum vector (+X)
    const pred = ship.getBlinkLandingPosition();
    expect(pred.direction.x).toBeCloseTo(1.0, 2);
    expect(pred.direction.z).toBeCloseTo(0.0, 2);
    expect(pred.distance).toBe(280.0);

    // Release blink
    const posBeforeBlink = ship.position.clone();
    const quatBeforeBlink = ship.quaternion.clone();
    const desiredQuatBeforeBlink = ship.desiredQuaternion.clone();

    const result = ship.releaseWarpCharge();
    expect(result.success).toBe(true);
    expect(result.direction.x).toBeCloseTo(1.0, 2);

    // Position shifted along +X (momentum direction), NOT -Z (viewpoint orientation)
    expect(ship.position.x).toBeCloseTo(posBeforeBlink.x + 280.0, 1);
    expect(ship.position.z).toBeCloseTo(posBeforeBlink.z, 1);

    // Speed is preserved
    expect(ship.getSpeed()).toBeCloseTo(initialSpeed, 2);
    expect(ship.velocity.x).toBeCloseTo(50.0, 2);

    // Ship keeps the same viewpoint orientation (no orientation change from blink)
    expect(ship.quaternion.x).toBe(quatBeforeBlink.x);
    expect(ship.quaternion.y).toBe(quatBeforeBlink.y);
    expect(ship.quaternion.z).toBe(quatBeforeBlink.z);
    expect(ship.quaternion.w).toBe(quatBeforeBlink.w);
    expect(ship.desiredQuaternion.x).toBe(desiredQuatBeforeBlink.x);
    expect(ship.desiredQuaternion.y).toBe(desiredQuatBeforeBlink.y);
    expect(ship.desiredQuaternion.z).toBe(desiredQuatBeforeBlink.z);
    expect(ship.desiredQuaternion.w).toBe(desiredQuatBeforeBlink.w);
  });

  it('should clamp blink displacement when an obstacle is detected in raycast', () => {
    ship.resetSpawn();
    const initialPos = ship.position.clone();
    ship.triggerThrustPress(1000);
    ship.triggerThrustPress(1150);
    ship.update(1.0); // Fully charged (1.0s -> 56.0u)

    // Mock spaceEnv with ray collision at 30u
    const mockSpaceWithObstacle = {
      checkRayCollision: (origin, dir, maxDist) => ({
        hit: true,
        distance: 30.0,
        point: origin.clone().addScaledVector(dir, 30.0)
      })
    };

    const result = ship.releaseWarpCharge(mockSpaceWithObstacle);
    expect(result.success).toBe(true);
    // Distance clamped to hit.distance - ship.radius - 2.0 = 30 - 2.8 - 2.0 = 25.2u
    expect(result.distance).toBeCloseTo(30.0 - ship.radius - 2.0, 1);
    expect(ship.position.z).toBeCloseTo(initialPos.z - result.distance, 1);
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

    it('should smooth roll input with ease-in and ease-out ramp rate of 6.0 units/s', () => {
      expect(ship.currentRollInput).toBe(0.0);

      // Press rollLeft (targetRollInput = 1.0)
      ship.input.rollLeft = true;

      // Simulate 0.1s update -> currentRollInput should ramp by 6.0 * 0.1 = 0.6
      ship.update(0.1);
      expect(ship.currentRollInput).toBeCloseTo(0.6, 2);

      // Simulate another 0.1s -> should reach target 1.0 (capped at 1.0)
      ship.update(0.1);
      expect(ship.currentRollInput).toBe(1.0);

      // Release rollLeft, press nothing (targetRollInput = 0.0)
      ship.input.rollLeft = false;

      // Simulate 0.1s update -> currentRollInput should ramp down from 1.0 by 0.6 -> 0.4
      ship.update(0.1);
      expect(ship.currentRollInput).toBeCloseTo(0.4, 2);

      // Simulate another 0.1s -> should ramp down to 0.0
      ship.update(0.1);
      expect(ship.currentRollInput).toBe(0.0);
    });
  });

  describe('Configurable Forward Acceleration & Momentum Shearing Flight Dynamics', () => {
    it('should initialize with default forwardAccel = 60.0 and momentumShearing = 0.0', () => {
      expect(ship.forwardAccel).toBe(60.0);
      expect(ship.hyperAccel).toBe(90.0);
      expect(ship.momentumShearing).toBe(0.0);
      expect(ship.kShear).toBe(2.5);
      expect(ship.kRetro).toBe(2.0);
    });

    it('should update forwardAccel via setFlightConfig and clamp to [20, 180]', () => {
      ship.setFlightConfig({ forwardAccel: 120 });
      expect(ship.forwardAccel).toBe(120.0);
      expect(ship.hyperAccel).toBe(180.0);

      // Clamp lower bound
      ship.setFlightConfig({ forwardAccel: 10 });
      expect(ship.forwardAccel).toBe(20.0);
      expect(ship.hyperAccel).toBe(30.0);

      // Clamp upper bound
      ship.setFlightConfig({ forwardAccel: 250 });
      expect(ship.forwardAccel).toBe(180.0);
      expect(ship.hyperAccel).toBe(270.0);

      // Test alias 'accel'
      ship.setFlightConfig({ accel: '95' });
      expect(ship.forwardAccel).toBe(95.0);
    });

    it('should accelerate proportionally faster with higher forwardAccel', () => {
      ship.setFlightConfig({ forwardAccel: 120 });
      ship.input.thrust = true;
      ship.update(1.0);
      expect(ship.getSpeed()).toBeCloseTo(120.0, 1);
    });

    it('should update momentumShearing via setFlightConfig and clamp to [0.0, 1.0]', () => {
      ship.setFlightConfig({ momentumShearing: 0.75 });
      expect(ship.momentumShearing).toBe(0.75);

      // Test alias 'shear'
      ship.setFlightConfig({ shear: 0.4 });
      expect(ship.momentumShearing).toBe(0.4);

      // Clamp lower bound
      ship.setFlightConfig({ momentumShearing: -0.5 });
      expect(ship.momentumShearing).toBe(0.0);

      // Clamp upper bound
      ship.setFlightConfig({ momentumShearing: 1.8 });
      expect(ship.momentumShearing).toBe(1.0);
    });

    it('should preserve 100% Newtonian momentum without lateral damping when momentumShearing = 0.0', () => {
      ship.setFlightConfig({ momentumShearing: 0.0 });
      // Velocity purely along +X (orthogonal to hull heading which is along -Z)
      ship.velocity.set(150.0, 0, 0);
      ship.input.thrust = true;

      // Simulate 0.5s thrust
      ship.update(0.5);

      // X velocity (lateral drift) must remain completely unperturbed
      expect(ship.velocity.x).toBeCloseTo(150.0, 1);
      // Z velocity accelerates forward (-Z direction)
      expect(ship.velocity.z).toBeLessThan(0);
    });

    it('should damp lateral drift proportionally when momentumShearing > 0.0 during forward thrust', () => {
      // Ship 1: S = 1.0
      ship.setFlightConfig({ momentumShearing: 1.0 });
      ship.velocity.set(100.0, 0, 0);
      ship.input.thrust = true;

      for (let i = 0; i < 30; i++) {
        ship.update(0.016); // ~0.48s
      }
      const finalVxFullShear = ship.velocity.x;
      // At kShear=2.5 and dt~0.48s, factor ~ e^(-1.2) ~ 0.30 -> vx ~ 30 u/s
      expect(finalVxFullShear).toBeLessThan(40.0);

      // Ship 2: S = 0.5
      const shipHalf = new PlayerShip(camera, mockSpaceEnv);
      shipHalf.setFlightConfig({ momentumShearing: 0.5 });
      shipHalf.velocity.set(100.0, 0, 0);
      shipHalf.input.thrust = true;

      for (let i = 0; i < 30; i++) {
        shipHalf.update(0.016);
      }
      const finalVxHalfShear = shipHalf.velocity.x;

      // Half shear should damp less than full shear
      expect(finalVxHalfShear).toBeGreaterThan(finalVxFullShear);
      expect(finalVxHalfShear).toBeLessThan(100.0);
    });

    it('should aggressively cancel retrograde velocity when reversing under forward thrust with momentumShearing > 0.0', () => {
      // Hull faces -Z. Ship moves along +Z (flying backwards at 200 u/s)
      ship.setFlightConfig({ forwardAccel: 60, momentumShearing: 1.0 });
      ship.velocity.set(0, 0, 200.0);
      ship.input.thrust = true;

      // With S=1.0 and kRetro=2.0, retrograde decay + 60 u/s² forward thrust cancels backwards speed in < 1.5s
      for (let i = 0; i < 60; i++) {
        ship.update(0.02); // 1.2s total
      }

      // Should have already reversed direction to forward (vz <= 0)
      expect(ship.velocity.z).toBeLessThanOrEqual(0.0);
    });

    it('should NOT apply retrograde damping when moving forward (vParallel >= 0)', () => {
      ship.setFlightConfig({ forwardAccel: 60, momentumShearing: 1.0 });
      // Moving forward along -Z at 100 u/s
      ship.velocity.set(0, 0, -100.0);
      ship.input.thrust = true;

      ship.update(0.5); // should gain +30 forward speed without any retro damping
      expect(ship.velocity.z).toBeCloseTo(-130.0, 1);
    });

    it('should NOT apply any momentum shearing when coasting (thrust = false) even with momentumShearing = 1.0', () => {
      ship.setFlightConfig({ momentumShearing: 1.0 });
      ship.velocity.set(100.0, 0, 100.0);
      ship.input.thrust = false;

      ship.update(1.0);

      // In zero-gravity space, unpowered drifting must preserve all inertia without artificial damping
      expect(ship.velocity.x).toBe(100.0);
      expect(ship.velocity.z).toBe(100.0);
    });
  });

  describe('Ship-Replica Visuals, Vibrating Focus & 5x Animation Timing', () => {
    it('should construct high-fidelity 12-component starfighter replica at 5x scale with translucency controls', async () => {
      const { createShipReplicaGroup, createStarfighterReplica } = await import('../../src/game/shipModel.js');
      expect(typeof createShipReplicaGroup).toBe('function');
      expect(typeof createStarfighterReplica).toBe('function');

      const replica = createShipReplicaGroup({ translucency: 80, scale: 5.0, mode: 'blink' });
      expect(replica).toBeInstanceOf(THREE.Group);
      expect(replica.scale.x).toBe(5.0);
      expect(replica.scale.y).toBe(5.0);
      expect(replica.scale.z).toBe(5.0);

      // Verify child meshes >= 10 covering 12 components
      expect(replica.children.length).toBeGreaterThanOrEqual(10);

      // Verify userData translucency & baseOpacity
      expect(replica.userData.translucency).toBe(80);
      expect(replica.userData.baseOpacity).toBeCloseTo(0.20, 2);
      expect(Array.isArray(replica.userData.materials)).toBe(true);
      expect(replica.userData.materials.length).toBeGreaterThan(0);

      // Verify dynamic translucency update
      replica.userData.setTranslucency(85);
      expect(replica.userData.translucency).toBe(85);
      expect(replica.userData.baseOpacity).toBeCloseTo(0.15, 2);
      for (const mat of replica.userData.materials) {
        expect(mat.opacity).toBeCloseTo(0.15, 2);
      }
    });

    it('should execute real-time vibrating focus during warp charging and reset when inactive', async () => {
      const { createShipReplicaGroup } = await import('../../src/game/shipModel.js');
      const replica = createShipReplicaGroup({ translucency: 80, scale: 5.0, mode: 'blink' });

      const landingPos = new THREE.Vector3(100, 50, -300);
      const playerQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4);

      // Active warp charging: chargeRatio = 0.8
      replica.userData.updateVibration(landingPos, playerQuat, 0.8, 1.25);

      // Spatial jitter: position displaced from landingPos
      const distFromLanding = replica.position.distanceTo(landingPos);
      expect(distFromLanding).toBeGreaterThan(0.01);

      // Scale oscillation: not exactly 5.0
      expect(replica.scale.x).not.toBe(5.0);

      // Dynamic shimmer: materials opacity within [0.02, 1.0]
      for (const mat of replica.userData.materials) {
        expect(mat.opacity).toBeGreaterThanOrEqual(0.02);
        expect(mat.opacity).toBeLessThanOrEqual(1.0);
      }

      // Inactive: chargeRatio = 0
      replica.userData.updateVibration(landingPos, playerQuat, 0.0, 2.0);
      expect(replica.position.x).toBe(landingPos.x);
      expect(replica.position.y).toBe(landingPos.y);
      expect(replica.position.z).toBe(landingPos.z);
      expect(replica.quaternion.x).toBe(playerQuat.x);
      expect(replica.quaternion.y).toBe(playerQuat.y);
      expect(replica.quaternion.z).toBe(playerQuat.z);
      expect(replica.quaternion.w).toBe(playerQuat.w);
      expect(replica.scale.x).toBe(5.0);
      for (const mat of replica.userData.materials) {
        expect(mat.opacity).toBeCloseTo(0.20, 2);
      }
    });

    it('should configure 750ms post-blink blur duration in triggerBlinkBlur', async () => {
      const { GameEngine } = await import('../../src/game/engine.js');
      const container = document.createElement('div');
      container.id = 'game-canvas-container';
      document.body.appendChild(container);

      const canvas = document.createElement('canvas');
      canvas.id = 'game-canvas';
      container.appendChild(canvas);

      const hud = document.createElement('div');
      hud.className = 'game-hud-overlay';
      container.appendChild(hud);

      vi.useFakeTimers();

      const engine = {
        triggerBlinkBlur: GameEngine.prototype.triggerBlinkBlur
      };

      engine.triggerBlinkBlur();
      expect(canvas.classList.contains('blink-blur')).toBe(true);
      expect(hud.classList.contains('blink-blur')).toBe(true);

      // At 200ms, blur must still be active (longer than legacy 150ms)
      vi.advanceTimersByTime(200);
      expect(canvas.classList.contains('blink-blur')).toBe(true);
      expect(hud.classList.contains('blink-blur')).toBe(true);

      // At 750ms, blur clears
      vi.advanceTimersByTime(550);
      expect(canvas.classList.contains('blink-blur')).toBe(false);
      expect(hud.classList.contains('blink-blur')).toBe(false);

      vi.useRealTimers();
      container.remove();
    });
  });
});
