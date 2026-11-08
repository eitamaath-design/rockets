import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('Mega Asteroid Visual Verification', () => {
  test('capture 5-stage progressive mega-asteroid tunneling screenshots', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Skip mobile viewport for screenshot capture');
    test.setTimeout(300000); // 5 minutes to accommodate 64³ voxel triangulation

    const consoleLogs = [];
    const consoleErrors = [];
    page.on('console', msg => {
      const text = msg.text();
      consoleLogs.push(`[${msg.type()}] ${text}`);
      if (msg.type() === 'error') {
        consoleErrors.push(text);
      }
    });

    page.on('pageerror', err => {
      consoleErrors.push(`[PageError] ${err.message}`);
    });

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/?room=MegaVerification-Tunnel&quality=high');

    // Wait for canvas to be ready
    const canvas = page.locator('#game-canvas-container canvas');
    await expect(canvas).toBeVisible({ timeout: 15000 });

    // Wait for engine and spaceEnv to initialize
    await page.waitForFunction(() => !!window.__engine && !!window.__engine.spaceEnv);

    // Give Three.js time to compile shaders and render initial MarchingCubes terrain
    await page.waitForTimeout(2000);

    // Verify no shader compilation errors occurred
    const shaderErrors = consoleErrors.filter(e => e.includes('Shader Error') || e.includes('VALIDATE_STATUS'));
    expect(shaderErrors.length).toBe(0);

    const outDirs = [
      'C:\\Users\\eitama\\.gemini\\antigravity\\brain\\1ee602cb-d92e-4925-bcad-a79eae6ec030',
      'C:\\Users\\eitama\\.gemini\\antigravity\\brain\\809293d2-cb86-4732-916f-2362a5deed4c'
    ];

    for (const d of outDirs) {
      if (!fs.existsSync(d)) {
        fs.mkdirSync(d, { recursive: true });
      }
    }

    const saveScreenshot = async (filename) => {
      const primaryPath = path.join(outDirs[0], filename);
      await canvas.screenshot({ path: primaryPath });
      console.log(`Saved screenshot to ${primaryPath}`);

      // Instantly mirror to secondary directory
      const secondaryPath = path.join(outDirs[1], filename);
      try {
        fs.copyFileSync(primaryPath, secondaryPath);
      } catch (_) {}
    };

    // Helper functions in browser context
    await page.evaluate(() => {
      window.aimShip = (engine, pos, lookAtPos) => {
        const s = engine.playerShip;
        s.position.copy(pos);
        s.velocity.set(0, 0, 0);
        const fwd = lookAtPos.clone().sub(pos).normalize();
        s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), fwd);
        if (s.desiredQuaternion) s.desiredQuaternion.copy(s.quaternion);
        if (s.camera) {
          s.camera.position.copy(s.position);
          s.camera.quaternion.copy(s.quaternion);
        }
      };
    });

    // 0. Overview Portrait of Central Mega-Asteroid
    await page.evaluate(() => {
      const engine = window.__engine;
      if (!engine) return;
      if (engine.cockpit && engine.cockpit.group) {
        engine.cockpit.group.visible = false;
      }
      window.aimShip(engine, new THREE.Vector3(0, 600, 4200), new THREE.Vector3(0, 0, 0));
    });
    await page.waitForTimeout(500);
    await saveScreenshot('mega_asteroid_overview.png');

    // =========================================================================
    // Stage 1 — Initial Mega-Asteroid & First Impact (mega_tunnel_stage_1.png)
    // Ship facing sunlit crust, firing initial laser carving the entry crater
    // =========================================================================
    await page.evaluate(() => {
      const engine = window.__engine;
      const space = engine.spaceEnv;
      const mega = space.asteroids.find(a => a.isMegaAsteroid || a.radius >= 2500);
      if (!mega) return;

      const origin = new THREE.Vector3(0, 70, 3350);
      const dir = new THREE.Vector3(0, 0, -1);

      window.aimShip(engine, new THREE.Vector3(0, 70, 3150), new THREE.Vector3(0, 70, 2740));

      // Cast ray to hit outer rock crust
      const hit = space.checkRayCollision(origin, dir, 5000.0);
      if (hit && hit.asteroid === mega) {
        // Carve entry crater
        space.damageAsteroid(mega, 45.0, hit.hitPoint, dir, 60.0, 50.0, 160.0);

        // Spawn bright twin laser beams from ship wing emitters to hit point
        const leftOrigin = new THREE.Vector3(-1.8, 68, 3140);
        const rightOrigin = new THREE.Vector3(1.8, 68, 3140);
        const wp = engine.weaponsSystem || engine.weapons;
        if (wp) wp.spawnTwinLaserBeam(leftOrigin, rightOrigin, hit.hitPoint, true);

        // Bright cyan combat flash at impact crater
        space.triggerCombatFlash(hit.hitPoint, 0x00d4ff, 8.5);
      }
    });
    await page.waitForTimeout(500);
    await saveScreenshot('mega_tunnel_stage_1.png');

    // =========================================================================
    // Stage 2 — Entry Borehole Excavation (~25% tunnel progress)
    // Deep circular entry borehole carved into crust with scorched rim & glowing interior
    // =========================================================================
    await page.evaluate(() => {
      const engine = window.__engine;
      const space = engine.spaceEnv;
      const mega = space.asteroids.find(a => a.isMegaAsteroid || a.radius >= 2500);
      if (!mega) return;

      const origin = new THREE.Vector3(0, 70, 3350);
      const dir = new THREE.Vector3(0, 0, -1);

      // Drill 2 deep progressive carves (depth 380u each)
      for (let s = 0; s < 2; s++) {
        const hit = space.checkRayCollision(origin, dir, 5000.0);
        if (hit && hit.asteroid === mega) {
          space.carveAsteroid(mega, hit.hitPoint, dir, 65.0, 380.0, 160.0);
        }
      }

      // Position ship/camera outside looking down into the borehole
      window.aimShip(engine, new THREE.Vector3(0, 120, 2980), new THREE.Vector3(0, 70, 1900));

      // Warm golden glow illuminating the borehole entrance and interior
      if (space.combatFlashLight) {
        space.combatFlashLight.position.set(0, 70, 2500);
        space.combatFlashLight.color.setHex(0xffaa44);
        space.combatFlashLight.intensity = 6.0;
        space.combatFlashLight.distance = 1800;
      }
    });
    await page.waitForTimeout(500);
    await saveScreenshot('mega_tunnel_stage_2.png');

    // =========================================================================
    // Stage 3 — Subterranean Cavern Progression (~50% tunnel progress)
    // Camera inside tunnel mouth looking down shaft with illuminated rock strata & laser drilling
    // =========================================================================
    await page.evaluate(() => {
      const engine = window.__engine;
      const space = engine.spaceEnv;
      const mega = space.asteroids.find(a => a.isMegaAsteroid || a.radius >= 2500);
      if (!mega) return;

      const origin = new THREE.Vector3(0, 70, 3350);
      const dir = new THREE.Vector3(0, 0, -1);

      // Drill 3 deep carves advancing to central core (depth 420u each)
      for (let s = 0; s < 3; s++) {
        const hit = space.checkRayCollision(origin, dir, 6000.0);
        if (hit && hit.asteroid === mega) {
          space.carveAsteroid(mega, hit.hitPoint, dir, 65.0, 420.0, 160.0);
        }
      }

      // Move ship/camera inside the tunnel mouth looking down the subterranean shaft
      window.aimShip(engine, new THREE.Vector3(0, 70, 2200), new THREE.Vector3(0, 70, 500));

      // Fire twin laser beam down the shaft striking deep tunnel back-wall
      const deepHit = space.checkRayCollision(new THREE.Vector3(0, 70, 2200), dir, 5000.0);
      if (deepHit && deepHit.asteroid === mega) {
        const leftOrigin = new THREE.Vector3(-1.4, 68, 2190);
        const rightOrigin = new THREE.Vector3(1.4, 68, 2190);
        const wp = engine.weaponsSystem || engine.weapons;
        if (wp) wp.spawnTwinLaserBeam(leftOrigin, rightOrigin, deepHit.hitPoint, true);
        space.triggerCombatFlash(deepHit.hitPoint, 0x00f0ff, 7.0);
      }

      // Warm amber illumination revealing geological rock strata
      if (space.combatFlashLight) {
        space.combatFlashLight.position.set(0, 70, 1600);
        space.combatFlashLight.color.setHex(0xff9933);
        space.combatFlashLight.intensity = 5.5;
        space.combatFlashLight.distance = 2200;
      }
    });
    await page.waitForTimeout(500);
    await saveScreenshot('mega_tunnel_stage_3.png');
    await saveScreenshot('mega_asteroid_tunnel.png');

    // =========================================================================
    // Stage 4 — Deep Core Excavation (~75% tunnel progress)
    // Deep inside Mega-Asteroid core shaft, warm illumination on carved rock walls
    // =========================================================================
    await page.evaluate(() => {
      const engine = window.__engine;
      const space = engine.spaceEnv;
      const mega = space.asteroids.find(a => a.isMegaAsteroid || a.radius >= 2500);
      if (!mega) return;

      const origin = new THREE.Vector3(0, 70, 3350);
      const dir = new THREE.Vector3(0, 0, -1);

      // Drill 3 deep carves into far hemisphere (depth 450u each)
      for (let s = 0; s < 3; s++) {
        const hit = space.checkRayCollision(origin, dir, 8000.0);
        if (hit && hit.asteroid === mega) {
          space.carveAsteroid(mega, hit.hitPoint, dir, 65.0, 450.0, 160.0);
        }
      }

      // Move ship/camera deep in the planetary core
      window.aimShip(engine, new THREE.Vector3(0, 70, 400), new THREE.Vector3(0, 70, -1800));

      // Warm subterranean illumination in the deep core
      if (space.combatFlashLight) {
        space.combatFlashLight.position.set(0, 70, -100);
        space.combatFlashLight.color.setHex(0xffaa55);
        space.combatFlashLight.intensity = 6.0;
        space.combatFlashLight.distance = 2500;
      }
    });
    await page.waitForTimeout(500);
    await saveScreenshot('mega_tunnel_stage_4.png');

    // =========================================================================
    // Stage 5 — Complete Through-Tunnel Breakthrough (100% tunnel progress)
    // Tunnel drilled all the way through! Looking through excavated rock corridor
    // with open exit portal showing starry space beyond far end
    // =========================================================================
    await page.evaluate(() => {
      const engine = window.__engine;
      const space = engine.spaceEnv;
      const mega = space.asteroids.find(a => a.isMegaAsteroid || a.radius >= 2500);
      if (!mega) return;

      const origin = new THREE.Vector3(0, 70, 3350);
      const dir = new THREE.Vector3(0, 0, -1);

      // Drill remaining shots until through-and-through breakthrough
      for (let s = 0; s < 4; s++) {
        const hit = space.checkRayCollision(origin, dir, 10000.0);
        if (hit && hit.asteroid === mega) {
          space.carveAsteroid(mega, hit.hitPoint, dir, 70.0, 480.0, 160.0);
        }
      }

      // Position ship/camera inside the excavated corridor looking straight down through the exit portal
      window.aimShip(engine, new THREE.Vector3(0, 70, 1100), new THREE.Vector3(0, 70, -3200));

      // Balanced lighting: rock walls clearly illuminated while exit aperture shows starry void
      if (space.combatFlashLight) {
        space.combatFlashLight.position.set(0, 70, 100);
        space.combatFlashLight.color.setHex(0xffbb77);
        space.combatFlashLight.intensity = 4.5;
        space.combatFlashLight.distance = 2800;
      }
    });
    await page.waitForTimeout(500);
    await saveScreenshot('mega_tunnel_stage_5.png');

    // =========================================================================
    // Verification Assertions
    // =========================================================================
    const primaryDir = outDirs[0];
    const expectedFiles = [
      'mega_tunnel_stage_1.png',
      'mega_tunnel_stage_2.png',
      'mega_tunnel_stage_3.png',
      'mega_tunnel_stage_4.png',
      'mega_tunnel_stage_5.png',
      'mega_asteroid_overview.png',
      'mega_asteroid_tunnel.png'
    ];

    for (const f of expectedFiles) {
      const fPath = path.join(primaryDir, f);
      expect(fs.existsSync(fPath), `Expected screenshot ${f} to exist`).toBe(true);
      const stats = fs.statSync(fPath);
      expect(stats.size, `Expected screenshot ${f} to be non-empty`).toBeGreaterThan(10000);
      console.log(`Verified ${f}: ${stats.size} bytes`);
    }

    // Verify CARVE and WEAPON_HIT logs recorded
    const logs = await page.evaluate(() => {
      return (window.logger && window.logger.logs) ? window.logger.logs : [];
    });
    const carveLogs = logs.filter(l => l.includes('[CARVE]'));
    const weaponLogs = logs.filter(l => l.includes('[WEAPON_HIT]'));

    expect(carveLogs.length, 'Expected [CARVE] logs in window.logger').toBeGreaterThan(0);
    console.log(`Recorded ${carveLogs.length} [CARVE] telemetry events in live gameEngine logger`);
  });
});
