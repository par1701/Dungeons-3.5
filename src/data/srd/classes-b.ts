import type { ClassDef, ClassFeature } from "../../types";

// Progresión de conjuros por día del Bardo (conjurador arcano espontáneo,
// nivel de conjuro máximo 6). Índice = nivel de clase (0 sin usar);
// cada fila = [nivel0, nivel1, nivel2, nivel3, nivel4, nivel5, nivel6].
const BARD_SPELLS_PER_DAY: number[][] = [
  [0, 0, 0, 0, 0, 0, 0], // 0 (sin usar)
  [2, 0, 0, 0, 0, 0, 0], // 1
  [3, 1, 0, 0, 0, 0, 0], // 2
  [3, 2, 0, 0, 0, 0, 0], // 3
  [3, 2, 0, 0, 0, 0, 0], // 4
  [3, 3, 1, 0, 0, 0, 0], // 5
  [3, 3, 2, 0, 0, 0, 0], // 6
  [3, 3, 2, 0, 0, 0, 0], // 7
  [3, 3, 3, 1, 0, 0, 0], // 8
  [3, 3, 3, 2, 0, 0, 0], // 9
  [3, 3, 3, 2, 0, 0, 0], // 10
  [3, 3, 3, 3, 1, 0, 0], // 11
  [3, 3, 3, 3, 2, 0, 0], // 12
  [3, 3, 3, 3, 2, 0, 0], // 13
  [4, 3, 3, 3, 3, 1, 0], // 14
  [4, 4, 3, 3, 3, 2, 0], // 15
  [4, 4, 4, 3, 3, 2, 0], // 16
  [4, 4, 4, 4, 3, 3, 1], // 17
  [4, 4, 4, 4, 4, 3, 2], // 18
  [4, 4, 4, 4, 4, 4, 3], // 19
  [4, 4, 4, 4, 4, 4, 4], // 20
];

// Conjuros conocidos del Bardo (conjurador espontáneo). Misma forma que la
// tabla de conjuros por día: fila = nivel de clase, columna = nivel de conjuro 0..6.
const BARD_SPELLS_KNOWN: number[][] = [
  [0, 0, 0, 0, 0, 0, 0], // 0 (sin usar)
  [4, 2, 0, 0, 0, 0, 0], // 1
  [5, 3, 0, 0, 0, 0, 0], // 2
  [6, 4, 0, 0, 0, 0, 0], // 3
  [6, 4, 2, 0, 0, 0, 0], // 4
  [6, 4, 3, 0, 0, 0, 0], // 5
  [6, 4, 4, 0, 0, 0, 0], // 6
  [6, 5, 4, 2, 0, 0, 0], // 7
  [6, 5, 4, 3, 0, 0, 0], // 8
  [6, 5, 4, 4, 0, 0, 0], // 9
  [6, 5, 5, 4, 2, 0, 0], // 10
  [6, 5, 5, 4, 3, 0, 0], // 11
  [6, 5, 5, 4, 4, 0, 0], // 12
  [6, 5, 5, 5, 4, 2, 0], // 13
  [6, 5, 5, 5, 4, 3, 0], // 14
  [6, 6, 5, 5, 4, 4, 0], // 15
  [6, 6, 5, 5, 5, 4, 2], // 16
  [6, 6, 5, 5, 5, 4, 3], // 17
  [6, 6, 6, 5, 5, 4, 4], // 18
  [6, 6, 6, 5, 5, 5, 4], // 19
  [6, 6, 6, 5, 5, 5, 4], // 20
];

