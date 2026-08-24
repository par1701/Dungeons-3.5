import type { ClassDef, ClassFeature, ClassFeatureChoice } from "../../types";

const FAVORED_SOUL_CHOICES: ClassFeatureChoice[] = [
  {
    id: "resistencia-energia",
    featureName: "Resistencia a la energía",
    levels: [2],
    label: "Tipo de energía",
    kind: "lista_fija",
    options: [
      { id: "acido", label: "Ácido" },
      { id: "electricidad", label: "Electricidad" },
      { id: "frio", label: "Frío" },
      { id: "fuego", label: "Fuego" },
      { id: "sonico", label: "Sónico" },
    ],
  },
];

// Clases de Complete Divine (2004).
//
// Se incluyen dos clases base nuevas (Alma Predilecta y Chamán Espiritual, ambas
// lanzadoras divinas espontáneas) y las 28 clases de prestigio del libro,
// verificadas contra `docs/prestige/*.md` (fichas con cabecera "Fuente: Complete
// Divine"). Las clases de prestigio cuyo único efecto mágico es "avanzar el
// nivel de lanzador de una clase que el personaje ya poseyera" omiten el campo
// `spellcasting` (nuestro modelo de conjuros por día no soporta todavía ese tipo
// de progresión automática ligada a otra clase) y documentan el efecto como un
// rasgo de clase (ClassFeature) de texto, siguiendo el mismo criterio usado en
// las clases de prestigio de Complete Arcane. Las clases de prestigio que sí
// tienen tabla de conjuros por día propia e independiente (Blighter, Consecrated
// Harrier, Divine Crusader, Holy Liberator, Pious Templar, Temple Raider of
// Olidammara, Ur-priest) sí declaran `spellcasting`, reutilizando el
// `spellListId` de una clase existente cuando la ficha indica que usan
// literalmente esa lista (paladín, explorador, clérigo) o uno propio sin
// poblar (como ya hacían Alma Predilecta/Chamán Espiritual) cuando la ficha
// describe una lista exclusiva o restringida (dominio único, lista propia).
//
// Alma Predilecta y Chamán Espiritual reutilizan, por forma, la misma progresión
// de "conjuros por día"/"conjuros conocidos" que usa el Hechicero en el PHB:
// en las reglas originales, ambas clases comparten exactamente esas tablas
// (solo cambian la característica de lanzamiento, cha/sab, y la lista de
// conjuros, que pasa a ser divina). No se garantiza una reproducción exacta
// número a número del libro, pero la forma y el ritmo de progresión son fieles
// y la clase es completamente jugable.

const CDV_SPONTANEOUS_DIVINE_SPELLS_PER_DAY: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 (sin usar)
  [5, 3, 0, 0, 0, 0, 0, 0, 0, 0], // 1
  [6, 4, 0, 0, 0, 0, 0, 0, 0, 0], // 2
  [6, 5, 0, 0, 0, 0, 0, 0, 0, 0], // 3
  [6, 6, 3, 0, 0, 0, 0, 0, 0, 0], // 4
  [6, 6, 4, 0, 0, 0, 0, 0, 0, 0], // 5
  [6, 6, 5, 3, 0, 0, 0, 0, 0, 0], // 6
  [6, 6, 6, 4, 0, 0, 0, 0, 0, 0], // 7
  [6, 6, 6, 5, 3, 0, 0, 0, 0, 0], // 8
  [6, 6, 6, 6, 4, 0, 0, 0, 0, 0], // 9
  [6, 6, 6, 6, 5, 3, 0, 0, 0, 0], // 10
  [6, 6, 6, 6, 6, 4, 0, 0, 0, 0], // 11
  [6, 6, 6, 6, 6, 5, 3, 0, 0, 0], // 12
  [6, 6, 6, 6, 6, 6, 4, 0, 0, 0], // 13
  [6, 6, 6, 6, 6, 6, 5, 3, 0, 0], // 14
  [6, 6, 6, 6, 6, 6, 6, 4, 0, 0], // 15
  [6, 6, 6, 6, 6, 6, 6, 5, 3, 0], // 16
  [6, 6, 6, 6, 6, 6, 6, 6, 4, 0], // 17
  [6, 6, 6, 6, 6, 6, 6, 6, 5, 3], // 18
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 4], // 19
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6], // 20
];

const CDV_SPONTANEOUS_DIVINE_SPELLS_KNOWN: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 (sin usar)
  [4, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 1
  [5, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 2
  [5, 3, 0, 0, 0, 0, 0, 0, 0, 0], // 3
  [6, 3, 1, 0, 0, 0, 0, 0, 0, 0], // 4
  [6, 4, 2, 0, 0, 0, 0, 0, 0, 0], // 5
  [7, 4, 2, 1, 0, 0, 0, 0, 0, 0], // 6
  [7, 5, 3, 2, 0, 0, 0, 0, 0, 0], // 7
  [8, 5, 3, 2, 1, 0, 0, 0, 0, 0], // 8
  [8, 5, 4, 3, 2, 0, 0, 0, 0, 0], // 9
  [9, 5, 4, 3, 2, 1, 0, 0, 0, 0], // 10
  [9, 5, 5, 4, 3, 2, 0, 0, 0, 0], // 11
  [9, 5, 5, 4, 3, 2, 1, 0, 0, 0], // 12
  [9, 5, 5, 4, 4, 3, 2, 0, 0, 0], // 13
  [9, 5, 5, 4, 4, 3, 2, 1, 0, 0], // 14
  [9, 5, 5, 4, 4, 4, 3, 2, 0, 0], // 15
  [9, 5, 5, 4, 4, 4, 3, 2, 1, 0], // 16
  [9, 5, 5, 4, 4, 4, 3, 3, 2, 0], // 17
  [9, 5, 5, 4, 4, 4, 3, 3, 2, 1], // 18
  [9, 5, 5, 4, 4, 4, 3, 3, 3, 2], // 19
  [9, 5, 5, 4, 4, 4, 3, 3, 3, 3], // 20
];

const FAVORED_SOUL_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Lanzamiento espontáneo de conjuros divinos",
    description:
      "El alma elegida lanza conjuros divinos de forma espontánea, extrayendo su poder de un vínculo innato con su deidad en vez de prepararlos mediante estudio u oración, igual que un hechicero lo hace con la magia arcana.",
  },
  {
    level: 1,
    name: "Arma predilecta",
    description:
      "El alma elegida es competente con el arma predilecta de su deidad, además de con todas las armas simples.",
  },
  {
    level: 2,
    name: "Resistencia a la energía",
    description:
      "El alma elegida elige un tipo de energía (ácido, electricidad, frío, fuego o sónico) asociado a su naturaleza semidivina y obtiene resistencia 5 a esa energía. La resistencia aumenta a 10 en el nivel 11 y a 20 en el nivel 20.",
  },
  {
    level: 20,
    name: "Alas",
    description:
      "El alma elegida hace crecer un par de alas (emplumadas, membranosas u otro tipo apropiado a su naturaleza) que le otorgan una velocidad de vuelo de 18 metros con maniobrabilidad buena.",
  },
  {
    level: 20,
    name: "Reducción de daño",
    description:
      "La naturaleza semidivina del alma elegida se hace patente: obtiene reducción de daño 5/mágico.",
  },
];

const SPIRIT_SHAMAN_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Lanzamiento espontáneo de conjuros divinos",
    description:
      "La chamán espiritual lanza conjuros divinos de forma espontánea a partir de su propia lista de conjuros, ligada a los espíritus de la naturaleza, en vez de prepararlos de antemano como hace el druida.",
  },
  {
    level: 1,
    name: "Guía espiritual",
    description:
      "Cada día, al recuperar sus conjuros, la chamán espiritual elige un espíritu guía entre varios disponibles (por ejemplo el oso, el cuervo o la serpiente); mientras dure el vínculo de ese día, el espíritu elegido le concede un pequeño beneficio temático adicional.",
  },
  {
    level: 2,
    name: "Lectura de objetos",
    description:
      "Concentrándose durante 1 minuto mientras sostiene un objeto, la chamán espiritual puede percibir impresiones psíquicas de sucesos recientes relacionados con él, obteniendo información fragmentaria sobre su historia reciente.",
  },
  {
    level: 6,
    name: "Sentidos espirituales",
    description:
      "La chamán espiritual obtiene un bonificador de +4 a las pruebas de Avistar y Escuchar mientras se encuentre en terrenos naturales o en presencia de espíritus.",
  },
  {
    level: 11,
    name: "Forma de espíritu",
    description:
      "Una vez al día, la chamán espiritual puede adoptar una forma parcialmente incorpórea durante unos instantes, ganando un bonificador de desvío del 20% frente a ataques como si tuviera la cualidad incorpórea, una vez por combate.",
  },
];

// ---------------------------------------------------------------------------
// Tablas de conjuros por día compartidas por varias clases de prestigio con
// progresión de lanzador propia (no "avanzan" una clase existente).
// ---------------------------------------------------------------------------

// Progresión de lanzador divino completo (nivel 9 máximo) empezando en el
// nivel 1 de la propia clase de prestigio; usada por Blighter (lista propia)
// y Ur-priest (lista de clérigo).
const CDV_PRESTIGE_FULL_DIVINE_SPELLS_PER_DAY: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 (sin usar)
  [4, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 1
  [5, 3, 0, 0, 0, 0, 0, 0, 0, 0], // 2
  [5, 3, 1, 0, 0, 0, 0, 0, 0, 0], // 3
  [6, 3, 2, 1, 0, 0, 0, 0, 0, 0], // 4
  [6, 3, 3, 2, 1, 0, 0, 0, 0, 0], // 5
  [6, 3, 3, 3, 2, 1, 0, 0, 0, 0], // 6
  [6, 4, 3, 3, 3, 2, 1, 0, 0, 0], // 7
  [6, 4, 4, 3, 3, 3, 2, 1, 0, 0], // 8
  [6, 5, 4, 4, 4, 4, 3, 2, 1, 0], // 9
  [6, 5, 5, 4, 4, 4, 4, 3, 2, 1], // 10
];

// Progresión de "cuarto de lanzador" tipo paladín/explorador (nivel 4 máximo),
// usada por Consecrated Harrier (lista de explorador), Holy Liberator y Pious
// Templar (lista de paladín) y Temple Raider of Olidammara (lista propia).
const CDV_PRESTIGE_QUARTER_DIVINE_SPELLS_PER_DAY: number[][] = [
  [0, 0, 0, 0, 0], // 0 (sin usar)
  [0, 0, 0, 0, 0], // 1
  [1, 0, 0, 0, 0], // 2
  [1, 0, 0, 0, 0], // 3
  [1, 1, 0, 0, 0], // 4
  [1, 1, 0, 0, 0], // 5
  [1, 1, 1, 0, 0], // 6
  [2, 1, 1, 0, 0], // 7
  [2, 1, 1, 1, 0], // 8
  [2, 2, 1, 1, 0], // 9
  [2, 2, 2, 1, 0], // 10
];

// Pious Templar difiere ligeramente de la tabla anterior en los niveles 3-4
// (accede al 2º nivel de conjuro un nivel antes).
const CDV_PIOUS_TEMPLAR_SPELLS_PER_DAY: number[][] = [
  [0, 0, 0, 0, 0], // 0 (sin usar)
  [0, 0, 0, 0, 0], // 1
  [1, 0, 0, 0, 0], // 2
  [1, 1, 0, 0, 0], // 3
  [1, 1, 0, 0, 0], // 4
  [1, 1, 0, 0, 0], // 5
  [1, 1, 1, 0, 0], // 6
  [2, 1, 1, 0, 0], // 7
  [2, 1, 1, 1, 0], // 8
  [2, 2, 1, 1, 0], // 9
  [2, 2, 2, 1, 0], // 10
];

// Progresión de lanzador completo (nivel 9 máximo) de dominio, empezando en
// el nivel 1 de la propia clase; usada por Divine Crusader.
const CDV_DIVINE_CRUSADER_SPELLS_PER_DAY: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 (sin usar)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
  [2, 1, 0, 0, 0, 0, 0, 0, 0, 0], // 3
  [2, 2, 1, 0, 0, 0, 0, 0, 0, 0], // 4
  [3, 2, 2, 1, 0, 0, 0, 0, 0, 0], // 5
  [3, 3, 2, 2, 1, 0, 0, 0, 0, 0], // 6
  [3, 3, 3, 2, 2, 1, 0, 0, 0, 0], // 7
  [3, 3, 3, 3, 2, 2, 1, 0, 0, 0], // 8
  [3, 3, 3, 3, 3, 2, 2, 1, 0, 0], // 9
  [3, 3, 3, 3, 3, 3, 2, 2, 1, 0], // 10
];

// ---------------------------------------------------------------------------
// Zelote de la Llama Negra (Black Flame Zealot)
// ---------------------------------------------------------------------------

const BLACK_FLAME_ZEALOT_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Ataque a Muerte",
    description:
      "Idéntico al ataque a muerte del asesino, salvo que no puede paralizar al objetivo. Si ya posee esta habilidad de otra clase (como asesino), suma los niveles de ambas clases para calcular la CD de salvación.",
  },
  {
    level: 1,
    name: "Corazón Celoso (Su)",
    description:
      "Inmune al miedo, mágico o de otro tipo. A diferencia del aura de coraje del paladín, no otorga ningún beneficio a sus aliados.",
  },
  {
    level: 2,
    name: "Uso de Veneno (Ex)",
    description: "Puede usar veneno sin riesgo de envenenarse a sí mismo, como el asesino.",
  },
  {
    level: 2,
    name: "Conjuros por Día",
    description:
      "En cada nivel par de zelote de la llama negra (2º, 4º, 6º, 8º, 10º) gana conjuros por día (y conjuros conocidos si aplica) como si hubiera ganado un nivel en una clase de lanzamiento divino que ya poseía antes de tomar esta clase de prestigio, sin obtener otros beneficios de esa clase. Si tenía más de una clase divina previa, el jugador elige a cuál asignar cada nivel.",
  },
  {
    level: 3,
    name: "Ataque Furtivo +1d6",
    description:
      "Gana daño adicional de ataque furtivo, como la habilidad de pícaro; si ya posee ataque furtivo de otra fuente, los bonos se acumulan.",
  },
  {
    level: 5,
    name: "Paso Fatídico (Sp)",
    description:
      "Una vez al día, puede dar un solo paso y atravesar obstáculos o distancia como el conjuro puerta dimensional; su nivel de lanzador es igual a la mitad de su nivel de personaje.",
  },
  {
    level: 6,
    name: "Ataque Furtivo +2d6",
    description: "El daño de ataque furtivo aumenta a +2d6.",
  },
  {
    level: 7,
    name: "Llama Sagrada (Su)",
    description:
      "A voluntad, puede hacer que un arma cuerpo a cuerpo en su posesión arda con fuego negro y mortal, otorgándole la propiedad flamígera (1d6 de daño de fuego adicional por golpe). Una vez al día, como acción gratuita, puede en su lugar otorgar la propiedad de estallido de fuego durante 1 minuto.",
  },
  {
    level: 9,
    name: "Ataque Furtivo +3d6",
    description: "El daño de ataque furtivo aumenta a +3d6.",
  },
  {
    level: 10,
    name: "Inmolación Impía (Su)",
    description:
      "Cualquier criatura muerta por su ataque a muerte o ataque furtivo es consumida de inmediato por fuego impío; la única forma de devolverle la vida es mediante resurrección verdadera, o un deseo cuidadosamente formulado seguido de resurrección, o milagro.",
  },
];

