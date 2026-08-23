import type { Feat, FeatPrereqContext } from "../../types";

// Dotes de "Complete Warrior" (2003).
//
// Contenido mecánico redactado con palabras propias a partir del recuerdo del
// manual (no es una copia literal del texto original).
//
// Convenciones (iguales a las del SRD):
// - `id` en kebab-case basado en el nombre en inglés, con prefijo `cw-`.
// - `prerequisites[].check` solo se define para prerrequisitos mecánicos
//   simples y verificables (puntuación de característica, BAB, dote previa,
//   rango de habilidad). Los prerrequisitos narrativos o de nivel de clase
//   concreto quedan solo como texto.
// - Solo se incluyen dotes de las que hay razonable certeza de que pertenecen
//   a este libro; no se han incluido variantes de armas exóticas orientales
//   específicas porque el sistema ya cubre cualquier arma nueva mediante la
//   dote genérica "Competencia con Arma Exótica" del SRD (con selección).

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

export const CW_FEATS: Feat[] = [
  // ---------------------------------------------------------------------
  // GENERALES
  // ---------------------------------------------------------------------
  {
    id: "cw-daunting-presence",
    name: "Presencia Imponente",
    source: "complete-warrior",
    types: ["general", "combate"],
    description: "La sola visión de sus victorias en combate basta para sembrar el miedo entre quienes lo observan.",
    benefit:
      "Cuando reduce a un enemigo a 0 puntos de golpe o menos con un ataque cuerpo a cuerpo, todos los enemigos que hayan presenciado el golpe y se encuentren a 9 metros (30 pies) o menos deben superar una salvación de Voluntad (CD 10 + la mitad de su nivel de personaje + su modificador de Carisma) o quedar conmocionados durante varios asaltos.",
    prerequisites: [
      { description: "Carisma 13", check: (ctx) => ctx.abilityScores.cha >= 13 },
      { description: "8 rangos en Intimidar", check: (ctx) => (ctx.skillRanks["intimidate"] ?? 0) >= 8 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-discipline",
    name: "Disciplina",
    source: "complete-warrior",
    types: ["general"],
    description: "Una calma entrenada que ayuda a mantener la concentración incluso bajo amenaza directa.",
    benefit: "+2 de bonificador de competencia en las pruebas de Concentración e Intimidar.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-divine-might",
    name: "Poder Divino (Complete Warrior)",
    source: "complete-warrior",
    types: ["general"],
    description: "Un paladín o clérigo canaliza su energía divina para golpear con fuerza sobrehumana.",
    benefit:
      "Como acción libre, puede gastar un uso diario de su capacidad de expulsar o reprender no muertos para sumar su modificador de Carisma a las tiradas de daño con arma durante 1 asalto completo.",
    prerequisites: [
      { description: "Fuerza 13", check: (ctx) => ctx.abilityScores.str >= 13 },
      { description: "Capacidad de expulsar o reprender no muertos" },
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-divine-shield",
    name: "Escudo Divino (Complete Warrior)",
    source: "complete-warrior",
    types: ["general"],
    description: "La misma energía divina que expulsa a los no muertos puede levantarse como una barrera protectora.",
    benefit:
      "Como acción estándar, puede gastar un uso diario de su capacidad de expulsar o reprender no muertos para que su escudo gane un bonificador a la Clase de Armadura igual a su modificador de Carisma durante un número de asaltos igual a la mitad de su nivel de personaje.",
    prerequisites: [
      { description: "Capacidad de expulsar o reprender no muertos" },
      { description: "Competencia con Escudo", check: hasFeat("shield-proficiency") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-divine-vigor",
    name: "Vigor Divino",
    source: "complete-warrior",
    types: ["general"],
    description: "Una ráfaga de energía sagrada acelera el cuerpo y los reflejos del guerrero divino.",
    benefit:
      "Como acción estándar, puede gastar un uso diario de su capacidad de expulsar o reprender no muertos para ganar +10 pies (3 m) de velocidad base y 2 puntos de golpe temporales por nivel de personaje, durante un número de minutos igual a su modificador de Carisma.",
    prerequisites: [{ description: "Capacidad de expulsar o reprender no muertos" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-extra-rage",
    name: "Furia Adicional",
    source: "complete-warrior",
    types: ["general"],
    description: "Un bárbaro cuya reserva interior de ira sobrepasa lo habitual.",
    benefit:
      "Puede entrar en furia 2 veces más al día de las que le permitiría normalmente su nivel de bárbaro. Se puede tomar varias veces; sus efectos son acumulativos.",
    prerequisites: [{ description: "Capacidad de entrar en furia" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cw-extra-smiting",
    name: "Castigo Incrementado",
    source: "complete-warrior",
    types: ["general"],
    description: "Un paladín o un clérigo del mal capaz de invocar su ira divina con más frecuencia.",
    benefit:
      "Gana 2 usos adicionales al día de su capacidad de Golpe Divino (Smite Evil o Smite Good). Se puede tomar varias veces; sus efectos son acumulativos.",
    prerequisites: [
      { description: "Capacidad de Golpe Divino contra el mal o el bien" },
      { description: "Bonificador base de ataque +4", check: (ctx) => ctx.babTotal >= 4 },
    ],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cw-improved-favored-enemy",
    name: "Enemigo Predilecto Mejorado",
    source: "complete-warrior",
    types: ["general"],
    description: "Un cazador cuya especialización contra sus presas habituales se vuelve letal.",
    benefit:
      "Inflige +3 de daño adicional a sus enemigos predilectos. Este bonificador se acumula con el bonificador de enemigo predilecto que obtenga de otra clase.",
    prerequisites: [
      { description: "Capacidad de clase de Enemigo Predilecto" },
      { description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-militia",
    name: "Milicia",
    source: "complete-warrior",
    types: ["general"],
    description: "Entrenamiento básico recibido junto a los vecinos de su comunidad para defenderla en caso de necesidad.",
    benefit:
      "Gana competencia con un arma marcial a su elección y con armadura ligera. Además, mientras luche en formación cerrada junto a al menos otros dos aliados que también posean este dote y empuñen el mismo tipo de arma, todos ganan +1 de bonificador de moral a la Clase de Armadura.",
    prerequisites: [],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-monkey-grip",
    name: "Agarre del Mono",
    source: "complete-warrior",
    types: ["general", "combate"],
    description: "Una fuerza descomunal le permite manejar armas pensadas para manos más grandes que las suyas.",
    benefit:
      "Puede empuñar un arma cuerpo a cuerpo de una categoría de tamaño mayor a la que le correspondería como si fuese de su tamaño, sufriendo -2 a las tiradas de ataque mientras la use, sin que ello aumente el esfuerzo necesario para manejarla: un arma ligera de tamaño superior sigue tratándose como ligera, y solo un arma a dos manos de tamaño superior debe empuñarse con las dos manos.",
    prerequisites: [{ description: "Bonificador base de ataque +1", check: (ctx) => ctx.babTotal >= 1 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-steadfast-determination",
    name: "Determinación Firme",
    source: "complete-warrior",
    types: ["general"],
    description: "Una voluntad forjada más en la terquedad que en la sabiduría.",
    benefit:
      "Puede usar su modificador de Constitución en lugar del de Sabiduría en las tiradas de salvación de Voluntad para resistir efectos de miedo y de aturdimiento.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-wild-cohort",
    name: "Compañero Salvaje",
    source: "complete-warrior",
    types: ["general", "especial"],
    description: "Un vínculo espontáneo con una criatura salvaje que decide seguirlo y luchar a su lado.",
    benefit:
      "Atrae un animal apropiado a su nivel de personaje que actúa como un secuaz leal (similar a un familiar), sin necesitar la dote de Liderazgo.",
    prerequisites: [{ description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 }],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // COMBATE — gishes / lanzadores en combate
  // ---------------------------------------------------------------------
  {
    id: "cw-arcane-strike",
    name: "Golpe Arcano",
    source: "complete-warrior",
    types: ["general"],
    description: "El lanzador de conjuros aprende a canalizar su poder arcano directamente en el filo de su arma.",
    benefit:
      "Como acción libre que no provoca ataque de oportunidad, puede sacrificar un conjuro arcano preparado (o un espacio de conjuro) de nivel 1 o superior para ganar, durante 1 asalto, un bonificador a todas sus tiradas de ataque igual al nivel del conjuro sacrificado (sin poder superar su bonificador base de ataque) y un bonificador al daño de 1d4 por nivel del conjuro sacrificado, aplicable únicamente a sus ataques con arma cuerpo a cuerpo, desarmados o con arma natural.",
    prerequisites: [
      { description: "Capacidad de lanzar conjuros arcanos de nivel 3" },
      { description: "Bonificador base de ataque +4", check: (ctx) => ctx.babTotal >= 4 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // COMBATE — cuerpo a cuerpo general
  // ---------------------------------------------------------------------
  {
    id: "cw-adaptable-flanker",
    name: "Flanqueo Adaptable (Complete Warrior)",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un luchador que ajusta su posición en pleno combate para aprovechar cualquier flanqueo posible.",
    benefit:
      "Cuando está flanqueando a un enemigo, puede ceder de forma voluntaria su posición de flanqueo a un aliado que se desplace a una casilla adyacente válida, permitiéndole beneficiarse igualmente del flanqueo ese mismo turno.",
    prerequisites: [
      { description: "Destreza 13", check: (ctx) => ctx.abilityScores.dex >= 13 },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-agile-shield-fighter",
    name: "Uso Ágil de Escudos (Complete Warrior)",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un experto en broqueles capaz de atacar con libertad sin descuidar su defensa.",
    benefit:
      "Puede atacar con un arma sostenida en la misma mano que porta un broquel sin sufrir la penalización de -1 a la Clase de Armadura habitual, y reduce a la mitad la penalización por usar un arma a dos manos mientras lleva puesto un broquel.",
    prerequisites: [
      { description: "Competencia con Escudo", check: hasFeat("shield-proficiency") },
      { description: "Destreza 13", check: (ctx) => ctx.abilityScores.dex >= 13 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-bounding-assault",
    name: "Asalto Doble (Complete Warrior)",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un combatiente que aprovecha el impulso de sus fintas de movimiento para golpear más de una vez.",
    benefit:
      "Cuando usa Ataque Elástico, puede realizar todos los ataques a los que tendría derecho en un ataque completo, en lugar de uno solo, siempre que se desplace tanto antes como después de atacar.",
    prerequisites: [
      { description: "Ataque Elástico", check: hasFeat("spring-attack") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-brutal-throw",
    name: "Lanzamiento Brutal",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un lanzador de armas arrojadizas que confía en su fuerza bruta más que en su puntería.",
    benefit: "Puede usar su modificador de Fuerza en lugar del de Destreza en las tiradas de ataque con armas arrojadizas.",
    prerequisites: [{ description: "Fuerza 13", check: (ctx) => ctx.abilityScores.str >= 13 }],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-close-quarters-fighting",
    name: "Combate en Espacios Reducidos",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un luchador que no pierde eficacia cuando su enemigo lo tiene sujeto en una presa.",
    benefit:
      "Gana un ataque de oportunidad cuando un enemigo intente agarrarlo, incluso en los casos en los que normalmente no provocaría ninguno; si dicho ataque de oportunidad causa daño, el intento de presa del enemigo fracasa automáticamente (salvo que este posea Presa Mejorada u otra capacidad similar, en cuyo caso el daño se suma en su lugar a su prueba de presa enfrentada).",
    prerequisites: [{ description: "Bonificador base de ataque +3", check: (ctx) => ctx.babTotal >= 3 }],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-combat-brute",
    name: "Combate Brutal",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un luchador que convierte cada maniobra de combate en una oportunidad de causar daño extra.",
    benefit:
      "Concede tres maniobras de combate. Golpes de Avance (Advancing Blows): tras un empujón exitoso, gana +1 a las tiradas de ataque y de daño por cada casilla que haya desplazado al objetivo, aplicable en su siguiente asalto. Tajo Desguazador (Sundering Cleave): al destruir el arma o el escudo de un enemigo mediante un intento de Romper Arma, obtiene de inmediato un ataque cuerpo a cuerpo adicional. Golpe con Impulso (Momentum Swing): tras cargar, si usa Ataque Poderoso con una penalización de -5 o mayor, obtiene un bonificador al daño igual a esa penalización multiplicada por 1,5 (por 3 si empuña el arma a dos manos).",
    prerequisites: [
      { description: "Romper Arma Mejorado", check: hasFeat("improved-sunder") },
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-crescent-moon",
    name: "Luna Creciente",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un estilo de combate nacido de danzar en batalla con dos hojas curvas gemelas.",
    benefit:
      "Si golpea al mismo objetivo con su espada y con su daga en un mismo asalto, puede realizar de inmediato un intento de desarme como acción gratuita.",
    prerequisites: [
      { description: "Desarme Mejorado", check: hasFeat("improved-disarm") },
      { description: "Combate con Dos Armas Mejorado", check: hasFeat("improved-two-weapon-fighting") },
      { description: "Combate con Dos Armas", check: hasFeat("two-weapon-fighting") },
      { description: "Soltura con Daga", check: hasFeat("weapon-focus") },
      { description: "Soltura con un arma tipo espada (bastarda, larga, cimitarra o corta)", check: hasFeat("weapon-focus") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-dash",
    name: "Carrera",
    source: "complete-warrior",
    types: ["combate"],
    description: "Piernas entrenadas para ganar terreno con rapidez sin perder la guardia.",
    benefit:
      "Mientras lleve armadura ligera o ninguna armadura y no porte más que una carga ligera, su velocidad base aumenta en 5 pies (1,5 m).",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-defensive-throw",
    name: "Proyección Defensiva",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un luchador que convierte el fallo de su rival en su propia ventaja.",
    benefit:
      "Si el enemigo que es objetivo de su dote Esquiva le ataca cuerpo a cuerpo y falla, puede realizar de inmediato un intento de derribo contra él. Este ataque de oportunidad cuenta contra el número normal de ataques de oportunidad que puede realizar en el asalto.",
    prerequisites: [
      { description: "Destreza 13", check: (ctx) => ctx.abilityScores.dex >= 13 },
      { description: "Reflejos de Combate", check: hasFeat("combat-reflexes") },
      { description: "Esquiva", check: hasFeat("dodge") },
      { description: "Derribo Mejorado", check: hasFeat("improved-trip") },
      { description: "Impacto sin Arma Mejorado", check: hasFeat("improved-unarmed-strike") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-elusive-target",
    name: "Blanco Escurridizo",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un combatiente difícil de inmovilizar, desarmar o derribar en pleno fragor de la batalla.",
    benefit:
      "Concede tres maniobras que emplean su dote Esquiva. Negar Ataque Poderoso (Negate Power Attack): el enemigo designado por su Esquiva no gana el bonificador al daño de Ataque Poderoso contra usted, aunque sigue sufriendo la penalización al ataque. Defensa Desviada (Diverting Defense): el primer ataque de un flanqueador designado falla automáticamente y puede redirigirse para golpear al otro flanqueador, que queda desprevenido ante ese ataque. Provocar Extralimitación (Cause Overreach): si provoca un ataque de oportunidad al moverse y el enemigo falla, obtiene un intento de derribo gratuito sin arriesgarse a ser derribado a su vez.",
    prerequisites: [
      { description: "Esquiva", check: hasFeat("dodge") },
      { description: "Movilidad", check: hasFeat("mobility") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-falling-star-strike",
    name: "Golpe de Estrella Fugaz",
    source: "complete-warrior",
    types: ["combate"],
    description: "Una técnica de combate desarmado que golpea con la fuerza de una estrella al caer.",
    benefit:
      "Al cargar y realizar un ataque desarmado, puede tratar su golpe como si procediera de un arma de tamaño superior, aumentando el dado de daño resultante.",
    prerequisites: [
      { description: "Impacto sin Arma Mejorado", check: hasFeat("improved-unarmed-strike") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-formation-expert",
    name: "Experto en Formación",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un veterano acostumbrado a luchar codo con codo dentro de una unidad organizada.",
    benefit:
      "Concede tres maniobras de combate en formación (funcionan aunque sus aliados no posean este dote). Muro de Escudos (Lock Shields): mientras esté flanqueado por aliados con escudo listo a ambos lados, gana +1 a la Clase de Armadura. Ocupar la Brecha (Step into the Breach): como acción de movimiento, puede ocupar la casilla de un aliado caído adyacente. Muro de Astas (Wall of Polearms): gana +2 a las tiradas de ataque con un arma de asta si aliados adyacentes empuñan el mismo tipo de arma.",
    prerequisites: [{ description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 }],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-improved-buckler-defense",
    name: "Defensa con Broquel Mejorada",
    source: "complete-warrior",
    types: ["combate"],
    description: "El portador de un broquel aprende a golpear con su arma principal sin descuidar su defensa.",
    benefit:
      "Puede atacar con un arma sostenida en la mano que porta un broquel sin perder el bonificador a la Clase de Armadura que este otorga.",
    prerequisites: [{ description: "Competencia con Escudo", check: hasFeat("shield-proficiency") }],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-karmic-strike",
    name: "Impacto Kármico",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un luchador que aprovecha cada golpe recibido para devolver el favor de inmediato.",
    benefit:
      "Tomando un penalizador de -4 a su Clase de Armadura, gana un ataque de oportunidad contra cualquier criatura que le impacte con un ataque cuerpo a cuerpo. Esto no le otorga más ataques de oportunidad de los que normalmente podría realizar en un asalto.",
    prerequisites: [
      { description: "Destreza 13", check: (ctx) => ctx.abilityScores.dex >= 13 },
      { description: "Pericia en Combate", check: hasFeat("combat-expertise") },
      { description: "Esquiva", check: hasFeat("dodge") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-knock-down",
    name: "Derribo Fulminante",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un golpe certero con arma contundente que además desequilibra al enemigo.",
    benefit:
      "Cuando impacta a un enemigo con un ataque cuerpo a cuerpo con un arma contundente y le causa al menos 10 puntos de daño, puede intentar de inmediato una prueba de derribo gratuita contra él como parte del mismo ataque.",
    prerequisites: [
      { description: "Fuerza 13", check: (ctx) => ctx.abilityScores.str >= 13 },
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-leap-attack",
    name: "Ataque en Salto",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un guerrero que convierte un salto en el preludio de un golpe devastador.",
    benefit:
      "Si se desplaza al menos 3 metros (10 pies) mediante un salto antes de realizar un ataque cuerpo a cuerpo con Ataque Poderoso, obtiene el doble del bonificador de daño de Ataque Poderoso en ese golpe (el triple si empuña el arma a dos manos).",
    prerequisites: [{ description: "Ataque Poderoso", check: hasFeat("power-attack") }],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-roundabout-kick",
    name: "Patada Giratoria",
    source: "complete-warrior",
    types: ["combate"],
    description: "Una patada barredora capaz de dejar tambaleante a un enemigo distraído.",
    benefit:
      "Si consigue un golpe crítico con un ataque desarmado, puede realizar de inmediato un ataque desarmado adicional contra el mismo objetivo, usando el mismo bonificador de ataque empleado para el crítico.",
    prerequisites: [
      { description: "Fuerza 15", check: (ctx) => ctx.abilityScores.str >= 15 },
      { description: "Impacto sin Arma Mejorado", check: hasFeat("improved-unarmed-strike") },
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-stand-still",
    name: "Cortar el Paso",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un luchador con reflejos suficientes para detener en seco a un enemigo que intenta escabullirse.",
    benefit:
      "Puede emplear un ataque de oportunidad para realizar una prueba enfrentada de Fuerza (sin causar daño ni arriesgarse a caer) e intentar detener a un enemigo que se mueva a través del área que amenaza, en lugar de atacarlo.",
    prerequisites: [{ description: "Reflejos de Combate", check: hasFeat("combat-reflexes") }],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-twin-sword-style",
    name: "Estilo de la Espada Gemela",
    source: "complete-warrior",
    types: ["combate"],
    description: "Una técnica que enseña a manejar dos espadas idénticas casi como si fueran una sola arma.",
    benefit:
      "Mientras empuñe dos armas idénticas con las que tenga Soltura, una en cada mano, puede usar su arma secundaria para parar como si portara un escudo ligero, ganando +1 de bonificador de escudo a la Clase de Armadura.",
    prerequisites: [
      { description: "Soltura con el arma elegida", check: hasFeat("weapon-focus") },
      { description: "Combate con Dos Armas", check: hasFeat("two-weapon-fighting") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-backstabber",
    name: "Golpe Certero",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un pícaro que sabe exactamente dónde clavar la hoja para maximizar el daño de un ataque furtivo.",
    benefit:
      "Cuando causa daño de ataque furtivo con un arma perforante ligera, recibe un bonificador adicional al daño de ataque furtivo igual al multiplicador de crítico del arma empleada.",
    prerequisites: [{ description: "Capacidad de ataque furtivo" }],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // COMBATE — escudos
  // ---------------------------------------------------------------------
  {
    id: "cw-shield-charge",
    name: "Cargar con el Escudo",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un combatiente que usa su escudo como un ariete durante la carga.",
    benefit:
      "Al cargar, puede sustituir su ataque normal por un golpe de escudo que, de impactar, le permite realizar de inmediato una prueba de derribo enfrentada gratuita contra el objetivo sin provocar ataque de oportunidad; si el intento de derribo falla, el defensor no puede derribarlo a él en respuesta.",
    prerequisites: [
      { description: "Golpe con el Escudo Mejorado", check: hasFeat("improved-shield-bash") },
      { description: "Bonificador base de ataque +3", check: (ctx) => ctx.babTotal >= 3 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-shield-slam",
    name: "Golpetazo con el Escudo",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un golpe de escudo capaz de desequilibrar al enemigo antes de que pueda reaccionar.",
    benefit:
      "Como acción de asalto completo o como parte de una carga, un golpe de escudo exitoso obliga al objetivo a superar una salvación de Fortaleza (CD 10 + la mitad de su nivel de personaje + su modificador de Fuerza) o quedar aturdido durante 1 asalto. No afecta a constructos, criaturas gelatinosas, plantas, no muertos, criaturas incorpóreas ni a quienes sean inmunes a los golpes críticos.",
    prerequisites: [
      { description: "Golpe con el Escudo Mejorado", check: hasFeat("improved-shield-bash") },
      { description: "Cargar con el Escudo", check: hasFeat("cw-shield-charge") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-shield-specialization",
    name: "Especialización con Escudos",
    source: "complete-warrior",
    types: ["combate"],
    description: "Años de práctica con un tipo concreto de escudo lo vuelven una extensión del propio brazo.",
    benefit:
      "+1 de bonificador de escudo adicional a la Clase de Armadura con el tipo de escudo elegido, y la penalización de armadura de dicho escudo se reduce en 1.",
    prerequisites: [{ description: "Competencia con Escudo", check: hasFeat("shield-proficiency") }],
    fighterBonusFeat: true,
    stackable: true,
  },
  {
    id: "cw-shield-ward",
    name: "Guardia de Escudo",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un combatiente que convierte su escudo en un baluarte contra los intentos de desequilibrarlo.",
    benefit:
      "Mientras porte un escudo, gana +2 de bonificador en las pruebas enfrentadas para resistir ser derribado, desarmado o empujado.",
    prerequisites: [{ description: "Competencia con Escudo", check: hasFeat("shield-proficiency") }],
    fighterBonusFeat: true,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // COMBATE — ataque poderoso / arma a dos manos / cargas
  // ---------------------------------------------------------------------
  {
    id: "cw-shock-trooper",
    name: "Soldado de Asalto",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un guerrero que convierte la furia de su carga en pura potencia destructiva, sin importarle exponerse.",
    benefit:
      "Concede tres maniobras. Empujón Dirigido (Directed Bull Rush): al realizar un empujón, puede desviar lateralmente al objetivo en lugar de hacerlo retroceder en línea recta. Empujón en Cadena (Domino Rush): si un empujón hace chocar a un enemigo contra otro, puede realizar de inmediato un intento de derribo gratuito contra ambos. Carga Temeraria (Heedless Charge): al cargar y usar Ataque Poderoso con una penalización de -5 o mayor, puede convertir parte de esa penalización en un bonificador a la Clase de Armadura en lugar de aplicarla íntegramente a sus tiradas de ataque.",
    prerequisites: [
      { description: "Empujón Mejorado", check: hasFeat("improved-bull-rush") },
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-rapid-blitz",
    name: "Ataque Relámpago (Complete Warrior)",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un combatiente capaz de recorrer el campo de batalla sin perder ímpetu ofensivo.",
    benefit:
      "Puede moverse hasta su velocidad y aun así realizar un ataque completo (todos los ataques a los que tenga derecho por su bonificador base de ataque) en el mismo turno, en lugar de un único ataque; sigue provocando ataques de oportunidad por moverse con normalidad.",
    prerequisites: [{ description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 }],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-power-critical",
    name: "Crítico Potenciado",
    source: "complete-warrior",
    types: ["combate"],
    description: "Una precisión letal a la hora de rematar los golpes críticos con un arma concreta.",
    benefit: "+4 de bonificador a las tiradas para confirmar un golpe crítico con el arma elegida.",
    prerequisites: [
      { description: "Soltura con el arma elegida", check: hasFeat("weapon-focus") },
      { description: "Bonificador base de ataque +4", check: (ctx) => ctx.babTotal >= 4 },
    ],
    fighterBonusFeat: true,
    stackable: true,
  },
  {
    id: "cw-bludgeoning-weapon-mastery",
    name: "Maestría en Armas Contundentes",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un especialista en mazas y martillos que sabe exactamente dónde golpear para causar el máximo efecto.",
    benefit:
      "Cuando ataca con un arma contundente, ignora la reducción de daño que ciertas criaturas (como esqueletos u objetos animados) poseen específicamente contra el daño contundente.",
    prerequisites: [
      { description: "Soltura con un arma contundente", check: hasFeat("weapon-focus") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-piercing-weapon-mastery",
    name: "Maestría en Armas Perforantes",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un especialista en lanzas y estoques que conoce las junturas de cualquier armadura.",
    benefit:
      "Cuando ataca con un arma perforante, ignora la reducción de daño que ciertas criaturas poseen específicamente contra el daño perforante.",
    prerequisites: [
      { description: "Soltura con un arma perforante", check: hasFeat("weapon-focus") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-slashing-weapon-mastery",
    name: "Maestría en Armas Cortantes",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un especialista en hojas capaz de seccionar tejidos que resistirían un golpe corriente.",
    benefit:
      "Cuando ataca con un arma cortante, ignora la reducción de daño que ciertas criaturas poseen específicamente contra el daño cortante.",
    prerequisites: [
      { description: "Soltura con un arma cortante", check: hasFeat("weapon-focus") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // COMBATE — presas
  // ---------------------------------------------------------------------
  {
    id: "cw-clever-wrestling",
    name: "Presa Astuta",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un luchador que convierte cada agarre en una oportunidad para golpear con otra arma.",
    benefit:
      "Gana un bonificador de circunstancias para escapar de una presa o inmovilización contra oponentes de mayor tamaño: +2 si el oponente es Grande, +4 si es Enorme, +6 si es Gigantesco y +8 si es Colosal.",
    prerequisites: [
      { description: "Tamaño Pequeño o Mediano" },
      { description: "Impacto sin Arma Mejorado", check: hasFeat("improved-unarmed-strike") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-choke-hold",
    name: "Llave de Ahogo",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un especialista en presas capaz de dejar inconsciente a su rival sin necesidad de matarlo.",
    benefit:
      "Si mantiene inmovilizado a un enemigo en una presa durante un asalto completo, puede optar por dejarlo inconsciente en lugar de causarle el daño no letal habitual de esa presa.",
    prerequisites: [{ description: "Presa Mejorada", check: hasFeat("improved-grapple") }],
    fighterBonusFeat: true,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // COMBATE — montura y lanza
  // ---------------------------------------------------------------------
  {
    id: "cw-mounted-skirmisher",
    name: "Escaramuzador Montado",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un jinete capaz de atacar sin detener jamás el movimiento de su montura.",
    benefit:
      "Puede realizar todos sus ataques normales (no solo uno) mientras su montura se mueve, siempre que esta no se desplace más de su velocidad ese turno, sin provocar ataques de oportunidad por ello.",
    prerequisites: [
      { description: "Combatir desde una Montura", check: hasFeat("mounted-combat") },
      { description: "1 rango en Montar", check: (ctx) => (ctx.skillRanks["ride"] ?? 0) >= 1 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-unseat",
    name: "Desmontar de un Golpe",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un jinete capaz de derribar de la silla a su enemigo con el mero impacto de la lanza.",
    benefit:
      "Cuando impacta con una lanza durante una carga montada, puede realizar de inmediato una prueba de derribo enfrentada gratuita contra el jinete objetivo.",
    prerequisites: [
      { description: "Combatir desde una Montura", check: hasFeat("mounted-combat") },
      { description: "1 rango en Montar", check: (ctx) => (ctx.skillRanks["ride"] ?? 0) >= 1 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // COMBATE — estilos de doble arma (Soltura combinada)
  // ---------------------------------------------------------------------
  {
    id: "cw-anvil-of-thunder",
    name: "Yunque de Trueno",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un estilo que combina el filo de un hacha con la contundencia de un martillo para aturdir a golpes.",
    benefit:
      "Si impacta al mismo objetivo con su hacha y con su martillo en el mismo asalto, ese objetivo debe superar una salvación de Fortaleza o quedar aturdido durante 1 asalto.",
    prerequisites: [
      { description: "Soltura con un arma tipo hacha (hacha de batalla, hacha de mano o hacha arrojadiza enana)" },
      { description: "Soltura con un arma tipo martillo (martillo de guerra o martillo ligero)" },
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
      { description: "Romper Arma Mejorado", check: hasFeat("improved-sunder") },
      { description: "Combate con Dos Armas", check: hasFeat("two-weapon-fighting") },
      { description: "Fuerza 13", check: (ctx) => ctx.abilityScores.str >= 13 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-bear-fang",
    name: "Colmillo de Oso",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un estilo brutal que combina el tajo de un hacha con la daga oculta para inmovilizar al enemigo.",
    benefit:
      "Si impacta al mismo objetivo con su hacha y con su daga en el mismo asalto, puede intentar de inmediato una prueba de presa gratuita contra ese objetivo sin provocar ataque de oportunidad ni necesitar un toque previo; si tiene éxito, suelta el hacha pero gana un ataque adicional con la daga a su mejor bonificador base de ataque (con la penalización normal por combatir agarrado).",
    prerequisites: [
      { description: "Soltura con un arma tipo hacha (hacha de batalla, hacha de mano o hacha arrojadiza enana)" },
      { description: "Soltura con Daga", check: hasFeat("weapon-focus") },
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
      { description: "Combate con Dos Armas", check: hasFeat("two-weapon-fighting") },
      { description: "Fuerza 15", check: (ctx) => ctx.abilityScores.str >= 15 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-high-sword-low-axe",
    name: "Espada Alta, Hacha Baja",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un estilo que combina la precisión de la espada con el peso del hacha para desequilibrar al rival.",
    benefit:
      "Si impacta al mismo objetivo con su espada y con su hacha en el mismo asalto, obtiene un intento de derribo gratuito contra ese objetivo.",
    prerequisites: [
      { description: "Soltura con un arma tipo espada (bastarda, larga, cimitarra o corta)" },
      { description: "Soltura con un arma tipo hacha (hacha de batalla, hacha de mano o hacha arrojadiza enana)" },
      { description: "Derribo Mejorado", check: hasFeat("improved-trip") },
      { description: "Combate con Dos Armas", check: hasFeat("two-weapon-fighting") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-lightning-mace",
    name: "Maza Relampagueante",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un estilo vertiginoso con dos mazas ligeras que aprovecha cada amenaza de crítico para golpear de nuevo.",
    benefit:
      "Mientras empuñe dos mazas ligeras, una en cada mano, cada vez que amenace un golpe crítico gana un ataque adicional ese mismo asalto con su bonificador de ataque más alto.",
    prerequisites: [
      { description: "Soltura con Maza Ligera", check: hasFeat("weapon-focus") },
      { description: "Reflejos de Combate", check: hasFeat("combat-reflexes") },
      { description: "Combate con Dos Armas", check: hasFeat("two-weapon-fighting") },
      { description: "Debe estar empuñando dos mazas ligeras" },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-improved-rapid-shot",
    name: "Disparo Rápido Mejorado",
    source: "complete-warrior",
    types: ["combate"],
    description: "El arquero ha perfeccionado su técnica hasta el punto de disparar con rapidez sin sacrificar precisión.",
    benefit: "Cuando use la dote Disparo Rápido, ignora la penalización de -2 a todas sus tiradas de ataque a distancia ese turno.",
    prerequisites: [
      { description: "Multidisparo", check: hasFeat("manyshot") },
      { description: "Disparo a Bocajarro", check: hasFeat("point-blank-shot") },
      { description: "Disparo Rápido", check: hasFeat("rapid-shot") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-ranged-disarm",
    name: "Desarme a Distancia",
    source: "complete-warrior",
    types: ["combate"],
    description: "El combatiente aprende a desarmar a sus enemigos sin necesidad de acercarse a ellos.",
    benefit:
      "Elige un tipo de arma a distancia con la que tenga competencia. Puede realizar un intento de desarme con esa arma contra un objetivo situado a 9 metros (30 pies) o menos.",
    prerequisites: [
      { description: "Destreza 15", check: (ctx) => ctx.abilityScores.dex >= 15 },
      { description: "Disparo a Bocajarro", check: hasFeat("point-blank-shot") },
      { description: "Disparo Preciso", check: hasFeat("precise-shot") },
      { description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 },
    ],
    fighterBonusFeat: true,
    stackable: true,
  },
  {
    id: "cw-ranged-pin",
    name: "Inmovilizar a Distancia",
    source: "complete-warrior",
    types: ["combate"],
    description: "El combatiente puede clavar la ropa de su enemigo contra una superficie cercana para inmovilizarlo a distancia.",
    benefit:
      "Si el objetivo está a 1,5 metros (5 pies) o menos de un muro, árbol u otra superficie donde un arma arrojadiza o proyectil pueda clavarse, y lleva ropa, armadura u otro atuendo, puede intentar clavarlo contra ella. Debe superar un ataque a distancia normal (no de toque) y a continuación ganar una prueba de presa enfrentada (se aplican los modificadores de tamaño de ambos). Para liberarse, la víctima debe superar una prueba de Fuerza o de Escapismo (CD 15) como acción estándar.",
    prerequisites: [
      { description: "Destreza 15", check: (ctx) => ctx.abilityScores.dex >= 15 },
      { description: "Disparo a Bocajarro", check: hasFeat("point-blank-shot") },
      { description: "Disparo Preciso", check: hasFeat("precise-shot") },
      { description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-ranged-sunder",
    name: "Romper Arma a Distancia",
    source: "complete-warrior",
    types: ["combate"],
    description: "El combatiente puede destrozar objetos y armas empuñadas por sus enemigos disparando o arrojando armas a distancia.",
    benefit:
      "Al atacar objetos con armas a distancia de tipo cortante o contundente, inflige daño completo en vez de la mitad. Puede realizar intentos de romper objetos con armas perforantes (como flechas), aunque en ese caso solo inflige la mitad del daño, dividiéndolo entre dos antes de aplicar la dureza del objeto. Debe estar a 9 metros (30 pies) o menos de su objetivo para realizar un intento de romper armas a distancia.",
    prerequisites: [
      { description: "Fuerza 13", check: (ctx) => ctx.abilityScores.str >= 13 },
      { description: "Disparo a Bocajarro", check: hasFeat("point-blank-shot") },
      { description: "Disparo Preciso", check: hasFeat("precise-shot") },
      { description: "Inmovilizar a Distancia", check: hasFeat("cw-ranged-pin") },
      { description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-sharp-shooting",
    name: "Puntería",
    source: "complete-warrior",
    types: ["combate"],
    description: "El tirador sabe encontrar el hueco justo en la cobertura de su objetivo.",
    benefit:
      "Sus objetivos solo reciben un bonificador de +2 a la Clase de Armadura por cobertura, en vez del bonificador normal. Esta dote no tiene efecto contra objetivos sin cobertura o con cobertura total.",
    prerequisites: [
      { description: "Disparo a Bocajarro", check: hasFeat("point-blank-shot") },
      { description: "Disparo Preciso", check: hasFeat("precise-shot") },
      { description: "Bonificador base de ataque +3", check: (ctx) => ctx.babTotal >= 3 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-improved-two-weapon-defense",
    name: "Defensa con Dos Armas Mejorada",
    source: "complete-warrior",
    types: ["combate"],
    description: "El combatiente aprende a usar su segunda arma como una defensa aún más eficaz.",
    benefit:
      "Mientras empuñe dos armas (sin contar armas naturales ni ataques desarmados), gana un bonificador de escudo de +2 a la Clase de Armadura. Este bonificador aumenta a +4 si lucha a la defensiva o usa la acción de defensa total.",
    prerequisites: [
      { description: "Combate con Dos Armas", check: hasFeat("two-weapon-fighting") },
      { description: "Defensa con Dos Armas", check: hasFeat("two-weapon-defense") },
      { description: "Destreza 17", check: (ctx) => ctx.abilityScores.dex >= 17 },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-greater-two-weapon-defense",
    name: "Defensa con Dos Armas Superior",
    source: "complete-warrior",
    types: ["combate"],
    description: "El combatiente domina por completo el arte de defenderse con un arma en cada mano.",
    benefit:
      "Mientras empuñe dos armas (sin contar armas naturales ni ataques desarmados), gana un bonificador de escudo de +3 a la Clase de Armadura. Este bonificador aumenta a +6 si lucha a la defensiva o usa la acción de defensa total.",
    prerequisites: [
      { description: "Combate con Dos Armas", check: hasFeat("two-weapon-fighting") },
      { description: "Combate con Dos Armas Mejorado", check: hasFeat("improved-two-weapon-fighting") },
      { description: "Defensa con Dos Armas", check: hasFeat("two-weapon-defense") },
      { description: "Destreza 19", check: (ctx) => ctx.abilityScores.dex >= 19 },
      { description: "Bonificador base de ataque +11", check: (ctx) => ctx.babTotal >= 11 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
];

export const CW_FEAT_IDS = CW_FEATS.map((f) => f.id);
