// ==============================================================================
// 1. CONEXIÓN CON EL HTML (ELEMENTOS DEL DOM)
// ==============================================================================
const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Modal de Ruta Confirmada (Pantalla Principal)
const routeModal = document.getElementById("routeModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

// Modal del Catálogo General
const btnCatalog = document.getElementById("btnCatalog");
const catalogModal = document.getElementById("catalogModal");
const catalogCardsContainer = document.getElementById("catalogCardsContainer");
const closeCatalogModal = document.getElementById("closeCatalogModal");

// Modal Detalle del Catálogo + Votación
const catalogDetailModal = document.getElementById("catalogDetailModal");
const closeCatalogDetailModal = document.getElementById("closeCatalogDetailModal");
const catalogDetailContent = document.getElementById("catalogDetailContent");
const btnInterest = document.getElementById("btnInterest");
const heartIcon = document.getElementById("heartIcon");
const votingContainer = document.getElementById("votingContainer");
const weekendOptions = document.getElementById("weekendOptions");
const voterNameInput = document.getElementById("voterName");
const btnSubmitVote = document.getElementById("btnSubmitVote");

// ==============================================================================
// 2. ESTADOS GLOBALES DE VOTACIÓN
// ==============================================================================
let rutaSeleccionadaCatalogo = null;
let fechaVotoSeleccionada = null;

// ==============================================================================
// 3. GENERADOR DE TARJETAS CONFIRMADAS (PANTALLA PRINCIPAL)
// ==============================================================================
function renderizarTarjetas() {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = "";
    rutasConfirmadas.forEach(ruta => {
        const cardHTML = `
            <div class="card" style="background-image: linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.40)), url('${ruta.imagen}'); background-size: 100% 100%; background-repeat: no-repeat; background-position: center;">
                <div>
                    <h3>${ruta.nombre}</h3>
                    <p class="date">📅 ${ruta.fecha}</p>
                    <p><strong>Dificultad:</strong> ${ruta.dificultad}</p>
                </div>
                <button class="btn-details" onclick="abrirModal(${ruta.id})">Ver detalles</button>
            </div>
        `;
        cardsContainer.innerHTML += cardHTML;
    });
}

// ==============================================================================
// 4. GENERADOR Y ABRIR MODAL DEL CATÁLOGO GENERAL
// ==============================================================================
function renderizarCatalogo() {
    if (!catalogCardsContainer) return;
    catalogCardsContainer.innerHTML = "";
    
    // Unimos ambas listas para que salgan TODAS en el catálogo
    const todasLasRutas = [...rutasConfirmadas, ...catalogoGeneral];

    todasLasRutas.forEach(ruta => {
        const cardHTML = `
            <div class="card" style="background-image: linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.40)), url('${ruta.imagen}'); background-size: cover; background-position: center;">
                <div>
                    <h3>${ruta.nombre}</h3>
                    <p><strong>Nivel:</strong> ${ruta.dificultad}</p>
                </div>
                <button class="btn-details" onclick="abrirModal('${ruta.id}')">Ver detalles</button>
            </div>
        `;
        catalogCardsContainer.innerHTML += cardHTML;
    });
}

// Abrir modal del catálogo y renderizar todo por defecto
btnCatalog.addEventListener("click", () => {
    catalogModal.classList.remove("hidden"); // ← Se cambió modalCatalogo por catalogModal
    
    // Resetea el filtro de estado a "todas" si existe el selector
    const filtroEstado = document.getElementById("filtroEstado");
    if (filtroEstado) {
        filtroEstado.value = "todas";
    }
    
    renderizarCatalogo(); 
});




// Evento para cerrar el modal del Catálogo
if (closeCatalogModal && catalogModal) {
    closeCatalogModal.addEventListener("click", () => {
        catalogModal.classList.add("hidden");
    });
}

// ==============================================================================
// 5. LÓGICA DEL BUSCADOR EN TIEMPO REAL (CONFIRMADAS + CATÁLOGO)
// ==============================================================================
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length === 0) {
            searchResults.innerHTML = "";
            searchResults.classList.add("hidden");
            return;
        }

        // Unimos confirmadas + catálogo para buscar en todo el sitio
        const todasLasRutas = [...rutasConfirmadas, ...catalogoGeneral];

        // Busca en Nombre, Descripción y Dificultad
        const coincidencias = todasLasRutas.filter(ruta => {
            const matchNombre = ruta.nombre ? ruta.nombre.toLowerCase().includes(query) : false;
            const matchDesc = ruta.descripcion ? ruta.descripcion.toLowerCase().includes(query) : false;
            const matchDif = ruta.dificultad ? ruta.dificultad.toLowerCase().includes(query) : false;

            return matchNombre || matchDesc || matchDif;
        });

        if (coincidencias.length > 0) {
            searchResults.innerHTML = coincidencias.map(ruta => `
                <div class="search-item" onclick="abrirModalDesdeBuscador('${ruta.id}')">
                    <strong>${ruta.nombre}</strong>
                    <small>Dificultad: ${ruta.dificultad || 'N/A'} | ${ruta.fecha ? '📅 Confirmada' : '📁 Catálogo'}</small>
                </div>
            `).join("");
            searchResults.classList.remove("hidden");
        } else {
            searchResults.innerHTML = `<div class="search-item">No encontramos rutas relacionadas con "${query}"</div>`;
            searchResults.classList.remove("hidden");
        }
    });
}

