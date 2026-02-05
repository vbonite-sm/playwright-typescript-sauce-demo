# Playwright TypeScript Framework + Discovery Agent

This project is a test automation framework for [Sauce Demo](https://www.saucedemo.com) using Playwright, TypeScript, and an AI-driven Discovery Agent.

## 📁 Structure
*   `pages/`: Page Object Models (POM).
*   `tests/`: End-to-end specs using AAA pattern.
*   `fixtures/`: Dependency injection for pages.
*   `utils/app-explorer.ts`: **The Discovery Agent**.
*   `artifacts/`: HTML/Screenshots captured by the agent.

## 🤖 The Discovery Agent
To enable "AI Exploration" of the app:

1.  Run the agent:
    ```bash
    npx ts-node utils/app-explorer.ts
    ```
2.  The agent will:
    *   Launch a generic Chromium browser.
    *   Log in and traverse the critical paths.
    *   Dump HTML snapshots to `artifacts/`.
3.  Copilot can then read `artifacts/` to generate accurate Selectors and Page Objects.

## 🚀 Running Tests
```bash
npx playwright test
```
