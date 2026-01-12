import { test, expect, _electron as electron } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe('Xin App', () => {
  test('should launch and take screenshot', async () => {
    // Launch Electron app
    const electronApp = await electron.launch({
      args: [path.join(__dirname, '../../dist/main/index.js')],
    });

    // Get the first window
    const window = await electronApp.firstWindow();

    // Wait for the app to load
    await window.waitForLoadState('domcontentloaded');
    await window.waitForTimeout(2000); // Give extra time for rendering

    // Take a screenshot
    await window.screenshot({ path: 'tests/e2e/screenshots/app.png' });

    // Close the app
    await electronApp.close();
  });

  test('should verify sidebar structure exists', async () => {
    const electronApp = await electron.launch({
      args: [path.join(__dirname, '../../dist/main/index.js')],
    });

    const window = await electronApp.firstWindow();
    await window.waitForLoadState('domcontentloaded');
    await window.waitForTimeout(2000);

    // Verify sidebar buttons exist (more reliable than checking CSS classes)
    const todayButton = window.locator('button[title="Today\'s Note"]');
    const fileTreeButton = window.locator('button[title="File Tree"]');
    const settingsButton = window.locator('button[title="Settings"]');

    await expect(todayButton).toBeVisible({ timeout: 5000 });
    await expect(fileTreeButton).toBeVisible({ timeout: 5000 });
    await expect(settingsButton).toBeVisible({ timeout: 5000 });

    // Take screenshot for visual verification
    await window.screenshot({ path: 'tests/e2e/screenshots/sidebar-structure.png' });

    await electronApp.close();
  });
});
