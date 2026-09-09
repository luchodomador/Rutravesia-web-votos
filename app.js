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

// Variable de control para saber si se abrió un detalle desde el catálogo
let abiertoDesdeCatalogo = false;

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
            <div class="card" style="background-image: linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.40)), url('${ruta.imagen}'); background-size: cover; background-repeat: no-repeat; background-position: center;">
                <div>
                    <h3>${ruta.nombre}</h3>
                    <p class="date">📅 ${ruta.fecha}</p>
                    <p><strong>Dificultad:</strong> ${ruta.dificultad}</p>
                </div>
                <button class="btn-details" onclick="abrirModal('${ruta.id}')">Ver detalles</button>
            </div>
        `;
        cardsContainer.innerHTML += cardHTML;
    });

    // Activar el movimiento de las flechas
    activarFlechasCarrusel();
}

// Lógica para desplazar horizontalmente
function activarFlechasCarrusel() {
    const btnNext = document.getElementById("btnNextConfirmed");
    const btnPrev = document.getElementById("btnPrevConfirmed");

    if (btnNext && cardsContainer) {
        btnNext.onclick = () => {
            cardsContainer.scrollBy({ left: 240, behavior: 'smooth' });
        };
    }

    if (btnPrev && cardsContainer) {
        btnPrev.onclick = () => {
            cardsContainer.scrollBy({ left: -240, behavior: 'smooth' });
        };
    }
}

// ==============================================================================
// 4. GENERADOR Y ABRIR MODAL DEL CATÁLOGO GENERAL
// ==============================================================================
function renderizarCatalogo(listaAMostrar = null) {
    const catalogCardsContainer = document.getElementById("catalogCardsContainer");
    if (!catalogCardsContainer) return;
    catalogCardsContainer.innerHTML = "";
    
    const todasLasRutas = listaAMostrar || [...rutasConfirmadas, ...catalogoGeneral];

    if (todasLasRutas.length === 0) {
        catalogCardsContainer.innerHTML = `<p style="width: 100%; text-align: center; padding: 20px; color: #666;">No se encontraron rutas que coincidan con los filtros seleccionados.</p>`;
        return;
    }

    todasLasRutas.forEach(ruta => {
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

// Abrir modal del catálogo y resetear filtros
if (btnCatalog) {
    btnCatalog.addEventListener("click", () => {
        if (catalogModal) catalogModal.classList.remove("hidden");
        
        if (document.getElementById("filterEstado")) document.getElementById("filterEstado").value = "todos";
        if (document.getElementById("filterDificultad")) document.getElementById("filterDificultad").value = "todos";
        if (document.getElementById("filterDuracion")) document.getElementById("filterDuracion").value = "todos";
        if (document.getElementById("filterAtractivo")) document.getElementById("filterAtractivo").value = "todos";
        
        renderizarCatalogo(); 
    });
}

// Evento para cerrar el modal del Catálogo
if (closeCatalogModal && catalogModal) {
    closeCatalogModal.addEventListener("click", () => {
        catalogModal.classList.add("hidden");
        abiertoDesdeCatalogo = false;
    });
}

// ==============================================================================
// LÓGICA DE DESPLAZAMIENTO DEL CARRUSEL (FLECHAS MERCADOLIBRE)
// ==============================================================================
const btnPrevCatalog = document.getElementById("btnPrevCatalog");
const btnNextCatalog = document.getElementById("btnNextCatalog");

if (btnPrevCatalog) {
    btnPrevCatalog.addEventListener("click", () => {
        const container = document.getElementById("catalogCardsContainer");
        if (container) {
            container.scrollBy({ left: -256, behavior: 'smooth' });
        }
    });
}

if (btnNextCatalog) {
    btnNextCatalog.addEventListener("click", () => {
        const container = document.getElementById("catalogCardsContainer");
        if (container) {
            container.scrollBy({ left: 256, behavior: 'smooth' });
        }
    });
}



// ==============================================================================
// 5. LÓGICA DEL BUSCADOR EN TIEMPO REAL
// ==============================================================================
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length === 0) {
            searchResults.innerHTML = "";
            searchResults.classList.add("hidden");
            return;
        }

        const todasLasRutas = [...rutasConfirmadas, ...catalogoGeneral];

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

window.abrirModalDesdeBuscador = function(idRuta) {
    if (searchResults) searchResults.classList.add("hidden");
    if (searchInput) searchInput.value = "";

    let ruta = rutasConfirmadas.find(r => String(r.id) === String(idRuta));
    
    if (ruta) {
        abrirModal(ruta.id);
    } else {
        ruta = catalogoGeneral.find(r => String(r.id) === String(idRuta));
        if (ruta) {
            abrirDetalleCatalogo(ruta.id);
        }
    }
};

// ==============================================================================
// 6. VENTANA MODAL DETALLES (RUTAS CONFIRMADAS / VER DETALLES)
// ==============================================================================
function abrirModal(idRuta) {
    let ruta = rutasConfirmadas.find(r => String(r.id) === String(idRuta)) || 
               catalogoGeneral.find(r => String(r.id) === String(idRuta));
    
    if (!ruta) return;

    if (catalogModal && !catalogModal.classList.contains("hidden")) {
        abiertoDesdeCatalogo = true;
        catalogModal.classList.add("hidden");
    }

    imagenesGaleriaActual = (Array.isArray(ruta.imagenes) && ruta.imagenes.length > 0)
        ? ruta.imagenes
        : [ruta.imagen || 'assets/placeholder.jpg'];

    const galeriaHTML = construirFilmstripHTML(ruta);
    const textoWhatsApp = encodeURIComponent(
        `¡Hola! Quisiera información/reservar un cupo para la ruta "${ruta.nombre}".`
    );
    const linkWhatsApp = `https://wa.me/${typeof TELEFONO_WHATSAPP !== 'undefined' ? TELEFONO_WHATSAPP : ''}?text=${textoWhatsApp}`;

    modalContent.innerHTML = `
        <h2 style="margin-bottom: 10px;">${ruta.nombre}</h2>
       
        <p style="margin-bottom: 8px;"><strong>Dificultad:</strong> ${ruta.dificultad || 'Media'}</p>
        <p style="margin-bottom: 8px;"><strong>Duración estimada:</strong> ${ruta.duracionTexto || ruta.duracion || 'Por definir'}</p>
        
        ${galeriaHTML}

        <div class="descripcion-wrapper" style="margin: 12px 0;">
            <p id="textoDescripcion" class="texto-colapsado">
                ${ruta.descripcion || 'Sin descripción disponible.'}
            </p>
            <button type="button" id="btnExpandirTexto" class="btn-expandir">
                Ver más detalles ▼
            </button>
        </div>

        <p style="margin-bottom: 4px; margin-top: 10px;"><strong>Incluye:</strong> ${ruta.incluye || 'Guiatura profesional'}</p>
        <p style="margin-bottom: 12px;"><strong>Costo:</strong> ${ruta.precio || 'Consultar'}</p>
        
        <a href="${linkWhatsApp}" target="_blank" class="btn-whatsapp">
            📲 Consultar / Reservar vía WhatsApp
        </a>
    `;

    const btnExpandir = document.getElementById("btnExpandirTexto");
    const textoDesc = document.getElementById("textoDescripcion");

    if (btnExpandir && textoDesc) {
        btnExpandir.addEventListener("click", () => {
            textoDesc.classList.toggle("texto-colapsado");
            btnExpandir.innerHTML = textoDesc.classList.contains("texto-colapsado")
                ? "Ver más detalles ▼"
                : "Ver menos ▲";
        });
    }

    if (routeModal) routeModal.classList.remove("hidden");
    if (searchResults) searchResults.classList.add("hidden");
}

