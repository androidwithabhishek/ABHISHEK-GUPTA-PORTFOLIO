/**
 * Utils.js — Like utility / helper classes in Android
 *
 * Nav toggle, smooth scroll, typing effect, education & contact rendering
 */

const CONTACT_ICONS = {
    phone: `<svg class="contact-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.64a2 2 0 0 1-.45 2.11L8 9.75a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.86.29 1.74.5 2.64.62A2 2 0 0 1 22 16.92Z" /></svg>`,
    email: `<svg class="contact-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>`,
    linkedin: `<svg class="contact-card__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.4 3.5A2.4 2.4 0 1 1 .6 3.5a2.4 2.4 0 0 1 4.8 0ZM.9 8h4.3v13H.9V8Zm7 0H12v1.8h.1c.6-1.1 2.1-2.3 4.4-2.3 4.7 0 5.6 3.1 5.6 7.1V21h-4.3v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.2V8H7.9Z" /></svg>`,
    github: `<svg class="contact-card__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.16.69-3.83-1.34-3.83-1.34-.52-1.32-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.65 1.24 3.3.95.1-.73.4-1.24.72-1.53-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.16a10.9 10.9 0 0 1 5.74 0c2.19-1.47 3.15-1.16 3.15-1.16.62 1.58.23 2.75.11 3.04.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.11 0 1.52-.01 2.75-.01 3.12 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" /></svg>`,
    instagram: `<svg class="contact-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>`
};

const Utils = {

    /** Mobile nav toggle (like DrawerLayout) */
    initMobileNav() {
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
    },

    /** Render education cards */
    renderEducation(containerId) {
        const container = document.getElementById(containerId);
        if (!container || !PROFILE.education) return;

        container.innerHTML = PROFILE.education.map(edu => `
            <div class="edu-card">
                <h3 class="edu-card__title">${edu.title}</h3>
                <p class="edu-card__org">${edu.org}</p>
                <div class="edu-card__meta">
                    ${edu.year ? `<span>${edu.year}</span>` : ''}
                    ${edu.year && edu.extra ? '<span class="edu-card__sep">·</span>' : ''}
                    ${edu.extra ? `<span>${edu.extra}</span>` : ''}
                </div>
            </div>
        `).join('');
    },

    /** Render contact cards */
    renderContact(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const cards = [];
        const createCard = (label, value, icon, href, isExternal = false) => {
            const content = `<span class="contact-card__icon-wrap">${icon}</span><span class="contact-card__content"><span class="contact-card__label">${label}</span><span class="contact-card__value">${value}</span></span>`;
            return href
                ? `<a class="contact-card" href="${href}"${isExternal ? ' target="_blank" rel="noopener"' : ''}>${content}</a>`
                : `<div class="contact-card contact-card--placeholder" aria-label="${label} link coming soon">${content}</div>`;
        };

        if (PROFILE.phone) {
            cards.push(createCard('Call', PROFILE.phone, CONTACT_ICONS.phone, `tel:${PROFILE.phone.replace(/\s/g, '')}`));
        }
        if (PROFILE.email) {
            cards.push(createCard('Email', PROFILE.email, CONTACT_ICONS.email, `mailto:${PROFILE.email}`));
        }
        if (PROFILE.linkedin) {
            cards.push(createCard('LinkedIn', PROFILE.linkedinHandle, CONTACT_ICONS.linkedin, PROFILE.linkedin, true));
        }
        if (PROFILE.github) {
            cards.push(createCard('GitHub', PROFILE.githubHandle, CONTACT_ICONS.github, PROFILE.github, true));
        }
        if (PROFILE.instagram) {
            cards.push(createCard('Instagram', PROFILE.instagramHandle, CONTACT_ICONS.instagram, PROFILE.instagram, true));
        } else {
            cards.push(createCard('Instagram', PROFILE.instagramHandle || 'Link coming soon', CONTACT_ICONS.instagram));
        }
        container.innerHTML = cards.join('');
    },

    /** Render resume section */
    renderResume(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (PROFILE.resumeImage) {
            container.innerHTML = `<div class="resume-preview"><img src="${PROFILE.resumeImage}" alt="Resume"></div>`;
        } else if (PROFILE.resumeLink) {
            container.innerHTML = `<a href="${PROFILE.resumeLink}" target="_blank" class="btn btn--primary">📄 View Resume</a>`;
        } else {
            container.innerHTML = `<p style="color: var(--muted); font-size: 0.95rem;">Resume coming soon — add resumeImage or resumeLink in <code style="font-family: var(--font-mono); background: var(--accent-soft); padding: 2px 6px; border-radius: 4px;">src/models/ProjectData.js</code></p>`;
        }
    },

    /** Hero code typing effect (like the Kotlin code card) */
    initTypingEffect() {
        const codeEl = document.getElementById('typedCode');
        const cursorEl = document.getElementById('codeCursor');
        if (!codeEl) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const lines = [
            [['class ', 'tok-kw'], ['Developer', 'tok-cls'], [' {', '']],
            [['    val ', 'tok-kw'], ['name', ''], [' = ', ''], ['"Abhishek Gupta"', 'tok-str']],
            [['    val ', 'tok-kw'], ['role', ''], [' = ', ''], ['"Android Developer"', 'tok-str']],
            [['    val ', 'tok-kw'], ['stack', ''], [' = ', ''], ['listOf', 'tok-fn'], ['("Kotlin", "Compose", "MVVM")', 'tok-str']],
            [['', '']],
            [['    fun ', 'tok-kw'], ['buildGreatApps', 'tok-fn'], ['()', ''], [' = ', ''], ['true', 'tok-def']],
            [['}', '']]
        ];

        function escapeHtml(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        function renderStatic() {
            let html = '';
            lines.forEach(segments => {
                segments.forEach(seg => {
                    const text = escapeHtml(seg[0]);
                    html += seg[1] ? `<span class="${seg[1]}">${text}</span>` : text;
                });
                html += '\n';
            });
            codeEl.innerHTML = html;
        }

        if (prefersReducedMotion) {
            renderStatic();
            if (cursorEl) cursorEl.style.display = 'none';
            return;
        }

        // Build flat character array for typing
        const flatChars = [];
        lines.forEach((segments, li) => {
            segments.forEach(seg => {
                seg[0].split('').forEach(ch => {
                    flatChars.push({ ch, cls: seg[1] });
                });
            });
            if (li < lines.length - 1) flatChars.push({ ch: '\n', cls: '' });
        });

        let i = 0;
        const speed = 16;

        function typeStep() {
            if (i > flatChars.length) return;
            let html = '';
            let openSpan = false;
            let currentCls = null;

            for (let idx = 0; idx < i; idx++) {
                const item = flatChars[idx];
                if (item.cls !== currentCls) {
                    if (openSpan) html += '</span>';
                    if (item.cls) { html += `<span class="${item.cls}">`; openSpan = true; }
                    else { openSpan = false; }
                    currentCls = item.cls;
                }
                html += escapeHtml(item.ch);
            }
            if (openSpan) html += '</span>';

            codeEl.innerHTML = html;
            i++;

            if (i <= flatChars.length) setTimeout(typeStep, speed);
        }

        typeStep();
    }
};
