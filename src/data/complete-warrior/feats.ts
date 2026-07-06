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
    name: "Poder Divino",
    source: "complete-warrior",
    types: ["general"],
    description: "Un paladín o clérigo canaliza su energía divina para golpear con fuerza sobrehumana.",
    benefit:
      "Como acción libre, puede gastar un uso diario de su capacidad de expulsar o reprender no muertos para ganar un bonificador a las tiradas de daño cuerpo a cuerpo igual a su modificador de Carisma durante varios asaltos.",
    prerequisites: [
      { description: "Carisma 13", check: (ctx) => ctx.abilityScores.cha >= 13 },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cw-divine-shield",
    name: "Escudo Divino",
    source: "complete-warrior",
    types: ["general"],
    description: "La misma energía divina que expulsa a los no muertos puede levantarse como una barrera protectora.",
    benefit:
      "Como acción libre, puede gastar un uso diario de su capacidad de expulsar o reprender no muertos para ganar un bonificador de escudo a la Clase de Armadura igual a su modificador de Carisma durante varios asaltos.",
    prerequisites: [
      { description: "Carisma 13", check: (ctx) => ctx.abilityScores.cha >= 13 },
      { description: "Capacidad de expulsar o reprender no muertos" },
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
      "Como acción libre, puede gastar un uso diario de su capacidad de expulsar o reprender no muertos para ganar +30 pies (9 m) de velocidad y un ataque cuerpo a cuerpo adicional a su bonificador de ataque más alto durante varios asaltos.",
    prerequisites: [
      { description: "Carisma 13", check: (ctx) => ctx.abilityScores.cha >= 13 },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
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
    name: "Golpes Divinos Adicionales",
    source: "complete-warrior",
    types: ["general"],
    description: "Un paladín o un clérigo del mal capaz de invocar su ira divina con más frecuencia.",
    benefit:
      "Gana 2 usos adicionales al día de su capacidad de Golpe Divino (Smite Evil o Smite Good). Se puede tomar varias veces; sus efectos son acumulativos.",
    prerequisites: [{ description: "Capacidad de Golpe Divino contra el mal o el bien" }],
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
      "Una vez por asalto, en lugar de aplicar su bonificador normal contra un enemigo predilecto, puede aplicar el doble de dicho bonificador a un único ataque, daño o prueba de habilidad.",
    prerequisites: [{ description: "Capacidad de clase de Enemigo Predilecto" }],
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
      "Puede empuñar un arma de una categoría de tamaño mayor a la que le correspondería como si fuese de su tamaño (tratándola como un arma a dos manos), sufriendo -2 a las tiradas de ataque mientras la use.",
    prerequisites: [],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-steadfast-determination",
    name: "Determinación Inquebrantable",
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
    name: "Ataque Arcano",
    source: "complete-warrior",
    types: ["combate"],
    description: "El lanzador de conjuros aprende a canalizar su poder arcano directamente en el filo de su arma.",
    benefit:
      "Como acción rápida, puede sacrificar un espacio de conjuro (o un conjuro preparado) para imbuir todas sus armas de poder arcano durante 1 asalto; mientras dure el efecto, sus ataques con armas ganan un bonificador de competencia al daño igual al nivel del espacio sacrificado.",
    prerequisites: [{ description: "Capacidad de lanzar al menos un conjuro arcano" }],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // COMBATE — cuerpo a cuerpo general
  // ---------------------------------------------------------------------
  {
    id: "cw-adaptable-flanker",
    name: "Flanqueador Adaptable",
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
    name: "Luchador Ágil con Broquel",
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
    name: "Embestida Saltarina",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un combatiente que aprovecha el impulso de sus fintas de movimiento para golpear más de una vez.",
    benefit:
      "Cuando usa Ataque en Movimiento, puede realizar todos los ataques a los que tendría derecho en un ataque completo, en lugar de uno solo, siempre que se desplace tanto antes como después de atacar.",
    prerequisites: [
      { description: "Ataque en Movimiento", check: hasFeat("spring-attack") },
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
      "Puede realizar ataques con armas ligeras o desarmados contra un enemigo que lo tenga agarrado sin la penalización habitual por combatir mientras está agarrado, y gana +4 de bonificador en las pruebas enfrentadas para iniciar o escapar de una presa.",
    prerequisites: [
      { description: "Presa Mejorada", check: hasFeat("improved-grapple") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-combat-brute",
    name: "Bruto de Combate",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un luchador que convierte cada maniobra de combate en una oportunidad de causar daño extra.",
    benefit:
      "Cuando obtiene éxito en una prueba de Empujón, Atropello o Presa y decide causar daño con ella, inflige el máximo daño posible en lugar de tirar los dados.",
    prerequisites: [
      { description: "Fuerza 13", check: (ctx) => ctx.abilityScores.str >= 13 },
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
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
      "Mientras luche con dos armas cortantes ligeras idénticas empuñadas una en cada mano, si ambos ataques de un mismo asalto impactan al mismo objetivo, puede realizar de inmediato un ataque adicional gratuito contra ese objetivo con cualquiera de las dos armas.",
    prerequisites: [
      { description: "Destreza 13", check: (ctx) => ctx.abilityScores.dex >= 13 },
      { description: "Combate con Dos Armas", check: hasFeat("two-weapon-fighting") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-dash",
    name: "Arremetida",
    source: "complete-warrior",
    types: ["combate"],
    description: "Piernas entrenadas para ganar terreno con rapidez sin perder la guardia.",
    benefit: "Gana +5 pies (1,5 m) de velocidad base siempre que no lleve una carga pesada ni armadura media o pesada.",
    prerequisites: [],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-defensive-throw",
    name: "Contraataque Defensivo",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un luchador que convierte el fallo de su rival en su propia ventaja.",
    benefit:
      "Si un enemigo falla un ataque cuerpo a cuerpo contra usted, puede realizar de inmediato una prueba de derribo enfrentada gratuita contra él, sin provocar ataque de oportunidad.",
    prerequisites: [
      { description: "Inteligencia 13", check: (ctx) => ctx.abilityScores.int >= 13 },
      { description: "Pericia en Combate", check: hasFeat("combat-expertise") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-elusive-target",
    name: "Objetivo Escurridizo",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un combatiente difícil de inmovilizar, desarmar o derribar en pleno fragor de la batalla.",
    benefit:
      "Los enemigos sufren -4 de penalizador en las pruebas enfrentadas de derribo, desarme o empujón que intenten contra usted mientras no lo tengan flanqueado, y puede optar por que un empujón fallido por muy poco no le haga retroceder.",
    prerequisites: [
      { description: "Esquiva", check: hasFeat("dodge") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
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
    types: ["combate", "especial"],
    description: "Un veterano acostumbrado a luchar codo con codo dentro de una unidad organizada.",
    benefit:
      "Mientras luche adyacente a al menos otro aliado que también posea este dote y ambos empuñen armas de asta o de alcance similar, ambos ganan +1 de bonificador de moral a la Clase de Armadura y a las tiradas de ataque.",
    prerequisites: [{ description: "Bonificador base de ataque +1", check: (ctx) => ctx.babTotal >= 1 }],
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
    name: "Golpe Kármico",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un luchador que aprovecha cada golpe recibido para devolver el favor de inmediato.",
    benefit:
      "Cuando un enemigo le impacta con un ataque cuerpo a cuerpo, puede realizar de inmediato un ataque de oportunidad contra él; a cambio, pierde su bonificador de Destreza a la Clase de Armadura hasta el comienzo de su siguiente turno.",
    prerequisites: [
      { description: "Esquiva", check: hasFeat("dodge") },
      { description: "Reflejos de Combate", check: hasFeat("combat-reflexes") },
    ],
    fighterBonusFeat: true,
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
    name: "Ataque Saltador",
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
    id: "cw-robilars-gambit",
    name: "Estratagema de Robilar",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un duelista temerario que se deja golpear a propósito para asegurar su propia venganza.",
    benefit:
      "Puede renunciar a impedir que un enemigo complete una acción que normalmente provocaría un ataque de oportunidad de su parte; a cambio, siempre puede realizar dicho ataque de oportunidad contra él, incluso si normalmente no podría hacerlo, aunque el enemigo obtiene su propia acción u ataque contra usted con total normalidad.",
    prerequisites: [
      { description: "Reflejos de Combate", check: hasFeat("combat-reflexes") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-roundabout-kick",
    name: "Patada Circular",
    source: "complete-warrior",
    types: ["combate"],
    description: "Una patada barredora capaz de dejar tambaleante a un enemigo distraído.",
    benefit:
      "Cuando finta con éxito contra un enemigo, puede sustituir su siguiente ataque desarmado por una patada circular que, de impactar, deja al objetivo tambaleante durante 1 asalto (sufre -2 a la Clase de Armadura y a las tiradas de ataque).",
    prerequisites: [
      { description: "Impacto sin Arma Mejorado", check: hasFeat("improved-unarmed-strike") },
      { description: "Finta Mejorada", check: hasFeat("improved-feint") },
    ],
    fighterBonusFeat: true,
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
    name: "Carga con Escudo",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un combatiente que usa su escudo como un ariete durante la carga.",
    benefit:
      "Al cargar, puede sustituir su ataque normal por un golpe de escudo que, de impactar, le permite realizar de inmediato una prueba de derribo enfrentada gratuita contra el objetivo.",
    prerequisites: [
      { description: "Competencia con Escudo", check: hasFeat("shield-proficiency") },
      { description: "Bote de Escudo Mejorado", check: hasFeat("improved-shield-bash") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-shield-slam",
    name: "Golpe de Escudo Aturdidor",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un golpe de escudo capaz de desequilibrar al enemigo antes de que pueda reaccionar.",
    benefit:
      "Cuando golpea con su escudo, puede realizar de inmediato una prueba de empujón gratuita contra el objetivo, sin provocar ataque de oportunidad y sin necesitar seguirlo si es rechazado.",
    prerequisites: [
      { description: "Bote de Escudo Mejorado", check: hasFeat("improved-shield-bash") },
      { description: "Empujón Mejorado", check: hasFeat("improved-bull-rush") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-shield-specialization",
    name: "Especialización con Escudo",
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
    name: "Tropa de Choque",
    source: "complete-warrior",
    types: ["combate"],
    description: "Un guerrero que convierte la furia de su carga en pura potencia destructiva, sin importarle exponerse.",
    benefit:
      "Al usar Ataque Poderoso durante una carga, puede aplicar la penalización elegida a su Clase de Armadura hasta su siguiente turno en lugar de a sus tiradas de ataque. Además, si derriba a un enemigo con un empujón exitoso tras cargar, puede seguir avanzando con él.",
    prerequisites: [
      { description: "Fuerza 13", check: (ctx) => ctx.abilityScores.str >= 13 },
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cw-rapid-blitz",
    name: "Embestida Rápida",
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
    benefit: "+4 de bonificador a las tiradas para confirmar un golpe crítico con el arma cuerpo a cuerpo elegida.",
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
      "Puede emplear armas ligeras o su ataque desarmado con normalidad mientras está implicado en una presa (propia o ajena), sin la penalización habitual por combatir agarrado.",
    prerequisites: [{ description: "Presa Mejorada", check: hasFeat("improved-grapple") }],
    fighterBonusFeat: true,
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
      { description: "Combatir desde Montura", check: hasFeat("mounted-combat") },
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
      { description: "Combatir desde Montura", check: hasFeat("mounted-combat") },
      { description: "1 rango en Montar", check: (ctx) => (ctx.skillRanks["ride"] ?? 0) >= 1 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
];

export const CW_FEAT_IDS = CW_FEATS.map((f) => f.id);
