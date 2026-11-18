/**
 * nav.js — mobile navigation menu.
 */

const Nav = {

    /** Opens/closes the menu on small screens */
    init() {
        const toggle = document.getElementById('navToggle');
        const links = document.getElementById('navLinks');
        if (!toggle || !links) return;

        toggle.addEventListener('click', () => {
            const isOpen = links.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                links.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
};
