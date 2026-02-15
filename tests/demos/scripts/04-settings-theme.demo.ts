import { test } from '@playwright/test';
import { startRecording, stopRecording } from '../helpers/recording-harness';

test('Demo: Settings & Theme', async () => {
  test.setTimeout(120_000);

  const options = { name: 'settings-theme', resolution: '1080p' as const };
  const ctx = await startRecording(options);
  const { page, demo } = ctx;

  try {
    await demo.sectionPause();

    // --- Scene 1: Open Settings ---
    // Settings button is at the bottom of the sidebar panel
    const settingsButton = page.locator('button').filter({
      has: page.locator('svg.lucide-settings'),
    }).first();

    // Fallback: if lucide class doesn't work, try the bottom-right button area
    if (await settingsButton.isVisible().catch(() => false)) {
      await demo.clickOn(settingsButton);
    } else {
      // The settings button is the last button in the sidebar bottom area
      const bottomSettings = page.locator('text=Settings').first();
      if (await bottomSettings.isVisible().catch(() => false)) {
        await demo.clickOn(bottomSettings);
      }
    }
    await demo.pause(1000);

    // --- Scene 2: Switch to Light theme ---
    const lightLabel = page.getByText('Light', { exact: true });
    await demo.waitFor(lightLabel, 3000);
    await demo.clickOn(lightLabel);
    await demo.sectionPause(); // Let the theme transition sink in

    // --- Scene 3: Switch to Dark theme ---
    const darkLabel = page.getByText('Dark', { exact: true });
    await demo.clickOn(darkLabel);
    await demo.sectionPause();

    // --- Scene 4: Scroll to view vault management section ---
    const vaultHeading = page.getByText('Vault Management', { exact: false });
    if (await vaultHeading.isVisible().catch(() => false)) {
      await demo.scrollTo(vaultHeading);
      await demo.pause(1000);
    }

    // --- Scene 5: Scroll to view blogs section ---
    const blogsHeading = page.getByText('Blogs', { exact: true });
    if (await blogsHeading.isVisible().catch(() => false)) {
      await demo.scrollTo(blogsHeading);
      await demo.pause(1000);
    }

    await demo.sectionPause();
  } finally {
    await stopRecording(ctx, options);
  }
});
