// Carrusel de obras Aeris (vanilla JS).
// Para usar fotos reales: añade `img: 'obras/01.jpg'` a cada obra. Sin `img`
// se dibuja una ilustración de reserva (`art`: rect | insul | spiral | hood | fittings).
// Textos de EJEMPLO: se sustituyen por obras reales de Aeris.

(function () {
  const OBRAS = [
    { cat: 'Industrial', year: '[Año]', title: 'Nave logística — red de impulsión', place: '[Localidad]',
      text: 'Red de impulsión y retorno para una nave de almacenaje: tramos rectos, codos y derivaciones fabricados a medida y entregados por fases.',
      specs: 'Conducto rectangular · galvanizado 0,8 mm', art: 'rect' },
    { cat: 'Oficinas', year: '[Año]', title: 'Edificio de oficinas — climatización por plantas', place: '[Localidad]',
      text: 'Conductos con aislamiento para tres plantas de oficinas, con piezas numeradas por zona para agilizar el montaje en obra.',
      specs: 'Rectangular con aislamiento · galvanizado 0,6 mm', art: 'insul' },
    { cat: 'Comercial', year: '[Año]', title: 'Local comercial — extracción', place: '[Localidad]',
      text: 'Tramos circulares y codos segmentados para la extracción de un local a pie de calle, con salida a cubierta.',
      specs: 'Conducto circular · galvanizado', art: 'spiral' },
    { cat: 'Hostelería', year: '[Año]', title: 'Cocina industrial — campana y extracción', place: '[Localidad]',
      text: 'Campana y conducto de extracción en acero inoxidable, fabricados a la medida del espacio disponible en cocina.',
      specs: 'Inoxidable · 1,0 mm', art: 'hood' },
    { cat: 'Residencial', year: '[Año]', title: 'Vivienda unifamiliar — ventilación', place: '[Localidad]',
      text: 'Red de ventilación de doble flujo con conductos circulares de pequeño diámetro y reducciones a medida.',
      specs: 'Circular Ø160–Ø250 · galvanizado', art: 'spiral' },
    { cat: 'Piezas especiales', year: '[Año]', title: 'Transiciones y piezas a plano', place: 'Taller Aeris',
      text: 'Transiciones rectangular–circular, pantalones y codos de reducción fabricados a partir del plano del instalador.',
      specs: 'Según plano · galvanizado / inoxidable', art: 'fittings' },
  ];

  // Conducto rectangular visto de lado, colgado del techo, con derivación a un difusor.
  function sideDuct(p, fill, seam, foil) {
    const flanges = [60, 220, 380, 540, 700].map((x) => foil
      ? `<path d="M${x} 180 q6 50 0 100" stroke="${seam}" stroke-width="2" fill="none" opacity=".5"/>`
      : `<rect x="${x}" y="172" width="10" height="116" fill="#C6D0D7" opacity=".55"/>`).join('');
    return `<rect width="800" height="500" fill="url(#${p}b)"/>
        <rect width="800" height="70" fill="#12181C"/>
        <g stroke="#1F272D" stroke-width="2">${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="${40 + i * 150}" y1="0" x2="${40 + i * 150}" y2="70"/>`).join('')}</g>
        <g stroke="#8996A0" stroke-width="3">${[140, 300, 460, 620].map((x) => `<line x1="${x}" y1="70" x2="${x}" y2="180"/><line x1="${x - 14}" y1="${foil ? 184 : 178}" x2="${x + 14}" y2="${foil ? 184 : 178}"/>`).join('')}</g>
        <rect x="-10" y="180" width="820" height="100" fill="${fill}"/>
        ${flanges}
        <rect x="500" y="280" width="90" height="90" fill="${fill}"/>
        <rect x="470" y="370" width="150" height="16" fill="#39434B"/>
        <g stroke="#8996A0" stroke-width="2">${[0, 1, 2, 3, 4].map((i) => `<line x1="${484 + i * 30}" y1="372" x2="${484 + i * 30}" y2="384"/>`).join('')}</g>
        <g stroke="#4CC3E6" stroke-width="3" fill="none" stroke-linecap="round"><path d="M500 410 C490 430 470 440 450 460" opacity=".8"/><path d="M545 410 V465" opacity=".6"/><path d="M590 410 C600 430 620 440 640 460" opacity=".8"/></g>`;
  }

  // Ilustraciones de reserva (hasta tener fotos). `p` = prefijo único para ids.
  function art(kind, p) {
    const metal = `<linearGradient id="${p}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4F5B64"/><stop offset=".3" stop-color="#C6D0D7"/><stop offset=".6" stop-color="#8996A0"/><stop offset="1" stop-color="#39434B"/></linearGradient>`;
    const foilG = `<linearGradient id="${p}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9AA1A6"/><stop offset=".35" stop-color="#E4E8EA"/><stop offset=".7" stop-color="#B5BCC1"/><stop offset="1" stop-color="#7C848A"/></linearGradient>`;
    const bg = `<linearGradient id="${p}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A2126"/><stop offset="1" stop-color="#0A0E10"/></linearGradient>`;
    const scenes = {
      rect: sideDuct(p, `url(#${p}m)`, '#0D1114'),
      insul: sideDuct(p, `url(#${p}f)`, '#8A8F93', true),
      spiral: `<rect width="800" height="500" fill="url(#${p}b)"/>
        <rect x="0" y="380" width="800" height="120" fill="#12181C"/>
        <rect x="60" y="170" width="620" height="130" fill="url(#${p}m)"/>
        <g stroke="#0D1114" stroke-opacity=".35" stroke-width="2">${Array.from({ length: 16 }, (_, i) => `<line x1="${80 + i * 38}" y1="170" x2="${104 + i * 38}" y2="300"/>`).join('')}</g>
        <path d="M680 170 A26 65 0 0 1 680 300 Z" fill="#4A565F"/>
        <ellipse cx="60" cy="235" rx="26" ry="65" fill="#0A0D0F" stroke="#C6D0D7" stroke-width="5"/>
        <g stroke="#8996A0" stroke-width="3" fill="none"><path d="M200 0 V160"/><path d="M500 0 V160"/></g>
        <g fill="none" stroke="#C6D0D7" stroke-width="4"><path d="M188 164 H212"/><path d="M488 164 H512"/></g>
        <path d="M-10 200 C-40 180 -60 250 -90 230" stroke="#4CC3E6" stroke-width="3" fill="none"/>`,
      hood: `<rect width="800" height="500" fill="url(#${p}b)"/>
        <rect x="0" y="400" width="800" height="100" fill="#12181C"/>
        <rect x="120" y="360" width="560" height="40" fill="#1F272D"/>
        <rect x="350" y="0" width="100" height="150" fill="url(#${p}m)"/>
        <polygon points="200,260 600,260 520,150 280,150" fill="url(#${p}m)"/>
        <rect x="190" y="260" width="420" height="22" fill="#8996A0"/>
        <g stroke="#0D1114" stroke-opacity=".3" stroke-width="2"><line x1="400" y1="0" x2="400" y2="150"/><line x1="400" y1="150" x2="400" y2="260"/></g>
        <g stroke="#4CC3E6" stroke-width="3" fill="none" opacity=".8"><path d="M330 330 C340 310 320 300 330 285"/><path d="M400 335 C410 315 390 305 400 290"/><path d="M470 330 C480 310 460 300 470 285"/></g>`,
      fittings: `<rect width="800" height="500" fill="url(#${p}b)"/>
        <rect x="0" y="390" width="800" height="110" fill="#12181C"/>
        <path d="M150 390 L150 280 A90 90 0 0 1 240 190 L400 190" fill="none" stroke="url(#${p}m)" stroke-width="90"/>
        <rect x="100" y="386" width="100" height="10" fill="#39434B"/>
        <polygon points="480,190 700,230 700,320 480,360" fill="url(#${p}m)"/>
        <ellipse cx="700" cy="275" rx="16" ry="45" fill="#0A0D0F" stroke="#C6D0D7" stroke-width="4"/>
        <rect x="440" y="186" width="16" height="178" fill="#39434B"/>
        <g stroke="#4CC3E6" stroke-width="1.5"><line x1="480" y1="120" x2="700" y2="120"/><line x1="480" y1="112" x2="480" y2="128"/><line x1="700" y1="112" x2="700" y2="128"/></g>`,
    };
    return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${metal}${foilG}${bg}</defs>${scenes[kind] || scenes.rect}</svg>`;
  }

  function slideHtml(o, i, idPrefix = 'ob') {
    const media = o.img
      ? `<img src="${o.img}" alt="${o.title}" loading="lazy">`
      : `${art(o.art, idPrefix + i)}<span class="obra-tag">Foto de obra</span>`;
    return `
      <article class="obra" role="group" aria-roledescription="obra" aria-label="${i + 1} de ${OBRAS.length}">
        <div class="obra-media">${media}</div>
        <div class="obra-body">
          <div class="obra-meta"><span class="obra-cat">${o.cat}</span><span>${o.place} · ${o.year}</span></div>
          <h3>${o.title}</h3>
          <p>${o.text}</p>
          <div class="obra-specs">${o.specs}</div>
          <a href="configurador.html" class="link-arrow">Pedir algo similar →</a>
        </div>
      </article>`;
  }

  // Página /obras: todas las obras en cuadrícula, con filtro por tipo.
  function initGrid() {
    const grid = document.getElementById('obras-grid');
    const filters = document.getElementById('obras-filters');
    if (!grid || !filters) return;
    const cats = ['Todas', ...new Set(OBRAS.map((o) => o.cat))];
    let current = 'Todas';
    function draw() {
      filters.innerHTML = cats.map((c) => `<button type="button" class="pill${c === current ? ' active' : ''}" aria-pressed="${c === current}" data-cat="${c}">${c}</button>`).join('');
      filters.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { current = b.dataset.cat; draw(); }));
      grid.innerHTML = OBRAS
        .map((o, i) => ({ o, i }))
        .filter(({ o }) => current === 'Todas' || o.cat === current)
        .map(({ o, i }) => slideHtml(o, i, 'og').replace('role="group" aria-roledescription="obra" aria-label="' + (i + 1) + ' de ' + OBRAS.length + '"', ''))
        .join('');
    }
    draw();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initGrid();
    const track = document.getElementById('obras-track');
    if (!track) return;
    const prev = document.getElementById('obras-prev');
    const next = document.getElementById('obras-next');
    const counter = document.getElementById('obras-counter');
    const dots = document.getElementById('obras-dots');

    track.innerHTML = OBRAS.map(slideHtml).join('');
    const slides = [...track.children];

    dots.innerHTML = slides.map((_, i) => `<button type="button" aria-label="Ir a la obra ${i + 1}"></button>`).join('');
    const dotBtns = [...dots.children];

    const step = () => slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
    // `target` = destino de la animación en curso, para que dos clics rápidos avancen dos obras.
    let target = null, targetTimer = 0, shown = 0;
    const goTo = (i) => {
      target = i;
      clearTimeout(targetTimer);
      targetTimer = setTimeout(() => { target = null; }, 700);
      track.scrollTo({ left: i * step(), behavior: 'smooth' });
    };
    const current = () => (target !== null ? target : Math.round(track.scrollLeft / step()));

    function update() {
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      const i = atEnd ? slides.length - 1 : Math.min(current(), slides.length - 1);
      shown = i;
      counter.textContent = `${String(i + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      dotBtns.forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = atEnd;
    }

    prev.addEventListener('click', () => goTo(Math.max(0, current() - 1)));
    next.addEventListener('click', () => goTo(Math.min(slides.length - 1, current() + 1)));
    dotBtns.forEach((b, k) => b.addEventListener('click', () => goTo(k)));
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
    });
    let raf = 0;
    track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); });
    // Al girar el móvil o redimensionar, se mantiene la misma obra a la vista.
    window.addEventListener('resize', () => {
      track.scrollTo({ left: shown * step(), behavior: 'auto' });
      update();
    });
    update();
  });
})();
