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
        name: "+2 a Tasar (piedra o metal)",
        description:
          "Los enanos reciben un bonificador racial de +2 a las pruebas de Tasar relacionadas con objetos de piedra o metal.",
      },
      {
        name: "+2 a Oficio (herrería de armas o armaduras)",
        description:
          "Los enanos reciben un bonificador racial de +2 a las pruebas de Oficio relacionadas con la herrería de armas o armaduras.",
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
          "Los gnomos con una puntuación de Carisma de 10 o superior pueden lanzar, como efecto similar a un conjuro, hablar con los animales (solo con animales de tipo pequeño), imagen menor, prestidigitación y luz danzante, cada uno una vez al día. El nivel de lanzador es igual al nivel de personaje del gnomo.",
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
          "Los gnomos reciben un bonificador racial de +2 a las pruebas de Manejar Animales y Montar cuando la montura o el animal es de tamaño Pequeño.",
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
        name: "+1 a Diplomacia y Obtener Información",
        description:
          "Los semielfos reciben un bonificador racial de +1 a las pruebas de Diplomacia y Obtener Información, gracias a su facilidad para tratar con ambos padres, humano y élfico.",
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
        name: "+2 a Escalar, Saltar y Moverse en Silencio",
        description:
          "Los medianos reciben un bonificador racial de +2 a las pruebas de Trepar, Saltar y Moverse en Silencio.",
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
];

export const SRD_RACE_IDS = SRD_RACES.map((r) => r.id);