function cerrarModalDetalles() {
    if (routeModal) routeModal.classList.add("hidden");
    if (abiertoDesdeCatalogo && catalogModal) {
        catalogModal.classList.remove("hidden");
    }
}

if (closeModal) {
    closeModal.addEventListener("click", cerrarModalDetalles);
}


// ==============================================================================
// 7. MODAL DETALLE DE CATÁLOGO + VOTACIÓN (SISTEMA MANUAL CENTRALIZADO)
// ==============================================================================
function abrirDetalleCatalogo(idRuta) {
    const ruta = catalogoGeneral.find(r => String(r.id) === String(idRuta));
    if (!ruta) return;

    if (catalogModal && !catalogModal.classList.contains("hidden")) {
        abiertoDesdeCatalogo = true;
        catalogModal.classList.add("hidden");
    }

    rutaSeleccionadaCatalogo = ruta;
    fechaVotoSeleccionada = null;

    ocultarSeccionVoto();

    imagenesGaleriaActual = (Array.isArray(ruta.imagenes) && ruta.imagenes.length > 0)
        ? ruta.imagenes
        : [ruta.imagen || 'assets/placeholder.jpg'];

    const galeriaHTML = construirFilmstripHTML(ruta);

    catalogDetailContent.innerHTML = `
        <h2 style="margin-bottom: 10px;">${ruta.nombre}</h2>
        <p style="margin-bottom: 8px;"><strong>Dificultad:</strong> ${ruta.dificultad || 'Media'}</p>
        <p style="margin-bottom: 8px;"><strong>Duración estimada:</strong> ${ruta.duracion || ruta.duracionTexto || 'Por definir'}</p>
        
        ${galeriaHTML}

        <div class="descripcion-wrapper" style="margin: 12px 0;">
            <p id="textoDescripcionCatalogo" class="texto-colapsado">
                ${ruta.descripcion || 'Sin descripción disponible.'}
            </p>
            <button type="button" id="btnExpandirTextoCatalogo" class="btn-expandir">
                Ver más detalles ▼
            </button>
        </div>

        <p style="margin-bottom: 4px; margin-top: 10px;"><strong>Incluye:</strong> ${ruta.incluye || 'Guiatura profesional'}</p>
        <p style="margin-bottom: 12px;"><strong>Costo:</strong> ${ruta.precio || 'Consultar'}</p>
    `;

    const btnExpandirCat = document.getElementById("btnExpandirTextoCatalogo");
    const textoDescCat = document.getElementById("textoDescripcionCatalogo");

    if (btnExpandirCat && textoDescCat) {
        btnExpandirCat.addEventListener("click", () => {
            textoDescCat.classList.toggle("texto-colapsado");
            btnExpandirCat.innerHTML = textoDescCat.classList.contains("texto-colapsado")
                ? "Ver más detalles ▼"
                : "Ver menos ▲";
        });
    }

    if (catalogDetailModal) catalogDetailModal.classList.remove("hidden");
}

