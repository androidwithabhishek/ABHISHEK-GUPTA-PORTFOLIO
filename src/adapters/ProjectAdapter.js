/**
 * ProjectAdapter.js — Like RecyclerView.Adapter in Android
 *
 * Takes data from ProjectData.js and renders cards into the DOM.
 * Handles: remote images, local screenshot carousels, link fallbacks.
 */

// SVG constants (like drawable resources)
const GITHUB_SVG = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.16.69-3.83-1.34-3.83-1.34-.52-1.32-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.65 1.24 3.3.95.1-.73.4-1.24.72-1.53-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.16a10.9 10.9 0 0 1 5.74 0c2.19-1.47 3.15-1.16 3.15-1.16.62 1.58.23 2.75.11 3.04.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.11 0 1.52-.01 2.75-.01 3.12 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" fill="#f0f0f0"/></svg>`;

const YOUTUBE_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C17 2.6 12 2.6 12 2.6s-5 0-8.3.3c-.5.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.2 8.1.2 10v1.8c0 1.9.3 3.8.3 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.1.2 7.1.2s5 0 8.3-.3c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.3-1.9.3-3.8V10c0-1.9-.3-3.8-.3-3.8Z" fill="#FF0000"/><path d="M9.6 15.5V8.5l6.2 3.5-6.2 3.5Z" fill="#FFFFFF"/></svg>`;

const PLAY_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.3 2.7c-.2.3-.3.7-.3 1.2v16.2c0 .5.1.9.3 1.2l9.1-9.3L3.3 2.7Z" fill="#00C4B4"/><path d="m13.3 11.4 2.4-2.5-10.5-5.9c-.4-.2-.8-.3-1.2-.3l9.3 8.7Z" fill="#E84335"/><path d="m13.3 12.6-9.3 8.7c.4 0 .8-.1 1.2-.3l10.5-5.9-2.4-2.5Z" fill="#34A853"/><path d="m16.6 14.4 3.4-1.9c.5-.3.7-.7.7-1s-.2-.7-.7-1l-3.4-1.9-2.6 2.9 2.6 2.9Z" fill="#FBBC05"/></svg>`;

class ProjectAdapter {
  /**
   * Renders all project cards (like onCreateViewHolder + onBindViewHolder)
   */
  static bindProjectCards(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    PROJECTS.forEach((project) => {
      container.appendChild(ProjectAdapter.createViewHolder(project));
    });
  }

  /**
   * Creates a single project card — ViewHolder pattern
   */
  static createViewHolder(project) {
    const card = document.createElement("article");
    card.className =
      "project-card" + (project.testingStatus ? " project-card--testing" : "");

    // --- Media section ---
    const primaryLink =
      project.links.playStore ||
      project.links.github ||
      project.fallbackLink ||
      "#";
    let mediaHTML = "";

    if (project.screenshotType === "local" && project.screenshots.length > 0) {
      // Local screenshots carousel — one image at a time, like an Instagram post.
      // Optional per-project look: landscapeBg (colour behind wide images), mediaHeight (px)
      const mediaVars = [
        project.landscapeBg ? `--landscape-bg: ${project.landscapeBg}` : "",
        project.mediaHeight ? `--media-height: ${project.mediaHeight}px` : "",
      ]
        .filter(Boolean)
        .join("; ");
      const imgs = project.screenshots
        .map(
          (src, index) =>
            `<img src="${src}" alt="${project.title} screenshot ${index + 1} of ${project.screenshots.length}" loading="lazy">`,
        )
        .join("");
      const hasMultipleScreenshots = project.screenshots.length > 1;
      const carouselControls = hasMultipleScreenshots
        ? `
                <button class="carousel-control carousel-control--previous" type="button" data-carousel-action="previous" aria-label="Previous screenshot" hidden>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg>
                </button>
                <button class="carousel-control carousel-control--next" type="button" data-carousel-action="next" aria-label="Next screenshot">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg>
                </button>`
        : "";
      const carouselIndicators = hasMultipleScreenshots
        ? `
                <div class="carousel-indicators" aria-label="Screenshot navigation">
                    ${project.screenshots.map((_, index) => `<button class="carousel-dot${index === 0 ? " is-active" : ""}" type="button" data-carousel-index="${index}" aria-label="Show screenshot ${index + 1}"${index === 0 ? ' aria-current="true"' : ""}></button>`).join("")}
                </div>`
        : "";
      mediaHTML = `
                <div class="project-card__media project-card__media--carousel" data-carousel${mediaVars ? ` style="${mediaVars}"` : ""}>
                    <div class="screenshots-viewport"><div class="screenshots-track">${imgs}</div></div>
                    ${carouselControls}
                    ${carouselIndicators}
                    ${project.showPlayBadge ? ProjectAdapter.playBadgeHTML() : ""}
                    ${project.testingStatus ? `<span class="status-pill">${project.testingStatus}</span>` : ""}
                </div>`;
    } else if (project.screenshotType === "remote" && project.imageUrl) {
      // Remote single image
      mediaHTML = `
                <a class="project-card__media" href="${primaryLink}" target="_blank" rel="noopener">
                    <img src="${project.imageUrl}" alt="${project.title}" loading="lazy"
                         style="object-fit: contain !important; object-position: center !important;">
                    ${project.showPlayBadge ? ProjectAdapter.playBadgeHTML() : ""}
                    ${project.testingStatus ? `<span class="status-pill">${project.testingStatus}</span>` : ""}
                </a>`;
    } else {
      // No image — show fallback link
      const linkHTML = project.fallbackLink
        ? `<a href="${project.fallbackLink}" target="_blank">🔗 View on web →</a>`
        : `<span>Screenshots coming soon</span>`;
      mediaHTML = `
                <a class="project-card__media" href="${primaryLink}" target="_blank" rel="noopener">
                    <div class="card-no-image">
                        <div class="placeholder-icon">📱</div>
                        <span>No screenshots yet</span>
                        ${linkHTML}
                    </div>
                </a>`;
    }

    // --- Features list ---
    const featuresHTML = project.features.map((f) => `<li>${f}</li>`).join("");

    // --- Status badge ---
    const statusHTML = project.status
      ? `<span class="project-card__status">${project.status}</span>`
      : "";

    // --- Badge links (Play Store style) ---
    let badgesHTML = "";
    if (project.links.playStore) {
      badgesHTML += `<a href="${project.links.playStore}" target="_blank" rel="noopener" class="card-badge card-badge--play">${PLAY_SVG}<span>Google Play</span></a>`;
    }
    if (project.links.github) {
      badgesHTML += `<a href="${project.links.github}" target="_blank" rel="noopener" class="card-badge card-badge--github">${GITHUB_SVG}<span>GitHub</span></a>`;
    }
    // Demo Video badge only appears on cards that actually have a video link
    if (project.links.youtube) {
      badgesHTML += `<a href="${project.links.youtube}" target="_blank" rel="noopener" class="card-badge card-badge--youtube">${YOUTUBE_SVG}<span>Demo Video</span></a>`;
    }

    card.innerHTML = `
            ${mediaHTML}
            <div class="project-card__body">
                <div class="project-card__top">
                    <div class="project-card__title-wrap">
                        <h3 class="project-card__title">${project.title}</h3>
                        ${statusHTML}
                    </div>
                </div>
                <p class="project-card__desc">${project.description}</p>
                <ul class="project-card__features">${featuresHTML}</ul>
                ${badgesHTML ? `<div class="card-badges card-badges--project-links">${badgesHTML}</div>` : ""}
            </div>
        `;

    ProjectAdapter.initCarousel(card);

    return card;
  }

