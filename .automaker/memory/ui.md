---
tags: [ui]
summary: ui implementation decisions and patterns
relevantTo: [ui]
importance: 0.7
relatedFiles: []
usageStats:
  loaded: 0
  referenced: 0
  successfulFeatures: 0
---
# ui

#### [Pattern] Followed existing component patterns (HeroSection, AboutSection) for AboutContent component design (2026-02-23)
- **Problem solved:** Creating new AboutContent component required layout and styling decisions. Codebase already had established patterns in HeroSection and AboutSection.
- **Why this works:** Consistency reduces cognitive load, maintenance burden, and ensures design cohesion. Users expect familiar patterns. Faster implementation using proven patterns.
- **Trade-offs:** Easier: faster development, predictable styling, consistent UX. Harder: less unique design, may feel derivative if patterns are too familiar.

### Using image placeholders from /public folder that user can replace, rather than embedding images (2026-02-23)
- **Context:** AboutContent component references /public/avatar.jpg and /public/about-image.jpg as placeholders.
- **Why:** Decouples component from specific images, allows easy customization without code changes. Keeps component reusable. Avoids hardcoding user-specific assets.
- **Rejected:** Alternative: Pre-load specific images in component - rejected because it's not scalable, ties component to specific person/brand, requires code edits to change.
- **Trade-offs:** Easier: user customization, component reusability. Harder: requires user to manage image files in public folder, missing images break layout.
- **Breaking if changed:** If images don't exist in /public folder, component renders broken image links. No fallback or error boundary.

#### [Gotcha] Footer emoji icons chosen as simplest implementation, but lacks accessibility (no alt text, no semantic meaning) (2026-02-23)
- **Situation:** Plan specifies 'Use SVG or emoji icons (emoji simplest for now)' for social links.
- **Root cause:** Emoji is fastest to implement without external dependencies or SVG burden.
- **How to avoid:** Easier: no dependencies, instant implementation. Harder: screen readers don't understand emoji, keyboard navigation unclear, visual-only presentation.