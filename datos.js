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
id: "trescascadas-1126",
nombre: "Camping Tres Cascadas - Salmeron",
dificultad: "Media",
duracion: "3-5H",
duracionTexto: "Puede tomar unas 4-5 horas hacer el recorrido completo",    
descripcion: "En el Municipio Zamora , nos esperan 3 lugares maravillosos para conocer : Las Tres Casdadas , El pozo Azul y el Pozo Verde. Salimos desde Caracas en un jeep particular para llegar a Salmeron, donde llegamos al campamento Tres Cascadas para despues iniciar la caminata y hacer la visita de los 3 sitios, retornamos en la tarde y dependiendo de la logistica que hayamos organzido el grupo se hace la cena, se duerme en el campamento y al dia siguiente se hace el retorno a Caracas. ",
imagen: "assets/Imagen3cascadas.jpg",
precio: "Consultar via WhatsApp",
tipo: ["cumbres", "camping", "cascadas"],
interesados: 0,
fechasPropuestas: [], // <--- SIN COMAS ADENTRO
imagenes: [
"assets/Imagen3cascadas.jpg",
"assets/Imagen3cascadas1.jpg",
"assets/Imagen3cascadas2.jpg",
"assets/Imagen3cascadas3.jpg",
"assets/Imagen3cascadas4.jpg",
"assets/Imagen3cascadas5.jpg",
"assets/Imagen3cascadas6.jpg",
"assets/Imagen3cascadas7.jpg",
"assets/Imagen3cascadas8.jpg",
"assets/Imagen3cascadas9.jpg",
"assets/Imagen3cascadas10.jpg",
"assets/Imagen3cascadas11.jpg",
"assets/Imagen3cascadas12.jpg",
]
},  


        {
id: "colonia-codazzi-1126",
nombre: "Colonia Tovar - Camping Pico Codazzi",
dificultad: "Baja",
duracion: "3-5H",
duracionTexto: "15 minutos caminando ( con transporte ) ",
descripcion: "Con transporte privado agarramos rumbo hacia la Colonia Tovar en el estado Aragua para acampar en el Pico Codazzi, a su vez dependiendo de la logistica se pueden realizar varias visitas a los distintos lugares que ofrece la Colonia Tovar ",
imagen: "assets/ImagenCodazzi.jpg",
precio: "Consultar via WhatsApp",
tipo: ["cumbres", "camping"],
interesados: 0,
fechasPropuestas: [], // <--- SIN COMAS ADENTRO
imagenes: [

    "assets/ImagenCodazzi.jpg",
    "assets/ImagenCodazzi1.jpg",
"assets/ImagenCodazzi2.jpg",
"assets/ImagenCodazzi3.jpg",
]
},  



        {
id: "cascada-guairita-1126",
nombre: "Cascada La Guairita",
dificultad: "Baja",
duracion: "3-5H",
duracionTexto: "1h y 30 minutos para llegar a la Cascada",
descripcion: "En el sector Curupao del Parque Nacional Waraira Repano, encontramos esta maravilla , esta Cascada super alta con una belleza natural impresionante , para llegar a esta belleza hay que hacer varios cruces de rios y escalar una pequeña parte para darle una toque extremo a la ruta a su vez se hara la visita al dique la Vela , un espacio bastante bonito ideal para sentarnos , relajarnos y comer comodamente. El transporte no va incluido en el pago de la guiatura ",
imagen: "assets/ImagenGuairita1.jpg",
precio: "Consultar via WhatsApp",
tipo: ["cumbres", "cascadas"],
interesados: 0,
fechasPropuestas: [], // <--- SIN COMAS ADENTRO
imagenes: [
    "assets/ImagenGuairita1.jpg",
    "assets/ImagenGuairita.jpg",
"assets/ImagenGuairita2.jpg",
"assets/ImagenGuairita3.jpg",
"assets/ImagenGuairita4.jpg",
"assets/ImagenGuairita5.jpg",
"assets/ImagenGuairita6.jpg",
"assets/ImagenGuairita7.jpg",

]
},  




        {
id: "cascada-Velodenovia-1126",
nombre: "Cascada Velo de Novia",
dificultad: "Baja",
duracion: "3-5H",
duracionTexto: "1h y 30 minutos para llegar a la Cascada",
descripcion: "En el sector Curupao del Parque Nacional Waraira Repano, encontramos esta muy hermosa cascada , ideal para bañarse debajo de ella debido al pozo bajito que se forma , una ruta de dificultad baja donde solo vamos a encontrar un tramo semi extremo que hay q usar las manos para avanzar y ascender, de resto cruces de rios muy sencillos y caminata amigable. El transporte esta incluido en el costo de publicado",
imagen: "assets/ImagenVelo.jpg",
precio: "Consultar via WhatsApp",
tipo: ["cumbres", "cascadas"],
interesados: 0,
fechasPropuestas: [], // <--- SIN COMAS ADENTRO
imagenes: [
    "assets/ImagenVelo.jpg",
"assets/ImagenVelo2.jpg",
"assets/ImagenVelo3.jpg",
"assets/ImagenVelo1.jpg",
"assets/ImagenVelo4.jpg",
"assets/ImagenVelo5.jpg",
"assets/ImagenVelo6.jpg",
"assets/ImagenVelo7.jpg",
"assets/ImagenVelo8.jpg",
]
},  


            {
id: "cascada-Garate-1126",
nombre: "Cascada Garate",
dificultad: "Alta",
duracion: "6-9h",
duracionTexto: "4h aproximadamente para llegar a la cascada",
descripcion: "Por el sector las Culebrillas, por la entrada de Caicaguita encontramos esta inmensa , hermosa y muy fria cascada, donde se crea un pozo ideal para bañarse. Es una ruta de alta exigencia donde el mayor de gaste de energia se lo lleva la primera hora de ruta por su ascenso constante, despues se vuelve una caminata muy continua por el poblado de montaña",
imagen: "assets/ImagenGarate.jpg",
precio: "Consultar via WhatsApp",
tipo: ["cumbres", "cascadas"],
interesados: 0,
fechasPropuestas: [], // <--- SIN COMAS ADENTRO
imagenes: [
    "assets/ImagenGarate.jpg",
"assets/ImagenGarate1.jpg",
"assets/ImagenGarate2.jpg",
"assets/ImagenGarate6.jpg",
"assets/ImagenGarate4.jpg",
"assets/ImagenGarate5.jpg",
"assets/ImagenGarate3.jpg",
"assets/ImagenGarate7.jpg",
]
},   


        {
id: "cascada-plantilla-1126",
nombre: "Cascada La Plantilla",
dificultad: "Media",
duracion: "6-9h",
duracionTexto: "3h y media aproximadamente para llegar a la cascada",
descripcion: "Por el sector las Culebrillas, por la entrada de Caicaguita encontramos esta inmensa , hermosa y muy fria cascada, donde se crea un pozo ideal para bañarse. Es una ruta de exigencia media-alta donde el mayor de gaste de energia se lo lleva la primera hora de ruta por su ascenso constante, despues se vuelve una caminata muy continua por el poblado de montaña",
imagen: "assets/ImagenPlantilla1.jpg",
precio: "Consultar via WhatsApp",
tipo: ["cumbres", "cascadas"],
interesados: 0,
fechasPropuestas: [], // <--- SIN COMAS ADENTRO
imagenes: [
    "assets/ImagenPlantilla1.jpg",
"assets/ImagenPlantilla2.jpg",
"assets/ImagenPlantilla3.jpg",
"assets/ImagenPlantilla.jpg",
]
},   


    {
id: "cascada-arcoiris-1126",
nombre: "Cascada Arcoiris",
dificultad: "Media",
duracion: "6-9h",
duracionTexto: "3h aproximadamente para llegar a la cascada",
descripcion: "Una Cascada espectacular situada en el sector La Churca de nuestro Parque Nacional Waraira Repano, una ruta exigencia media con cruces de rios y caminata por senderos boscosos.",
imagen: "assets/ImagenArcoiris.jpg",
precio: "Consultar via WhatsApp",
tipo: ["cumbres", "cascadas"],
interesados: 0,
fechasPropuestas: [], // <--- SIN COMAS ADENTRO
imagenes: [
    "assets/ImagenArcoiris.jpg",
"assets/ImagenArcoiris1.jpg",
"assets/ImagenArcoiris2.jpg",
"assets/ImagenArcoiris3.jpg",
"assets/ImagenArcoiris4.jpg",
"assets/ImagenArcoiris5.jpg",
"assets/ImagenArcoiris6.jpg",
]
},




    {
id: "Cascada-Paraiso-1126",
nombre: "Cascada Paraiso y Cañon del Norte",
dificultad: "Media",
duracion: "3-5h",
duracionTexto: "Unas 2h de caminata para llegar a la Cascada Paraiso",
descripcion: "Una Cascada espectacular situada en el sector La Churca de nuestro Parque Nacional Waraira Repano, una ruta exigencia media con cruces de rios y caminata por senderos boscosos ",
imagen: "assets/ImagenParaiso1.jpg",
precio: "Consultar via WhatsApp",
tipo: ["cumbres", "cascadas"],
interesados: 0,
fechasPropuestas: [], // <--- SIN COMAS ADENTRO
imagenes: [
"assets/ImagenParaiso1.jpg",
"assets/ImagenParaiso3.jpg",
"assets/ImagenParaiso9.jpg",
"assets/ImagenParaiso10.jpg",
"assets/ImagenParaiso4.jpg",
"assets/ImagenParaiso6.jpg",
"assets/ImagenParaiso8.jpg",
"assets/ImagenParaiso12.jpg",
]
},

    {
id: "CDLE-1126",
nombre: "Camino de los Españoles - Dos Aguadas",
dificultad: "Media",
duracion: "6-9h",
duracionTexto: " Minimo 6 horas para completar la ruta",
descripcion: "Ruta que te regala una experiencia única , caminar desde la ciudad de Caracas hasta la costa de La Guaira atresavando la montaña, conociendo el poblado de Hoyo de la Cumbre, senderos perfectamente caminables, regalandonos vistas espectaculares de la montaña y hacia la costa, conoceremos el Fortin San Carlos, el fortin El Vigia y caeremos en La Ciudad Historica de La Guaira ",
imagen: "assets/ImagenCDLE7.jpg",
precio: "Consultar via WhatsApp",
tipo: ["cumbres", "patrimonio"],
interesados: 0,
fechasPropuestas: [], // <--- SIN COMAS ADENTRO
imagenes: [
"assets/ImagenCDLE7.jpg",
"assets/ImagenCDLE2.jpg",
"assets/ImagenCDLE3.jpg",
"assets/ImagenCDLE4.jpg",
"assets/ImagenCDLE5.jpg",
"assets/ImagenCDLE6.jpg",
"assets/ImagenCDLE.jpg",
"assets/ImagenCDLE8.jpg",
]
},


    {
id: "anaucos-1126",
nombre: "Cascada Los Anaucos",
dificultad: "Media", // Clave estandarizada
duracion: "3-5h", // Clave estandarizada
interesados: 0,
duracionTexto: "3 horas aproximadamente para llegar a la cascada",
descripcion: "El P. N. Waraira Repano, por el sector Curupao, nos presenta esta ruta muy bonita con cruces de ríos, senderos perfectamente caminables, vegetación frondosa, pozos espectaculares y una cascada doble como recompensa final. El lugar y la hora de encuentro se proporcionan vía WhatsApp. Es necesario tomar transporte para iniciar la caminata; el costo publicado no incluye el pago del transporte.",
incluye: "Guiatura y acompañmiento en todo momento de la ruta, cafe recien colado al llegar a la Cascada mas un snack, registro fotogrico de la ruta personal y grupal",
imagen: "assets/ImagenAnaucos.png",
precio: "Consulta via WhatsApp",
tipo: ["cascadas"] ,
fechasPropuestas: [], // <--- AHORA ESTÁ VACÍO Y NO ROMPERÁ
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
            "assets/ImagenAnaucos11.png" ,
]
}


   ,{
        id: "teleferico_cat",
        nombre: "Teleferico Fantasma - Estacion El Lyron",
        dificultad: "Media",
        duracion: "3-5h",  
        duracionTexto: "3-4h de caminata para llegar a la vieja estrcutura",                                // Clave estandarizada
        tipo: ["patrimonio"],
        descripcion: "El P. N. Waraira Repano esconde una estructura histórica correspondiente a la estación El Lyrón. Empezamos el ascenso desde el sector Gamboa, pasando por el pueblo de Galipán hasta llegar a la estructura.",                                  
        imagen: "assets/ImagenTelefericoFantasma.png",
        interesados: 0,
        incluye: "Guiatura y soporte durante toda la ruta, cafe recien colado, snack.",
        precio: "Consultar via WhatsApp",
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
    descripcion: "Ascenso a la segunda cumbre más alta de toda la cordillera de la Costa: el Pico Oriental, a unos 2640 m s. n. m. Pasando por los miradores Piedra del Indio, Cabeza de Elefante, el emblemático Pino Solitario y la Cruz de los Palmeros, es una de las rutas con las vistas más impactantes y espectaculares hacia Caracas. La ruta es exigente y requiere de buena condición física, ya que el desnivel es continuo durante todo el recorrido. El descenso se hace por la misma ruta, por lo que se recomienda llevar al menos 3 litros de agua, frutos secos, abrigo para la cumbre y calzado de montaña con buen agarre.",    
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
    descripcion: "Ascenso al Pico Occidental (2480 m s. n. m.), una de las cumbres más altas de la cordillera de la Costa. Partiendo desde Sabas Nieves, el trayecto pasa por El Banquito, se adentra en un frondoso camino boscoso lleno de vegetación y encarará el exigente tramo de No Te Apures y las piedras flotantes para después hacer cumbre en la cruz del Pico Occidental. Es una ruta exigente que requiere buena condición física por su desnivel continuo. El descenso es por la misma vía, por lo que se recomienda llevar al menos 2 litros de agua, frutos secos, abrigo para la cumbre y calzado cómodo para caminar.",    
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
        descripcion: "Ruta que inicia por el sector La Churca del Parque Nacional: una ruta de exigencia media por senderos amigables y algunos ascensos de media exigencia hasta llegar a la imponente y ruidosa cascada, apta para bañarse sin necesidad de saber nadar.",        
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
        descripcion: "Ruta que inicia por el sector La Churca del Parque Nacional: una ruta de alta exigencia debido al tiempo de caminata y a algunos tramos con ascensos fuertes al principio. Pasa por varios pozos muy bonitos antes de la gran recompensa: la impactante Cascada Norte, ideal para bañarse en su base.",        
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
    id: "grietas-san-pedrov2",
    nombre: "Grietas de San Pedro - Camino de los Libertadores",
    dificultad: "Media",
    duracion: "6-9h",
    duracionTexto: "7-8 horas de caminata aproximadamente para completar la ruta",
    tipo: ["patrimonio", "cumbres"],
    descripcion: "Iniciamos la caminata en el sector Los Mujicas, en Caracas. El recorrido destaca por sus paisajes de montaña sacados de un cuadro, caminos perfectamente caminables y tramos de vegetación boscosa que brindan frescura al trayecto. A lo largo de la ruta disfrutaremos de vistas increíbles, para finalmente atravesar las imponentes e impresionantes Grietas de San Pedro y culminar nuestro recorrido en San Pedro de Los Teques.",    
    incluye: "Guiatura y soporte durante toda la ruta, cafe recien colado, snack.",
    precio: "Consultar via WhatsApp",
    imagen: "assets/ImagenGrietasDeSanPedro.png",
    fechasPropuestas: [
        { fecha: "Domingo 1 de Noviembre", interesados: 0 },
        { fecha: "Domingo 8 de Noviembre", interesados: 0 }
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
    descripcion: "La ruta hacia el Picacho de Galipán tiene un inicio un poco fuerte durante los primeros 30 minutos; después, el camino se hace muy amigable, con senderos cómodos para caminar. Las vistas hacia La Guaira desde el picacho son simplemente de las más alucinantes.",    
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
        descripcion: "Ascenso a la cumbre más alta de la cordillera de la Costa (2765 m s. n. m.): el Pico Naiguatá. Pasando por el mirador Dos Banderas, el tramo Las Toyotas, el Topo Goering, Los Platos del Diablo y el Anfiteatro (la zona de camping), antes de hacer cumbre en la Cruz del Pico Naiguatá.",        imagen: "assets/ImagenNaiguata14.png",
        interesados: 0,
        incluye: "Guiatura y soporte durante toda la ruta, cafe recien colado, snack.",
        precio: "Consultar via WhatsApp",
        imagen: "assets/ImagenNaiguata8.png",
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
        descripcion: "Ascendemos hasta el sector Lagunazo, donde acamparemos y disfrutaremos de la naturaleza, el atardecer y el amanecer, para luego descender al día siguiente. La ruta es de dificultad media y requiere una condición física aceptable.",        
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