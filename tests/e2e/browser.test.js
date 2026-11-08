import { test, expect } from '@playwright/test';

test.describe('Rockets Headless Browser End-to-End Tests', () => {
  test('should load lobby screen cleanly without console errors and display PWA manifest', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    // 1. Verify Page Title
    await expect(page).toHaveTitle(/Rockets/);

    // 2. Verify PWA Manifest & App Icon links
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute('href', './manifest.json');

    const iconLink = page.locator('link[rel="icon"]');
    await expect(iconLink).toHaveAttribute('href', './icon.svg');

    // 3. Verify Lobby Elements
    await expect(page.locator('.lobby-title')).toHaveText('🚀 ROCKETS');
    await expect(page.locator('#pilot-name-input')).toBeVisible();
    await expect(page.locator('#btn-create-match')).toBeVisible();
    await expect(page.locator('#btn-direct-join')).toBeVisible();
    await expect(page.locator('.lobby-browser-section')).toBeVisible();

    // Verify zero fatal console errors during initial load
    const fatalErrors = consoleErrors.filter(e => !e.includes('favicon') && !e.includes('WebSocket'));
    expect(fatalErrors.length).toBe(0);
  });

  test('should launch a 3D sector, initialize WebGL canvas, and display responsive HUD controls', async ({ page }) => {
    await page.goto('/');

    // Click Launch Sector button
    await page.click('#btn-create-match');

    // Canvas container and canvas must be created
    const canvasContainer = page.locator('#game-canvas-container');
    await expect(canvasContainer).toBeVisible({ timeout: 5000 });

    const canvas = page.locator('#game-canvas-container canvas');
    await expect(canvas).toBeVisible();

    // Verify HUD elements
    await expect(page.locator('#hud-room-title')).toBeVisible();
    await expect(page.locator('.hud-center-crosshair')).toBeVisible();

    // Verify Drag Touch D-Pad / Joystick
    await expect(page.locator('#touch-joystick-container')).toBeVisible();
    await expect(page.locator('#joystick-base')).toBeVisible();
    await expect(page.locator('#joystick-knob')).toBeVisible();

    // Verify Action & Weapon Buttons
    await expect(page.locator('#btn-thrust')).toBeVisible();
    await expect(page.locator('#btn-brake')).toBeVisible();
    await expect(page.locator('#btn-laser')).toBeVisible();
    await expect(page.locator('#btn-missile')).toBeVisible();
    await expect(page.locator('#btn-special')).toBeVisible();
    await expect(page.locator('#btn-strafe-left')).toBeVisible();
    await expect(page.locator('#btn-strafe-right')).toBeVisible();
    await expect(page.locator('#btn-roll-left')).toBeVisible();
    await expect(page.locator('#btn-roll-right')).toBeVisible();

    // Verify Fullscreen toggle and Diagnostics button
    await expect(page.locator('#hud-btn-fullscreen')).toBeVisible();
    await expect(page.locator('#hud-btn-diag')).toBeVisible();

    // Click Diagnostics button and verify modal opens with telemetry
    await page.click('#hud-btn-diag');
    await expect(page.locator('#hud-diag-backdrop')).toBeVisible();
    const diagText = await page.locator('#diag-text-display').textContent();
    console.log('--- DIAGNOSTIC TEXT FROM TEST ---\n', diagText);
    expect(diagText).toContain('ROCKETS CLIENT DIAGNOSTICS');
    expect(diagText).toContain('Is Engine Running: true');
    await page.click('#btn-close-diag');
    await expect(page.locator('#hud-diag-backdrop')).not.toBeVisible();
  });

  test('should join directly via URL query parameter ?room=Test-Sector-99', async ({ page }) => {
    await page.goto('/?room=Test-Sector-99');

    // Must jump directly into the sector
    await expect(page.locator('#game-canvas-container canvas')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#hud-room-title')).toHaveText('Test-Sector-99');
  });
});
