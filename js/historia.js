// ============================================================
//  Mermelada Project — historia.js
//  Línea del tiempo: Historia de la Enfermería
//  Datos + lógica de navegación entre eras
// ============================================================

const HISTORIA = [
  {
    id: "egipto",
    era: "Antiguo Egipto",
    periodo: "3000 – 30 a.C.",
    icono: "𓂀",
    resumen: "Los primeros cuidados documentados emergen en el Nilo. La figura del sanador era inseparable del sacerdote: curar el cuerpo era curar el alma.",
    figuras: [
      {
        nombre: "Imhotep",
        rol: "Médico, arquitecto y sacerdote",
        aporte: "Considerado el primer médico documentado de la historia. El papiro de Edwin Smith, atribuido a su escuela, describe 48 casos clínicos con una lógica observacional sorprendentemente moderna para su época.",
      },
    ],
  },
  {
    id: "grecia",
    era: "Grecia Clásica",
    periodo: "800 – 146 a.C.",
    icono: "⚕",
    resumen: "Nace la medicina como disciplina racional. El cuidado se separa por primera vez de lo sobrenatural y se ancla en la observación y la naturaleza.",
    figuras: [
      {
        nombre: "Hipócrates de Cos",
        rol: "Médico — «Padre de la Medicina»",
        aporte: "Estableció que las enfermedades tienen causas naturales, no castigos divinos. Su escuela desarrolló la observación sistemática del paciente, el registro clínico y principios éticos que aún resuenan en el juramento médico.",
      },
    ],
  },
  {
    id: "roma",
    era: "Roma Imperial",
    periodo: "27 a.C. – 476 d.C.",
    icono: "🏛",
    resumen: "Roma institucionaliza el cuidado. Aparecen los primeros hospitales militares y civiles, y la figura del enfermero como rol diferenciado del médico.",
    figuras: [
      {
        nombre: "Galeno de Pérgamo",
        rol: "Médico del Imperio Romano",
        aporte: "Sistematizó el conocimiento médico griego y lo expandió con disecciones y experimentos. Sus textos dominaron la medicina europea durante más de 1,300 años. Atendió a gladiadores, lo que le dio experiencia única en heridas y trauma.",
      },
    ],
  },
  {
    id: "medieval",
    era: "Edad Media",
    periodo: "476 – 1400 d.C.",
    icono: "✝",
    resumen: "La Iglesia Católica asume el cuidado del enfermo como obra de misericordia. Los monasterios se convierten en los primeros hospitales de Europa, y las órdenes religiosas crean los primeros sistemas de enfermería organizada.",
    figuras: [
      {
        nombre: "Hildegarda de Bingen",
        rol: "Abadesa, naturalista y sanadora",
        aporte: "Escribió Physica y Causae et Curae, obras que describían plantas medicinales, enfermedades y tratamientos con una precisión notable. Fue una de las primeras mujeres en documentar práctica médica de forma sistemática.",
      },
    ],
  },
  {
    id: "renacimiento",
    era: "Renacimiento",
    periodo: "1400 – 1600 d.C.",
    icono: "🔭",
    resumen: "El cuerpo humano se vuelve objeto de estudio científico. La anatomía se libera del dogma y el cuidado del enfermo empieza a profesionalizarse fuera del claustro.",
    figuras: [
      {
        nombre: "Andreas Vesalio",
        rol: "Anatomista flamenco",
        aporte: "Su obra De humani corporis fabrica (1543) revolucionó la anatomía al basarse en disecciones reales en lugar de repetir a Galeno. Sentó la base anatómica sobre la que toda la enfermería clínica operaría en los siglos siguientes.",
      },
    ],
  },
  {
    id: "revolucion",
    era: "Revolución Industrial",
    periodo: "1750 – 1850 d.C.",
    icono: "⚙",
    resumen: "Las ciudades crecen, la pobreza y la enfermedad se disparan. Los hospitales dejan de ser lugares para morir y empiezan a ser lugares para sanar. Nace la enfermería moderna como profesión laica, científica y organizada.",
    figuras: [
      {
        nombre: "Florence Nightingale",
        rol: "Enfermera, estadística y reformadora",
        aporte: "Durante la Guerra de Crimea (1853-56) redujo la mortalidad hospitalaria del 42% al 2% mediante higiene, ventilación y estadística. Fundó la primera escuela de enfermería secular en 1860 y es considerada la madre de la enfermería moderna.",
      },
    ],
  },
  {
    id: "moderna",
    era: "Edad Contemporánea",
    periodo: "1900 – presente",
    icono: "🩺",
    resumen: "La enfermería se consolida como ciencia y profesión autónoma. Desarrolla teorías propias, especialidades clínicas, investigación y marcos éticos independientes de la medicina.",
    figuras: [
      {
        nombre: "Virginia Henderson",
        rol: "Teórica de enfermería",
        aporte: "Definió las 14 necesidades básicas del ser humano que el enfermero debe apoyar cuando el paciente no puede satisfacerlas por sí mismo. Su modelo sigue siendo uno de los marcos conceptuales más usados en la formación de enfermería a nivel mundial.",
      },
    ],
  },
];

