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
