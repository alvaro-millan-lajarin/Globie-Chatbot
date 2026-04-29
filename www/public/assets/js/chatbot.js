(function () {
    const baseUrl   = document.querySelector('meta[name="base-url"]').content.replace(/\/$/, '');
    const csrfName  = document.querySelector('meta[name="csrf-token-name"]').content;
    let   csrfValue = document.querySelector('meta[name="csrf-token-value"]').content;

    const messagesEl = document.getElementById('chat-messages');
    const form       = document.getElementById('chat-form');
    const input      = document.getElementById('chat-input');
    const sendBtn    = document.getElementById('btn-send');
    const typing     = document.getElementById('typing-indicator');
    const clearBtn   = document.getElementById('btn-clear');

    // ── Auto-resize textarea ───────────────────────────
    input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 140) + 'px';
    });

    // ── Enter to send ──────────────────────────────────
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });

    // ── Suggestion chip clicks ─────────────────────────
    messagesEl.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (chip) {
            // Strip emoji prefix if present (first char + space)
            const raw = chip.textContent.trim();
            const clean = raw.replace(/^[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}✈️🗺️📍📊💰💡🔍]+\s*/u, '');
            input.value = clean || raw;
            input.dispatchEvent(new Event('input'));
            form.dispatchEvent(new Event('submit'));
        }
    });

    // ── Clear chat ─────────────────────────────────────
    clearBtn.addEventListener('click', () => {
        const keep = messagesEl.querySelector('.date-divider');
        [...messagesEl.children].forEach(el => {
            if (el !== keep && !el.classList.contains('date-divider')) {
                el.remove();
            }
        });
        // Re-add welcome message
        const welcome = buildBotMessage(
            '¡Hola! I\'m <strong>Globie</strong>, your personal world knowledge guide. 🗺️ Ask me about <strong>countries</strong>, <strong>capitals</strong>, <strong>populations</strong>, <strong>currencies</strong> or <strong>cities</strong>!'
        );
        messagesEl.appendChild(welcome);
        scrollToBottom();
    });

    // ── Form submit ────────────────────────────────────
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        messagesEl.appendChild(buildUserMessage(text));
        input.value = '';
        input.style.height = 'auto';
        setLoading(true);

        try {
            const res = await fetch(`${baseUrl}/chatbot/send`, {
                method: 'POST',
                headers: {
                    'Content-Type':    'application/x-www-form-urlencoded',
                    'X-Requested-With':'XMLHttpRequest',
                    [csrfName]:        csrfValue,
                },
                body: new URLSearchParams({ message: text }),
            });

            refreshCsrf();

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                messagesEl.appendChild(buildBotMessage(err.error || 'Server error. Please try again.', true));
                return;
            }

            const data = await res.json();
            messagesEl.appendChild(buildBotMessage(data.reply ?? 'No response received.'));
        } catch {
            messagesEl.appendChild(buildBotMessage('Connection error. Is the server running?', true));
        } finally {
            setLoading(false);
        }
    });

    // ── Builders ───────────────────────────────────────

    function buildBotMessage(text, isError = false) {
        const row = document.createElement('div');
        row.className = `message bot-message${isError ? ' error-bubble' : ''}`;
        row.setAttribute('data-animate', '');

        row.innerHTML = `
            <div class="msg-avatar bot-av">🌍</div>
            <div class="msg-body">
                <div class="msg-sender">Globie</div>
                <div class="message-bubble">
                    <p>${formatText(text)}</p>
                </div>
                <span class="msg-time">${timeNow()}</span>
            </div>`;
        scrollToBottom();
        return row;
    }

    function buildUserMessage(text) {
        const row = document.createElement('div');
        row.className = 'message user-message';
        row.setAttribute('data-animate', '');

        row.innerHTML = `
            <div class="msg-avatar user-av">👤</div>
            <div class="msg-body">
                <div class="msg-sender">You</div>
                <div class="message-bubble">
                    <p>${esc(text).replace(/\n/g, '<br>')}</p>
                </div>
                <span class="msg-time">${timeNow()}</span>
            </div>`;
        return row;
    }

    // ── Helpers ────────────────────────────────────────

    function setLoading(on) {
        typing.hidden    = !on;
        sendBtn.disabled = on;
        if (on) scrollToBottom();
    }

    function scrollToBottom() {
        requestAnimationFrame(() => {
            messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
        });
    }

    function refreshCsrf() {
        const m = document.cookie.match(/(^|;\s*)csrf_cookie_name=([^;]+)/);
        if (m) csrfValue = decodeURIComponent(m[2]);
    }

    function timeNow() {
        return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    function esc(str) {
        return String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // Preserve line breaks and bold (**text**) from Python
    function formatText(str) {
        return esc(str)
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    }
})();
