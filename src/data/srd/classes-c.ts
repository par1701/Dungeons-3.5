import type { ClassDef } from "../../types";

// Clases del SRD 3.5 (contenido de juego abierto) — bloque C: Pícaro, Hechicero, Mago.

const ROGUE_FEATURES = [
  {
    level: 1,
    name: "Ataque Furtivo +1d6",
    description:
      "Si el pícaro puede atacar a un objetivo que no puede defenderse eficazmente de su ataque (por ejemplo, un enemigo flanqueado o sorprendido), su ataque cuerpo a cuerpo o a distancia (a 9 m o menos) inflige 1d6 puntos de daño adicional. Este daño extra aumenta en 1d6 cada dos niveles de pícaro.",
  },
  {
    level: 1,
    name: "Encontrar Trampas",
    description:
      "El pícaro puede usar la habilidad Buscar para localizar trampas mágicas con CD 25 o más, y puede intentar desactivar trampas mecánicas con CD superior a 20 usando Desactivar Mecanismo.",
  },
  {
    level: 2,
    name: "Evasión",
    description:
      "Si el pícaro supera una tirada de salvación de Reflejos contra un efecto que normalmente causa la mitad de daño en caso de éxito, en su lugar no sufre ningún daño. Requiere que no lleve una armadura pesada.",
  },
  {
    level: 3,
    name: "Ataque Furtivo +2d6 y Sentido de las Trampas +1",
    description:
      "El daño de ataque furtivo aumenta a +2d6. El pícaro obtiene además un bono de +1 a las tiradas de salvación de Reflejos para evitar trampas y a la Clase de Armadura contra los ataques de las trampas.",
  },
  {
    level: 4,
    name: "Esquiva Sobrenatural",
    description:
      "El pícaro conserva su bonificador de Destreza a la Clase de Armadura incluso cuando es sorprendido o es atacado por un enemigo invisible (aunque sigue perdiéndolo si está inmovilizado).",
  },
  {
    level: 5,
    name: "Ataque Furtivo +3d6",
    description: "El daño de ataque furtivo aumenta a +3d6.",
  },
  {
    level: 6,
    name: "Sentido de las Trampas +2",
    description: "El bono de Sentido de las Trampas aumenta a +2.",
  },
  {
    level: 7,
    name: "Ataque Furtivo +4d6",
    description: "El daño de ataque furtivo aumenta a +4d6.",
  },
  {
    level: 8,
    name: "Esquiva Sobrenatural Mejorada",
    description:
      "El pícaro ya no puede perder su bono de Destreza a la Clase de Armadura por estar flanqueado, excepto ante un atacante que sea pícaro y tenga al menos 4 niveles de pícaro más que él.",
  },
  {
    level: 9,
    name: "Ataque Furtivo +5d6 y Sentido de las Trampas +3",
    description: "El daño de ataque furtivo aumenta a +5d6 y el Sentido de las Trampas a +3.",
  },
  {
    level: 10,
    name: "Habilidad Especial de Pícaro",
    description:
      "El pícaro elige una habilidad especial entre golpe lisiante, tirada defensiva, oportunista, dominio de habilidad o mente escurridiza.",
  },
  {
    level: 11,
    name: "Ataque Furtivo +6d6",
    description: "El daño de ataque furtivo aumenta a +6d6.",
  },
  {
    level: 12,
    name: "Sentido de las Trampas +4",
    description: "El bono de Sentido de las Trampas aumenta a +4.",
  },
  {
    level: 13,
    name: "Ataque Furtivo +7d6 y Habilidad Especial de Pícaro",
    description:
      "El daño de ataque furtivo aumenta a +7d6 y el pícaro obtiene una nueva habilidad especial de pícaro.",
  },
  {
    level: 15,
    name: "Ataque Furtivo +8d6 y Sentido de las Trampas +5",
    description: "El daño de ataque furtivo aumenta a +8d6 y el Sentido de las Trampas a +5.",
  },
  {
    level: 16,
    name: "Habilidad Especial de Pícaro",
    description: "El pícaro obtiene una nueva habilidad especial de pícaro.",
  },
  {
    level: 17,
    name: "Ataque Furtivo +9d6",
    description: "El daño de ataque furtivo aumenta a +9d6.",
  },
  {
    level: 18,
    name: "Sentido de las Trampas +6",
    description: "El bono de Sentido de las Trampas aumenta a +6.",
  },
  {
    level: 19,
    name: "Ataque Furtivo +10d6 y Habilidad Especial de Pícaro",
    description:
      "El daño de ataque furtivo alcanza su máximo de +10d6 y el pícaro obtiene una nueva habilidad especial de pícaro.",
  },
];

