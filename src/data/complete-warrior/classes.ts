import type { ClassDef, ClassFeature } from "../../types";

// Clases de prestigio de Complete Warrior (2003).
//
// Complete Warrior reúne una docena de clases de prestigio marciales (Bear
// Warrior, Bloodhound, Dervish, Drunken Master, Exotic Weapon Master,
// Frenzied Berserker, Halfling Outrider, Horizon Walker, Hospitaler, Kensai,
// Order of the Bow Initiate, Tempest...). Se incluyen aquí solo las que se
// recuerdan con confianza razonable en cuanto a su mecánica real; se ha
// preferido omitir el resto (por ejemplo, Bear Warrior, Frenzied Berserker,
// Horizon Walker, Hospitaler, Kensai o Exotic Weapon Master) antes que
// arriesgarse a inventar números o rasgos que no se recuerdan con precisión.
//
// Ninguna de las clases incluidas aquí es una clase de lanzador de conjuros:
// todas son mundanas, por lo que el campo `spellcasting` se omite en todas.

// ---------------------------------------------------------------------------
// Derviche (Dervish)
// ---------------------------------------------------------------------------

const DERVISH_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Baile del derviche",
    description:
      "Mientras lleve como máximo armadura ligera y ningún escudo, el derviche puede moverse antes, después y entre los ataques de una acción de ataque a discreción, sin que ese movimiento provoque ataques de oportunidad, siempre que la distancia total recorrida en el asalto no supere su velocidad.",
  },
  {
    level: 2,
    name: "Velocidad aumentada",
    description: "Mientras no lleve armadura pesada, la velocidad del derviche aumenta en 3 metros.",
  },
  {
    level: 3,
    name: "Gracia en la danza (+1 CA)",
    description:
      "El derviche obtiene un bonificador de esquiva de +1 a la Clase de Armadura mientras empuñe el arma elegida para su baile y no lleve escudo.",
  },
  {
    level: 4,
    name: "Dote de bonificación",
    description:
      "El derviche elige una dote entre Esquiva, Iniciativa Mejorada, Movilidad o Reflejos de Combate, aunque no cumpla sus prerrequisitos.",
  },
  {
    level: 5,
    name: "Danza elaborada",
    description:
      "Mientras use el baile del derviche, puede sumar su modificador de Destreza al daño en vez del de Fuerza con el arma elegida para el baile.",
  },
  {
    level: 6,
    name: "Gracia en la danza (+2 CA)",
    description: "El bonificador de esquiva de la Gracia en la Danza aumenta a +2.",
  },
  {
    level: 7,
    name: "Dote de bonificación",
    description: "El derviche elige una segunda dote de la misma lista del 4º nivel.",
  },
  {
    level: 8,
    name: "Gracia en la danza (+3 CA)",
    description: "El bonificador de esquiva de la Gracia en la Danza aumenta a +3.",
  },
  {
    level: 9,
    name: "Serenidad de la danza",
    description:
      "El derviche obtiene un bonificador de +2 a las tiradas de salvación contra conjuros y efectos de la escuela de Encantamiento mientras esté usando el baile del derviche.",
  },
  {
    level: 10,
    name: "Torbellino mortal",
    description:
      "Una vez por asalto, mientras use el baile del derviche, el derviche puede realizar un ataque adicional a su bonificador de ataque más alto. El bonificador de esquiva de la Gracia en la Danza aumenta a +4.",
  },
];

// ---------------------------------------------------------------------------
// Maestro Ebrio (Drunken Master)
// ---------------------------------------------------------------------------

