import { test } from '@playwright/test';
import { startRecording, stopRecording } from '../helpers/recording-harness';

test('Demo: Daily Notes', async () => {
  test.setTimeout(120_000);

  const options = { name: 'daily-notes', resolution: '1080p' as const };
  const ctx = await startRecording(options);
  const { page, demo } = ctx;

  try {
    await demo.sectionPause();

    // --- Scene 1: Click Daily Notes icon (opens today's note) ---
    const iconSidebar = page.locator('div.w-\\[46px\\]');
    const dailyNotesButton = iconSidebar.locator('button').first();
    await demo.clickOn(dailyNotesButton);
    await demo.pause(1000);

    // --- Scene 2: Type a journal entry ---
    const editor = page.locator('.cm-content').first();
    await demo.waitFor(editor);
    await demo.clickOn(editor);
    await demo.pause(300);

    // Move to end of content if any exists
    await demo.pressKey('Meta+End');
    await demo.pause(200);

    await demo.typeText('## Morning Standup');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('#work');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('- Shipped the new auth flow to staging');
    await demo.pressKey('Enter');
    await demo.typeText('- Code review for the API refactor');
    await demo.pressKey('Enter');
    await demo.typeText('- Need to follow up on the deployment issue');

    await demo.sectionPause();

    // --- Scene 3: Add another tagged section ---
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('## Reading Notes');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('#personal');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('Started reading "Designing Data-Intensive Applications" — ');
    await demo.typeText('chapter 3 on storage engines is really interesting.');

    await demo.sectionPause();

    // --- Scene 4: Switch to calendar view in sidebar ---
    // The daily notes sidebar shows a calendar when the daily tab is active
    // Click the Daily Notes icon again to show the sidebar calendar
    await demo.clickOn(dailyNotesButton);
    await demo.pause(800);

    await demo.sectionPause();
  } finally {
    await stopRecording(ctx, options);
  }
});
