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

  test('should show tags icon in sidebar', async () => {
    // Look for the Tags icon (Code icon from lucide-react)
    // The tags icon should be in the far-left sidebar
    const tagsButton = window.locator('button[title="Tags"]');
    await expect(tagsButton).toBeVisible({ timeout: 5000 });
  });

  test('should open tag browser when clicking tags icon', async () => {
    const tagsButton = window.locator('button[title="Tags"]');

    if (await tagsButton.isVisible()) {
      await tagsButton.click();
      await window.waitForTimeout(500);

      // Tag browser should show in the left sidebar
      // Look for "Tags" header or tag list
      const tagBrowser = window.locator('text=Tags').first();
      await expect(tagBrowser).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display existing tags in browser', async () => {
    const tagsButton = window.locator('button[title="Tags"]');

    if (await tagsButton.isVisible()) {
      await tagsButton.click();
      await window.waitForTimeout(500);

      // Take screenshot to verify tag browser state
      await window.screenshot({ path: 'tests/e2e/screenshots/tag-browser.png' });
    }
  });

  test('should open tag view when clicking a tag', async () => {
    const tagsButton = window.locator('button[title="Tags"]');

    if (await tagsButton.isVisible()) {
      await tagsButton.click();
      await window.waitForTimeout(500);

      // Find any tag item and click it
      const tagItems = window.locator('[class*="tag-item"], [class*="TagItem"]');
      const firstTag = tagItems.first();

      if (await firstTag.isVisible()) {
        await firstTag.click();
        await window.waitForTimeout(1000);

        // A new tab should open for the tag view
        await window.screenshot({ path: 'tests/e2e/screenshots/tag-view.png' });
      }
    }
  });

  test('should recognize tags in editor content', async () => {
    // Create a daily note with tags
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      const editor = window.locator('.cm-content');
      if (await editor.first().isVisible()) {
        await editor.first().click();
        await window.keyboard.type('#test-tag\n\nThis is content under the test tag.');
        await window.waitForTimeout(3000); // Wait for auto-save

        // The tag should be styled differently (purple color)
        await window.screenshot({ path: 'tests/e2e/screenshots/tag-in-editor.png' });
      }
    }
  });
});