function cerrarModalCatalogoDetalle() {
    if (catalogDetailModal) catalogDetailModal.classList.add("hidden");
    ocultarSeccionVoto();
    if (abiertoDesdeCatalogo && catalogModal) {
        catalogModal.classList.remove("hidden");
    }
}

if (closeCatalogDetailModal) {
    closeCatalogDetailModal.addEventListener("click", cerrarModalCatalogoDetalle);
}

function ocultarSeccionVoto() {
    if (votingContainer) votingContainer.classList.add("hidden");
    if (btnInterest) btnInterest.classList.remove("active");
    if (heartIcon) heartIcon.textContent = "🤍";
    if (voterNameInput) voterNameInput.value = "";
    if (btnSubmitVote) {
        btnSubmitVote.disabled = true;
        btnSubmitVote.textContent = "📩 Enviar mi voto";
    }
}

if (btnInterest) {
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
}

function generarOpcionesFinesDeSemana() {
    if (!weekendOptions || !rutaSeleccionadaCatalogo) return;
    weekendOptions.innerHTML = "";

    const fechasValidas = Array.isArray(rutaSeleccionadaCatalogo.fechasPropuestas)
        ? rutaSeleccionadaCatalogo.fechasPropuestas.filter(f => f !== null && f !== undefined && f !== "")
        : [];

    const tieneFechas = fechasValidas.length > 0;
    const votoPrevio = localStorage.getItem(`usuario_voto_${rutaSeleccionadaCatalogo.id}`);
    const tituloVotacion = document.querySelector(".voting-title");

    if (tieneFechas) {
        // CASO 1: RUTA CON FECHAS PROPUESTAS
        if (tituloVotacion) tituloVotacion.textContent = "📅 Selecciona una fecha:";

        fechasValidas.forEach((opcion) => {
            const fechaTexto = typeof opcion === 'object' ? opcion.fecha : opcion;
            const numInteresados = typeof opcion === 'object' ? (opcion.interesados || 0) : 0;

            const btn = document.createElement("div");
            btn.classList.add("weekend-btn");

            if (votoPrevio === fechaTexto) {
                btn.classList.add("selected");
            }

            btn.innerHTML = `
                <span>📅 ${fechaTexto}</span>
                <span class="vote-badge">${numInteresados} interesados</span>
            `;

            if (!votoPrevio) {
                btn.addEventListener("click", () => {
                    document.querySelectorAll(".weekend-btn").forEach(b => b.classList.remove("selected"));
                    btn.classList.add("selected");
                    fechaVotoSeleccionada = fechaTexto;
                    if (btnSubmitVote) {
                        btnSubmitVote.disabled = false;
                        btnSubmitVote.classList.remove("btn-disabled");
                    }
                });
            }

            weekendOptions.appendChild(btn);
        });

        if (votoPrevio) {
            if (btnSubmitVote) {
                btnSubmitVote.disabled = true;
                btnSubmitVote.classList.add("btn-disabled");
                btnSubmitVote.textContent = "✓ Ya registraste tu voto";
            }
            if (voterNameInput) voterNameInput.placeholder = "Ya votaste para esta ruta";
        } else {
            if (btnSubmitVote) {
                btnSubmitVote.disabled = true;
                btnSubmitVote.classList.remove("btn-disabled");
                btnSubmitVote.textContent = "📩 Enviar mi voto";
            }
            if (voterNameInput) voterNameInput.placeholder = "Tu nombre (opcional)";
        }

    } else {
        // CASO 2: CATÁLOGO ABIERTO (SIN FECHAS PROPUESTAS)
        if (tituloVotacion) tituloVotacion.textContent = "🔥 Estado de interés:";
        fechaVotoSeleccionada = "Sin fecha fija";

        const interesadosTotales = rutaSeleccionadaCatalogo.interesados || 0;

        const infoBox = document.createElement("div");
        infoBox.className = "weekend-btn selected";
        infoBox.style.justifyContent = "center";
        infoBox.style.cursor = "default";
        infoBox.style.width = "100%";
        infoBox.style.padding = "10px";
        infoBox.innerHTML = `
            <span style="font-weight: bold; font-size: 0.95rem;">
                🙋‍♂️ ${interesadosTotales} personas interesadas en agendar esta ruta
            </span>
        `;
        weekendOptions.appendChild(infoBox);

        if (votoPrevio) {
            if (btnSubmitVote) {
                btnSubmitVote.disabled = true;
                btnSubmitVote.classList.add("btn-disabled");
                btnSubmitVote.textContent = "✓ Ya registraste tu interés";
            }
            if (voterNameInput) voterNameInput.placeholder = "Ya registraste tu interés";
        } else {
            if (btnSubmitVote) {
                btnSubmitVote.disabled = false;
                btnSubmitVote.classList.remove("btn-disabled");
                btnSubmitVote.style.cursor = "pointer";
                btnSubmitVote.textContent = "📩 Registrar mi interés por WhatsApp";
            }
            if (voterNameInput) voterNameInput.placeholder = "Tu nombre (opcional)";
        }
    }
}

