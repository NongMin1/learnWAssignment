# QA Automation Assignment

This project contains an automated testing framework utilizing Playwright for End-to-End (E2E) UI testing.

## Prerequisites

Before running tests, make sure the following are installed:

- **Node.js v18+** — [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/NongMin1/learnWAssignment.git
cd learnWAssignment
npm install
npm run pw:install
```

## Project Structure

```bash
├── pages/                  # Page Object Models (POM)
├── tests/                  # # End-to-End UI tests
├── test-results/           # Test artifacts (screenshots, traces)
├── .env.example            # Environment configuration template
├── playwright.config.ts    # Playwright configuration
├── package.json            # Dependencies and scripts
└── README.md               # Documentation
```

## Environment Variables

Create a `.env` file in the project root. You can use .env.example as a template:

```env
BASE_URL=your_base_url_here
EMAIL=your_email_here
PASSWORD=your_password_here
```

## Running Tests

| Script                | Description                                                                          |
| :-------------------- | :----------------------------------------------------------------------------------- |
| `npm test`            | Runs **UI tests** in headless mode.                                                  |
| `npm run test:headed` | Runs UI tests in **headed mode** (browser visible) and sequentially (`--workers=1`). |
| `npm run test:ui`     | Opens the Playwright Test Runner UI for interactive debugging.                       |
| `npm run report`      | Shows the latest Playwright HTML test report.                                        |
| `npm run pw:install`  | Installs Playwright browsers and dependencies.                                       |
