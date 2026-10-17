// Bandas de referencias (marquee). Duplica cada fila para un bucle continuo;
// la copia va con aria-hidden para que los lectores de pantalla lean la lista una vez.
// Con "reducir movimiento" no se duplica nada y las filas se muestran fijas (ver CSS).

(function () {
  const SECONDS_PER_ITEM = 9; // ≈ 40 px/s con tarjetas de ~360 px

  document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.refs-row').forEach((row) => {
      const track = row.querySelector('.refs-track');
      if (!track || track.dataset.cloned) return;
      const copy = track.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      copy.dataset.cloned = '1';
      track.dataset.cloned = '1';
      row.appendChild(copy);
      row.classList.add('is-moving');
      // Duración por número de elementos (no por ancho medido): funciona también
      // si la fila está oculta al cargar (páginas de la demo en un solo archivo).
      row.style.setProperty('--refs-duration', track.children.length * SECONDS_PER_ITEM + 's');
    });
  });
})();