// ---------------------------------------------------------------------------
// Devastador / Blighter
// ---------------------------------------------------------------------------

const BLIGHTER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "Al ser ex druidas, pierden su lanzamiento de conjuros de druida pero acceden a nuevos conjuros más destructivos de la lista propia de blighter. Su nivel de lanzador es igual a su nivel de blighter más su nivel de druida previo. Requiere Sabiduría 10 + nivel del conjuro para lanzarlo; la CD de salvación es 10 + nivel del conjuro + modificador de Sabiduría. Prepara y lanza conjuros como un druida (pero no puede lanzar conjuros de invocar espontáneamente). El foco divino por defecto es una ramita seca de acebo o muérdago; los componentes materiales deben llevar muertos al menos un día.",
  },
  {
    level: 1,
    name: "Deforestación (Sp)",
    description:
      "Una vez al día, como acción de asalto completo, puede matar toda la vida vegetal no sensible en un radio de 6 m por nivel de blighter (el controlador de una planta controlada puede salvar con Fortaleza, CD 10 + nivel de blighter + mod. Sab, para mantenerla con vida). Las plantas afectadas se marchitan en un día y nada puede crecer allí hasta que se lance santificar y se resiembre. Debe deforestar en las últimas 24 horas para poder lanzar conjuros ese día.",
  },
  {
    level: 2,
    name: "Fuego Pestilente (Su)",
    description:
      "Como acción estándar, libera una explosión de fuego que inflige 5d6 de daño de fuego a todas las criaturas en 3 m (Reflejos mitad; CD 10 + nivel de clase + mod. Sab) e incendia objetos inflamables.",
  },
  {
    level: 2,
    name: "Sustento (Ex)",
    description: "Ya no necesita comida ni agua para sobrevivir.",
  },
  {
    level: 3,
    name: "Forma Salvaje No Muerta (Sp)",
    description:
      "Funciona como la forma salvaje del druida pero añade la plantilla de esqueleto a la forma animal (tipo no muerto, bonificador de armadura natural +0 a +3 según tamaño, +2 Destreza, sin Constitución, inmunidad al frío, reducción de daño 5/contundente). Usable 1/día; gana un uso adicional en cada nivel par posterior (hasta 5/día en nivel 10). Puede adoptar forma Grande a partir de nivel 5 y Enorme a partir de nivel 9.",
  },
  {
    level: 4,
    name: "Hablar con Animal Muerto (Sp)",
    description:
      "Una vez al día, conversa con animales muertos como el conjuro hablar con los muertos lanzado por un clérigo cuyo nivel es la suma de niveles de druida y blighter, pero solo afecta cadáveres de animales.",
  },
  {
    level: 5,
    name: "Toque Contagioso (Su)",
    description:
      "Una vez al día, produce un efecto como el conjuro toque contagioso; gana un uso adicional cada dos niveles adicionales de blighter.",
  },
  {
    level: 6,
    name: "Animar Animal Muerto (Sp)",
    description:
      "Una vez al día, funciona como el conjuro animar a los muertos pero solo afecta cadáveres de animales y no requiere componente material.",
  },
  {
    level: 8,
    name: "Desvincular (Sp)",
    description:
      "Una vez al día, puede separar temporalmente a un animal o bestia mágica vinculada (compañero animal, familiar o montura) de su amo si este falla una salvación de Voluntad (CD 10 + nivel de blighter + mod. Sab); el vínculo se restaura tras 1 minuto por nivel de blighter.",
  },
  {
    level: 10,
    name: "Plaga (Su)",
    description:
      "Funciona como el toque contagioso pero sin tirada de ataque, afectando a todos los objetivos designados en un radio de 6 m.",
  },
];

// ---------------------------------------------------------------------------
// Inquisidor de la Iglesia (Church Inquisitor)
// ---------------------------------------------------------------------------

const CHURCH_INQUISITOR_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Detectar el Mal (Sp)",
    description: "Puede usar detectar el mal a voluntad como habilidad sortílega.",
  },
  {
    level: 1,
    name: "Dominio de la Inquisición",
    description:
      "Al adoptar la clase gana acceso al dominio de la Inquisición, que incluye un bonificador de +4 en las tiradas de disipar como poder otorgado.",
  },
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "En cada nivel de inquisidor de la iglesia (1º a 10º) gana conjuros divinos por día (y conocidos si aplica) como si hubiera ganado un nivel en la clase de lanzamiento divino que poseía antes, sin otros beneficios de esa clase.",
  },
  {
    level: 2,
    name: "Inmune a Encantamientos/Hechizar (Ex)",
    description: "Inmune a todos los conjuros y efectos de encantamiento (hechizar).",
  },
  {
    level: 3,
    name: "Traspasar Ilusiones (Su)",
    description: "Gana la habilidad sobrenatural de traspasar ilusiones a voluntad.",
  },
  {
    level: 4,
    name: "Traspasar Disfraces (Ex)",
    description: "Bonificador de competencia +4 en Avistar contra la habilidad de Disfraz.",
  },
  {
    level: 5,
    name: "Inmune a Compulsiones (Ex)",
    description: "Inmune a todos los conjuros y efectos de compulsión.",
  },
  {
    level: 6,
    name: "Forzar Cambio de Forma (Su)",
    description:
      "A voluntad, mediante un ataque de toque cuerpo a cuerpo exitoso seguido de una prueba de nivel de lanzador como si disipara magia (incluyendo su bonificador +4 de dominio en tiradas de disipar), puede forzar a una criatura a su forma natural, deshaciendo alterar el yo, polimorfar, cambiaformas y habilidades de forma alterna; la criatura no puede cambiar de forma de nuevo durante 1d6 asaltos.",
  },
  {
    level: 8,
    name: "Inmunidad a la Posesión (Ex)",
    description:
      "Inmune a jarra mágica, ligar alma, atrapar alma, la habilidad de malevolencia de un fantasma, y todos los demás efectos o conjuros similares.",
  },
  {
    level: 9,
    name: "Discernir Mentiras (Sp)",
    description: "Puede usar discernir mentiras como habilidad sortílega tres veces al día.",
  },
  {
    level: 10,
    name: "Aprender la Verdad (Su)",
    description:
      "Tocando a una criatura que le ha mentido, puede forzarla a decir la verdad (CD de salvación de Voluntad 10 + nivel de clase + modificador de Carisma), usable 3 veces al día.",
  },
];

// ---------------------------------------------------------------------------
// Acosador Consagrado (Consecrated Harrier)
// ---------------------------------------------------------------------------

const CONSECRATED_HARRIER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Bendición de las Escrituras (Su)",
    description:
      "Bonificador sagrado de +2 en Farolear, Escuchar, Sentir Motivaciones, Avistar y Supervivencia cuando persigue a su objetivo asignado por la iglesia, y el mismo bonificador en las tiradas de daño (con arma o desarmado) contra ese objetivo; aumenta a +4 en nivel 5 y a +6 en nivel 10.",
  },
  {
    level: 1,
    name: "Detectar el Caos (Sp)",
    description: "A voluntad, como un clérigo de nivel igual al suyo.",
  },
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "Lanza conjuros divinos usando la lista de conjuros de explorador. Requiere Sabiduría 10 + nivel del conjuro; la CD de salvación es 10 + nivel del conjuro + modificador de Sabiduría; los conjuros bonus se basan en Sabiduría.",
  },
  {
    level: 2,
    name: "Vista Santificada (Su)",
    description: "Bonificador de +4 en todas las salvaciones contra ilusiones.",
  },
  {
    level: 3,
    name: "Disipar Magia (Sp)",
    description: "Un número de veces al día igual a su modificador de Sabiduría (mínimo 1).",
  },
  {
    level: 4,
    name: "Desesperación Agobiante (Sp)",
    description: "Un número de veces al día igual a su modificador de Sabiduría (mínimo 1).",
  },
  {
    level: 6,
    name: "Visión Falsa (Sp)",
    description: "Un número de veces al día igual a su modificador de Sabiduría (mínimo 1).",
  },
  {
    level: 8,
    name: "Cacería Implacable (Su)",
    description:
      "Si hiere a su objetivo y este escapa, siempre conoce la dirección y la distancia aproximada (dentro del 10% de la distancia total) hasta su objetivo.",
  },
  {
    level: 10,
    name: "Cacería Infalible (Su)",
    description: "Puede intensificar la cacería implacable para localizar a su presa incluso a través de fronteras planares.",
  },
  {
    level: 1,
    name: "Código de Conducta",
    description:
      "Debe darse a conocer ante su objetivo, revelando quién es y por qué está allí en el momento de la confrontación; no puede hacer ataque furtivo contra su objetivo.",
  },
];

// ---------------------------------------------------------------------------
// Contemplativo (Contemplative)
// ---------------------------------------------------------------------------

const CONTEMPLATIVE_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "En cada nivel de contemplativo gana conjuros divinos por día como si hubiera ganado un nivel en la clase de lanzamiento divino a la que pertenecía antes de tomar esta clase de prestigio.",
  },
  {
    level: 1,
    name: "Dominio Bonus",
    description: "Al adoptar la clase, y de nuevo en el nivel 6, gana acceso a un dominio adicional de su elección.",
  },
  {
    level: 1,
    name: "Salud Divina (Ex)",
    description: "Inmunidad a todas las enfermedades, incluidas las mágicas como la putrefacción de momia o la licantropía.",
  },
  {
    level: 2,
    name: "Mente Escurridiza (Ex)",
    description:
      "Si falla una salvación contra un efecto de encantamiento, un asalto después puede intentar la salvación de nuevo; solo dispone de esta oportunidad extra una vez.",
  },
  {
    level: 3,
    name: "Plenitud Divina (Su)",
    description: "Puede curar hasta 4 veces su nivel de clase en puntos de golpe cada día, repartibles entre varios usos.",
  },
  {
    level: 5,
    name: "Cuerpo Divino (Ex)",
    description: "Inmune a todo tipo de venenos.",
  },
  {
    level: 7,
    name: "Alma Divina (Ex)",
    description: "Su resistencia a conjuros es igual a su nivel de clase + 15.",
  },
  {
    level: 9,
    name: "Cuerpo Eterno (Ex)",
    description:
      "Ya no sufre penalizadores de característica por envejecimiento (el envejecimiento mágico no le afecta); conserva penalizadores previos y aún puede morir de vejez, y sigue recibiendo los bonos de envejecimiento.",
  },
  {
    level: 10,
    name: "Unión Mística",
    description: "Su tipo de criatura cambia de humanoide a extraplanar (nativo) y gana reducción de daño 10/mágico.",
  },
];

// ---------------------------------------------------------------------------
// Cruzado Divino (Divine Crusader)
// ---------------------------------------------------------------------------

const DIVINE_CRUSADER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Aura (Ex)",
    description:
      "Posee un aura de alineamiento cuya intensidad es igual a su nivel de clase (sumado a niveles de otras clases con aura similar, como clérigo o paladín), funcionando de forma análoga al conjuro detectar el mal/bien/ley/caos según corresponda.",
  },
  {
    level: 1,
    name: "Deidad y Dominio",
    description:
      "Elige un dominio disponible para los clérigos de su deidad; obtiene únicamente el poder otorgado de ese dominio (sin dotes bonus), y la lista de conjuros de dominio se convierte en su lista de conjuros exclusiva.",
  },
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "Lanza conjuros divinos preparándolos y lanzándolos como un clérigo, pero solo puede preparar y lanzar conjuros de su dominio elegido; no puede lanzar curar/infligir heridas de forma espontánea. Requiere Carisma 10 + nivel del conjuro; recibe conjuros de dominio bonus basados en Carisma; la CD de salvación es 10 + nivel del conjuro + modificador de Carisma.",
  },
  {
    level: 3,
    name: "Resistencia a Electricidad (Ex)",
    description: "Resistencia a electricidad 5.",
  },
  {
    level: 5,
    name: "Especialización en Arma",
    description: "Gana la dote Especialización en Arma como dote bonus con el arma favorita de su deidad.",
  },
  {
    level: 6,
    name: "Resistencia a Ácido (Ex)",
    description: "Resistencia a ácido 5.",
  },
  {
    level: 7,
    name: "Visión en la Oscuridad (Ex)",
    description: "Gana visión en la oscuridad.",
  },
  {
    level: 9,
    name: "Resistencias Aumentadas",
    description: "Las resistencias a ácido y electricidad aumentan a 10.",
  },
  {
    level: 10,
    name: "Ser Perfecto",
    description:
      "Su tipo cambia a extraplanar (nativo) y gana reducción de daño 10/mágico, conservando su origen en el Plano Material a efectos de resurrección.",
  },
];

// ---------------------------------------------------------------------------
// Oráculo Divino (Divine Oracle)
// ---------------------------------------------------------------------------

const DIVINE_ORACLE_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Dominio del Oráculo",
    description:
      "Gana acceso al dominio del Oráculo, cuyo poder otorgado da +2 al nivel de lanzador para conjuros de adivinación; puede elegir conjuros de este dominio como conjuros de dominio diarios.",
  },
  {
    level: 1,
    name: "Bono de Adivinación (Su)",
    description: "Bonificador sagrado de +1 en la CD de salvación de todos sus conjuros de adivinación.",
  },
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "En cada nivel de oráculo divino (1º a 10º) gana conjuros divinos por día como si hubiera ganado un nivel en la clase de lanzamiento divino a la que pertenecía antes de esta clase de prestigio.",
  },
  {
    level: 2,
    name: "Sentido Presciente (Ex)",
    description:
      "Al superar una salvación de Reflejos contra un efecto que normalmente inflige la mitad del daño, no sufre ningún daño (como evasión), independientemente de la armadura que lleve.",
  },
  {
    level: 2,
    name: "Sentido de Trampas +1 (Ex)",
    description:
      "+1 en salvaciones de Reflejos para evitar trampas y +1 de bonificador de esquiva a la CA contra ataques de trampas; aumenta a +2 en nivel 5 y a +3 en nivel 8.",
  },
  {
    level: 3,
    name: "Mejora de Adivinación (Ex)",
    description: "Puede tirar dos veces y quedarse con el mejor resultado al usar conjuros de adivinación.",
  },
  {
    level: 4,
    name: "Esquiva Sobrehumana (Ex)",
    description: "Conserva su bonificador de Destreza a la CA aunque esté indefenso.",
  },
  {
    level: 6,
    name: "Esquiva Sobrehumana Mejorada (Ex)",
    description: "No puede ser flanqueado, salvo por atacantes con 4 o más niveles de pícaro que los suyos.",
  },
  {
    level: 10,
    name: "Inmune a Sorpresa (Ex)",
    description:
      "Nunca es sorprendido y siempre puede realizar una acción estándar durante un asalto de sorpresa, salvo que esté físicamente inmovilizado.",
  },
];