const DRUNKEN_MASTER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Niveles de monje continuados",
    description:
      "Los niveles de maestro ebrio se suman a los niveles de monje que el personaje ya poseía a efectos de Torrente de Golpes, Clase de Armadura sin armadura, velocidad sin armadura y daño de ataque desarmado, pero no otorgan ni mejoran los demás rasgos de clase del monje.",
  },
  {
    level: 1,
    name: "Redirección",
    description:
      "Cuando un ataque cuerpo a cuerpo falla contra el maestro ebrio, puede obligar al atacante a repetir el mismo ataque contra otra criatura adyacente al maestro ebrio, un número de veces por día igual a su modificador de Sabiduría (mínimo 1).",
  },
  {
    level: 2,
    name: "Valor etílico",
    description:
      "Mientras finja estar embriagado en combate, el maestro ebrio es inmune al miedo, mágico o mundano.",
  },
  {
    level: 3,
    name: "Fuerza etílica (+2)",
    description: "Mientras luche 'como si estuviera ebrio', el maestro ebrio gana un bonificador de +2 a la Fuerza.",
  },
  {
    level: 4,
    name: "Redirección mejorada",
    description: "El maestro ebrio puede usar Redirección un número adicional de veces por día.",
  },
  {
    level: 5,
    name: "Aguante etílico",
    description:
      "El maestro ebrio es inmune a los efectos de intoxicación por alcohol y obtiene un bonificador de +2 a las tiradas de salvación de Fortaleza contra venenos ingeridos.",
  },
  {
    level: 6,
    name: "Fuerza etílica (+4)",
    description: "El bonificador de Fuerza etílica aumenta a +4.",
  },
  {
    level: 7,
    name: "Golpe desestabilizador",
    description:
      "El ataque desarmado del maestro ebrio puede aturdir a su objetivo durante 1 asalto (salvación de Fortaleza para negarlo), de forma similar a la dote Puño Aturdidor, un número de veces por día igual a su modificador de Sabiduría.",
  },
  {
    level: 8,
    name: "Redirección superior",
    description: "El maestro ebrio puede usar Redirección contra ataques a distancia además de cuerpo a cuerpo.",
  },
  {
    level: 9,
    name: "Cuerpo de hierro etílico",
    description: "El maestro ebrio se vuelve inmune a todos los venenos, ingeridos o no.",
  },
  {
    level: 10,
    name: "Maestro ebrio perfecto",
    description:
      "El maestro ebrio puede beneficiarse en todo momento de sus habilidades 'de ebrio' sin necesidad de fingir estarlo, y su bonificador de Fuerza etílica aumenta a +6.",
  },
];

// ---------------------------------------------------------------------------
// Iniciado de la Orden del Arco (Order of the Bow Initiate)
// ---------------------------------------------------------------------------

const ORDER_OF_THE_BOW_INITIATE_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Maestría con el arco elegido",
    description:
      "Al entrar en la clase, el iniciado elige un tipo de arco (corto o largo, normal o compuesto). Obtiene un bonificador de +1 de competencia a las tiradas de ataque a distancia con ese tipo de arco.",
  },
  {
    level: 1,
    name: "Reducción de penalizador por distancia",
    description:
      "Los penalizadores por incremento de alcance al disparar con el arco elegido se reducen a la mitad (redondeando hacia abajo).",
  },
  {
    level: 2,
    name: "Disparo Rápido mejorado",
    description:
      "Si posee la dote Disparo Rápido, el ataque adicional que esta otorga deja de imponer el penalizador de -2 a todas las tiradas de ataque a distancia realizadas ese asalto con el arco elegido.",
  },
  {
    level: 3,
    name: "Dote de bonificación: Especialización en Arma",
    description:
      "El iniciado obtiene Especialización en Arma con el arco elegido como dote de bonificación, aunque no cumpla sus prerrequisitos.",
  },
  {
    level: 4,
    name: "Tiro certero",
    description:
      "El iniciado puede aceptar un penalizador voluntario de hasta su bonificador base de ataque en sus tiradas de ataque a distancia con el arco elegido, para obtener un bonificador idéntico a las tiradas de daño, de forma similar a la dote Ataque Poderoso.",
  },
  {
    level: 5,
    name: "Flecha de fase",
    description:
      "Una vez al día, como acción estándar, el iniciado puede disparar una flecha que vuela en línea recta ignorando la cobertura y las barreras no mágicas de hasta 30 centímetros de grosor hasta alcanzar a su objetivo, igual que el conjuro flecha de fase.",
  },
];

