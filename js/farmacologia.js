// ============================================================
//  Mermelada Project — farmacologia.js  (v4.1)
//  Calculadora de farmacología: gotas/min · dosis/peso ·
//  dilución · conversión · tiempo de infusión
//  Herramienta de ESTUDIO: verifica siempre con la indicación
//  médica y el protocolo de tu institución.
// ============================================================

function renderizarFarmacologia() {
  const contenido = document.getElementById("contenido");
  if (!contenido) return;

  const chips = [
    { id: "gotas",      label: "Gotas/min",       icono: "💧" },
    { id: "dosis",      label: "Dosis/peso",      icono: "⚖️" },
    { id: "dilucion",   label: "Dilución",        icono: "🧪" },
    { id: "conversion", label: "Conversión",      icono: "🔄" },
    { id: "tiempo",     label: "Tiempo infusión", icono: "⏱️" },
  ];

  const carril = chips.map((c, i) =>
    `<button class="era-chip ${i === 0 ? "activo" : ""}" id="fchip-${c.id}"
      onclick="mostrarCalc('${c.id}')">${c.icono} ${c.label}</button>`
  ).join("");

  contenido.innerHTML = `
    <h2>Calculadora <span style="font-size:0.6em;color:var(--text-dim)">&lt;&#47;&gt;</span></h2>
    <p class="nom-nota" style="text-align:left">
      Herramienta de estudio. En la práctica, confirma cada cálculo con la
      indicación médica y el protocolo de tu institución (doble verificación).
    </p>
    <div class="carril-eras" style="flex-wrap:wrap">${carril}</div>
    <div id="calc-area"></div>
  `;

  mostrarCalc("gotas");
}

// ── Dispatcher ──────────────────────────────────────────────
function mostrarCalc(id) {
  document.querySelectorAll(".era-chip[id^='fchip']").forEach(c =>
    c.classList.toggle("activo", c.id === `fchip-${id}`)
  );
  const mapa = {
    gotas: calcGotas, dosis: calcDosis, dilucion: calcDilucion,
    conversion: calcConversion, tiempo: calcTiempo,
  };
  (mapa[id] || (() => {}))();
}

// ── Helpers ─────────────────────────────────────────────────
function getVal(id) {
  const v = parseFloat(document.getElementById(id)?.value);
  return Number.isFinite(v) && v >= 0 ? v : NaN;       // ignora vacíos y negativos
}

// Formatea sin ceros de más: 2.50 → 2.5 · 0.3333333 → 0.333
function fmt(n, dec = 2) {
  if (!Number.isFinite(n)) return "—";
  return String(+n.toFixed(dec));
}

function renderForm(titulo, descripcion, campos, fnCalc, extra = "") {
  const area = document.getElementById("calc-area");
  if (!area) return;

  const inputs = campos.map(c => `
    <div class="calc-field">
      <label for="${c.id}">${c.label}</label>
      <div class="calc-input-wrap">
        <input type="number" inputmode="decimal" id="${c.id}"
          placeholder="${c.placeholder || "0"}" min="0" step="any"
          oninput="${fnCalc}()">
        ${c.unidad ? `<span class="calc-unidad">${c.unidad}</span>` : ""}
      </div>
      ${c.extra || ""}
      ${c.nota ? `<small class="calc-nota">${c.nota}</small>` : ""}
    </div>
  `).join("");

  area.innerHTML = `
    <div class="calc-card">
      <h3 class="calc-titulo">${titulo}</h3>
      <p class="calc-desc">${descripcion}</p>
      <div class="calc-form">${inputs}</div>
      <div id="calc-resultado" class="calc-resultado" aria-live="polite"></div>
      ${extra}
    </div>
  `;
  mostrarResultado(null);
}

/**
 * items: [{ v: número|texto, u: "unidad", sec?: true }] o null
 * pasos: HTML del procedimiento (opcional) · aviso: texto (opcional)
 */
