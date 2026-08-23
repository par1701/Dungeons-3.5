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
    benefit: "Todas las habilidades de Saber se convierten en habilidades de clase para el personaje.",
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
    name: "Reliquia Ancestral (Complete Champion)",
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
    description: "El favor divino permite al paladín invocar sus conjuros con un gesto casi instantáneo, incluso en pleno fragor del combate.",
    benefit:
      "Al lanzar un conjuro de paladín (o de una clase con la misma lista corta de conjuros), su tiempo de lanzamiento se reduce en una categoría: los conjuros de acción estándar pasan a lanzarse como acción rápida, y los de acción de asalto completo pasan a lanzarse como acción estándar.",
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
    name: "Devoción del Saber",
    source: "complete-champion",
    types: ["general"],
    description: "El estudioso religioso convierte su erudición sobre las criaturas del mundo en una ventaja táctica.",
    benefit:
      "Una habilidad de Saber apropiada se convierte en habilidad de clase. Una vez por combate por cada tipo de criatura al que se enfrente, puede usar esa prueba de Saber para obtener un bonificador de perspicacia a las tiradas de ataque y daño contra esa criatura, según el resultado de la prueba: 15 o menos, +1; 16-25, +2; 26-30, +3; 31-35, +4; 36 o más, +5.",
    prerequisites: [{ description: "5 rangos en alguna habilidad de Saber", check: hasKnowledgeRanks(5) }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-air-devotion",
    name: "Devoción del Aire",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Aire concede al fiel un control momentáneo sobre las corrientes.",
    benefit:
      "Una vez al día, como acción rápida, gana un bonificador sagrado o profano de +1 a la Clase de Armadura (+1 adicional cada 4 niveles, máximo +6 en nivel 20) y una probabilidad de fallo del 50% frente a armas arrojadizas y proyectiles, durante 1 minuto. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 3 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de Aire" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-animal-devotion",
    name: "Devoción Animal",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Animal fortalece el vínculo del fiel con las bestias.",
    benefit:
      "Una vez al día, como acción rápida, elige uno de estos efectos (dura 1 minuto; puede tener varios activos a la vez, pero solo puede activar uno por asalto): Furia del Simio (+2 sagrado o profano a la Fuerza, +2 cada 6 niveles, máximo +8 en nivel 18); Carrera del Guepardo (+1,5 m de velocidad, +1,5 m cada 4 niveles, máximo +9 m en nivel 20); Vuelo del Halcón (vuela como vuelo prolongado, +1,5 m cada 5 niveles desde nivel 5, máximo +6 m en nivel 20); o Golpe de Serpiente (mordisco que inflige 1d3 de daño de Constitución, salvación de Fortaleza CD 10 + la mitad de su nivel + su modificador de Carisma para anularlo, sin daño físico). Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 3 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de Animal" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-chaos-devotion",
    name: "Devoción del Caos",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Caos otorga una imprevisibilidad protectora al fiel.",
    benefit:
      "Una vez al día, como acción rápida, tira 1d6 (1d8 en nivel 10, 1d10 en nivel 15); si el resultado es impar, gana ese valor como bonificador sagrado o profano a las tiradas de ataque; si es par, lo gana como bonificador a la Clase de Armadura. Vuelve a tirar cada asalto durante 1 minuto. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 3 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de Caos" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-death-devotion",
    name: "Devoción de la Muerte",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Muerte permite al fiel canalizar un toque debilitante.",
    benefit:
      "Una vez al día, un arma cuerpo a cuerpo que empuñe irradia energía negativa durante 1 minuto; cada golpe exitoso obliga al objetivo a superar una salvación de Fortaleza (CD 10 + la mitad de su nivel + su modificador de Carisma) o ganar un nivel negativo (1 nivel negativo adicional cada 4 niveles del fiel, máximo 5 en nivel 20). Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 3 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de Muerte" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-destruction-devotion",
    name: "Devoción de la Destrucción",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Destrucción imbuye de furia sagrada el siguiente golpe del fiel.",
    benefit:
      "Una vez al día, como acción inmediata, sus golpes cuerpo a cuerpo (que no sean de contacto) reducen el bonificador de armadura o de armadura natural del objetivo en 1 (2 desde nivel 10), acumulable hasta dejarlo en +0, durante 1 minuto. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada intento de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de Destrucción" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-earth-devotion",
    name: "Devoción de la Tierra",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Tierra concede una estabilidad pétrea al fiel.",
    benefit:
      "Una vez al día, como acción inmediata, elige un efecto: ignorar el terreno difícil durante 1 minuto (y ganar +5 sagrado o profano a Equilibrio, Escalar y Saltar), o convertir en terreno difícil una serie de casillas cercanas (1 casilla cada 3 niveles, mínimo 1, máximo 6 en nivel 18, dentro de 9 m, durante 1 minuto; desde nivel 10 ese terreno genera púas con un bonificador de ataque igual a su BAB). Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada intento de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de Tierra" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-evil-devotion",
    name: "Devoción del Mal",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio del Mal blinda al fiel frente al poder de las fuerzas del Bien.",
    benefit:
      "Una vez al día, como acción inmediata, gana un aura que le concede a él y a sus aliados en 9 m reducción de daño superable solo por armas de alineamiento Bueno, igual a 1 + 1 por cada 5 niveles (máximo 5 en nivel 20); mientras dure (1 minuto), sus ataques y los de sus aliados se consideran de alineamiento Malo a efectos de superar reducción de daño. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada intento de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio del Mal" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-fire-devotion",
    name: "Devoción del Fuego",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Fuego permite al fiel envolverse en llamas protectoras.",
    benefit:
      "Una vez al día, como acción rápida, se envuelve en llamas durante 1 minuto: sus ataques cuerpo a cuerpo infligen +1 punto de daño de fuego adicional (+1 más cada 3 niveles, máximo +7 en nivel 18), y los objetivos golpeados arden 1d4 puntos de daño de fuego por asalto salvo que gasten una acción de movimiento en apagarse (o superen una salvación de Reflejos, CD 10 + la mitad de su nivel + su modificador de Carisma). Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 2 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de Fuego" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-good-devotion",
    name: "Devoción del Bien",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio del Bien blinda al fiel frente al poder de las fuerzas del Mal.",
    benefit:
      "Igual que Devoción del Mal, pero la reducción de daño solo la superan armas de alineamiento Maligno, y sus ataques (y los de sus aliados) se consideran de alineamiento Bueno a efectos de superar reducción de daño mientras dure el efecto. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada intento de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio del Bien" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-healing-devotion",
    name: "Devoción de la Curación",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Curación permite al fiel acelerar su propia recuperación o la de un aliado.",
    benefit:
      "Una vez al día, durante 1 minuto, gana curación rápida 1 (+1 cada 5 niveles, máximo 5 en nivel 20); puede activarla como acción inmediata o automáticamente al llegar a 0 puntos de golpe o menos. Como acción de asalto completo, puede transferir este efecto por contacto a un aliado dispuesto. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada intento de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de Curación" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-law-devotion",
    name: "Devoción de la Ley",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Ley disciplina el cuerpo y la mente del fiel en pleno combate.",
    benefit:
      "Una vez al día, como acción rápida, gana un bonificador sagrado o profano de +3 (+5 en nivel 10, +7 en nivel 15) a las tiradas de ataque o a la Clase de Armadura, a elegir, hasta su siguiente acción; puede reasignar el bonificador entre ataque y CA cada asalto. Dura 1 minuto. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 3 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de Ley" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-luck-devotion",
    name: "Devoción de la Suerte",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de la Suerte convierte los golpes de mala fortuna en resultados aceptables.",
    benefit:
      "Una vez al día, como acción rápida, durante 1 minuto, cualquier tirada de daño (de cualquier tipo) que resulte por debajo del promedio se convierte en la mitad del máximo posible (redondeando hacia arriba). Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 3 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de la Suerte" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-magic-devotion",
    name: "Devoción de la Magia",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de la Magia permite al fiel canalizar un dardo de energía arcana pura.",
    benefit:
      "Una vez al día, como acción estándar, realiza un ataque de contacto a distancia (alcance 9 m + 1,5 m cada 2 niveles) que inflige 1d6 de daño por cada 2 niveles de personaje. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 2 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de la Magia" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-plant-devotion",
    name: "Devoción de las Plantas",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Plantas endurece la piel del fiel como si fuera corteza.",
    benefit:
      "Una vez al día, como acción inmediata, durante 1 minuto, gana +2 a la armadura natural y fortificación ligera (25%, o 50% en nivel 10, 75% en nivel 15, fortificación pesada/inmunidad a golpes críticos y ataques furtivos en nivel 20). Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 2 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de Plantas" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-protection-devotion",
    name: "Devoción de la Protección",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de Protección envuelve al fiel y a sus aliados en una barrera protectora momentánea.",
    benefit:
      "Una vez al día, como acción inmediata, durante 1 minuto, gana un bonificador sagrado o profano de +2 a la Clase de Armadura (+1 adicional cada 4 niveles, máximo +7 en nivel 20) para sí mismo y para los aliados en 9 m. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 3 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de Protección" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-strength-devotion",
    name: "Devoción de la Fuerza",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de la Fuerza otorga al fiel la dureza y la contundencia de la piedra.",
    benefit:
      "Una vez al día, como acción rápida, durante 1 minuto, sus ataques cuerpo a cuerpo ignoran la dureza de los objetos y se consideran de adamantina, y gana un ataque de golpe (daño según su tamaño y nivel: niveles 1-5, 1d4/1d6/1d8 para Pequeño/Mediano/Grande; niveles 6-10, 1d6/1d8/2d6; niveles 11-15, 1d8/1d10/2d8; niveles 16-20, 1d10/2d6/3d6) con +2 de daño por circunstancia. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada intento de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de la Fuerza" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-sun-devotion",
    name: "Devoción del Sol",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio del Sol permite al fiel envolver su arma en luz solar auténtica.",
    benefit:
      "Una vez al día, como acción rápida, durante 1 minuto, un arma cuerpo a cuerpo que empuñe brilla como luz solar auténtica (con el radio de una antorcha) e inflige +1 punto de daño sagrado o profano por nivel de personaje a los no muertos que golpee. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada intento de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio del Sol" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-travel-devotion",
    name: "Devoción del Viaje",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio del Viaje libera al fiel del ritmo normal del combate.",
    benefit:
      "Una vez al día, como acción rápida, durante 1 minuto, puede moverse su velocidad como acción rápida cada asalto (lo que le permite moverse y además realizar una acción de asalto completo, o moverse y realizar otra acción), aunque no puede dar un paso de 1,5 m ese mismo asalto. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 2 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio del Viaje" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-trickery-devotion",
    name: "Devoción del Engaño",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio del Engaño permite al fiel proyectar una réplica ilusoria de sí mismo.",
    benefit:
      "Una vez al día, como acción estándar, crea un símil ilusorio de sí mismo a 9 m, con puntos de golpe igual a 6 + su nivel de personaje, que combina los efectos de imagen silenciosa y sirviente invisible; dura hasta 1 minuto por nivel al día. Desde nivel 5 el símil gana una capacidad similar a imagen mayor y puede usar Farolear; desde nivel 10 puede transferirle su percepción; desde nivel 15 el símil tiene la mitad de su Fuerza y puede lanzar sus conjuros como con imagen proyectada. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 3 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio del Engaño" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-war-devotion",
    name: "Devoción de la Guerra",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio de la Guerra permite al fiel luchar a la defensiva sin apenas sacrificar su ofensiva.",
    benefit:
      "Una vez al día, mientras lucha a la defensiva, sufre solo -3 al ataque (en vez de -4) y gana +3 de esquiva a la Clase de Armadura (en vez de +2); en nivel 7 la penalización baja a -2 y el bonificador sube a +4; en nivel 15, -1 y +5. Se acumula con Pericia en Combate. Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada 3 intentos de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio de la Guerra" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cc-water-devotion",
    name: "Devoción del Agua",
    source: "complete-champion",
    types: ["general"],
    description: "La devoción al dominio del Agua permite al fiel invocar a un servidor elemental de las profundidades.",
    benefit:
      "Una vez al día, como acción estándar, invoca a un elemental de agua que permanece 1 minuto a su servicio; su tamaño depende de su nivel de personaje (Pequeño en niveles 1-5, Mediano en 6-10, Grande en 11-15, Enorme en 16-20). Puede tomarse varias veces (gana un uso diario adicional cada vez). Si además puede expulsar o reprender no muertos, gana un uso diario adicional por cada intento de expulsión/reprensión que gaste.",
    prerequisites: [{ description: "Acceso al dominio del Agua" }],
    fighterBonusFeat: false,
    stackable: true,
  },

  // ---------------------------------------------------------------------
  // OTRAS DOTES GENERALES
  // ---------------------------------------------------------------------
  {
    id: "cc-awesome-smite",
    name: "Castigo Imponente",
    source: "complete-champion",
    types: ["combate"],
    description: "El paladín combina la furia sagrada de su castigo divino con la fuerza bruta del Ataque Poderoso.",
    benefit:
      "Al realizar un ataque de castigo divino con Ataque Poderoso (penalización de al menos -1), puede elegir una de tres maniobras: Castigo Demoledor (ignora reducción de daño hasta el doble de su bonificador de Carisma), Castigo Arrollador (si el golpe impacta, cuenta también como un intento de derribo gratuito) o Castigo Certero (ignora cualquier probabilidad de fallo del objetivo). Solo una maniobra por ataque, declarada antes de tirar el ataque.",
    prerequisites: [
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
      { description: "Capacidad de usar castigo divino" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-bestial-charge",
    name: "Carga Bestial",
    source: "complete-champion",
    types: ["combate"],
    description: "El metamorfo aprende a aprovechar el ímpetu de una carga con su forma bestial de distintas maneras.",
    benefit:
      "Tras usar forma salvaje, en la carga del asalto siguiente puede elegir una de tres maniobras: Carga Arrolladora (realiza un ataque completo tras cargar; +3 al ataque si su forma tiene la capacidad de acometida), Carga Fulminante (gana +1,5 m de alcance; requiere una forma serpentina) o Carga Serpenteante (puede cambiar de dirección durante la carga; requiere 4 o más patas). Con Cambio de Forma Rápido, puede cargar el mismo asalto en que cambia de forma.",
    prerequisites: [
      { description: "Bonificador base de ataque +4", check: (ctx) => ctx.babTotal >= 4 },
      { description: "Capacidad de usar metamorfosis salvaje" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-elemental-essence",
    name: "Esencia Elemental",
    source: "complete-champion",
    types: ["general"],
    description: "El metamorfo aprende a imbuir sus armas naturales con energía elemental, eligiendo ácido, frío, electricidad o fuego al adoptar esta dote.",
    benefit:
      "Al elegir esta dote, selecciona ácido, frío, electricidad o fuego. Como acción rápida, puede gastar un uso diario de metamorfosis salvaje para envolver sus armas naturales en esa energía hasta el final de su turno: sus ataques cuerpo a cuerpo causan +1d6 puntos de daño adicional de energía del tipo elegido, y gana resistencia 5 a esa energía durante la misma duración.",
    prerequisites: [
      { description: "Otra dote salvaje cualquiera" },
      { description: "Capacidad de usar metamorfosis salvaje" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-spontaneous-domains",
    name: "Dominios Espontáneos",
    source: "complete-champion",
    types: ["general"],
    description: "El sacerdote aprende a dejar sin preparar sus espacios de conjuro de dominio y elegir en el momento cuál lanzar.",
    benefit:
      "Puede dejar sus espacios de conjuro de dominio sin preparar y, en el momento de lanzarlos, elegir cuál de los conjuros de dominio disponibles de ese nivel lanzar. Sigue limitado a un conjuro de dominio por nivel de personaje y día.",
    prerequisites: [
      { description: "Capacidad de lanzar conjuros de nivel 3" },
      { description: "Acceso a 2 o más dominios" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-imbued-healing",
    name: "Curación Imbuida",
    source: "complete-champion",
    types: ["metamagia"],
    description: "Los conjuros de curación del sacerdote llevan impresa la naturaleza de sus dominios divinos.",
    benefit:
      "Sus conjuros de conjuración (curación) de nivel 1 o superior conceden además un efecto secundario ligado a uno de sus dominios (a elegir al lanzar el conjuro), con una duración de 1 minuto por nivel del conjuro; por ejemplo, el dominio de Aire otorga resistencia a la electricidad 5, el dominio del Bien otorga reducción de daño 3/mal, y el dominio de la Fuerza otorga +2 al daño cuerpo a cuerpo. No se puede combinar con curación usada para infligir daño a no muertos; los efectos concretos dependen del dominio elegido cada vez.",
    prerequisites: [
      { description: "Capacidad de lanzar conjuración (curación)" },
      { description: "Acceso a uno o más dominios" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // DOTES DE RESERVA
  // ---------------------------------------------------------------------
  // Subsistema propio de Complete Champion: mientras el personaje tenga
  // "disponible" (sin preparar/gastar) un conjuro del nivel y tipo indicado,
  // puede usar la dote las veces que quiera ese día. El conjuro NO se
  // consume al activar la dote — "tenerlo en reserva" es solo una condición
  // que debe seguir cumpliéndose, no un coste.
  {
    id: "cc-charnel-miasma",
    name: "Miasma Sepulcral",
    source: "complete-champion",
    types: ["especial"],
    description: "El fiel del dominio de Muerte puede liberar en cualquier momento un hálito de terror mortuorio.",
    benefit:
      "Mientras tenga disponible (sin preparar) un conjuro de dominio de Muerte de nivel 2 o superior, como acción estándar, obliga a una criatura viva a 9 m a superar una salvación de Voluntad o quedar sacudida durante 1 minuto (aterrorizada, en vez de sacudida, si ya estaba sacudida y falla la salvación). Además, gana +1 de competencia al nivel de lanzador con conjuros de la escuela de nigromancia con el descriptor de muerte.",
    prerequisites: [{ description: "Acceso al dominio de Muerte" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-fragile-construct",
    name: "Constructo Frágil",
    source: "complete-champion",
    types: ["especial"],
    description: "El fiel del dominio de Destrucción sabe encontrar y explotar los puntos débiles de constructos y objetos.",
    benefit:
      "Mientras tenga disponible (sin preparar) un conjuro de dominio de Destrucción de nivel 3 o superior, un toque contra un objeto o constructo reduce su dureza o su reducción de daño en una cantidad igual al nivel de ese conjuro (sin bajar de 0), durante un número de asaltos igual a su nivel de lanzador. Además, gana +1 de perspicacia a las pruebas de Desguazar.",
    prerequisites: [{ description: "Acceso al dominio de Destrucción" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-holy-warrior",
    name: "Guerrero Sagrado",
    source: "complete-champion",
    types: ["especial"],
    description: "El fiel del dominio de la Guerra invoca la furia de su fe para reforzar sus golpes.",
    benefit:
      "Mientras tenga disponible (sin preparar) un conjuro de dominio de la Guerra de nivel 4 o superior, como acción rápida, gana un bonificador a sus tiradas de daño con arma igual al nivel de ese conjuro, durante 1 asalto. Además, gana +1 de competencia al nivel de lanzador con conjuros de la escuela de evocación con el descriptor de fuerza.",
    prerequisites: [
      { description: "Capacidad de lanzar conjuros de nivel 4" },
      { description: "Acceso al dominio de la Guerra" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-mitigate-suffering",
    name: "Mitigar el Sufrimiento",
    source: "complete-champion",
    types: ["especial"],
    description: "El fiel puede aliviar temporalmente el desgaste de las características de un aliado herido.",
    benefit:
      "Mientras tenga disponible (sin preparar) cualquier conjuro de restauración o de conjuración (curación) que repare daño de característica, como acción estándar, concede a una criatura puntos de característica temporales iguales a 2 + 1 por nivel del conjuro disponible más alto, durante 10 minutos. Además, gana +1 de competencia al nivel de lanzador con conjuros de conjuración (curación).",
    prerequisites: [{ description: "Capacidad de lanzar conjuros de nivel 2" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-protective-ward",
    name: "Guardia Protectora",
    source: "complete-champion",
    types: ["especial"],
    description: "El fiel del dominio de Protección puede envolver a un aliado en una barrera de fe.",
    benefit:
      "Mientras tenga disponible (sin preparar) un conjuro de abjuración, como acción estándar, concede a sí mismo o a un aliado a 9 m un bonificador a la Clase de Armadura igual al nivel del conjuro de abjuración disponible más alto, hasta el inicio de su siguiente turno. Además, gana +1 de competencia al nivel de lanzador con conjuros de abjuración.",
    prerequisites: [{ description: "Acceso al dominio de Protección" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-touch-of-healing",
    name: "Toque Curativo",
    source: "complete-champion",
    types: ["especial"],
    description: "El fiel puede restaurar la vitalidad de un aliado malherido con un simple contacto.",
    benefit:
      "Mientras tenga disponible (sin preparar) un conjuro de conjuración (curación) de nivel 2 o superior, como acción estándar, un toque cura 3 puntos de golpe por nivel del conjuro disponible más alto a una criatura que se encuentre a la mitad de sus puntos de golpe totales o menos (no afecta a criaturas que no pueden ser sanadas por conjuros de curación). Además, gana +1 de competencia al nivel de lanzador con conjuración (curación).",
    prerequisites: [{ description: "Capacidad de lanzar conjuros de nivel 2" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cc-umbral-shroud",
    name: "Manto de Sombras",
    source: "complete-champion",
    types: ["especial"],
    description: "El fiel puede envolver en tinieblas a un enemigo y agudizar su propia vista en la penumbra.",
    benefit:
      "Mientras tenga disponible (sin preparar) un conjuro de oscuridad de nivel 3 o superior, como acción estándar, un enemigo a 9 m que falle una salvación de Voluntad sufre una probabilidad de fallo del 5% por nivel del conjuro disponible más alto hasta su siguiente turno (sin efecto en criaturas que no dependen de la vista o que posean Combate a Ciegas). Además, gana (o amplía en 3 m) su visión en la oscuridad.",
    prerequisites: [{ description: "Capacidad de lanzar conjuros de nivel 3" }],
    fighterBonusFeat: false,
    stackable: false,
  },
];

export const CC_FEAT_IDS = CC_FEATS.map((f) => f.id);
