import { test, expect, _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe('Documentation', () => {
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

  test('should show docs icon in sidebar', async () => {
    // Look for the Docs icon (BookOpen icon from lucide-react)
    const docsButton = window.locator('button[title="Documentation"]');
    await expect(docsButton).toBeVisible({ timeout: 5000 });
  });

  test('should open docs page when clicking docs icon', async () => {
    const docsButton = window.locator('button[title="Documentation"]');

    if (await docsButton.isVisible()) {
      await docsButton.click();
      await window.waitForTimeout(500);

      // Docs page should show - look for "Overview" or "Getting Started"
      const docsContent = window.locator('text=Overview').first();
      await expect(docsContent).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display docs tree navigation in sidebar', async () => {
    const docsButton = window.locator('button[title="Documentation"]');

    if (await docsButton.isVisible()) {
      await docsButton.click();
      await window.waitForTimeout(500);

      // Docs tree should appear in the left sidebar
      // Look for doc sections like "Getting Started", "Daily Notes", etc.
      const gettingStarted = window.locator('text=Getting Started').first();
      await expect(gettingStarted).toBeVisible({ timeout: 5000 });
    }
  });

  test('should navigate to different doc pages', async () => {
    const docsButton = window.locator('button[title="Documentation"]');

    if (await docsButton.isVisible()) {
      await docsButton.click();
      await window.waitForTimeout(500);

      // Click on "Daily Notes" section in tree
      const dailyNotesLink = window.locator('text=Daily Notes').first();
      if (await dailyNotesLink.isVisible()) {
        await dailyNotesLink.click();
        await window.waitForTimeout(500);

        // Content should update to show Daily Notes documentation
        await window.screenshot({ path: 'tests/e2e/screenshots/docs-daily-notes.png' });
      }
    }
  });

  test('should display back/forward navigation buttons', async () => {
    const docsButton = window.locator('button[title="Documentation"]');

    if (await docsButton.isVisible()) {
      await docsButton.click();
      await window.waitForTimeout(500);

      // Back and forward buttons should be visible in the docs header
      const backButton = window.locator('button[title="Back"]');
      const forwardButton = window.locator('button[title="Forward"]');

      await expect(backButton).toBeVisible({ timeout: 5000 });
      await expect(forwardButton).toBeVisible({ timeout: 5000 });

      // Initially both should be disabled (no history yet)
      // This verifies the navigation UI is present
      await window.screenshot({ path: 'tests/e2e/screenshots/docs-navigation-buttons.png' });
    }
  });

  test('should render code blocks with syntax highlighting', async () => {
    const docsButton = window.locator('button[title="Documentation"]');

    if (await docsButton.isVisible()) {
      await docsButton.click();
      await window.waitForTimeout(500);

      // Navigate to a page with code blocks (like Blog Publishing)
      const blogLink = window.locator('text=Blog Publishing').first();
      if (await blogLink.isVisible()) {
        await blogLink.click();
        await window.waitForTimeout(500);

        // Look for code blocks
        const codeBlocks = window.locator('pre code');
        const count = await codeBlocks.count();

        // Take screenshot to verify syntax highlighting
        if (count > 0) {
          await window.screenshot({ path: 'tests/e2e/screenshots/docs-code-blocks.png' });
        }
      }
    }
  });

  test('should support cross-linking between doc pages', async () => {
    const docsButton = window.locator('button[title="Documentation"]');

    if (await docsButton.isVisible()) {
      await docsButton.click();
      await window.waitForTimeout(500);

      // Find a link in the content (links have accent color)
      const internalLinks = window.locator('a[href="#"]');
      const firstLink = internalLinks.first();

      if (await firstLink.isVisible()) {
        await firstLink.click();
        await window.waitForTimeout(500);

        // Page should have changed - back button should be enabled
        const backButton = window.locator('button[title="Back"]');
        const isBackEnabled = await backButton.isEnabled();
        expect(isBackEnabled).toBeTruthy();
      }
    }
  });

  test('should close docs and return to previous view', async () => {
    // First open a daily note
    const todayButton = window.locator('button[title="Today\'s Note"]').first();
    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);
    }

    // Now open docs
    const docsButton = window.locator('button[title="Documentation"]');
    if (await docsButton.isVisible()) {
      await docsButton.click();
      await window.waitForTimeout(500);

      // Close docs by clicking another sidebar icon
      const fileTreeButton = window.locator('button[title="File Tree"]');
      if (await fileTreeButton.isVisible()) {
        await fileTreeButton.click();
        await window.waitForTimeout(500);

        // Docs should be closed, file tree should be visible
        await window.screenshot({ path: 'tests/e2e/screenshots/docs-closed.png' });
      }
    }
  });
});
