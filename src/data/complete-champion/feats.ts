import type { Feat, FeatPrereqContext } from "../../types";

// Dotes de Complete Champion (2007).
//
// Convenciones (iguales a src/data/srd/feats.ts):
// - `id` en kebab-case con prefijo `cc-`, basado en el nombre en inglés.
// - `prerequisites[].check` solo se define para prerrequisitos mecánicos
//   simples y verificables (puntuación de característica, BAB, dote previa,
//   nivel de personaje, rangos de habilidad). Los prerrequisitos narrativos
//   (deidad concreta, acceso a un dominio concreto, alineamiento, capacidad
//   de castigo divino/favor divino, capacidad de expulsar no muertos) quedan
//   solo como texto descriptivo.
// - No se duplica ninguna dote ya presente en el SRD.
// - Solo se incluyen dotes de las que hay confianza razonable de que
//   pertenecen a este libro; se ha preferido omitir contenido dudoso antes
//   que inventarlo.

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

const KNOWLEDGE_SKILL_IDS = [
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
];

const hasKnowledgeRanks = (min: number) => (ctx: FeatPrereqContext) =>
  KNOWLEDGE_SKILL_IDS.some((id) => (ctx.skillRanks[id] ?? 0) >= min);

export const CC_FEATS: Feat[] = [
  // ---------------------------------------------------------------------
  // VOTOS SAGRADOS
  // ---------------------------------------------------------------------
  {
    id: "cc-sacred-vow",
    name: "Voto Sagrado",
    source: "complete-champion",
    types: ["especial"],
    description:
      "El personaje se compromete formalmente ante su fe a mantener un código de conducta personal a cambio de un favor espiritual creciente.",
    benefit:
      "Sirve como requisito para adoptar cualquier otra dote de Voto (Voto de Pobreza, Voto de Silencio, Voto de Obediencia, Voto de Paz). Mientras cumpla su voto, gana +1 de bonificador de suerte a las tiradas de salvación contra conjuros y capacidades sobrenaturales lanzados por criaturas de alineamiento opuesto al suyo.",
    prerequisites: [{ description: "Alineamiento no neutral en el eje Bien/Mal o Ley/Caos" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-vow-of-poverty",
    name: "Voto de Pobreza",
    source: "complete-champion",
    types: ["especial"],
    description:
      "El personaje renuncia a toda posesión material y riqueza a cambio de un poder espiritual creciente.",
    benefit:
      "Renuncia a poseer más de un puñado de objetos sencillos y no mágicos ni a manejar dinero. A cambio, gana con el nivel una serie de dones sagrados: bonificadores inherentes a las características, resistencia a la energía, un bonificador de esquiva a la Clase de Armadura, resistencia a conjuros y capacidades sobrenaturales adicionales.",
    prerequisites: [
      { description: "Voto Sagrado", check: hasFeat("cc-sacred-vow") },
      { description: "No poseer objetos mágicos ni riqueza más allá del equipo básico permitido" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-vow-of-peace",
    name: "Voto de Paz",
    source: "complete-champion",
    types: ["especial"],
    description: "El personaje jura no derramar sangre salvo en la más extrema necesidad.",
    benefit:
      "Mientras no ataque ni cause daño a otra criatura salvo en defensa propia extrema, gana un bonificador de suerte creciente con el nivel a la Clase de Armadura y a las tiradas de salvación.",
    prerequisites: [
      { description: "Voto Sagrado", check: hasFeat("cc-sacred-vow") },
      { description: "Alineamiento de Bien" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-vow-of-silence",
    name: "Voto de Silencio",
    source: "complete-champion",
    types: ["especial"],
    description: "El personaje jura no pronunciar palabra alguna, canalizando esa disciplina en poder espiritual.",
    benefit:
      "Mientras no hable ni lance conjuros con componente verbal, gana un bonificador creciente con el nivel a las tiradas de salvación de Voluntad y, en niveles más altos, la capacidad de lanzar ciertos conjuros propios sin su componente verbal sin coste adicional.",
    prerequisites: [
      { description: "Voto Sagrado", check: hasFeat("cc-sacred-vow") },
      { description: "No pronunciar palabra alguna salvo para lanzar conjuros sin componente verbal" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-vow-of-obedience",
    name: "Voto de Obediencia",
    source: "complete-champion",
    types: ["especial"],
    description: "El personaje jura someterse a la disciplina y jerarquía de su orden u organización religiosa.",
    benefit:
      "Mientras dedique tiempo diario a la oración y siga las directrices de sus superiores religiosos, gana un bonificador de suerte creciente con el nivel a una tirada de salvación de su elección en cada tirada. Desobedecer gravemente hace perder el beneficio hasta hacer penitencia.",
    prerequisites: [
      { description: "Voto Sagrado", check: hasFeat("cc-sacred-vow") },
      { description: "Alineamiento no caótico" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // DISCIPLINA ASCÉTICA Y ESPIRITUAL
  // ---------------------------------------------------------------------
  {
    id: "cc-ascetic-devotion",
    name: "Devoción Ascética",
    source: "complete-champion",
    types: ["general"],
    description: "El monje que también sirve a una fe combina disciplina corporal y espiritual.",
    benefit:
      "A efectos de determinar su ataque desarmado, Clase de Armadura sin armadura y velocidad de monje, suma la mitad de sus niveles en una clase de lanzador divino a su nivel de monje.",
    prerequisites: [
      { description: "Golpe Desarmado Mejorado", check: hasFeat("improved-unarmed-strike") },
      { description: "Capacidad de lanzar conjuros divinos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-ascetic-mage",
    name: "Mago Ascético",
    source: "complete-champion",
    types: ["general"],
    description: "El monje que también estudia la magia arcana equilibra ambas disciplinas.",
    benefit:
      "A efectos de determinar su ataque desarmado, Clase de Armadura sin armadura y velocidad de monje, suma la mitad de sus niveles en una clase de lanzador arcano a su nivel de monje.",
    prerequisites: [
      { description: "Golpe Desarmado Mejorado", check: hasFeat("improved-unarmed-strike") },
      { description: "Capacidad de lanzar conjuros arcanos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-force-of-personality",
    name: "Fuerza de Personalidad",
    source: "complete-champion",
    types: ["general"],
    description: "La convicción y el carisma del personaje sostienen su voluntad tanto como su sabiduría.",
    benefit: "Usa su modificador de Carisma en lugar de su modificador de Sabiduría al calcular sus tiradas de salvación de Voluntad.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-education",
    name: "Educación",
    source: "complete-champion",
    types: ["general"],
    description: "Una formación amplia en historia, leyes, religión y tradiciones.",
    benefit: "Todas las habilidades de Conocimiento se convierten en habilidades de clase para el personaje.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-spellcasting-prodigy",
    name: "Prodigio de Conjuros",
    source: "complete-champion",
    types: ["general"],
    description: "Un don natural para la magia divina o arcana muy por encima de lo habitual.",
    benefit:
      "A efectos de las CD de salvación de sus conjuros y de los requisitos de puntuación de característica para lanzar conjuros de nivel elevado, trata su modificador de la característica de lanzamiento como 2 puntos más alto. No otorga conjuros ni espacios de conjuro adicionales.",
    prerequisites: [
      { description: "La característica de lanzamiento de conjuros debe ser la puntuación más alta del personaje" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-ancestral-relic",
    name: "Reliquia Ancestral",
    source: "complete-champion",
    types: ["especial"],
    description: "El personaje hereda o recibe un objeto mágico legendario ligado a su linaje o a su fe, que crece en poder junto a él.",
    benefit:
      "Obtiene un arma, armadura u objeto especial (a discreción del Director de Juego) que comienza con propiedades mágicas modestas y puede mejorarse invirtiendo tiempo y recursos en vez de comprarlo directamente en el mercado, hasta alcanzar un poder muy superior a su precio inicial.",
    prerequisites: [{ description: "Nivel de personaje 3 o superior", check: (ctx) => ctx.totalCharacterLevel >= 3 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-words-of-creation",
    name: "Palabras de la Creación",
    source: "complete-champion",
    types: ["general"],
    description: "El personaje comprende fragmentos del lenguaje primigenio con el que los dioses dieron forma al mundo.",
    benefit:
      "Sus conjuros con el descriptor de alineamiento (Bien, Mal, Ley o Caos) que coincida con el suyo obtienen un pequeño beneficio adicional (como CD de salvación ligeramente superior) al lanzarlos contra criaturas de alineamiento opuesto.",
    prerequisites: [{ description: "Alineamiento no neutral en el eje Bien/Mal o Ley/Caos" }],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // CASTIGO DIVINO Y FAVOR DIVINO
  // ---------------------------------------------------------------------
  {
    id: "cc-extra-smiting",
    name: "Castigo Adicional",
    source: "complete-champion",
    types: ["general"],
    description: "La ira sagrada del paladín (o del anticlérigo) se renueva con más frecuencia.",
    benefit:
      "Gana dos usos adicionales por día de su capacidad de castigo divino. Se puede tomar varias veces; sus efectos son acumulativos.",
    prerequisites: [{ description: "Capacidad de usar castigo divino" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-improved-smiting",
    name: "Castigo Mejorado",
    source: "complete-champion",
    types: ["general"],
    description: "El castigo divino del paladín se vuelve más devastador contra sus enemigos jurados.",
    benefit:
      "Cuando usa castigo divino y el ataque impacta, el daño adicional por nivel de clase asociado al castigo se aplica dos veces.",
    prerequisites: [
      { description: "Capacidad de usar castigo divino" },
      { description: "Nivel de paladín 8 o superior" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-battle-blessing",
    name: "Bendición de Batalla",
    source: "complete-champion",
    types: ["general"],
    description: "El favor divino permite al paladín lanzar sus conjuros incluso en pleno fragor del combate.",
    benefit: "Al lanzar un conjuro de paladín (o de clase similar de lista corta), se le considera automáticamente competente en Concentración en Combate sin necesidad de realizar la prueba de Concentración correspondiente.",
    prerequisites: [{ description: "Capacidad de lanzar conjuros de paladín" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-sanctify-martial-strike",
    name: "Santificar Golpe Marcial",
    source: "complete-champion",
    types: ["general"],
    description: "El paladín o clérigo bueno consagra sus golpes cuerpo a cuerpo con energía positiva.",
    benefit: "Sus ataques cuerpo a cuerpo se consideran de alineamiento Bueno a efectos de superar la reducción de daño, aunque el arma empuñada no lo sea.",
    prerequisites: [
      { description: "Capacidad de usar castigo divino o de expulsar no muertos" },
      { description: "Alineamiento de Bien" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-sanctify-spell",
    name: "Consagrar Conjuro",
    source: "complete-champion",
    types: ["metamagia"],
    description: "El lanzador de Bien imbuye su conjuro con energía sagrada, haciéndolo más letal contra los seres malignos.",
    benefit:
      "El daño que cause el conjuro se considera de alineamiento Bueno a efectos de reducción de daño, y aumenta en +1 punto por dado contra criaturas de alineamiento maligno. Usa un espacio de conjuro un nivel más alto que el real.",
    prerequisites: [{ description: "Alineamiento de Bien" }],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // DEVOCIÓN A UN DOMINIO CONCRETO
  // ---------------------------------------------------------------------
  {
    id: "cc-knowledge-devotion",
    name: "Devoción del Conocimiento",
    source: "complete-champion",
    types: ["general"],
    description: "El estudioso religioso convierte su erudición sobre las criaturas del mundo en una ventaja táctica.",
    benefit:
      "Como acción libre, puede intentar una prueba de Conocimiento apropiada (CD 20) para identificar el tipo de una criatura visible; si tiene éxito, gana un bonificador a las tiradas de ataque y daño cuerpo a cuerpo contra esa criatura igual a 1 más 1 por cada 5 rangos que posea en la Conocimiento usada, durante el resto del encuentro.",
    prerequisites: [{ description: "5 rangos en alguna habilidad de Conocimiento", check: hasKnowledgeRanks(5) }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-air-devotion",
    name: "Devoción del Aire",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Aire concede al fiel un control momentáneo sobre las corrientes.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos para caer con suavidad como si estuviera bajo los efectos de caída suave (feather fall) durante 1 minuto.",
    prerequisites: [
      { description: "Acceso al dominio de Aire" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-animal-devotion",
    name: "Devoción Animal",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Animal fortalece el vínculo del fiel con las bestias.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos para ganar +10 de bonificador de competencia a una prueba de Manejar Animales o de Empatía Salvaje.",
    prerequisites: [
      { description: "Acceso al dominio de Animal" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-chaos-devotion",
    name: "Devoción del Caos",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Caos otorga una imprevisibilidad protectora al fiel.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción inmediata para repetir una tirada de salvación fallida contra un conjuro o efecto de alineamiento Ley.",
    prerequisites: [
      { description: "Acceso al dominio de Caos" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-death-devotion",
    name: "Devoción de la Muerte",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Muerte permite al fiel canalizar un toque debilitante.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos para realizar un toque de contacto que inflige 1d6 puntos de daño de energía negativa a la criatura tocada (salvación de Fortaleza para reducirlo a la mitad).",
    prerequisites: [
      { description: "Acceso al dominio de Muerte" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-destruction-devotion",
    name: "Devoción de la Destrucción",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Destrucción imbuye de furia sagrada el siguiente golpe del fiel.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción rápida para ganar +4 de bonificador de competencia a su siguiente tirada de daño cuerpo a cuerpo ese mismo asalto.",
    prerequisites: [
      { description: "Acceso al dominio de Destrucción" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-earth-devotion",
    name: "Devoción de la Tierra",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Tierra concede una estabilidad pétrea al fiel.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción inmediata para ganar +4 de bonificador de competencia a las pruebas enfrentadas para resistir un derribo, empujón o atropello.",
    prerequisites: [
      { description: "Acceso al dominio de Tierra" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-evil-devotion",
    name: "Devoción del Mal",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio del Mal blinda al fiel frente al poder de las fuerzas del Bien.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción inmediata para ganar resistencia a la energía positiva y +4 de resistencia a las tiradas de salvación contra conjuros con el descriptor Bien durante 1 minuto.",
    prerequisites: [
      { description: "Acceso al dominio del Mal" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-fire-devotion",
    name: "Devoción del Fuego",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Fuego permite al fiel protegerse brevemente de las llamas.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción rápida para ganar resistencia al fuego 10 durante 1 minuto.",
    prerequisites: [
      { description: "Acceso al dominio de Fuego" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-good-devotion",
    name: "Devoción del Bien",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio del Bien blinda al fiel frente al poder de las fuerzas del Mal.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción inmediata para ganar +4 de resistencia a las tiradas de salvación contra conjuros con el descriptor Mal durante 1 minuto.",
    prerequisites: [
      { description: "Acceso al dominio del Bien" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-healing-devotion",
    name: "Devoción de la Curación",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Curación permite al fiel acelerar la recuperación de un aliado.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción estándar para conceder a una criatura tocada fascinación de curación rápida 1 durante 5 asaltos.",
    prerequisites: [
      { description: "Acceso al dominio de Curación" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-law-devotion",
    name: "Devoción de la Ley",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Ley disciplina la mente del fiel frente a los efectos de aturdimiento y confusión.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción inmediata para repetir una tirada de salvación fallida contra un efecto de aturdimiento, confusión o alineamiento Caos.",
    prerequisites: [
      { description: "Acceso al dominio de Ley" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-luck-devotion",
    name: "Devoción de la Suerte",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de la Suerte permite al fiel forzar una segunda oportunidad providencial.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción libre para repetir una tirada de ataque, de salvación o de habilidad recién realizada, quedándose con el resultado que prefiera.",
    prerequisites: [
      { description: "Acceso al dominio de la Suerte" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-magic-devotion",
    name: "Devoción de la Magia",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de la Magia agudiza la capacidad del fiel para imponer su voluntad sobre la resistencia mágica.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción libre para ganar +4 de bonificador a una prueba de nivel de lanzador para superar la resistencia a conjuros.",
    prerequisites: [
      { description: "Acceso al dominio de la Magia" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-plant-devotion",
    name: "Devoción de las Plantas",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Plantas concede al fiel un breve control sobre la vegetación circundante.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción estándar para hacer que la vegetación de un área de 3 metros de radio se agite y otorgue camuflaje ligero a los aliados que allí se encuentren durante 1 minuto.",
    prerequisites: [
      { description: "Acceso al dominio de Plantas" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-protection-devotion",
    name: "Devoción de la Protección",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Protección envuelve al fiel en una barrera protectora momentánea.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción inmediata para ganar +4 de bonificador de desviación a la Clase de Armadura durante 1 asalto.",
    prerequisites: [
      { description: "Acceso al dominio de Protección" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-strength-devotion",
    name: "Devoción de la Fuerza",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de la Fuerza infunde un vigor pasajero en los músculos del fiel.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción rápida para ganar +4 de bonificador de mejora a la Fuerza durante 1 minuto.",
    prerequisites: [
      { description: "Acceso al dominio de la Fuerza" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-sun-devotion",
    name: "Devoción del Sol",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio del Sol permite al fiel invocar un fogonazo de luz sagrada.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción estándar para deslumbrar durante 1 asalto a los no muertos en un radio de 9 metros que fallen una salvación de Fortaleza (CD igual a la de expulsar).",
    prerequisites: [
      { description: "Acceso al dominio del Sol" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-travel-devotion",
    name: "Devoción del Viaje",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio del Viaje agiliza el paso del fiel cuando más lo necesita.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción libre para ganar +10 pies (3 metros) de velocidad durante 1 minuto.",
    prerequisites: [
      { description: "Acceso al dominio del Viaje" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-trickery-devotion",
    name: "Devoción del Engaño",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio del Engaño aguza la lengua y los reflejos sociales del fiel.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción libre para ganar +10 de bonificador de competencia a una prueba de Engañar o de Finta.",
    prerequisites: [
      { description: "Acceso al dominio del Engaño" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-war-devotion",
    name: "Devoción de la Guerra",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de la Guerra afila la puntería del fiel en el momento crucial.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción rápida para ganar +4 de bonificador de competencia a su siguiente tirada de ataque ese mismo asalto.",
    prerequisites: [
      { description: "Acceso al dominio de la Guerra" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-water-devotion",
    name: "Devoción del Agua",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio del Agua permite al fiel desenvolverse en el medio acuático.",
    benefit: "Una vez al día, puede gastar un uso de expulsar o reprender no muertos como acción estándar para ganar una velocidad de nado igual a su velocidad base y respirar bajo el agua durante 10 minutos.",
    prerequisites: [
      { description: "Acceso al dominio del Agua" },
      { description: "Capacidad de expulsar o reprender no muertos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
];

export const CC_FEAT_IDS = CC_FEATS.map((f) => f.id);
