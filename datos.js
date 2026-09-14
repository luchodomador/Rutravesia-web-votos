// NUMERO DE TELEFONO DE TU GRUPO/GUIATURA (Incluir código de país)
const TELEFONO_WHATSAPP = "584242249841";

/* 
==============================================================================
GUÍA DE VALORES PARA EL FILTRADO DE RUTAS EN EL ÁVILA (RUTRAVESÍA)
==============================================================================

1. ESTADO DE LA RUTA (Se detecta automáticamente por propiedades):
   - Programada: La ruta debe tener el campo `fecha: "Sábado 15 de Agosto"`
   - Por Votar: La ruta tiene `fechasPropuestas: ["Sábado 05 de Septiembre"]`
   - Catálogo Abierto: No tiene `fecha` y su arreglo está vacío `fechasPropuestas: []`

2. DIFICULTAD (Usar exactamente una de estas palabras en la propiedad `dificultad`):
   - "Baja"
   - "Media"
   - "Alta"
   - "Extrema"

3. DURACIÓN (Usar exactamente uno de estos valores en la propiedad `duracion`):
   - "3-5h"       (Caminatas de medio día / iniciación)
   - "6-9h"       (Jornada completa de 1 día)
   - "multidia"   (Pernocta / expediciones de varios días)

4. ATRACTIVO / TIPO (Usar un arreglo en la propiedad `tipo` con estas etiquetas en minúscula):
   - ["cascadas"]    (Ríos, pozos y saltos de agua)
   - ["cumbres"]     (Picos, filas y miradores)
   - ["camping"]      (Zonas para acampar y pernocta)
   - ["patrimonio"]   (Ruinas, caminos históricos, fortines, teleférico)

EJEMPLO COMPLETO DE UNA RUTA EN EL CATÁLOGO:
{
    id: "c1",
    nombre: "Teleférico Fantasma",
    dificultad: "Baja",
    duracion: "3-5h",
    tipo: ["patrimonio"],
    descripcion: "Caminata de iniciación hacia las ruinas del antiguo teleférico.",
    imagen: "assets/ImagenTeleferico.png",
    fechasPropuestas: [] // Lista vacía = Catálogo Abierto
}
==============================================================================
*/


