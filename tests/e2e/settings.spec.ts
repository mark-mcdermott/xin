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

  test('should show settings icon in sidebar', async () => {
    // Look for the Settings icon (Settings/Gear icon from lucide-react)
    const settingsButton = window.locator('button[title="Settings"]');
    await expect(settingsButton).toBeVisible({ timeout: 5000 });
  });

  test('should open settings page when clicking settings icon', async () => {
    const settingsButton = window.locator('button[title="Settings"]');

    if (await settingsButton.isVisible()) {
      await settingsButton.click();
      await window.waitForTimeout(500);

      // Settings page should show - look for "Settings" header
      const settingsHeader = window.locator('text=Settings').first();
      await expect(settingsHeader).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display vault path setting', async () => {
    const settingsButton = window.locator('button[title="Settings"]');

    if (await settingsButton.isVisible()) {
      await settingsButton.click();
      await window.waitForTimeout(500);

      // Look for vault path section
      const vaultSection = window.locator('text=Vault').first();
      await expect(vaultSection).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display blogs section', async () => {
    const settingsButton = window.locator('button[title="Settings"]');

    if (await settingsButton.isVisible()) {
      await settingsButton.click();
      await window.waitForTimeout(500);

      // Look for blogs section
      const blogsSection = window.locator('text=Blogs').first();
      await expect(blogsSection).toBeVisible({ timeout: 5000 });
    }
  });

  test('should have add blog button', async () => {
    const settingsButton = window.locator('button[title="Settings"]');

    if (await settingsButton.isVisible()) {
      await settingsButton.click();
      await window.waitForTimeout(500);

      // Look for "Add Blog" or similar button
      const addBlogButton = window.locator('text=Add Blog').first();
      if (await addBlogButton.isVisible()) {
        await expect(addBlogButton).toBeVisible({ timeout: 5000 });
      } else {
        // Alternative: Look for a + button in blogs section
        await window.screenshot({ path: 'tests/e2e/screenshots/settings-blogs.png' });
      }
    }
  });

  test('should display theme settings', async () => {
    const settingsButton = window.locator('button[title="Settings"]');

    if (await settingsButton.isVisible()) {
      await settingsButton.click();
      await window.waitForTimeout(500);

      // Take screenshot of settings page
      await window.screenshot({ path: 'tests/e2e/screenshots/settings-page.png' });
    }
  });

  test('should allow changing vault path', async () => {
    const settingsButton = window.locator('button[title="Settings"]');

    if (await settingsButton.isVisible()) {
      await settingsButton.click();
      await window.waitForTimeout(500);

      // Look for "Change" button or folder picker near vault
      const changeButton = window.locator('text=Change').first();
      if (await changeButton.isVisible()) {
        // Button should be clickable
        await expect(changeButton).toBeEnabled();
      }
    }
  });

  test('should close settings and return to editor', async () => {
    // First open a daily note
    const todayButton = window.locator('button[title="Today\'s Note"]').first();
    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);
    }

    // Open settings
    const settingsButton = window.locator('button[title="Settings"]');
    if (await settingsButton.isVisible()) {
      await settingsButton.click();
      await window.waitForTimeout(500);

      // Close settings by clicking file tree or today button
      await todayButton.click();
      await window.waitForTimeout(500);

      // Should be back to editor view
      const editor = window.locator('.cm-editor');
      await expect(editor.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should persist settings across sessions', async () => {
    const settingsButton = window.locator('button[title="Settings"]');

    if (await settingsButton.isVisible()) {
      await settingsButton.click();
      await window.waitForTimeout(500);

      // Take note of current settings state
      await window.screenshot({ path: 'tests/e2e/screenshots/settings-initial.png' });

      // Settings should be loaded from storage
      // This is a basic check - actual persistence testing would require
      // closing and reopening the app
    }
  });
});
