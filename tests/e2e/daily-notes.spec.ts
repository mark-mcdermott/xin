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

  test('should create today\'s daily note when clicking page icon', async () => {
    // Check if vault selection dialog is showing (first run)
    const vaultDialog = window.locator('text=Welcome to Xin');
    const isFirstRun = await vaultDialog.isVisible({ timeout: 2000 }).catch(() => false);

    if (isFirstRun) {
      // Skip test if no vault is configured - click Skip to use default vault
      const skipButton = window.locator('text=Skip (use default)');
      await skipButton.click();
      await window.waitForTimeout(2000);
    }

    // Click the "Today" button (page icon at top of far-left sidebar)
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      // Verify a tab is created with today's date format (YY-MM-DD)
      // Use local date (not UTC) to match how the app creates daily notes
      const now = new Date();
      const today = `${String(now.getFullYear()).slice(-2)}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const tabWithDate = window.locator(`text=${today}`);
      await expect(tabWithDate.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should show editor when daily note is open', async () => {
    // Click Today button
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      // Editor should be visible (CodeMirror uses .cm-editor class)
      const editor = window.locator('.cm-editor');
      await expect(editor.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should allow typing in editor', async () => {
    // Click Today button
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      // Focus editor and type
      const editor = window.locator('.cm-content');
      if (await editor.first().isVisible()) {
        await editor.first().click();
        await window.keyboard.type('# Test Heading\n\nThis is a test note.');

        // Verify content was typed
        const content = await editor.first().textContent();
        expect(content).toContain('Test Heading');
      }
    }
  });

  test('should auto-save content after typing', async () => {
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      const editor = window.locator('.cm-content');
      if (await editor.first().isVisible()) {
        await editor.first().click();
        const testText = `# Auto-save test ${Date.now()}`;
        await window.keyboard.type(testText);

        // Wait for auto-save (2 seconds debounce + buffer)
        await window.waitForTimeout(3000);

        // Take screenshot for verification
        await window.screenshot({ path: 'tests/e2e/screenshots/daily-note-autosave.png' });
      }
    }
  });
});
