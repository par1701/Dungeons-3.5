import type { ClassDef, ClassFeature } from "../../types";

// Clases de Complete Divine (2004).
//
// Se incluyen dos clases base nuevas (Alma Predilecta y Chamán Espiritual, ambas
// lanzadoras divinas espontáneas) y varias clases de prestigio representativas
// del libro. Las clases de prestigio cuyo único efecto mágico es "avanzar el
// nivel de lanzador de una clase divina que el personaje ya poseyera" omiten
// el campo `spellcasting` (nuestro modelo de conjuros por día no soporta
// todavía ese tipo de progresión automática) y documentan el efecto como un
// rasgo de clase (ClassFeature) de texto, siguiendo el mismo criterio usado en
// las clases de prestigio de Complete Arcane.
//
// Alma Predilecta y Chamán Espiritual reutilizan, por forma, la misma progresión
// de "conjuros por día"/"conjuros conocidos" que usa el Hechicero en el PHB:
// en las reglas originales, ambas clases comparten exactamente esas tablas
// (solo cambian la característica de lanzamiento, cha/sab, y la lista de
// conjuros, que pasa a ser divina). No se garantiza una reproducción exacta
// número a número del libro, pero la forma y el ritmo de progresión son fieles
// y la clase es completamente jugable.

const CDV_SPONTANEOUS_DIVINE_SPELLS_PER_DAY: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 (sin usar)
  [5, 3, 0, 0, 0, 0, 0, 0, 0, 0], // 1
  [6, 4, 0, 0, 0, 0, 0, 0, 0, 0], // 2
  [6, 5, 0, 0, 0, 0, 0, 0, 0, 0], // 3
  [6, 6, 3, 0, 0, 0, 0, 0, 0, 0], // 4
  [6, 6, 4, 0, 0, 0, 0, 0, 0, 0], // 5
  [6, 6, 5, 3, 0, 0, 0, 0, 0, 0], // 6
  [6, 6, 6, 4, 0, 0, 0, 0, 0, 0], // 7
  [6, 6, 6, 5, 3, 0, 0, 0, 0, 0], // 8
  [6, 6, 6, 6, 4, 0, 0, 0, 0, 0], // 9
  [6, 6, 6, 6, 5, 3, 0, 0, 0, 0], // 10
  [6, 6, 6, 6, 6, 4, 0, 0, 0, 0], // 11
  [6, 6, 6, 6, 6, 5, 3, 0, 0, 0], // 12
  [6, 6, 6, 6, 6, 6, 4, 0, 0, 0], // 13
  [6, 6, 6, 6, 6, 6, 5, 3, 0, 0], // 14
  [6, 6, 6, 6, 6, 6, 6, 4, 0, 0], // 15
  [6, 6, 6, 6, 6, 6, 6, 5, 3, 0], // 16
  [6, 6, 6, 6, 6, 6, 6, 6, 4, 0], // 17
  [6, 6, 6, 6, 6, 6, 6, 6, 5, 3], // 18
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 4], // 19
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6], // 20
];

