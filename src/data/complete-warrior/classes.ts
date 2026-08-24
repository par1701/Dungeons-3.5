import type { ClassDef, ClassFeature, ClassFeatureChoice } from "../../types";

const SPELLSWORD_CHOICES: ClassFeatureChoice[] = [
  {
    id: "dote-bonificada",
    featureName: "Dote Bonificada",
    levels: [2],
    label: "Dote bonificada (metamagia o de la lista de dotes de bonificación de guerrero)",
    kind: "dote_categoria",
    featCategoryOptions: ["combate", "metamagia"],
  },
];

const BOW_INITIATE_CHOICES: ClassFeatureChoice[] = [
  {
    id: "tipo-arco",
    featureName: "Maestría con el arco elegido",
    levels: [1],
    label: "Tipo de arco elegido",
    kind: "lista_fija",
    options: [
      { id: "corto", label: "Arco corto" },
      { id: "corto-compuesto", label: "Arco corto compuesto" },
      { id: "largo", label: "Arco largo" },
      { id: "largo-compuesto", label: "Arco largo compuesto" },
    ],
  },
];

// Clases de prestigio de Complete Warrior (2003).
//
// Complete Warrior reúne una docena de clases de prestigio marciales (Bear
// Warrior, Bloodhound, Dervish, Drunken Master, Exotic Weapon Master,
// Frenzied Berserker, Halfling Outrider, Horizon Walker, Hospitaler, Kensai,
// Order of the Bow Initiate, Tempest...). Se incluyen aquí solo las que se
// recuerdan con confianza razonable en cuanto a su mecánica real; se ha
// preferido omitir el resto (por ejemplo, Bear Warrior, Frenzied Berserker,
// Horizon Walker, Hospitaler, Kensai o Exotic Weapon Master) antes que
// arriesgarse a inventar números o rasgos que no se recuerdan con precisión.
//
// La mayoría de las clases incluidas aquí son mundanas y no lanzan conjuros,
// por lo que el campo `spellcasting` se omite en ellas. La excepción es
// Espadamante (Spellsword): avanza el nivel de lanzador de una clase arcana
// que el personaje ya poseía en vez de tener su propia tabla independiente
// de conjuros por día, así que ese efecto se documenta como texto en sus
// rasgos de clase y el campo `spellcasting` se omite también, siguiendo la
// misma convención usada para las clases de prestigio equivalentes de
// Complete Arcane.

// ---------------------------------------------------------------------------
// Derviche (Dervish)
// ---------------------------------------------------------------------------

