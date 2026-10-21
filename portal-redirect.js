// /portal.html → área de cliente de DuctFlow, CONSERVANDO el #token=… del enlace del email.
// Redirige SIEMPRE desde aquí (con el fragmento si lo hay). El meta refresh de portal.html va
// dentro de <noscript>: solo actúa sin JS. Si estuvieran los dos activos, el meta refresh podía
// ganar la carrera y perder el token → el cliente volvía al login (21 oct 2026).
(function () {
  location.replace('https://ductflow.app/portal.html?o=aerisfactory' + (location.hash || ''));
})();