const CDV_SPONTANEOUS_DIVINE_SPELLS_KNOWN: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 (sin usar)
  [4, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 1
  [5, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 2
  [5, 3, 0, 0, 0, 0, 0, 0, 0, 0], // 3
  [6, 3, 1, 0, 0, 0, 0, 0, 0, 0], // 4
  [6, 4, 2, 0, 0, 0, 0, 0, 0, 0], // 5
  [7, 4, 2, 1, 0, 0, 0, 0, 0, 0], // 6
  [7, 5, 3, 2, 0, 0, 0, 0, 0, 0], // 7
  [8, 5, 3, 2, 1, 0, 0, 0, 0, 0], // 8
  [8, 5, 4, 3, 2, 0, 0, 0, 0, 0], // 9
  [9, 5, 4, 3, 2, 1, 0, 0, 0, 0], // 10
  [9, 5, 5, 4, 3, 2, 0, 0, 0, 0], // 11
  [9, 5, 5, 4, 3, 2, 1, 0, 0, 0], // 12
  [9, 5, 5, 4, 4, 3, 2, 0, 0, 0], // 13
  [9, 5, 5, 4, 4, 3, 2, 1, 0, 0], // 14
  [9, 5, 5, 4, 4, 4, 3, 2, 0, 0], // 15
  [9, 5, 5, 4, 4, 4, 3, 2, 1, 0], // 16
  [9, 5, 5, 4, 4, 4, 3, 3, 2, 0], // 17
  [9, 5, 5, 4, 4, 4, 3, 3, 2, 1], // 18
  [9, 5, 5, 4, 4, 4, 3, 3, 3, 2], // 19
  [9, 5, 5, 4, 4, 4, 3, 3, 3, 3], // 20
];

const FAVORED_SOUL_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Lanzamiento espontáneo de conjuros divinos",
    description:
      "El alma elegida lanza conjuros divinos de forma espontánea, extrayendo su poder de un vínculo innato con su deidad en vez de prepararlos mediante estudio u oración, igual que un hechicero lo hace con la magia arcana.",
  },
  {
    level: 1,
    name: "Arma predilecta",
    description:
      "El alma elegida es competente con el arma predilecta de su deidad, además de con todas las armas simples.",
  },
  {
    level: 2,
    name: "Resistencia a la energía",
    description:
      "El alma elegida elige un tipo de energía (ácido, electricidad, frío, fuego o sónico) asociado a su naturaleza semidivina y obtiene resistencia 5 a esa energía. La resistencia aumenta a 10 en el nivel 11 y a 20 en el nivel 20.",
  },
  {
    level: 20,
    name: "Alas",
    description:
      "El alma elegida hace crecer un par de alas (emplumadas, membranosas u otro tipo apropiado a su naturaleza) que le otorgan una velocidad de vuelo de 18 metros con maniobrabilidad buena.",
  },
  {
    level: 20,
    name: "Reducción de daño",
    description:
      "La naturaleza semidivina del alma elegida se hace patente: obtiene reducción de daño 5/mágico.",
  },
];

const SPIRIT_SHAMAN_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Lanzamiento espontáneo de conjuros divinos",
    description:
      "La chamán espiritual lanza conjuros divinos de forma espontánea a partir de su propia lista de conjuros, ligada a los espíritus de la naturaleza, en vez de prepararlos de antemano como hace el druida.",
  },
  {
    level: 1,
    name: "Guía espiritual",
    description:
      "Cada día, al recuperar sus conjuros, la chamán espiritual elige un espíritu guía entre varios disponibles (por ejemplo el oso, el cuervo o la serpiente); mientras dure el vínculo de ese día, el espíritu elegido le concede un pequeño beneficio temático adicional.",
  },
  {
    level: 2,
    name: "Lectura de objetos",
    description:
      "Concentrándose durante 1 minuto mientras sostiene un objeto, la chamán espiritual puede percibir impresiones psíquicas de sucesos recientes relacionados con él, obteniendo información fragmentaria sobre su historia reciente.",
  },
  {
    level: 6,
    name: "Sentidos espirituales",
    description:
      "La chamán espiritual obtiene un bonificador de +4 a las pruebas de Avistar y Escuchar mientras se encuentre en terrenos naturales o en presencia de espíritus.",
  },
  {
    level: 11,
    name: "Forma de espíritu",
    description:
      "Una vez al día, la chamán espiritual puede adoptar una forma parcialmente incorpórea durante unos instantes, ganando un bonificador de desvío del 20% frente a ataques como si tuviera la cualidad incorpórea, una vez por combate.",
  },
];

// ---------------------------------------------------------------------------
// Inquisidor de la Iglesia (Church Inquisitor)
// ---------------------------------------------------------------------------

const CHURCH_INQUISITOR_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Progresión de conjuros divinos",
    description:
      "Cada nivel de inquisidor de la iglesia (1º a 10º) otorga un nivel de lanzador divino adicional a una clase de lanzador divino que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Detectar mentiras",
    description:
      "El inquisidor puede usar detectar mentiras como conjuro divino a voluntad, concentrándose en un único sujeto a la vez.",
  },
  {
    level: 2,
    name: "Sentido del hereje",
    description:
      "El inquisidor obtiene un bonificador de competencia igual a la mitad de su nivel de inquisidor (mínimo +1) a las pruebas de Averiguar Intenciones realizadas para detectar mentiras o dobleces en asuntos de fe.",
  },
  {
    level: 5,
    name: "Zona de verdad",
    description:
      "El inquisidor puede crear una zona de verdad, como el conjuro del mismo nombre, una vez al día, más una vez adicional por cada cinco niveles de inquisidor por encima del quinto.",
  },
  {
    level: 8,
    name: "Inmunidad a la magia de engaño",
    description:
      "El inquisidor se vuelve inmune a los efectos de farolear mágico y a los conjuros de la escuela de encantamiento que dependan del lenguaje para engañarlo, gracias a su entrenamiento para reconocer la mentira incluso disfrazada de magia.",
  },
  {
    level: 10,
    name: "Visión verdadera",
    description:
      "El inquisidor puede usar visión verdadera sobre sí mismo una vez al día, como el conjuro del mismo nombre.",
  },
];