// ---------------------------------------------------------------------------
// Guardián del Dweomer (Dweomerkeeper)
// ---------------------------------------------------------------------------

const DWEOMERKEEPER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "En cada nivel gana conjuros por día como si hubiera ganado un nivel en una clase de lanzamiento de conjuros (arcana o divina) a la que pertenecía antes de esta clase de prestigio, con el nivel de lanzador correspondiente.",
  },
  {
    level: 1,
    name: "Manto de Conjuros 1",
    description:
      "En el nivel 1 elige un conjuro arcano o divino que sepa lanzar; puede transmutar conjuros preparados de igual o mayor nivel (del tipo correspondiente) en ese conjuro elegido. Añade un conjuro adicional al manto en los niveles 3, 5, 7 y 9 (hasta 5 conjuros en total).",
  },
  {
    level: 2,
    name: "Vista Arcana (Sp)",
    description: "Gana vista arcana a voluntad, mantenida mediante concentración en vez de tener una duración fija.",
  },
  {
    level: 4,
    name: "Conjuro Sobrenatural 1/día (Su)",
    description:
      "Una vez al día (aumentando en un uso adicional en cada nivel par posterior, hasta 4/día en nivel 10), puede lanzar cualquier conjuro preparado o conocido como una habilidad sobrenatural con tiempo de lanzamiento de acción estándar, sin componentes, sin provocar ataques de oportunidad y sin que la resistencia a conjuros del objetivo se aplique.",
  },
  {
    level: 10,
    name: "Manto de Misterios",
    description:
      "Las dotes de metamagia que conoce cuestan un nivel de conjuro menos al aplicarlas (mínimo +1, o +0 si el ajuste original ya era +0); esto no afecta a Intensificar Conjuro.",
  },
];

// ---------------------------------------------------------------------------
// Entropomante (Entropomancer)
// ---------------------------------------------------------------------------

const ENTROPOMANCER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Fragmento de Entropía",
    description:
      "Dos veces al día, crea una fuerza destructiva móvil que inflige 3d6 de daño (5d6 desde nivel 5, 7d6 desde nivel 9) a las criaturas en su espacio, con salvación de Fortaleza disponible; puede desplazarse hasta 9 m y ataca mediante un toque a distancia; dura hasta 1 asalto por nivel de clase.",
  },
  {
    level: 2,
    name: "Conjuros por Día",
    description:
      "En los niveles pares (2º, 4º, 6º, 8º, 10º) gana conjuros por día como si hubiera ganado un nivel en una clase de lanzamiento divino existente.",
  },
  {
    level: 3,
    name: "Campo Entrópico",
    description:
      "Dos veces al día, durante 1 asalto por nivel de clase, suprime la curación mágica en un radio de 1,5 m por nivel de clase.",
  },
  {
    level: 5,
    name: "Campo Entrópico (Repetir Tirada)",
    description:
      "Una vez por asalto mientras el campo está activo, puede forzar a un objetivo dentro de él a repetir una tirada de ataque, salvación o prueba de habilidad después de conocer el resultado pero antes de que se apliquen sus consecuencias.",
  },
  {
    level: 7,
    name: "Campo Entrópico (Hiriente)",
    description: "El campo entrópico gana la propiedad de herir.",
  },
  {
    level: 9,
    name: "Tirón Consumidor",
    description:
      "El fragmento de entropía ejerce una fuerza de arrastre (equivalente a un empujón con bonificador +11) sobre las criaturas en 4,5 m, atrayéndolas hacia su posición.",
  },
  {
    level: 10,
    name: "Control de Esfera",
    description:
      "Gana la capacidad de controlar una esfera de aniquilación como si usara un talismán, siendo personalmente inmune a sus efectos.",
  },
];

// ---------------------------------------------------------------------------
// Evangelista (Evangelist)
// ---------------------------------------------------------------------------

const EVANGELIST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Gran Orador — Inspirar Temor",
    description:
      "Requiere 9+ rangos en Interpretar. Como acción de asalto completo que requiere concentración, impone un penalizador de -4 en salvaciones de Voluntad a los enemigos en 9 m; el efecto dura mientras hable y 3 asaltos después.",
  },
  {
    level: 1,
    name: "Gran Orador — Inspirar Esperanza",
    description:
      "Requiere 9+ rangos en Interpretar. Igual que Inspirar Temor pero otorga a los aliados un bonificador sagrado de +4 en salvaciones de Voluntad.",
  },
  {
    level: 2,
    name: "Hablar Rápido",
    description:
      "Puede realizar pruebas de Diplomacia apresuradas como acción de asalto completo con solo un penalizador de -5, en vez de las restricciones normales.",
  },
  {
    level: 3,
    name: "Gran Orador — Enardecer a los Justos",
    description:
      "Requiere 11+ rangos en Interpretar. Los aliados en 9 m obtienen los beneficios de escudo de fuego, usando el nivel de evangelista +5 como nivel de lanzador; el fuego divino ignora la resistencia al fuego; acción de asalto completo con concentración, dura mientras hable y 3 asaltos después.",
  },
  {
    level: 4,
    name: "Maestría de Habilidad",
    description:
      "Elige 1 + modificador de Inteligencia habilidades de entre Farolear, Diplomacia, Disfrazarse, Intimidar y Sentir Motivaciones; puede tomar 10 en esas habilidades incluso bajo estrés o distracciones.",
  },
  {
    level: 5,
    name: "Gran Orador — Convertir al Infiel",
    description:
      "Requiere 13+ rangos en Interpretar. Un único enemigo en 9 m debe superar una salvación de Voluntad (CD 10 + nivel de clase + modificador de Carisma); si tiene éxito queda conmocionado 1 asalto; si falla, queda hechizado y adopta temporalmente el alineamiento del evangelista.",
  },
];

// ---------------------------------------------------------------------------
// Geomante (Geomancer)
// ---------------------------------------------------------------------------

const GEOMANCER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "El geomante no tiene tabla de conjuros propia: cada nivel de geomante añade un nivel efectivo a una de las clases lanzadoras (arcana o divina) que el personaje poseía antes de entrar en la clase de prestigio (a elegir por el jugador nivel a nivel), sin otorgar otros beneficios de esa clase.",
  },
  {
    level: 1,
    name: "Versatilidad de Conjuros",
    description:
      "Puede mezclar parámetros de lanzamiento arcano y divino para cualquier conjuro de nivel igual o menor a su puntuación de versatilidad de conjuros (0 en nivel 1, subiendo 1 punto por nivel hasta 9 en nivel 10). Puede lanzar conjuros arcanos con armadura sin fallo (salvo la prohibición druídica de armadura metálica), usar Sabiduría para la CD de conjuros arcanos o Carisma/Inteligencia para la CD de conjuros divinos, y sustituir componente material arcano por foco divino o viceversa.",
  },
  {
    level: 1,
    name: "Deriva (Etapa 1)",
    description:
      "En cada nivel de geomante, el personaje elige una deriva de la etapa correspondiente (1 a 5), acercándose gradualmente a la naturaleza. Las derivas de etapa 1 no tienen efecto de juego; desde la etapa 2 cada una otorga una habilidad extraordinaria permanente (bonos a Fuerza/Destreza, ataques naturales, sentidos especiales, velocidad de vuelo, veneno, etc.). Se deben tener al menos dos derivas de una etapa antes de poder elegir de la etapa siguiente.",
  },
  {
    level: 2,
    name: "Líneas Ley",
    description:
      "Elige un tipo de terreno (acuático, desierto, bosque, colinas, pantano, montañas o llanuras); en ese terreno su nivel de lanzador efectivo aumenta en +1. En los niveles 6 y 10 puede elegir un nuevo terreno (+1) o aumentar en +1 adicional un terreno ya elegido.",
  },
  {
    level: 3,
    name: "Deriva (Etapa 2)",
    description: "Puede elegir derivas de la etapa 2 a partir de este nivel.",
  },
  {
    level: 5,
    name: "Deriva (Etapa 3)",
    description: "Puede elegir derivas de la etapa 3 a partir de este nivel.",
  },
  {
    level: 7,
    name: "Deriva (Etapa 4)",
    description: "Puede elegir derivas de la etapa 4 a partir de este nivel.",
  },
  {
    level: 9,
    name: "Deriva (Etapa 5)",
    description: "Puede elegir derivas de la etapa 5 a partir de este nivel.",
  },
];

// ---------------------------------------------------------------------------
// Libertador Sagrado (Holy Liberator)
// ---------------------------------------------------------------------------

const HOLY_LIBERATOR_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Aura de Bien (Ex)",
    description: "El poder de su aura de bien es igual a su nivel de clase más su nivel de clérigo, si tiene alguno.",
  },
  {
    level: 1,
    name: "Detectar el Mal (Sp)",
    description: "Puede usar detectar el mal como habilidad sortílega a voluntad.",
  },
  {
    level: 1,
    name: "Aplastar el Mal (Su)",
    description:
      "Una vez al día, en un ataque cuerpo a cuerpo normal, añade su modificador de Carisma (si es positivo) a la tirada de ataque y causa 1 punto extra de daño por nivel de clase. Si golpea accidentalmente a una criatura no malvada, el efecto se pierde igualmente por ese día. A nivel 5, dos veces al día; a nivel 10, tres veces al día. Si ya posee una habilidad de aplastar el mal o similar, obtiene un uso extra por día (dos extra a nivel 7), con el bonificador de daño basado en el nivel combinado.",
  },
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "Lanza conjuros divinos según Sabiduría (Sab 10 + nivel del conjuro mínimo para lanzarlo); CD de salvación = 10 + nivel del conjuro + modificador de Sabiduría. Usa la lista de conjuros de paladín (sin descriptor de ley) más: 1º protección contra la ley; 2º heroísmo; 3º círculo mágico contra la ley; 4º disipar ley, libertad de movimiento. Prepara y lanza como un clérigo (pero no puede convertir espontáneamente en curar/infligir).",
  },
  {
    level: 2,
    name: "Eliminar Fatiga (Su)",
    description: "Con una acción estándar, elimina la fatiga de cualquier criatura que toque; usable 3 + modificador de Carisma veces al día.",
  },
  {
    level: 3,
    name: "Aura de Resolución (Ex)",
    description:
      "Inmunidad a todos los efectos de encantamiento y compulsión; cada aliado a 3 m gana +4 de bonificador de moral en salvaciones contra encantamiento/compulsión mientras el libertador sagrado esté consciente.",
  },
  {
    level: 4,
    name: "Gracia Divina (Su)",
    description: "Aplica su modificador de Carisma (si es positivo) como bonificador en todas las salvaciones.",
  },
  {
    level: 4,
    name: "Disipar Encantamiento (Sp)",
    description: "Puede usar disipar encantamiento una vez por semana; dos veces por semana a partir de nivel 8.",
  },
  {
    level: 6,
    name: "Compañero Celestial (Sp)",
    description:
      "Obtiene un compañero celestial (gato, águila, halcón, caballo de guerra, búho, poni, perro guardián o lobo) con la plantilla celestial. Una vez al día, como acción de asalto completo, puede invocarlo desde los reinos celestiales; permanece 2 horas por nivel de libertador sagrado y puede ser despedido como acción libre. Gana DG adicionales, ajuste de armadura natural, ajuste de Destreza e Inteligencia, y habilidades especiales según el nivel de personaje del libertador sagrado. Si el compañero muere, no puede llamar a otro durante 30 días o hasta ganar un nivel de la clase (lo que ocurra primero), sufriendo -1 en ataque y daño con armas durante ese periodo.",
  },
  {
    level: 1,
    name: "Código de Conducta",
    description:
      "Debe ser de alineamiento caótico bueno y pierde todas las habilidades especiales de clase si comete voluntariamente un acto malvado.",
  },
];

// ---------------------------------------------------------------------------
// Hospitalario (Hospitaler)
// ---------------------------------------------------------------------------

const HOSPITALER_CHOICES: ClassFeatureChoice[] = [
  {
    id: "hospitaler-dote-bono",
    featureName: "Dote de Bonificación",
    levels: [1, 5, 9],
    label: "Dote de bonificación de guerrero",
    kind: "dote_categoria",
    featCategoryOptions: ["combate"],
  },
];

const HOSPITALER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Imponer Manos (Su)",
    description:
      "Con Carisma 12 o superior, cura por contacto un total de puntos de golpe por día igual a su nivel de hospitalario × su modificador de Carisma; puede repartirlo entre varios receptores y usarlo en varias veces. Es una acción estándar. Si posee esta habilidad por otra clase, los niveles se suman para el total diario.",
  },
  {
    level: 2,
    name: "Conjuros por Día",
    description:
      "Excepto en los niveles 1, 5 y 9, cada nivel de hospitalario añade un nivel efectivo a una de las clases divinas lanzadoras que poseía antes de entrar en la clase de prestigio (a elección del jugador), sin ganar otros beneficios de esa clase.",
  },
  {
    level: 3,
    name: "Eliminar Enfermedad (Sp)",
    description: "Puede usar eliminar enfermedad como habilidad sortílega una vez por semana; dos veces por semana desde nivel 7.",
  },
  {
    level: 1,
    name: "Código de Conducta",
    description:
      "Voto de pobreza, obediencia y defensa de quienes están bajo su cuidado. Un hospitalario que se vuelve caótico, comete voluntariamente un acto caótico o viola gravemente el código pierde todos los rasgos de clase y conjuros, y no puede progresar en niveles de hospitalario hasta atonar. Si gana un nivel en una clase distinta de hospitalario o paladín, nunca más puede volver a subir de nivel de hospitalario (aunque conserva sus habilidades).",
  },
];

// ---------------------------------------------------------------------------
// Maestro de Sudarios (Master of Shrouds)
// ---------------------------------------------------------------------------

