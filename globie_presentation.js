const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Globie - Sistema Basat en Coneixement";
pres.author = "Globie Team";

// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  darkBg:    "021526",
  deepBlue:  "065A82",
  teal:      "1C7293",
  mint:      "02C39A",
  lightBg:   "EBF5FB",
  white:     "FFFFFF",
  textDark:  "0D1B2A",
  textMid:   "2C5F7A",
  textLight: "64748B",
  card:      "FFFFFF",
  cardBorder:"1C7293",
};

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.12 });

// ── Helper: section header bar ────────────────────────────────────────────────
function sectionHeader(slide, title, subtitle) {
  slide.background = { color: C.lightBg };
  // Top accent bar
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.mint } });
  // Left side bar
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.08, w: 0.07, h: 5.545, fill: { color: C.deepBlue } });
  // Title
  slide.addText(title, {
    x: 0.3, y: 0.15, w: 9.5, h: 0.7,
    fontSize: 28, bold: true, color: C.deepBlue, fontFace: "Calibri",
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.3, y: 0.85, w: 9.5, h: 0.35,
      fontSize: 13, color: C.teal, fontFace: "Calibri", italic: true,
      margin: 0,
    });
  }
}

// ── Helper: card ─────────────────────────────────────────────────────────────
function card(slide, x, y, w, h, accentColor) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.white },
    line: { color: accentColor || C.cardBorder, width: 0 },
    shadow: makeShadow(),
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.06, h,
    fill: { color: accentColor || C.mint },
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 1 — Title
// ═══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };

  // Decorative circle (globe motif)
  s.addShape(pres.shapes.OVAL, { x: 5.8, y: -1.2, w: 7, h: 7, fill: { color: C.deepBlue, transparency: 60 } });
  s.addShape(pres.shapes.OVAL, { x: 6.5, y: -0.5, w: 5.2, h: 5.2, fill: { color: C.teal, transparency: 75 } });

  // Top mint bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.mint } });
  // Bottom mint bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.mint } });

  s.addText("🌍", { x: 0.5, y: 0.7, w: 1.2, h: 1.2, fontSize: 52 });

  s.addText("GLOBIE", {
    x: 0.5, y: 1.7, w: 7, h: 1.1,
    fontSize: 60, bold: true, color: C.white, fontFace: "Calibri",
    charSpacing: 8, margin: 0,
  });
  s.addText("Sistema Basat en Coneixement per a Viatges", {
    x: 0.5, y: 2.8, w: 7, h: 0.6,
    fontSize: 18, color: C.mint, fontFace: "Calibri", italic: true, margin: 0,
  });
  s.addText("Travel Intelligence Chatbot amb Visualització 3D", {
    x: 0.5, y: 3.4, w: 7, h: 0.45,
    fontSize: 13, color: "8AB4C9", fontFace: "Calibri", margin: 0,
  });

  s.addText("SBC · 2024-2025", {
    x: 0.5, y: 5.0, w: 9, h: 0.35,
    fontSize: 11, color: "4A7A95", fontFace: "Calibri", margin: 0,
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 2 — Introducció al domini
// ═══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  sectionHeader(s, "Introducció al Domini", "Motivació i rellevància del projecte");

  // Left column: what / why
  card(s, 0.3, 1.3, 4.4, 1.1, C.mint);
  s.addText("Què és Globie?", { x: 0.55, y: 1.35, w: 4.0, h: 0.4, fontSize: 14, bold: true, color: C.deepBlue, fontFace: "Calibri", margin: 0 });
  s.addText("Assistent de viatges conversacional que respon preguntes en llenguatge natural sobre ciutats i països del món.", {
    x: 0.55, y: 1.72, w: 3.9, h: 0.65, fontSize: 11, color: C.textDark, fontFace: "Calibri", margin: 0,
  });

  card(s, 0.3, 2.55, 4.4, 1.15, C.teal);
  s.addText("Per què és rellevant?", { x: 0.55, y: 2.6, w: 4.0, h: 0.4, fontSize: 14, bold: true, color: C.deepBlue, fontFace: "Calibri", margin: 0 });
  s.addText("El turisme global genera 9,5 bilions de $ anuals. Accedir a informació fiable i comparativa de destinacions és un repte real per a viatgers i planificadors.", {
    x: 0.55, y: 3.0, w: 3.9, h: 0.65, fontSize: 11, color: C.textDark, fontFace: "Calibri", margin: 0,
  });

  card(s, 0.3, 3.85, 4.4, 1.55, C.deepBlue);
  s.addText("Capacitats principals", { x: 0.55, y: 3.9, w: 4.0, h: 0.4, fontSize: 14, bold: true, color: C.deepBlue, fontFace: "Calibri", margin: 0 });
  s.addText([
    { text: "Consultes sobre ciutats i països (seguretat, cost, salut…)", options: { bullet: true, breakLine: true } },
    { text: "Comparatives: \"Russia vs China healthcare\"", options: { bullet: true, breakLine: true } },
    { text: "Recomanacions personalitzades per tema i pressupost", options: { bullet: true, breakLine: true } },
    { text: "Rànquings: top 10 safest countries", options: { bullet: true } },
  ], { x: 0.55, y: 4.28, w: 3.9, h: 1.1, fontSize: 10.5, color: C.textDark, fontFace: "Calibri", margin: 0 });

  // Right column: tech stack cards
  s.addText("Stack Tecnològic", { x: 5.0, y: 1.28, w: 4.6, h: 0.35, fontSize: 13, bold: true, color: C.textMid, fontFace: "Calibri", margin: 0 });

  const stack = [
    { icon: "🐍", label: "Python + Flask", desc: "Microservei chatbot NLP" },
    { icon: "🐘", label: "PHP + CodeIgniter 4", desc: "Frontend web MVC" },
    { icon: "🌐", label: "Three.js", desc: "Glob 3D interactiu" },
    { icon: "🐬", label: "MySQL 8.4", desc: "Persistència de dades" },
    { icon: "🐳", label: "Docker Compose", desc: "Desplegament multi-servei" },
  ];

  stack.forEach((item, i) => {
    const y = 1.65 + i * 0.74;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y, w: 4.7, h: 0.65, fill: { color: C.white }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y, w: 0.06, h: 0.65, fill: { color: i % 2 === 0 ? C.mint : C.teal } });
    s.addText(item.icon, { x: 5.12, y: y + 0.05, w: 0.6, h: 0.55, fontSize: 20, margin: 0 });
    s.addText(item.label, { x: 5.75, y: y + 0.05, w: 3.8, h: 0.28, fontSize: 12, bold: true, color: C.deepBlue, fontFace: "Calibri", margin: 0 });
    s.addText(item.desc, { x: 5.75, y: y + 0.33, w: 3.8, h: 0.28, fontSize: 10, color: C.textLight, fontFace: "Calibri", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 3 — Representació del Coneixement
// ═══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  sectionHeader(s, "Representació del Coneixement", "Fonts de dades, taxonomies i escales d'interpretació");

  // Data sources
  s.addText("Fonts de Dades (CSV)", { x: 0.3, y: 1.3, w: 4.3, h: 0.35, fontSize: 13, bold: true, color: C.deepBlue, fontFace: "Calibri", margin: 0 });

  const datasets = [
    { name: "Quality of Life Index", desc: "195 països · 7 índexs" },
    { name: "Cost of Living Index", desc: "Índex de cost i lloguer" },
    { name: "Health Care Index", desc: "Qualitat sanitària global" },
    { name: "Crime Index", desc: "Seguretat per país" },
    { name: "Travel Cities Dataset", desc: "4.416 ciutats · 9 categories" },
  ];

  datasets.forEach((d, i) => {
    const y = 1.7 + i * 0.68;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 4.3, h: 0.6, fill: { color: C.white }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 0.06, h: 0.6, fill: { color: C.mint } });
    s.addText("📊", { x: 0.42, y: y + 0.05, w: 0.5, h: 0.5, fontSize: 16, margin: 0 });
    s.addText(d.name, { x: 0.95, y: y + 0.05, w: 3.5, h: 0.27, fontSize: 11, bold: true, color: C.textDark, fontFace: "Calibri", margin: 0 });
    s.addText(d.desc, { x: 0.95, y: y + 0.33, w: 3.5, h: 0.24, fontSize: 10, color: C.textLight, fontFace: "Calibri", margin: 0 });
  });

  // Right: taxonomies
  s.addText("Taxonomies de Coneixement", { x: 4.9, y: 1.3, w: 4.9, h: 0.35, fontSize: 13, bold: true, color: C.deepBlue, fontFace: "Calibri", margin: 0 });

  // Country metrics
  card(s, 4.9, 1.7, 4.8, 1.7, C.teal);
  s.addText("COUNTRY_METRICS — 5 dimensions", { x: 5.15, y: 1.75, w: 4.4, h: 0.35, fontSize: 12, bold: true, color: C.teal, fontFace: "Calibri", margin: 0 });
  s.addText([
    { text: "safety · cost · healthcare · pollution · quality", options: { breakLine: true } },
    { text: "Cada dimensió té: claus, columna CSV, ordre millor/pitjor", options: { italic: true } },
  ], { x: 5.15, y: 2.1, w: 4.4, h: 0.75, fontSize: 10.5, color: C.textDark, fontFace: "Calibri", margin: 0 });
  s.addText("Exemple: safety → keywords [\"safe\",\"crime\"] → Safety Index (↑ millor)", {
    x: 5.15, y: 2.85, w: 4.4, h: 0.4, fontSize: 10, color: C.textLight, fontFace: "Calibri", italic: true, margin: 0,
  });

  // City topics
  card(s, 4.9, 3.55, 4.8, 1.85, C.mint);
  s.addText("CITY_TOPICS — 9 categories de viatge", { x: 5.15, y: 3.6, w: 4.4, h: 0.35, fontSize: 12, bold: true, color: C.teal, fontFace: "Calibri", margin: 0 });
  s.addText("culture · adventure · nature · beach · nightlife\nfood (cuisine) · wellness · urban · quiet (seclusion)", {
    x: 5.15, y: 3.95, w: 4.4, h: 0.65, fontSize: 10.5, color: C.textDark, fontFace: "Calibri", margin: 0,
  });
  s.addText("Escala 0–5 → \"outstanding\" / \"great\" / \"good\" / \"decent\" / \"below average\"", {
    x: 5.15, y: 4.6, w: 4.4, h: 0.55, fontSize: 10, color: C.textLight, fontFace: "Calibri", italic: true, margin: 0,
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 4 — Motor d'Inferència
// ═══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  sectionHeader(s, "Motor d'Inferència", "Arquitectura de regles i arbre de decisió");

  // Flow boxes
  const steps = [
    { n: "1", label: "Normalització", detail: "lowercase, regex, strip", color: C.mint },
    { n: "2", label: "Tokenització NLP", detail: "NLTK: POS tag + lemma", color: C.teal },
    { n: "3", label: "Reconeixement Entitats", detail: "find_mentions(): país/ciutat", color: C.deepBlue },
    { n: "4", label: "Aplicació Regles", detail: "apply_rules(): 8 regles prioritzades", color: "8B5CF6" },
    { n: "5", label: "Generació Resposta", detail: "responses.py → JSON", color: "065A82" },
  ];

  steps.forEach((step, i) => {
    const x = 0.15 + i * 1.96;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 1.75, h: 1.0, fill: { color: step.color }, shadow: makeShadow() });
    s.addText(step.n, { x, y: 1.3, w: 1.75, h: 0.42, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
    s.addText(step.label, { x, y: 1.72, w: 1.75, h: 0.32, fontSize: 9.5, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(step.detail, { x, y: 2.05, w: 1.75, h: 0.25, fontSize: 8.5, color: C.white, fontFace: "Calibri", align: "center", italic: true, margin: 0 });
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.LINE, { x: x + 1.75, y: 1.8, w: 0.21, h: 0, line: { color: C.textLight, width: 1.5 } });
    }
  });

  // Decision tree (simplified)
  s.addText("Arbre de decisió — apply_rules()", { x: 0.3, y: 2.55, w: 9.4, h: 0.35, fontSize: 13, bold: true, color: C.deepBlue, fontFace: "Calibri", margin: 0 });

  const rules = [
    { cond: "2+ països + (vs / compare / than)",     act: "compare_countries()",     col: C.mint },
    { cond: "2+ ciutats + comparació",                act: "compare_cities()",        col: C.teal },
    { cond: "recommend / suggest / where + go",       act: "recommend_cities()",      col: C.deepBlue },
    { cond: "weather + lloc",                         act: "show_weather() API",      col: "0284C7" },
    { cond: "capital / population / currency + país", act: "show_country_facts()",    col: "7C3AED" },
    { cond: "país mencionat",                         act: "show_country_metric/summary()", col: "065A82" },
    { cond: "ciutat mencionada",                      act: "show_city_info()",        col: "0891B2" },
    { cond: "best / top / rank + lloc",               act: "show_best_cities/countries()", col: "059669" },
  ];

  rules.forEach((r, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i % 4;
    const x = col === 0 ? 0.3 : 5.15;
    const y = 3.0 + row * 0.62;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.65, h: 0.56, fill: { color: C.white }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 0.56, fill: { color: r.col } });
    s.addText(`SI ${r.cond}`, { x: x + 0.15, y: y + 0.03, w: 4.3, h: 0.28, fontSize: 9.5, color: C.textDark, fontFace: "Calibri", margin: 0 });
    s.addText(`→ ${r.act}`, { x: x + 0.15, y: y + 0.3, w: 4.3, h: 0.24, fontSize: 9.5, bold: true, color: r.col, fontFace: "Calibri", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 5 — Detalls d'Implementació
// ═══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  sectionHeader(s, "Detalls d'Implementació", "NLP, APIs externes i arquitectura de serveis");

  // NLP Pipeline
  s.addText("Pipeline NLP (NLTK)", { x: 0.3, y: 1.3, w: 4.4, h: 0.35, fontSize: 13, bold: true, color: C.deepBlue, fontFace: "Calibri", margin: 0 });

  const nlpSteps = [
    { step: "normalize_text()", detail: "lowercase · regex · strip" },
    { step: "word_tokenize()", detail: "NLTK punkt tokenizer" },
    { step: "pos_tag()", detail: "averaged_perceptron_tagger_eng" },
    { step: "WordNetLemmatizer()", detail: "Noms → pos='n'  Verbs → pos='v'" },
    { step: "find_mentions()", detail: "Regex word-boundary entity matching" },
  ];

  nlpSteps.forEach((n, i) => {
    const y = 1.72 + i * 0.69;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 4.4, h: 0.62, fill: { color: C.white }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 0.06, h: 0.62, fill: { color: i % 2 === 0 ? C.mint : C.teal } });
    s.addText(n.step, { x: 0.5, y: y + 0.04, w: 4.0, h: 0.27, fontSize: 11, bold: true, color: C.deepBlue, fontFace: "Consolas", margin: 0 });
    s.addText(n.detail, { x: 0.5, y: y + 0.33, w: 4.0, h: 0.24, fontSize: 10, color: C.textLight, fontFace: "Calibri", margin: 0 });
  });

  // Right column
  s.addText("APIs Externes", { x: 4.95, y: 1.3, w: 4.8, h: 0.35, fontSize: 13, bold: true, color: C.deepBlue, fontFace: "Calibri", margin: 0 });

  card(s, 4.95, 1.72, 4.8, 1.45, C.mint);
  s.addText("🌍  REST Countries API", { x: 5.2, y: 1.77, w: 4.4, h: 0.35, fontSize: 12, bold: true, color: C.teal, fontFace: "Calibri", margin: 0 });
  s.addText("restcountries.com/v3.1/name/{country}\nRetorna: capital · population · languages · currencies", {
    x: 5.2, y: 2.1, w: 4.4, h: 0.55, fontSize: 10, color: C.textDark, fontFace: "Calibri", margin: 0,
  });
  s.addText("→ show_country_facts()", { x: 5.2, y: 2.65, w: 4.4, h: 0.42, fontSize: 10, color: C.textLight, fontFace: "Calibri", italic: true, margin: 0 });

  card(s, 4.95, 3.3, 4.8, 1.45, C.teal);
  s.addText("⛅  Open-Meteo API", { x: 5.2, y: 3.35, w: 4.4, h: 0.35, fontSize: 12, bold: true, color: C.teal, fontFace: "Calibri", margin: 0 });
  s.addText("Geocoding → Coordenades GPS\nForecast → temperatura · vent · codi meteorològic", {
    x: 5.2, y: 3.68, w: 4.4, h: 0.55, fontSize: 10, color: C.textDark, fontFace: "Calibri", margin: 0,
  });
  s.addText("→ show_weather()  ·  19 condicions meteorològiques", { x: 5.2, y: 4.22, w: 4.4, h: 0.42, fontSize: 10, color: C.textLight, fontFace: "Calibri", italic: true, margin: 0 });

  // Architecture note
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 5.0, w: 9.45, h: 0.45, fill: { color: C.darkBg }, shadow: makeShadow() });
  s.addText("Flux:  Browser → Nginx → PHP Controller → shell_exec(python3) → Flask /chat → JSON", {
    x: 0.45, y: 5.02, w: 9.2, h: 0.4, fontSize: 10, color: C.mint, fontFace: "Calibri", margin: 0,
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 6 — Testing i Avaluació
// ═══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  sectionHeader(s, "Testing i Mètodes d'Avaluació", "PHPUnit, integració i avaluació de respostes");

  // Left: testing methods
  s.addText("Estratègia de Testing", { x: 0.3, y: 1.3, w: 4.4, h: 0.35, fontSize: 13, bold: true, color: C.deepBlue, fontFace: "Calibri", margin: 0 });

  const tests = [
    { icon: "🧪", title: "PHPUnit 10.5+", body: "Framework de tests PHP\nDirectori: /www/tests/\nCobertura HTML generada automàticament" },
    { icon: "🔗", title: "Integració Docker", body: "PHP 8.4-fpm + XDebug activat\nMySQL 8.4 amb seeding\nBase de dades de test aïllada" },
    { icon: "🌐", title: "Endpoints Flask", body: "GET /health → health check\nPOST /chat → {\"message\": \"...\"}\nResposta JSON: {\"reply\": \"...\"}" },
  ];

  tests.forEach((t, i) => {
    const y = 1.72 + i * 1.27;
    card(s, 0.3, y, 4.4, 1.2, C.mint);
    s.addText(t.icon, { x: 0.42, y: y + 0.08, w: 0.6, h: 0.5, fontSize: 22, margin: 0 });
    s.addText(t.title, { x: 1.05, y: y + 0.08, w: 3.5, h: 0.33, fontSize: 12, bold: true, color: C.deepBlue, fontFace: "Calibri", margin: 0 });
    s.addText(t.body, { x: 1.05, y: y + 0.41, w: 3.5, h: 0.72, fontSize: 10, color: C.textDark, fontFace: "Calibri", margin: 0 });
  });

  // Right: evaluation cases
  s.addText("Casos de Prova representatius", { x: 4.95, y: 1.3, w: 4.8, h: 0.35, fontSize: 13, bold: true, color: C.deepBlue, fontFace: "Calibri", margin: 0 });

  const cases = [
    { query: "Is Japan safe?",                      type: "Consulta mètrica",   ok: true },
    { query: "Russia vs China healthcare",          type: "Comparació",         ok: true },
    { query: "Best city for food under $50",        type: "Recomanació+budget", ok: true },
    { query: "What is the capital of France?",      type: "Facts API",          ok: true },
    { query: "weather in Tokyo",                    type: "API meteorologia",   ok: true },
    { query: "Top 10 safest countries",             type: "Rànquing",           ok: true },
    { query: "Tell me something random",            type: "Out-of-scope",       ok: false },
    { query: "How do I get to Madrid?",             type: "No suportat",        ok: false },
  ];

  cases.forEach((c, i) => {
    const y = 1.72 + i * 0.44;
    s.addShape(pres.shapes.RECTANGLE, { x: 4.95, y, w: 4.8, h: 0.38, fill: { color: c.ok ? "F0FDF4" : "FFF7ED" }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 4.95, y, w: 0.06, h: 0.38, fill: { color: c.ok ? "059669" : "F59E0B" } });
    s.addText(c.ok ? "✓" : "~", { x: 5.05, y: y + 0.04, w: 0.35, h: 0.3, fontSize: 13, bold: true, color: c.ok ? "059669" : "F59E0B", fontFace: "Calibri", margin: 0 });
    s.addText(`"${c.query}"`, { x: 5.42, y: y + 0.02, w: 3.3, h: 0.2, fontSize: 9, bold: true, color: C.textDark, fontFace: "Calibri", margin: 0 });
    s.addText(c.type, { x: 5.42, y: y + 0.21, w: 3.3, h: 0.16, fontSize: 8, color: C.textLight, fontFace: "Calibri", margin: 0 });
  });

  // Legend
  s.addText("✓ Cobert    ~ Fora d'abast (mostra text d'ajuda)", {
    x: 4.95, y: 5.35, w: 4.8, h: 0.22, fontSize: 9, color: C.textLight, fontFace: "Calibri", italic: true, margin: 0,
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 7 — Demo del Sistema
// ═══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  sectionHeader(s, "Demo del Sistema", "Exemples d'interacció i visualització 3D");

  // Chat mockup (left panel)
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.3, w: 4.3, h: 4.1, fill: { color: "1A2A3A" }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.3, w: 4.3, h: 0.4, fill: { color: C.deepBlue } });
  s.addText("🌍 Globie Chat", { x: 0.35, y: 1.32, w: 4.2, h: 0.36, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });

  const msgs = [
    { who: "user", text: "Is Japan safe?" },
    { who: "bot",  text: "Japan has a Safety Index of 78.2 — very safe 🟢. Low crime rates and excellent infrastructure make it one of Asia's safest destinations." },
    { who: "user", text: "Compare France vs Spain cost" },
    { who: "bot",  text: "🆚 France: Cost Index 73 (expensive)\nSpain: Cost Index 49 (moderate)\nSpain is significantly more affordable for travelers." },
    { who: "user", text: "Best city for food and nightlife" },
    { who: "bot",  text: "🏆 Top recommendation: Barcelona (food: 4.6/5 · nightlife: 4.5/5)\nAlso great: Bangkok, Tokyo, New York City." },
  ];

  let yMsg = 1.78;
  msgs.forEach((m) => {
    const isUser = m.who === "user";
    const boxW = 3.3;
    const x = isUser ? 1.2 : 0.4;
    const bgColor = isUser ? C.deepBlue : "243B4A";
    const lines = m.text.split("\n").length;
    const h = Math.max(0.38, lines * 0.27 + 0.14);

    s.addShape(pres.shapes.RECTANGLE, { x, y: yMsg, w: boxW, h, fill: { color: bgColor } });
    s.addText(m.text, { x: x + 0.08, y: yMsg + 0.04, w: boxW - 0.16, h: h - 0.08,
      fontSize: 8.5, color: C.white, fontFace: "Calibri", margin: 0 });
    yMsg += h + 0.08;
  });

  // Globe panel (right)
  s.addShape(pres.shapes.RECTANGLE, { x: 4.8, y: 1.3, w: 4.95, h: 4.1, fill: { color: "0A1628" }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 4.8, y: 1.3, w: 4.95, h: 0.4, fill: { color: C.teal } });
  s.addText("🌐 Visualització 3D Globe (Three.js)", { x: 4.85, y: 1.32, w: 4.85, h: 0.36, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });

  // Fake globe circles
  s.addShape(pres.shapes.OVAL, { x: 5.6, y: 2.1, w: 3.4, h: 3.4, fill: { color: "0D3B6E", transparency: 20 } });
  s.addShape(pres.shapes.OVAL, { x: 5.8, y: 2.3, w: 3.0, h: 3.0, fill: { color: "1C5A96", transparency: 40 } });
  s.addShape(pres.shapes.OVAL, { x: 6.0, y: 2.5, w: 2.6, h: 2.6, fill: { color: "2A7AB5", transparency: 55 } });

  // Markers
  const markers = [
    { x: 7.4, y: 3.0, label: "🔴 Japan" },
    { x: 6.5, y: 3.4, label: "🔵 France" },
    { x: 6.3, y: 3.8, label: "🟡 Spain" },
  ];
  markers.forEach(m => {
    s.addShape(pres.shapes.OVAL, { x: m.x - 0.08, y: m.y - 0.08, w: 0.16, h: 0.16, fill: { color: C.mint } });
    s.addText(m.label, { x: m.x + 0.1, y: m.y - 0.1, w: 1.2, h: 0.28, fontSize: 8, color: C.white, fontFace: "Calibri", margin: 0 });
  });

  // Features list below globe
  const features = [
    "Drag & zoom interactiu",
    "Marcadors animats per resposta",
    "Ranking panel amb 🥇🥈🥉",
    "195 capitals mapejades",
  ];
  features.forEach((f, i) => {
    s.addShape(pres.shapes.OVAL, { x: 4.88, y: 4.65 + i * 0.0, w: 0.12, h: 0.12, fill: { color: C.mint } });
    s.addText(f, { x: 5.05, y: 4.58 + i * 0.19, w: 4.5, h: 0.2, fontSize: 9, color: "8AB4C9", fontFace: "Calibri", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 8 — Conclusions
// ═══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.mint } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.mint } });
  s.addShape(pres.shapes.OVAL, { x: 6.5, y: -0.8, w: 5.5, h: 5.5, fill: { color: C.deepBlue, transparency: 70 } });

  s.addText("Conclusions", { x: 0.5, y: 0.25, w: 6, h: 0.6, fontSize: 32, bold: true, color: C.white, fontFace: "Calibri", charSpacing: 3, margin: 0 });

  const conclusions = [
    { icon: "✅", text: "Sistema KBS complet: pipeline NLP → motor de regles → dades CSV → resposta natural" },
    { icon: "🌍", text: "Cobertura global: 195 països i 4.416+ ciutats amb 5 mètriques i 9 categories" },
    { icon: "🔌", text: "Integració d'APIs externes (REST Countries, Open-Meteo) per dades en temps real" },
    { icon: "🎨", text: "Experiència d'usuari diferenciada: globe 3D interactiu + chat conversacional" },
    { icon: "🧩", text: "Arquitectura modular Docker: escalable i fàcil de desplegar" },
  ];

  conclusions.forEach((c, i) => {
    const y = 1.0 + i * 0.82;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 8.8, h: 0.72, fill: { color: C.deepBlue, transparency: 50 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.06, h: 0.72, fill: { color: C.mint } });
    s.addText(c.icon, { x: 0.65, y: y + 0.06, w: 0.6, h: 0.55, fontSize: 18, margin: 0 });
    s.addText(c.text, { x: 1.35, y: y + 0.13, w: 7.8, h: 0.45, fontSize: 12, color: C.white, fontFace: "Calibri", margin: 0 });
  });

  s.addText("Gràcies · Questions?", {
    x: 0.5, y: 5.1, w: 9, h: 0.38,
    fontSize: 14, color: C.mint, fontFace: "Calibri", italic: true, align: "center", margin: 0,
  });
}

// ── Write ────────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "Globie_Presentacio_SBC.pptx" })
  .then(() => console.log("✅  Globie_Presentacio_SBC.pptx created"))
  .catch(e => { console.error(e); process.exit(1); });
