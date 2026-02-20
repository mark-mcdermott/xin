import { test, expect, _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe('Blog Post Color', () => {
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

  test('blog post title and rocket should be pink in dark mode', async () => {
    // Switch to dark mode
    await window.evaluate(() => {
      document.documentElement.dataset.theme = 'dark';
    });
    await window.waitForTimeout(500);

    // Open today's note via icon sidebar (first button)
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const todayButton = iconSidebar.locator('button').first();
    await todayButton.click();
    await window.waitForTimeout(1000);

    // Focus the editor
    const editor = window.locator('.cm-content').first();
    await expect(editor).toBeVisible({ timeout: 5000 });
    await editor.click();

    // Go to the end of content and type a blog block
    await window.keyboard.press('Meta+End');
    await window.keyboard.press('Enter');
    await window.keyboard.type('===');
    await window.keyboard.press('Enter');
    await window.keyboard.press('Enter');
    await window.keyboard.type('===');
    await window.waitForTimeout(500);

    // Move cursor away from the === lines so the widget renders
    await window.keyboard.press('Meta+Home');
    await window.waitForTimeout(1000);

    // The "blog post" label and rocket icon should have cm-publish-color class
    const publishElements = window.locator('.cm-publish-color');
    await expect(publishElements.first()).toBeVisible({ timeout: 5000 });

    // Check the computed color is the dark mode pink (#fc3290 = rgb(252, 50, 144))
    const color = await publishElements.first().evaluate((el) => {
      return globalThis.getComputedStyle(el).color;
    });

    expect(color).toBe('rgb(252, 50, 144)');
  });
});
