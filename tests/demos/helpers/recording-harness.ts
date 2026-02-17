/**
 * Recording harness — launches Electron, captures frames via periodic
 * screenshots, stitches them into video with ffmpeg.
 *
 * Playwright's `recordVideo` option is incompatible with Electron's
 * `page.evaluate()`, so we capture frames directly via screenshot loop.
 */

import { _electron as electron, type ElectronApplication, type Page } from '@playwright/test';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { PATHS, RESOLUTION, TIMING, type ResolutionKey, type TimingProfile } from './config';
import { DemoActions } from './demo-actions';

const FPS = 20;
const FRAME_INTERVAL = 1000 / FPS;

export interface RecordingOptions {
  name: string;
  resolution?: ResolutionKey;
  timing?: string | TimingProfile;
  keepFrames?: boolean;
}

export interface RecordingContext {
  electronApp: ElectronApplication;
  page: Page;
  demo: DemoActions;
  /** Internal */
  _framesDir: string;
  _stopCapture: () => void;
}

export async function startRecording(options: RecordingOptions): Promise<RecordingContext> {
  const resolution = RESOLUTION[options.resolution ?? '1080p'];
  const timingProfile = typeof options.timing === 'string'
    ? TIMING[options.timing] ?? TIMING.default
    : options.timing ?? TIMING.default;

  // Ensure directories exist
  if (!fs.existsSync(PATHS.recordingsDir)) {
    fs.mkdirSync(PATHS.recordingsDir, { recursive: true });
  }
  const framesDir = path.join(PATHS.recordingsDir, `_frames_${options.name}`);
  if (fs.existsSync(framesDir)) {
    fs.rmSync(framesDir, { recursive: true });
  }
  fs.mkdirSync(framesDir, { recursive: true });

  const electronApp = await electron.launch({
    args: [PATHS.distMain],
  });

  const page = await electronApp.firstWindow();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // Force dark mode for consistent recordings
  await page.evaluate(async () => {
    await window.electronAPI.theme.set('dark');
    document.documentElement.dataset.theme = 'dark';
  });
  await page.waitForTimeout(300);

  // Disable spell check to prevent macOS autocomplete from swallowing keystrokes
  await page.evaluate(() => {
    document.querySelectorAll('[contenteditable]').forEach(el => {
      el.setAttribute('spellcheck', 'false');
    });
    // Also observe future contenteditable elements (e.g. new tabs)
    new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            node.querySelectorAll('[contenteditable]').forEach(el => {
              el.setAttribute('spellcheck', 'false');
            });
            if (node.getAttribute('contenteditable')) {
              node.setAttribute('spellcheck', 'false');
            }
          }
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  });

  // Resize viewport to target resolution
  await page.setViewportSize(resolution);

  // Inject cursor before starting capture
  const demo = new DemoActions(page, timingProfile);
  await demo.injectCursor();

  // Start periodic screenshot capture
  let frameCount = 0;
  let capturing = true;

  const captureLoop = async () => {
    while (capturing) {
      const start = Date.now();
      try {
        const frameNum = String(frameCount++).padStart(6, '0');
        const framePath = path.join(framesDir, `frame_${frameNum}.png`);
        const buffer = await page.screenshot({ type: 'png' });
        fs.writeFileSync(framePath, buffer);
      } catch {
        // Page may have closed
        break;
      }
      const elapsed = Date.now() - start;
      const wait = Math.max(0, FRAME_INTERVAL - elapsed);
      if (wait > 0 && capturing) {
        await new Promise(resolve => setTimeout(resolve, wait));
      }
    }
  };

  // Fire and forget the capture loop
  captureLoop();

  const stopCapture = () => {
    capturing = false;
  };

  return {
    electronApp,
    page,
    demo,
    _framesDir: framesDir,
    _stopCapture: stopCapture,
  };
}

export async function stopRecording(
  ctx: RecordingContext,
  options: RecordingOptions,
): Promise<string> {
  // Stop capturing frames
  ctx._stopCapture();
  // Give the last frame time to write
  await new Promise(resolve => setTimeout(resolve, 200));

  // Close Electron
  await ctx.electronApp.close();

  // Count frames
  const frames = fs.readdirSync(ctx._framesDir).filter(f => f.endsWith('.png')).sort();
  if (frames.length === 0) {
    throw new Error('No frames were captured');
  }

  console.log(`Captured ${frames.length} frames`);

  // Stitch frames into MP4 with ffmpeg
  const mp4Path = path.join(PATHS.recordingsDir, `${options.name}.mp4`);
  const resolution = RESOLUTION[options.resolution ?? '1080p'];

  try {
    execSync(
      `ffmpeg -y -framerate ${FPS} -i "${ctx._framesDir}/frame_%06d.png" ` +
      `-c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p ` +
      `-vf "scale=${resolution.width}:${resolution.height}:force_original_aspect_ratio=decrease,pad=${resolution.width}:${resolution.height}:(ow-iw)/2:(oh-ih)/2" ` +
      `"${mp4Path}"`,
      { stdio: 'pipe' },
    );
  } catch (err) {
    console.error('ffmpeg failed — install via `brew install ffmpeg`');
    throw err;
  }

  // Clean up frames
  if (!options.keepFrames) {
    fs.rmSync(ctx._framesDir, { recursive: true });
  }

  console.log(`\nRecording saved: ${mp4Path}`);
  return mp4Path;
}
