// ============================================================
//  Mermelada Project — salud-mental.js
//  Tres modos:
//    "apoyo"       → soy apoyo / necesito brindar primeros auxilios
//    "profesional" → soy profesional de salud
//    "ayuda"       → necesito ayuda
//
//  Nota: este módulo está diseñado para ser útil, no para
//  reemplazar atención profesional. Siempre se dirige al usuario
//  hacia recursos reales cuando corresponde.
// ============================================================

function renderizarSaludMental() {
  const contenido = document.getElementById("contenido");
  if (!contenido) return;

  contenido.innerHTML = `
    <h2>Salud Mental <span style="font-size:0.6em;color:var(--text-dim)">&lt;&#47;&gt;</span></h2>
    <div class="sm-banner" role="note">
      <p><b>Si hay riesgo inmediato:</b> llama al
      <a href="tel:911" class="sm-tel">911</a>.
      Apoyo emocional 24 h: <b>Línea de la Vida</b>
      <a href="tel:8009112000" class="sm-tel">800 911 2000</a> ·
      <b>SAPTEL</b> <a href="tel:5552598121" class="sm-tel">55 5259-8121</a>.</p>
    </div>
    <p class="sm-subtitulo">¿Desde dónde estás entrando hoy?</p>

    <div class="sm-modos">

      <button class="sm-modo-btn" onclick="mostrarModo('apoyo')">
        <span class="sm-modo-icono">🤝</span>
        <span class="sm-modo-titulo">Quiero ayudar</span>
        <span class="sm-modo-desc">Acompaño a alguien o necesito brindar primeros auxilios psicológicos</span>
      </button>

      <button class="sm-modo-btn" onclick="mostrarModo('profesional')">
        <span class="sm-modo-icono">🩺</span>
        <span class="sm-modo-titulo">Soy personal de salud</span>
        <span class="sm-modo-desc">Busco información clínica, protocolos y autocuidado profesional</span>
      </button>

      <button class="sm-modo-btn sm-modo-ayuda" onclick="mostrarModo('ayuda')">
        <span class="sm-modo-icono">💙</span>
        <span class="sm-modo-titulo">Necesito ayuda</span>
        <span class="sm-modo-desc">Estoy pasando por algo difícil y busco orientación</span>
      </button>

    </div>

    <div id="sm-contenido" aria-live="polite"></div>
  `;
}

// ── Dispatcher de modos ─────────────────────────────────────
function mostrarModo(modo) {
  document.querySelectorAll(".sm-modo-btn").forEach(b =>
    b.classList.toggle("activo", b.getAttribute("onclick").includes(`'${modo}'`))
  );

  const el = document.getElementById("sm-contenido");
  if (!el) return;

  const modos = { apoyo: modoApoyo, profesional: modoProfesional, ayuda: modoAyuda };
  (modos[modo] || (() => {}))();
}

// ════════════════════════════════════════════════════════════
//  MODO 1 — QUIERO AYUDAR / PRIMEROS AUXILIOS PSICOLÓGICOS
// ════════════════════════════════════════════════════════════
function modoApoyo() {
  const el = document.getElementById("sm-contenido");
  if (!el) return;

  const subtemas = [
    { id: "pap",     label: "¿Qué son los PAP?",    icono: "📖" },
    { id: "escucha", label: "Escucha activa",        icono: "👂" },
    { id: "crisis",  label: "Crisis emocional",      icono: "⚡" },
    { id: "nohay",   label: "Qué NO hacer",          icono: "🚫" },
    { id: "cuando",  label: "Cuándo derivar",        icono: "🔁" },
  ];

  el.innerHTML = `
    <div class="sm-seccion">
      <h3 class="sm-seccion-titulo">🤝 Primeros Auxilios Psicológicos (PAP)</h3>
      <div class="carril-eras" style="flex-wrap:wrap">
        ${subtemas.map((s, i) =>
          `<button class="era-chip ${i === 0 ? "activo" : ""}" id="papchip-${s.id}"
            onclick="mostrarPAP('${s.id}')">${s.icono} ${s.label}</button>`
        ).join("")}
      </div>
      <div id="pap-contenido" style="margin-top:10px"></div>
    </div>
  `;

  mostrarPAP("pap");
}

