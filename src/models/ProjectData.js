/**
 * ProjectData.js — Like Data Classes / Models in Android
 *
 * All your project & profile data in one place.
 * ⭐ EDIT THIS FILE to add/update/remove projects.
 *
 * screenshotType:
 *   "remote"  → uses imageUrl directly (from GitHub raw, etc.)
 *   "local"   → uses screenshots[] paths from res/drawable/screenshots/
 *   "link"    → no image, shows fallbackLink instead
 */

const PROJECTS = [
  {
    id: "dev_control",
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
    // Local Dev Control screenshots
    screenshotType: "local",
    imageUrl: null,
    screenshots: [
      "res/drawable/screenshots/dev_control/dv1.jpeg",
      "res/drawable/screenshots/dev_control/dv2.jpeg",
      "res/drawable/screenshots/dev_control/dv3.jpeg",
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
    id: "click_buddy",
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
    screenshotType: "local",
    imageUrl: null,
    screenshots: [
      "res/drawable/screenshots/click_buddy/cb1.jpeg",
      "res/drawable/screenshots/click_buddy/cb2.jpeg",
      "res/drawable/screenshots/click_buddy/cb3.jpeg",
      "res/drawable/screenshots/click_buddy/cb4.jpeg",
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
    id: "fruit_game",
    title: "Fruit Game",
    status: "Currently in 14 days testing",
    description: "One or two sentences about the app.",
    features: ["Built with Kotlin & Jetpack Compose", "Another point"],
    screenshotType: "remote",
    imageUrl:
      "https://raw.githubusercontent.com/androidwithabhishek/NEW-RES/main/FRUIT%20GAME/fruit_game_banner.png",
    screenshots: [],
    links: { playStore: null, youtube: null },
    fallbackLink: "https://github.com/androidwithabhishek",
    showPlayBadge: false,
  },
];

// ---- Profile Data (like strings.xml) ----
const PROFILE = {
    name: "Abhishek Gupta",
    role: "Android Developer",
    bio: "I build Android applications with a focus on smooth, user-friendly experiences and clean, maintainable code. Based in Uttar Pradesh, India.",
    location: "Uttar Pradesh, India",
    focus: "Kotlin & Jetpack Compose",

    // Resume — put screenshot in res/drawable/resume/ OR set a link
    resumeImage: null,  // "res/drawable/resume/resume_ss.png"
    resumeLink: null,   // "https://drive.google.com/your-resume-link"

    // Education
    education: [
        {
            title: "Bachelor of Computer Applications (BCA)",
            org: "IFTM University, Moradabad",
            year: "2022 – 2025",
            extra: "CGPA: 7.92"
        },
        {
            title: "Android 14 Application Development Masterclass",
            org: "Udemy",
            year: null,
            extra: "Instructor: Denish Panjuta"
        }
    ],

    // Contact
    email: "abhishekgupta766853@gmail.com",
    phone: "+91 7668532625",
    github: "https://github.com/androidwithabhishek",
    githubHandle: "github.com/androidwithabhishek",
    linkedin: "https://www.linkedin.com/in/abhishekgupta7668/",
    linkedinHandle: "in/abhishekgupta7668",
    instagram: null, // Add the verified Instagram profile URL when available.
    instagramHandle: "Link coming soon",
};
