import type { ClassDef, ClassFeature } from "../../types";

// Clases de prestigio de Complete Champion (2007).
//
// Complete Champion está lleno de clases de prestigio de temática religiosa y
// moral (paladines alternativos, exorcistas, monjes divinos, druidas
// místicos...). Se incluyen aquí solo las que se recuerdan con confianza
// razonable en cuanto a su mecánica real; se ha preferido omitir otras (por
// ejemplo, Bane of Infidels o Justiciar) antes que arriesgarse a inventar
// números o rasgos que no se recuerdan con precisión.
//
// Todas estas clases de prestigio (salvo cuando se indica lo contrario) hacen
// progresar el nivel de lanzador de una clase divina (o, en el caso de Puño
// del Bosque, también las formas salvajes de druida) que el personaje ya
// poseía antes de entrar en la clase de prestigio, en vez de tener su propia
// tabla independiente de conjuros por día. Como el sistema todavía no
// automatiza "avanzar el nivel de lanzador de otra clase", ese efecto se
// documenta como un rasgo de clase (ClassFeature) de texto en el primer
// nivel, y el campo `spellcasting` se omite a propósito.

const DIVINE_CASTER_CLASS_IDS = ["cleric", "druid", "paladin", "ranger"];

function hasDivineCasterLevel(classLevels: Record<string, number>, min = 1): boolean {
  return DIVINE_CASTER_CLASS_IDS.some((id) => (classLevels[id] ?? 0) >= min);
}

// ---------------------------------------------------------------------------
// Contemplativo (Contemplative)
// ---------------------------------------------------------------------------

const CONTEMPLATIVE_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Progresión de conjuros divinos",
    description:
      "Cada nivel de contemplativo otorga un nivel de lanzador divino adicional a una clase de lanzador divino que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos/preparados y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Serenidad",
    description:
      "El contemplativo obtiene un bonificador de +2 a las tiradas de salvación contra efectos de miedo, reflejo de su calma interior cultivada mediante la meditación.",
  },
  {
    level: 2,
    name: "Presencia apacible",
    description:
      "El contemplativo obtiene un bonificador de +2 a las pruebas de Diplomacia y puede usar Diplomacia para calmar a una criatura hostil como si usara la acción de apaciguar, incluso en combate.",
  },
  {
    level: 3,
    name: "Mente imperturbable",
    description:
      "El bonificador contra efectos de miedo aumenta a +4 y el contemplativo obtiene un bonificador de +2 a las tiradas de salvación contra conjuros y efectos de la escuela de Encantamiento.",
  },
  {
    level: 4,
    name: "Toque de paz",
    description:
      "Una vez al día por cada dos niveles de contemplativo, el contemplativo puede tocar a una criatura violenta para forzarla a superar una tirada de salvación de Voluntad o quedar incapaz de atacar durante 1 asalto, como si dudara de su propia agresión.",
  },
  {
    level: 5,
    name: "Presencia apacible mejorada",
    description: "El bonificador a las pruebas de Diplomacia del contemplativo aumenta a +4.",
  },
  {
    level: 6,
    name: "Inmunidad al miedo",
    description: "El contemplativo se vuelve inmune a todos los efectos de miedo, mágicos o mundanos.",
  },
  {
    level: 7,
    name: "Aura de tranquilidad",
    description:
      "Los aliados a 3 metros o menos del contemplativo obtienen un bonificador de moral de +2 a las tiradas de salvación de Voluntad, siempre que el contemplativo esté consciente y no incapacitado.",
  },
  {
    level: 8,
    name: "Toque de paz mejorado",
    description: "El Toque de Paz del contemplativo también aturde a la criatura afectada durante 1 asalto si falla la tirada de salvación, además del efecto anterior.",
  },
  {
    level: 9,
    name: "Voluntad de piedra",
    description: "El contemplativo obtiene un bonificador de +4 de competencia a las tiradas de salvación de Voluntad.",
  },
  {
    level: 10,
    name: "Paz perfecta",
    description:
      "Una vez al día, el contemplativo puede crear un efecto similar al conjuro santuario sobre sí mismo sin componentes ni tiempo de lanzamiento adicional, como acción rápida.",
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
      "Cada nivel de oráculo divino otorga un nivel de lanzador divino adicional a una clase de lanzador divino que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos/preparados y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Visión del oráculo",
    description:
      "El oráculo divino obtiene un bonificador de perspicacia igual a la mitad de su nivel de oráculo divino (mínimo +1) a todas las pruebas de Conocimiento y a las pruebas de Sentir Motivaciones.",
  },
  {
    level: 2,
    name: "Conjuro de adivinación adicional",
    description:
      "Una vez al día, el oráculo divino puede lanzar un conjuro adicional de la escuela de Adivinación que ya conozca o tenga preparado, sin gastar un espacio de conjuro.",
  },
  {
    level: 4,
    name: "Premonición",
    description:
      "El oráculo divino obtiene un bonificador de perspicacia a la Clase de Armadura igual a su bonificador de Sabiduría cuando no esté sorprendido ni indefenso, como un atisbo constante de los peligros inminentes.",
  },
  {
    level: 6,
    name: "Conjuro de adivinación adicional (mejorado)",
    description: "El oráculo divino puede usar su beneficio de conjuro de adivinación adicional dos veces al día.",
  },
  {
    level: 8,
    name: "Palabra de conocimiento",
    description:
      "Una vez al día, el oráculo divino puede lanzar consejo divino (augurio o un efecto similar de obtención de conocimiento) sin necesidad de ofrenda ni componente material alguno.",
  },
  {
    level: 10,
    name: "Voz del destino",
    description:
      "Una vez por semana, el oráculo divino puede obtener una respuesta reveladora sobre un curso de acción concreto, con un efecto similar al conjuro comunión, aunque limitado a una sola pregunta.",
  },
];

