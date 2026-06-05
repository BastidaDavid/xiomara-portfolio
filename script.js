const STORAGE_KEYS = {
  lang: "xiomara-portfolio-lang",
  theme: "xiomara-portfolio-theme",
};

const translations = {
  es: {
    "nav.about": "Sobre mí",
    "nav.work": "Obra",
    "nav.contact": "Contacto",
    "controls.theme": "Dark",
    "hero.role": "Artista visual e ilustradora",
    "hero.subtitle": "Color, ilustración, personajes y conceptos visuales.",
    "about.title": "Sobre mí",
    "about.body":
      "Xiomara Vasquez es una artista visual e ilustradora enfocada en color, diseño de personajes y desarrollo de conceptos visuales. Su trabajo combina imaginación, sensibilidad artística y versatilidad, creando piezas para proyectos narrativos, branding, mercancía y experiencias digitales.",
    "work.title": "Obra",
    "work.subtitle":
      "Una selección curada de ilustración, personajes, branding y exploración visual.",
    "filters.all": "Todo",
    "filters.illustration": "Ilustración",
    "filters.characters": "Personajes",
    "filters.branding": "Branding",
    "filters.sketches": "Bocetos",
    "filters.digital": "Arte digital",
    "filters.concepts": "Conceptos",
    "collab.title": "Colaboración",
    "collab.label": "Colaboradora creativa — Bastida Systems",
    "collab.body":
      "Xiomara colabora con Bastida Systems aportando color, ilustración, arte conceptual y apoyo visual para proyectos digitales, branding y experiencias narrativas.",
    "skills.title": "Habilidades",
    "contact.title": "Contacto",
    "contact.subtitle": "Disponible para proyectos visuales, branding y colaboraciones.",
    "contact.locationLabel": "Ubicación",
    "contact.location": "Oaxaca, México",
    "contact.collabsLabel": "Colaboraciones",
    "contact.collabs": "Abiertas",
    "palette.label": "Paleta de color",
    "palette.technique": "Técnica",
    "palette.colors": "Colores",
    "footer.collaboration": "Colaboración",
    "footer.rights": "Todos los derechos reservados.",
  },
  en: {
    "nav.about": "About",
    "nav.work": "Work",
    "nav.contact": "Contact",
    "controls.theme": "Dark",
    "hero.role": "Visual Artist & Illustrator",
    "hero.subtitle": "Color, illustration, characters, and visual concepts.",
    "about.title": "About",
    "about.body":
      "Xiomara Vasquez is a visual artist and illustrator focused on color, character design, and visual concept development. Her work combines imagination, artistic sensitivity, and versatility, creating pieces for narrative projects, branding, merchandise, and digital experiences.",
    "work.title": "Work",
    "work.subtitle":
      "A curated selection of illustration, characters, branding, and visual exploration.",
    "filters.all": "All",
    "filters.illustration": "Illustration",
    "filters.characters": "Characters",
    "filters.branding": "Branding",
    "filters.sketches": "Sketches",
    "filters.digital": "Digital Art",
    "filters.concepts": "Concepts",
    "collab.title": "Collaboration",
    "collab.label": "Creative Collaborator — Bastida Systems",
    "collab.body":
      "Xiomara collaborates with Bastida Systems by contributing color, illustration, concept art, and visual support for digital projects, branding, and narrative experiences.",
    "skills.title": "Skills",
    "contact.title": "Contact",
    "contact.subtitle": "Available for visual projects, branding, and collaborations.",
    "contact.locationLabel": "Location",
    "contact.location": "Oaxaca, Mexico",
    "contact.collabsLabel": "Collaborations",
    "contact.collabs": "Open",
    "palette.label": "Color palette",
    "palette.technique": "Technique",
    "palette.colors": "Colors",
    "footer.collaboration": "Collaboration",
    "footer.rights": "All rights reserved.",
  },
};

const skills = {
  es: ["Ilustración", "Color", "Diseño de personajes", "Arte digital", "Bocetaje", "Branding", "Concept art"],
  en: ["Illustration", "Color", "Character Design", "Digital Art", "Sketching", "Branding", "Concept Art"],
};

