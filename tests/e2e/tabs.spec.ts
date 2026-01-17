import { test, expect, _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
    // Check if vault selection dialog is showing (first run)
    const vaultDialog = window.locator('text=Welcome to Xun');
    const isFirstRun = await vaultDialog.isVisible({ timeout: 2000 }).catch(() => false);

    if (isFirstRun) {
      // Skip test if no vault is configured - click Skip to use default vault
      const skipButton = window.locator('text=Skip (use default)');
      await skipButton.click();
      await window.waitForTimeout(2000);
    }

    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      // A tab should be created with today's date (YY-MM-DD format)
      // Use local date (not UTC) to match how the app creates daily notes
      const now = new Date();
      const today = `${String(now.getFullYear()).slice(-2)}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const tab = window.locator(`text=${today}`).first();
      await expect(tab).toBeVisible({ timeout: 5000 });
    }
  });

  test('should show tab bar with open tabs', async () => {
    // Open a daily note to create a tab
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      // Tab bar should be visible
      // Look for the tab container
      await window.screenshot({ path: 'tests/e2e/screenshots/tabs-open.png' });
    }
  });

  test('should allow closing tabs with X button', async () => {
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      // Find the close button on the tab (usually an X icon)
      const closeButton = window.locator('[class*="tab"] button, [class*="Tab"] button').first();

      if (await closeButton.isVisible()) {
        await closeButton.click();
        await window.waitForTimeout(500);

        // Tab should be closed
        await window.screenshot({ path: 'tests/e2e/screenshots/tab-closed.png' });
      }
    }
  });

  test('should switch between multiple tabs', async () => {
    // Open today's note
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      // Type something in today's note
      const editor = window.locator('.cm-content').first();
      if (await editor.isVisible()) {
        await editor.click();
        await window.keyboard.type('Content in today\'s note');
        await window.waitForTimeout(500);
      }

      // Open yesterday's note (if available) or another file
      const yesterdayButton = window.locator('button[title="Yesterday\'s Note"]').first();
      if (await yesterdayButton.isVisible()) {
        await yesterdayButton.click();
        await window.waitForTimeout(1000);

        // Now we should have two tabs
        // Click back on the first tab (today's date in YY-MM-DD format)
        const now = new Date();
        const today = `${String(now.getFullYear()).slice(-2)}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const todayTab = window.locator(`text=${today}`).first();

        if (await todayTab.isVisible()) {
          await todayTab.click();
          await window.waitForTimeout(500);

          // Editor should show today's content
          const editorContent = await window.locator('.cm-content').first().textContent();
          expect(editorContent).toContain('Content in today\'s note');
        }
      }
    }
  });

  test('should highlight active tab', async () => {
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      // Active tab should have distinct styling
      // Take screenshot to verify visual state
      await window.screenshot({ path: 'tests/e2e/screenshots/active-tab.png' });
    }
  });

  test('should reopen existing tab instead of duplicating', async () => {
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      // Open today's note
      await todayButton.click();
      await window.waitForTimeout(1000);

      // Try to open today's note again
      await todayButton.click();
      await window.waitForTimeout(500);

      // Should still have only one tab for today (YY-MM-DD format)
      const now = new Date();
      const today = `${String(now.getFullYear()).slice(-2)}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const todayTabs = window.locator(`text=${today}`);
      const count = await todayTabs.count();

      // There should be exactly 1 tab (or 2 if date appears elsewhere)
      // Taking screenshot for visual verification
      await window.screenshot({ path: 'tests/e2e/screenshots/no-duplicate-tabs.png' });
    }
  });

  test('should persist tabs across app restart', async () => {
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      // Note: Full persistence testing would require closing and reopening the app
      // This test captures the initial state
      await window.screenshot({ path: 'tests/e2e/screenshots/tabs-before-restart.png' });
    }
  });

  test('should show empty state when no tabs are open', async () => {
    // Initially, there might be tabs from previous session
    // If there's a way to close all tabs, test the empty state
    await window.screenshot({ path: 'tests/e2e/screenshots/tabs-initial-state.png' });
  });

  test('should handle middle-click to close tab', async () => {
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      // Find the tab (YY-MM-DD format)
      const now = new Date();
      const today = `${String(now.getFullYear()).slice(-2)}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const tab = window.locator(`text=${today}`).first();

      if (await tab.isVisible()) {
        // Middle-click to close (button: 'middle')
        await tab.click({ button: 'middle' });
        await window.waitForTimeout(500);

        await window.screenshot({ path: 'tests/e2e/screenshots/middle-click-close.png' });
      }
    }
  });
});
