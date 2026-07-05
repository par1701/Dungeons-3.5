import type { ClassDef, ClassFeature } from "../../types";

// Progresión de conjuros por día compartida por Paladín y Explorador (Ranger).
// Ambas clases son conjuradores divinos de "media casta": empiezan a lanzar
// conjuros en nivel de clase 4 y su nivel de conjuro máximo es 4.
// Índice = nivel de clase (0 sin usar); cada fila = [nivel0, nivel1, nivel2, nivel3, nivel4].
// Nota: nivel0 siempre es 0 porque ni Paladín ni Explorador lanzan trucos/orisons.
const PALADIN_RANGER_SPELLS_PER_DAY: number[][] = [
  [0, 0, 0, 0, 0], // 0 (sin usar)
  [0, 0, 0, 0, 0], // 1
  [0, 0, 0, 0, 0], // 2
  [0, 0, 0, 0, 0], // 3
  [0, 0, 0, 0, 0], // 4
  [0, 0, 0, 0, 0], // 5
  [0, 1, 0, 0, 0], // 6
  [0, 1, 0, 0, 0], // 7
  [0, 1, 0, 0, 0], // 8
  [0, 1, 0, 0, 0], // 9
  [0, 1, 1, 0, 0], // 10
  [0, 1, 1, 0, 0], // 11
  [0, 1, 1, 0, 0], // 12
  [0, 1, 1, 1, 0], // 13
  [0, 2, 1, 1, 0], // 14
  [0, 2, 1, 1, 0], // 15
  [0, 2, 2, 1, 1], // 16
  [0, 2, 2, 1, 1], // 17
  [0, 3, 2, 2, 1], // 18
  [0, 3, 3, 2, 2], // 19
  [0, 3, 3, 3, 3], // 20
];

const barbarianFeatures: ClassFeature[] = [
  { level: 1, name: "Movimiento rápido", description: "La velocidad base de tierra del bárbaro es 3 metros mayor que la normal para su tamaño, siempre que no lleve armadura pesada ni carga pesada." },
  { level: 1, name: "Furia (1/día)", description: "El bárbaro puede entrar en una furia de combate una vez al día. Gana +4 a Fuerza, +4 a Constitución y +2 a las tiradas de salvación de Voluntad, pero sufre -2 a la Clase de Armadura. La furia dura 3 + el nuevo modificador de Constitución rondas y no puede usar habilidades que requieran paciencia o concentración (salvo Intimidar) mientras esté enfurecido." },
  { level: 2, name: "Esquiva sobrenatural", description: "El bárbaro conserva su bonificador de Destreza a la Clase de Armadura incluso cuando es sorprendido o atacado por un enemigo invisible." },
  { level: 3, name: "Sentido del peligro +1", description: "El bárbaro obtiene un bonificador de +1 a las tiradas de salvación de Reflejos contra trampas y un bonificador de +1 a la Clase de Armadura contra los ataques de bonificación de las trampas." },
  { level: 4, name: "Furia (2/día)", description: "El bárbaro puede entrar en furia dos veces por día." },
  { level: 5, name: "Esquiva sobrenatural mejorada", description: "El bárbaro ya no puede ser flanqueado, excepto por un pícaro de nivel 4 niveles superior a su nivel de bárbaro." },
  { level: 6, name: "Sentido del peligro +2", description: "El bonificador de sentido del peligro aumenta a +2." },
  { level: 7, name: "Reducción de daño 1/—", description: "El bárbaro ignora 1 punto de daño de cualquier ataque físico que reciba." },
  { level: 8, name: "Furia (3/día)", description: "El bárbaro puede entrar en furia tres veces por día." },
  { level: 9, name: "Sentido del peligro +3", description: "El bonificador de sentido del peligro aumenta a +3." },
  { level: 10, name: "Reducción de daño 2/—", description: "La reducción de daño del bárbaro aumenta a 2/—." },
  { level: 11, name: "Furia mayor", description: "La furia del bárbaro mejora: +6 a Fuerza, +6 a Constitución y +3 a las tiradas de salvación de Voluntad, con -2 a la Clase de Armadura." },
  { level: 12, name: "Furia (4/día)", description: "El bárbaro puede entrar en furia cuatro veces por día." },
  { level: 12, name: "Sentido del peligro +4", description: "El bonificador de sentido del peligro aumenta a +4." },
  { level: 13, name: "Reducción de daño 3/—", description: "La reducción de daño del bárbaro aumenta a 3/—." },
  { level: 14, name: "Voluntad indomable", description: "Mientras está enfurecido, el bárbaro obtiene un bonificador de +4 a las tiradas de salvación de Voluntad para resistirse a los efectos de encantamiento, sumado a cualquier otro bonificador." },
  { level: 15, name: "Sentido del peligro +5", description: "El bonificador de sentido del peligro aumenta a +5." },
  { level: 16, name: "Reducción de daño 4/—", description: "La reducción de daño del bárbaro aumenta a 4/—." },
  { level: 16, name: "Furia (5/día)", description: "El bárbaro puede entrar en furia cinco veces por día." },
  { level: 17, name: "Furia incansable", description: "El bárbaro ya no queda fatigado al finalizar una furia." },
  { level: 18, name: "Sentido del peligro +6", description: "El bonificador de sentido del peligro aumenta a +6." },
  { level: 19, name: "Reducción de daño 5/—", description: "La reducción de daño del bárbaro aumenta a 5/—." },
  { level: 20, name: "Furia poderosa", description: "La furia del bárbaro mejora: +8 a Fuerza, +8 a Constitución y +4 a las tiradas de salvación de Voluntad, con -2 a la Clase de Armadura." },
  { level: 20, name: "Furia (6/día)", description: "El bárbaro puede entrar en furia seis veces por día." },
];

