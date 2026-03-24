import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  reporter: [["list"], ["html", { open: "never" }], ["junit", { outputFile: "test-results/playwright-report.xml" }]],
  fullyParallel: true,
  retries: 1,

  use: {
    baseURL: process.env.BASE_URL,
    screenshot: {
      mode: "only-on-failure",
    },
    trace: "retain-on-failure",
    video: "on-first-retry",
    launchOptions: {
      args: ["--disable-extensions", "--disable-infobars", "--disable-web-security", "--disable-features=IsolateOrigins,site-per-process"],
    },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  },

  projects: [
    {
      name: "e2e",
      testDir: "./tests/",
      retries: 2,
      fullyParallel: true,
    },
  ],
});
