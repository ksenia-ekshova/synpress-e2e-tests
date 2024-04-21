import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './src/tests',
  timeout: 100 * 1000,
  expect: {
    timeout: 100000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    //actionTimeout: 1000,
    //screenshot: 'only-on-failure',
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    headless: false,
  },
  // start local web server before tests
  // webServer: [
  //   {
  //     command: 'npm run start:server',
  //     url: 'http://localhost:3000',
  //     timeout: 5000,
  //     reuseExistingServer: true,
  //   },
  // ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  outputDir: 'test-results',
});