// Edit portfolio images, clean titles, and categories here.
const artworks = [
  {
    title: "Sea Guardian",
    image: "assets/portfolio/sea-guardian.jpg",
    category: "illustration",
    label: { es: "Ilustración", en: "Illustration" },
    technique: {
      es: "Collage digital con texturas textiles, composición narrativa y color aplicado por capas.",
      en: "Digital collage with textile textures, narrative composition, and layered color work.",
    },
    palette: ["#57b8c8", "#e6d4b1", "#c94f64", "#214f58"],
    ratio: "0.69",
  },
  {
    title: "Mushroom House",
    image: "assets/portfolio/mushroom-house.jpg",
    category: "concepts",
    label: { es: "Conceptos", en: "Concepts" },
    technique: {
      es: "Ilustración digital con línea limpia, sombreado suave y construcción de ambiente fantástico.",
      en: "Digital illustration with clean linework, soft shading, and fantasy environment design.",
    },
    palette: ["#ed3328", "#16a5a9", "#f0d1a4", "#1d3436"],
    ratio: "1",
  },
  {
    title: "Floral Character",
    image: "assets/portfolio/floral-character.jpg",
    category: "characters",
    label: { es: "Personajes", en: "Characters" },
    technique: {
      es: "Collage digital de personaje con texturas orgánicas, recortes y paleta natural.",
      en: "Digital character collage with organic textures, cutout shapes, and a natural palette.",
    },
    palette: ["#d99d25", "#2f7246", "#a72027", "#b8d4e6"],
    ratio: "0.69",
  },
  {
    title: "Color Study",
    image: "assets/portfolio/apple-study.jpg",
    category: "digital",
    label: { es: "Arte digital", en: "Digital Art" },
    technique: {
      es: "Estudio digital de color, volumen, luz y superficie sobre forma simple.",
      en: "Digital color study focused on volume, light, and surface over a simple form.",
    },
    palette: ["#c9d955", "#8f993b", "#ddd9cf", "#6f6856"],
    ratio: "1.43",
  },
  {
    title: "Creative Concept",
    image: "assets/portfolio/coin-study.jpg",
    category: "concepts",
    label: { es: "Conceptos", en: "Concepts" },
    technique: {
      es: "Concept art digital con objetos estilizados, brillo metálico y exploración de props.",
      en: "Digital concept art with stylized objects, metallic light, and prop exploration.",
    },
    palette: ["#d6a235", "#7f4312", "#1f8a36", "#f3f0e9"],
    ratio: "1",
  },
  {
    title: "Brand Concept",
    image: "assets/portfolio/music-brand.jpg",
    category: "branding",
    label: { es: "Branding", en: "Branding" },
    technique: {
      es: "Diseño gráfico digital para identidad musical, lettering e ilustración ornamental.",
      en: "Digital graphic design for music identity, lettering, and ornamental illustration.",
    },
    palette: ["#050505", "#f7f7f7", "#d9a63d", "#8f8f8f"],
    ratio: "1",
  },
  {
    title: "Visual Exploration",
    image: "assets/portfolio/mexico-2045.jpg",
    category: "digital",
    label: { es: "Arte digital", en: "Digital Art" },
    technique: {
      es: "Composición digital conceptual con fotomontaje, tipografía y dirección visual futurista.",
      en: "Conceptual digital composition with photomontage, typography, and futuristic art direction.",
    },
    palette: ["#6fa7c9", "#d8c28a", "#d2609c", "#273342"],
    ratio: "0.69",
  },
  {
    title: "Brand System",
    image: "assets/portfolio/social-brand.jpg",
    category: "branding",
    label: { es: "Branding", en: "Branding" },
    technique: {
      es: "Diseño para redes con composición promocional, mockup digital y color de alto contraste.",
      en: "Social media design with promotional composition, digital mockup, and high-contrast color.",
    },
    palette: ["#ee7f16", "#ec116d", "#f0e33a", "#52a84a"],
    ratio: "1",
  },
  {
    title: "Traditional Sketch",
    image: "assets/portfolio/octopus-sketch.jpg",
    category: "sketches",
    label: { es: "Bocetos", en: "Sketches" },
    technique: {
      es: "Boceto tradicional en tinta con tramado, línea expresiva y detalle ornamental.",
      en: "Traditional ink sketch with hatching, expressive linework, and ornamental detail.",
    },
    palette: ["#f2f0ea", "#1a1a1a", "#89847e", "#c9c5bd"],
    ratio: "0.78",
  },
  {
    title: "Sketch Study",
    image: "assets/portfolio/sketch-study-02.jpg",
    category: "sketches",
    label: { es: "Bocetos", en: "Sketches" },
    technique: {
      es: "Dibujo tradicional monocromático con textura de papel y exploración de línea.",
      en: "Traditional monochrome drawing with paper texture and line exploration.",
    },
    palette: ["#f4f1ec", "#22201e", "#9b958d", "#d6d1c8"],
    ratio: "0.72",
  },
  {
    title: "Character Concept",
    image: "assets/portfolio/digital-portrait.jpg",
    category: "characters",
    label: { es: "Personajes", en: "Characters" },
    technique: {
      es: "Ilustración digital de personaje con color expresivo y acabado gráfico.",
      en: "Digital character illustration with expressive color and graphic finish.",
    },
    palette: ["#d16d4b", "#2d6f82", "#f2cf77", "#253142"],
    ratio: "1",
  },
  {
    title: "Line Exploration",
    image: "assets/portfolio/sketch-study-03.jpg",
    category: "sketches",
    label: { es: "Bocetos", en: "Sketches" },
    technique: {
      es: "Estudio tradicional de línea, contraste y composición en blanco y negro.",
      en: "Traditional study of line, contrast, and black-and-white composition.",
    },
    palette: ["#f1eee8", "#181818", "#746f68", "#c9c1b7"],
    ratio: "0.8",
  },
];

