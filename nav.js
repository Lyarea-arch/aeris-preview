// Menú móvil (≤1100 px): el botón muestra/oculta enlaces y botones de la cabecera.
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav').forEach((nav) => {
      const btn = nav.querySelector('.nav-toggle');
      if (!btn) return;
      const setOpen = (open) => {
        nav.classList.toggle('nav-open', open);
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      };
      btn.addEventListener('click', () => setOpen(!nav.classList.contains('nav-open')));
      nav.querySelectorAll('.nav-menu a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    });
  });
})();

// Portada: cabecera transparente sobre la foto del hero; oscura en cuanto se empieza a bajar
// (si no, los enlaces del menú se montarían sobre el titular).
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const hero = document.querySelector('.hero');
    if (!nav || !hero) return;
    document.body.classList.add('nav-over');
    const update = () => nav.classList.toggle('nav-clear', window.scrollY < 40);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();

// Botón «volver arriba»: aparece tras bajar una pantalla. En la portada, en escritorio,
// lo sustituye el índice de secciones (ver CSS: .has-section-index).
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'to-top';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(btn);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
    const update = () => btn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', update, { passive: true });
    update();
  });
})();

// Índice de secciones de la portada (como BMW): marca la sección visible.
// El HTML ya funciona solo (enlaces a #anclas); esto solo añade el punto activo.
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const index = document.getElementById('section-index');
    if (!index) return;
    document.body.classList.add('has-section-index');
    const links = [...index.querySelectorAll('a')];
    const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const setActive = (id) => links.forEach((a) => {
      const on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    // Activa la última sección cuyo inicio ya pasó la línea a un tercio de la pantalla.
    const update = () => {
      const line = window.innerHeight / 3;
      let current = sections[0];
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= line) current = s; });
      // Al final de la página, la última sección (puede ser más baja que la línea).
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = sections[sections.length - 1];
      setActive(current.id);
    };
    window.addEventListener('scroll', update, { passive: true });   // 9 secciones: cálculo trivial
    window.addEventListener('resize', update);
    update();
  });
})();