const DERVISH_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Bono de CA (+1)",
    description:
      "Mientras no lleve armadura o lleve armadura ligera y no cargue con un escudo, el derviche obtiene un bonificador de +1 a la Clase de Armadura. Se aplica incluso contra ataques de toque o estando desprevenido, y se pierde si está inmovilizado, indefenso, con armadura más pesada que la ligera, con escudo, o con carga media o pesada.",
  },
  {
    level: 1,
    name: "Baile del derviche (1/día)",
    description:
      "Como parte de una acción de ataque a discreción (solo ataques cuerpo a cuerpo), el derviche puede moverse hasta su velocidad antes, después y entre sus ataques, siempre que se mueva al menos 1,5 m entre cada uno y no vuelva a una casilla que ya haya abandonado ese mismo movimiento. Sigue expuesto a ataques de oportunidad, pero puede usar Piruetas con normalidad. Mientras empuñe un arma cortante durante el baile, obtiene un bonificador de +1 a las tiradas de ataque y daño, que aumenta en +1 adicional en cada nivel impar posterior. El baile dura 1 asalto por cada 2 rangos en Interpretar (danza), y al terminar el encuentro el derviche queda fatigado durante el resto del mismo (salvo a partir del nivel 9). Solo puede realizar un baile del derviche por encuentro.",
  },
  {
    level: 1,
    name: "Dominio del movimiento",
    description: "El derviche puede sacar 10 en las pruebas de Saltar, Interpretar (danza) o Piruetas incluso bajo estrés o distracción.",
  },
  {
    level: 1,
    name: "Hojas cortantes",
    description: "El derviche trata la cimitarra como un arma ligera en vez de un arma a una mano a todos los efectos, incluido el combate con dos armas.",
  },
  {
    level: 2,
    name: "Movimiento rápido (+1,5 m)",
    description: "Mientras no lleve armadura más pesada que la ligera ni carga media o pesada, la velocidad del derviche aumenta en 1,5 m por un bonificador de mejora.",
  },
  {
    level: 3,
    name: "Ataque en Carrera",
    description:
      "El derviche obtiene la dote Ataque en Carrera (Spring Attack) como dote de bonificación, aunque no cumpla sus prerrequisitos. Además, puede realizar su baile del derviche hasta 2 veces al día.",
  },
  {
    level: 4,
    name: "Danza de la muerte",
    description:
      "Mientras realice un baile del derviche, el derviche obtiene el beneficio de la dote Hendedura (Cleave), aunque no cumpla sus prerrequisitos, sin necesidad de moverse 1,5 m antes del ataque adicional que esta concede.",
  },
  {
    level: 5,
    name: "Bono de CA (+2)",
    description:
      "El Bono de CA aumenta a +2. Además, el movimiento rápido aumenta a +3 m y el derviche puede realizar su baile del derviche hasta 3 veces al día.",
  },
  {
    level: 6,
    name: "Reacción mejorada",
    description: "El derviche obtiene un bonificador de +2 a las tiradas de iniciativa.",
  },
  {
    level: 7,
    name: "Parada elaborada",
    description:
      "El derviche obtiene un bonificador adicional de +4 a la Clase de Armadura cuando lucha a la defensiva o realiza la acción de defensa total en combate cuerpo a cuerpo. Además, puede realizar su baile del derviche hasta 4 veces al día.",
  },
  {
    level: 8,
    name: "Movimiento rápido (+4,5 m)",
    description: "El bonificador de movimiento rápido aumenta a +4,5 m.",
  },
  {
    level: 9,
    name: "Danza incansable",
    description:
      "El derviche ya no queda fatigado al final del encuentro tras realizar un baile del derviche. Además, el Bono de CA aumenta a +3 y puede realizar su baile del derviche hasta 5 veces al día.",
  },
  {
    level: 10,
    name: "Mil cortes",
    description:
      "Una vez al día, al realizar una acción de ataque completo (dentro o fuera de un baile del derviche), el derviche puede duplicar el número de ataques cuerpo a cuerpo que realiza; si lo combina con un baile del derviche, puede realizar hasta dos ataques entre movimientos. Mientras usa esta capacidad obtiene también el beneficio de la dote Hendedura Mayor (Great Cleave) con armas cortantes, sin necesidad de moverse 1,5 m antes de cada ataque adicional. Si recibe además el ataque adicional del conjuro prisa, los bonificadores de ese conjuro no se acumulan con los concedidos por esta capacidad.",
  },
];

// ---------------------------------------------------------------------------
// Maestro Ebrio (Drunken Master)
// ---------------------------------------------------------------------------

