export interface Zone {
  id: string;
  name: string;
  description: string;
  animals: string[];
  emoji: string;
  color: string;
}

export const ZONES: Zone[] = [
  {
    id: "australia",
    name: "Australia",
    description: "Viaja al continente australiano y descubre marsupiales únicos como los ualabíes y aves exóticas en un entorno semiárido.",
    animals: ["Ualabí", "Cucaburra", "Emú"],
    emoji: "🦘",
    color: "#f59e0b"
  },
  {
    id: "asia",
    name: "Asia",
    description: "Explora la majestuosidad de los tigres y los dragones de Komodo en una zona que recrea las selvas y archipiélagos asiáticos.",
    animals: ["Tigre", "Dragón de Komodo", "Gibón"],
    emoji: "🐅",
    color: "#ef4444"
  },
  {
    id: "acuario",
    name: "Acuario",
    description: "Sumérgete en el mundo submarino para conocer la biodiversidad de los ríos y océanos, desde coloridos peces hasta rayas majestuosas.",
    animals: ["Peces tropicales", "Rayas", "Arapaima"],
    emoji: "🐠",
    color: "#3b82f6"
  },
  {
    id: "aviario",
    name: "Aviario",
    description: "Un espacio inmersivo donde las aves vuelan libremente. Podrás ver loros, guacamayas y especies migratorias en un entorno natural.",
    animals: ["Loros", "Flamencos", "Calaos"],
    emoji: "🦜",
    color: "#10b981"
  },
  {
    id: "primates",
    name: "Primates",
    description: "Observa la inteligencia y agilidad de nuestros parientes más cercanos. Desde los curiosos lémures hasta los ágiles monos ardilla.",
    animals: ["Lémures", "Titíes", "Papiones"],
    emoji: "🐒",
    color: "#8b5cf6"
  }
];