const PAP_CONTENIDO = {
  pap: `
    <div class="figura-card">
      <div class="figura-nombre">¿Qué son los Primeros Auxilios Psicológicos?</div>
      <p class="figura-aporte">
        Los PAP son una respuesta humana, de apoyo, a otra persona que está sufriendo y
        que puede necesitar ayuda. Son breves, no son terapia y cualquier persona puede
        aprenderlos. Su objetivo es <b>reducir el estrés inicial</b> y apoyar la
        adaptación a corto y largo plazo.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Modelo de la OMS: Observar · Escuchar · Conectar</div>
      <p class="figura-aporte">
        La guía de campo de la OMS resume los PAP en tres acciones:<br>
        <b>Observar</b> — revisa que el lugar sea seguro y quién necesita ayuda urgente<br>
        <b>Escuchar</b> — acércate, pregunta qué necesita y escucha sin presionar<br>
        <b>Conectar</b> — ayúdale con lo práctico y a contactar a su gente y a los servicios
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Modelo NCTSN (EE. UU.): 8 acciones centrales</div>
      <p class="figura-aporte">
        <b>1. Contacto y aproximación</b> — acercarse de forma no intrusiva<br>
        <b>2. Seguridad e información</b> — orientar sobre qué está pasando<br>
        <b>3. Estabilización</b> — calmar a quienes están abrumados<br>
        <b>4. Identificar necesidades</b> — escuchar sin juzgar<br>
        <b>5. Asistencia práctica</b> — ayuda concreta e inmediata<br>
        <b>6. Conexión con apoyos</b> — familia, redes, servicios<br>
        <b>7. Información sobre el afrontamiento</b> — normalizar reacciones<br>
        <b>8. Vinculación con servicios</b> — derivar cuando es necesario
      </p>
    </div>
  `,
  escucha: `
    <div class="figura-card">
      <div class="figura-nombre">Escucha activa — principios</div>
      <p class="figura-aporte">
        <b>Presencia:</b> cierra tu teléfono, mira a la persona, no estés "de paso"<br>
        <b>Silencio útil:</b> no llenar cada pausa. El silencio le da espacio a la persona para continuar<br>
        <b>No interrumpir:</b> deja que termine su pensamiento antes de responder<br>
        <b>Reflejar sin interpretar:</b> "Escucho que te sientes solo" — no "es que tú eres muy sensible"<br>
        <b>Validar:</b> "Tiene sentido que te sientas así dada la situación"
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Frases que ayudan</div>
      <p class="figura-aporte">
        "Aquí estoy contigo."<br>
        "No tienes que enfrentar esto solo/a."<br>
        "No necesitas tener todo claro para hablar de ello."<br>
        "Me importa cómo estás."<br>
        "¿Qué necesitas ahora mismo?"
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Frases que dañan aunque tengan buena intención</div>
      <p class="figura-aporte">
        "Otros están peor que tú." — minimiza<br>
        "Ya va a pasar." — descarta el presente<br>
        "Tienes que ser fuerte." — invalida el dolor<br>
        "Sé exactamente cómo te sientes." — centra la atención en ti<br>
        "Todo pasa por algo." — puede sentirse cruel en crisis
      </p>
    </div>
  `,
  crisis: `
    <div class="figura-card">
      <div class="figura-nombre">¿Qué es una crisis emocional?</div>
      <p class="figura-aporte">
        Un estado temporal de desequilibrio emocional en el que la persona percibe que
        sus recursos habituales no son suficientes para manejar la situación. No es una
        señal de debilidad — es una respuesta humana ante situaciones desbordantes.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Señales de una crisis activa</div>
      <p class="figura-aporte">
        · Llanto intenso o incapacidad de llorar (entumecimiento)<br>
        · Agitación o parálisis motora<br>
        · Respiración acelerada, temblor<br>
        · Confusión, desorientación<br>
        · Expresiones de desesperanza: "ya no puedo más", "para qué todo esto"<br>
        · Aislamiento repentino o búsqueda desesperada de contacto
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Qué hacer paso a paso</div>
      <p class="figura-aporte">
        <b>1. Acércate con calma.</b> Habla despacio, en voz baja.<br>
        <b>2. Pregunta directamente:</b> "¿Cómo estás? ¿Estás a salvo?"<br>
        <b>3. No dejes a la persona sola</b> si hay riesgo para sí misma.<br>
        <b>4. Técnica de anclaje sensorial:</b> pídele que nombre 5 cosas que puede ver,
        4 que puede tocar, 3 que puede oír — esto ayuda a salir de la espiral.<br>
        <b>5. Respiración:</b> inhala 4 seg · sostén 4 · exhala 6. Hazlo junto con ella.<br>
        <b>6. Si hay riesgo inmediato:</b> contacta servicios de emergencia.
      </p>
    </div>
  `,
  nohay: `
    <div class="figura-card">
      <div class="figura-nombre">Lo que NO debes hacer como apoyo</div>
      <p class="figura-aporte">
        <b>No diagnostiques.</b> "Creo que tienes depresión" — aunque sea verdad, no te corresponde.<br><br>
        <b>No des soluciones inmediatas.</b> La persona primero necesita ser escuchada, no arreglada.<br><br>
        <b>No normalices en exceso.</b> "Todo el mundo se siente así" puede hacer sentir que su dolor no importa.<br><br>
        <b>No prometas confidencialidad absoluta</b> si existe riesgo para la vida — deberás buscar ayuda.<br><br>
        <b>No actúes desde el miedo.</b> Si mencionan pensamientos de hacerse daño, no cambies de tema — pregunta con calma.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">El mito de "si no lo mencionas, no lo planta"</div>
      <p class="figura-aporte">
        Preguntar directamente sobre pensamientos suicidas <b>NO los provoca ni los refuerza</b>.
        La evidencia indica que preguntar con calma y sin juicio puede ser el primer paso
        para que la persona busque ayuda. No evites el tema.
      </p>
    </div>
  `,
  cuando: `
    <div class="figura-card">
      <div class="figura-nombre">Señales de que necesita apoyo profesional</div>
      <p class="figura-aporte">
        · La crisis dura más de unos días sin mejoría<br>
        · Hay pensamientos de hacerse daño o hacerle daño a otros<br>
        · No puede realizar actividades básicas (comer, dormir, trabajar)<br>
        · Consume alcohol u otras sustancias para manejar el dolor<br>
        · Has llegado a tu límite como apoyo — eso también es válido
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">📞 Líneas de crisis en México</div>
      <p class="figura-aporte">
        <b>Línea de la Vida (CONASAMA):</b> <a href="tel:8009112000" class="sm-tel">800 911 2000</a>
        · gratuita, 24 h, todo el año<br>
        <b>SAPTEL:</b> <a href="tel:5552598121" class="sm-tel">55 5259-8121</a> · 24 h<br>
        <b>Emergencias:</b> <a href="tel:911" class="sm-tel">911</a> — si hay riesgo inmediato<br><br>
        Puedes acompañar a la persona mientras llama, o llamar tú si no puede hacerlo.
        Si no hay forma de que se quede acompañada, no la dejes sola mientras llega ayuda.
      </p>
    </div>
  `,
};