const fighterFeatures: ClassFeature[] = [
  { level: 1, name: "Dote de guerrero adicional", description: "El guerrero obtiene una dote de combate adicional además de las dotes que cualquier personaje de nivel 1 recibe y de la dote adicional que reciben los personajes humanos." },
  { level: 2, name: "Dote de guerrero adicional", description: "El guerrero obtiene una dote de combate adicional." },
  { level: 4, name: "Dote de guerrero adicional", description: "El guerrero obtiene una dote de combate adicional." },
  { level: 6, name: "Dote de guerrero adicional", description: "El guerrero obtiene una dote de combate adicional." },
  { level: 8, name: "Dote de guerrero adicional", description: "El guerrero obtiene una dote de combate adicional." },
  { level: 10, name: "Dote de guerrero adicional", description: "El guerrero obtiene una dote de combate adicional." },
  { level: 12, name: "Dote de guerrero adicional", description: "El guerrero obtiene una dote de combate adicional." },
  { level: 14, name: "Dote de guerrero adicional", description: "El guerrero obtiene una dote de combate adicional." },
  { level: 16, name: "Dote de guerrero adicional", description: "El guerrero obtiene una dote de combate adicional." },
  { level: 18, name: "Dote de guerrero adicional", description: "El guerrero obtiene una dote de combate adicional." },
  { level: 20, name: "Dote de guerrero adicional", description: "El guerrero obtiene una dote de combate adicional." },
];

