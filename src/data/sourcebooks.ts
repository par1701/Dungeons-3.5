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
    description:
      "Dotes de combate adicionales y clases de prestigio marciales (Derviche, Maestro Ebrio, Tempestad, etc.).",
    implemented: true,
    defaultEnabled: false,
  },
  {
    id: "complete-arcane",
    name: "Complete Arcane",
    shortName: "C. Arcane",
    description:
      "Dotes, conjuros y clases de prestigio adicionales para lanzadores de conjuros arcanos (Mago de Batalla, Maestro Elemental, etc.).",
    implemented: true,
    defaultEnabled: false,
  },
  {
    id: "complete-divine",
    name: "Complete Divine",
    shortName: "C. Divine",
    description:
      "Dotes, conjuros, las clases base Alma Predilecta y Chamán Espiritual, y clases de prestigio divinas.",
    implemented: true,
    defaultEnabled: false,
  },
  {
    id: "complete-adventurer",
    name: "Complete Adventurer",
    shortName: "C. Adventurer",
    description:
      "Dotes, las clases base Batidor y Espadachín, y clases de prestigio para exploradores y pícaros.",
    implemented: true,
    defaultEnabled: false,
  },
  {
    id: "complete-champion",
    name: "Complete Champion",
    shortName: "C. Champion",
    description: "Dotes de devoción divina y numerosas clases de prestigio para campeones de la fe.",
    implemented: true,
    defaultEnabled: false,
  },
  {
    id: "complete-scoundrel",
    name: "Complete Scoundrel",
    shortName: "C. Scoundrel",
    description: "Dotes de suerte y clases de prestigio para bribones, timadores y villanos encantadores.",
    implemented: true,
    defaultEnabled: false,
  },
  {
    id: "complete-mage",
    name: "Complete Mage",
    shortName: "C. Mage",
    description: "Dotes, conjuros y clases de prestigio adicionales para lanzadores arcanos.",
    implemented: true,
    defaultEnabled: false,
  },
  {
    id: "complete-psionic",
    name: "Complete Psionic",
    shortName: "C. Psionic",
    description:
      "Sistema psiónico completo: Psiónico, Guerrero Psíquico, Indómito y Cuchillo del Alma, con puntos de poder en vez de conjuros por día.",
    implemented: true,
    defaultEnabled: false,
  },
  {
    id: "phb2",
    name: "Player's Handbook II",
    shortName: "PHB2",
    description: "Dotes adicionales y reglas variantes de personaje (gestalt, puntos de acción, trasfondos, etc.).",
    implemented: true,
    defaultEnabled: false,
  },
  {
    id: "dmg2",
    name: "Dungeon Master's Guide II",
    shortName: "DMG2",
    description:
      "Reglas variantes para jugadores (puntos de acción, reputación, afiliación, riqueza abstracta, reentrenamiento, etc.).",
    implemented: true,
    defaultEnabled: false,
  },
];

export function getSourceBook(id: string): SourceBook | undefined {
  return SOURCE_BOOKS.find((b) => b.id === id);
}
