// Carrusel de obras Aeris (vanilla JS).
// Fotos reales: `img` (portada) y, opcional, `photos` (galería a pantalla completa).
// Fotos en obras/: versión grande + `-sm` (carrusel), sin metadatos (GPS) — ver README.
// Sin `img` se dibuja una ilustración de reserva (`art`: rect | insul | spiral | hood | fittings).
// Todas las obras son REALES (con fotos o, si aún no hay, ilustración + «Fotos próximamente»).
// Para añadir una: ver el MODELO al final de la lista.
// `home: true` = sale también en el carrusel de la página de inicio (3–6 obras; el resto solo en /obras).
// Año o lugar vacío = no se muestra (no inventamos datos que no tenemos).

(function () {
  // gallery('amazon', 4) → portada + fotos obras/amazon-01…04 (.jpg grande, -sm.jpg carrusel)
  function gallery(prefix, n) {
    const paths = Array.from({ length: n }, (_, i) => 'obras/' + prefix + '-' + String(i + 1).padStart(2, '0'));
    return { img: paths[0] + '-sm.jpg', photos: paths.map((p) => ({ src: p + '.jpg', thumb: p + '-sm.jpg' })) };
  }

  const OBRAS = [
    // Obras REALES. Automoción y el centro de innovación: el cliente no permite publicar el nombre.
    { cat: 'Automoción', year: '2026', title: 'Planta de automoción — climatización de naves y cubierta', place: 'Planta industrial',
      text: 'Un reto logístico y humano: grandes redes de conductos en cubierta y en el interior de las naves, con montaje a 15 m de altura. Una vez más, el equipo respondió con profesionalidad.',
      specs: '40.000 m² de chapa · 12.000 m² en aluminio · 9 ml de tubo circular · montaje a 15 m',
      ...gallery('automocion', 9), home: true },
    { cat: 'Automoción', year: '', title: 'Nave de automoción en Navarra — climatización', place: 'Navarra',
      text: 'Climatización de una nave para la automoción en Navarra. Sin ninguna complicación: otro día en la oficina.',
      specs: 'Conducto circular helicoidal y rectangular · montaje en altura con plataformas elevadoras',
      ...gallery('navarra', 14), home: true },
    { cat: 'Terciario', year: '', title: 'Centro de innovación — conductos circulares en atrio', place: '',
      text: 'El reto fue la dinámica de montaje: había que trabajar en varias zonas a la vez y en un plazo muy corto, así que empleamos maquinaria industrial de gran tonelaje. Terminamos en los plazos marcados por la dirección de obra, con un equipo que superó las expectativas.',
      specs: 'Conducto circular helicoidal de gran diámetro · montaje con grúa en varias zonas a la vez',
      ...gallery('innovacion', 8), home: true },
    { cat: 'Logística', year: '', title: 'Amazon Madrid — red de conductos de chapa', place: 'Madrid',
      text: 'Fabricación y montaje de la red de conductos de chapa galvanizada de una gran nave logística, que alimenta la distribución textil de la nave.',
      specs: 'Conducto rectangular · chapa galvanizada · fabricación y montaje',
      ...gallery('amazon', 4), home: true },
    { cat: 'Hospital', year: '', title: 'Hospital Gregorio Marañón — red de conductos en cubierta', place: 'Madrid',
      text: 'Red de conductos en la cubierta del Hospital General Universitario Gregorio Marañón: tramos rectangulares de gran sección y piezas a medida, parte de la red con aislamiento.',
      specs: 'Conducto rectangular de gran sección · aislamiento · piezas a medida',
      ...gallery('maranon', 5), home: true },
    { cat: 'Industrial', year: '', title: 'Schweppes Toledo — tótems de difusión', place: 'Toledo',
      text: 'Tótems de difusión fabricados por nosotros para la planta de Schweppes en Toledo: piezas de chapa a medida, acabadas en blanco y con toberas para repartir el aire en la nave de producción.',
      specs: 'Fabricación propia · chapa con acabado blanco · toberas de impulsión',
      ...gallery('toledo', 7), home: true },
    { cat: 'Taller', year: '', title: 'Fabricación en taller — piezas en serie', place: 'Taller Aeris Factory · Ajalvir',
      text: 'Piezas circulares fabricadas en serie en nuestro taller de Ajalvir, con las juntas selladas y listas para salir hacia la obra.',
      specs: 'Chapa galvanizada · juntas selladas · fabricación en serie',
      ...gallery('taller', 2) },
    { cat: 'Extracción', year: '', title: 'Extracción de garaje — empresa de seguridad', place: '',
      text: 'Red de extracción del garaje de una empresa de seguridad: conductos rectangulares de gran sección, cajas de ventilación y rejillas, montados bajo el forjado entre instalaciones existentes.',
      specs: 'Conducto rectangular de gran sección · cajas de ventilación · rejillas',
      ...gallery('garaje', 7) },
    { cat: 'Climatización', year: '', title: 'Conexionado de climatizadores en cubierta', place: '',
      text: 'Conductos de conexión entre los climatizadores de cubierta y la red del edificio: tramos rectangulares, codos y piezas de transición, parte de ellos con aislamiento.',
      specs: 'Conducto rectangular · aislamiento · piezas de transición',
      ...gallery('conexionado', 4) },
    { cat: 'Logística', year: '', title: 'Nave logística — conductos de gran sección en cubierta', place: '',
      text: 'Conductos de chapa de gran sección conectados a los climatizadores de una nave logística, sobre la plataforma técnica de cubierta.',
      specs: 'Conducto rectangular de gran sección · chapa galvanizada',
      ...gallery('logistica', 6) },
    { cat: 'Climatización', year: '', title: 'Un trabajo quirúrgico — conductos entre climatizadores', place: '',
      text: 'Redes de conductos encajadas al milímetro entre los climatizadores y la estructura de la cubierta: un trabajo quirúrgico.',
      specs: 'Conducto rectangular · piezas a medida',
      ...gallery('quirurgico', 4) },
    // Antes y después: portada = «después»; en la galería, primero «antes».
    { cat: 'Reforma', year: '', title: 'Antes y después — siempre mejoramos las cosas', place: '',
      text: 'Los usuarios de la oficina habían improvisado un conducto de cartón; lo sustituimos por un conducto de chapa hecho a medida. Siempre mejoramos las cosas.',
      specs: 'Conducto rectangular a medida',
      ...gallery('antes-despues', 2), img: 'obras/antes-despues-02-sm.jpg' },
    { cat: 'Oficinas', year: '', title: 'Oficinas — climatización con conductos vistos', place: '',
      text: 'Climatización de unas oficinas con techo visto: conductos rectangulares, difusores rotacionales y conexiones flexibles.',
      specs: 'Conducto rectangular · difusores rotacionales',
      ...gallery('oficina', 4) },
    { cat: 'Cubierta', year: '', title: 'Salidas a cubierta con impermeabilización', place: '',
      text: 'Salidas de conductos a cubierta con su impermeabilización correspondiente: piezas de chapa a medida, rematadas para que el agua no entre.',
      specs: 'Chapa galvanizada · piezas a medida · remates de impermeabilización',
      ...gallery('cubierta', 4) },
    // Real, todavía sin fotos (Ingrid las busca): ilustración + «Fotos próximamente».
    { cat: 'Deportivo', year: '', title: 'Estadio Santiago Bernabéu — ventilación de la zona VIP', place: 'Madrid',
      text: 'Ventilación de la zona VIP del Estadio Santiago Bernabéu, del Real Madrid.',
      specs: '', art: 'rect' },
    /* ── MODELO para una obra nueva (NO se muestra: está comentado). ──
       Lo que hay que pedir a Nicu por cada obra (lo que falte se deja '' y no se muestra):
       { cat:   'Industrial',            // tipo: Industrial, Logística, Oficinas, Hospital, Terciario…
         year:  '2026',                  // año de la obra
         place: 'Torrejón de Ardoz',     // localidad (o '' si el cliente no quiere que se sepa)
         title: 'Cliente u obra — qué se hizo',   // ¿se puede nombrar al cliente? si no: «Nave logística — …»
         text:  'Qué hizo Aeris (¿fabricación, montaje o ambos?), el reto de la obra y cómo se resolvió.',
         specs: '12.000 m² de chapa · galvanizado 0,8 mm · aislamiento 30 mm · plazo 6 semanas',
                                          // cifras: m² de chapa, materiales/espesores, aislamiento, altura, plazo
         ...gallery('prefijo', 6) },      // fotos en obras/prefijo-01…06.jpg (+ -sm), sin caras ni matrículas
       Sin fotos todavía: en vez de `...gallery()`, poner art: 'rect' | 'insul' | 'spiral' | 'hood' | 'fittings'
       (ilustración + etiqueta «Fotos próximamente», como el Bernabéu). */
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
    let media = o.img
      ? `<img src="${o.img}" alt="${o.title}" loading="lazy">`
      : `${art(o.art, idPrefix + i)}<span class="obra-tag">Fotos próximamente</span>`;
    if (o.photos) {
      media = `<button type="button" class="obra-gallery-btn" data-obra="${i}" aria-label="Ver las ${o.photos.length} fotos de ${o.title}">
        ${media}<span class="obra-tag obra-tag-photos">${o.photos.length} fotos</span></button>`;
    }
    return `
      <article class="obra" role="group" aria-roledescription="obra" aria-label="${i + 1} de ${OBRAS.length}">
        <div class="obra-media">${media}</div>
        <div class="obra-body">
          <div class="obra-meta"><span class="obra-cat">${o.cat}</span><span>${[o.place, o.year].filter(Boolean).join(" · ")}</span></div>
          <h3>${o.title}</h3>
          <p>${o.text}</p>
          ${o.specs ? `<div class="obra-specs">${o.specs}</div>` : ""}
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

  // Galería a pantalla completa (<dialog>: Esc cierra; flechas ← → cambian de foto).
  function initGallery() {
    const dlg = document.createElement('dialog');
    dlg.className = 'gallery';
    dlg.innerHTML = `
      <button type="button" class="gallery-close" aria-label="Cerrar">×</button>
      <img alt="">
      <div class="gallery-nav">
        <button type="button" class="carousel-arrow gallery-prev" aria-label="Foto anterior">←</button>
        <span class="gallery-count" aria-live="polite"></span>
        <button type="button" class="carousel-arrow gallery-next" aria-label="Foto siguiente">→</button>
      </div>`;
    document.body.appendChild(dlg);
    const img = dlg.querySelector('img');
    let photos = [], k = 0, title = '';
    const show = () => {
      img.src = photos[k].src;
      img.alt = `${title} — foto ${k + 1} de ${photos.length}`;
      dlg.querySelector('.gallery-count').textContent = `${k + 1} / ${photos.length}`;
    };
    const move = (d) => { k = (k + d + photos.length) % photos.length; show(); };
    dlg.querySelector('.gallery-prev').addEventListener('click', () => move(-1));
    dlg.querySelector('.gallery-next').addEventListener('click', () => move(1));
    dlg.querySelector('.gallery-close').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });   // clic fuera de la foto
    dlg.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    });
    // Delegado: sirve para el carrusel y para la cuadrícula (que se redibuja al filtrar).
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.obra-gallery-btn');
      if (!btn) return;
      const o = OBRAS[+btn.dataset.obra];
      photos = o.photos; title = o.title; k = 0;
      show();
      dlg.showModal();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initGrid();
    initGallery();
    const track = document.getElementById('obras-track');
    if (!track) return;
    const prev = document.getElementById('obras-prev');
    const next = document.getElementById('obras-next');
    const counter = document.getElementById('obras-counter');
    const dots = document.getElementById('obras-dots');

    // Solo las obras con `home: true`; `i` (índice en OBRAS) sigue sirviendo para abrir su galería.
    const home = OBRAS.map((o, i) => ({ o, i })).filter(({ o }) => o.home);
    track.innerHTML = home
      .map(({ o, i }, k) => slideHtml(o, i).replace(`aria-label="${i + 1} de ${OBRAS.length}"`, `aria-label="${k + 1} de ${home.length}"`))
      .join('');
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