function mostrarResultado(items, pasos, aviso) {
  const el = document.getElementById("calc-resultado");
  if (!el) return;

  if (!items || !items.length) {
    el.innerHTML = `<p class="calc-vacio">Completa los campos para ver el resultado.</p>`;
    return;
  }

  const valores = items.map(it => `
    <div class="calc-valor ${it.sec ? "secundario" : ""}">
      <span class="calc-numero">${it.v}</span>
      <span class="calc-unidad-grande">${it.u}</span>
    </div>`).join("");

  el.innerHTML = `
    ${valores}
    ${aviso ? `<p class="calc-aviso">⚠️ ${aviso}</p>` : ""}
    ${pasos ? `
      <button class="calc-toggle" onclick="togglePasos()">¿Cómo se calculó? ▾</button>
      <div id="calc-pasos" class="calc-pasos oculto">${pasos}</div>` : ""}
  `;
}

function togglePasos() {
  const pasos = document.getElementById("calc-pasos");
  const btn   = document.querySelector(".calc-toggle");
  if (!pasos || !btn) return;
  pasos.classList.toggle("oculto");
  btn.textContent = pasos.classList.contains("oculto")
    ? "¿Cómo se calculó? ▾" : "Ocultar procedimiento ▴";
}

// ────────────────────────────────────────────────────────────
//  1) Gotas por minuto
// ────────────────────────────────────────────────────────────
function calcGotas() {
  const presets = [10, 15, 20, 60].map(n =>
    `<button type="button" class="calc-preset" onclick="fijarFactor(${n})">${n}</button>`
  ).join("");

  renderForm(
    "💧 Gotas por minuto",
    "Velocidad del gotero para pasar un volumen en el tiempo indicado.",
    [
      { id: "g_volumen", label: "Volumen total", unidad: "mL", placeholder: "500" },
      { id: "g_horas",   label: "Tiempo de infusión", unidad: "horas", placeholder: "8" },
      { id: "g_factor",  label: "Factor de goteo", unidad: "gotas/mL", placeholder: "20",
        extra: `<div class="calc-presets">${presets}</div>`,
        nota: "Macrogotero: 10, 15 o 20 gts/mL según el equipo (revisa el empaque) · Microgotero: 60 gts/mL" },
    ],
    "calcularGotas"
  );
}

function fijarFactor(n) {
  const inp = document.getElementById("g_factor");
  if (inp) { inp.value = n; calcularGotas(); }
}

function calcularGotas() {
  const vol = getVal("g_volumen"), horas = getVal("g_horas"), factor = getVal("g_factor");
  if (!(vol > 0) || !(horas > 0) || !(factor > 0)) { mostrarResultado(null); return; }

  const minutos = horas * 60;
  const gotas   = (vol * factor) / minutos;
  const redond  = Math.round(gotas);
  const mlh     = vol / horas;

  const pasos = `
    <ol class="pasos-lista">
      <li>Horas a minutos: <b>${fmt(horas)} h × 60 = ${fmt(minutos, 1)} min</b></li>
      <li>Fórmula: gotas/min = (volumen × factor) ÷ tiempo en minutos</li>
      <li>= (${fmt(vol)} mL × ${fmt(factor)} gts/mL) ÷ ${fmt(minutos, 1)} min</li>
      <li>= <b>${fmt(gotas)} → ${redond} gts/min</b> (se redondea porque no se cuentan fracciones de gota)</li>
      <li>Velocidad equivalente: ${fmt(vol)} mL ÷ ${fmt(horas)} h = <b>${fmt(mlh)} mL/h</b></li>
    </ol>`;

  const aviso = redond > 60 ? "Velocidad de goteo alta: confirma la indicación antes de programarla." : null;
  mostrarResultado(
    [{ v: redond, u: "gotas/min" }, { v: fmt(mlh), u: "mL/h", sec: true }],
    pasos, aviso
  );
}

// ────────────────────────────────────────────────────────────
//  2) Dosis por peso
// ────────────────────────────────────────────────────────────
function calcDosis() {
  renderForm(
    "⚖️ Dosis por peso",
    "Dosis total a partir de la indicación en mg/kg, y volumen a extraer si conoces la concentración.",
    [
      { id: "d_dosis", label: "Dosis indicada", unidad: "mg/kg", placeholder: "0.5",
        nota: "Tal como aparece en la indicación médica" },
      { id: "d_peso",  label: "Peso del paciente", unidad: "kg", placeholder: "70" },
      { id: "d_conc",  label: "Concentración disponible (opcional)", unidad: "mg/mL", placeholder: "10",
        nota: "Está en la etiqueta del frasco o ampolleta" },
    ],
    "calcularDosis"
  );
}