// Función inteligente: Abre abrirModal si tiene fecha, o abrirDetalleCatalogo si es del catálogo
window.abrirModalDesdeBuscador = function(idRuta) {
    if (searchResults) searchResults.classList.add("hidden");
    if (searchInput) searchInput.value = "";

    // Buscamos primero en confirmadas
    let ruta = rutasConfirmadas.find(r => String(r.id) === String(idRuta));
    
    if (ruta) {
        // Es una ruta confirmada
        if (typeof abrirModal === 'function') abrirModal(ruta.id);
    } else {
        // Es una ruta del catálogo general
        ruta = catalogoGeneral.find(r => String(r.id) === String(idRuta));
        if (ruta) {
            if (typeof abrirDetalleCatalogo === 'function') {
                abrirDetalleCatalogo(ruta.id);
            } else if (typeof abrirModal === 'function') {
                abrirModal(ruta.id);
            }
        }
    }
};

// ==============================================================================
// 6. VENTANA MODAL DETALLES ("VER DETALLES" Y WHATSAPP)
// ==============================================================================
function abrirModal(idRuta) {
    // Busca primero en confirmadas y luego en catalogoGeneral
    let ruta = rutasConfirmadas.find(r => r.id == idRuta);
    if (!ruta) {
        ruta = catalogoGeneral.find(r => r.id == idRuta);
    }
    
    if (!ruta) return;

    const fechaTexto = ruta.fecha ? `📅 ${ruta.fecha}` : "Fecha por confirmar (Disponible en catálogo)";
    const textoWhatsApp = encodeURIComponent(
        `¡Hola! Quisiera información/reservar un cupo para la ruta "${ruta.nombre}".`
    );
    const linkWhatsApp = `https://wa.me/${typeof TELEFONO_WHATSAPP !== 'undefined' ? TELEFONO_WHATSAPP : ''}?text=${textoWhatsApp}`;

    modalContent.innerHTML = `
        <h2>${ruta.nombre}</h2>
        <p style="color: var(--primary); font-weight: bold; margin-bottom: 15px;">${fechaTexto}</p>
        <p><strong>Duración:</strong> ${ruta.duracionTexto || ruta.duracion || 'Por definir'}</p>
        <p><strong>Dificultad:</strong> ${ruta.dificultad || 'Media'}</p>
        <p style="margin: 15px 0;">${ruta.descripcion || 'Sin descripción disponible.'}</p>
        <p><strong>Incluye:</strong> ${ruta.incluye || 'Guiatura profesional'}</p>
        <p><strong>Costo de la guiatura:</strong> ${ruta.precio || 'Consultar'}</p>
        
        <a href="${linkWhatsApp}" target="_blank" class="btn-whatsapp">
            📲 Consultar / Reservar vía WhatsApp
        </a>
    `;

    routeModal.classList.remove("hidden");
    if (searchResults) searchResults.classList.add("hidden");
}

if (closeModal && routeModal) {
    closeModal.addEventListener("click", () => {
        routeModal.classList.add("hidden");
    });
}

// ==============================================================================
// 7. INICIALIZACIÓN AL CARGAR LA PÁGINA
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
    renderizarTarjetas();
});



