import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('VFX & Particle System Visual Verification', () => {
  test('capture 4 high-fidelity particle, contrail, and explosion screenshots', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Skip mobile viewport for screenshot capture');
    test.setTimeout(120000);

    await page.setViewportSize({ width: 1280, height: 720 });
    // Launch room with low voxel quality for instant loading
    await page.goto('/?room=ParticlesVisual&quality=low&density=50');

    const canvas = page.locator('#game-canvas-container canvas');
    await expect(canvas).toBeVisible({ timeout: 20000 });

    // Wait for engine to initialize
    await page.waitForFunction(() => !!window.gameEngine && !!window.gameEngine.spaceEnv);
    await page.waitForTimeout(1000);

    const outDirs = [
      'C:\\Users\\eitama\\.gemini\\antigravity\\brain\\ab5a4504-cbc0-4190-97d4-907cde6dbc17',
      'C:\\Users\\eitama\\.gemini\\antigravity\\brain\\113672d7-09ff-41f7-a72b-300e13943cc4'
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

      const secondaryPath = path.join(outDirs[1], filename);
      try {
        fs.copyFileSync(primaryPath, secondaryPath);
      } catch (_) {}
    };

    // Stop continuous animation loop and hide cockpit & HUD so we have complete deterministic camera control
    await page.evaluate(() => {
      const engine = window.gameEngine;
      engine.stop();

      if (engine.cockpit && engine.cockpit.group) {
        engine.cockpit.group.visible = false;
      }

      document.querySelectorAll('.hud-container, .touch-controls-layer, #hud-rotate-notice').forEach(el => {
        el.style.display = 'none';
      });
    });

    // =========================================================================
    // 1. Ship Engine Trail (Player Cyan Plasma Wake) -> ship_engine_trail.png
    // =========================================================================
    await page.evaluate(() => {
      const engine = window.gameEngine;
      const trails = engine.thrusterTrails;
      trails.particles = [];
      trails.lastEmitPos.clear();

      // Create a gorgeous player starfighter model at head of trail
      let shipMesh = engine.scene.getObjectByName('visual-player-ship');
      if (!shipMesh) {
        const group = new THREE.Group();
        group.name = 'visual-player-ship';

        const bodyGeo = new THREE.ConeGeometry(1.6, 7.0, 6);
        bodyGeo.rotateX(Math.PI / 2);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0x0f3460,
          roughness: 0.25,
          metalness: 0.85
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        group.add(body);

        const wingGeo = new THREE.BoxGeometry(6.5, 0.15, 2.5);
        const wingMat = new THREE.MeshStandardMaterial({
          color: 0x00d4ff,
          roughness: 0.35,
          metalness: 0.75
        });
        const wings = new THREE.Mesh(wingGeo, wingMat);
        wings.position.set(0, 0, 1.0);
        group.add(wings);

        const cockpitGeo = new THREE.SphereGeometry(0.7, 12, 8);
        cockpitGeo.scale(0.8, 0.6, 1.8);
        const cockpitMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x00d4ff,
          emissiveIntensity: 0.8,
          roughness: 0.1
        });
        const canopy = new THREE.Mesh(cockpitGeo, cockpitMat);
        canopy.position.set(0, 0.6, -0.6);
        group.add(canopy);

        engine.scene.add(group);
        shipMesh = group;
      }

      // Position in orbital space looking away from central asteroid into starry void
      const shipPos = new THREE.Vector3(0, 800, 4200);
      shipMesh.visible = true;
      shipMesh.position.copy(shipPos);
      shipMesh.rotation.set(-0.15, 0.45, -0.4);

      // Generate a banking turn curve emitting dense continuous cyan plasma wake
      const numPoints = 90;
      for (let i = 0; i < numPoints; i++) {
        const t = i / numPoints;
        const angle = t * 1.6;
        const x = shipPos.x - Math.sin(angle) * 32.0;
        const y = shipPos.y - Math.sin(t * Math.PI) * 5.0;
        const z = shipPos.z - t * 50.0;

        const pos = new THREE.Vector3(x, y, z);
        const fwd = new THREE.Vector3(-Math.cos(angle) * 0.4, 0.1, 1.0).normalize();
        trails.emit(pos, fwd, false, 'player-visual');
      }

      // Age particles along trail length to display full 15s luminescence & decay gradient
      for (let i = 0; i < trails.particles.length; i++) {
        const ratio = i / trails.particles.length;
        trails.particles[i].age = ratio * 12.0;
      }

      // Chase camera looking forward-left at ship & curving plasma ribbon
      engine.camera.position.set(shipPos.x + 18, shipPos.y + 11, shipPos.z - 28);
      engine.camera.lookAt(shipPos.x - 5, shipPos.y - 1, shipPos.z + 10);
      engine.camera.updateMatrixWorld();

      trails.update(0.016, engine.camera);
      engine.renderer.render(engine.scene, engine.camera);
    });

    await page.waitForTimeout(300);
    await saveScreenshot('ship_engine_trail.png');

    // =========================================================================
    // 2. Hostile Ship Engine Trail (Crimson/Orange Wake) -> hostile_ship_trail.png
    // =========================================================================
    await page.evaluate(() => {
      const engine = window.gameEngine;
      const trails = engine.thrusterTrails;
      trails.particles = [];
      trails.lastEmitPos.clear();

      const pShip = engine.scene.getObjectByName('visual-player-ship');
      if (pShip) pShip.visible = false;

      let hostileMesh = engine.scene.getObjectByName('visual-hostile-ship');
      if (!hostileMesh) {
        const group = new THREE.Group();
        group.name = 'visual-hostile-ship';

        const bodyGeo = new THREE.ConeGeometry(1.8, 7.5, 5);
        bodyGeo.rotateX(Math.PI / 2);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0x7f1d1d,
          roughness: 0.35,
          metalness: 0.85
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        group.add(body);

        const wingGeo = new THREE.BoxGeometry(7.0, 0.15, 3.0);
        const wingMat = new THREE.MeshStandardMaterial({
          color: 0xef4444,
          roughness: 0.45,
          metalness: 0.75
        });
        const wings = new THREE.Mesh(wingGeo, wingMat);
        wings.position.set(0, 0, 1.2);
        wings.rotation.z = 0.25;
        group.add(wings);

        const canopyGeo = new THREE.SphereGeometry(0.75, 12, 8);
        canopyGeo.scale(0.8, 0.6, 1.8);
        const canopyMat = new THREE.MeshStandardMaterial({
          color: 0xf97316,
          emissive: 0xef4444,
          emissiveIntensity: 0.9,
          roughness: 0.15
        });
        const canopy = new THREE.Mesh(canopyGeo, canopyMat);
        canopy.position.set(0, 0.6, -0.6);
        group.add(canopy);

        engine.scene.add(group);
        hostileMesh = group;
      }

      const shipPos = new THREE.Vector3(0, 800, 4200);
      hostileMesh.visible = true;
      hostileMesh.position.copy(shipPos);
      hostileMesh.rotation.set(-0.2, -0.5, 0.4);

      // Generate sweeping crimson-orange hostile wake
      const numPoints = 90;
      for (let i = 0; i < numPoints; i++) {
        const t = i / numPoints;
        const angle = t * 1.7;
        const x = shipPos.x + Math.sin(angle) * 35.0;
        const y = shipPos.y + Math.sin(t * Math.PI) * 6.0;
        const z = shipPos.z - t * 52.0;

        const pos = new THREE.Vector3(x, y, z);
        const fwd = new THREE.Vector3(Math.cos(angle) * 0.4, -0.1, 1.0).normalize();
        trails.emit(pos, fwd, true, 'hostile-visual');
      }

      for (let i = 0; i < trails.particles.length; i++) {
        const ratio = i / trails.particles.length;
        trails.particles[i].age = ratio * 12.0;
      }

      engine.camera.position.set(shipPos.x - 20, shipPos.y + 12, shipPos.z - 26);
      engine.camera.lookAt(shipPos.x + 6, shipPos.y - 1, shipPos.z + 10);
      engine.camera.updateMatrixWorld();

      trails.update(0.016, engine.camera);
      engine.renderer.render(engine.scene, engine.camera);
    });

    await page.waitForTimeout(300);
    await saveScreenshot('hostile_ship_trail.png');

    // =========================================================================
    // 3. In-Flight Missile Exhaust Contrails -> missile_exhaust_trail.png
    // =========================================================================
    await page.evaluate(() => {
      const engine = window.gameEngine;
      engine.thrusterTrails.particles = [];
      const weapons = engine.weaponsSystem;
      weapons.fireTrails.particles = [];
      weapons.fireTrails.lastEmitPos.clear();

      const pShip = engine.scene.getObjectByName('visual-player-ship');
      if (pShip) pShip.visible = false;
      const hShip = engine.scene.getObjectByName('visual-hostile-ship');
      if (hShip) hShip.visible = false;

      let missileGroup = engine.scene.getObjectByName('visual-missiles-group');
      if (!missileGroup) {
        missileGroup = new THREE.Group();
        missileGroup.name = 'visual-missiles-group';

        for (let m = 0; m < 2; m++) {
          const mMesh = new THREE.Group();
          mMesh.name = `missile-body-${m}`;

          const cylGeo = new THREE.CylinderGeometry(0.35, 0.35, 3.2, 8);
          cylGeo.rotateX(Math.PI / 2);
          const cylMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3, metalness: 0.8 });
          mMesh.add(new THREE.Mesh(cylGeo, cylMat));

          const coneGeo = new THREE.ConeGeometry(0.35, 1.1, 8);
          coneGeo.rotateX(-Math.PI / 2);
          const coneMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2, metalness: 0.9 });
          const cone = new THREE.Mesh(coneGeo, coneMat);
          cone.position.set(0, 0, -2.1);
          mMesh.add(cone);

          missileGroup.add(mMesh);
        }
        engine.scene.add(missileGroup);
      }
      missileGroup.visible = true;

      const basePos = new THREE.Vector3(0, 800, 4200);
      const m1 = missileGroup.getObjectByName('missile-body-0');
      const m2 = missileGroup.getObjectByName('missile-body-1');

      m1.position.set(basePos.x + 8, basePos.y + 4, basePos.z + 25);
      m1.rotation.set(-0.1, 0.3, -0.15);

      m2.position.set(basePos.x - 8, basePos.y - 3, basePos.z + 18);
      m2.rotation.set(-0.08, 0.32, -0.1);

      const dir1 = new THREE.Vector3(0.28, 0.1, 1.0).normalize();
      for (let s = 0; s < 50; s++) {
        const pos = m1.position.clone().addScaledVector(dir1, -s * 0.9);
        weapons.fireTrails.emit(pos, dir1, 3, 'm1');
      }

      const dir2 = new THREE.Vector3(0.32, 0.12, 1.0).normalize();
      for (let s = 0; s < 50; s++) {
        const pos = m2.position.clone().addScaledVector(dir2, -s * 0.9);
        weapons.fireTrails.emit(pos, dir2, 3, 'm2');
      }

      // Age particles smoothly: white-hot core -> fiery orange -> charcoal grey smoke
      for (let i = 0; i < weapons.fireTrails.particles.length; i++) {
        const progress = i / weapons.fireTrails.particles.length;
        const p = weapons.fireTrails.particles[i];
        p.life = p.maxLife * (1.0 - progress * 0.88);
      }

      engine.camera.position.set(basePos.x + 24, basePos.y + 12, basePos.z - 8);
      engine.camera.lookAt(basePos.x, basePos.y, basePos.z + 20);
      engine.camera.updateMatrixWorld();

      weapons.fireTrails.update(0.016, engine.camera);
      engine.renderer.render(engine.scene, engine.camera);
    });

    await page.waitForTimeout(300);
    await saveScreenshot('missile_exhaust_trail.png');

    // =========================================================================
    // 4. Instanced Explosions & Rock Debris Bursts -> explosion_effects.png
    // =========================================================================
    await page.evaluate(() => {
      const engine = window.gameEngine;
      const weapons = engine.weaponsSystem;
      const space = engine.spaceEnv;

      const mGroup = engine.scene.getObjectByName('visual-missiles-group');
      if (mGroup) mGroup.visible = false;
      weapons.fireTrails.particles = [];
      engine.thrusterTrails.particles = [];

      const expPos = new THREE.Vector3(0, 800, 4200);

      // Trigger multi-stage missile detonation & asteroid obliteration
      weapons.spawnExplosion(expPos, 38, 0xff5500);
      space.spawnRockDebris(expPos, new THREE.Vector3(0, 0, 1), 32);
      weapons.spawnLaserImpactSparks(expPos, new THREE.Vector3(0, 1, 0), 0x00d4ff);

      // Advance physics/life by 0.14s so core fireball, ring, sparks, and debris quads are expanded
      weapons.update(0.14, { isDead: false, position: new THREE.Vector3(0, 0, 0) }, new Map(), null, engine.camera);
      space.update(0.14, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), engine.camera);

      engine.camera.position.set(expPos.x, expPos.y + 6, expPos.z - 55);
      engine.camera.lookAt(expPos.x, expPos.y, expPos.z);
      engine.camera.updateMatrixWorld();

      weapons.update(0.016, { isDead: false, position: new THREE.Vector3(0, 0, 0) }, new Map(), null, engine.camera);
      space.update(0.016, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), engine.camera);
      engine.renderer.render(engine.scene, engine.camera);
    });

    await page.waitForTimeout(300);
    await saveScreenshot('explosion_effects.png');
  });
});
