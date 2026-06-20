# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page for rawthoughtstudio.com — Raw Thoughts®, a global fashion partner that brings Asian designer brands to New York. Plain HTML / CSS / JS — no build step, no framework, no SSR.

The page is the "Editorial" variation imported from the Claude Design project "Raw Thoughts Global Fashion". An editorial, black-on-white layout: a hover-expanding image gallery hero, a giant `Raw Thoughts®` wordmark with a live New York clock, mission / who-we-are sections, a dark EPHEMERA flagship band, and a centered partner CTA.

## Deployment

`main` is the deployed branch. Pushing to `origin/main` publishes to GitHub Pages (the public site at rawthoughtstudio.com). There is no CI build — files are served as-is from the repo root, so any change to `index.html`, `style.css`, or `script.js` ships on push.

Implication: never push broken or in-progress work to `main`. For non-trivial changes, work on a branch and open a PR.

## Local development

Open `index.html` directly in a browser, or serve the directory:

```
python3 -m http.server 8000
```

There is no test suite, linter, or build command.

## Architecture

Three files, all at the repo root:

- `index.html` — markup only. Pulls Space Grotesk + Space Mono from Google Fonts. Sections in order: `.hero` (gallery + wordmark), `.mission`, `.who`, `.ephemera` (dark band), `.partner` CTA, `.footer`. A single `#cursor` div is the custom cursor.
- `style.css` — owns the layout and the palette. Near-black / paper-white editorial palette is defined in `:root` custom properties. Gallery tiles (`.gtile`) expand on `:hover` via `flex`/`transform` transitions; placeholder imagery is a diagonal striped gradient. `.reveal` elements fade/slide in (toggled by the `.in` class from JS).
- `script.js` — four small IIFEs: a live `America/New_York` clock written into every `[data-clock]`, an `IntersectionObserver` that adds `.in` to `[data-reveal]` on scroll, magnetic translation on `[data-magnetic]`, and a lerp'd `requestAnimationFrame` custom-cursor loop.
- `assets/ephemera-dots.png` — the EPHEMERA symbol (shown `filter: invert(1)` on the dark band).

All motion respects `prefers-reduced-motion` (reveals show immediately; cursor and hover transitions disabled).

## Conventions

- Keep it dependency-free and static. Do not introduce a bundler, framework, or server-rendered pages.
- Editorial, near-monochrome palette: `--ink` near-black text on `--paper` white, with `--cream` on dark bands. New colors should stay within this muted grey/stone range — no saturated hues.
- Type is Space Grotesk (display/body) + Space Mono (labels, clock, eyebrows). Eyebrows are uppercase mono with wide letter-spacing.
- Motion stays subtle and quick — short eased transitions on hover/reveal, no looping background animation.
