# Abhishek Gupta — Portfolio

## 📁 Structure (Android-Inspired, Pure HTML/CSS/JS)

```
Abhishek-Gupta-Portfolio/
│
├── index.html                              ← Entry point (AndroidManifest)
│
├── res/                                    ← Resources
│   ├── drawable/                           ← All images
│   │   ├── profile/                        ← Your profile photo
│   │   ├── icons/                          ← App icons
│   │   ├── resume/                         ← Resume screenshot / PDF
│   │   ├── landscape/                      ← Landscape / banner images
│   │   └── screenshots/                    ← Per-app screenshot folders
│   │       ├── dev_control/
│   │       ├── image_search/
│   │       ├── mediapipe/
│   │       ├── ar_app/
│   │       ├── ai_dscanner/
│   │       └── game_search/
│   ├── layout/                             ← HTML templates (if needed later)
│   └── values/
│       ├── colors.css                      ← Like colors.xml
│       └── styles.css                      ← Like styles.xml + themes.xml
│
└── src/                                    ← Source code
    ├── models/
    │   └── ProjectData.js                  ← ⭐ YOUR DATA — edit this file
    ├── adapters/
    │   └── ProjectAdapter.js               ← Renders cards (RecyclerView Adapter)
    └── utils/
        └── Utils.js                        ← Nav, typing effect, section renderers
```

## 🚀 How to Use

1. Open `index.html` in your browser — works instantly
2. To update projects → edit `src/models/ProjectData.js`
3. To add local screenshots → drop images in `res/drawable/screenshots/app_name/`
   and change `screenshotType: "local"` in ProjectData.js
4. To add resume → drop screenshot in `res/drawable/resume/` and set `resumeImage` in ProjectData.js
5. To add landscape images → put them in `res/drawable/landscape/` and add paths to `landscape[]`

## 🖼️ Image Guide

| Type        | Size          | Folder                              |
|-------------|---------------|-------------------------------------|
| Portrait SS | 1080 × 1920   | `res/drawable/screenshots/app_name/`|
| Landscape   | 1920 × 1080   | `res/drawable/landscape/`           |
| App Icon    | 192 × 192     | `res/drawable/icons/`               |
| Profile     | 400 × 400+    | `res/drawable/profile/`             |
| Resume      | Any           | `res/drawable/resume/`              |
# ABHISHEK-GUPTA-PORTFOLIO