const MASTER_OF_SHROUDS_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Reprensión Extra (Ex)",
    description: "Puede usar su habilidad de reprender no-muertos 4 veces adicionales por día.",
  },
  {
    level: 1,
    name: "Reprender No-muertos (Su)",
    description:
      "Los niveles de maestro de sudarios se suman a los niveles de cualquier otra clase que otorgue reprender no-muertos para determinar el nivel de clérigo efectivo a este fin (p. ej., clérigo 7/maestro de sudarios 5 reprende como clérigo de nivel 12).",
  },
  {
    level: 2,
    name: "Invocar No-muertos (Sp)",
    description:
      "Puede invocar una o más criaturas no-muertas incorpóreas un número de veces por día igual a 3 + su modificador de Carisma (mínimo 1), como los conjuros de invocar monstruo. Nivel 2: una sombra; nivel 4: un espectro sombrío (wraith) o dos sombras; nivel 6: un espectro (spectre), dos espectros sombríos o cuatro sombras; nivel 8: una sombra mayor, dos espectros, cuatro espectros sombríos o cuatro sombras; nivel 10: un espectro sombrío terrible (dread wraith), dos sombras mayores, cuatro espectros, cuatro espectros sombríos o cuatro sombras.",
  },
  {
    level: 2,
    name: "Conjuros por Día",
    description:
      "Desde nivel 2, gana conjuros por día (y conocidos, si aplica) como si hubiera ganado un nivel en una de sus clases divinas lanzadoras previas (a elección del jugador), sin otros beneficios de esa clase (salvo la habilidad de reprender no-muertos, que sí se acumula).",
  },
  {
    level: 5,
    name: "Invocación Mejorada (Ex)",
    description: "Las criaturas no-muertas que invoca (por conjuro o por esta habilidad de clase) ganan +2 de bonificador de mejora en tiradas de ataque y daño.",
  },
];

// ---------------------------------------------------------------------------
// Guardián de la Luna (Moon Guardian)
// ---------------------------------------------------------------------------

const MOON_GUARDIAN_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Conjuro Natural",
    description: "Gana Conjuro Natural como dote de bonificación si no la tenía ya.",
  },
  {
    level: 1,
    name: "Cambio Voluntario (Ex)",
    description:
      "Puede cambiar voluntariamente a forma animal o híbrida sin cambiar de alineamiento permanentemente al de su especie licántropa. Sigue sujeto a transformación involuntaria en luna llena o al recibir daño en combate, pero fallar la prueba en esas circunstancias no cambia su alineamiento; además, tras fallar para recuperar forma humanoide puede reintentarlo cada ronda siguiente en vez de esperar al amanecer.",
  },
  {
    level: 2,
    name: "Conjuros por Día",
    description:
      "En cada nivel par de guardián de la luna, gana conjuros por día (y conocidos si aplica) como si hubiera ganado un nivel en la clase divina lanzadora que le dio acceso a conjuros de nivel 3 antes de entrar en la clase de prestigio, sin otros beneficios de esa clase.",
  },
  {
    level: 3,
    name: "Cambio Rápido (Ex)",
    description: "Puede hacer la prueba correspondiente como acción de movimiento en vez de acción estándar (sigue limitado a un cambio por ronda).",
  },
  {
    level: 5,
    name: "Cambio Instantáneo (Ex)",
    description: "Puede hacer la prueba correspondiente como acción libre, incluso en respuesta a la acción de otro aunque no sea su turno (sigue limitado a un cambio por ronda).",
  },
];

// ---------------------------------------------------------------------------
// Manto Nocturno (Nightcloak)
// ---------------------------------------------------------------------------

const NIGHTCLOAK_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Poder de la Oscuridad (Ex)",
    description: "Lanza cualquier conjuro con descriptor de oscuridad a +2 de nivel de lanzador.",
  },
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "En cada nivel de manto nocturno, el personaje gana conjuros por día (y conocidos si aplica) como si hubiera ganado un nivel en una de sus clases lanzadoras previas (a elección del jugador), sin otros beneficios de esa clase.",
  },
  {
    level: 2,
    name: "Ojos de la Noche (Ex)",
    description:
      "Sus ojos se vuelven totalmente negros, otorgando visión en la oscuridad a 18 m; también puede ver a través de oscuridad mágica hasta 3 m (visión en blanco y negro); no puede ser cegada por efectos mágicos.",
  },
  {
    level: 4,
    name: "Hablar en Sombras (Su)",
    description:
      "Como acción libre, puede susurrar mensajes cortos a otros devotos de su deidad patrona; cada uno dentro de 150 m lo oye como un susurro mental. Observadores cercanos pueden oír el susurro real. Es un efecto sónico dependiente del lenguaje.",
  },
  {
    level: 5,
    name: "Mentiras Verdaderas (Sp)",
    description:
      "Una vez al día, puede modificar la memoria de una criatura como el conjuro de bardo modificar memoria (nivel de lanzador = nivel de personaje; CD de salvación 10 + 1/2 nivel de manto nocturno + modificador de Carisma).",
  },
  {
    level: 7,
    name: "Gracia de la Oscuridad (Ex)",
    description: "Añade su bonificador de Inteligencia (si tiene) a todas las tiradas de salvación.",
  },
  {
    level: 8,
    name: "Sirvientes de la Noche (Sp)",
    description:
      "Una vez por semana como acción estándar, puede invocar una sombra por cada nivel de manto nocturno; las sombras la obedecen durante un número de rondas igual a su nivel de manto nocturno. Las sombras que estas creen al drenar Fuerza también quedan bajo su control, pero desaparecen junto con las originales cuando termina el efecto.",
  },
  {
    level: 10,
    name: "Voz del Mal Inefable (Sp)",
    description:
      "Una vez al día, puede dominar a una criatura como con el conjuro dominar monstruo (nivel de lanzador = nivel de personaje); dura 24 horas salvo que termine antes. A diferencia de la mayoría de habilidades sortílegas, tiene un componente verbal.",
  },
];

// ---------------------------------------------------------------------------
// Templario Piadoso (Pious Templar)
// ---------------------------------------------------------------------------

const PIOUS_TEMPLAR_CHOICES: ClassFeatureChoice[] = [
  {
    id: "pious-templar-dote-bono",
    featureName: "Dote de Bonificación",
    levels: [4, 8],
    label: "Dote de bonificación de guerrero",
    kind: "dote_categoria",
    featCategoryOptions: ["combate"],
  },
];

const PIOUS_TEMPLAR_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Templanza (Su)",
    description:
      "Si supera una salvación de Voluntad o Fortaleza que normalmente reduciría el efecto de un conjuro (entradas Voluntad parcial, Fortaleza mitad o similares), no sufre ningún efecto del conjuro.",
  },
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "Lanza conjuros divinos según Sabiduría (Sab 10 + nivel del conjuro mínimo para lanzarlo); CD = 10 + nivel del conjuro + modificador de Sabiduría. Prepara y lanza como un clérigo, pero no puede convertir espontáneamente en curar/infligir. Un templario piadoso bueno (o neutral de deidad buena) usa la lista de conjuros de paladín; uno malvado (o neutral de deidad malvada) usa la lista de blackguard; uno neutral con deidad neutral elige una de las dos listas de forma permanente.",
  },
  {
    level: 2,
    name: "Aplastar (Su)",
    description:
      "Una vez al día, puede hacer un único ataque cuerpo a cuerpo con +4 al ataque y bonificador de daño igual a su nivel de templario piadoso (si acierta); debe declarar el aplastar antes de atacar. Dos veces al día a nivel 6, tres veces al día a nivel 10. Si ya posee una habilidad de aplastar el mal o similar, obtiene un uso extra por día (dos extra a nivel 7), con el bonificador de daño basado en el nivel combinado.",
  },
  {
    level: 3,
    name: "Reducción de Daño (Ex)",
    description: "Reducción de daño 1/-; sube a 2/- a partir de nivel 7.",
  },
  {
    level: 3,
    name: "Especialización en Arma",
    description: "Gana la dote Especialización en Arma con el arma favorita de su deidad.",
  },
];

// ---------------------------------------------------------------------------
// Siervo Radiante de Pelor (Radiant Servant of Pelor)
// ---------------------------------------------------------------------------

const RADIANT_SERVANT_OF_PELOR_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Radiancia",
    description:
      "Cuando lanza cualquier conjuro con descriptor de luz, el radio de iluminación se duplica y el conjuro se trata como si fuera de un nivel más alto para todos los efectos, incluyendo contrarrestar/disipar conjuros de oscuridad.",
  },
  {
    level: 1,
    name: "Expulsión Mayor Extra",
    description: "Puede realizar una expulsión mayor (poder otorgado por el dominio del Sol) un número de veces por día igual a 3 + su modificador de Carisma.",
  },
  {
    level: 1,
    name: "Expulsar No-muertos",
    description: "Suma sus niveles de siervo radiante a sus niveles de clérigo para todos los efectos de expulsar no-muertos.",
  },
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "En cada nivel de siervo radiante de Pelor, el personaje gana conjuros por día (y conocidos si aplica) como si hubiera ganado un nivel en su clase divina lanzadora previa (a elección del jugador si tenía más de una), sin otros beneficios de esa clase.",
  },
  {
    level: 2,
    name: "Salud Divina (Ex)",
    description: "Inmunidad a todas las enfermedades, incluidas las mágicas.",
  },
  {
    level: 2,
    name: "Potenciar Curación (Ex)",
    description: "Al lanzar un conjuro de dominio del dominio de Curación, este se ve afectado como por la dote Potenciar Conjuro, sin usar un espacio de nivel superior.",
  },
  {
    level: 3,
    name: "Aura de Protección (Su)",
    description: "Él y sus aliados a 3 m ganan +2 de bonificador de moral en salvaciones de Voluntad.",
  },
  {
    level: 5,
    name: "Dominio de Bonificación",
    description: "Obtiene otro dominio de Pelor como tercer dominio de clérigo, o puede elegir el dominio de Gloria o Purificación; puede usar el poder otorgado del nuevo dominio y elegir conjuros de dominio entre los tres dominios.",
  },
  {
    level: 6,
    name: "Maximizar Curación (Ex)",
    description: "Al lanzar un conjuro de dominio de Curación, este se ve afectado como por la dote Maximizar Conjuro (sin usar espacio de nivel superior); reemplaza a potenciar curación hasta nivel 10.",
  },
  {
    level: 8,
    name: "Estallido de Energía Positiva (Su)",
    description:
      "Como acción estándar, crea un estallido que causa 1d6 puntos de daño por nivel de clase a todos los no-muertos en 30 m (salvación de Reflejos CD 10 + nivel de clase para mitad de daño); consume dos intentos de expulsión y no puede usarse con menos de dos intentos restantes ese día.",
  },
  {
    level: 10,
    name: "Curación Suprema (Ex)",
    description: "Al lanzar un conjuro de dominio de Curación, este se ve afectado tanto por Potenciar Conjuro como por Maximizar Conjuro, sin usar espacio de nivel superior.",
  },
];

// ---------------------------------------------------------------------------
// Siervo del Arcoíris (Rainbow Servant)
// ---------------------------------------------------------------------------

const RAINBOW_SERVANT_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Detectar el Mal (Sp)",
    description: "A voluntad, puede usar detectar el mal como el conjuro.",
  },
  {
    level: 1,
    name: "Dominio Extra (Bien)",
    description: "Gana el poder otorgado y el acceso a conjuros del dominio del Bien. Suele usar una pluma multicolor de couatl como foco divino.",
  },
  {
    level: 2,
    name: "Conjuros por Día",
    description:
      "En cada nivel de siervo del arcoíris, el personaje gana conjuros por día como si hubiera ganado un nivel en la clase arcana lanzadora que le daba acceso a conjuros arcanos de nivel 3 antes de entrar en la clase de prestigio (a elección del jugador si tenía más de una), sin otros beneficios de esa clase. No se ganan conjuros conocidos adicionales por esta vía.",
  },
  {
    level: 4,
    name: "Dominio Extra (Aire)",
    description: "Gana el poder otorgado y el acceso a conjuros del dominio del Aire.",
  },
  {
    level: 4,
    name: "Crecer Alas (Su)",
    description:
      "Puede hacer crecer alas emplumadas multicolores como las de un couatl, que permiten volar a velocidad 18 m con maniobrabilidad buena, con una duración diaria de 1 minuto por nivel de siervo del arcoíris (divisible a voluntad). Requiere una acción estándar para hacerlas crecer o desaparecer; la ropa u armadura restrictiva lo impide, y no puede hacerlo mientras está agarrando/agarrado.",
  },
  {
    level: 7,
    name: "Detectar el Caos (Sp)",
    description: "A voluntad, puede usar detectar el caos como el conjuro.",
  },
  {
    level: 7,
    name: "Dominio Extra (Ley)",
    description: "Gana el poder otorgado y el acceso a conjuros del dominio de la Ley.",
  },
  {
    level: 10,
    name: "Acceso a Conjuros de Clérigo",
    description:
      "Puede aprender y lanzar conjuros de la lista de clérigo aunque no aparezcan en las listas de sus otras clases lanzadoras (se lanzan como conjuros divinos si no están en las listas de mago/hechicero o bardo); no otorga espacios de conjuro extra, pero permite leer pergaminos y usar varitas/bastones con conjuros de clérigo.",
  },
  {
    level: 10,
    name: "Detectar Pensamientos (Sp)",
    description: "A voluntad, puede usar detectar pensamientos como el conjuro (CD de salvación basada en Carisma).",
  },
];

// ---------------------------------------------------------------------------
// Exorcista Sagrado (Sacred Exorcist)
// ---------------------------------------------------------------------------

