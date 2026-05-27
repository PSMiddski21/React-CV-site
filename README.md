# Paul Middleton — Online CV

A React + Vite single-page CV / profile site. Dark, minimal, professional.

## Quick start

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build → ./dist
npm run preview  # preview the production build
```

## Editing your content

All copy lives in **`src/data/cv.js`** — profile, summary, focus areas, core
skills, experience timeline, technical skill groups, education, and
certifications. Edit that one file and the whole site updates.

Component files in `src/components/` only handle layout — you generally don't
need to touch them to update content.

## Project structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx           # entry point
    ├── App.jsx            # page layout + scroll-reveal observer
    ├── index.css          # design tokens & all styles
    ├── data/
    │   └── cv.js          # ← edit this to update CV content
    └── components/
        ├── Nav.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Experience.jsx
        ├── Skills.jsx
        └── Contact.jsx
```

## Deploying

For a complete walkthrough of pushing this to GitHub and hosting it on
**AWS Amplify** (auto-deploys on every push), see [`DEPLOY.md`](./DEPLOY.md).

The `vite.config.js` uses `base: './'` so the production build works from any
sub-path. Other one-click options if you change your mind on host:

- **Netlify** — drag-and-drop the `dist/` folder, or connect the repo and
  set the publish directory to `dist`.
- **Vercel** — import the repo, framework preset *Vite*.
- **GitHub Pages** — push `dist/` to a `gh-pages` branch (e.g. via the
  `gh-pages` npm package).
- **Cloudflare Pages** — build command `npm run build`, output `dist`.

## Customising the look

Design tokens are at the top of `src/index.css`:

- `--bg`, `--bg-elev`, `--bg-card` — background layers
- `--accent` — primary accent (currently teal `#5eead4`)
- `--font-sans`, `--font-mono` — typography

Change the accent in one place and the whole palette follows.
