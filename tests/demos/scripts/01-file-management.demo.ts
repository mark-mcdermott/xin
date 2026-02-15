import { test } from '@playwright/test';
import { startRecording, stopRecording } from '../helpers/recording-harness';

test('Demo: File Management', async () => {
  test.setTimeout(120_000);

  const options = { name: 'file-management', resolution: '1080p' as const };
  const ctx = await startRecording(options);
  const { page, demo } = ctx;

  try {
    // Let app fully settle
    await demo.sectionPause();

    // --- Scene 1: Open the Files sidebar ---
    const iconSidebar = page.locator('div.w-\\[46px\\]');
    const filesButton = iconSidebar.locator('button').nth(1);
    await demo.clickOn(filesButton);
    await demo.pause(800);

    // --- Scene 2: Create a new note (auto-creates Untitled.md) ---
    const sidebarToolbar = page.locator('.h-9.flex.items-center');
    const newNoteBtn = sidebarToolbar.locator('button').first();
    await demo.clickOn(newNoteBtn);
    await demo.pause(1000);

    // --- Scene 3: Type content in the editor ---
    const editor = page.locator('.cm-content').first();
    await demo.waitFor(editor);
    await demo.clickOn(editor);
    await demo.pause(300);

    // Select all to replace the default "# Untitled" content
    await demo.pressKey('Meta+a');
    await demo.pause(200);

    await demo.typeText('# Getting Started with Xin');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('Xin is a lightweight note-taking app with **blog publishing** built in.');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('## Key Features');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('- Daily notes with date-based organization');
    await demo.pressKey('Enter');
    await demo.typeText('- Tag-based content filtering');
    await demo.pressKey('Enter');
    await demo.typeText('- One-click blog publishing to GitHub');

    await demo.sectionPause();

    // --- Scene 4: Create a second note ---
    await demo.clickOn(newNoteBtn);
    await demo.pause(1000);

    const editor2 = page.locator('.cm-content').first();
    await demo.waitFor(editor2);
    await demo.clickOn(editor2);
    await demo.pause(300);

    await demo.pressKey('Meta+a');
    await demo.pause(200);

    await demo.typeText('# Project Ideas');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('Ideas for weekend projects and experiments.');

    await demo.sectionPause();

    // --- Scene 5: Navigate between files in the tree ---
    const fileTreeItems = page.locator('.cursor-pointer:has(> span)');
    const fileCount = await fileTreeItems.count();
    if (fileCount > 1) {
      // Click on a different file
      await demo.clickOn(fileTreeItems.first());
      await demo.pause(800);
    }

    await demo.sectionPause();
  } finally {
    await stopRecording(ctx, options);
  }
});
