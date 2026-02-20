import { test, expect, _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe('Tags', () => {
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

  test('should open tag browser when clicking tags icon', async () => {
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const tagsButton = iconSidebar.locator('button').nth(2);
    await expect(tagsButton).toBeVisible({ timeout: 5000 });
    await tagsButton.click();
    await window.waitForTimeout(500);

    const tagBrowser = window.locator('text=Tags').first();
    await expect(tagBrowser).toBeVisible({ timeout: 5000 });
  });

  test('should style tags in editor content', async () => {
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const todayButton = iconSidebar.locator('button').first();
    await todayButton.click();
    await window.waitForTimeout(1000);

    const editor = window.locator('.cm-content').first();
    await expect(editor).toBeVisible({ timeout: 5000 });
    await editor.click();

    // Go to end of content, start a new line, type a tag, then move away
    await window.keyboard.press('Meta+End');
    await window.keyboard.press('Enter');
    await window.keyboard.type('#mytesttag');
    await window.keyboard.press('Enter');
    await window.keyboard.type('some text after');
    await window.waitForTimeout(500);

    // Tag should be styled with the cm-tag-link class
    const styledTag = window.locator('.cm-tag-link');
    await expect(styledTag.first()).toBeVisible({ timeout: 5000 });
  });
});
