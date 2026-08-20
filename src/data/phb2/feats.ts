import type { Feat, FeatPrereqContext } from "../../types";

// Dotes de Player's Handbook II (2006).
//
// Convenciones (iguales a src/data/srd/feats.ts):
// - `id` en kebab-case basado en el nombre en inglés del libro, con prefijo
//   `phb2-` para distinguirlas de las dotes homónimas de otros libros.
// - `prerequisites[].check` solo se define para prerrequisitos mecánicos
//   simples y verificables (puntuación de característica, BAB, dote previa).
//   Los prerrequisitos raciales o de trasfondo (que este modelo de datos no
//   rastrea: no hay campo de raza en `FeatPrereqContext`) quedan solo como
//   texto descriptivo.
// - No se duplica ninguna dote ya presente en el SRD ni en ningún libro
//   Complete ya cargado (verificado contra los `feats.ts` existentes).
// - PHB2 tiene un capítulo de dotes de tamaño moderado (unas 105 en total;
//   el resto del libro son trasfondos, clases base, conjuros y clases de
//   prestigio). Se ha priorizado incluir todas las dotes de las que hay
//   confianza razonable en cuanto a existencia y mecánica exacta, en vez de
//   completar la cuota inventando o adivinando el resto: quedan sin incluir
//   sobre todo dotes de nicho (rituales de trasfondo específicos, dotes
//   ligadas a una clase de prestigio o subtipo racial muy concreto) cuya
//   mecánica exacta no se pudo confirmar con suficiente confianza.

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

