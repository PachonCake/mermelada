// ============================================================
//  Mermelada Project — nom.js  (v4.1)
//  Resumen de estudio de la PROY-NOM-045-SSA-2026
//  (vigilancia epidemiológica, prevención y control de las IAAS)
//
//  Contenido parafraseado a partir del texto del proyecto
//  publicado para consulta pública. Los números entre paréntesis
//  (ej. "num. 10.7.6") remiten al numeral del proyecto.
//  Es un PROYECTO: puede cambiar antes de su versión final.
// ============================================================

const NOM_URL = "https://platiica.economia.gob.mx/procesos-participativos/";

const NOM_SECCIONES = [
  // ───────────────────────────────────────────────────────────
  {
    id: "intro", label: "¿Qué es?", icono: "📋",
    titulo: "PROY-NOM-045-SSA-2026",
    subtitulo: "Proyecto de Norma Oficial Mexicana",
    contenido: `
      <div class="figura-card">
        <div class="figura-nombre">Nombre oficial</div>
        <p class="figura-aporte">
          «Para la vigilancia epidemiológica, prevención y control de las infecciones
          asociadas a la atención de la salud». (Ojo con el orden del nombre:
          es <b>NOM-045-SSA-2026</b>)
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Estado: es un proyecto, todavía no es obligatoria</div>
        <p class="figura-aporte">
          Esta versión se publicó en 2026 para una <b>segunda consulta pública</b>, porque
          el proyecto de julio de 2024 cambió de forma sustancial tras los comentarios
          recibidos. Cuando se publique la versión final en el DOF, dejará sin efectos a la
          <b>NOM-045-SSA2-2005</b> («infecciones nosocomiales»). Hasta entonces, no es exigible.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Objetivo y a quién aplica (num. 1)</div>
        <p class="figura-aporte">
          Fija disposiciones obligatorias para vigilar, prevenir y controlar las IAAS, con
          el fin de reforzar la seguridad del paciente y la calidad de la atención, y
          reducir complicaciones y muertes. Aplica a <b>todos los establecimientos para la
          atención médica</b> del Sistema Nacional de Salud: públicos, sociales y privados,
          ambulatorios u hospitalarios (incluye atención dental, salud mental y ambulancias).
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Qué cambia frente a la de 2005</div>
        <p class="figura-aporte">
          Pasa de «infecciones nosocomiales» a <b>IAAS</b>: el riesgo no se limita al paciente
          hospitalizado; también existe en procedimientos ambulatorios y en el propio
          personal de salud. Añade comités, paquetes de acciones preventivas, un comité de
          uso de antimicrobianos y reglas de vigilancia más detalladas.
        </p>
      </div>

      <p class="nom-nota">
        Resumen de estudio: no sustituye al documento oficial. Texto completo en la
        <a class="relacionada" href="${NOM_URL}" target="_blank" rel="noopener noreferrer">plataforma PLATIICA</a>.
      </p>
    `,
  },
  // ───────────────────────────────────────────────────────────
  {
    id: "definiciones", label: "Definiciones", icono: "📖",
    titulo: "Definiciones clave",
    subtitulo: "Con el sentido que les da el proyecto (num. 3)",
    contenido: `
      <div class="figura-card">
        <div class="figura-nombre">IAAS — Infección Asociada a la Atención de la Salud (3.33)</div>
        <p class="figura-aporte">
          Infección local o generalizada causada por un agente infeccioso (o su toxina) que
          <b>no estaba presente ni en incubación</b> cuando la persona ingresó al
          establecimiento o antes de recibir la atención. Puede manifestarse
          <b>incluso después del egreso</b>.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">COVEPCIAAS (3.13 · cap. 6)</div>
        <div class="figura-rol">Comité para la Vigilancia, Prevención y Control de las IAAS</div>
        <p class="figura-aporte">
          Órgano colegiado que coordina las acciones de vigilancia, prevención y control.
          Obligatorio en hospitales de segundo y tercer nivel; lo preside la dirección del
          establecimiento. En el de 2005 se llamaba CODECIN.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">COA y PROA (3.12 · cap. 7)</div>
        <p class="figura-aporte">
          El <b>Comité para la Optimización del uso de Antimicrobianos</b> da seguimiento al
          <b>PROA</b> (programa para usar mejor los antimicrobianos y frenar la resistencia).
          Se reúne de forma ordinaria una vez al mes.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">UVEH (3.60 · 8.9)</div>
        <div class="figura-rol">Unidad de Vigilancia Epidemiológica Hospitalaria</div>
        <p class="figura-aporte">
          Instancia local que coordina la vigilancia de las IAAS y las acciones de prevención
          y control. Su equipo mínimo: médico, enfermería, administrativo y capturista;
          enfermería y médico son de tiempo completo y exclusivo, y crecen con el número de camas.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Brote de IAAS (3.8)</div>
        <p class="figura-aporte">
          Dos o más casos asociados epidemiológicamente (mismo tiempo, lugar y persona), o
          una incidencia mayor a la esperada. También cuenta <b>un solo caso</b> cuando esa
          infección normalmente nunca ocurre en el establecimiento.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Paquete de acciones preventivas (3.39)</div>
        <p class="figura-aporte">
          Conjunto de prácticas con base científica que, aplicadas <b>juntas</b>, reducen el
          riesgo de infección. Solo se considera bien aplicado cuando se hacen
          <b>todas</b> las intervenciones.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Antisepsia · desinfección · esterilización (3.1, 3.16, 3.25)</div>
        <p class="figura-aporte">
          <b>Antisepsia:</b> reduce microorganismos en tejidos vivos (piel, mucosas, heridas).<br>
          <b>Desinfección:</b> destruye o inactiva patógenos en superficies u objetos
          inanimados.<br>
          <b>Esterilización:</b> elimina toda forma de vida microbiana, incluidas esporas y priones.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Barrera máxima (3.7)</div>
        <p class="figura-aporte">
          Medidas durante procedimientos invasivos: higiene de manos, EPP estéril (excepto
          gorro y cubrebocas), antiséptico y campo estéril que delimite el área.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Fricción vs. lavado de manos (3.27, 3.36)</div>
        <p class="figura-aporte">
          <b>Fricción:</b> con solución a base de alcohol. <b>Lavado:</b> con agua y jabón.
          No son intercambiables en todas las situaciones (ver «Prevención»).
        </p>
      </div>
    `,
  },
  // ───────────────────────────────────────────────────────────
  {
    id: "vigilancia", label: "Vigilancia", icono: "🔎",
    titulo: "Vigilancia epidemiológica",
    subtitulo: "Cómo se detectan, cuentan y notifican las IAAS (caps. 8 y 9)",
    contenido: `
      <div class="figura-card">
        <div class="figura-nombre">Quién coordina (8.2 · 8.4)</div>
        <p class="figura-aporte">
          La Dirección General de Epidemiología dirige el SINAVE. Dentro de él, la
          <b>RHOVE</b> (Red Hospitalaria de Vigilancia Epidemiológica) coordina la vigilancia
          de IAAS y de brotes.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Cuatro formas de vigilar (8.10)</div>
        <p class="figura-aporte">
          <b>Activa:</b> la UVEH busca casos a propósito (pases de visita, revisión de
          expedientes, resultados de microbiología cada día, entrevista al paciente).<br>
          <b>Pasiva:</b> el personal ajeno a la UVEH detecta y notifica durante su trabajo normal.<br>
          <b>Convencional:</b> notificación <b>semanal</b> de casos nuevos al SUIVE.<br>
          <b>Centinela:</b> hospitales reconocidos (UCR) que reportan de forma continua al SEVEIAAS.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Notificación</div>
        <p class="figura-aporte">
          El personal de salud notifica un caso a la UVEH <b>por escrito y de inmediato</b>
          (8.13). Los brotes se notifican de inmediato (8.11.2); las unidades centinela
          reportan los casos del brote dentro de las primeras <b>24 horas</b> (8.11.3).
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Denominadores: lo que se cuenta cada día (8.10.3)</div>
        <p class="figura-aporte">
          Cada servicio registra a diario datos para calcular tasas: egresos por grupo de
          edad, días de estancia, <b>días de ventilación mecánica, de catéter central y de
          catéter urinario</b>, y cirugías según grado de contaminación. Se concentran cada mes.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Panorama epidemiológico (8.15)</div>
        <p class="figura-aporte">
          La UVEH elabora un panorama <b>mensual y anual</b> (tasas, agentes, resistencia
          antimicrobiana, brotes y adherencia a higiene de manos y a los paquetes) y lo
          presenta en cada sesión del COVEPCIAAS.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">Laboratorio (cap. 9)</div>
        <p class="figura-aporte">
          Se toma muestra en el <b>100 %</b> de los casos sospechosos (9.1). El área de
          microbiología, donde exista, funciona las 24 horas todo el año (9.2.1).
        </p>
      </div>
    `,
  },
  // ───────────────────────────────────────────────────────────
  {
    id: "prevencion", label: "Prevención", icono: "🛡️",
    titulo: "Prevención y control de infecciones",
    subtitulo: "Lo que más se aplica en el piso (cap. 10)",
    contenido: `
      <div class="figura-card">
        <div class="figura-nombre">🖐️ Higiene de manos (10.7)</div>
        <p class="figura-aporte">
          <b>Cuándo:</b> los 5 momentos de la OMS, y además antes y después de usar guantes.<br>
          <b>1.</b> Antes de tocar al paciente · <b>2.</b> Antes de un procedimiento limpio o aséptico ·
          <b>3.</b> Tras riesgo de contacto con fluidos · <b>4.</b> Después de tocar al paciente ·
          <b>5.</b> Después de tocar su entorno.<br><br>
          <b>Agua y jabón (no alcohol)</b> cuando hay sangre o fluidos, sospecha de
          microorganismos formadores de esporas o manos visiblemente sucias (10.7.6).<br>
          <b>Fricción:</b> alcohol al menos 60 % a 80 %, disponible en cada punto de atención (10.7.9).<br>
          <b>Servicios críticos:</b> jabón con clorhexidina o alcohol/clorhexidina entre 0.5 % y 2 % (10.7.10).
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">💇 Presentación personal (10.5 · 10.7.4)</div>
        <p class="figura-aporte">
          Cabello sujeto, barba y bigote cortos y limpios, <b>uñas cortas, sin esmalte ni
          aplicaciones</b>, antebrazos libres y <b>sin alhajas</b> para quien atiende a pacientes.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">🪪 Precauciones y tarjetas de color (10.8)</div>
        <p class="figura-aporte">
          Las <b>estándar</b> se aplican a todo paciente, sin importar su diagnóstico. Las demás
          se indican desde la sospecha y se registran en el expediente. Las tarjetas deben ser
          lavables y estar en un lugar visible.<br><br>
          <span class="dot-tarjeta" style="background:#d33a3a"></span><b>Rojo — Estándar</b><br>
          <span class="dot-tarjeta" style="background:#e6c32a"></span><b>Amarillo — Contacto</b><br>
          <span class="dot-tarjeta" style="background:#e8832a"></span><b>Naranja — Contacto plus:</b>
          <i>C. difficile</i> y norovirus; solo agua y jabón<br>
          <span class="dot-tarjeta" style="background:#3aa655"></span><b>Verde — Gotas:</b>
          partículas ≥ 5 micras o que viajan hasta 1.5 m<br>
          <span class="dot-tarjeta" style="background:#3b82d6"></span><b>Azul — Vía aérea:</b>
          partículas &lt; 5 micras que quedan suspendidas
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">💉 Antisepsia en accesos venosos (10.12.2)</div>
        <p class="figura-aporte">
          Piel: alcohol isopropílico o etílico al 70–85 %, solo o con clorhexidina al 2 %;
          si no es posible, productos yodados al 10 %. <b>Recién nacidos:</b> alcohol al 70 %,
          evitando yodados. Los puertos de inyección se desinfectan con alcohol al 70 % antes de
          cada uso. Multidosis: etiquetar fecha y hora de preparación, apertura y caducidad.
          Unidosis: usar al abrir y desechar el sobrante.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">🧰 Dispositivos médicos (3.19–3.21 · 10.9)</div>
        <p class="figura-aporte">
          <b>Críticos</b> (rompen piel o mucosa, o entran a sangre o cavidades estériles):
          esterilización. <b>Semicríticos</b> (mucosa íntegra o piel no intacta): desinfección
          de alto nivel. <b>No críticos</b> (piel intacta). La limpieza va siempre primero.
          <b>No son métodos válidos</b> de esterilización: luz ultravioleta, soluciones
          superoxidadas ni la «esterilización de uso inmediato» (10.9.9.21).
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">🗑️ Residuos y agua (10.20 · 10.6)</div>
        <p class="figura-aporte">
          Los RPBI se manejan según la NOM-087-SEMARNAT/SSA1-2002. El cloro residual del agua
          debe mantenerse entre 0.2 y 1.5 ppm.
        </p>
      </div>
    `,
  },
  // ───────────────────────────────────────────────────────────
  {
    id: "paquetes", label: "Paquetes", icono: "📦",
    titulo: "Paquetes de acciones preventivas",
    subtitulo: "Infecciones ligadas a dispositivos y cirugía (10.12)",
    contenido: `
      <p class="nom-nota">
        El proyecto exige aplicar el paquete completo con enfoque multidisciplinario. Los pasos
        exactos de cada paquete están en lineamientos aparte (num. 5.3.2.3.7 y 5.3.2.3.8); aquí
        solo van las obligaciones que sí aparecen en el texto de la norma.
      </p>

      <div class="figura-card">
        <div class="figura-nombre">IVU asociada a catéter urinario (10.12.1)</div>
        <p class="figura-aporte">
          Colocar la sonda solo con criterios justificados y retirarla en cuanto sea posible.
          Se identifica con un membrete: datos del dispositivo, <b>quién la instaló, fecha y
          hora</b>. Médico y enfermería verifican su funcionamiento <b>todos los días</b>.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">ITS asociada a acceso venoso (10.12.2)</div>
        <p class="figura-aporte">
          Instalar y mantener accesos periféricos y centrales solo cuando se justifique, y
          registrarlo en el expediente. El acceso central lo instala personal capacitado con
          <b>barrera máxima</b> (y ecografía si hay equipo). Su manejo, solo por personal
          capacitado y con asepsia y antisepsia estrictas.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">NAV — neumonía asociada a ventilación (10.12.3)</div>
        <p class="figura-aporte">
          La ventilación mecánica se instala y se mantiene solo con criterios justificados.
          El equipo multidisciplinario la verifica cada día y lo documenta. Los
          <b>circuitos de ventilación e inhaloterapia son desechables</b>.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">ISQ — infección del sitio quirúrgico (10.12.4)</div>
        <p class="figura-aporte">
          Protocolo perioperatorio, actualizado al menos cada 2 años. Uniforme exclusivo de
          quirófano, uñas cortas y sin esmalte, sin alhajas, y <b>poco tránsito</b> por las
          áreas blancas. Una ISQ se notifica de inmediato a la UVEH.
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre"><i>Clostridioides difficile</i> y neonatos</div>
        <p class="figura-aporte">
          Hay un paquete propio para <i>C. difficile</i> (con precauciones de contacto plus:
          solo agua y jabón) y paquetes específicos para <b>neonatos y lactantes</b> (ventilador,
          catéter central, catéter urinario y cirugías). Detalle en los lineamientos.
        </p>
      </div>

      <p class="nom-nota">
        Para el procedimiento paso a paso, consulta el «Manual para la implementación de los
        paquetes de acciones para prevenir y vigilar las IAAS» (Secretaría de Salud, 2019),
        que el propio proyecto cita en su bibliografía.
      </p>
    `,
  },
  // ───────────────────────────────────────────────────────────
  {
    id: "rol", label: "Tu rol", icono: "👤",
    titulo: "Tu papel como personal de salud",
    subtitulo: "La norma te nombra: incluye personal técnico y auxiliar (3.44)",
    contenido: `
      <div class="figura-card">
        <div class="figura-nombre">Eres «personal de salud» para la norma</div>
        <p class="figura-aporte">
          La definición incluye a quien tiene formación profesional, técnica <b>o auxiliar</b>
          y participa directa o indirectamente en la atención. Conocer y aplicar las medidas
          de prevención y control de infecciones es responsabilidad de todo ese personal (10.2),
          y la vigilancia de las IAAS es tarea de directivos, personal de salud y administrativo (5.6).
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">✅ Lo que te toca hacer</div>
        <p class="figura-aporte">
          · Higiene de manos en sus momentos, y antes y después de los guantes (10.7.5)<br>
          · Presentación personal: uñas cortas sin esmalte, sin alhajas, cabello sujeto (10.5)<br>
          · Aplicar las precauciones que indique la tarjeta del paciente (10.8)<br>
          · <b>Notificar por escrito y de inmediato</b> a la UVEH cualquier caso (8.13)<br>
          · Orientar a pacientes, cuidadores y visitas sobre las precauciones (10.8.1.2 · 11.3)<br>
          · Recibir capacitación en higiene de manos <b>al ingresar y al menos una vez al año</b>;
            incluye al <b>personal en formación</b> (10.7.3)
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">🩹 Cuidado del propio personal (10.21)</div>
        <p class="figura-aporte">
          · Esquema de vacunación completo según tu actividad<br>
          · Atención inmediata si sufres un pinchazo, corte o salpicadura con fluidos<br>
          · Informar a la UVEH si tú tienes una infección sujeta a vigilancia<br>
          · Uniforme clínico según el área, y no comer fuera del comedor o lugar designado
        </p>
      </div>

      <div class="figura-card">
        <div class="figura-nombre">📊 Para qué sirven los denominadores</div>
        <p class="figura-aporte">
          Los días de catéter, sonda y ventilador que se anotan cada día son la base para
          calcular tasas de infección (por ejemplo, por cada 1,000 días de dispositivo). Una
          anotación diaria completa hace que las tasas sean confiables.
        </p>
      </div>

      <p class="nom-nota">
        El alcance exacto de tus funciones depende de tu institución y de tu nivel de
        formación; ante dudas, consúltalo con tu jefatura de enfermería.
      </p>
    `,
  },
];