// ==============================================================================
// 6. CATÁLOGO GENERAL Y FILTROS POR DIFICULTAD
// ==============================================================================
// 6. CATÁLOGO GENERAL Y FILTROS POR DIFICULTAD
// ==============================================================================
function renderizarCatalogo(listaAMostrar = null) {
    if (!catalogCardsContainer) return;
    catalogCardsContainer.innerHTML = "";
    
    // Si la función recibe una lista filtrada usa esa, si no, junta todas por defecto
    const todasLasRutas = listaAMostrar || [...rutasConfirmadas, ...catalogoGeneral];

    if (todasLasRutas.length === 0) {
        catalogCardsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 20px; color: #666;">No se encontraron rutas que coincidan con los filtros seleccionados.</p>`;
        return;
    }

    todasLasRutas.forEach(ruta => {
        // Evaluamos si es una ruta confirmada (tiene fecha) o si es del catálogo general (id con 'c')
        const esConfirmada = ruta.fecha !== undefined;
        const funcionClick = esConfirmada ? `abrirModal('${ruta.id}')` : `abrirDetalleCatalogo('${ruta.id}')`;

        const cardHTML = `
            <div class="card" style="background-image: linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.40)), url('${ruta.imagen}'); background-size: cover; background-position: center;">
                <div>
                    <h3>${ruta.nombre}</h3>
                    <p><strong>Nivel:</strong> ${ruta.dificultad}</p>
                    ${esConfirmada ? `<p class="date">📅 ${ruta.fecha}</p>` : ''}
                </div>
                <button class="btn-details" onclick="${funcionClick}">
                    ${esConfirmada ? 'Ver detalles' : 'Votar Fecha / Ver Detalles'}
                </button>
            </div>
        `;
        catalogCardsContainer.innerHTML += cardHTML;
    });
}

function filtrarCatalogo(nivel) {
    const botones = document.querySelectorAll('.btn-filter-catalog');
    botones.forEach(btn => btn.classList.remove('active'));
    
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }

    if (nivel === 'todas') {
        renderizarCatalogo(catalogoGeneral);
    } else {
        const filtradas = catalogoGeneral.filter(ruta => 
            ruta.dificultad.toLowerCase().includes(nivel.toLowerCase())
        );
        renderizarCatalogo(filtradas);
    }
}

// Abrir modal del catálogo y renderizar todo por defecto
btnCatalog.addEventListener("click", () => {
    catalogModal.classList.remove("hidden");
    
    // Resetea los filtros a "todos" por defecto al abrir
    if (document.getElementById("filterEstado")) document.getElementById("filterEstado").value = "todos";
    if (document.getElementById("filterDificultad")) document.getElementById("filterDificultad").value = "todos";
    if (document.getElementById("filterDuracion")) document.getElementById("filterDuracion").value = "todos";
    if (document.getElementById("filterAtractivo")) document.getElementById("filterAtractivo").value = "todos";
    
    // Renderiza la lista completa
    renderizarCatalogo(); 
});

// ==============================================================================
// 7. MODAL DETALLE DE CATÁLOGO + VOTACIÓN CON METAS DE INTERESADOS
// ==============================================================================
function abrirDetalleCatalogo(idRuta) {
    const ruta = catalogoGeneral.find(r => String(r.id) === String(idRuta));
    if (!ruta) return;

    rutaSeleccionadaCatalogo = ruta;
    fechaVotoSeleccionada = null;

    // Resetear estados al abrir
    ocultarSeccionVoto();

    // Definir meta por defecto si no está especificada en datos.js
    const meta = ruta.metaInteresados || 10;

    catalogDetailContent.innerHTML = `
        <h2 style="margin-bottom: 10px;">${ruta.nombre}</h2>
        <p style="margin-bottom: 8px;"><strong>Dificultad:</strong> ${ruta.dificultad}</p>
        <p style="margin-bottom: 8px;"><strong>Duración estimada:</strong> ${ruta.duracion || ruta.duracionTexto || 'Por definir'}</p>
        <p style="margin: 15px 0; color: #444; line-height: 1.5;">${ruta.descripcion}</p>
    `;

    catalogDetailModal.classList.remove("hidden");
}