  /** Adds Instagram-style navigation to local screenshot sets. */
  static initCarousel(card) {
    const carousel = card.querySelector("[data-carousel]");
    if (!carousel) return;

    const track = carousel.querySelector(".screenshots-track");
    const slides = [...track.querySelectorAll("img")];
    const previous = carousel.querySelector(
      '[data-carousel-action="previous"]',
    );
    const next = carousel.querySelector('[data-carousel-action="next"]');
    const dots = [...carousel.querySelectorAll("[data-carousel-index]")];
    const markOrientation = (image) => {
      if (image.naturalWidth > image.naturalHeight)
        image.classList.add("is-landscape");
    };
    slides.forEach((image) => {
      if (image.complete) markOrientation(image);
      else
        image.addEventListener("load", () => markOrientation(image), {
          once: true,
        });
    });
    if (
      slides.length < 2 ||
      !previous ||
      !next ||
      dots.length !== slides.length
    )
      return;

    let activeIndex = 0;
    const showSlide = (index) => {
      activeIndex = Math.max(0, Math.min(index, slides.length - 1));
      track.style.transition = "";
      track.style.transform = `translate3d(-${activeIndex * 100}%, 0, 0)`;
      previous.hidden = activeIndex === 0;
      next.hidden = activeIndex === slides.length - 1;
      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle("is-active", isActive);
        if (isActive) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };

    previous.addEventListener("click", () => showSlide(activeIndex - 1));
    next.addEventListener("click", () => showSlide(activeIndex + 1));
    dots.forEach((dot, index) =>
      dot.addEventListener("click", () => showSlide(index)),
    );

    // ---- Swipe / drag support (touch + mouse + pen) ----
    const viewport = carousel.querySelector(".screenshots-viewport");
    slides.forEach((img) => {
      img.draggable = false;
    });

    let startX = 0,
      startY = 0,
      dragX = 0,
      startTime = 0;
    let isDragging = false,
      isHorizontal = false,
      activePointer = null;

    const dragTo = (offsetPx) => {
      track.style.transition = "none";
      track.style.transform = `translate3d(calc(-${activeIndex * 100}% + ${offsetPx}px), 0, 0)`;
    };

    viewport.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      isDragging = true;
      isHorizontal = false;
      activePointer = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      dragX = 0;
      startTime = Date.now();
    });

    viewport.addEventListener("pointermove", (e) => {
      if (!isDragging || e.pointerId !== activePointer) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!isHorizontal) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return; // not moved enough yet
        if (Math.abs(dy) > Math.abs(dx)) {
          isDragging = false;
          return;
        } // vertical scroll
        isHorizontal = true;
        viewport.setPointerCapture(e.pointerId);
      }

      // Rubber-band feel at the first / last slide
      const pullingPastStart = activeIndex === 0 && dx > 0;
      const pullingPastEnd = activeIndex === slides.length - 1 && dx < 0;
      dragX = pullingPastStart || pullingPastEnd ? dx * 0.3 : dx;
      dragTo(dragX);
    });

    const endDrag = (e) => {
      if (!isDragging || e.pointerId !== activePointer) return;
      isDragging = false;
      if (!isHorizontal) return;

      const distanceNeeded = Math.min(60, viewport.clientWidth * 0.2);
      const isQuickFlick = Date.now() - startTime < 300 && Math.abs(dragX) > 30;

      if (dragX < -distanceNeeded || (isQuickFlick && dragX < 0))
        showSlide(activeIndex + 1);
      else if (dragX > distanceNeeded || (isQuickFlick && dragX > 0))
        showSlide(activeIndex - 1);
      else showSlide(activeIndex);
    };

    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
  }

  static playBadgeHTML() {
    return `<span class="store-badge" aria-label="Google Play">${PLAY_SVG}<span>Google Play</span></span>`;
  }
}
