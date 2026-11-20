/**
 * project-cards.js — turns the data in data/projects.js into cards on the page.
 * Cards with screenshots get a swipe carousel (see carousel.js).
 */

class ProjectCards {
  /**
   * Draws every project from data/projects.js into the container
   */
  static render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    PROJECTS.forEach((project) => {
      container.appendChild(ProjectCards.createCard(project));
    });
  }

  /**
   * Builds one project card: media (screenshots) + text + link badges
   */
  static createCard(project) {
    const card = document.createElement("article");
    card.className =
      "project-card" + (project.testingStatus ? " project-card--testing" : "");

    // --- Media section ---
    const images = ProjectCards.imagePaths(project);
    const primaryLink =
      project.links.playStore ||
      project.links.github ||
      project.fallbackLink ||
      "#";
    let mediaHTML = "";

    if (images.length > 0) {
      // Local screenshots carousel — one image at a time, like an Instagram post.
      // Optional per-project look: landscapeBg (colour behind wide images), mediaHeight (px)
      const mediaVars = [
        project.landscapeBg ? `--landscape-bg: ${project.landscapeBg}` : "",
        project.mediaHeight ? `--media-height: ${project.mediaHeight}px` : "",
      ]
        .filter(Boolean)
        .join("; ");
      const imgs = images
        .map(
          (src, index) =>
            `<img src="${src}" alt="${project.title} screenshot ${index + 1} of ${images.length}" loading="lazy">`,
        )
        .join("");
      const hasMultipleScreenshots = images.length > 1;
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
                    ${images.map((_, index) => `<button class="carousel-dot${index === 0 ? " is-active" : ""}" type="button" data-carousel-index="${index}" aria-label="Show screenshot ${index + 1}"${index === 0 ? ' aria-current="true"' : ""}></button>`).join("")}
                </div>`
        : "";
      mediaHTML = `
                <div class="project-card__media project-card__media--carousel" data-carousel${mediaVars ? ` style="${mediaVars}"` : ""}>
                    <div class="screenshots-viewport"><div class="screenshots-track">${imgs}</div></div>
                    ${carouselControls}
                    ${carouselIndicators}
                    ${project.showPlayBadge ? ProjectCards.playBadgeHTML() : ""}
                    ${project.testingStatus ? `<span class="status-pill">${project.testingStatus}</span>` : ""}
                </div>`;
    } else if (project.imageUrl) {
      // Remote single image
      mediaHTML = `
                <a class="project-card__media" href="${primaryLink}" target="_blank" rel="noopener">
                    <img src="${project.imageUrl}" alt="${project.title}" loading="lazy"
                         style="object-fit: contain !important; object-position: center !important;">
                    ${project.showPlayBadge ? ProjectCards.playBadgeHTML() : ""}
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

    // --- Status badge (hide "Available on GitHub") ---
    const statusHTML = project.status && project.status !== "Available on GitHub"
      ? `<span class="project-card__status">${project.status}</span>`
      : "";

    // --- Badge links (Play Store only at bottom) ---
    let badgesHTML = "";
    if (project.links.playStore) {
      badgesHTML += `<a href="${project.links.playStore}" target="_blank" rel="noopener" class="card-badge card-badge--play">${PLAY_SVG}<span>Google Play</span></a>`;
    }

    // --- Inline badge links at end of title row (GitHub & YouTube with icon + name) ---
    let titleBadgesHTML = "";
    if (project.links.github) {
      titleBadgesHTML += `<a href="${project.links.github}" target="_blank" rel="noopener" class="card-badge card-badge--github card-badge--inline">${GITHUB_SVG}<span>GitHub</span></a>`;
    }
    if (project.links.youtube) {
      titleBadgesHTML += `<a href="${project.links.youtube}" target="_blank" rel="noopener" class="card-badge card-badge--youtube card-badge--inline">${YOUTUBE_SVG}<span>Demo Video</span></a>`;
    }

    card.innerHTML = `
            ${mediaHTML}
            <div class="project-card__body">
                <div class="project-card__top">
                    <div class="project-card__title-wrap">
                        <h3 class="project-card__title">${project.title}</h3>
                        ${statusHTML}
                    </div>
                    ${titleBadgesHTML ? `<div class="project-card__title-badges">${titleBadgesHTML}</div>` : ""}
                </div>
                <p class="project-card__desc">${project.description}</p>
                <ul class="project-card__features">${featuresHTML}</ul>
                ${badgesHTML ? `<div class="card-badges card-badges--project-links">${badgesHTML}</div>` : ""}
            </div>
        `;

    Carousel.init(card);

    return card;
  }

  /**
   * Full image paths of a project, taken from data/project-images.js.
   * Files are looked up in <PROJECT_IMAGES_BASE>/<project id>/ — unless an entry
   * is already a full URL or an absolute path (starts with "http" or "/").
   */
  static imagePaths(project) {
    const files =
      (typeof PROJECT_IMAGES !== "undefined" && PROJECT_IMAGES[project.id]) || [];
    return files.map((file) =>
      /^(https?:)?\//.test(file)
        ? file
        : `${PROJECT_IMAGES_BASE}/${project.id}/${file}`,
    );
  }

  static playBadgeHTML() {
    return `<span class="store-badge" aria-label="Google Play">${PLAY_SVG}<span>Google Play</span></span>`;
  }
}
