import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/demos/scripts',
  testMatch: '*.demo.ts',
  timeout: 900_000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    trace: 'off',
    screenshot: 'off',
  },
});