const monkFeatures: ClassFeature[] = [
  { level: 1, name: "Ataque desarmado mejorado", description: "El monje recibe Ataque Desarmado Mejorado como dote de bonificación y no provoca ataques de oportunidad al atacar desarmado. Su daño de ataque desarmado es 1d6 (para un monje de tamaño Mediano)." },
  { level: 1, name: "Artes marciales", description: "En primer nivel, el monje puede elegir una dote de bonificación de una lista especial (Agarrar Mejorado, Desviar Flechas, Embestida Mejorada, Puño Aturdidor o Reflejos de Combate), aunque no cumpla los prerrequisitos." },
  { level: 1, name: "CA sin armadura", description: "Mientras no lleve armadura, escudo ni cargue demasiado peso, el monje suma su bonificador de Sabiduría (si es positivo) a la Clase de Armadura." },
  { level: 1, name: "Torrente de golpes", description: "El monje puede prescindir de su bonificador de ataque normal para realizar un ataque adicional en la ronda, con un penalizador a todos sus ataques desarmados." },
  { level: 2, name: "Artes marciales", description: "En segundo nivel, el monje elige una segunda dote de bonificación de la lista especial de monje." },
  { level: 2, name: "Evasión", description: "Si el monje debe realizar una tirada de salvación de Reflejos por la mitad de daño, en su lugar no sufre ningún daño si tiene éxito." },
  { level: 3, name: "Quietud mental", description: "El monje obtiene un bonificador de +2 a las tiradas de salvación de Voluntad para resistirse a los conjuros y efectos de la escuela de Encantamiento." },
  { level: 3, name: "Velocidad sin armadura +3 m", description: "Mientras no lleve armadura ni carga pesada, la velocidad del monje aumenta en 3 metros (acumulativo con futuros aumentos)." },
  { level: 4, name: "Golpe ki (mágico)", description: "Los ataques desarmados del monje se consideran armas mágicas a efectos de superar la reducción de daño." },
  { level: 4, name: "Caída lenta (6 m)", description: "Si el monje está en contacto con una pared, puede usarla para frenar una caída, tratándola como si fuera 6 metros más corta de lo que realmente es." },
  { level: 5, name: "Pureza de cuerpo", description: "El monje obtiene inmunidad a todas las enfermedades, incluidas las de origen sobrenatural o mágico." },
  { level: 6, name: "Artes marciales", description: "En sexto nivel, el monje elige una tercera dote de bonificación de la lista especial de monje." },
  { level: 6, name: "Velocidad sin armadura +6 m", description: "El bonificador acumulado a la velocidad sin armadura del monje aumenta a 6 metros." },
  { level: 6, name: "Caída lenta (9 m)", description: "La distancia de caída lenta del monje aumenta a 9 metros." },
  { level: 7, name: "Plenitud del cuerpo", description: "El monje puede curarse a sí mismo un número de puntos de golpe igual al doble de su nivel de monje, una vez al día, como acción estándar." },
  { level: 8, name: "Caída lenta (12 m)", description: "La distancia de caída lenta del monje aumenta a 12 metros." },
  { level: 9, name: "Velocidad sin armadura +9 m", description: "El bonificador acumulado a la velocidad sin armadura del monje aumenta a 9 metros." },
  { level: 9, name: "Evasión mejorada", description: "El monje no sufre ningún daño en una tirada de salvación de Reflejos con éxito por la mitad de daño, y solo la mitad del daño aunque falle la tirada." },
  { level: 10, name: "Golpe ki (legal)", description: "Los ataques desarmados del monje se consideran armas de alineamiento legal a efectos de superar la reducción de daño." },
  { level: 10, name: "Caída lenta (15 m)", description: "La distancia de caída lenta del monje aumenta a 15 metros." },
  { level: 11, name: "Cuerpo de diamante", description: "El monje obtiene inmunidad a todos los venenos." },
  { level: 11, name: "Torrente de golpes mayor", description: "Al usar torrente de golpes, el monje puede realizar un ataque adicional más." },
  { level: 12, name: "Velocidad sin armadura +12 m", description: "El bonificador acumulado a la velocidad sin armadura del monje aumenta a 12 metros." },
  { level: 12, name: "Paso abundante", description: "El monje puede usar paso brumoso (como el conjuro) una vez al día, como si fuera lanzado por un conjurador de nivel igual a la mitad de su nivel de monje." },
  { level: 12, name: "Caída lenta (18 m)", description: "La distancia de caída lenta del monje aumenta a 18 metros." },
  { level: 13, name: "Alma de diamante", description: "El monje obtiene resistencia a conjuros igual a 10 + su nivel de monje." },
  { level: 14, name: "Caída lenta (21 m)", description: "La distancia de caída lenta del monje aumenta a 21 metros." },
  { level: 15, name: "Velocidad sin armadura +15 m", description: "El bonificador acumulado a la velocidad sin armadura del monje aumenta a 15 metros." },
  { level: 15, name: "Palma trémula", description: "El monje puede intentar matar a un oponente con un golpe desarmado, una vez por semana por cada nivel de monje que posea por encima del 15." },
  { level: 16, name: "Caída lenta (24 m)", description: "La distancia de caída lenta del monje aumenta a 24 metros." },
  { level: 17, name: "Cuerpo atemporal", description: "El monje deja de sufrir penalizadores por vejez a sus puntuaciones de característica, aunque sigue obteniendo los bonificadores por edad." },
  { level: 17, name: "Lengua del sol y la luna", description: "El monje puede hablar con cualquier criatura viviente." },
  { level: 18, name: "Velocidad sin armadura +18 m", description: "El bonificador acumulado a la velocidad sin armadura del monje aumenta a 18 metros." },
  { level: 18, name: "Caída lenta (27 m)", description: "La distancia de caída lenta del monje aumenta a 27 metros." },
  { level: 19, name: "Cuerpo etéreo", description: "El monje puede usar viaje etéreo (como el conjuro) una vez al día, como conjurador de nivel igual a su nivel de monje." },
  { level: 20, name: "Ser perfecto", description: "El monje se convierte en una criatura fabulosa. Gana resistencia a daño 10/mágico y +2 a una puntuación de característica a su elección." },
];

