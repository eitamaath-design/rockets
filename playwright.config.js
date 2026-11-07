import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    viewport: { width: 840, height: 420 }, // mobile landscape viewport
    ignoreHTTPSErrors: true
  },
  webServer: {
    command: 'npm run preview -- --port 3000 --strictPort',
    port: 3000,
    reuseExistingServer: !process.env.CI
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'mobile-landscape',
      use: {
        viewport: { width: 844, height: 390 },
        isMobile: true,
        hasTouch: true
      }
    }
  ]
});
