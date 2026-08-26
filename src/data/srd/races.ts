import type { Race } from "../../types";

// Razas núcleo del SRD 3.5 (contenido de juego abierto).
export const SRD_RACES: Race[] = [
  {
    id: "human",
    name: "Humano",
    source: "srd",
    size: "Mediano",
    speed: 30,
    abilityAdjustments: {},
    traits: [
      {
        name: "Dote adicional",
        description: "Los humanos obtienen una dote adicional en primer nivel.",
      },
      {
        name: "Habilidad adicional",
        description:
          "Los humanos obtienen 4 puntos de habilidad adicionales en primer nivel y 1 punto de habilidad adicional en cada nivel posterior.",
      },
    ],
    automaticLanguages: ["Común"],
    bonusLanguages: [
      "Enano",
      "Élfico",
      "Gigante",
      "Gnomo",
      "Goblin",
      "Orco",
      "Abisal",
      "Dracónico",
      "Infernal",
      "Silvano",
    ],
    favoredClass: "cualquiera",
    levelAdjustment: 0,
    description:
      "Los humanos son la raza más adaptable y ambiciosa, presentes en casi cualquier rincón del mundo. Su versatilidad les permite destacar en cualquier vocación, y su empuje individual los convierte en exploradores, conquistadores y innovadores natos.",
  },
  {
    id: "dwarf",
    name: "Enano",
    source: "srd",
    size: "Mediano",
    speed: 20,
    abilityAdjustments: { con: 2, cha: -2 },
    traits: [
      {
        name: "Visión en la oscuridad",
        description: "Los enanos pueden ver en la oscuridad hasta 18 metros (60 pies).",
      },
      {
        name: "Velocidad sin reducción",
        description:
          "La velocidad base del enano es de 6 metros (20 pies), pero esta no se ve reducida por llevar armadura pesada o carga pesada (a diferencia de otras razas).",
      },
      {
        name: "Estabilidad",
        description:
          "Los enanos reciben un bonificador de +4 a la CD para resistir maniobras de derribo cuando están de pie sobre el suelo.",
      },
      {
        name: "+2 a Tasación (piedra o metal)",
        description:
          "Los enanos reciben un bonificador racial de +2 a las pruebas de Tasación relacionadas con objetos de piedra o metal.",
      },
      {
        name: "+2 a Artesanía (herrería de armas o armaduras)",
        description:
          "Los enanos reciben un bonificador racial de +2 a las pruebas de Artesanía relacionadas con la herrería de armas o armaduras.",
      },
      {
        name: "Competencia con armas enanas",
        description:
          "Los enanos están considerados competentes con el martillo de guerra enano y la urgrosh enana, y tratan cualquier arma con la palabra \"enano\" en su nombre como arma marcial en lugar de exótica.",
      },
      {
        name: "Bonificador estable contra maniobras",
        description:
          "Los enanos reciben un bonificador de +4 a la esquiva a la Clase de Armadura contra criaturas de tipo gigante.",
      },
      {
        name: "+2 a salvaciones contra veneno",
        description:
          "Los enanos reciben un bonificador racial de +2 a las tiradas de salvación contra venenos.",
      },
      {
        name: "+2 a salvaciones contra conjuros y efectos sobrenaturales de escuela",
        description:
          "Los enanos reciben un bonificador racial de +2 a las tiradas de salvación contra conjuros y efectos similares a conjuros de la escuela de Nigromancia.",
      },
      {
        name: "+1 a ataque contra orcos y goblinoides",
        description:
          "Los enanos reciben un bonificador racial de +1 a las tiradas de ataque contra criaturas de los subtipos orco y goblinoide.",
      },
      {
        name: "Percepción de piedra",
        description:
          "Los enanos pueden detectar aspectos poco comunes en las construcciones de piedra: pasadizos inclinados, trampas, puertas nuevas, paredes o suelos debilitados y su dirección aproximada, y su profundidad bajo tierra, todo ello como si emplearan la habilidad Buscar; sin embargo, no necesitan buscar activamente, ya que este sentido es automático dentro de 3 metros (10 pies).",
      },
    ],
    automaticLanguages: ["Común", "Enano"],
    bonusLanguages: ["Gigante", "Gnomo", "Goblin", "Orco", "Terrano"],
    favoredClass: "fighter",
    levelAdjustment: 0,
    description:
      "Los enanos son un pueblo robusto y tenaz que habita en fortalezas montañosas y ciudades subterráneas. Orgullosos artesanos y guerreros implacables, mantienen antiguas rivalidades con orcos y goblinoides, y veneran la piedra y el metal como extensiones de su propia identidad.",
  },
  {
    id: "elf",
    name: "Elfo",
    source: "srd",
    size: "Mediano",
    speed: 30,
    abilityAdjustments: { dex: 2, con: -2 },
    traits: [
      {
        name: "Visión en penumbra",
        description:
          "Los elfos pueden ver el doble de lejos que un humano en condiciones de luz tenue (luz de luna, antorchas y similares).",
      },
      {
        name: "Inmunidad al sueño",
        description:
          "Los elfos son inmunes a los efectos mágicos de sueño.",
      },
      {
        name: "+2 a salvaciones contra encantamientos",
        description:
          "Los elfos reciben un bonificador racial de +2 a las tiradas de salvación contra conjuros y efectos de la escuela de Encantamiento.",
      },
      {
        name: "Competencia con armas élficas",
        description:
          "Los elfos se consideran competentes con la espada larga, el estoque, el arco corto (incluido el arco corto compuesto) y el arco largo (incluido el arco largo compuesto), y tratan cualquier arma con la palabra \"élfico\" en su nombre como arma marcial en lugar de exótica.",
      },
      {
        name: "+2 a Escuchar, Buscar y Avistar",
        description:
          "Los elfos reciben un bonificador racial de +2 a las pruebas de Escuchar, Buscar y Avistar.",
      },
      {
        name: "Detección automática de puertas secretas",
        description:
          "Un elfo que pase a 1,5 metros (5 pies) de una puerta secreta u oculta tiene derecho a una prueba de Buscar para percatarse de ella, como si estuviera buscándola activamente.",
      },
    ],
    automaticLanguages: ["Común", "Élfico"],
    bonusLanguages: ["Draconico", "Gnomo", "Goblin", "Gigante", "Orco", "Silvano", "Sylvano"],
    favoredClass: "wizard",
    levelAdjustment: 0,
    description:
      "Los elfos son un pueblo longevo y elegante, profundamente conectado con la magia y la naturaleza. Ágiles y perceptivos, tienden a vivir en bosques antiguos apartados del bullicio de otras razas, y su gracia natural los predispone tanto al arte de la espada como al estudio arcano.",
  },
  {
    id: "gnome",
    name: "Gnomo",
    source: "srd",
    size: "Pequeño",
    speed: 20,
    abilityAdjustments: { con: 2, str: -2 },
    traits: [
      {
        name: "Visión en penumbra",
        description:
          "Los gnomos pueden ver el doble de lejos que un humano en condiciones de luz tenue.",
      },
      {
        name: "+2 a salvaciones contra ilusiones",
        description:
          "Los gnomos reciben un bonificador racial de +2 a las tiradas de salvación contra conjuros y efectos de la escuela de Ilusión.",
      },
      {
        name: "CD de ilusiones +1",
        description:
          "Añade +1 a la CD de cualquier conjuro de la escuela de Ilusión lanzado por un gnomo.",
      },
      {
        name: "Habla con animales pequeños",
        description:
          "Los gnomos con una puntuación de Carisma de 10 o superior pueden lanzar, como efecto similar a un conjuro, hablar con los animales (solo con animales de tipo pequeño), imagen menor, prestidigitación y luces danzantes, cada uno una vez al día. El nivel de lanzador es igual al nivel de personaje del gnomo.",
      },
      {
        name: "+1 a ataque contra kobolds y goblinoides",
        description:
          "Los gnomos reciben un bonificador racial de +1 a las tiradas de ataque contra criaturas de los subtipos kobold y goblinoide.",
      },
      {
        name: "+4 a la esquiva contra gigantes",
        description:
          "Los gnomos reciben un bonificador de esquiva de +4 a la Clase de Armadura contra criaturas de tipo gigante.",
      },
      {
        name: "+2 a Escuchar",
        description: "Los gnomos reciben un bonificador racial de +2 a las pruebas de Escuchar.",
      },
      {
        name: "Afinidad con animales pequeños",
        description:
          "Los gnomos reciben un bonificador racial de +2 a las pruebas de Trato con Animales y Montar cuando la montura o el animal es de tamaño Pequeño.",
      },
    ],
    automaticLanguages: ["Común", "Gnomo"],
    bonusLanguages: ["Draconico", "Élfico", "Gigante", "Goblin", "Orco"],
    favoredClass: "bard",
    levelAdjustment: 0,
    description:
      "Los gnomos son un pueblo menudo, ingenioso y de humor peculiar, aficionados a la invención, la ilusión y las bromas. Viven en madrigueras y comunidades apartadas, mantienen buena relación con los animales pequeños y sienten una viva animadversión hacia goblinoides y kobolds.",
  },
  {
    id: "half-elf",
    name: "Semielfo",
    source: "srd",
    size: "Mediano",
    speed: 30,
    abilityAdjustments: {},
    traits: [
      {
        name: "Visión en penumbra",
        description:
          "Los semielfos pueden ver el doble de lejos que un humano en condiciones de luz tenue.",
      },
      {
        name: "Inmunidad al sueño",
        description: "Los semielfos son inmunes a los efectos mágicos de sueño.",
      },
      {
        name: "+2 a salvaciones contra encantamientos",
        description:
          "Los semielfos reciben un bonificador racial de +2 a las tiradas de salvación contra conjuros y efectos de la escuela de Encantamiento.",
      },
      {
        name: "+1 a Escuchar, Buscar y Avistar",
        description:
          "Los semielfos reciben un bonificador racial de +1 a las pruebas de Escuchar, Buscar y Avistar.",
      },
      {
        name: "+1 a Diplomacia y Reunir Información",
        description:
          "Los semielfos reciben un bonificador racial de +1 a las pruebas de Diplomacia y Reunir Información, gracias a su facilidad para tratar con ambos padres, humano y élfico.",
      },
    ],
    automaticLanguages: ["Común", "Élfico"],
    bonusLanguages: [
      "Dracónico",
      "Gnomo",
      "Goblin",
      "Gigante",
      "Orco",
      "Silvano",
      "Cualquier idioma (por región)",
    ],
    favoredClass: "cualquiera",
    levelAdjustment: 0,
    description:
      "Nacidos de la unión entre humanos y elfos, los semielfos combinan la curiosidad y adaptabilidad humanas con la gracia y longevidad élfica. A menudo se sienten a caballo entre dos mundos sin pertenecer del todo a ninguno, lo que los convierte en diplomáticos y mediadores naturales.",
  },
  {
    id: "half-orc",
    name: "Semiorco",
    source: "srd",
    size: "Mediano",
    speed: 30,
    abilityAdjustments: { str: 2, int: -2, cha: -2 },
    traits: [
      {
        name: "Visión en la oscuridad",
        description: "Los semiorcos pueden ver en la oscuridad hasta 18 metros (60 pies).",
      },
    ],
    automaticLanguages: ["Común", "Orco"],
    bonusLanguages: ["Draconico", "Gigante", "Gnomo", "Goblin", "Abisal"],
    favoredClass: "barbarian",
    levelAdjustment: 0,
    description:
      "Los semiorcos surgen del cruce entre humanos y orcos, heredando la fuerza física y resistencia de estos últimos. A menudo marginados por ambas sociedades de origen, muchos encuentran su lugar como guerreros, mercenarios o exploradores, forjándose una reputación propia a base de fuerza bruta.",
  },
  {
    id: "halfling",
    name: "Mediano",
    source: "srd",
    size: "Pequeño",
    speed: 20,
    abilityAdjustments: { dex: 2, str: -2 },
    traits: [
      {
        name: "+1 a todas las tiradas de salvación",
        description:
          "Los medianos reciben un bonificador racial de +1 a todas las tiradas de salvación.",
      },
      {
        name: "+2 a salvaciones contra el miedo",
        description:
          "Los medianos reciben un bonificador racial de +2 a las tiradas de salvación contra el miedo. Este bonificador se acumula con el anterior de +1 a todas las salvaciones.",
      },
      {
        name: "+1 a las tiradas de ataque con armas arrojadizas",
        description:
          "Los medianos reciben un bonificador racial de +1 a las tiradas de ataque con armas arrojadizas, incluida la honda.",
      },
      {
        name: "+2 a Trepar, Saltar y Moverse Sigilosamente",
        description:
          "Los medianos reciben un bonificador racial de +2 a las pruebas de Trepar, Saltar y Moverse Sigilosamente.",
      },
      {
        name: "+2 a Escuchar",
        description: "Los medianos reciben un bonificador racial de +2 a las pruebas de Escuchar.",
      },
    ],
    automaticLanguages: ["Común", "Mediano"],
    bonusLanguages: ["Enano", "Élfico", "Gnomo", "Goblin", "Orco"],
    favoredClass: "rogue",
    levelAdjustment: 0,
    description:
      "Los medianos son un pueblo pequeño, resuelto y amante de las comodidades, conocido por su suerte proverbial y su agilidad. Aunque prefieren la vida tranquila de sus comunidades agrícolas, muchos sienten un impulso irrefrenable hacia la aventura y el riesgo calculado.",
  },
  // ---------------------------------------------------------------------
  // Razas del Manual de Monstruos (v.3.5). Traducción de nombres y rasgos
  // no oficial: ver docs/razas-manuales-monstruos-dnd35.md. Los ajustes de
  // característica, ajuste de nivel, Dados de Golpe raciales y ataques
  // naturales son datos mecánicos tomados de esa referencia.
  // ---------------------------------------------------------------------
  {
    id: "bugbear",
    name: "Osgo",
    source: "srd",
    size: "Mediano",
    speed: 30,
    abilityAdjustments: { str: 4, dex: 2, con: 2, cha: -2 },
    racialHitDice: {
      count: 3,
      hitDie: 8,
      babProgression: "tres_cuartos",
      saves: { fort: "mala", ref: "buena", will: "mala" },
      naturalArmor: 3,
    },
    traits: [
      {
        name: "Armadura natural +3",
        description:
          "La piel correosa del osgo le otorga un bonificador de armadura natural de +3 a la Clase de Armadura, ya incluido en su CA total.",
      },
      {
        name: "Visión en la oscuridad",
        description: "Puede ver en la oscuridad hasta 18 m (60 pies), en blanco y negro únicamente.",
      },
      {
        name: "Olfato",
        description:
          "Puede detectar enemigos por el olfato dentro de 9 m, distinguir la dirección aproximada de un olor y rastrear por él.",
      },
      {
        name: "+4 a Moverse Sigilosamente",
        description: "Bonificador racial de +4 a las pruebas de Moverse Sigilosamente.",
      },
      {
        name: "3 Dados de Golpe raciales de humanoide",
        description:
          "Antes de sumar niveles de clase, el osgo ya cuenta como una criatura de 3 Dados de Golpe de tipo humanoide: aporta +2 al bonificador base de ataque, +1/+3/+1 a las salvaciones base de Fortaleza/Reflejos/Voluntad, y sus puntos de golpe y de habilidad correspondientes (ya calculados automáticamente por la hoja).",
      },
    ],
    automaticLanguages: ["Común", "Goblin"],
    bonusLanguages: [],
    favoredClass: "rogue",
    levelAdjustment: 1,
    description:
      "Los osgos son goblinoides altos y fornidos, sigilosos pese a su corpulencia, que suelen liderar bandas de goblins y trasgos menores gracias a su fuerza bruta y su instinto depredador.",
  },
  {
    id: "drow",
    name: "Elfo Oscuro (Drow)",
    source: "srd",
    size: "Mediano",
    speed: 30,
    abilityAdjustments: { dex: 2, con: -2, int: 2, cha: 2 },
    traits: [
      {
        name: "Visión en la oscuridad",
        description: "Puede ver en la oscuridad hasta 36 m (120 pies).",
      },
      {
        name: "Inmunidad al sueño",
        description: "Inmune a los efectos de sueño mágico.",
      },
      {
        name: "+2 a Voluntad contra magia",
        description:
          "Bonificador racial de +2 a las tiradas de salvación de Voluntad contra conjuros y efectos de la escuela de Encantamiento.",
      },
      {
        name: "Resistencia a la magia",
        description: "Resistencia a la magia igual a 11 + el nivel de clase del personaje.",
      },
      {
        name: "Habilidades sortílegas",
        description:
          "Una vez al día puede lanzar, como efecto similar a un conjuro (nivel de lanzador igual a su nivel de personaje), luces danzantes, oscuridad y fuego feérico.",
      },
      {
        name: "Competencia con armas",
        description: "Competencia automática con la ballesta de mano, el estoque y la espada corta.",
      },
      {
        name: "+2 a Escuchar, Buscar y Avistar",
        description: "Bonificador racial de +2 a las pruebas de estas tres habilidades.",
      },
      {
        name: "Ceguera por luz",
        description:
          "Al exponerse de repente a luz brillante, queda cegado durante 1 asalto y sufre -1 a las tiradas de ataque, salvación y pruebas de característica y habilidad mientras permanezca a la luz.",
      },
    ],
    automaticLanguages: ["Élfico", "Infracomún"],
    bonusLanguages: ["Abisal", "Acuático", "Draconico", "Gnomo", "Goblin"],
    favoredClass: "wizard",
    levelAdjustment: 2,
    description:
      "Los drow, o elfos oscuros, son parientes de los elfos exiliados a las profundidades del Infraworld hace generaciones. Su sociedad matriarcal favorece a la Clériga como clase predilecta entre las hembras y al Mago entre los machos, aunque la app solo puede registrar una clase predilecta por raza.",
  },
  {
    id: "goblin",
    name: "Trasgo",
    source: "srd",
    size: "Pequeño",
    speed: 30,
    abilityAdjustments: { str: -2, dex: 2, cha: -2 },
    traits: [
      {
        name: "Tamaño Pequeño",
        description:
          "+1 a la Clase de Armadura, +1 a las tiradas de ataque, +4 a las pruebas de Esconderse y -4 a las pruebas de Agarrar, por su tamaño.",
      },
      {
        name: "Visión en la oscuridad",
        description: "Puede ver en la oscuridad hasta 18 m (60 pies).",
      },
      {
        name: "+4 a Moverse Sigilosamente y Montar",
        description: "Bonificador racial de +4 a las pruebas de estas dos habilidades.",
      },
    ],
    automaticLanguages: ["Goblin"],
    bonusLanguages: ["Común", "Draconico", "Élfico", "Orco"],
    favoredClass: "rogue",
    levelAdjustment: 0,
    description:
      "Los trasgos son pequeños humanoides cobardes y oportunistas que sobreviven en grandes tribus, compensando su debilidad individual con la fuerza del número y una notable capacidad para pasar desapercibidos.",
  },
  {
    id: "hobgoblin",
    name: "Hobgoblin",
    source: "srd",
    size: "Mediano",
    speed: 30,
    abilityAdjustments: { dex: 2, con: 2 },
    traits: [
      {
        name: "Visión en la oscuridad",
        description: "Puede ver en la oscuridad hasta 18 m (60 pies).",
      },
      {
        name: "+4 a Moverse Sigilosamente",
        description: "Bonificador racial de +4 a las pruebas de Moverse Sigilosamente.",
      },
    ],
    automaticLanguages: ["Común", "Goblin"],
    bonusLanguages: ["Draconico", "Enano", "Élfico", "Orco"],
    favoredClass: "fighter",
    levelAdjustment: 0,
    description:
      "Los hobgoblins son goblinoides disciplinados y marciales, organizados en legiones jerárquicas que valoran la fuerza, el orden y la conquista por encima de todo lo demás.",
  },
  {
    id: "minotaur",
    name: "Minotauro",
    source: "srd",
    size: "Grande",
    speed: 40,
    abilityAdjustments: { str: 8, con: 4, int: -4, cha: -2 },
    racialHitDice: {
      count: 6,
      hitDie: 8,
      babProgression: "completa",
      saves: { fort: "mala", ref: "buena", will: "buena" },
      naturalArmor: 5,
    },
    racialNaturalAttacks: [{ name: "Cornada", damage: "1d8" }],
    traits: [
      {
        name: "Armadura natural +5",
        description:
          "La gruesa piel del minotauro le otorga un bonificador de armadura natural de +5 a la Clase de Armadura, ya incluido en su CA total.",
      },
      {
        name: "Competencia con armas",
        description: "Competencia automática con la gran hacha y con todas las armas sencillas.",
      },
      {
        name: "Cornada natural",
        description: "Ataque natural de cornada que inflige 1d8 puntos de daño (ya calculado en la ficha).",
      },
      {
        name: "Carga poderosa",
        description:
          "Si el minotauro carga y golpea con su cornada, inflige 4d6+6 puntos de daño en vez del daño normal de cornada, en lugar del único ataque habitual al final de una carga (efecto no calculado automáticamente por la hoja).",
      },
      {
        name: "Astucia natural",
        description: "Inmune al conjuro laberinto, nunca se pierde y nunca es sorprendido.",
      },
      {
        name: "Olfato",
        description:
          "Puede detectar enemigos por el olfato dentro de 9 m, distinguir la dirección aproximada de un olor y rastrear por él.",
      },
      {
        name: "+4 a Buscar, Avistar y Escuchar",
        description: "Bonificador racial de +4 a las pruebas de estas tres habilidades.",
      },
      {
        name: "Visión en la oscuridad",
        description: "Puede ver en la oscuridad hasta 18 m (60 pies).",
      },
      {
        name: "6 Dados de Golpe raciales de humanoide monstruoso",
        description:
          "Antes de sumar niveles de clase, el minotauro ya cuenta como una criatura de 6 Dados de Golpe de tipo humanoide monstruoso: aporta +6 al bonificador base de ataque, +2/+5/+5 a las salvaciones base de Fortaleza/Reflejos/Voluntad, y sus puntos de golpe y de habilidad correspondientes (ya calculados automáticamente por la hoja).",
      },
    ],
    automaticLanguages: ["Común", "Gigante"],
    bonusLanguages: [],
    favoredClass: "barbarian",
    levelAdjustment: 2,
    description:
      "Los minotauros son humanoides monstruosos con cabeza de toro, célebres por su fuerza descomunal y su infalible sentido de la orientación; muchos viven aislados en laberintos naturales o guaridas subterráneas.",
  },
  {
    id: "orc",
    name: "Orco",
    source: "srd",
    size: "Mediano",
    speed: 30,
    abilityAdjustments: { str: 4, int: -2, wis: -2, cha: -2 },
    traits: [
      {
        name: "Visión en la oscuridad",
        description: "Puede ver en la oscuridad hasta 18 m (60 pies).",
      },
      {
        name: "Sensibilidad a la luz",
        description:
          "Queda deslumbrado con la luz solar intensa o dentro del área de un conjuro de luz del día, sufriendo -1 a las tiradas de ataque, salvación y pruebas de característica y habilidad mientras dure.",
      },
    ],
    automaticLanguages: ["Común", "Orco"],
    bonusLanguages: ["Gigante", "Goblin"],
    favoredClass: "barbarian",
    levelAdjustment: 0,
    description:
      "Los orcos son humanoides brutales y belicosos que forman tribus guerreras en tierras hostiles, valorando la fuerza física y el combate por encima de cualquier otra virtud.",
  },
  {
    id: "lizardfolk-poison-dusk",
    name: "Hombre Lagarto Crepúsculo Venenoso",
    source: "srd",
    size: "Pequeño",
    speed: 30,
    abilityAdjustments: { dex: 2, con: 2, cha: -2 },
    racialNaturalAttacks: [
      { name: "Garra", damage: "1d3" },
      { name: "Garra", damage: "1d3" },
      { name: "Mordisco", damage: "1d3" },
    ],
    traits: [
      {
        name: "Tamaño Pequeño",
        description:
          "+1 a la Clase de Armadura, +1 a las tiradas de ataque, +4 a las pruebas de Esconderse y -4 a las pruebas de Agarrar, por su tamaño.",
      },
      {
        name: "+4 a Equilibrio, Saltar y Nadar",
        description: "Bonificador racial de +4 a las pruebas de estas tres habilidades.",
      },
      {
        name: "Veneno sin riesgo",
        description: "Puede aplicar veneno a un arma o ataque natural sin arriesgarse a envenenarse a sí mismo por accidente.",
      },
      {
        name: "Piel camaleónica",
        description: "+5 de bonificador racial a las pruebas de Esconderse mientras no lleve armadura ni ropa.",
      },
      {
        name: "Aguantar la respiración",
        description:
          "Puede contener la respiración durante un número de asaltos igual a 4 veces su puntuación de Constitución antes de arriesgarse a ahogarse.",
      },
      {
        name: "Visión en penumbra",
        description: "Puede ver el doble de lejos que un humano en condiciones de luz tenue.",
      },
      {
        name: "Ataques naturales",
        description:
          "Lucha con dos garras (1d3) y un mordisco (1d3); puede combinarlos con armas manufacturadas según las reglas normales de ataques naturales secundarios.",
      },
      {
        name: "Competencia con armas exóticas",
        description: "Trata las bolas y las redes como armas marciales, no exóticas.",
      },
    ],
    automaticLanguages: ["Hombre Lagarto"],
    bonusLanguages: ["Común", "Draconico", "Goblin"],
    favoredClass: "ranger",
    levelAdjustment: 1,
    description:
      "Los hombres lagarto crepúsculo venenoso son una variante pequeña y camuflada de su especie, hábiles nadadores y cazadores sigilosos que dominan el uso del veneno sin sufrir sus efectos.",
  },
];

export const SRD_RACE_IDS = SRD_RACES.map((r) => r.id);