// ── Estado de la línea del tiempo ───────────────────────────
let _eraActual = 0;

// ── Renderizado principal ───────────────────────────────────
function renderizarHistoria() {
  const contenido = document.getElementById("contenido");
  if (!contenido) return;
  _eraActual = 0;

  const carrilBotones = HISTORIA.map((era, i) =>
    `<button
      class="era-chip ${i === 0 ? "activo" : ""}"
      id="chip-${i}"
      onclick="irAEra(${i})"
      title="${era.era}"
    >${era.icono}</button>`
  ).join("");

  contenido.innerHTML = `
    <h2>Historia de la Enfermería <span style="font-size:0.6em;color:#888">&lt;&#47;&gt;</span></h2>

    <div class="carril-eras" role="tablist" aria-label="Eras históricas">
      ${carrilBotones}
    </div>

    <div class="timeline-nav">
      <button class="tl-arrow" id="tl-prev" onclick="cambiarEra(-1)" aria-label="Era anterior">&#8592;</button>
      <div class="era-card" id="era-card" aria-live="polite"></div>
      <button class="tl-arrow" id="tl-next" onclick="cambiarEra(1)" aria-label="Era siguiente">&#8594;</button>
    </div>
  `;

  renderizarEra(0);
}

// ── Renderizar una era ──────────────────────────────────────
function renderizarEra(idx) {
  const card = document.getElementById("era-card");
  if (!card) return;

  const era = HISTORIA[idx];

  const figurasHTML = era.figuras.map(f => `
    <div class="figura-card">
      <div class="figura-nombre">${f.nombre}</div>
      <div class="figura-rol">${f.rol}</div>
      <p class="figura-aporte">${f.aporte}</p>
    </div>
  `).join("");

  card.innerHTML = `
    <div class="era-header">
      <span class="era-icono">${era.icono}</span>
      <div>
        <h3 class="era-titulo">${era.era}</h3>
        <span class="era-periodo">${era.periodo}</span>
      </div>
    </div>
    <p class="era-resumen">${era.resumen}</p>
    <div class="figuras-clave">
      <h4 class="figuras-label">Figura clave</h4>
      ${figurasHTML}
    </div>
  `;

  // Actualizar chips
  document.querySelectorAll(".era-chip").forEach((chip, i) => {
    chip.classList.toggle("activo", i === idx);
  });

  // Actualizar flechas
  const prev = document.getElementById("tl-prev");
  const next = document.getElementById("tl-next");
  if (prev) prev.disabled = idx === 0;
  if (next) next.disabled = idx === HISTORIA.length - 1;
}

// ── Navegar con flechas ─────────────────────────────────────
function cambiarEra(delta) {
  const nuevo = _eraActual + delta;
  if (nuevo < 0 || nuevo >= HISTORIA.length) return;
  _eraActual = nuevo;
  renderizarEra(_eraActual);
  document.getElementById("era-card")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ── Navegar por chip ────────────────────────────────────────
function irAEra(idx) {
  _eraActual = idx;
  renderizarEra(idx);
}
