import { test } from '@playwright/test';
import { startRecording, stopRecording } from '../helpers/recording-harness';

test('Demo: Documentation', async () => {
  test.setTimeout(120_000);

  const options = { name: 'docs', resolution: '1080p' as const };
  const ctx = await startRecording(options);
  const { page, demo } = ctx;

  try {
    await demo.sectionPause();

    // --- Scene 1: Open Documentation via icon sidebar ---
    const iconSidebar = page.locator('div.w-\\[46px\\]');
    const docsButton = iconSidebar.locator('button').nth(3);
    await demo.clickOn(docsButton);
    await demo.pause(1000);

    // --- Scene 2: Click "Quick Start" in the docs tree ---
    const quickStart = page.getByText('Quick Start', { exact: true }).first();
    if (await quickStart.isVisible().catch(() => false)) {
      await demo.clickOn(quickStart);
      await demo.pause(1200);
    }

    // --- Scene 3: Navigate to Tag Syntax ---
    const tagSyntax = page.getByText('Tag Syntax', { exact: true }).first();
    if (await tagSyntax.isVisible().catch(() => false)) {
      await demo.clickOn(tagSyntax);
      await demo.pause(1200);
    }

    // --- Scene 4: Navigate to Blog Publishing Overview ---
    const blogPub = page.getByText('Blog Publishing', { exact: true }).first();
    if (await blogPub.isVisible().catch(() => false)) {
      await demo.clickOn(blogPub);
      await demo.pause(800);
    }

    const settingUpBlog = page.getByText('Setting Up a Blog', { exact: true }).first();
    if (await settingUpBlog.isVisible().catch(() => false)) {
      await demo.clickOn(settingUpBlog);
      await demo.pause(1200);
    }

    // --- Scene 5: Use back button (should be enabled after navigating) ---
    const backButton = page.locator('button[title="Back"]').first();
    const isBackEnabled = await backButton.isEnabled().catch(() => false);
    if (isBackEnabled) {
      await demo.clickOn(backButton);
      await demo.pause(800);

      await demo.clickOn(backButton);
      await demo.pause(800);
    }

    // --- Scene 6: Use forward button ---
    const forwardButton = page.locator('button[title="Forward"]').first();
    const isForwardEnabled = await forwardButton.isEnabled().catch(() => false);
    if (isForwardEnabled) {
      await demo.clickOn(forwardButton);
      await demo.pause(800);
    }

    await demo.sectionPause();
  } finally {
    await stopRecording(ctx, options);
  }
});
