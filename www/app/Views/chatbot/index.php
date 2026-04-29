<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="base-url"         content="<?= base_url() ?>">
    <meta name="csrf-token-name"  content="<?= csrf_token() ?>">
    <meta name="csrf-token-value" content="<?= csrf_hash() ?>">
    <title>Globie — World Knowledge Assistant</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= base_url('css/chatbot.css') ?>">
</head>
<body>

<!-- Background layers -->
<div class="bg-grid" aria-hidden="true"></div>
<div class="bg-glow bg-glow-sky"  aria-hidden="true"></div>
<div class="bg-glow bg-glow-land" aria-hidden="true"></div>

<!-- Floating decorative elements -->
<div class="floating-deco" aria-hidden="true">
    <span class="f-deco f-deco-1">✈️</span>
    <span class="f-deco f-deco-2">📍</span>
    <span class="f-deco f-deco-3">🧭</span>
    <span class="f-deco f-deco-4">🗺️</span>
    <span class="f-deco f-deco-5">📍</span>
</div>

<div class="chat-wrapper">

    <!-- ── HEADER ── -->
    <header class="chat-header">
        <div class="header-main">

            <div class="header-globe">
                <div class="globe-ring"></div>
                <span class="globe-emoji">🌍</span>
                <span class="online-dot"></span>
            </div>

            <div class="header-info">
                <h1 class="header-title">Globie</h1>
                <p class="header-sub">
                    <span class="sub-badge">● Online</span>
                    World Knowledge Assistant
                </p>
            </div>

            <button class="btn-icon btn-clear" id="btn-clear" title="Clear chat">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                </svg>
            </button>

        </div>

        <!-- Stats strip -->
        <div class="header-stats">
            <div class="hstat"><span>🌍</span><strong>195</strong> Countries</div>
            <div class="hstat-sep">·</div>
            <div class="hstat"><span>🗺️</span><strong>7</strong> Continents</div>
            <div class="hstat-sep">·</div>
            <div class="hstat"><span>🏙️</span><strong>4,416+</strong> Cities</div>
            <div class="hstat-sep">·</div>
            <div class="hstat"><span>🗣️</span><strong>7,000+</strong> Languages</div>
        </div>
    </header>

    <!-- ── MESSAGES ── -->
    <main class="chat-messages" id="chat-messages">

        <!-- Date divider -->
        <div class="date-divider"><span>Today</span></div>

        <!-- Welcome bubble -->
        <div class="message bot-message" data-animate>
            <div class="msg-avatar bot-av">🌍</div>
            <div class="msg-body">
                <div class="msg-sender">Globie</div>
                <div class="message-bubble">
                    <p>¡Hola! I'm <strong>Globie</strong>, your personal travel & world knowledge guide. 🗺️</p>
                    <p>I use real data to answer about <strong>safety</strong>, <strong>cost of living</strong>, <strong>healthcare</strong>, <strong>quality of life</strong> and <strong>top cities</strong> for food, beaches, culture and more. I can also <strong>compare countries or cities</strong>!</p>

                    <div class="region-row">
                        <span class="rtag">🌍 Africa</span>
                        <span class="rtag">🌎 Americas</span>
                        <span class="rtag">🌏 Asia</span>
                        <span class="rtag">🏔️ Europe</span>
                        <span class="rtag">🌐 Oceania</span>
                    </div>

                    <div class="suggestion-chips">
                        <button class="chip">🛡️ Is Japan safe?</button>
                        <button class="chip">💸 How expensive is Switzerland?</button>
                        <button class="chip">🍜 Best city for food</button>
                        <button class="chip">🗺️ Tell me about Paris</button>
                        <button class="chip">🏥 Russia vs China healthcare</button>
                        <button class="chip">🏖️ Where to go for beaches?</button>
                        <button class="chip">🌍 Best country to live in</button>
                        <button class="chip">🌿 Best city for nature</button>
                    </div>
                </div>
                <span class="msg-time" id="welcome-time"></span>
            </div>
        </div>

    </main>

    <!-- Typing indicator -->
    <div class="typing-wrap" id="typing-indicator" hidden>
        <div class="msg-avatar bot-av">🌍</div>
        <div class="typing-bubble">
            <span></span><span></span><span></span>
        </div>
    </div>

    <!-- ── INPUT ── -->
    <footer class="chat-footer">
        <form class="chat-form" id="chat-form" autocomplete="off">
            <div class="input-wrap">
                <span class="input-prefix">🔍</span>
                <textarea
                    id="chat-input"
                    class="chat-input"
                    placeholder="Search countries, cities, capitals…"
                    rows="1"
                    maxlength="500"
                ></textarea>
            </div>
            <button type="submit" class="btn-send" id="btn-send" title="Send">
                <!-- Paper plane -->
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
            </button>
        </form>
        <p class="footer-hint">
            <span>✈️ Powered by Python chatbot</span>
            <span class="sep">·</span>
            <kbd>Enter</kbd> to send, <kbd>Shift+Enter</kbd> for new line
        </p>
    </footer>

</div>

<script>
    // Stamp welcome message with current time
    const t = new Date();
    document.getElementById('welcome-time').textContent =
        t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
</script>
<script src="<?= base_url('assets/js/chatbot.js') ?>"></script>
</body>
</html>
