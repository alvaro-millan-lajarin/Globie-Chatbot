/* =========================================================
   GLOBIE — chatbot.js
   Globe module + Chat module
   ========================================================= */

// ══════════════════════════════════════════════════════════
// GLOBE MODULE
// ══════════════════════════════════════════════════════════
const Globe = (() => {
    'use strict';

    /* ── Country centroids [lat, lon] ─────────────────── */
    const COORDS = {
        'albania': [41.15, 20.17], 'angola': [-11.20, 17.87],
        'argentina': [-38.42, -63.62], 'armenia': [40.07, 45.04],
        'australia': [-25.27, 133.78], 'austria': [47.52, 14.55],
        'azerbaijan': [40.14, 47.58], 'bahrain': [26.07, 50.56],
        'bangladesh': [23.68, 90.36], 'belarus': [53.71, 27.95],
        'belgium': [50.50, 4.47], 'bolivia': [-16.29, -63.59],
        'bosnia and herzegovina': [43.92, 17.68], 'brazil': [-14.24, -51.93],
        'bulgaria': [42.73, 25.49], 'cambodia': [12.57, 104.99],
        'canada': [56.13, -106.35], 'chile': [-35.68, -71.54],
        'china': [35.86, 104.20], 'colombia': [4.57, -74.30],
        'costa rica': [9.75, -83.75], 'croatia': [45.10, 15.20],
        'cuba': [21.52, -77.78], 'czech republic': [49.82, 15.47],
        'denmark': [56.26, 9.50], 'ecuador': [-1.83, -78.18],
        'egypt': [26.82, 30.80], 'estonia': [58.60, 25.01],
        'ethiopia': [9.15, 40.49], 'finland': [61.92, 25.75],
        'france': [46.23, 2.21], 'georgia': [42.32, 43.36],
        'germany': [51.17, 10.45], 'ghana': [7.95, -1.02],
        'greece': [39.07, 21.82], 'guatemala': [15.78, -90.23],
        'honduras': [15.20, -86.24], 'hong kong': [22.32, 114.17],
        'hungary': [47.16, 19.50], 'india': [20.59, 78.96],
        'indonesia': [-0.79, 113.92], 'iran': [32.43, 53.69],
        'iraq': [33.22, 43.68], 'ireland': [53.41, -8.24],
        'israel': [31.05, 34.85], 'italy': [41.87, 12.57],
        'ivory coast': [7.54, -5.55], 'jamaica': [18.11, -77.30],
        'japan': [36.20, 138.25], 'jordan': [30.59, 36.24],
        'kazakhstan': [48.02, 66.92], 'kenya': [-0.02, 37.91],
        'kuwait': [29.31, 47.48], 'kyrgyzstan': [41.20, 74.77],
        'latvia': [56.88, 24.60], 'lebanon': [33.85, 35.86],
        'lithuania': [55.17, 23.88], 'luxembourg': [49.82, 6.13],
        'malaysia': [4.21, 101.98], 'malta': [35.94, 14.38],
        'mauritius': [-20.35, 57.55], 'mexico': [23.63, -102.55],
        'moldova': [47.41, 28.37], 'mongolia': [46.86, 103.85],
        'montenegro': [42.71, 19.37], 'morocco': [31.79, -7.09],
        'namibia': [-22.96, 18.49], 'nepal': [28.39, 84.12],
        'netherlands': [52.13, 5.29], 'new zealand': [-40.90, 174.89],
        'nigeria': [9.08, 8.68], 'north macedonia': [41.61, 21.75],
        'norway': [60.47, 8.47], 'oman': [21.51, 55.92],
        'pakistan': [30.38, 69.35], 'panama': [8.54, -80.78],
        'paraguay': [-23.44, -58.44], 'peru': [-9.19, -75.02],
        'philippines': [12.88, 121.77], 'poland': [51.92, 19.15],
        'portugal': [39.40, -8.22], 'qatar': [25.35, 51.18],
        'romania': [45.94, 24.97], 'russia': [61.52, 105.32],
        'saudi arabia': [23.89, 45.08], 'senegal': [14.50, 14.45],
        'serbia': [44.02, 21.01], 'singapore': [1.35, 103.82],
        'slovakia': [48.67, 19.70], 'slovenia': [46.15, 14.99],
        'south africa': [-30.56, 22.94], 'south korea': [35.91, 127.77],
        'spain': [40.46, -3.75], 'sri lanka': [7.87, 80.77],
        'sweden': [60.13, 18.64], 'switzerland': [46.82, 8.23],
        'taiwan': [23.70, 120.96], 'tajikistan': [38.86, 71.28],
        'tanzania': [-6.37, 34.89], 'thailand': [15.87, 100.99],
        'tunisia': [33.89, 9.54], 'turkey': [38.96, 35.24],
        'ukraine': [48.38, 31.17], 'united arab emirates': [23.42, 53.85],
        'united kingdom': [55.38, -3.44], 'united states': [37.09, -95.71],
        'uruguay': [-32.52, -55.77], 'uzbekistan': [41.38, 64.59],
        'venezuela': [6.42, -66.59], 'vietnam': [14.06, 108.28],
        'zimbabwe': [-19.02, 29.15],
    };

    /* ── Country flags ────────────────────────────────── */
    const FLAGS = {
        'albania': '🇦🇱', 'angola': '🇦🇴', 'argentina': '🇦🇷',
        'armenia': '🇦🇲', 'australia': '🇦🇺', 'austria': '🇦🇹',
        'azerbaijan': '🇦🇿', 'bahrain': '🇧🇭', 'bangladesh': '🇧🇩',
        'belarus': '🇧🇾', 'belgium': '🇧🇪', 'bolivia': '🇧🇴',
        'bosnia and herzegovina': '🇧🇦', 'brazil': '🇧🇷', 'bulgaria': '🇧🇬',
        'cambodia': '🇰🇭', 'canada': '🇨🇦', 'chile': '🇨🇱',
        'china': '🇨🇳', 'colombia': '🇨🇴', 'costa rica': '🇨🇷',
        'croatia': '🇭🇷', 'cuba': '🇨🇺', 'czech republic': '🇨🇿',
        'denmark': '🇩🇰', 'ecuador': '🇪🇨', 'egypt': '🇪🇬',
        'estonia': '🇪🇪', 'ethiopia': '🇪🇹', 'finland': '🇫🇮',
        'france': '🇫🇷', 'georgia': '🇬🇪', 'germany': '🇩🇪',
        'ghana': '🇬🇭', 'greece': '🇬🇷', 'guatemala': '🇬🇹',
        'honduras': '🇭🇳', 'hong kong': '🇭🇰', 'hungary': '🇭🇺',
        'india': '🇮🇳', 'indonesia': '🇮🇩', 'iran': '🇮🇷',
        'iraq': '🇮🇶', 'ireland': '🇮🇪', 'israel': '🇮🇱',
        'italy': '🇮🇹', 'ivory coast': '🇨🇮', 'jamaica': '🇯🇲',
        'japan': '🇯🇵', 'jordan': '🇯🇴', 'kazakhstan': '🇰🇿',
        'kenya': '🇰🇪', 'kuwait': '🇰🇼', 'kyrgyzstan': '🇰🇬',
        'latvia': '🇱🇻', 'lebanon': '🇱🇧', 'lithuania': '🇱🇹',
        'luxembourg': '🇱🇺', 'malaysia': '🇲🇾', 'malta': '🇲🇹',
        'mauritius': '🇲🇺', 'mexico': '🇲🇽', 'moldova': '🇲🇩',
        'mongolia': '🇲🇳', 'montenegro': '🇲🇪', 'morocco': '🇲🇦',
        'namibia': '🇳🇦', 'nepal': '🇳🇵', 'netherlands': '🇳🇱',
        'new zealand': '🇳🇿', 'nigeria': '🇳🇬', 'north macedonia': '🇲🇰',
        'norway': '🇳🇴', 'oman': '🇴🇲', 'pakistan': '🇵🇰',
        'panama': '🇵🇦', 'paraguay': '🇵🇾', 'peru': '🇵🇪',
        'philippines': '🇵🇭', 'poland': '🇵🇱', 'portugal': '🇵🇹',
        'qatar': '🇶🇦', 'romania': '🇷🇴', 'russia': '🇷🇺',
        'saudi arabia': '🇸🇦', 'senegal': '🇸🇳', 'serbia': '🇷🇸',
        'singapore': '🇸🇬', 'slovakia': '🇸🇰', 'slovenia': '🇸🇮',
        'south africa': '🇿🇦', 'south korea': '🇰🇷', 'spain': '🇪🇸',
        'sri lanka': '🇱🇰', 'sweden': '🇸🇪', 'switzerland': '🇨🇭',
        'taiwan': '🇹🇼', 'tajikistan': '🇹🇯', 'tanzania': '🇹🇿',
        'thailand': '🇹🇭', 'tunisia': '🇹🇳', 'turkey': '🇹🇷',
        'ukraine': '🇺🇦', 'united arab emirates': '🇦🇪',
        'united kingdom': '🇬🇧', 'united states': '🇺🇸',
        'uruguay': '🇺🇾', 'uzbekistan': '🇺🇿', 'venezuela': '🇻🇪',
        'vietnam': '🇻🇳', 'zimbabwe': '🇿🇼',
    };

    /* ── Internal state ───────────────────────────────── */
    let scene, camera, renderer, globeMesh;
    let globeMarkers = {};  // { countryKey: { mesh, glow, rank } }
    let ranking = {};       // { countryKey: { score, hits } }
    let isDragging = false;
    let prevX = 0, prevY = 0;
    let lastInteraction = 0;
    let ready = false;

    /* ── lat/lon → 3D vector on sphere surface ─────────── */
    function latLonToVec3(lat, lon, r) {
        const phi   = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        return new THREE.Vector3(
            -r * Math.sin(phi) * Math.cos(theta),
             r * Math.cos(phi),
             r * Math.sin(phi) * Math.sin(theta)
        );
    }

    /* ── Initialise Three.js scene ────────────────────── */
    function init() {
        if (!window.THREE) return;

        const canvas = document.getElementById('globe-canvas');
        const wrap   = document.getElementById('globe-canvas-wrap');
        if (!canvas || !wrap) return;

        const W = wrap.clientWidth  || 370;
        const H = wrap.clientHeight || 280;

        scene  = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
        camera.position.z = 2.5;

        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        /* Lights */
        scene.add(new THREE.AmbientLight(0x2255aa, 0.9));
        const sun = new THREE.DirectionalLight(0xfff6e8, 1.5);
        sun.position.set(5, 3, 5);
        scene.add(sun);

        /* Globe sphere */
        const geo = new THREE.SphereGeometry(1, 64, 64);
        const mat = new THREE.MeshPhongMaterial({ color: 0x1a4875, shininess: 18 });
        globeMesh = new THREE.Mesh(geo, mat);
        scene.add(globeMesh);

        /* Load earth texture */
        const loader = new THREE.TextureLoader();
        loader.load(
            'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/textures/planets/earth_atmos_2048.jpg',
            tex => {
                mat.map = tex; mat.color.set(0xffffff); mat.needsUpdate = true;
                const hint = document.getElementById('globe-overlay-hint');
                if (hint) hint.classList.add('goh-hidden');
            }
        );
        loader.load(
            'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/textures/planets/earth_specular_2048.jpg',
            tex => { mat.specularMap = tex; mat.shininess = 30; mat.needsUpdate = true; }
        );

        /* Atmosphere glow */
        const atmoGeo = new THREE.SphereGeometry(1.06, 32, 32);
        const atmoMat = new THREE.MeshPhongMaterial({
            color: 0x4499ff, transparent: true, opacity: 0.07, side: THREE.BackSide,
        });
        scene.add(new THREE.Mesh(atmoGeo, atmoMat));

        /* Star field */
        const starPos = [];
        for (let i = 0; i < 1600; i++) {
            const phi   = Math.acos(2 * Math.random() - 1);
            const theta = Math.random() * Math.PI * 2;
            const r     = 7 + Math.random() * 3;
            starPos.push(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.cos(phi),
                r * Math.sin(phi) * Math.sin(theta)
            );
        }
        const starGeo = new THREE.BufferGeometry();
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
        scene.add(new THREE.Points(starGeo,
            new THREE.PointsMaterial({ color: 0xffffff, size: 0.022, transparent: true, opacity: 0.65 })
        ));

        /* Pointer interaction (drag-to-rotate, scroll-to-zoom) */
        canvas.addEventListener('pointerdown', e => {
            isDragging = true; prevX = e.clientX; prevY = e.clientY;
            canvas.setPointerCapture(e.pointerId);
            lastInteraction = Date.now();
        });
        canvas.addEventListener('pointermove', e => {
            if (!isDragging) return;
            const dx = e.clientX - prevX, dy = e.clientY - prevY;
            globeMesh.rotation.y += dx * 0.006;
            globeMesh.rotation.x  = Math.max(-1.1, Math.min(1.1,
                globeMesh.rotation.x + dy * 0.006));
            prevX = e.clientX; prevY = e.clientY;
            lastInteraction = Date.now();
        });
        canvas.addEventListener('pointerup',     () => { isDragging = false; });
        canvas.addEventListener('pointercancel', () => { isDragging = false; });
        canvas.addEventListener('wheel', e => {
            e.preventDefault();
            camera.position.z = Math.max(1.5, Math.min(5,
                camera.position.z + e.deltaY * 0.003));
            lastInteraction = Date.now();
        }, { passive: false });

        /* Resize */
        if (window.ResizeObserver) {
            new ResizeObserver(() => {
                const W2 = wrap.clientWidth, H2 = wrap.clientHeight;
                if (!W2 || !H2) return;
                camera.aspect = W2 / H2;
                camera.updateProjectionMatrix();
                renderer.setSize(W2, H2);
            }).observe(wrap);
        }

        /* Render loop */
        (function loop() {
            requestAnimationFrame(loop);
            if (!isDragging && Date.now() - lastInteraction > 1800) {
                globeMesh.rotation.y += 0.0015;
            }
            /* Pulse glow spheres */
            const t = performance.now() * 0.001;
            for (const m of Object.values(globeMarkers)) {
                if (!m.glow) continue;
                const s = 1 + 0.35 * Math.sin(t * (m.rank === 1 ? 3.2 : 2.0));
                m.glow.scale.setScalar(s);
                m.glow.material.opacity = 0.11 + 0.14 * Math.abs(Math.sin(t * (m.rank === 1 ? 3.2 : 2.0)));
            }
            renderer.render(scene, camera);
        })();

        ready = true;
    }

    /* ── Rebuild globe markers from sorted ranking ──────── */
    function updateMarkers(sorted) {
        if (!ready || !globeMesh) return;

        /* Remove all previous markers */
        for (const m of Object.values(globeMarkers)) {
            globeMesh.remove(m.mesh);
            if (m.glow) globeMesh.remove(m.glow);
        }
        globeMarkers = {};

        const COLORS = [0xFFD700, 0xC0C0C0, 0xCD7F32, 0x42A5F5, 0x42A5F5,
                        0x7EC8E3, 0x7EC8E3, 0x7EC8E3, 0x7EC8E3, 0x7EC8E3];
        const SIZES  = [0.048,   0.038,   0.032,   0.026,   0.022,
                        0.018,   0.018,   0.016,   0.016,   0.016];

        sorted.forEach(([country], i) => {
            const coords = COORDS[country];
            if (!coords) return;

            const rank  = i + 1;
            const color = COLORS[i] || 0x7EC8E3;
            const size  = SIZES[i]  || 0.014;
            const pos   = latLonToVec3(coords[0], coords[1], 1.015);

            const mesh = new THREE.Mesh(
                new THREE.SphereGeometry(size, 10, 10),
                new THREE.MeshPhongMaterial({
                    color, emissive: color,
                    emissiveIntensity: rank <= 3 ? 0.9 : 0.5,
                    shininess: 120,
                })
            );
            mesh.position.copy(pos);
            globeMesh.add(mesh);

            let glow = null;
            if (rank <= 5) {
                glow = new THREE.Mesh(
                    new THREE.SphereGeometry(size * 2.8, 10, 10),
                    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.18 })
                );
                glow.position.copy(pos);
                globeMesh.add(glow);
            }

            globeMarkers[country] = { mesh, glow, rank };
        });
    }

    /* ── Parse bot response → { countryKey: points } ────── */
    function parseResponse(text) {
        const scores = {};

        /* "1. Country (score)" — top-N country list (no /5) */
        const reTop = /^\s*(\d+)\.\s+([A-Za-z][A-Za-z ()'\-.]+?)\s+\(([\d.]+)\)\s*$/gm;
        let m;
        while ((m = reTop.exec(text)) !== null) {
            const rank    = parseInt(m[1]);
            const country = m[2].trim().toLowerCase();
            if (rank <= 10 && COORDS[country]) {
                const pts = [100, 80, 65, 50, 40, 30, 25, 20, 18, 15][rank - 1] || 10;
                scores[country] = (scores[country] || 0) + pts;
            }
        }

        /* "1. City, Country (score/5)" — top-N city list */
        const reCityTop = /^\s*(\d+)\.\s+[^,\n]+,\s+([A-Za-z][A-Za-z ]+?)\s+\(([\d.]+)\/5\)\s*$/gm;
        while ((m = reCityTop.exec(text)) !== null) {
            const country = m[2].trim().toLowerCase();
            if (COORDS[country]) {
                scores[country] = (scores[country] || 0) + Math.round(parseFloat(m[3]) * 12);
            }
        }

        /* "1. City, Country - Budget - score/5" — recommendations */
        const reRec = /^\s*(\d+)\.\s+[^,\n]+,\s+([A-Za-z][A-Za-z ]+?)\s+-\s+\w+\s+-\s+([\d.]+)\/5/gm;
        while ((m = reRec.exec(text)) !== null) {
            const country = m[2].trim().toLowerCase();
            if (COORDS[country]) {
                scores[country] = (scores[country] || 0) + Math.round(parseFloat(m[3]) * 12);
            }
        }

        /* "Country - metric\n..." — single country summary (first line) */
        const reSummary = /^([A-Z][A-Za-z][A-Za-z ]+?)\s+-\s+[\w ]+$/m;
        const sumM = reSummary.exec(text);
        if (sumM) {
            const country = sumM[1].trim().toLowerCase();
            if (COORDS[country]) {
                const qM = /Quality of life index:\s*([\d.]+)/.exec(text);
                scores[country] = (scores[country] || 0) + (qM ? Math.round(parseFloat(qM[1]) * 0.35) : 25);
            }
        }

        /* "Best option: Country" — comparison winner (may be at end of string) */
        const reWinner = /Best option:\s*([A-Z][A-Za-z ]+?)(?:[\n.!]|$)/g;
        while ((m = reWinner.exec(text)) !== null) {
            const country = m[1].trim().toLowerCase();
            if (COORDS[country]) scores[country] = (scores[country] || 0) + 35;
        }

        /* "- Country: score" — both sides of a comparison */
        const reComp = /^-\s+([A-Z][A-Za-z ]+?):\s*[\d.]+/gm;
        while ((m = reComp.exec(text)) !== null) {
            const country = m[1].trim().toLowerCase();
            if (COORDS[country]) scores[country] = (scores[country] || 0) + 15;
        }

        return scores;
    }

    /* ── Re-render the ranking list DOM ───────────────── */
    function renderRanking(sorted) {
        const list = document.getElementById('ranking-list');
        const sub  = document.getElementById('rank-sub');
        if (!list) return;

        if (sorted.length === 0) {
            list.innerHTML = `
                <div class="rank-empty">
                    <div class="rank-empty-icon">🗺️</div>
                    <p>Ask Globie about destinations to build your ranking!</p>
                </div>`;
            if (sub) sub.textContent = 'Based on your conversation';
            return;
        }

        if (sub) sub.textContent = `${sorted.length} destination${sorted.length > 1 ? 's' : ''} tracked`;

        const medals  = ['🥇', '🥈', '🥉'];
        const maxScore = sorted[0][1].score;

        list.innerHTML = sorted.map(([country, data], i) => {
            const rank  = i + 1;
            const medal = rank <= 3
                ? medals[i]
                : `<span class="rank-num">${rank}</span>`;
            const flag  = FLAGS[country] || '🌐';
            const pct   = Math.round((data.score / maxScore) * 100);
            const cls   = rank <= 3 ? `rank-${rank}` : 'rank-rest';
            const name  = country.replace(/\b\w/g, c => c.toUpperCase());

            return `<div class="rank-item ${cls}" data-country="${country}">
                <div class="rank-medal">${medal}</div>
                <div class="rank-info">
                    <div class="rank-name">${flag} ${name}</div>
                    <div class="rank-bar-wrap">
                        <div class="rank-bar" style="width:${pct}%"></div>
                    </div>
                </div>
                <div class="rank-score">${data.score}pt</div>
            </div>`;
        }).join('');
    }

    /* ── Public: merge new scores and refresh UI ──────── */
    function addScores(newScores) {
        if (!newScores || !Object.keys(newScores).length) return;

        for (const [c, pts] of Object.entries(newScores)) {
            if (!ranking[c]) ranking[c] = { score: 0, hits: 0 };
            ranking[c].score += pts;
            ranking[c].hits  += 1;
        }

        const sorted = Object.entries(ranking)
            .sort((a, b) => b[1].score - a[1].score)
            .slice(0, 10);

        updateMarkers(sorted);
        renderRanking(sorted);

        /* Flash updated items */
        setTimeout(() => {
            for (const c of Object.keys(newScores)) {
                const el = document.querySelector(`.rank-item[data-country="${c}"]`);
                if (!el) continue;
                el.classList.remove('rank-flash');
                void el.offsetWidth;        // reflow to restart animation
                el.classList.add('rank-flash');
            }
        }, 60);
    }

    /* ── Public: full reset ───────────────────────────── */
    function reset() {
        ranking = {};
        updateMarkers([]);
        renderRanking([]);
    }

    return { init, addScores, reset, parseResponse };
})();


