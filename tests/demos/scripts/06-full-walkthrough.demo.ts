import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { startRecording, stopRecording } from '../helpers/recording-harness';

/**
 * Clean the vault so the demo starts with a blank slate:
 * - Remove all .md files in vault root (Untitled notes, etc.)
 * - Remove all files in notes/
 * - Remove all daily notes
 * The app will auto-create a fresh daily note on launch.
 */
function cleanVault() {
  // Read vault config to find vault path
  const configPaths = [
    path.join(os.homedir(), 'Library/Application Support/Electron/vault-config.json'),
    path.join(os.homedir(), 'Library/Application Support/xin/vault-config.json'),
  ];

  let vaultPath = path.join(os.homedir(), 'Documents/XinVaults/Xin'); // default fallback
  for (const cp of configPaths) {
    try {
      const config = JSON.parse(fs.readFileSync(cp, 'utf-8'));
      if (config.vaultPath) {
        vaultPath = config.vaultPath;
        break;
      }
    } catch { /* config not found, try next */ }
  }

  // Clear .md files in vault root (Untitled notes from previous runs)
  for (const file of fs.readdirSync(vaultPath)) {
    if (file.endsWith('.md')) {
      fs.unlinkSync(path.join(vaultPath, file));
    }
  }

  // Clear notes/ directory
  const notesDir = path.join(vaultPath, 'notes');
  if (fs.existsSync(notesDir)) {
    for (const file of fs.readdirSync(notesDir)) {
      if (file.endsWith('.md')) {
        fs.unlinkSync(path.join(notesDir, file));
      }
    }
  }

  // Clear daily-notes/ directory
  const dailyDir = path.join(vaultPath, 'daily-notes');
  if (fs.existsSync(dailyDir)) {
    for (const file of fs.readdirSync(dailyDir)) {
      if (file.endsWith('.md')) {
        fs.unlinkSync(path.join(dailyDir, file));
      }
    }
  }
}

