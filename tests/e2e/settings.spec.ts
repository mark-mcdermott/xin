import { test, expect, _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe('Settings', () => {
  let electronApp: ElectronApplication;
  let window: Page;

  test.beforeEach(async () => {
    electronApp = await electron.launch({
      args: [path.join(__dirname, '../../dist/main/index.js')],
    });
    window = await electronApp.firstWindow();
    await window.waitForLoadState('domcontentloaded');
    await window.waitForTimeout(2000);
  });

  test.afterEach(async () => {
    await electronApp.close();
  });

  test('should open settings page with Settings header', async () => {
    const settingsButton = window.locator('button').filter({
      has: window.locator('svg.lucide-settings'),
    }).first();
    await expect(settingsButton).toBeVisible({ timeout: 5000 });
    await settingsButton.click();
    await window.waitForTimeout(500);

    const settingsHeader = window.locator('text=Settings').first();
    await expect(settingsHeader).toBeVisible({ timeout: 5000 });
  });

  test('should display vault path setting', async () => {
    const settingsButton = window.locator('button').filter({
      has: window.locator('svg.lucide-settings'),
    }).first();
    await settingsButton.click();
    await window.waitForTimeout(500);

    const vaultSection = window.locator('text=Vault').first();
    await expect(vaultSection).toBeVisible({ timeout: 5000 });
  });
});
