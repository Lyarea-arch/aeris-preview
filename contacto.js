// Mapa de Google bajo demanda: el iframe solo se crea cuando el visitante pulsa «Mostrar mapa».
// Antes de eso la página no se conecta a Google (sin IP ni cookies de terceros → sin banner de cookies).

(function () {
  // URL de inserción directa (la de /maps?…&output=embed redirige aquí).
  const MAP_URL = 'https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sCalle+Guadiana+36,+28864+Ajalvir,+Madrid';

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('map-load');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const box = document.getElementById('map');
      const iframe = document.createElement('iframe');
      iframe.src = MAP_URL;
      iframe.title = 'Mapa: Aeris Factory, Calle Guadiana 36, Ajalvir';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      box.replaceChildren(iframe);
      box.classList.add('is-loaded');
    });
  });
})();
