import type { ClassDef } from "../../types";

// Clases de prestigio psiónicas de Complete Psionic (2006) / Manual de Psiónica
// Ampliado.
//
// El sistema psiónico base (Psiónico, Guerrero Psíquico, Indómito, Cuchillo
// del Alma, la lista de poderes y habilidades propias como Psicognosis/Psicraft,
// Autohipnosis o Saber [Psiónica]) todavía no está implementado en
// esta app (ver `src/data/sourcebooks.ts`, `complete-psionic.implemented =
// false`, y `ALL_POWERS = []` en `src/data/index.ts`). Por eso:
//
//   - `classSkills` solo incluye habilidades que YA existen en
//     `src/data/srd/skills.ts`; se omiten Psicraft, Autohipnosis y
//     Conocimiento (Psiónica) porque esos ids todavía no existen en el
//     sistema (no se inventan ids que el personaje no podría usar realmente).
//   - Los prerrequisitos de rango de habilidad que en el libro original piden
//     esas habilidades psiónicas se documentan como texto informativo (sin
//     `check`), igual que se hace en `complete-arcane/classes.ts` con
//     prerrequisitos no verificables mecánicamente todavía.
//   - `ctx.casterLevel` se usa como aproximación del nivel de manifestador
//     (el contexto de prerrequisitos todavía no distingue lanzador arcano de
//     manifestador psiónico).
//   - Todas estas clases avanzan el nivel de manifestador de una clase
//     psiónica (y, en el caso de la Cerebremante, también el nivel de
//     lanzador arcano) que el personaje ya poseyera, en vez de tener su
//     propia tabla de `ManifestingInfo`. Ese efecto se documenta como un
//     `ClassFeature` de texto y el campo `manifesting` se omite a propósito,
//     igual que con los PrCs arcanos de progresión combinada.

function hasAnyKnowledgeRanks(skillRanks: Record<string, number>, minRanks: number): boolean {
  return Object.entries(skillRanks).some(([id, ranks]) => id.startsWith("knowledge-") && ranks >= minRanks);
}

// ---------------------------------------------------------------------------
// Cerebremante (Cerebremancer)
// ---------------------------------------------------------------------------

const CEREBREMANCER_FEATURES = [
  {
    level: 1,
    name: "Progresión Arcana y Psiónica",
    description:
      "Cada nivel de cerebremante (1º a 10º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera Y, al mismo tiempo, un nivel de manifestador adicional a una clase psiónica que ya poseyera, exactamente como si hubiera obtenido un nivel en cada una de ellas a efectos de conjuros o poderes por día, conjuros o poderes conocidos, y nivel de lanzador/manifestador (pero no otros rasgos de esas clases).",
  },
  {
    level: 1,
    name: "Doble Origen del Poder",
    description:
      "La cerebremante ha aprendido a sostener a la vez la disciplina arcana y la disciplina psiónica en su mente sin que una interfiera con la otra, algo que la mayoría de estudiosos considera imposible.",
  },
];

// ---------------------------------------------------------------------------
// Metamente (Metamind)
// ---------------------------------------------------------------------------

const METAMIND_FEATURES = [
  {
    level: 1,
    name: "Progresión de Manifestación",
    description:
      "Cada nivel de metamente (1º a 10º) otorga un nivel de manifestador adicional a una clase psiónica que el personaje ya poseyera, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de puntos de poder por día, poderes conocidos y nivel de manifestador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Puntos de Poder Adicionales",
    description:
      "La mente de la metamente es capaz de sostener más energía psiónica de la habitual: obtiene puntos de poder adicionales cada nivel, por encima de los que le corresponderían por su progresión de manifestación normal.",
  },
  {
    level: 3,
    name: "Fortaleza Mental",
    description:
      "La metamente obtiene un bonificador de +2 a las tiradas de salvación de Voluntad contra efectos que afecten a la mente (encantamiento, compulsión y similares).",
  },
  {
    level: 5,
    name: "Claridad de Pensamiento",
    description:
      "La metamente puede volver a intentar una prueba de Concentración fallida al manifestar un poder, una vez por asalto, gastando un punto de poder adicional.",
  },
  {
    level: 7,
    name: "Genio Psiónico",
    description:
      "La metamente añade un poder más del que le correspondería por su nivel de manifestador a su lista de poderes conocidos, elegido de cualquier nivel que ya pueda manifestar.",
  },
  {
    level: 10,
    name: "Mente Trascendente",
    description:
      "Una vez al día, la metamente puede manifestar cualquier poder que conozca sin gastar los puntos de poder que costaría normalmente.",
  },
];

// ---------------------------------------------------------------------------
// Elocuter (Elocater)
// ---------------------------------------------------------------------------

const ELOCATER_FEATURES = [
  {
    level: 1,
    name: "Progresión de Manifestación",
    description:
      "Cada nivel de elocuter (1º a 10º) otorga un nivel de manifestador adicional a una clase psiónica que el personaje ya poseyera, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de puntos de poder por día, poderes conocidos y nivel de manifestador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Paso Veloz",
    description: "La velocidad del elocuter aumenta en 3 metros mientras no lleve una carga pesada.",
  },
  {
    level: 3,
    name: "Evasión Dimensional",
    description:
      "Mientras esté bajo los efectos de un poder de psicoportación que haya manifestado, el elocuter obtiene un bonificador de esquiva de +2 a la Clase de Armadura.",
  },
  {
    level: 5,
    name: "Reducción de Coste Psicoportador",
    description:
      "El coste en puntos de poder de cualquier poder de la disciplina de psicoportación que manifieste el elocuter se reduce en 1 (mínimo 1 punto de poder).",
  },
  {
    level: 7,
    name: "Salto Dimensional Menor",
    description:
      "El elocuter puede teleportarse a un punto que pueda ver dentro de 9 metros, como acción rápida, un número de veces por día igual a su modificador de la característica de manifestación, sin gastar puntos de poder.",
  },
  {
    level: 10,
    name: "Viajero Definitivo",
    description:
      "El elocuter puede usar su Salto Dimensional Menor como acción libre en respuesta a un ataque en su contra, antes de que se resuelva, un número de veces por día igual a la mitad de su nivel de elocuter.",
  },
];

