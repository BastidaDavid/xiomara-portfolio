import type { Language } from "./types";

export const STORAGE_KEYS = {
  lang: "xiomara-portfolio-lang",
  theme: "xiomara-portfolio-theme",
} as const;

export const translations = {
  es: {
    navAbout: "Sobre mí",
    navWork: "Obra",
    navThesis: "Tesis",
    navContact: "Contacto",
    theme: "Dark",
    adminMode: "Modo Administrador",
    logout: "Logout",
    login: "Login",
    heroRole: "Diseñadora Multimedia e Ilustradora Digital",
    heroSubtitle: "Color, ilustración, personajes y conceptos visuales.",
    heroQuote:
      "“La magia de la creatividad está en cómo cuentas tu propia historia y haces que los demás no solo la escuchen, sino que la vivan y la sientan como suya”",
    heroQuoteCite: "(Reyes, 2025)",
    aboutTitle: "Sobre mí",
    aboutBody:
      "Xiomara Vázquez es una artista visual e ilustradora enfocada en color, diseño de personajes y desarrollo de conceptos visuales. Su trabajo combina imaginación, sensibilidad artística y versatilidad, creando piezas para proyectos narrativos, branding, mercancia y experiencias digitales.",
    workTitle: "Obra",
    workSubtitle:
      "Una selección curada de ilustración, personajes, branding y exploracion visual.",
    thesisTitle: "Tesis",
    thesisKicker: "UMA — Metamorfosis",
    thesisBody:
      "UMA — Metamorfosis es el proyecto de tesis de Xiomara: cinco personajes que recorren el nacimiento, el autoconocimiento, la autodestrucción, la sanación y la reinvención. Cada uno nace en el boceto, se define en estudios de color y técnica — puntillismo, chaquira, neón y geometría — y se materializa en esculturas talladas y pintadas a mano en Oaxaca, en colaboración con el artesano Orlando Mandarín.",
    collabTitle: "Colaboración",
    collabLabel: "Colaboradora creativa - Bastida Systems",
    collabBody:
      "Xiomara colabora con Bastida Systems aportando color, ilustración, arte conceptual y apoyo visual para proyectos digitales, branding y experiencias narrativas.",
    skillsTitle: "Habilidades",
    contactTitle: "Contacto",
    contactSubtitle: "Disponible para proyectos visuales, branding y colaboraciónes.",
    locationLabel: "Ubicación",
    location: "Oaxaca, Mexico",
    collabsLabel: "Colaboraciónes",
    collabs: "Abiertas",
    paletteLabel: "Paleta de color",
    techniqueLabel: "Técnica",
    colorsLabel: "Colores",
    footerCollaboration: "Colaboración",
    footerRights: "Todos los derechos reservados.",
    loading: "Cargando proyectos...",
    empty: "Todavia no hay proyectos publicados.",
    edit: "Editar",
    delete: "Eliminar",
    add: "Agregar proyecto",
    save: "Guardar proyecto",
    cancel: "Cancelar",
    projectUrl: "Ver proyecto",
    githubUrl: "GitHub",
    loginTitle: "Acceso administrador",
    loginSubtitle: "Inicia sesión para gestionar el contenido del portfolio.",
    email: "Email",
    password: "Password",
    signIn: "Entrar",
    back: "Volver al portfolio",
  },
  en: {
    navAbout: "About",
    navWork: "Work",
    navThesis: "Thesis",
    navContact: "Contact",
    theme: "Dark",
    adminMode: "Admin Mode",
    logout: "Logout",
    login: "Login",
    heroRole: "Multimedia Designer & Digital Illustrator",
    heroSubtitle: "Color, illustration, characters, and visual concepts.",
    heroQuote:
      "“The magic of creativity lies in how you tell your own story and make others not only hear it, but live it and feel it as their own”",
    heroQuoteCite: "(Reyes, 2025)",
    aboutTitle: "About",
    aboutBody:
      "Xiomara Vázquez is a visual artist and illustrator focused on color, character design, and visual concept development. Her work combines imagination, artistic sensitivity, and versatility, creating pieces for narrative projects, branding, merchandise, and digital experiences.",
    workTitle: "Work",
    workSubtitle:
      "A curated selection of illustration, characters, branding, and visual exploration.",
    thesisTitle: "Thesis",
    thesisKicker: "UMA — Metamorphosis",
    thesisBody:
      "UMA — Metamorphosis is Xiomara's thesis project: five characters journeying through birth, self-knowledge, self-destruction, healing, and reinvention. Each one begins as a sketch, takes shape through color and technique studies — pointillism, beadwork, neon, and geometry — and materializes as hand-carved, hand-painted sculptures in Oaxaca, in collaboration with artisan Orlando Mandarín.",
    collabTitle: "Collaboration",
    collabLabel: "Creative Collaborator - Bastida Systems",
    collabBody:
      "Xiomara collaborates with Bastida Systems by contributing color, illustration, concept art, and visual support for digital projects, branding, and narrative experiences.",
    skillsTitle: "Skills",
    contactTitle: "Contact",
    contactSubtitle: "Available for visual projects, branding, and collaborations.",
    locationLabel: "Location",
    location: "Oaxaca, Mexico",
    collabsLabel: "Collaborations",
    collabs: "Open",
    paletteLabel: "Color palette",
    techniqueLabel: "Technique",
    colorsLabel: "Colors",
    footerCollaboration: "Collaboration",
    footerRights: "All rights reserved.",
    loading: "Loading projects...",
    empty: "No projects have been published yet.",
    edit: "Edit",
    delete: "Delete",
    add: "Add project",
    save: "Save project",
    cancel: "Cancel",
    projectUrl: "View project",
    githubUrl: "GitHub",
    loginTitle: "Admin access",
    loginSubtitle: "Sign in to manage portfolio content.",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    back: "Back to portfolio",
  },
} satisfies Record<Language, Record<string, string>>;

