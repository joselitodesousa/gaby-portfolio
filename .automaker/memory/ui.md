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

### Used cubic-bezier(0.4, 0, 0.2, 1) easing instead of linear/ease for card transitions (2026-02-23)
- **Context:** Animating card hover states with transform and shadow changes
- **Why:** Material Design easing curve provides acceleration-deceleration that feels more natural than constant speed; matches professional animation standards for elevation changes
- **Rejected:** Linear or ease (0.3s) - would feel mechanical and lag behind user expectations
- **Trade-offs:** Slightly longer 0.4s duration required to avoid jank, but provides better perceived quality; more CPU-intensive but negligible on modern hardware
- **Breaking if changed:** Reverting to ease would make hover interactions feel sluggish and less responsive to user intent

### Combined translateY(-12px) with scale(1.02) rather than using only elevation (shadow) (2026-02-23)
- **Context:** Creating hover feedback for interactive cards containing embedded video content
- **Why:** Scale alone doesn't communicate interactivity clearly; vertical movement signals lift/elevation while scale adds emphasis - together they create redundant visual feedback that's accessible and obvious
- **Rejected:** Shadow-only approach - loses kinetic feedback; scale-only would feel 'zoomy' without elevation context
- **Trade-offs:** Requires managing transform-origin and potential layout shifts; but scale(1.02) is minimal enough to prevent content reflow issues
- **Breaking if changed:** Removing scale would make the interaction feel less responsive; removing translateY would lose the lift metaphor that connects to enhanced shadow

#### [Gotcha] Shadow color changed to use brand color (rgba(102, 126, 234, 0.25)) instead of neutral black on hover (2026-02-23)
- **Situation:** Enhancing visual hierarchy when cards are interacted with; users need clear feedback that hovering means 'this is interactive'
- **Root cause:** Brand-colored shadows create stronger visual connection to brand identity and signal 'this action belongs to this system' vs generic gray-shadow which feels like OS-level elevation
- **How to avoid:** Requires careful color selection to maintain contrast; brand shadow must be visible on both light and dark backgrounds (edge case not addressed)

#### [Pattern] Added ::before pseudo-element for gradient overlay instead of modifying iframe directly (2026-02-23)
- **Problem solved:** Need to add visual enhancement (gradient overlay) to video containers without modifying embed code
- **Why this works:** Pseudo-elements allow non-destructive styling of third-party content (iframes); keeps separation of concerns - styling layer vs content layer
- **Trade-offs:** Pseudo-elements can't receive pointer events; overlay gradient can't be interactive. But for decorative overlays this is perfect solution

### Reduced video count from 4 to 3 and replaced all with specific YouTube IDs rather than dummy data (2026-02-23)
- **Context:** Initial implementation used placeholder IDs across all video slots; task required specific production IDs
- **Why:** Placeholder data obscures real performance characteristics and accessibility issues (video might not exist, thumbnail might fail, aspect ratio could be wrong); using real content from day one catches integration bugs
- **Rejected:** Keeping 4 videos with mixed IDs - adds unnecessary configuration complexity; keeping placeholders - delays discovery of real data issues
- **Trade-offs:** Real video IDs are immutable once deployed; adding new videos requires code change vs config change. But ensures consistency between design/dev/production
- **Breaking if changed:** If video IDs become unavailable, entire portfolio section becomes non-functional; no graceful fallback for missing videos was implemented

#### [Gotcha] Thumbnail URLs generated from YouTube video IDs using maxresdefault.jpg which may not exist for all videos (2026-02-23)
- **Situation:** Embedding YouTube videos requires fetching thumbnails independently since iframe doesn't provide visual preview
- **Root cause:** maxresdefault.jpg is highest resolution available, provides best quality for responsive designs
- **How to avoid:** maxresdefault may return 404 for some videos requiring fallback to hqdefault (medium quality); but single URL pattern is simpler than dynamic selection

#### [Pattern] Used separate breakpoints (1024px, 768px, 480px) with different scale and shadow values rather than single responsive rule (2026-02-23)
- **Problem solved:** Hover effects (scale, shadow) need adjustment across device sizes to prevent jank and maintain touch-friendliness
- **Why this works:** Mobile devices don't have hover - touch interactions shouldn't trigger scale(1.02) as it reflows content; shadow reduction prevents layout shift on lower-powered devices
- **Trade-offs:** More CSS code to maintain; harder to predict behavior across all screen sizes. But prevents the 'jumpy' mobile interaction that frustrates users