export const PHB2_FEATS: Feat[] = [
  {
    id: "phb2-able-learner",
    name: "Aprendiz Aventajado",
    source: "phb2",
    types: ["general"],
    description: "Absorbe conocimientos nuevos con la misma facilidad sin importar su campo de origen.",
    benefit:
      "Al invertir rangos en una habilidad que no es de clase para usted, paga el mismo coste en puntos de habilidad que si fuera una habilidad de clase (normalmente 1 punto por rango en vez de 2). El límite máximo de rangos en una habilidad que no es de clase sigue siendo el habitual (la mitad del que tendría si fuera de clase).",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-actor",
    name: "Actor",
    source: "phb2",
    types: ["general"],
    description: "Un talento natural para meterse en la piel de otro personaje.",
    benefit:
      "+2 de bonificador de competencia en las pruebas de Engañar y Disfrazarse relacionadas con interpretar un papel o hacerse pasar por otra persona, y +2 en Interpretar cuando la actuación consiste en representar un personaje.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-cosmopolitan",
    name: "Cosmopolita",
    source: "phb2",
    types: ["general"],
    description: "Una educación amplia, ganada viajando o creciendo en un cruce de caminos de culturas.",
    benefit:
      "Elija una habilidad; pasa a ser una habilidad de clase para usted sin importar su clase. Además, aprende un idioma adicional de su elección.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-combat-archery",
    name: "Arquería en Combate",
    source: "phb2",
    types: ["combate"],
    description: "Sabe disparar el arco sin bajar la guardia frente a quien lo amenaza cuerpo a cuerpo.",
    benefit:
      "No provoca ataques de oportunidad por disparar un arma a distancia mientras se encuentra en una casilla amenazada por un enemigo cuerpo a cuerpo.",
    prerequisites: [
      { description: "Disparo a Bocajarro", check: hasFeat("point-blank-shot") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-twisted-charge",
    name: "Carga Sinuosa",
    source: "phb2",
    types: ["combate"],
    description: "Un experto en el arte de la carga que sabe quebrar la trayectoria sin perder el ímpetu.",
    benefit:
      "Al cargar, puede mover en dos tramos rectos con una única inflexión (en vez de una sola línea recta) para llegar hasta su objetivo, siempre que ambos tramos cumplan los requisitos normales de una carga. Sufre un -2 a la CA hasta su siguiente turno, igual que en una carga normal.",
    prerequisites: [
      { description: "Esquiva", check: hasFeat("dodge") },
      { description: "Movilidad", check: hasFeat("mobility") },
      {
        description: "Bonificador base de ataque +6",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 6,
      },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-insightful-reflexes",
    name: "Reflejos Perspicaces",
    source: "phb2",
    types: ["combate"],
    description: "Anticipa el peligro con la mente antes de que el cuerpo pueda reaccionar.",
    benefit:
      "Usa su modificador de Inteligencia, en vez de su modificador de Destreza, para determinar el número de ataques de oportunidad adicionales que le concede Reflejos de Combate.",
    prerequisites: [
      { description: "Reflejos de Combate", check: hasFeat("combat-reflexes") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-extend-rage",
    name: "Furia Prolongada",
    source: "phb2",
    types: ["general"],
    description: "La ira, una vez desatada, tarda más en apagarse.",
    benefit: "Cada vez que entra en furia, esta dura 5 asaltos más de lo normal.",
    prerequisites: [{ description: "Capacidad de entrar en furia" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-bred-for-war",
    name: "Criado para la Guerra",
    source: "phb2",
    types: ["especial"],
    description: "Generaciones de conflicto han forjado un instinto marcial innato en su sangre orca.",
    benefit:
      "+1 de bonificador de competencia al ataque cuando carga, y competencia con el hacha doble orca.",
    prerequisites: [{ description: "Ser semiorco" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-daylight-adaptation",
    name: "Adaptación a la Luz Diurna",
    source: "phb2",
    types: ["especial"],
    description: "El cuerpo se acostumbra poco a poco al resplandor que antes resultaba insoportable.",
    benefit:
      "Deja de sufrir el rasgo racial de sensibilidad a la luz (penalizador en Avistar y Buscar, y deslumbramiento bajo luz solar intensa). Conserva la visión en la oscuridad y demás rasgos raciales con normalidad.",
    prerequisites: [{ description: "Rasgo racial de sensibilidad a la luz" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-pass-for-human",
    name: "Pasar por Humano",
    source: "phb2",
    types: ["especial"],
    description: "Ha aprendido a disimular los rasgos que delatan su ascendencia no humana.",
    benefit:
      "Obtiene un bonificador de +10 en las pruebas de Disfrazarse para hacerse pasar por un humano, y las demás criaturas necesitan superar una prueba de Avistar más difícil de lo normal para notar cualquier rasgo físico no humano evidente.",
    prerequisites: [{ description: "Raza distinta de humano, de apariencia mayormente humana (ej. semielfo, semiorco)" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-dragontouched",
    name: "Marcado por el Dragón",
    source: "phb2",
    types: ["especial"],
    description:
      "Un vínculo, ya sea de sangre o de fe, lo conecta con el legado de un linaje dracónico concreto.",
    benefit:
      "Elige un tipo de dragón asociado a su linaje o a la deidad dracónica que venera. Obtiene un rasgo menor propio de ese linaje (por ejemplo, un bonificador a una característica, resistencia a un tipo de energía, o una habilidad especial menor de baja potencia), determinado por el tipo elegido. Esta dote puede tomarse varias veces, escogiendo cada vez un tipo de dragón distinto.",
    prerequisites: [
      {
        description:
          "Ser venerador de una deidad dracónica (Io, Astilabor, Bahamut, Tiamat u otra similar) o tener un dragón como progenitor",
      },
    ],
    fighterBonusFeat: false,
    stackable: true,
  },
  {
    id: "phb2-vexing-flanker",
    name: "Flanqueador Exasperante",
    source: "phb2",
    types: ["combate"],
    description: "Explota el flanqueo con una precisión que desespera a quien lo sufre.",
    benefit:
      "El bonificador al ataque que obtiene por flanquear a un enemigo aumenta de +2 a +4.",
    prerequisites: [
      { description: "Reflejos de Combate", check: hasFeat("combat-reflexes") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-armor-specialization",
    name: "Especialización con Armadura",
    source: "phb2",
    types: ["combate"],
    description: "Un especialista que ha llevado un tipo concreto de armadura hasta conocer cada uno de sus resquicios.",
    benefit:
      "Elija un tipo de armadura media o pesada con el que tenga competencia. Mientras lleve una armadura de ese tipo, de calidad magistral o superior, sin exceder su bonificador máximo de Destreza, obtiene reducción de daño 2/-. Esta dote puede tomarse varias veces; cada vez se aplica a un tipo de armadura distinto.",
    prerequisites: [
      {
        description: "Bonificador base de ataque +12",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 12,
      },
      { description: "Competencia con el tipo de armadura media o pesada elegido" },
    ],
    fighterBonusFeat: true,
    stackable: true,
  },
  {
    id: "phb2-two-weapon-rend",
    name: "Desgarro con Dos Armas",
    source: "phb2",
    types: ["combate"],
    description: "Cuando ambas armas encuentran el mismo objetivo, la herida se desgarra con una violencia añadida.",
    benefit:
      "Cuando golpea al mismo objetivo con ambas armas en el mismo asalto al combatir con dos armas, inflige 1d6 puntos de daño adicional más una vez y media su modificador de Fuerza (una vez por asalto contra un mismo objetivo), además del daño normal de ambos golpes.",
    prerequisites: [
      { description: "Destreza 15", check: (ctx: FeatPrereqContext) => ctx.abilityScores.dex >= 15 },
      { description: "Combate con Dos Armas", check: hasFeat("two-weapon-fighting") },
      {
        description: "Bonificador base de ataque +11",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 11,
      },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-combat-focus",
    name: "Enfoque de Combate",
    source: "phb2",
    types: ["combate"],
    description: "Concentra su atención en el fragor de la batalla hasta alcanzar un estado de enfoque que puede liberar en el momento justo.",
    benefit:
      "La primera vez que consigue un impacto en un encuentro, entra en su enfoque de combate (solo puede entrar en él una vez por encuentro). Puede mantenerlo durante 10 asaltos desde que lo obtiene, más 1 asalto adicional por cada otra dote de la familia 'Forma de Combate' que posea. Mientras lo mantenga, gana un bonificador de +2 en las salvaciones de Voluntad (+4 si posee tres o más dotes de la familia 'Forma de Combate').",
    prerequisites: [
      { description: "Sabiduría 13", check: (ctx: FeatPrereqContext) => ctx.abilityScores.wis >= 13 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-combat-vigor",
    name: "Vigor de Combate",
    source: "phb2",
    types: ["combate"],
    description: "Su enfoque en combate templa el cuerpo, cerrando heridas menores mientras dura la concentración.",
    benefit:
      "Mientras mantenga su enfoque de combate (véase Enfoque de Combate), gana curación rápida 2. Si posee tres o más dotes de la familia 'Forma de Combate' (incluida esta), la curación rápida aumenta a 4.",
    prerequisites: [
      { description: "Enfoque de Combate", check: hasFeat("phb2-combat-focus") },
      { description: "Sabiduría 13", check: (ctx: FeatPrereqContext) => ctx.abilityScores.wis >= 13 },
      {
        description: "Bonificador base de ataque +9",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 9,
      },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-combat-familiar",
    name: "Familiar de Combate",
    source: "phb2",
    types: ["general"],
    description: "Su familiar se ha adiestrado para llevar la magia de su amo hasta el corazón mismo de la refriega.",
    benefit:
      "Si su familiar lleva guardado un conjuro de toque, puede entrar en la casilla ocupada por un enemigo para administrarlo sin que ello provoque, por sí solo, un ataque de oportunidad por entrar en una casilla amenazada.",
    prerequisites: [
      { description: "Nivel de lanzador arcano 1" },
      { description: "Poseer un familiar" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-combat-strike",
    name: "Golpe de Combate",
    source: "phb2",
    types: ["combate"],
    description: "Mientras mantiene su enfoque, cada golpe cuerpo a cuerpo se vuelve devastador si decide soltarlo todo de una vez.",
    benefit:
      "Como acción rápida, puede poner fin a su enfoque de combate para obtener, hasta el final de su turno actual, un bonificador a las tiradas de ataque y de daño igual al número total de dotes de la familia 'Forma de Combate' que posea (incluida esta). En el momento en que termina su enfoque de esta forma, pierde de inmediato cualquier otro beneficio que solo se aplique mientras lo mantiene.",
    prerequisites: [
      { description: "Enfoque de Combate", check: hasFeat("phb2-combat-focus") },
      { description: "Sabiduría 13", check: (ctx: FeatPrereqContext) => ctx.abilityScores.wis >= 13 },
      { description: "Dos dotes adicionales de la familia 'Forma de Combate'" },
      {
        description: "Bonificador base de ataque +15",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 15,
      },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-combat-defense",
    name: "Defensa de Combate",
    source: "phb2",
    types: ["combate"],
    description: "Mientras mantiene su enfoque, su guardia cambia de blanco con una agilidad que desconcierta a sus enemigos.",
    benefit:
      "Mientras mantenga su enfoque de combate (véase Enfoque de Combate), puede cambiar el objetivo de su dote de Esquiva a un nuevo oponente como acción inmediata (normalmente solo puede designar o cambiar dicho objetivo en su turno, como acción gratuita). Si posee tres o más dotes de la familia 'Forma de Combate', gana además un bonificador de esquiva adicional de +1 a la Clase de Armadura frente al objetivo de su dote de Esquiva.",
    prerequisites: [
      { description: "Destreza 13", check: (ctx: FeatPrereqContext) => ctx.abilityScores.dex >= 13 },
      { description: "Sabiduría 13", check: (ctx: FeatPrereqContext) => ctx.abilityScores.wis >= 13 },
      { description: "Enfoque de Combate", check: hasFeat("phb2-combat-focus") },
      { description: "Esquiva", check: hasFeat("dodge") },
      {
        description: "Bonificador base de ataque +6",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 6,
      },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-indomitable-soul",
    name: "Alma Indomable",
    source: "phb2",
    types: ["general"],
    description: "Ninguna sugestión ni terror ajeno puede doblegar una voluntad forjada dos veces.",
    benefit:
      "Al realizar una salvación de Voluntad contra un efecto que afecte a la mente o que provoque miedo, tire el dado dos veces y quédese con el resultado más alto.",
    prerequisites: [
      { description: "Resistencia", check: hasFeat("endurance") },
      { description: "Voluntad de Hierro", check: hasFeat("iron-will") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-flay",
    name: "Desollar",
    source: "phb2",
    types: ["combate"],
    description: "Sabe encontrar, tras el filo de un ataque poderoso, el punto exacto donde el dolor desarma a un enemigo.",
    benefit:
      "Cuando golpea con un Ataque Poderoso, usando un arma cortante o perforante, a un enemigo que no reciba bonificador de armadura a su Clase de Armadura, este debe superar una salvación de Fortaleza (CD 10 + el bonificador al daño que obtuvo de Ataque Poderoso en ese golpe) o sufrir un penalizador de -2 en las tiradas de ataque durante 1 asalto. Solo puede usar esta dote una vez por asalto contra un mismo objetivo.",
    prerequisites: [
      { description: "Fuerza 13", check: (ctx: FeatPrereqContext) => ctx.abilityScores.str >= 13 },
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-defensive-sweep",
    name: "Barrido Defensivo",
    source: "phb2",
    types: ["combate"],
    description: "Un maestro del terreno que castiga a cualquier enemigo que se quede quieto demasiado cerca.",
    benefit:
      "Si un enemigo comienza su turno en una casilla adyacente a usted y no se mueve durante ese turno, provoca un ataque de oportunidad por su parte justo después de que termine su turno, siempre que usted amenace la casilla que ocupa. Cualquier movimiento del enemigo, incluido un paso de 1,50 m, evita que provoque este ataque de oportunidad especial. Esta dote no le concede ningún ataque de oportunidad adicional en un asalto dado más allá de los que ya tendría derecho a realizar.",
    prerequisites: [
      {
        description: "Bonificador base de ataque +15",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 15,
      },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-deadeye-shot",
    name: "Disparo Certero",
    source: "phb2",
    types: ["combate"],
    description: "Aprovecha cualquier distracción cuerpo a cuerpo de un enemigo para clavar la flecha justo donde más duele.",
    benefit:
      "Puede preparar un ataque a distancia para dispararlo en el momento en que un aliado golpee a un objetivo concreto en combate cuerpo a cuerpo. Si el ataque de su aliado tiene éxito, ese objetivo pierde su bonificador de Destreza a la Clase de Armadura frente a su ataque preparado.",
    prerequisites: [
      { description: "Disparo a Bocajarro", check: hasFeat("point-blank-shot") },
      { description: "Disparo Preciso", check: hasFeat("precise-shot") },
      {
        description: "Bonificador base de ataque +4",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 4,
      },
      { description: "Capacidad de infligir daño por ataque furtivo o Golpe de Escaramuza" },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-driving-attack",
    name: "Ataque Arrollador",
    source: "phb2",
    types: ["combate"],
    description: "Un maestro de las armas perforantes capaz de convertir una estocada certera en un empujón imparable.",
    benefit:
      "Como acción de asalto completo, realiza un único ataque cuerpo a cuerpo con un arma perforante. Si acierta, puede intentar de inmediato un empujón (bull rush) contra el objetivo sin provocar con ello un ataque de oportunidad, usando su bonificador total al daño con el arma en vez de su modificador de Fuerza para la prueba enfrentada del empujón. No puede avanzar junto con el enemigo empujado. Si logra empujarlo 3 m o más, puede optar por reducir esa distancia en 3 m; a cambio, el enemigo cae derribado en la casilla donde termina su movimiento.",
    prerequisites: [
      {
        description: "Bonificador base de ataque +14",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 14,
      },
      { description: "Soltura con un Arma (con un arma perforante)" },
      { description: "Especialización con un Arma (con un arma perforante)" },
      { description: "Soltura Mayor con un Arma (con un arma perforante)" },
      { description: "Especialización con un Arma Mayor (con un arma perforante)" },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-sacred-purification",
    name: "Purificación Sagrada",
    source: "phb2",
    types: ["general"],
    description: "El poder divino que expulsa a los no muertos también puede liberarse como un pulso que sana a los vivos y castiga a los muertos vivientes.",
    benefit:
      "Como acción rápida, puede gastar un uso de su capacidad de expulsar o reprender no muertos para liberar un pulso de energía divina. Todas las criaturas vivas en un radio de 18 m curan 1d8 puntos de golpe más su modificador de Carisma (si es positivo), y todos los no muertos en esa misma área sufren 1d8 puntos de daño más su modificador de Carisma.",
    prerequisites: [{ description: "Capacidad de expulsar o reprender no muertos" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-sacred-healing",
    name: "Curación Sagrada",
    source: "phb2",
    types: ["general"],
    description: "Sabe canalizar la energía positiva de su fe para hacer que sus curaciones lleguen más lejos.",
    benefit:
      "Como acción rápida, puede gastar un uso diario de su capacidad de expulsar o reprender no muertos para obtener, hasta el final de su turno, un bonificador de +5 en las pruebas de Curar y +2 puntos de golpe por cada dado curado por los conjuros de curación de conjuración que lance.",
    prerequisites: [
      { description: "Capacidad de expulsar o reprender no muertos" },
      { description: "Purificación Sagrada", check: hasFeat("phb2-sacred-purification") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-lurking-familiar",
    name: "Familiar Furtivo",
    source: "phb2",
    types: ["general"],
    description: "Su familiar ha aprendido a permanecer oculto a su sombra y a lanzarse desde ella sin ser visto.",
    benefit:
      "Mientras su familiar ocupa su propia casilla, obtiene cobertura frente a todos los ataques, lo que le permite intentar una prueba de Esconderse. Si después abandona su casilla para atacar a un oponente, obtiene el beneficio normal por atacar desde una posición oculta.",
    prerequisites: [
      { description: "Familiar de Combate", check: hasFeat("phb2-combat-familiar") },
      { description: "Nivel de lanzador arcano 6" },
      { description: "Poseer un familiar" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-bounding-assault",
    name: "Asalto Saltarín",
    source: "phb2",
    types: ["combate"],
    description: "Un experto en el Ataque Elástico capaz de golpear a dos enemigos distintos en una sola carrera.",
    benefit:
      "Al usar Ataque Elástico, designa dos enemigos en vez de uno; su movimiento no provoca ataques de oportunidad por parte de ninguno de ellos. Además, mientras usa una acción de ataque junto con Ataque Elástico, puede realizar un segundo ataque con un penalizador de -5.",
    prerequisites: [
      { description: "Esquiva", check: hasFeat("dodge") },
      { description: "Movilidad", check: hasFeat("mobility") },
      { description: "Ataque Elástico", check: hasFeat("spring-attack") },
      { description: "Destreza 13", check: (ctx: FeatPrereqContext) => ctx.abilityScores.dex >= 13 },
      {
        description: "Bonificador base de ataque +12",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 12,
      },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-rapid-blitz",
    name: "Embestida Rápida (PHB2)",
    source: "phb2",
    types: ["combate"],
    description: "El culmen del arte de golpear y desaparecer: un tercer enemigo cae dentro del mismo asalto saltarín.",
    benefit:
      "Puede designar un tercer objetivo para su dote de Ataque Elástico. Además del segundo ataque que ya obtiene de Asalto Saltarín, puede realizar un tercer ataque con un penalizador de -10.",
    prerequisites: [
      { description: "Esquiva", check: hasFeat("dodge") },
      { description: "Movilidad", check: hasFeat("mobility") },
      { description: "Ataque Elástico", check: hasFeat("spring-attack") },
      { description: "Asalto Saltarín", check: hasFeat("phb2-bounding-assault") },
      { description: "Destreza 13", check: (ctx: FeatPrereqContext) => ctx.abilityScores.dex >= 13 },
      {
        description: "Bonificador base de ataque +18",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 18,
      },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-combat-stability",
    name: "Estabilidad de Combate",
    source: "phb2",
    types: ["combate"],
    description: "Mientras mantiene su enfoque, sus músculos se afianzan en una postura casi imposible de mover.",
    benefit:
      "Mientras mantenga su enfoque de combate (véase Enfoque de Combate), gana un bonificador de +4 en las pruebas o tiradas para resistirse a intentos de empujón, desarme, presa, atropello y derribo en su contra. Si posee tres o más dotes de la familia 'Forma de Combate', el bonificador aumenta a +8.",
    prerequisites: [
      { description: "Sabiduría 13", check: (ctx: FeatPrereqContext) => ctx.abilityScores.wis >= 13 },
      { description: "Enfoque de Combate", check: hasFeat("phb2-combat-focus") },
      {
        description: "Bonificador base de ataque +3",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 3,
      },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-combat-awareness",
    name: "Consciencia de Combate",
    source: "phb2",
    types: ["combate"],
    description: "Mientras mantiene su enfoque, percibe el estado de sus aliados y enemigos con una claridad casi sobrenatural.",
    benefit:
      "Mientras mantenga su enfoque de combate (véase Enfoque de Combate), conoce los puntos de golpe actuales de cada aliado y enemigo adyacente a usted. Si posee tres o más dotes de la familia 'Forma de Combate', gana además visión ciega hasta 1,50 m.",
    prerequisites: [
      { description: "Sabiduría 13", check: (ctx: FeatPrereqContext) => ctx.abilityScores.wis >= 13 },
      { description: "Lucha a Ciegas", check: hasFeat("blind-fight") },
      { description: "Enfoque de Combate", check: hasFeat("phb2-combat-focus") },
      {
        description: "Bonificador base de ataque +12",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 12,
      },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-adaptable-flanker",
    name: "Flanqueador Adaptable (PHB2)",
    source: "phb2",
    types: ["combate"],
    description: "Sabe reposicionarse mentalmente en combate para flanquear a un rival desde donde más conviene.",
    benefit:
      "Como acción rápida, designa a un único oponente como objetivo de esta dote. Mientras esté adyacente a ese objetivo, puede elegir considerar que ocupa cualquier otra casilla que amenace, a efectos de determinar el flanqueo, tanto para usted como para sus aliados.",
    prerequisites: [
      { description: "Reflejos de Combate", check: hasFeat("combat-reflexes") },
      { description: "Flanqueador Exasperante", check: hasFeat("phb2-vexing-flanker") },
      {
        description: "Bonificador base de ataque +4",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 4,
      },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-brutal-strike",
    name: "Golpe Brutal",
    source: "phb2",
    types: ["combate"],
    description: "Sabe emplear el peso añadido de un Ataque Poderoso para dejar aturdido y descompuesto a su enemigo.",
    benefit:
      "Al usar Ataque Poderoso con un arma contundente, puede declarar antes de atacar que intenta un golpe brutal. Si el ataque acierta y causa daño, el objetivo debe superar una salvación de Fortaleza (CD 10 + el bonificador al daño que obtuvo de Ataque Poderoso en ese golpe) o quedar enfermo durante 1 asalto. Solo puede usar esta dote una vez por asalto durante su acción de ataque.",
    prerequisites: [
      { description: "Fuerza 13", check: (ctx: FeatPrereqContext) => ctx.abilityScores.str >= 13 },
      { description: "Ataque Poderoso", check: hasFeat("power-attack") },
      {
        description: "Bonificador base de ataque +6",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 6,
      },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-intimidating-strike",
    name: "Golpe Intimidante",
    source: "phb2",
    types: ["general"],
    description: "Un golpe bien colocado puede hacer más por quebrar la moral de un enemigo que mil palabras.",
    benefit:
      "Como acción estándar, realiza un único ataque cuerpo a cuerpo contra un enemigo, restando de la tirada de ataque una cantidad igual o menor a su bonificador base de ataque. Si el ataque acierta, puede realizar una prueba de Intimidar contra ese enemigo, con un bonificador igual a la cantidad que restó de su tirada de ataque. Si la prueba tiene éxito, el enemigo queda amilanado durante el resto del encuentro.",
    prerequisites: [
      { description: "4 rangos en Intimidar", check: (ctx: FeatPrereqContext) => (ctx.skillRanks["intimidate"] ?? 0) >= 4 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-elven-spell-lore",
    name: "Saber Élfico de Conjuros",
    source: "phb2",
    types: ["general"],
    description: "El conocimiento secreto de la magia élfica le permite retorcer y desentrañar los conjuros con una sutileza inusual.",
    benefit:
      "Gana un bonificador de +2 en las tiradas de nivel de lanzador al lanzar dispersar magia o dispersar magia mayor. Además, al preparar sus conjuros, puede elegir un único conjuro de su libro de conjuros y alterar el tipo de daño que inflige a un único tipo distinto de su elección al prepararlo (solo disponible para lanzadores que preparan conjuros).",
    prerequisites: [
      { description: "12 rangos en Saber (Arcano)", check: (ctx: FeatPrereqContext) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 12 },
      { description: "Inteligencia 17, o ser elfo" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-trophy-collector",
    name: "Coleccionista de Trofeos",
    source: "phb2",
    types: ["general"],
    description: "Cada enemigo caído deja un recordatorio que otros aprenden a temer.",
    benefit:
      "Cuando derrota a un enemigo cuyo ND sea superior a su nivel de personaje, puede conservar una parte de su cuerpo como trofeo para llevar consigo o exhibir. Por cada trofeo que lleve, gana un bonificador de +2 en las pruebas de Intimidar contra criaturas del mismo tipo que el trofeo (salvo humanoides y forasteros), y un bonificador de +1 en las salvaciones contra efectos de miedo. Una vez al día, puede obtener un bonificador de moral en una única salvación de Voluntad igual al número de trofeos que lleve. Sufre un penalizador de -4 en las pruebas de Diplomacia contra criaturas del mismo tipo o subtipo que uno o más de sus trofeos.",
    prerequisites: [
      { description: "6 rangos en Oficio (taxidermia)" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-ritual-blessing",
    name: "Bendición Ritual",
    source: "phb2",
    types: ["general"],
    description: "Un devoto que ha aprendido pequeños ritos sagrados capaces de reforzar la fe y la salud de otros.",
    benefit:
      "Obtiene acceso a una serie de ritos religiosos cuyo alcance depende de sus rangos en Saber (Religión). Con 4 rangos, puede oficiar el rito de Unción: cuando lanza un conjuro de curación de conjuración sobre el destinatario del rito, este cura 2 puntos de golpe adicionales. Con 8 rangos, puede oficiar el rito de Purga: el destinatario obtiene un bonificador de +2 en las salvaciones contra enfermedad y veneno. Con 13 rangos, puede oficiar el rito de Amparo: el destinatario obtiene un bonificador de +1 en las salvaciones contra conjuros y ataques especiales de forasteros malvados.",
    prerequisites: [
      { description: "Alineamiento bueno" },
      { description: "4 rangos en Saber (Religión)", check: (ctx: FeatPrereqContext) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 4 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-ritual-transference",
    name: "Transferencia Ritual",
    source: "phb2",
    types: ["creacion_objetos"],
    description: "Ha aprendido a canalizar la experiencia de otras criaturas dispuestas hacia el objeto mágico que está forjando.",
    benefit:
      "Puede oficiar un rito de Transferencia que agrupa los puntos de experiencia de hasta cinco criaturas dispuestas en el objeto mágico que está creando, permitiéndole construir objetos mágicos cuyos prerrequisitos no cumple. Si obtuvo esta dote gracias a Saber (Arcano), el rito solo funciona con objetos cuyos prerrequisitos incluyan conjuros arcanos; si la obtuvo gracias a Saber (Religión), solo funciona con objetos cuyos prerrequisitos incluyan conjuros divinos.",
    prerequisites: [
      { description: "4 rangos en Saber (Arcano) o Saber (Religión)" },
      { description: "Cualquier dote de creación de objetos" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-melee-weapon-mastery",
    name: "Maestría con Armas Cuerpo a Cuerpo",
    source: "phb2",
    types: ["combate"],
    description: "Ha llevado su dominio de un tipo de daño concreto hasta el límite con toda un arma cuerpo a cuerpo que lo inflige.",
    benefit:
      "Al tomar esta dote, elija un tipo de daño: contundente, cortante o perforante. Debe tener Soltura con un Arma y Especialización con un Arma con un arma cuerpo a cuerpo que inflija ese tipo de daño. Al usar cualquier arma cuerpo a cuerpo que inflija el tipo de daño elegido, obtiene un bonificador de +2 a las tiradas de ataque y +2 a las tiradas de daño.",
    prerequisites: [
      { description: "Soltura con un Arma (con un arma cuerpo a cuerpo del tipo de daño elegido)" },
      { description: "Especialización con un Arma (con esa misma arma)" },
      {
        description: "Bonificador base de ataque +8",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 8,
      },
    ],
    fighterBonusFeat: true,
    stackable: true,
  },
  {
    id: "phb2-ranged-weapon-mastery",
    name: "Maestría con Armas a Distancia",
    source: "phb2",
    types: ["combate"],
    description: "Ha llevado su dominio de un tipo de daño concreto hasta el límite con toda un arma a distancia que lo inflige.",
    benefit:
      "Al tomar esta dote, elija un tipo de daño: contundente, cortante o perforante. Debe tener Soltura con un Arma y Especialización con un Arma con un arma a distancia que inflija ese tipo de daño. Al usar cualquier arma a distancia que inflija el tipo de daño elegido, obtiene un bonificador de +2 a las tiradas de ataque y +2 a las tiradas de daño, y su incremento de alcance aumenta en 6 m (20 pies). Esta dote puede tomarse varias veces, eligiendo cada vez un tipo de daño distinto.",
    prerequisites: [
      { description: "Soltura con un Arma (con un arma a distancia del tipo de daño elegido)" },
      { description: "Especialización con un Arma (con esa misma arma)" },
      {
        description: "Bonificador base de ataque +8",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 8,
      },
    ],
    fighterBonusFeat: true,
    stackable: true,
  },
  {
    id: "phb2-weapon-supremacy",
    name: "Supremacía con un Arma",
    source: "phb2",
    types: ["combate"],
    description: "El pináculo del dominio marcial: un arma que se ha convertido en una extensión perfecta de su cuerpo.",
    benefit:
      "Elija un arma con la que posea Soltura Mayor y Especialización Mayor. Al combatir con esa arma, obtiene un bonificador de +4 en las pruebas para resistirse a ser desarmado; puede combatir con normalidad contra un enemigo que lo agarre sin necesidad de superar una prueba de presa; y al realizar una acción de ataque completo, puede aplicar un bonificador de +5 a una única tirada de ataque tras la primera.",
    prerequisites: [
      { description: "Competencia con el arma elegida" },
      { description: "Soltura con un Arma (con el arma elegida)" },
      { description: "Especialización con un Arma (con el arma elegida)" },
      { description: "Soltura Mayor con un Arma (con el arma elegida)" },
      { description: "Especialización con un Arma Mayor (con el arma elegida)" },
      { description: "Maestría con Armas Cuerpo a Cuerpo o Maestría con Armas a Distancia (con el tipo de daño del arma elegida)" },
      {
        description: "Nivel de guerrero 18",
        check: (ctx: FeatPrereqContext) => (ctx.classLevels["fighter"] ?? 0) >= 18,
      },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-bonded-familiar",
    name: "Familiar Vinculado",
    source: "phb2",
    types: ["general"],
    description: "El vínculo mágico con su familiar es tan profundo que ambos pueden compartir el peso de un golpe mortal.",
    benefit:
      "Mientras su familiar se encuentre a 9 m o menos de usted, una vez al día, si un ataque dejara a su familiar a 0 puntos de golpe o menos, puede optar por sufrir usted ese daño en su lugar. De igual modo, una vez al día, su familiar puede optar por sufrir en su lugar el daño de un único ataque o efecto que lo dejara a usted a 0 puntos de golpe o menos. Esto solo se aplica a ataques o efectos que causen daño a los puntos de golpe.",
    prerequisites: [{ description: "Poseer un familiar" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-combat-acrobat",
    name: "Acróbata de Combate",
    source: "phb2",
    types: ["general"],
    description: "Su entrenamiento acrobático le permite mantenerse en pie y avanzar por el campo de batalla donde otros tropezarían.",
    benefit:
      "Si un efecto lo derriba, puede intentar una prueba de Equilibrio (CD 20) para permanecer en pie en vez de caer derribado. Además, con una prueba de Equilibrio (CD 15), puede ignorar hasta 4 casillas de terreno difícil mientras se mueve, tratándolas como terreno normal a efectos de movimiento.",
    prerequisites: [
      { description: "9 rangos en Equilibrio", check: (ctx: FeatPrereqContext) => (ctx.skillRanks["balance"] ?? 0) >= 9 },
      { description: "9 rangos en Piruetas", check: (ctx: FeatPrereqContext) => (ctx.skillRanks["tumble"] ?? 0) >= 9 },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-crossbow-sniper",
    name: "Francotirador con Ballesta",
    source: "phb2",
    types: ["combate"],
    description: "Su puntería con la ballesta busca la rendija justa en la armadura de su enemigo.",
    benefit:
      "Al usar una ballesta (de mano, ligera o pesada) con la que tenga Soltura con un Arma, obtiene un bonificador a las tiradas de daño igual a la mitad de su modificador de Destreza. Además, si posee la capacidad de infligir daño por ataque furtivo o Golpe de Escaramuza, el alcance máximo al que puede aplicar dicho daño adicional aumenta a 18 m cuando usa esa ballesta.",
    prerequisites: [
      { description: "Competencia con ballesta de mano, ligera o pesada" },
      { description: "Soltura con un Arma (con esa ballesta)", check: hasFeat("weapon-focus") },
      {
        description: "Bonificador base de ataque +1",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 1,
      },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-robilars-gambit",
    name: "Ardid de Robilar",
    source: "phb2",
    types: ["combate"],
    description: "Baja deliberadamente la guardia para atraer el golpe de su rival justo donde puede devolvérselo.",
    benefit:
      "Al comienzo de su acción, puede adoptar una postura que lo expone al peligro a cambio de aprovechar los huecos que dejan sus atacantes. Hasta su siguiente turno, cualquiera que lo golpee en combate cuerpo a cuerpo obtiene un bonificador de +4 a esa tirada de ataque y a la de daño; a cambio, provoca un ataque de oportunidad por su parte cada vez que lo ataca así (resuelva su ataque de oportunidad después del ataque del enemigo). Normalmente, atacarlo no provoca ataques de oportunidad.",
    prerequisites: [
      { description: "Reflejos de Combate", check: hasFeat("combat-reflexes") },
      {
        description: "Bonificador base de ataque +12",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 12,
      },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-telling-blow",
    name: "Golpe Decisivo",
    source: "phb2",
    types: ["combate"],
    description: "Cuando la hoja encuentra el punto débil justo en el instante crítico, el daño se multiplica sin piedad.",
    benefit:
      "Cuando consigue un crítico contra un objetivo, inflige su daño de ataque furtivo o de Golpe de Escaramuza además del daño del crítico. Su multiplicador de crítico se aplica solo a su daño normal, no al daño de ataque furtivo o de Golpe de Escaramuza. Este beneficio se aplica tanto a ataques cuerpo a cuerpo como a distancia.",
    prerequisites: [
      { description: "Capacidad de infligir daño por ataque furtivo o Golpe de Escaramuza" },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-acrobatic-strike",
    name: "Golpe Acrobático",
    source: "phb2",
    types: ["combate"],
    description: "Convertir una voltereta defensiva en la apertura perfecta para un contraataque certero.",
    benefit:
      "Cuando usa con éxito Piruetas para evitar un ataque de oportunidad de un enemigo, obtiene un bonificador de +4 en el siguiente ataque que realice contra ese enemigo, siempre que ese ataque tenga lugar antes de que termine su turno actual.",
    prerequisites: [
      { description: "12 rangos en Piruetas", check: (ctx: FeatPrereqContext) => (ctx.skillRanks["tumble"] ?? 0) >= 12 },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-active-shield-defense",
    name: "Defensa Activa con Escudo",
    source: "phb2",
    types: ["combate"],
    description: "Su escudo se convierte en un muro que no deja de proteger ni siquiera cuando lucha a la defensiva.",
    benefit:
      "Al luchar a la defensiva mientras porta un escudo, no sufre el penalizador habitual de luchar a la defensiva sobre sus ataques de oportunidad. Al usar la acción de defensa total mientras porta un escudo, sigue amenazando el área a su alrededor con normalidad y puede realizar ataques de oportunidad con un penalizador de -4.",
    prerequisites: [
      { description: "Competencia con Escudo", check: hasFeat("shield-proficiency") },
      { description: "Especialización con Escudo", check: hasFeat("cw-shield-specialization") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
  {
    id: "phb2-agile-shield-fighter",
    name: "Combatiente Ágil con Escudo",
    source: "phb2",
    types: ["combate"],
    description: "Combina el golpe con el escudo y el mandoble de su arma en una única secuencia fluida de ataques.",
    benefit:
      "Al realizar un golpe con el escudo y un ataque con su arma como parte de una acción de ataque completo, sufre un penalizador de -2 en cada uno de esos ataques, en lugar de los penalizadores habituales por combatir con dos armas.",
    prerequisites: [
      { description: "Golpe con el Escudo Mejorado", check: hasFeat("improved-shield-bash") },
      { description: "Especialización con Escudo", check: hasFeat("cw-shield-specialization") },
      { description: "Competencia con Escudo", check: hasFeat("shield-proficiency") },
    ],
    fighterBonusFeat: true,
    stackable: false,
  },
];
