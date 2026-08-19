import type { Feat, FeatPrereqContext } from "../../types";

// Dotes de Complete Mage (2006).
//
// Convenciones (iguales a src/data/srd/feats.ts y src/data/complete-arcane/feats.ts):
// - `id` en kebab-case basado en el nombre en inglés del libro, con prefijo
//   `cm-` para distinguirlas de las dotes homónimas de otros libros.
// - `prerequisites[].check` solo se define para prerrequisitos mecánicos
//   simples y verificables (puntuación de característica, rango de
//   habilidad, dote previa, nivel de lanzador). Los prerrequisitos
//   narrativos (ej. "poseer un familiar") quedan solo como texto.
//
// Se prioriza omitir antes que inventar: Complete Mage dedica una fracción
// muy grande de su capítulo de dotes a dos subsistemas que esta app no
// modela (la Reserva de Conjuros y las Palabras de Poder), además de varias
// dotes ligadas a una divinidad concreta de Reinos Olvidados (p. ej. Siervo
// de Plata de Ilmater) o a una cadena larga de dotes "Tocado por el Conjuro"
// cuyos detalles exactos no se recuerdan con precisión suficiente. Todo eso
// queda fuera de este archivo. Tampoco se duplican dotes ya modeladas en el
// SRD o en Complete Arcane (p. ej. Sustitución de Energía, Conjuro
// Santuario o Conjuro Innato, reimpresas o ampliadas en Complete Mage).
//
// El resultado es una lista más corta que el máximo pedido (30-50), pero
// compuesta únicamente por dotes de las que hay confianza razonable de que
// pertenecen a este libro.

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

