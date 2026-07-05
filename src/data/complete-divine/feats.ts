import type { Feat, FeatPrereqContext } from "../../types";

// Dotes de Complete Divine (2004).
//
// Convenciones (igual que en src/data/srd/feats.ts):
// - `id` en kebab-case con prefijo `cdv-` basado en el nombre en inglés.
// - `prerequisites[].check` solo se define para prerrequisitos mecánicos
//   simples y verificables (puntuación de característica, BAB, dote previa,
//   rango de habilidad, nivel de lanzador). Los prerrequisitos narrativos
//   (ej. "acceso a un dominio concreto", "capacidad de lanzar conjuros
//   divinos") quedan solo como texto.
// - Se excluyen dotes ya presentes en el SRD (Expulsión Adicional, Expulsión
//   Mejorada, etc.) para no duplicar contenido.

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);
const minCha = (score: number) => (ctx: FeatPrereqContext) => ctx.abilityScores.cha >= score;
const minWis = (score: number) => (ctx: FeatPrereqContext) => ctx.abilityScores.wis >= score;
const minBab = (bab: number) => (ctx: FeatPrereqContext) => ctx.babTotal >= bab;
const minSkillRanks = (skillId: string, ranks: number) => (ctx: FeatPrereqContext) =>
  (ctx.skillRanks[skillId] ?? 0) >= ranks;