// ---------------------------------------------------------------------------
// Tempestad (Tempest)
// ---------------------------------------------------------------------------

const TEMPEST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Dote de bonificación: Defensa con Dos Armas",
    description:
      "La tempestad obtiene Defensa con Dos Armas como dote de bonificación, aunque no cumpla sus prerrequisitos.",
  },
  {
    level: 2,
    name: "Gracia en el combate (+1 CA)",
    description:
      "Mientras luche empuñando un arma cuerpo a cuerpo distinta en cada mano, la tempestad obtiene un bonificador de esquiva de +1 a la Clase de Armadura.",
  },
  {
    level: 3,
    name: "Dote de bonificación: Combate con Dos Armas Mejorado",
    description:
      "La tempestad obtiene Combate con Dos Armas Mejorado como dote de bonificación, aunque no cumpla sus prerrequisitos.",
  },
  {
    level: 4,
    name: "Gracia en el combate (+2 CA)",
    description: "El bonificador de esquiva de la Gracia en el Combate aumenta a +2.",
  },
  {
    level: 5,
    name: "Golpe gemelo",
    description:
      "Si en un mismo asalto ambas armas de la tempestad impactan al mismo objetivo, este sufre daño adicional igual a 1d6 más una vez y media su modificador de Fuerza. Además, obtiene Combate con Dos Armas Superior como dote de bonificación, aunque no cumpla sus prerrequisitos.",
  },
];

// ---------------------------------------------------------------------------
// Jinete Explorador Halfling (Halfling Outrider)
// ---------------------------------------------------------------------------

const HALFLING_OUTRIDER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Vínculo de montura",
    description:
      "El vínculo entre el jinete halfling y su montura se estrecha: a efectos de qué montura puede llevar sin penalizador, se le trata como si fuera de una categoría de tamaño mayor. Además, obtiene un bonificador de competencia de +2 a las pruebas de Montar.",
  },
  {
    level: 2,
    name: "Dote de bonificación: Cabalgar y Atacar",
    description: "El jinete obtiene Cabalgar y Atacar como dote de bonificación, aunque no cumpla sus prerrequisitos.",
  },
  {
    level: 3,
    name: "Dote de bonificación: Carga Impetuosa",
    description: "El jinete obtiene Carga Impetuosa como dote de bonificación, aunque no cumpla sus prerrequisitos.",
  },
  {
    level: 4,
    name: "Maniobra evasiva montada",
    description:
      "Una vez por asalto, el jinete puede realizar una prueba de Montar (CD 10) para desviar hacia su montura un golpe que le habría alcanzado a él, en vez de sufrirlo directamente.",
  },
  {
    level: 5,
    name: "Carga devastadora",
    description:
      "Al realizar una carga montada, el daño de los ataques con arma del jinete aumenta en 1d6. Además, obtiene Arrollar como dote de bonificación, aunque no cumpla sus prerrequisitos.",
  },
];

// ---------------------------------------------------------------------------
// Sabueso de Sangre (Bloodhound)
// ---------------------------------------------------------------------------