// ---------------------------------------------------------------------------
// Puño del Bosque (Fist of the Forest)
// ---------------------------------------------------------------------------

const FIST_OF_THE_FOREST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Progresión de conjuros y forma salvaje",
    description:
      "Cada nivel de puño del bosque otorga un nivel de lanzador divino adicional a la clase de druida que el personaje ya poseyera antes de entrar en la clase de prestigio, así como los usos adicionales de forma salvaje que correspondan a ese nivel de druida efectivo, exactamente como si hubiera obtenido un nivel de druida a esos efectos (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Ataque desarmado mejorado",
    description:
      "El puño del bosque no provoca ataques de oportunidad al atacar desarmado y su daño de ataque desarmado sigue la progresión de daño desarmado de monje según su nivel de clase combinado (druida + puño del bosque), comenzando en 1d6 para un personaje de tamaño Mediano.",
  },
  {
    level: 2,
    name: "CA de la naturaleza",
    description: "Mientras no lleve armadura ni escudo, el puño del bosque suma su bonificador de Sabiduría (si es positivo) a la Clase de Armadura.",
  },
  {
    level: 3,
    name: "Golpe de garra y colmillo",
    description: "Al adoptar forma salvaje, los ataques naturales del puño del bosque se consideran armas mágicas a efectos de superar la reducción de daño.",
  },
  {
    level: 5,
    name: "Torrente de golpes salvaje",
    description: "El puño del bosque puede usar la maniobra de torrente de golpes del monje, tanto en su forma natural como mientras usa forma salvaje, tratando su nivel de clase combinado como nivel de monje a este efecto.",
  },
  {
    level: 7,
    name: "Evasión",
    description: "Si el puño del bosque debe realizar una tirada de salvación de Reflejos por la mitad de daño, en su lugar no sufre ningún daño si tiene éxito.",
  },
  {
    level: 9,
    name: "Forma salvaje mejorada",
    description: "El puño del bosque puede adoptar formas de animal de tamaño Enorme y formas elementales, como una progresión adicional de forma salvaje de druida.",
  },
  {
    level: 10,
    name: "Cuerpo del bosque",
    description: "El puño del bosque obtiene reducción de daño 5/mágico y resistencia a la energía 5 contra un tipo de energía elegido, reflejo de su unión definitiva con la naturaleza salvaje.",
  },
];

// ---------------------------------------------------------------------------
// Hospitalario (Hospitaler)
// ---------------------------------------------------------------------------

