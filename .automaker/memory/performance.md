---
tags: [performance]
summary: performance implementation decisions and patterns
relevantTo: [performance]
importance: 0.7
relatedFiles: []
usageStats:
  loaded: 0
  referenced: 0
  successfulFeatures: 0
---
# performance

#### [Pattern] Four-tier color palette organization (warm, sand, terra, earth) with complementary color relationships (2026-02-23)
- **Problem solved:** Portfolio branding needed warm aesthetic without color clashing or accessibility issues
- **Why this works:** Organizing colors by semantic purpose and visual relationship (primary, secondary, accent, supporting) allows designers to safely pick any combination without manual testing; reduces cognitive load of 40+ color variables into four intuitive groups
- **Trade-offs:** More configuration upfront, but color changes across entire site can happen in one config location; new colors automatically gain responsive variants

#### [Pattern] Custom animation utilities defined in Tailwind config instead of inline animations in components (2026-02-23)
- **Problem solved:** Portfolio needed consistent, reusable animations (float, fade, pulse, glow) across multiple components
- **Why this works:** Defining animations in Tailwind config allows all instances to use same keyframes (reduces CSS duplication), enables responsive animation variants (e.g., .md:animate-float), and makes animation changes affect entire site from one location
- **Trade-offs:** Easier to maintain and audit animations, but requires discipline to use defined animations instead of creating new ones ad-hoc

### CSS file size targets (8-9KB uncompressed, 2-3KB gzipped) driven by Astro's per-page build output, not monolithic bundle (2026-02-23)
- **Context:** Tailwind normally generates 30-50KB CSS; portfolio needed to stay under 10KB per page
- **Why:** Astro generates separate CSS per page with automatic tree-shaking; custom components and limited color palette (4 groups vs 50+) ensure only used CSS is included. This reduces page load vs traditional approach.
- **Rejected:** Traditional Tailwind setup with all utilities on every page would be 30KB+; splitting into modules would require CSS-in-JS overhead
- **Trade-offs:** Smaller total CSS but requires careful component design to avoid unused utilities; Astro's per-page CSS is automatic benefit
- **Breaking if changed:** Adding unused color variants or animations would immediately bloat all generated CSS files without warning