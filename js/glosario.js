// ============================================================
//  Mermelada Project — glosario.js
//  Lógica de búsqueda, filtro y renderizado del glosario.
//  Depende de: data.js (diccionarioMedico, CATEGORIAS)
// ============================================================

// ── Índice de búsqueda ──────────────────────────────────────
// Se construye una vez al cargar para no iterar el objeto
// completo en cada pulsación de tecla.
let _indice = null;

function obtenerIndice() {
  if (_indice) return _indice;
  _indice = Object.keys(diccionarioMedico).sort();
  return _indice;
}

// ── Renderizado principal del glosario ─────────────────────
function renderizarGlosario() {
  const contenido = document.getElementById("contenido");
  if (!contenido) return;

  const opcionesCategoria = Object.entries(CATEGORIAS)
    .map(([key, label]) =>
      `<option value="${key}">${label}</option>`
    ).join("");

  contenido.innerHTML = `
    <h2>Glosario <span style="font-size:0.6em;color:#888">&lt;&#47;&gt;</span></h2>

    <div class="busqueda-box">
      <label for="busqueda" class="sr-only">Buscar término médico</label>
      <div class="input-ghost-wrap">
        <input
          id="ghost"
          type="text"
          tabindex="-1"
          aria-hidden="true"
          readonly
        >
        <input
          id="busqueda"
          type="text"
          placeholder="Buscar… ¿medusas?"
          autocomplete="off"
          spellcheck="false"
          oninput="buscarTermino()"
          onkeydown="teclaEnter(event)"
        >
      </div>
      <div id="sugerencias" role="listbox" aria-label="Sugerencias"></div>
    </div>

    <div class="filtro-categoria">
      <label for="filtroCategoria">Filtrar por categoría:</label>
      <select id="filtroCategoria" onchange="filtrarCategoria()">
        <option value="">— Todas —</option>
        ${opcionesCategoria}
      </select>
    </div>

    <div id="resultado" role="region" aria-live="polite">
      <p>Escribe un término médico para ver su definición.</p>
    </div>
  `;
}

// ── Búsqueda con autocompletado ─────────────────────────────
function buscarTermino() {
  const input     = document.getElementById("busqueda");
  const ghost     = document.getElementById("ghost");
  const sug       = document.getElementById("sugerencias");
  const resultado = document.getElementById("resultado");

  if (!input || !sug) return;

  const palabra = input.value.toLowerCase().trim();
  sug.innerHTML = "";

  if (palabra.length === 0) {
    ghost.value = "";
    resultado.innerHTML = "<p>Escribe un término médico para ver su definición.</p>";
    return;
  }

  const categoria = document.getElementById("filtroCategoria")?.value || "";
  const indice    = obtenerIndice();
  let   primero   = null;

  for (const termino of indice) {
    const entrada = diccionarioMedico[termino];
    if (entrada.categoria === null) continue;          // ocultar easter eggs
    if (categoria && entrada.categoria !== categoria) continue;
    if (!termino.startsWith(palabra)) continue;

    if (!primero) primero = termino;

    const item = document.createElement("div");
    item.setAttribute("role", "option");
    item.textContent = entrada.titulo || termino;
    item.onclick = () => {
      input.value = termino;
      ghost.value = "";
      sug.innerHTML = "";
      mostrarDefinicion(termino);
    };
    sug.appendChild(item);
  }

  ghost.value = primero || "";

  if (diccionarioMedico[palabra]) {
    mostrarDefinicion(palabra);
  }
}

// ── Filtro por categoría ────────────────────────────────────
function filtrarCategoria() {
  const categoria  = document.getElementById("filtroCategoria")?.value;
  const resultado  = document.getElementById("resultado");
  const sug        = document.getElementById("sugerencias");
  const input      = document.getElementById("busqueda");

  if (!resultado) return;

  if (!categoria) {
    resultado.innerHTML = "<p>Escribe un término médico para ver su definición.</p>";
    if (input) input.value = "";
    if (sug)   sug.innerHTML = "";
    return;
  }

  const nombreCategoria = CATEGORIAS[categoria] || categoria;
  const terminos = Object.entries(diccionarioMedico)
    .filter(([, v]) => v.categoria === categoria)
    .sort((a, b) => a[1].titulo.localeCompare(b[1].titulo));

  if (terminos.length === 0) {
    resultado.innerHTML = `<p>No hay términos en esta categoría aún.</p>`;
    return;
  }

  const lista = terminos.map(([key, v]) =>
    `<span class="relacionada" onclick="mostrarDefinicion('${key}')">${v.titulo}</span>`
  ).join(" &middot; ");

  resultado.innerHTML = `
    <h3>${nombreCategoria}</h3>
    <p class="categoria-lista">${lista}</p>
  `;

  if (sug)   sug.innerHTML = "";
  if (input) input.value = "";
}

// ── Mostrar definición ──────────────────────────────────────
function mostrarDefinicion(termino) {
  const data = diccionarioMedico[termino];
  if (!data) return;

  const resultado = document.getElementById("resultado");
  if (!resultado) return;

  const catLabel = data.categoria && CATEGORIAS[data.categoria]
    ? `<span class="cat-badge">${CATEGORIAS[data.categoria]}</span>`
    : "";

  const relacionadasHTML = data.relacionadas
    ? data.relacionadas
        .map(p => diccionarioMedico[p]
          ? `<span class="relacionada" onclick="irA('${p}')">${p}</span>`
          : `<span class="relacionada inactiva">${p}</span>`
        ).join(", ")
    : "—";

  resultado.innerHTML = `
    <h3>${data.titulo} ${catLabel}</h3>
    <p><b>Definición:</b> ${data.definicion}</p>
    <p><b>Ejemplo:</b> ${data.ejemplo}</p>
    <p><b>Relacionadas:</b> ${relacionadasHTML}</p>
  `;
}

// ── Navegar a término relacionado ───────────────────────────
function irA(termino) {
  const input = document.getElementById("busqueda");
  const sug   = document.getElementById("sugerencias");
  if (input) input.value = termino;
  if (sug)   sug.innerHTML = "";
  mostrarDefinicion(termino);
  document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth" });
}

// ── Autocompletar con Tab / Enter ───────────────────────────
function teclaEnter(event) {
  if (event.key === "Enter" || event.key === "Tab") {
    event.preventDefault();
    const ghost = document.getElementById("ghost");
    const input = document.getElementById("busqueda");
    const sug   = document.getElementById("sugerencias");
    if (ghost?.value) {
      input.value = ghost.value;
      ghost.value = "";
      sug.innerHTML = "";
      mostrarDefinicion(input.value);
    }
  }
}

// ── Cerrar sugerencias al click fuera ──────────────────────
document.addEventListener("click", (e) => {
  const sug   = document.getElementById("sugerencias");
  const input = document.getElementById("busqueda");
  if (sug && !sug.contains(e.target) && e.target !== input) {
    sug.innerHTML = "";
  }
});
