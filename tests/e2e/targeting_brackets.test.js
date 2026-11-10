import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('Enemy Ship Line-of-Sight Corner Brackets Visual Verification', () => {
  test('capture and verify rectangular corner-only indicators around enemy ships in direct LOS', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Skip mobile viewport for desktop screenshot capture');
    test.setTimeout(60000);

    await page.setViewportSize({ width: 1280, height: 720 });
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

    await page.goto('/?room=TargetingBracketsTest&quality=low&density=50');

    const canvas = page.locator('#game-canvas-container canvas');
    await expect(canvas).toBeVisible({ timeout: 20000 });

    await page.waitForFunction(() => !!window.__engine && !!window.__engine.spaceEnv && !!window.__hud);
    await page.waitForTimeout(1000);

    const outDirs = [
      'C:\\Users\\eitama\\.gemini\\antigravity\\brain\\4d816daa-b785-4b62-b657-2a937eec9e87',
      'C:\\Users\\eitama\\.gemini\\antigravity\\brain\\4bb5749c-bae8-417c-b4de-6da30c54e4d0'
    ];

    for (const d of outDirs) {
      if (!fs.existsSync(d)) {
        fs.mkdirSync(d, { recursive: true });
      }
    }

    const saveScreenshot = async (filename) => {
      for (const d of outDirs) {
        const fullPath = path.join(d, filename);
        await page.screenshot({ path: fullPath, fullPage: false });
        console.log(`Saved screenshot to ${fullPath}`);
      }
    };

    // Step 1: Position camera and spawn enemy ship directly in line of sight
    const targetInfo = await page.evaluate(() => {
      const engine = window.__engine;
      const hud = window.__hud;
      engine.stop();

      // Ensure camera position & lookAt
      const camPos = new window.THREE.Vector3(0, 800, 4200);
      const enemyPos = new window.THREE.Vector3(0, 800, 4450); // 250 units in front

      engine.camera.position.copy(camPos);
      engine.camera.lookAt(enemyPos);
      engine.camera.updateMatrixWorld(true);

      // Align player ship with camera
      engine.playerShip.position.copy(camPos);
      engine.playerShip.quaternion.copy(engine.camera.quaternion);

      // Spawn remote peer ship
      engine.network.onPeerJoined('enemy-target-viper');
      const remote = engine.remoteShips.get('enemy-target-viper');
      if (remote) {
        remote.playerName = 'ViperAce';
        remote.shield = 75;
        remote.maxShield = 100;
        remote.hp = 85;
        remote.maxHp = 100;
        remote.group.position.copy(enemyPos);
        remote.targetPosition.copy(enemyPos);
        remote.position.copy(enemyPos);
        remote.update(0.016, engine.camera);
      }

      // Render scene
      engine.renderer.render(engine.scene, engine.camera);

      // Update HUD as a non-master peer with showStats=false
      hud.update({
        isMaster: false,
        showStats: false,
        frameTime: 16.6,
        fps: 60,
        isDead: false
      });

      const targetBox = document.getElementById('hud-target-enemy-target-viper');
      return {
        exists: !!targetBox,
        style: targetBox ? targetBox.getAttribute('style') : null,
        innerHTML: targetBox ? targetBox.innerHTML : null
      };
    });

    console.log('Target Box Info:', JSON.stringify(targetInfo));
    expect(targetInfo.exists).toBe(true);

    const targetBoxLocator = page.locator('#hud-target-enemy-target-viper');
    await expect(targetBoxLocator).toBeVisible();

    // Verify all 4 corner brackets exist
    await expect(targetBoxLocator.locator('.target-bracket.tl')).toBeVisible();
    await expect(targetBoxLocator.locator('.target-bracket.tr')).toBeVisible();
    await expect(targetBoxLocator.locator('.target-bracket.bl')).toBeVisible();
    await expect(targetBoxLocator.locator('.target-bracket.br')).toBeVisible();

    // Verify status bars and pilot name
    await expect(targetBoxLocator.locator('.target-shield-fill')).toBeVisible();
    await expect(targetBoxLocator.locator('.target-hp-fill')).toBeVisible();
    await expect(targetBoxLocator.locator('.target-pilot-name')).toHaveText('ViperAce');

    await page.waitForTimeout(300);
    await saveScreenshot('targeting_corner_brackets.png');

    // Step 2: Now test line-of-sight obstruction by an active meteor hazard
    const blockedInfo = await page.evaluate(() => {
      const engine = window.__engine;
      const hud = window.__hud;

      // Position an active meteor directly along the ray between player and enemy
      // player at (0, 800, 4200), enemy at (0, 800, 4450) -> meteor at (0, 800, 4325)
      engine.meteorSystem.activeMeteor = {
        position: new window.THREE.Vector3(0, 800, 4325),
        radius: 120
      };

      // Trigger HUD update
      hud.update({
        isMaster: false,
        showStats: false,
        frameTime: 16.6,
        fps: 60,
        isDead: false
      });

      const targetBox = document.getElementById('hud-target-enemy-target-viper');
      return {
        exists: !!targetBox
      };
    });

    console.log('Blocked Target Box Info:', JSON.stringify(blockedInfo));
    expect(blockedInfo.exists).toBe(false);

    await page.waitForTimeout(300);
    await saveScreenshot('targeting_brackets_los_blocked.png');
  });
});