// Tabla de conjuros por día del Mago (idéntica en forma a la de otros lanzadores preparados
// de progresión completa). Fila 0 sin usar (nivel de personaje 0), filas 1-20 = nivel de mago.
const WIZARD_SPELLS_PER_DAY: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [4, 3, 2, 0, 0, 0, 0, 0, 0, 0],
  [4, 3, 2, 1, 0, 0, 0, 0, 0, 0],
  [4, 3, 3, 2, 0, 0, 0, 0, 0, 0],
  [4, 4, 3, 2, 1, 0, 0, 0, 0, 0],
  [4, 4, 3, 3, 2, 0, 0, 0, 0, 0],
  [4, 4, 4, 3, 2, 1, 0, 0, 0, 0],
  [4, 4, 4, 3, 3, 2, 0, 0, 0, 0],
  [4, 4, 4, 4, 3, 2, 1, 0, 0, 0],
  [4, 4, 4, 4, 3, 3, 2, 0, 0, 0],
  [4, 4, 4, 4, 4, 3, 2, 1, 0, 0],
  [4, 4, 4, 4, 4, 3, 3, 2, 0, 0],
  [4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
  [4, 4, 4, 4, 4, 4, 3, 3, 2, 0],
  [4, 4, 4, 4, 4, 4, 4, 3, 2, 1],
  [4, 4, 4, 4, 4, 4, 4, 3, 3, 2],
  [4, 4, 4, 4, 4, 4, 4, 4, 3, 3],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
];

// Conjuros por día del Hechicero. Fila 0 sin usar, filas 1-20 = nivel de hechicero.
const SORCERER_SPELLS_PER_DAY: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 3, 0, 0, 0, 0, 0, 0, 0, 0],
  [6, 4, 0, 0, 0, 0, 0, 0, 0, 0],
  [6, 5, 0, 0, 0, 0, 0, 0, 0, 0],
  [6, 6, 3, 0, 0, 0, 0, 0, 0, 0],
  [6, 6, 4, 0, 0, 0, 0, 0, 0, 0],
  [6, 6, 5, 3, 0, 0, 0, 0, 0, 0],
  [6, 6, 6, 4, 0, 0, 0, 0, 0, 0],
  [6, 6, 6, 5, 3, 0, 0, 0, 0, 0],
  [6, 6, 6, 6, 4, 0, 0, 0, 0, 0],
  [6, 6, 6, 6, 5, 3, 0, 0, 0, 0],
  [6, 6, 6, 6, 6, 4, 0, 0, 0, 0],
  [6, 6, 6, 6, 6, 5, 3, 0, 0, 0],
  [6, 6, 6, 6, 6, 6, 4, 0, 0, 0],
  [6, 6, 6, 6, 6, 6, 5, 3, 0, 0],
  [6, 6, 6, 6, 6, 6, 6, 4, 0, 0],
  [6, 6, 6, 6, 6, 6, 6, 5, 3, 0],
  [6, 6, 6, 6, 6, 6, 6, 6, 4, 0],
  [6, 6, 6, 6, 6, 6, 6, 6, 5, 3],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 4],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
];

// Conjuros conocidos del Hechicero (lanzador espontáneo con repertorio muy limitado).
// Fila 0 sin usar, filas 1-20 = nivel de hechicero.
const SORCERER_SPELLS_KNOWN: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 3, 0, 0, 0, 0, 0, 0, 0, 0],
  [6, 3, 1, 0, 0, 0, 0, 0, 0, 0],
  [6, 4, 2, 0, 0, 0, 0, 0, 0, 0],
  [7, 4, 2, 1, 0, 0, 0, 0, 0, 0],
  [7, 5, 3, 2, 0, 0, 0, 0, 0, 0],
  [8, 5, 3, 2, 1, 0, 0, 0, 0, 0],
  [8, 5, 4, 3, 2, 0, 0, 0, 0, 0],
  [9, 5, 4, 3, 2, 1, 0, 0, 0, 0],
  [9, 5, 5, 4, 3, 2, 0, 0, 0, 0],
  [9, 5, 5, 4, 3, 2, 1, 0, 0, 0],
  [9, 5, 5, 4, 4, 3, 2, 0, 0, 0],
  [9, 5, 5, 4, 4, 3, 2, 1, 0, 0],
  [9, 5, 5, 4, 4, 4, 3, 2, 0, 0],
  [9, 5, 5, 4, 4, 4, 3, 2, 1, 0],
  [9, 5, 5, 4, 4, 4, 3, 3, 2, 0],
  [9, 5, 5, 4, 4, 4, 3, 3, 2, 1],
  [9, 5, 5, 4, 4, 4, 4, 3, 3, 2],
  [9, 5, 5, 4, 4, 4, 4, 3, 3, 3],
];

