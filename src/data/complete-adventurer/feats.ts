import type { Feat, FeatPrereqContext } from "../../types";

// Dotes de Complete Adventurer (2005).
//
// Convenciones (iguales a src/data/srd/feats.ts):
// - `id` en kebab-case basado en el nombre en inglés del libro, con prefijo
//   `cad-` para distinguirlas de las dotes homónimas de otros libros.
// - `prerequisites[].check` solo se define para prerrequisitos mecánicos
//   simples y verificables (puntuación de característica, BAB, dote previa,
//   rango de habilidad). Los prerrequisitos narrativos o basados en dados de
//   ataque furtivo (que este modelo de datos no rastrea numéricamente) quedan
//   solo como texto descriptivo.
// - No se duplica ninguna dote ya presente en el SRD.
// - Este libro está centrado en pícaros, exploradores, bardos y ambientación
//   urbana; solo se incluyen dotes de las que hay confianza razonable de que
//   pertenecen a él. Se ha preferido omitir contenido dudoso (p. ej. dotes de
//   psiónica, de metamagia o de estilo de combate cuyo origen exacto no está
//   claro) antes que inventarlo o atribuirlo al libro equivocado. No se
//   incluyen "trucos de habilidad" (skill tricks, introducidos en un libro
//   posterior).

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

