import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('Enemy Ship Glow Visual Verification', () => {
  test('capture enemy RemoteShip star-glow beacon at ~200u distance without rectangular plane artifacts', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Skip mobile viewport for screenshot capture');
    test.setTimeout(60000);

    await page.setViewportSize({ width: 1280, height: 720 });
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    await page.goto('/?room=EnemyShipGlowTest&quality=low&density=50');

    const canvas = page.locator('#game-canvas-container canvas');
    await expect(canvas).toBeVisible({ timeout: 20000 });

    await page.waitForFunction(() => !!window.__engine && !!window.__engine.spaceEnv);
    await page.waitForTimeout(1000);

    const outDirs = [
      'C:\\Users\\eitama\\.gemini\\antigravity\\brain\\02a7d8e2-2775-451c-816b-f49c419655e0',
      'C:\\Users\\eitama\\.gemini\\antigravity\\brain\\0ddf810f-f70b-46ce-b1a6-91b4b32294a0',
      'C:\\Users\\eitama\\.gemini\\antigravity\\brain\\ba2130cf-f721-488d-8bbd-e0cf839bea33'
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

      for (let i = 1; i < outDirs.length; i++) {
        const secondaryPath = path.join(outDirs[i], filename);
        try {
          fs.copyFileSync(primaryPath, secondaryPath);
        } catch (_) {}
      }
    };

    // Stop continuous animation, hide cockpit/HUD for clean view
    await page.evaluate(() => {
      const engine = window.__engine;
      engine.stop();

      if (engine.cockpit && engine.cockpit.group) {
        engine.cockpit.group.visible = false;
      }

      document.querySelectorAll('.hud-container, .touch-controls-layer, #hud-rotate-notice').forEach(el => {
        el.style.display = 'none';
      });

      // Spawn a RemoteShip in front of the camera in open space
      engine.network.onPeerJoined('enemy-test-peer');
      const remote = engine.remoteShips.get('enemy-test-peer');

      const camPos = new window.THREE.Vector3(0, 800, 4200);
      const targetPos = new window.THREE.Vector3(0, 800, 4400);

      engine.camera.position.copy(camPos);
      engine.camera.lookAt(targetPos);
      engine.camera.updateMatrixWorld();

      remote.group.position.copy(targetPos);
      remote.targetPosition.copy(targetPos);
      remote.position.copy(targetPos);
      remote.update(0.016, engine.camera);

      console.log('Camera children:', JSON.stringify(engine.camera.children.map(c => ({ name: c.name, type: c.type, visible: c.visible }))));
      console.log('Scene background:', JSON.stringify(engine.scene.background));
      console.log('Remote starGlowMesh:', JSON.stringify({
        opacity: remote.starGlowMesh.material.opacity,
        scale: remote.starGlowMesh.scale,
        color: remote.starGlowMesh.material.color.getHexString(),
        visible: remote.starGlowMesh.visible,
        hasMap: !!remote.starGlowMesh.material.map
      }));

      engine.renderer.render(engine.scene, engine.camera);
    });

    await page.waitForTimeout(300);
    await saveScreenshot('enemy_ship_glow.png');
  });
});
