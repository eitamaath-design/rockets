import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { WeaponsSystem, StandardPursuitGuidance } from '../../src/game/weapons.js';
import { PlayerShip } from '../../src/game/ship.js';
import { GameNetwork } from '../../src/net/network.js';

describe('Weapons System: Laser Beam & Homing Missile with 3-Second Lock', () => {
  let scene;
  let mockSpaceEnv;
  let mockNetwork;
  let weapons;
  let ship;

  beforeEach(() => {
    scene = new THREE.Scene();
    mockSpaceEnv = {
      checkCollision: () => null,
      checkRayCollision: () => null,
      checkRayBlocked: () => false,
      carveAsteroid: () => {}
    };
    mockNetwork = {
      selfId: 'pilot-alpha',
      broadcastLaser: () => {},
      broadcastMissile: () => {},
      broadcastDecoy: () => {},
      broadcastCannon: () => {},
      broadcastMine: () => {},
      sendHitTarget: () => {},
      onLaser: () => () => {},
      onMissile: () => () => {},
      onDecoy: () => () => {},
      onCannon: () => () => {},
      onMine: () => () => {}
    };

    weapons = new WeaponsSystem(scene, mockSpaceEnv, mockNetwork);
    const camera = new THREE.PerspectiveCamera();
    ship = new PlayerShip(camera, mockSpaceEnv);
  });

  describe('Primary Directed Laser Beam', () => {
    it('should fire forward twin laser beams and deplete energy', () => {
      const initialEnergy = weapons.laserEnergy;
      expect(initialEnergy).toBe(100.0);

      weapons.triggerPrimary(true, ship, 1000);
      expect(weapons.laserBeams.length).toBe(1);
      expect(weapons.laserEnergy).toBeLessThan(initialEnergy);
    });

    it('should have laser speed 160 and fire interval 0.20s', () => {
      expect(weapons.laserSpeed).toBe(160.0);
      expect(weapons.laserFireInterval).toBe(0.20);
    });

    it('should sustain continuous laser beam fire for approximately 5 seconds at 0.20s interval', () => {
      expect(weapons.laserEnergy).toBe(100.0);
      // Fire for 5 seconds at 0.20s ticks (25 ticks consuming 4.0 energy each = 100 energy)
      let now = 1000;
      let shots = 0;
      for (let t = 0; t <= 5.0; t += 0.20) {
        now += 200;
        weapons.triggerPrimary(true, ship, now);
        shots++;
      }
      expect(shots).toBeGreaterThanOrEqual(24);
      // Energy should be depleted or near 0 after 5s continuous firing
      expect(weapons.laserEnergy).toBeLessThan(5.0);
    });

    it('should break invisibility when firing laser', () => {
      ship.isInvisible = true;
      weapons.triggerPrimary(true, ship, 1000);
      expect(ship.isInvisible).toBe(false);
    });

    it('should carve asteroid with spherical carve strength 80.0 and damage 2.0 against small asteroids (10 shots in 2.0s)', () => {
      let carved = false;
      let carveStrength = 0;
      let appliedDamage = 0;
      const fakeAsteroid = { mesh: new THREE.Mesh(), radius: 40, hp: 20 };
      mockSpaceEnv.checkRayCollision = (origin, dir, maxDist) => {
        return {
          asteroid: fakeAsteroid,
          distance: 120,
          hitPoint: new THREE.Vector3(0, 0, 0)
        };
      };
      mockSpaceEnv.damageAsteroid = (ast, dmg, pos, dir, r, d, strength) => {
        expect(ast).toBe(fakeAsteroid);
        appliedDamage = dmg;
        carved = true;
        carveStrength = strength;
        return { cracked: true, crackStage: 1, carveResult: { voxelsModified: 10 } };
      };

      weapons.triggerPrimary(true, ship, 1000);
      expect(carved).toBe(true);
      expect(appliedDamage).toBeCloseTo(2.0, 2);
      expect(carveStrength).toBe(80.0);
    });

    it('should recharge laser energy after cooldown period', () => {
      weapons.triggerPrimary(true, ship, 1000);
      const depleted = weapons.laserEnergy;
      expect(depleted).toBeLessThan(100);

      // In cooldown delay (0.50s)
      weapons.update(0.3, ship, new Map(), () => {});
      expect(weapons.laserEnergy).toBe(depleted);

      // Advance past cooldown into recharge
      weapons.update(0.5, ship, new Map(), () => {});
      expect(weapons.laserEnergy).toBeGreaterThan(depleted);

      // Full recharge
      weapons.update(5.0, ship, new Map(), () => {});
      expect(weapons.laserEnergy).toBe(100.0);
    });

    it('should maintain persistent steady continuous beam mesh across frames while held (no flashing, zero recreation)', () => {
      expect(weapons.laserBeams.length).toBe(0);
      weapons.triggerPrimary(true, ship, 1000);
      expect(weapons.laserBeams.length).toBe(1);
      const activeBeam = weapons.activeLaserBeam;
      expect(activeBeam).toBeDefined();
      const beamGroup = activeBeam.group;

      // Next frame at 1016ms (within 0.16s tick interval) with ship moving
      ship.position.set(10, 20, -50);
      weapons.triggerPrimary(true, ship, 1016);

      // Verify same mesh object is retained (zero recreation / no flashing)
      expect(weapons.laserBeams.length).toBe(1);
      expect(weapons.activeLaserBeam.group).toBe(beamGroup);

      // Verify rock-solid steady opacity during continuous firing
      weapons.update(0.016, ship, new Map(), () => {});
      expect(activeBeam.coreMat.opacity).toBeCloseTo(0.98, 2);
      expect(activeBeam.glowMat.opacity).toBeCloseTo(0.85, 2);

      // Release fire button: beam should stop cleanly and be removed
      weapons.triggerPrimary(false, ship, 1032);
      expect(weapons.activeLaserBeam).toBeNull();
      expect(weapons.laserBeams.length).toBe(0);
    });

    it('should maintain remote peer continuous beam persistence across packets without flickering', () => {
      const data1 = {
        leftOrigin: { x: -2, y: 0, z: 0 },
        rightOrigin: { x: 2, y: 0, z: 0 },
        hitPoint: { x: 0, y: 0, z: -100 },
        dir: { x: 0, y: 0, z: -1 },
        isFireLaser: false
      };
      weapons.spawnRemoteLaserBeam(data1, 'peer-1');
      expect(weapons.laserBeams.length).toBe(1);
      const remoteBeam = weapons.remoteLaserBeams.get('peer-1');
      expect(remoteBeam).toBeDefined();

      // Advance time by 80ms (typical network packet cadence)
      weapons.update(0.08, ship, new Map(), () => {});
      expect(weapons.laserBeams.length).toBe(1);
      expect(remoteBeam.coreMat.opacity).toBeCloseTo(0.98, 2);

      // Second packet arrives from same peer: must reuse existing beam rather than duplicating
      const data2 = {
        leftOrigin: { x: -2, y: 1, z: 0 },
        rightOrigin: { x: 2, y: 1, z: 0 },
        hitPoint: { x: 0, y: 1, z: -100 },
        dir: { x: 0, y: 0, z: -1 },
        isFireLaser: false
      };
      weapons.spawnRemoteLaserBeam(data2, 'peer-1');
      expect(weapons.laserBeams.length).toBe(1);
      expect(weapons.remoteLaserBeams.get('peer-1')).toBe(remoteBeam);

      // When remote peer stops firing, advance past lifetime: beam expires and cleans up
      weapons.update(0.35, ship, new Map(), () => {});
      expect(weapons.laserBeams.length).toBe(0);
      expect(weapons.remoteLaserBeams.has('peer-1')).toBe(false);
    });
  });

  describe('Secondary Dual-Mode Missile: Guided with 3s Lock + Unguided Dumb-Fire', () => {
    it('should launch unguided dumb-fire missile straight ahead if target is not locked', () => {
      expect(weapons.lockSystem.isLocked).toBe(false);
      const fired = weapons.triggerSecondary(true, ship, 1000);
      expect(fired).toBe(true);
      expect(weapons.missiles.length).toBe(1);
      expect(weapons.missiles[0].targetId).toBeNull();
    });

    it('should launch missile from under the ship (ventral pylon) along local down vector to prevent trail FOV occlusion', () => {
      // 1. Upright ship
      ship.position.set(100, 200, 300);
      ship.quaternion.set(0, 0, 0, 1);
      weapons.triggerSecondary(true, ship, 2000);

      const m1 = weapons.missiles[weapons.missiles.length - 1];
      // Expected: forward is (0, 0, -1), down is (0, -1, 0)
      // origin = (100, 200, 300) + 2.5 * (0, 0, -1) + 3.0 * (0, -1, 0) = (100, 197, 297.5)
      expect(m1.group.position.x).toBeCloseTo(100, 4);
      expect(m1.group.position.y).toBeCloseTo(197, 4);
      expect(m1.group.position.z).toBeCloseTo(297.5, 4);

      // 2. Rotated ship (e.g. pitched 90 deg down, pointing at -Y)
      ship.position.set(50, 50, 50);
      ship.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      weapons.triggerSecondary(true, ship, 3000);

      const m2 = weapons.missiles[weapons.missiles.length - 1];
      const relPos = m2.group.position.clone().sub(ship.position);
      const fwd = ship.getForwardVector();
      const down = ship.getDownVector();

      expect(relPos.dot(fwd)).toBeCloseTo(2.5, 4);
      expect(relPos.dot(down)).toBeCloseTo(3.0, 4);
      // Verify orthogonal to right vector
      expect(relPos.dot(ship.getRightVector())).toBeCloseTo(0, 4);
    });

    it('should hit remote opponent with unguided dumb-fire missile proximity detonation', () => {
      let hitTargetCalled = false;
      let hitPeer = null;
      let hitDamage = 0;
      mockNetwork.sendHitTarget = (peerId, dmg, type) => {
        hitTargetCalled = true;
        hitPeer = peerId;
        hitDamage = dmg;
      };

      // Spawn unguided dumb-fire missile (targetId = null)
      weapons.spawnMissile(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1), null, true, 'm-dumb');
      expect(weapons.missiles.length).toBe(1);

      // Remote ship positioned directly in path of dumb-fire missile
      const remoteShip = {
        position: new THREE.Vector3(0, 0, -3), // Close within proximity (distSq < 24)
        isDead: false,
        isInvisible: false
      };
      const remoteMap = new Map([['pilot-gamma', remoteShip]]);

      weapons.update(0.016, ship, remoteMap, () => {});
      expect(hitTargetCalled).toBe(true);
      expect(hitPeer).toBe('pilot-gamma');
      expect(hitDamage).toBe(weapons.missileDamage);
      expect(weapons.missiles.length).toBe(0); // Detonated
    });

    it('should track target in forward line-of-sight and lock after 3.0 seconds', () => {
      const remoteShip = {
        position: ship.position.clone().add(new THREE.Vector3(0, 0, -200)), // Directly ahead
        isDead: false,
        isInvisible: false
      };
      const remoteMap = new Map([['pilot-beta', remoteShip]]);

      // Update lock system over 2.0 seconds -> progress ~67%
      weapons.lockSystem.update(2.0, ship, remoteMap, mockSpaceEnv, ship.camera);
      expect(weapons.lockSystem.isLocked).toBe(false);
      expect(weapons.lockSystem.getProgress()).toBeCloseTo(0.67, 1);

      // Update past 3.0 seconds -> LOCKED!
      weapons.lockSystem.update(1.2, ship, remoteMap, mockSpaceEnv, ship.camera);
      expect(weapons.lockSystem.isLocked).toBe(true);
      expect(weapons.lockSystem.currentTargetId).toBe('pilot-beta');

      // Now firing missile succeeds!
      const fired = weapons.triggerSecondary(true, ship, 1000);
      expect(fired).toBe(true);
      expect(weapons.missiles.length).toBe(1);
      expect(weapons.lockSystem.isLocked).toBe(false); // Consumed
    });

    it('should call carveAsteroid with crater blast when missile hits an asteroid', () => {
      let carved = false;
      const fakeAsteroid = { mesh: new THREE.Mesh(), radius: 35 };
      mockSpaceEnv.checkCollision = () => fakeAsteroid;
      let carveRadius = 0;
      let carveDepth = 0;
      mockSpaceEnv.carveAsteroid = (ast, pos, dir, r, d) => {
        expect(ast).toBe(fakeAsteroid);
        carved = true;
        carveRadius = r;
        carveDepth = d;
      };

      // Force spawn a missile
      weapons.spawnMissile(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1), 'pilot-beta', true, 'm-1');
      expect(weapons.missiles.length).toBe(1);

      // Update: missile collides with asteroid and carves crater
      weapons.update(0.016, ship, new Map(), () => {});
      expect(carved).toBe(true);
      expect(carveRadius).toBeGreaterThanOrEqual(40.0);
      expect(carveDepth).toBeGreaterThanOrEqual(30.0);
      expect(weapons.missiles.length).toBe(0); // Detonated
    });

    it('should deploy Hologram Decoy Clone when requested', () => {
      expect(weapons.decoys.length).toBe(0);
      weapons.deployDecoyClone(ship);
      expect(weapons.decoys.length).toBe(1);
      expect(weapons.decoys[0].speed).toBeGreaterThan(50);
    });

    it('should configure FireTrailSystem with frustumCulled false and long-lived smoke particles', () => {
      expect(weapons.fireTrails.points.frustumCulled).toBe(false);

      weapons.fireTrails.emit(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1), 4);
      expect(weapons.fireTrails.particles.length).toBeGreaterThanOrEqual(4);
      for (const p of weapons.fireTrails.particles) {
        expect(p.maxLife).toBeGreaterThanOrEqual(0.8);
        expect(p.maxLife).toBeLessThanOrEqual(1.45);
      }
    });

    it('should spawn multi-stage explosion with fireball, expanding shockwave ring, and spark plume', () => {
      const pos = new THREE.Vector3(50, 10, -20);
      weapons.spawnExplosion(pos, 20, 0xff5500);

      expect(weapons.explosions.length).toBe(1);
      const exp = weapons.explosions[0];
      expect(exp.fireball).toBeDefined();
      expect(exp.ring).toBeDefined();
      expect(exp.sparks).toBeDefined();
      expect(exp.sparks.length).toBeGreaterThanOrEqual(6);

      const initialRingScale = exp.ring.scale.x;
      // Advance animation
      weapons.update(0.15, ship, new Map(), () => {});
      expect(exp.ring.scale.x).toBeGreaterThan(initialRingScale);
    });

    it('should invoke damageAsteroid with 1.2 damage when laser impacts an asteroid', () => {
      let damaged = false;
      let dmgAmount = 0;
      let cRadius = 0;
      let cDepth = 0;
      const fakeAsteroid = { mesh: new THREE.Mesh(), radius: 30, hp: 20 };
      mockSpaceEnv.checkRayCollision = () => ({
        asteroid: fakeAsteroid,
        distance: 100,
        hitPoint: new THREE.Vector3(0, 0, -100)
      });
      mockSpaceEnv.damageAsteroid = (ast, dmg, pt, dir, r, d) => {
        damaged = true;
        dmgAmount = dmg;
        cRadius = r;
        cDepth = d;
      };

      weapons.triggerPrimary(true, ship, 1000);
      expect(damaged).toBe(true);
      expect(dmgAmount).toBe(2.0);
      // Laser carving sphere radius scaled to ~10% ship volume (14.0 * cbrt(0.1) ≈ 6.5u)
      expect(cRadius).toBeCloseTo(6.5, 1);
      expect(cDepth).toBeCloseTo(6.5, 1);
    });

    it('should return 6.5u base carve radius for normal laser and 7.27u for Fire Laser (1.4x volume)', () => {
      expect(ship.getLaserCarveRadius(false)).toBeCloseTo(6.5, 1);
      expect(ship.getLaserCarveRadius(true)).toBeCloseTo(7.27, 1);
      expect(ship.getLaserCarveDepth(false)).toBeCloseTo(6.5, 1);
      expect(ship.getLaserCarveDepth(true)).toBeCloseTo(7.27, 1);
    });

    it('should require 10 laser shots (2.0 damage each at 200ms intervals) to destroy a 20 HP small asteroid in 2.0s', () => {
      const smallAsteroid = { mesh: new THREE.Mesh(), radius: 28, hp: 20 };
      let hitCount = 0;
      let destroyed = false;
      mockSpaceEnv.checkRayCollision = () => ({
        asteroid: smallAsteroid,
        distance: 80,
        hitPoint: new THREE.Vector3(0, 0, -80)
      });
      mockSpaceEnv.damageAsteroid = (ast, dmg) => {
        hitCount++;
        ast.hp = Math.max(0, ast.hp - dmg);
        if (ast.hp <= 0.001 || hitCount >= 10) {
          destroyed = true;
          return { destroyed: true, crackStage: 10, hp: 0 };
        }
        return { destroyed: false, cracked: true, crackStage: hitCount, hp: ast.hp };
      };

      for (let shot = 1; shot <= 9; shot++) {
        weapons.laserEnergy = 100.0;
        weapons.triggerPrimary(true, ship, 1000 + shot * 200);
        expect(destroyed).toBe(false);
        expect(smallAsteroid.hp).toBeCloseTo(20 - shot * 2.0, 1);
      }

      // 10th shot destroys the small asteroid (2.0s continuous firing)
      weapons.triggerPrimary(true, ship, 1000 + 10 * 200);
      expect(hitCount).toBe(10);
      expect(smallAsteroid.hp).toBeCloseTo(0, 1);
      expect(destroyed).toBe(true);
    });
  });

  describe('Missile Launch Velocity Inheritance & Guaranteed Forward Separation', () => {
    it('should launch missile at base initialSpeed (85 u/s) and accelerate to maxSpeed (210 u/s) when ship is stationary', () => {
      ship.velocity.set(0, 0, 0);
      const fired = weapons.triggerSecondary(true, ship, 1000);
      expect(fired).toBe(true);
      expect(weapons.missiles.length).toBe(1);

      const m = weapons.missiles[0];
      expect(m.guidance.baseInitialSpeed).toBe(85.0);
      expect(m.guidance.baseMaxSpeed).toBe(210.0);
      expect(m.guidance.inheritedSpeed).toBe(0);
      expect(m.guidance.currentSpeed).toBe(85.0);
      expect(m.guidance.maxSpeed).toBe(210.0);
      expect(m.velocity.length()).toBeCloseTo(85.0, 1);

      // Accelerate over time (dt = 0.5s increments, total 3.0s)
      for (let t = 0; t < 6; t++) {
        weapons.update(0.5, ship, new Map(), () => {});
      }
      expect(m.guidance.currentSpeed).toBe(210.0);
      expect(m.velocity.length()).toBeCloseTo(210.0, 1);
    });

    it('should inherit ship velocity and guarantee forward separation when ship moves at cruising speed (140 u/s)', () => {
      // Ship moving forward at maximum cruising speed 140 u/s along -Z
      ship.velocity.set(0, 0, -140);
      expect(ship.getSpeed()).toBe(140.0);

      const fired = weapons.triggerSecondary(true, ship, 1000);
      expect(fired).toBe(true);
      const m = weapons.missiles[0];

      // Initial speed must equal baseInitialSpeed (85) + ship forward velocity (140) = 225 u/s
      expect(m.guidance.inheritedSpeed).toBe(140.0);
      expect(m.guidance.currentSpeed).toBe(225.0);
      expect(m.guidance.maxSpeed).toBe(350.0); // 210 + 140
      expect(m.velocity.length()).toBeCloseTo(225.0, 1);
      expect(m.guidance.currentSpeed).toBeGreaterThan(ship.getSpeed());

      // Advance 60 frames (1 second at 60 FPS) and verify separation distance increases monotonically
      let prevDistance = m.group.position.distanceTo(ship.position);
      for (let frame = 0; frame < 60; frame++) {
        const dt = 1 / 60;
        ship.position.addScaledVector(ship.velocity, dt);
        weapons.update(dt, ship, new Map(), () => {});

        const currentDistance = m.group.position.distanceTo(ship.position);
        expect(currentDistance).toBeGreaterThan(prevDistance);

        // Missile must remain ahead of ship along heading
        const toMissile = m.group.position.clone().sub(ship.position);
        const forwardProjection = toMissile.dot(ship.getForwardVector());
        expect(forwardProjection).toBeGreaterThan(0);

        prevDistance = currentDistance;
      }
    });

    it('should inherit ship velocity and guarantee forward separation when ship moves at evasive boost speed (320 u/s)', () => {
      // Ship moving forward at maximum evasive boost speed (140 cruising + 180 impulse = 320 u/s)
      ship.velocity.set(0, 0, -320);
      expect(ship.getSpeed()).toBe(320.0);

      const fired = weapons.triggerSecondary(true, ship, 2000);
      expect(fired).toBe(true);
      const m = weapons.missiles[0];

      // Initial speed must equal 85 + 320 = 405 u/s
      expect(m.guidance.inheritedSpeed).toBe(320.0);
      expect(m.guidance.currentSpeed).toBe(405.0);
      expect(m.guidance.maxSpeed).toBe(530.0); // 210 + 320
      expect(m.velocity.length()).toBeCloseTo(405.0, 1);
      expect(m.guidance.currentSpeed).toBeGreaterThan(ship.getSpeed());

      // Advance 60 frames and verify separation distance increases monotonically
      let prevDistance = m.group.position.distanceTo(ship.position);
      for (let frame = 0; frame < 60; frame++) {
        const dt = 1 / 60;
        ship.position.addScaledVector(ship.velocity, dt);
        weapons.update(dt, ship, new Map(), () => {});

        const currentDistance = m.group.position.distanceTo(ship.position);
        expect(currentDistance).toBeGreaterThan(prevDistance);

        const toMissile = m.group.position.clone().sub(ship.position);
        const forwardProjection = toMissile.dot(ship.getForwardVector());
        expect(forwardProjection).toBeGreaterThan(0);

        prevDistance = currentDistance;
      }
    });

    it('should inherit velocity and maintain forward separation for guided missiles tracking a locked target', () => {
      // Simulate acquired lock on target
      weapons.lockSystem.isLocked = true;
      weapons.lockSystem.currentTargetId = 'pilot-target-1';

      ship.velocity.set(0, 0, -140);
      weapons.triggerSecondary(true, ship, 1000);
      const m = weapons.missiles[0];

      expect(m.targetId).toBe('pilot-target-1');
      expect(m.guidance.currentSpeed).toBe(225.0);

      const remoteTarget = {
        position: new THREE.Vector3(0, 0, -1500),
        isDead: false,
        isInvisible: false
      };
      const remoteMap = new Map([['pilot-target-1', remoteTarget]]);

      // Advance 60 frames: ship at 140 u/s, missile homing towards target
      let prevDistance = m.group.position.distanceTo(ship.position);
      for (let frame = 0; frame < 60; frame++) {
        const dt = 1 / 60;
        ship.position.addScaledVector(ship.velocity, dt);
        weapons.update(dt, ship, remoteMap, () => {});

        const currentDistance = m.group.position.distanceTo(ship.position);
        expect(currentDistance).toBeGreaterThan(prevDistance);
        prevDistance = currentDistance;
      }
    });

    it('should dynamically clamp missile speed via ensureSeparationSpeed when ship activates boost after launch', () => {
      // Fired while cruising at 140 u/s
      ship.velocity.set(0, 0, -140);
      weapons.triggerSecondary(true, ship, 1000);
      const m = weapons.missiles[0];
      expect(m.guidance.currentSpeed).toBe(225.0);

      // Advance 10 frames at cruising speed
      for (let i = 0; i < 10; i++) {
        const dt = 1 / 60;
        ship.position.addScaledVector(ship.velocity, dt);
        weapons.update(dt, ship, new Map(), () => {});
      }

      // Pilot activates evasive boost AFTER launching missile: velocity surges to 320 u/s
      ship.velocity.set(0, 0, -320);
      expect(ship.getSpeed()).toBe(320.0);

      // Next update call must trigger ensureSeparationSpeed(320)
      weapons.update(1 / 60, ship, new Map(), () => {});
      expect(m.guidance.currentSpeed).toBeGreaterThanOrEqual(320 + 85); // At least 405 u/s
      expect(m.guidance.maxSpeed).toBeGreaterThanOrEqual(320 + 210); // At least 530 u/s
      expect(m.guidance.currentSpeed).toBeGreaterThan(ship.getSpeed());

      // Advance 50 more frames: ship can never catch up or overtake the missile
      let prevDistance = m.group.position.distanceTo(ship.position);
      for (let i = 0; i < 50; i++) {
        const dt = 1 / 60;
        ship.position.addScaledVector(ship.velocity, dt);
        weapons.update(dt, ship, new Map(), () => {});

        const currentDistance = m.group.position.distanceTo(ship.position);
        expect(currentDistance).toBeGreaterThan(prevDistance);
        prevDistance = currentDistance;
      }
    });

    it('should broadcast missile velocity in network packet and deserialize properly in spawnRemoteMissile', () => {
      let broadcastPayload = null;
      mockNetwork.broadcastMissile = (data) => {
        broadcastPayload = data;
      };

      ship.velocity.set(15, -10, -90);
      weapons.triggerSecondary(true, ship, 1000);

      expect(broadcastPayload).toBeDefined();
      expect(broadcastPayload.velocity).toEqual({ x: 15, y: -10, z: -90 });

      // Test spawnRemoteMissile with deserialized velocity
      weapons.spawnRemoteMissile({
        id: 'remote-missile-100',
        origin: { x: 50, y: 20, z: 100 },
        dir: { x: 0, y: 0, z: -1 },
        velocity: { x: 0, y: 0, z: -90 },
        targetPeerId: null
      }, 'peer-remote-host');

      const remoteM = weapons.missiles[weapons.missiles.length - 1];
      expect(remoteM.guidance.inheritedSpeed).toBe(90.0);
      expect(remoteM.guidance.currentSpeed).toBe(175.0);
      expect(remoteM.velocity.z).toBeCloseTo(-175.0, 1);
      expect(remoteM.ownerId).toBe('peer-remote-host');

      // Test backward-compatible fallback when velocity is omitted in network packet
      weapons.spawnRemoteMissile({
        id: 'remote-missile-legacy',
        origin: { x: 0, y: 0, z: 0 },
        dir: { x: 0, y: 0, z: -1 },
        targetPeerId: null
      }, 'peer-legacy-host');

      const legacyM = weapons.missiles[weapons.missiles.length - 1];
      expect(legacyM.guidance.inheritedSpeed).toBe(0);
      expect(legacyM.guidance.currentSpeed).toBe(85.0);
    });

    it('should integrate and aerodynamically damp lateral velocity component', () => {
      // Ship moving sideways at (40, 0, 0) while firing forward along (0, 0, -1)
      const origin = new THREE.Vector3(0, 0, 0);
      const dir = new THREE.Vector3(0, 0, -1);
      const shipVel = new THREE.Vector3(40, 0, 0);

      const m = weapons.spawnMissile(origin, dir, null, true, 'm-lateral', shipVel);
      expect(m.guidance.inheritedSpeed).toBe(0); // Orthogonal to forward
      expect(m.guidance.currentSpeed).toBe(85.0);
      expect(m.lateralVelocity.x).toBe(40.0);

      const initialLateralSpeed = m.lateralVelocity.length();
      expect(initialLateralSpeed).toBe(40.0);

      // Advance several frames
      for (let i = 0; i < 30; i++) {
        weapons.update(1 / 60, ship, new Map(), () => {});
      }

      // Lateral velocity should have damped down smoothly
      expect(m.lateralVelocity.length()).toBeLessThan(initialLateralSpeed);
      expect(m.lateralVelocity.length()).toBeGreaterThan(0);
      // Position moved both forward and laterally
      expect(m.group.position.x).toBeGreaterThan(0);
      expect(m.group.position.z).toBeLessThan(0);
    });

    it('should serialize velocity with fallback {x:0, y:0, z:0} in GameNetwork.prototype.broadcastMissile', () => {
      let sentPayload = null;
      const fakeNetwork = {
        sendMissile: (p) => { sentPayload = p; }
      };

      // When velocity is provided
      GameNetwork.prototype.broadcastMissile.call(fakeNetwork, {
        id: 'test-m-1',
        origin: { x: 1, y: 2, z: 3 },
        dir: { x: 0, y: 0, z: -1 },
        velocity: { x: 5, y: 10, z: -90 }
      });
      expect(sentPayload.velocity).toEqual({ x: 5, y: 10, z: -90 });

      // When velocity is omitted
      GameNetwork.prototype.broadcastMissile.call(fakeNetwork, {
        id: 'test-m-2',
        origin: { x: 1, y: 2, z: 3 },
        dir: { x: 0, y: 0, z: -1 }
      });
      expect(sentPayload.velocity).toEqual({ x: 0, y: 0, z: 0 });
    });
  });
});
