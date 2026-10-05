// ============================================================
//  Mermelada Project — ui.js  (v4.1)
//  Tema · Reloj · Nieve · Sidebar · Botones de ventana · Navegación
// ============================================================

// ── TEMA (persistente) ───────────────────────────────────────
// El tema se guarda en localStorage y se aplica desde el <head>
// antes de pintar. Aquí vive el botón y la sincronización.
const TEMA_KEY = "mermelada-tema";
const TEMA_COLOR_BARRA = { dark: "#060011", light: "#e2d3c7" };
let colorNieve = "rgba(0,255,255,0.25)";

function temaActual() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function leerColorNieve() {
  const c = getComputedStyle(document.documentElement).getPropertyValue("--snow").trim();
  if (c) colorNieve = c;
}

function aplicarTema(tema, guardar) {
  const root = document.documentElement;
  root.classList.add("cambiando-tema");
  root.setAttribute("data-theme", tema);
  setTimeout(() => root.classList.remove("cambiando-tema"), 350);

  if (guardar) {
    try { localStorage.setItem(TEMA_KEY, tema); } catch (e) { /* modo privado: sin persistencia */ }
  }

  // Botón: muestra a qué tema vas a cambiar
  const btn = document.getElementById("themeBtn");
  if (btn) {
    const aClaro = tema === "dark";
    btn.textContent = aClaro ? "\u2600" : "\u263E";           // ☀ / ☾
    btn.title = aClaro ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
    btn.setAttribute("aria-label", btn.title);
  }

  // Barra del navegador en móvil
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", TEMA_COLOR_BARRA[tema]);

  leerColorNieve();
}

function alternarTema() {
  aplicarTema(temaActual() === "dark" ? "light" : "dark", true);
}

document.addEventListener("DOMContentLoaded", () => {

  // Estado inicial del botón (el atributo data-theme ya lo puso el <head>)
  aplicarTema(temaActual(), false);
  document.getElementById("themeBtn")?.addEventListener("click", alternarTema);

  // Si cambias el tema en otra pestaña, esta se actualiza sola
  window.addEventListener("storage", (e) => {
    if (e.key === TEMA_KEY && (e.newValue === "light" || e.newValue === "dark")) {
      aplicarTema(e.newValue, false);
    }
  });

  // ── RELOJ ─────────────────────────────────────────────────
  function updateClock() {
    const now = new Date();
    const h   = now.getHours();
    const m   = String(now.getMinutes()).padStart(2, "0");
    const s   = String(now.getSeconds()).padStart(2, "0");
    document.querySelectorAll(".clock").forEach(el => {
      el.innerHTML = `${h}:${m}<span class="seconds">${s}</span>`;
    });
    setTimeout(updateClock, 1000);
  }
  updateClock();

  // ── SIDEBAR: cerrar al tocar fuera ────────────────────────
  document.addEventListener("click", (e) => {
    const sidebar  = document.querySelector(".sidebar");
    const checkbox = document.getElementById("checkbar");
    const menuLbl  = document.querySelector(".footer .menu label");
    if (!sidebar || !checkbox) return;
    // Un clic en el ícono ⌂ (label) genera además un clic sintético sobre el
    // checkbox: ambos deben ignorarse, o el menú se abre y se cierra al instante.
    if (e.target === checkbox || sidebar.contains(e.target) ||
        (menuLbl && menuLbl.contains(e.target))) return;
    checkbox.checked = false;
  });

  // ── NIEVE (canvas) ────────────────────────────────────────
  const canvas = document.getElementById("nieve");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resizeCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const copos = Array.from({ length: 100 }, () => ({
      x:         Math.random() * canvas.width,
      y:         Math.random() * canvas.height,
      velocidad: Math.random() * 1.5 + 0.5,
      tamano:    Math.random() * 4 + 1,
      deriva:    (Math.random() - 0.5) * 0.4,
    }));

    function animar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = colorNieve;
      copos.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.tamano, 0, Math.PI * 2);
        ctx.fill();
        if (reducir) return;                       // sin movimiento si el usuario lo pidió
        c.y += c.velocidad;
        c.x += c.deriva;
        if (c.y > canvas.height) { c.y = 0; c.x = Math.random() * canvas.width; }
        if (c.x < 0 || c.x > canvas.width) c.x = Math.random() * canvas.width;
      });
      requestAnimationFrame(animar);
    }
    animar();
  }

  // ── BOTONES DE VENTANA ────────────────────────────────────
  const ventana  = document.querySelector(".window");
  const btnMin   = document.querySelector(".minimize");
  const btnMax   = document.querySelector(".maximize");
  const btnClose = document.querySelector(".close");
  let minimizado = false;

  if (btnMin && ventana) {
    btnMin.addEventListener("click", () => {
      minimizado = !minimizado;
      ventana.classList.toggle("minimizado", minimizado);
      btnMin.title = minimizado ? "Restaurar" : "Minimizar";
    });
  }
  if (btnMax && ventana) {
    btnMax.addEventListener("click", () => {
      if (minimizado) {
        minimizado = false;
        ventana.classList.remove("minimizado");
        if (btnMin) btnMin.title = "Minimizar";
      }
      ventana.classList.add("maximizando");
      setTimeout(() => ventana.classList.remove("maximizando"), 300);
    });
  }
  if (btnClose) {
    btnClose.addEventListener("click", () => {
      if (confirm("¿Cerrar Mermelada? 👾\n(Se cerrará esta pestaña)")) window.close();
    });
  }

  cargar("inicio");
});