const paladinFeatures: ClassFeature[] = [
  { level: 1, name: "Aura de bien", description: "El poder del aura de bien del paladín (para efectos de detección) es igual a su nivel de personaje." },
  { level: 1, name: "Detectar el mal", description: "El paladín puede usar detectar el mal a voluntad, como el conjuro." },
  { level: 1, name: "Golpe contra el mal (1/día)", description: "Una vez al día, el paladín puede intentar dar un golpe con un arma cuerpo a cuerpo contra una criatura malvada, añadiendo su bonificador de Carisma a la tirada de ataque y su nivel de paladín al daño." },
  { level: 2, name: "Gracia divina", description: "El paladín añade su bonificador de Carisma (si es positivo) como bonificador a todas sus tiradas de salvación." },
  { level: 2, name: "Imposición de manos", description: "El paladín puede curar heridas (propias o ajenas) mediante el tacto. Puede curar un número de puntos de golpe por día igual a su nivel de paladín multiplicado por su bonificador de Carisma." },
  { level: 3, name: "Aura de valor", description: "El paladín es inmune al miedo (mágico o de otro tipo) y sus aliados a 3 metros o menos obtienen un bonificador de moral de +4 a las tiradas de salvación contra el miedo." },
  { level: 3, name: "Salud divina", description: "El paladín es inmune a todas las enfermedades, incluidas las sobrenaturales y mágicas." },
  { level: 4, name: "Expulsar no-muertos", description: "El paladín puede expulsar no-muertos como un clérigo, usando su nivel de paladín menos 3 como nivel de clérigo efectivo." },
  { level: 5, name: "Golpe contra el mal (2/día)", description: "El paladín puede usar su golpe contra el mal dos veces por día." },
  { level: 5, name: "Montura especial", description: "El paladín puede invocar a una montura especial con poderes mágicos, mediante un ritual que requiere una hora." },
  { level: 6, name: "Curar enfermedades (1/semana)", description: "El paladín puede curar enfermedades, como el conjuro, una vez a la semana." },
  { level: 9, name: "Curar enfermedades (2/semana)", description: "El paladín puede curar enfermedades dos veces a la semana." },
  { level: 10, name: "Golpe contra el mal (3/día)", description: "El paladín puede usar su golpe contra el mal tres veces por día." },
  { level: 12, name: "Curar enfermedades (3/semana)", description: "El paladín puede curar enfermedades tres veces a la semana." },
  { level: 15, name: "Curar enfermedades (4/semana)", description: "El paladín puede curar enfermedades cuatro veces a la semana." },
  { level: 15, name: "Golpe contra el mal (4/día)", description: "El paladín puede usar su golpe contra el mal cuatro veces por día." },
  { level: 18, name: "Curar enfermedades (5/semana)", description: "El paladín puede curar enfermedades cinco veces a la semana." },
  { level: 20, name: "Golpe contra el mal (5/día)", description: "El paladín puede usar su golpe contra el mal cinco veces por día." },
];