const HOSPITALER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Progresión de conjuros divinos",
    description:
      "Cada nivel de hospitalario otorga un nivel de lanzador divino adicional a una clase de lanzador divino que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos/preparados y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Imposición de manos mejorada",
    description:
      "Si el hospitalario ya poseía la habilidad de imposición de manos, su reserva de puntos de golpe curables por día aumenta en su nivel de hospitalario multiplicado por su bonificador de Carisma. Si no la poseía, la obtiene con esa misma reserva reducida a la mitad.",
  },
  {
    level: 2,
    name: "Golpe contra los no-muertos",
    description:
      "Una vez al día por cada dos niveles de hospitalario, el hospitalario puede intentar dar un golpe con un arma cuerpo a cuerpo contra un no-muerto, añadiendo su bonificador de Carisma a la tirada de ataque y su nivel de hospitalario al daño.",
  },
  {
    level: 3,
    name: "Aura de salud",
    description: "Los aliados a 3 metros o menos del hospitalario obtienen un bonificador de +2 a las tiradas de salvación contra enfermedades y venenos.",
  },
  {
    level: 4,
    name: "Curar enfermedades (1/semana)",
    description: "El hospitalario puede curar enfermedades, como el conjuro, una vez a la semana.",
  },
  {
    level: 6,
    name: "Expulsar no-muertos mejorado",
    description: "Si el hospitalario ya podía expulsar no-muertos, sus intentos de expulsión se tratan como si su nivel de expulsión fuera dos niveles de hospitalario más alto.",
  },
  {
    level: 8,
    name: "Curar enfermedades (2/semana)",
    description: "El hospitalario puede curar enfermedades dos veces a la semana.",
  },
  {
    level: 10,
    name: "Santuario del hospitalario",
    description:
      "Una vez al día, el hospitalario puede crear un área de 6 metros de radio centrada en sí mismo en la que todos los aliados heridos reciben una curación menor (1d8 puntos de golpe) al inicio de cada uno de sus turnos, durante 3 asaltos.",
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
      "Cada nivel de exorcista sagrado otorga un nivel de lanzador divino adicional a una clase de lanzador divino que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos/preparados y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Expulsar como conjurador divino",
    description:
      "Si el exorcista sagrado ya podía expulsar o reprender no-muertos, cada nivel de esta clase de prestigio cuenta también como un nivel de esa clase a efectos de determinar el número y la potencia de sus intentos de expulsión.",
  },
  {
    level: 2,
    name: "Golpe expulsor",
    description:
      "El exorcista sagrado puede gastar un intento de expulsión para infundir un arma cuerpo a cuerpo con energía positiva o negativa (según su capacidad de expulsión); el siguiente golpe con éxito contra un no-muerto o un extraplanar malvado inflige daño adicional igual al resultado de expulsión.",
  },
  {
    level: 3,
    name: "Fortaleza contra lo extraplanar",
    description: "El exorcista sagrado obtiene un bonificador de +2 de competencia a las tiradas de salvación contra los conjuros y habilidades especiales de criaturas extraplanares.",
  },
  {
    level: 4,
    name: "Golpe expulsor mejorado",
    description: "El Golpe Expulsor del exorcista sagrado también puede usarse contra criaturas extraplanares de alineamiento opuesto a su expulsión, no solo contra no-muertos.",
  },
  {
    level: 5,
    name: "Destierro",
    description: "Una vez al día, el exorcista sagrado puede intentar expulsar de vuelta a su plano de origen a una criatura extraplanar mediante una prueba de expulsión enfrentada a una tirada de salvación de Voluntad de la criatura, como el conjuro destierro.",
  },
  {
    level: 7,
    name: "Fortaleza contra lo extraplanar (mejorada)",
    description: "El bonificador contra conjuros y habilidades especiales de criaturas extraplanares aumenta a +4.",
  },
  {
    level: 8,
    name: "Resistencia a conjuros",
    description: "El exorcista sagrado obtiene resistencia a conjuros igual a 10 + su nivel de exorcista sagrado, aplicable solo frente a conjuros lanzados por no-muertos o criaturas extraplanares malvadas.",
  },
  {
    level: 10,
    name: "Purga definitiva",
    description: "Una vez al día, el exorcista sagrado puede usar su capacidad de Destierro sin tirada de salvación enfrentada contra un único no-muerto o extraplanar con Dados de Golpe iguales o inferiores a su nivel de exorcista sagrado.",
  },
];