const DRUNKEN_MASTER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Beber como un demonio",
    description:
      "Como acción de movimiento, puede beber una gran cantidad de alcohol. Cada bebida consumida en combate reduce en 2 puntos tanto su Sabiduría como su Inteligencia, pero aumenta en 2 puntos (a su elección) la Fuerza o la Constitución. Puede beneficiarse de tantas bebidas como su nivel de clase de maestro ebrio; la duración de los bonificadores y penalizadores es igual a su nivel de maestro ebrio + 3 asaltos.",
  },
  {
    level: 1,
    name: "Armas improvisadas",
    description:
      "Puede usar muebles, aperos y otros objetos cotidianos como armas improvisadas, infligiendo el daño de su ataque desarmado más 1d4 adicional. Si al atacar con un arma improvisada saca un 1 natural en la tirada de ataque, el arma se rompe.",
  },
  {
    level: 2,
    name: "Tambalearse",
    description:
      "Puede realizar una carga que no necesita seguir una línea recta. Con una prueba de Piruetas (CD 15) antes de cargar, el movimiento a través de casillas amenazadas durante la carga no provoca ataques de oportunidad.",
  },
  {
    level: 3,
    name: "Cintura oscilante",
    description: "En su turno, obtiene un bonificador de esquiva de +2 a la Clase de Armadura frente a un oponente que elija.",
  },
  {
    level: 4,
    name: "Bono de CA (+1)",
    description: "Obtiene un bonificador de +1 a la Clase de Armadura.",
  },
  {
    level: 4,
    name: "Armas improvisadas mejoradas",
    description:
      "Puede usar armas improvisadas largas (como remos o palos de escoba) como armas de alcance. Las que tienen protuberancias otorgan +2 a sus intentos de desarme, y las superficies planas grandes pueden usarse como escudos de torre improvisados.",
  },
  {
    level: 5,
    name: "Armas improvisadas superiores (mayores)",
    description: "El daño adicional de sus armas improvisadas aumenta de 1d4 a 1d8.",
  },
  {
    level: 6,
    name: "Finta Mejorada (Improved Feint)",
    description: "Obtiene la dote Finta Mejorada como dote de bonificación, aunque no cumpla sus prerrequisitos.",
  },
  {
    level: 7,
    name: "Presa Mejorada (Improved Grapple)",
    description: "Obtiene la dote Presa Mejorada como dote de bonificación, aunque no cumpla sus prerrequisitos.",
  },
  {
    level: 8,
    name: "Para fines medicinales",
    description:
      "Mientras esté bajo los efectos del alcohol, puede convertir una bebida alcohólica ingerida en una poción de curar heridas moderadas. Al usar esta capacidad, sus puntuaciones de característica cambian como si el efecto de esa bebida hubiera expirado. Puede usarla hasta 3 veces al día, como acción estándar que no provoca ataques de oportunidad.",
  },
  {
    level: 9,
    name: "Bono de CA (+2)",
    description: "El bonificador de Bono de CA aumenta a +2.",
  },
  {
    level: 9,
    name: "Embestida en tirabuzón",
    description:
      "Al cargar, además del daño normal puede iniciar un intento de empujón sin provocar ataque de oportunidad. Si tiene éxito, el oponente queda aturdido a menos que supere una salvación de Voluntad (CD 10 + nivel de clase + modificador de Sabiduría). Si el intento de empujón falla, el maestro ebrio cae postrado.",
  },
  {
    level: 9,
    name: "Armas improvisadas superiores",
    description: "El daño adicional de sus armas improvisadas aumenta de 1d8 a 1d12.",
  },
  {
    level: 10,
    name: "Aliento de fuego",
    description:
      "Como acción gratuita, puede escupir un cono de 6 m que inflige 3d12 puntos de daño de fuego (mitad con éxito en una salvación de Reflejos CD 10 + nivel de clase + modificador de Constitución). Cada uso consume una bebida de alcohol de las que tiene activas en su cuerpo.",
  },
];

// ---------------------------------------------------------------------------
// Iniciado de la Orden del Arco (Order of the Bow Initiate)
// ---------------------------------------------------------------------------

const ORDER_OF_THE_BOW_INITIATE_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Precisión a distancia (+1d8)",
    description:
      "Como acción estándar, puede realizar un ataque a distancia bien apuntado que inflige 1d8 puntos de daño adicional contra un objetivo situado a 9 m o menos, siempre que tenga anatomía discernible y no sea inmune a los golpes críticos, y que use el tipo de arma con el que tiene Soltura con un Arma. No requiere que el objetivo esté desprevenido, pero si lo está, este daño se acumula con el del ataque furtivo. El bonificador aumenta en +1d8 cada 2 niveles adicionales.",
  },
  {
    level: 2,
    name: "Disparo en combate cercano",
    description: "Puede realizar ataques a distancia mientras está en una casilla amenazada sin provocar ataques de oportunidad por ello.",
  },
  {
    level: 3,
    name: "Precisión a distancia (+2d8)",
    description: "El daño adicional de Precisión a Distancia aumenta a +2d8.",
  },
  {
    level: 4,
    name: "Soltura Mayor con un Arma",
    description:
      "Obtiene la dote Soltura Mayor con un Arma (Greater Weapon Focus) de forma gratuita para el arma a distancia elegida, sin necesidad de cumplir el prerrequisito de guerrero de nivel 8.",
  },
  {
    level: 5,
    name: "Precisión a distancia (+3d8)",
    description: "El daño adicional de Precisión a Distancia aumenta a +3d8.",
  },
  {
    level: 6,
    name: "Puntería",
    description: "Obtiene la dote Puntería (Sharp-Shooting) como dote de bonificación, aunque no cumpla sus prerrequisitos.",
  },
  {
    level: 7,
    name: "Precisión a distancia (+4d8)",
    description: "El daño adicional de Precisión a Distancia aumenta a +4d8.",
  },
  {
    level: 9,
    name: "Precisión a distancia (+5d8)",
    description: "El daño adicional de Precisión a Distancia aumenta a +5d8.",
  },
  {
    level: 10,
    name: "Precisión extendida",
    description:
      "El alcance al que puede realizar ataques de precisión a distancia (y ataques furtivos, si los posee) aumenta de 9 m a 18 m.",
  },
];

