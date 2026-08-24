import type { ClassDef, ClassFeatureChoice, FeatPrereqContext } from "../../types";

const SUEL_ARCANAMACH_CHOICES: ClassFeatureChoice[] = [
  {
    id: "dote-combate-adicional",
    featureName: "Dote de Combate Adicional",
    levels: [8],
    label: "Dote de combate adicional",
    kind: "dote_categoria",
    featCategoryOptions: ["combate"],
  },
];

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

const ARCANE_METAMAGIC_FEAT_IDS = [
  "empower-spell",
  "enlarge-spell",
  "extend-spell",
  "heighten-spell",
  "maximize-spell",
  "quicken-spell",
  "silent-spell",
  "still-spell",
  "widen-spell",
];

const ITEM_CREATION_FEAT_IDS = [
  "brew-potion",
  "craft-magic-arms-and-armor",
  "craft-rod",
  "craft-staff",
  "craft-wand",
  "craft-wondrous-item",
  "forge-ring",
  "scribe-scroll",
];

function countMatchingFeats(featIds: Set<string>, candidates: string[]): number {
  return candidates.filter((id) => featIds.has(id)).length;
}

const ULTIMATE_MAGUS_CHOICES: ClassFeatureChoice[] = [
  {
    id: "dote-adicional-1",
    featureName: "Dote Adicional",
    levels: [2],
    label: "Dote adicional (1.ª): metamagia o creación de objetos",
    kind: "dote_categoria",
    featCategoryOptions: ["metamagia", "creacion_objetos"],
  },
  {
    id: "dote-adicional-2",
    featureName: "Dote Adicional",
    levels: [4],
    label: "Dote adicional (2.ª): metamagia o creación de objetos",
    kind: "dote_categoria",
    featCategoryOptions: ["metamagia", "creacion_objetos"],
  },
];

// ---------------------------------------------------------------------------
// Campeón Abjurador (Abjurant Champion)
// ---------------------------------------------------------------------------

const ABJURANT_CHAMPION_FEATURES = [
  {
    level: 1,
    name: "Conjuros",
    description:
      "Cada nivel de campeón abjurador (1º a 5º) otorga conjuros por día, nivel de lanzador (y conjuros conocidos si aplica) como si hubiera subido un nivel en su clase de lanzador arcano previa, sin otros beneficios de esa clase.",
  },
  {
    level: 1,
    name: "Armadura de Abjuración",
    description:
      "Al lanzar un conjuro de abjuración que otorgue un bonificador de armadura o de escudo a la Clase de Armadura, el campeón abjurador puede aumentar ese bonificador en una cantidad igual a su nivel de clase.",
  },
  {
    level: 1,
    name: "Abjuración Extendida",
    description:
      "El campeón abjurador duplica la duración de sus conjuros de abjuración, como si tuvieran aplicada la dote Conjuro Prolongado, pero sin cambio de nivel de conjuro ni de tiempo de lanzamiento.",
  },
  {
    level: 2,
    name: "Abjuración Rápida",
    description:
      "Desde el nivel 2, el campeón abjurador puede lanzar conjuros de abjuración como una acción rápida (como con la dote Lanzamiento Rápido, sin cambio de nivel de conjuro), hasta un nivel de conjuro máximo igual a la mitad de su nivel de clase (redondeando hacia arriba).",
  },
  {
    level: 4,
    name: "Impulso Arcano",
    description:
      "Desde el nivel 4, como acción rápida el campeón abjurador puede gastar un conjuro o hueco de conjuro no lanzado para ganar durante 1 asalto un bonificador de intuición igual al nivel del conjuro gastado, a elegir entre: ataque, daño con arma (el doble del nivel del conjuro), Clase de Armadura, tiradas de salvación, o resistencia a energía (ácido, frío, electricidad, fuego o sónico) igual a 5 veces el nivel del conjuro.",
  },
  {
    level: 5,
    name: "Arcanista Marcial",
    description:
      "Desde el nivel 5, su nivel de lanzador en una clase arcana elegida es igual a su bonificador de ataque base, si este es mayor que su nivel de lanzador habitual. Solo puede aplicar este beneficio a una única clase arcana.",
  },
];

// ---------------------------------------------------------------------------
// Magus Definitivo (Ultimate Magus)
// ---------------------------------------------------------------------------