function ocultarSeccionVoto() {
    votingContainer.classList.add("hidden");
    btnInterest.classList.remove("active");
    heartIcon.textContent = "🤍";
    if (voterNameInput) voterNameInput.value = "";
    if (btnSubmitVote) {
        btnSubmitVote.disabled = true;
        btnSubmitVote.textContent = "📩 Enviar mi voto";
    }
}

// TOGGLE DEL BOTÓN ME INTERESA
btnInterest.addEventListener("click", () => {
    const estaOculto = votingContainer.classList.contains("hidden");

    if (estaOculto) {
        votingContainer.classList.remove("hidden");
        btnInterest.classList.add("active");
        heartIcon.textContent = "❤️";
        generarOpcionesFinesDeSemana();
    } else {
        ocultarSeccionVoto();
    }
});

// GENERAR OPCIONES DE FECHAS O MOSTRAR REGISTRO DIRECTO DE INTERÉS
function generarOpcionesFinesDeSemana() {
    weekendOptions.innerHTML = "";
    
    // Evalúa si la ruta seleccionada tiene un arreglo de fechas configurado en datos.js
    const tieneFechas = rutaSeleccionadaCatalogo && 
                        Array.isArray(rutaSeleccionadaCatalogo.fechasPropuestas) && 
                        rutaSeleccionadaCatalogo.fechasPropuestas.length > 0;

    const votoPrevio = localStorage.getItem(`usuario_voto_${rutaSeleccionadaCatalogo.id}`);
    const meta = rutaSeleccionadaCatalogo.metaInteresados || 10;

    if (tieneFechas) {
        // ==============================================================================
        // CASO 1: RUTA CON FECHAS PROPUESTAS
        // ==============================================================================
        
        // Mensaje con la meta requerida para confirmar la fecha
        const infoMeta = document.createElement("div");
        infoMeta.style.cssText = "background: #eef7ee; border: 1px solid #4caf50; border-radius: 8px; padding: 10px; margin-bottom: 12px; font-size: 0.88em; color: #1b5e20; text-align: center;";
        infoMeta.innerHTML = `📌 <strong>Mínimo de interesados para confirmar fecha:</strong> ${meta} personas.`;
        weekendOptions.appendChild(infoMeta);

        const opciones = rutaSeleccionadaCatalogo.fechasPropuestas;

        opciones.forEach((fechaStr, index) => {
            const claveVotos = `votos_${rutaSeleccionadaCatalogo.id}_${fechaStr}`;
            const votosActuales = parseInt(localStorage.getItem(claveVotos) || "0");

            const btn = document.createElement("div");
            btn.classList.add("weekend-btn");

            if (votoPrevio === fechaStr) {
                btn.classList.add("selected");
            }

            btn.innerHTML = `
                <span>📅 ${fechaStr}</span>
                <span class="vote-badge" id="badge-${index}">${votosActuales} interesados</span>
            `;

            if (!votoPrevio) {
                btn.addEventListener("click", () => {
                    document.querySelectorAll(".weekend-btn").forEach(b => b.classList.remove("selected"));
                    btn.classList.add("selected");
                    fechaVotoSeleccionada = fechaStr;
                    btnSubmitVote.disabled = false;
                });
            }

            weekendOptions.appendChild(btn);
        });

        // Manejo del estado si ya votó anteriormente en esta ruta
        if (votoPrevio) {
            btnSubmitVote.disabled = true;
            btnSubmitVote.textContent = "✓ Ya registraste tu voto";
            if (voterNameInput) voterNameInput.placeholder = "Ya votaste para esta ruta";
        } else {
            btnSubmitVote.disabled = true; // Se habilita solo al tocar una fecha
            btnSubmitVote.textContent = "📩 Enviar mi voto";
            if (voterNameInput) voterNameInput.placeholder = "Tu nombre (opcional)";
        }

    } else {
        // ==============================================================================
        // CASO 2: RUTA SIN FECHAS PROPUESTAS (Interés general)
        // ==============================================================================
        fechaVotoSeleccionada = "Sin fecha fija";

        // Obtener interesados acumulados guardados localmente + base de datos.js
        const claveInteresadosGeneral = `interesados_general_${rutaSeleccionadaCatalogo.id}`;
        const votosLocales = parseInt(localStorage.getItem(claveInteresadosGeneral) || "0");
        const interesadosTotales = (rutaSeleccionadaCatalogo.interesados || 0) + votosLocales;

        const infoGeneral = document.createElement("div");
        infoGeneral.style.cssText = "background: #f5f5f5; border: 1px solid #ddd; border-radius: 8px; padding: 12px; margin-bottom: 12px; text-align: center;";
        infoGeneral.innerHTML = `
            <p style="margin: 0 0 6px 0; font-weight: bold; color: #2e7d32; font-size: 1.05em;">
                🔥 ${interesadosTotales} interesados acumulados
            </p>
            <p style="margin: 0; font-size: 0.85em; color: #555;">
                Mínimo de interesados para proponer fechas oficiales: <strong>${meta} personas</strong>.
            </p>
        `;
        weekendOptions.appendChild(infoGeneral);

        if (votoPrevio) {
            btnSubmitVote.disabled = true;
            btnSubmitVote.textContent = "✓ Ya registraste tu interés";
            if (voterNameInput) voterNameInput.placeholder = "Ya registraste tu interés";
        } else {
            btnSubmitVote.disabled = false; // Habilitado directamente ya que no requiere seleccionar fecha
            btnSubmitVote.textContent = "📩 Registrar mi interés";
            if (voterNameInput) voterNameInput.placeholder = "Tu nombre (opcional)";
        }
    }
}

