import type { ClassDef, ClassFeature, FeatPrereqContext } from "../../types";

// Clases de prestigio de Complete Scoundrel (2007).
//
// Complete Scoundrel tiene 11 clases de prestigio reales: Avenging
// Executioner, Battle Trickster, Cloaked Dancer, Combat Trapsmith, Fortune's
// Friend, Gray Guard, Magical Trickster, Master of Masks, Psibond Agent,
// Spellwarp Sniper y Uncanny Trickster (ver docs/prestige/README.md). Este
// archivo solo tenía 5 clases, y una auditoría contra docs/prestige/ mostró
// que únicamente 2 de ellas (Fortune's Friend y Spellwarp Sniper) se
// corresponden con clases reales de este libro; ambas han sido reescritas
// por completo para igualar sus fichas (docs/prestige/fortunes-friend.md y
// docs/prestige/spellwarp-sniper.md) tras confirmar que la versión anterior
// tenía prerrequisitos, progresión de salvaciones, habilidades de clase y
// rasgos por nivel completamente inventados.
//
// Las otras 3 clases del archivo NO tienen una ficha de referencia válida
// para Complete Scoundrel y se dejan sin tocar a la espera de una decisión
// explícita sobre qué hacer con ellas (ver también los comentarios junto a
// cada una):
// - "León Dorado" (Golden Lion): no existe ninguna ficha con ese nombre en
//   docs/prestige/ para ningún libro. Parece enteramente inventada.
// - "Hoja Invisible" (Invisible Blade): SÍ existe una ficha real
//   (docs/prestige/invisible-blade.md), pero pertenece a Complete Warrior,
//   no a Complete Scoundrel, y sus mecánicas reales (d6, ataque furtivo con
//   daga/kukri/daga de puño, defensa desatada, herida sangrante, amago
//   certero) no tienen nada que ver con las que hay codificadas aquí.
// - "Truhan Certero" (Uncanny Trickster): sí es una clase real de Complete
//   Scoundrel (aparece en el índice de docs/prestige/README.md), pero el
//   archivo docs/prestige/uncanny-trickster.md no existe en el repositorio,
//   así que no hay ficha con la que verificar sus mecánicas.
//
// Ninguna de las clases con ficha verificada tiene una lista de conjuros
// propia con progresión completa: Fortune's Friend continúa el nivel de
// lanzador divino que el personaje ya poseía, y Spellwarp Sniper continúa
// el nivel de lanzador arcano que ya poseía. En ambos casos se omite el
// campo `spellcasting` y el efecto se documenta como un `ClassFeature` de
// texto, tal como indican las convenciones de este proyecto.

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

// ---------------------------------------------------------------------------
// Amigo de la Fortuna (Fortune's Friend)
// ---------------------------------------------------------------------------

const FORTUNES_FRIEND_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Suerte Fácil",
    description:
      "Usar una dote de suerte que requiera una acción rápida o inmediata no cuenta contra el límite habitual de una acción rápida por turno (sigue limitado a un único relanzamiento de suerte por turno sobre el mismo resultado).",
  },
  {
    level: 1,
    name: "Fortuna Extra",
    description:
      "En cada nivel impar de amigo de la fortuna (1.º, 3.º y 5.º) obtiene un relanzamiento de suerte diario adicional, que se suma a los concedidos por sus dotes de suerte.",
  },
  {
    level: 1,
    name: "Más Suerte que Destreza",
    description:
      "Una vez al día, como acción rápida, suma su nivel de clase como bonificador de suerte a todas las pruebas de habilidad que realice hasta el comienzo de su siguiente turno.",
  },
  {
    level: 2,
    name: "Lanzamiento de conjuros continuado",
    description:
      "En cada nivel par de amigo de la fortuna (2.º y 4.º), gana conjuros por día, nivel de lanzador y conjuros conocidos como si hubiera obtenido un nivel en una clase de lanzador divino previa, sin ningún otro beneficio de esa clase.",
  },
  {
    level: 2,
    name: "Dote de Suerte Extra",
    description: "En los niveles 2.º y 4.º de esta clase obtiene una dote de suerte adicional que cumpla sus prerrequisitos.",
  },
  {
    level: 3,
    name: "Favorito de la Fortuna",
    description:
      "Una vez al día, como acción inmediata, suma su nivel de clase como bonificador de suerte a todas las tiradas de salvación que realice hasta el comienzo de su siguiente turno.",
  },
  {
    level: 5,
    name: "Golpe de Suerte",
    description:
      "Una vez al día, como acción rápida, suma su nivel de clase como bonificador de suerte a todas las tiradas de ataque que realice hasta el comienzo de su siguiente turno.",
  },
];

