---
tags: [architecture]
summary: architecture implementation decisions and patterns
relevantTo: [architecture]
importance: 0.7
relatedFiles: []
usageStats:
  loaded: 0
  referenced: 0
  successfulFeatures: 0
---
# architecture

### Tailwind CSS with custom component classes layer instead of pure utility-first approach (2026-02-23)
- **Context:** Portfolio project needed consistent styling with warm color palette while maintaining Tailwind benefits
- **Why:** Custom component classes (.btn-warm, .card-warm, .badge-warm) provide semantic meaning and consistency across the portfolio, reducing cognitive load compared to long utility class chains while keeping Tailwind's configurability
- **Rejected:** Pure utility-first approach would require repeating class combinations across templates; inline styles would lose responsiveness and theming benefits
- **Trade-offs:** Easier to maintain consistent component styling across pages, harder to make one-off exceptions (must use @apply overrides or compose utilities)
- **Breaking if changed:** Removing the components layer would require updating all templates to use raw utility classes, making responsive design and color changes harder to coordinate

#### [Gotcha] Astro + Tailwind integration requires explicit CSS import in BaseLayout, not automatic from config (2026-02-23)
- **Situation:** Initial setup had tailwind.config.js configured but styles weren't appearing on pages
- **Root cause:** Astro doesn't automatically inject CSS from PostCSS - must explicitly import globals.css in the layout file that wraps all pages; this is unlike Next.js which has _app.js convention
- **How to avoid:** Explicit import is more visible/debuggable but requires remembering to add it to every layout file (or inherit from base layout)

### Responsive utilities with explicit breakpoint classes (.hidden-mobile, .hidden-desktop) alongside Tailwind breakpoints (sm:, md:, etc.) (2026-02-23)
- **Context:** Portfolio needed clear mobile-first responsive design without complex breakpoint math for designers
- **Why:** Named responsive utilities (.hidden-mobile) provide semantic clarity for common patterns; combined with Tailwind breakpoints allows both simple (hide on mobile) and granular (show only on lg+) control
- **Rejected:** Only Tailwind breakpoints requires designers to memorize px values; only named utilities would limit responsive options
- **Trade-offs:** More CSS in globals.css, but intuitive for developers familiar with 'mobile-first' terminology; Tailwind classes still available for edge cases
- **Breaking if changed:** Removing named utilities would force all responsive logic through breakpoint classes, making template code less readable

### Removed Contact page entirely rather than converting nav link to footer anchor scroll (2026-02-23)
- **Context:** Feature required removing contact page and updating navigation. Could have kept functionality by making Contact nav link scroll to footer (#footer anchor).
- **Why:** Simplifies navigation and removes unnecessary complexity. Contact wasn't a core page - footer placement implies it's supplementary information.
- **Rejected:** Alternative: Make Contact link scroll to footer with #footer anchor - rejected because it adds navigation complexity for minimal benefit and makes footer the primary contact method (architectural mismatch).
- **Trade-offs:** Easier: simpler nav structure, cleaner information architecture. Harder: users can't jump directly to contact from nav, must scroll to footer.
- **Breaking if changed:** If contact functionality becomes important later, requires re-adding nav item and potentially creating dedicated contact page.

#### [Gotcha] Footer placed in BaseLayout means social links applied globally to ALL pages, not just About page (2026-02-23)
- **Situation:** Footer update adds social media links to BaseLayout which wraps every page in the site.
- **Root cause:** Footer is intentionally global via BaseLayout, but this means the social media context (communicator's profiles) is tied to the entire site identity rather than About page specifically.
- **How to avoid:** Easier: single source of truth for footer across all pages. Harder: social links become part of global branding, must be same on every page.

#### [Pattern] Two-column layout (images left, text right) mirrors existing AboutSection pattern for consistency (2026-02-23)
- **Problem solved:** AboutContent uses two-column grid with images on left, text/bio on right. Codebase already has AboutSection using same pattern.
- **Why this works:** Pattern is already validated in codebase, users expect it, reduces design decisions, ensures visual hierarchy matches existing components.
- **Trade-offs:** Easier: leverages existing CSS grid patterns, predictable responsive behavior at 768px breakpoint. Harder: less design flexibility, similar pages look similar (less differentiation).

#### [Pattern] Keeping profile photo reference in markup (gaby-profile.png) instead of hardcoding paths, with public directory asset resolution (2026-05-22)
- **Problem solved:** Profile photo needed to be circular and responsive across CV page
- **Why this works:** Astro's public directory handling automatically resolves asset paths at build time, avoiding hardcoded relative path fragility across different deployment contexts
- **Trade-offs:** Public assets aren't tree-shaken but provide simpler DX; public directory images load without processing pipeline

#### [Pattern] Using Astro static site generation with astro check validation instead of runtime testing for CV page correctness (2026-05-22)
- **Problem solved:** Required verification that new CV content renders without errors in single-page resume application
- **Why this works:** Astro's build-time compilation catches template syntax errors, component resolution failures, and data structure mismatches before deployment; eliminates runtime surprises
- **Trade-offs:** Build-time validation catches structure errors but misses CSS application bugs; grep verification of content presence is literal and misses visual regressions

### Separated professional profile into dedicated data field (professionalProfile) instead of embedding in inline text (2026-05-22)
- **Context:** Professional summary needs to be maintainable, reusable, and properly formatted separately from component structure.
- **Why:** Centralizing content in cvData object enables: single source of truth for bio updates, potential reuse in other pages/templates, easier testing, clearer data structure for future API migration
- **Rejected:** Keeping it as hardcoded JSX text within component template would tangle content with presentation
- **Trade-offs:** Slight overhead of additional object property, but gains maintainability and separation of concerns. Makes future localization easier.
- **Breaking if changed:** If this pattern isn't followed consistently, profile text becomes scattered across multiple files and sync issues emerge

#### [Gotcha] Section order is implicit in JSX structure, not explicit in data model (2026-05-22)
- **Situation:** CV rendering logic has no centralized section manifest or ordering configuration
- **Root cause:** This is the natural result of template-driven rendering, but creates tight coupling between UI markup and information architecture
- **How to avoid:** Reduces boilerplate for simple cases but makes bulk changes, conditional sections, or A/B testing section layouts require template modifications