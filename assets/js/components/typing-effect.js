/**
 * typing-effect.js — animated code card in the hero section.
 */

const TypingEffect = {

    /** Types out the Kotlin code card in the hero section */
    init() {
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
