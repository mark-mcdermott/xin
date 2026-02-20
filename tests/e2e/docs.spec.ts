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

  test('should open docs page with overview content', async () => {
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const docsButton = iconSidebar.locator('button').nth(3);
    await expect(docsButton).toBeVisible({ timeout: 5000 });
    await docsButton.click();
    await window.waitForTimeout(500);

    const docsContent = window.locator('text=Overview').first();
    await expect(docsContent).toBeVisible({ timeout: 5000 });
  });

  test('should display docs tree navigation in sidebar', async () => {
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const docsButton = iconSidebar.locator('button').nth(3);
    await docsButton.click();
    await window.waitForTimeout(500);

    const gettingStarted = window.locator('text=Getting Started').first();
    await expect(gettingStarted).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to a doc page from the tree', async () => {
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const docsButton = iconSidebar.locator('button').nth(3);
    await docsButton.click();
    await window.waitForTimeout(500);

    // Click on a child doc page (under the expanded "Getting Started" section)
    const quickStartLink = window.locator('text=Quick Start').first();
    await expect(quickStartLink).toBeVisible({ timeout: 5000 });
    await quickStartLink.click();
    await window.waitForTimeout(500);

    // Back button should now be enabled after navigating to a new page
    const backButton = window.locator('button[title="Back"]');
    await expect(backButton).toBeEnabled({ timeout: 5000 });
  });
});