// ---------------------------------------------------------------------------
// León Dorado (Golden Lion)
//
// SIN FICHA DE REFERENCIA: no existe ningún docs/prestige/golden-lion.md ni
// nada equivalente en el índice de docs/prestige/README.md, para ningún
// libro. No se ha podido verificar ni corregir; se deja tal cual estaba a
// la espera de que el usuario decida qué hacer con ella.
// ---------------------------------------------------------------------------

const GOLDEN_LION_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Presencia inspiradora",
    description:
      "Mientras el león dorado esté consciente y no incapacitado, los aliados a 9 metros o menos ganan un bonificador de moral de +1 a las tiradas de salvación contra el miedo.",
  },
  {
    level: 2,
    name: "Voz contra la tiranía",
    description: "Gana un bonificador de competencia de +2 a las pruebas de Diplomacia e Intimidar realizadas contra quienes abusan de su poder sobre otros (tiranos, opresores, esclavistas).",
  },
  {
    level: 3,
    name: "Golpe contra el opresor",
    description:
      "Cuando ataca a una criatura que posee autoridad o poder sobre subordinados o esclavos, gana +1d6 puntos de daño adicional con sus ataques cuerpo a cuerpo contra ella.",
  },
  {
    level: 4,
    name: "Inmunidad al miedo",
    description: "El león dorado se vuelve inmune a los efectos de miedo, mágicos o mundanos.",
  },
  {
    level: 5,
    name: "Melena del león",
    description: "Una vez al día, como acción libre, puede hacer que su cabello o crin brille con una tenue luz dorada durante 1 minuto, que otorga luz como una antorcha y aumenta en +2 el bonificador de la Presencia Inspiradora.",
  },
  {
    level: 6,
    name: "Presencia inspiradora mejorada",
    description: "El bonificador de moral de la Presencia Inspiradora aumenta a +2 y también se aplica a las tiradas de salvación contra el desánimo o la desmoralización.",
  },
  {
    level: 7,
    name: "Golpe contra el opresor mejorado",
    description: "El daño adicional de Golpe Contra el Opresor aumenta a +2d6.",
  },
  {
    level: 8,
    name: "Desafío al tirano",
    description:
      "Una vez al día, como acción estándar, puede desafiar abiertamente a un enemigo dentro de su campo de visión; mientras el desafío esté vigente, ese enemigo sufre un penalizador de -2 a las tiradas de ataque contra cualquier objetivo que no sea el león dorado.",
  },
  {
    level: 9,
    name: "Voluntad inquebrantable",
    description: "Gana un bonificador de +4 a las tiradas de salvación de Voluntad contra conjuros y efectos de la escuela de Encantamiento.",
  },
  {
    level: 10,
    name: "El León Dorado",
    description:
      "El daño adicional de Golpe Contra el Opresor aumenta a +3d6 y la Presencia Inspiradora se extiende a 18 metros. Una vez por combate, puede lanzar un rugido que obliga a todos los enemigos a 9 metros que lo escuchen a superar una salvación de Voluntad o quedar sacudidos durante 1 minuto.",
  },
];

// ---------------------------------------------------------------------------
// Hoja Invisible (Invisible Blade)
//
// MAL FILIADA: existe una ficha real, pero es de Complete Warrior
// (docs/prestige/invisible-blade.md), no de Complete Scoundrel, y no tiene
// nada en común con lo codificado aquí (allí es d6, prerrequisito de matar
// en duelo singular con daga/kukri/daga de puño, con ataque furtivo con
// daga, defensa desatada, herida sangrante y amago certero). No se toca
// para no fabricar ni una versión "Complete Scoundrel" ni una versión
// "Complete Warrior" sin que el usuario decida primero qué hacer con ella.
// ---------------------------------------------------------------------------

