import type { ClassDef } from "../../types";

// Clases base psiónicas de Complete Psionic (2006), construidas sobre el sistema
// del Expanded Psionics Handbook: puntos de poder por día en vez de conjuros por
// día, y un número fijo de poderes conocidos por nivel de poder.

// ---------------------------------------------------------------------------
// Psiónico: manifestador puro (Int), progresión de puntos de poder más alta de
// las tres clases manifestadoras y el mayor repertorio de poderes conocidos.
// Fila 0 sin usar (nivel de personaje 0); filas/índices 1-20 = nivel de psiónico.
// ---------------------------------------------------------------------------
const PSION_POWER_POINTS_PER_DAY: number[] = [
  0, 2, 6, 11, 17, 25, 35, 46, 58, 72, 88, 106, 126, 147, 170, 195, 221, 249, 279, 311, 343,
];

const PSION_POWERS_KNOWN: number[][] = [
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

// ---------------------------------------------------------------------------
// Guerrero Psíquico: semi-manifestador (Sab) tipo paladín/explorador, pero con
// progresión de poderes desde nivel 1. Puntos de poder y poderes conocidos
// aproximadamente la mitad que el Psiónico a igual nivel; tope de poder de 6º nivel.
// ---------------------------------------------------------------------------
const PSYCHIC_WARRIOR_POWER_POINTS_PER_DAY: number[] = [
  0, 1, 3, 6, 9, 13, 18, 23, 29, 36, 44, 53, 63, 74, 85, 98, 111, 125, 140, 156, 172,
];

const PSYCHIC_WARRIOR_POWERS_KNOWN: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
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
  [4, 4, 4, 4, 4, 3, 2, 0, 0, 0],
  [4, 4, 4, 4, 4, 3, 3, 0, 0, 0],
  [4, 4, 4, 4, 4, 4, 3, 0, 0, 0],
  [4, 4, 4, 4, 4, 4, 4, 0, 0, 0],
  [4, 4, 4, 4, 4, 4, 4, 0, 0, 0],
  [4, 4, 4, 4, 4, 4, 4, 0, 0, 0],
  [4, 4, 4, 4, 4, 4, 4, 0, 0, 0],
];

// ---------------------------------------------------------------------------
// Indómito: manifestador espontáneo (Car), con la mayor reserva de puntos de
// poder de las tres clases manifestadoras a igual nivel, pero un repertorio de
// poderes conocidos muy limitado (compensado con la Sobrecarga Psiónica).
// ---------------------------------------------------------------------------
const WILDER_POWER_POINTS_PER_DAY: number[] = [
  0, 4, 9, 15, 23, 33, 44, 58, 72, 89, 107, 128, 151, 175, 202, 230, 260, 292, 326, 362, 400,
];

const WILDER_POWERS_KNOWN: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [3, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [3, 2, 2, 1, 0, 0, 0, 0, 0, 0],
  [3, 2, 2, 1, 0, 0, 0, 0, 0, 0],
  [3, 3, 2, 2, 1, 0, 0, 0, 0, 0],
  [3, 3, 2, 2, 1, 0, 0, 0, 0, 0],
  [3, 3, 3, 2, 2, 1, 0, 0, 0, 0],
  [3, 3, 3, 2, 2, 1, 0, 0, 0, 0],
  [3, 3, 3, 3, 2, 2, 1, 0, 0, 0],
  [3, 3, 3, 3, 2, 2, 1, 0, 0, 0],
  [3, 3, 3, 3, 3, 2, 2, 1, 0, 0],
  [3, 3, 3, 3, 3, 2, 2, 1, 0, 0],
  [3, 3, 3, 3, 3, 3, 2, 2, 1, 0],
  [3, 3, 3, 3, 3, 3, 2, 2, 1, 0],
  [3, 3, 3, 3, 3, 3, 3, 2, 2, 1],
  [3, 3, 3, 3, 3, 3, 3, 2, 2, 1],
  [3, 3, 3, 3, 3, 3, 3, 3, 2, 2],
];

