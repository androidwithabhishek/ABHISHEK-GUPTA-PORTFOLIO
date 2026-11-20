/**
 * theme-toggle.js — switches between dark (default) and light mode,
 * saves the preference in localStorage, with a smooth icon spin.
 */
const ThemeToggle = {
  init() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    // Load saved preference (default: dark)
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.documentElement.classList.add('light');
    }

    btn.addEventListener('click', () => {
      // Spin the icon
      const icon = btn.querySelector('svg[style*="display: block"], svg:not([style*="display: none"])');
      const activeSvg = document.documentElement.classList.contains('light')
        ? btn.querySelector('.icon-sun')
        : btn.querySelector('.icon-moon');
      if (activeSvg) {
        activeSvg.style.transform = 'rotate(360deg)';
        setTimeout(() => { activeSvg.style.transform = ''; }, 350);
      }

      document.documentElement.classList.toggle('light');
      const isLight = document.documentElement.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }
};
