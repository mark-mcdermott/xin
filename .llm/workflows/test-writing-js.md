# JavaScript Test Writing Workflow (Playwright)

## Purpose
Write high-quality E2E tests following project standards. Primary framework: Playwright for E2E testing.

## Core Principles
- **Behavior-focused**: Tests should describe expected behavior, not implementation details.
- **Fast & Deterministic**: Keep tests fast and reliable.
- **Critical paths**: Focus on testing critical user journeys.

## File Layout & Naming
- E2E tests under `e2e/**/*.test.ts` using Playwright.

## Test Types & When to Use
- **E2E (Playwright)**: User flows in the Electron app (navigation, editing, file operations).

## Test Authoring Checklist
1. Write a clear test name describing behavior.
2. Use role/aria/data-testid selectors over brittle CSS.
3. Record traces/screenshots for failed runs.
4. Keep tests independent and idempotent.

## Example (Playwright E2E Test)
```ts
import { test, expect } from '@playwright/test';

test.describe('Editor', () => {
  test('can type in the editor', async ({ page }) => {
    await page.goto('/');

    await page.click('[data-testid="editor"]');
    await page.keyboard.type('# Hello World');

    await expect(page.locator('.cm-content')).toContainText('Hello World');
  });

  test('can save a note', async ({ page }) => {
    await page.goto('/');

    await page.click('[data-testid="new-note"]');
    await page.keyboard.type('Test content');
    await page.keyboard.press('Meta+s');

    await expect(page.locator('.save-indicator')).toHaveText('Saved');
  });
});
```

## Example (Navigation Test)
```ts
import { test, expect } from '@playwright/test';

test.describe('File Tree', () => {
  test('can navigate to a file', async ({ page }) => {
    await page.goto('/');

    await page.click('[data-testid="file-tree-item"]');

    await expect(page.locator('.editor-title')).toBeVisible();
  });
});
```

## Running Tests
- E2E: `npm run test:e2e`
- Interactive: `npm run test:e2e:ui`
- Debug: `npx playwright test --debug`

## Output
- E2E tests in `e2e/` directory
- Clear test names and fixtures
- Playwright traces/screenshots for failures