const SACRED_EXORCIST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Exorcismo (Sob)",
    description:
      "Como acción de asalto completo, expulsa a una criatura o espíritu poseedor haciendo una prueba de nivel de clase (+ mod. de Carisma) contra CD 10 + DG del poseedor + su mod. de Carisma. Si iguala o supera la CD, expulsa al poseedor; el espíritu expulsado no puede intentar poseer a la misma víctima durante 24 horas.",
  },
  {
    level: 1,
    name: "Expulsar No-muertos (Sob)",
    description: "Expulsa no-muertos como un clérigo; si ya posee esta habilidad de otra clase, los niveles se acumulan para el nivel de expulsión efectivo.",
  },
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "Al ganar un nivel de exorcista sagrado, el personaje gana conjuros nuevos como si hubiera ganado un nivel en la clase lanzadora de conjuros que poseía antes de entrar en la clase de prestigio, sin obtener otros beneficios de esa clase.",
  },
  {
    level: 2,
    name: "Resistir Posesión (Ext)",
    description:
      "Otorga +4 sagrado a salvaciones contra jarra mágica o efectos similares (incluida la malevolencia de un fantasma), +2 sagrado en pruebas de disipar dichos efectos, y +2 sagrado en salvaciones contra conjuros y efectos de encantamiento y compulsión lanzados por criaturas extraplanares malignas o no-muertos.",
  },
  {
    level: 2,
    name: "Detectar el Mal (Sob)",
    description: "Puede usar detectar el mal a voluntad como habilidad sobrenatural.",
  },
  {
    level: 3,
    name: "Enemigo Elegido +1 (Ext)",
    description:
      "Elige no-muertos o externos malignos como enemigo elegido, obteniendo +1 de competencia en Farolear, Intimidar, Escuchar, Sentir Motivaciones y Avistar contra ese enemigo, y +1 en pruebas de nivel de lanzador para superar su resistencia a conjuros; sube a +2 en nivel 6 y a +3 en nivel 9.",
  },
  {
    level: 4,
    name: "Disipar el Mal 1/semana (Sob)",
    description: "Puede usar disipar el mal como habilidad sobrenatural una vez por semana; dos veces por semana en nivel 7; tres veces por semana en nivel 10.",
  },
  {
    level: 5,
    name: "Presencia Consagrada (Sob)",
    description:
      "Un aura de energía positiva de 6 m de radio lo rodea, duplicando el efecto de consagrar y moviéndose con él. Si entra en área afectada por profanar, ambos efectos se anulan mientras permanezca allí; si es objetivo de profanar, su aura se suprime durante la duración de ese conjuro.",
  },
  {
    level: 8,
    name: "Aura Sacra (Sob)",
    description: "Puede usar aura sacra una vez al día como habilidad sobrenatural.",
  },
];

// ---------------------------------------------------------------------------
// Puño Sagrado (Sacred Fist)
// ---------------------------------------------------------------------------

const SACRED_FIST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Bono de CA (Ext)",
    description:
      "Sin cargar peso y con armadura ligera o sin armadura, gana +1 a la Clase de Armadura (incluso contra ataques de toque o estando indefenso); sube a +2 en nivel 5 y +3 en nivel 10. Se pierde si está inmovilizado, indefenso, con armadura pesada, con escudo o con carga media/pesada.",
  },
  {
    level: 1,
    name: "Daño Sin Armas (Ext)",
    description:
      "Sus niveles de clase se suman a los de monje (si tiene) para determinar el daño sin armas; si no tiene niveles de monje previos, se le trata como monje de nivel igual a su nivel de puño sagrado.",
  },
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "Al ganar nivel de puño sagrado, obtiene conjuros nuevos como si hubiera subido de nivel en su clase divina previa, sin otros beneficios de esa clase; se suma el nivel de puño sagrado al de la otra clase lanzadora.",
  },
  {
    level: 3,
    name: "Movimiento Rápido (Ext)",
    description:
      "Gana un bonificador de mejora a la velocidad (se pierde con armadura media/pesada o carga media/pesada): +3 m en nivel 3, +6 m en nivel 6, +9 m en nivel 8.",
  },
  {
    level: 4,
    name: "Llamas Sagradas (Sob)",
    description:
      "Como acción estándar, invoca llamas en manos y pies que añaden daño extra sin armas igual al nivel de clase + mod. de Sabiduría; la mitad es daño de fuego (redondeado hacia arriba) y el resto es energía sagrada no reducible por resistencia al fuego. Dura 1 minuto, usable 1/día (2/día desde nivel 8).",
  },
  {
    level: 6,
    name: "Sentido Ciego (Sob)",
    description: "Sentido ciego hasta 3 m.",
  },
  {
    level: 10,
    name: "Armadura Interior (Ext)",
    description:
      "Puede invocar un bono sagrado de +4 a la CA, +4 sagrado a todas las salvaciones y reducción de conjuro 25 durante un número de asaltos igual a su mod. de Sabiduría; usable 1/día.",
  },
  {
    level: 1,
    name: "Código de Conducta",
    description:
      "Se niega a usar cualquier arma; si porta o usa un arma a sabiendas, pierde todos los conjuros y rasgos de clase y no avanza más como puño sagrado hasta expiar. Un puño sagrado multiclase que gane nivel en otra clase nunca puede volver a subir de nivel como puño sagrado (conserva sus habilidades ya obtenidas).",
  },
];

// ---------------------------------------------------------------------------
// Buscador de la Isla Brumosa (Seeker of the Misty Isle)
// ---------------------------------------------------------------------------

const SEEKER_OF_THE_MISTY_ISLE_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Dominio Extra (Viaje)",
    description: "Obtiene el poder concedido y acceso a conjuros del dominio Viaje.",
  },
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "Al subir de nivel, gana conjuros como si hubiera avanzado en la clase divina previa capaz de lanzar conjuros de nivel 2, sin otros beneficios de esa clase; se suma el nivel de esta clase de prestigio al de la otra clase lanzadora.",
  },
  {
    level: 4,
    name: "Pies Ligeros (Ext)",
    description:
      "Ignora la penalización de -5 por movimiento acelerado en Equilibrio, Trepar, Esconderse, Moverse Sigilosamente y Supervivencia (seguir rastros); la penalización por voltereta acelerada se reduce de -10 a -5.",
  },
  {
    level: 5,
    name: "Percepción de Corellon (Ext)",
    description:
      "+5 racial en Escuchar, Buscar y Avistar; además, una vez por asalto y por habilidad, puede reintentar detectar algo que falló antes como acción gratuita (normalmente sería acción de movimiento).",
  },
  {
    level: 5,
    name: "Pies Firmes (Ext)",
    description: "Ignora los modificadores de CD por superficie o terreno en Equilibrio, Moverse Sigilosamente y Voltereta.",
  },
  {
    level: 6,
    name: "Encontrar Camino (Sob)",
    description: "Puede usar encontrar camino sobre sí misma una vez al día como habilidad sobrenatural; nivel de lanzador igual a su nivel de clase.",
  },
  {
    level: 7,
    name: "Dominio Extra (Magia)",
    description: "Obtiene el poder concedido y acceso a conjuros del dominio Magia.",
  },
  {
    level: 9,
    name: "Visión Arcana (Sob)",
    description: "Tres veces al día puede usar visión arcana como el conjuro, con nivel de lanzador igual a su nivel de lanzador divino más alto.",
  },
  {
    level: 10,
    name: "Discernir Ubicación (Sob)",
    description: "Puede usar discernir ubicación una vez por semana como habilidad sobrenatural; nivel de lanzador igual a su nivel de clase.",
  },
];

// ---------------------------------------------------------------------------
// Hoja Brillante de Heironeous (Shining Blade of Heironeous)
// ---------------------------------------------------------------------------

const SHINING_BLADE_OF_HEIRONEOUS_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Filo Eléctrico (Sob)",
    description:
      "Dos veces al día como acción estándar, puede hacer que un arma cortante o perforante que sostiene se vuelva un arma de electricidad, causando 1d6 puntos extra de daño eléctrico al impactar; dura un número de asaltos igual a su nivel de clase + mod. de Carisma mientras siga sosteniendo el arma. Sube a 3/día en nivel 3.",
  },
  {
    level: 2,
    name: "Conjuros por Día",
    description:
      "En niveles pares, gana conjuros nuevos como si hubiera subido de nivel en su clase divina previa, sin otros beneficios de esa clase; se decide a qué clase se asigna cada nivel de esta clase de prestigio si tenía más de una clase divina capaz de lanzar conjuros de nivel 1.",
  },
  {
    level: 5,
    name: "Filo Sagrado (Sob)",
    description:
      "Reemplaza a filo eléctrico; usable 4/día (5/día en nivel 7). En cada uso puede elegir volver el arma eléctrica (+1d6 de daño eléctrico) o sagrada (+2d6 de daño contra criaturas malignas); los dos usos pueden solaparse en un mismo combate, pero el arma no puede duplicarse en el mismo tipo de bono.",
  },
  {
    level: 9,
    name: "Filo Brillante (Sob)",
    description:
      "Reemplaza a filo sagrado; usable 6/día. En cada uso puede elegir volver el arma eléctrica (+1d6), sagrada (+2d6 contra el mal) o de energía brillante (emite luz como una antorcha e ignora la materia no viva, incluidas armaduras, no-muertos, constructos y objetos). Los tres efectos pueden solaparse en el mismo combate, pero no duplicarse en el mismo tipo.",
  },
];

// ---------------------------------------------------------------------------
// Señor de la Tormenta (Stormlord)
// ---------------------------------------------------------------------------

const STORMLORD_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Jabalinas Mejoradas +1",
    description: "Toda jabalina lanzada por el señor de la tormenta cuenta como arma mágica +1; sube a +2 en nivel 6 y +3 en nivel 9.",
  },
  {
    level: 1,
    name: "Resistencia a Electricidad (Ext)",
    description: "Gana resistencia a electricidad 5 (nivel 1), 10 (nivel 4) y 15 (nivel 7); en nivel 9 obtiene inmunidad a electricidad.",
  },
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "En cada nivel de esta clase, gana conjuros como si hubiera subido de nivel en una clase divina previa, sin otros beneficios de esa clase; si tenía varias clases divinas, decide a cuál asignar cada nivel.",
  },
  {
    level: 2,
    name: "Arma Eléctrica (Sob)",
    description: "Toda lanza o jabalina que use se trata como arma eléctrica (+1d6 de daño extra por electricidad); pierde el efecto 1 asalto después de dejar la mano del señor de la tormenta.",
  },
  {
    level: 3,
    name: "Caminar en la Tormenta (Ext)",
    description:
      "Puede caminar o cabalgar a través de tormentas (naturales o mágicas) a su velocidad normal, sin verse afectado por vientos fuertes, precipitación intensa, objetos arrastrados por el viento, truenos u otros efectos de la furia de Talos.",
  },
  {
    level: 5,
    name: "Arma Atronadora (Sob)",
    description: "Toda lanza o jabalina que use se trata como arma atronadora; pierde el efecto 1 asalto tras dejar su mano; se acumula con el efecto de arma eléctrica.",
  },
  {
    level: 6,
    name: "Cabalgar la Tormenta (Sob)",
    description: "Puede volar durante cualquier tormenta como con el conjuro volar; los vientos adversos (incluso huracanados) no pueden derribarlo ni arrastrarlo.",
  },
  {
    level: 8,
    name: "Arma de Estallido Eléctrico (Sob)",
    description: "Toda lanza o jabalina que use se trata como arma de estallido eléctrico; pierde el efecto 1 asalto tras dejar su mano; se acumula con el efecto de arma atronadora.",
  },
  {
    level: 10,
    name: "Tormenta de Furia Elemental (Sob)",
    description: "Puede invocar una tormenta de gran magnitud una vez al día, usando tormenta de furia elemental como un clérigo de nivel 17.",
  },
];

// ---------------------------------------------------------------------------
// Saqueador del Templo de Olidammara (Temple Raider of Olidammara)
// ---------------------------------------------------------------------------

const TEMPLE_RAIDER_OF_OLIDAMMARA_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "Lanza un pequeño número de conjuros divinos propios de su propia lista; requiere Sabiduría mínima de 10 + nivel del conjuro. Los conjuros de bono se basan en Sabiduría y la CD de salvación es 10 + nivel del conjuro + mod. de Sabiduría. Prepara y lanza conjuros como un clérigo (sin lanzar curar/infligir de forma espontánea), y debe pasar 1 hora nocturna en contemplación silenciosa dedicada a Olidammara para recuperar sus conjuros.",
  },
  {
    level: 1,
    name: "Detectar Trampas (Ext)",
    description:
      "Como los pícaros, puede usar Buscar para localizar trampas con CD superior a 20, y usar Inutilizar Mecanismo para desactivar trampas mágicas. Si supera la CD de una trampa por 10 o más con Inutilizar Mecanismo, puede estudiarla y evitarla (junto a su grupo) sin desactivarla.",
  },
  {
    level: 1,
    name: "Sentido de Trampas +1 (Ext)",
    description: "+1 a salvaciones de Reflejos para evitar trampas y +1 de esquiva a la CA contra ataques de trampas; sube +1 cada tres niveles (a +2 en nivel 4, +3 en nivel 7, +4 en nivel 10).",
  },
  {
    level: 2,
    name: "Ataque Furtivo +1d6 (Ext)",
    description: "Funciona igual que el ataque furtivo del pícaro; +1d6 adicional cada tres niveles después. Si ya posee ataque furtivo de otra clase, los bonos de daño se acumulan.",
  },
  {
    level: 3,
    name: "Esquiva Sobrehumana (Ext)",
    description:
      "Conserva su mod. de Destreza a la CA aunque esté desprevenido o sea atacado por un enemigo invisible (lo pierde si está inmovilizado). Si ya la posee de otra clase, obtiene automáticamente esquiva sobrehumana mejorada en su lugar.",
  },
  {
    level: 6,
    name: "Esquiva Sobrehumana Mejorada (Ext)",
    description: "No puede ser flanqueado (salvo por un atacante con al menos 4 niveles de pícaro más que sus niveles de esta clase); los niveles de clases que otorgan esquiva sobrehumana se acumulan para determinar ese mínimo.",
  },
  {
    level: 9,
    name: "Maestría en Habilidades (Ext)",
    description: "Elige un número de habilidades igual a 3 + su mod. de Inteligencia; en pruebas con esas habilidades puede tomar 10 incluso bajo estrés o distracción.",
  },
  {
    level: 10,
    name: "Dominio de la Suerte",
    description:
      "Obtiene acceso al dominio Suerte (poder concedido, y sus conjuros se añaden a la lista de conjuros de esta clase, no a otras listas). Si ya posee el dominio Suerte, puede usar su poder concedido una vez adicional.",
  },
];

// ---------------------------------------------------------------------------
// Ur-sacerdote (Ur-priest)
// ---------------------------------------------------------------------------

