import type { ClassDef, FeatPrereqContext } from "../../types";

// Clases de prestigio de Complete Mage (2006).
//
// No se incluye al Nombrador Verdadero (Truenamer): es una clase base (no de
// prestigio) que depende por completo de un subsistema propio (la habilidad
// Truehablar y el desgaste de las palabras verdaderas), ajeno al resto de
// las reglas ya modeladas.
//
// Tampoco se incluyen las clases y dotes que dependen de la Reserva de
// Conjuros o de las Palabras de Poder (dos subsistemas de lanzamiento
// alternativo introducidos en este libro): esta app solo modela conjuros
// por día al estilo mago/hechicero/clérigo, así que ese contenido queda
// fuera a propósito.
//
// Como en Complete Arcane, la mayoría de estas clases de prestigio hacen
// progresar el nivel de lanzador de una clase arcana (u otra) que el
// personaje ya poseía, en vez de tener su propia tabla independiente de
// conjuros por día. Ese efecto se documenta como un rasgo de clase
// (ClassFeature) de texto en cada nivel, y el campo `spellcasting` se omite
// a propósito, siguiendo la misma convención que el resto de archivos de
// este proyecto.

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

// ---------------------------------------------------------------------------
// Acorde Sublime (Sublime Chord)
// ---------------------------------------------------------------------------

const SUBLIME_CHORD_FEATURES = [
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de acorde sublime (1º a 10º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano espontáneo que el personaje ya poseyera antes de entrar en la clase de prestigio (normalmente bardo), exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Música de Bardo",
    description: "El acorde sublime sigue acumulando usos diarios de música de bardo como si sumara sus niveles de esta clase a su nivel de bardo para ese único propósito.",
  },
  {
    level: 2,
    name: "Canción del Más Allá",
    description:
      "Una vez al día, el acorde sublime puede interpretar una melodía que otorga a todos los aliados que puedan oírla un bonificador de +2 a una tirada de salvación contra un efecto de miedo o de encantamiento.",
  },
  {
    level: 3,
    name: "Voz Sublime",
    description:
      "Una vez al día, el acorde sublime puede lanzar espontáneamente un conjuro que no conozca, siempre que algún aliado presente lo conozca y sea de un nivel que el acorde sublime sea capaz de lanzar; el conjuro consume un espacio de conjuro propio del acorde sublime.",
  },
  {
    level: 5,
    name: "Música Feérica Mejorada",
    description: "Los efectos de encantamiento de la música de bardo del acorde sublime aumentan su CD de salvación en +2.",
  },
  {
    level: 6,
    name: "Voz Sublime Mejorada",
    description: "El acorde sublime puede usar Voz Sublime dos veces al día en vez de una.",
  },
  {
    level: 8,
    name: "Melodía de las Esferas",
    description:
      "Una vez al día, el acorde sublime puede interpretar una melodía que funciona como el conjuro disipar magia al lanzarlo un lanzador de su nivel de lanzador total, usando su música en vez de un conjuro preparado o conocido.",
  },
  {
    level: 10,
    name: "Coro de la Creación",
    description:
      "El acorde sublime culmina su comunión con la música primigenia del mundo: puede usar Voz Sublime tres veces al día y, una vez por semana, interpretar una melodía equivalente al conjuro deseo limitado.",
  },
];

// ---------------------------------------------------------------------------
// Hilandera del Destino (Fatespinner)
// ---------------------------------------------------------------------------

const FATESPINNER_FEATURES = [
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de hilandera del destino (1º a 10º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Golpe del Destino",
    description:
      "Un número de veces al día igual a 3 + su modificador de Inteligencia, la hilandera del destino puede obligar a una criatura a la vista a repetir una tirada de d20 que acabe de realizar (propia, de un aliado o de un enemigo), quedándose con el resultado que ella elija de los dos.",
  },
  {
    level: 3,
    name: "Favor del Destino",
    description: "Una vez al día, la hilandera del destino puede otorgarse a sí misma o a un aliado a la vista un bonificador de suerte de +4 a una única tirada, declarado antes de conocer el resultado.",
  },
  {
    level: 5,
    name: "Golpe del Destino Mejorado",
    description: "La hilandera del destino puede usar Golpe del Destino como una acción rápida en vez de una acción estándar.",
  },
  {
    level: 7,
    name: "Tejer el Destino",
    description: "Una vez por semana, la hilandera del destino puede repetir cualquier tirada realizada por cualquier criatura en un radio de 30 metros, incluso si no participó directamente en la escena.",
  },
  {
    level: 10,
    name: "Ama del Destino",
    description: "El número de usos diarios de Golpe del Destino ya no está limitado; la hilandera del destino puede forzar una repetición de tirada de d20 tantas veces al día como desee, dentro de lo razonable a discreción del DJ.",
  },
];