const BLOODHOUND_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Presa predilecta",
    description:
      "El sabueso de sangre elige a un individuo concreto como presa. Obtiene un bonificador de +2 a las pruebas de Buscar, Reunir Información, Averiguar Intenciones y Avistar realizadas para localizarlo, así como +2 al daño contra él en combate.",
  },
  {
    level: 1,
    name: "Dote de bonificación",
    description:
      "El sabueso de sangre elige una dote entre Alerta, Voluntad de Hierro, Iniciativa Mejorada, Investigador, Negociador o Correr, aunque no cumpla sus prerrequisitos.",
  },
  {
    level: 2,
    name: "Esquiva sobrenatural",
    description:
      "El sabueso de sangre conserva su bonificador de Destreza a la Clase de Armadura incluso cuando es sorprendido o atacado por un enemigo invisible.",
  },
  {
    level: 3,
    name: "Dote de bonificación",
    description: "El sabueso de sangre elige una segunda dote de la misma lista del 1er nivel.",
  },
  {
    level: 4,
    name: "Rastro infalible",
    description:
      "El sabueso de sangre ya no sufre penalizadores a las pruebas de Supervivencia para seguir un rastro debido al mal tiempo, el terreno difícil o el paso del tiempo.",
  },
  {
    level: 5,
    name: "Sabueso perfecto",
    description:
      "Una vez al día, el sabueso de sangre puede determinar la dirección y la distancia aproximada hasta su presa predilecta actual, igual que el conjuro descubrir localización, sin importar la distancia o el plano en que se encuentre.",
  },
];

