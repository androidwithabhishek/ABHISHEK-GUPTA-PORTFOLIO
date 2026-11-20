

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
      "Search and browse images",
      "Load image search results",
      "View images in detail with pinch-to-zoom functionality",
      "Download images in different available resolutions and qualities",
      "Like and save your favorite images for quick access later",
    ],
    links: {
      playStore: null,
      github: "https://github.com/androidwithabhishek/Image-Search-App",
      youtube: null,
    },
    fallbackLink: "https://github.com/androidwithabhishek/Image-Search-App",
    showPlayBadge: false,
  },
  {
    id: "image-search-app",
    title: "Image Search App",
    status: "Available on GitHub",
    description:
      "An Android image search app. The full source code is available on GitHub.",
    features: [
      "Search and browse images",
      "Load image search results",
      "View images in detail with pinch-to-zoom functionality",
      "Download images in different available resolutions and qualities",
      "Like and save your favorite images for quick access later",
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