const UR_PRIEST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Conjuros por Día",
    description:
      "Lanza conjuros divinos de la misma lista que el clérigo (requiere Sabiduría ≥ 10 + nivel del conjuro; conjuros de bono según Sabiduría; CD de salvación 10 + nivel del conjuro + mod. de Sabiduría). Prepara conjuros como un clérigo pero no reza por ellos, simplemente los toma; no lanza curar/infligir de forma espontánea, no tiene conjuros ni poderes de dominio, y no tiene restricciones de alineamiento en los conjuros. Nivel de lanzador = niveles de ur-sacerdote + la mitad de los niveles en otras clases lanzadoras (los niveles de clérigo de un ex-clérigo no cuentan).",
  },
  {
    level: 2,
    name: "Reprender No-muertos",
    description: "Reprende no-muertos como un clérigo malvado, usando su nivel de ur-sacerdote como nivel de clérigo para éxito y daño.",
  },
  {
    level: 4,
    name: "Resistencia a Conjuros Divina (Sob)",
    description: "Resistencia a conjuros 15 solo contra conjuros divinos y habilidades sobrenaturales tipo conjuro de criaturas extraplanares; sube a 20 en nivel 8.",
  },
  {
    level: 6,
    name: "Sifonear Poder de Conjuro (Ext)",
    description:
      "Puede sacrificar temporalmente dos o más espacios de conjuro de nivel bajo para preparar un conjuro de nivel superior (solo un intercambio por día). Se suman los niveles de los espacios sacrificados y se reducen a tres cuartos (redondeando hacia abajo) para obtener el nivel del espacio adicional; p. ej., sacrificar un conjuro de nivel 3 y uno de nivel 5 (3+5=8, 8×3/4=6) permite preparar un conjuro adicional de nivel 6.",
  },
  {
    level: 10,
    name: "Robar Habilidad Sobrenatural Tipo Conjuro (Sob)",
    description:
      "Una vez al día, si una criatura con habilidades tipo conjuro está a 15 m o menos, puede robar una de esas habilidades y usarla tantas veces como la criatura (máximo 3/día), con el nivel de lanzador y CD de la criatura; dura 24 horas y la criatura original no pierde la habilidad. No funciona con habilidades sobrenaturales (solo tipo conjuro) ni con habilidades que la criatura no posea.",
  },
];

// ---------------------------------------------------------------------------
// Discípulo del Vacío (Void Disciple)
// ---------------------------------------------------------------------------

const VOID_DISCIPLE_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Sentir el Vacío (Sob)",
    description:
      "Su conciencia se extiende fuera del cuerpo para percibir con sus sentidos normales un lugar, persona u objeto a distancia; requiere una prueba de Saber de Conjuros con CD según la distancia: línea de visión CD 5, hasta 1,6 km CD 10, hasta 16 km CD 15, hasta 160 km CD 20, hasta 1600 km CD 25 (no funciona a través de fronteras planares). Usable 1/día en nivel 1, +1 uso cada 2 niveles. Desde nivel 5 puede usar detectar magia y detectar el mal a voluntad como parte de esta habilidad; desde nivel 9, discernir mentiras y lectura de estados emocionales (+10 en Sentir Motivaciones); desde nivel 13, detectar pensamientos a voluntad.",
  },
  {
    level: 2,
    name: "Conjuros por Día",
    description:
      "En los niveles 2, 4, 5, 6, 8, 10, 11 y 12, gana conjuros nuevos como si hubiera subido un nivel en una clase lanzadora previa (arcana o divina), sin otros beneficios de esa clase.",
  },
  {
    level: 4,
    name: "Momento de Claridad (Sob)",
    description: "Como acción estándar, toca a un aliado para otorgarle temporalmente una dote o un número de rangos en una habilidad igual a su modificador de característica relevante; dura 1 asalto por nivel del discípulo del vacío. Usable 2/día en nivel 4, +1 uso cada 4 niveles adicionales.",
  },
  {
    level: 7,
    name: "Alterar el Rumbo (Sob)",
    description: "Una vez al día, añade +20 a una sola tirada de ataque, prueba de habilidad o prueba de característica propia (no transferible); no requiere acción y dura solo esa prueba.",
  },
  {
    level: 10,
    name: "Liberación del Vacío (Sob)",
    description: "Tres veces al día, toca a un aliado permitiéndole usar su modificador de característica más alto en lugar de otro modificador más bajo (a elección del objetivo) durante un número de asaltos igual a la mitad del nivel del discípulo del vacío.",
  },
  {
    level: 12,
    name: "Supresión del Vacío (Sob)",
    description: "Una vez al día, mediante ataque de toque cuerpo a cuerpo, fuerza al objetivo a usar su modificador de característica más bajo en lugar de uno más alto (a elección del discípulo del vacío) durante 5 asaltos.",
  },
  {
    level: 13,
    name: "Golpe del Vacío (Sob)",
    description:
      "Una vez al día, mediante ataque de toque cuerpo a cuerpo, otorga 1d4 niveles negativos al objetivo (el discípulo del vacío gana 5 puntos de golpe temporales por cada nivel negativo otorgado); si el objetivo alcanza tantos niveles negativos como DG, muere. Los niveles negativos se recuperan tras 13 horas si sobrevive. Esta habilidad se basa en el dominio del vacío, no en energía negativa, por lo que no beneficia a no-muertos.",
  },
];

// ---------------------------------------------------------------------------
// Sacerdote de Guerra (Warpriest)
// ---------------------------------------------------------------------------

const WARPRIEST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Dominio de Bono",
    description: "Obtiene el dominio Gloria (si expulsa no-muertos) o el dominio Dominación (si reprende no-muertos).",
  },
  {
    level: 1,
    name: "Arengar (Ext)",
    description: "Como acción estándar, si no sufre actualmente un efecto de miedo, permite a los aliados a 18 m que puedan oírlo y sufran un efecto de miedo repetir la salvación contra ese efecto, con +1 de bono de moral por nivel de sacerdote de guerra.",
  },
  {
    level: 1,
    name: "Expulsar o Reprender No-muertos (Sob)",
    description: "Los niveles de sacerdote de guerra se suman a los de clérigo o paladín del personaje para expulsar o reprender no-muertos.",
  },
  {
    level: 2,
    name: "Enardecer +2 (Ext)",
    description: "Como acción de asalto completo, todos los que puedan oírlo obtienen un bono de moral en salvaciones contra efectos de encantamiento (miedo) o de espanto; el bono sube +2 cada nivel par posterior (+4 en nivel 4, +6 en nivel 6, +8 en nivel 10); dura 5 minutos tras terminar el discurso más 1 minuto por nivel de sacerdote de guerra; el propio sacerdote de guerra también recibe el bono.",
  },
  {
    level: 2,
    name: "Conjuros por Día",
    description: "En niveles pares, gana conjuros divinos nuevos como si hubiera subido de nivel en su clase divina previa, sin otros beneficios de esa clase.",
  },
  {
    level: 3,
    name: "Curar Heridas Leves en Masa (Sob)",
    description: "Puede usar curar heridas leves en masa una vez al día como habilidad sobrenatural, con nivel de lanzador igual a su nivel de lanzador divino más alto.",
  },
  {
    level: 5,
    name: "Aura de Miedo (Sob)",
    description: "Una vez al día, puede emanar un aura de miedo en radio de 6 m durante 1 asalto por nivel; los enemigos deben superar una salvación de Voluntad (CD 10 + nivel de clase + mod. de Carisma) o sufrir el efecto de un conjuro de miedo.",
  },
  {
    level: 6,
    name: "Festín de Héroes (Sob)",
    description: "Puede usar festín de héroes una vez al día como habilidad sobrenatural.",
  },
  {
    level: 7,
    name: "Prisa (Sob)",
    description: "Puede usar prisa como habilidad sobrenatural tres veces al día.",
  },
  {
    level: 9,
    name: "Curar en Masa (Sob)",
    description: "Puede usar curar en masa una vez al día como habilidad sobrenatural, con nivel de lanzador igual a su nivel de lanzador divino más alto.",
  },
  {
    level: 10,
    name: "Enemigo Implacable (Sob)",
    description:
      "Mediante acción de movimiento (y concentración para mantenerlo cada asalto), emana un aura de 30 m de radio en la que los aliados pueden ignorar los efectos de quedar a 0 pv o menos (mueren de inmediato solo a -20 pv); al terminar el efecto o alejarse más de 30 m, se aplican de inmediato los efectos normales del daño. Afecta a aliados vivos si el sacerdote de guerra expulsa no-muertos, o a no-muertos si los reprende.",
  },
];

