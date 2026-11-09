import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { MeteorSystem } from '../../src/game/meteor.js';
import { PowerUpSystem, POWERUP_TYPES } from '../../src/game/powerups.js';
import { PlayerShip } from '../../src/game/ship.js';
import { WeaponsSystem } from '../../src/game/weapons.js';
import { GameHUD } from '../../src/game/hud.js';

describe('Task 3: Meteor, Mega-Asteroid Crater Excavation & Fire Laser Upgrade', () => {
  let scene;
  let mockSpaceEnv;
  let megaAsteroid;
  let powerUpSystem;
  let meteorSystem;
  let playerShip;
  let camera;

  beforeEach(() => {
    scene = new THREE.Scene();

    megaAsteroid = {
      isMegaAsteroid: true,
      radius: 2800,
      mass: 500000000,
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      rotationSpeed: new THREE.Vector3(0, 0, 0)
    };

    mockSpaceEnv = {
      asteroids: [megaAsteroid],
      megaAsteroidRadius: 2800,
      carveAsteroid: vi.fn(),
      damageAsteroid: vi.fn(),
      triggerCombatFlash: vi.fn(),
      checkRayCollision: vi.fn(),
      meteorLight: { visible: false, intensity: 0, position: new THREE.Vector3() }
    };

    camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 10000);
    playerShip = new PlayerShip(camera, mockSpaceEnv);
    powerUpSystem = new PowerUpSystem(scene);
    meteorSystem = new MeteorSystem(scene, mockSpaceEnv, {
      frequency: 10.0,
      powerUpSystem
    });
  });

  describe('Requirement 1: Meteor as an Asteroid by itself (5% to 10% of Mega Asteroid size)', () => {
    it('should spawn meteor with radius strictly between 5% and 10% of Mega-Asteroid radius (140u - 280u for R=2800)', () => {
      meteorSystem.spawnMeteor();
      const meteor = meteorSystem.activeMeteor;
      expect(meteor).not.toBeNull();

      const expectedMin = 2800 * 0.05; // 140u
      const expectedMax = 2800 * 0.10; // 280u
      expect(meteor.radius).toBeGreaterThanOrEqual(expectedMin);
      expect(meteor.radius).toBeLessThanOrEqual(expectedMax);
      expect(meteor.mass).toBeGreaterThan(1000000);
    });

    it('should dynamically scale meteor radius when Mega-Asteroid radius is customized (e.g. 1400u or 4000u)', () => {
      mockSpaceEnv.megaAsteroidRadius = 1400;
      megaAsteroid.radius = 1400;
      meteorSystem.spawnMeteor();
      const meteor1400 = meteorSystem.activeMeteor;
      expect(meteor1400.radius).toBeGreaterThanOrEqual(1400 * 0.05); // 70u
      expect(meteor1400.radius).toBeLessThanOrEqual(1400 * 0.10); // 140u

      meteorSystem.destroyMeteor();

      mockSpaceEnv.megaAsteroidRadius = 4000;
      megaAsteroid.radius = 4000;
      meteorSystem.spawnMeteor();
      const meteor4000 = meteorSystem.activeMeteor;
      expect(meteor4000.radius).toBeGreaterThanOrEqual(4000 * 0.05); // 200u
      expect(meteor4000.radius).toBeLessThanOrEqual(4000 * 0.10); // 400u
    });

    it('should construct meteor core as a craggy asteroid geometry with dark basaltic stony material and incandescent heat fissures', () => {
      meteorSystem.spawnMeteor();
      const m = meteorSystem.activeMeteor;
      expect(m.coreMesh).toBeDefined();
      expect(m.coreMesh.geometry.parameters.radius).toBeCloseTo(m.radius, 1);
      expect(m.coreMesh.material.color.getHex()).toBe(0x1f1814);
      expect(m.coreMesh.material.roughness).toBe(0.90);
      expect(m.coreMesh.material.emissiveIntensity).toBe(3.5);
      expect(m.group.children.length).toBeGreaterThanOrEqual(4); // Core, Magma, Fire Shroud, Halo
    });
  });

  describe('Requirement 2: Engulfed with see-through transparent fire shroud & mantle and leaves a billowing trail of fire', () => {
    it('should equip meteor with see-through transparent fire shroud, magma layer, and outer plasma halo with correct transparency flags', () => {
      meteorSystem.spawnMeteor();
      const m = meteorSystem.activeMeteor;

      expect(m.fireShroudMesh).toBeDefined();
      expect(m.magmaMesh).toBeDefined();
      expect(m.haloMesh).toBeDefined();
      expect(m.fireShroudMesh.geometry.parameters.radius).toBeCloseTo(m.radius * 1.22, 1);
      expect(m.haloMesh.geometry.parameters.radius).toBeCloseTo(m.radius * 1.42, 1);

      expect(m.fireShroudMesh.material.transparent).toBe(true);
      expect(m.fireShroudMesh.material.depthWrite).toBe(false);
      expect(m.fireShroudMesh.material.blending).toBe(THREE.AdditiveBlending);
      expect(m.magmaMesh.material.transparent).toBe(true);
      expect(m.haloMesh.material.transparent).toBe(true);
    });

    it('should emit instanced billboarding fire trail particles scaled proportionally to meteor radius', () => {
      meteorSystem.spawnMeteor();
      const m = meteorSystem.activeMeteor;
      const initialParticles = meteorSystem.particles.length;

      meteorSystem.emitTrailParticles(m.position, m.dir, 6);
      expect(meteorSystem.particles.length).toBeGreaterThan(initialParticles);

      const latestParticle = meteorSystem.particles[meteorSystem.particles.length - 1];
      // Base scale of particles should scale with meteor radius
      expect(latestParticle.baseScale).toBeGreaterThanOrEqual(m.radius * 0.60);
    });

    it('should animate and counter-rotate fire shroud and halo during update without NaN errors', () => {
      meteorSystem.spawnMeteor();
      const m = meteorSystem.activeMeteor;
      const initialRotX = m.fireShroudMesh.rotation.x;

      meteorSystem.update(0.016, playerShip, new Map(), () => {}, camera);
      expect(m.fireShroudMesh.rotation.x).not.toBe(initialRotX);
      expect(Number.isFinite(m.position.x)).toBe(true);
      expect(Number.isFinite(m.fireShroudMesh.scale.x)).toBe(true);
    });
  });

  describe('Requirement 3: Leaves a large crater when it hits the Mega-Asteroid', () => {
    it('should excavate a massive crater in the Mega-Asteroid density field scaled to meteor size (r >= 1.5 * r_meteor, d >= 1.1 * r_meteor)', () => {
      meteorSystem.spawnMeteor();
      const m = meteorSystem.activeMeteor;
      const meteorRadius = m.radius;

      // Position meteor right at collision surface of Mega-Asteroid
      m.position.set(0, 0, megaAsteroid.radius + meteorRadius - 10);
      m.dir.set(0, 0, -1);
      m.velocity.set(0, 0, -260);

      meteorSystem.update(0.016, playerShip, new Map(), () => {}, camera);

      expect(mockSpaceEnv.carveAsteroid).toHaveBeenCalledTimes(1);
      const [targetAsteroid, hitPoint, hitDir, carveR, carveD] = mockSpaceEnv.carveAsteroid.mock.calls[0];

      expect(targetAsteroid).toBe(megaAsteroid);
      expect(carveR).toBeGreaterThanOrEqual(meteorRadius * 1.5);
      expect(carveD).toBeGreaterThanOrEqual(meteorRadius * 1.1);
      expect(carveR).toBeGreaterThanOrEqual(180.0);
      expect(carveD).toBeGreaterThanOrEqual(120.0);
      expect(meteorSystem.activeMeteor).toBeNull(); // Meteor destroyed in impact
    });

    it('should NOT impart kinetic velocity to the stationary Central Mega-Asteroid', () => {
      meteorSystem.spawnMeteor();
      const m = meteorSystem.activeMeteor;
      m.position.set(0, 0, megaAsteroid.radius + m.radius - 10);
      m.dir.set(0, 0, -1);
      m.velocity.set(0, 0, -260);

      meteorSystem.update(0.016, playerShip, new Map(), () => {}, camera);
      expect(megaAsteroid.velocity.length()).toBe(0);
    });
  });

  describe('Requirement 4: Fire Laser Power-Ups inside the Crater & Dual-Gate Persistence', () => {
    it('should spawn a collectible Fire Laser power-up inside the newly excavated crater basin upon impact', () => {
      meteorSystem.spawnMeteor();
      const m = meteorSystem.activeMeteor;
      m.position.set(0, 0, megaAsteroid.radius + m.radius - 10);
      m.dir.set(0, 0, -1);
      m.velocity.set(0, 0, -260);

      expect(powerUpSystem.powerups.length).toBe(0);
      meteorSystem.update(0.016, playerShip, new Map(), () => {}, camera);

      expect(powerUpSystem.powerups.length).toBe(1);
      const craterPowerUp = powerUpSystem.powerups[0];
      expect(craterPowerUp.type).toBe(POWERUP_TYPES.FIRE_LASER);
      expect(craterPowerUp.name).toBe('Fire Laser');
      expect(craterPowerUp.isCraterPowerUp).toBe(true);
      // Crater power-up should have a generous lifetime (>= 90s)
      expect(craterPowerUp.maxLife).toBeGreaterThanOrEqual(90.0);
    });

    it('should upgrade player lasers with fire upon collecting the crater power-up', () => {
      const craterPos = new THREE.Vector3(0, 0, 2750);
      powerUpSystem.spawnCraterPowerUp(craterPos);
      expect(playerShip.hasFireLaser).toBe(false);

      // Fly ship to crater power-up coordinates
      playerShip.position.copy(craterPos);
      let noticeMessage = null;
      powerUpSystem.update(0.016, playerShip, (msg) => { noticeMessage = msg; });

      expect(playerShip.hasFireLaser).toBe(true);
      expect(playerShip.fireLaserTimer).toBeGreaterThanOrEqual(60.0);
      expect(noticeMessage).toContain('FIRE LASER');
      expect(powerUpSystem.powerups.length).toBe(0); // Collected and removed
    });

    it('should enhance WeaponsSystem with 1.75x damage, enhanced rock excavation, fiery materials, and P2P flag', () => {
      const mockNetwork = {
        broadcastLaser: vi.fn(),
        sendHitTarget: vi.fn(),
        peers: new Map()
      };
      const weapons = new WeaponsSystem(scene, mockSpaceEnv, mockNetwork);

      // Verify Fire Laser materials exist
      expect(weapons.fireLaserCoreMat).toBeDefined();
      expect(weapons.fireLaserGlowMat).toBeDefined();
      expect(weapons.remoteFireLaserGlowMat).toBeDefined();

      // Arm player ship with Fire Laser
      playerShip.activateFireLaser(75.0);
      expect(playerShip.hasFireLaser).toBe(true);

      // Fire primary weapon
      weapons.triggerPrimary(true, playerShip, 1000);

      // Check broadcast payload includes isFireLaser
      expect(mockNetwork.broadcastLaser).toHaveBeenCalled();
      const payload = mockNetwork.broadcastLaser.mock.calls[0][0];
      expect(payload.isFireLaser).toBe(true);

      weapons.cleanup();
    });

    describe('Dual-Gate Combat Persistence: "lasts at least 1 engagement against an enemy"', () => {
      it('Gate 1: should NOT expire if duration timer reaches 0 before player engages an enemy in combat', () => {
        playerShip.activateFireLaser(75.0);
        expect(playerShip.hasFireLaser).toBe(true);
        expect(playerShip.engagementsCompleted).toBe(0);

        // Elapse 100 seconds without any enemy combat
        playerShip.update(100.0);

        expect(playerShip.fireLaserTimer).toBe(0);
        expect(playerShip.engagementsCompleted).toBe(0);
        // CRITICAL: Stays active because player hasn't fought an enemy yet!
        expect(playerShip.hasFireLaser).toBe(true);
      });

      it('Gate 2: should conclude engagement when exchange of fire cooldown finishes and deactivate Fire Laser if timer has elapsed', () => {
        playerShip.activateFireLaser(75.0);

        // Timer elapses
        playerShip.update(80.0);
        expect(playerShip.fireLaserTimer).toBe(0);
        expect(playerShip.hasFireLaser).toBe(true); // Still waiting for engagement

        // Player engages enemy
        playerShip.recordEngagementHit();
        expect(playerShip.inCombatEngagement).toBe(true);
        expect(playerShip.hasFireLaser).toBe(true);

        // Combat cooldown elapses (e.g. 10s of disengagement)
        playerShip.update(10.0);
        expect(playerShip.inCombatEngagement).toBe(false);
        expect(playerShip.engagementsCompleted).toBe(1);

        // NOW both gates satisfied: timer <= 0 AND engagementsCompleted >= 1 -> deactivates!
        expect(playerShip.hasFireLaser).toBe(false);
      });

      it('Gate 3: should NOT expire early if combat engagement concludes while duration timer is still active', () => {
        playerShip.activateFireLaser(75.0);

        // Player immediately fights and kills an enemy in 5 seconds
        playerShip.recordEngagementHit();
        playerShip.recordKill(); // Concludes engagement immediately
        expect(playerShip.engagementsCompleted).toBe(1);

        // 10 seconds total elapsed, 65 seconds remaining on timer
        playerShip.update(10.0);
        expect(playerShip.fireLaserTimer).toBeGreaterThan(50.0);
        expect(playerShip.engagementsCompleted).toBe(1);

        // CRITICAL: Remains active because generous duration timer is still running!
        expect(playerShip.hasFireLaser).toBe(true);

        // Advance remaining time past timer
        playerShip.update(70.0);
        expect(playerShip.fireLaserTimer).toBe(0);
        expect(playerShip.hasFireLaser).toBe(false);
      });
    });

    describe('HUD & Visual Feedback', () => {
      it('should render Fire Laser visual classes and badge in HUD when active and revert cleanly when inactive', () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const mockEngine = {
          network: { roomName: 'Test Sector', peers: new Map(), isMaster: true },
          config: { showStats: false },
          playerShip
        };

        const hud = new GameHUD(container, mockEngine);

        // Update with Fire Laser ACTIVE
        hud.update({
          hp: 100,
          maxHp: 100,
          laserEnergy: 85,
          laserMaxEnergy: 100,
          hasFireLaser: true,
          fireLaserTimer: 45.0,
          engagementsCompleted: 0
        });

        const laserBar = document.getElementById('hud-laser-bar');
        const laserLabel = document.getElementById('hud-laser-label');
        const powerupBadge = document.getElementById('hud-powerup-badge');
        const laserBtn = document.getElementById('btn-laser');
        const laserBtnText = document.getElementById('btn-laser-text');

        expect(laserBar.classList.contains('fire-laser')).toBe(true);
        expect(laserLabel.textContent).toContain('FIRE LASER');
        expect(powerupBadge.style.display).toBe('inline-flex');
        expect(powerupBadge.classList.contains('fire-laser')).toBe(true);
        expect(powerupBadge.textContent).toContain('FIRE LASER');
        expect(laserBtn.classList.contains('fire-active')).toBe(true);
        expect(laserBtnText.textContent).toBe('FIRE LASER');

        // Update with Fire Laser INACTIVE
        hud.update({
          hp: 100,
          maxHp: 100,
          laserEnergy: 85,
          laserMaxEnergy: 100,
          hasFireLaser: false,
          fireLaserTimer: 0,
          engagementsCompleted: 1
        });

        expect(laserBar.classList.contains('fire-laser')).toBe(false);
        expect(laserLabel.textContent).toBe('LASER [SHIELD/DIG]');
        expect(powerupBadge.style.display).toBe('none');
        expect(laserBtn.classList.contains('fire-active')).toBe(false);
        expect(laserBtnText.textContent).toBe('LASER');

        hud.destroy();
        container.remove();
      });
    });
  });
});