export const CAD_FEATS: Feat[] = [
  // ---------------------------------------------------------------------
  // ATAQUE FURTIVO Y SIGILO (pícaros, exploradores, asesinos)
  // ---------------------------------------------------------------------
  {
    id: "cad-craven",
    name: "Cobarde",
    source: "complete-adventurer",
    types: ["general"],
    description: "El miedo, lejos de paralizarlo, afila la puntería de sus golpes a traición.",
    benefit:
      "Cuando inflige daño por ataque furtivo, suma su nivel de personaje al daño (en vez de depender solo de los dados de ataque furtivo). Sin embargo, siempre que sea capaz de infligir daño por ataque furtivo se le considera conmocionado durante el combate, salvo que ya sea inmune al miedo.",
    prerequisites: [{ description: "Capacidad de infligir daño por ataque furtivo" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-fast-stealth",
    name: "Sigilo Veloz",
    source: "complete-adventurer",
    types: ["general"],
    description: "Se mueve con la misma discreción tanto si camina despacio como si corre.",
    benefit:
      "Puede moverse a su velocidad normal completa mientras usa las habilidades de Esconderse y Moverse en Silencio, sin el penalizador de -5 que normalmente se aplica por moverse a más de la mitad de la velocidad.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-staggering-strike",
    name: "Golpe Aturdidor",
    source: "complete-adventurer",
    types: ["general"],
    description: "Sabe colocar el ataque furtivo justo donde más aturde al cuerpo del enemigo.",
    benefit:
      "Cuando inflige daño por ataque furtivo, el objetivo debe superar una salvación de Fortaleza (CD 10 + la mitad del nivel de personaje + modificador de Destreza) o quedar aturdido durante 1 asalto.",
    prerequisites: [{ description: "Ataque furtivo +4d6 o superior" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-necksnapper",
    name: "Rompenucas",
    source: "complete-adventurer",
    types: ["general"],
    description: "Un golpe furtivo bien colocado contra un rival indefenso puede dejarlo fuera de combate sin matarlo.",
    benefit:
      "Cuando inflige daño por ataque furtivo a un objetivo indefenso o inmovilizado en una presa, puede optar por que ese daño sea no letal; si el objetivo queda reducido a 0 puntos de golpe o menos, cae inconsciente en lugar de morir o quedar agonizante.",
    prerequisites: [{ description: "Ataque furtivo +3d6 o superior" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-bewildering-injury",
    name: "Herida Desconcertante",
    source: "complete-adventurer",
    types: ["general"],
    description: "El dolor repentino del ataque furtivo desorienta al enemigo, que ya no distingue amigos de rivales.",
    benefit:
      "Cuando inflige daño por ataque furtivo, el objetivo debe superar una salvación de Fortaleza (CD 10 + la mitad del nivel de personaje + modificador de Destreza) o quedar desconcertado durante 1 asalto, perdiendo cualquier bonificador que obtendría por flanquear o ser ayudado por sus aliados.",
    prerequisites: [{ description: "Ataque furtivo +3d6 o superior" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-telling-blow",
    name: "Golpe Certero",
    source: "complete-adventurer",
    types: ["general"],
    description: "Cuando su hoja encuentra un punto vital desprevenido, el golpe es letal casi con seguridad.",
    benefit:
      "Siempre que inflige daño por ataque furtivo con un golpe crítico, se considera que ha confirmado automáticamente el crítico, sin necesidad de realizar la tirada de confirmación.",
    prerequisites: [{ description: "Capacidad de infligir daño por ataque furtivo" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-legendary-tracker",
    name: "Rastreador Legendario",
    source: "complete-adventurer",
    types: ["general"],
    description: "Ha rastreado tantas huellas que ya casi nunca pierde una pista por completo.",
    benefit:
      "Cuando falla una prueba de Supervivencia para seguir un rastro, no lo pierde de inmediato: puede seguir intentándolo con un penalizador acumulativo de -5 por cada fallo previo, en vez de tener que retroceder para recuperar la pista. Además, puede seguir un rastro a la mitad de su velocidad sin el penalizador habitual a la prueba.",
    prerequisites: [
      { description: "Dote de Rastreo", check: hasFeat("track") },
      { description: "Rango elevado en Supervivencia" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-quick-reconnoiter",
    name: "Reconocimiento Rápido",
    source: "complete-adventurer",
    types: ["general"],
    description: "Una simple mirada al enemigo le basta para calcular a qué se enfrenta.",
    benefit:
      "Como acción rápida, puede realizar una prueba de Avistar para evaluar las capacidades de combate de un oponente que pueda ver con claridad, obteniendo una estimación de si es más fuerte, más rápido, más hábil en combate o más resistente que él.",
    prerequisites: [
      { description: "Dote de Rastreo", check: hasFeat("track") },
      { description: "Rangos en Avistar y Supervivencia" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-tactile-trapsmith",
    name: "Artesano Táctil de Trampas",
    source: "complete-adventurer",
    types: ["general"],
    description: "Sus dedos leen los mecanismos de una trampa mejor de lo que sus ojos podrían nunca verlos.",
    benefit:
      "Puede usar Buscar y Desactivar Mecanismo para detectar y desactivar trampas por el tacto sin penalizador, incluso si está cegado o no puede ver el mecanismo en cuestión.",
    prerequisites: [{ description: "Rangos en Buscar y en Desactivar Mecanismo" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-nimble-stand",
    name: "Levantarse Ágil",
    source: "complete-adventurer",
    types: ["general"],
    description: "Cae con gracia y se pone en pie con la misma facilidad, sin perder el ritmo del combate.",
    benefit:
      "Puede levantarse de la posición de derribado como una acción libre en lugar de una acción de movimiento, siempre que supere una prueba de Acrobacias (CD 15).",
    prerequisites: [{ description: "Rangos en Acrobacias" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-pernicious-poison",
    name: "Veneno Pernicioso",
    source: "complete-adventurer",
    types: ["general"],
    description: "Sabe preparar y aplicar venenos de forma especialmente letal.",
    benefit: "+2 de bonificador de competencia a la CD de salvación de cualquier veneno que fabrique o aplique a un arma.",
    prerequisites: [{ description: "Capacidad de fabricar o aplicar venenos" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-steady-concentration",
    name: "Concentración Firme",
    source: "complete-adventurer",
    types: ["general"],
    description: "Ni el dolor ni el caos del combate rompen su enfoque al lanzar un conjuro.",
    benefit:
      "Puede sacar 10 en las pruebas de Concentración incluso cuando la distracción o el daño normalmente se lo impedirían.",
    prerequisites: [
      { description: "Concentración 5 rangos", check: (ctx) => (ctx.skillRanks["concentration"] ?? 0) >= 5 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // FAMILIARES ALTERNATIVOS
  // ---------------------------------------------------------------------
  {
    id: "cad-obtain-familiar",
    name: "Obtener Familiar",
    source: "complete-adventurer",
    types: ["especial"],
    description: "Un lanzador de conjuros que normalmente no vincularía un familiar consigue atraer a uno igualmente.",
    benefit:
      "Obtiene un familiar como si fuera un mago, usando su nivel de personaje como nivel de mago efectivo para determinar las capacidades del familiar (mínimo nivel 1).",
    prerequisites: [
      { description: "Capacidad de lanzar conjuros y no disponer ya de un familiar" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // ESTILO URBANO
  // ---------------------------------------------------------------------
  {
    id: "cad-street-smart",
    name: "Astucia Callejera",
    source: "complete-adventurer",
    types: ["general"],
    description: "Ha aprendido en las calles que un puño en alto convence tanto como las palabras.",
    benefit:
      "Puede usar su modificador de Fuerza en lugar del de Carisma en las pruebas de Intimidar, y gana un bonificador de competencia +2 en las pruebas de Obtener Información.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-urban-tracking",
    name: "Rastreo Urbano",
    source: "complete-adventurer",
    types: ["general"],
    description: "En una ciudad, un rastro se sigue preguntando, no oliendo el suelo.",
    benefit:
      "En una población o ciudad, puede usar Obtener Información en lugar de Supervivencia para seguir el rastro reciente de una persona concreta, invirtiendo 1 hora por intento.",
    prerequisites: [{ description: "Rangos en Obtener Información" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-insider-knowledge",
    name: "Conocimiento de Iniciado",
    source: "complete-adventurer",
    types: ["general"],
    description: "Conoce una comunidad concreta como la palma de su mano: sus rincones, sus rumores y su gente.",
    benefit:
      "Al elegir esta dote, designa una comunidad concreta. Dentro de ella obtiene un bonificador de competencia +4 en las pruebas de Conocimiento (Local) y Obtener Información relacionadas con dicha comunidad.",
    prerequisites: [{ description: "Debe designar una comunidad concreta al obtener la dote" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cad-collector-of-stories",
    name: "Coleccionista de Historias",
    source: "complete-adventurer",
    types: ["general"],
    description: "Un bardo que ha reunido tantas leyendas e historias que reconoce ecos de ellas en casi cualquier cosa.",
    benefit:
      "Puede usar su bonificador de Conocimiento Bárdico en lugar de una prueba de Conocimiento normal para identificar un objeto mágico o recordar información relevante sobre algo, siempre que pueda examinarlo o escuchar una descripción detallada de ello.",
    prerequisites: [{ description: "Capacidad de Conocimiento Bárdico" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-group-insight",
    name: "Perspicacia de Grupo",
    source: "complete-adventurer",
    types: ["general"],
    description: "Comparte con sus aliados los fragmentos de saber que ha ido recopilando por el camino.",
    benefit:
      "Cuando ayuda a un aliado mediante la acción de Ayudar a un Compañero en una prueba de habilidad relacionada con su Conocimiento Bárdico, el bonificador que le concede aumenta de +2 a un valor igual a su bonificador de Conocimiento Bárdico (mínimo +2).",
    prerequisites: [{ description: "Capacidad de Conocimiento Bárdico" }],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // ARTIMAÑAS EN COMBATE
  // ---------------------------------------------------------------------
  {
    id: "cad-vexing-flanker",
    name: "Flanqueador Exasperante",
    source: "complete-adventurer",
    types: ["general"],
    description: "Sabe colocarse en el flanqueo de tal manera que ni siquiera los reflejos más entrenados evitan quedar expuestos.",
    benefit:
      "Cuando flanquea a un oponente junto con un aliado, ese oponente se considera flanqueado por él a todos los efectos (incluida la posibilidad de sufrir ataque furtivo), incluso si normalmente sería capaz de negar el bonificador de flanqueo o el estado de indefenso mediante alguna capacidad especial.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
];

export const CAD_FEAT_IDS = CAD_FEATS.map((f) => f.id);
