---
tags: [testing]
summary: testing implementation decisions and patterns
relevantTo: [testing]
importance: 0.7
relatedFiles: []
usageStats:
  loaded: 0
  referenced: 0
  successfulFeatures: 0
---
# testing

#### [Pattern] Mobile responsiveness testing specified at 768px and 480px breakpoints rather than testing across continuum (2026-02-23)
- **Problem solved:** Plan explicitly states 'test at 768px and 480px breakpoints' for responsive design validation.
- **Why this works:** These represent tablet (768px) and mobile phone (480px) breakpoints, common industry standard. Reduces testing permutations.
- **Trade-offs:** Easier: focused testing, clear test cases. Harder: may miss edge cases at 600px, 1024px, or other breakpoints.

#### [Gotcha] Playwright test framework requires dev server running BEFORE test execution; cannot rely on webServer auto-start with Astro dev in this environment (2026-05-22)
- **Situation:** Tests attempted to run but dev server initialization failed due to dependency installation timing
- **Root cause:** Astro build process triggers full dependency resolution; npm install race condition between Playwright test runner and Astro dev server startup
- **How to avoid:** Skipped E2E tests: gained immediate verification speed; lost browser rendering validation (CSS, JavaScript execution)