// ---------------------------------------------------------------------------
// Puño Sagrado (Sacred Fist)
// ---------------------------------------------------------------------------

const SACRED_FIST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Progresión de conjuros divinos",
    description:
      "Cada nivel de puño sagrado otorga un nivel de lanzador divino adicional a una clase de lanzador divino que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos/preparados y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 1,
    name: "Ataque desarmado mejorado",
    description:
      "El puño sagrado no provoca ataques de oportunidad al atacar desarmado y su daño de ataque desarmado sigue la progresión de daño desarmado de monje según su nivel de clase combinado (nivel de monje, si tiene, más nivel de puño sagrado), comenzando en 1d6 para un personaje de tamaño Mediano.",
  },
  {
    level: 1,
    name: "CA del puño sagrado",
    description: "Mientras no lleve armadura ni escudo, el puño sagrado suma su bonificador de Sabiduría (si es positivo) a la Clase de Armadura.",
  },
  {
    level: 2,
    name: "Torrente de golpes divino",
    description: "El puño sagrado puede usar la maniobra de torrente de golpes del monje, tratando su nivel de clase combinado (monje más puño sagrado) como nivel de monje a este efecto.",
  },
  {
    level: 4,
    name: "Golpe con propósito",
    description: "Una vez al día por cada tres niveles de puño sagrado, el puño sagrado puede añadir su bonificador de Carisma a la tirada de daño de un ataque desarmado con éxito contra una criatura de alineamiento opuesto al suyo.",
  },
  {
    level: 6,
    name: "Velocidad sin armadura",
    description: "Mientras no lleve armadura ni carga pesada, la velocidad del puño sagrado aumenta en 3 metros.",
  },
  {
    level: 8,
    name: "Ataque desarmado sagrado",
    description: "Los ataques desarmados del puño sagrado se consideran armas alineadas (de acuerdo con su alineamiento) a efectos de superar la reducción de daño.",
  },
  {
    level: 10,
    name: "Cuerpo consagrado",
    description: "El puño sagrado obtiene resistencia a conjuros igual a 15 + su nivel de puño sagrado frente a conjuros lanzados por criaturas de alineamiento opuesto al suyo.",
  },
];