const rangerFeatures: ClassFeature[] = [
  { level: 1, name: "Enemigo predilecto (1)", description: "El explorador elige un tipo de enemigo predilecto, obteniendo +2 a Avistar, Buscar, Conocimiento, Sentir Motivaciones y Supervivencia relacionados con él, así como +2 al daño contra esas criaturas." },
  { level: 1, name: "Seguir rastro", description: "El explorador obtiene la dote Seguir Rastro como dote de bonificación." },
  { level: 1, name: "Empatía salvaje", description: "El explorador puede mejorar la actitud de un animal, de forma similar a Diplomacia, mediante comunicación e interacción con lenguaje corporal." },
  { level: 2, name: "Estilo de combate (arquería o dos armas)", description: "El explorador elige entre el estilo de combate a distancia (arquería) o el de combate con dos armas, obteniendo la primera dote de bonificación de esa senda aunque no cumpla los prerrequisitos." },
  { level: 3, name: "Aguante", description: "El explorador obtiene la dote Aguante como dote de bonificación." },
  { level: 4, name: "Compañero animal", description: "El explorador puede convocar a un compañero animal que le sirve fielmente." },
  { level: 4, name: "Conjuros divinos", description: "El explorador comienza a lanzar conjuros divinos de la lista de conjuros de explorador, con Sabiduría como característica clave." },
  { level: 5, name: "Enemigo predilecto (2)", description: "El explorador elige un segundo tipo de enemigo predilecto." },
  { level: 6, name: "Estilo de combate mejorado", description: "El explorador obtiene la segunda dote de bonificación de la senda de estilo de combate elegida." },
  { level: 7, name: "Movimiento en la naturaleza", description: "El explorador puede moverse a través de terreno difícil de origen natural (como zarzas o enredaderas) a su velocidad normal y sin sufrir daño ni otros efectos adversos." },
  { level: 8, name: "Rastreador veloz", description: "El explorador puede seguir rastros a su velocidad normal sin penalizador y al doble de su velocidad con un penalizador de -5." },
  { level: 9, name: "Evasión", description: "Si el explorador debe realizar una tirada de salvación de Reflejos por la mitad de daño, en su lugar no sufre ningún daño si tiene éxito." },
  { level: 10, name: "Enemigo predilecto (3)", description: "El explorador elige un tercer tipo de enemigo predilecto." },
  { level: 11, name: "Maestría en el estilo de combate", description: "El explorador obtiene la tercera dote de bonificación de la senda de estilo de combate elegida." },
  { level: 13, name: "Camuflaje", description: "El explorador puede usar Esconderse incluso mientras es observado, siempre que esté en cualquier tipo de terreno natural." },
  { level: 15, name: "Enemigo predilecto (4)", description: "El explorador elige un cuarto tipo de enemigo predilecto." },
  { level: 17, name: "Esconderse a plena vista", description: "El explorador puede usar la habilidad Esconderse incluso mientras es observado, en cualquier tipo de terreno natural, salvo bajo la observación directa de un enemigo predilecto en persecución activa." },
  { level: 20, name: "Enemigo predilecto (5)", description: "El explorador elige un quinto tipo de enemigo predilecto." },
];

