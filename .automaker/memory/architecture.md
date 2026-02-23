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