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
  test.setTimeout(900_000);

  // Clean slate before launching Electron
  cleanVault();

  const options = { name: 'full-walkthrough', resolution: '480p' as const };
  const ctx = await startRecording(options);
  const { page, demo } = ctx;

  // Auto-dismiss native alert dialogs so they don't flash on screen
  page.on('dialog', dialog => dialog.dismiss());

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

  // Helper: click editor and go to end of document
  const focusEditorEnd = async () => {
    const ed = getEditor();
    await demo.clickOn(ed);
    await demo.pause(300);
    await demo.pressKey('Meta+End');
    await demo.pause(200);
  };

  try {
    // Close any tabs that auto-opened on launch (e.g. today's daily note)
    const closeButtons = page.locator('button[title="Close tab"]');
    const count = await closeButtons.count();
    for (let i = count - 1; i >= 0; i--) {
      await closeButtons.nth(i).click();
      await demo.pause(300);
    }

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

    // Move to body (line right after the title)
    await demo.pressKey('Meta+End');
    await demo.pause(200);

    // --- Scene 2: Type work notes with #work tag ---
    await demo.typeText('#work');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('## Sprint Review');
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

    await demo.typeText('#personal');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('## Evening Notes');
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

    await demo.pressKey('Meta+Home');
    await demo.pause(200);
    await demo.pressKey('Meta+a');
    await demo.pause(200);

    await demo.typeText('Q1 Planning');
    await demo.pressKey('Meta+End');
    await demo.pause(200);
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

    await demo.pressKey('Meta+Home');
    await demo.pause(200);
    await demo.pressKey('Meta+a');
    await demo.pause(200);

    await demo.typeText('Reading List');
    await demo.pressKey('Meta+End');
    await demo.pause(200);
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
    // Wait for all notes to save (2s debounce + buffer) so Tags picks them up
    await demo.pause(3000);
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

    // --- Scene 9b: Show what happened to the notes after #work deletion ---
    await demo.clickOn(filesBtn);
    await demo.pause(800);

    // Click on Q1 Planning to show its content without #work sections
    const q1Note = page.getByText('Q1 Planning', { exact: true }).first();
    if (await q1Note.isVisible().catch(() => false)) {
      await demo.clickOn(q1Note);
      await demo.pause(3000);
    }

    // Click on today's daily note to show its content without #work sections
    const dailyNoteLink = page.getByText('26-02-16', { exact: true }).first();
    if (await dailyNoteLink.isVisible().catch(() => false)) {
      await demo.clickOn(dailyNoteLink);
      await demo.pause(3000);
    }

    await demo.sectionPause();

    // =========================================================
    // PART 4: Markdown Features
    // =========================================================

    // --- Scene 10: Create Markdown note ---

    await demo.clickOn(getNewNoteBtn());
    await demo.pause(1000);

    const editorMd = getEditor();
    await demo.waitFor(editorMd);
    await demo.clickOn(editorMd);
    await demo.pause(300);

    await demo.pressKey('Meta+Home');
    await demo.pause(200);
    await demo.pressKey('Meta+a');
    await demo.pause(200);

    await demo.typeText('Markdown Features');
    await demo.pressKey('Meta+End');
    await demo.pause(200);

    // --- Headers ---
    await demo.typeText('## Heading 2');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('### Heading 3');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('#### Heading 4');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');

    // --- Text Formatting ---
    await demo.typeText('This is **bold** and this is *italic* and this is `inline code`.');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');

    // --- External Link ---
    await demo.typeText('Here is a link: [Anthropic](https://anthropic.com)');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');

    // --- Bullet Lists ---
    await demo.typeText('## Lists');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('- First item');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('Second item');
    await demo.pressKey('Enter'); // auto-continues with "- "
    await demo.typeText('Third item');
    await demo.pressKey('Enter'); // auto-continues with "- "

    // --- Indented (nested) Bullets ---
    await demo.pressKey('Tab');  // indent to "    - "
    await demo.typeText('Nested item A');
    await demo.pressKey('Enter'); // auto-continues indented "    - "
    await demo.typeText('Nested item B');
    await exitList();
    await demo.pressKey('Enter');

    // --- Blockquote ---
    await demo.typeText('## Blockquote');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('> The best way to predict the future is to invent it.');
    await demo.pressKey('Enter');     // auto-continues: "> "
    await demo.pressKey('Backspace'); // removes "> ", exits blockquote
    await demo.pressKey('Enter');

    // --- Horizontal Rule ---
    await demo.typeText('## Horizontal Rule');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('---');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');

    // --- Code Block (auto-closes: typing ``` inserts closing ``` automatically) ---
    await demo.typeText('## Code Block');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('```');
    await demo.pause(300); // let auto-close complete
    await demo.typeText('function greet(name: string) {');
    await demo.pressKey('Enter');
    await demo.typeText('  return `Hello, ${name}!`;');
    await demo.pressKey('Enter');
    await demo.typeText('}');

    // Exit the code block by pressing Down when cursor is after last character
    await demo.pressKey('ArrowDown');
    await demo.pause(300);

    // Add blank lines and scroll so the code block is fully visible
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.pressKey('ArrowDown');
    await demo.pause(3000); // pause so viewers can read the code block

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

    await demo.pressKey('Meta+Home');
    await demo.pause(200);
    await demo.pressKey('Meta+a');
    await demo.pause(200);

    await demo.typeText('Internal Links');
    await demo.pressKey('Meta+End');
    await demo.pause(200);
    await demo.typeText('Xin supports wiki-style links between notes.');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('Check out the [[Markdown Features]] note for formatting tips.');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('See my [[Reading List]] for book recommendations.');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.typeText('Ideas for the future: [[Project Ideas]]');
    // Wait for auto-rename to settle (2s debounce save + rename + re-render)
    await demo.pause(3500);

    // --- Scene 12a: Click an internal link to navigate to an existing note ---
    const wikilink = page.locator('.cm-wikilink').first();
    if (await wikilink.isVisible().catch(() => false)) {
      await demo.clickOn(wikilink);
      await demo.pause(2000);
    }

    // --- Scene 12b: Navigate back to Internal Links via its tab ---
    const internalLinksTab = page.locator('[role="tab"]').filter({ hasText: 'Internal Links' }).first();
    if (await internalLinksTab.isVisible().catch(() => false)) {
      await demo.clickOn(internalLinksTab);
      await demo.pause(1000);
    }

    // Click the [[Project Ideas]] link — this should create the note
    const projectIdeasLink = page.locator('.cm-wikilink-missing').filter({ hasText: 'Project Ideas' }).first();
    if (await projectIdeasLink.isVisible().catch(() => false)) {
      await demo.clickOn(projectIdeasLink);
      await demo.pause(2000);
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

    // --- Scene 16: Browse settings (stay in dark mode) ---
    await demo.sectionPause();

    // --- Scene 17: Scroll to show blog info is prepopulated ---
    const blogsHeading = page.getByText('Blogs', { exact: true });
    if (await blogsHeading.isVisible().catch(() => false)) {
      await demo.scrollTo(blogsHeading);
      await demo.pause(2000);
    }

    await demo.sectionPause();

    // =========================================================
    // PART 9: Blog Publishing — === Template
    // =========================================================

    // --- Scene 18: Open today's daily note ---
    await demo.clickOn(dailyNotesBtn);
    await demo.pause(1000);

    await focusEditorEnd();
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');
    await demo.pressKey('Enter'); // extra blank line before blog post

    // --- Scene 19: Type a blog post using === template ---
    // Use rawNewline after "===" to bypass the blogBlockKeymap auto-template
    await demo.typeText('===');
    await rawNewline();
    await demo.typeText('---');
    await demo.pressKey('Enter');
    await demo.typeText('blog: "markmcdermott.io"');
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

    // --- Scene 20: Publish the === blog post ---
    // Scroll up to find the publish button (rocket icon on the opening === line)
    const blogPublishBtn = page.locator('.cm-blog-publish-btn').first();
    try {
      if (await blogPublishBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await demo.clickOn(blogPublishBtn);
        await page.getByText('Published!').waitFor({ timeout: 60_000 });
        await demo.pause(2000);
        // Close the progress popup
        const closePopupBtn = page.locator('div[style*="position: fixed"] button').filter({
          has: page.locator('svg.lucide-x'),
        }).first();
        if (await closePopupBtn.isVisible().catch(() => false)) {
          await closePopupBtn.click();
          await demo.pause(500);
        }
      } else {
        await blogPublishBtn.scrollIntoViewIfNeeded().catch(() => {});
        await demo.pause(500);
        if (await blogPublishBtn.isVisible().catch(() => false)) {
          await demo.clickOn(blogPublishBtn);
          await page.getByText('Published!').waitFor({ timeout: 60_000 });
          await demo.pause(2000);
        }
      }
    } catch (e) {
      // Publish timed out — continue with demo
      await demo.pause(2000);
    }

    await demo.sectionPause();

    // =========================================================
    // PART 10: Blog Publishing — @ Decorator Syntax
    // =========================================================

    // --- Scene 21: Type a second blog post using @ decorators ---
    // Re-focus editor and go to end (publish may have moved focus)
    await focusEditorEnd();
    await demo.pressKey('Enter');
    await demo.pressKey('Enter');

    await demo.typeText('@markmcdermott.io post');
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

    // --- Scene 22: Publish the @ blog post ---
    try {
      const atPublishBtn = page.locator('.cm-at-publish-btn').first();
      if (await atPublishBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await atPublishBtn.scrollIntoViewIfNeeded().catch(() => {});
        await demo.pause(300);
        await demo.clickOn(atPublishBtn);
        await page.getByText('Published!').waitFor({ timeout: 60_000 });
        await demo.pause(2000);
        // Close the progress popup
        const closePopupBtn2 = page.locator('div[style*="position: fixed"] button').filter({
          has: page.locator('svg.lucide-x'),
        }).first();
        if (await closePopupBtn2.isVisible().catch(() => false)) {
          await closePopupBtn2.click();
          await demo.pause(500);
        }
      }
    } catch (e) {
      // Publish timed out — continue with demo
      await demo.pause(2000);
    }

    await demo.sectionPause();

    // =========================================================
    // PART 11: Clean up — Delete Published Blog Posts
    // =========================================================

    // --- Scene 23: Switch to Files sidebar and expand the blog folder ---
    await demo.clickOn(filesBtn);
    await demo.pause(1000);

    // Find and click the blog folder (e.g. "markmcdermott.io") to expand it
    const blogFolder = page.getByText('markmcdermott.io', { exact: true }).first();
    if (await blogFolder.isVisible().catch(() => false)) {
      await demo.clickOn(blogFolder);
      await demo.pause(1500);

      // --- Scene 24: Right-click and delete each published post ---
      // Find blog post files in the sidebar
      const buildingPost = page.locator('.cursor-pointer').filter({ hasText: 'building-a-cli' }).first();
      if (await buildingPost.isVisible().catch(() => false)) {
        // Right-click to show context menu (visible in recording)
        await buildingPost.click({ button: 'right', position: { x: 50, y: 8 } });
        await demo.pause(400);
        // Navigate native menu: Rename → separator → Delete
        await page.keyboard.press('ArrowDown'); // Rename
        await page.keyboard.press('ArrowDown'); // separator (skipped)
        await page.keyboard.press('ArrowDown'); // Delete
        await page.keyboard.press('Enter');
        await demo.pause(800);

        // Confirm deletion in the dialog
        const deleteConfirmRemote = page.getByText('Delete', { exact: true }).last();
        if (await deleteConfirmRemote.isVisible().catch(() => false)) {
          await demo.clickOn(deleteConfirmRemote);
          await demo.pause(2000);
        }
      }

      const notesPost = page.locator('.cursor-pointer').filter({ hasText: 'notes-on-distributed' }).first();
      if (await notesPost.isVisible().catch(() => false)) {
        await notesPost.click({ button: 'right', position: { x: 50, y: 8 } });
        await demo.pause(400);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await demo.pause(800);

        const deleteConfirmRemote2 = page.getByText('Delete', { exact: true }).last();
        if (await deleteConfirmRemote2.isVisible().catch(() => false)) {
          await demo.clickOn(deleteConfirmRemote2);
          await demo.pause(2000);
        }
      }
    }

    // Final pause
    await demo.pause(2000);
    await demo.sectionPause();
  } finally {
    await stopRecording(ctx, options);
  }
});
