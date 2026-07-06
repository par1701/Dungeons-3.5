import type { Feat, FeatPrereqContext } from "../../types";

// Dotes psiónicas de Complete Psionic / Expanded Psionics Handbook (2004-2006).
//
// Convenciones (iguales a src/data/srd/feats.ts y src/data/complete-arcane/feats.ts):
// - `id` en kebab-case basado en el nombre en inglés del libro, con prefijo
//   `cps-` para distinguirlas de dotes homónimas de otros libros.
// - `prerequisites[].check` solo se define para prerrequisitos mecánicos
//   simples y verificables (puntuación de característica, BAB, dote previa,
//   nivel de manifestador). El nivel de manifestador se aproxima con
//   `ctx.casterLevel`, ya que el modelo de personaje no distingue nivel de
//   lanzador de nivel de manifestador. Los prerrequisitos narrativos (ej.
//   "capacidad de manifestar poderes psiónicos") quedan solo como texto.
// - Las dotes de "metapsiónica" (equivalentes psiónicos de la metamagia)
//   usan `types: ["metamagia"]`, ya que `FeatType` no distingue ambos
//   sistemas y comparten la misma función mecánica (modifican un poder/
//   conjuro conocido a cambio de un coste mayor).
//
// Solo se incluyen dotes de las que hay confianza razonable de que
// pertenecen a este libro. No se duplican dotes ya presentes en el SRD.

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

