/**
 * K&A COOKIES - CONFIGURACIÓN CENTRAL
 * 
 * Modifica fácilmente desde aquí:
 * 1. WHATSAPP_NUMBER: Tu número de WhatsApp de Costa Rica (con código de país 506).
 * 2. ORDER_CONFIG: Estado de pedidos (abierto/cerrado) y mensaje destacado.
 * 3. COOKIES: Lista completa de las 15 galletas con precios y fotos.
 * 4. FLYERS: Promociones de temporada ("¡Nueva Galleta!").
 */

// 1. NÚMERO DE WHATSAPP (Costa Rica +506 8614 0425)
export const WHATSAPP_NUMBER = "50686140425";
export const WHATSAPP_DISPLAY = "8614-0425";

// 2. ESTADO Y AVISOS DE PEDIDOS
export const ORDER_CONFIG = {
  isOpen: true, // true: Pedidos abiertos | false: Pedidos cerrados
  statusTextOpen: "¡Pedidos abiertos hasta el domingo!",
  statusTextClosed: "Pedidos temporalmente cerrados por producción. ¡Volvemos pronto!",
  deliveryNotice: "Envíos a todo el GAM y opción de retiro personal en San José.",
  instagramUrl: "https://instagram.com/k_a_cookies_",
  instagramHandle: "@k_a_cookies_",
  fixedPrice: 2500, // ₡2.500 cada galleta
  currencySymbol: "₡",
};

// Rutas a las imágenes generadas de alta fidelidad
export const ASSET_PATHS = {
  logo: "/src/assets/images/logo_badge_1791932209815.jpg",
  flyerPinito: "/src/assets/images/flyer_pinito_1791932211319.jpg",
  flyerSanta: "/src/assets/images/flyer_santa_1791932211160.jpg",
  flyerPumpkin: "/src/assets/images/flyer_pumpkin_1791932211152.jpg",
  flyerCupid: "/src/assets/images/flyer_cupid_1791932211910.jpg",
  flyerWicked: "/src/assets/images/flyer_wicked_1791932232350.jpg",
  cookieSmore: "/src/assets/images/cookie_smore_1791932231459.jpg",
  cookieMonster: "/src/assets/images/cookie_monster_1791932231940.jpg",
  cookieCupidStack: "/src/assets/images/cookie_cupid_stack_1791932232763.jpg",
  cookieRedVelvet: "/src/assets/images/cookie_redvelvet_1791932255580.jpg",
  cookieSpookyTop: "/src/assets/images/cookie_spooky_top_1791932254646.jpg",
};

export interface CookieItem {
  id: string;
  name: string;
  category: "clasicas" | "temporada";
  price: number;
  image: string;
  badge?: string;
  description: string;
}