export const CPS_CLASSES: ClassDef[] = [
  {
    id: "cps-psion",
    name: "Psiónico",
    source: "complete-psionic",
    description:
      "El psiónico es un manifestador puro que doblega su mente para producir efectos psiónicos mediante el estudio y el entrenamiento disciplinado. En vez de memorizar conjuros, extrae poderes de una reserva diaria de puntos de poder, y puede especializarse en una disciplina psiónica concreta.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: [
      "bluff",
      "concentration",
      "craft",
      "diplomacy",
      "disguise",
      "knowledge-arcana",
      "knowledge-dungeoneering",
      "knowledge-history",
      "knowledge-nature",
      "knowledge-the-planes",
      "profession",
      "sense-motive",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples"],
    armorProficiencies: [],
    features: [
      {
        level: 1,
        name: "Manifestación de Poderes",
        description:
          "El psiónico manifiesta poderes psiónicos extrayendo energía de una reserva diaria de puntos de poder. La Inteligencia determina la Clase de Dificultad de sus poderes y el número extra de puntos de poder que recibe por tener una puntuación alta.",
      },
      {
        level: 1,
        name: "Especialización en Disciplina (opcional)",
        description:
          "El psiónico puede especializarse en una de las disciplinas psiónicas (Clarividencia, Metacreatividad, Psicocinesis, Psicometabolismo, Psicoportación o Telepatía), obteniendo un poder adicional conocido de esa disciplina por nivel de poder a cambio de renunciar a aprender poderes de dos disciplinas opuestas.",
      },
      {
        level: 1,
        name: "Enfoque Psiónico",
        description:
          "Una vez por combate, como acción rápida, el psiónico puede concentrarse para quedar psiónicamente enfocado, lo que le permite activar más adelante ciertas dotes y rasgos psiónicos que consumen ese enfoque en vez de puntos de poder.",
      },
    ],
    manifesting: {
      ability: "int",
      powerListId: "psion",
      maxPowerLevel: 9,
      startLevel: 1,
      powerPointsPerDay: PSION_POWER_POINTS_PER_DAY,
      powersKnown: PSION_POWERS_KNOWN,
    },
    maxLevel: 20,
  },
  {
    id: "cps-psychic-warrior",
    name: "Guerrero Psíquico",
    source: "complete-psionic",
    description:
      "El guerrero psíquico combina el entrenamiento marcial con un don psiónico innato que refuerza su cuerpo y sus sentidos en combate. Manifiesta poderes centrados en la psicocinesis y el psicometabolismo mientras lucha en primera línea igual que un guerrero.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "climb",
      "concentration",
      "craft",
      "handle-animal",
      "intimidate",
      "jump",
      "profession",
      "ride",
      "swim",
    ],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "mala" },
    weaponProficiencies: ["armas simples", "armas marciales"],
    armorProficiencies: ["armadura ligera", "armadura media", "escudos (excepto escudos torre)"],
    features: [
      {
        level: 1,
        name: "Manifestación de Poderes",
        description:
          "El guerrero psíquico manifiesta poderes psiónicos extrayendo energía de una reserva diaria de puntos de poder. La Sabiduría determina la Clase de Dificultad de sus poderes y el número extra de puntos de poder que recibe por tener una puntuación alta.",
      },
      {
        level: 1,
        name: "Enfoque Psiónico",
        description:
          "Una vez por combate, como acción rápida, el guerrero psíquico puede concentrarse para quedar psiónicamente enfocado, lo que le permite activar más adelante ciertas dotes y rasgos psiónicos que consumen ese enfoque en vez de puntos de poder.",
      },
    ],
    manifesting: {
      ability: "wis",
      powerListId: "psychic-warrior",
      maxPowerLevel: 6,
      startLevel: 1,
      powerPointsPerDay: PSYCHIC_WARRIOR_POWER_POINTS_PER_DAY,
      powersKnown: PSYCHIC_WARRIOR_POWERS_KNOWN,
    },
    maxLevel: 20,
  },
  {
    id: "cps-wilder",
    name: "Indómito",
    source: "complete-psionic",
    description:
      "El indómito manifiesta poderes psiónicos de forma instintiva e impredecible, canalizando su fuerza de voluntad y su carisma en vez de un estudio metódico. Su repertorio de poderes conocidos es reducido, pero dispone de más puntos de poder que cualquier otro manifestador de su nivel y puede sobrecargarlos a riesgo de sufrir una reacción psíquica adversa.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: ["bluff", "concentration", "craft", "diplomacy", "intimidate", "profession", "sense-motive"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples"],
    armorProficiencies: [],
    features: [
      {
        level: 1,
        name: "Manifestación de Poderes",
        description:
          "El indómito manifiesta poderes psiónicos de forma espontánea, extrayendo energía de una reserva diaria de puntos de poder inusualmente grande. El Carisma determina la Clase de Dificultad de sus poderes y el número extra de puntos de poder que recibe por tener una puntuación alta.",
      },
      {
        level: 1,
        name: "Sobrecarga Psiónica",
        description:
          "Al manifestar un poder, el indómito puede gastar hasta el doble de puntos de poder disponibles para aumentarlo, superando temporalmente su reserva diaria. Si lo hace, sufre una cantidad de puntos de golpe no letales igual al número de puntos de poder gastados de más, como reacción psíquica adversa.",
      },
      {
        level: 1,
        name: "Enfoque Psiónico",
        description:
          "Una vez por combate, como acción rápida, el indómito puede concentrarse para quedar psiónicamente enfocado, lo que le permite activar más adelante ciertas dotes y rasgos psiónicos que consumen ese enfoque en vez de puntos de poder.",
      },
    ],
    manifesting: {
      ability: "cha",
      powerListId: "wilder",
      maxPowerLevel: 9,
      startLevel: 1,
      powerPointsPerDay: WILDER_POWER_POINTS_PER_DAY,
      powersKnown: WILDER_POWERS_KNOWN,
    },
    maxLevel: 20,
  },
  {
    id: "cps-soulknife",
    name: "Cuchillo del Alma",
    source: "complete-psionic",
    description:
      "El cuchillo del alma no manifiesta poderes: en vez de ello, proyecta su fuerza de voluntad en una hoja mental, un arma semisólida forjada con energía psíquica pura que solo él puede empuñar. Combina la disciplina de un guerrero con una conexión psiónica innata que perfecciona su arma a medida que gana experiencia.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "balance",
      "climb",
      "craft",
      "handle-animal",
      "hide",
      "intimidate",
      "jump",
      "profession",
      "ride",
      "tumble",
    ],
    babProgression: "completa",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: ["armas simples", "hoja mental"],
    armorProficiencies: ["armadura ligera"],
    features: [
      {
        level: 1,
        name: "Hoja Mental",
        description:
          "Como acción de movimiento, el cuchillo del alma proyecta su energía psíquica en una hoja mental, una espada semisólida que solo él puede empuñar con eficacia. Para un personaje Mediano funciona como una espada corta (1d6 de daño, crítico 19-20/x2) y puede sostenerse a una o dos manos. Si es desarmado o la hoja se destruye, puede volver a materializarla en cualquier momento. Obtiene además el dominio de arma (Hoja Mental) de forma gratuita.",
      },
      {
        level: 2,
        name: "Lanzar la Hoja Mental",
        description:
          "El cuchillo del alma puede lanzar su hoja mental como arma arrojadiza con un incremento de alcance de 3 metros, sin sufrir la penalización habitual por lanzar un arma inadecuada para ello. La hoja se rematerializa en su mano al comienzo de su siguiente turno.",
      },
      {
        level: 3,
        name: "Dote de Combate Adicional",
        description:
          "El cuchillo del alma obtiene una dote de combate adicional de una lista restringida de dotes psiónicas y marciales relacionadas con la hoja mental.",
      },
      {
        level: 4,
        name: "Mejora de la Hoja Mental +1",
        description:
          "La hoja mental del cuchillo del alma obtiene un bono de mejora de +1 a los ataques y al daño, y se considera mágica a efectos de superar la reducción de daño.",
      },
      {
        level: 5,
        name: "Forma de la Hoja Mental",
        description:
          "El cuchillo del alma puede reconfigurar la forma de su hoja mental para que funcione como otra arma ligera cuerpo a cuerpo (por ejemplo, una hoz o una espada corta doble), conservando su bono de mejora actual.",
      },
      {
        level: 6,
        name: "Dote de Combate Adicional",
        description:
          "El cuchillo del alma obtiene otra dote de combate adicional de la lista restringida de dotes de hoja mental.",
      },
      {
        level: 7,
        name: "Golpe Certero",
        description:
          "Cuando el cuchillo del alma consigue un golpe crítico con su hoja mental contra un enemigo que no puede defenderse eficazmente, además del daño normal el objetivo debe superar una salvación de Fortaleza o quedar aturdido durante 1 asalto.",
      },
      {
        level: 8,
        name: "Mejora de la Hoja Mental +2",
        description: "El bono de mejora de la hoja mental aumenta a +2.",
      },
      {
        level: 9,
        name: "Dote de Combate Adicional",
        description:
          "La hoja del alma obtiene otra dote de combate adicional de la lista restringida de dotes de hoja mental.",
      },
      {
        level: 10,
        name: "Hoja Mental Gemela",
        description:
          "La hoja del alma aprende a materializar una segunda hoja mental más pequeña en su otra mano, permitiéndole luchar con dos armas sin necesidad de empuñar una hoja física adicional.",
      },
      {
        level: 12,
        name: "Mejora de la Hoja Mental +3",
        description: "El bono de mejora de la hoja mental aumenta a +3.",
      },
      {
        level: 14,
        name: "Viento de Hojas",
        description:
          "Como acción de asalto completo, la hoja del alma puede realizar un ataque cuerpo a cuerpo con su hoja mental contra cada enemigo que amenace a su alrededor.",
      },
      {
        level: 15,
        name: "Dote de Combate Adicional",
        description:
          "La hoja del alma obtiene otra dote de combate adicional de la lista restringida de dotes de hoja mental.",
      },
      {
        level: 16,
        name: "Mejora de la Hoja Mental +4",
        description: "El bono de mejora de la hoja mental aumenta a +4.",
      },
      {
        level: 18,
        name: "Dote de Combate Adicional",
        description:
          "La hoja del alma obtiene otra dote de combate adicional de la lista restringida de dotes de hoja mental.",
      },
      {
        level: 20,
        name: "Mejora de la Hoja Mental +5",
        description:
          "El bono de mejora de la hoja mental alcanza su máximo de +5. La hoja del alma es reconocida como una maestra absoluta de su arma psíquica.",
      },
    ],
    maxLevel: 20,
  },
];