function mostrarPAP(id) {
  document.querySelectorAll(".era-chip[id^='papchip']").forEach(c =>
    c.classList.toggle("activo", c.id === `papchip-${id}`)
  );
  const el = document.getElementById("pap-contenido");
  if (el) el.innerHTML = PAP_CONTENIDO[id] || "";
}

// ════════════════════════════════════════════════════════════
//  MODO 2 — PERSONAL DE SALUD / PROFESIONAL
// ════════════════════════════════════════════════════════════
function modoProfesional() {
  const el = document.getElementById("sm-contenido");
  if (!el) return;

  const subtemas = [
    { id: "valoracion", label: "Valoración",    icono: "📋" },
    { id: "trastornos", label: "Trastornos",    icono: "🧠" },
    { id: "burnout",    label: "Autocuidado",   icono: "🌱" },
    { id: "comunicacion", label: "Comunicación",icono: "💬" },
  ];

  el.innerHTML = `
    <div class="sm-seccion">
      <h3 class="sm-seccion-titulo">🩺 Referencia clínica — Salud Mental</h3>
      <div class="carril-eras" style="flex-wrap:wrap">
        ${subtemas.map((s, i) =>
          `<button class="era-chip ${i === 0 ? "activo" : ""}" id="profchip-${s.id}"
            onclick="mostrarProf('${s.id}')">${s.icono} ${s.label}</button>`
        ).join("")}
      </div>
      <div id="prof-contenido" style="margin-top:10px"></div>
    </div>
  `;

  mostrarProf("valoracion");
}