const INVISIBLE_BLADE_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Ataque a ciegas",
    description:
      "Mientras luche cuerpo a cuerpo contra un enemigo al que no pueda ver (por invisibilidad, oscuridad u ocultación total) pero cuya ubicación conozca con certeza, la hoja invisible no sufre la penalización de -2 habitual a las tiradas de ataque contra objetivos no vistos.",
  },
  {
    level: 2,
    name: "Sentido de combate",
    description: "Gana un bonificador de competencia de +2 a las pruebas de Escuchar y Avistar realizadas para localizar a un enemigo oculto o invisible en combate.",
  },
  {
    level: 3,
    name: "Ataque furtivo +1d6",
    description: "El daño adicional por ataque furtivo del personaje (propio o de una clase previa) aumenta en +1d6.",
  },
  {
    level: 4,
    name: "Golpe fantasma",
    description: "Una vez por asalto, puede repetir la probabilidad de fallo por ocultación total al atacar a un enemigo invisible que ya haya localizado ese mismo asalto.",
  },
  {
    level: 5,
    name: "Ataque furtivo +2d6",
    description: "El daño adicional por ataque furtivo aumenta en otro +1d6 (total +2d6 respecto al nivel 2).",
  },
  {
    level: 6,
    name: "Reflejos de la hoja invisible",
    description: "Gana un bonificador de esquiva de +2 a la Clase de Armadura frente a ataques de enemigos a los que no pueda ver.",
  },
  {
    level: 7,
    name: "Ataque furtivo +3d6",
    description: "El daño adicional por ataque furtivo aumenta en otro +1d6.",
  },
  {
    level: 8,
    name: "Percepción sobrenatural",
    description: "Obtiene una forma limitada de percepción ciega (blindsense) hasta 3 metros, que le permite localizar criaturas invisibles u ocultas cercanas sin necesidad de verlas.",
  },
  {
    level: 9,
    name: "Ataque furtivo +4d6",
    description: "El daño adicional por ataque furtivo aumenta en otro +1d6.",
  },
  {
    level: 10,
    name: "Hoja invisible perfecta",
    description:
      "La hoja invisible puede aplicar su daño de ataque furtivo contra cualquier enemigo dentro de su percepción sobrenatural, sin importar si dicho enemigo está flanqueado, desprevenido o si ella misma puede verlo con normalidad.",
  },
];

// ---------------------------------------------------------------------------
// Francotirador Deformaconjuros (Spellwarp Sniper)
// ---------------------------------------------------------------------------

const SPELLWARP_SNIPER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Deformar Conjuro (Spellwarp)",
    description:
      "Como acción gratuita, puede transformar un conjuro de área con duración instantánea y alcance mayor que toque en un rayo: conserva el mismo nivel, componentes, alcance y daño, pero pasa a requerir un ataque de toque a distancia y anula cualquier tirada de salvación de Reflejos que tuviera (conserva las de Fortaleza o Voluntad, si las tenía). Debe decidir la transformación al lanzar el conjuro; admite dotes de metamagia compatibles con rayos. El nivel máximo de conjuro que puede deformar así aumenta en 1 por cada nivel de francotirador deformaconjuros (hasta nivel 5 de conjuro en el nivel 5 de clase).",
  },
  {
    level: 1,
    name: "Lanzamiento de conjuros continuado",
    description:
      "En cada nivel de francotirador deformaconjuros, gana conjuros por día, nivel de lanzador y conjuros conocidos como si hubiera obtenido un nivel en una clase de lanzador arcano previa, sin ningún otro beneficio de esa clase.",
  },
  {
    level: 2,
    name: "Golpe de Rayo Súbito +1d6",
    description:
      "Si el objetivo de un conjuro de rayo lanzado por el francotirador pierde su bonificador de Destreza a la Clase de Armadura frente a él, el conjuro inflige 1d6 puntos de daño adicional. Se acumula con el ataque furtivo o ataque súbito de otras fuentes; solo funciona contra objetivos a 9 metros (30 pies) o menos, y no afecta a criaturas con ocultación total, sin anatomía discernible o inmunes a daño adicional de golpe crítico.",
  },
  {
    level: 3,
    name: "Disparo Certero (dote de bonificación)",
    description:
      "Obtiene Disparo Certero (Precise Shot) como dote de bonificación; si ya la posee, puede elegir en su lugar cualquier otra dote que tenga Disparo a Bocajarro (Point-Blank Shot) como prerrequisito.",
  },
  {
    level: 4,
    name: "Golpe de Rayo Súbito +2d6",
    description: "El daño adicional del Golpe de Rayo Súbito aumenta a 2d6.",
  },
  {
    level: 5,
    name: "Maestría del Rayo",
    description:
      "Obtiene tres beneficios: el alcance del Golpe de Rayo Súbito (y del ataque furtivo/súbito que se le sume) aumenta a 18 metros (60 pies); puede asestar un golpe de gracia con un conjuro de rayo que inflija daño si está adyacente al objetivo; y una vez al día puede potenciar un conjuro de rayo como con la dote Potenciar Conjuro, sin cambiar su nivel efectivo ni su tiempo de lanzamiento.",
  },
];