if (btnSubmitVote) {
    btnSubmitVote.addEventListener("click", () => {
        if (!rutaSeleccionadaCatalogo) return;

        const fechasValidas = Array.isArray(rutaSeleccionadaCatalogo.fechasPropuestas)
            ? rutaSeleccionadaCatalogo.fechasPropuestas.filter(f => f !== null && f !== undefined && f !== "")
            : [];
        const tieneFechas = fechasValidas.length > 0;

        if (tieneFechas && !fechaVotoSeleccionada) return;

        // 1. SUMAR +1 INMEDIATAMENTE AL CONTADOR DE LA RUTA EN MEMORIA
        if (tieneFechas) {
            const index = rutaSeleccionadaCatalogo.fechasPropuestas.findIndex(f => {
                const texto = typeof f === 'object' ? f.fecha : f;
                return texto === fechaVotoSeleccionada;
            });

            if (index !== -1) {
                const opcion = rutaSeleccionadaCatalogo.fechasPropuestas[index];
                if (typeof opcion === 'object') {
                    opcion.interesados = (opcion.interesados || 0) + 1;
                } else {
                    rutaSeleccionadaCatalogo.fechasPropuestas[index] = {
                        fecha: fechaVotoSeleccionada,
                        interesados: 1
                    };
                }
            }
        } else {
            rutaSeleccionadaCatalogo.interesados = (rutaSeleccionadaCatalogo.interesados || 0) + 1;
        }

        // 2. GUARDAR EN LOCALSTORAGE
        localStorage.setItem(`usuario_voto_${rutaSeleccionadaCatalogo.id}`, fechaVotoSeleccionada || "interesado");

        // 3. RE-RENDERIZAR EN EL ACTO PARA MOSTRAR EL +1
        generarOpcionesFinesDeSemana();
        if (typeof renderizarCatalogo === 'function') {
            renderizarCatalogo();
        }

        // 4. ABRIR WHATSAPP
        const nombreUsuario = voterNameInput.value.trim() || "Un senderista";
        let textoWhatsApp = "";

        if (tieneFechas) {
            textoWhatsApp = encodeURIComponent(
                `¡Hola! Me interesa la ruta "${rutaSeleccionadaCatalogo.nombre}" y voto para hacerla el: ${fechaVotoSeleccionada}.\n\nNombre: ${nombreUsuario}.`
            );
        } else {
            textoWhatsApp = encodeURIComponent(
                `¡Hola! Me interesa realizar la ruta "${rutaSeleccionadaCatalogo.nombre}". Por favor avísenme cuando la agenden.\n\nNombre: ${nombreUsuario}.`
            );
        }

        const tel = typeof TELEFONO_WHATSAPP !== 'undefined' ? TELEFONO_WHATSAPP : '';
        const linkWhatsApp = `https://wa.me/${tel}?text=${textoWhatsApp}`;
        
        window.open(linkWhatsApp, "_blank");
    });
}