const PROF_CONTENIDO = {
  valoracion: `
    <div class="figura-card">
      <div class="figura-nombre">Valoración de enfermería en salud mental</div>
      <p class="figura-aporte">
        La valoración incluye dimensiones físicas, psicológicas, sociales y espirituales.
        Observar: apariencia, higiene, contacto visual, lenguaje, orientación (persona,
        tiempo, espacio), estado de ánimo referido y observado, pensamiento (coherencia,
        velocidad, contenido), percepción (alucinaciones), memoria y juicio.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Escala PHQ-9 — Detección de depresión</div>
      <p class="figura-aporte">
        Cuestionario de 9 ítems que evalúa síntomas depresivos en las últimas 2 semanas.
        Puntuación: 0-4 mínima · 5-9 leve · 10-14 moderada · 15-19 moderada-severa · 20-27 severa.
        Ampliamente usado en atención primaria; una puntuación ≥ 10 suele motivar valoración profesional. <b>El ítem 9</b> (pensamientos de muerte o de hacerse daño) requiere atención aunque el total sea bajo. Es una herramienta de tamizaje, no un diagnóstico.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Escala GAD-7 — Detección de ansiedad</div>
      <p class="figura-aporte">
        7 ítems para trastorno de ansiedad generalizada. Puntuación: 0-4 mínima ·
        5-9 leve · 10-14 moderada · 15-21 severa. Útil también para tamizaje de
        trastorno de pánico y ansiedad social.
      </p>
    </div>
  `,
  trastornos: `
    <div class="figura-card">
      <div class="figura-nombre">Episodio depresivo (depresión)</div>
      <div class="figura-rol">CIE-11: 6A70 / 6A71 · afecta a ~5 % de los adultos (OMS)</div>
      <p class="figura-aporte">
        Síntomas ≥ 2 semanas: estado de ánimo deprimido, anhedonia (pérdida del placer),
        cambios en apetito/peso, insomnio o hipersomnia, fatiga, sentimientos de
        inutilidad, dificultad de concentración, pensamientos de muerte.
        Intervención de enfermería: entorno seguro, escucha sin juicio, fomentar rutinas,
        apoyar adherencia al tratamiento.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Trastorno de ansiedad generalizada (TAG)</div>
      <div class="figura-rol">CIE-11: 6B00</div>
      <p class="figura-aporte">
        Preocupación excesiva, persistente e incontrolable sobre múltiples temas.
        Acompaña: tensión muscular, fatiga, irritabilidad, insomnio. Intervención:
        técnicas de respiración, psicoeducación, reducción de estimulantes, derivación.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Crisis de pánico</div>
      <div class="figura-rol">CIE-11: 6B01</div>
      <p class="figura-aporte">
        Episodio abrupto de miedo intenso con síntomas físicos: taquicardia, disnea,
        mareo, sudoración, parestesias, sensación de muerte inminente. Duración: 10-20 min.
        <b>En urgencias:</b> descartar causa orgánica primero. Manejo: entorno tranquilo,
        acompañamiento, respiración diafragmática.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Ideación suicida — protocolo básico</div>
      <div class="figura-rol">Prioridad clínica máxima</div>
      <p class="figura-aporte">
        Preguntar directamente: "¿Has tenido pensamientos de hacerte daño o de morir?"
        Evaluar: <b>ideación</b> (¿piensa en ello?) · <b>plan</b> (¿tiene cómo?) ·
        <b>intención</b> (¿planea actuar?) · <b>medios</b> (¿tiene acceso?).
        Ante plan + intención + medios: no dejar a la persona sola, alejar el acceso a los medios si es seguro hacerlo, notificar al médico y activar el protocolo de la institución (o llamar al 911).
      </p>
    </div>
  `,
  burnout: `
    <div class="figura-card">
      <div class="figura-nombre">Burnout en personal de enfermería</div>
      <p class="figura-aporte">
        La OMS (CIE-11) lo describe como un <b>fenómeno ocupacional</b>, no como una
        enfermedad: agotamiento, distanciamiento mental o cinismo hacia el trabajo y menor
        eficacia profesional, por estrés laboral crónico mal gestionado. En enfermería es
        frecuente — reconocerlo no es debilidad, es inteligencia profesional.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Señales tempranas a vigilar en ti mismo</div>
      <p class="figura-aporte">
        · Irritabilidad con pacientes o compañeros que antes no tenías<br>
        · Sensación de que "nada de lo que haces importa"<br>
        · Insomnio o sueño no reparador después del turno<br>
        · Somatizaciones: cefalea frecuente, gastritis, tensión muscular<br>
        · Desconexión emocional — trabajas en "piloto automático"
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">🌱 Estrategias de autocuidado basadas en evidencia</div>
      <p class="figura-aporte">
        <b>Límites:</b> separar el tiempo de trabajo del tiempo personal, aunque sea en turnos intensos<br>
        <b>Supervisión clínica:</b> espacios para hablar de casos difíciles con colegas<br>
        <b>Movimiento:</b> la actividad física regular se asocia con mejor ánimo y mejor sueño<br>
        <b>Sueño:</b> es intervención médica, no lujo — protege los turnos de descanso<br>
        <b>Buscar ayuda:</b> ir al psicólogo siendo personal de salud es coherencia, no contradicción
      </p>
    </div>
  `,
  comunicacion: `
    <div class="figura-card">
      <div class="figura-nombre">Comunicación terapéutica en salud mental</div>
      <p class="figura-aporte">
        La comunicación terapéutica es el uso intencional de palabras, tono y lenguaje
        no verbal para favorecer el bienestar del paciente. Principios: autenticidad,
        empatía, aceptación incondicional y ausencia de juicio.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Técnicas útiles</div>
      <p class="figura-aporte">
        <b>Reflejo:</b> repetir parte de lo dicho — "dice que se siente muy solo"<br>
        <b>Clarificación:</b> "¿Puede explicarme un poco más a qué se refiere?"<br>
        <b>Reencuadre:</b> ofrecer otra perspectiva sin invalidar la del paciente<br>
        <b>Silencio terapéutico:</b> presencia sin palabras — comunica acompañamiento<br>
        <b>Validación:</b> "Entiendo que es muy difícil lo que está viviendo"
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Lenguaje a evitar</div>
      <p class="figura-aporte">
        "El loco / la loca" — estigmatiza y rompe la alianza terapéutica<br>
        "Ya cálmese" — invalida y puede aumentar la agitación<br>
        "Eso no es para tanto" — minimiza y cierra la comunicación<br>
        "¿No se tomó su pastilla?" — puede percibirse como culpa
      </p>
    </div>
  `,
};

