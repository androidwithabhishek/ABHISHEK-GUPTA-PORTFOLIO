/**
 * main.js — starts the site: draws the sections, then turns on the UI.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Content (from the files in /data)
  ProjectCards.render('projectsContainer');
  Sections.renderEducation('educationContainer');
  Sections.renderContact('contactContainer');
  Sections.renderResume('resumePreview');

  // Behaviour
  Nav.init();
  ThemeToggle.init();
  TypingEffect.init();
});