// ---------------------------------------------------------------------------
// Arcanamach Suelio (Suel Arcanamach)
// ---------------------------------------------------------------------------

const SUEL_ARCANAMACH_FEATURES = [
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos Parcial",
    description:
      "En los niveles 1º, 3º, 5º, 7º y 9º de arcanamach suelio, el personaje obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase). Los niveles pares no otorgan este beneficio.",
  },
  {
    level: 1,
    name: "Competencia con Armas Marciales",
    description: "El arcanamach suelio obtiene competencia con todas las armas marciales.",
  },
  {
    level: 2,
    name: "Dote de Combate Adicional",
    description: "El arcanamach suelio obtiene una dote de combate adicional que cumpla sus requisitos.",
  },
  {
    level: 4,
    name: "Fusión de Espada y Conjuro",
    description: "Una vez por combate, el arcanamach suelio puede lanzar un conjuro de tiempo de lanzamiento de 1 acción estándar como parte del mismo asalto en que realiza una carga, sin perder su ataque de carga.",
  },
  {
    level: 6,
    name: "Reducción de Daño 2/-",
    description: "El cuerpo del arcanamach suelio se endurece con el uso combinado de acero y magia, ganando reducción de daño 2/-.",
  },
  {
    level: 8,
    name: "Dote de Combate Adicional",
    description: "El arcanamach suelio obtiene una segunda dote de combate adicional que cumpla sus requisitos.",
  },
  {
    level: 10,
    name: "Maestro de Espada y Conjuro",
    description: "La reducción de daño del arcanamach suelio aumenta a 4/- y, una vez por combate, puede lanzar un segundo conjuro además del que ya le permite Fusión de Espada y Conjuro, siempre en el mismo asalto de carga.",
  },
];

// ---------------------------------------------------------------------------
// Especialista Consumado (Master Specialist)
// ---------------------------------------------------------------------------

const MASTER_SPECIALIST_FEATURES = [
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de especialista consumado (1º a 5º) otorga un nivel de lanzador arcano adicional en su clase de mago especialista, exactamente como si hubiera obtenido un nivel de mago a efectos de conjuros por día, conjuros conocidos/preparados y nivel de lanzador (incluyendo el poder de escuela de especialista, si lo tenía).",
  },
  {
    level: 1,
    name: "Preparación Extra",
    description: "El especialista consumado puede preparar un conjuro adicional de su escuela de especialidad cada día, por encima de su límite normal de espacios.",
  },
  {
    level: 2,
    name: "Poder de Escuela Mejorado",
    description: "El poder de escuela de especialista del personaje (si lo tenía por ser mago especialista) gana un uso adicional al día.",
  },
  {
    level: 3,
    name: "Penetración de Escuela",
    description: "El especialista consumado gana un bonificador de +2 a las pruebas de nivel de lanzador para superar la resistencia a conjuros con los conjuros de su escuela de especialidad.",
  },
  {
    level: 4,
    name: "Preparación Extra Mejorada",
    description: "El número de conjuros adicionales que el especialista consumado puede preparar de su escuela de especialidad aumenta a dos por día.",
  },
  {
    level: 5,
    name: "Poder de Escuela Mayor",
    description: "El poder de escuela de especialista del personaje gana un segundo uso adicional al día y su efecto numérico (si lo tiene) se calcula como si su nivel de mago fuera 2 más alto.",
  },
];

// ---------------------------------------------------------------------------
// Maestro de Efigies (Effigy Master)
// ---------------------------------------------------------------------------

const EFFIGY_MASTER_FEATURES = [
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de maestro de efigies (1º a 10º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Crear Efigie",
    description:
      "El maestro de efigies aprende el proceso ritual para crear una efigie: un pequeño constructo de arcilla, madera o metal con un vínculo telepático a su creador, capaz de moverse, espiar y transmitirle lo que ve y oye a voluntad dentro de un alcance limitado.",
  },
  {
    level: 3,
    name: "Efigie Mejorada",
    description: "Las efigies del maestro de efigies ganan un bonificador de +2 a su Clase de Armadura natural y pueden llevar a cabo tareas simples de una sola palabra por orden del creador sin necesitar concentración continua.",
  },
  {
    level: 5,
    name: "Múltiples Efigies",
    description: "El maestro de efigies puede mantener activas y vinculadas hasta dos efigies a la vez, en vez de una sola.",
  },
  {
    level: 7,
    name: "Efigie Sensorial",
    description: "El maestro de efigies puede lanzar conjuros de objetivo Personal a través de una de sus efigies como si él mismo estuviera en su posición, siempre que la efigie se encuentre dentro de su alcance de vínculo.",
  },
  {
    level: 10,
    name: "Gran Efigie",
    description: "El maestro de efigies puede mantener hasta tres efigies a la vez, y una de ellas puede fabricarse de tamaño Pequeño con puntos de golpe y Fuerza acordes, capaz de sostener un combate breve en su defensa.",
  },
];