function mostrarProf(id) {
  document.querySelectorAll(".era-chip[id^='profchip']").forEach(c =>
    c.classList.toggle("activo", c.id === `profchip-${id}`)
  );
  const el = document.getElementById("prof-contenido");
  if (el) el.innerHTML = PROF_CONTENIDO[id] || "";
}

// ════════════════════════════════════════════════════════════
//  MODO 3 — NECESITO AYUDA
// ════════════════════════════════════════════════════════════
function modoAyuda() {
  const el = document.getElementById("sm-contenido");
  if (!el) return;

  el.innerHTML = `
    <div class="sm-ayuda-wrap">

      <div class="sm-ayuda-mensaje">
        <p>Que hayas llegado aquí ya dice algo importante sobre ti.</p>
        <p>No tienes que tener las palabras perfectas ni explicar todo.
        Solo que estás aquí y que algo está pesando.</p>
        <p>Esta sección tiene recursos y orientación, pero ninguna pantalla
        reemplaza a una persona real. Si puedes, habla con alguien de confianza hoy.</p>
      </div>

      <div class="figura-card sm-card-crisis">
        <div class="figura-nombre">📞 Líneas de crisis en México — disponibles ahora</div>
        <p class="figura-aporte">
          <b>Línea de la Vida (CONASAMA):</b> <a href="tel:8009112000" class="sm-tel">800 911 2000</a>
          — gratuita, 24 horas, todo el año<br>
          <b>SAPTEL:</b> <a href="tel:5552598121" class="sm-tel">55 5259-8121</a>
          — 24 horas, intervención en crisis<br>
          <b>Emergencias:</b> <a href="tel:911" class="sm-tel">911</a>
          — si hay riesgo inmediato para tu vida o la de alguien más
        </p>
      </div>

      <div class="carril-eras" style="flex-wrap:wrap;margin-top:14px">
        <button class="era-chip activo" id="aychip-ahora"   onclick="mostrarAyuda('ahora')">⚡ Estoy en crisis ahora</button>
        <button class="era-chip"        id="aychip-ansiedad" onclick="mostrarAyuda('ansiedad')">😰 Ansiedad</button>
        <button class="era-chip"        id="aychip-tristeza" onclick="mostrarAyuda('tristeza')">💙 Tristeza</button>
        <button class="era-chip"        id="aychip-agotamiento" onclick="mostrarAyuda('agotamiento')">🪫 Agotamiento</button>
      </div>
      <div id="ay-contenido" style="margin-top:10px"></div>

    </div>
  `;

  mostrarAyuda("ahora");
}