// ==============================================================================
// 8. CIERRE DE MODALES AL HACER CLIC FUERA
// ==============================================================================
window.addEventListener("click", (e) => {
    if (typeof routeModal !== 'undefined' && e.target === routeModal) {
        cerrarModalDetalles();
    }
    if (typeof catalogModal !== 'undefined' && e.target === catalogModal) {
        catalogModal.classList.add("hidden");
        abiertoDesdeCatalogo = false;
    }
    if (typeof catalogDetailModal !== 'undefined' && e.target === catalogDetailModal) {
        cerrarModalCatalogoDetalle();
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
// 10. SISTEMA DE FILTRADO HORIZONTAL (UNIFICANDO AMBAS LISTAS)
// ==============================================================================
document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "btnEjecutarFiltro") {
        e.preventDefault();

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

        const todasLasRutas = [...rutasConfirmadas, ...catalogoGeneral];

        const resultados = todasLasRutas.filter(ruta => {
            if (estadoVal === "programada" && !ruta.fecha) return false;
            if (estadoVal === "por-votar" && (!ruta.fechasPropuestas || ruta.fechasPropuestas.length === 0)) return false;
            if (estadoVal === "catalogo-abierto" && (ruta.fecha || (ruta.fechasPropuestas && ruta.fechasPropuestas.length > 0))) return false;

            if (dificultadVal !== "todos" && ruta.dificultad !== dificultadVal) return false;
            if (duracionVal !== "todos" && ruta.duracion !== duracionVal) return false;

            if (atractivoVal !== "todos") {
                if (!ruta.tipo || !Array.isArray(ruta.tipo) || !ruta.tipo.includes(atractivoVal)) {
                    return false;
                }
            }

            return true;
        });

        renderizarCatalogo(resultados);
    }

    if (e.target && (e.target.id === "btnLimpiarFiltros" || e.target.closest("#btnLimpiarFiltros"))) {
        e.preventDefault();

        if (document.getElementById("filterEstado")) document.getElementById("filterEstado").value = "todos";
        if (document.getElementById("filterDificultad")) document.getElementById("filterDificultad").value = "todos";
        if (document.getElementById("filterDuracion")) document.getElementById("filterDuracion").value = "todos";
        if (document.getElementById("filterAtractivo")) document.getElementById("filterAtractivo").value = "todos";

        renderizarCatalogo([...rutasConfirmadas, ...catalogoGeneral]);
    }
});

// ==============================================================================
// 11. FUNCIONALIDAD: GALERÍA DE MINIATURAS VERTICALES + LIGHTBOX FLOTANTE
// ==============================================================================
let imagenesGaleriaActual = [];
let indiceImagenActual = 0;

function construirFilmstripHTML(ruta) {
    const listaImagenes = (Array.isArray(ruta.imagenes) && ruta.imagenes.length > 0)
        ? ruta.imagenes
        : [ruta.imagen || 'assets/placeholder.jpg'];

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

window.deslizarTira = function(distancia) {
    const track = document.getElementById("thumbsTrack");
    if (track) {
        track.scrollBy({ left: distancia, behavior: 'smooth' });
    }
};

window.abrirLightbox = function(index) {
    indiceImagenActual = index;
    const modal = document.getElementById("lightboxModal");
    const imgVisor = document.getElementById("lightboxImg");

    if (!modal || !imgVisor) return;

    if (imagenesGaleriaActual.length > 0) {
        imgVisor.src = imagenesGaleriaActual[indiceImagenActual];
        modal.classList.remove("hidden");
    }
};

window.cerrarLightbox = function() {
    const modal = document.getElementById("lightboxModal");
    if (modal) modal.classList.add("hidden");
};

window.cambiarFotoLightbox = function(direccion) {
    if (imagenesGaleriaActual.length === 0) return;

    indiceImagenActual += direccion;

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

document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("lightboxModal");
    if (modal && !modal.classList.contains("hidden")) {
        if (e.key === "Escape") cerrarLightbox();
        if (e.key === "ArrowLeft") cambiarFotoLightbox(-1);
        if (e.key === "ArrowRight") cambiarFotoLightbox(1);
    }
});

// ==============================================================================
// 12. INICIALIZACIÓN AL CARGAR LA PÁGINA
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
    renderizarTarjetas();
});