// Progresión de conjuros por día compartida por Clérigo y Druida: ambos son
// conjuradores divinos "de casta completa" (empiezan en nivel de clase 1 y
// llegan a conjuros de nivel 9). Índice = nivel de clase (0 sin usar);
// cada fila = [nivel0..nivel9]. No incluye el conjuro de dominio extra del clérigo.
const FULL_DIVINE_SPELLS_PER_DAY: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 (sin usar)
  [3, 1, 0, 0, 0, 0, 0, 0, 0, 0], // 1
  [4, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 2
  [4, 2, 1, 0, 0, 0, 0, 0, 0, 0], // 3
  [5, 3, 2, 0, 0, 0, 0, 0, 0, 0], // 4
  [5, 3, 2, 1, 0, 0, 0, 0, 0, 0], // 5
  [5, 3, 3, 2, 0, 0, 0, 0, 0, 0], // 6
  [6, 4, 3, 2, 1, 0, 0, 0, 0, 0], // 7
  [6, 4, 3, 3, 2, 0, 0, 0, 0, 0], // 8
  [6, 4, 4, 3, 2, 1, 0, 0, 0, 0], // 9
  [6, 4, 4, 3, 3, 2, 0, 0, 0, 0], // 10
  [6, 5, 4, 4, 3, 2, 1, 0, 0, 0], // 11
  [6, 5, 4, 4, 3, 3, 2, 0, 0, 0], // 12
  [6, 5, 5, 4, 4, 3, 2, 1, 0, 0], // 13
  [6, 5, 5, 4, 4, 3, 3, 2, 0, 0], // 14
  [6, 5, 5, 5, 4, 4, 3, 2, 1, 0], // 15
  [6, 5, 5, 5, 4, 4, 3, 3, 2, 0], // 16
  [6, 5, 5, 5, 5, 4, 4, 3, 2, 1], // 17
  [6, 5, 5, 5, 5, 4, 4, 3, 3, 2], // 18
  [6, 5, 5, 5, 5, 5, 4, 4, 3, 3], // 19
  [6, 5, 5, 5, 5, 5, 4, 4, 4, 4], // 20
];

const bardFeatures: ClassFeature[] = [
  { level: 1, name: "Contracanto", description: "Como acción estándar, el bardo puede usar Interpretar para contrarrestar un efecto mágico basado en sonido o lenguaje, permitiendo a cualquier aliado en 9 metros que aún deba salvarse contra dicho efecto usar el resultado de la interpretación del bardo en lugar de su tirada de salvación si es mejor." },
  { level: 1, name: "Encantar", description: "El bardo puede usar Interpretar para captar y mantener la atención de una o más criaturas (una por cada nivel de bardo por encima de 1), que quedan fascinadas mientras dure la interpretación y unos instantes después." },
  { level: 1, name: "Saber de bardo", description: "El bardo puede realizar una tirada especial de saber de bardo (1d20 + nivel de bardo + modificador de Inteligencia) para recordar información sobre leyendas, personajes, lugares u objetos famosos." },
  { level: 1, name: "Inspirar valor +1", description: "Mediante música o poesía, el bardo inspira valor en sus aliados (incluido él mismo), otorgándoles un bonificador de moral de +1 a las tiradas de salvación contra miedo y de +1 al daño en ataques cuerpo a cuerpo y a distancia mientras dure la interpretación." },
  { level: 3, name: "Inspirar competencia", description: "El bardo puede ayudar a un aliado a tener éxito en una tarea, otorgándole un bonificador de competencia de +2 a una prueba de habilidad concreta mientras el aliado pueda ver y oír su interpretación." },
  { level: 6, name: "Sugestión", description: "El bardo puede usar su música o poesía para sugestionar (como el conjuro sugestión) a una única criatura que esté fascinada por su encantar, una vez al día más una vez adicional por cada tres niveles de bardo por encima del sexto." },
  { level: 8, name: "Inspirar grandeza", description: "El bardo puede inspirar grandeza en sí mismo o en un aliado, otorgándole 2 dados de golpe adicionales de bardo (con sus puntos de golpe temporales), un bonificador de competencia de +2 a las tiradas de ataque y un bonificador de +1 a las tiradas de salvación de Fortaleza mientras dure la interpretación." },
  { level: 8, name: "Inspirar valor +2", description: "El bonificador de inspirar valor aumenta a +2 a las tiradas de salvación contra miedo y al daño en combate." },
  { level: 12, name: "Canción de libertad", description: "El bardo puede usar su música para liberar a una criatura de un efecto de encantamiento, de una transmutación que la paralice o del estado de petrificación, de forma similar al conjuro liberar de maldición." },
  { level: 14, name: "Inspirar valor +3", description: "El bonificador de inspirar valor aumenta a +3 a las tiradas de salvación contra miedo y al daño en combate." },
  { level: 15, name: "Inspirar heroísmo", description: "El bardo puede inspirar gran heroísmo en sus aliados, otorgándoles los beneficios de inspirar valor más inmunidad al miedo y un bonificador de moral de +4 a todas las tiradas de salvación mientras dure la interpretación." },
  { level: 18, name: "Sugestión en masa", description: "Como sugestión, pero el bardo puede afectar simultáneamente a cualquier número de criaturas que estén fascinadas por su interpretación." },
  { level: 20, name: "Inspirar valor +4", description: "El bonificador de inspirar valor aumenta a +4 a las tiradas de salvación contra miedo y al daño en combate." },
];