export const categoryLabels = {
  es: {
    all: "Todo",
    illustration: "Ilustración",
    characters: "Personajes",
    branding: "Branding",
    sketches: "Bocetos",
    digital: "Arte digital",
    concepts: "Conceptos",
  },
  en: {
    all: "All",
    illustration: "Illustration",
    characters: "Characters",
    branding: "Branding",
    sketches: "Sketches",
    digital: "Digital Art",
    concepts: "Concepts",
  },
} as const;

export const skills = {
  es: ["Ilustración", "Color", "Diseño de personajes", "Arte digital", "Bocetaje", "Branding", "Concept art"],
  en: ["Illustration", "Color", "Character Design", "Digital Art", "Sketching", "Branding", "Concept Art"],
} satisfies Record<Language, string[]>;

export const thesisStages = {
  es: [
    { name: "Orive", stage: "Nacimiento" },
    { name: "Roser", stage: "Autoconocimiento" },
    { name: "Ragui", stage: "Autodestrucción" },
    { name: "Buma", stage: "Sanación" },
    { name: "Pille", stage: "Reinvención" },
  ],
  en: [
    { name: "Orive", stage: "Birth" },
    { name: "Roser", stage: "Self-knowledge" },
    { name: "Ragui", stage: "Self-destruction" },
    { name: "Buma", stage: "Healing" },
    { name: "Pille", stage: "Reinvention" },
  ],
} satisfies Record<Language, Array<{ name: string; stage: string }>>;

export const thesisImages: Array<{ src: string; es: string; en: string }> = [
  { src: "/assets/tesis/tesis-metamorfosis-boceto.jpg", es: "Metamorfosis — bocetos y etapas", en: "Metamorphosis — sketches and stages" },
  { src: "/assets/tesis/tesis-estudio-color.jpg", es: "Estudio de color y técnicas", en: "Color and technique study" },
  { src: "/assets/tesis/tesis-ilustracion.jpg", es: "Los cinco personajes — ilustración", en: "The five characters — illustration" },
  { src: "/assets/tesis/tesis-artesano-orlando.jpg", es: "Piezas en blanco con el artesano Orlando Mandarín", en: "Blank pieces with artisan Orlando Mandarín" },
  { src: "/assets/tesis/tesis-orive.jpg", es: "Orive — Nacimiento", en: "Orive — Birth" },
  { src: "/assets/tesis/tesis-ragui-chaquira.jpg", es: "Ragui — Autodestrucción, en chaquira", en: "Ragui — Self-destruction, in beadwork" },
  { src: "/assets/tesis/tesis-buma.jpg", es: "Buma — Sanación", en: "Buma — Healing" },
  { src: "/assets/tesis/tesis-pille.jpg", es: "Pille — Reinvención", en: "Pille — Reinvention" },
  { src: "/assets/tesis/tesis-grupo-tienda.jpg", es: "La colección completa", en: "The complete collection" },
  { src: "/assets/tesis/tesis-grupo-santo-domingo.jpg", es: "Frente a Santo Domingo, Oaxaca", en: "In front of Santo Domingo, Oaxaca" },
  { src: "/assets/tesis/tesis-papel-picado.jpg", es: "Inspiración — Día de Muertos", en: "Inspiration — Day of the Dead" },
  { src: "/assets/tesis/tesis-calavera.jpg", es: "Inspiración — Día de Muertos", en: "Inspiration — Day of the Dead" },
];
