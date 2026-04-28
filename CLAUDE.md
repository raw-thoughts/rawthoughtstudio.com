# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static placeholder landing page for rawthoughtstudio.com. Plain HTML / CSS / JS — no build step, no framework, no SSR.

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

- `index.html` — markup only. Pulls Fraunces + Inter from Google Fonts. The visual layers are: `.orbs` (animated background), `.grain` (SVG noise overlay), and `<main>` (text).
- `style.css` — owns nearly all of the motion. Earth-tone palette is defined in `:root` custom properties. Four `.orb` elements drift and hue-cycle on independent long keyframe loops (38–60s) with `mix-blend-mode: screen` and heavy blur. Headline has a `breathe` animation that animates Fraunces' variable `SOFT` axis.
- `script.js` — only one effect: pointer-driven parallax on the `.orbs` container via a lerp'd `requestAnimationFrame` loop, written to CSS custom properties (`--mx`, `--my`).

All animations respect `prefers-reduced-motion`.

## Conventions

- Keep it dependency-free and static. Do not introduce a bundler, framework, or server-rendered pages.
- Earth-tone, low-saturation palette. New colors should match the existing muted browns / olive / clay range and stay desaturated against the near-black background.
- Motion should remain subtle — long durations, low opacity, no sharp transitions.