// ---------------------------------------------------------------------------
// Oráculo Divino (Divine Oracle)
// ---------------------------------------------------------------------------

const DIVINE_ORACLE_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Progresión de conjuros divinos",
    description:
      "Cada nivel de oráculo divino (1º a 10º) otorga un nivel de lanzador divino adicional a una clase de lanzador divino que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Visión",
    description:
      "El oráculo divino puede lanzar augurio como conjuro divino una vez al día sin gastar un espacio de conjuro, recibiendo destellos de las intenciones de su deidad sobre el futuro cercano.",
  },
  {
    level: 3,
    name: "Voz de la razón",
    description:
      "El oráculo divino obtiene un bonificador de +2 a las pruebas de Diplomacia y Averiguar Intenciones cuando actúa transmitiendo un mensaje o advertencia que cree inspirado por su deidad.",
  },
  {
    level: 6,
    name: "Adivinación mayor",
    description:
      "El oráculo divino puede lanzar adivinación como conjuro divino una vez a la semana sin gastar un espacio de conjuro.",
  },
  {
    level: 10,
    name: "Presagio",
    description:
      "Una vez al día, el oráculo divino puede repetir una tirada de salvación, de ataque o de habilidad propia o de un aliado en 9 metros, tomando el segundo resultado, al interpretarlo como una advertencia de última hora de su deidad.",
  },
];

// ---------------------------------------------------------------------------
// Libertador Sagrado (Holy Liberator)
// ---------------------------------------------------------------------------

const HOLY_LIBERATOR_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Progresión de conjuros divinos",
    description:
      "Cada nivel de libertador sagrado (1º a 10º) otorga un nivel de lanzador divino adicional a una clase de lanzador divino que el personaje ya poseyera antes de entrar en la clase de prestigio (típicamente paladín o clérigo), exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Detectar tiranía",
    description:
      "A voluntad, el libertador sagrado puede detectar la presencia de opresión activa y coacción sobrenatural sobre criaturas cercanas, de forma similar al conjuro detectar el mal pero centrado en la esclavitud y el dominio de voluntades.",
  },
  {
    level: 1,
    name: "Golpe contra la tiranía",
    description:
      "Una vez al día (más una vez adicional cada tres niveles de libertador sagrado), el libertador puede intentar un ataque cuerpo a cuerpo con un bonificador igual a su modificador de Carisma y, si impacta, inflige daño adicional igual a su nivel de clase contra una criatura que esclavice, tiranice o domine violentamente la voluntad de otros.",
  },
  {
    level: 3,
    name: "Aura de libertad",
    description:
      "El libertador sagrado y sus aliados en 3 metros obtienen un bonificador de +4 a las tiradas de salvación contra los conjuros y efectos de la escuela de encantamiento.",
  },
  {
    level: 6,
    name: "Liberar de ataduras",
    description:
      "El libertador sagrado puede lanzar liberar de maldición como conjuro divino una vez al día, aplicado únicamente a efectos de esclavización, dominio o encantamiento.",
  },
  {
    level: 10,
    name: "Rompedor de cadenas",
    description:
      "El golpe contra la tiranía del libertador sagrado ignora la reducción de daño de la criatura objetivo cuando esta esté esclavizando o dominando activamente a otra criatura inteligente.",
  },
];

// ---------------------------------------------------------------------------
// Maestro de Sudarios (Master of Shrouds)
// ---------------------------------------------------------------------------