// ---------------------------------------------------------------------------
// Truhan Certero (Uncanny Trickster)
//
// SIN FICHA DISPONIBLE: es una de las 11 clases reales de Complete
// Scoundrel (aparece listada en docs/prestige/README.md), pero el archivo
// docs/prestige/uncanny-trickster.md no existe en el repositorio, así que
// no hay ficha con la que contrastar sus mecánicas. Se deja sin tocar en
// vez de arriesgarse a mantener o inventar rasgos sin verificar.
// ---------------------------------------------------------------------------

const UNCANNY_TRICKSTER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Ataque furtivo continuado",
    description: "El daño adicional por ataque furtivo del personaje aumenta en +1d6 en los niveles 1, 3, 5, 7 y 9 de esta clase.",
  },
  {
    level: 1,
    name: "Habilidad especial de pícaro",
    description: "En cada nivel impar, obtiene una habilidad especial adicional de las que normalmente elegiría un pícaro (como esquiva sobrenatural mejorada, sentido peligroso o similar), a discreción del jugador y el Director de Juego.",
  },
  {
    level: 2,
    name: "Lanzamiento de conjuros continuado",
    description:
      "Los niveles de truhan certero se suman a los de su clase de lanzador arcano previa a efectos de conjuros por día y nivel de lanzador, pero no otorgan acceso a conjuros de nivel superior al que ya podía lanzar por esa clase.",
  },
  {
    level: 4,
    name: "Timo mágico",
    description: "Una vez al día, puede lanzar cualquier conjuro de nivel 2 o inferior que conozca disimulándolo por completo como un gesto casual o una frase de conversación, sin que los testigos noten que se ha lanzado un conjuro salvo con una prueba de Detectar Magia o Averiguar Intenciones (CD 20).",
  },
  {
    level: 6,
    name: "Escurridizo",
    description: "Gana un bonificador de +2 a las tiradas de salvación de Reflejos para reducir a la mitad el daño de efectos que normalmente no lo permitirían, similar a la evasión mejorada.",
  },
  {
    level: 8,
    name: "Golpe de dos caras",
    description: "Cuando hace un ataque furtivo con éxito, puede sacrificar parte de ese daño adicional (hasta la mitad) para en su lugar aplicar un efecto menor de su elección similar a un conjuro de toque de nivel 1 que ya conozca, sin gastar espacio de conjuro.",
  },
  {
    level: 10,
    name: "Truco maestro",
    description:
      "Una vez al día, puede combinar un ataque furtivo con éxito con el lanzamiento inmediato y gratuito de un conjuro de toque de hasta nivel 3 que conozca, aplicando ambos efectos sobre el mismo objetivo en una sola acción.",
  },
];