// ---------------------------------------------------------------------------
// Espadamante (Spellsword)
// ---------------------------------------------------------------------------

const SPELLSWORD_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Ignorar Fallo de Conjuro (10%)",
    description:
      "Ignora un 10% de probabilidad de fallo de conjuro arcano por llevar armadura o escudo; el porcentaje ignorado aumenta un 5% adicional cada dos niveles (15% en nivel 3, 20% en nivel 5, 25% en nivel 7, 30% en nivel 9).",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "En los niveles impares (1º, 3º, 5º, 7º y 9º), la espadamante obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase). Los niveles pares no otorgan este beneficio.",
  },
  {
    level: 2,
    name: "Dote Bonificada",
    description: "Gana una dote bonificada, que debe ser una dote de metamagia o pertenecer a la lista de dotes de bonificación de guerrero.",
  },
  {
    level: 3,
    name: "Ignorar Fallo de Conjuro (15%)",
    description: "El porcentaje de fallo de conjuro arcano ignorado aumenta al 15%.",
  },
  {
    level: 4,
    name: "Canalizar Conjuro (3/día)",
    description:
      "Como acción de movimiento, hasta tres veces al día, puede canalizar cualquier conjuro que sepa lanzar dentro de su arma cuerpo a cuerpo, afectando solo al próximo objetivo alcanzado con éxito.",
  },
  {
    level: 5,
    name: "Ignorar Fallo de Conjuro (20%)",
    description: "El porcentaje de fallo de conjuro arcano ignorado aumenta al 20%.",
  },
  {
    level: 6,
    name: "Canalizar Conjuro (4/día)",
    description: "Puede usar Canalizar Conjuro hasta cuatro veces al día.",
  },
  {
    level: 7,
    name: "Ignorar Fallo de Conjuro (25%)",
    description: "El porcentaje de fallo de conjuro arcano ignorado aumenta al 25%.",
  },
  {
    level: 8,
    name: "Canalizar Conjuro (5/día)",
    description: "Puede usar Canalizar Conjuro hasta cinco veces al día.",
  },
  {
    level: 9,
    name: "Ignorar Fallo de Conjuro (30%)",
    description: "El porcentaje de fallo de conjuro arcano ignorado aumenta al 30%.",
  },
  {
    level: 10,
    name: "Canalizar Conjuro Múltiple",
    description: "Puede canalizar dos conjuros distintos en su arma, usando una acción de movimiento para canalizar cada uno.",
  },
];

// ---------------------------------------------------------------------------
// Jinete Explorador Halfling (Halfling Outrider)
// ---------------------------------------------------------------------------

