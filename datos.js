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
const rutasConfirmadas = [
{
        id: 1,
        nombre: "Pico Naiguatá",
        fecha: "Próximo Sábado 15 de Agosto",
        dificultad: "Extrema",                             // Se ajustó a Extrema
        duracion: "6-9h",                                  // Clave estandarizada
        duracionTexto: "12 - 14 horas", 
        descripcion: "Ascenso a la cumbre más alta de la Cordillera de la Costa (2.765 msnm). Requiere una excelente condición física ya que el desnivel es continuo. Durante el recorrido atravesaremos diferentes pisos térmicos, desde la selva nublada hasta el subpáramo del anfiteatro. Es una expedición exigente que premia con vistas panorámicas únicas de Caracas y el Mar Caribe. Se recomienda llevar al menos 3 litros de agua, frutos secos, abrigo para la cumbre y calzado de montaña con buen agarre.",
        incluye: "Guía certificado, kit de primeros auxilios, fotos digitales.",
        imagen: "assets/ImagenNaiguata.png",
        precio: "$25 por persona",
        tipo: ["cumbres"] ,
        imagenes: [
            "assets/ImagenNaiguata1.png",
            "assets/ImagenNaiguata2.png",
            "assets/ImagenNaiguata3.png" , 
            "assets/ImagenNaiguata4.png" , 
            "assets/ImagenNaiguata5.png" ,
            "assets/ImagenNaiguata6.png",
            "assets/ImagenNaiguata7.png ",
            "assets/ImagenNaiguata8.png",
            "assets/ImagenNaiguata9.png", 
            "assets/ImagenNaiguata10.png"
        ]                                 // Coincide con 'cumbres' en el HTML
    },
    {
        id: 2,
        nombre: "Camino de los Españoles",
        fecha: "Próximo Domingo 16 de Agosto",
        dificultad: "Media", // Se ajustó a Media
        duracion: "6-9h",
        duracionTexto: "5-7 horas", // Opcional: Para mostrarlo amigable en la tarjeta
        descripcion: "Ruta histórica desde La Pastora hasta La Guaira, pasando por fortines coloniales.",
        incluye: "Guía patrimonial, paramédico, hidratación de recarga.",
        imagen: "assets/ImagenCDLE.png" /* ← RUTA DE LA FOTO 2 */,
        precio: "$15 por persona",
        tipo: ["patrimonio"], // Propiedad nueva para los filtros
        imagenes: [
            "assets/naiguata4.jpg",
            "assets/naiguata5.jpg",
            "assets/naiguata6.jpg"
        ]
    },
    {
        id: 3,
        nombre: "Picacho de Galipán",
        fecha: "Sábado 22 de Agosto",
        dificultad: "Media",
        duracion: "3-5h",
        duracionTexto: "3-5 horas", // Opcional: Para mostrarlo amigable en la tarjeta
        descripcion: "Excelente ruta de iniciación con vistas espectaculares al Mar Caribe y a Caracas.",
        incluye: "Guía, logística de transporte opcional, fotos.",
        imagen: "assets/ImagenPicacho.png" /* ← RUTA DE LA FOTO 3 */,
        precio: "$20 por persona",
        tipo: ["cumbre"], // Propiedad nueva para los filtros
        imagenes: [
            "assets/naiguata7.jpg",
            "assets/naiguata8.jpg",
            "assets/naiguata9.jpg"
        ]
    }
];
// CATÁLOGO GENERAL DE RUTAS DISPONIBLES EN EL ÁVILA Y ALREDEDORES
const catalogoGeneral = [
   {
        id: "c1",
        nombre: "Teleferico Fantasma - Estacion El Lyron",
        dificultad: "Baja",
        duracion: "3-5h",                                  // Clave estandarizada
        duracionTexto: "3-4 horas de Caminata", // Opcional: Para mostrarlo amigable en la tarjeta
        tipo: ["patrimonio"],                              // Coincide con 'patrimonio' en el HTML
        descripcion: "Clásica caminata de iniciación con excelente sombra y miradores hacia Caracas.",
        imagen: "assets/ImagenTelefericoFantasma.png",
       fechasPropuestas: [
        { fecha: "Sábado 03 de Octubre", interesados: 5 },
        { fecha: "Domingo 4 de Octubre", interesados: 0 }
        ],
        imagenes: [
            "assets/naiguata10.jpg",
            "assets/naiguata12.jpg",
            "assets/naiguata13.jpg"
        ]
    },
 {
    id: "c2",
    nombre: "Pico Oriental",
    dificultad: "Alta",
    duracion: "6-9h",
    duracionTexto: "7 - 8 horas",
    descripcion: "Ruta exigente hacia una de las cumbres más emblemáticas, pasando por la Fila del Corozo.",
    imagen: "assets/ImagenPicoOriental.png",
    tipo: ["cumbres"],
    interesados: 0,       
    fechasPropuestas: [], // <--- SIN COMAS ADENTRO
    imagenes: [
        "assets/naiguata20.jpg",
        "assets/naiguata22.jpg",
        "assets/naiguata21.jpg"
    ]
},
{
    id: "c3",
    nombre: "Pico Occidental",
    dificultad: "Media-Alta",
    duracion: "6-9h", // Estandarizado para el filtro
    duracionTexto: "2 horas", // Opcional: Para mostrarlo amigable en la tarjeta
    descripcion: "Paseo suave e ideal para familias, bordeando el río hasta llegar al pozo.",
    imagen: "assets/ImagenPicoOccidental.png",
    tipo: ["cumbres"], // Propiedad nueva para los filtros
    fechasPropuestas: [
        { fecha: "Sábado 03 de Octubre", interesados: 0 },
        { fecha: "Domingo 4 de Octubre", interesados: 0 }
    ],
    imagenes: [
            "assets/naiguata30.jpg",
            "assets/naiguata31.jpg",
            "assets/naiguata32.jpg"
        ]
},
    {
        id: "c4",
        nombre: "Salto Manuel Angel Gonzalez",
        dificultad: "Media",
        duracion: "6-9h", // Estandarizado para el filtro
        duracionTexto: "4-6 horas de caminata", // Opcional: Para mostrarlo amigable en la tarjeta
        tipo: ["cascadas"], // Propiedad nueva para los filtros
        descripcion: "Hermosa meseta ubicada en las alturas de la fila principal con clima fresco de montaña.",
        imagen: "assets/ImagenMAG.png",
        /* OPCIONES DE FECHA ESPECÍFICAS PARA ESTA RUTA */
       fechasPropuestas: [
        { fecha: "Sábado 03 de Octubre", interesados: 0 },
        { fecha: "Domingo 04 de Octubre", interesados: 0 }
        ],
        imagenes: [
            "assets/naiguata40.jpg",
            "assets/naiguata41.jpg",
            "assets/naiguata42.jpg"         
        ]
    },
    {
        id: "c5",
        nombre: "Cascada Norte",
        dificultad: "Alta",
        duracion: "6-9h", // Estandarizado para el filtro
        duracionTexto: "7-9h de caminata", // Opcional: Para mostrarlo amigable en la tarjeta
        tipo: ["cascadas"], // Propiedad nueva para los filtros
        descripcion: "Ruta de vegetación frondosa que conecta varios puestos icónicos de la montaña.",
        imagen: "assets/ImagenCascadaNorte.png",
        /* OPCIONES DE FECHA ESPECÍFICAS PARA ESTA RUTA */
   fechasPropuestas: [
        { fecha: "Sábado 03 de Octubre", interesados: 0 },
        { fecha: "Domingo 04 de Octubre", interesados: 0 }
        ],
        imagenes: [
            "assets/naiguata100.jpg",
            "assets/naiguata002.jpg",
            "assets/naiguata003.jpg"
        ]
    },
   {
        id: "c6",
        nombre: "Grietas de San Pedro - Camino de los Libertadores",
        dificultad: "Media",
        duracion: "6-9h", // Estandarizado para el filtro
        duracionTexto: "4-6 horas", // Opcional: Para mostrarlo amigable en la tarjeta
        tipo: ["patrimonio", "cumbres"], // Propiedad nueva para los filtros
        descripcion: "Ruta de vegetación frondosa que conecta varios puestos icónicos de la montaña.",
        imagen: "assets/ImagenGrietasDeSanPedro.png",
        /* OPCIONES DE FECHA ESPECÍFICAS PARA ESTA RUTA */
        interesados: 0,
   fechasPropuestas: [
        {  },
        { }
        ],
        imagenes: [
            "assets/naiguata60.jpg",
            "assets/naiguata61.jpg",
            "assets/naiguata62.jpg"
        ]
    }
    
];