// REGISTRAR VOTO O INTERÉS Y ABRIR WHATSAPP
btnSubmitVote.addEventListener("click", () => {
    if (!rutaSeleccionadaCatalogo) return;

    const tieneFechas = Array.isArray(rutaSeleccionadaCatalogo.fechasPropuestas) && 
                        rutaSeleccionadaCatalogo.fechasPropuestas.length > 0;

    if (tieneFechas && !fechaVotoSeleccionada) return;

    const nombreUsuario = voterNameInput.value.trim() || "Un senderista";
    let textoWhatsApp = "";

    if (tieneFechas) {
        // 1. Sumar voto al conteo general de la fecha específica
        const claveVotos = `votos_${rutaSeleccionadaCatalogo.id}_${fechaVotoSeleccionada}`;
        const votosActuales = parseInt(localStorage.getItem(claveVotos) || "0");
        localStorage.setItem(claveVotos, votosActuales + 1);

        // 2. Texto de WhatsApp con fecha seleccionada
        textoWhatsApp = encodeURIComponent(
            `¡Hola! Me interesa la ruta "${rutaSeleccionadaCatalogo.nombre}" y voto para hacerla el: ${fechaVotoSeleccionada}.\n\nNombre: ${nombreUsuario}.`
        );
    } else {
        // 1. Sumar voto al conteo general de la ruta sin fecha
        const claveInteresadosGeneral = `interesados_general_${rutaSeleccionadaCatalogo.id}`;
        const votosLocales = parseInt(localStorage.getItem(claveInteresadosGeneral) || "0");
        localStorage.setItem(claveInteresadosGeneral, votosLocales + 1);

        // 2. Texto de WhatsApp para ruta sin fecha fija
        textoWhatsApp = encodeURIComponent(
            `¡Hola! Me interesa realizar la ruta "${rutaSeleccionadaCatalogo.nombre}". Por favor avísenme cuando la agenden.\n\nNombre: ${nombreUsuario}.`
        );
    }

    // 3. Guardar marca en localStorage para evitar duplicados del mismo usuario
    localStorage.setItem(`usuario_voto_${rutaSeleccionadaCatalogo.id}`, fechaVotoSeleccionada || "interesado");

    // 4. Abrir WhatsApp
    const linkWhatsApp = `https://wa.me/${TELEFONO_WHATSAPP}?text=${textoWhatsApp}`;
    window.open(linkWhatsApp, "_blank");

    // 5. Actualizar interfaz
    generarOpcionesFinesDeSemana();
});

// ==============================================================================
// 8. CIERRE DE MODALES
// ==============================================================================
closeCatalogDetailModal.addEventListener("click", () => {
    catalogDetailModal.classList.add("hidden");
    ocultarSeccionVoto();
});

window.addEventListener("click", (e) => {
    if (typeof routeModal !== 'undefined' && e.target === routeModal) routeModal.classList.add("hidden");
    if (typeof catalogModal !== 'undefined' && e.target === catalogModal) catalogModal.classList.add("hidden");
    if (e.target === catalogDetailModal) {
        catalogDetailModal.classList.add("hidden");
        ocultarSeccionVoto();
    }
});

