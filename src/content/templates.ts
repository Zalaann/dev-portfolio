export type TemplateMeta = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  mood: string;
  palette: string[];
};

export const templates: TemplateMeta[] = [
  {
    slug: "brutalist",
    index: "01",
    title: "Brutalist — Original",
    tagline: "Raw Swiss grid, yellow accent, kinetic geometric hero.",
    mood: "Swiss / post-digital",
    palette: ["#ffffff", "#ff0000", "#000000"],
  },
  {
    slug: "brutalist-noir",
    index: "02",
    title: "Brutalist — Noir",
    tagline: "Black and bone, blood red spot, cinematic title sequence.",
    mood: "Film noir / editorial",
    palette: ["#0a0a0a", "#f0ead6", "#ffde00"],
  },
  {
    slug: "brutalist-glitch",
    index: "03",
    title: "Brutalist — Glitch",
    tagline: "RGB split, datamosh, scrolling error-codes.",
    mood: "Broken web / datamosh",
    palette: ["#faf9f6", "#000000", "#ff00aa", "#00e5ff"],
  },
  {
    slug: "brutalist-poster",
    index: "04",
    title: "Brutalist — Poster",
    tagline: "Risograph ink layers, off-register print, stamped seal.",
    mood: "Print / risograph",
    palette: ["#f5efe3", "#0f0f0f", "#ffde00", "#008b8b"],
  },
];