// ── Renderizador de páginas ───────────────────────────────────
function cargar(pagina) {
  const contenido = document.getElementById("contenido");
  if (!contenido) return;

  const checkbox = document.getElementById("checkbar");
  if (checkbox) checkbox.checked = false;
  document.querySelector(".prince")?.scrollTo({ top: 0 });

  switch (pagina) {

    case "inicio":
      contenido.innerHTML = `
        <h2>Mermelada <span style="font-size:0.6em;color:var(--text-dim)">&lt;&#47;&gt;</span></h2>
        <p>¿Estás buscando una receta para hacer mermelada<span
          class="punto-enlace" onclick="cargar('receta')" title="...">.</span>
        </p>
        <p>Este es mi proyecto de estudio para enfermería. Nació como una
        herramienta personal y creció hasta convertirse en algo que vale
        la pena compartir.</p>
        <p>Aquí encontrarás un <b>Glosario</b> de terminología médica,
        una <b>Historia de la Enfermería</b>, una <b>Calculadora</b> de
        farmacología, un resumen de la <b>NOM-045 e IAAS</b>, y un
        apartado de <b>Salud Mental</b>.</p>
        <p>El proyecto sigue en construcción. Como la ciencia misma:
        nunca del todo terminado, siempre abierto a corrección.</p>
        <p class="firma">— Ponjoso</p>
      `;
      break;

    case "receta":
      contenido.innerHTML = `
        <div class="receta-secret">
          <h2>🍓 Receta de Mermelada de Fresa</h2>
          <p class="receta-aviso">Página secreta. No se la digas a nadie.</p>
          <h4>Ingredientes</h4>
          <ul class="receta-lista">
            <li>500 g de fresas frescas</li>
            <li>300 g de azúcar</li>
            <li>Jugo de ½ limón</li>
          </ul>
          <h4>Preparación</h4>
          <ol class="receta-lista">
            <li>Lava y desinfecta las fresas. Retira el tallo y córtalas en cuartos.</li>
            <li>Mezcla las fresas con el azúcar en una olla. Deja reposar 30 min hasta que suelten su jugo.</li>
            <li>Agrega el jugo de limón. Lleva a fuego medio, removiendo constantemente.</li>
            <li>Cuando hierva, baja el fuego y cocina ~25 min hasta que espese. Prueba poniendo una gota en un plato frío: si no corre, está lista.</li>
            <li>Vierte en frascos esterilizados, cierra y deja enfriar invertidos.</li>
          </ol>
          <p style="margin-top:16px">
            <span class="relacionada" onclick="cargar('inicio')">← Volver al inicio</span>
          </p>
        </div>
      `;
      break;

    case "glosario":      renderizarGlosario();      break;
    case "historia":      renderizarHistoria();      break;
    case "farmacologia":  renderizarFarmacologia();  break;
    case "nom":           renderizarNom();           break;
    case "salud-mental":  renderizarSaludMental();   break;

    default:
      contenido.innerHTML = `<p>Página no encontrada.</p>`;
  }
}
