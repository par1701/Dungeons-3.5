import type { ClassDef } from "../../types";

// Clases de Complete Arcane (2004).
//
// No se incluye al Brujo (Warlock): su magia funciona mediante invocaciones a
// voluntad, un subsistema que nuestro modelo de datos (SpellcastingInfo basado
// en conjuros por día) no soporta todavía.
//
// Tampoco se incluye al Mago Wu Jen: para representarlo con fidelidad haría
// falta modelar sus "secretos elementales" y su lista de conjuros propia con
// precisión, y no hay confianza suficiente en esos detalles como para no
// arriesgarse a inventar contenido. Se prioriza omitir antes que inventar.
//
// Todas las clases de prestigio de este archivo pertenecen a la categoría de
// PrCs que avanzan el nivel de lanzador de una clase arcana que el personaje
// ya poseía, en vez de tener su propia tabla independiente de conjuros por
// día. Como el sistema todavía no automatiza "avanzar el nivel de lanzador de
// otra clase", ese efecto se documenta como un rasgo de clase (ClassFeature)
// de texto en cada nivel, y el campo `spellcasting` se omite a propósito.

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

// ---------------------------------------------------------------------------
// Campeón Abjurador (Abjurant Champion)
// ---------------------------------------------------------------------------

const ABJURANT_CHAMPION_FEATURES = [
  {
    level: 1,
    name: "Escudo Repentino",
    description:
      "El campeón abjurador puede lanzar el conjuro escudo sobre sí mismo como acción rápida un número de veces por día igual a su modificador de Inteligencia, Sabiduría o Carisma (la que use como característica de lanzamiento), en vez del tiempo de lanzamiento normal.",
  },
  {
    level: 1,
    name: "Guerrero con Armadura Ligera",
    description:
      "Mientras lleve armadura ligera, el campeón abjurador no sufre la probabilidad de fallo arcano al lanzar sus conjuros arcanos.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de campeón abjurador (1º a 5º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano preparado o espontáneo que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 2,
    name: "Canalización Arcana",
    description:
      "El campeón abjurador puede lanzar un conjuro de toque y \"guardarlo\" en su arma cuerpo a cuerpo, de modo que el siguiente golpe con éxito con esa arma administra el efecto del conjuro además del daño normal del arma.",
  },
  {
    level: 3,
    name: "Canalización Arcana Mejorada",
    description:
      "La Canalización Arcana del campeón abjurador funciona también con conjuros de toque a distancia, permitiéndole administrarlos mediante un disparo con éxito de un arma a distancia.",
  },
  {
    level: 4,
    name: "Aura de Protección",
    description:
      "Mientras el campeón abjurador se beneficia de un conjuro escudo (incluido el lanzado mediante Escudo Repentino), todos sus aliados en un radio de 3 metros obtienen un bonificador de +1 a la Clase de Armadura.",
  },
  {
    level: 5,
    name: "Aura de Protección Mejorada",
    description:
      "El bonificador de la Aura de Protección aumenta a +2 y su radio se extiende a 6 metros. Además, el conjuro escudo lanzado mediante Escudo Repentino dura el doble de lo normal.",
  },
];

// ---------------------------------------------------------------------------
// Erudito Elemental (Elemental Savant)
// ---------------------------------------------------------------------------

const ELEMENTAL_SAVANT_FEATURES = [
  {
    level: 1,
    name: "Vínculo Elemental",
    description:
      "Al entrar en la clase, el erudito elemental elige uno de los cuatro elementos (aire, agua, fuego o tierra) y su energía asociada (electricidad, frío, fuego o ácido, respectivamente). Obtiene resistencia a la energía 5 frente a esa energía.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de erudito elemental (1º a 5º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 2,
    name: "Cuerpo Elemental (menor)",
    description:
      "El cuerpo del erudito elemental empieza a transformarse: obtiene un bonificador de +2 a las pruebas de Concentración realizadas para lanzar conjuros con el descriptor de su elemento.",
  },
  {
    level: 3,
    name: "Resistencia a la Energía 10",
    description: "La resistencia a la energía del elemento elegido aumenta a 10.",
  },
  {
    level: 4,
    name: "Cuerpo Elemental (mayor)",
    description:
      "El erudito elemental es cada vez más ajeno a la carne mortal: gana un bonificador de +2 de competencia a las tiradas de salvación contra conjuros y efectos con el descriptor opuesto a su elemento.",
  },
  {
    level: 5,
    name: "Subtipo Elemental",
    description:
      "El erudito elemental se convierte parcialmente en una criatura del subtipo de su elemento: su resistencia a la energía aumenta a 20 y se vuelve inmune a los efectos de veneno, sueño mágico, parálisis y aturdimiento, además de no ser susceptible de sufrir golpes críticos ni ataques furtivos.",
  },
];