let state = {
  lang: localStorage.getItem(STORAGE_KEYS.lang) || "es",
  theme: localStorage.getItem(STORAGE_KEYS.theme) || "light",
  filter: "all",
};

const html = document.documentElement;
const gallery = document.querySelector("#gallery");
const skillsList = document.querySelector("#skillsList");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const paletteModal = document.querySelector("#paletteModal");
const paletteTitle = paletteModal.querySelector("[data-palette-title]");
const paletteTechnique = paletteModal.querySelector("[data-palette-technique]");
const paletteLabel = paletteModal.querySelector("[data-palette-label]");
const techniqueLabel = paletteModal.querySelector("[data-technique-label]");
const colorsLabel = paletteModal.querySelector("[data-colors-label]");
const colorList = paletteModal.querySelector("[data-color-list]");
document.querySelector("#footerYear").textContent = new Date().getFullYear();

function applyLanguage(lang) {
  state.lang = lang;
  html.lang = lang;
  localStorage.setItem(STORAGE_KEYS.lang, lang);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[lang][key] || element.textContent;
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  renderSkills();
  renderGallery();
  updateThemeControl();
}

function updateThemeControl() {
  const themeText = document.querySelector(".theme-toggle [data-i18n='controls.theme']");
  const themeIcon = document.querySelector(".theme-icon");
  const isDark = state.theme === "dark";
  themeText.textContent = isDark ? "Light" : "Dark";
  themeIcon.textContent = isDark ? "☼" : "☾";
}

function applyTheme(theme) {
  state.theme = theme;
  html.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEYS.theme, theme);
  updateThemeControl();
}

function renderSkills() {
  skillsList.innerHTML = skills[state.lang].map((skill) => `<li>${skill}</li>`).join("");
}

function renderPalette(colors) {
  return colors.map((color) => `<span style="--swatch: ${color}"></span>`).join("");
}

function renderGallery() {
  const visible =
    state.filter === "all" ? artworks : artworks.filter((artwork) => artwork.category === state.filter);

  gallery.innerHTML = visible
    .map(
      (artwork, index) => `
        <figure class="art-card" role="button" tabindex="0" style="--ratio: ${artwork.ratio};" data-index="${artworks.indexOf(
          artwork
        )}">
          <img src="${artwork.image}" alt="${artwork.title}" loading="${index < 4 ? "eager" : "lazy"}" />
          <figcaption>
            <div class="art-meta">
              <strong>${artwork.title}</strong>
              <span>${artwork.label[state.lang]}</span>
            </div>
            <button class="palette-strip palette-trigger" type="button" data-palette-index="${artworks.indexOf(
              artwork
            )}" aria-label="${artwork.title} color palette and technique">
              ${renderPalette(artwork.palette)}
            </button>
          </figcaption>
        </figure>
      `
    )
    .join("");
}

function setFilter(filter) {
  state.filter = filter;
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });
  renderGallery();
}

function openLightbox(artwork) {
  lightboxImage.src = artwork.image;
  lightboxImage.alt = artwork.title;
  lightboxCaption.textContent = `${artwork.title} · ${artwork.label[state.lang]}`;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function openPalette(artwork) {
  paletteLabel.textContent = translations[state.lang]["palette.label"];
  techniqueLabel.textContent = translations[state.lang]["palette.technique"];
  colorsLabel.textContent = translations[state.lang]["palette.colors"];
  paletteTitle.textContent = artwork.title;
  paletteTechnique.textContent = artwork.technique[state.lang];
  colorList.innerHTML = artwork.palette
    .map(
      (color, index) => `
        <div class="color-detail">
          <span class="color-chip" style="--swatch: ${color}"></span>
          <span class="color-number">${String(index + 1).padStart(2, "0")}</span>
          <span class="color-code">${color.toUpperCase()}</span>
        </div>
      `
    )
    .join("");
  paletteModal.classList.add("open");
  paletteModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function closePalette() {
  paletteModal.classList.remove("open");
  paletteModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

document.querySelector(".theme-toggle").addEventListener("click", () => {
  applyTheme(state.theme === "dark" ? "light" : "dark");
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

gallery.addEventListener("click", (event) => {
  const paletteButton = event.target.closest(".palette-trigger");
  if (paletteButton) {
    event.stopPropagation();
    openPalette(artworks[Number(paletteButton.dataset.paletteIndex)]);
    return;
  }

  const card = event.target.closest(".art-card");
  if (!card) return;
  openLightbox(artworks[Number(card.dataset.index)]);
});

gallery.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".art-card");
  if (!card || event.target.closest(".palette-trigger")) return;
  event.preventDefault();
  openLightbox(artworks[Number(card.dataset.index)]);
});

document.querySelectorAll(".hero-gallery .palette-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    openPalette(artworks[Number(button.dataset.paletteIndex)]);
  });
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target.classList.contains("lightbox-close")) {
    closeLightbox();
  }
});

paletteModal.addEventListener("click", (event) => {
  if (event.target === paletteModal || event.target.classList.contains("palette-close")) {
    closePalette();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    closePalette();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

applyTheme(state.theme);
applyLanguage(state.lang);
