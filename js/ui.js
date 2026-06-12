// ============================================================
//  Mermelada Project — ui.js
//  Reloj · Nieve · Sidebar · Botones de ventana · Navegación
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // ── RELOJ ─────────────────────────────────────────────────
  function updateClock() {
    const now   = new Date();
    const h     = now.getHours();
    const m     = String(now.getMinutes()).padStart(2, "0");
    const s     = String(now.getSeconds()).padStart(2, "0");
    document.querySelectorAll(".clock").forEach(el => {
      el.innerHTML = `${h}:${m}<span class="seconds">${s}</span>`;
    });
    setTimeout(updateClock, 1000);
  }
  updateClock();

  // ── SIDEBAR ───────────────────────────────────────────────
  document.addEventListener("click", (e) => {
    const sidebar  = document.querySelector(".sidebar");
    const checkbox = document.getElementById("checkbar");
    if (!sidebar || !checkbox) return;
    if (
      e.target !== sidebar &&
      e.target !== checkbox &&
      !sidebar.contains(e.target)
    ) {
      checkbox.checked = false;
    }
  });

  // ── NIEVE (canvas) ────────────────────────────────────────
  const canvas = document.getElementById("nieve");
  if (canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const copos = Array.from({ length: 100 }, () => ({
      x:        Math.random() * canvas.width,
      y:        Math.random() * canvas.height,
      velocidad: Math.random() * 1.5 + 0.5,
      tamaño:    Math.random() * 4 + 1,
      deriva:    (Math.random() - 0.5) * 0.4,
    }));

    function animar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      copos.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.tamaño, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 255, 0.25)";
        ctx.fill();
        c.y += c.velocidad;
        c.x += c.deriva;
        if (c.y > canvas.height) { c.y = 0; c.x = Math.random() * canvas.width; }
        if (c.x < 0 || c.x > canvas.width) { c.x = Math.random() * canvas.width; }
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
        btnMin.title = "Minimizar";
      }
      ventana.classList.add("maximizando");
      setTimeout(() => ventana.classList.remove("maximizando"), 300);
    });
  }

  if (btnClose) {
    btnClose.addEventListener("click", () => {
      const ok = confirm("¿Cerrar Mermelada? 👾\n(Se cerrará esta pestaña)");
      if (ok) window.close();
    });
  }

  // ── NAVEGACIÓN ────────────────────────────────────────────
  cargar("inicio");
});

// ── Renderizador de páginas ───────────────────────────────────
function cargar(pagina) {
  const contenido = document.getElementById("contenido");
  if (!contenido) return;

  const checkbox = document.getElementById("checkbar");
  if (checkbox) checkbox.checked = false;

  switch (pagina) {

    case "inicio":
      contenido.innerHTML = `
        <h2>Mermelada <span style="font-size:0.6em;color:#888">&lt;&#47;&gt;</span></h2>
        </br>
        <h5>
          ¿Estás buscando una receta para hacer mermelada?<span
            class="punto-enlace"
            onclick="cargar('receta')"
            title="..."
          >.</span>
        </h5>

        <p>
          Este es mi proyecto de estudio para enfermería. Nació como una
          herramienta personal y creció hasta convertirse en algo que vale
          la pena compartir.
        </p>

        <p>
          Aquí encontrarás un <b>Glosario</b> de terminología médica
          y una <b>Historia de la Enfermería</b> organizada como línea
          del tiempo, desde el Antiguo Egipto hasta la práctica
          contemporánea.
        </p>

        <p>
          El proyecto sigue en construcción. Como la ciencia misma:
          nunca del todo terminado, siempre abierto a corrección.
        </p>

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
            <li>Mezcla las fresas con el azúcar en una olla. Deja reposar 30 minutos hasta que suelten su jugo.</li>
            <li>Agrega el jugo de limón. Lleva a fuego medio, removiendo constantemente.</li>
            <li>Cuando empiece a hervir, baja el fuego y cocina ~25 minutos hasta que espese. Prueba poniendo una gota en un plato frío: si no corre, está lista.</li>
            <li>Vierte en frascos esterilizados, cierra y deja enfriar invertidos.</li>
          </ol>

          <p style="margin-top:16px">
            <span class="relacionada" onclick="cargar('inicio')">← Volver al inicio</span>
          </p>
        </div>
      `;
      break;

    case "glosario":
      renderizarGlosario();
      break;

    case "historia":
      renderizarHistoria();
      break;

    default:
      contenido.innerHTML = `<p>Página no encontrada.</p>`;
  }
}