export const SRD_CLASSES_C: ClassDef[] = [
  {
    id: "rogue",
    name: "Pícaro",
    source: "srd",
    description:
      "El pícaro triunfa mediante la astucia, la agilidad y el conocimiento de los puntos débiles de sus enemigos, más que por la fuerza bruta. Domina las trampas, las cerraduras, el sigilo y el combate furtivo.",
    hitDie: 6,
    skillPointsPerLevel: 8,
    classSkills: [
      "appraise",
      "balance",
      "bluff",
      "climb",
      "craft",
      "decipher-script",
      "diplomacy",
      "disable-device",
      "disguise",
      "escape-artist",
      "forgery",
      "gather-information",
      "hide",
      "intimidate",
      "jump",
      "knowledge-local",
      "listen",
      "move-silently",
      "open-lock",
      "perform",
      "profession",
      "search",
      "sense-motive",
      "sleight-of-hand",
      "spot",
      "swim",
      "tumble",
      "use-magic-device",
      "use-rope",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "buena", will: "mala" },
    weaponProficiencies: [
      "Armas simples",
      "Ballesta de mano",
      "Estoque",
      "Espada corta",
      "Arco corto",
      "Cachiporra",
    ],
    // Solo armadura ligera: si llevara armadura media o pesada perdería sus habilidades
    // especiales que requieren ausencia de armadura pesada (p. ej. Evasión).
    armorProficiencies: ["Armadura ligera"],
    features: ROGUE_FEATURES,
    maxLevel: 20,
  },
  {
    id: "sorcerer",
    name: "Hechicero",
    source: "srd",
    description:
      "El hechicero lanza conjuros arcanos de forma innata, gracias a un don de sangre mágica en su linaje, sin necesidad de estudio formal ni de un libro de conjuros.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: [
      "bluff",
      "concentration",
      "craft",
      "knowledge-arcana",
      "profession",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: ["Armas simples"],
    armorProficiencies: [],
    features: [
      {
        level: 1,
        name: "Familiar",
        description:
          "El hechicero puede invocar un familiar especial que le sirve de compañero, le otorga beneficios adicionales y con el que comparte un vínculo mágico.",
      },
    ],
    spellcasting: {
      type: "espontaneo",
      ability: "cha",
      spellListId: "sorcerer",
      maxSpellLevel: 9,
      startLevel: 1,
      spellsPerDay: SORCERER_SPELLS_PER_DAY,
      spellsKnown: SORCERER_SPELLS_KNOWN,
    },
    maxLevel: 20,
  },
  {
    id: "wizard",
    name: "Mago",
    source: "srd",
    description:
      "El mago dedica años al estudio de los principios arcanos para doblegar la realidad mediante fórmulas, gestos y palabras precisas, registrando sus conjuros en un libro de conjuros del que depende para prepararlos cada día.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "decipher-script",
      "knowledge-arcana",
      "knowledge-architecture-engineering",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-history",
      "knowledge-local",
      "knowledge-nature",
      "knowledge-nobility-royalty",
      "knowledge-the-planes",
      "knowledge-religion",
      "profession",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: ["Armas simples", "Bastón", "Ballesta ligera", "Daga"],
    armorProficiencies: [],
    features: [
      {
        level: 1,
        name: "Familiar",
        description:
          "El mago puede invocar un familiar especial que le sirve de compañero, le otorga beneficios adicionales y con el que comparte un vínculo mágico.",
      },
      {
        level: 1,
        name: "Especialización en Escuela (opcional)",
        description:
          "El mago puede especializarse en una escuela de magia, obteniendo un conjuro adicional de esa escuela por nivel de conjuro por día, a cambio de renunciar a aprender conjuros de una o dos escuelas prohibidas.",
      },
      {
        level: 1,
        name: "Inscribir Pergamino",
        description:
          "El mago obtiene Inscribir Pergamino como dote de fabricación de objetos mágicos de forma gratuita al alcanzar el nivel 1.",
      },
    ],
    spellcasting: {
      type: "preparado",
      ability: "int",
      spellListId: "wizard",
      maxSpellLevel: 9,
      startLevel: 1,
      spellsPerDay: WIZARD_SPELLS_PER_DAY,
    },
    maxLevel: 20,
  },
];