const HALFLING_OUTRIDER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Bono de CA (+1)",
    description: "Mientras esté montado, obtiene un bonificador de esquiva a la Clase de Armadura. Se pierde en cualquier situación en la que perdería el bonificador de Destreza a la CA.",
  },
  {
    level: 1,
    name: "Montura",
    description:
      "Recibe una montura de su comunidad (típicamente un perro de monta o un poni de guerra) con sus arreos. Los niveles de jinete explorador halfling se acumulan con los de paladín, druida y explorador a efectos de montura especial o compañero animal.",
  },
  {
    level: 1,
    name: "Vigilancia",
    description: "Obtiene la dote Vigilancia (Alertness) como dote de bonificación.",
  },
  {
    level: 1,
    name: "Bonificador a Montar",
    description: "Obtiene un bonificador de competencia igual a su nivel de clase en las pruebas de Montar.",
  },
  {
    level: 2,
    name: "Cabalgar defensivo",
    description:
      "Mientras está montado y no realiza ninguna acción ofensiva, obtiene un bonificador de +2 a las tiradas de salvación de Reflejos y un bonificador de esquiva de +4 a la Clase de Armadura. Su montura obtiene además +6 m de velocidad, +2 a las tiradas de salvación de Voluntad y un bonificador de esquiva de +4 a la Clase de Armadura.",
  },
  {
    level: 3,
    name: "Carga imparable",
    description: "Montado, puede cargar a través de terreno difícil o de casillas ocupadas por aliados con una prueba de Montar (CD 15).",
  },
  {
    level: 3,
    name: "Bono de CA (+2)",
    description: "El Bono de CA aumenta a +2.",
  },
  {
    level: 4,
    name: "Ponerse de pie sobre la montura",
    description:
      "Puede mantenerse de pie sobre el lomo de su montura durante el movimiento o el combate con una prueba de Montar (CD 20), evitando así los penalizadores a las armas a distancia por que la montura se mueva al doble de su velocidad o corra.",
  },
  {
    level: 5,
    name: "Saltar de la silla",
    description:
      "Como acción gratuita, mediante una prueba de Montar (CD 20), puede desmontar y colocarse junto a su montura, obteniendo potencialmente un bonificador de +2 al ataque y un penalizador de -2 a la Clase de Armadura frente a oponentes cercanos.",
  },
  {
    level: 5,
    name: "Bono de CA (+3)",
    description: "El Bono de CA aumenta a +3.",
  },
  {
    level: 7,
    name: "Evasión",
    description:
      "Con armadura ligera o sin armadura, si supera con éxito una salvación de Reflejos contra un efecto que normalmente inflige la mitad de daño, no sufre daño alguno. Montado, se usa el mejor bonificador de Reflejos entre el jinete y su montura. Si ya poseía evasión, obtiene evasión mejorada (sufre la mitad de daño incluso si falla la salvación).",
  },
  {
    level: 7,
    name: "Bono de CA (+4)",
    description: "El Bono de CA aumenta a +4.",
  },
  {
    level: 8,
    name: "Ataque montado completo",
    description: "Puede realizar un ataque completo aunque su montura se haya movido más de 1,5 m, siempre que no se haya movido más de lo permitido por una acción de movimiento.",
  },
  {
    level: 9,
    name: "Bono de CA (+5)",
    description: "El Bono de CA aumenta a +5.",
  },
  {
    level: 10,
    name: "Giro rápido",
    description:
      "Como acción gratuita, mediante una prueba de Montar (CD 25), puede hacer que su montura cambie de dirección hasta 90 grados una vez mientras corre o carga.",
  },
];