const ULTIMATE_MAGUS_FEATURES = [
  {
    level: 1,
    name: "Doble Progresión Arcana",
    description:
      "Cada nivel de magus definitivo (1º a 5º) otorga un nivel de lanzador arcano adicional a CADA UNA de las dos clases de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en cada una de ellas a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esas clases).",
  },
  {
    level: 1,
    name: "Poder de Conjuro",
    description:
      "El magus definitivo obtiene un bonificador de +1 en las pruebas de nivel de lanzador realizadas para superar la resistencia a la magia.",
  },
  {
    level: 2,
    name: "Dote Adicional",
    description:
      "El magus definitivo obtiene una dote adicional de metamagia o de creación de objetos mágicos que cumpla sus requisitos.",
  },
  {
    level: 3,
    name: "Poder de Conjuro Mejorado",
    description: "El bonificador de Poder de Conjuro aumenta a +2.",
  },
  {
    level: 4,
    name: "Dote Adicional",
    description:
      "El magus definitivo obtiene una segunda dote adicional de metamagia o de creación de objetos mágicos que cumpla sus requisitos.",
  },
  {
    level: 5,
    name: "Maestría Arcana Definitiva",
    description:
      "El bonificador de Poder de Conjuro aumenta a +3. Además, una vez al día el magus definitivo puede lanzar un conjuro preparado o conocido de cualquiera de sus dos clases de lanzador arcano sin gastar el espacio de conjuro correspondiente.",
  },
];

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
    name: "Conjuros",
    description:
      "Cada nivel de especialista consumado (1º a 10º) otorga conjuros por día, nivel de lanzador y conjuros conocidos como si hubiera subido un nivel en la clase de mago, sin otros beneficios de esa clase.",
  },
  {
    level: 1,
    name: "Especialización en Habilidad (Conjuros)",
    description: "El especialista consumado obtiene Especialización en Habilidad (Conjuros) como dote de regalo.",
  },
  {
    level: 2,
    name: "Grimorio Ampliado",
    description:
      "En los niveles 2º, 5º y 8º puede añadir a su grimorio un conjuro de mago de su escuela elegida (de cualquier nivel que pueda lanzar), además de los conjuros normales por subir de nivel.",
  },
  {
    level: 3,
    name: "Enfoque de Conjuro Mayor",
    description: "El especialista consumado obtiene Enfoque de Conjuro Mayor como dote de regalo, aplicada a su escuela elegida.",
  },
  {
    level: 4,
    name: "Esoterismo de Escuela (menor)",
    description:
      "Obtiene una habilidad sobrenatural según su escuela elegida: en Abjuración, bonificador de competencia en pruebas de disipar igual a la mitad de su nivel; en Convocación, las criaturas que invoca aparecen con PG extra igual a su nivel de lanzador; en Adivinación, sus conjuros de duración por concentración siguen activos un número extra de asaltos igual a la mitad de su nivel tras dejar de concentrarse; en Encantamiento, los objetivos no ganan bonificador de salvación por estar amenazados o atacados; en Evocación, gana bonificador en Concentración igual a la mitad de su nivel al lanzar evocación; en Ilusión, las CD «Voluntad para descreer» de sus ilusiones suben en 2; en Nigromancia, los no-muertos aliados a 18 m ganan resistencia a expulsión y bonificador en salvaciones igual a su nivel durante un número de asaltos igual a su nivel al lanzar nigromancia; en Transmutación, si le disipan un conjuro de esta escuela, sigue activo 1 asalto más antes de cesar.",
  },
  {
    level: 5,
    name: "Grimorio Ampliado",
    description: "Añade otro conjuro de mago de su escuela elegida a su grimorio, como en el nivel 2º.",
  },
  {
    level: 6,
    name: "Aumento de Nivel de Lanzador",
    description: "El especialista consumado suma +1 a su nivel de lanzador al lanzar conjuros de su escuela elegida.",
  },
  {
    level: 7,
    name: "Esoterismo de Escuela (moderado)",
    description:
      "Obtiene, según su escuela, una habilidad que se activa automáticamente al lanzar un conjuro de esa escuela y dura un número de asaltos igual al nivel del conjuro: en Abjuración, no sufre efecto si supera una salvación parcial/de mitad; en Convocación, sus conjuros de convocación se tratan con nivel de lanzador +5 frente a disipar; en Adivinación, gana esquiva sobrenatural; en Encantamiento, puede repetir una salvación de Voluntad fallida contra encantamiento/mente (debe aceptar el segundo resultado); en Evocación, gana resistencia 20 a un tipo de energía del conjuro lanzado; en Ilusión, gana ocultación; en Nigromancia, es inmune a daño y drenaje de característica, drenaje de energía y niveles negativos; en Transmutación, puede repetir una salvación de Fortaleza fallida contra transmutación.",
  },
  {
    level: 8,
    name: "Grimorio Ampliado",
    description: "Añade un tercer conjuro de mago de su escuela elegida a su grimorio, como en el nivel 2º.",
  },
  {
    level: 9,
    name: "Aumento de Nivel de Lanzador",
    description: "El bonificador de Aumento de Nivel de Lanzador del especialista consumado sube a +2.",
  },
  {
    level: 10,
    name: "Esoterismo de Escuela (mayor)",
    description:
      "Obtiene, según su escuela, una habilidad usable 3 veces al día: en Abjuración, puede lanzar como toque conjuros de alcance personal o emanaciones centradas en sí mismo; en Convocación, puede lanzar un conjuro de convocación de 1 acción estándar como acción rápida; en Adivinación, también gana visión verdadera 5 asaltos al lanzar un conjuro de adivinación; en Encantamiento, si el objetivo supera la salvación debe repetirla 1 asalto después con +5; en Evocación, si el objetivo falla la salvación sufre de nuevo la mitad del daño 1 asalto después; en Ilusión, puede lanzar cualquier ilusión silenciosa, quieta y sin componentes materiales sin aumento de nivel ni tiempo de lanzamiento; en Nigromancia, los no-muertos aliados a 18 m ganan curación rápida 10 durante 5 asaltos; en Transmutación, si el objetivo supera la salvación igual sufre daño igual al nivel del conjuro.",
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
    choices: SUEL_ARCANAMACH_CHOICES,
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
    weaponProficiencies: [],
    armorProficiencies: [],
    features: MASTER_SPECIALIST_FEATURES,
    bonusFeatGrants: [
      { level: 1, featId: "skill-focus" },
      { level: 3, featId: "greater-spell-focus" },
    ],
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Ser un mago especialista con una escuela de especialidad elegida" },
      {
        description: "Saber (Arcano) 5 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 5,
      },
      { description: "Conjuros 5 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 5 },
      { description: "Enfoque de Conjuro (en la escuela de especialización)", check: hasFeat("spell-focus") },
      {
        description: "Capacidad de lanzar conjuros arcanos de nivel 2",
        check: (ctx) => ctx.casterLevel >= 3,
      },
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
  {
    id: "cm-abjurant-champion",
    name: "Campeón Abjurador (Abjurant Champion)",
    source: "complete-mage",
    description:
      "Un lanzador arcano que combina la magia de abjuración con la destreza marcial, reforzándose a sí mismo y su equipo en pleno combate mientras sigue progresando en su arte arcano.",
    hitDie: 10,
    skillPointsPerLevel: 2,
    classSkills: [
      "climb",
      "concentration",
      "craft",
      "handle-animal",
      "intimidate",
      "jump",
      "knowledge-arcana",
      "ride",
      "spellcraft",
      "swim",
    ],
    babProgression: "completa",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: ABJURANT_CHAMPION_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Lanzar Conjuros en Combate (Combat Casting)",
        check: (ctx) => ctx.featIds.has("combat-casting"),
      },
      {
        description: "Competencia con al menos un arma marcial",
      },
      {
        description:
          "Capacidad de lanzar conjuros arcanos de nivel 1, incluyendo al menos un conjuro de abjuración",
        check: (ctx) => ctx.casterLevel >= 1,
      },
    ],
  },
  {
    id: "cm-ultimate-magus",
    name: "Magus Definitivo (Ultimate Magus)",
    source: "complete-mage",
    description:
      "Un lanzador que ha dividido su formación arcana entre dos tradiciones distintas (por ejemplo, mago y hechicero) y que en esta clase de prestigio hace progresar ambas a la vez, en vez de tener que elegir entre ellas.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "decipher-script", "knowledge-arcana", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: ULTIMATE_MAGUS_FEATURES,
    choices: ULTIMATE_MAGUS_CHOICES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Arcano): 15 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 15,
      },
      {
        description: "Conocimiento de Conjuros: 15 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 15,
      },
      {
        description: "Dos dotes cualesquiera de metamagia o de creación de objetos mágicos",
        check: (ctx) =>
          countMatchingFeats(ctx.featIds, [...ARCANE_METAMAGIC_FEAT_IDS, ...ITEM_CREATION_FEAT_IDS]) >= 2,
      },
      {
        description:
          "Capacidad de lanzar conjuros arcanos de nivel 2 procedentes de dos clases de lanzador arcano distintas (por ejemplo, mago y hechicero)",
        check: (ctx) =>
          Object.entries(ctx.classLevels).filter(
            ([classId, level]) => ["wizard", "sorcerer"].includes(classId) && level >= 1,
          ).length >= 2,
      },
    ],
  },
];
