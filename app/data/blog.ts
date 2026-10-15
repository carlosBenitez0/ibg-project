// Artículos del blog.
// TODO: reemplazar por los artículos reales de la iglesia (los textos base
// y autores vienen del prototipo de Bolt).

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Párrafos del artículo */
  content: string[];
  /** Versículo clave del artículo */
  verse?: { text: string; reference: string };
  author: string;
  /** Fecha ISO (YYYY-MM-DD) para ordenar y para <time> */
  date: string;
  readTime: string;
  category: BlogCategory;
  image: string;
  featured?: boolean;
}

export const blogCategories = [
  'Reflexión',
  'Estudio Bíblico',
  'Vida Cristiana',
  'Juventud',
  'Familia',
  'Evangelismo',
] as const;

export type BlogCategory = (typeof blogCategories)[number];

const img = (name: string) => `/images/gallery/${name}.jpeg`;

export const blogPosts: BlogPost[] = [
  {
    slug: 'la-importancia-de-la-oracion',
    title: 'La Importancia de la Oración en la Vida Cristiana',
    excerpt:
      'Descubre cómo la oración puede transformar tu relación con Dios y fortalecer tu fe diaria. Una reflexión sobre este pilar fundamental de la vida cristiana.',
    content: [
      'La oración es mucho más que una simple conversación con Dios; es el respirar del alma cristiana. Así como nuestro cuerpo necesita aire para vivir, nuestro espíritu necesita la comunión constante con el Padre para crecer y mantenerse firme.',
      'Jesús mismo, siendo el Hijo de Dios, se apartaba a lugares desiertos para orar. Si Él necesitó esos momentos a solas con el Padre, ¡cuánto más nosotros! La oración no cambia a Dios: nos cambia a nosotros, alinea nuestro corazón con Su voluntad y nos da paz en medio de las pruebas.',
      'Te animamos a apartar un tiempo cada día, aunque sea breve, para hablar con Dios. Agradece, confiesa, intercede por otros y presenta tus peticiones. Y no olvides que la oración también es escuchar: lee Su Palabra y deja que Él te hable.',
    ],
    verse: {
      text: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.',
      reference: 'Filipenses 4:6',
    },
    author: 'Pastor Juan Carlos Martínez',
    date: '2026-10-05',
    readTime: '8 min',
    category: 'Reflexión',
    image: img('culto-oracion'),
    featured: true,
  },
  {
    slug: 'caminando-en-fe-hebreos',
    title: 'Caminando en Fe: Lecciones del Libro de Hebreos',
    excerpt:
      'Exploramos las enseñanzas sobre la fe que encontramos en Hebreos 11 y cómo aplicarlas hoy.',
    content: [
      'Hebreos 11 es conocido como la galería de los héroes de la fe. Abel, Noé, Abraham, Sara, Moisés y muchos otros creyeron a Dios aun cuando no veían el cumplimiento de Sus promesas.',
      'La fe no es un sentimiento, sino una confianza activa que se demuestra con obediencia. Noé construyó el arca antes de ver una gota de lluvia; Abraham salió sin saber a dónde iba.',
      'Hoy Dios nos llama a caminar de la misma manera: confiando en Su carácter más que en nuestras circunstancias. ¿En qué área de tu vida necesitas dar un paso de fe esta semana?',
    ],
    verse: {
      text: 'Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.',
      reference: 'Hebreos 11:1',
    },
    author: 'Pastora María Elena López',
    date: '2026-09-28',
    readTime: '6 min',
    category: 'Estudio Bíblico',
    image: img('estudio-biblico'),
  },
  {
    slug: 'el-poder-del-perdon',
    title: 'El Poder del Perdón en las Relaciones',
    excerpt:
      'Reflexiones sobre cómo el perdón transforma nuestras relaciones y nos acerca más a Cristo.',
    content: [
      'Perdonar no significa olvidar ni justificar el daño recibido. Significa soltar la deuda y entregar la justicia en manos de Dios.',
      'Cristo nos perdonó cuando no lo merecíamos. Ese mismo perdón es el que nos capacita para perdonar a otros, incluso cuando nos cuesta.',
      'El perdón sana familias, restaura amistades y libera nuestro corazón de la amargura. Pide al Señor que te muestre a quién necesitas perdonar hoy.',
    ],
    verse: {
      text: 'Sed benignos unos con otros, misericordiosos, perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo.',
      reference: 'Efesios 4:32',
    },
    author: 'Pastor David Rodríguez',
    date: '2026-09-21',
    readTime: '5 min',
    category: 'Vida Cristiana',
    image: img('grupo-iglesia-2'),
  },
  {
    slug: 'juventud-con-proposito',
    title: 'Juventud con Propósito: Sirviendo en el Reino',
    excerpt:
      'Cómo los jóvenes pueden encontrar su llamado y servir efectivamente en la iglesia.',
    content: [
      'La juventud no es una etapa de espera, sino una etapa de servicio. Dios llamó a Samuel, a David, a Jeremías y a Timoteo siendo jóvenes.',
      'Cada joven tiene dones que el Señor quiere usar: la música, la enseñanza, la tecnología, el servicio práctico. Descubrirlos requiere oración, disposición y acompañamiento.',
      'Te invitamos a ser parte de nuestro grupo de jóvenes los sábados a las 6:00 PM. ¡Hay un lugar para ti!',
    ],
    verse: {
      text: 'Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza.',
      reference: '1 Timoteo 4:12',
    },
    author: 'Pastor David Rodríguez',
    date: '2026-09-14',
    readTime: '7 min',
    category: 'Juventud',
    image: img('culto-jovenes'),
  },
  {
    slug: 'la-familia-cristiana-hoy',
    title: 'La Familia Cristiana en Tiempos Modernos',
    excerpt:
      'Principios bíblicos para construir familias fuertes en el mundo contemporáneo.',
    content: [
      'Las familias enfrentan hoy presiones que antes no existían: pantallas, horarios cargados y valores que cambian rápidamente.',
      'La Biblia nos da principios que no pasan de moda: amor sacrificial, respeto mutuo, enseñanza de la Palabra en casa y tiempo compartido.',
      'Pequeños hábitos, como orar juntos antes de dormir o leer un versículo en la mesa, pueden marcar una gran diferencia en el hogar.',
    ],
    verse: {
      text: 'Pero yo y mi casa serviremos a Jehová.',
      reference: 'Josué 24:15',
    },
    author: 'Pastora María Elena López',
    date: '2026-09-07',
    readTime: '9 min',
    category: 'Familia',
    image: img('celebracion-1'),
  },
  {
    slug: 'evangelismo-efectivo',
    title: 'Evangelismo Efectivo en Nuestra Comunidad',
    excerpt:
      'Estrategias prácticas para compartir el evangelio con amor y efectividad.',
    content: [
      'Compartir el evangelio comienza con amar a las personas. Antes de hablar, escuchamos; antes de predicar, servimos.',
      'Algunas formas sencillas de evangelizar son invitar a un vecino al culto, compartir tu testimonio o acompañar a alguien en un momento difícil.',
      'Nuestro equipo de evangelismo se reúne los sábados a las 2:00 PM. ¡Únete y sé parte de la Gran Comisión!',
    ],
    verse: {
      text: 'Id por todo el mundo y predicad el evangelio a toda criatura.',
      reference: 'Marcos 16:15',
    },
    author: 'Pastor Juan Carlos Martínez',
    date: '2026-08-31',
    readTime: '6 min',
    category: 'Evangelismo',
    image: img('evangelismo-calle-1'),
  },
  {
    slug: 'adoracion-que-agrada-a-dios',
    title: 'Una Adoración que Agrada a Dios',
    excerpt:
      'La adoración va más allá de la música: es una vida entera rendida al Señor.',
    content: [
      'Solemos asociar la adoración con los cantos del domingo, pero la Biblia la presenta como un estilo de vida.',
      'Adoramos cuando obedecemos, cuando servimos, cuando trabajamos con integridad y cuando amamos a nuestro prójimo.',
      'Que cada canto que entonemos en el culto sea el reflejo de un corazón que adora a Dios todos los días.',
    ],
    verse: {
      text: 'Dios es Espíritu; y los que le adoran, en espíritu y en verdad es necesario que adoren.',
      reference: 'Juan 4:24',
    },
    author: 'Hermano Carlos Vásquez',
    date: '2026-08-24',
    readTime: '5 min',
    category: 'Vida Cristiana',
    image: img('alabanza-banda'),
  },
  {
    slug: 'el-salmo-23-hoy',
    title: 'El Salmo 23 para los Días Difíciles',
    excerpt:
      'El Señor es nuestro pastor también en los valles oscuros. Un estudio del salmo más amado.',
    content: [
      'El Salmo 23 nos presenta a Dios como un pastor que guía, provee, restaura y protege a sus ovejas.',
      'David no niega la existencia del valle de sombra de muerte; afirma que, aun allí, no está solo.',
      'Si atraviesas un momento difícil, recuerda que el Buen Pastor camina contigo y te llevará a delicados pastos.',
    ],
    verse: {
      text: 'Jehová es mi pastor; nada me faltará.',
      reference: 'Salmos 23:1',
    },
    author: 'Pastora María Elena López',
    date: '2026-08-17',
    readTime: '6 min',
    category: 'Estudio Bíblico',
    image: img('noche-adoracion'),
  },
  {
    slug: 'jovenes-y-amistades',
    title: 'Jóvenes y Amistades que Edifican',
    excerpt:
      'Las amistades moldean nuestro carácter. ¿Cómo elegir y cultivar amistades que nos acerquen a Cristo?',
    content: [
      'Las personas con las que pasamos tiempo influyen en nuestras decisiones, conversaciones y hábitos.',
      'Una amistad que edifica te anima a buscar a Dios, te corrige con amor y celebra tus logros.',
      'Sé tú también ese amigo: alguien que ora por los demás, que escucha y que comparte la esperanza de Cristo.',
    ],
    verse: {
      text: 'En todo tiempo ama el amigo, y es como un hermano en tiempo de angustia.',
      reference: 'Proverbios 17:17',
    },
    author: 'Pastor David Rodríguez',
    date: '2026-08-10',
    readTime: '4 min',
    category: 'Juventud',
    image: img('salida-jovenes'),
  },
];

/** Artículos ordenados del más reciente al más antiguo. */
export const sortedPosts = [...blogPosts].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const featuredPost =
  sortedPosts.find((post) => post.featured) ?? sortedPosts[0];

export const recentPosts = sortedPosts.filter(
  (post) => post.slug !== featuredPost.slug
);

export const getPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);

/** "2026-10-05" → "5 de octubre de 2026" */
export const formatPostDate = (date: string) =>
  new Intl.DateTimeFormat('es-SV', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