// ══════════════════════════════════════════════════════════
// GLOBE PANEL TOGGLE
// ══════════════════════════════════════════════════════════
(function () {
    const panel      = document.getElementById('globe-panel');
    const toggleBtn  = document.getElementById('btn-globe-toggle');
    const closeBtn   = document.getElementById('btn-close-globe');
    if (!panel || !toggleBtn) return;

    const MOBILE_BP = 960;
    let backdrop = null;

    function isMobile() { return window.innerWidth <= MOBILE_BP; }

    function createBackdrop() {
        if (backdrop) return backdrop;
        backdrop = document.createElement('div');
        backdrop.className = 'globe-backdrop';
        backdrop.addEventListener('click', hidePanel);
        document.body.appendChild(backdrop);
        return backdrop;
    }

    function showPanel() {
        if (isMobile()) {
            panel.classList.remove('gp-hidden');
            panel.classList.add('gp-open');
            createBackdrop();
        } else {
            panel.classList.remove('gp-hidden');
        }
        toggleBtn.classList.add('gbt-active');
    }

    function hidePanel() {
        if (isMobile()) {
            panel.classList.remove('gp-open');
            if (backdrop) { backdrop.remove(); backdrop = null; }
        } else {
            panel.classList.add('gp-hidden');
        }
        toggleBtn.classList.remove('gbt-active');
    }

    function isVisible() {
        return isMobile()
            ? panel.classList.contains('gp-open')
            : !panel.classList.contains('gp-hidden');
    }

    /* Initial state: hide on mobile */
    if (isMobile()) panel.classList.add('gp-hidden');
    else toggleBtn.classList.add('gbt-active');

    toggleBtn.addEventListener('click', () => isVisible() ? hidePanel() : showPanel());
    if (closeBtn) closeBtn.addEventListener('click', hidePanel);

    /* On resize: clean up cross-mode state */
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            panel.classList.remove('gp-open');
            if (backdrop) { backdrop.remove(); backdrop = null; }
            if (!panel.classList.contains('gp-hidden')) {
                toggleBtn.classList.add('gbt-active');
            }
        }
    });
})();