export const CDV_FEATS: Feat[] = [
  // ---------------------------------------------------------------------
  // DOTES DIVINAS (cadena de expulsión/reprensión)
  // ---------------------------------------------------------------------
  {
    id: "cdv-divine-might",
    name: "Poder Divino",
    source: "complete-divine",
    types: ["general"],
    description: "El favor de la deidad del personaje se manifiesta en la fuerza de sus golpes.",
    benefit:
      "Como acción gratuita, puede gastar un uso de su capacidad de expulsar o reprender no muertos para añadir su bonificador de Carisma al daño cuerpo a cuerpo durante 1 asalto.",
    prerequisites: [
      { description: "Carisma 13", check: minCha(13) },
      { description: "Base de ataque +2", check: minBab(2) },
      { description: "Capacidad de expulsar o reprender a los no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-divine-shield",
    name: "Escudo Divino",
    source: "complete-divine",
    types: ["general"],
    description: "La energía divina del personaje puede desviar los golpes del enemigo.",
    benefit:
      "Como acción libre, puede gastar un uso de su capacidad de expulsar o reprender no muertos para ganar un bonificador de desvío a la CA igual a su bonificador de Carisma durante 1 asalto.",
    prerequisites: [
      { description: "Carisma 13", check: minCha(13) },
      { description: "Base de ataque +2", check: minBab(2) },
      { description: "Capacidad de expulsar o reprender a los no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-divine-vengeance",
    name: "Venganza Divina",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje puede canalizar su energía divina en un único golpe devastador contra sus enemigos.",
    benefit:
      "Como acción gratuita, puede gastar un uso de su capacidad de expulsar o reprender no muertos para infligir 1d6 puntos de daño adicional por cada dos niveles de personaje con su próximo ataque cuerpo a cuerpo con éxito este asalto.",
    prerequisites: [
      { description: "Carisma 13", check: minCha(13) },
      { description: "Base de ataque +6", check: minBab(6) },
      { description: "Poder Divino", check: hasFeat("cdv-divine-might") },
      { description: "Capacidad de expulsar o reprender a los no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-divine-resistance",
    name: "Resistencia Divina",
    source: "complete-divine",
    types: ["general"],
    description: "La energía divina del personaje puede reforzar su cuerpo frente al daño.",
    benefit:
      "Como acción libre, puede gastar un uso de su capacidad de expulsar o reprender no muertos para ganar reducción de daño 5/mágico durante 1 asalto.",
    prerequisites: [
      { description: "Carisma 13", check: minCha(13) },
      { description: "Base de ataque +6", check: minBab(6) },
      { description: "Escudo Divino", check: hasFeat("cdv-divine-shield") },
      { description: "Capacidad de expulsar o reprender a los no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-divine-spell-power",
    name: "Poder de Conjuro Divino",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje puede intensificar el poder de sus conjuros divinos usando su energía de expulsión.",
    benefit:
      "Como acción gratuita, puede gastar un uso de su capacidad de expulsar o reprender no muertos para tratar su nivel de lanzador como +1 más alto para el siguiente conjuro divino que lance ese mismo asalto.",
    prerequisites: [
      { description: "Carisma 13", check: minCha(13) },
      { description: "Capacidad de lanzar conjuros divinos" },
      { description: "Capacidad de expulsar o reprender a los no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-divine-metamagic",
    name: "Metamagia Divina",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje puede aplicar dotes de metamagia a sus conjuros divinos sin retrasar su lanzamiento, a cambio de energía divina.",
    benefit:
      "Puede gastar usos de su capacidad de expulsar o reprender no muertos para compensar el ajuste de nivel de una dote de metamagia aplicada a un conjuro divino, sin aumentar el tiempo de lanzamiento del conjuro.",
    prerequisites: [
      { description: "Al menos una dote de metamagia" },
      { description: "Capacidad de expulsar o reprender a los no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-empower-turning",
    name: "Potenciar Expulsión",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje domina el arte de concentrar e intensificar su capacidad de expulsar o reprender no muertos.",
    benefit:
      "Suma +10 al resultado de la tirada al expulsar o reprender no muertos, como si hubiera sacado un 10 más en la tirada de expulsión.",
    prerequisites: [
      { description: "Carisma 13", check: minCha(13) },
      { description: "Capacidad de expulsar o reprender a los no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-nimbus-of-light",
    name: "Nimbo de Luz",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje puede rodearse de un resplandor divino que hiere a los no muertos cercanos.",
    benefit:
      "Como acción estándar, puede gastar un uso de su capacidad de expulsar no muertos para emitir un resplandor de energía positiva en un radio de 20 pies que inflige 1d6 puntos de daño por cada dos niveles de personaje a los no muertos en la zona (salvación de Reflejos para mitad de daño).",
    prerequisites: [
      { description: "Carisma 13", check: minCha(13) },
      { description: "Base de ataque +6", check: minBab(6) },
      { description: "Capacidad de expulsar a los no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // CURACIÓN Y ATENCIÓN DE HERIDAS
  // ---------------------------------------------------------------------
  {
    id: "cdv-augment-healing",
    name: "Aumentar Curación",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje ha estudiado técnicas para maximizar la eficacia de sus conjuros curativos.",
    benefit:
      "Cualquier conjuro que lance que restaure puntos de golpe cura un 50% adicional de puntos de golpe, como si estuviera potenciado, sin aumentar el nivel de conjuro ni el tiempo de lanzamiento.",
    prerequisites: [{ description: "Curar 5 rangos", check: minSkillRanks("heal", 5) }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-combat-medic",
    name: "Médico de Combate",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje sabe atender heridas incluso en pleno fragor de la batalla.",
    benefit:
      "Puede usar la habilidad Curar para estabilizar a una criatura moribunda como acción de movimiento en lugar de una acción estándar, y no provoca ataques de oportunidad al usar Curar de forma adyacente a un enemigo.",
    prerequisites: [{ description: "Curar 5 rangos", check: minSkillRanks("heal", 5) }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-improved-healing",
    name: "Curación Mejorada",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje extrae más beneficio de cada conjuro de curación que lanza.",
    benefit:
      "Cuando lanza un conjuro de la escuela de Conjuración (curación) que restaura puntos de golpe, trata cualquier dado de curación que muestre un 1 como si mostrara un 2.",
    prerequisites: [{ description: "Capacidad de lanzar conjuros de curación divinos" }],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // DOMINIOS Y VIDA RELIGIOSA
  // ---------------------------------------------------------------------
  {
    id: "cdv-additional-domain",
    name: "Dominio Adicional",
    source: "complete-divine",
    types: ["especial"],
    description: "La devoción excepcional del personaje le abre acceso a un dominio que su deidad no le concedería normalmente.",
    benefit:
      "Elige un dominio adicional al que no tenga acceso normalmente. Gana el poder concedido de ese dominio y añade sus conjuros a su lista de conjuros de dominio disponibles.",
    prerequisites: [
      { description: "Sabiduría 15", check: minWis(15) },
      { description: "Debe venerar a una deidad o un poder superior" },
      { description: "Capacidad de acceder a dominios de clérigo" },
    ],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cdv-domain-spontaneity",
    name: "Espontaneidad de Dominio",
    source: "complete-divine",
    types: ["especial"],
    description: "El personaje aprende a canalizar la energía de un dominio con la misma facilidad con la que lanza conjuros de curación o daño espontáneamente.",
    benefit:
      "Elige uno de sus dominios. Puede sacrificar un conjuro preparado para lanzar de forma espontánea cualquier conjuro de ese dominio del mismo nivel o inferior, igual que un clérigo lanza espontáneamente conjuros de curar o infligir heridas.",
    prerequisites: [
      { description: "Sabiduría 13", check: minWis(13) },
      { description: "Acceso al dominio elegido" },
      { description: "Capacidad de lanzar espontáneamente conjuros de curar o infligir heridas" },
    ],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cdv-contemplative",
    name: "Contemplativo",
    source: "complete-divine",
    types: ["general"],
    description: "El estudio devoto de la teología ha afinado la conexión del personaje con lo divino más allá de su fuerza de voluntad personal.",
    benefit:
      "Puede usar su modificador de Sabiduría en lugar de su modificador de Carisma para determinar el número y el resultado de sus intentos de expulsar o reprender no muertos.",
    prerequisites: [{ description: "Conocimiento (religión) 4 rangos", check: minSkillRanks("knowledge-religion", 4) }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-sanctify-martial-strike",
    name: "Santificar Golpe Marcial",
    source: "complete-divine",
    types: ["combate"],
    description: "Las armas del personaje se impregnan del poder de las fuerzas del bien.",
    benefit:
      "Sus ataques cuerpo a cuerpo y sus proyectiles disparados se consideran de alineamiento Bueno a efectos de superar la reducción de daño.",
    prerequisites: [
      { description: "Acceso al dominio del Bien" },
      { description: "Base de ataque +6", check: minBab(6) },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-corrupt-martial-strike",
    name: "Corromper Golpe Marcial",
    source: "complete-divine",
    types: ["combate"],
    description: "Las armas del personaje se impregnan del poder de las fuerzas del mal.",
    benefit:
      "Sus ataques cuerpo a cuerpo y sus proyectiles disparados se consideran de alineamiento Malo a efectos de superar la reducción de daño.",
    prerequisites: [
      { description: "Acceso al dominio del Mal" },
      { description: "Base de ataque +6", check: minBab(6) },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-sanctum-spell",
    name: "Conjuro de Santuario",
    source: "complete-divine",
    types: ["metamagia"],
    description: "El personaje ha consagrado un lugar donde sus conjuros se ven reforzados por su fe.",
    benefit:
      "Define un santuario personal (un espacio consagrado ligado a su fe). Mientras se encuentre dentro de él, puede aplicar los efectos de una dote de metamagia que posea a sus conjuros sin que aumenten de nivel ni de tiempo de lanzamiento.",
    prerequisites: [{ description: "Al menos una dote de metamagia" }],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // MULTICLASE ASCÉTICA
  // ---------------------------------------------------------------------
  {
    id: "cdv-ascetic-mage",
    name: "Mago Ascético",
    source: "complete-divine",
    types: ["especial"],
    description: "El personaje combina la disciplina del monje con el estudio arcano sin perder su progresión marcial.",
    benefit:
      "A efectos de determinar el bonificador de ataque sin armas, el bonificador a la CA sin armadura y la velocidad de movimiento del monje, sus niveles de lanzador de conjuros arcanos cuentan como niveles de monje. Esto no afecta a su progresión de lanzamiento de conjuros ni a otros rasgos de monje.",
    prerequisites: [
      { description: "Nivel de monje 1" },
      { description: "Capacidad de lanzar conjuros arcanos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-ascetic-rogue",
    name: "Pícaro Ascético",
    source: "complete-divine",
    types: ["especial"],
    description: "El personaje combina la disciplina del monje con la astucia furtiva de un pícaro.",
    benefit:
      "A efectos de determinar el bonificador de ataque sin armas, el bonificador a la CA sin armadura y la velocidad de movimiento del monje, sus niveles de pícaro cuentan como niveles de monje. Esto no afecta a su progresión de ataque furtivo ni a otros rasgos de pícaro.",
    prerequisites: [
      { description: "Nivel de monje 1" },
      { description: "Nivel de pícaro 1" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // GENERALES ADICIONALES RELACIONADAS CON LO DIVINO
  // ---------------------------------------------------------------------
  {
    id: "cdv-improved-familiar-cha",
    name: "Familiar Mejorado Divino",
    source: "complete-divine",
    types: ["especial"],
    description: "La devoción del personaje le permite atraer a un familiar más poderoso e infrecuente de lo habitual.",
    benefit:
      "Cuando obtiene un familiar, puede elegir entre una lista ampliada de criaturas más poderosas de lo normal para su nivel, siempre que cumpla los requisitos de alineamiento y nivel de lanzador que exija cada una.",
    prerequisites: [
      { description: "Capacidad de obtener un familiar" },
      { description: "Nivel de lanzador 3", check: (ctx: FeatPrereqContext) => ctx.casterLevel >= 3 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-touch-of-healing",
    name: "Toque de Curación",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje puede canalizar energía positiva a través de un simple contacto para aliviar el dolor de otros.",
    benefit:
      "Puede lanzar conjuros de curación de la escuela de Conjuración con un tiempo de lanzamiento de acción estándar como toques en lugar de sus componentes habituales, sin necesidad de gastar componentes materiales de coste ínfimo.",
    prerequisites: [{ description: "Capacidad de lanzar conjuros de curación divinos" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-sacred-conduit",
    name: "Conducto Sagrado",
    source: "complete-divine",
    types: ["general"],
    description: "El cuerpo del personaje sirve de conducto especialmente eficiente para la energía positiva o negativa de su deidad.",
    benefit:
      "Cuando lanza un conjuro con el descriptor [bien] o [mal] correspondiente a su alineamiento, la CD de salvación de ese conjuro aumenta en +1.",
    prerequisites: [{ description: "Debe venerar a una deidad o un poder superior" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-radiant-servant-training",
    name: "Adiestramiento de Siervo Radiante",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje se prepara para el sacerdocio militante dedicado a servir a las fuerzas del bien.",
    benefit:
      "Cuando lanza un conjuro de curación, puede además infligir la mitad de esos puntos de curación como daño a un no muerto que toque como parte del mismo conjuro.",
    prerequisites: [
      { description: "Debe ser de alineamiento Bueno" },
      { description: "Capacidad de expulsar a los no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-fist-of-the-heavens",
    name: "Puño de los Cielos",
    source: "complete-divine",
    types: ["combate"],
    description: "El personaje golpea a sus enemigos con una fuerza que recuerda a la justicia divina.",
    benefit:
      "Una vez por asalto, si impacta a un enemigo con un ataque cuerpo a cuerpo, puede gastar un uso de su capacidad de expulsar o reprender no muertos para infligir 1d8 puntos de daño de energía adicional a ese enemigo.",
    prerequisites: [
      { description: "Base de ataque +4", check: minBab(4) },
      { description: "Capacidad de expulsar o reprender a los no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-divine-cloak",
    name: "Manto Divino",
    source: "complete-divine",
    types: ["general"],
    description: "La presencia del personaje se envuelve en un halo de energía protectora cuando invoca su fe.",
    benefit:
      "Como acción gratuita, puede gastar un uso de su capacidad de expulsar o reprender no muertos para ganar resistencia a la energía 5 (de un tipo asociado a su deidad) durante 1 minuto.",
    prerequisites: [
      { description: "Carisma 13", check: minCha(13) },
      { description: "Capacidad de expulsar o reprender a los no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-favor-of-the-righteous",
    name: "Favor de los Justos",
    source: "complete-divine",
    types: ["general"],
    description: "La deidad del personaje observa con especial atención sus actos y le concede pequeñas bendiciones.",
    benefit:
      "Una vez por día, puede rezar durante 1 minuto para ganar un bonificador de suerte +2 a una tirada de salvación, prueba de característica o prueba de habilidad que realice antes de que termine su siguiente hora de juego.",
    prerequisites: [{ description: "Debe venerar activamente a una deidad" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-turn-and-burn",
    name: "Expulsar y Consumir",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje aprende a canalizar un intento fallido de expulsión en un pequeño estallido de energía positiva.",
    benefit:
      "Cuando un intento de expulsar o reprender no muertos no logra afectar a ningún no muerto, puede en su lugar sanar a sí mismo 1d6 puntos de golpe.",
    prerequisites: [{ description: "Capacidad de expulsar o reprender a los no muertos" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-extended-domain-power",
    name: "Poder de Dominio Extendido",
    source: "complete-divine",
    types: ["especial"],
    description: "El poder concedido por uno de los dominios del personaje se vuelve más duradero o más potente.",
    benefit:
      "Elige uno de sus dominios cuyo poder concedido tenga una duración limitada o un número de usos por día. Ese poder gana una duración un 50% mayor o un uso adicional por día, a elección del jugador.",
    prerequisites: [{ description: "Acceso al dominio elegido" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cdv-holy-radiance",
    name: "Resplandor Sagrado",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje puede hacer brillar su símbolo sagrado con luz consagrada.",
    benefit:
      "Una vez por día, como acción estándar, puede hacer que su símbolo sagrado emita luz como una luz solar en un radio de 30 pies durante 10 minutos. Los no muertos dentro del radio sufren un –2 en las tiradas de ataque mientras permanecen en la zona iluminada.",
    prerequisites: [
      { description: "Debe portar un símbolo sagrado" },
      { description: "Capacidad de expulsar no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-improved-rebuke",
    name: "Reprensión Mejorada",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje ejerce un dominio más firme sobre los no muertos que reprende y controla.",
    benefit:
      "El número máximo de Dados de Golpe de no muertos que puede controlar simultáneamente mediante reprensión aumenta en una cantidad igual a su nivel de clase que concede la reprensión.",
    prerequisites: [{ description: "Capacidad de reprender y controlar no muertos" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-spontaneous-domain-healer",
    name: "Sanador Espontáneo de Dominio",
    source: "complete-divine",
    types: ["especial"],
    description: "El vínculo del personaje con su dominio de Curación le permite improvisar milagros de sanación con mayor libertad.",
    benefit:
      "Si tiene acceso al dominio de Curación, puede sacrificar cualquier conjuro preparado para lanzar espontáneamente en su lugar un conjuro de curar heridas del mismo nivel o inferior, además de su capacidad habitual de conversión espontánea.",
    prerequisites: [
      { description: "Acceso al dominio de Curación" },
      { description: "Capacidad de lanzar espontáneamente conjuros de curar heridas" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-blessed-strike",
    name: "Golpe Bendecido",
    source: "complete-divine",
    types: ["combate"],
    description: "Cada golpe del personaje lleva la marca de la aprobación de su deidad.",
    benefit:
      "Una vez por día, puede declarar un único ataque cuerpo a cuerpo como golpe bendecido antes de tirar el ataque; si impacta, el arma se considera mágica a efectos de superar la reducción de daño durante ese ataque.",
    prerequisites: [
      { description: "Debe venerar a una deidad o un poder superior" },
      { description: "Base de ataque +1", check: minBab(1) },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-improved-augury",
    name: "Augurio Mejorado",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje interpreta con mayor claridad las señales que le envía su deidad.",
    benefit:
      "Cuando lanza augurio o presagio, la posibilidad de fallo se reduce en un 20% y el conjuro proporciona información adicional útil sobre las circunstancias concretas de la acción consultada, a discreción del director de juego.",
    prerequisites: [{ description: "Capacidad de lanzar augurio" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-devoted-inquisitor",
    name: "Inquisidor Devoto",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje ha entrenado su mente para detectar el engaño y la herejía en nombre de su fe.",
    benefit:
      "Gana un bonificador de competencia +2 en las pruebas de Detectar Intenciones y Conocimiento (religión), y puede realizar pruebas de Detectar Intenciones para percibir mentiras como acción libre una vez por asalto.",
    prerequisites: [{ description: "Conocimiento (religión) 4 rangos", check: minSkillRanks("knowledge-religion", 4) }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-turn-undead-en-masse",
    name: "Expulsión en Masa",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje aprende a proyectar su energía de expulsión sobre un área mucho más amplia.",
    benefit:
      "Al gastar dos usos de su capacidad de expulsar no muertos en un mismo intento, dobla el radio del efecto de expulsión.",
    prerequisites: [
      { description: "Expulsión Mejorada", check: hasFeat("improved-turning") },
      { description: "Capacidad de expulsar no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-sacred-focus",
    name: "Foco Sagrado",
    source: "complete-divine",
    types: ["metamagia"],
    description: "El personaje concentra su fe para reforzar la dificultad de resistirse a sus conjuros divinos.",
    benefit: "+1 a la CD de salvación de todos los conjuros divinos que lance de la escuela elegida.",
    prerequisites: [{ description: "Debe poder lanzar conjuros divinos" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cdv-vow-of-devotion",
    name: "Voto de Devoción",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje se compromete públicamente al servicio incondicional de su deidad, reforzando su determinación.",
    benefit:
      "Mientras respete fielmente los preceptos de su fe, gana un bonificador de moral +1 a todas las tiradas de salvación. Si viola gravemente sus votos, pierde este beneficio hasta que realice una expiación.",
    prerequisites: [{ description: "Debe venerar activamente a una deidad" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-battle-blessing",
    name: "Bendición de Batalla",
    source: "complete-divine",
    types: ["metamagia"],
    description: "El personaje puede pedir la bendición de su deidad justo antes del combate sin perder la iniciativa.",
    benefit:
      "Puede lanzar cualquier conjuro de la escuela de Abjuración con el descriptor de bendición y un tiempo de lanzamiento de 1 acción estándar como una acción de movimiento en su lugar, sin aumentar su nivel de conjuro.",
    prerequisites: [{ description: "Capacidad de lanzar conjuros divinos de nivel 1 o superior" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-persistent-rebuke",
    name: "Reprensión Persistente",
    source: "complete-divine",
    types: ["general"],
    description: "Los no muertos que el personaje controla mediante reprensión permanecen bajo su dominio durante más tiempo.",
    benefit:
      "El control que ejerce sobre los no muertos reprendidos mediante su capacidad de clase dura 24 horas adicionales antes de requerir renovación.",
    prerequisites: [{ description: "Capacidad de reprender y controlar no muertos" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-planar-devotion",
    name: "Devoción Planar",
    source: "complete-divine",
    types: ["general"],
    description: "El personaje ha estrechado su vínculo con el plano natal de su deidad, lo que refuerza los conjuros relacionados con ese alineamiento.",
    benefit:
      "+1 a la CD de salvación de cualquier conjuro que lance con el descriptor de alineamiento que coincida con el de su deidad.",
    prerequisites: [{ description: "Debe venerar a una deidad con un alineamiento definido" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-blissful-touch",
    name: "Toque Beatífico",
    source: "complete-divine",
    types: ["general"],
    description: "El contacto del personaje puede aliviar temporalmente el miedo y el dolor de sus aliados.",
    benefit:
      "Una vez por día, como acción estándar, puede tocar a una criatura para eliminar el efecto de una condición de sacudido o de una penalización por herida no letal por un asalto.",
    prerequisites: [{ description: "Sabiduría 13", check: minWis(13) }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-improved-smiting-glare",
    name: "Mirada Fulminante Mejorada",
    source: "complete-divine",
    types: ["combate"],
    description: "El personaje puede intensificar la fuerza de su siguiente ataque tras invocar la ira de su deidad.",
    benefit:
      "Cuando emplea un intento de expulsión fallido contra no muertos para infligirse a sí mismo un bonificador (según una capacidad de clase que lo permita), ese bonificador se incrementa en +1.",
    prerequisites: [
      { description: "Base de ataque +3", check: minBab(3) },
      { description: "Capacidad de expulsar no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cdv-righteous-wrath",
    name: "Ira Justiciera",
    source: "complete-divine",
    types: ["general"],
    description: "Presenciar una gran injusticia despierta en el personaje una furia santa que agudiza sus sentidos y su determinación.",
    benefit:
      "Cuando presencia a un aliado caer en combate por debajo de 0 puntos de golpe, gana un bonificador de moral +2 a las tiradas de ataque y de daño durante los 3 asaltos siguientes.",
    prerequisites: [{ description: "Debe venerar a una deidad de alineamiento Bueno" }],
    fighterBonusFeat: false,
    stackable: false,
  },
];
