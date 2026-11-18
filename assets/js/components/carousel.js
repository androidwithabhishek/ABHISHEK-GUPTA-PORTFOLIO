/**
 * carousel.js — swipeable screenshot carousel used inside project cards.
 */

class Carousel {
  /** Adds arrows, dots and touch/mouse swipe to a project card's screenshots. */
  static init(card) {
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
}
