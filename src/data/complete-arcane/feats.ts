import type { Feat, FeatPrereqContext } from "../../types";

// Dotes de Complete Arcane (2004).
//
// Convenciones (iguales a src/data/srd/feats.ts):
// - `id` en kebab-case basado en el nombre en inglés del libro, con prefijo
//   `ca-` para distinguirlas de las dotes homónimas de otros libros.
// - `prerequisites[].check` solo se define para prerrequisitos mecánicos
//   simples y verificables (puntuación de característica, rango de
//   habilidad, dote previa, nivel de lanzador). Los prerrequisitos
//   narrativos (ej. "poseer un familiar", "venerar a una deidad") quedan
//   solo como texto.
//
// Solo se incluyen dotes de las que hay confianza razonable de que
// pertenecen a este libro. No se duplican dotes ya presentes en el SRD
// (p. ej. Familiar Mejorado, Contrahechizo Mejorado o las dotes básicas de
// metamagia y creación de objetos, que son contenido abierto reimpreso en
// Complete Arcane pero ya están modeladas con source: "srd").

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

export const CA_FEATS: Feat[] = [
  // ---------------------------------------------------------------------
  // GENERALES
  // ---------------------------------------------------------------------
  {
    id: "ca-arcane-disciple",
    name: "Discípulo Arcano",
    source: "complete-arcane",
    types: ["general"],
    description:
      "El lanzador arcano estudia las enseñanzas de una deidad y aprende a canalizar una fracción de su poder divino a través de su propia magia.",
    benefit:
      "Elige un dominio de una deidad a la que venere. Añade los conjuros de dominio de nivel igual o inferior al conjuro arcano más alto que pueda lanzar a la lista de conjuros de su clase, y obtiene el poder de dominio de nivel 1 asociado. Además, puede lanzar una vez al día el conjuro de dominio de mayor nivel al que tenga acceso como un conjuro de dominio adicional.",
    prerequisites: [
      { description: "Saber (Religión) 8 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 8 },
      { description: "Debe venerar a una deidad" },
      { description: "Capacidad de lanzar conjuros arcanos" },
    ],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "ca-arcane-mastery",
    name: "Maestría Arcana",
    source: "complete-arcane",
    types: ["general"],
    description:
      "Un lanzador arcano de enorme experiencia aprende a proteger sus propios conjuros frente a los intentos de contrarrestarlos o disiparlos.",
    benefit:
      "Cuando otro lanzador intenta contrarrestar o disipar un conjuro suyo, puede gastar una acción rápida para sumar un bonificador a la prueba de nivel de lanzador enfrentada igual a la mitad de su nivel de lanzador (redondeando hacia abajo).",
    prerequisites: [
      { description: "Conocimiento de Conjuros 15 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 15 },
      { description: "Capacidad de lanzar conjuros arcanos de nivel 9" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-arcane-preparation",
    name: "Preparación Arcana",
    source: "complete-arcane",
    types: ["general"],
    description:
      "Un lanzador espontáneo aprende a reservar de antemano parte de su magia, del mismo modo en que un mago prepara sus conjuros cada mañana.",
    benefit:
      "Al recuperar sus espacios de conjuro diarios, puede 'preparar' un número limitado de conjuros concretos de entre los que conoce, ocupando espacios de conjuro que normalmente usaría de forma espontánea. Esos conjuros preparados pueden combinarse con dotes de metamagia sin sufrir el aumento de tiempo de lanzamiento habitual en un lanzador espontáneo, tal y como haría un mago; si no se lanzan durante el día, se pierden.",
    prerequisites: [
      { description: "Capacidad de lanzar conjuros arcanos de forma espontánea (bardo o hechicero)" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-arcane-schooling",
    name: "Instrucción Arcana",
    source: "complete-arcane",
    types: ["general"],
    description:
      "El personaje recibió una educación formal en los fundamentos de la magia arcana, aunque su vocación principal sea otra.",
    benefit:
      "Elige bardo, hechicero o mago. Gana Conocimiento de Conjuros como habilidad de clase en todas sus clases y obtiene un +2 de bonificador de competencia en las pruebas de Usar Objeto Mágico realizadas para activar pergaminos de esa clase.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-arcane-thesis",
    name: "Tesis Arcana",
    source: "complete-arcane",
    types: ["general"],
    description:
      "El lanzador ha estudiado un conjuro concreto con tanta profundidad que domina sus variantes con metamagia con más facilidad que cualquier otro.",
    benefit:
      "Elige un conjuro que conozca. El incremento de nivel de espacio de conjuro que exige cualquier dote de metamagia aplicada a ese conjuro en particular se reduce en 1 (nunca por debajo del nivel real del conjuro más 1).",
    prerequisites: [{ description: "Capacidad de lanzar conjuros arcanos" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "ca-extra-slot",
    name: "Espacio Adicional",
    source: "complete-arcane",
    types: ["general"],
    description: "El lanzador arcano encuentra reservas de poder mágico allí donde no debería haberlas.",
    benefit:
      "Elige un nivel de conjuro que sea capaz de lanzar. Gana un espacio de conjuro adicional de ese nivel, utilizable únicamente para lanzar un conjuro modificado por al menos una dote de metamagia. Se puede tomar varias veces; cada vez se aplica a un nivel de conjuro distinto.",
    prerequisites: [{ description: "Capacidad de lanzar conjuros arcanos" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "ca-extra-spell",
    name: "Conjuro Adicional",
    source: "complete-arcane",
    types: ["general"],
    description: "El lanzador espontáneo amplía su repertorio de conjuros conocidos más allá de lo habitual para su nivel.",
    benefit:
      "Elige un conjuro de un nivel que ya sea capaz de lanzar, de la lista de conjuros de una de sus clases lanzadoras espontáneas. Lo añade de inmediato a sus conjuros conocidos, como si lo hubiera aprendido al subir de nivel. Se puede tomar varias veces, eligiendo un conjuro distinto cada vez.",
    prerequisites: [{ description: "Capacidad de lanzar conjuros arcanos de forma espontánea" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "ca-innate-spell",
    name: "Conjuro Innato",
    source: "complete-arcane",
    types: ["general"],
    description:
      "El lanzador transforma parte de su magia estudiada en un poder que fluye de su propio ser, sin preparación ni componentes.",
    benefit:
      "Elige conjuros conocidos cuya suma de niveles no exceda su modificador de característica de lanzamiento. Puede manifestar cada uno de ellos una vez al día como una capacidad sobrenatural similar a un conjuro (sin componentes verbales, somáticos ni materiales, inmune a Contrahechizo y a pruebas de Conocimiento de Conjuros para identificarlo mientras se manifiesta), usando su nivel de lanzador habitual para todos los efectos dependientes del nivel.",
    prerequisites: [{ description: "Nivel de lanzador 9", check: (ctx) => ctx.casterLevel >= 9 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-obtain-familiar",
    name: "Obtener Familiar",
    source: "complete-arcane",
    types: ["general"],
    description: "Un lanzador arcano sin vínculo natural con un familiar aprende el ritual necesario para conseguir uno.",
    benefit:
      "Obtiene un familiar siguiendo las reglas normales, como si tuviera un nivel de lanzador de mago igual a su nivel de personaje. Con posterioridad puede cualificar para Familiar Mejorado igual que cualquier otro lanzador con familiar.",
    prerequisites: [
      { description: "Capacidad de lanzar al menos un conjuro arcano" },
      { description: "No poseer ya un familiar" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-practiced-spellcaster",
    name: "Lanzador Practicado",
    source: "complete-arcane",
    types: ["general"],
    description:
      "El lanzador ha dedicado un esfuerzo desproporcionado a perfeccionar la potencia bruta de su magia, aunque su repertorio de conjuros no haya crecido al mismo ritmo.",
    benefit:
      "Elige una clase lanzadora de conjuros. Su nivel de lanzador con esa clase aumenta en 4, hasta un máximo igual a su nivel de personaje. Este incremento no otorga conjuros por día ni conjuros conocidos adicionales; solo afecta a los efectos que dependen del nivel de lanzador (alcance, duración, variables numéricas y pruebas para superar resistencia a conjuros).",
    prerequisites: [
      { description: "Nivel de lanzador en la clase elegida inferior a su nivel de personaje" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // METAMAGIA
  // ---------------------------------------------------------------------
  {
    id: "ca-chain-spell",
    name: "Conjuro en Cadena",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador aprende a hacer que un conjuro de objetivo único salte de un blanco a otro, como un rayo en cadena.",
    benefit:
      "Un conjuro de objetivo único con salvación puede lanzarse afectando además a un número de objetivos secundarios igual al nivel de lanzador (máximo uno por cada 2 niveles de lanzador, hasta un límite razonable elegido por el DJ). El objetivo principal recibe el efecto completo; cada objetivo secundario recibe 1 dado de daño menos por eslabón que el anterior y puede intentar su propia salvación. Usa un espacio de conjuro tres niveles más alto que el nivel real.",
    prerequisites: [{ description: "Capacidad de lanzar conjuros arcanos de nivel 6 o superior" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-delay-spell",
    name: "Conjuro Retardado",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador aprende a posponer el instante exacto en que su conjuro surte efecto.",
    benefit:
      "El conjuro no surte efecto de inmediato, sino tras un retraso de entre 1 y 5 asaltos elegido al lanzarlo. Ningún efecto del conjuro se manifiesta durante la demora. Usa un espacio de conjuro dos niveles más alto que el nivel real.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-energy-substitution",
    name: "Sustitución de Energía",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador aprende a remodelar sus conjuros elementales para que empleen un tipo de energía distinto del habitual.",
    benefit:
      "Elige un tipo de energía (ácido, electricidad, frío, fuego o sónico). Puede lanzar cualquier conjuro que conozca con descriptor de energía sustituyendo su tipo de daño original por el elegido, sin alterar ningún otro efecto del conjuro. No requiere un espacio de conjuro de nivel superior. Se puede tomar varias veces, cada una para un tipo de energía distinto.",
    prerequisites: [
      { description: "Saber (Arcano) 5 rangos", check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 5 },
    ],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "ca-energy-admixture",
    name: "Mezcla de Energía",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador combina dos tipos de energía elemental en un mismo conjuro para golpear con ambas a la vez.",
    benefit:
      "Un conjuro con descriptor de energía puede lanzarse causando además el efecto completo del conjuro con un segundo tipo de energía elegido. Una criatura con inmunidad o resistencia a uno de los dos tipos solo se ve afectada por el otro. Usa un espacio de conjuro cuatro niveles más alto que el nivel real.",
    prerequisites: [
      { description: "Sustitución de Energía (cualquier tipo)", check: hasFeat("ca-energy-substitution") },
      { description: "Capacidad de lanzar conjuros arcanos de nivel 3 o superior" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-multispell",
    name: "Multiconjuro",
    source: "complete-arcane",
    types: ["metamagia"],
    description:
      "El lanzador más experimentado en el uso de la magia acelerada aprende a desencadenar más de un conjuro acelerado en el mismo instante.",
    benefit:
      "Un número de veces al día igual a su modificador de característica de lanzamiento (mínimo 1), puede lanzar un segundo conjuro modificado con Conjuro Acelerado en el mismo asalto además del primero, pagando el coste de espacio de conjuro de cada uno por separado.",
    prerequisites: [
      { description: "Conjuro Acelerado", check: hasFeat("quicken-spell") },
      { description: "Capacidad de lanzar conjuros arcanos de nivel 6 o superior" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-persistent-spell",
    name: "Conjuro Persistente",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador extiende un conjuro personal hasta que su duración cubre un día entero.",
    benefit:
      "Un conjuro con duración de 1 asalto/nivel o mayor (y sin duración instantánea) pasa a durar 24 horas. Usa un espacio de conjuro seis niveles más alto que el nivel real.",
    prerequisites: [{ description: "Conjuro Extendido", check: hasFeat("extend-spell") }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-sanctum-spell",
    name: "Conjuro de Santuario",
    source: "complete-arcane",
    types: ["metamagia"],
    description:
      "El lanzador que ha consagrado un lugar como santuario personal aprende a potenciar allí su magia sin esfuerzo adicional.",
    benefit:
      "Mientras se encuentre dentro de su santuario personal, puede lanzar cualquier conjuro con +2 a la CD de salvación y +2 a las pruebas de nivel de lanzador para superar resistencia a conjuros, sin ocupar un espacio de conjuro de nivel superior al real.",
    prerequisites: [{ description: "Poseer un santuario personal consagrado mediante el ritual apropiado" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-sculpt-spell",
    name: "Conjuro Esculpido",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador aprende a moldear el área de sus conjuros para excluir de ella a sus propios aliados.",
    benefit:
      "Al lanzar un conjuro con efecto de área, puede excluir de dicha área un número de casillas de 1,5 x 1,5 m igual al doble del nivel del conjuro. Usa un espacio de conjuro un nivel más alto que el real.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-twin-spell",
    name: "Conjuro Gemelo",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador aprende a duplicar el efecto de un conjuro sobre el mismo objetivo o área en el mismo instante de lanzarlo.",
    benefit:
      "El conjuro surte efecto dos veces seguidas sobre el mismo objetivo o área, como si se hubiera lanzado dos veces. No puede aplicarse a conjuros de alcance Personal. Usa un espacio de conjuro cuatro niveles más alto que el nivel real.",
    prerequisites: [{ description: "Capacidad de lanzar conjuros arcanos de nivel 5 o superior" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-sudden-empower",
    name: "Conjuro Fortalecido Repentino",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador puede fortalecer un conjuro en el último instante, sin haberlo preparado así de antemano.",
    benefit:
      "Una vez al día, puede aplicar el efecto de Conjuro Fortalecido a un conjuro que esté lanzando sin necesidad de haberlo preparado con esa dote y sin aumentar el tiempo de lanzamiento (aunque sigue ocupando un espacio de conjuro dos niveles más alto que el real).",
    prerequisites: [{ description: "Conjuro Fortalecido", check: hasFeat("empower-spell") }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-sudden-enlarge",
    name: "Conjuro Agrandado Repentino",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador puede extender el alcance de un conjuro en el último instante, sin haberlo preparado así de antemano.",
    benefit:
      "Una vez al día, puede aplicar el efecto de Conjuro Agrandado a un conjuro que esté lanzando sin necesidad de haberlo preparado con esa dote y sin aumentar el tiempo de lanzamiento (aunque sigue ocupando un espacio de conjuro un nivel más alto que el real).",
    prerequisites: [{ description: "Conjuro Agrandado", check: hasFeat("enlarge-spell") }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-sudden-extend",
    name: "Conjuro Extendido Repentino",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador puede prolongar la duración de un conjuro en el último instante, sin haberlo preparado así de antemano.",
    benefit:
      "Una vez al día, puede aplicar el efecto de Conjuro Extendido a un conjuro que esté lanzando sin necesidad de haberlo preparado con esa dote y sin aumentar el tiempo de lanzamiento (aunque sigue ocupando un espacio de conjuro un nivel más alto que el real).",
    prerequisites: [{ description: "Conjuro Extendido", check: hasFeat("extend-spell") }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-sudden-maximize",
    name: "Conjuro Maximizado Repentino",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador puede maximizar un conjuro en el último instante, sin haberlo preparado así de antemano.",
    benefit:
      "Una vez al día, puede aplicar el efecto de Conjuro Maximizado a un conjuro que esté lanzando sin necesidad de haberlo preparado con esa dote y sin aumentar el tiempo de lanzamiento (aunque sigue ocupando un espacio de conjuro tres niveles más alto que el real).",
    prerequisites: [{ description: "Conjuro Maximizado", check: hasFeat("maximize-spell") }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-sudden-silent",
    name: "Conjuro Silencioso Repentino",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador puede prescindir de las palabras mágicas en el último instante, sin haberlo preparado así de antemano.",
    benefit:
      "Una vez al día, puede aplicar el efecto de Conjuro Silencioso a un conjuro que esté lanzando sin necesidad de haberlo preparado con esa dote y sin aumentar el tiempo de lanzamiento (aunque sigue ocupando un espacio de conjuro un nivel más alto que el real).",
    prerequisites: [{ description: "Conjuro Silencioso", check: hasFeat("silent-spell") }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-sudden-still",
    name: "Conjuro Sigiloso Repentino",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador puede prescindir de los gestos rituales en el último instante, sin haberlo preparado así de antemano.",
    benefit:
      "Una vez al día, puede aplicar el efecto de Conjuro Sigiloso a un conjuro que esté lanzando sin necesidad de haberlo preparado con esa dote y sin aumentar el tiempo de lanzamiento (aunque sigue ocupando un espacio de conjuro un nivel más alto que el real).",
    prerequisites: [{ description: "Conjuro Sigiloso", check: hasFeat("still-spell") }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-sudden-widen",
    name: "Conjuro Expandido Repentino",
    source: "complete-arcane",
    types: ["metamagia"],
    description: "El lanzador puede expandir el área de un conjuro en el último instante, sin haberlo preparado así de antemano.",
    benefit:
      "Una vez al día, puede aplicar el efecto de Conjuro Expandido a un conjuro que esté lanzando sin necesidad de haberlo preparado con esa dote y sin aumentar el tiempo de lanzamiento (aunque sigue ocupando un espacio de conjuro tres niveles más alto que el real).",
    prerequisites: [{ description: "Conjuro Expandido", check: hasFeat("widen-spell") }],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // CREACIÓN DE OBJETOS MÁGICOS
  // ---------------------------------------------------------------------
  {
    id: "ca-craft-contingent-spell",
    name: "Crear Conjuro Contingente",
    source: "complete-arcane",
    types: ["creacion_objetos"],
    description:
      "El lanzador aprende a vincular uno de sus conjuros a una condición desencadenante predefinida, de forma similar al conjuro contingencia pero mediante un proceso propio de creación de objetos.",
    benefit:
      "Puede vincular un conjuro que conozca y sea capaz de lanzar sobre sí mismo a una condición desencadenante, de modo que se active automáticamente cuando esta se cumpla. El proceso consume tiempo y materiales equivalentes a la creación de un objeto mágico permanente del mismo nivel de conjuro y de lanzador.",
    prerequisites: [
      { description: "Nivel de lanzador 11", check: (ctx) => ctx.casterLevel >= 11 },
      { description: "Capacidad de lanzar el conjuro contingencia" },
    ],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "ca-master-staff",
    name: "Maestro de Báculos",
    source: "complete-arcane",
    types: ["creacion_objetos"],
    description: "El artesano que forjó un báculo mágico aprende a extraer de él más poder que cualquier otro usuario.",
    benefit:
      "Al usar un báculo que él mismo haya creado, no gasta cargas del báculo al lanzar cualquier conjuro almacenado en él cuyo nivel sea igual o inferior a la mitad de su nivel de lanzador (redondeando hacia abajo).",
    prerequisites: [{ description: "Crear Báculo Mágico", check: hasFeat("craft-staff") }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-master-wand",
    name: "Maestro de Varitas",
    source: "complete-arcane",
    types: ["creacion_objetos"],
    description: "El lanzador aprende a sacar el máximo partido de cualquier varita que empuñe, no solo de las que él mismo fabricó.",
    benefit:
      "Al usar cualquier varita, puede tratar su propio nivel de lanzador como el nivel de lanzador de la varita si este es superior, hasta un máximo igual a su nivel de lanzador real, y no necesita realizar una prueba de Usar Objeto Mágico para activar varitas de una clase que no domine.",
    prerequisites: [{ description: "Crear Varita Mágica", check: hasFeat("craft-wand") }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "ca-scribe-tattoo",
    name: "Tatuaje Mágico",
    source: "complete-arcane",
    types: ["creacion_objetos"],
    description:
      "El lanzador aprende a grabar la magia directamente sobre la piel de una criatura, creando una variante de objeto maravilloso que no puede robarse ni desprenderse por la fuerza.",
    benefit:
      "Puede crear tatuajes mágicos siguiendo las mismas reglas que los objetos maravillosos, gastando en materiales la mitad de su precio base en el mercado. Cada tatuaje ocupa un espacio corporal propio, independiente de otros objetos mágicos que lleve el portador.",
    prerequisites: [{ description: "Nivel de lanzador 3", check: (ctx) => ctx.casterLevel >= 3 }],
    fighterBonusFeat: false,
    stackable: false,
  },
];

export const CA_FEAT_IDS = CA_FEATS.map((f) => f.id);
