# rawthoughtstudio.com

Static placeholder landing page for Raw Thoughts.

## Stack

Plain HTML, CSS, and JavaScript. No build step, no framework, no server-side rendering.

- `index.html` — markup
- `style.css` — layout, type, animated orbs, grain
- `script.js` — pointer parallax for the orb layer

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deployment

**Pushing to `main` deploys the site.** The repository is published via GitHub Pages, which serves files directly from the root of the `main` branch. Any commit pushed to `origin/main` goes live on the public site within a minute or two — there is no CI build or staging step.

Because of that:

- Treat `main` as production. Don't push work-in-progress.
- For non-trivial changes, work on a branch and open a pull request.
- The site is fully static; there is no server runtime to roll back to. Reverts are done via git.