// ── Estado y navegación ─────────────────────────────────────
let _nomActual = 0;

function renderizarNom() {
  const contenido = document.getElementById("contenido");
  if (!contenido) return;
  _nomActual = 0;

  const carril = NOM_SECCIONES.map((s, i) =>
    `<button class="era-chip ${i === 0 ? "activo" : ""}" id="nomchip-${i}"
      onclick="irANom(${i})">${s.icono} ${s.label}</button>`
  ).join("");

  contenido.innerHTML = `
    <h2>NOM-045 / IAAS <span style="font-size:0.6em;color:var(--text-dim)">&lt;&#47;&gt;</span></h2>
    <p class="nom-nota" style="text-align:left">
      Resumen de estudio del <b>proyecto</b> PROY-NOM-045-SSA-2026. No sustituye al texto oficial.
    </p>
    <div class="carril-eras">${carril}</div>

    <div class="timeline-nav">
      <button class="tl-arrow" id="nom-prev" onclick="cambiarNom(-1)" aria-label="Anterior">&#8592;</button>
      <div class="era-card" id="nom-card" aria-live="polite"></div>
      <button class="tl-arrow" id="nom-next" onclick="cambiarNom(1)"  aria-label="Siguiente">&#8594;</button>
    </div>
  `;
  renderizarSeccionNom(0);
}

function renderizarSeccionNom(idx) {
  const card = document.getElementById("nom-card");
  if (!card) return;
  const s = NOM_SECCIONES[idx];

  card.innerHTML = `
    <div class="era-header">
      <span class="era-icono">${s.icono}</span>
      <div>
        <h3 class="era-titulo">${s.titulo}</h3>
        <span class="era-periodo">${s.subtitulo}</span>
      </div>
    </div>
    ${s.contenido}
  `;

  document.querySelectorAll(".era-chip[id^='nomchip']").forEach((c, i) =>
    c.classList.toggle("activo", i === idx)
  );
  const prev = document.getElementById("nom-prev");
  const next = document.getElementById("nom-next");
  if (prev) prev.disabled = idx === 0;
  if (next) next.disabled = idx === NOM_SECCIONES.length - 1;
}

function cambiarNom(delta) {
  const nuevo = _nomActual + delta;
  if (nuevo < 0 || nuevo >= NOM_SECCIONES.length) return;
  _nomActual = nuevo;
  renderizarSeccionNom(_nomActual);
  document.getElementById("nom-card")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function irANom(idx) {
  _nomActual = idx;
  renderizarSeccionNom(idx);
}
