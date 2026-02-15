import { test, expect, _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function todayString(): string {
  const now = new Date();
  return `${String(now.getFullYear()).slice(-2)}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

test.describe('Tab Management', () => {
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

  test('should create a tab when opening daily note', async () => {
    const todayButton = window.locator('button[title="Today\'s Note"]').first();
    await todayButton.click();
    await window.waitForTimeout(1000);

    const today = todayString();
    const tab = window.locator(`text=${today}`).first();
    await expect(tab).toBeVisible({ timeout: 5000 });
  });

  test('should close tab with Close tab button', async () => {
    const todayButton = window.locator('button[title="Today\'s Note"]').first();
    await todayButton.click();
    await window.waitForTimeout(1000);

    const today = todayString();
    const tab = window.locator(`text=${today}`).first();
    await expect(tab).toBeVisible({ timeout: 5000 });

    // Close button has title="Close tab"
    const closeButton = window.locator('button[title="Close tab"]').first();
    await expect(closeButton).toBeVisible({ timeout: 5000 });
    await closeButton.click();
    await window.waitForTimeout(500);

    // Tab with today's date should no longer be visible
    await expect(window.locator(`text=${today}`)).toHaveCount(0, { timeout: 5000 });
  });

  test('should not duplicate tab when reopening same note', async () => {
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    // Open today's note twice
    await todayButton.click();
    await window.waitForTimeout(1000);
    await todayButton.click();
    await window.waitForTimeout(500);

    // Should still have only one Close tab button (only one tab open)
    const closeButtons = window.locator('button[title="Close tab"]');
    const count = await closeButtons.count();
    expect(count).toBe(1);
  });
});