const AYUDA_CONTENIDO = {
  ahora: `
    <div class="figura-card sm-card-crisis">
      <div class="figura-nombre">Para este momento</div>
      <p class="figura-aporte">
        Si estás en peligro inmediato, llama al <b>911</b> o pide a alguien cercano que llame.<br><br>
        Si no hay peligro inmediato pero estás desbordado/a, prueba esto ahora mismo:
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Técnica 5-4-3-2-1 (anclaje sensorial)</div>
      <p class="figura-aporte">
        Nombra en voz alta o mentalmente:<br>
        <b>5</b> cosas que puedes ver<br>
        <b>4</b> cosas que puedes tocar (y tócalas)<br>
        <b>3</b> cosas que puedes escuchar<br>
        <b>2</b> cosas que puedes oler<br>
        <b>1</b> cosa que puedes saborear<br><br>
        Esto interrumpe la espiral de pensamientos y devuelve al presente.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Respiración de emergencia</div>
      <p class="figura-aporte">
        Inhala por la nariz contando <b>4 segundos</b><br>
        Sostén el aire <b>4 segundos</b><br>
        Exhala por la boca contando <b>6 segundos</b><br><br>
        Repite 4-5 veces. La exhalación larga activa el sistema nervioso parasimpático.
      </p>
    </div>
  `,
  ansiedad: `
    <div class="figura-card">
      <div class="figura-nombre">Lo que sientes es real</div>
      <p class="figura-aporte">
        La ansiedad produce síntomas físicos reales: taquicardia, tensión, mareo, náusea.
        No es exageración. Tu sistema nervioso está respondiendo a una amenaza percibida,
        aunque no haya peligro físico. Reconocerlo ayuda.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Para el momento ansioso</div>
      <p class="figura-aporte">
        · Sal a otro espacio si puedes — cambiar el entorno rompe el ciclo<br>
        · Mueve el cuerpo: camina, estira, sacude brazos y piernas — descarga la activación física<br>
        · Escribe en papel lo que estás pensando — sacar el pensamiento de la cabeza reduce su intensidad<br>
        · No pelees contra la ansiedad — observarla sin intentar eliminarla suele calmarla más rápido
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Si la ansiedad es frecuente</div>
      <p class="figura-aporte">
        Llevar un diario de episodios (cuándo, qué pasó antes, qué pensé, qué hice)
        ayuda a identificar patrones. Es también información valiosa si decides hablar
        con un profesional. SAPTEL: <b>55 5259-8121</b>.
      </p>
    </div>
  `,
  tristeza: `
    <div class="figura-card">
      <div class="figura-nombre">La tristeza no necesita justificarse</div>
      <p class="figura-aporte">
        No tienes que haber vivido algo "suficientemente grande" para sentirte mal.
        La tristeza es una señal, no una debilidad. Ignorarla no la hace desaparecer.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Diferencia entre tristeza y depresión</div>
      <p class="figura-aporte">
        La tristeza es una emoción que responde a algo concreto y tiende a pasar.
        La depresión es persistente (más de 2 semanas), afecta el funcionamiento diario
        y puede aparecer sin una causa clara. Si sientes que ya no disfrutas nada y no
        mejora, hablar con un profesional es el paso siguiente.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Cosas pequeñas que pueden ayudar hoy</div>
      <p class="figura-aporte">
        · Sal aunque sea 10 minutos al exterior — la luz natural regula el ritmo circadiano<br>
        · Habla con alguien aunque no cuentes todo<br>
        · Haz una sola cosa que antes te gustaba, sin expectativas<br>
        · No aísles el cuerpo: comer y dormir aunque no tengas ganas importa
      </p>
    </div>
  `,
  agotamiento: `
    <div class="figura-card">
      <div class="figura-nombre">El agotamiento profundo también es salud mental</div>
      <p class="figura-aporte">
        Hay un agotamiento que no se va con dormir. Es el de cargar demasiado por
        demasiado tiempo, sin espacio para soltar. Puede venir de trabajar, estudiar,
        cuidar a otros, sobrevivir circunstancias difíciles — o todo a la vez.
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Señales de que necesitas parar</div>
      <p class="figura-aporte">
        · Dormiste y sigues cansado/a<br>
        · Pequeñas cosas te afectan de forma desproporcionada<br>
        · Sientes que "ya no puedes más" pero sigues porque no hay opción<br>
        · Perdiste el sentido de por qué hacías lo que hacías
      </p>
    </div>
    <div class="figura-card">
      <div class="figura-nombre">Primer paso</div>
      <p class="figura-aporte">
        No hay que resolverlo todo hoy. Hoy solo: identifica una cosa que puedas
        <b>no hacer</b> o <b>pedir ayuda para hacer</b>. El descanso no se gana —
        es una necesidad biológica. Línea de apoyo: <b>800 911 2000</b> (Línea de la Vida).
      </p>
    </div>
  `,
};

function mostrarAyuda(id) {
  document.querySelectorAll(".era-chip[id^='aychip']").forEach(c =>
    c.classList.toggle("activo", c.id === `aychip-${id}`)
  );
  const el = document.getElementById("ay-contenido");
  if (el) el.innerHTML = AYUDA_CONTENIDO[id] || "";
}
