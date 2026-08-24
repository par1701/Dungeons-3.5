import type { ClassDef } from "../../types";

// Clases de prestigio de Complete Psionic (2006).
//
// Las 8 clases de prestigio reales de Complete Psionic son: Anarchic
// Initiate, Ebon Saint, Ectopic Adept, Flayerspawn Psychic, Illumine Soul,
// Soulbow, Storm Disciple y Zerth Cenobite (ver docs/prestige/README.md).
// Ninguna de ellas está todavía representada en este archivo: el listado que
// había aquí (Cerebremante, Metamente, Elocuter y Pirocinético) estaba mal
// filiado. Sus fichas de referencia (docs/prestige/cerebremancer.md,
// metamind.md, elocater.md, pyrokineticist.md) indican explícitamente
// "Fuente: Expanded Psionics Handbook", no Complete Psionic, y ese libro no
// es un sourcebook implementado en la app (no existe en `src/data/
// sourcebooks.ts`). Mantenerlas aquí atribuidas a `source: "complete-
// psionic"` habría perpetuado justo el tipo de filiación incorrecta que esta
// auditoría corrige, así que se retiran en vez de mantener contenido mal
// etiquetado. No se añaden en su lugar las 8 clases reales de Complete
// Psionic: aunque sus fichas de referencia sí existen, el sistema psiónico
// base de esta app modela poderes por punto de poder en vez de conjuros y
// depende de mecánicas (enfoque psiónico, golpe psíquico, hoja mental...) que
// exceden el alcance de esta pasada de auditoría; añadir clases de prestigio
// nuevas queda fuera de alcance (ver instrucciones del encargo).
//
// El Vasallista (Thrallherd) se mantiene sin cambios: el índice de
// referencia (docs/prestige/README.md) lo cita como clase de Expanded
// Psionics Handbook, pero a diferencia de las otras cuatro no existe un
// fichero docs/prestige/thrallherd.md real con el que verificar o corregir
// sus mecánicas, así que se deja intacto en vez de inventar una ficha o
// borrar contenido no verificable.
//
// El sistema psiónico base (Psiónico, Guerrero Psíquico, Indómito, Cuchillo
// del Alma, la lista de poderes y habilidades propias como Psicognosis/Psicraft,
// Autohipnosis o Saber [Psiónica]) todavía no está implementado en
// esta app (ver `src/data/sourcebooks.ts` y `ALL_POWERS = []` en
// `src/data/index.ts`). Por eso, para el Vasallista:
//
//   - `classSkills` solo incluye habilidades que YA existen en
//     `src/data/srd/skills.ts`; se omiten Psicraft, Autohipnosis y
//     Conocimiento (Psiónica) porque esos ids todavía no existen en el
//     sistema (no se inventan ids que el personaje no podría usar realmente).
//   - Los prerrequisitos de rango de habilidad que en el libro original piden
//     esas habilidades psiónicas se documentan como texto informativo (sin
//     `check`), igual que se hace en `complete-arcane/classes.ts` con
//     prerrequisitos no verificables mecánicamente todavía.

function hasAnyKnowledgeRanks(skillRanks: Record<string, number>, minRanks: number): boolean {
  return Object.entries(skillRanks).some(([id, ranks]) => id.startsWith("knowledge-") && ranks >= minRanks);
}

// ---------------------------------------------------------------------------
// Vasallista (Thrallherd)
// ---------------------------------------------------------------------------

const THRALLHERD_FEATURES = [
  {
    level: 1,
    name: "Vasallos",
    description:
      "El vasallista atrae un grupo de seguidores leales (\"vasallos\") mediante un vínculo psiónico latente, sin necesidad de la dote Liderazgo. El número total de dados de golpe de sus vasallos depende de su nivel de clase y de su modificador de Carisma, igual que un séquito, pero se rige por sus propias reglas de lealtad en vez de las de la dote Liderazgo.",
  },
  {
    level: 1,
    name: "Aptitud Psiónica Latente",
    description:
      "El vasallista manifiesta una chispa de poder psiónico latente: puede usar un par de habilidades menores similares a poderes de telepatía (por ejemplo, comunicarse mentalmente con un vasallo a corta distancia) un número limitado de veces por día, aunque no sea manifestador y no gane puntos de poder propios.",
  },
  {
    level: 2,
    name: "Vínculo Telepático",
    description:
      "El vasallista establece un vínculo telepático permanente con sus vasallos, pudiendo comunicarse con ellos mentalmente sin importar la distancia mientras estén en el mismo plano de existencia. El total de dados de golpe disponible para sus vasallos aumenta.",
  },
  {
    level: 3,
    name: "Vasallo de Élite",
    description:
      "Uno de los vasallos del vasallista se distingue como \"vasallo de élite\", recibiendo dados de golpe adicionales y una mejora de sus características por encima de lo normal para su tipo de criatura.",
  },
];

export const CPS_PRESTIGE_CLASSES: ClassDef[] = [
  {
    id: "cps-thrallherd",
    name: "Vasallista (Thrallherd)",
    source: "complete-psionic",
    description:
      "Un individuo con un don psiónico latente que jamás llega a manifestarse como poder propiamente dicho, pero que le permite atraer y vincular mentalmente a un grupo de seguidores leales sin necesidad de la dote Liderazgo. No requiere ser manifestador para entrar en esta clase.",
    hitDie: 6,
    skillPointsPerLevel: 4,
    classSkills: ["bluff", "diplomacy", "intimidate", "knowledge-nobility-royalty", "sense-motive"],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: THRALLHERD_FEATURES,
    maxLevel: 3,
    isPrestige: true,
    prerequisites: [
      {
        description: "Carisma 15",
        check: (ctx) => ctx.abilityScores.cha >= 15,
      },
      {
        description: "Saber (cualquiera): 9 rangos",
        check: (ctx) => hasAnyKnowledgeRanks(ctx.skillRanks, 9),
      },
      {
        description:
          "No requiere ser lanzador de conjuros ni manifestador de poderes psiónicos, ni poseer la dote Liderazgo",
      },
    ],
  },
];
