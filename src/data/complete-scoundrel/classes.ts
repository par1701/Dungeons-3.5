import type { ClassDef, ClassFeature, FeatPrereqContext } from "../../types";

// Clases de prestigio de Complete Scoundrel (2007).
//
// Complete Scoundrel presenta cinco clases de prestigio: Fortune's Friend,
// Golden Lion, Invisible Blade, Spellwarp Sniper y Uncanny Trickster. Se
// incluyen las cinco porque hay confianza razonable en su existencia y en el
// concepto central de cada una, aunque los rasgos por nivel se han resumido
// y aproximado con las propias palabras de quien mantiene estos datos (no
// son una transcripción literal del libro). Como en el resto de libros de
// esta app, se ha preferido omitir cualquier detalle numérico del que no
// haya confianza antes que inventarlo con precisión falsa.
//
// Ninguna de estas clases tiene una lista de conjuros propia con progresión
// completa: Fortune's Friend y Uncanny Trickster continúan el nivel de
// lanzador de una clase de conjuros que el personaje ya poseía (divina y
// arcana respectivamente), y Spellwarp Sniper reutiliza los conjuros de
// toque arcanos que el personaje ya conoce. En los tres casos se omite el
// campo `spellcasting` y el efecto se documenta como un `ClassFeature` de
// texto, tal como indican las convenciones de este proyecto.

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

// ---------------------------------------------------------------------------
// Amigo de la Fortuna (Fortune's Friend)
// ---------------------------------------------------------------------------

const FORTUNES_FRIEND_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Lanzamiento de conjuros continuado",
    description:
      "Los niveles de amigo de la fortuna se suman a los de su clase divina previa a efectos de conjuros por día y nivel de lanzador, pero no otorgan conjuros de nivel superior al que ya podía lanzar por esa clase.",
  },
  {
    level: 1,
    name: "Toque de fortuna",
    description:
      "Una vez al día, como acción estándar, puede tocar a un aliado para concederle un bonificador de suerte de +2 a una única tirada de ataque, salvación o prueba de habilidad que realice antes de que termine el siguiente asalto.",
  },
  {
    level: 2,
    name: "Suerte compartida",
    description: "El alcance de Toque de Fortuna aumenta a 9 metros y ya no requiere tocar al aliado, solo señalarlo.",
  },
  {
    level: 3,
    name: "Bendición de la fortuna",
    description:
      "Una vez al día, como acción estándar, puede conceder un bonificador de suerte de +1 a la Clase de Armadura y a las tiradas de salvación a todos los aliados en un radio de 9 metros durante 1 minuto.",
  },
  {
    level: 4,
    name: "Fortuna redoblada",
    description: "Puede usar Toque de Fortuna dos veces al día en lugar de una.",
  },
  {
    level: 5,
    name: "El favor de la Dama Fortuna",
    description:
      "Una vez al día, como acción inmediata, puede obligar a un enemigo a repetir una tirada de ataque, salvación o prueba de habilidad que le acabe de resultar favorable, quedándose con el peor de los dos resultados.",
  },
];

// ---------------------------------------------------------------------------
// León Dorado (Golden Lion)
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
    name: "Disparo de toque",
    description:
      "Puede lanzar cualquier conjuro arcano de toque que conozca y disparar de inmediato una ballesta cuyo proyectil transporta el efecto, entregándolo como un ataque de toque a distancia contra un objetivo dentro del alcance normal de la ballesta, en lugar de necesitar tocar al objetivo en persona.",
  },
  {
    level: 2,
    name: "Lanzamiento de conjuros continuado",
    description:
      "Los niveles de francotirador deformaconjuros se suman a los de su clase de lanzador arcano previa a efectos de conjuros por día y nivel de lanzador, pero no otorgan acceso a conjuros de nivel superior al que ya podía lanzar por esa clase.",
  },
  {
    level: 3,
    name: "Perforar resistencia con el disparo",
    description: "Gana un bonificador de +2 a las pruebas de nivel de lanzador para superar la resistencia a conjuros cuando entrega un conjuro de toque a través de un disparo de ballesta.",
  },
  {
    level: 4,
    name: "Doble entrega",
    description: "Al entregar un conjuro de toque mediante un disparo de ballesta, el proyectil también causa su daño normal de arma además del efecto del conjuro.",
  },
  {
    level: 5,
    name: "Golpe deformador perfecto",
    description: "Sus disparos que entregan conjuros de toque ignoran por completo la resistencia a conjuros del objetivo.",
  },
];

// ---------------------------------------------------------------------------
// Truhan Certero (Uncanny Trickster)
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
    description: "Una vez al día, puede lanzar cualquier conjuro de nivel 2 o inferior que conozca disimulándolo por completo como un gesto casual o una frase de conversación, sin que los testigos noten que se ha lanzado un conjuro salvo con una prueba de Detectar Magia o Sentir Motivaciones (CD 20).",
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
      "Un devoto de la suerte y el azar que aprende a compartir su providencia personal con sus aliados, tocándolos con la fortuna en el momento justo.",
    hitDie: 6,
    skillPointsPerLevel: 4,
    classSkills: [
      "bluff",
      "diplomacy",
      "gather-information",
      "heal",
      "knowledge-history",
      "knowledge-religion",
      "profession",
      "sense-motive",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: FORTUNES_FRIEND_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Conocimiento (Religión): 4 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 4,
      },
      {
        description: "Nivel de lanzador divino 3 o superior",
        check: (ctx) => ctx.casterLevel >= 3,
      },
      {
        description: "Acceso al dominio de la Suerte o devoción declarada a un concepto o deidad de la fortuna",
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
        description: "Conocimiento (Nobleza y Realeza): 4 rangos",
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
        description: "Farolear: 8 rangos",
        check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 8,
      },
      {
        description: "Sutileza con Armas",
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
      "Un tirador arcano que ha aprendido a canalizar sus conjuros de toque a través de los virotes de su ballesta, alcanzando a distancia enemigos que de otro modo solo podría tocar con la mano.",
    hitDie: 6,
    skillPointsPerLevel: 4,
    classSkills: ["craft", "hide", "knowledge-arcana", "move-silently", "profession", "search", "spellcraft", "spot"],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "buena", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: SPELLWARP_SNIPER_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      { description: "Disparo a Bocajarro", check: hasFeat("point-blank-shot") },
      { description: "Disparo Preciso", check: hasFeat("precise-shot") },
      { description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 },
      { description: "Capacidad de lanzar conjuros arcanos de toque de nivel 2 o superior" },
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
        description: "Farolear: 8 rangos",
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
