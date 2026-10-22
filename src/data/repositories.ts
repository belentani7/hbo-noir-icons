import type { Repository } from "../types";

// Minimal, factual offline entry. Additional projects are loaded only from
// public GitHub API responses. Private repos are never fabricated as synced.
export const REPOSITORIES: Repository[] = [
  {
    id: "offline-noir-icons",
    name: "HBO Noir Icons",
    tagline: "BELENTANI — estudio visual de iconos y experiencias noir",
    description: "Interfaz cinematográfica y laboratorio visual del catálogo BELENTANI.",
    longDescription: "Experiencia local de iconos, cascadas audiovisuales y terminal de demostración. La información pública se verifica con GitHub cuando hay conexión.",
    githubUrl: "https://github.com/belentani7/hbo-noir-icons",
    primaryLanguage: "TypeScript",
    languageColor: "#8b8b8b",
    category: "art",
    tags: [{ id: "cinematic", label: "Cinemático" }],
    stats: { stars: 0, forks: 0 },
    iconConfig: {
      glyphType: "orb",
      symbolDescription: "Orbe noir de BELENTANI",
      accentColor: "#a78bfa",
      haloColor: "#7c3aed",
      puffGlow: 0.35,
    },
    liquidLight: {
      colorName: "Violeta noir",
      hex: "#a78bfa",
      milkyGlow: 0.24,
      refractiveIndex: 1.5,
    },
    singleWord: "noir",
    isEducation: false,
    priorityOrder: 0,
  },
];
