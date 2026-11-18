# Abhishek Gupta — Portfolio

Personal portfolio website built with plain HTML, CSS and JavaScript — no build step, no framework.
Hosted on GitHub Pages. Open `index.html` in a browser to run it locally.

---

## Project structure

```
Abhishek-Gupta-Portfolio/
│
├── index.html                     ← The page (sections + script/style links)
│
├── data/                          ← ⭐ The files you edit to update the site
│   ├── projects.js                ← Project details (title, text, links)
│   ├── project-images.js          ← Screenshots of each project (images only)
│   └── profile.js                 ← Name, bio, resume, education, contact
│
├── assets/
│   ├── css/
│   │   ├── variables.css          ← Colour tokens (change the theme here)
│   │   └── style.css              ← All layout and component styles
│   ├── js/
│   │   ├── main.js                ← Starts the site
│   │   ├── icons.js               ← Inline SVG icons
│   │   └── components/
│   │       ├── project-cards.js   ← Builds the project cards
│   │       ├── carousel.js        ← Swipeable screenshot carousel
│   │       ├── sections.js        ← Education, contact and resume sections
│   │       ├── nav.js             ← Mobile menu
│   │       └── typing-effect.js   ← Typing animation in the hero
│   └── images/
│       └── projects/
│           ├── dev-control/       ← one folder per project (folder name = project id)
│           ├── click-buddy/
│           ├── fruit-game/
│           └── image-search-app/
│
└── README.md
```

**Rule of thumb:** to change content, edit a file in `data/`. You should never need to touch `index.html` or anything in `assets/js/` for that.

---

## How to update

### Add a new project (3 steps)

1. **`data/projects.js`** — copy the template from the top of the file, paste it before the closing `];`, and fill it in.
   The `id` must be lowercase with dashes, e.g. `"my-new-app"`.
2. **Images folder** — create `assets/images/projects/my-new-app/` and copy the screenshots into it
   (folder name = the project `id`).
3. **`data/project-images.js`** — add one line:
   ```js
   "my-new-app": ["1.jpeg", "2.jpeg", "3.jpeg"],
   ```

Commit and push. GitHub Pages updates in 1–2 minutes.

A project without screenshots is fine: skip steps 2–3 and the card shows a link box instead
(set `fallbackLink` in `data/projects.js`).

### Edit an existing project

Change the text or links in its block in `data/projects.js`.

| Field | What it does |
|---|---|
| `status` | Small text under the title (e.g. `"Published"`) |
| `links.playStore` / `links.github` | Show a Google Play / GitHub badge when set |
| `links.youtube` | Shows the "Demo Video" badge — only when a link is set |
| `showPlayBadge` | Small "Google Play" badge on the image |
| `landscapeBg` | Colour behind wide (landscape) screenshots, e.g. `"#11151C"` |
| `mediaHeight` | Height of the screenshot box in px (default `580`) |

### Add, remove or reorder screenshots

Edit that project's list in `data/project-images.js` (the order there is the carousel order),
and add or delete the file in `assets/images/projects/<project id>/`.

### Update profile, education, contact or resume

Edit `data/profile.js`. For the resume, either put an image in `assets/images/resume/` and set `resumeImage`,
or set `resumeLink` to a URL.

### Change colours or fonts

Colours: `assets/css/variables.css`. Fonts are imported at the top of `assets/css/style.css`.

---

## Image guidelines

| Type | Size | Notes |
|---|---|---|
| Portrait screenshot | about 575 × 1280 | Keep each file under ~100 KB, `.jpeg` |
| Landscape / banner | about 1280 × 575 | Set `landscapeBg` and a shorter `mediaHeight` for the project |

Large images slow the page down — resize or compress before adding them.

---

## Common mistakes

- **Image not showing →** file names are **case-sensitive** on GitHub Pages (`ias1.jpeg` ≠ `IAS1.JPEG`),
  and the folder name must equal the project `id`.
- **Page looks unchanged after a push →** wait a minute, then hard-refresh (or open a private tab).
- **Nothing renders at all →** a typo in a `data/` file (missing comma, quote or bracket). Open the browser console (F12) to see the error.

---

## Changelog

- **2026-11 — Structure cleanup:** website-style folders (`data/`, `assets/css`, `assets/js`, `assets/images`);
  projects and their screenshots are now in separate data files; images live in one folder per project;
  JavaScript split into small components; README rewritten.
- **2026-11 — Content & fixes:** added Fruit Game and Image Search App projects; swipe support for screenshots on phones;
  larger screenshots; "Demo Video" badge only appears on projects that have a video; per-project background and height options.