export const CS_CLASSES: ClassDef[] = [
  {
    id: "cs-fortunes-friend",
    name: "Amigo de la Fortuna (Fortune's Friend)",
    source: "complete-scoundrel",
    description:
      "Un devoto de la buena suerte que ha aprendido a acumular relanzamientos y bonificadores de suerte propios y a canalizarlos en el momento decisivo, además de seguir progresando en los conjuros de una clase divina que ya dominaba.",
    hitDie: 6,
    skillPointsPerLevel: 6,
    classSkills: [
      "balance",
      "bluff",
      "climb",
      "craft",
      "decipher-script",
      "diplomacy",
      "disable-device",
      "disguise",
      "escape-artist",
      "gather-information",
      "hide",
      "jump",
      "listen",
      "move-silently",
      "open-lock",
      "perform",
      "profession",
      "search",
      "sleight-of-hand",
      "spot",
      "swim",
      "tumble",
      "use-magic-device",
      "use-rope",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: FORTUNES_FRIEND_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +3",
        check: (ctx) => ctx.babTotal >= 3,
      },
      {
        description: "8 rangos en cualquier habilidad",
        check: (ctx) => Object.values(ctx.skillRanks).some((r) => r >= 8),
      },
      {
        description: "Cualquier dote de suerte (p. ej. Favor de la Fortuna o Segunda Oportunidad)",
        check: (ctx) => ctx.featIds.has("cs-fortunes-favor") || ctx.featIds.has("cs-second-chance"),
      },
    ],
  },
  {
    id: "cs-golden-lion",
    name: "León Dorado (Golden Lion)",
    source: "complete-scoundrel",
    description:
      "Un caballero errante que ha jurado enfrentarse a tiranos, opresores y abusadores del poder allí donde los encuentre, inspirando a los oprimidos con su sola presencia.",
    hitDie: 10,
    skillPointsPerLevel: 4,
    classSkills: [
      "diplomacy",
      "gather-information",
      "handle-animal",
      "intimidate",
      "knowledge-local",
      "knowledge-nobility-royalty",
      "perform",
      "ride",
      "sense-motive",
      "spot",
    ],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: GOLDEN_LION_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Diplomacia: 8 rangos",
        check: (ctx) => (ctx.skillRanks["diplomacy"] ?? 0) >= 8,
      },
      {
        description: "Saber (Nobleza y Realeza): 4 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-nobility-royalty"] ?? 0) >= 4,
      },
      { description: "Alineamiento no malvado" },
    ],
  },
  {
    id: "cs-invisible-blade",
    name: "Hoja Invisible (Invisible Blade)",
    source: "complete-scoundrel",
    description:
      "Un duelista que ha aprendido a percibir y golpear con precisión letal a oponentes que no puede ver, convirtiendo la oscuridad y la invisibilidad ajena en un terreno de caza.",
    hitDie: 8,
    skillPointsPerLevel: 6,
    classSkills: [
      "balance",
      "bluff",
      "diplomacy",
      "escape-artist",
      "hide",
      "intimidate",
      "jump",
      "listen",
      "move-silently",
      "perform",
      "sense-motive",
      "spot",
      "tumble",
    ],
    babProgression: "completa",
    saves: { fort: "mala", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: INVISIBLE_BLADE_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Engañar: 8 rangos",
        check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 8,
      },
      {
        description: "Sutileza con las Armas",
        check: hasFeat("weapon-finesse"),
      },
      { description: "Capacidad de infligir daño de ataque furtivo" },
    ],
  },
  {
    id: "cs-spellwarp-sniper",
    name: "Francotirador Deformaconjuros (Spellwarp Sniper)",
    source: "complete-scoundrel",
    description:
      "Un tirador arcano que ha aprendido a deformar sus conjuros de área en rayos certeros, convirtiendo conjuros de alcance mayor que toque y duración instantánea en ataques de toque a distancia que anulan la salvación de Reflejos original.",
    hitDie: 6,
    skillPointsPerLevel: 4,
    classSkills: ["concentration", "craft", "hide", "intimidate", "knowledge-arcana", "move-silently", "profession", "spellcraft", "spot"],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: SPELLWARP_SNIPER_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Concentración: 8 rangos",
        check: (ctx) => (ctx.skillRanks["concentration"] ?? 0) >= 8,
      },
      {
        description: "Conocimiento de Conjuros: 8 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 8,
      },
      { description: "Disparo a Bocajarro", check: hasFeat("point-blank-shot") },
      { description: "Capacidad de lanzar conjuros arcanos de nivel 3" },
      { description: "Capacidad de infligir ataque furtivo o ataque súbito de +1d6" },
    ],
  },
  {
    id: "cs-uncanny-trickster",
    name: "Truhan Certero (Uncanny Trickster)",
    source: "complete-scoundrel",
    description:
      "Un pícaro con un pie en la magia arcana que sigue perfeccionando tanto sus trucos furtivos como su repertorio de conjuros, mezclando ambos en un mismo golpe.",
    hitDie: 6,
    skillPointsPerLevel: 8,
    classSkills: [
      "appraise",
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
      "knowledge-arcana",
      "knowledge-local",
      "listen",
      "move-silently",
      "open-lock",
      "perform",
      "profession",
      "search",
      "sense-motive",
      "sleight-of-hand",
      "spellcraft",
      "spot",
      "swim",
      "tumble",
      "use-magic-device",
      "use-rope",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: UNCANNY_TRICKSTER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Engañar: 8 rangos",
        check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 8,
      },
      {
        description: "Nivel de pícaro 7 o superior (ataque furtivo +4d6)",
        check: (ctx) => (ctx.classLevels["rogue"] ?? 0) >= 7,
      },
      {
        description: "Capacidad de lanzar conjuros arcanos de nivel 1 o superior",
        check: (ctx) => ctx.casterLevel >= 1,
      },
    ],
  },
];

export const CS_CLASS_IDS = CS_CLASSES.map((c) => c.id);