// ---------------------------------------------------------------------------
// Incantatriz (Incantatrix)
// ---------------------------------------------------------------------------

const INCANTATRIX_FEATURES = [
  {
    level: 1,
    name: "Metamagia Instantánea",
    description:
      "Una vez al día, la incantatriz puede aplicar cualquier dote de metamagia que conozca a un conjuro que esté lanzando sin incrementar el tiempo de lanzamiento, gastando en su lugar un espacio de conjuro dos niveles por encima del ajuste normal de esa dote de metamagia.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de incantatriz (1º a 10º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 2,
    name: "Aprendizaje Avanzado",
    description:
      "Una vez por nivel de incantatriz, al ganar acceso a nuevos conjuros la incantatriz puede añadir a su lista de conjuros conocidos o a su libro de conjuros un conjuro arcano que no pertenezca a la lista de su clase, tratándolo como si perteneciera a ella.",
  },
  {
    level: 3,
    name: "Ataque Disipador",
    description:
      "La incantatriz puede canalizar un efecto de disipar magia a través de un ataque de toque cuerpo a cuerpo, en vez de dirigirlo como un conjuro normal.",
  },
  {
    level: 4,
    name: "Metamagia Instantánea Mejorada",
    description: "La incantatriz puede usar la Metamagia Instantánea dos veces por día.",
  },
  {
    level: 5,
    name: "Multitarea Arcana",
    description:
      "La incantatriz puede mantener activo un conjuro de duración \"concentración\" mientras lanza otro conjuro, siempre que supere una prueba de Concentración con CD 20 + el nivel del segundo conjuro.",
  },
  {
    level: 6,
    name: "Aprendizaje Avanzado Mejorado",
    description: "La incantatriz puede usar Aprendizaje Avanzado dos veces por nivel de clase.",
  },
  {
    level: 7,
    name: "Metamagia Instantánea Superior",
    description: "La incantatriz puede usar la Metamagia Instantánea tres veces por día.",
  },
  {
    level: 8,
    name: "Disipación Mayor",
    description: "El Ataque Disipador de la incantatriz funciona como disipar magia mayor.",
  },
  {
    level: 9,
    name: "Metamagia Instantánea Máxima",
    description: "La incantatriz puede usar la Metamagia Instantánea cuatro veces por día.",
  },
  {
    level: 10,
    name: "Maestría en Metamagia",
    description:
      "Una vez al día, la incantatriz puede aplicar una dote de metamagia a un conjuro sin ningún coste adicional de espacio de conjuro.",
  },
];

// ---------------------------------------------------------------------------
// Maestro Pálido (Pale Master)
// ---------------------------------------------------------------------------