function calcularDosis() {
  const dosis = getVal("d_dosis"), peso = getVal("d_peso"), conc = getVal("d_conc");
  if (!(dosis > 0) || !(peso > 0)) { mostrarResultado(null); return; }

  const total = dosis * peso;
  const items = [{ v: fmt(total), u: "mg (dosis total)" }];
  let pasoVol = "";

  if (conc > 0) {
    const vol = total / conc;
    items.push({ v: fmt(vol), u: "mL a extraer", sec: true });
    pasoVol = `<li>Volumen = dosis total ÷ concentración: <b>${fmt(total)} mg ÷ ${fmt(conc)} mg/mL = ${fmt(vol)} mL</b></li>`;
  }

  const pasos = `
    <ol class="pasos-lista">
      <li>Dosis total = dosis/kg × peso: <b>${fmt(dosis)} mg/kg × ${fmt(peso)} kg = ${fmt(total)} mg</b></li>
      ${pasoVol}
    </ol>`;
  mostrarResultado(items, pasos);
}

// ────────────────────────────────────────────────────────────
//  3) Dilución (concentración final)
// ────────────────────────────────────────────────────────────
function calcDilucion() {
  renderForm(
    "🧪 Concentración tras la dilución",
    "Concentración final al llevar una cantidad de fármaco a un volumen total.",
    [
      { id: "dil_masa", label: "Masa del fármaco", unidad: "mg", placeholder: "500" },
      { id: "dil_vol",  label: "Volumen final de la solución", unidad: "mL", placeholder: "100",
        nota: "Volumen total después de agregar el fármaco" },
    ],
    "calcularDilucion"
  );
}

function calcularDilucion() {
  const masa = getVal("dil_masa"), vol = getVal("dil_vol");
  if (!(masa > 0) || !(vol > 0)) { mostrarResultado(null); return; }

  const conc = masa / vol;                    // mg/mL
  const mcg  = conc * 1000;                   // mcg/mL
  const pct  = conc / 10;                     // 1 % = 1 g/100 mL = 10 mg/mL

  const pasos = `
    <ol class="pasos-lista">
      <li>Concentración = masa ÷ volumen: <b>${fmt(masa)} mg ÷ ${fmt(vol)} mL = ${fmt(conc, 3)} mg/mL</b></li>
      <li>En microgramos: ${fmt(conc, 3)} × 1000 = <b>${fmt(mcg, 1)} mcg/mL</b></li>
      <li>En porcentaje (1 % = 10 mg/mL): ${fmt(conc, 3)} ÷ 10 = <b>${fmt(pct, 3)} %</b></li>
    </ol>`;
  mostrarResultado(
    [{ v: fmt(conc, 3), u: "mg/mL" },
     { v: fmt(mcg, 1),  u: "mcg/mL", sec: true },
     { v: fmt(pct, 3),  u: "%", sec: true }],
    pasos
  );
}

