// Configurador de pedido Aeris — como el editor de piezas de Ductflow:
// eliges la pieza, escribes las medidas (mm) y la añades a la solicitud.
// El cliente NO ve m² ni peso: Ductflow calcula todo al convertir la solicitud.
// Catálogo: piezas.js (generado desde Ductflow con sync_piezas.js).
// Envío: POST /public/v1/orgs/{slug}/quote-requests (docs/AERIS_DUCTFLOW_API.md §3).

(function () {
  const PIEZAS = window.AERIS_PIEZAS || [];
  // Claves reales de Ductflow (backend/app/calc/defaults.py → MATERIALS).
  const MATERIALS = [
    { key: 'galvanizado', label: 'Galvanizado' },
    { key: 'inox', label: 'Inoxidable' },
    { key: 'aluminio', label: 'Aluminio' },
  ];
  // Mismas opciones que Ductflow (app.js → insulToggleHtml).
  const INSUL = [
    { key: 0, label: 'Sin aislamiento' },
    { key: 30, label: '30 mm' },
    { key: 50, label: '50 mm' },
  ];
  // Unión transversal: mismas claves que Ductflow (calc/geometry.py → UT_VALUES, app.js → utLabel).
  const UT = [
    { key: 'vaina', label: 'Vaina' },
    { key: 'perfil20', label: 'Perfil integral 20' },
    { key: 'perfil30', label: 'Perfil integral 30' },
    { key: 'custom', label: 'Otro' },
  ];
  const UT_CUSTOM_MAX = 500; // mm de desarrollo
  const DIM_MAX = 5000;   // mm
  const MAX_LINES = 50;   // tope del API

  // Imágenes de la pieza: la 3D de Ductflow (img3d) si existe, si no el dibujo SVG.
  // En la demo de un solo archivo van incrustadas (AERIS_PIEZA_IMG, por ruta sin ?v=).
  const asset = (src) => (window.AERIS_PIEZA_IMG && window.AERIS_PIEZA_IMG[src.split('?')[0]]) || src;
  const pieceById = (id) => PIEZAS.find((x) => x.id === id);
  const thumbSrc = (p) => asset(p.img3d ? p.img3d.thumb : 'piezas/' + p.id + '.svg');
  const sketchSrc = (p) => asset(p.img3d ? p.img3d.sketch : 'piezas/' + p.id + '.svg');

  // Config del API: <meta name="aeris-api" content="https://api.../public/v1/orgs/aeris">.
  // Sin meta, el formulario funciona en modo demo (no envía nada).
  const apiMeta = document.querySelector('meta[name="aeris-api"]');
  const API_BASE = apiMeta ? apiMeta.content.replace(/\/$/, '') : '';

  const newKey = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random());
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (n) => Number(n).toLocaleString('es-ES', { maximumFractionDigits: 1 });
  const fmtMm = (t) => Number(t).toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' mm';

  const state = {
    piece: PIEZAS[0] || null,
    dims: {},                 // { A: 500, B: 300, ... } por pieza en curso
    mat: 'galvanizado', ins: 0, qty: 1,
    ut: 'perfil20', utCustom: null,   // perfil20 = valor por defecto de los proyectos Ductflow
    pickerOpen: false,
    items: [], nextId: 1,
    sent: false, sending: false, error: '',
    idemKey: newKey(),
  };

  // Ductflow (app.js → getThickness): espesor por la medida mayor.
  function thickness(dims) {
    const keys = ['A', 'B', 'A1', 'B1', 'A2', 'B2', 'A3', 'B3', 'D', 'D1', 'D2', 'D3'];
    const max = Math.max(0, ...keys.map((k) => dims[k] || 0));
    if (!max) return null;
    return max <= 600 ? 0.6 : max <= 1250 ? 0.8 : 1.0;
  }

  function dimValid(inp, v) {
    if (!(v > 0)) return false;
    return inp.angle ? v <= 180 : v <= DIM_MAX;
  }
  const allDimsValid = () => state.piece && state.piece.inputs.every((i) => dimValid(i, state.dims[i.key]));
  const utValid = () => state.piece.noUT || state.ut !== 'custom' || (state.utCustom > 0 && state.utCustom <= UT_CUSTOM_MAX);
  const canAdd = () => allDimsValid() && utValid();
  function utText(line) {
    if (!line.ut) return '';
    if (line.ut === 'custom') return 'unión ' + fmt(line.ut_custom_mm) + ' mm';
    return UT.find((u) => u.key === line.ut).label;
  }

  function dimsText(piece, dims) {
    return piece.inputs.map((i) => `${i.key} ${fmt(dims[i.key])}${i.angle ? '°' : ''}`).join(' · ');
  }

  // Línea en el formato de POST /quote-requests.
  function currentLine() {
    const dimensions = {};
    state.piece.inputs.forEach((i) => { dimensions[i.key] = state.dims[i.key]; });
    return {
      piece_type: state.piece.id,
      variant: 'radius',
      dimensions,
      material_id: state.mat,
      grosime: thickness(state.dims).toFixed(1),
      insulation_mm: state.ins,
      // Piezas sin unión (vierteaguas, tapa, deflector): ut = null.
      ut: state.piece.noUT ? null : state.ut,
      ut_custom_mm: !state.piece.noUT && state.ut === 'custom' ? state.utCustom : null,
      quantity: state.qty,
      note: document.getElementById('piece-note').value.trim(),
    };
  }

  function buildPayload() {
    return {
      customer: {
        name: document.getElementById('f-name').value.trim(),
        company: document.getElementById('f-company').value.trim() || null,
        email: document.getElementById('f-email').value.trim(),
        consent_privacy: document.getElementById('f-consent').checked,
      },
      lines: state.items.map((it) => it.line),
      website: document.getElementById('f-website').value,
    };
  }

  async function submitRequest() {
    if (!API_BASE) return; // modo demo
    const res = await fetch(API_BASE + '/quote-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': state.idemKey },
      body: JSON.stringify(buildPayload()),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
  }

  // ── Selector de pieza (lista con dibujos, como el desplegable de Ductflow) ──
  function renderPickerList() {
    const list = document.getElementById('piece-list');
    list.innerHTML = PIEZAS.map((p) => `
      <button type="button" class="piece-option${state.piece && p.id === state.piece.id ? ' active' : ''}" role="option"
        aria-selected="${state.piece && p.id === state.piece.id}" data-id="${p.id}">
        <img src="${thumbSrc(p)}" alt="" loading="lazy"><span>${esc(p.name)}</span>
      </button>`).join('');
    list.querySelectorAll('.piece-option').forEach((b) => b.addEventListener('click', () => selectPiece(b.dataset.id)));
  }

  function setPickerOpen(open) {
    state.pickerOpen = open;
    document.getElementById('piece-list').hidden = !open;
    document.getElementById('piece-picker-btn').setAttribute('aria-expanded', String(open));
    if (open) {
      const act = document.querySelector('.piece-option.active') || document.querySelector('.piece-option');
      if (act) act.focus();
    }
  }

  function selectPiece(id) {
    const p = PIEZAS.find((x) => x.id === id);
    if (!p) return;
    // Conserva las medidas con la misma letra (A, B…) al cambiar de pieza, como en Ductflow.
    const kept = {};
    p.inputs.forEach((i) => { if (state.dims[i.key] && !i.angle) kept[i.key] = state.dims[i.key]; });
    state.piece = p;
    state.dims = kept;
    setPickerOpen(false);
    renderPiece();
    render();
    document.getElementById('piece-picker-btn').focus();
  }

  function renderPiece() {
    const p = state.piece;
    if (!p) return;
    document.getElementById('piece-picker-img').src = thumbSrc(p);
    document.getElementById('piece-picker-name').textContent = p.name;
    const draw = document.getElementById('piece-drawing-img');
    draw.src = sketchSrc(p);
    draw.alt = 'Esquema de ' + p.name + ' con las cotas ' + p.inputs.map((i) => i.key).join(', ');
    // Plano 3D: letras encima de cada cota (centro de la letra, como en Ductflow);
    // al rellenar la medida la etiqueta muestra el valor. El SVG ya trae las letras dibujadas.
    const sketch = document.getElementById('piece-sketch');
    sketch.classList.toggle('is-3d', !!p.img3d);
    sketch.querySelectorAll('.sketch-label').forEach((el) => el.remove());
    (p.img3d ? p.img3d.overlay : []).forEach((o) => {
      const el = document.createElement('span');
      el.className = 'sketch-label';
      el.dataset.key = o.key;
      el.style.left = o.left;
      el.style.top = o.top;
      el.setAttribute('aria-hidden', 'true');
      sketch.appendChild(el);
    });
    updateSketchLabels();
    renderPickerList();

    const box = document.getElementById('dims');
    box.innerHTML = p.inputs.map((i) => `
      <label class="dim">
        <span class="dim-key">${i.key}</span>
        <span class="dim-hint">${esc(i.hint)}</span>
        <span class="dim-input">
          <input type="number" inputmode="numeric" min="1" max="${i.angle ? 180 : DIM_MAX}" step="1"
            data-key="${i.key}" value="${state.dims[i.key] || ''}" placeholder="${i.angle ? '90' : '0'}">
          <span class="dim-unit">${i.angle ? '°' : 'mm'}</span>
        </span>
      </label>`).join('');
    box.querySelectorAll('input').forEach((inp) => {
      inp.addEventListener('input', () => {
        const v = parseFloat(inp.value);
        if (v > 0) state.dims[inp.dataset.key] = v; else delete state.dims[inp.dataset.key];
        const def = state.piece.inputs.find((i) => i.key === inp.dataset.key);
        inp.closest('.dim').classList.toggle('invalid', inp.value !== '' && !dimValid(def, v));
        render();
      });
      // Enter pasa a la siguiente medida (como enableEnterNav en Ductflow).
      inp.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const all = [...box.querySelectorAll('input')];
        const next = all[all.indexOf(inp) + 1];
        if (next) next.focus(); else document.getElementById('add-item').focus();
      });
    });
  }

  // Como updateDimensionOverlay en Ductflow: "A" vacía, "A=500" (resaltada) con valor.
  function updateSketchLabels() {
    document.querySelectorAll('#piece-sketch .sketch-label').forEach((el) => {
      const v = state.dims[el.dataset.key];
      el.textContent = v ? el.dataset.key + '=' + v : el.dataset.key;
      el.classList.toggle('has-value', !!v);
    });
  }

  function renderPills(containerId, options, selected, onPick) {
    const el = document.getElementById(containerId);
    el.innerHTML = '';
    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pill' + (opt.key === selected ? ' active' : '');
      btn.textContent = opt.label;
      btn.setAttribute('aria-pressed', String(opt.key === selected));
      btn.addEventListener('click', () => onPick(opt.key));
      el.appendChild(btn);
    });
  }

  function render() {
    updateSketchLabels();
    renderPills('mat-pills', MATERIALS, state.mat, (k) => { state.mat = k; render(); });
    renderPills('ins-pills', INSUL, state.ins, (k) => { state.ins = k; render(); });
    const noUT = !!(state.piece && state.piece.noUT);
    document.getElementById('ut-group').hidden = noUT;
    document.getElementById('ut-none').hidden = !noUT;
    renderPills('ut-pills', UT, state.ut, (k) => {
      state.ut = k;
      render();
      if (k === 'custom') document.getElementById('ut-custom-val').focus();
    });
    const custom = document.getElementById('ut-custom');
    custom.hidden = state.ut !== 'custom';
    custom.classList.toggle('invalid', state.ut === 'custom' && state.utCustom !== null && !utValid());
    document.getElementById('qty-value').value = state.qty;

    const t = thickness(state.dims);
    document.getElementById('thick-text').textContent = t ? fmtMm(t) : '—';

    const ok = canAdd();
    const full = state.items.length >= MAX_LINES;
    document.getElementById('add-item').disabled = !ok || full;
    const hint = document.getElementById('add-hint');
    hint.hidden = ok && !full;
    hint.textContent = full ? `Máximo ${MAX_LINES} piezas por solicitud.`
      : !allDimsValid() ? 'Completa todas las medidas para añadir la pieza.'
      : 'Indica el desarrollo de la unión (1–' + UT_CUSTOM_MAX + ' mm).';

    renderItems();
    renderForm();
  }

  function renderItems() {
    const list = document.getElementById('items-list');
    const empty = document.getElementById('empty-list');
    const total = document.getElementById('total-line');
    list.innerHTML = '';
    empty.hidden = state.items.length > 0;
    total.hidden = state.items.length === 0;
    state.items.forEach((it) => {
      const l = it.line;
      const mat = MATERIALS.find((m) => m.key === l.material_id).label;
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${thumbSrc(pieceById(l.piece_type))}" alt="">
        <span class="item-text">
          <b>${esc(it.name)} × ${l.quantity}</b>
          <span>${esc(it.dims)}</span>
          <span>${[mat, fmtMm(l.grosime), utText(l), l.insulation_mm ? 'aislamiento ' + l.insulation_mm + ' mm' : ''].filter(Boolean).join(' · ')}</span>
          ${l.note ? `<span class="item-note">${esc(l.note)}</span>` : ''}
        </span>`;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Quitar ' + it.name);
      btn.textContent = '×';
      btn.addEventListener('click', () => {
        state.items = state.items.filter((x) => x.id !== it.id);
        render();
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
    const units = state.items.reduce((a, it) => a + it.line.quantity, 0);
    total.innerHTML = `<b>${state.items.length}</b> ${state.items.length === 1 ? 'línea' : 'líneas'} · <b>${units}</b> ${units === 1 ? 'pieza' : 'piezas'}`;
  }

  function renderForm() {
    const form = document.getElementById('quote-form');
    const sentPanel = document.getElementById('sent-panel');
    form.hidden = state.sent;
    sentPanel.hidden = !state.sent;

    const name = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const consent = document.getElementById('f-consent').checked;
    const emailOk = /\S+@\S+\.\S+/.test(email);
    const canSend = state.items.length > 0 && name.length > 0 && emailOk && consent && !state.sending;
    const btn = document.getElementById('submit-btn');
    btn.disabled = !canSend;
    btn.textContent = state.sending ? 'Enviando…' : 'Enviar solicitud a Aeris';
    const err = document.getElementById('form-error');
    err.hidden = !state.error;
    err.textContent = state.error;
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!state.piece) return;
    const picker = document.getElementById('piece-picker');
    document.getElementById('piece-picker-btn').addEventListener('click', () => setPickerOpen(!state.pickerOpen));
    document.addEventListener('click', (e) => { if (state.pickerOpen && !picker.contains(e.target)) setPickerOpen(false); });
    picker.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.pickerOpen) { setPickerOpen(false); document.getElementById('piece-picker-btn').focus(); }
    });

    const setQty = (v) => { state.qty = Math.min(999, Math.max(1, Math.round(v) || 1)); render(); };
    document.getElementById('qty-minus').addEventListener('click', () => setQty(state.qty - 1));
    document.getElementById('qty-plus').addEventListener('click', () => setQty(state.qty + 1));
    document.getElementById('qty-value').addEventListener('change', (e) => setQty(parseFloat(e.target.value)));
    document.getElementById('ut-custom-val').addEventListener('input', (e) => {
      const v = parseFloat(e.target.value);
      state.utCustom = v > 0 ? v : (e.target.value === '' ? null : v);
      render();
    });

    document.getElementById('add-item').addEventListener('click', () => {
      if (!canAdd() || state.items.length >= MAX_LINES) return;
      state.items.push({
        id: state.nextId++,
        name: state.piece.name,
        dims: dimsText(state.piece, state.dims),
        line: currentLine(),
      });
      // Como en Ductflow: la pieza queda elegida; se limpian medidas, nota y cantidad.
      state.dims = {};
      state.qty = 1;
      document.getElementById('piece-note').value = '';
      renderPiece();
      render();
      const first = document.querySelector('#dims input');
      if (first) first.focus();
    });

    ['f-name', 'f-company', 'f-email'].forEach((id) => document.getElementById(id).addEventListener('input', render));
    document.getElementById('f-consent').addEventListener('change', render);

    document.getElementById('quote-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      state.sending = true;
      state.error = '';
      render();
      try {
        await submitRequest();
        state.sent = true;
      } catch (err) {
        // Se conserva la Idempotency-Key: reintentar no duplica la solicitud.
        state.error = 'No se ha podido enviar la solicitud. Inténtalo de nuevo en unos minutos.';
      }
      state.sending = false;
      render();
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
      state.sent = false;
      state.items = [];
      state.idemKey = newKey();
      ['f-name', 'f-company', 'f-email'].forEach((id) => { document.getElementById(id).value = ''; });
      document.getElementById('f-consent').checked = false;
      render();
    });

    renderPiece();
    render();
  });
})();