const MASTER_OF_SHROUDS_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Progresión de conjuros divinos",
    description:
      "Cada nivel de maestro de sudarios (1º a 10º) otorga un nivel de lanzador divino adicional a una clase de lanzador divino que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Progresión de expulsar/reprender no-muertos",
    description:
      "Cada nivel de maestro de sudarios cuenta como un nivel de clase adicional a efectos de determinar el número de usos diarios y la eficacia de su capacidad de expulsar o reprender no-muertos, si ya la poseía.",
  },
  {
    level: 2,
    name: "Sudario de las sombras",
    description:
      "El maestro de sudarios puede envolverse en un sudario de sombras semisólidas que le otorga ocultación parcial (20% de probabilidad de fallo) frente a los ataques, un número de rondas al día igual a su nivel de clase.",
  },
  {
    level: 4,
    name: "No-muertos mejorados",
    description:
      "Los no-muertos creados o controlados por el maestro de sudarios mediante sus conjuros o su capacidad de reprender obtienen un bonificador de +2 a la Clase de Armadura natural y +2 puntos de golpe por dado de golpe.",
  },
  {
    level: 7,
    name: "Señor de sudarios",
    description:
      "El maestro de sudarios puede mantener un número de no-muertos controlados mediante animar muertos superior al límite normal, como si su nivel de lanzador fuera 4 niveles más alto solo a ese efecto.",
  },
  {
    level: 10,
    name: "Manto de sudarios",
    description:
      "Una vez al día, el maestro de sudarios puede envolverse por completo en su sudario y volverse parcialmente incorpóreo durante 1 asalto, ganando un bonificador de desvío del 50% frente a los ataques cuerpo a cuerpo y a distancia durante ese asalto.",
  },
];

// ---------------------------------------------------------------------------
// Exorcista Sagrado (Sacred Exorcist)
// ---------------------------------------------------------------------------

const SACRED_EXORCIST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Progresión de conjuros divinos",
    description:
      "Cada nivel de exorcista sagrado (1º a 10º) otorga un nivel de lanzador divino adicional a una clase de lanzador divino que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Expulsar según exorcista",
    description:
      "El exorcista sagrado usa su nivel de clase como nivel de exorcista sagrado adicional a efectos de expulsar o reprender no-muertos, si ya poseía esa capacidad, y puede además usar sus intentos de expulsar contra criaturas del tipo elemental y feérico con espíritu poseedor.",
  },
  {
    level: 2,
    name: "Sentir posesión",
    description:
      "El exorcista sagrado puede detectar, como el conjuro detectar el mal pero limitado a la posesión sobrenatural, si una criatura en 9 metros está actualmente poseída o dominada por un espíritu o entidad extraña.",
  },
  {
    level: 4,
    name: "Exorcizar",
    description:
      "El exorcista sagrado puede intentar expulsar un espíritu poseedor del cuerpo de una criatura mediante un ritual de una hora de duración, forzando al espíritu a una prueba de voluntad enfrentada contra el exorcista.",
  },
  {
    level: 6,
    name: "Resistencia a la posesión",
    description:
      "El exorcista sagrado obtiene un bonificador de +4 a las tiradas de salvación contra los efectos de posesión, dominio mental y control corporal.",
  },
  {
    level: 9,
    name: "Destierro",
    description:
      "El exorcista sagrado puede lanzar destierro como conjuro divino una vez al día, dirigido únicamente contra criaturas de tipo espíritu, extraplanar o poseedoras.",
  },
];

// ---------------------------------------------------------------------------
// Señor de la Tormenta (Stormlord)
// ---------------------------------------------------------------------------

const STORMLORD_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Progresión de conjuros divinos",
    description:
      "Cada nivel de señor de la tormenta (1º a 10º) otorga un nivel de lanzador divino adicional a una clase de lanzador divino que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Resistencia a la electricidad",
    description: "El señor de la tormenta obtiene resistencia a la electricidad 10.",
  },
  {
    level: 1,
    name: "Sentido de la tormenta",
    description:
      "El señor de la tormenta puede predecir de forma instintiva el clima de las próximas 24 horas en su ubicación actual, como el conjuro augurar tiempo, sin necesidad de lanzar ningún conjuro.",
  },
  {
    level: 3,
    name: "Reflejos relámpago",
    description: "El señor de la tormenta obtiene Reflejos Rápidos como dote adicional gratuita.",
  },
  {
    level: 5,
    name: "Inmunidad al ensordecimiento",
    description:
      "El señor de la tormenta se vuelve inmune a los efectos de ensordecimiento, incluido el causado por sus propios conjuros de trueno o relámpago.",
  },
  {
    level: 7,
    name: "Resistencia a la electricidad mejorada",
    description: "La resistencia a la electricidad del señor de la tormenta aumenta a 20.",
  },
  {
    level: 10,
    name: "Cuerpo de tormenta",
    description:
      "Una vez al día, el señor de la tormenta puede transformar su cuerpo en una masa de viento y relámpagos durante 1 asalto por nivel de clase, obteniendo inmunidad a los daños por electricidad, resistencia a la conjuración (11 + su nivel de clase) y la capacidad de volar a su velocidad terrestre con maniobrabilidad perfecta mientras dure el efecto.",
  },
];