// ══════════════════════════════════════════════════════════
// CHAT MODULE
// ══════════════════════════════════════════════════════════
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

    /* Initialise globe after DOM is ready */
    Globe.init();

    /* ── Auto-resize textarea ─────────────────────────── */
    input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 140) + 'px';
    });

    /* ── Enter to send ────────────────────────────────── */
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });

    /* ── Suggestion chip clicks ───────────────────────── */
    messagesEl.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (chip) {
            const raw   = chip.textContent.trim();
            const clean = raw.replace(/^[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}✈️🗺️📍📊💰💡🔍]+\s*/u, '');
            input.value = clean || raw;
            input.dispatchEvent(new Event('input'));
            form.dispatchEvent(new Event('submit'));
        }
    });

    /* ── Clear chat & ranking ─────────────────────────── */
    clearBtn.addEventListener('click', () => {
        const keep = messagesEl.querySelector('.date-divider');
        [...messagesEl.children].forEach(el => {
            if (el !== keep) el.remove();
        });
        messagesEl.appendChild(buildBotMessage(
            '¡Hola! I\'m <strong>Globie</strong>, your personal world knowledge guide. 🗺️ Ask me about <strong>countries</strong>, <strong>cities</strong>, or <strong>quality of life</strong>!'
        ));
        scrollToBottom();
        Globe.reset();
    });

    /* ── Form submit ──────────────────────────────────── */
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
                    'Content-Type':     'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest',
                    [csrfName]:         csrfValue,
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
            const reply = data.reply ?? 'No response received.';

            messagesEl.appendChild(buildBotMessage(reply));

            /* Update globe ranking from bot reply */
            Globe.addScores(Globe.parseResponse(reply));

        } catch {
            messagesEl.appendChild(buildBotMessage('Connection error. Is the server running?', true));
        } finally {
            setLoading(false);
        }
    });

    /* ── Message builders ─────────────────────────────── */
    function buildBotMessage(text, isError = false) {
        const row = document.createElement('div');
        row.className = `message bot-message${isError ? ' error-bubble' : ''}`;
        row.setAttribute('data-animate', '');
        row.innerHTML = `
            <div class="msg-avatar bot-av">🌍</div>
            <div class="msg-body">
                <div class="msg-sender">Globie</div>
                <div class="message-bubble"><p>${formatText(text)}</p></div>
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
                <div class="message-bubble"><p>${esc(text).replace(/\n/g, '<br>')}</p></div>
                <span class="msg-time">${timeNow()}</span>
            </div>`;
        return row;
    }

    /* ── Helpers ──────────────────────────────────────── */
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
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function formatText(str) {
        return esc(str)
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    }
})();