const PALE_MASTER_FEATURES = [
  {
    level: 1,
    name: "Aliado Sin Vida",
    description:
      "Los no muertos que el maestro pálido crea o controla mediante animar muertos u otros efectos similares ganan un bonificador de +2 a los puntos de golpe por dado de golpe.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de maestro pálido (1º a 10º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 2,
    name: "Toque Gélido",
    description:
      "El maestro pálido puede realizar un ataque de toque cuerpo a cuerpo que inflige 1d6 puntos de daño de frío, un número de veces por día igual a 3 + su modificador de Carisma.",
  },
  {
    level: 3,
    name: "Resistencia a la Energía (frío) 10",
    description: "El maestro pálido obtiene resistencia al frío 10 mientras su cuerpo se aletarga.",
  },
  {
    level: 4,
    name: "Aura de Repugnancia",
    description:
      "Los animales se niegan a acercarse voluntariamente al maestro pálido a menos que superen una tirada de salvación de Voluntad (CD 10 + la mitad del nivel de clase del maestro pálido + su modificador de Carisma).",
  },
  {
    level: 5,
    name: "Vida Parcialmente Sin Vida",
    description:
      "El cuerpo del maestro pálido empieza a asemejarse al de un no muerto: se vuelve inmune a los efectos de fatiga y agotamiento, y no necesita respirar.",
  },
  {
    level: 6,
    name: "Toque Gélido Mejorado",
    description: "El daño del Toque Gélido aumenta a 2d6 puntos de daño de frío.",
  },
  {
    level: 7,
    name: "Servidores Especiales",
    description:
      "Los esqueletos y zombis que el maestro pálido crea mediante sus conjuros son más resistentes de lo habitual, ganando un dado de golpe adicional y un bonificador de +2 a la Clase de Armadura natural.",
  },
  {
    level: 8,
    name: "Resistencia a la Energía (frío) 20",
    description: "La resistencia al frío del maestro pálido aumenta a 20.",
  },
  {
    level: 9,
    name: "Inmunidades Sin Vida",
    description:
      "El maestro pálido se vuelve inmune a los efectos de veneno, sueño mágico y parálisis, reflejo de su naturaleza cada vez más alejada de la vida.",
  },
  {
    level: 10,
    name: "Naturaleza Casi Sin Vida",
    description:
      "El maestro pálido completa su transformación parcial: es inmune a los golpes críticos y a los ataques furtivos, y obtiene un bonificador de +4 de competencia a las tiradas de salvación contra efectos de muerte y agotamiento de niveles de energía.",
  },
];

// ---------------------------------------------------------------------------
// Espadamante (Spellsword)
// ---------------------------------------------------------------------------

