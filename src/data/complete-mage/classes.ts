import type { ClassDef, ClassFeatureChoice, FeatPrereqContext } from "../../types";

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
// Acorde Sublime, Hilandera del Destino, Arcanamach Suelio y Maestro de
// Efigies se trasladaron a src/data/complete-arcane/classes.ts: los nuevos
// documentos de referencia de docs/prestige/ confirman que las cuatro
// pertenecen a Complete Arcane, no a Complete Mage.
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

export const CM_CLASSES: ClassDef[] = [
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