test('Demo: Full Walkthrough', async () => {
  test.setTimeout(300_000);

  // Clean slate before launching Electron
  cleanVault();

  const options = { name: 'full-walkthrough', resolution: '1080p' as const };
  const ctx = await startRecording(options);
  const { page, demo } = ctx;

  // Common selectors
  const iconSidebar = page.locator('div.w-\\[46px\\]');
  const dailyNotesBtn = iconSidebar.locator('button').first();
  const filesBtn = iconSidebar.locator('button').nth(1);
  const tagsBtn = iconSidebar.locator('button').nth(2);
  const docsBtn = iconSidebar.locator('button').nth(3);
  const storeBtn = iconSidebar.locator('button').nth(4);
  const settingsButton = page.locator('button').filter({
    has: page.locator('svg.lucide-settings'),
  }).first();

  const getEditor = () => page.locator('.cm-content').first();
  const getNewNoteBtn = () =>
    page.locator('.h-9.flex.items-center').locator('button').first();

  // Helper: exit a list cleanly (Enter auto-continues with "- ", Backspace removes it)
  const exitList = async () => {
    await demo.pressKey('Enter');     // auto-continues: "- "
    await demo.pressKey('Backspace'); // removes "- ", leaves empty line
  };

  // Helper: insert newline without triggering custom keymaps (bypasses === template, etc.)
  const rawNewline = async () => {
    await page.keyboard.insertText('\n');
    await demo.pause(200);
  };

  try {
    await demo.sectionPause();

    // =========================================================
    // PART 1: Daily Notes with Tags
    // =========================================================

    // --- Scene 1: Open today's daily note ---
    await demo.clickOn(dailyNotesBtn);
    await demo.pause(1000);

    const editor = getEditor();
    await demo.waitFor(editor);
    await demo.clickOn(editor);
    await demo.pause(300);

    // Move to end of the title line and start content below
    await demo.pressKey('Meta+End');
    await demo.pause(200);
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');

    // --- Scene 2: Type work notes with #work tag ---
    await demo.typeText('## Sprint Review');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('#work');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('- Deployed auth service v2 to production');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('Fixed rate limiter edge case in API gateway');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('Reviewed 3 PRs for the team');

    await demo.sectionPause();

    // --- Scene 3: Type personal notes with #personal tag ---
    await exitList();
    await demo.pressKey('Enter');

    await demo.typeText('## Evening Notes');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('#personal');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('- Finished chapter 5 of DDIA');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('New recipe: roasted cauliflower tacos');

    await demo.sectionPause();

    // =========================================================
    // PART 2: Create Two New Notes (Work & Personal)
    // =========================================================

    // --- Scene 4: Switch to Files sidebar ---
    await demo.clickOn(filesBtn);
    await demo.pause(800);

    // --- Scene 5: Create work note ---
    await demo.clickOn(getNewNoteBtn());
    await demo.pause(1000);

    const editorWork = getEditor();
    await demo.waitFor(editorWork);
    await demo.clickOn(editorWork);
    await demo.pause(300);

    await demo.pressKey('Meta+a');
    await demo.pause(200);

    await demo.typeText('# Q1 Planning');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('#work');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('## Goals');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('- Ship microservice migration by March');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('Reduce P95 latency to under 200ms');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('Onboard two new engineers');

    await demo.sectionPause();

    // --- Scene 6: Create personal note ---
    await demo.clickOn(getNewNoteBtn());
    await demo.pause(1000);

    const editorPersonal = getEditor();
    await demo.waitFor(editorPersonal);
    await demo.clickOn(editorPersonal);
    await demo.pause(300);

    await demo.pressKey('Meta+a');
    await demo.pause(200);

    await demo.typeText('# Reading List');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('#personal');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('- Designing Data-Intensive Applications');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('The Pragmatic Programmer');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('Structure and Interpretation of Computer Programs');

    await demo.sectionPause();

    // =========================================================
    // PART 3: Tags — Browse and Delete Work Notes
    // =========================================================

    // --- Scene 7: Switch to Tags sidebar ---
    await demo.clickOn(tagsBtn);
    await demo.pause(1000);

    // --- Scene 8: Click the #work tag ---
    const workTag = page.locator('.flex.items-center.gap-1.cursor-pointer').filter({
      hasText: '#work',
    }).first();

    if (await workTag.isVisible().catch(() => false)) {
      await demo.clickOn(workTag);
      await demo.pause(1500);

      // --- Scene 9: Delete all work-tagged content ---
      const trashBtn = page.locator('button').filter({
        has: page.locator('svg.lucide-trash-2'),
      }).first();

      if (await trashBtn.isVisible().catch(() => false)) {
        await demo.clickOn(trashBtn);
        await demo.pause(800);

        // Click the delete confirmation button in the modal
        const deleteConfirmBtn = page.getByText(/Delete \d+ Section/i).first();
        if (await deleteConfirmBtn.isVisible().catch(() => false)) {
          await demo.clickOn(deleteConfirmBtn);
          await demo.pause(1500);
        }
      }
    }

    await demo.sectionPause();

    // =========================================================
    // PART 4: Markdown Features
    // =========================================================

    // --- Scene 10: Switch to Files and create Markdown note ---
    await demo.clickOn(filesBtn);
    await demo.pause(800);

    await demo.clickOn(getNewNoteBtn());
    await demo.pause(1000);

    const editorMd = getEditor();
    await demo.waitFor(editorMd);
    await demo.clickOn(editorMd);
    await demo.pause(300);

    await demo.pressKey('Meta+a');
    await demo.pause(200);

    await demo.typeText('# Markdown Features');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');

    await demo.typeText('## Text Formatting');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('This is **bold** and this is *italic* and this is `inline code`.');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');

    await demo.typeText('## Lists');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('- First item');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('Second item');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('Third item');
    await exitList();
    await demo.pressKey('Enter');

    await demo.typeText('## Blockquote');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('> The best way to predict the future is to invent it.');
    await demo.pressKey('Enter');     // auto-continues: "> "
    await demo.pressKey('Backspace'); // removes "> ", exits blockquote
    await demo.pressKey('Enter');

    await demo.typeText('## Code Block');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('```typescript');
    await demo.pressKey('Enter');
    await demo.typeText('function greet(name: string) {');
    await demo.pressKey('Enter');
    await demo.typeText('  return `Hello, ${name}!`;');
    await demo.pressKey('Enter');
    await demo.typeText('}');
    await demo.pressKey('Enter');
    await demo.typeText('```');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');

    await demo.typeText('## Horizontal Rule');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('---');

    await demo.sectionPause();

    // =========================================================
    // PART 5: Internal Links
    // =========================================================

    // --- Scene 11: Create Internal Links note ---
    await demo.clickOn(getNewNoteBtn());
    await demo.pause(1000);

    const editorLinks = getEditor();
    await demo.waitFor(editorLinks);
    await demo.clickOn(editorLinks);
    await demo.pause(300);

    await demo.pressKey('Meta+a');
    await demo.pause(200);

    await demo.typeText('# Internal Links');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('Xin supports wiki-style links between notes.');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('Check out the [[Markdown Features]] note for formatting tips.');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('See my [[Reading List]] for book recommendations.');
    // Wait for auto-rename to settle (2s debounce save + rename + re-render)
    await demo.pause(3500);

    // --- Scene 12: Click an internal link to navigate ---
    const wikilink = page.locator('.cm-wikilink').first();
    if (await wikilink.isVisible().catch(() => false)) {
      await demo.clickOn(wikilink);
      await demo.pause(1500);
    }

    await demo.sectionPause();

    // =========================================================
    // PART 6: Documentation
    // =========================================================

    // --- Scene 13: Open Documentation sidebar ---
    await demo.clickOn(docsBtn);
    await demo.pause(1000);

    const quickStart = page.getByText('Quick Start', { exact: true }).first();
    if (await quickStart.isVisible().catch(() => false)) {
      await demo.clickOn(quickStart);
      await demo.pause(1500);
    }

    const blogPublishing = page.getByText('Blog Publishing', { exact: false }).first();
    if (await blogPublishing.isVisible().catch(() => false)) {
      await demo.clickOn(blogPublishing);
      await demo.pause(1500);
    }

    await demo.sectionPause();

    // =========================================================
    // PART 7: Store
    // =========================================================

    // --- Scene 14: Open Store sidebar ---
    await demo.clickOn(storeBtn);
    await demo.pause(2000);

    await demo.sectionPause();

    // =========================================================
    // PART 8: Settings — Light Mode & Blog Info
    // =========================================================

    // --- Scene 15: Open Settings ---
    if (await settingsButton.isVisible().catch(() => false)) {
      await demo.clickOn(settingsButton);
    } else {
      const settingsText = page.getByText('Settings').first();
      if (await settingsText.isVisible().catch(() => false)) {
        await demo.clickOn(settingsText);
      }
    }
    await demo.pause(1000);

    // --- Scene 16: Switch to Light mode ---
    const lightLabel = page.getByText('Light', { exact: true });
    if (await lightLabel.isVisible().catch(() => false)) {
      await demo.clickOn(lightLabel);
      await demo.sectionPause();
    }

    // --- Scene 17: Scroll to show blog info is prepopulated ---
    const blogsHeading = page.getByText('Blogs', { exact: true });
    if (await blogsHeading.isVisible().catch(() => false)) {
      await demo.scrollTo(blogsHeading);
      await demo.pause(2000);
    }

    await demo.sectionPause();

    // --- Scene 18: Switch back to Dark mode ---
    const darkLabel = page.getByText('Dark', { exact: true });
    if (await darkLabel.isVisible().catch(() => false)) {
      await demo.clickOn(darkLabel);
      await demo.pause(800);
    }

    // =========================================================
    // PART 9: Blog Publishing — === Template
    // =========================================================

    // --- Scene 19: Open today's daily note ---
    await demo.clickOn(dailyNotesBtn);
    await demo.pause(1000);

    const editorBlog = getEditor();
    await demo.waitFor(editorBlog);
    await demo.clickOn(editorBlog);
    await demo.pause(300);

    await demo.pressKey('Meta+End');
    await demo.pause(200);
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');

    // --- Scene 20: Type a blog post using === template ---
    // Use rawNewline after "===" to bypass the blogBlockKeymap auto-template
    await demo.typeText('===');
    await rawNewline();
    await demo.typeText('---');
    await demo.pressKey('Enter');
    await demo.typeText('title: "Building a CLI Tool in Rust"');
    await demo.pressKey('Enter');
    await demo.typeText('subtitle: "From zero to a working binary in 30 minutes"');
    await demo.pressKey('Enter');
    await demo.typeText('date: "2026-02-15"');
    await demo.pressKey('Enter');
    await demo.typeText('tags: ["rust", "cli", "tutorial"]');
    await demo.pressKey('Enter');
    await demo.typeText('---');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('Today I built a small CLI tool in Rust using `clap` for argument parsing.');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('## Getting Started');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('First, scaffold the project with `cargo init`. Then add clap to your dependencies.');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('The whole thing compiles to a **single static binary** — no runtime needed.');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('===');

    await demo.sectionPause();
    await demo.pause(1500);

    // =========================================================
    // PART 10: Blog Publishing — @ Decorator Syntax
    // =========================================================

    // --- Scene 22: Type a second blog post using @ decorators ---
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');

    // NOTE: Replace "markmcdermott" with your actual blog name from Settings
    await demo.typeText('@markmcdermott post');
    await demo.pressKey('Enter');
    await demo.typeText('@title Notes on Distributed Systems');
    await demo.pressKey('Enter');
    await demo.typeText('@subtitle Key takeaways from DDIA Chapter 5');
    await demo.pressKey('Enter');
    await demo.typeText('@date 2026-02-15');
    await demo.pressKey('Enter');
    await demo.typeText('@tags distributed-systems, reading-notes');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('Replication is the core challenge of distributed databases.');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('**Leader-based replication** is the most common approach:');
    await demo.pressKey('Enter');
    await demo.typeText('- One replica is the leader (accepts writes)');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('Others are followers (replicate the log)');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('Reads can go to any replica');
    await exitList();
    await demo.pressKey('Enter');
    await demo.typeText('---');

    await demo.sectionPause();

    // Final pause
    await demo.pause(2000);
    await demo.sectionPause();
  } finally {
    await stopRecording(ctx, options);
  }
});
