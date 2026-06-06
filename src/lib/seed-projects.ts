import type { Project } from "./types";

const now = new Date().toISOString();

function project(
  index: number,
  title: string,
  image: string,
  category: Project["category"],
  description: string,
  palette: string[],
  aspectRatio: number,
  featured = false
): Project {
  return {
    id: `seed-${String(index).padStart(2, "0")}`,
    title,
    description,
    category,
    image_url: `/assets/portfolio/${image}`,
    project_url: null,
    github_url: null,
    technologies: [category],
    featured,
    palette,
    aspect_ratio: aspectRatio,
    created_at: now,
    updated_at: now,
  };
}

export const seedProjects: Project[] = [
  project(1, "Sea Guardian", "sea-guardian.jpg", "illustration", "Collage digital con texturas textiles, composición narrativa y color aplicado por capas.", ["#57b8c8", "#e6d4b1", "#c94f64", "#214f58"], 0.69, true),
  project(2, "Mushroom House", "mushroom-house.jpg", "concepts", "Ilustración digital con linea limpia, sombreado suave y construccion de ambiente fantastico.", ["#ed3328", "#16a5a9", "#f0d1a4", "#1d3436"], 1, true),
  project(3, "Floral Character", "floral-character.jpg", "characters", "Collage digital de personaje con texturas organicas, recortes y paleta natural.", ["#d99d25", "#2f7246", "#a72027", "#b8d4e6"], 0.69, true),
  project(4, "Color Study", "apple-study.jpg", "digital", "Estudio digital de color, volumen, luz y superficie sobre forma simple.", ["#c9d955", "#8f993b", "#ddd9cf", "#6f6856"], 1.43, true),
  project(5, "Symbiote Character", "symbiote-character.jpg", "characters", "Ilustración digital de personaje con textura oscura, contraste alto y acabado expresivo.", ["#0c1115", "#e9e2db", "#df5c5d", "#2c6875"], 0.77),
  project(6, "Framed Portrait", "framed-portrait.jpg", "illustration", "Retrato en alto contraste con tratamiento gráfico monocromatico y presentacion fisica.", ["#f2f0ec", "#181818", "#6b6a66", "#b9b3aa"], 0.87),
  project(7, "Tea Boom Brand", "tea-boom-brand.jpg", "branding", "Sistema visual de marca con empaque, patrones, color comercial y composición promocional.", ["#f28424", "#ec3f74", "#f0c83f", "#293c2f"], 1.88),
  project(8, "Jewelry Render", "jewelry-render.jpg", "digital", "Render digital con volumen, brillo, textura metalica y estudio de superficie.", ["#f3f1ee", "#9d77b4", "#c8c1d1", "#5f6171"], 0.69),
  project(9, "Creative Concept", "coin-study.jpg", "concepts", "Concept art digital con objetos estilizados, brillo metalico y exploracion de props.", ["#d6a235", "#7f4312", "#1f8a36", "#f3f0e9"], 1),
  project(10, "Bottle Sketch", "bottle-sketch.jpg", "sketches", "Boceto tradicional de objeto con linea, proporcion y observacion de volumen.", ["#f3f1ed", "#1c1c1c", "#a8a29a", "#d8d3cb"], 0.74),
  project(11, "Doberman Sketch", "doberman-sketch.jpg", "sketches", "Dibujo tradicional anatomico con textura de grafito y estudio de caracter.", ["#f4f2ef", "#202020", "#7c7771", "#c7c0b8"], 0.8),
  project(12, "Soda Pop Study", "soda-pop-study.jpg", "illustration", "Ilustración tradicional de objetos con color, sombra ligera y textura de papel.", ["#bf2c28", "#f2d246", "#264d8f", "#f1eee7"], 0.88),
  project(13, "Cyber Character", "cyber-character.jpg", "characters", "Diseño de personaje con color tradicional, accesorios futuristas y linea expresiva.", ["#d24f31", "#f1c128", "#6e8794", "#2b2a2b"], 0.82),
  project(14, "Crown Character", "crown-character.jpg", "characters", "Boceto de personaje en tinta con contraste fuerte, gesto y detalle ornamental.", ["#f2f0ec", "#151515", "#7f7a74", "#c8c2ba"], 0.8),
  project(15, "Lime Splash", "lime-splash-sketch.jpg", "illustration", "Estudio tradicional de liquido y fruta con acento de color y movimiento.", ["#e7efe5", "#96b82c", "#151515", "#d3d0c9"], 0.76),
  project(16, "Flamingo Illustration", "sketch-study-02.jpg", "illustration", "Ilustración tradicional con tinta, lapiz de color y composición decorativa.", ["#e98f9a", "#6c5d8c", "#79a65a", "#f2efe6"], 0.72),
  project(17, "Fantasy Figure Sketch", "fantasy-figure-sketch.jpg", "sketches", "Boceto conceptual de figura fantastica con construccion de silueta y detalle.", ["#f4f1ec", "#282522", "#9a948d", "#d3ccc3"], 0.78),
  project(18, "Storefront Concept", "storefront-concept.jpg", "concepts", "Concept art arquitectonico con linea, color tradicional y diseño de fachada.", ["#77b8c3", "#e85d4d", "#f4d15b", "#517a53"], 0.74),
  project(19, "Dessert Study", "sketch-study-03.jpg", "illustration", "Ilustración tradicional de alimento con textura, brillo y color calido.", ["#6a2e1d", "#c84d3f", "#f2e8d6", "#2f241f"], 0.81),
  project(20, "Dark Fantasy Concept", "dark-fantasy-concept.jpg", "concepts", "Arte conceptual oscuro con personaje, criaturas y composición narrativa.", ["#1b2728", "#d8c2a9", "#527a76", "#111112"], 0.7),
  project(21, "Royal Bunny", "royal-bunny-character.jpg", "characters", "Diseño digital de personaje con mascota, corona, vestuario y estilo cartoon.", ["#c78b2f", "#f1d6aa", "#5a5c62", "#d4a04a"], 1),
  project(22, "Sphere Study", "sphere-study.jpg", "digital", "Estudio digital de esfera, reflexion, luz y superficie pulida.", ["#b78d64", "#eee9df", "#766145", "#1f1712"], 1.42),
  project(23, "Cosmetic Concept", "cosmetic-concept.jpg", "concepts", "Concepto digital de producto con formas cosmeticas, color translucido y acabado ligero.", ["#89d9e5", "#d88ad5", "#392f44", "#f1eef1"], 1.44),
  project(24, "Brand Concept", "music-brand.jpg", "branding", "Diseño gráfico digital para identidad musical, lettering e ilustración ornamental.", ["#050505", "#f7f7f7", "#d9a63d", "#8f8f8f"], 1),
  project(25, "Visual Exploration", "mexico-2045.jpg", "digital", "Composicion digital conceptual con fotomontaje, tipografia y direccion visual futurista.", ["#6fa7c9", "#d8c28a", "#d2609c", "#273342"], 0.69),
  project(26, "Brand System", "social-brand.jpg", "branding", "Diseño para redes con composición promocional, mockup digital y color de alto contraste.", ["#ee7f16", "#ec116d", "#f0e33a", "#52a84a"], 1),
  project(27, "Kiska Campaign", "kiska-campaign.jpg", "branding", "Composicion publicitaria digital con producto, fuego, tipografia y atmosfera intensa.", ["#e15622", "#8a1018", "#f4a431", "#211317"], 0.56),
  project(28, "Traditional Sketch", "octopus-sketch.jpg", "sketches", "Boceto tradicional en tinta con tramado, linea expresiva y detalle ornamental.", ["#f2f0ea", "#1a1a1a", "#89847e", "#c9c5bd"], 0.78),
  project(29, "Bad Bunny Character", "digital-portrait.jpg", "characters", "Ilustración digital de personaje con estilo cartoon, contraste y grafica musical.", ["#1b1b1d", "#e84f8e", "#69c5c7", "#f4ede6"], 1),
];