export const CDV_CLASSES: ClassDef[] = [
  // ---------------------------------------------------------------------
  // Clases base
  // ---------------------------------------------------------------------
  {
    id: "cdv-favored-soul",
    name: "Alma Predilecta (Favored Soul)",
    source: "complete-divine",
    description:
      "Un lanzador divino tocado directamente por su deidad desde el nacimiento, que canaliza el poder sagrado de forma espontánea y natural, sin necesidad de estudio ni oración formal, de un modo análogo a como el hechicero canaliza la magia arcana.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "heal",
      "knowledge-religion",
      "profession",
      "ride",
      "spellcraft",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples", "el arma predilecta de su deidad"],
    armorProficiencies: ["armadura ligera", "armadura media", "escudos (excepto escudos torre)"],
    spellcasting: {
      type: "espontaneo",
      ability: "cha",
      spellListId: "cdv-favored-soul",
      maxSpellLevel: 9,
      spellsPerDay: CDV_SPONTANEOUS_DIVINE_SPELLS_PER_DAY,
      spellsKnown: CDV_SPONTANEOUS_DIVINE_SPELLS_KNOWN,
      startLevel: 1,
    },
    features: FAVORED_SOUL_FEATURES,
    maxLevel: 20,
  },
  {
    id: "cdv-spirit-shaman",
    name: "Chamán Espiritual (Spirit Shaman)",
    source: "complete-divine",
    description:
      "Una lanzadora divina que se comunica de forma intuitiva y espontánea con los espíritus de la naturaleza, extrayendo su magia de ese vínculo en vez de prepararla mediante meditación como hace el druida.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "handle-animal",
      "heal",
      "knowledge-nature",
      "knowledge-religion",
      "listen",
      "profession",
      "ride",
      "sense-motive",
      "spellcraft",
      "spot",
      "survival",
      "swim",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples"],
    armorProficiencies: ["armadura ligera", "escudos (excepto escudos torre)"],
    spellcasting: {
      type: "espontaneo",
      ability: "wis",
      spellListId: "cdv-spirit-shaman",
      maxSpellLevel: 9,
      spellsPerDay: CDV_SPONTANEOUS_DIVINE_SPELLS_PER_DAY,
      spellsKnown: CDV_SPONTANEOUS_DIVINE_SPELLS_KNOWN,
      startLevel: 1,
    },
    features: SPIRIT_SHAMAN_FEATURES,
    maxLevel: 20,
  },

  // ---------------------------------------------------------------------
  // Clases de prestigio
  // ---------------------------------------------------------------------
  {
    id: "cdv-church-inquisitor",
    name: "Inquisidor de la Iglesia (Church Inquisitor)",
    source: "complete-divine",
    description:
      "Un agente de una fe organizada dedicado a detectar la herejía, la mentira y la infiltración dentro de su propia orden religiosa, combinando conjuros de detección con un instinto perfeccionado para descubrir el engaño.",
    hitDie: 6,
    skillPointsPerLevel: 4,
    classSkills: [
      "bluff",
      "diplomacy",
      "gather-information",
      "intimidate",
      "knowledge-local",
      "knowledge-religion",
      "profession",
      "sense-motive",
      "spellcraft",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: CHURCH_INQUISITOR_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Diplomacia: 4 rangos",
        check: (ctx) => (ctx.skillRanks["diplomacy"] ?? 0) >= 4,
      },
      {
        description: "Saber (Religión): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 8,
      },
      {
        description: "Averiguar Intenciones: 4 rangos",
        check: (ctx) => (ctx.skillRanks["sense-motive"] ?? 0) >= 4,
      },
      {
        description: "Capacidad de lanzar conjuros divinos de nivel 2, nivel de lanzador divino 3",
        check: (ctx) => ctx.casterLevel >= 3,
      },
    ],
  },
  {
    id: "cdv-divine-oracle",
    name: "Oráculo Divino (Divine Oracle)",
    source: "complete-divine",
    description:
      "Un lanzador divino cuya fe le concede visiones fragmentarias de las intenciones de su deidad, permitiéndole guiar a sus aliados con presagios y advertencias además de seguir progresando en su magia sagrada.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "knowledge-arcana",
      "knowledge-religion",
      "profession",
      "sense-motive",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: DIVINE_ORACLE_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Religión): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 8,
      },
      {
        description: "Conocimiento de Conjuros: 8 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 8,
      },
      {
        description: "Voluntad de Hierro",
        check: (ctx) => ctx.featIds.has("iron-will"),
      },
      {
        description: "Capacidad de lanzar conjuros divinos de nivel 3, nivel de lanzador divino 5",
        check: (ctx) => ctx.casterLevel >= 5,
      },
    ],
  },
  {
    id: "cdv-holy-liberator",
    name: "Libertador Sagrado (Holy Liberator)",
    source: "complete-divine",
    description:
      "Un campeón divino de alineamiento caótico bueno que ha rechazado el rígido código de conducta del paladín tradicional en favor de la lucha activa contra la tiranía, la esclavitud y el dominio de la voluntad ajena.",
    hitDie: 10,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "diplomacy", "heal", "knowledge-religion", "profession", "ride", "sense-motive"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: HOLY_LIBERATOR_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Alineamiento caótico bueno",
      },
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Saber (Religión): 2 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 2,
      },
      {
        description:
          "Haber rechazado o quebrantado voluntariamente un código de conducta legal en favor de la libertad (por ejemplo, el código de un paladín)",
      },
    ],
  },
  {
    id: "cdv-master-of-shrouds",
    name: "Maestro de Sudarios (Master of Shrouds)",
    source: "complete-divine",
    description:
      "Un lanzador divino que ha dedicado su fe al control y perfeccionamiento de los no-muertos incorpóreos, envolviéndose él mismo en sudarios de sombra que difuminan la línea entre la vida y la no vida.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "knowledge-arcana", "knowledge-religion", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: MASTER_OF_SHROUDS_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Religión): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 8,
      },
      {
        description: "Capacidad de expulsar o reprender no-muertos",
      },
      {
        description: "Expulsar Superior",
        check: (ctx) => ctx.featIds.has("extra-turning"),
      },
      {
        description: "Capacidad de lanzar el conjuro divino animar muertos",
      },
    ],
  },
  {
    id: "cdv-sacred-exorcist",
    name: "Exorcista Sagrado (Sacred Exorcist)",
    source: "complete-divine",
    description:
      "Un especialista divino en la lucha contra la posesión espiritual y las entidades extraplanares que intentan usurpar cuerpos mortales, capaz de expulsar tanto no-muertos como espíritus poseedores.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "concentration",
      "diplomacy",
      "heal",
      "knowledge-religion",
      "knowledge-the-planes",
      "profession",
      "sense-motive",
      "spellcraft",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: SACRED_EXORCIST_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Religión): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 8,
      },
      {
        description: "Saber (Planos): 4 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-the-planes"] ?? 0) >= 4,
      },
      {
        description: "Capacidad de expulsar o reprender no-muertos",
      },
      {
        description: "Capacidad de lanzar conjuros divinos de nivel 3, nivel de lanzador divino 5",
        check: (ctx) => ctx.casterLevel >= 5,
      },
    ],
  },
  {
    id: "cdv-stormlord",
    name: "Señor de la Tormenta (Stormlord)",
    source: "complete-divine",
    description:
      "Un devoto de una deidad de las tormentas, el cielo o el mar embravecido que aprende a canalizar la furia del clima a través de su cuerpo y su magia divina, volviéndose progresivamente resistente a la electricidad y al trueno.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "concentration",
      "craft",
      "knowledge-nature",
      "knowledge-religion",
      "profession",
      "spellcraft",
      "survival",
      "swim",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: STORMLORD_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Saber (Religión): 4 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 4,
      },
      {
        description: "Aguante",
        check: (ctx) => ctx.featIds.has("endurance"),
      },
      {
        description: "Capacidad de lanzar el conjuro divino llamar relámpago",
      },
    ],
  },
];