export const CW_CLASSES: ClassDef[] = [
  {
    id: "cw-dervish",
    name: "Derviche (Dervish)",
    source: "complete-warrior",
    description:
      "Un guerrero ágil que convierte el combate en una danza mortal, moviéndose sin cesar por el campo de batalla mientras encadena golpes con un arma cortante ligera.",
    hitDie: 10,
    skillPointsPerLevel: 6,
    classSkills: [
      "balance",
      "climb",
      "craft",
      "diplomacy",
      "handle-animal",
      "intimidate",
      "jump",
      "perform",
      "profession",
      "ride",
      "tumble",
    ],
    babProgression: "completa",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: DERVISH_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Destreza 13",
        check: (ctx) => ctx.abilityScores.dex >= 13,
      },
      {
        description: "Inteligencia 8",
        check: (ctx) => ctx.abilityScores.int >= 8,
      },
      {
        description: "Soltura con el arma cortante elegida para el baile (habitualmente cimitarra)",
        check: (ctx) => ctx.featIds.has("weapon-focus"),
      },
      {
        description: "Interpretar (danza): 3 rangos",
        check: (ctx) => (ctx.skillRanks["perform"] ?? 0) >= 3,
      },
      {
        description: "Piruetas: 5 rangos",
        check: (ctx) => (ctx.skillRanks["tumble"] ?? 0) >= 5,
      },
      {
        description: "Competencia con el arma elegida para el baile del derviche y capacidad de hablar",
      },
    ],
  },
  {
    id: "cw-drunken-master",
    name: "Maestro Ebrio (Drunken Master)",
    source: "complete-warrior",
    description:
      "Un monje que ha desarrollado un estilo de combate imprevisible inspirado en la embriaguez, tan eficaz esquivando como golpeando, capaz de convertir cada tambaleo en una oportunidad.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "balance",
      "climb",
      "craft",
      "escape-artist",
      "hide",
      "jump",
      "listen",
      "move-silently",
      "perform",
      "profession",
      "sense-motive",
      "spot",
      "tumble",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "buena", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: DRUNKEN_MASTER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Ataque Desarmado Mejorado",
        check: (ctx) => ctx.featIds.has("improved-unarmed-strike"),
      },
      {
        description: "Derribo Mejorado",
        check: (ctx) => ctx.featIds.has("improved-trip"),
      },
      {
        description: "Interpretar: 3 rangos",
        check: (ctx) => (ctx.skillRanks["perform"] ?? 0) >= 3,
      },
      {
        description: "Capacidad de usar Torrente de Golpes como un monje",
      },
      {
        description: "Alineamiento: cualquiera no legal",
      },
    ],
  },
  {
    id: "cw-order-of-the-bow-initiate",
    name: "Iniciado de la Orden del Arco (Order of the Bow Initiate)",
    source: "complete-warrior",
    description:
      "Un arquero devoto que ha unido su destino a un único tipo de arco, refinando su puntería hasta convertirla en un arte casi sobrenatural.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "climb",
      "craft",
      "handle-animal",
      "hide",
      "jump",
      "listen",
      "move-silently",
      "profession",
      "ride",
      "spot",
    ],
    babProgression: "completa",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: ORDER_OF_THE_BOW_INITIATE_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Disparo a Bocajarro",
        check: (ctx) => ctx.featIds.has("point-blank-shot"),
      },
      {
        description: "Disparo Certero",
        check: (ctx) => ctx.featIds.has("precise-shot"),
      },
      {
        description: "Soltura con el arco elegido",
        check: (ctx) => ctx.featIds.has("weapon-focus"),
      },
      {
        description: "Bonificador base de ataque +6",
        check: (ctx) => ctx.babTotal >= 6,
      },
    ],
  },
  {
    id: "cw-tempest",
    name: "Tempestad (Tempest)",
    source: "complete-warrior",
    description:
      "Un maestro del combate con dos armas que se mueve por el campo de batalla como una tormenta de acero, encadenando golpes de ambas manos con una fluidez letal.",
    hitDie: 10,
    skillPointsPerLevel: 4,
    classSkills: ["balance", "climb", "craft", "escape-artist", "intimidate", "jump", "perform", "profession", "tumble"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: TEMPEST_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Destreza 15",
        check: (ctx) => ctx.abilityScores.dex >= 15,
      },
      {
        description: "Combate con Dos Armas",
        check: (ctx) => ctx.featIds.has("two-weapon-fighting"),
      },
      {
        description: "Amago (Dodge)",
        check: (ctx) => ctx.featIds.has("dodge"),
      },
      {
        description: "Movilidad",
        check: (ctx) => ctx.featIds.has("mobility"),
      },
      {
        description: "Bonificador base de ataque +6",
        check: (ctx) => ctx.babTotal >= 6,
      },
    ],
  },
  {
    id: "cw-halfling-outrider",
    name: "Jinete Explorador Halfling (Halfling Outrider)",
    source: "complete-warrior",
    description:
      "Un halfling que ha llevado el combate montado a su máxima expresión, formando con su montura un equipo capaz de acosar y abatir enemigos mucho mayores que ellos.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: ["climb", "craft", "handle-animal", "jump", "listen", "profession", "ride", "spot", "survival", "swim"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: HALFLING_OUTRIDER_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Raza: mediano (halfling)",
      },
      {
        description: "Montar: 8 rangos",
        check: (ctx) => (ctx.skillRanks["ride"] ?? 0) >= 8,
      },
      {
        description: "Combatir desde Montura",
        check: (ctx) => ctx.featIds.has("mounted-combat"),
      },
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
    ],
  },
  {
    id: "cw-bloodhound",
    name: "Sabueso de Sangre (Bloodhound)",
    source: "complete-warrior",
    description:
      "Un cazarrecompensas y rastreador implacable, especializado en localizar y dar caza a un fugitivo concreto hasta los confines del mundo.",
    hitDie: 8,
    skillPointsPerLevel: 6,
    classSkills: [
      "bluff",
      "diplomacy",
      "disguise",
      "gather-information",
      "intimidate",
      "knowledge-local",
      "listen",
      "search",
      "sense-motive",
      "spot",
      "survival",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: BLOODHOUND_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Seguir Rastro",
        check: (ctx) => ctx.featIds.has("track"),
      },
      {
        description: "Reunir Información: 4 rangos",
        check: (ctx) => (ctx.skillRanks["gather-information"] ?? 0) >= 4,
      },
      {
        description: "Buscar: 4 rangos",
        check: (ctx) => (ctx.skillRanks["search"] ?? 0) >= 4,
      },
      {
        description: "Averiguar Intenciones: 4 rangos",
        check: (ctx) => (ctx.skillRanks["sense-motive"] ?? 0) >= 4,
      },
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
    ],
  },
];
