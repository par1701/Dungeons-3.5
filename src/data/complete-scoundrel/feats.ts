import type { Feat, FeatPrereqContext } from "../../types";

// Dotes de Complete Scoundrel (2007).
//
// Convenciones (iguales a src/data/srd/feats.ts):
// - `id` en kebab-case con prefijo `cs-`, basado en el nombre en inglés.
// - `prerequisites[].check` solo se define para prerrequisitos mecánicos
//   simples y verificables (puntuación de característica, BAB, dote previa,
//   nivel de personaje, rangos de habilidad). Los prerrequisitos narrativos
//   (capacidad de infligir ataque furtivo, alineamiento, ritual concreto)
//   quedan solo como texto descriptivo, ya que el motor de reglas no rastrea
//   todavía qué clases otorgan ataque furtivo de forma genérica.
// - No se duplica ninguna dote ya presente en el SRD ni en otros libros ya
//   cargados (Complete Warrior/Arcane/Divine/Adventurer/Champion).
// - Complete Scoundrel dedica buena parte de su capítulo de dotes a las
//   llamadas "dotes de suerte" (Luck feats) y a dotes de pícaros, timadores
//   y villanos carismáticos ("cads"). Se han incluido aquí solo las dotes de
//   las que hay confianza razonable en cuanto a nombre, mecánica aproximada
//   y pertenencia a este libro concreto (varias de ellas ganaron cierta fama
//   en la comunidad por la combinación Craven + Dastard). Se ha preferido
//   omitir el resto del capítulo (numerosas dotes de suerte adicionales,
//   trucos de habilidad —deliberadamente excluidos por instrucción, ya que
//   son una categoría de regla distinta— y varias dotes menores de trasfondo)
//   antes que arriesgarse a inventar nombres o efectos que no se recuerdan
//   con precisión.

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

