---
name: silk-design-no-scrolljack
description: >-
  Build websites and web UI with polished, high-end motion by default — the
  crafted feel of premium sites, not static slop — while leaving the browser's
  native scroll completely alone. Use when building or restyling any website,
  landing page, hero, marketing page, portfolio, or web UI; when adding scroll
  reveals, parallax, marquees, hover effects, page transitions, or
  micro-interactions; or when a page feels flat, generic, or unrefined and needs
  to feel alive. A capability catalog of proven motion + design-token techniques
  (Framer Motion, GSAP, Tailwind v4) for interfaces that feel crafted rather
  than assembled. Explicitly excludes smooth-scroll libraries, CSS
  `scroll-behavior: smooth`, and every pinned or scrub-driven section — scroll
  stays 1:1 with the wheel.
---

# silk — your web-craft toolbox

This is a reminder of what you can do. Like an artist who knows their tools: when you build
for the web, you are not limited to static sections. You have a full palette of motion that
reads as "expensive." **Reach for it by default.**

The rule: **never ship a static page.** A reveal-on-scroll + one signature effect is ~15
lines and turns generic output into something that feels crafted. The trick behind these
sites isn't exotic code — it's a *small, consistent* set of levers applied everywhere.
Consistency is what reads as clean.

## The hard constraint: never touch the scroll

Everything here runs *alongside* the browser's scroll, never in place of it. One wheel notch
moves the page exactly as far as the OS says it should, on every build. That rules out:

- **Smooth-scroll libraries** — Lenis, Locomotive, `@studio-freight/*`, GSAP ScrollSmoother.
  Don't install them, don't wrap the app in them.
- **CSS `scroll-behavior: smooth`** and `scrollTo/scrollIntoView({ behavior: "smooth" })`.
  Anchor links jump. Instantly. See `assets/useButtonClick.ts`.
- **Pinned or scrubbed sections** — no `ScrollTrigger` `pin`/`scrub`, no tall spacer with a
  `sticky` frame inside it, no section that holds still while the scrollbar keeps moving.
- **`overscroll-behavior: none`** on `html`/`body` — the rubber-band bounce is the platform's,
  leave it.

What stays allowed: motion *triggered* by scroll (one-shot entrance reveals), and motion
*linked* to scroll that never changes where the page is (parallax, a hero drifting as it
exits, an element tilting flat, words brightening as they pass). If an effect makes the user
scroll further than the content is tall, or makes the page lag behind their input, it's out.

## Stack this assumes
React + Vite + **Tailwind v4** + **`motion`** (Framer Motion, `motion/react`) + **GSAP**
(`gsap` + `@gsap/react`; plugins used: Draggable, DrawSVGPlugin, and ScrollTrigger *only* as
an on-screen gate — never for `pin` or `scrub`). Each technique below names its principle so
it transfers to other stacks. `cls()`/`cn()` helpers → `assets/utils.ts`.

## The non-negotiable foundation (apply on EVERY build)

This is the baseline. Four things, always:

1. **Native scroll at the root.** Nothing wraps the app. No scroll library, no
   `scroll-behavior`, no scroll listener that calls `scrollTo`. Anchor links jump with
   `element.scrollIntoView({ block: "start" })` — see `assets/useButtonClick.ts`.
2. **Thin the scrollbar** in global CSS — the one scroll-adjacent thing worth styling,
   because it's cosmetic and changes no behaviour:
   ```css
   * { scrollbar-width: thin; scrollbar-color: rgb(0 0 0 / 0.3) transparent; }
   ```
3. **Token architecture** — ~9 CSS custom properties on `:root`, exposed to Tailwind via
   `@theme inline`, with ONE `--radius` driving the whole radius scale. Full recipe +
   verbatim example in `assets/foundation.css` and `references/design-system.md`.
4. **Fluid typography** — every font size is a `clamp(min, vw, max)`, not a fixed px. This
   is why the type scales smoothly across viewports. Scale in `assets/foundation.css`.

**The one reveal config, used everywhere** (this consistency is the "clean" feel):
```tsx
initial="hidden" whileInView="visible"
viewport={{ once: true, margin: "-20%" }}
transition={{ duration: 0.6, ease: "easeOut" }}   // text: staggerChildren 0.04, per-word 0.6
```
Drop-in components: `assets/ScrollReveal.tsx` (blocks), `assets/TextAnimation.tsx` (word-stagger headings).