export const CDV_CLASSES: ClassDef[] = [
  // ---------------------------------------------------------------------
  // Clases base
  // ---------------------------------------------------------------------
  {
    id: "cdv-favored-soul",
    name: "Alma Predilecta (Favored Soul)",
    source: "complete-divine",
    description:
      "Un lanzador divino tocado directamente por su deidad desde el nacimiento, que canaliza el poder sagrado de forma espontánea y natural, sin necesidad de estudio ni oración formal, de un modo análogo a como el hechicero canaliza la magia arcana.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "heal",
      "knowledge-religion",
      "profession",
      "ride",
      "spellcraft",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples", "el arma predilecta de su deidad"],
    armorProficiencies: ["armadura ligera", "armadura media", "escudos (excepto escudos torre)"],
    spellcasting: {
      type: "espontaneo",
      ability: "cha",
      spellListId: "cdv-favored-soul",
      maxSpellLevel: 9,
      spellsPerDay: CDV_SPONTANEOUS_DIVINE_SPELLS_PER_DAY,
      spellsKnown: CDV_SPONTANEOUS_DIVINE_SPELLS_KNOWN,
      startLevel: 1,
    },
    features: FAVORED_SOUL_FEATURES,
    choices: FAVORED_SOUL_CHOICES,
    maxLevel: 20,
  },
  {
    id: "cdv-spirit-shaman",
    name: "Chamán Espiritual (Spirit Shaman)",
    source: "complete-divine",
    description:
      "Una lanzadora divina que se comunica de forma intuitiva y espontánea con los espíritus de la naturaleza, extrayendo su magia de ese vínculo en vez de prepararla mediante meditación como hace el druida.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "handle-animal",
      "heal",
      "knowledge-nature",
      "knowledge-religion",
      "listen",
      "profession",
      "ride",
      "sense-motive",
      "spellcraft",
      "spot",
      "survival",
      "swim",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples"],
    armorProficiencies: ["armadura ligera", "escudos (excepto escudos torre)"],
    spellcasting: {
      type: "espontaneo",
      ability: "wis",
      spellListId: "cdv-spirit-shaman",
      maxSpellLevel: 9,
      spellsPerDay: CDV_SPONTANEOUS_DIVINE_SPELLS_PER_DAY,
      spellsKnown: CDV_SPONTANEOUS_DIVINE_SPELLS_KNOWN,
      startLevel: 1,
    },
    features: SPIRIT_SHAMAN_FEATURES,
    maxLevel: 20,
  },

  // ---------------------------------------------------------------------
  // Clases de prestigio (las 28 de Complete Divine)
  // ---------------------------------------------------------------------
  {
    id: "cdv-black-flame-zealot",
    name: "Zelote de la Llama Negra (Black Flame Zealot)",
    source: "complete-divine",
    description:
      "Un asesino religioso que combina el sigilo y el ataque furtivo con conjuros divinos, dedicado a eliminar a los enemigos de su fe en nombre de una orden secreta.",
    hitDie: 6,
    skillPointsPerLevel: 4,
    classSkills: [
      "balance",
      "climb",
      "concentration",
      "craft",
      "escape-artist",
      "hide",
      "jump",
      "knowledge-religion",
      "listen",
      "move-silently",
      "open-lock",
      "profession",
      "search",
      "sleight-of-hand",
      "spellcraft",
      "spot",
      "swim",
      "tumble",
      "use-rope",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "buena", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: BLACK_FLAME_ZEALOT_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento no bueno" },
      { description: "Ocultarse: 8 rangos", check: (ctx) => (ctx.skillRanks["hide"] ?? 0) >= 8 },
      { description: "Saber (Religión): 8 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 8 },
      { description: "Moverse Sigilosamente: 8 rangos", check: (ctx) => (ctx.skillRanks["move-silently"] ?? 0) >= 8 },
      { description: "Competencia con Arma Exótica (kukri)", check: (ctx) => ctx.featIds.has("exotic-weapon-proficiency") },
      { description: "Voluntad de Hierro", check: (ctx) => ctx.featIds.has("iron-will") },
      { description: "Capacidad de lanzar conjuros divinos de nivel 2", check: (ctx) => ctx.casterLevel >= 3 },
      { description: "Debe tener el rasgo de ataque furtivo +1d6" },
      { description: "Debe venerar a la deidad de la orden y haber matado a un enemigo de la fe únicamente para poder unirse a la Orden de la Llama Negra" },
    ],
  },
  {
    id: "cdv-blighter",
    name: "Devastador (Blighter)",
    source: "complete-divine",
    description:
      "Un ex druida que ha abandonado la comunión equilibrada con la naturaleza por un poder más destructivo, capaz de marchitar la vida vegetal y animar cadáveres de animales.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "handle-animal",
      "heal",
      "knowledge-nature",
      "listen",
      "profession",
      "spellcraft",
      "spot",
      "survival",
      "swim",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    spellcasting: {
      type: "preparado",
      ability: "wis",
      spellListId: "cdv-blighter",
      maxSpellLevel: 9,
      spellsPerDay: CDV_PRESTIGE_FULL_DIVINE_SPELLS_PER_DAY,
      startLevel: 1,
    },
    features: BLIGHTER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador Base de Ataque +4", check: (ctx) => ctx.babTotal >= 4 },
      { description: "Alineamiento no bueno" },
      { description: "Debe ser un ex druida previamente capaz de lanzar conjuros de druida de nivel 3" },
      { description: "Rango en Oficio (herbolario)" },
    ],
  },
  {
    id: "cdv-church-inquisitor",
    name: "Inquisidor de la Iglesia (Church Inquisitor)",
    source: "complete-divine",
    description:
      "Un agente de una fe organizada dedicado a detectar la herejía, la mentira y la infiltración dentro de su propia orden religiosa, combinando conjuros de detección con un instinto perfeccionado para descubrir el engaño.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "bluff",
      "concentration",
      "decipher-script",
      "diplomacy",
      "gather-information",
      "intimidate",
      "knowledge-arcana",
      "knowledge-local",
      "knowledge-religion",
      "knowledge-the-planes",
      "search",
      "sense-motive",
      "spellcraft",
      "spot",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: CHURCH_INQUISITOR_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento legal bueno o legal neutral" },
      { description: "Saber (Arcano): 4 rangos", check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 4 },
      { description: "Saber (Religión): 4 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 4 },
      { description: "Saber de Conjuros: 4 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 4 },
      { description: "Bonificador base de salvación de Voluntad +3" },
      { description: "Capaz de lanzar zona de verdad como conjuro divino" },
      { description: "Debe ser miembro de una iglesia u orden religiosa legal buena, y debe haber descubierto ya alguna corrupción dentro de dicha organización" },
    ],
  },
  {
    id: "cdv-consecrated-harrier",
    name: "Acosador Consagrado (Consecrated Harrier)",
    source: "complete-divine",
    description:
      "Un cazador sagrado enviado por su iglesia para localizar y destruir a un enemigo concreto, combinando el rastreo y la persecución de un explorador con el poder de la fe.",
    hitDie: 10,
    skillPointsPerLevel: 4,
    classSkills: [
      "bluff",
      "climb",
      "diplomacy",
      "disguise",
      "gather-information",
      "intimidate",
      "knowledge-local",
      "profession",
      "ride",
      "search",
      "use-rope",
    ],
    babProgression: "completa",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    spellcasting: {
      type: "preparado",
      ability: "wis",
      spellListId: "ranger",
      maxSpellLevel: 4,
      spellsPerDay: CDV_PRESTIGE_QUARTER_DIVINE_SPELLS_PER_DAY,
      startLevel: 1,
    },
    features: CONSECRATED_HARRIER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador Base de Ataque +5", check: (ctx) => ctx.babTotal >= 5 },
      { description: "Alineamiento cualquiera legal" },
      { description: "Disfrazarse: 5 rangos", check: (ctx) => (ctx.skillRanks["disguise"] ?? 0) >= 5 },
      { description: "Reunir Información: 5 rangos", check: (ctx) => (ctx.skillRanks["gather-information"] ?? 0) >= 5 },
      { description: "Rastrear", check: (ctx) => ctx.featIds.has("track") },
      { description: "Debe haber recibido un encargo de su iglesia para localizar y destruir a un enemigo específico" },
    ],
  },
  {
    id: "cdv-contemplative",
    name: "Contemplativo (Contemplative)",
    source: "complete-divine",
    description:
      "Un lanzador divino que profundiza en su fe a través de la meditación y el contacto directo con lo sagrado, ganando dominio sobre su propio cuerpo y una resistencia casi eterna.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "heal",
      "intimidate",
      "knowledge-religion",
      "profession",
      "sense-motive",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: CONTEMPLATIVE_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Saber (Religión): 13 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 13 },
      { description: "Capaz de lanzar conjuros divinos de nivel 1", check: (ctx) => ctx.casterLevel >= 1 },
      { description: "Debe haber tenido contacto directo con su deidad patrona, un sirviente de ella, o un ser iluminado" },
    ],
  },
  {
    id: "cdv-divine-crusader",
    name: "Cruzado Divino (Divine Crusader)",
    source: "complete-divine",
    description:
      "Un campeón marcial que consagra su combate a un único dominio de su deidad, ganando resistencias elementales y, con el tiempo, una naturaleza semidivina.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: ["climb", "concentration", "craft", "diplomacy", "intimidate", "jump", "knowledge-religion", "ride", "swim"],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    spellcasting: {
      type: "preparado",
      ability: "cha",
      spellListId: "cdv-divine-crusader",
      maxSpellLevel: 9,
      spellsPerDay: CDV_DIVINE_CRUSADER_SPELLS_PER_DAY,
      startLevel: 1,
    },
    features: DIVINE_CRUSADER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador Base de Ataque +7", check: (ctx) => ctx.babTotal >= 7 },
      { description: "Alineamiento debe coincidir exactamente con el de la deidad elegida" },
      { description: "Saber (Religión): 2 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 2 },
      { description: "Especialización en Arma con el arma favorita de la deidad elegida", check: (ctx) => ctx.featIds.has("weapon-focus") },
    ],
  },
  {
    id: "cdv-divine-oracle",
    name: "Oráculo Divino (Divine Oracle)",
    source: "complete-divine",
    description:
      "Un lanzador divino cuya fe le concede visiones fragmentarias de las intenciones de su deidad, agudizando sus sentidos y su percepción del futuro cercano además de seguir progresando en su magia sagrada.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "heal", "intimidate", "knowledge-arcana", "knowledge-religion", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: DIVINE_ORACLE_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Saber (Religión): 8 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 8 },
      { description: "Enfoque de Habilidad (Saber [Religión])", check: (ctx) => ctx.featIds.has("skill-focus") },
      { description: "Capaz de lanzar al menos 2 conjuros de adivinación" },
    ],
  },
  {
    id: "cdv-dweomerkeeper",
    name: "Guardián del Dweomer (Dweomerkeeper)",
    source: "complete-divine",
    description:
      "Un maestro artesano mágico que domina tanto la magia arcana como la divina, capaz de improvisar conjuros preparados en otros distintos y de lanzar magia como si fuera un poder innato.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "heal",
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
      "profession",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: DWEOMERKEEPER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Saber (Arcano): 8 rangos", check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 8 },
      { description: "Saber de Conjuros: 8 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 8 },
      { description: "Cualquier dote de creación de objetos y cualquier dote de metamagia" },
      { description: "Capacidad de lanzar conjuros tanto arcanos como divinos" },
      { description: "Acceso al dominio de la Magia, si es lanzador de dominio" },
      { description: "El candidato debe haber creado al menos un objeto mágico, ya sea de naturaleza permanente o no" },
    ],
  },
  {
    id: "cdv-entropomancer",
    name: "Entropomante (Entropomancer)",
    source: "complete-divine",
    description:
      "Un lanzador divino que abraza el caos entrópico y la disolución, capaz de crear fragmentos de destrucción pura y de suprimir la curación mágica en torno a sí mismo.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "heal", "intimidate", "knowledge-arcana", "knowledge-local", "knowledge-religion", "profession", "spellcraft"],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: ENTROPOMANCER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento no bueno" },
      { description: "Concentración: 5 rangos", check: (ctx) => (ctx.skillRanks["concentration"] ?? 0) >= 5 },
      { description: "Saber (Arcano): 5 rangos", check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 5 },
      { description: "Gran Fortaleza", check: (ctx) => ctx.featIds.has("great-fortitude") },
      { description: "Aptitud Mágica", check: (ctx) => ctx.featIds.has("magical-aptitude") },
      { description: "Capaz de lanzar conjuros divinos de nivel 4", check: (ctx) => ctx.casterLevel >= 7 },
    ],
  },
  {
    id: "cdv-evangelist",
    name: "Evangelista (Evangelist)",
    source: "complete-divine",
    description:
      "Un orador carismático capaz de inspirar temor o esperanza con su sola voz, difundiendo la palabra de su deidad y convirtiendo a los incrédulos por la fuerza de su elocuencia.",
    hitDie: 6,
    skillPointsPerLevel: 6,
    classSkills: [
      "bluff",
      "craft",
      "diplomacy",
      "disguise",
      "escape-artist",
      "intimidate",
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
      "listen",
      "perform",
      "profession",
      "sense-motive",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: EVANGELIST_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento debe coincidir con el de la deidad elegida (como un clérigo de esa deidad)" },
      { description: "Farolear: 8 rangos", check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 8 },
      { description: "Reunir Información: 5 rangos", check: (ctx) => (ctx.skillRanks["gather-information"] ?? 0) >= 5 },
      { description: "Saber (Religión): 5 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 5 },
      { description: "Interpretar (oratoria): 6 rangos" },
      { description: "Sentir Motivaciones: 5 rangos", check: (ctx) => (ctx.skillRanks["sense-motive"] ?? 0) >= 5 },
      { description: "Negociador o Persuasivo", check: (ctx) => ctx.featIds.has("negotiator") || ctx.featIds.has("persuasive") },
    ],
  },
  {
    id: "cdv-geomancer",
    name: "Geomante (Geomancer)",
    source: "complete-divine",
    description:
      "Un lanzador que funde la magia arcana y la divina bajo el prisma de la naturaleza y la geografía sagrada, acercándose gradualmente a una existencia más elemental y salvaje.",
    hitDie: 6,
    skillPointsPerLevel: 4,
    classSkills: [
      "climb",
      "concentration",
      "craft",
      "diplomacy",
      "handle-animal",
      "heal",
      "knowledge-arcana",
      "knowledge-geography",
      "knowledge-nature",
      "spellcraft",
      "survival",
      "swim",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: GEOMANCER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Saber (Arcano): 6 rangos", check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 6 },
      { description: "Saber (Naturaleza): 6 rangos", check: (ctx) => (ctx.skillRanks["knowledge-nature"] ?? 0) >= 6 },
      { description: "Capaz de lanzar conjuros arcanos de nivel 2" },
      { description: "Capaz de lanzar conjuros divinos de nivel 2" },
    ],
  },
  {
    id: "cdv-holy-liberator",
    name: "Libertador Sagrado (Holy Liberator)",
    source: "complete-divine",
    description:
      "Un campeón divino de alineamiento caótico bueno que ha rechazado el rígido código de conducta del paladín tradicional en favor de la lucha activa contra la tiranía, la esclavitud y el dominio de la voluntad ajena.",
    hitDie: 10,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "diplomacy", "handle-animal", "heal", "intimidate", "knowledge-religion", "profession", "ride", "sense-motive"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "mala" },
    weaponProficiencies: ["armas simples", "armas marciales"],
    armorProficiencies: ["armadura ligera", "armadura media", "armadura pesada", "escudos"],
    spellcasting: {
      type: "preparado",
      ability: "wis",
      spellListId: "paladin",
      maxSpellLevel: 4,
      spellsPerDay: CDV_PRESTIGE_QUARTER_DIVINE_SPELLS_PER_DAY,
      startLevel: 1,
    },
    features: HOLY_LIBERATOR_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 },
      { description: "Alineamiento caótico bueno" },
      { description: "Diplomacia: 5 rangos", check: (ctx) => (ctx.skillRanks["diplomacy"] ?? 0) >= 5 },
      { description: "Sentir Motivaciones: 5 rangos", check: (ctx) => (ctx.skillRanks["sense-motive"] ?? 0) >= 5 },
      { description: "Voluntad de Hierro", check: (ctx) => ctx.featIds.has("iron-will") },
    ],
  },
  {
    id: "cdv-hospitaler",
    name: "Hospitalario (Hospitaler)",
    source: "complete-divine",
    description:
      "Un caballero divino consagrado al voto de pobreza y al cuidado de los enfermos y necesitados, que combina el combate montado con la imposición de manos.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "diplomacy", "handle-animal", "heal", "knowledge-religion", "profession", "ride"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "mala" },
    weaponProficiencies: ["armas simples", "armas marciales"],
    armorProficiencies: ["armadura ligera", "armadura media", "armadura pesada", "escudos"],
    features: HOSPITALER_FEATURES,
    choices: HOSPITALER_CHOICES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 },
      { description: "Alineamiento cualquiera no caótico" },
      { description: "Manejar Animales: 5 rangos", check: (ctx) => (ctx.skillRanks["handle-animal"] ?? 0) >= 5 },
      { description: "Montar: 5 rangos", check: (ctx) => (ctx.skillRanks["ride"] ?? 0) >= 5 },
      { description: "Combate Montado", check: (ctx) => ctx.featIds.has("mounted-combat") },
      { description: "Ataque de Pasada", check: (ctx) => ctx.featIds.has("ride-by-attack") },
      { description: "Capaz de lanzar conjuros divinos de nivel 1", check: (ctx) => ctx.casterLevel >= 1 },
    ],
  },
  {
    id: "cdv-master-of-shrouds",
    name: "Maestro de Sudarios (Master of Shrouds)",
    source: "complete-divine",
    description:
      "Un lanzador divino que ha dedicado su fe al control y perfeccionamiento de los no-muertos incorpóreos, envolviéndose él mismo en sudarios de sombra que difuminan la línea entre la vida y la no vida.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "diplomacy", "hide", "knowledge-arcana", "knowledge-religion", "profession", "spellcraft"],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: MASTER_OF_SHROUDS_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento no bueno" },
      { description: "Concentración: 5 rangos", check: (ctx) => (ctx.skillRanks["concentration"] ?? 0) >= 5 },
      { description: "Saber (Religión): 5 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 5 },
      { description: "Saber de Conjuros: 5 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 5 },
      { description: "Aumentar Invocación", check: (ctx) => ctx.featIds.has("augment-summoning") },
      { description: "Foco en Conjuros (Conjuración)", check: (ctx) => ctx.featIds.has("spell-focus") },
      { description: "Bonificador base de salvación de Voluntad +5" },
      { description: "Capaz de lanzar protección contra el bien como conjuro divino" },
      { description: "Capacidad de reprender no-muertos" },
    ],
  },
  {
    id: "cdv-moon-guardian",
    name: "Guardián de la Luna (Moon Guardian)",
    source: "complete-divine",
    description:
      "Un lanzador divino de alineamiento bueno que ha aceptado su condición de licántropo aquejado y aprende a dominar su transformación en vez de temerla.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "knowledge-religion", "spellcraft"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: MOON_GUARDIAN_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento cualquiera bueno" },
      { description: "Capacidad de lanzar conjuros divinos de nivel 3", check: (ctx) => ctx.casterLevel >= 5 },
      { description: "El candidato debe ser un licántropo aquejado consciente de su condición" },
    ],
  },
  {
    id: "cdv-nightcloak",
    name: "Manto Nocturno (Nightcloak)",
    source: "complete-divine",
    description:
      "Una devota malvada de la oscuridad y el engaño que extiende su influencia mediante susurros mentales, sombras sirvientes y una voz capaz de doblegar voluntades.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: [
      "bluff",
      "concentration",
      "craft",
      "diplomacy",
      "heal",
      "hide",
      "knowledge-arcana",
      "knowledge-history",
      "knowledge-religion",
      "knowledge-the-planes",
      "profession",
      "sense-motive",
      "spellcraft",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: NIGHTCLOAK_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador base de ataque +3", check: (ctx) => ctx.babTotal >= 3 },
      { description: "Alineamiento cualquiera malvado" },
      { description: "Engañar: 2 rangos", check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 2 },
      { description: "Esconderse: 4 rangos", check: (ctx) => (ctx.skillRanks["hide"] ?? 0) >= 4 },
      { description: "Moverse Sigilosamente: 2 rangos", check: (ctx) => (ctx.skillRanks["move-silently"] ?? 0) >= 2 },
      { description: "Interpretar (cualquiera): 4 rangos" },
      { description: "Voluntad de Hierro", check: (ctx) => ctx.featIds.has("iron-will") },
      { description: "Foco en Conjuros (Encantamiento, Ilusión o Nigromancia)", check: (ctx) => ctx.featIds.has("spell-focus") },
      { description: "Capacidad de lanzar conjuros divinos de nivel 3", check: (ctx) => ctx.casterLevel >= 5 },
      { description: "Un candidato clérigo debe tener acceso al dominio del Mal" },
    ],
  },
  {
    id: "cdv-pious-templar",
    name: "Templario Piadoso (Pious Templar)",
    source: "complete-divine",
    description:
      "Un guerrero de fe inquebrantable, tan capaz de servir a un dios bueno como a uno malvado, que combina la resistencia mental de un devoto con golpes que aplastan a sus enemigos.",
    hitDie: 10,
    skillPointsPerLevel: 2,
    classSkills: ["climb", "concentration", "craft", "heal", "jump", "knowledge-religion", "profession", "swim"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    spellcasting: {
      type: "preparado",
      ability: "wis",
      spellListId: "paladin",
      maxSpellLevel: 4,
      spellsPerDay: CDV_PIOUS_TEMPLAR_SPELLS_PER_DAY,
      startLevel: 1,
    },
    features: PIOUS_TEMPLAR_FEATURES,
    choices: PIOUS_TEMPLAR_CHOICES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 },
      { description: "Saber (Religión): 4 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 4 },
      { description: "Verdadero Creyente" },
      { description: "Enfoque en Arma con el arma favorita de su deidad", check: (ctx) => ctx.featIds.has("weapon-focus") },
    ],
  },
  {
    id: "cdv-radiant-servant-of-pelor",
    name: "Siervo Radiante de Pelor (Radiant Servant of Pelor)",
    source: "complete-divine",
    description:
      "Un clérigo devoto de Pelor especializado en la curación y la luz sagrada, capaz de potenciar sus conjuros de curación y de desatar estallidos de energía positiva contra los no-muertos.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "diplomacy", "heal", "knowledge-arcana", "knowledge-religion", "profession", "sense-motive", "spellcraft"],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples", "armas marciales"],
    armorProficiencies: ["armadura ligera", "armadura media", "armadura pesada", "escudos"],
    features: RADIANT_SERVANT_OF_PELOR_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento neutral bueno" },
      { description: "Curar: 5 rangos", check: (ctx) => (ctx.skillRanks["heal"] ?? 0) >= 5 },
      { description: "Saber (Religión): 9 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 9 },
      { description: "Expulsión Extra", check: (ctx) => ctx.featIds.has("extra-turning") },
      { description: "Bonificador base de salvación de Voluntad +5" },
      { description: "Capaz de lanzar conjuros divinos de nivel 1 y acceso al dominio del Sol", check: (ctx) => ctx.casterLevel >= 1 },
      { description: "Debe tener a Pelor como deidad patrona (o el dios solar equivalente del entorno)" },
    ],
  },
  {
    id: "cdv-rainbow-servant",
    name: "Siervo del Arcoíris (Rainbow Servant)",
    source: "complete-divine",
    description:
      "Un lanzador arcano iniciado por los couatl en los templos ocultos de la jungla, que gana acceso a dominios divinos y finalmente a alas emplumadas multicolores.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "diplomacy", "knowledge-arcana", "knowledge-the-planes", "profession", "sense-motive", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: RAINBOW_SERVANT_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento cualquiera no malvado y no caótico" },
      { description: "Saber (Arcano): 4 rangos", check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 4 },
      { description: "Capaz de lanzar conjuros arcanos de nivel 3", check: (ctx) => ctx.casterLevel >= 5 },
      { description: "Debe encontrar los templos ocultos de la jungla de los couatl" },
    ],
  },
  {
    id: "cdv-sacred-exorcist",
    name: "Exorcista Sagrado (Sacred Exorcist)",
    source: "complete-divine",
    description:
      "Un especialista divino en la lucha contra la posesión espiritual y las entidades extraplanares que intentan usurpar cuerpos mortales, capaz de expulsar tanto no-muertos como espíritus poseedores.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "heal", "intimidate", "knowledge-arcana", "knowledge-religion", "knowledge-the-planes", "profession", "spellcraft"],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples"],
    armorProficiencies: [],
    features: SACRED_EXORCIST_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Saber (Planos): 10 rangos", check: (ctx) => (ctx.skillRanks["knowledge-the-planes"] ?? 0) >= 10 },
      { description: "Saber (Religión): 7 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 7 },
      { description: "Alineamiento cualquier bueno" },
      { description: "Capaz de lanzar destierro o disipar el mal" },
      { description: "Requiere el patrocinio de una iglesia u orden que ordene exorcistas sagrados; solo se acepta a personajes juzgados ejemplares en fe, devoción, fuerza de voluntad y moralidad" },
    ],
  },
  {
    id: "cdv-sacred-fist",
    name: "Puño Sagrado (Sacred Fist)",
    source: "complete-divine",
    description:
      "Un monje divino que canaliza la energía sagrada a través de golpes desarmados, envolviendo manos y pies en llamas consagradas mientras sigue progresando en su magia.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: ["balance", "concentration", "escape-artist", "heal", "jump", "profession", "spellcraft", "tumble"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: SACRED_FIST_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador base de ataque +4", check: (ctx) => ctx.babTotal >= 4 },
      { description: "Saber (Religión): 8 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 8 },
      { description: "Lanzar Conjuros en Combate", check: (ctx) => ctx.featIds.has("combat-casting") },
      { description: "Reflejos en Combate", check: (ctx) => ctx.featIds.has("combat-reflexes") },
      { description: "Golpe Sin Armas Mejorado", check: (ctx) => ctx.featIds.has("improved-unarmed-strike") },
      { description: "Golpe Aturdidor", check: (ctx) => ctx.featIds.has("stunning-fist") },
      { description: "Capaz de lanzar conjuros divinos de nivel 1", check: (ctx) => ctx.casterLevel >= 1 },
    ],
  },
  {
    id: "cdv-seeker-of-the-misty-isle",
    name: "Buscador de la Isla Brumosa (Seeker of the Misty Isle)",
    source: "complete-divine",
    description:
      "Un elfo o semielfo iniciado en una orden dedicada a Corellon Larethian, que combina el favor de los dominios de Viaje y Magia con sentidos agudizados propios de su estirpe.",
    hitDie: 8,
    skillPointsPerLevel: 6,
    classSkills: [
      "balance",
      "climb",
      "concentration",
      "craft",
      "diplomacy",
      "hide",
      "jump",
      "knowledge-geography",
      "knowledge-religion",
      "listen",
      "move-silently",
      "ride",
      "spellcraft",
      "spot",
      "survival",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: ["armas marciales"],
    armorProficiencies: ["armadura ligera", "armadura media"],
    features: SEEKER_OF_THE_MISTY_ISLE_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Raza: Elfo o semielfo" },
      { description: "Saber (Religión): 4 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 4 },
      { description: "Supervivencia: 8 rangos", check: (ctx) => (ctx.skillRanks["survival"] ?? 0) >= 8 },
      { description: "Capaz de lanzar conjuros divinos de nivel 2", check: (ctx) => ctx.casterLevel >= 3 },
      { description: "Debe ser iniciado en la orden por otro miembro" },
    ],
  },
  {
    id: "cdv-shining-blade-of-heironeous",
    name: "Hoja Brillante de Heironeous (Shining Blade of Heironeous)",
    source: "complete-divine",
    description:
      "Un campeón legal bueno de Heironeous cuya arma se carga de electricidad y luz sagrada, símbolo de la justicia implacable de su dios.",
    hitDie: 10,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "diplomacy", "heal", "knowledge-religion", "profession", "spellcraft"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples", "armas marciales"],
    armorProficiencies: ["armadura ligera", "armadura media", "armadura pesada", "escudos"],
    features: SHINING_BLADE_OF_HEIRONEOUS_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador base de ataque +7", check: (ctx) => ctx.babTotal >= 7 },
      { description: "Alineamiento legal bueno" },
      { description: "Saber (Religión): 7 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 7 },
      { description: "Bonificador base de salvación de Voluntad +3" },
      { description: "Capaz de lanzar conjuros divinos de nivel 1", check: (ctx) => ctx.casterLevel >= 1 },
      { description: "Debe tener a Heironeous como deidad patrona" },
    ],
  },
  {
    id: "cdv-stormlord",
    name: "Señor de la Tormenta (Stormlord)",
    source: "complete-divine",
    description:
      "Un devoto de Talos, dios de las tormentas, que sobrevivió al impacto de un rayo y aprendió a canalizar la furia del clima a través de su cuerpo, sus jabalinas y su magia divina.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "disguise", "gather-information", "intimidate", "knowledge-nature", "knowledge-religion", "survival", "swim"],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: STORMLORD_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento: el mismo permitido para un clérigo de Talos" },
      { description: "Aguante", check: (ctx) => ctx.featIds.has("endurance") },
      { description: "Gran Fortaleza", check: (ctx) => ctx.featIds.has("great-fortitude") },
      { description: "Enfoque en Arma (cualquier lanza o jabalina)", check: (ctx) => ctx.featIds.has("weapon-focus") },
      { description: "Bonificador base de salvación de Fortaleza +4" },
      { description: "Capaz de lanzar conjuros divinos de nivel 3", check: (ctx) => ctx.casterLevel >= 5 },
      { description: "Deidad patrona: Talos" },
      { description: "El personaje debe haber sido alcanzado por un rayo (natural o mágico) y haber sobrevivido" },
    ],
  },
  {
    id: "cdv-temple-raider-of-olidammara",
    name: "Saqueador del Templo de Olidammara (Temple Raider of Olidammara)",
    source: "complete-divine",
    description:
      "Un pícaro devoto de Olidammara que combina la búsqueda y desactivación de trampas con un pequeño repertorio de conjuros divinos propios y el favor de la suerte de su dios.",
    hitDie: 6,
    skillPointsPerLevel: 4,
    classSkills: [
      "appraise",
      "climb",
      "craft",
      "decipher-script",
      "disable-device",
      "hide",
      "jump",
      "knowledge-religion",
      "listen",
      "move-silently",
      "open-lock",
      "search",
      "spot",
      "tumble",
      "use-magic-device",
      "use-rope",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "buena", will: "buena" },
    weaponProficiencies: ["armas simples", "estoque"],
    armorProficiencies: ["armadura ligera", "armadura media"],
    spellcasting: {
      type: "preparado",
      ability: "wis",
      spellListId: "cdv-temple-raider",
      maxSpellLevel: 4,
      spellsPerDay: CDV_PRESTIGE_QUARTER_DIVINE_SPELLS_PER_DAY,
      startLevel: 1,
    },
    features: TEMPLE_RAIDER_OF_OLIDAMMARA_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 },
      { description: "Alineamiento cualquier caótico" },
      { description: "Inutilizar Mecanismo: 4 rangos", check: (ctx) => (ctx.skillRanks["disable-device"] ?? 0) >= 4 },
      { description: "Saber (Religión): 1 rango", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 1 },
      { description: "Abrir Cerraduras: 4 rangos", check: (ctx) => (ctx.skillRanks["open-lock"] ?? 0) >= 4 },
      { description: "Buscar: 8 rangos", check: (ctx) => (ctx.skillRanks["search"] ?? 0) >= 8 },
      { description: "Debe rendir culto a Olidammara y ser invitado a unirse por al menos tres miembros actuales de esta clase de prestigio" },
    ],
  },
  {
    id: "cdv-ur-priest",
    name: "Ur-sacerdote (Ur-priest)",
    source: "complete-divine",
    description:
      "Un lanzador malvado que ha robado el poder divino sin la sanción de ninguna deidad, capaz de preparar cualquier conjuro de clérigo sin restricciones de alineamiento y de resistir la magia divina ajena.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: ["bluff", "concentration", "craft", "knowledge-arcana", "knowledge-religion", "knowledge-the-planes", "profession", "spellcraft"],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples"],
    armorProficiencies: [],
    spellcasting: {
      type: "preparado",
      ability: "wis",
      spellListId: "cleric",
      maxSpellLevel: 9,
      spellsPerDay: CDV_PRESTIGE_FULL_DIVINE_SPELLS_PER_DAY,
      startLevel: 1,
    },
    features: UR_PRIEST_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento cualquier malvado" },
      { description: "Farolear: 6 rangos", check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 6 },
      { description: "Saber (Arcano): 5 rangos", check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 5 },
      { description: "Saber (Religión): 8 rangos", check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 8 },
      { description: "Saber (Planos): 5 rangos", check: (ctx) => (ctx.skillRanks["knowledge-the-planes"] ?? 0) >= 5 },
      { description: "Saber de Conjuros: 8 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 8 },
      { description: "Voluntad de Hierro", check: (ctx) => ctx.featIds.has("iron-will") },
      { description: "Enfoque en Conjuro (mal)", check: (ctx) => ctx.featIds.has("spell-focus") },
      { description: "Bonificador base de salvación de Fortaleza +3 y de Voluntad +3" },
      { description: "No debe poder lanzar conjuros divinos (si antes pudo, como un ex-clérigo, renuncia a esa capacidad para siempre); debe ser entrenado por otro ur-sacerdote" },
    ],
  },
  {
    id: "cdv-void-disciple",
    name: "Discípulo del Vacío (Void Disciple)",
    source: "complete-divine",
    description:
      "Un lanzador neutral que se sintoniza con el dominio del Vacío, extendiendo su conciencia fuera del cuerpo para percibir a distancia y compartiendo momentos de claridad sobrehumana con sus aliados.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "diplomacy",
      "heal",
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
      "profession",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "buena", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: VOID_DISCIPLE_FEATURES,
    maxLevel: 13,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento cualquier neutral" },
      { description: "Saber de Conjuros: 10 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 10 },
      { description: "Aumentar Conjuro" },
      { description: "Penetrar Conjuros", check: (ctx) => ctx.featIds.has("spell-penetration") },
      { description: "Capaz de lanzar conjuros arcanos o divinos de nivel 3", check: (ctx) => ctx.casterLevel >= 5 },
    ],
  },
  {
    id: "cdv-warpriest",
    name: "Sacerdote de Guerra (Warpriest)",
    source: "complete-divine",
    description:
      "Un clérigo o paladín de guerra que arenga a sus aliados en el fragor del combate, combinando el poder de expulsar o reprender no-muertos con conjuros de curación masiva y dotes de liderazgo marcial.",
    hitDie: 10,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "diplomacy", "handle-animal", "knowledge-history", "ride", "sense-motive", "spellcraft", "swim"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "mala" },
    weaponProficiencies: ["armas simples", "armas marciales"],
    armorProficiencies: ["armadura ligera", "armadura media", "armadura pesada", "escudos (incluidos escudos torre)"],
    features: WARPRIEST_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador base de ataque +5", check: (ctx) => ctx.babTotal >= 5 },
      { description: "Diplomacia: 8 rangos", check: (ctx) => (ctx.skillRanks["diplomacy"] ?? 0) >= 8 },
      { description: "Sentir Motivaciones: 5 rangos", check: (ctx) => (ctx.skillRanks["sense-motive"] ?? 0) >= 5 },
      { description: "Lanzar Conjuros en Combate", check: (ctx) => ctx.featIds.has("combat-casting") },
      { description: "Capaz de lanzar al menos un conjuro divino de las listas de los dominios Destrucción, Protección, Fuerza o Guerra" },
      { description: "Capacidad de expulsar o reprender no-muertos" },
    ],
  },
];
