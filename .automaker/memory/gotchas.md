---
tags: [gotcha, mistake, edge-case, bug, warning]
summary: Mistakes and edge cases to avoid
relevantTo: [error, bug, fix, issue, problem]
importance: 0.9
relatedFiles: []
usageStats:
  loaded: 3
  referenced: 2
  successfulFeatures: 2
---
# Gotchas

Mistakes and edge cases to avoid. These are lessons learned from past issues.

---



#### [Gotcha] Tailwind v4 requires explicit theme extension in tailwind.config.js - inherited theme doesn't auto-include defaults (2026-02-23)
- **Situation:** Custom colors and utilities were configured but Tailwind defaults (btn, spacing, etc.) disappeared
- **Root cause:** Tailwind v4 changed theme merging behavior to require explicit spread of defaultConfig for extending (not replacing) defaults; this prevents accidental loss of built-in utilities
- **How to avoid:** More verbose config but explicit control; prevents silent loss of features when extending theme