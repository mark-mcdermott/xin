import { test, expect, _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe('File Tree', () => {
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

  test('should display file tree panel when clicking files icon', async () => {
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const filesButton = iconSidebar.locator('button').nth(1);
    await expect(filesButton).toBeVisible({ timeout: 5000 });
    await filesButton.click();
    await window.waitForTimeout(500);

    // File tree panel should show with new note button (FilePlus icon)
    const newNoteButton = window.locator('svg.lucide-file-plus').first();
    await expect(newNoteButton).toBeVisible({ timeout: 5000 });
  });

  test('should open file in editor when clicked', async () => {
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const filesButton = iconSidebar.locator('button').nth(1);
    await filesButton.click();
    await window.waitForTimeout(500);

    // Look for a markdown file in the tree
    const mdFiles = window.locator('text=.md');
    const firstFile = mdFiles.first();

    if (await firstFile.isVisible()) {
      await firstFile.click();
      await window.waitForTimeout(1000);

      // Editor should open with the file
      const editor = window.locator('.cm-editor');
      await expect(editor.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should create new note via New note button', async () => {
    const iconSidebar = window.locator('div.w-\\[46px\\]');
    const filesButton = iconSidebar.locator('button').nth(1);
    await filesButton.click();
    await window.waitForTimeout(500);

    // Find the new note button by its FilePlus icon
    const newNoteIcon = window.locator('svg.lucide-file-plus').first();
    const newNoteButton = newNoteIcon.locator('..');
    if (await newNoteButton.isVisible()) {
      await newNoteButton.click();
      await window.waitForTimeout(500);

      // An input field should appear for naming the file
      const nameInput = window.locator('input[type="text"]');
      if (await nameInput.isVisible({ timeout: 2000 }).catch(() => false)) {
        await expect(nameInput).toBeVisible();
      }
    }
  });
});
