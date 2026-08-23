# silk-design-no-scrolljack

A Claude Code skill for building web interfaces that move well — without touching the scroll.

Most generated pages come out static. Sections that just appear, hover states that do nothing.
This is a catalog of motion and design-token techniques, and it tells the agent to reach for them
by default rather than only when asked.

This is the no-scrolljack fork of [silk-design](https://github.com/bendrape1-byte/silk-design).
Same catalog, one rule added on top: **the browser's scroll is off-limits.** No Lenis or any other
smooth-scroll library, no CSS `scroll-behavior: smooth`, no `overscroll-behavior: none`, and no
pinned or scrub-driven sections — nothing that makes the page hold still while the scrollbar keeps
moving, and no section taller than its own content. One wheel notch moves the page exactly as far
as the OS says it should.

What survives is everything that runs alongside scroll instead of in place of it: one-shot entrance
reveals, parallax, hero exit-drift, tilt-flatten, reading word-fill, and the whole cursor, hover,
marquee, and page-transition catalog. It turns out that's most of what made the original feel
expensive.

## Results

Eight sites built with the upstream skill (before the scroll rules were tightened), they are all
in German tho:

- [The Hair House](https://the-hair-house.bendrape1.workers.dev/), hair studio for women
- [Kronberger](https://kronberger-website.bendrape1.workers.dev/), bakery
- [The Coffee Club 29](https://coffee-club29.bendrape1.workers.dev/), café
- [Mina](https://mina-cafe.com/), café
- [Café OPITZ im Goethehaus](https://cafe-opitz.bendrape1.workers.dev/), café
- [Oeffner Media](https://www.oeffnermedia.com/), Social Media Agency
- [Orthotrain](https://orthotrain-frankfurt.bendrape1.workers.dev/), Physio-Therapy
- [F-Studios](https://f-studios-six.vercel.app/), Nail Studio

## Install

```
git clone https://github.com/billmei/silk-design-no-scrolljack ~/.claude/skills/silk-design-no-scrolljack
```

Then ask your coding agent to build a website using the /silk-design-no-scrolljack skill and give it additional information such as:
- Who you are (who this website is for)
- What the use case of the website is
- Add any additional information, photos or videos for it to use

## What's in it

A foundation to apply on every build: native scroll left alone, a thinned scrollbar, a
nine-token color system exposed to Tailwind, and fluid `clamp()` type. Four things, about
fifteen lines, and they do most of the work.

Then an effects catalog with the actual numbers in it. Spring constants, easing curves,
stagger intervals, scroll offsets. Word-stagger headings, parallax, hero exit-drift,
full-bleed video heroes, staged card stacks, cursor image-trails, magnetic buttons, curtain
menus, marquees. The five larger components in `assets/` are written out in full; the rest are
recipes precise enough to type from, which keeps the files small enough to load only
when they are needed.

Thirteen animated backgrounds. Three ship as components.

A design system built on one `--radius` knob that drives the whole scale, with font
pairings and ten style skins you switch by swapping three CSS blocks.

Twenty-three reference compositions, each with a palette, a type choice, a section rhythm
and an effect set. They are starting points, not templates to fill in.

## Stack

React + Vite, Tailwind v4, `motion` (Framer Motion), and GSAP with Draggable and DrawSVG (both
free plugins). ScrollTrigger appears only as an on-screen gate — never for `pin` or `scrub`. No
scroll library. Each technique names the principle behind it, so the snippets are portable even
when the stack is not.

## Notes

Written from scratch. The components in `assets/` are original implementations of publicly
documented techniques (GSAP, CSS clip-path, SVG filters) and contain no
third-party code, assets, or branding. The palettes and type values under `templates/` are
plain CSS custom properties.

MIT licensed. See [LICENSE](LICENSE).