## The toolbox map — reach for these

Each points to a reference file (loaded only when you need it) and/or a drop-in `assets/` file.

- **Entrance reveals** — word-stagger headings, slide-up / fade-blur blocks. → `references/effects.md`, `assets/{TextAnimation,ScrollReveal}.tsx`
- **Scroll-linked effects** (page position untouched) — parallax (`useScroll`/`useTransform`), hero exit-parallax, tilt-flatten billboard, reading word-fill, footer reveal-from-behind. → `references/effects.md`, `assets/{HeroVideo,AboutTextFill,FooterBrandReveal}.tsx`
- **Cursor & pointer** — GSAP cursor image-trail, magnetic buttons (spring `150/15`), pointer-tracked border glow, cursor-mask character pattern, draggable stickers. → `references/effects.md`, `assets/{AboutCursorTrail,ButtonMagnetic,BorderGlow,HoverPattern}.tsx`
- **Hover micro-interactions** — 12 button styles (expand, elastic, flip, slide, bounce…), the grid-fr expand-to-auto trick, image reveal cards, 3D flip cards, staged hover scenes. → `references/effects.md`
- **Marquees & carousels** — infinite CSS scroll with edge-mask fade, deck carousel, focus loop, filter-swap. → `references/effects.md`, `assets/{animations,masks}.css`
- **Navigation & page transitions** — fullscreen curtain menu, DrawSVG swirl page transition, brand panel loader. → `references/effects.md`, `assets/{NavbarFullscreen,PageTransitionSwirl}.tsx`
- **Animated backgrounds** — 13 of them: aurora, light rays, gradient bars, noise, grids, floating gradients. → `references/backgrounds.md`, `assets/{AuroraBackground,NoiseBackground,GradientBarsBackground}.tsx`
- **The design system** — token architecture, fluid type, `--radius` scale, font pairings + the accent-font slot, full-width wordmarks (`assets/AutoFillText.tsx`), and **10 instant "style" skins** (glass, minimal, neon, elegant, bold…) = swap only card CSS + button CSS + radius + font. → `references/design-system.md`
- **Page composition** — section archetypes (hero/features/testimonial/pricing/faq/CTA), the canonical section-header pattern, **bento live-widget menu**, navbar archetypes, responsive-padding scale, how to assemble a page. → `references/composition.md`

## Reference a worked example — `/silk-design-no-scrolljack <name>`
The catalog carries **23 worked reference compositions** built from this exact toolbox. When the
user names one (`/silk-design-no-scrolljack Reference15`, `/silk-design-no-scrolljack Reference1`, or "build it
like the coffee one"), pull it from `references/templates.md` — palette, font, section rhythm, and the signature
effects it used. A number resolves directly; a described mood resolves against each row's vibe line.
**A referenced composition is a mood-board + wireframe, not a source file:** take its **skin**
(palette, font, radius, card/button style, effects) and its **skeleton** (section rhythm,
loosely) — **never its flesh** (copy, images, brand, or a 1:1 layout). The new site has its own
subject; build for that. The non-negotiable foundation above still applies underneath.

## Using the `assets/` files
They are **drop-in reference implementations** — copy and adapt. Simple
primitives (`ScrollReveal`, `TextAnimation`, `ButtonMagnetic`, `AutoFillText`, `BorderGlow`,
`HoverPattern`, `PageTransitionSwirl`, `useButtonClick`, `utils`, the `.css`) drop in cleanly.
The section showpieces (`AboutCursorTrail`, `HeroVideo`, `AboutTextFill`,
`FooterBrandReveal`, `NavbarFullscreen`) are self-contained and take an `actions` slot — pass your
own buttons in as children rather than wiring a component import. Backgrounds need the `--color-*`
tokens from `foundation.css`. (`FooterBrandReveal` needs `AutoFillText` — both are here.)

## How this fits with your other skills
This is a **capability layer, not a builder.** For *aesthetic direction* (palette, layout,
personality) reach for **`taste-skill`** (landing/marketing/portfolio) or **`ui-ux-pro-max`**
(apps/dashboards/data UI). `silk` is what you apply on top — or to any hand-built page — to
make it *move* and *feel* right. The three compose: builder picks the look, silk makes it silk.