const SPELLSWORD_FEATURES = [
  {
    level: 1,
    name: "Guerrero con Armadura Ligera",
    description:
      "Mientras lleve armadura ligera, la espadamante no sufre la probabilidad de fallo arcano al lanzar sus conjuros arcanos.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de espadamante (1º a 10º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 3,
    name: "Guerrero con Armadura Media",
    description:
      "Mientras lleve armadura media, la espadamante no sufre la probabilidad de fallo arcano al lanzar sus conjuros arcanos.",
  },
  {
    level: 4,
    name: "Dote de Combate Adicional",
    description: "La espadamante obtiene una dote de combate adicional que cumpla sus requisitos.",
  },
  {
    level: 5,
    name: "Ataque de Toque Canalizado",
    description:
      "La espadamante puede lanzar un conjuro de toque y \"guardarlo\" en su arma cuerpo a cuerpo, de modo que el siguiente golpe con éxito con esa arma administra el efecto del conjuro además del daño normal del arma.",
  },
  {
    level: 7,
    name: "Guerrero con Armadura Pesada",
    description:
      "Mientras lleve armadura pesada, la espadamante no sufre la probabilidad de fallo arcano al lanzar sus conjuros arcanos.",
  },
  {
    level: 8,
    name: "Dote de Combate Adicional",
    description: "La espadamante obtiene una segunda dote de combate adicional que cumpla sus requisitos.",
  },
  {
    level: 10,
    name: "Fusión de Acero y Conjuro",
    description:
      "Una vez por combate, la espadamante puede lanzar un conjuro como parte del mismo asalto en que realiza una carga o un ataque a la carrera, sin que ello cuente como su acción estándar habitual para lanzar conjuros.",
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

export const CA_CLASSES: ClassDef[] = [
  {
    id: "ca-abjurant-champion",
    name: "Campeón Abjurador (Abjurant Champion)",
    source: "complete-arcane",
    description:
      "Un lanzador arcano que combina la magia de abjuración con la destreza marcial, protegiéndose a sí mismo y a sus aliados en pleno combate cuerpo a cuerpo mientras sigue progresando en su arte arcano.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "jump", "knowledge-arcana", "profession", "spellcraft", "tumble"],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: ["Armadura ligera"],
    features: ABJURANT_CHAMPION_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Conocimiento de Conjuros: 4 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 4,
      },
      {
        description: "Concentración en Combate",
        check: (ctx) => ctx.featIds.has("combat-casting"),
      },
      {
        description: "Capacidad de lanzar conjuros de abjuración arcanos de nivel 3, nivel de lanzador arcano 3",
        check: (ctx) => ctx.casterLevel >= 3,
      },
    ],
  },
  {
    id: "ca-elemental-savant",
    name: "Erudito Elemental (Elemental Savant)",
    source: "complete-arcane",
    description:
      "Un especialista arcano que ata su magia y, poco a poco, su propio cuerpo a uno de los cuatro elementos clásicos (aire, agua, fuego o tierra), volviéndose cada vez más ajeno a la carne mortal.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "knowledge-arcana", "knowledge-the-planes", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: ELEMENTAL_SAVANT_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Planos): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-the-planes"] ?? 0) >= 8,
      },
      {
        description: "Conocimiento de Conjuros: 8 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 8,
      },
      {
        description:
          "Capacidad de lanzar al menos tres conjuros arcanos distintos con el descriptor del elemento elegido",
      },
      {
        description: "Nivel de lanzador arcano 7",
        check: (ctx) => ctx.casterLevel >= 7,
      },
    ],
  },
  {
    id: "ca-incantatrix",
    name: "Incantatriz (Incantatrix)",
    source: "complete-arcane",
    description:
      "Una lanzadora arcana que ha llevado el estudio de la metamagia a un nivel casi instintivo, capaz de retorcer sus conjuros sobre la marcha y de tomar prestados hechizos de otras tradiciones arcanas.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "knowledge-arcana", "knowledge-the-planes", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: INCANTATRIX_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Conocimiento de Conjuros: 12 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 12,
      },
      {
        description: "Saber (Arcano): 4 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 4,
      },
      {
        description: "Dos dotes de metamagia cualesquiera",
        check: (ctx) => countMatchingFeats(ctx.featIds, ARCANE_METAMAGIC_FEAT_IDS) >= 2,
      },
      {
        description: "Nivel de lanzador arcano 5",
        check: (ctx) => ctx.casterLevel >= 5,
      },
    ],
  },
  {
    id: "ca-pale-master",
    name: "Maestro Pálido (Pale Master)",
    source: "complete-arcane",
    description:
      "Un nigromante que se aventura por la senda que separa la vida de la no vida, ligando su propio cuerpo a los poderes de los no muertos a los que sirve y crea.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "knowledge-arcana", "knowledge-religion", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: PALE_MASTER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Conocimiento de Conjuros: 5 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 5,
      },
      {
        description: "Saber (Arcano): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 8,
      },
      {
        description: "Capacidad de lanzar el conjuro arcano animar muertos",
      },
      {
        description: "Nivel de lanzador arcano 5",
        check: (ctx) => ctx.casterLevel >= 5,
      },
    ],
  },
  {
    id: "ca-spellsword",
    name: "Espadamante (Spellsword)",
    source: "complete-arcane",
    description:
      "Un guerrero que también domina la magia arcana, capaz de combinar el acero y el conjuro en un mismo combate sin que el peso de su armadura le impida lanzar sus hechizos.",
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
    armorProficiencies: ["Armadura ligera"],
    features: SPELLSWORD_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Conocimiento de Conjuros: 5 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 5,
      },
      {
        description: "Soltura con el arma elegida",
        check: (ctx) => ctx.featIds.has("weapon-focus"),
      },
      {
        description: "Capacidad de lanzar conjuros arcanos de nivel 2, nivel de lanzador arcano 3",
        check: (ctx) => ctx.casterLevel >= 3,
      },
    ],
  },
  {
    id: "ca-ultimate-magus",
    name: "Magus Definitivo (Ultimate Magus)",
    source: "complete-arcane",
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