// ==============================================================================
// 9. HERRAMIENTAS ADMINISTRADOR
// ==============================================================================
window.resetearTodosLosVotos = function() {
    localStorage.clear();
    alert("¡Todos los votos han sido reseteados con éxito!");
    location.reload();
};

window.resetearVotosRuta = function(idRuta) {
    if (!idRuta) {
        console.warn("⚠️ Debes indicar el ID de la ruta. Ejemplo: resetearVotosRuta('c3')");
        return;
    }

    let encontradas = 0;
    Object.keys(localStorage).forEach(key => {
        if (key.toLowerCase().includes(String(idRuta).toLowerCase())) {
            localStorage.removeItem(key);
            encontradas++;
        }
    });

    console.log(`🧹 Se borraron ${encontradas} registros en localStorage para la ruta: ${idRuta}`);
    alert(`¡Votos reseteados con éxito para la ruta '${idRuta}'!`);
    location.reload();
};


// ==============================================================================
// 10. INICIALIZACIÓN
// ==============================================================================
renderizarTarjetas();

// ==============================================================================
// SISTEMA DE FILTRADO HORIZONTAL (UNIFICANDO AMBAS LISTAS)
// ==============================================================================

document.addEventListener("click", (e) => {
    
    // Captura el clic en el botón 'Buscar'
    if (e.target && e.target.id === "btnEjecutarFiltro") {
        e.preventDefault();

        // 1. Obtención de los 4 desplegables
        const selectEstado = document.getElementById("filterEstado");
        const selectDificultad = document.getElementById("filterDificultad");
        const selectDuracion = document.getElementById("filterDuracion");
        const selectAtractivo = document.getElementById("filterAtractivo");

        if (!selectEstado || !selectDificultad || !selectDuracion || !selectAtractivo) {
            console.error("❌ Error: Faltan elementos <select> en el HTML.");
            return;
        }

        const estadoVal = selectEstado.value;
        const dificultadVal = selectDificultad.value;
        const duracionVal = selectDuracion.value;
        const atractivoVal = selectAtractivo.value;

        // 2. UNIFICACIÓN DE LISTAS (Junta rutasConfirmadas y catalogoGeneral)
        // IMPORTANTE: Permite evaluar rutas con fecha fija y rutas del catálogo a la vez
        const todasLasRutas = [...rutasConfirmadas, ...catalogoGeneral];

        // 3. Filtrado sobre la lista global
        const resultados = todasLasRutas.filter(ruta => {
            
            // --- ESTADO DE LA RUTA ---
            if (estadoVal === "programada" && !ruta.fecha) return false;
            if (estadoVal === "por-votar" && (!ruta.fechasPropuestas || ruta.fechasPropuestas.length === 0)) return false;
            if (estadoVal === "catalogo-abierto" && (ruta.fecha || (ruta.fechasPropuestas && ruta.fechasPropuestas.length > 0))) return false;

            // --- DIFICULTAD ---
            if (dificultadVal !== "todos" && ruta.dificultad !== dificultadVal) return false;

            // --- DURACIÓN ---
            if (duracionVal !== "todos" && ruta.duracion !== duracionVal) return false;

            // --- ATRACTIVO / TIPO ---
            if (atractivoVal !== "todos") {
                if (!ruta.tipo || !Array.isArray(ruta.tipo) || !ruta.tipo.includes(atractivoVal)) {
                    return false;
                }
            }

            return true; // Superó todas las pruebas
        });

        // 4. Renderizado en el modal
        if (typeof renderizarCatalogo === "function") {
            renderizarCatalogo(resultados);
        }
    }
});
// ==============================================================================
// LÓGICA PARA RESTABLECER / LIMPIAR FILTROS
// ==============================================================================

document.addEventListener("click", (e) => {
    
    // Captura el clic en el botón de restablecer (btnLimpiarFiltros)
    if (e.target && (e.target.id === "btnLimpiarFiltros" || e.target.closest("#btnLimpiarFiltros"))) {
        e.preventDefault();

        // 1. Regresa los 4 selectores a la opción "todos"
        document.getElementById("filterEstado").value = "todos";
        document.getElementById("filterDificultad").value = "todos";
        document.getElementById("filterDuracion").value = "todos";
        document.getElementById("filterAtractivo").value = "todos";

        // 2. Unifica la lista completa de rutas (Confirmadas + Catálogo)
        const todasLasRutas = [...rutasConfirmadas, ...catalogoGeneral];

        // 3. Renderiza nuevamente la lista completa sin ningún filtro
        if (typeof renderizarCatalogo === "function") {
            renderizarCatalogo(todasLasRutas);
        }
    }
});

