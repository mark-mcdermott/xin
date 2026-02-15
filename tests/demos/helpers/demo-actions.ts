/**
 * High-level API for demo scripts. Wraps Playwright interactions with
 * smooth synthetic cursor animation and human-like timing.
 */

import type { Page, Locator } from '@playwright/test';
import { CURSOR_INJECT_SCRIPT, buildMoveScript, CLICK_RIPPLE_SCRIPT } from './synthetic-cursor';
import { TIMING, type TimingProfile } from './config';

export class DemoActions {
  private page: Page;
  private timing: TimingProfile;

  constructor(page: Page, timing?: TimingProfile) {
    this.page = page;
    this.timing = timing ?? TIMING.default;
  }

  /** Inject the synthetic cursor into the page DOM */
  async injectCursor(): Promise<void> {
    await this.page.evaluate(CURSOR_INJECT_SCRIPT);
  }

  /** Resolve a target to a Locator */
  private resolve(target: Locator | string): Locator {
    return typeof target === 'string' ? this.page.locator(target) : target;
  }

  /** Move cursor to the center of a target element */
  async moveTo(target: Locator | string, options?: { duration?: number }): Promise<void> {
    const locator = this.resolve(target);
    const box = await locator.boundingBox();
    if (!box) throw new Error(`Target not visible for moveTo`);

    const tx = box.x + box.width / 2;
    const ty = box.y + box.height / 2;
    const duration = options?.duration ?? this.timing.moveDuration;

    await this.page.evaluate(buildMoveScript(tx, ty, duration));
    await this.pause(this.timing.afterMove);
  }

  /** Move cursor to specific coordinates */
  async moveToPoint(x: number, y: number, options?: { duration?: number }): Promise<void> {
    const duration = options?.duration ?? this.timing.moveDuration;
    await this.page.evaluate(buildMoveScript(x, y, duration));
    await this.pause(this.timing.afterMove);
  }

  /** Move to a target, show click ripple, then click it */
  async clickOn(target: Locator | string, options?: { duration?: number }): Promise<void> {
    await this.moveTo(target, options);
    await this.page.evaluate(CLICK_RIPPLE_SCRIPT);
    const locator = this.resolve(target);
    await locator.click();
    await this.pause(this.timing.afterClick);
  }

  /** Double-click a target */
  async doubleClickOn(target: Locator | string, options?: { duration?: number }): Promise<void> {
    await this.moveTo(target, options);
    await this.page.evaluate(CLICK_RIPPLE_SCRIPT);
    const locator = this.resolve(target);
    await locator.dblclick();
    await this.pause(this.timing.afterClick);
  }

  /** Type text character by character with jittered delays for realism */
  async typeText(text: string, options?: { charDelay?: number }): Promise<void> {
    const baseDelay = options?.charDelay ?? this.timing.charDelay;
    for (const char of text) {
      await this.page.keyboard.type(char, { delay: 0 });
      // Jitter +-30% for natural feel
      const jitter = baseDelay * (0.7 + Math.random() * 0.6);
      await this.pause(jitter);
    }
    await this.pause(this.timing.afterType);
  }

  /** Press a keyboard shortcut (e.g. 'Enter', 'Meta+s') */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
    await this.pause(this.timing.afterKey);
  }

  /** Pause for a given duration (default: comprehension pause) */
  async pause(ms?: number): Promise<void> {
    await this.page.waitForTimeout(ms ?? this.timing.comprehensionPause);
  }

  /** Longer pause between major demo sections */
  async sectionPause(): Promise<void> {
    await this.pause(this.timing.sectionPause);
  }

  /** Wait for an element to become visible */
  async waitFor(target: Locator | string, timeout?: number): Promise<void> {
    const locator = this.resolve(target);
    await locator.waitFor({ state: 'visible', timeout: timeout ?? 5000 });
  }

  /** Scroll an element into view, then move cursor to it */
  async scrollTo(target: Locator | string): Promise<void> {
    const locator = this.resolve(target);
    await locator.scrollIntoViewIfNeeded();
    await this.pause(200);
    await this.moveTo(target);
  }
}
