/* =========================================================
   GLOBIE — chatbot.js
   Globe module + Chat module
   ========================================================= */

// ══════════════════════════════════════════════════════════
// GLOBE MODULE
// ══════════════════════════════════════════════════════════
const Globe = (() => {
    'use strict';

    /* ── Country → capital city { city, lat, lon } ──────── */
    const CAPITALS = {
        'albania':              {city:'Tirana',           lat: 41.33, lon:  19.82},
        'angola':               {city:'Luanda',           lat: -8.84, lon:  13.23},
        'argentina':            {city:'Buenos Aires',     lat:-34.61, lon: -58.38},
        'armenia':              {city:'Yerevan',           lat: 40.18, lon:  44.51},
        'australia':            {city:'Sydney',            lat:-33.87, lon: 151.21},
        'austria':              {city:'Vienna',            lat: 48.21, lon:  16.37},
        'azerbaijan':           {city:'Baku',              lat: 40.41, lon:  49.87},
        'bahrain':              {city:'Manama',            lat: 26.22, lon:  50.59},
        'bangladesh':           {city:'Dhaka',             lat: 23.81, lon:  90.41},
        'belarus':              {city:'Minsk',             lat: 53.90, lon:  27.57},
        'belgium':              {city:'Brussels',          lat: 50.85, lon:   4.35},
        'bolivia':              {city:'La Paz',            lat:-16.50, lon: -68.15},
        'bosnia and herzegovina':{city:'Sarajevo',         lat: 43.85, lon:  18.40},
        'brazil':               {city:'São Paulo',         lat:-23.55, lon: -46.63},
        'bulgaria':             {city:'Sofia',             lat: 42.70, lon:  23.32},
        'cambodia':             {city:'Phnom Penh',        lat: 11.56, lon: 104.93},
        'canada':               {city:'Toronto',           lat: 43.65, lon: -79.38},
        'chile':                {city:'Santiago',          lat:-33.46, lon: -70.65},
        'china':                {city:'Beijing',           lat: 39.90, lon: 116.41},
        'colombia':             {city:'Bogotá',            lat:  4.71, lon: -74.07},
        'costa rica':           {city:'San José',          lat:  9.93, lon: -84.08},
        'croatia':              {city:'Zagreb',            lat: 45.81, lon:  15.98},
        'cuba':                 {city:'Havana',            lat: 23.14, lon: -82.36},
        'czech republic':       {city:'Prague',            lat: 50.08, lon:  14.44},
        'denmark':              {city:'Copenhagen',        lat: 55.68, lon:  12.57},
        'ecuador':              {city:'Quito',             lat: -0.22, lon: -78.51},
        'egypt':                {city:'Cairo',             lat: 30.04, lon:  31.24},
        'estonia':              {city:'Tallinn',           lat: 59.44, lon:  24.75},
        'ethiopia':             {city:'Addis Ababa',       lat:  9.03, lon:  38.74},
        'finland':              {city:'Helsinki',          lat: 60.17, lon:  24.94},
        'france':               {city:'Paris',             lat: 48.85, lon:   2.35},
        'georgia':              {city:'Tbilisi',           lat: 41.69, lon:  44.83},
        'germany':              {city:'Berlin',            lat: 52.52, lon:  13.40},
        'ghana':                {city:'Accra',             lat:  5.56, lon:  -0.20},
        'greece':               {city:'Athens',            lat: 37.98, lon:  23.73},
        'guatemala':            {city:'Guatemala City',    lat: 14.64, lon: -90.51},
        'honduras':             {city:'Tegucigalpa',       lat: 14.08, lon: -87.21},
        'hong kong':            {city:'Hong Kong',         lat: 22.32, lon: 114.17},
        'hungary':              {city:'Budapest',          lat: 47.50, lon:  19.04},
        'india':                {city:'Delhi',             lat: 28.66, lon:  77.23},
        'indonesia':            {city:'Jakarta',           lat: -6.21, lon: 106.85},
        'iran':                 {city:'Tehran',            lat: 35.69, lon:  51.39},
        'iraq':                 {city:'Baghdad',           lat: 33.34, lon:  44.40},
        'ireland':              {city:'Dublin',            lat: 53.33, lon:  -6.25},
        'israel':               {city:'Tel Aviv',          lat: 32.09, lon:  34.79},
        'italy':                {city:'Rome',              lat: 41.90, lon:  12.50},
        'ivory coast':          {city:'Abidjan',           lat:  5.36, lon:  -4.01},
        'jamaica':              {city:'Kingston',          lat: 17.99, lon: -76.79},
        'japan':                {city:'Tokyo',             lat: 35.68, lon: 139.69},
        'jordan':               {city:'Amman',             lat: 31.95, lon:  35.93},
        'kazakhstan':           {city:'Almaty',            lat: 43.22, lon:  76.85},
        'kenya':                {city:'Nairobi',           lat: -1.29, lon:  36.82},
        'kuwait':               {city:'Kuwait City',       lat: 29.37, lon:  47.98},
        'kyrgyzstan':           {city:'Bishkek',           lat: 42.87, lon:  74.59},
        'latvia':               {city:'Riga',              lat: 56.95, lon:  24.11},
        'lebanon':              {city:'Beirut',            lat: 33.89, lon:  35.50},
        'lithuania':            {city:'Vilnius',           lat: 54.69, lon:  25.28},
        'luxembourg':           {city:'Luxembourg',        lat: 49.61, lon:   6.13},
        'malaysia':             {city:'Kuala Lumpur',      lat:  3.15, lon: 101.69},
        'malta':                {city:'Valletta',          lat: 35.90, lon:  14.51},
        'mauritius':            {city:'Port Louis',        lat:-20.16, lon:  57.50},
        'mexico':               {city:'Mexico City',       lat: 19.43, lon: -99.13},
        'moldova':              {city:'Chișinău',          lat: 47.01, lon:  28.86},
        'mongolia':             {city:'Ulaanbaatar',       lat: 47.91, lon: 106.92},
        'montenegro':           {city:'Podgorica',         lat: 42.44, lon:  19.26},
        'morocco':              {city:'Casablanca',        lat: 33.59, lon:  -7.62},
        'namibia':              {city:'Windhoek',          lat:-22.56, lon:  17.08},
        'nepal':                {city:'Kathmandu',         lat: 27.70, lon:  85.31},
        'netherlands':          {city:'Amsterdam',         lat: 52.37, lon:   4.90},
        'new zealand':          {city:'Auckland',          lat:-36.86, lon: 174.77},
        'nigeria':              {city:'Lagos',             lat:  6.52, lon:   3.38},
        'north macedonia':      {city:'Skopje',            lat: 41.99, lon:  21.43},
        'norway':               {city:'Oslo',              lat: 59.91, lon:  10.75},
        'oman':                 {city:'Muscat',            lat: 23.61, lon:  58.59},
        'pakistan':             {city:'Islamabad',         lat: 33.72, lon:  73.04},
        'panama':               {city:'Panama City',       lat:  8.99, lon: -79.52},
        'paraguay':             {city:'Asunción',          lat:-25.29, lon: -57.65},
        'peru':                 {city:'Lima',              lat:-12.05, lon: -77.04},
        'philippines':          {city:'Manila',            lat: 14.60, lon: 120.98},
        'poland':               {city:'Warsaw',            lat: 52.23, lon:  21.01},
        'portugal':             {city:'Lisbon',            lat: 38.72, lon:  -9.14},
        'qatar':                {city:'Doha',              lat: 25.29, lon:  51.53},
        'romania':              {city:'Bucharest',         lat: 44.43, lon:  26.10},
        'russia':               {city:'Moscow',            lat: 55.75, lon:  37.62},
        'saudi arabia':         {city:'Riyadh',            lat: 24.69, lon:  46.72},
        'senegal':              {city:'Dakar',             lat: 14.72, lon: -17.47},
        'serbia':               {city:'Belgrade',          lat: 44.80, lon:  20.46},
        'singapore':            {city:'Singapore',         lat:  1.35, lon: 103.82},
        'slovakia':             {city:'Bratislava',        lat: 48.15, lon:  17.11},
        'slovenia':             {city:'Ljubljana',         lat: 46.05, lon:  14.51},
        'south africa':         {city:'Johannesburg',      lat:-26.20, lon:  28.04},
        'south korea':          {city:'Seoul',             lat: 37.57, lon: 126.98},
        'spain':                {city:'Madrid',            lat: 40.42, lon:  -3.70},
        'sri lanka':            {city:'Colombo',           lat:  6.92, lon:  79.86},
        'sweden':               {city:'Stockholm',         lat: 59.33, lon:  18.07},
        'switzerland':          {city:'Zurich',            lat: 47.38, lon:   8.54},
        'taiwan':               {city:'Taipei',            lat: 25.05, lon: 121.53},
        'tajikistan':           {city:'Dushanbe',          lat: 38.56, lon:  68.77},
        'tanzania':             {city:'Dar es Salaam',     lat: -6.79, lon:  39.21},
        'thailand':             {city:'Bangkok',           lat: 13.75, lon: 100.52},
        'tunisia':              {city:'Tunis',             lat: 36.82, lon:  10.17},
        'turkey':               {city:'Istanbul',          lat: 41.01, lon:  28.95},
        'ukraine':              {city:'Kyiv',              lat: 50.45, lon:  30.52},
        'united arab emirates': {city:'Dubai',             lat: 25.20, lon:  55.27},
        'united kingdom':       {city:'London',            lat: 51.51, lon:  -0.13},
        'united states':        {city:'New York',          lat: 40.71, lon: -74.01},
        'uruguay':              {city:'Montevideo',        lat:-34.90, lon: -56.19},
        'uzbekistan':           {city:'Tashkent',          lat: 41.30, lon:  69.27},
        'venezuela':            {city:'Caracas',           lat: 10.48, lon: -66.86},
        'vietnam':              {city:'Ho Chi Minh City',  lat: 10.82, lon: 106.63},
        'zimbabwe':             {city:'Harare',            lat:-17.83, lon:  31.05},
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

    /* ── Major world cities [name, lat, lon, country-key] ── */
    const CITIES = [
        {n:'Tokyo',lat:35.68,lon:139.69,c:'japan'},{n:'Delhi',lat:28.66,lon:77.23,c:'india'},
        {n:'Shanghai',lat:31.23,lon:121.47,c:'china'},{n:'São Paulo',lat:-23.55,lon:-46.63,c:'brazil'},
        {n:'Mexico City',lat:19.43,lon:-99.13,c:'mexico'},{n:'Cairo',lat:30.04,lon:31.24,c:'egypt'},
        {n:'Mumbai',lat:19.08,lon:72.88,c:'india'},{n:'Beijing',lat:39.90,lon:116.41,c:'china'},
        {n:'Osaka',lat:34.69,lon:135.50,c:'japan'},{n:'New York',lat:40.71,lon:-74.01,c:'united states'},
        {n:'Karachi',lat:24.86,lon:67.01,c:'pakistan'},{n:'Buenos Aires',lat:-34.61,lon:-58.38,c:'argentina'},
        {n:'Istanbul',lat:41.01,lon:28.95,c:'turkey'},{n:'Kolkata',lat:22.57,lon:88.36,c:'india'},
        {n:'Manila',lat:14.60,lon:120.98,c:'philippines'},{n:'Lagos',lat:6.52,lon:3.38,c:'nigeria'},
        {n:'Rio de Janeiro',lat:-22.91,lon:-43.17,c:'brazil'},{n:'Kinshasa',lat:-4.32,lon:15.32,c:''},
        {n:'Los Angeles',lat:34.05,lon:-118.24,c:'united states'},{n:'Moscow',lat:55.75,lon:37.62,c:'russia'},
        {n:'Lahore',lat:31.55,lon:74.34,c:'pakistan'},{n:'Bangalore',lat:12.97,lon:77.59,c:'india'},
        {n:'Paris',lat:48.85,lon:2.35,c:'france'},{n:'Jakarta',lat:-6.21,lon:106.85,c:'indonesia'},
        {n:'Chennai',lat:13.08,lon:80.27,c:'india'},{n:'Lima',lat:-12.05,lon:-77.04,c:'peru'},
        {n:'Bangkok',lat:13.75,lon:100.52,c:'thailand'},{n:'Seoul',lat:37.57,lon:126.98,c:'south korea'},
        {n:'London',lat:51.51,lon:-0.13,c:'united kingdom'},{n:'Tehran',lat:35.69,lon:51.39,c:'iran'},
        {n:'Chicago',lat:41.88,lon:-87.63,c:'united states'},{n:'Ho Chi Minh City',lat:10.82,lon:106.63,c:'vietnam'},
        {n:'Luanda',lat:-8.84,lon:13.23,c:'angola'},{n:'Kuala Lumpur',lat:3.15,lon:101.69,c:'malaysia'},
        {n:'Hong Kong',lat:22.32,lon:114.17,c:'hong kong'},{n:'Riyadh',lat:24.69,lon:46.72,c:'saudi arabia'},
        {n:'Baghdad',lat:33.34,lon:44.40,c:'iraq'},{n:'Santiago',lat:-33.46,lon:-70.65,c:'chile'},
        {n:'Singapore',lat:1.35,lon:103.82,c:'singapore'},{n:'Johannesburg',lat:-26.20,lon:28.04,c:'south africa'},
        {n:'Berlin',lat:52.52,lon:13.40,c:'germany'},{n:'Bogotá',lat:4.71,lon:-74.07,c:'colombia'},
        {n:'Alexandria',lat:31.22,lon:29.96,c:'egypt'},{n:'Nairobi',lat:-1.29,lon:36.82,c:'kenya'},
        {n:'Casablanca',lat:33.59,lon:-7.62,c:'morocco'},{n:'Ankara',lat:39.91,lon:32.86,c:'turkey'},
        {n:'Taipei',lat:25.05,lon:121.53,c:'taiwan'},{n:'Sydney',lat:-33.87,lon:151.21,c:'australia'},
        {n:'Melbourne',lat:-37.81,lon:144.96,c:'australia'},{n:'Madrid',lat:40.42,lon:-3.70,c:'spain'},
        {n:'Rome',lat:41.90,lon:12.50,c:'italy'},{n:'Amsterdam',lat:52.37,lon:4.90,c:'netherlands'},
        {n:'Dubai',lat:25.20,lon:55.27,c:'united arab emirates'},{n:'Cape Town',lat:-33.93,lon:18.42,c:'south africa'},
        {n:'Toronto',lat:43.65,lon:-79.38,c:'canada'},{n:'Addis Ababa',lat:9.03,lon:38.74,c:'ethiopia'},
        {n:'Dar es Salaam',lat:-6.79,lon:39.21,c:'tanzania'},{n:'Havana',lat:23.14,lon:-82.36,c:'cuba'},
        {n:'Colombo',lat:6.92,lon:79.86,c:'sri lanka'},{n:'Barcelona',lat:41.39,lon:2.16,c:'spain'},
        {n:'Munich',lat:48.14,lon:11.58,c:'germany'},{n:'Milan',lat:45.46,lon:9.19,c:'italy'},
        {n:'Warsaw',lat:52.23,lon:21.01,c:'poland'},{n:'Stockholm',lat:59.33,lon:18.07,c:'sweden'},
        {n:'Vienna',lat:48.21,lon:16.37,c:'austria'},{n:'Brussels',lat:50.85,lon:4.35,c:'belgium'},
        {n:'Lisbon',lat:38.72,lon:-9.14,c:'portugal'},{n:'Prague',lat:50.08,lon:14.44,c:'czech republic'},
        {n:'Budapest',lat:47.50,lon:19.04,c:'hungary'},{n:'Athens',lat:37.98,lon:23.73,c:'greece'},
        {n:'Kyiv',lat:50.45,lon:30.52,c:'ukraine'},{n:'Helsinki',lat:60.17,lon:24.94,c:'finland'},
        {n:'Oslo',lat:59.91,lon:10.75,c:'norway'},{n:'Copenhagen',lat:55.68,lon:12.57,c:'denmark'},
        {n:'Zurich',lat:47.38,lon:8.54,c:'switzerland'},{n:'Dublin',lat:53.33,lon:-6.25,c:'ireland'},
        {n:'Doha',lat:25.29,lon:51.53,c:'qatar'},{n:'Tel Aviv',lat:32.09,lon:34.79,c:'israel'},
        {n:'Amman',lat:31.95,lon:35.93,c:'jordan'},{n:'Kuwait City',lat:29.37,lon:47.98,c:'kuwait'},
        {n:'Muscat',lat:23.61,lon:58.59,c:'oman'},{n:'Tashkent',lat:41.30,lon:69.27,c:'uzbekistan'},
        {n:'Baku',lat:40.41,lon:49.87,c:'azerbaijan'},{n:'Tbilisi',lat:41.69,lon:44.83,c:'georgia'},
        {n:'San Francisco',lat:37.77,lon:-122.42,c:'united states'},{n:'Houston',lat:29.76,lon:-95.37,c:'united states'},
        {n:'Miami',lat:25.77,lon:-80.19,c:'united states'},{n:'Vancouver',lat:49.25,lon:-123.12,c:'canada'},
        {n:'Montreal',lat:45.50,lon:-73.57,c:'canada'},{n:'Caracas',lat:10.48,lon:-66.86,c:'venezuela'},
        {n:'Auckland',lat:-36.86,lon:174.77,c:'new zealand'},{n:'Islamabad',lat:33.72,lon:73.04,c:'pakistan'},
        {n:'Kathmandu',lat:27.70,lon:85.31,c:'nepal'},{n:'Accra',lat:5.56,lon:-0.20,c:'ghana'},
        {n:'Abidjan',lat:5.36,lon:-4.01,c:'ivory coast'},{n:'Bucharest',lat:44.43,lon:26.10,c:'romania'},
        {n:'Minsk',lat:53.90,lon:27.57,c:'belarus'},{n:'Yerevan',lat:40.18,lon:44.51,c:'armenia'},
        {n:'Naypyidaw',lat:19.74,lon:96.08,c:''},{n:'Phnom Penh',lat:11.56,lon:104.93,c:'cambodia'},
        {n:'Vientiane',lat:17.97,lon:102.61,c:''},{n:'Ulaanbaatar',lat:47.91,lon:106.92,c:'mongolia'},
        {n:'Nur-Sultan',lat:51.18,lon:71.45,c:'kazakhstan'},{n:'Almaty',lat:43.22,lon:76.85,c:'kazakhstan'},
    ];

    /* ── City lookup: lowercase name → { displayCity, flag, lat, lon } ── */
    const CITY_LOOKUP = (() => {
        const map = {};
        for (const ci of CITIES) {
            map[ci.n.toLowerCase()] = { displayCity: ci.n, flag: FLAGS[ci.c] || '🌐', lat: ci.lat, lon: ci.lon };
        }
        // Add capitals not already covered
        for (const [country, cap] of Object.entries(CAPITALS)) {
            const key = cap.city.toLowerCase();
            if (!map[key]) map[key] = { displayCity: cap.city, flag: FLAGS[country] || '🌐', lat: cap.lat, lon: cap.lon };
        }
        return map;
    })();

    /* ── Internal state ───────────────────────────────── */
    let scene, camera, renderer, globeMesh;
    let globeMarkers = {};  // { countryKey: { mesh, glow, rank } }
    let cityMarkers  = [];  // [{ dot, label }]
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

    /* ── Canvas sprite label for city names ──────────── */
    function makeLabel(text) {
        const canvas = document.createElement('canvas');
        const ctx    = canvas.getContext('2d');
        const font   = 'bold 20px Inter, Arial, sans-serif';
        ctx.font     = font;
        const tw     = Math.ceil(ctx.measureText(text).width);
        canvas.width  = tw + 20;
        canvas.height = 32;
        ctx.font      = font;
        ctx.fillStyle = 'rgba(4,12,36,0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#cce8ff';
        ctx.fillText(text, 10, 24);
        const tex    = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(
            new THREE.SpriteMaterial({ map: tex, transparent: true })
        );
        const aspect = canvas.width / canvas.height;
        sprite.scale.set(aspect * 0.052, 0.052, 1);
        return sprite;
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
        camera = new THREE.PerspectiveCamera(42, W / H, 0.005, 100);
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

        /* Load earth texture from local assets */
        const baseUrl = document.querySelector('meta[name="base-url"]').content.replace(/\/$/, '');
        const loader  = new THREE.TextureLoader();
        loader.load(
            `${baseUrl}/assets/textures/earth.jpg`,
            tex => {
                mat.map = tex; mat.color.set(0xffffff); mat.needsUpdate = true;
                const hint = document.getElementById('globe-overlay-hint');
                if (hint) hint.classList.add('goh-hidden');
            }
        );
        loader.load(
            `${baseUrl}/assets/textures/earth_specular.jpg`,
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
            camera.position.z = Math.max(1.005, Math.min(8,
                camera.position.z + e.deltaY * 0.001 * camera.position.z));
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
            /* City DOM labels: project 3-D position → screen coordinates */
            const z  = camera.position.z;
            const cW = renderer.domElement.clientWidth;
            const cH = renderer.domElement.clientHeight;
            const showLabels = z < 1.9;
            const _v = new THREE.Vector3();
            for (const m of cityMarkers) {
                /* world position of dot after globe rotation */
                _v.copy(m.dot.position);
                globeMesh.localToWorld(_v);
                /* hide dots/labels on back hemisphere */
                const onFront = _v.z > 0.04;
                m.dot.visible = onFront;
                if (!showLabels || !onFront) { m.el.style.display = 'none'; continue; }
                /* project to canvas pixels */
                _v.project(camera);
                const sx = ( _v.x * 0.5 + 0.5) * cW;
                const sy = (-_v.y * 0.5 + 0.5) * cH;
                m.el.style.display = 'block';
                m.el.style.left    = sx + 'px';
                m.el.style.top     = sy + 'px';
            }
            renderer.render(scene, camera);
        })();

        initCities();
        ready = true;
    }

    /* ── Populate city dots + DOM labels on the globe ── */
    function initCities() {
        const overlay = document.getElementById('city-label-overlay');
        if (!overlay) return;
        for (const city of CITIES) {
            const dot = new THREE.Mesh(
                new THREE.SphereGeometry(0.007, 6, 6),
                new THREE.MeshBasicMaterial({ color: 0x88ccff })
            );
            dot.position.copy(latLonToVec3(city.lat, city.lon, 1.018));
            globeMesh.add(dot);

            const el = document.createElement('div');
            el.className = 'city-label';
            el.textContent = city.n;
            el.style.display = 'none';
            overlay.appendChild(el);

            cityMarkers.push({ dot, el });
        }
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
        const SIZES  = [0.014,   0.012,   0.010,   0.009,   0.008,
                        0.007,   0.007,   0.006,   0.006,   0.006];

        sorted.forEach(([key, data], i) => {
            if (!data.lat || !data.lon) return;

            const rank  = i + 1;
            const color = COLORS[i] || 0x7EC8E3;
            const size  = SIZES[i]  || 0.014;
            const pos   = latLonToVec3(data.lat, data.lon, 1.015);

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

            globeMarkers[key] = { mesh, glow, rank };
        });
    }

    /* ── Parse bot response → { cityKey: points } ──────── */
    function parseResponse(text) {
        const scores = {};

        /* Resolve a name (city or country) → city lookup key */
        function resolve(name) {
            const lo = name.trim().toLowerCase();
            if (CITY_LOOKUP[lo]) return lo;                       // direct city match
            const cap = CAPITALS[lo];
            if (cap) return cap.city.toLowerCase();               // country → capital
            return null;
        }

        function add(key, pts) {
            if (key) scores[key] = (scores[key] || 0) + pts;
        }

        /* "1. Name (score)" — top-N list (city or country) */
        const reTop = /^\s*(\d+)\.\s+([A-Za-z][A-Za-z ()'\-.]+?)\s+\(([\d.]+)\)\s*$/gm;
        let m;
        while ((m = reTop.exec(text)) !== null) {
            const rank = parseInt(m[1]);
            if (rank <= 10) add(resolve(m[2]), ([100,80,65,50,40,30,25,20,18,15][rank-1] || 10));
        }

        /* "1. City, Country (score/5)" — top-N city list */
        const reCityTop = /^\s*(\d+)\.\s+([^,\n]+),\s+([A-Za-z][A-Za-z ]+?)\s+\(([\d.]+)\/5\)\s*$/gm;
        while ((m = reCityTop.exec(text)) !== null) {
            const pts = Math.round(parseFloat(m[4]) * 12);
            add(resolve(m[2]) || resolve(m[3]), pts);
        }

        /* "1. City, Country - Budget - score/5" — recommendations */
        const reRec = /^\s*(\d+)\.\s+([^,\n]+),\s+([A-Za-z][A-Za-z ]+?)\s+-\s+\w+\s+-\s+([\d.]+)\/5/gm;
        while ((m = reRec.exec(text)) !== null) {
            const pts = Math.round(parseFloat(m[4]) * 12);
            add(resolve(m[2]) || resolve(m[3]), pts);
        }

        /* "Name - metric..." — single entity summary */
        const reSummary = /^([A-Z][A-Za-z][A-Za-z ]+?)\s+-\s+[\w ]+$/m;
        const sumM = reSummary.exec(text);
        if (sumM) {
            const qM = /Quality of life index:\s*([\d.]+)/.exec(text);
            add(resolve(sumM[1]), qM ? Math.round(parseFloat(qM[1]) * 0.35) : 25);
        }

        /* "Best option: Name" — comparison winner */
        const reWinner = /Best option:\s*([A-Z][A-Za-z ]+?)(?:[\n.!]|$)/g;
        while ((m = reWinner.exec(text)) !== null) add(resolve(m[1]), 35);

        /* "- Name: score" — comparison sides */
        const reComp = /^-\s+([A-Z][A-Za-z ]+?):\s*[\d.]+/gm;
        while ((m = reComp.exec(text)) !== null) add(resolve(m[1]), 15);

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

        list.innerHTML = sorted.map(([key, data], i) => {
            const rank  = i + 1;
            const medal = rank <= 3
                ? medals[i]
                : `<span class="rank-num">${rank}</span>`;
            const pct   = Math.round((data.score / maxScore) * 100);
            const cls   = rank <= 3 ? `rank-${rank}` : 'rank-rest';

            return `<div class="rank-item ${cls}" data-country="${key}">
                <div class="rank-medal">${medal}</div>
                <div class="rank-info">
                    <div class="rank-name">${data.flag} ${data.displayCity}</div>
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

        for (const [cityKey, pts] of Object.entries(newScores)) {
            const info = CITY_LOOKUP[cityKey];
            if (!info) continue;
            if (!ranking[cityKey]) ranking[cityKey] = { score: 0, hits: 0, ...info };
            ranking[cityKey].score += pts;
            ranking[cityKey].hits  += 1;
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

    /* Ensure typing indicator is hidden on load (survives bfcache) */
    typing.style.display = 'none';

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
        typing.style.display = on ? 'flex' : 'none';
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