// 3. MENÚ DE 15 GALLETAS ESTILO NEW YORK (Todas a ₡2.500)
export const COOKIES_DATA: CookieItem[] = [
  {
    id: "wicked-glitter",
    name: "Wicked Glitter",
    category: "temporada",
    price: 2500,
    image: ASSET_PATHS.flyerWicked,
    badge: "Edición Wicked",
    description: "Vainilla teñida de rosa y verde con chispas de chocolate blanco y escarcha comestible mágica.",
  },
  {
    id: "smore",
    name: "Smore",
    category: "clasicas",
    price: 2500,
    image: ASSET_PATHS.cookieSmore,
    badge: "Favorita",
    description: "Clásica masa con trozos de chocolate semiamargo y un malvavisco tostado derretido al centro.",
  },
  {
    id: "red-velvet",
    name: "Red Velvet",
    category: "clasicas",
    price: 2500,
    image: ASSET_PATHS.cookieRedVelvet,
    badge: "Clásica NY",
    description: "Auténtica masa Red Velvet con abundantes gotas y trozos de chocolate blanco cremoso.",
  },
  {
    id: "mm-cosmic",
    name: "M&M Cosmic",
    category: "clasicas",
    price: 2500,
    image: ASSET_PATHS.cookieMonster,
    badge: "Colorida",
    description: "Masa New York tradicional cargada de confites M&M crujientes y chispas de chocolate.",
  },
  {
    id: "popcorn-twix",
    name: "Popcorn TWIX Cookie",
    category: "clasicas",
    price: 2500,
    image: ASSET_PATHS.cookieSmore,
    badge: "Crujiente",
    description: "Combinación irresistible de galleta TWIX, caramelo suave y palomitas de maíz crocantes.",
  },
  {
    id: "chunky-deluxe",
    name: "Chunky Deluxe",
    category: "clasicas",
    price: 2500,
    image: ASSET_PATHS.logo,
    badge: "La Original",
    description: "La reina de la casa: masa dorada y gruesa con triple dosis de chunks de chocolate.",
  },
  {
    id: "leche-pinito",
    name: "Leche Pinito",
    category: "temporada",
    price: 2500,
    image: ASSET_PATHS.flyerPinito,
    badge: "100% Tica",
    description: "Rellena de brigadeiro artesanal de Leche Pinito y leche condensada con chispas blancas.",
  },
  {
    id: "cookie-monster",
    name: "Cookie Monster",
    category: "temporada",
    price: 2500,
    image: ASSET_PATHS.cookieMonster,
    badge: "Divertida",
    description: "Masa bicolor especial rellena de galleta Oreo y coronada con ojitos de monstruo.",
  },
  {
    id: "santas-bite",
    name: "Santa's Bite",
    category: "temporada",
    price: 2500,
    image: ASSET_PATHS.flyerSanta,
    badge: "Navideña",
    description: "Galleta de Red Velvet rellena de auténtica Tapita Navideña y chocolate blanco por encima.",
  },
  {
    id: "smore-2",
    name: "S'more 2.0",
    category: "clasicas",
    price: 2500,
    image: ASSET_PATHS.cookieSmore,
    badge: "Extra Malvavisco",
    description: "Nuestra versión elevada con base de galleta graham, chocolate amargo y nube tostada.",
  },
  {
    id: "birthday-cake",
    name: "Birthday Cake",
    category: "clasicas",
    price: 2500,
    image: ASSET_PATHS.cookieCupidStack,
    badge: "Fiesta",
    description: "Masa con sabor a queque de cumpleaños, glaseado rosado suave y chispas de colores festivas.",
  },
  {
    id: "oreo-cake",
    name: "Oreo Cake",
    category: "clasicas",
    price: 2500,
    image: ASSET_PATHS.cookieMonster,
    badge: "Oreo Lovers",
    description: "Masa cargada de galletas Oreo trituradas y coronada con frosting de crema y galleta.",
  },
  {
    id: "cupids-kiss",
    name: "Cupid's Kiss",
    category: "temporada",
    price: 2500,
    image: ASSET_PATHS.flyerCupid,
    badge: "San Valentín",
    description: "Galleta de vainilla rosada con corazón de chocolate con relleno de caramelo y chispitas.",
  },
  {
    id: "spooky-pumpkin",
    name: "Spooky Pumpkin",
    category: "temporada",
    price: 2500,
    image: ASSET_PATHS.flyerPumpkin,
    badge: "Halloween",
    description: "Galleta de chocolate oscuro decorada con calabaza de chocolate rellena de Nutella cremosa.",
  },
  {
    id: "moreo",
    name: "Moreo",
    category: "clasicas",
    price: 2500,
    image: ASSET_PATHS.cookieMonster,
    badge: "Doble Chocolate",
    description: "Masa extra chocolatosa con trozos masivos de Oreo y M&Ms en cada bocado.",
  },
];

export interface FlyerItem {
  id: string;
  cookieId: string;
  title: string;
  flavor: string;
  tag: string;
  description: string;
  details: string[];
  themeColor: string;
  badgeColor: string;
  image: string;
}

