import { test, expect, _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe('Wikilinks', () => {
  let electronApp: ElectronApplication;
  let window: Page;

  test.beforeEach(async () => {
    electronApp = await electron.launch({
      args: [path.join(__dirname, '../../dist/main/index.js')],
    });
    window = await electronApp.firstWindow();
    await window.waitForLoadState('domcontentloaded');
    await window.waitForTimeout(2000);

    // Open today's note to get an editor
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const todayButton = iconSidebar.locator('button').first();
    await todayButton.click();
    await window.waitForTimeout(1000);
  });

  test.afterEach(async () => {
    await electronApp.close();
  });

  test('should show autocomplete when typing [[', async () => {
    const editor = window.locator('.cm-content').first();
    await expect(editor).toBeVisible({ timeout: 5000 });
    await editor.click();
    await window.keyboard.press('Meta+End');
    await window.keyboard.press('Enter');
    await window.keyboard.type('[[');
    await window.waitForTimeout(1000);

    // Autocomplete dropdown should appear
    const autocomplete = window.locator('.cm-tooltip-autocomplete');
    await expect(autocomplete).toBeVisible({ timeout: 5000 });
  });

  test('should render wikilink with styling after moving cursor away', async () => {
    const editor = window.locator('.cm-content').first();
    await expect(editor).toBeVisible({ timeout: 5000 });
    await editor.click();

    // Go to end, new line, type wikilink, move cursor away
    await window.keyboard.press('Meta+End');
    await window.keyboard.press('Enter');
    await window.keyboard.type('[[test note]]');
    await window.keyboard.press('Enter');
    await window.keyboard.type('some other text');
    await window.waitForTimeout(500);

    // The wikilink should be styled (cm-wikilink for existing, cm-wikilink-missing for non-existing)
    const wikilink = window.locator('.cm-wikilink, .cm-wikilink-missing');
    await expect(wikilink.first()).toBeVisible({ timeout: 5000 });
  });

});