const clericFeatures: ClassFeature[] = [
  { level: 1, name: "Dominios", description: "El clérigo elige dos dominios asociados a su deidad. Cada dominio le concede un conjuro de dominio adicional por nivel de conjuro en un espacio reservado para ese dominio, además de un poder de dominio otorgado." },
  { level: 1, name: "Expulsar o reprender no-muertos", description: "El clérigo puede expulsar no-muertos (o, si es de alineamiento malvado, reprenderlos y dominarlos) un número de veces al día igual a 3 + su modificador de Carisma, como acción estándar." },
  { level: 1, name: "Lanzamiento espontáneo de conjuros", description: "Un clérigo bueno o neutral puede convertir sobre la marcha cualquier conjuro preparado (que no sea de dominio) en un conjuro de curación del mismo nivel o inferior; un clérigo malvado puede convertirlo en un conjuro de infligir daño." },
];

const druidFeatures: ClassFeature[] = [
  { level: 1, name: "Empatía con animales", description: "El druida puede mejorar la actitud de un animal de forma similar a Diplomacia, mediante comunicación e interacción con lenguaje corporal." },
  { level: 1, name: "Compañero animal", description: "El druida puede convocar a un compañero animal especial que le sirve fielmente y mejora en poder junto a él." },
  { level: 1, name: "Sentido de la naturaleza", description: "El druida obtiene un bonificador de +2 a las pruebas de Conocimiento (naturaleza) y de Supervivencia." },
  { level: 2, name: "Paso por el bosque", description: "El druida se mueve a través de terreno difícil de origen natural (zarzas, enredaderas, etc.) a su velocidad normal y sin sufrir daño ni otros efectos adversos." },
  { level: 3, name: "Paso sin rastro", description: "El druida no deja rastro al moverse por terrenos naturales y no puede ser seguido, salvo mediante magia." },
  { level: 4, name: "Resistencia a los encantos de la naturaleza", description: "El druida obtiene un bonificador de +4 a las tiradas de salvación contra los efectos que dependan del tipo feérico y contra los conjuros y efectos de sortilegio de las criaturas de tipo planta." },
  { level: 5, name: "Forma silvestre (1/día)", description: "El druida puede transformarse una vez al día en un animal Pequeño o Mediano y de vuelta a su forma original, ganando las estadísticas físicas de la nueva forma." },
  { level: 6, name: "Forma silvestre (2/día)", description: "El druida puede usar forma silvestre dos veces al día." },
  { level: 7, name: "Forma silvestre (3/día)", description: "El druida puede usar forma silvestre tres veces al día." },
  { level: 8, name: "Forma silvestre (Grande y Diminuto)", description: "El druida puede usar forma silvestre para adoptar también la forma de un animal Grande o Diminuto." },
  { level: 9, name: "Inmunidad a venenos", description: "El druida se vuelve inmune a todos los venenos." },
  { level: 10, name: "Forma silvestre (4/día)", description: "El druida puede usar forma silvestre cuatro veces al día." },
  { level: 11, name: "Forma silvestre (Enorme y Fino)", description: "El druida puede usar forma silvestre para adoptar también la forma de un animal Enorme o Fino." },
  { level: 12, name: "Forma silvestre (5/día)", description: "El druida puede usar forma silvestre cinco veces al día." },
  { level: 13, name: "Mil rostros", description: "El druida puede cambiar su apariencia como si usara el conjuro disfraz propio, a voluntad." },
  { level: 14, name: "Forma silvestre (6/día)", description: "El druida puede usar forma silvestre seis veces al día." },
  { level: 15, name: "Cuerpo intemporal", description: "El druida deja de sufrir penalizadores por vejez a sus puntuaciones de característica, aunque sigue obteniendo los bonificadores por edad; además, no puede morir de vejez." },
  { level: 15, name: "Forma silvestre (forma de planta)", description: "El druida puede usar forma silvestre para adoptar la forma de una criatura de tipo planta." },
  { level: 16, name: "Forma silvestre (forma elemental)", description: "El druida puede usar forma silvestre para adoptar la forma de un elemental pequeño o mediano, una vez al día." },
  { level: 16, name: "Forma silvestre (7/día)", description: "El druida puede usar forma silvestre siete veces al día." },
  { level: 17, name: "Forma silvestre (8/día)", description: "El druida puede usar forma silvestre ocho veces al día." },
  { level: 18, name: "Forma silvestre (elemental Grande)", description: "El druida puede usar forma silvestre para adoptar la forma de un elemental Grande." },
  { level: 20, name: "Forma silvestre a voluntad", description: "El druida puede usar forma silvestre a voluntad, incluyendo la forma de un elemental Descomunal." },
];

