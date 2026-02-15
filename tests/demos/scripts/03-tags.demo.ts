import { test } from '@playwright/test';
import { startRecording, stopRecording } from '../helpers/recording-harness';

test('Demo: Tags', async () => {
  test.setTimeout(120_000);

  const options = { name: 'tags', resolution: '1080p' as const };
  const ctx = await startRecording(options);
  const { page, demo } = ctx;

  try {
    await demo.sectionPause();

    // --- Scene 1: Open today's note and write tagged content ---
    const iconSidebar = page.locator('div.w-\\[46px\\]');
    const dailyNotesButton = iconSidebar.locator('button').first();
    await demo.clickOn(dailyNotesButton);
    await demo.pause(1000);

    const editor = page.locator('.cm-content').first();
    await demo.waitFor(editor);
    await demo.clickOn(editor);
    await demo.pause(300);

    await demo.pressKey('Meta+End');
    await demo.pause(200);

    await demo.typeText('## Development Log');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('#dev');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('Refactored the publish pipeline to handle multiple blogs.');
    await demo.pressKey('Enter');
    await demo.typeText('Each blog now has independent error handling.');

    await demo.sectionPause();

    // --- Scene 2: Switch to Tag Browser ---
    const tagsButton = iconSidebar.locator('button').nth(2);
    await demo.clickOn(tagsButton);
    await demo.pause(1000);

    // --- Scene 3: Click on a tag if any exist ---
    // Tags appear as items in the sidebar with # prefix
    const tagItems = page.locator('.flex.items-center.gap-1.cursor-pointer');
    const tagCount = await tagItems.count();
    if (tagCount > 0) {
      await demo.clickOn(tagItems.first());
      await demo.pause(1200);

      // If there are multiple tags, click a second one
      if (tagCount > 1) {
        await demo.clickOn(tagItems.nth(1));
        await demo.pause(1200);
      }
    }

    await demo.sectionPause();
  } finally {
    await stopRecording(ctx, options);
  }
});