// ────────────────────────────────────────────────────────────
//  4) Conversión de unidades de masa
// ────────────────────────────────────────────────────────────
function calcConversion() {
  const area = document.getElementById("calc-area");
  if (!area) return;

  const opciones = (sel) => ["g", "mg", "mcg", "ng"].map(u =>
    `<option value="${u}" ${u === sel ? "selected" : ""}>${{
      g: "g (gramos)", mg: "mg (miligramos)", mcg: "mcg (microgramos)", ng: "ng (nanogramos)"
    }[u]}</option>`).join("");

  area.innerHTML = `
    <div class="calc-card">
      <h3 class="calc-titulo">🔄 Conversión de unidades</h3>
      <p class="calc-desc">Convierte entre unidades de masa (g, mg, mcg, ng).</p>
      <div class="calc-form">
        <div class="calc-field">
          <label for="conv_valor">Valor</label>
          <div class="calc-input-wrap">
            <input type="number" inputmode="decimal" id="conv_valor" placeholder="1"
              min="0" step="any" oninput="calcularConversion()">
          </div>
        </div>
        <div class="calc-field">
          <label for="conv_de">De</label>
          <select id="conv_de" onchange="calcularConversion()" class="calc-select">${opciones("mg")}</select>
        </div>
        <div class="calc-field">
          <label for="conv_a">A</label>
          <select id="conv_a" onchange="calcularConversion()" class="calc-select">${opciones("mcg")}</select>
        </div>
      </div>
      <div id="calc-resultado" class="calc-resultado" aria-live="polite"></div>
      <div class="calc-tabla-ref">
        <p class="figuras-label">Referencia rápida</p>
        <table class="tabla-conv">
          <tr><td>1 g</td><td>=</td><td>1,000 mg</td></tr>
          <tr><td>1 mg</td><td>=</td><td>1,000 mcg</td></tr>
          <tr><td>1 mcg</td><td>=</td><td>1,000 ng</td></tr>
          <tr><td>1 L</td><td>=</td><td>1,000 mL</td></tr>
        </table>
        <p class="calc-nota">Las UI (unidades internacionales) y los mEq dependen de cada fármaco:
        no se convierten con factores universales. Consulta la ficha o al farmacéutico.</p>
      </div>
    </div>`;
  mostrarResultado(null);
}

function calcularConversion() {
  const valor = getVal("conv_valor");
  const de = document.getElementById("conv_de")?.value;
  const a  = document.getElementById("conv_a")?.value;
  if (!(valor > 0) || !de || !a) { mostrarResultado(null); return; }

  const aGramos = { g: 1, mg: 1e-3, mcg: 1e-6, ng: 1e-9 };
  if (de === a) { mostrarResultado([{ v: fmt(valor, 6), u: a }]); return; }

  const enGramos = valor * aGramos[de];
  const res      = enGramos / aGramos[a];
  const texto    = Math.abs(res) >= 1000
    ? res.toLocaleString("es-MX", { maximumFractionDigits: 4 })
    : String(+res.toPrecision(6));

  const pasos = `
    <ol class="pasos-lista">
      <li>${fmt(valor, 6)} ${de} a gramos: × ${aGramos[de]} = ${enGramos} g</li>
      <li>Gramos a ${a}: ÷ ${aGramos[a]} = <b>${texto} ${a}</b></li>
    </ol>`;
  mostrarResultado([{ v: texto, u: a }], pasos);
}

// ────────────────────────────────────────────────────────────
//  5) Tiempo de infusión
// ────────────────────────────────────────────────────────────
function calcTiempo() {
  renderForm(
    "⏱️ Tiempo de infusión",
    "Cuánto tardará en pasar un volumen a una velocidad conocida.",
    [
      { id: "t_volumen",   label: "Volumen total", unidad: "mL", placeholder: "500" },
      { id: "t_velocidad", label: "Velocidad de infusión", unidad: "mL/hora", placeholder: "125",
        nota: "La indicada en la orden médica o programada en la bomba" },
    ],
    "calcularTiempo"
  );
}

function calcularTiempo() {
  const vol = getVal("t_volumen"), vel = getVal("t_velocidad");
  if (!(vol > 0) || !(vel > 0)) { mostrarResultado(null); return; }

  const horas   = vol / vel;
  const totalMin = Math.round(horas * 60);            // se redondea una sola vez → nunca "4 h 60 min"
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;

  const pasos = `
    <ol class="pasos-lista">
      <li>Tiempo = volumen ÷ velocidad: <b>${fmt(vol)} mL ÷ ${fmt(vel)} mL/h = ${fmt(horas, 3)} h</b></li>
      <li>En minutos: ${fmt(horas, 3)} × 60 ≈ <b>${totalMin} min</b></li>
      <li>= <b>${h} h ${m} min</b></li>
    </ol>`;
  mostrarResultado([{ v: `${h} h ${m} min`, u: "" }], pasos);
}