// ---------------------------------------------------------------------------
// Pirocinético (Pyrokineticist)
// ---------------------------------------------------------------------------

const PYROKINETICIST_FEATURES = [
  {
    level: 1,
    name: "Progresión de Manifestación",
    description:
      "Cada nivel de pirocinético (1º a 10º) otorga un nivel de manifestador adicional a una clase psiónica que el personaje ya poseyera, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de puntos de poder por día, poderes conocidos y nivel de manifestador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Vínculo Ígneo",
    description:
      "El pirocinético obtiene resistencia al fuego 5 y puede hacer que cualquier poder de psicocinesis que manifieste y que normalmente inflija daño de energía sin tipo fijo inflija en su lugar daño de fuego.",
  },
  {
    level: 3,
    name: "Resistencia al Fuego 10",
    description: "La resistencia al fuego del pirocinético aumenta a 10.",
  },
  {
    level: 5,
    name: "Golpe Ardiente",
    description:
      "Los poderes de psicocinesis que manifieste el pirocinético e inflijan daño de fuego (por su Vínculo Ígneo o de forma natural) causan 1 punto adicional de daño de fuego por dado de daño del poder.",
  },
  {
    level: 7,
    name: "Resistencia al Fuego 20",
    description: "La resistencia al fuego del pirocinético aumenta a 20.",
  },
  {
    level: 10,
    name: "Inmunidad al Fuego",
    description:
      "El pirocinético se vuelve inmune al daño de fuego. Además, un número de veces por día igual a su modificador de la característica de manifestación, puede hacer que un poder con daño de fuego ignore la resistencia a la energía (aunque no la inmunidad) del objetivo.",
  },
];

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
    id: "cps-cerebremancer",
    name: "Cerebremante (Cerebremancer)",
    source: "complete-psionic",
    description:
      "Un estudioso que ha logrado lo que la mayoría considera imposible: sostener a la vez el estudio de la magia arcana y la disciplina psiónica, haciendo progresar ambas artes en paralelo.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "knowledge-arcana", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: CEREBREMANCER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Arcano): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 8,
      },
      {
        description: "Saber (Psiónica): 8 rangos",
      },
      {
        description: "Manifestación en Combate",
        check: (ctx) => ctx.featIds.has("combat-manifestation"),
      },
      {
        description: "Capacidad de manifestar poderes psiónicos de nivel 3 (nivel de manifestador 5)",
        check: (ctx) => ctx.casterLevel >= 5,
      },
      {
        description: "Capacidad de lanzar conjuros arcanos de nivel 3 (nivel de lanzador arcano 5)",
      },
    ],
  },
  {
    id: "cps-metamind",
    name: "Metamente (Metamind)",
    source: "complete-psionic",
    description:
      "Un manifestador de intelecto excepcional que ha aprendido a exprimir su mente hasta sostener más energía psiónica de la que debería ser posible, sacrificando robustez física por una capacidad mental cada vez mayor.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "profession", "sense-motive"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: METAMIND_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Voluntad de Hierro",
        check: (ctx) => ctx.featIds.has("iron-will"),
      },
      {
        description: "Concentración: 6 rangos",
        check: (ctx) => (ctx.skillRanks["concentration"] ?? 0) >= 6,
      },
      {
        description: "Inteligencia 19",
        check: (ctx) => ctx.abilityScores.int >= 19,
      },
      {
        description: "Capacidad de manifestar poderes psiónicos de nivel 3 (nivel de manifestador 5)",
        check: (ctx) => ctx.casterLevel >= 5,
      },
    ],
  },
  {
    id: "cps-elocater",
    name: "Elocuter (Elocater)",
    source: "complete-psionic",
    description:
      "Un manifestador especializado en la disciplina de psicoportación que aprende a moverse por el campo de batalla, y entre planos, más deprisa de lo que el ojo puede seguir.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "jump", "profession", "tumble"],
    babProgression: "media",
    saves: { fort: "mala", ref: "buena", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: ELOCATER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Rapidez de Pensamiento",
        check: (ctx) => ctx.featIds.has("speed-of-thought"),
      },
      {
        description: "Saltar: 5 rangos",
        check: (ctx) => (ctx.skillRanks["jump"] ?? 0) >= 5,
      },
      {
        description: "Capacidad de manifestar un poder de psicoportación de nivel 3, como puerta dimensional",
      },
      {
        description: "Nivel de manifestador 5",
        check: (ctx) => ctx.casterLevel >= 5,
      },
    ],
  },
  {
    id: "cps-pyrokineticist",
    name: "Pirocinético (Pyrokineticist)",
    source: "complete-psionic",
    description:
      "Un manifestador de psicocinesis que dirige su energía psíquica hacia el elemento del fuego, hasta el punto de que su propio cuerpo deja de temer las llamas.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "profession", "spot"],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: PYROKINETICIST_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Concentración: 6 rangos",
        check: (ctx) => (ctx.skillRanks["concentration"] ?? 0) >= 6,
      },
      {
        description: "Capacidad de manifestar un poder de psicocinesis de energía de nivel 3",
      },
      {
        description: "Nivel de manifestador 5",
        check: (ctx) => ctx.casterLevel >= 5,
      },
    ],
  },
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