export const SRD_CLASSES_A: ClassDef[] = [
  {
    id: "barbarian",
    name: "Bárbaro",
    source: "srd",
    description:
      "Guerrero primitivo que canaliza una furia de combate imparable, ganando fuerza y resistencia sobrehumanas a costa de su defensa.",
    hitDie: 12,
    skillPointsPerLevel: 4,
    classSkills: [
      "climb",
      "craft",
      "handle-animal",
      "intimidate",
      "jump",
      "listen",
      "ride",
      "survival",
      "swim",
    ],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "mala" },
    weaponProficiencies: ["armas simples", "armas marciales"],
    armorProficiencies: ["armadura ligera", "armadura media", "escudos (excepto escudos torre)"],
    features: barbarianFeatures,
    maxLevel: 20,
  },
  {
    id: "fighter",
    name: "Guerrero",
    source: "srd",
    description:
      "Maestro de las armas y la armadura, dedicado en cuerpo y alma al combate marcial, con una progresión de dotes sin igual entre las demás clases.",
    hitDie: 10,
    skillPointsPerLevel: 2,
    classSkills: ["climb", "craft", "handle-animal", "intimidate", "jump", "ride", "swim"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "mala" },
    weaponProficiencies: ["armas simples", "armas marciales"],
    armorProficiencies: ["armadura ligera", "armadura media", "armadura pesada", "escudos (incluidos escudos torre)"],
    features: fighterFeatures,
    maxLevel: 20,
  },
  {
    id: "monk",
    name: "Monje",
    source: "srd",
    description:
      "Artista marcial disciplinado que perfecciona cuerpo y espíritu mediante el entrenamiento físico y la meditación, luchando desarmado con letal eficacia.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "balance",
      "climb",
      "concentration",
      "craft",
      "diplomacy",
      "escape-artist",
      "hide",
      "jump",
      "knowledge-arcana",
      "knowledge-religion",
      "listen",
      "move-silently",
      "perform",
      "profession",
      "ride",
      "sense-motive",
      "spot",
      "swim",
      "tumble",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "buena", will: "buena" },
    weaponProficiencies: [
      "ataque desarmado",
      "garrote",
      "ballesta ligera",
      "ballesta pesada",
      "daga",
      "hacha arrojadiza",
      "jabalina",
      "kama",
      "nunchaku",
      "bastón",
      "sai",
      "shuriken",
      "siangham",
      "honda",
    ],
    armorProficiencies: ["ninguna"],
    features: monkFeatures,
    maxLevel: 20,
  },
  {
    id: "paladin",
    name: "Paladín",
    source: "srd",
    description:
      "Campeón sagrado consagrado a la justicia y al bien, que combina la maestría marcial con dones divinos otorgados por su devoción inquebrantable.",
    hitDie: 10,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "handle-animal",
      "heal",
      "knowledge-nobility-royalty",
      "knowledge-religion",
      "profession",
      "ride",
      "sense-motive",
      "spellcraft",
    ],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "mala" },
    weaponProficiencies: ["armas simples", "armas marciales"],
    armorProficiencies: ["armadura ligera", "armadura media", "armadura pesada", "escudos"],
    spellcasting: {
      type: "preparado",
      ability: "wis",
      spellListId: "paladin",
      maxSpellLevel: 4,
      spellsPerDay: PALADIN_RANGER_SPELLS_PER_DAY,
      startLevel: 4,
    },
    features: paladinFeatures,
    maxLevel: 20,
  },
  {
    id: "ranger",
    name: "Explorador",
    source: "srd",
    description:
      "Cazador y guardián de las tierras salvajes, experto en rastreo, supervivencia y combate contra enemigos predilectos, que con la experiencia obtiene también dones divinos ligados a la naturaleza.",
    hitDie: 8,
    skillPointsPerLevel: 6,
    classSkills: [
      "climb",
      "concentration",
      "craft",
      "handle-animal",
      "heal",
      "hide",
      "jump",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-nature",
      "listen",
      "move-silently",
      "profession",
      "ride",
      "search",
      "spot",
      "survival",
      "swim",
      "use-rope",
    ],
    babProgression: "completa",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: ["armas simples", "armas marciales"],
    armorProficiencies: ["armadura ligera", "escudos (excepto escudos torre)"],
    spellcasting: {
      type: "preparado",
      ability: "wis",
      spellListId: "ranger",
      maxSpellLevel: 4,
      spellsPerDay: PALADIN_RANGER_SPELLS_PER_DAY,
      startLevel: 4,
    },
    features: rangerFeatures,
    maxLevel: 20,
  },
];