// BASE DE DATOS LOCAL DE RUTAS CONFIRMADAS
const rutasConfirmadas = [];
// CATÁLOGO GENERAL DE RUTAS DISPONIBLES EN EL ÁVILA Y ALREDEDORES
const catalogoGeneral = [

 {
        id: "Anaucos-v1",
        nombre: "Cascada Los Anaucos",
        dificultad: "Media",
        duracion: "3-5h",                                  // Clave estandarizada
        duracionTexto: "2h :30 min a 3h horas de caminata para llegar a la Cascada", // Opcional: Para mostrarlo amigable en la tarjeta
        tipo: ["cascadas"],                              // Coincide con 'patrimonio' en el HTML
        descripcion: "El PN Waraira Repano por el sector Curupao , nos presenta esta ruta muy bonita con cruces de rios, senderos perfectamente caminables , vegetacion frondoza , pozos espectaculares y una cascada doble como recompensa final. El lugar y hora de encuentro se proporcionan via WhatsApp. Es necesario tomar transporte para iniciar la caminata , el costo de la publicado no incluye el pago de transporte.",
        incluye: "Guiatura y soporte durante toda la ruta, cafe recien colado, snack.",
        precio: "10$ por persona ",
        imagen: "assets/ImagenAnaucos.png",
       fechasPropuestas: [
        { fecha: "Domingo 27 de Septiembre", interesados: 2 },
        { fecha: "Domingo 4 de Octubre", interesados: 0 }
        ],
        imagenes: [
            "assets/ImagenAnaucos.png",
            "assets/ImagenAnaucos2.png",
            "assets/ImagenAnaucos3.png",
            "assets/ImagenAnaucos4.png",
            "assets/ImagenAnaucos5.png",
            "assets/ImagenAnaucos6.png",
            "assets/ImagenAnaucos7.png",
            "assets/ImagenAnaucos8.png",
            "assets/ImagenAnaucos10.png",
            "assets/ImagenAnaucos11.png"
        ]
    },

   {
        id: "teleferico_cat",
        nombre: "Teleferico Fantasma - Estacion El Lyron",
        dificultad: "Media",
        duracion: "3-5h",                                  // Clave estandarizada
        duracionTexto: "3-4 horas de Caminata", // Opcional: Para mostrarlo amigable en la tarjeta
        tipo: ["patrimonio"],                              // Coincide con 'patrimonio' en el HTML
        descripcion: "El PN Waraira Repano esconde una estructura historica correspondiente a la estacion  El Lyron. Empezamos el ascenso desde el sector Gamboa pasando por el pueblo de Galipan hasta llegar a la estructura",
        imagen: "assets/ImagenTelefericoFantasma.png",
        interesados: 0,
        incluye: "Guiatura y soporte durante toda la ruta, cafe recien colado, snack.",
        precio: "Coonsultar via WhatsApp",
       fechasPropuestas: [],
        imagenes: [
            "assets/ImagenTelefericoFantasma.png",
            "assets/ImagenTelefericoFantasma2.png",
            "assets/ImagenTelefericoFantasma7.png",
            "assets/ImagenTelefericoFantasma4.png",
            "assets/ImagenTelefericoFantasma8.png",
            "assets/ImagenTelefericoFantasma6.png",
            "assets/ImagenTelefericoFantasma3.png",
            "assets/ImagenTelefericoFantasma5.png",
            "assets/ImagenTelefericoFantasma9.png",
            "assets/ImagenTelefericoFantasma10.png"
        ]
    },
 {
    id: "pico-orientalcat",
    nombre: "Pico Oriental",
    dificultad: "Alta",
    duracion: "6-9h",
    duracionTexto: " Minimo 8 horas para completar la ruta",
    tipo: ["cumbres"],
    descripcion: "Ascendo a la segunda cumbre mas alta de toda la cordillera de la costa, el Pico Oriental a unos 2640 msnm, pasando por los miradores Piedra el Inidio, Cabeza de Elefante, el emblematico Pino Solitario y la Cruz de los Palmeros , de las rutas con las vistas mas impactantes y especatulares hacia Caracas. La ruta es exigente y requiere de buena condición física, ya que el desnivel es continuo durante todo el recorrido. El descenso se hace por la misma ruta, por lo que se recomienda llevar al menos 3 litros de agua, frutos secos, abrigo para la cumbre y calzado de montaña con buen agarre.",
    incluye: "Guiatura y soporte durante toda la ruta, cafe recien colado, snack.",
    precio: "Consultar via WhatsApp",
    imagen: "assets/ImagenPicoOriental.png",
    interesados: 0,       
    fechasPropuestas: [], // <--- SIN COMAS ADENTRO
    imagenes: [
        "assets/ImagenPicoOriental.png",
        "assets/ImagenPicoOriental1.png",
        "assets/ImagenPicoOriental2.png",
        "assets/ImagenPicoOriental10.png",
        "assets/ImagenPicoOriental4.png",
        "assets/ImagenPicoOriental5.png",
        "assets/ImagenPicoOriental6.png",
        "assets/ImagenPicoOriental7.png",
        "assets/ImagenPicoOriental8.png",
        "assets/ImagenPicoOriental9.png",
        "assets/ImagenPicoOriental3.png"
    ]
},
{
    id: "pico-occidentalcat",
    nombre: "Pico Occidental",
    dificultad: "Media-Alta",
    duracion: "6-9h", // Estandarizado para el filtro
    duracionTexto: "Unas 3h-4h de ascenso aproximadamente", // 
    tipo: ["cumbres"], // Propiedad nueva para los filtros
    descripcion: "Ascenso al Pico Occidental 2480 msnm , una de las cumbres mas altas de la cordillera de la costa. Partiendo desde Sabas Nieves, el trayecto pasa por El Banquito, se adentra en un frondoso camino boscoso lleno de vegetación y encarara el exigente tramo de No Te Apures y las piedras flotantes para despues hacer cumbre en la cruz del Pico Occidental. Es una ruta exigente que requiere buena condición física por su desnivel continuo. El descenso es por la misma vía, por lo que se recomienda llevar al menos 2 litros de agua, frutos secos, abrigo para la cumbre y calzado comodo para caminar.",
    incluye: "Guiatura y soporte durante toda la ruta, cafe recien colado, snack.",
    precio: "Consultar via WhatsApp",
    imagen: "assets/ImagenPicoOccidental.png",
    interesados: 0,
    fechasPropuestas: [],
    imagenes: [
            "assets/ImagenPicoOccidental.png",
            "assets/ImagenPicoOccidental1.png",
            "assets/ImagenPicoOccidental2.png",
            "assets/ImagenPicoOccidental3.png",
            "assets/ImagenPicoOccidental4.png",
            "assets/ImagenPicoOccidental5.png"
        ]
},
    {
        id: "salto-manuel-angel-gonzalezcat",
        nombre: "Salto Manuel Angel Gonzalez",
        dificultad: "Media",
        duracion: "6-9h", // Estandarizado para el filtro
        duracionTexto: "2 horas a 2 horas 30 min horas de caminata hasta la cascada", // Opcional: Para mostrarlo amigable en la tarjeta
        tipo: ["cascadas"], // Propiedad nueva para los filtros
        descripcion: "Ruta que inicia por el Sector La Churca del Parque Nacional, una ruta de exigencia media por senderos amigables y algunos ascensos de media exigencia hasta llegar a la imponente y ruidosa cascada, apta para bañarse sin necesidad de saber nadar",
        incluye: "Guiatura y soporte durante toda la ruta, cafe recien colado, snack.",
        precio: "Consultar via WhatsApp",
        imagen: "assets/ImagenMAG.png",
        interesados: 0,
        /* OPCIONES DE FECHA ESPECÍFICAS PARA ESTA RUTA */
       fechasPropuestas: [],
        imagenes: [
            "assets/ImagenMAG.png",
            "assets/ImagenMAG1.png",
            "assets/ImagenMAG2.png",
            "assets/ImagenMAG3.png",
            "assets/ImagenMAG4.png",
            "assets/ImagenMAG5.png",
            "assets/ImagenMAG6.png",         
        ]
    },
    {
        id: "cascada-nortecat",
        nombre: "Cascada Norte",
        dificultad: "Alta",
        duracion: "6-9h", // Estandarizado para el filtro
        duracionTexto: "4-5h de caminata para llegar a la Cascada", // Opcional: Para mostrarlo amigable en la tarjeta
        tipo: ["cascadas"], // Propiedad nueva para los filtros
        descripcion: "Ruta que inicia por el Sector La Churca del Parque Nacional, una ruta de alta exigencia debido al tiempo de caminata y algunos tramos con ascensos fuertes al principio de la ruta, pasando por varios pozos muy bonitos antes de la gran recompensa, la impactante Cascada Norte, ideal para bañarse en su base  ",
        incluye: "Guiatura y soporte durante toda la ruta, cafe recien colado, snack.",
        precio: "Consultar via WhatsApp",
        imagen: "assets/ImagenCascadaNorte.png",
        interesados: 0,
        /* OPCIONES DE FECHA ESPECÍFICAS PARA ESTA RUTA */
   fechasPropuestas: [],
        imagenes: [
            "assets/ImagenCascadaNorte.png",
            "assets/ImagenCascadaNorte1.png",
            "assets/ImagenCascadaNorte3.png",
            "assets/ImagenCascadaNorte4.png",
            "assets/ImagenCascadaNorte5.png",
            "assets/ImagenCascadaNorte6.png",
            "assets/ImagenCascadaNorte7.png",
            "assets/ImagenCascadaNorte8.png",
            "assets/ImagenCascadaNorte9.png"
        ]
    },
  {
    id: "grietas-san-pedrov1",
    nombre: "Grietas de San Pedro - Camino de los Libertadores",
    dificultad: "Media",
    duracion: "6-9h",
    duracionTexto: "7-8 horas de caminata aproximadamente para completar la ruta",
    tipo: ["patrimonio", "cumbres"],
    descripcion: "Iniciamos la caminata en el sector Los Mujicas en Caracas. El recorrido destaca por sus paisajes de montaña sacados de un cuadro, caminos perfectamente caminables y tramos de vegetación boscosa que brindan frescura al trayecto. A lo largo de la ruta disfrutaremos de vistas increíbles, para finalmente atravesar las imponentes e impresionantes Grietas de San Pedro y culminar nuestro recorrido en San Pedro de Los Teques.",
    incluye: "Guiatura y soporte durante toda la ruta, cafe recien colado, snack.",
    precio: "Consultar via WhatsApp",
    imagen: "assets/ImagenGrietasDeSanPedro.png",
    fechasPropuestas: [
        { fecha: "Sábado 26 de Septiembre", interesados: 0 },
        { fecha: "Sábado 3 de Octubre", interesados: 0 }
    ], // <--- AHORA ESTÁ VACÍO Y NO ROMPERÁ
    imagenes: [
        "assets/ImagenGrietasDeSanPedro.png",
        "assets/ImagenGrietasDeSanPedro2.png",
        "assets/ImagenGrietasDeSanPedro3.png",
        "assets/ImagenGrietasDeSanPedro4.png",
        "assets/ImagenGrietasDeSanPedro5.png",
        "assets/ImagenGrietasDeSanPedro6.png",
        "assets/ImagenGrietasDeSanPedro7.png",
        "assets/ImagenGrietasDeSanPedro8.png",
        "assets/ImagenGrietasDeSanPedro9.png",
        "assets/ImagenGrietasDeSanPedro10.png",
        "assets/ImagenGrietasDeSanPedro11.png"
    ]
},
 {
    id: "picacho-cat",
    nombre: "Picacho de Galipan",
    dificultad: "Media",
    duracion: "3-5h",
    duracionTexto: "3h aproximadamente para hacer Cumbre",
    tipo: ["cumbres"],
    descripcion: "La ruta hacia el Picacho de Galipan es una ruta de inicio un poco fuerte los primeros 30 minutos, despues el camino se hace muy amigable con senderos comodos para caminar, las vistas hacia La Guaira desde el picacho son simplemente de las mas alucinantes ",
    incluye: "Guiatura y soporte durante toda la ruta, cafe recien colado, snack.",
    precio: "Consultar via WhatsApp",
    imagen: "assets/ImagenPicacho.png",
    interesados: 0,
    fechasPropuestas: [], // <--- AHORA ESTÁ VACÍO Y NO ROMPERÁ
    imagenes: [
        "assets/ImagenPicacho.png",
        "assets/ImagenPicacho3.png",
        "assets/ImagenPicacho2.png",
        "assets/ImagenPicacho1.png",
        "assets/ImagenPicacho4.png",
        "assets/ImagenPicacho5.png",
        "assets/ImagenPicacho6.png",
        "assets/ImagenPicacho8.png",
        "assets/ImagenPicacho10.png",   
        "assets/ImagenPicacho14.png",
    ]
},

 {
        id: "Naiguata-cat",
        nombre: "Pico Naiguatá",
        dificultad: "Extrema",                             // Se ajustó a Extrema
        duracion: "6-9h",                                  // Clave estandarizada
        duracionTexto: "12 - 14 horas para completar la ruta, ida y vuelta", // Opcional: Para mostrarlo amigable en la tarjeta
        tipo: ["cumbres"],
        descripcion: "Ascenso a la cumbre más alta de la Cordillera de la Costa 2.765 msnm, El Pico Naiguata. Pasando por el mirador Dos Banderas, el tramo Las Toyotas , El topo Goering , los Platos del Diablo y el Anfiteatro la zona camping antes de hacer cumbre en la Cruz del Pico Naiguata.",
        imagen: "assets/ImagenNaiguata14.png",
        interesados: 0,
        fechasPropuestas: [],
        imagenes: [
            "assets/ImagenNaiguata8.png",
            "assets/ImagenNaiguata17.png",
            "assets/ImagenNaiguata3.png" , 
            "assets/ImagenNaiguata4.png" , 
            "assets/ImagenNaiguata5.png" ,
            "assets/ImagenNaiguata7.png ",
            "assets/ImagenNaiguata1.png",
            "assets/ImagenNaiguata9.png",
            "assets/ImagenNaiguata11.png",
            "assets/ImagenNaiguata12.png",
            "assets/ImagenNaiguata13.png",
            "assets/ImagenNaiguata14.png" 
        ]                                
    },

    {
        id: "camping-lagunazo-cat",
        nombre: "Camping Lagunazo",
        dificultad: "Media",
        duracion: "multidia", // Estandarizado para el filtro
        duracionTexto: "1 noche de camping",    
        tipo: ["camping"],
        descripcion: "Asceendemos hasta el sector Lagunazo, donde acamparemos y disfrutaremos de la naturaleza, el atardecer y el amanecer. Para luego descender al dia siguiente. La ruta es de dificultad media y requiere una condicion fisica aceptable.",
        interesados: 0,
        incluye: "Guiatura y soporte durante toda la ruta",
        precio: "Consultar via WhatsApp",
        imagen: "assets/ImagenCampingLagunazo.png",
        interesados: 0,
        fechasPropuestas: [],
        imagenes: [
            "assets/ImagenCampingLagunazo.png",
            "assets/ImagenCampingLagunazo2.png",
            "assets/ImagenCampingLagunazo3.png",
            "assets/ImagenCampingLagunazo4.png", 
            "assets/ImagenCampingLagunazo5.png",               
        ]
    }

];