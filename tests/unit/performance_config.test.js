import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { SpaceEnvironment, applyTriplanarRockShader, updateNormalCache } from '../../src/game/space.js';
import { ThrusterTrailSystem } from '../../src/game/trail.js';
import { WeaponsSystem } from '../../src/game/weapons.js';
import { MeteorSystem } from '../../src/game/meteor.js';
import { GameHUD } from '../../src/game/hud.js';

describe('GPU/CPU Performance Optimizations & Room Configuration Suite', () => {
  let scene;

  beforeEach(() => {
    scene = new THREE.Scene();
  });

  describe('Optimization 1: Hardware Derivative (dFdx/dFdy) Rock Shader & Localized AABB Normal Updates', () => {
    it('should configure applyTriplanarRockShader with hardware screen-space derivatives (dFdx/dFdy) in low and balanced modes and full detail in high mode', () => {
      const matLow = new THREE.MeshStandardMaterial();
      applyTriplanarRockShader(matLow, 1, 'low');
      const shaderLow = { fragmentShader: '#include <common>\n#include <color_fragment>\n#include <normal_fragment_maps>', vertexShader: '#include <common>\n#include <worldpos_vertex>' };
      matLow.onBeforeCompile(shaderLow);
      expect(shaderLow.fragmentShader).toContain('dFdx(vRockHeightSignal)');
      expect(shaderLow.fragmentShader).toContain('dFdy(vRockHeightSignal)');
      expect(shaderLow.fragmentShader).not.toContain('rockDetailHeight(');

      const matBalanced = new THREE.MeshStandardMaterial();
      applyTriplanarRockShader(matBalanced, 2, 'balanced');
      const shaderBal = { fragmentShader: '#include <common>\n#include <color_fragment>\n#include <normal_fragment_maps>', vertexShader: '#include <common>\n#include <worldpos_vertex>' };
      matBalanced.onBeforeCompile(shaderBal);
      expect(shaderBal.fragmentShader).toContain('dFdx(vRockHeightSignal)');
      expect(shaderBal.fragmentShader).toContain('fissureLine');
      expect(shaderBal.fragmentShader).not.toContain('rockDetailHeight(');

      const matHigh = new THREE.MeshStandardMaterial();
      applyTriplanarRockShader(matHigh, 3, 'high');
      const shaderHigh = { fragmentShader: '#include <common>\n#include <color_fragment>\n#include <normal_fragment_maps>', vertexShader: '#include <common>\n#include <worldpos_vertex>' };
      matHigh.onBeforeCompile(shaderHigh);
      expect(shaderHigh.fragmentShader).toContain('rockDetailHeight(');
    });

    it('should recompute normals only within the dirty sub-volume AABB when bounds are passed to updateNormalCache', () => {
      const space = new SpaceEnvironment(scene, 42, { voxelQuality: 'low', asteroidCount: 5 });
      const mega = space.asteroids[0];
      const fullCount = updateNormalCache(mega.mc);
      const localCount = updateNormalCache(mega.mc, 10, 14, 10, 14, 10, 14);
      expect(localCount).toBe(5 * 5 * 5);
      expect(localCount).toBeLessThan(fullCount * 0.05);
      space.destroy();
    });
  });

  describe('Optimization 2 & 3: Backface Culling, Frustum Bounding Spheres & Right-Sized Belt VBOs', () => {
    it('should use THREE.FrontSide on belt asteroids and THREE.DoubleSide on the Central Mega-Asteroid with computed boundingSpheres', () => {
      const space = new SpaceEnvironment(scene, 77, { voxelQuality: 'low', asteroidCount: 8 });
      expect(space.beltMaterial.side).toBe(THREE.FrontSide);
      expect(space.megaMaterial.side).toBe(THREE.DoubleSide);

      const mega = space.asteroids[0];
      const belt = space.asteroids[1];
      expect(mega.mc.frustumCulled).toBe(true);
      expect(belt.mc.frustumCulled).toBe(true);
      expect(mega.mc.geometry.boundingSphere).not.toBeNull();
      expect(belt.mc.geometry.boundingSphere).not.toBeNull();
      expect(mega.mc.maxPolys).toBeGreaterThanOrEqual(100000);
      expect(belt.mc.maxPolys).toBeGreaterThanOrEqual(30000);
      // Right-sized internal VBO buffer (6000 * 3 = 18000 vertices * 3 floats = 54000 floats)
      expect(belt.mc.positionArray.length).toBe(6000 * 9);
      space.destroy();
    });
  });

  describe('Optimization 4: Dirty-Range InstancedMesh GPU Buffer Uploads & Particle Density Scaling', () => {
    it('should perform 0 setMatrixAt calls when particle systems are idle and only clear dirty range when particles expire', () => {
      const trails = new ThrusterTrailSystem(scene);
      const setMatrixSpy = vi.spyOn(trails.mesh, 'setMatrixAt');

      // Idle frame: 0 active, 0 prev -> 0 setMatrixAt calls
      trails.update(0.016);
      expect(setMatrixSpy).toHaveBeenCalledTimes(0);

      // Emit 1 particle (no prior history -> 1 puff)
      trails.emit(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1), false, 'ship1');
      expect(trails.particles.length).toBe(1);

      trails.update(0.016);
      expect(setMatrixSpy).toHaveBeenCalledTimes(1);
      setMatrixSpy.mockClear();

      // Expire the particle: 0 active, 1 prev -> only 1 hideMatrix write (not 2400!)
      trails.update(20.0);
      expect(trails.particles.length).toBe(0);
      expect(setMatrixSpy).toHaveBeenCalledTimes(1);
      setMatrixSpy.mockClear();

      // Next idle frame: 0 calls again
      trails.update(0.016);
      expect(setMatrixSpy).toHaveBeenCalledTimes(0);
      trails.cleanup();
    });

    it('should scale particle counts according to particleDensity (low = 0.5x, balanced = 1.0x, high = 1.5x)', () => {
      const space = new SpaceEnvironment(scene, 55, { voxelQuality: 'low', asteroidCount: 5, particleDensity: 'low' });
      expect(space.particleDensityMultiplier).toBe(0.5);
      space.spawnRockDebris(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 10);
      expect(space.debrisList.length).toBe(5);

      const weapons = new WeaponsSystem(scene, space, null);
      weapons.setParticleDensity('high');
      expect(weapons.particleDensityMultiplier).toBe(1.5);
      weapons.spawnLaserImpactSparks(new THREE.Vector3());
      expect(weapons.explosionQuads.length).toBe(21); // 14 * 1.5 = 21

      weapons.cleanup();
      space.destroy();
    });
  });

  describe('Optimization 5: Dynamic PointLight Define Stability Invariant & Zero-Hitch Intensity Modulation', () => {
    it('should maintain permanent visible = true across combatFlashLight and meteorLight while modulating intensity to avoid mid-game shader recompilation', () => {
      const space = new SpaceEnvironment(scene, 88, { voxelQuality: 'low', asteroidCount: 5 });
      expect(space.combatFlashLight.visible).toBe(true);
      expect(space.combatFlashLight.intensity).toBe(0);
      expect(space.meteorLight.visible).toBe(true);
      expect(space.meteorLight.intensity).toBe(0);

      space.triggerCombatFlash(new THREE.Vector3(10, 20, 30), 0xff5500, 4.0);
      expect(space.combatFlashLight.visible).toBe(true);
      expect(space.combatFlashLight.intensity).toBe(4.0);

      // Decay combatFlashLight to 0
      space.update(1.0, new THREE.Vector3(0, 80, 3200), new THREE.Vector3());
      expect(space.combatFlashLight.intensity).toBe(0);
      // Invariant: visible MUST remain true so Three.js does NOT recompile shaders when firing
      expect(space.combatFlashLight.visible).toBe(true);

      const meteorSys = new MeteorSystem(scene, space, { frequency: 10 });
      meteorSys.spawnMeteor();
      expect(space.meteorLight.visible).toBe(true);
      expect(space.meteorLight.intensity).toBeGreaterThan(0);

      meteorSys.destroyMeteor();
      expect(space.meteorLight.intensity).toBe(0);
      // Invariant: visible MUST remain true
      expect(space.meteorLight.visible).toBe(true);

      meteorSys.cleanup();
      space.destroy();
    });
  });

  describe('HUD Performance Configuration Pill & Lobby Controls', () => {
    it('should display FPS cap and Render Scale (DPI) in #hud-config-pill', () => {
      document.body.innerHTML = '<div id="hud-mount"></div>';
      const mount = document.getElementById('hud-mount');
      const mockEngine = {
        config: {
          voxelQuality: 'high',
          asteroidCount: 100,
          megaRadius: 2800,
          meteorFrequency: 10,
          renderScale: 0.75,
          maxFps: 90,
          shaderQuality: 'balanced',
          particleDensity: 'balanced'
        },
        network: {
          roomName: 'Perf-Sector',
          roomId: 'perf-sector',
          onMapResetVote: () => {}
        },
        playerShip: {
          input: { analogPitch: 0, analogYaw: 0 }
        }
      };

      const hud = new GameHUD(mount, mockEngine);
      const pill = document.getElementById('hud-config-pill');
      expect(pill).not.toBeNull();
      expect(pill.textContent).toContain('VOX: HIGH (64³)');
      expect(pill.textContent).toContain('FPS: 90');
      expect(pill.textContent).toContain('DPI: 0.75x');
      hud.destroy();
    });

    it('should display FPS: MAX when maxFps is 0 (Unlimited) and FPS: 240 for ultra high refresh', () => {
      document.body.innerHTML = '<div id="hud-mount"></div>';
      const mount = document.getElementById('hud-mount');
      const mockEngineUncapped = {
        config: {
          voxelQuality: 'high',
          asteroidCount: 100,
          megaRadius: 2800,
          meteorFrequency: 10,
          renderScale: 1.0,
          maxFps: 0,
          shaderQuality: 'balanced',
          particleDensity: 'balanced'
        },
        network: { roomName: 'Uncapped-Sector', roomId: 'uncapped-sector' },
        playerShip: { input: { analogPitch: 0, analogYaw: 0 } }
      };
      const hud1 = new GameHUD(mount, mockEngineUncapped);
      const pill1 = document.getElementById('hud-config-pill');
      expect(pill1.textContent).toContain('FPS: MAX');
      hud1.destroy();

      document.body.innerHTML = '<div id="hud-mount"></div>';
      const mount2 = document.getElementById('hud-mount');
      const mockEngine240 = {
        config: {
          voxelQuality: 'high',
          asteroidCount: 100,
          megaRadius: 2800,
          meteorFrequency: 10,
          renderScale: 1.0,
          maxFps: 240,
          shaderQuality: 'balanced',
          particleDensity: 'balanced'
        },
        network: { roomName: '240-Sector', roomId: '240-sector' },
        playerShip: { input: { analogPitch: 0, analogYaw: 0 } }
      };
      const hud2 = new GameHUD(mount2, mockEngine240);
      const pill2 = document.getElementById('hud-config-pill');
      expect(pill2.textContent).toContain('FPS: 240');
      hud2.destroy();
    });

    it('should synchronize showStats configuration option across GameHUD and room config', () => {
      document.body.innerHTML = '<div id="hud-mount"></div>';
      const mount = document.getElementById('hud-mount');
      const mockEngine = {
        config: {
          voxelQuality: 'high',
          asteroidCount: 100,
          megaRadius: 2800,
          meteorFrequency: 10,
          renderScale: 1.0,
          maxFps: 60,
          shaderQuality: 'balanced',
          particleDensity: 'balanced',
          showStats: false
        },
        network: {
          roomName: 'NoStats-Sector',
          roomId: 'nostats-sector',
          isMaster: true,
          onMapResetVote: () => {}
        },
        playerShip: {
          input: { analogPitch: 0, analogYaw: 0 }
        }
      };

      const hud = new GameHUD(mount, mockEngine);
      const monitor = document.getElementById('hud-master-monitor');
      hud.update({ isMaster: true, showStats: false });
      expect(monitor.style.display).toBe('none');

      hud.update({ isMaster: true, showStats: true });
      expect(monitor.style.display).toBe('block');
      hud.destroy();
    });

    it('should propagate forwardAccel and momentumShearing through room config and HUD config pill', () => {
      document.body.innerHTML = '<div id="hud-mount"></div>';
      const mount = document.getElementById('hud-mount');
      const mockEngine = {
        config: {
          voxelQuality: 'high',
          asteroidCount: 100,
          megaRadius: 2800,
          meteorFrequency: 10,
          forwardAccel: 120,
          momentumShearing: 0.85,
          renderScale: 1.0,
          maxFps: 120,
          shaderQuality: 'balanced',
          particleDensity: 'balanced'
        },
        network: { roomName: 'Shear-Sector', roomId: 'shear-sector' },
        playerShip: { input: { analogPitch: 0, analogYaw: 0 } }
      };

      const hud = new GameHUD(mount, mockEngine);
      const pill = document.getElementById('hud-config-pill');
      expect(pill.textContent).toContain('ACC: 120');
      expect(pill.textContent).toContain('SHEAR: 0.85');
      hud.destroy();
    });

    it('should clamp network broadcastConfig and onReceive flight parameters', async () => {
      const { GameNetwork } = await import('../../src/net/network.js');
      const net = new GameNetwork({
        roomId: 'test-net-room',
        config: { forwardAccel: 999, momentumShearing: -2.0 }
      });
      net.broadcastConfig({ forwardAccel: 250, momentumShearing: 1.5 });
      expect(net.config.forwardAccel).toBe(180);
      expect(net.config.momentumShearing).toBe(1.0);

      net.broadcastConfig({ forwardAccel: 5, momentumShearing: -0.5 });
      expect(net.config.forwardAccel).toBe(20);
      expect(net.config.momentumShearing).toBe(0.0);
    });
  });
});