;
// ==============================================================================
// FUNCIONALIDAD: GALERÍA DE MINIATURAS VERTICALES + LIGHTBOX FLOTANTE
// ==============================================================================

// Variables globales para el control del Lightbox
let imagenesGaleriaActual = [];
let indiceImagenActual = 0;

/**
 * Genera únicamente la tira de miniaturas en vertical
 */
function construirFilmstripHTML(ruta) {
    const listaImagenes = (Array.isArray(ruta.imagenes) && ruta.imagenes.length > 0)
        ? ruta.imagenes
        : [ruta.imagen || 'assets/placeholder.jpg'];

    // Guardamos la lista en la variable global para que el Lightbox sepa qué imágenes recorrer
    imagenesGaleriaActual = listaImagenes;

    const miniaturasHTML = listaImagenes.map((urlImg, index) => `
        <img 
            src="${urlImg}" 
            alt="Vista ${index + 1} de ${ruta.nombre}" 
            class="filmstrip-thumb"
            onclick="abrirLightbox(${index})"
        >
    `).join("");

    return `
        <div class="filmstrip-gallery">
            <div class="filmstrip-carousel-wrapper">
                ${listaImagenes.length > 3 ? `<button class="film-arrow" onclick="deslizarTira(-120)" type="button">◀</button>` : ''}
                <div id="thumbsTrack" class="filmstrip-thumbs-container">
                    ${miniaturasHTML}
                </div>
                ${listaImagenes.length > 3 ? `<button class="film-arrow" onclick="deslizarTira(120)" type="button">▶</button>` : ''}
            </div>
        </div>
    `;
}

/**
 * Desplaza horizontalmente el carrusel de miniaturas
 */
window.deslizarTira = function(distancia) {
    const track = document.getElementById("thumbsTrack");
    if (track) {
        track.scrollBy({ left: distancia, behavior: 'smooth' });
    }
};

/**
 * Abre el Lightbox flotante con la imagen seleccionada en vertical grande
 */
window.abrirLightbox = function(index) {
    console.log("Intentando abrir lightbox en el índice:", index);
    console.log("Imágenes disponibles:", imagenesGaleriaActual);

    indiceImagenActual = index;
    const modal = document.getElementById("lightboxModal");
    const imgVisor = document.getElementById("lightboxImg");

    if (!modal) {
        console.error("ERROR: No se encontró el elemento #lightboxModal en el HTML.");
        return;
    }
    if (!imgVisor) {
        console.error("ERROR: No se encontró el elemento #lightboxImg en el HTML.");
        return;
    }

    if (imagenesGaleriaActual.length > 0) {
        imgVisor.src = imagenesGaleriaActual[indiceImagenActual];
        modal.classList.remove("hidden");
        console.log("¡Lightbox abierto con éxito!");
    } else {
        console.warn("No hay imágenes en la galería actual.");
    }
};

/**
 * Cierra la ventana flotante Lightbox
 */
window.cerrarLightbox = function() {
    const modal = document.getElementById("lightboxModal");
    if (modal) {
        modal.classList.add("hidden");
    }
};

/**
 * Cambia a la siguiente o anterior foto dentro del Lightbox
 */
window.cambiarFotoLightbox = function(direccion) {
    if (imagenesGaleriaActual.length === 0) return;

    indiceImagenActual += direccion;

    // Bucle infinito para navegar las fotos
    if (indiceImagenActual < 0) {
        indiceImagenActual = imagenesGaleriaActual.length - 1;
    } else if (indiceImagenActual >= imagenesGaleriaActual.length) {
        indiceImagenActual = 0;
    }

    const imgVisor = document.getElementById("lightboxImg");
    if (imgVisor) {
        imgVisor.src = imagenesGaleriaActual[indiceImagenActual];
    }
};

