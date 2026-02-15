# Demo Video Creator

You are creating automated MP4 demo videos of Xin's UI flows using Playwright + Electron. The system captures a synthetic mouse cursor with smooth animation and click feedback, producing polished videos ready for editing/voiceover in Premiere.

## Architecture

The recording system uses **periodic screenshots at 20fps** stitched into MP4 with ffmpeg. This approach exists because Playwright's `recordVideo` option is **incompatible with Electron's `page.evaluate()`** — it causes evaluate calls to hang indefinitely. The screenshot-loop workaround captures frames reliably.

### File Structure

```
tests/demos/
  helpers/
    config.ts               # Timing profiles, resolutions, paths
    synthetic-cursor.ts      # DOM cursor injection + animation (page.evaluate scripts)
    demo-actions.ts          # High-level API: moveTo, clickOn, typeText, pause, etc.
    recording-harness.ts     # Electron launch, screenshot loop, ffmpeg stitching
  scripts/
    01-file-management.demo.ts
    02-daily-notes.demo.ts
    03-tags.demo.ts
    04-settings-theme.demo.ts
    05-docs.demo.ts
  recordings/               # Output dir (gitignored)
playwright.demo.config.ts   # Separate Playwright config (not the test config)
```

### How It Works

1. `startRecording()` launches Electron with `_electron.launch()`, waits for the app to load
2. Sets viewport to target resolution (1920x1080 by default)
3. Injects a synthetic macOS-style SVG cursor into the DOM via `page.evaluate()`
4. Starts a screenshot capture loop at 20fps — each frame saved as `frame_000001.png`, etc.
5. Demo script runs its choreography (cursor moves, clicks, typing)
6. `stopRecording()` stops the capture loop, closes Electron, stitches frames with ffmpeg:
   ```
   ffmpeg -y -framerate 20 -i "frame_%06d.png" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p output.mp4
   ```

### The Synthetic Cursor

- Fixed-position div with macOS arrow SVG, `z-index: 999999`, `pointer-events: none`
- Cursor movement uses `requestAnimationFrame` with **easeOutBack** easing (slight overshoot for realism)
- Click feedback: blue expanding circle that fades over 300ms
- All rendering happens in the DOM so it's captured by screenshots

## How to Run

```bash
# Record all 5 demos
pnpm run demo:record

# Record a single demo by test name
pnpm run demo:record:one "File Management"
pnpm run demo:record:one "Daily Notes"
pnpm run demo:record:one "Tags"
pnpm run demo:record:one "Settings"
pnpm run demo:record:one "Documentation"
```

**Prerequisite**: `brew install ffmpeg` (required for frame stitching)

Output goes to `tests/demos/recordings/<name>.mp4`.

## Writing a New Demo Script

### Template

Every script follows this exact pattern:

```typescript
import { test } from '@playwright/test';
import { startRecording, stopRecording } from '../helpers/recording-harness';

test('Demo: <Name>', async () => {
  test.setTimeout(120_000);

  const options = { name: '<kebab-name>', resolution: '1080p' as const };
  const ctx = await startRecording(options);
  const { page, demo } = ctx;

  try {
    await demo.sectionPause(); // Let app settle before acting

    // --- Scene 1: Description ---
    // ... choreography ...

    // --- Scene 2: Description ---
    // ... choreography ...

    await demo.sectionPause(); // End with a pause
  } finally {
    await stopRecording(ctx, options);
  }
});
```

### File Naming

- File: `tests/demos/scripts/NN-<kebab-name>.demo.ts` (NN = zero-padded number)
- The `options.name` becomes the MP4 filename: `recordings/<name>.mp4`
- Test name: `'Demo: <Human Readable Name>'`

### DemoActions API

All interactions go through `demo.*` methods, never raw Playwright calls (except for locator queries):

