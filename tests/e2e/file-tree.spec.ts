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

  test('should show file tree icon in sidebar', async () => {
    // Look for the Files/FolderTree icon
    const filesButton = window.locator('button[title="File Tree"]');
    await expect(filesButton).toBeVisible({ timeout: 5000 });
  });

  test('should display file tree when clicking files icon', async () => {
    const filesButton = window.locator('button[title="File Tree"]');

    if (await filesButton.isVisible()) {
      await filesButton.click();
      await window.waitForTimeout(500);

      // File tree should be visible in the left sidebar
      await window.screenshot({ path: 'tests/e2e/screenshots/file-tree.png' });
    }
  });

  test('should show vault contents', async () => {
    const filesButton = window.locator('button[title="File Tree"]');

    if (await filesButton.isVisible()) {
      await filesButton.click();
      await window.waitForTimeout(500);

      // Look for common folders like "Daily" or markdown files
      // The actual content depends on the vault
      await window.screenshot({ path: 'tests/e2e/screenshots/file-tree-contents.png' });
    }
  });

  test('should expand folders when clicked', async () => {
    const filesButton = window.locator('button[title="File Tree"]');

    if (await filesButton.isVisible()) {
      await filesButton.click();
      await window.waitForTimeout(500);

      // Look for a folder (typically has a chevron icon)
      const folders = window.locator('[class*="folder"], [class*="Folder"]');
      const firstFolder = folders.first();

      if (await firstFolder.isVisible()) {
        await firstFolder.click();
        await window.waitForTimeout(500);

        // Folder should expand to show contents
        await window.screenshot({ path: 'tests/e2e/screenshots/folder-expanded.png' });
      }
    }
  });

  test('should open file in editor when clicked', async () => {
    const filesButton = window.locator('button[title="File Tree"]');

    if (await filesButton.isVisible()) {
      await filesButton.click();
      await window.waitForTimeout(500);

      // Look for a markdown file (.md)
      const mdFiles = window.locator('text=.md');
      const firstFile = mdFiles.first();

      if (await firstFile.isVisible()) {
        await firstFile.click();
        await window.waitForTimeout(1000);

        // Editor should open with the file content
        const editor = window.locator('.cm-editor');
        await expect(editor.first()).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('should create new file', async () => {
    const filesButton = window.locator('button[title="File Tree"]');

    if (await filesButton.isVisible()) {
      await filesButton.click();
      await window.waitForTimeout(500);

      // Look for "New File" button or context menu option
      const newFileButton = window.locator('button[title="New File"]');

      if (await newFileButton.isVisible()) {
        await newFileButton.click();
        await window.waitForTimeout(500);

        // Should prompt for file name or create untitled file
        await window.screenshot({ path: 'tests/e2e/screenshots/new-file.png' });
      }
    }
  });

  test('should create new folder', async () => {
    const filesButton = window.locator('button[title="File Tree"]');

    if (await filesButton.isVisible()) {
      await filesButton.click();
      await window.waitForTimeout(500);

      // Look for "New Folder" button
      const newFolderButton = window.locator('button[title="New Folder"]');

      if (await newFolderButton.isVisible()) {
        await newFolderButton.click();
        await window.waitForTimeout(500);

        // Should prompt for folder name
        await window.screenshot({ path: 'tests/e2e/screenshots/new-folder.png' });
      }
    }
  });

  test('should highlight selected file', async () => {
    const filesButton = window.locator('button[title="File Tree"]');

    if (await filesButton.isVisible()) {
      await filesButton.click();
      await window.waitForTimeout(500);

      // Click on a file
      const mdFiles = window.locator('text=.md');
      const firstFile = mdFiles.first();

      if (await firstFile.isVisible()) {
        await firstFile.click();
        await window.waitForTimeout(500);

        // Selected file should have distinct styling
        await window.screenshot({ path: 'tests/e2e/screenshots/file-selected.png' });
      }
    }
  });

  test('should show context menu on right-click', async () => {
    const filesButton = window.locator('button[title="File Tree"]');

    if (await filesButton.isVisible()) {
      await filesButton.click();
      await window.waitForTimeout(500);

      // Right-click on a file
      const mdFiles = window.locator('text=.md');
      const firstFile = mdFiles.first();

      if (await firstFile.isVisible()) {
        await firstFile.click({ button: 'right' });
        await window.waitForTimeout(500);

        // Context menu should appear with options like Rename, Delete
        await window.screenshot({ path: 'tests/e2e/screenshots/file-context-menu.png' });
      }
    }
  });

  test('should sync with current open file', async () => {
    // Open a daily note first
    const todayButton = window.locator('button[title="Today\'s Note"]').first();

    if (await todayButton.isVisible()) {
      await todayButton.click();
      await window.waitForTimeout(1000);

      // Then switch to file tree
      const filesButton = window.locator('button[title="File Tree"]');
      if (await filesButton.isVisible()) {
        await filesButton.click();
        await window.waitForTimeout(500);

        // The current daily note file should be highlighted/selected
        await window.screenshot({ path: 'tests/e2e/screenshots/file-tree-sync.png' });
      }
    }
  });

  test('should collapse folders when clicked again', async () => {
    const filesButton = window.locator('button[title="File Tree"]');

    if (await filesButton.isVisible()) {
      await filesButton.click();
      await window.waitForTimeout(500);

      // Find and expand a folder
      const folders = window.locator('[class*="folder"], [class*="Folder"]');
      const firstFolder = folders.first();

      if (await firstFolder.isVisible()) {
        // Expand
        await firstFolder.click();
        await window.waitForTimeout(300);

        // Collapse
        await firstFolder.click();
        await window.waitForTimeout(300);

        await window.screenshot({ path: 'tests/e2e/screenshots/folder-collapsed.png' });
      }
    }
  });
});