export const CPS_FEATS: Feat[] = [
  // ---------------------------------------------------------------------
  // GENERALES PSIÓNICAS
  // ---------------------------------------------------------------------
  {
    id: "cps-wild-talent",
    name: "Talento Salvaje",
    source: "complete-psionic",
    types: ["general"],
    description: "Una chispa de poder psiónico late en alguien sin entrenamiento formal.",
    benefit:
      "Aunque no sea manifestador, obtiene una reserva de 2 puntos de poder que puede gastar en cualquier dote que requiera gastar puntos de poder, y se le considera manifestador de nivel 1 a efectos de activar objetos psiónicos.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-psionic-talent",
    name: "Talento Psiónico",
    source: "complete-psionic",
    types: ["general"],
    description: "Una reserva mental algo mayor de la que extraer energía psiónica.",
    benefit: "Gana 2 puntos de poder adicionales que se suman a su reserva.",
    prerequisites: [
      {
        description: "Talento Salvaje o capacidad de manifestar poderes psiónicos",
        check: (ctx) => ctx.featIds.has("cps-wild-talent") || ctx.casterLevel >= 1,
      },
    ],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cps-psionic-body",
    name: "Cuerpo Psiónico",
    source: "complete-psionic",
    types: ["general"],
    description: "El cuerpo mismo del personaje se convierte en un depósito adicional de energía psiónica.",
    benefit:
      "Gana puntos de poder adicionales según su nivel de personaje, que se suman a su reserva incluso si no es manifestador: +2 en los niveles 1º a 7º, +3 en los niveles 8º a 14º y +4 a partir del nivel 15º.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-psicrystal-affinity",
    name: "Afinidad con Psicristal",
    source: "complete-psionic",
    types: ["general"],
    description: "El manifestador vincula parte de su mente a un pequeño cristal animado.",
    benefit:
      "Obtiene un psicristal: un objeto animado con una personalidad propia que actúa como depósito de un poder conocido y otorga un beneficio menor según su personalidad, de forma análoga a un familiar arcano.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos de nivel 1", check: (ctx) => ctx.casterLevel >= 1 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-improved-psicrystal",
    name: "Psicristal Mejorado",
    source: "complete-psionic",
    types: ["general"],
    description: "El vínculo entre el manifestador y su psicristal se profundiza.",
    benefit: "Su psicristal obtiene sus habilidades especiales como si el nivel de manifestador del personaje fuera 2 más alto.",
    prerequisites: [{ description: "Afinidad con Psicristal", check: hasFeat("cps-psicrystal-affinity") }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-psionic-meditation",
    name: "Meditación Psiónica",
    source: "complete-psionic",
    types: ["general"],
    description: "Un manifestador aprende a recuperar su energía mental con solo un breve trance.",
    benefit:
      "Puede recuperar puntos de poder mediante 1 hora de meditación ininterrumpida en lugar de necesitar un descanso completo, hasta un máximo de la mitad de sus puntos de poder diarios; solo puede beneficiarse de esto una vez por día.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos", check: (ctx) => ctx.casterLevel >= 1 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-speed-of-thought",
    name: "Velocidad de Pensamiento",
    source: "complete-psionic",
    types: ["general"],
    description: "La mente del personaje acelera los reflejos de todo su cuerpo.",
    benefit: "+3 metros (10 pies) de bonificador de mejora a su velocidad base.",
    prerequisites: [{ description: "Sabiduría 13", check: (ctx) => ctx.abilityScores.wis >= 13 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-mental-leap",
    name: "Salto Mental",
    source: "complete-psionic",
    types: ["general"],
    description: "El manifestador aprende a impulsar su cuerpo mediante pura disciplina mental.",
    benefit: "Puede usar su bonificador de Autohipnosis en lugar de su bonificador de Saltar en las pruebas de Saltar.",
    prerequisites: [
      { description: "1 rango en Autohipnosis", check: (ctx) => (ctx.skillRanks["autohypnosis"] ?? 0) >= 1 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-up-the-walls",
    name: "Trepar Muros",
    source: "complete-psionic",
    types: ["general"],
    description: "El manifestador aprovecha el impulso y la disciplina mental para desafiar la gravedad brevemente.",
    benefit:
      "Puede correr durante un instante por una superficie vertical o por una superficie inestable (como agua), moviéndose hasta la mitad de su velocidad antes de caer o hundirse, siempre que tenga espacio suficiente para hacerlo.",
    prerequisites: [
      { description: "Destreza 13", check: (ctx) => ctx.abilityScores.dex >= 13 },
      { description: "5 rangos en Equilibrio", check: (ctx) => (ctx.skillRanks["balance"] ?? 0) >= 5 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-overchannel",
    name: "Sobrecarga",
    source: "complete-psionic",
    types: ["general"],
    description: "El manifestador fuerza su mente más allá de sus límites naturales, a riesgo de dañarse a sí mismo.",
    benefit:
      "Puede manifestar un poder como si su nivel de manifestador fuera hasta 5 puntos más alto de lo que realmente es; por cada punto de incremento sufre 2 puntos de daño no letal por cada nivel del poder manifestado.",
    prerequisites: [
      { description: "Constitución 13", check: (ctx) => ctx.abilityScores.con >= 13 },
      { description: "Capacidad de manifestar poderes psiónicos de nivel 1", check: (ctx) => ctx.casterLevel >= 1 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-power-penetration",
    name: "Penetrar Poder",
    source: "complete-psionic",
    types: ["general"],
    description: "El manifestador aprende a forzar sus poderes a través de defensas psiónicas ajenas.",
    benefit: "+2 a las pruebas de nivel de manifestador para superar la resistencia a poderes (RP) de una criatura.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-greater-power-penetration",
    name: "Penetrar Poder Mayor",
    source: "complete-psionic",
    types: ["general"],
    description: "Una comprensión superior de cómo perforar la resistencia a poderes.",
    benefit: "+2 adicionales (total +4 junto con Penetrar Poder) a las pruebas de nivel de manifestador para superar la RP.",
    prerequisites: [{ description: "Penetrar Poder", check: hasFeat("cps-power-penetration") }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-expanded-knowledge",
    name: "Conocimiento Ampliado",
    source: "complete-psionic",
    types: ["general"],
    description: "El manifestador rompe las fronteras habituales entre disciplinas psiónicas.",
    benefit:
      "Elige un poder psiónico de cualquier lista de poderes (no solo la de su clase) de nivel igual o inferior al poder de mayor nivel que pueda manifestar. Ese poder se añade a su lista de poderes conocidos.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos de nivel 3", check: (ctx) => ctx.casterLevel >= 3 },
    ],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "cps-mind-over-body",
    name: "Mente Sobre Cuerpo",
    source: "complete-psionic",
    types: ["general"],
    description: "La disciplina mental del manifestador le permite acelerar la recuperación de su propio cuerpo.",
    benefit:
      "Como acción estándar, puede gastar puntos de poder para curarse a sí mismo 1 punto de golpe por cada punto de poder gastado, hasta un máximo diario igual a su nivel de manifestador.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos de nivel 1", check: (ctx) => ctx.casterLevel >= 1 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // COMBATE PSIÓNICO
  // ---------------------------------------------------------------------
  {
    id: "cps-combat-manifestation",
    name: "Manifestación en Combate",
    source: "complete-psionic",
    types: ["combate"],
    description: "El manifestador aprende a mantener la concentración incluso en pleno combate.",
    benefit:
      "+4 de bonificador de competencia en las pruebas de Concentración realizadas para manifestar un poder defensivamente o mientras está agarrado.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos", check: (ctx) => ctx.casterLevel >= 1 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cps-psionic-weapon",
    name: "Arma Psiónica",
    source: "complete-psionic",
    types: ["combate"],
    description: "El combatiente canaliza energía psiónica directamente a través de su arma.",
    benefit:
      "Como acción rápida, puede gastar 1 punto de poder para que su próximo ataque cuerpo a cuerpo con éxito antes de que acabe su turno inflija 2d6 puntos de daño adicionales.",
    prerequisites: [{ description: "Sabiduría 13", check: (ctx) => ctx.abilityScores.wis >= 13 }],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cps-greater-psionic-weapon",
    name: "Arma Psiónica Mayor",
    source: "complete-psionic",
    types: ["combate"],
    description: "El dominio de Arma Psiónica alcanza un nivel devastador.",
    benefit: "El daño adicional otorgado por Arma Psiónica aumenta de 2d6 a 4d6.",
    prerequisites: [
      { description: "Arma Psiónica", check: hasFeat("cps-psionic-weapon") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cps-psionic-shot",
    name: "Disparo Psiónico",
    source: "complete-psionic",
    types: ["combate"],
    description: "El tirador canaliza energía psiónica a través de sus proyectiles.",
    benefit:
      "Como acción rápida, puede gastar 1 punto de poder para que su próximo ataque a distancia con éxito antes de que acabe su turno inflija 2d6 puntos de daño adicionales.",
    prerequisites: [
      { description: "Sabiduría 13", check: (ctx) => ctx.abilityScores.wis >= 13 },
      { description: "Disparo a Bocajarro", check: hasFeat("point-blank-shot") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cps-greater-psionic-shot",
    name: "Disparo Psiónico Mayor",
    source: "complete-psionic",
    types: ["combate"],
    description: "El dominio de Disparo Psiónico alcanza un nivel devastador.",
    benefit: "El daño adicional otorgado por Disparo Psiónico aumenta de 2d6 a 4d6.",
    prerequisites: [
      { description: "Disparo Psiónico", check: hasFeat("cps-psionic-shot") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cps-psionic-charge",
    name: "Carga Psiónica",
    source: "complete-psionic",
    types: ["combate"],
    description: "El manifestador aprende a combinar el ímpetu de una carga con su poder mental.",
    benefit:
      "Puede manifestar un poder con tiempo de manifestación de una acción estándar como parte de una carga, inmediatamente antes de realizar el ataque cuerpo a cuerpo de la carga.",
    prerequisites: [{ description: "Bonificador base de ataque +1", check: (ctx) => ctx.babTotal >= 1 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-deep-impact",
    name: "Impacto Profundo",
    source: "complete-psionic",
    types: ["combate"],
    description: "El combatiente sabe dirigir la energía de Arma Psiónica hacia los puntos más vulnerables.",
    benefit:
      "Cuando confirma un golpe crítico usando el daño adicional de Arma Psiónica o Arma Psiónica Mayor, el objetivo debe superar una salvación de Fortaleza (CD 10 + daño psiónico adicional infligido) o queda aturdido durante 1 asalto.",
    prerequisites: [
      { description: "Arma Psiónica", check: hasFeat("cps-psionic-weapon") },
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "cps-metaphysical-weapon",
    name: "Arma Metafísica",
    source: "complete-psionic",
    types: ["combate"],
    description: "El manifestador imbuye temporalmente su arma con una propiedad especial psiónica.",
    benefit:
      "Como acción rápida, puede gastar 1 punto de poder para otorgar a un arma que empuñe una propiedad especial menor (por ejemplo, flamígera) durante 1 asalto.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos", check: (ctx) => ctx.casterLevel >= 1 },
      { description: "Bonificador base de ataque +1", check: (ctx) => ctx.babTotal >= 1 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-psionic-stunning-fist",
    name: "Golpe Aturdidor Psiónico",
    source: "complete-psionic",
    types: ["combate"],
    description: "El combatiente canaliza su disciplina mental en un golpe capaz de anular a su rival.",
    benefit:
      "Como acción rápida, puede gastar 2 puntos de poder; si su siguiente ataque cuerpo a cuerpo de ese turno impacta, el objetivo debe superar una salvación de Fortaleza (CD 10 + la mitad de su nivel de manifestador + su modificador de Sabiduría) o queda aturdido durante 1 asalto.",
    prerequisites: [
      { description: "Sabiduría 13", check: (ctx) => ctx.abilityScores.wis >= 13 },
      { description: "Capacidad de manifestar poderes psiónicos de nivel 3", check: (ctx) => ctx.casterLevel >= 3 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-devastating-psionic-strike",
    name: "Ataque Devastador Psiónico",
    source: "complete-psionic",
    types: ["combate"],
    description: "El combatiente aprende a convertir un golpe crítico en una descarga mental abrumadora.",
    benefit:
      "Al confirmar un golpe crítico con un ataque cuerpo a cuerpo, puede gastar puntos de poder (hasta un máximo igual a su modificador de Sabiduría) para infligir 1d6 puntos de daño adicional por cada punto de poder gastado.",
    prerequisites: [
      { description: "Golpe Aturdidor Psiónico", check: hasFeat("cps-psionic-stunning-fist") },
      { description: "Bonificador base de ataque +11", check: (ctx) => ctx.babTotal >= 11 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // METAPSIÓNICA
  // ---------------------------------------------------------------------
  {
    id: "cps-empower-power",
    name: "Empoderar Poder",
    source: "complete-psionic",
    types: ["metamagia"],
    description: "El manifestador aumenta la potencia numérica de sus poderes.",
    benefit:
      "Todas las variables numéricas de un poder (daño, curación, etc.) aumentan un 50%. El coste en puntos de poder del poder aumenta en 2.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-enlarge-power",
    name: "Agrandar Poder",
    source: "complete-psionic",
    types: ["metamagia"],
    description: "El manifestador extiende el alcance de su poder mental.",
    benefit:
      "Duplica el alcance del poder (los poderes de alcance Personal o Toque no se ven afectados). El coste en puntos de poder aumenta en 1.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-extend-power",
    name: "Fortalecer Poder",
    source: "complete-psionic",
    types: ["metamagia"],
    description: "El manifestador prolonga los efectos de su poder mental.",
    benefit: "Duplica la duración del poder. El coste en puntos de poder aumenta en 1.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-heighten-power",
    name: "Ampliar Poder",
    source: "complete-psionic",
    types: ["metamagia"],
    description: "El manifestador hace que su poder se comporte como uno de nivel superior.",
    benefit:
      "Manifiesta el poder como si fuera de un nivel superior (hasta el nivel más alto que pueda manifestar), aumentando su CD de salvación y cualquier otro efecto dependiente del nivel; el coste en puntos de poder pasa a ser el correspondiente a ese nivel superior.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-maximize-power",
    name: "Maximizar Poder",
    source: "complete-psionic",
    types: ["metamagia"],
    description: "El manifestador exprime el máximo efecto posible de su poder.",
    benefit:
      "Todas las variables numéricas del poder alcanzan su valor máximo posible. El coste en puntos de poder aumenta en 3.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-quicken-power",
    name: "Poder Acelerado",
    source: "complete-psionic",
    types: ["metamagia"],
    description: "El manifestador recurre a su poder mental en un instante, en pleno turno de acción.",
    benefit:
      "Manifestar el poder pasa a ser una acción rápida. Solo puede manifestar un poder acelerado por turno. El coste en puntos de poder aumenta en 4.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-widen-power",
    name: "Poder Expandido",
    source: "complete-psionic",
    types: ["metamagia"],
    description: "El manifestador hace que el área de su poder cubra un espacio mucho mayor.",
    benefit:
      "Duplica el tamaño de cualquier efecto de área del poder (radio, línea, cono, etc.). El coste en puntos de poder aumenta en 2.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-silent-power",
    name: "Poder Silencioso",
    source: "complete-psionic",
    types: ["metamagia"],
    description: "El manifestador aprende a ocultar la manifestación de su poder a los sentidos ajenos.",
    benefit:
      "El poder se manifiesta sin su despliegue auditivo (Au) habitual, si lo tuviera. El coste en puntos de poder aumenta en 1.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-twin-power",
    name: "Poder Gemelo",
    source: "complete-psionic",
    types: ["metamagia"],
    description: "El manifestador duplica un mismo poder en un único instante mental.",
    benefit:
      "Manifiesta el mismo poder dos veces con una sola acción, con los mismos objetivos o ambos disponibles por separado según el poder lo permita. El coste en puntos de poder aumenta en una cantidad igual al coste normal del poder más 4.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos de nivel 6", check: (ctx) => ctx.casterLevel >= 6 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-chain-power",
    name: "Poder Encadenado",
    source: "complete-psionic",
    types: ["metamagia"],
    description: "El manifestador hace que su poder salte de un objetivo a otro cercano.",
    benefit:
      "Un poder de objetivo único, al impactar en su objetivo principal, salta a un objetivo secundario situado a 3 metros (10 pies) o menos, produciendo la mitad de efecto sobre él. El coste en puntos de poder aumenta en 5.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos de nivel 6", check: (ctx) => ctx.casterLevel >= 6 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // CREACIÓN DE OBJETOS PSIÓNICOS
  // ---------------------------------------------------------------------
  {
    id: "cps-craft-psionic-arms-and-armor",
    name: "Elaborar Armas y Armaduras Psiónicas",
    source: "complete-psionic",
    types: ["creacion_objetos"],
    description: "El manifestador aprende a imbuir armas, armaduras y escudos con poder psiónico permanente.",
    benefit:
      "Puede crear armas, armaduras y escudos psiónicos, gastando en materiales la mitad de su precio base en el mercado.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos de nivel 5", check: (ctx) => ctx.casterLevel >= 5 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-craft-universal-item-minor",
    name: "Elaborar Objeto Psiónico Menor",
    source: "complete-psionic",
    types: ["creacion_objetos"],
    description: "El manifestador aprende a imbuir objetos cotidianos con efectos psiónicos permanentes modestos.",
    benefit:
      "Puede crear objetos psiónicos universales (el equivalente psiónico a los objetos maravillosos) cuyo precio base en el mercado no supere 2.000 po, gastando en materiales la mitad de dicho precio.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos de nivel 3", check: (ctx) => ctx.casterLevel >= 3 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-craft-universal-item-major",
    name: "Elaborar Objeto Psiónico Mayor",
    source: "complete-psionic",
    types: ["creacion_objetos"],
    description: "El manifestador domina la creación de los objetos psiónicos universales más poderosos.",
    benefit:
      "Puede crear cualquier objeto psiónico universal sin límite de precio, gastando en materiales la mitad de su precio base en el mercado.",
    prerequisites: [
      { description: "Elaborar Objeto Psiónico Menor", check: hasFeat("cps-craft-universal-item-minor") },
      { description: "Capacidad de manifestar poderes psiónicos de nivel 9", check: (ctx) => ctx.casterLevel >= 9 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-craft-dorje",
    name: "Elaborar Vara Psiónica",
    source: "complete-psionic",
    types: ["creacion_objetos"],
    description: "El manifestador aprende a encerrar un poder en un dorje, el equivalente psiónico a una varita.",
    benefit:
      "Puede crear un dorje de cualquier poder de nivel 4 o inferior que conozca, gastando en materiales la mitad de su precio base en el mercado.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos de nivel 3", check: (ctx) => ctx.casterLevel >= 3 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-craft-psicrown",
    name: "Elaborar Bastón Psiónico",
    source: "complete-psionic",
    types: ["creacion_objetos"],
    description: "El manifestador aprende a canalizar varios de sus poderes en una corona psiónica.",
    benefit:
      "Puede crear cualquier corona psiónica (psicrown), el equivalente psiónico a un báculo mágico, gastando en materiales la mitad de su precio base en el mercado; debe conocer todos los poderes almacenados en ella.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos de nivel 12", check: (ctx) => ctx.casterLevel >= 12 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-craft-cognizance-crystal",
    name: "Elaborar Cristal de Conciencia",
    source: "complete-psionic",
    types: ["creacion_objetos"],
    description: "El manifestador aprende a almacenar su propia energía mental en un cristal para más tarde.",
    benefit:
      "Puede crear un cristal de conciencia, un objeto que almacena puntos de poder para que su portador los use posteriormente, gastando en materiales la mitad de su precio base en el mercado.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos de nivel 1", check: (ctx) => ctx.casterLevel >= 1 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cps-craft-psionic-tattoo",
    name: "Tatuaje Psiónico",
    source: "complete-psionic",
    types: ["creacion_objetos"],
    description: "El manifestador aprende a grabar un efecto psiónico permanente sobre la piel.",
    benefit:
      "Puede crear un tatuaje psiónico que produce el efecto de un poder de nivel 3 o inferior una vez al día, gastando en materiales la mitad de su precio base en el mercado.",
    prerequisites: [
      { description: "Capacidad de manifestar poderes psiónicos de nivel 3", check: (ctx) => ctx.casterLevel >= 3 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
];

export const CPS_FEAT_IDS = CPS_FEATS.map((f) => f.id);