// 4. FLYERS DE TEMPORADA ("¡NUEVA GALLETA!")
export const FLYERS_DATA: FlyerItem[] = [
  {
    id: "flyer-pinito",
    cookieId: "leche-pinito",
    title: "¡NUEVA GALLETA!",
    flavor: "LECHE PINITO",
    tag: "Pedidos hasta el domingo",
    description: "Un homenaje costarricense: gruesa, suave por dentro y con ese sabor inconfundible de la Leche Pinito de nuestra infancia.",
    details: [
      "Elaborada con ingredientes frescos y de calidad",
      "Con chispas de chocolate blanco y leche pinito espolvoreada",
      "Relleno de Brigadeiro de leche pinito y leche condensada",
    ],
    themeColor: "#4B7C59",
    badgeColor: "#E8F3EB",
    image: ASSET_PATHS.flyerPinito,
  },
  {
    id: "flyer-santa",
    cookieId: "santas-bite",
    title: "¡NUEVA GALLETA!",
    flavor: "SANTA'S BITE",
    tag: "Entrega inmediata",
    description: "El espíritu navideño en una galleta Red Velvet ultra esponjosa rellena con el chocolate festivo tico más querido.",
    details: [
      "Galleta de Red Velvet con chocolate blanco por encima",
      "Rellena de Tapita Navideña cremosa",
      "¡Cuatro galletas disponibles para entrega inmediata!",
    ],
    themeColor: "#A62B2B",
    badgeColor: "#FCE8E8",
    image: ASSET_PATHS.flyerSanta,
  },
  {
    id: "flyer-pumpkin",
    cookieId: "spooky-pumpkin",
    title: "BOO! ¡NUEVA GALLETA!",
    flavor: "SPOOKY PUMPKIN",
    tag: "Edición Halloween",
    description: "Intensa, oscura y deliciosa masa de cacao con un centro sorpresa de Nutella en su calabacita.",
    details: [
      "Galleta de chocolate decorada con chocolate blanco naranja",
      "Escarcha verde comestible brillante",
      "Calabaza por encima rellena de Nutella cremosa",
    ],
    themeColor: "#6B3BA7",
    badgeColor: "#F3EBFD",
    image: ASSET_PATHS.flyerPumpkin,
  },
  {
    id: "flyer-wicked",
    cookieId: "wicked-glitter",
    title: "¡NUEVA GALLETA!",
    flavor: "WICKED GLITTER",
    tag: "Edición Mágica",
    description: "Inspirada en el mundo de Oz y la magia de Wicked: tonos verdes y rosados con destellos de purpurina comestible.",
    details: [
      "Galleta de vainilla teñida de rosa y verde",
      "Chispas de chocolate blanco seleccionadas",
      "Escarcha verde y rosa comestible espolvoreada",
    ],
    themeColor: "#2C6E49",
    badgeColor: "#EBF7F0",
    image: ASSET_PATHS.flyerWicked,
  },
  {
    id: "flyer-cupid",
    cookieId: "cupids-kiss",
    title: "¡NUEVA GALLETA!",
    flavor: "CUPID'S KISS",
    tag: "Entrega inmediata",
    description: "El regalo más dulce y tierno para celebrar el amor y la amistad en cada mordisco.",
    details: [
      "Galleta de vainilla teñida de rosa pastel",
      "Chocolate sabor caramelo de corazón al centro",
      "Sprinkles de corazón de colores dulces",
    ],
    themeColor: "#D14D72",
    badgeColor: "#FDECEF",
    image: ASSET_PATHS.flyerCupid,
  },
];

// 5. RESEÑAS TICAS DE EJEMPLO
export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  cookieMentioned?: string;
}

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Valeria Monge",
    location: "Escazú, San José",
    rating: 5,
    date: "Ayer",
    comment: "¡Mae, la de Leche Pinito es OTRA COSA! Súper suave por dentro, nada empalagosa y el relleno de brigadeiro está en el punto exacto. Ya quiero pedir otra caja.",
    cookieMentioned: "Leche Pinito",
  },
  {
    id: "rev-2",
    name: "Esteban Mora",
    location: "Curridabat",
    rating: 5,
    date: "Hace 2 días",
    comment: "Pedí para la oficina y todos quedamos fascinados. La de Santa's Bite con la Tapita Navideña sabe a pura Navidad. Llegaron calientitas.",
    cookieMentioned: "Santa's Bite",
  },
  {
    id: "rev-3",
    name: "Fiorella Castro",
    location: "Heredia centro",
    rating: 5,
    date: "Hace 4 días",
    comment: "Las mejores galletas New York de Costa Rica con diferencia. El tamaño es enorme, valen cada colón. El pedido por WhatsApp fue súper rápido.",
    cookieMentioned: "S'more",
  },
  {
    id: "rev-4",
    name: "Alejandro Quesada",
    location: "San Pedro, Montes de Oca",
    rating: 5,
    date: "Hace 1 semana",
    comment: "La atención de las chicas es un 100/10. La galleta Wicked Glitter se veía preciosa en fotos pero en persona el brillo comestible y el sabor son increíbles.",
    cookieMentioned: "Wicked Glitter",
  },
  {
    id: "rev-5",
    name: "María José Solano",
    location: "Alajuela",
    rating: 5,
    date: "Hace 1 semana",
    comment: "¡Quedé enamorada de la de Cupid's Kiss! El centro de caramelo y chocolate está perfecto para acompañar con un café chorreado.",
    cookieMentioned: "Cupid's Kiss",
  },
];

// 6. FOTOS SUELTAS DE GALLETAS PARA EL MOSAICO
export const PHOTO_GALLERY = [
  {
    title: "Santa's Bite abierta",
    subtitle: "Rellena de Tapita Navideña",
    image: ASSET_PATHS.cookieRedVelvet,
  },
  {
    title: "Cupid's Kiss apiladas",
    subtitle: "Triple delicia de vainilla y corazón",
    image: ASSET_PATHS.cookieCupidStack,
  },
  {
    title: "Spooky Pumpkin",
    subtitle: "Chocolate oscuro y Nutella",
    image: ASSET_PATHS.cookieSpookyTop,
  },
  {
    title: "Cookie Monster",
    subtitle: "Doble masa y ojitos traviesos",
    image: ASSET_PATHS.cookieMonster,
  },
  {
    title: "S'more New York Style",
    subtitle: "Malvavisco tostado al centro",
    image: ASSET_PATHS.cookieSmore,
  },
];
