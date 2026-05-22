---
tags: [pattern]
summary: pattern implementation decisions and patterns
relevantTo: [pattern]
importance: 0.7
relatedFiles: []
usageStats:
  loaded: 0
  referenced: 0
  successfulFeatures: 0
---
# pattern

#### [Pattern] Sections implemented as independent component blocks rather than array-mapped items (2026-05-22)
- **Problem solved:** Each section (Skills, Experience, Education, Languages) is hardcoded as separate JSX blocks despite similar internal map() patterns
- **Why this works:** Each section has different internal structure (skills-grid vs experience-list vs languages-list), making a universal section component difficult without overengineering
- **Trade-offs:** Code is more explicit and easier to customize per-section, but violates DRY for section boilerplate (title + class + mapping); harder to add features like show/hide toggles