// Control con las teclas del teclado (ESC para cerrar, Flechas para cambiar)
document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("lightboxModal");
    if (modal && !modal.classList.contains("hidden")) {
        if (e.key === "Escape") cerrarLightbox();
        if (e.key === "ArrowLeft") cambiarFotoLightbox(-1);
        if (e.key === "ArrowRight") cambiarFotoLightbox(1);
    }
});
// ==============================================================================
// MODAL 1: VER DETALLES (RUTAS CONFIRMADAS - BOTÓN "VER DETALLES")
// ==============================================================================
function abrirModal(idRuta) {
    // Busca la ruta en confirmadas o catálogo
    let ruta = rutasConfirmadas.find(r => r.id == idRuta) || catalogoGeneral.find(r => r.id == idRuta);
    if (!ruta) return;

    // Actualiza la lista global de imágenes para el Lightbox flotante
    imagenesGaleriaActual = (Array.isArray(ruta.imagenes) && ruta.imagenes.length > 0)
        ? ruta.imagenes
        : [ruta.imagen || 'assets/placeholder.jpg'];

    // Genera la tira de miniaturas en formato vertical
    const galeriaHTML = construirFilmstripHTML(ruta);

    const fechaTexto = ruta.fecha ? `📅 ${ruta.fecha}` : "Fecha por confirmar";
    const textoWhatsApp = encodeURIComponent(`¡Hola! Quisiera información/reservar un cupo para la ruta "${ruta.nombre}".`);
    const linkWhatsApp = `https://wa.me/${typeof TELEFONO_WHATSAPP !== 'undefined' ? TELEFONO_WHATSAPP : ''}?text=${textoWhatsApp}`;

    // Inyecta Galería + Información detallada en modalContent
    modalContent.innerHTML = `
        ${galeriaHTML}
        <h2>${ruta.nombre}</h2>
        <p style="color: var(--primary, #1b5e20); font-weight: bold; margin-bottom: 10px;">${fechaTexto}</p>
        <p><strong>Duración:</strong> ${ruta.duracionTexto || ruta.duracion || 'Por definir'}</p>
        <p><strong>Dificultad:</strong> ${ruta.dificultad || 'Media'}</p>
        <p style="margin: 15px 0; line-height: 1.5;">${ruta.descripcion || 'Sin descripción disponible.'}</p>
        <p style="margin-bottom: 10px;"><strong>Incluye:</strong> ${ruta.incluye || 'Guiatura profesional y asistencia en ruta.'}</p>
        <p style="margin-bottom: 15px;"><strong>Costo:</strong> ${ruta.precio || 'Consultar'}</p>

        <a href="${linkWhatsApp}" target="_blank" class="btn-whatsapp">
            📲 Consultar / Reservar vía WhatsApp
        </a>
    `;

    routeModal.classList.remove("hidden");
    if (typeof searchResults !== 'undefined' && searchResults) {
        searchResults.classList.add("hidden");
    }
}
// ==============================================================================
// MODAL 2: DETALLES DEL CATÁLOGO GENERAL (RUTAS POR VOTAR / CONSULTAR)
// ==============================================================================
function abrirDetalleCatalogo(idRuta) {
    const ruta = catalogoGeneral.find(r => r.id === idRuta) || rutasConfirmadas.find(r => r.id === idRuta);
    if (!ruta) return;

    if (typeof rutaSeleccionadaCatalogo !== 'undefined') {
        rutaSeleccionadaCatalogo = ruta;
    }
    if (typeof fechaVotoSeleccionada !== 'undefined') {
        fechaVotoSeleccionada = null;
    }
    if (typeof ocultarSeccionVoto === 'function') {
        ocultarSeccionVoto();
    }

    // Genera la galería Filmstrip
    const galeriaHTML = construirFilmstripHTML(ruta);

    // Inyecta Galería + Datos en catalogDetailContent
    catalogDetailContent.innerHTML = `
        ${galeriaHTML}
        <h2 style="margin-bottom: 10px;">${ruta.nombre}</h2>
        <p style="margin-bottom: 8px;"><strong>Dificultad:</strong> ${ruta.dificultad || 'Media'}</p>
        <p style="margin-bottom: 8px;"><strong>Duración estimada:</strong> ${ruta.duracion || 'Por definir'}</p>
        <p style="margin: 15px 0; color: #444; line-height: 1.5;">${ruta.descripcion || 'Sin descripción disponible.'}</p>
    `;

    catalogDetailModal.classList.remove("hidden");
}