export const CW_CLASSES: ClassDef[] = [
  {
    id: "cw-dervish",
    name: "Derviche (Dervish)",
    source: "complete-warrior",
    description:
      "Un guerrero ágil que convierte el combate en una danza mortal, moviéndose sin cesar por el campo de batalla mientras encadena golpes con un arma cortante ligera.",
    hitDie: 10,
    skillPointsPerLevel: 4,
    classSkills: ["balance", "craft", "escape-artist", "jump", "listen", "perform", "profession", "swim", "tumble"],
    babProgression: "completa",
    saves: { fort: "mala", ref: "buena", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: DERVISH_FEATURES,
    bonusFeatGrants: [{ level: 3, featId: "spring-attack" }],
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Pericia en Combate",
        check: (ctx) => ctx.featIds.has("combat-expertise"),
      },
      {
        description: "Esquiva",
        check: (ctx) => ctx.featIds.has("dodge"),
      },
      {
        description: "Movilidad",
        check: (ctx) => ctx.featIds.has("mobility"),
      },
      {
        description: "Soltura con un Arma (cualquier arma cortante cuerpo a cuerpo)",
        check: (ctx) => ctx.featIds.has("weapon-focus"),
      },
      {
        description: "Interpretar (danza): 3 rangos",
        check: (ctx) => (ctx.skillRanks["perform"] ?? 0) >= 3,
      },
      {
        description: "Piruetas: 3 rangos",
        check: (ctx) => (ctx.skillRanks["tumble"] ?? 0) >= 3,
      },
    ],
  },
  {
    id: "cw-drunken-master",
    name: "Maestro Ebrio (Drunken Master)",
    source: "complete-warrior",
    description:
      "Un monje que ha desarrollado un estilo de combate imprevisible inspirado en la embriaguez, tan eficaz esquivando como golpeando, capaz de convertir cada tambaleo en una oportunidad.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "balance",
      "bluff",
      "climb",
      "craft",
      "escape-artist",
      "hide",
      "jump",
      "listen",
      "move-silently",
      "perform",
      "profession",
      "swim",
      "tumble",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: DRUNKEN_MASTER_FEATURES,
    bonusFeatGrants: [
      { level: 6, featId: "improved-feint" },
      { level: 7, featId: "improved-grapple" },
    ],
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Impacto sin Arma Mejorado (o capacidad de golpe sin armas del monje)",
        check: (ctx) => ctx.featIds.has("improved-unarmed-strike"),
      },
      {
        description: "Gran Fortaleza",
        check: (ctx) => ctx.featIds.has("great-fortitude"),
      },
      {
        description: "Piruetas: 8 rangos",
        check: (ctx) => (ctx.skillRanks["tumble"] ?? 0) >= 8,
      },
      {
        description: "Capacidad de usar Ráfaga de Golpes y Evasión como un monje",
      },
      {
        description: "Debe ser invitado por maestros ebrios existentes y sobrevivir a una noche de juerga con ellos sin ser encarcelado, envenenado o extraordinariamente avergonzado",
      },
    ],
  },
  {
    id: "cw-order-of-the-bow-initiate",
    name: "Iniciado de la Orden del Arco (Order of the Bow Initiate)",
    source: "complete-warrior",
    description:
      "Un arquero devoto que ha unido su destino a un único tipo de arco, refinando su puntería hasta convertirla en un arte casi sobrenatural.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: ["climb", "craft", "knowledge-religion", "ride", "spot", "swim"],
    babProgression: "completa",
    saves: { fort: "mala", ref: "buena", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: ORDER_OF_THE_BOW_INITIATE_FEATURES,
    choices: BOW_INITIATE_CHOICES,
    bonusFeatGrants: [
      { level: 4, featId: "greater-weapon-focus" },
      { level: 6, featId: "cw-sharp-shooting" },
    ],
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Oficio (arquería): 5 rangos",
        check: (ctx) => (ctx.skillRanks["craft"] ?? 0) >= 5,
      },
      {
        description: "Conocimiento (religión): 2 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-religion"] ?? 0) >= 2,
      },
      {
        description: "Disparo a Bocajarro",
        check: (ctx) => ctx.featIds.has("point-blank-shot"),
      },
      {
        description: "Disparo Preciso",
        check: (ctx) => ctx.featIds.has("precise-shot"),
      },
      {
        description: "Disparo Rápido",
        check: (ctx) => ctx.featIds.has("rapid-shot"),
      },
      {
        description: "Soltura con un Arma (arco largo, arco corto, o su versión compuesta)",
        check: (ctx) => ctx.featIds.has("weapon-focus"),
      },
    ],
  },
  {
    id: "cw-spellsword",
    name: "Espadamante (Spellsword)",
    source: "complete-warrior",
    description:
      "Un guerrero que también domina la magia arcana, capaz de combinar el acero y el conjuro en un mismo combate sin que el peso de su armadura le impida lanzar sus hechizos.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: ["climb", "concentration", "jump", "knowledge-arcana", "profession", "spellcraft"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: SPELLSWORD_FEATURES,
    choices: SPELLSWORD_CHOICES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +4",
        check: (ctx) => ctx.babTotal >= 4,
      },
      {
        description: "Saber (Arcano): 6 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 6,
      },
      { description: "Competencia con todas las armas simples y marciales y con todas las armaduras" },
      { description: "Capacidad de lanzar conjuros arcanos de nivel 2" },
      { description: "Haber derrotado a un enemigo solo por la fuerza de las armas, sin recurrir a lanzar conjuros" },
    ],
  },
  {
    id: "cw-halfling-outrider",
    name: "Jinete Explorador Halfling (Halfling Outrider)",
    source: "complete-warrior",
    description:
      "Un halfling que ha llevado el combate montado a su máxima expresión, formando con su montura un equipo capaz de acosar y abatir enemigos mucho mayores que ellos.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: ["handle-animal", "listen", "ride", "spot", "survival"],
    babProgression: "completa",
    saves: { fort: "mala", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: HALFLING_OUTRIDER_FEATURES,
    bonusFeatGrants: [{ level: 1, featId: "alertness" }],
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Raza: mediano (halfling)",
      },
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Escuchar: 3 rangos",
        check: (ctx) => (ctx.skillRanks["listen"] ?? 0) >= 3,
      },
      {
        description: "Montar: 6 rangos",
        check: (ctx) => (ctx.skillRanks["ride"] ?? 0) >= 6,
      },
      {
        description: "Avistar: 3 rangos",
        check: (ctx) => (ctx.skillRanks["spot"] ?? 0) >= 3,
      },
      {
        description: "Combatir desde una Montura",
        check: (ctx) => ctx.featIds.has("mounted-combat"),
      },
      {
        description: "Tiro Montado",
        check: (ctx) => ctx.featIds.has("mounted-archery"),
      },
    ],
  },
];
