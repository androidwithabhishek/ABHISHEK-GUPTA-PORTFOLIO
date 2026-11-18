/**
 * data/projects.js — ⭐ EDIT THIS FILE to add, change or remove projects.
 *
 * Screenshots are NOT listed here → see data/project-images.js
 *
 * ---- Template: copy this block, paste it before the closing ]; ----
 *
 *   {
 *     id: "my-new-app",              // lowercase-with-dashes; also the images folder name
 *     title: "My New App",
 *     status: "Published",           // short text under the title (optional)
 *     description: "One or two sentences.",
 *     features: ["Point one", "Point two"],
 *     links: {
 *       playStore: null,             // "https://play.google.com/..." or null
 *       github: null,                // "https://github.com/..." or null
 *       youtube: null,               // demo video URL or null (badge only shows if set)
 *     },
 *     fallbackLink: "https://github.com/androidwithabhishek",  // used when there are no screenshots
 *     showPlayBadge: false,          // small "Google Play" badge on the image
 *
 *     // Optional look settings (delete if not needed):
 *     // landscapeBg: "#11151C",     // colour behind wide (landscape) screenshots
 *     // mediaHeight: 400,           // screenshot box height in px (default 580)
 *     // imageUrl: "https://...",    // single remote image, only used when the project has no screenshots
 *   },
 */

const PROJECTS = [
  {
    id: "dev-control",
    title: "Dev Control",
    status: "Published",
    description:
      "An Android developer utility for managing and controlling developer-focused device settings, built for a clean and practical workflow.",
    features: [
      "Built with Kotlin & Jetpack Compose",
      "Developer-focused controls for physical Android devices",
      "Makes on-device debugging easier and faster",
      "Published on Google Play with positive feedback for ease of use",
    ],
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.devcontrol.android&hl=en_IN",
      // GitHub link intentionally omitted.
      youtube: null, // Add the verified Dev Control demo-video URL when available.
    },
    fallbackLink:
      "https://play.google.com/store/apps/details?id=com.devcontrol.android&hl=en_IN",
    showPlayBadge: true,
  },

  {
    id: "click-buddy",
    title: "Click Buddy",
    status: "Currently in 14 days testing",
    description:
      "A hands-free Android camera companion for timed, repeat photo capture.",
    features: [
      "Set a countdown timer before taking photos.",
      "Choose the number of photos to capture.",
      "Automatically tap the camera's shutter using Accessibility Service.",
      "Capture multiple photos at regular intervals without needing another person.",
    ],
    links: {
      playStore: null,
      // GitHub link intentionally omitted.
      youtube: "https://youtube.com/shorts/SuwVHZ5W1VQ",
    },
    fallbackLink: "https://youtube.com/shorts/SuwVHZ5W1VQ",
    showPlayBadge: false,
  },

  {
    id: "fruit-game",
    title: "Fruit Game",
    status: "Currently in 14 days testing",
    description: "One or two sentences about the app.",
    features: ["Built with Kotlin & Jetpack Compose", "Another point"],
    landscapeBg: "#11151C", // colour behind landscape images (bars above/below). Default is light grey.
    mediaHeight: 400, // screenshot box height in px (default 580); wide screenshots look best shorter
    links: { playStore: null, youtube: null },
    fallbackLink: "https://github.com/androidwithabhishek",
    showPlayBadge: false,
  },

  {
    id: "image-search-app",
    title: "Image Search App",
    status: "Available on GitHub",
    description:
      "An Android image search app. The full source code is available on GitHub.",
    features: [
      "Search for images by keyword",
      "Open source — browse the full code on GitHub",
    ],
    links: {
      playStore: null,
      github: "https://github.com/androidwithabhishek/Image-Search-App",
      youtube: null,
    },
    fallbackLink: "https://github.com/androidwithabhishek/Image-Search-App",
    showPlayBadge: false,
  },
];
