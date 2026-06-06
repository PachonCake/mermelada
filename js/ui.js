// ============================================================
//  Mermelada Project — ui.js
//  Reloj · Nieve · Sidebar · Botones de ventana · Navegación
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // ── RELOJ ─────────────────────────────────────────────────
  function updateClock() {
    const now     = new Date();
    const h       = now.getHours();
    const m       = String(now.getMinutes()).padStart(2, "0");
    const s       = String(now.getSeconds()).padStart(2, "0");
    const secHtml = `<span class="seconds">${s}</span>`;
    document.querySelectorAll(".clock").forEach(el => {
      el.innerHTML = `${h}:${m}${secHtml}`;
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
  // El canvas vive en el body, detrás de .window (z-index < 1)
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
        if (c.y > canvas.height) {
          c.y = 0;
          c.x = Math.random() * canvas.width;
        }
        if (c.x < 0 || c.x > canvas.width) {
          c.x = Math.random() * canvas.width;
        }
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
  let alturaOriginal = null;

  // Restaurar/Minimizar — colapsa a solo la barra de título
  if (btnMin && ventana) {
    btnMin.addEventListener("click", () => {
      if (!minimizado) {
        alturaOriginal = ventana.style.bottom || "";
        ventana.classList.add("minimizado");
        btnMin.title = "Restaurar";
        minimizado = true;
      } else {
        ventana.classList.remove("minimizado");
        btnMin.title = "Minimizar";
        minimizado = false;
      }
    });
  }

  // Maximizar — restaura si estaba minimizado, sin efecto extra
  if (btnMax && ventana) {
    btnMax.addEventListener("click", () => {
      if (minimizado) {
        ventana.classList.remove("minimizado");
        btnMin.title = "Minimizar";
        minimizado = false;
      }
      // Efecto visual breve de "rebote"
      ventana.classList.add("maximizando");
      setTimeout(() => ventana.classList.remove("maximizando"), 300);
    });
  }

  // Cerrar — pide confirmación antes de cerrar la pestaña
  if (btnClose) {
    btnClose.addEventListener("click", () => {
      const confirmar = confirm("¿Cerrar Mermelada? 👾\n(Se cerrará esta pestaña)");
      if (confirmar) window.close();
    });
  }

  // ── NAVEGACIÓN INTERNA ────────────────────────────────────
  // Carga la página de inicio por defecto
  cargar("inicio");
});

// ── Renderizador de páginas ───────────────────────────────────
// Sin fetch. Todo se renderiza desde aquí.
function cargar(pagina) {
  const contenido = document.getElementById("contenido");
  if (!contenido) return;

  // Cerrar sidebar al navegar
  const checkbox = document.getElementById("checkbar");
  if (checkbox) checkbox.checked = false;

  switch (pagina) {
    case "inicio":
      contenido.innerHTML = `
        <h2>Mermelada <span style="font-size:0.6em;color:#888">&lt;&#47;&gt;</span></h2>
        <h4 style="color:#666;text-align:right">Amm...</h4>
        <h5 style="color:#555;text-align:right">Acaso...</h5>
        <h5 style="color:#555;text-align:right">¿Estás buscando una receta para hacer una Mermelada?</h5>
        <p>Pues mira, esto es un proyecto de enfermería, únicamente con el propósito de apoyar mis estudios
        y, ¿por qué no?, hacerlo público y ayudar a otros.</p>
        <p>Usa el menú lateral para navegar al <b>Diccionario</b> médico.</p>
      `;
      break;

    case "diccionario":
      renderizarDiccionario();
      break;

    default:
      contenido.innerHTML = `<p>Página no encontrada.</p>`;
  }
}