export const CM_CLASSES: ClassDef[] = [
  {
    id: "cm-sublime-chord",
    name: "Acorde Sublime (Sublime Chord)",
    source: "complete-mage",
    description:
      "Un bardo (u otro lanzador arcano espontáneo dado a la interpretación) que ha tocado la música primigenia que dio forma al mundo, y que aprende a extraer de ella magia que en teoría no le pertenece.",
    hitDie: 6,
    skillPointsPerLevel: 4,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "knowledge-arcana",
      "knowledge-the-planes",
      "knowledge-religion",
      "perform",
      "profession",
      "sense-motive",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "buena", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: SUBLIME_CHORD_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Interpretar 9 rangos", check: (ctx) => (ctx.skillRanks["perform"] ?? 0) >= 9 },
      {
        description: "Saber (Planos) 4 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-the-planes"] ?? 0) >= 4,
      },
      { description: "Conocimiento de Conjuros 9 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 9 },
      {
        description: "Capacidad de lanzar conjuros arcanos de nivel 3 de forma espontánea, nivel de lanzador arcano 7",
        check: (ctx) => ctx.casterLevel >= 7,
      },
    ],
  },
  {
    id: "cm-fatespinner",
    name: "Hilandera del Destino (Fatespinner)",
    source: "complete-mage",
    description:
      "Una lanzadora arcana que ha aprendido a tirar de los hilos invisibles del azar y el destino, forzando el resultado de sucesos aparentemente aleatorios a su favor o en contra de sus enemigos.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "knowledge-arcana", "knowledge-the-planes", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: FATESPINNER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Conocimiento de Conjuros 8 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 8 },
      {
        description: "Saber (Arcano) 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 8,
      },
      { description: "Nivel de lanzador arcano 5", check: (ctx) => ctx.casterLevel >= 5 },
    ],
  },
  {
    id: "cm-suel-arcanamach",
    name: "Arcanamach Suelio (Suel Arcanamach)",
    source: "complete-mage",
    description:
      "Un guerrero-lanzador de tradición suel que combina la espada y el conjuro en un mismo instante de combate, sacrificando parte de su progresión mágica a cambio de una versatilidad marcial mucho mayor que la de un simple lanzador.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "climb",
      "concentration",
      "craft",
      "jump",
      "knowledge-arcana",
      "profession",
      "ride",
      "spellcraft",
      "swim",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: SUEL_ARCANAMACH_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 },
      { description: "Conocimiento de Conjuros 5 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 5 },
      {
        description: "Competencia con arma marcial (cualquiera)",
        check: (ctx) => ctx.featIds.has("martial-weapon-proficiency"),
      },
      {
        description: "Capacidad de lanzar conjuros arcanos de nivel 2, nivel de lanzador arcano 3",
        check: (ctx) => ctx.casterLevel >= 3,
      },
    ],
  },
  {
    id: "cm-master-specialist",
    name: "Especialista Consumado (Master Specialist)",
    source: "complete-mage",
    description:
      "Un mago especialista que refina su vínculo con la escuela de magia que eligió al principio de su carrera, extrayendo de ella mucho más poder del que un especialista corriente podría obtener.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "knowledge-arcana", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: MASTER_SPECIALIST_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      { description: "Ser un mago especialista con una escuela de especialidad elegida" },
      { description: "Foco de Conjuro en la escuela de especialidad", check: hasFeat("spell-focus") },
      { description: "Conocimiento de Conjuros 5 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 5 },
      { description: "Nivel de lanzador arcano 5", check: (ctx) => ctx.casterLevel >= 5 },
    ],
  },
  {
    id: "cm-effigy-master",
    name: "Maestro de Efigies (Effigy Master)",
    source: "complete-mage",
    description:
      "Un lanzador arcano que aprende a crear pequeños constructos vinculados a su mente, las efigies, para espiar, explorar y actuar como sus ojos y oídos a distancia.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "disable-device",
      "knowledge-arcana",
      "profession",
      "spellcraft",
      "use-magic-device",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: EFFIGY_MASTER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Artesanía (escultura o alfarería) 5 rangos", check: (ctx) => (ctx.skillRanks["craft"] ?? 0) >= 5 },
      { description: "Conocimiento de Conjuros 8 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 8 },
      {
        description: "Saber (Arcano) 5 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 5,
      },
      { description: "Nivel de lanzador arcano 5", check: (ctx) => ctx.casterLevel >= 5 },
    ],
  },
];