export const SRD_CLASSES_B: ClassDef[] = [
  {
    id: "bard",
    name: "Bardo",
    source: "srd",
    description:
      "Artista itinerante que entrelaza música, saber y magia arcana espontánea, apoyando a sus aliados con interpretaciones mágicas y un amplio conocimiento general.",
    hitDie: 6,
    skillPointsPerLevel: 6,
    classSkills: [
      "appraise",
      "balance",
      "bluff",
      "climb",
      "concentration",
      "craft",
      "decipher-script",
      "diplomacy",
      "disguise",
      "escape-artist",
      "gather-information",
      "hide",
      "jump",
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
      "listen",
      "move-silently",
      "perform",
      "profession",
      "sense-motive",
      "sleight-of-hand",
      "spellcraft",
      "swim",
      "tumble",
      "use-magic-device",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "buena", will: "buena" },
    weaponProficiencies: [
      "armas simples",
      "espada larga",
      "estoque",
      "cachiporra",
      "espada corta",
      "arco corto",
      "látigo",
    ],
    armorProficiencies: ["armadura ligera", "escudos (excepto escudos torre)"],
    spellcasting: {
      type: "espontaneo",
      ability: "cha",
      spellListId: "bard",
      maxSpellLevel: 6,
      spellsPerDay: BARD_SPELLS_PER_DAY,
      spellsKnown: BARD_SPELLS_KNOWN,
      startLevel: 1,
    },
    features: bardFeatures,
    maxLevel: 20,
  },
  {
    id: "cleric",
    name: "Clérigo",
    source: "srd",
    description:
      "Intermediario entre lo mortal y lo divino, canaliza el poder de su deidad para curar, proteger y combatir a los no-muertos, siendo un conjurador divino de plena potencia.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "heal",
      "knowledge-arcana",
      "knowledge-history",
      "knowledge-religion",
      "knowledge-the-planes",
      "profession",
      "spellcraft",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples"],
    armorProficiencies: ["armadura ligera", "armadura media", "armadura pesada", "escudos (excepto escudos torre)"],
    spellcasting: {
      type: "preparado",
      ability: "wis",
      spellListId: "cleric",
      maxSpellLevel: 9,
      spellsPerDay: FULL_DIVINE_SPELLS_PER_DAY,
      startLevel: 1,
    },
    features: clericFeatures,
    maxLevel: 20,
  },
  {
    id: "druid",
    name: "Druida",
    source: "srd",
    description:
      "Guardián de los ciclos naturales que extrae su poder divino de la propia naturaleza, capaz de transformarse en bestias salvajes y convocar a un compañero animal.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "handle-animal",
      "heal",
      "knowledge-nature",
      "listen",
      "profession",
      "ride",
      "spellcraft",
      "spot",
      "survival",
      "swim",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [
      "garrote",
      "daga",
      "dardo",
      "bastón",
      "cimitarra",
      "hoz",
      "lanza corta",
      "honda",
      "lanza",
    ],
    armorProficiencies: [
      "armadura ligera no metálica",
      "armadura media no metálica",
      "escudos no metálicos (excepto escudos torre)",
    ],
    spellcasting: {
      type: "preparado",
      ability: "wis",
      spellListId: "druid",
      maxSpellLevel: 9,
      spellsPerDay: FULL_DIVINE_SPELLS_PER_DAY,
      startLevel: 1,
    },
    features: druidFeatures,
    maxLevel: 20,
  },
];