export const CS_FEATS: Feat[] = [
  // ---------------------------------------------------------------------
  // PÍCAROS, TIMADORES Y "CADS" (villanos encantadores)
  // ---------------------------------------------------------------------
  {
    id: "cs-craven",
    name: "Cobarde (Craven)",
    source: "complete-scoundrel",
    types: ["general"],
    description:
      "Un pícaro que ha aprendido a canalizar su propio miedo latente en una ferocidad calculada y letal a la hora de golpear por sorpresa.",
    benefit:
      "El daño adicional por ataque furtivo del personaje aumenta en una cantidad igual a su nivel de personaje. A cambio, queda acobardado (-2 a las tiradas de ataque, de daño, de salvación y a las pruebas de habilidad y característica) mientras combate contra un enemigo al que no pueda intimidar o que le supere claramente en reputación temible.",
    prerequisites: [{ description: "Capacidad de infligir daño de ataque furtivo" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cs-dastard",
    name: "Infame (Dastard)",
    source: "complete-scoundrel",
    types: ["general"],
    description: "El personaje ha refinado el arte de la finta hasta convertirla en un recurso de combate instantáneo.",
    benefit:
      "Puede intentar una finta en combate como acción de movimiento en lugar de acción estándar. Además, cuando finta con éxito a un enemigo, este también se considera desprevenido frente a los ataques de los aliados del personaje hasta el comienzo del siguiente turno de dicho enemigo.",
    prerequisites: [
      { description: "Engañar: 4 rangos", check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 4 },
      { description: "Capacidad de infligir daño de ataque furtivo" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cs-daring-outlaw",
    name: "Forajido Audaz",
    source: "complete-scoundrel",
    types: ["general"],
    description: "El personaje se ha criado entre proscritos y ha aprendido a manejar el arsenal típico del bajo mundo.",
    benefit:
      "Obtiene competencia con la ballesta de mano, el estoque, la espada corta, el arco corto, la porra y el látigo. Además, si posee la capacidad de infligir daño de ataque furtivo, puede aplicarlo con cualquiera de estas armas incluso en circunstancias en las que normalmente no podría (como un ataque a distancia contra un enemigo que no esté flanqueado).",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cs-combat-panache",
    name: "Garbo en Combate",
    source: "complete-scoundrel",
    types: ["combate"],
    description:
      "El espadachín carismático convierte su encanto personal en una ventaja táctica real, esquivando golpes gracias pura y llanamente a su estilo.",
    benefit:
      "Mientras se beneficie de un rasgo que le permita sumar su modificador de Carisma a la Clase de Armadura (como la Gracia del espadachín), puede gastar uno de los usos de ese rasgo como acción libre para realizar un ataque cuerpo a cuerpo adicional este turno, con el mismo bonificador de ataque que su ataque de mayor bonificador.",
    prerequisites: [
      { description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 },
      { description: "Capacidad de sumar el modificador de Carisma a la Clase de Armadura (p. ej. Gracia del espadachín)" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cs-mercantile-background",
    name: "Trasfondo Mercantil",
    source: "complete-scoundrel",
    types: ["general"],
    description: "El personaje se crió en una familia de comerciantes, contrabandistas o mercaderes itinerantes.",
    benefit:
      "Obtiene +2 de bonificador de competencia a las pruebas de Tasación y Oficio (mercader o similar). Además, al crear el personaje, su oro inicial aumenta un 50% sobre lo habitual para su clase.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cs-bantering-defense",
    name: "Defensa Zumbona",
    source: "complete-scoundrel",
    types: ["combate"],
    description: "Mientras charla, se burla y desconcierta a su rival, el personaje también sortea sus golpes con más facilidad.",
    benefit:
      "Cuando intenta una prueba de Engañar para fintar a un enemigo en combate, gana un bonificador de esquiva a la Clase de Armadura frente a ese enemigo igual a su modificador de Carisma (mínimo +1) hasta el comienzo de su siguiente turno, tenga éxito o no en la finta.",
    prerequisites: [{ description: "Engañar: 4 rangos", check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 4 }],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // INICIATIVA, REACCIÓN Y TÁCTICA EN COMBATE
  // ---------------------------------------------------------------------
  {
    id: "cs-blooded",
    name: "Curtido en Sangre",
    source: "complete-scoundrel",
    types: ["general"],
    description: "El personaje ha sobrevivido a suficientes emboscadas y peleas callejeras como para que sus reflejos ya no le fallen ante la violencia repentina.",
    benefit: "+2 de bonificador a las tiradas de Iniciativa y +2 de bonificador de competencia a las pruebas de Intimidar.",
    prerequisites: [{ description: "Haber sobrevivido a un encuentro de combate cercano a la muerte" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cs-in-harms-way",
    name: "En la Línea de Fuego",
    source: "complete-scoundrel",
    types: ["combate"],
    description: "El personaje se interpone entre el peligro y quienes protege sin pensarlo dos veces.",
    benefit:
      "Como acción inmediata, cuando un aliado adyacente a él va a sufrir un ataque cuerpo a cuerpo o a distancia, el personaje puede moverse hasta su velocidad para colocarse entre el atacante y el aliado, convirtiéndose él mismo en el objetivo del ataque en curso.",
    prerequisites: [{ description: "Bonificador base de ataque +3", check: (ctx) => ctx.babTotal >= 3 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cs-gang-up",
    name: "Acoso en Grupo",
    source: "complete-scoundrel",
    types: ["combate"],
    description: "El personaje sabe aprovechar la superioridad numérica incluso cuando la geometría del combate no permite un flanqueo perfecto.",
    benefit:
      "Se considera que el personaje está flanqueando a un enemigo siempre que otros dos aliados (además de él) también amenacen a ese enemigo en cuerpo a cuerpo, aunque él mismo no esté en el lado exactamente opuesto a ninguno de ellos.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cs-confound-the-big-guy",
    name: "Confundir al Grandullón",
    source: "complete-scoundrel",
    types: ["combate"],
    description: "El pícaro pequeño y ágil convierte el tamaño de un rival corpulento en una desventaja para este.",
    benefit:
      "Mientras flanquea junto a un aliado a un enemigo de una categoría de tamaño mayor que la suya (o más), el personaje gana un bonificador de esquiva de +4 a la Clase de Armadura frente a los ataques de dicho enemigo.",
    prerequisites: [{ description: "Amago (Dodge)", check: hasFeat("dodge") }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cs-advantageous-terrain",
    name: "Terreno Ventajoso",
    source: "complete-scoundrel",
    types: ["combate"],
    description: "El personaje aprovecha instintivamente cualquier desnivel, cobertura o posición elevada del campo de batalla.",
    benefit:
      "Cuando ataca cuerpo a cuerpo a un enemigo situado en una posición claramente inferior a la suya (más abajo en una pendiente, escalera o similar), gana +1 de bonificador a las tiradas de ataque, además de cualquier otro bonificador por terreno elevado que ya se aplique.",
    prerequisites: [{ description: "Bonificador base de ataque +1", check: (ctx) => ctx.babTotal >= 1 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cs-battle-jump",
    name: "Salto de Batalla",
    source: "complete-scoundrel",
    types: ["combate"],
    description: "El personaje convierte una caída controlada desde las alturas en el inicio de un ataque devastador.",
    benefit:
      "Al saltar o caer desde al menos 3 metros de altura directamente sobre un enemigo como parte de un movimiento de carga, causa 1d6 puntos de daño adicional con su ataque si impacta, siempre que supere la prueba de Saltar necesaria para controlar la caída.",
    prerequisites: [{ description: "Saltar: 4 rangos", check: (ctx) => (ctx.skillRanks["jump"] ?? 0) >= 4 }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cs-ambush",
    name: "Emboscada",
    source: "complete-scoundrel",
    types: ["combate"],
    description: "El personaje ha perfeccionado el arte de golpear primero y con más fuerza cuando su víctima no lo espera.",
    benefit:
      "Durante el primer asalto de sorpresa de un combate (o cualquier ataque contra un enemigo desprevenido), el daño adicional por ataque furtivo del personaje, si lo posee, aumenta en 1d6 puntos.",
    prerequisites: [{ description: "Capacidad de infligir daño de ataque furtivo" }],
    fighterBonusFeat: false,
    stackable: false,
  },

  // ---------------------------------------------------------------------
  // DOTES DE SUERTE (Luck feats)
  // ---------------------------------------------------------------------
  {
    id: "cs-fortunes-favor",
    name: "Favor de la Fortuna",
    source: "complete-scoundrel",
    types: ["especial"],
    description: "El personaje corteja a la suerte con pequeños rituales personales (tirar una moneda, tocar un amuleto, recitar una superstición) y esta responde.",
    benefit:
      "Al levantarse cada día, el personaje elige un tipo de tirada (ataque, salvación o prueba de habilidad). Una vez ese día, puede aplicar un bonificador de suerte de +2 a una tirada de ese tipo, decidiéndolo después de conocer el resultado del dado pero antes de que se resuelvan sus efectos.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "cs-second-chance",
    name: "Segunda Oportunidad",
    source: "complete-scoundrel",
    types: ["especial"],
    description: "La providencia parece darle al personaje una oportunidad más justo cuando todo parece perdido.",
    benefit:
      "Una vez al día, cuando falla una tirada de salvación, el personaje puede repetirla inmediatamente, conservando el segundo resultado aunque sea peor que el primero.",
    prerequisites: [{ description: "Favor de la Fortuna", check: hasFeat("cs-fortunes-favor") }],
    fighterBonusFeat: false,
    stackable: false,
  },
];

export const CS_FEAT_IDS = CS_FEATS.map((f) => f.id);