| Method | What it does |
|--------|-------------|
| `demo.clickOn(target)` | Animate cursor to target center, show click ripple, click |
| `demo.doubleClickOn(target)` | Same but double-click |
| `demo.moveTo(target)` | Animate cursor without clicking |
| `demo.moveToPoint(x, y)` | Animate cursor to exact coordinates |
| `demo.typeText(text)` | Character-by-character typing with ±30% jitter delay |
| `demo.pressKey(key)` | Keyboard shortcut (e.g. `'Enter'`, `'Meta+a'`, `'Meta+End'`) |
| `demo.pause(ms)` | Wait a specific duration |
| `demo.sectionPause()` | Longer pause between major scenes (1500ms default) |
| `demo.waitFor(target)` | Wait for element visibility before proceeding |
| `demo.scrollTo(target)` | Scroll element into view, then move cursor to it |
| `demo.injectCursor()` | Already called by harness — don't call manually |

**Targets** can be a Playwright `Locator` or a CSS selector string.

### Timing Profiles

Pass `timing` in options to change pacing:

- `'default'` — 500ms moves, 65ms/char (good for most demos)
- `'fast'` — 300ms moves, 40ms/char (quick overview)
- `'cinematic'` — 700ms moves, 80ms/char (dramatic, slow)

### Selector Strategy for Xin's UI

**Icon sidebar** (`div.w-[46px]`): Buttons have no `title` or `aria-label` — use positional index:
```typescript
const iconSidebar = page.locator('div.w-\\[46px\\]');
const dailyNotesBtn = iconSidebar.locator('button').first();  // nth=0
const filesBtn       = iconSidebar.locator('button').nth(1);
const tagsBtn        = iconSidebar.locator('button').nth(2);
const docsBtn        = iconSidebar.locator('button').nth(3);
const storeBtn       = iconSidebar.locator('button').nth(4);
```

**Settings button**: Located outside the icon sidebar, at the bottom of the sidebar panel:
```typescript
const settingsButton = page.locator('button').filter({
  has: page.locator('svg.lucide-settings'),
}).first();
```

**Editor**: CodeMirror content area:
```typescript
const editor = page.locator('.cm-content').first();
```

**Text-based navigation**: For docs tree, settings labels, etc.:
```typescript
page.getByText('Quick Start', { exact: true }).first();
page.getByText('Light', { exact: true });
```

**Back/Forward nav buttons**:
```typescript
page.locator('button[title="Back"]').first();
page.locator('button[title="Forward"]').first();
```

### Defensive Patterns

Always guard against elements that may not exist or be disabled:

```typescript
// Guard visibility
const element = page.getByText('Something');
if (await element.isVisible().catch(() => false)) {
  await demo.clickOn(element);
}

// Guard enabled state
const btn = page.locator('button[title="Back"]').first();
if (await btn.isEnabled().catch(() => false)) {
  await demo.clickOn(btn);
}
```

### Creating New Notes

Xin auto-creates `Untitled.md` when you click the new-note button — there is **no dialog prompt**. To replace default content:

```typescript
const newNoteBtn = sidebarToolbar.locator('button').first();
await demo.clickOn(newNoteBtn);
await demo.pause(1000);

const editor = page.locator('.cm-content').first();
await demo.waitFor(editor);
await demo.clickOn(editor);
await demo.pressKey('Meta+a');   // Select all default content
await demo.pause(200);
await demo.typeText('# My New Title');  // Replaces selected text
```

### Tips for Natural-Looking Videos

- Start and end every script with `demo.sectionPause()` — gives breathing room for editing
- Comment scenes with `// --- Scene N: Description ---` for readability
- Add `demo.pause(800-1200)` after navigating to a new view so the UI settles
- Use `demo.pressKey('Enter')` twice for paragraph breaks in markdown
- Type tags as plain text (`#work`) — they render in the editor
- Don't rush between scenes — viewers need time to see what happened

### Common Gotchas

1. **Never use `recordVideo` with Electron** — it breaks `page.evaluate()`. The screenshot-loop approach is the only reliable method.
2. **Build first** — `pnpm run demo:record` includes a build step, but if you modify only demo scripts you can run Playwright directly: `playwright test --config playwright.demo.config.ts`
3. **Sidebar button indices may shift** if the UI adds/removes icons — verify with the running app if a demo clicks the wrong button.
4. **The app starts with dark theme** by default. If you need light theme, switch it in the demo script via settings.
5. **ffmpeg must be installed** — `brew install ffmpeg`. Without it, you get raw PNG frames but no MP4.
