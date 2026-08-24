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
      "Puede moverse a su velocidad normal completa mientras usa las habilidades de Esconderse y Moverse Sigilosamente, sin el penalizador de -5 que normalmente se aplica por moverse a más de la mitad de la velocidad.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-staggering-strike",
    name: "Impacto Asombroso",
    source: "complete-adventurer",
    types: ["general"],
    description: "Sabe colocar el ataque furtivo justo donde más aturde al cuerpo del enemigo.",
    benefit:
      "Cuando inflige daño por ataque furtivo cuerpo a cuerpo, el objetivo queda trastabillado (staggered) durante 1 asalto, salvo que supere una salvación de Fortaleza cuya CD es igual al daño infligido con ese ataque. El efecto no se acumula y no afecta a criaturas inmunes al ataque furtivo.",
    prerequisites: [
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
      { description: "Capacidad de infligir daño por ataque furtivo" },
    ],
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
    id: "cad-legendary-tracker",
    name: "Rastreador Legendario",
    source: "complete-adventurer",
    types: ["general"],
    description: "Ha rastreado tantas huellas que ya casi nunca pierde una pista por completo.",
    benefit:
      "Cuando falla una prueba de Supervivencia para seguir un rastro, no lo pierde de inmediato: puede seguir intentándolo con un penalizador acumulativo de -5 por cada fallo previo, en vez de tener que retroceder para recuperar la pista. Además, puede seguir un rastro a la mitad de su velocidad sin el penalizador habitual a la prueba.",
    prerequisites: [
      { description: "Rastrear", check: hasFeat("track") },
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
      "Como acción gratuita, puede realizar una prueba de Avistar y una de Escuchar cada ronda (normalmente, usar Avistar o Escuchar de forma activa exige una acción de movimiento). Además, obtiene un bonificador de +2 a las tiradas de iniciativa.",
    prerequisites: [
      { description: "Escuchar 5 rangos", check: (ctx) => (ctx.skillRanks["listen"] ?? 0) >= 5 },
      { description: "Avistar 5 rangos", check: (ctx) => (ctx.skillRanks["spot"] ?? 0) >= 5 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-tactile-trapsmith",
    name: "Trampero Táctil",
    source: "complete-adventurer",
    types: ["general"],
    description: "Sus dedos leen los mecanismos de una trampa mejor de lo que sus ojos podrían nunca verlos.",
    benefit:
      "Usa su modificador de Destreza (en vez de Inteligencia) en las pruebas de Buscar e Inutilizar Mecanismo, y no sufre penalizador en esas pruebas por oscuridad o ceguera.",
    prerequisites: [],
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
      "Puede levantarse de la posición de derribado como una acción libre en lugar de una acción de movimiento, siempre que supere una prueba de Piruetas (CD 15).",
    prerequisites: [{ description: "Rangos en Piruetas" }],
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
      "Puede usar su modificador de Fuerza en lugar del de Carisma en las pruebas de Intimidar, y gana un bonificador de competencia +2 en las pruebas de Reunir Información.",
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
      "En una población o ciudad, puede usar Reunir Información en lugar de Supervivencia para seguir el rastro reciente de una persona concreta, invirtiendo 1 hora por intento.",
    prerequisites: [{ description: "Rangos en Reunir Información" }],
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
      "Al elegir esta dote, designa una comunidad concreta. Dentro de ella obtiene un bonificador de competencia +4 en las pruebas de Saber (Local) y Reunir Información relacionadas con dicha comunidad.",
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
  // DOTES MULTICLASE ASCÉTICAS (monje + otra clase)
  // ---------------------------------------------------------------------
  {
    id: "cad-ascetic-knight",
    name: "Caballero Ascético",
    source: "complete-adventurer",
    types: ["general"],
    description: "El paladín que también se disciplina como monje combina ambas tradiciones marciales sin diluir ninguna.",
    benefit:
      "A efectos de determinar su daño con ataques sin armas y el daño adicional de su castigo divino (smite evil), sus niveles de paladín cuentan como niveles de monje. Puede cambiar libremente de clase entre paladín y monje sin penalización por multiclase.",
    prerequisites: [
      { description: "Impacto sin Arma Mejorado", check: hasFeat("improved-unarmed-strike") },
      { description: "Capacidad de castigar al malvado" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-ascetic-mage",
    name: "Mago Ascético",
    source: "complete-adventurer",
    types: ["general"],
    description: "El hechicero que también se disciplina como monje aprende a canalizar su fuerza de voluntad arcana en defensa y golpes desarmados.",
    benefit:
      "A efectos de determinar su bonificador a la Clase de Armadura sin armadura, sus niveles de hechicero cuentan como niveles de monje. Además, usa su modificador de Carisma en vez de Sabiduría para ese bonificador. Como acción rápida, puede sacrificar uno de sus espacios de conjuro diarios para obtener un bonificador igual al nivel de ese conjuro a sus tiradas de ataque y daño sin armas durante 1 asalto. Puede cambiar libremente de clase entre hechicero y monje sin penalización por multiclase.",
    prerequisites: [
      { description: "Impacto sin Arma Mejorado", check: hasFeat("improved-unarmed-strike") },
      { description: "Capacidad de lanzar conjuros arcanos espontáneos de nivel 2" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-ascetic-rogue",
    name: "Pícaro Ascético",
    source: "complete-adventurer",
    types: ["general"],
    description: "El pícaro que también se disciplina como monje combina la astucia furtiva con la maestría marcial desarmada.",
    benefit:
      "Un golpe desarmado aturdidor (Golpe Aturdidor) que además inflige daño de ataque furtivo suma +2 a la CD de aturdimiento. Además, a efectos de determinar su daño con ataques sin armas, sus niveles de pícaro cuentan como niveles de monje. Puede cambiar libremente de clase entre pícaro y monje sin penalización por multiclase.",
    prerequisites: [
      { description: "Impacto sin Arma Mejorado", check: hasFeat("improved-unarmed-strike") },
      { description: "Capacidad de infligir daño por ataque furtivo" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-ascetic-hunter",
    name: "Cazador Ascético",
    source: "complete-adventurer",
    types: ["general"],
    description: "El explorador que también se disciplina como monje funde el rastreo y la caza con la maestría marcial desarmada.",
    benefit:
      "Al aturdir con un golpe desarmado (Golpe Aturdidor) a un enemigo predilecto, suma la mitad de su bonificador de enemigo predilecto a la CD de aturdimiento. Además, a efectos de determinar su daño con ataques sin armas, sus niveles de explorador cuentan como niveles de monje. Puede cambiar libremente de clase entre explorador y monje sin penalización por multiclase.",
    prerequisites: [
      { description: "Impacto sin Arma Mejorado", check: hasFeat("improved-unarmed-strike") },
      { description: "Enemigo predilecto" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-ascetic-performer",
    name: "Intérprete Ascético",
    source: "complete-adventurer",
    types: ["especial"],
    description: "El bardo que también se disciplina como monje une la música y el combate desarmado en una sola tradición.",
    benefit:
      "A efectos de determinar su nivel de lanzador de bardo, sus usos diarios de música de bardo, la evasión (pero no la evasión mejorada), Inspirar Valor, Sugestión, Lengua del Sol y la Luna, y su daño con ataques sin armas, sus niveles de bardo y de monje se suman entre sí. Puede cambiar libremente de clase entre bardo y monje sin penalización por multiclase.",
    prerequisites: [
      { description: "Impacto sin Arma Mejorado", check: hasFeat("improved-unarmed-strike") },
      { description: "Capacidad de música de bardo" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // DOTES MULTICLASE DEVOTAS (paladín + otra clase)
  // ---------------------------------------------------------------------
  {
    id: "cad-devoted-inquisitor",
    name: "Inquisidor Devoto (Complete Adventurer)",
    source: "complete-adventurer",
    types: ["general"],
    description: "El paladín que también se disciplina como pícaro combina el castigo divino con el golpe certero de la traición.",
    benefit:
      "Cuando inflige daño por ataque furtivo y castigo divino con el mismo golpe, el objetivo debe superar una salvación de Voluntad (CD 10 + la mitad del nivel de personaje + su modificador de Carisma) o quedar aturdido 1 asalto. Además, puede cambiar libremente de clase entre paladín y pícaro sin penalización por multiclase.",
    prerequisites: [
      { description: "Capacidad de castigar al malvado" },
      { description: "Capacidad de infligir daño por ataque furtivo" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-devoted-performer",
    name: "Intérprete Devoto",
    source: "complete-adventurer",
    types: ["general"],
    description: "El paladín que también es bardo pone su música al servicio de la fe.",
    benefit:
      "A efectos de determinar el daño adicional de su castigo divino y sus usos diarios de música de bardo, sus niveles de paladín y de bardo se suman entre sí (sin superar el máximo normal de cada capacidad). Puede cambiar libremente de clase entre paladín y bardo sin penalización por multiclase, incluso ganando niveles de bardo sin importar que deje de ser legal.",
    prerequisites: [
      { description: "Capacidad de castigar al malvado" },
      { description: "Capacidad de música de bardo" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-devoted-tracker",
    name: "Rastreador Devoto",
    source: "complete-adventurer",
    types: ["general"],
    description: "El paladín que también se forma como explorador pone su montura especial y su empatía salvaje al servicio de una causa mayor.",
    benefit:
      "A efectos de determinar el daño adicional de su castigo divino y su bonificador de empatía salvaje, sus niveles de paladín y de explorador se suman entre sí (esta dote no otorga usos diarios adicionales de castigo divino). Además, si tiene tanto montura especial como compañero animal, puede designar su montura especial como ambas cosas a la vez, combinando todos los beneficios de las dos capacidades. Puede cambiar libremente de clase entre paladín y explorador sin penalización por multiclase.",
    prerequisites: [
      { description: "Rastrear", check: hasFeat("track") },
      { description: "Capacidad de castigar al malvado" },
      { description: "Empatía salvaje" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // GENERALES ADICIONALES
  // ---------------------------------------------------------------------
  {
    id: "cad-deft-opportunist",
    name: "Oportunista Diestro",
    source: "complete-adventurer",
    types: ["general"],
    description: "El personaje aprovecha con especial destreza cualquier resquicio que le brinde un enemigo.",
    benefit: "+4 de bonificador a las tiradas de ataque de oportunidad.",
    prerequisites: [
      { description: "Destreza 15", check: (ctx) => ctx.abilityScores.dex >= 15 },
      { description: "Reflejos de Combate", check: hasFeat("combat-reflexes") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-deft-strike",
    name: "Golpe Hábil",
    source: "complete-adventurer",
    types: ["general"],
    description: "Un ojo entrenado para detectar el hueco exacto en la guardia de un rival antes de golpear.",
    benefit:
      "Como acción estándar, puede realizar una prueba de Avistar (CD = Clase de Armadura del objetivo) para hallar un punto débil en su guardia. Si tiene éxito, su siguiente ataque contra ese enemigo (a más tardar en su siguiente turno) ignora su bonificador de armadura y de armadura natural a la CA (los demás bonificadores a la CA siguen aplicando). Con un arma a distancia, el objetivo debe estar a 9 m o menos.",
    prerequisites: [
      { description: "Inteligencia 13", check: (ctx) => ctx.abilityScores.int >= 13 },
      { description: "Pericia en Combate", check: hasFeat("combat-expertise") },
      { description: "Avistar 10 rangos", check: (ctx) => (ctx.skillRanks["spot"] ?? 0) >= 10 },
      { description: "Capacidad de infligir daño por ataque furtivo" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-improved-diversion",
    name: "Distracción Mejorada",
    source: "complete-adventurer",
    types: ["general"],
    description: "El personaje domina el arte de desviar la atención ajena en el momento justo para desaparecer.",
    benefit:
      "Cuando usa Engañar para crear una distracción y esconderse, puede hacerlo como acción de movimiento en vez de acción estándar, y obtiene +4 de bonificador de competencia a esa prueba de Engañar.",
    prerequisites: [{ description: "Engañar 4 rangos", check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 4 }],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cad-savage-grapple",
    name: "Presa Salvaje",
    source: "complete-adventurer",
    types: ["especial"],
    description: "El cambiante de forma convierte cada presa en una oportunidad para golpear los puntos débiles de su presa.",
    benefit:
      "Mientras se encuentre bajo los efectos de forma salvaje y ya esté agarrando a un enemigo, puede sumar su daño adicional por ataque furtivo a cualquier prueba de daño por presa que supere con éxito contra ese enemigo.",
    prerequisites: [
      { description: "Capacidad de adoptar forma salvaje" },
      { description: "Capacidad de infligir daño por ataque furtivo" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-extra-music",
    name: "Música Adicional",
    source: "complete-adventurer",
    types: ["general"],
    description: "El bardo encuentra reservas de inspiración más allá de lo habitual.",
    benefit: "Obtiene 4 usos adicionales al día de música de bardo.",
    prerequisites: [{ description: "Capacidad de música de bardo" }],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cad-obscure-lore",
    name: "Conocimiento Oscuro",
    source: "complete-adventurer",
    types: ["general"],
    description: "El personaje atesora fragmentos de conocimiento que la mayoría considera olvidados o irrelevantes.",
    benefit: "+4 de bonificador de perspicacia a las pruebas de Conocimiento Bárdico o de capacidades de saber similares.",
    prerequisites: [{ description: "Capacidad de Conocimiento Bárdico o similar" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cad-leap-attack",
    name: "Ataque en Salto",
    source: "complete-adventurer",
    types: ["general"],
    description: "El personaje convierte un salto en el preludio de un golpe devastador.",
    benefit:
      "Si salta 3 metros (10 pies) o más en horizontal y termina en una casilla desde la que amenaza al objetivo de una carga, duplica el bonificador de daño de Ataque Poderoso en ese golpe (lo triplica si empuña el arma a dos manos). Sigue las reglas normales de Saltar y de carga; ignora el terreno difícil en las casillas que salta.",
    prerequisites: [
      { description: "Saltar 8 rangos", check: (ctx) => (ctx.skillRanks["jump"] ?? 0) >= 8 },
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
];

export const CAD_FEAT_IDS = CAD_FEATS.map((f) => f.id);