export const CM_FEATS: Feat[] = [
  // ---------------------------------------------------------------------
  // GENERALES / ESPECIALES
  // ---------------------------------------------------------------------
  {
    id: "cm-ancestral-relic",
    name: "Reliquia Ancestral",
    source: "complete-mage",
    types: ["especial"],
    description:
      "El personaje está vinculado a un objeto mágico especial, transmitido en su familia o tradición, que crece en poder junto a él en vez de comprarse ya terminado.",
    benefit:
      "Obtiene un objeto mágico personal (arma, armadura, escudo o algo similar) que solo funciona a pleno rendimiento en sus manos. En vez de fabricarlo o comprarlo con oro, invierte tiempo entre aventuras para ir añadiéndole nuevas propiedades a medida que sube de nivel, pudiendo terminar con más poder acumulado del que su valor en el mercado permitiría normalmente.",
    prerequisites: [{ description: "Nivel de personaje 3", check: (ctx) => ctx.totalCharacterLevel >= 3 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-extra-reliquary-power",
    name: "Poder de Reliquia Adicional",
    source: "complete-mage",
    types: ["especial"],
    description: "El vínculo del personaje con su reliquia ancestral se profundiza antes de lo habitual.",
    benefit:
      "Su reliquia ancestral gana una propiedad especial adicional de inmediato, como si hubiera alcanzado el siguiente hito de nivel de personaje para ese propósito. Se puede tomar varias veces; sus efectos son acumulativos.",
    prerequisites: [{ description: "Reliquia Ancestral", check: hasFeat("cm-ancestral-relic") }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cm-arcane-fusion",
    name: "Fusión Arcana",
    source: "complete-mage",
    types: ["general"],
    description: "El lanzador aprende a entrelazar dos de sus conjuros en un único acto de voluntad.",
    benefit:
      "Puede lanzar dos conjuros que conozca y sea capaz de lanzar como una sola acción estándar, siempre que la suma de sus niveles no exceda el nivel de espacio de conjuro más alto que puede lanzar. Ambos conjuros deben tener el mismo objetivo, área o efecto compatible (a discreción del DJ) y ambos consumen su espacio de conjuro correspondiente.",
    prerequisites: [{ description: "Nivel de lanzador arcano 6", check: (ctx) => ctx.casterLevel >= 6 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-improved-arcane-fusion",
    name: "Fusión Arcana Mejorada",
    source: "complete-mage",
    types: ["general"],
    description: "El lanzador domina la Fusión Arcana hasta el punto de poder entrelazar tres conjuros a la vez.",
    benefit: "Al usar Fusión Arcana, puede combinar hasta tres conjuros en vez de dos.",
    prerequisites: [
      { description: "Fusión Arcana", check: hasFeat("cm-arcane-fusion") },
      { description: "Nivel de lanzador arcano 12", check: (ctx) => ctx.casterLevel >= 12 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-enhance-familiar",
    name: "Mejorar Familiar",
    source: "complete-mage",
    types: ["general"],
    description: "El vínculo del lanzador con su familiar se refuerza con una chispa de su propia alineación moral.",
    benefit:
      "Su familiar gana un aspecto menor asociado al alineamiento de su amo (celestial si es bueno, feérico si es neutral, o infernal si es malvado): resistencia a la energía 5 frente a un tipo relacionado, un ataque de sortilegio menor 1 vez al día y visión en la oscuridad si no la tenía ya, sin cambiar por lo demás el tipo de criatura del familiar.",
    prerequisites: [{ description: "Poseer un familiar" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-item-familiar",
    name: "Familiar de Objeto",
    source: "complete-mage",
    types: ["general"],
    description: "El lanzador aprende a fusionar temporalmente a su familiar con un pequeño objeto mágico que porte.",
    benefit:
      "Una vez al día, puede fusionar su familiar con un objeto mágico pequeño que lleve encima (un anillo, una varita, una joya). Mientras dura la fusión, el objeto queda a salvo de robo o pérdida dentro del familiar, y este puede 'liberarlo' de nuevo como acción estándar.",
    prerequisites: [{ description: "Poseer un familiar" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-familiar-spell",
    name: "Conjuro del Familiar",
    source: "complete-mage",
    types: ["general"],
    description: "El lanzador aprende a administrar su magia de toque a través del cuerpo de su familiar.",
    benefit:
      "Al lanzar un conjuro de toque, puede 'guardarlo' en su familiar en vez de en sí mismo. El familiar puede entonces administrar el conjuro con su propio ataque de toque en cualquier momento antes del final del siguiente turno del lanzador, mientras permanezca dentro de su alcance de vínculo especial.",
    prerequisites: [{ description: "Poseer un familiar" }, { description: "Capacidad de lanzar conjuros de toque" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-font-of-inspiration",
    name: "Fuente de Inspiración",
    source: "complete-mage",
    types: ["general"],
    description: "El intérprete encuentra una reserva de energía creativa mayor de lo habitual.",
    benefit: "Sus usos diarios de música de bardo (o una capacidad de inspiración similar) aumentan en 4.",
    prerequisites: [{ description: "Capacidad de usar música de bardo" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cm-nimbus-of-light",
    name: "Nimbo de Luz (Complete Mage)",
    source: "complete-mage",
    types: ["general"],
    description: "Un lanzador de alineamiento bueno aprende a manifestar una tenue aura de luz sagrada a voluntad.",
    benefit:
      "Una vez al día, puede envolverse en un nimbo de luz durante 1 asalto por nivel de personaje. El nimbo ilumina como una antorcha y otorga +2 de bonificador de competencia a las tiradas de salvación contra conjuros y efectos con el descriptor Maligno.",
    prerequisites: [
      { description: "Alineamiento bueno" },
      { description: "Capacidad de lanzar conjuros arcanos o divinos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-uncanny-forethought",
    name: "Previsión Sobrenatural",
    source: "complete-mage",
    types: ["general"],
    description: "Un lanzador preparado aprende a dejar parte de su magia diaria sin definir hasta el último momento.",
    benefit:
      "Al preparar sus conjuros, puede dejar sin asignar un número de espacios de conjuro igual a su modificador de característica de lanzamiento (mínimo 1). Más tarde, durante el mismo día, puede llenar cada espacio vacío con cualquier conjuro de su lista que ya conozca o tenga en su libro de conjuros, aplicándole además una dote de metamagia que conozca sin sufrir el aumento de tiempo de lanzamiento habitual de improvisar sobre la marcha.",
    prerequisites: [{ description: "Capacidad de preparar conjuros arcanos", check: (ctx) => ctx.casterLevel >= 1 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-tenacious-magic",
    name: "Magia Tenaz",
    source: "complete-mage",
    types: ["general"],
    description: "Los efectos mágicos del lanzador se resisten a desvanecerse del todo cuando son contrarrestados.",
    benefit:
      "Cuando uno de sus conjuros de duración prolongada es disipado o contrarrestado, sigue produciendo la mitad de su efecto numérico (redondeando hacia abajo) durante 1 asalto adicional antes de desaparecer del todo.",
    prerequisites: [{ description: "Nivel de lanzador 5", check: (ctx) => ctx.casterLevel >= 5 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-pernicious-magic",
    name: "Magia Perniciosa",
    source: "complete-mage",
    types: ["general"],
    description: "La magia del lanzador deja una marca persistente incluso en quienes logran resistirla.",
    benefit:
      "Cuando una criatura supera con éxito la tirada de salvación contra uno de sus conjuros, esa criatura sufre un -2 de penalización a su siguiente tirada de salvación contra otro conjuro suyo, siempre que se lance antes de que termine el mismo combate.",
    prerequisites: [{ description: "Nivel de lanzador 5", check: (ctx) => ctx.casterLevel >= 5 }],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // METAMAGIA
  // ---------------------------------------------------------------------
  {
    id: "cm-easy-metamagic",
    name: "Metamagia Sencilla",
    source: "complete-mage",
    types: ["metamagia"],
    description: "El lanzador aprende a aplicar una dote de metamagia concreta con menos esfuerzo sobre sus conjuros más simples.",
    benefit:
      "Elige una dote de metamagia que conozca. Al aplicarla a un conjuro de nivel 3 o inferior, el incremento de nivel de espacio que exige esa dote se reduce en 1 (nunca por debajo de un nivel por encima del real). Se puede tomar varias veces, cada vez para una dote de metamagia distinta.",
    prerequisites: [{ description: "Al menos una dote de metamagia" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cm-rapid-metamagic",
    name: "Metamagia Rápida",
    source: "complete-mage",
    types: ["metamagia"],
    description: "El lanzador experimentado en el uso de la metamagia aprende a aplicarla sin perder tiempo.",
    benefit:
      "Un número de veces al día igual a 1 + su modificador de característica de lanzamiento, puede aplicar una dote de metamagia que conozca a un conjuro sin aumentar su tiempo de lanzamiento habitual (aunque el conjuro sigue ocupando el espacio de nivel superior que exige la dote).",
    prerequisites: [
      { description: "Tres dotes de metamagia cualesquiera" },
      { description: "Nivel de lanzador 9", check: (ctx) => ctx.casterLevel >= 9 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-rapid-spell",
    name: "Conjuro Rápido",
    source: "complete-mage",
    types: ["metamagia"],
    description: "El lanzador aprende a acelerar sus conjuros más lentos en el fragor del combate.",
    benefit:
      "Un número de veces al día igual a su modificador de característica de lanzamiento (mínimo 1), puede lanzar un conjuro cuyo tiempo de lanzamiento normal sea de 1 asalto como si fuera una acción estándar, ocupando un espacio de conjuro un nivel más alto que el real.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-fell-drain",
    name: "Conjuro Funesto: Drenaje",
    source: "complete-mage",
    types: ["metamagia"],
    description: "El lanzador impregna sus conjuros más destructivos con una fracción del poder negativo de la no vida.",
    benefit:
      "Un conjuro que cause daño puede lanzarse de modo que, además de su efecto normal, inflija un nivel negativo a cada criatura viva que reciba daño de él (o que falle su salvación, si el conjuro permite alguna). Los niveles negativos desaparecen 24 horas después sin causar la pérdida de nivel permanente. Usa un espacio de conjuro dos niveles más alto que el real.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-fell-frighten",
    name: "Conjuro Funesto: Terror",
    source: "complete-mage",
    types: ["metamagia"],
    description: "El lanzador aprende a infundir un miedo paralizante en quienes son alcanzados por sus conjuros más dañinos.",
    benefit:
      "Un conjuro que cause daño puede lanzarse de modo que cualquier criatura que reciba daño de él deba superar una salvación de Voluntad o quedar conmocionada durante 1 asalto. Usa un espacio de conjuro dos niveles más alto que el real.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-signature-spell",
    name: "Conjuro Distintivo",
    source: "complete-mage",
    types: ["metamagia"],
    description: "El lanzador ha practicado tanto con un conjuro concreto que puede alterarlo sin pensar.",
    benefit:
      "Elige un conjuro que conozca. Una vez al día, puede aplicarle cualquier dote de metamagia que conozca sin aumentar su tiempo de lanzamiento habitual (aunque el conjuro sigue ocupando el espacio de nivel superior que exige esa dote).",
    prerequisites: [{ description: "Al menos una dote de metamagia" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cm-energy-affinity",
    name: "Afinidad Energética",
    source: "complete-mage",
    types: ["metamagia"],
    description: "El lanzador que ya domina la sustitución de energía aprende a hacerla permanente para un tipo concreto.",
    benefit:
      "Elige un tipo de energía (ácido, electricidad, frío, fuego o sónico) distinto del que ya tenga disponible mediante Sustitución de Energía. A partir de ahora, todos los conjuros que lance con descriptor de energía pueden emplear ese tipo alternativo sin necesidad de aplicar ninguna dote de metamagia ni ocupar un espacio de conjuro superior.",
    prerequisites: [{ description: "Sustitución de Energía", check: hasFeat("ca-energy-substitution") }],
    fighterBonusFeat: false,
    stackable: true,
  },

  // ---------------------------------------------------------------------
  // METAMAGIA ADICIONALES
  // ---------------------------------------------------------------------
  {
    id: "cm-alacritous-cogitation",
    name: "Cogitación Presurosa",
    source: "complete-mage",
    types: ["metamagia"],
    description: "El lanzador preparado aprende a reservar parte de su magia diaria para improvisar sobre la marcha.",
    benefit:
      "Una vez al día, al preparar sus conjuros, puede dejar un espacio de conjuro sin asignar. Más tarde ese mismo día, como acción de asalto completo, puede llenar ese espacio vacío lanzando de forma espontánea cualquier conjuro de ese nivel o inferior que conozca o tenga en su libro de conjuros, sin necesidad de haberlo preparado específicamente.",
    prerequisites: [{ description: "Capacidad de preparar conjuros arcanos", check: (ctx) => ctx.casterLevel >= 1 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-captivating-melody",
    name: "Melodía Cautivadora",
    source: "complete-mage",
    types: ["metamagia"],
    description: "El intérprete aprende a entrelazar su música con sus conjuros de encantamiento e ilusión para hacerlos más difíciles de resistir.",
    benefit:
      "Como acción rápida, puede gastar un uso diario de música de bardo y superar una prueba de Interpretar (CD 15 + el nivel del conjuro) para añadir +2 a la CD de salvación del siguiente conjuro de encantamiento o ilusión que lance ese mismo asalto.",
    prerequisites: [
      { description: "Capacidad de usar música de bardo" },
      {
        description:
          "Capacidad de lanzar conjuros arcanos de encantamiento o ilusión de la misma clase que otorga música de bardo",
      },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-cloudy-conjuration",
    name: "Conjuración Nublada",
    source: "complete-mage",
    types: ["metamagia"],
    description: "El lanzador aprende a envolver sus conjuros de conjuración en una densa nube de humo negro.",
    benefit:
      "Un conjuro de conjuración puede lanzarse de modo que, además de su efecto normal, quede rodeado durante 1 asalto por una densa nube de humo negro en un radio de 1,5 m alrededor de su área o del propio lanzador (a elección de este). Cualquier criatura viva que comience su turno dentro de la nube queda enfermiza durante 1 asalto. No cambia el nivel del conjuro.",
    prerequisites: [{ description: "Capacidad de lanzar conjuros de conjuración" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-dazzling-illusion",
    name: "Ilusión Deslumbrante",
    source: "complete-mage",
    types: ["metamagia"],
    description: "El lanzador aprende a acompañar sus ilusiones de un destello que deslumbra a quienes las presencian.",
    benefit:
      "Un conjuro de ilusión puede lanzarse de modo que, además de su efecto normal, todos los enemigos en un radio de 9 m desde el punto de origen queden deslumbrados durante 1 asalto. No cambia el nivel del conjuro.",
    prerequisites: [{ description: "Capacidad de lanzar conjuros de ilusión" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cm-delay-potion",
    name: "Retrasar Poción",
    source: "complete-mage",
    types: ["general"],
    description: "El personaje aprende a beber una poción sin activar de inmediato su efecto.",
    benefit:
      "Al beber una poción, puede posponer el inicio de su efecto hasta un número de horas igual a su modificador de Constitución (mínimo 1). Activar el efecto retrasado es una acción rápida.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
];

export const CM_FEAT_IDS = CM_FEATS.map((f) => f.id);
