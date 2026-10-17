// Portal de cliente Aeris — lógica de referencia (vanilla JS), datos de ejemplo.
// En producción (ver docs/AERIS_DUCTFLOW_API.md §4):
//   acceso        → POST /portal/v1/orgs/{slug}/auth/magic-link + /auth/session
//   pedidos       → GET  /portal/v1/orders
//   aceptar       → POST /portal/v1/orders/{id}/accept
//   pedir cambios → POST /portal/v1/orders/{id}/change-request
//   repetir       → POST /portal/v1/orders/{id}/repeat
// Decisiones de Aeris: sin precios en el portal, sin entregas por fases,
// un solo usuario por cliente, facturas cuando VeriFactu esté en producción.

(function () {
  const STAGES = [
    'Solicitud recibida',
    'Presupuesto enviado',
    'Pedido aceptado',
    'En producción',
    'Listo para entrega',
    'Entregado',
  ];

  const state = {
    loggedIn: false,
    linkSentTo: '',
    filter: 'all',
    sel: 'b',
    changeFormOpen: false,
    nextRef: 6,
    orders: [
      { id: 'a', ref: 'PED-0001', date: '12 sep 2026', title: 'Nave industrial — red de impulsión', stage: 3,
        pieces: { ready: 18, total: 22 },
        lines: ['Rectangular 500×300 mm · 1,2 m × 12', 'Codo 90° 500×300 mm × 6', 'Reducción 500×300 → 400×300 × 4'] },
      { id: 'b', ref: 'PED-0002', date: '18 sep 2026', title: 'Oficinas planta 2 — retorno', stage: 1,
        lines: ['Rectangular 400×250 mm · 1,2 m × 20', 'Derivación 400×250 → 250×200 × 5'] },
      { id: 'c', ref: 'PED-0003', date: '21 sep 2026', title: 'Local comercial — extracción', stage: 0,
        lines: ['Circular Ø250 mm · 1,5 m × 8', 'Codo 90° Ø250 mm × 3'] },
      { id: 'd', ref: 'PED-0004', date: '02 sep 2026', title: 'Sala técnica — impulsión', stage: 4,
        lines: ['Rectangular 600×400 mm · 1,2 m × 6', 'Codo 90° 600×400 mm × 2'] },
      { id: 'e', ref: 'PED-0005', date: '26 ago 2026', title: 'Reforma vivienda — conductos', stage: 5,
        lines: ['Circular Ø160 mm · 1,5 m × 10', 'Codo 90° Ø160 mm × 4'] },
    ],
  };

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Presupuesto enviado y sin cambios pedidos = el cliente tiene que hacer algo.
  const needsAction = (o) => o.stage === 1 && !o.changesRequested;

  const GROUPS = {
    all: () => true,
    quote: (o) => o.stage <= 1,
    prod: (o) => o.stage === 2 || o.stage === 3,
    ready: (o) => o.stage === 4,
    done: (o) => o.stage === 5,
  };
  const TAB_DEFS = [
    ['all', 'Todos'], ['quote', 'Presupuesto'], ['prod', 'En producción'], ['ready', 'Listos'], ['done', 'Entregados'],
  ];

  function render() {
    document.getElementById('portal-login').hidden = state.loggedIn;
    document.getElementById('portal-app').hidden = !state.loggedIn;
    if (!state.loggedIn) return renderLogin();
    renderTabs();
    renderAlert();
    const visible = state.orders
      .filter(GROUPS[state.filter])
      .sort((x, y) => needsAction(y) - needsAction(x));
    renderList(visible);
    renderDetail();
  }

  // ── Acceso sin contraseña (enlace por correo) ──
  function renderLogin() {
    const sent = document.getElementById('login-sent');
    const form = document.getElementById('login-form');
    form.hidden = !!state.linkSentTo;
    sent.hidden = !state.linkSentTo;
    if (state.linkSentTo) document.getElementById('login-sent-email').textContent = state.linkSentTo;
  }

  function renderTabs() {
    const el = document.getElementById('tabs');
    el.innerHTML = '';
    TAB_DEFS.forEach(([key, label]) => {
      const count = state.orders.filter(GROUPS[key]).length;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tab' + (state.filter === key ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(state.filter === key));
      btn.innerHTML = `${label} <span class="count">${count}</span>`;
      btn.addEventListener('click', () => { state.filter = key; render(); });
      el.appendChild(btn);
    });
  }

  function renderAlert() {
    const n = state.orders.filter(needsAction).length;
    const el = document.getElementById('portal-alert');
    el.hidden = n === 0;
    el.textContent = n === 1
      ? 'Tienes 1 presupuesto pendiente de revisar.'
      : `Tienes ${n} presupuestos pendientes de revisar.`;
  }

  function renderList(visible) {
    const el = document.getElementById('order-list');
    el.innerHTML = '';
    if (visible.length === 0) {
      const div = document.createElement('div');
      div.className = 'empty-orders';
      div.textContent = 'No hay pedidos en esta categoría.';
      el.appendChild(div);
    }
    visible.forEach((o) => {
      const st = o.stage;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'order-row' + (o.id === state.sel ? ' active' : '') + (st === 5 ? ' done' : '') + (needsAction(o) ? ' action' : '');
      btn.setAttribute('aria-pressed', String(o.id === state.sel));
      const chip = needsAction(o) ? 'Pendiente de tu respuesta' : (o.changesRequested && st === 1 ? 'Cambios solicitados' : STAGES[st]);
      btn.innerHTML = `
        <span class="meta"><span class="ref">${o.ref} · ${o.date}</span><span class="title">${esc(o.title)}</span></span>
        <span class="chip">${chip}</span>
        <span class="track"><span class="track-fill" style="width:${Math.round(((st + 1) / 6) * 100)}%"></span></span>
      `;
      btn.addEventListener('click', () => {
        state.sel = o.id;
        state.changeFormOpen = false;
        render();
        // En pantallas estrechas el detalle queda debajo de la lista: lo mostramos.
        if (window.matchMedia('(max-width: 1100px)').matches) {
          document.getElementById('order-detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      el.appendChild(btn);
    });
    const hint = document.createElement('div');
    hint.className = 'orders-hint';
    hint.textContent = 'Datos de ejemplo: en el sitio real se leen de Ductflow.';
    el.appendChild(hint);
  }

  function actionHtml(o) {
    const st = o.stage;
    if (st === 0) {
      return `<p class="status-note">Estamos preparando tu presupuesto. Te avisaremos por correo cuando esté listo.</p>`;
    }
    if (st === 1 && o.changesRequested) {
      return `<p class="status-note accepted">Hemos recibido tus cambios. Aeris te enviará un presupuesto actualizado por correo.</p>
        <blockquote class="change-quote">${esc(o.changesRequested)}</blockquote>`;
    }
    if (st === 1 && state.changeFormOpen) {
      return `
        <form class="accept-box" id="change-form">
          <label class="field-label" for="change-text">¿Qué quieres cambiar?</label>
          <textarea id="change-text" rows="4" required placeholder="Ej.: cambiar 5 tramos a 1,5 m de longitud y añadir 2 codos más."></textarea>
          <div class="btn-row">
            <button type="submit" class="btn-primary">Enviar cambios</button>
            <button type="button" class="btn-secondary" id="change-cancel">Cancelar</button>
          </div>
        </form>`;
    }
    if (st === 1) {
      return `
        <div class="accept-box">
          <p>Revisa el presupuesto que te hemos enviado por correo. Si todo está bien, acéptalo aquí y Aeris pasa el pedido a producción.</p>
          <div class="btn-row">
            <button type="button" class="btn-primary" id="accept-btn">Aceptar presupuesto</button>
            <button type="button" class="btn-secondary" id="change-btn">Pedir cambios</button>
          </div>
        </div>`;
    }
    if (st === 2 && o.justAccepted) {
      return `<p class="status-note accepted">Presupuesto aceptado. El pedido queda en cola de producción.</p>`;
    }
    if (st === 3 && o.pieces) {
      const pct = Math.round((o.pieces.ready / o.pieces.total) * 100);
      return `
        <div class="pieces-progress">
          <div class="pieces-top"><span>Piezas terminadas</span><b>${o.pieces.ready} de ${o.pieces.total}</b></div>
          <div class="pieces-bar"><span style="width:${pct}%"></span></div>
        </div>`;
    }
    if (st === 4) {
      return `<p class="status-note accepted">Tu pedido está listo. Aeris se pondrá en contacto contigo para la entrega.</p>`;
    }
    if (st === 5) {
      return `
        <div class="accept-box">
          <p>¿Necesitas las mismas piezas otra vez? Crea una nueva solicitud con un clic y Aeris te enviará el presupuesto.</p>
          <div class="btn-row"><button type="button" class="btn-secondary" id="repeat-btn">Repetir pedido</button></div>
        </div>`;
    }
    return '';
  }

  function renderDetail() {
    const cur = state.orders.find((o) => o.id === state.sel) || state.orders[0];
    const curStage = cur.stage;
    const el = document.getElementById('order-detail');

    const stepsHtml = STAGES.map((label, i) => {
      const done = i < curStage || curStage === 5;
      const current = i === curStage && curStage !== 5;
      const cls = done ? 'done' : current ? 'current' : '';
      return `<li class="${cls}"><span class="dot"></span>${label}</li>`;
    }).join('');

    const linesHtml = cur.lines.map((t) => `<li>${esc(t)}</li>`).join('');

    el.innerHTML = `
      <div>
        <div class="ref">${cur.ref}${cur.repeatOf ? ' · repetición de ' + cur.repeatOf : ''}</div>
        <h2>${esc(cur.title)}</h2>
      </div>
      <ol class="progress">${stepsHtml}</ol>
      ${actionHtml(cur)}
      <div>
        <div class="field-label">Piezas</div>
        <ul class="detail-lines">${linesHtml}</ul>
      </div>
    `;

    const on = (id, ev, fn) => { const n = document.getElementById(id); if (n) n.addEventListener(ev, fn); };
    on('accept-btn', 'click', () => { cur.stage = 2; cur.justAccepted = true; render(); });
    on('change-btn', 'click', () => {
      state.changeFormOpen = true;
      render();
      document.getElementById('change-text').focus();
    });
    on('change-cancel', 'click', () => { state.changeFormOpen = false; render(); });
    on('change-form', 'submit', (e) => {
      e.preventDefault();
      const text = document.getElementById('change-text').value.trim();
      if (!text) return;
      cur.changesRequested = text;
      state.changeFormOpen = false;
      render();
    });
    on('repeat-btn', 'click', () => {
      const copy = {
        id: 'r' + state.nextRef,
        ref: 'PED-' + String(state.nextRef++).padStart(4, '0'),
        date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', ''),
        title: cur.title,
        stage: 0,
        repeatOf: cur.ref,
        lines: cur.lines.slice(),
      };
      state.orders.unshift(copy);
      state.sel = copy.id;
      state.filter = 'all';
      render();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      state.linkSentTo = document.getElementById('login-email').value.trim();
      render();
    });
    // Demo: simula que el cliente abre el enlace recibido por correo.
    document.getElementById('login-open-link').addEventListener('click', () => { state.loggedIn = true; render(); });
    document.getElementById('login-retry').addEventListener('click', () => { state.linkSentTo = ''; render(); });
    document.getElementById('logout-btn').addEventListener('click', () => {
      state.loggedIn = false;
      state.linkSentTo = '';
      render();
    });
    render();
  });
})();
