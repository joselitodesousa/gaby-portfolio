---
tags: [security]
summary: security implementation decisions and patterns
relevantTo: [security]
importance: 0.7
relatedFiles: []
usageStats:
  loaded: 0
  referenced: 0
  successfulFeatures: 0
---
# security

### PostCSS configuration uses CommonJS (.cjs) instead of ES modules for Tailwind v4 compatibility (2026-02-23)
- **Context:** Modern Astro projects use ES modules, but postcss.config.js needs CommonJS for plugin compatibility
- **Why:** Tailwind and Autoprefixer plugins require CommonJS module.exports; mixing CJS and ESM prevents module resolution errors and ensures all PostCSS plugins load correctly
- **Rejected:** Using postcss.config.js (ES) would cause plugin loading failures; Astro's ESM-first approach conflicts with plugin expectations
- **Trade-offs:** Must maintain one CJS file in ESM project; clearer about plugin integration point but adds file type hybrid
- **Breaking if changed:** Converting back to .js with ES export syntax would cause PostCSS plugin loading failures, silently disabling Tailwind CSS