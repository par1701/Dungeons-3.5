import type { SourceBook } from "../types";

// Registro central de libros de origen. Los libros con implemented=false son
// "stubs": aparecen en la interfaz para que el usuario sepa que están planeados,
// pero todavía no aportan contenido. Para añadir un libro nuevo:
//   1. Marcar implemented=true aquí.
//   2. Agregar sus razas/clases/dotes/conjuros/equipo en src/data/<libro>/*
//      siguiendo el mismo patrón que src/data/srd, con source: "<id-del-libro>".
//   3. Los arrays combinados en src/data/index.ts los recogen automáticamente.
export const SOURCE_BOOKS: SourceBook[] = [
  {
    id: "srd",
    name: "System Reference Document (SRD 3.5)",
    shortName: "SRD",
    description:
      "Reglas básicas de contenido abierto: razas, clases núcleo, dotes, conjuros y equipo del Manual del Jugador.",
    implemented: true,
    defaultEnabled: true,
  },
  {
    id: "complete-warrior",
    name: "Complete Warrior",
    shortName: "C. Warrior",
    description: "Opciones adicionales para clases marciales.",
    implemented: false,
    defaultEnabled: false,
  },
  {
    id: "complete-arcane",
    name: "Complete Arcane",
    shortName: "C. Arcane",
    description: "Opciones adicionales para lanzadores de conjuros arcanos.",
    implemented: false,
    defaultEnabled: false,
  },
  {
    id: "complete-divine",
    name: "Complete Divine",
    shortName: "C. Divine",
    description: "Opciones adicionales para lanzadores de conjuros divinos.",
    implemented: false,
    defaultEnabled: false,
  },
  {
    id: "complete-adventurer",
    name: "Complete Adventurer",
    shortName: "C. Adventurer",
    description: "Opciones adicionales para exploradores, pícaros y similares.",
    implemented: false,
    defaultEnabled: false,
  },
  {
    id: "complete-champion",
    name: "Complete Champion",
    shortName: "C. Champion",
    description: "Opciones adicionales para campeones de la fe y clases divinas de combate.",
    implemented: false,
    defaultEnabled: false,
  },
  {
    id: "phb2",
    name: "Player's Handbook II",
    shortName: "PHB2",
    description: "Reglas y opciones adicionales para jugadores.",
    implemented: false,
    defaultEnabled: false,
  },
  {
    id: "dmg2",
    name: "Dungeon Master's Guide II",
    shortName: "DMG2",
    description: "Reglas variantes y opciones adicionales para directores de juego.",
    implemented: false,
    defaultEnabled: false,
  },
];

export function getSourceBook(id: string): SourceBook | undefined {
  return SOURCE_BOOKS.find((b) => b.id === id);
}