export const CC_CLASSES: ClassDef[] = [
  {
    id: "cc-contemplative",
    name: "Contemplativo (Contemplative)",
    source: "complete-champion",
    description:
      "Un lanzador divino de temperamento pacífico que cultiva la serenidad interior y la persuasión antes que la violencia, capaz de calmar a sus enemigos sin necesidad de derramar sangre.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "diplomacy", "heal", "knowledge-religion", "profession", "sense-motive", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: CONTEMPLATIVE_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Conocimiento (Religión): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 8,
      },
      {
        description: "Diplomacia: 4 rangos",
        check: (ctx) => (ctx.skillRanks["diplomacy"] ?? 0) >= 4,
      },
      {
        description: "Voluntad de Hierro",
        check: (ctx) => ctx.featIds.has("iron-will"),
      },
      {
        description: "Capacidad de lanzar conjuros divinos de nivel 2",
        check: (ctx) => ctx.casterLevel >= 3 && hasDivineCasterLevel(ctx.classLevels),
      },
    ],
  },
  {
    id: "cc-divine-oracle",
    name: "Oráculo Divino (Divine Oracle)",
    source: "complete-champion",
    description:
      "Un vidente sagrado que ha aprendido a leer los designios de su deidad en signos y presagios, capaz de responder preguntas y anticipar el peligro con una claridad casi profética.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "diplomacy", "knowledge-arcana", "knowledge-history", "knowledge-religion", "knowledge-the-planes", "profession", "sense-motive", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: DIVINE_ORACLE_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Conocimiento (Religión): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 8,
      },
      {
        description: "Conjuros: 8 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 8,
      },
      {
        description: "Capacidad de lanzar el conjuro divino augurio",
      },
      {
        description: "Nivel de lanzador divino 5",
        check: (ctx) => ctx.casterLevel >= 5 && hasDivineCasterLevel(ctx.classLevels),
      },
    ],
  },
  {
    id: "cc-fist-of-the-forest",
    name: "Puño del Bosque (Fist of the Forest)",
    source: "complete-champion",
    description:
      "Un druida que ha vuelto su cuerpo un arma tan afilada como sus garras animales, fundiendo la disciplina desarmada del monje con la magia y las formas salvajes de la naturaleza.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: ["balance", "climb", "concentration", "craft", "handle-animal", "heal", "jump", "knowledge-nature", "listen", "profession", "spot", "survival", "swim"],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: ["ataque desarmado"],
    armorProficiencies: [],
    features: FIST_OF_THE_FOREST_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Ataque Desarmado Mejorado",
        check: (ctx) => ctx.featIds.has("improved-unarmed-strike"),
      },
      {
        description: "Conocimiento (Naturaleza): 6 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-nature"] ?? 0) >= 6,
      },
      {
        description: "Capacidad de usar forma salvaje",
        check: (ctx) => (ctx.classLevels["druid"] ?? 0) >= 5,
      },
    ],
  },
  {
    id: "cc-hospitaler",
    name: "Hospitalario (Hospitaler)",
    source: "complete-champion",
    description:
      "Un guerrero santo dedicado a sanar a los suyos y a purgar a los no-muertos, que combina la imposición de manos y la magia divina con una devoción férrea al combate contra la no-vida.",
    hitDie: 10,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "diplomacy", "handle-animal", "heal", "knowledge-religion", "profession", "ride", "sense-motive"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples", "armas marciales"],
    armorProficiencies: ["armadura ligera", "armadura media", "armadura pesada", "escudos"],
    features: HOSPITALER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Curar: 4 rangos",
        check: (ctx) => (ctx.skillRanks["heal"] ?? 0) >= 4,
      },
      {
        description: "Capacidad de lanzar curar heridas leves o de expulsar no-muertos",
        check: (ctx) => hasDivineCasterLevel(ctx.classLevels) || (ctx.classLevels["cleric"] ?? 0) >= 1,
      },
    ],
  },
  {
    id: "cc-sacred-exorcist",
    name: "Exorcista Sagrado (Sacred Exorcist)",
    source: "complete-champion",
    description:
      "Un especialista divino en el destierro de no-muertos y extraplanares malignos, que canaliza su capacidad de expulsión a través de sus armas y de rituales de destierro cada vez más poderosos.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: ["concentration", "craft", "diplomacy", "heal", "knowledge-religion", "knowledge-the-planes", "profession", "sense-motive", "spellcraft"],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: ["armadura ligera"],
    features: SACRED_EXORCIST_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Conocimiento (Religión): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 8,
      },
      {
        description: "Conocimiento (Planos): 4 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-the-planes"] ?? 0) >= 4,
      },
      {
        description: "Voluntad de Hierro",
        check: (ctx) => ctx.featIds.has("iron-will"),
      },
      {
        description: "Capacidad de expulsar o reprender no-muertos y de lanzar conjuros divinos de nivel 2",
        check: (ctx) => ctx.casterLevel >= 3 && hasDivineCasterLevel(ctx.classLevels),
      },
    ],
  },
  {
    id: "cc-sacred-fist",
    name: "Puño Sagrado (Sacred Fist)",
    source: "complete-champion",
    description:
      "Un guerrero desarmado que ha consagrado su cuerpo a su deidad, combinando la disciplina marcial del monje con conjuros divinos y golpes cargados de convicción moral.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: ["balance", "climb", "concentration", "craft", "diplomacy", "heal", "jump", "knowledge-religion", "profession", "sense-motive", "spellcraft", "tumble"],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: ["ataque desarmado"],
    armorProficiencies: [],
    features: SACRED_FIST_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +4",
        check: (ctx) => ctx.babTotal >= 4,
      },
      {
        description: "Ataque Desarmado Mejorado",
        check: (ctx) => ctx.featIds.has("improved-unarmed-strike"),
      },
      {
        description: "Conocimiento (Religión): 4 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 4,
      },
      {
        description: "Capacidad de lanzar conjuros divinos",
        check: (ctx) => hasDivineCasterLevel(ctx.classLevels),
      },
    ],
  },
];
