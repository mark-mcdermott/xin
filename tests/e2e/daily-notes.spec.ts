import { test, expect, _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe('Daily Notes', () => {
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

  test('should create today\'s daily note with correct date tab', async () => {
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const todayButton = iconSidebar.locator('button').first();
    await expect(todayButton).toBeVisible({ timeout: 5000 });
    await todayButton.click();
    await window.waitForTimeout(1000);

    const now = new Date();
    const today = `${String(now.getFullYear()).slice(-2)}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const tabWithDate = window.locator(`text=${today}`);
    await expect(tabWithDate.first()).toBeVisible({ timeout: 5000 });
  });

  test('should show editor when daily note is open', async () => {
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const todayButton = iconSidebar.locator('button').first();
    await todayButton.click();
    await window.waitForTimeout(1000);

    const editor = window.locator('.cm-editor');
    await expect(editor.first()).toBeVisible({ timeout: 5000 });
  });

  test('should allow typing in editor and retain content', async () => {
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const todayButton = iconSidebar.locator('button').first();
    await todayButton.click();
    await window.waitForTimeout(1000);

    const editor = window.locator('.cm-content').first();
    await expect(editor).toBeVisible({ timeout: 5000 });
    await editor.click();
    await window.keyboard.type('# Test Heading\n\nThis is a test note.');

    const content = await editor.textContent();
    expect(content).toContain('Test Heading');
    expect(content).toContain('This is a test note.');
  });
});
