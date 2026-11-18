/**
 * sections.js — draws the Education, Contact and Resume sections from data/profile.js.
 */

const Sections = {

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
            container.innerHTML = `<p style="color: var(--muted); font-size: 0.95rem;">Resume coming soon.</p>`;
        }
    }
};
