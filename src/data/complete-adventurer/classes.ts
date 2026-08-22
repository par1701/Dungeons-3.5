import type { ClassDef, ClassFeatureChoice } from "../../types";

const SWASHBUCKLER_CHOICES: ClassFeatureChoice[] = [
  {
    id: "amenaza-con-arma",
    featureName: "Amenaza con Arma (dote de bonificación)",
    levels: [1],
    label: "Dote de amenaza con arma",
    kind: "dote_restringida",
    featOptionIds: ["weapon-finesse", "weapon-focus"],
  },
  {
    id: "dote-combate-1",
    featureName: "Dote de Combate Adicional",
    levels: [4],
    label: "Dote de combate adicional (1.ª)",
    kind: "dote_categoria",
    featCategoryOptions: ["combate"],
  },
  {
    id: "dote-combate-2",
    featureName: "Dote de Combate Adicional",
    levels: [12],
    label: "Dote de combate adicional (2.ª)",
    kind: "dote_categoria",
    featCategoryOptions: ["combate"],
  },
];

// Dotes de bonificación reales del ejemplar (Complete Adventurer) que ya
// existen en el catálogo. La lista original también incluye Improved
// Swimming, Open Minded y Versatile Performer, que no están todavía
// modeladas como dotes propias, así que se omiten de las opciones en vez de
// inventar una entrada para ellas.
const EXEMPLAR_BONUS_FEAT_LIST = [
  "acrobatic",
  "agile",
  "alertness",
  "animal-affinity",
  "athletic",
  "blind-fight",
  "combat-casting",
  "combat-expertise",
  "deceitful",
  "deft-hands",
  "diligent",
  "improved-initiative",
  "investigator",
  "magical-aptitude",
  "negotiator",
  "nimble-fingers",
  "persuasive",
  "self-sufficient",
  "skill-focus",
  "stealthy",
  "track",
];

const EXEMPLAR_CHOICES: ClassFeatureChoice[] = [
  {
    id: "arte-habilidad-1",
    featureName: "Arte de la Habilidad (1.ª)",
    levels: [1],
    label: "Arte de la habilidad, nivel 1 (mínimo 13 rangos)",
    kind: "texto_libre",
    placeholder: "p.ej. Trepar, Buscar, Diplomacia...",
  },
  {
    id: "arte-habilidad-2",
    featureName: "Arte de la Habilidad (2.ª)",
    levels: [4],
    label: "Arte de la habilidad, nivel 4 (habilidad distinta, mínimo 13 rangos)",
    kind: "texto_libre",
    placeholder: "p.ej. Trepar, Buscar, Diplomacia...",
  },
  {
    id: "arte-habilidad-3",
    featureName: "Arte de la Habilidad (3.ª)",
    levels: [7],
    label: "Arte de la habilidad, nivel 7 (habilidad distinta, mínimo 13 rangos)",
    kind: "texto_libre",
    placeholder: "p.ej. Trepar, Buscar, Diplomacia...",
  },
  {
    id: "arte-habilidad-4",
    featureName: "Arte de la Habilidad (4.ª)",
    levels: [10],
    label: "Arte de la habilidad, nivel 10 (habilidad distinta, mínimo 13 rangos)",
    kind: "texto_libre",
    placeholder: "p.ej. Trepar, Buscar, Diplomacia...",
  },
  {
    id: "dote-bonus-1",
    featureName: "Dote de Bonificación (1.ª)",
    levels: [3],
    label: "Dote de bonificación, nivel 3",
    kind: "dote_restringida",
    featOptionIds: EXEMPLAR_BONUS_FEAT_LIST,
  },
  {
    id: "dote-bonus-2",
    featureName: "Dote de Bonificación (2.ª)",
    levels: [6],
    label: "Dote de bonificación, nivel 6",
    kind: "dote_restringida",
    featOptionIds: EXEMPLAR_BONUS_FEAT_LIST,
  },
  {
    id: "dote-bonus-3",
    featureName: "Dote de Bonificación (3.ª)",
    levels: [9],
    label: "Dote de bonificación, nivel 9",
    kind: "dote_restringida",
    featOptionIds: EXEMPLAR_BONUS_FEAT_LIST,
  },
];

// Clases de Complete Adventurer (2005).
//
// Se incluyen dos clases base centradas en el combate ágil y furtivo
// (Batidor y Espadachín) y las clases de prestigio del libro verificadas
// frente a docs/prestige/ (Ejemplar, Asesino Fantasma, Maestro de Espías,
// Tempestad, Sabueso de Sangre). "Ninja de la Luna Creciente" se eliminó:
// no corresponde a ninguna clase real de Complete Adventurer ni de ningún
// otro libro con ficha de referencia disponible, así que no hay forma de
// verificarla ni corregirla.
//
// Tempestad y Sabueso de Sangre estaban antes mal filiadas en
// complete-warrior/classes.ts (son en realidad de este libro, p. 81 y p. 28)
// y con mecánicas sustancialmente inventadas; se han reescrito aquí desde
// cero con sus datos reales.

// ---------------------------------------------------------------------------
// Batidor (Scout)
// ---------------------------------------------------------------------------

const SCOUT_FEATURES = [
  {
    level: 1,
    name: "Golpe de Escaramuza +1d6/+1 CA",
    description:
      "Si el batidor se mueve al menos 3 metros durante su turno antes de realizar un ataque cuerpo a cuerpo o a distancia (y no tiene un aliado que le ayude a flanquear, ni recurre a él para determinar el flanqueo), inflige 1d6 puntos de daño adicional con ese ataque y obtiene un bonificador de +1 a la Clase de Armadura hasta el comienzo de su siguiente turno. No funciona si el batidor lleva armadura media o pesada, ni si está inmovilizado o no puede moverse libremente.",
  },
  {
    level: 1,
    name: "Detectar Trampas",
    description:
      "El batidor puede usar la habilidad Buscar para localizar trampas mágicas con CD 25 o más, igual que un pícaro.",
  },
  {
    level: 2,
    name: "Bono de Batalla",
    description:
      "El batidor obtiene un bonificador de competencia a las tiradas de iniciativa y a las tiradas de salvación de Fortaleza igual a la mitad de su nivel de batidor (redondeando hacia abajo, mínimo +1).",
  },
  {
    level: 3,
    name: "Movimiento Rápido",
    description: "La velocidad base del batidor aumenta en 3 metros mientras no lleve una carga pesada ni armadura media o pesada.",
  },
  {
    level: 4,
    name: "Golpe de Escaramuza +2d6/+1 CA",
    description: "El daño adicional del Golpe de Escaramuza aumenta a 2d6.",
  },
  {
    level: 5,
    name: "Esquiva Sobrenatural",
    description:
      "El batidor conserva su bonificador de Destreza a la Clase de Armadura incluso cuando es sorprendido o atacado por un enemigo invisible (salvo que esté inmovilizado).",
  },
  {
    level: 6,
    name: "Camuflaje",
    description: "El batidor puede usar la habilidad Esconderse incluso mientras es observado, siempre que se encuentre en un entorno natural que le proporcione algún tipo de cobertura o distracción visual.",
  },
  {
    level: 7,
    name: "Golpe de Escaramuza +2d6/+2 CA",
    description: "El bonificador de Clase de Armadura del Golpe de Escaramuza aumenta a +2.",
  },
  {
    level: 8,
    name: "Paso Certero",
    description: "El batidor ignora el terreno difícil de origen natural (no mágico) al moverse, y puede atravesar zonas de vegetación densa a su velocidad normal.",
  },
  {
    level: 9,
    name: "Esquiva Sobrenatural Mejorada",
    description:
      "El batidor ya no puede perder su bono de Destreza a la Clase de Armadura por estar flanqueado, excepto ante un atacante que sea pícaro y tenga al menos 4 niveles de pícaro más que él.",
  },
  {
    level: 10,
    name: "Golpe de Escaramuza +3d6/+2 CA",
    description: "El daño adicional del Golpe de Escaramuza aumenta a 3d6.",
  },
  {
    level: 11,
    name: "Sentido Ciego 3 m",
    description: "El batidor desarrolla una percepción tan aguda de su entorno inmediato que puede detectar criaturas a 3 metros sin necesidad de verlas, mediante el oído, el olfato y las vibraciones.",
  },
  {
    level: 13,
    name: "Golpe de Escaramuza +3d6/+3 CA",
    description: "El bonificador de Clase de Armadura del Golpe de Escaramuza aumenta a +3.",
  },
  {
    level: 14,
    name: "Camuflaje Superior",
    description: "El bonificador que el batidor obtiene por Camuflaje se convierte en la capacidad de esconderse incluso sin ningún tipo de cobertura, siempre que no esté completamente a la vista en campo abierto.",
  },
  {
    level: 16,
    name: "Golpe de Escaramuza +4d6/+3 CA",
    description: "El daño adicional del Golpe de Escaramuza aumenta a 4d6.",
  },
  {
    level: 17,
    name: "Sentido Ciego 9 m",
    description: "El alcance del Sentido Ciego del batidor aumenta a 9 metros.",
  },
  {
    level: 19,
    name: "Golpe de Escaramuza +4d6/+4 CA",
    description: "El bonificador de Clase de Armadura del Golpe de Escaramuza aumenta a +4.",
  },
  {
    level: 20,
    name: "Golpe de Escaramuza +5d6",
    description: "El daño adicional del Golpe de Escaramuza alcanza su máximo de +5d6.",
  },
];

// ---------------------------------------------------------------------------
// Espadachín (Swashbuckler)
// ---------------------------------------------------------------------------

const SWASHBUCKLER_FEATURES = [
  {
    level: 1,
    name: "Gracia",
    description:
      "Mientras no lleve armadura media o pesada ni un escudo pesado, el espadachín suma su modificador de Destreza (además del de Fuerza) al daño cuerpo a cuerpo con cualquier arma ligera o con una espada que pueda empuñarse con una mano.",
  },
  {
    level: 1,
    name: "Amenaza con Arma (dote de bonificación)",
    description: "El espadachín obtiene Sutileza con las Armas o Soltura con un Arma como dote de bonificación (a elegir) para el arma que empuñe con mayor frecuencia.",
  },
  {
    level: 2,
    name: "Bono de Perspicacia a la CA +1",
    description:
      "Mientras no lleve armadura media o pesada, no use un escudo pesado y no esté indefenso, aturdido o cegado, el espadachín obtiene un bonificador de perspicacia de +1 a la Clase de Armadura, fruto de su instinto para anticipar y esquivar los golpes.",
  },
  {
    level: 3,
    name: "Evasión",
    description: "Si el espadachín supera una tirada de salvación de Reflejos contra un efecto que normalmente causa la mitad de daño en caso de éxito, en su lugar no sufre ningún daño.",
  },
  {
    level: 4,
    name: "Dote de Combate Adicional",
    description: "El espadachín obtiene una dote de combate adicional que cumpla sus requisitos.",
  },
  {
    level: 5,
    name: "Esquiva Sobrenatural",
    description: "El espadachín conserva su bonificador de Destreza a la Clase de Armadura incluso cuando es sorprendido o atacado por un enemigo invisible (salvo que esté inmovilizado).",
  },
  {
    level: 6,
    name: "Bono de Perspicacia a la CA +2",
    description: "El Bono de Perspicacia a la Clase de Armadura del espadachín aumenta a +2.",
  },
  {
    level: 8,
    name: "Carga Acrobática",
    description: "El espadachín puede cargar a través de terreno difícil, sobre superficies estrechas o saltando por encima de obstáculos bajos, siempre que supere una prueba de Piruetas con CD 15.",
  },
  {
    level: 9,
    name: "Mente Escurridiza",
    description: "Si el espadachín falla una tirada de salvación de Voluntad contra un efecto de encantamiento, puede intentarla de nuevo un asalto más tarde con el mismo resultado. Solo puede beneficiarse de este segundo intento una vez por efecto.",
  },
  {
    level: 10,
    name: "Esquiva Sobrenatural Mejorada",
    description: "El espadachín ya no puede perder su bono de Destreza a la Clase de Armadura por estar flanqueado, excepto ante un atacante que sea pícaro y tenga al menos 4 niveles de pícaro más que él.",
  },
  {
    level: 11,
    name: "Bono de Perspicacia a la CA +3",
    description: "El Bono de Perspicacia a la Clase de Armadura del espadachín aumenta a +3.",
  },
  {
    level: 12,
    name: "Dote de Combate Adicional",
    description: "El espadachín obtiene una segunda dote de combate adicional que cumpla sus requisitos.",
  },
  {
    level: 15,
    name: "Ataque Certero",
    description: "Una vez por asalto, cuando impacta con un ataque cuerpo a cuerpo con un arma ligera o una espada de una mano, el espadachín puede añadir su modificador de Inteligencia al daño, además de su Fuerza y su Destreza (Gracia).",
  },
  {
    level: 16,
    name: "Bono de Perspicacia a la CA +4",
    description: "El Bono de Perspicacia a la Clase de Armadura del espadachín aumenta a +4.",
  },
  {
    level: 20,
    name: "Gracia Definitiva",
    description: "El espadachín se convierte en un maestro sin parangón del duelo: una vez por combate, tras impactar con un ataque cuerpo a cuerpo, puede repetir inmediatamente ese ataque contra el mismo objetivo como si dispusiera de un ataque adicional.",
  },
];

// ---------------------------------------------------------------------------
// Ejemplar (Exemplar)
// ---------------------------------------------------------------------------

const EXEMPLAR_FEATURES = [
  {
    level: 1,
    name: "Arte de la Habilidad",
    description:
      "El ejemplar elige una habilidad en la que tenga al menos 13 rangos y obtiene un bonificador de competencia de +4 en ella. Vuelve a obtener este rasgo en los niveles 4, 7 y 10, eligiendo cada vez una habilidad distinta a las anteriores (si no tiene otra con 13 rangos o más, no obtiene el beneficio hasta cumplir el requisito).",
  },
  {
    level: 1,
    name: "Maestría de Habilidad",
    description:
      "El ejemplar elige 1 + su modificador de Inteligencia habilidades: puede tomar 10 en las pruebas de esas habilidades incluso bajo presión o distracción. Añade una habilidad más a la lista cada vez que sube de nivel.",
  },
  {
    level: 2,
    name: "Prestar Talento",
    description:
      "Como acción de ronda completa, el ejemplar puede aceptar un penalizador (hasta su nivel de clase) en una habilidad con Arte de la Habilidad para dar a los aliados en 9 m un bonificador de competencia igual a la mitad de ese penalizador en la misma prueba, mientras permanezca consciente y dentro del alcance. Desde nivel 8, el bonificador otorgado a los aliados iguala el penalizador completo.",
  },
  {
    level: 3,
    name: "Dote de Bonificación",
    description: "El ejemplar elige una dote de bonificación de una lista concreta, cumpliendo sus prerrequisitos. Vuelve a obtener este rasgo en los niveles 6 y 9.",
  },
  {
    level: 4,
    name: "Presencia Sostenida",
    description: "El ejemplar suma su modificador de Carisma a las pruebas de Concentración y a las tiradas de salvación de Fortaleza.",
  },
  {
    level: 5,
    name: "Actuación Persuasiva",
    description:
      "El ejemplar puede usar una habilidad con Arte de la Habilidad en vez de Diplomacia frente a un PNJ en 9 m, mediante una demostración no amenazante de al menos 1 minuto, para mejorar su actitud (máximo una vez cada 24 horas por criatura).",
  },
  {
    level: 8,
    name: "Agilidad Intelectual",
    description: "El ejemplar suma su modificador de Inteligencia a la iniciativa y a las tiradas de salvación de Reflejos.",
  },
  {
    level: 10,
    name: "Yo Perfecto",
    description: "El tipo de criatura del ejemplar cambia a forastero (nativo), igual que el rasgo equivalente del monje.",
  },
];

// ---------------------------------------------------------------------------
// Asesino Fantasma (Ghost-Faced Killer)
// ---------------------------------------------------------------------------

const GHOST_FACED_KILLER_FEATURES = [
  {
    level: 1,
    name: "Paso Fantasmal (1/día)",
    description:
      "Como acción rápida, sin provocar ataque de oportunidad, el asesino fantasma se vuelve invisible durante 1 asalto. Puede usar este rasgo una vez al día; obtiene un uso adicional cada 3 niveles (2/día en nivel 4, 3/día en nivel 7, 4/día en nivel 10).",
  },
  {
    level: 2,
    name: "Golpe Repentino +1d6",
    description:
      "Si el objetivo pierde su bonificador de Destreza a la Clase de Armadura frente a su ataque, el asesino fantasma inflige 1d6 puntos de daño adicional, +1d6 cada 3 niveles (2d6 en nivel 5, 3d6 en nivel 8). Funciona como el ataque furtivo, pero no se activa por flanqueo.",
  },
  {
    level: 3,
    name: "Ataque Aterrador (1/día)",
    description:
      "Si usa Ataque Poderoso con una penalización de al menos -1 en un golpe repentino cuerpo a cuerpo que inflige daño, la víctima debe superar una salvación de Voluntad (CD 10 + nivel de clase + modificador de Carisma) o morir instantáneamente de terror; si tiene éxito, queda conmocionada 1 asalto por nivel. Además, las criaturas en 9 m que presencien el ataque quedan aterrorizadas (si tienen menos DG que el nivel de clase + Carisma del asesino) o conmocionadas (si tienen igual o más DG) 1 asalto por nivel, con una salvación de Voluntad (CD 10 + nivel + Carisma + bono de daño por Ataque Poderoso) para negarlo; no afecta a criaturas inmunes a miedo o a efectos mentales, ni a las de más DG que el nivel de personaje del asesino. Puede usarse una vez al día, +1 uso cada 3 niveles (2/día en nivel 6, 3/día en nivel 9).",
  },
  {
    level: 7,
    name: "Visión Fantasmal",
    description: "El asesino fantasma ve a las criaturas y objetos etéreos e invisibles como si fueran materiales.",
  },
  {
    level: 10,
    name: "Hendidura Aterradora",
    description:
      "Si mata a un enemigo con su Ataque Aterrador, el asesino fantasma obtiene de inmediato un ataque cuerpo a cuerpo adicional contra otro objetivo a su alcance, como con la dote Hendidura; si ese nuevo objetivo está desprevenido, el ataque cuenta también como Ataque Aterrador sin consumir un uso diario.",
  },
];

// ---------------------------------------------------------------------------
// Maestro de Espías (Spymaster)
// ---------------------------------------------------------------------------

const SPYMASTER_FEATURES = [
  {
    level: 1,
    name: "Identidad Encubierta",
    description:
      "Mientras opera bajo una identidad de tapadera, el maestro de espías obtiene +4 de circunstancia a Disfrazarse y +2 de circunstancia a Engañar y Reunir Información. Cambiar de identidad requiere una semana de práctica antes de obtener los bonificadores. Obtiene una identidad adicional en los niveles 4 y 7.",
  },
  {
    level: 1,
    name: "Alineamiento Indetectable",
    description: "El maestro de espías se beneficia permanentemente del efecto del conjuro alineamiento indetectable.",
  },
  {
    level: 2,
    name: "Cambio Rápido",
    description: "El maestro de espías puede disfrazarse en una décima parte del tiempo normal (1d3 minutos) y ponerse o quitarse la armadura en la mitad del tiempo habitual.",
  },
  {
    level: 2,
    name: "Defensa contra Escrutación",
    description: "El maestro de espías suma su nivel de clase a las salvaciones de Voluntad contra conjuros de adivinación (escrutación) y a las pruebas de Avistar para detectar los sensores de dichos conjuros.",
  },
  {
    level: 3,
    name: "Aura Mágica",
    description: "El maestro de espías puede usar aura mágica de Nystul a voluntad, con nivel de lanzador igual a su nivel de clase.",
  },
  {
    level: 3,
    name: "Ataque Furtivo +1d6",
    description: "El maestro de espías inflige 1d6 de daño adicional de ataque furtivo, aumentando a 2d6 en nivel 6. Se acumula con el ataque furtivo obtenido de otras fuentes.",
  },
  {
    level: 4,
    name: "Mente Escurridiza",
    description: "Como la dote homónima del pícaro: si el maestro de espías falla una salvación contra un conjuro o efecto de encantamiento, obtiene una segunda tirada de salvación un asalto después.",
  },
  {
    level: 5,
    name: "Disipar Escrutación",
    description:
      "El maestro de espías puede disipar un sensor de escrutación dirigido, como si lanzara disipar magia superior con nivel de lanzador igual a su nivel de clase +10, un número de veces al día igual a 3 + su modificador de Inteligencia.",
  },
  {
    level: 6,
    name: "Ataque Furtivo +2d6",
    description: "El daño adicional de ataque furtivo del maestro de espías aumenta a 2d6.",
  },
  {
    level: 7,
    name: "Tapadera Profunda",
    description:
      "Al inmersarse por completo en su identidad de tapadera, los conjuros de adivinación usados contra el maestro de espías solo revelan información acorde a esa identidad, no a su verdadera identidad de espía.",
  },
];

// ---------------------------------------------------------------------------
// Tempestad (Tempest)
// ---------------------------------------------------------------------------

const TEMPEST_FEATURES = [
  {
    level: 1,
    name: "Defensa de Tempestad +1",
    description:
      "Mientras empuñe un arma doble o dos armas (no cuentan las armas naturales ni los golpes desarmados), la tempestad obtiene un bonificador de esquiva de +1 a la Clase de Armadura. Pierde este bonificador si lleva armadura media o pesada.",
  },
  {
    level: 2,
    name: "Ambidiestría (-3/-1)",
    description:
      "La tempestad reduce en 1 la penalización habitual por combatir con dos armas: de -4/-4 pasa a -3/-1 con un arma secundaria ligera (o -3/-3 en general), acumulándose con cualquier dote de combate con dos armas que ya posea. Se pierde con armadura media o pesada.",
  },
  {
    level: 3,
    name: "Defensa de Tempestad +2",
    description: "El bonificador de esquiva de la Defensa de Tempestad aumenta a +2.",
  },
  {
    level: 3,
    name: "Versatilidad con Dos Armas",
    description:
      "Al combatir con dos armas, la tempestad puede aplicar a la segunda arma el efecto de ciertas dotes que ya posea para la primera (Soltura Mayor con un Arma, Especialización Mayor con un Arma, Crítico Mejorado, Soltura con un Arma, Especialización con un Arma), siempre que la aplicación sea legal.",
  },
  {
    level: 4,
    name: "Ambidiestría (-2/+0)",
    description: "La penalización por combatir con dos armas se reduce un punto más: a -2/-2 en general (o -2/+0 con un arma secundaria ligera).",
  },
  {
    level: 5,
    name: "Defensa de Tempestad +3",
    description: "El bonificador de esquiva de la Defensa de Tempestad aumenta a +3.",
  },
  {
    level: 5,
    name: "Ataque en Carrera con Dos Armas",
    description:
      "Al realizar un ataque en carrera (Ataque en Carrera), la tempestad puede atacar una vez con cada una de sus dos armas como parte de esa misma acción.",
  },
];

// ---------------------------------------------------------------------------
// Sabueso de Sangre (Bloodhound)
// ---------------------------------------------------------------------------

const BLOODHOUND_FEATURES = [
  {
    level: 1,
    name: "Marca (1)",
    description:
      "Tras concentrarse 10 minutos sin interrupción sobre un humanoide o monstruo humanoide presente o descrito, el sabueso de sangre lo designa \"marca\". Suma su nivel de clase como bonificador de perspicacia a las pruebas de Reunir Información, Escuchar, Buscar, Avistar y Supervivencia realizadas para localizarlo. Solo puede elegir marca una vez por semana; cambiar de marca antes de atraparla pierde la experiencia que hubiera ganado por ello. Obtiene una marca adicional cada 3 niveles a partir del 1.º (hasta 4 en nivel 10).",
  },
  {
    level: 1,
    name: "Rastreador Veloz",
    description: "El sabueso de sangre puede seguir rastros a su velocidad normal, sin la penalización habitual, igual que el rasgo homónimo del explorador.",
  },
  {
    level: 2,
    name: "Fuerza No Letal",
    description: "El sabueso de sangre puede infligir daño no letal con un arma letal sin el penalizador de -4 habitual.",
  },
  {
    level: 2,
    name: "Listo y Esperando",
    description: "El sabueso de sangre puede preparar una acción contra su marca incluso fuera de la secuencia de iniciativa; si la marca la activa en los siguientes 10 minutos, puede ejecutarla.",
  },
  {
    level: 3,
    name: "Traer con Vida",
    description: "Al reducir a su marca a -2 puntos de golpe o menos con un ataque cuerpo a cuerpo, el sabueso de sangre puede optar por dejarla en -1 puntos de golpe en vez de matarla (no disponible si está enfurecido).",
  },
  {
    level: 3,
    name: "Persecución Tenaz (+3 m)",
    description:
      "El sabueso de sangre obtiene +4 en salvaciones de Constitución contra marcha forzada al perseguir a su marca, e incrementa su velocidad hasta la de la marca (hasta +3 m en nivel 3, +6 m en nivel 6, +9 m en nivel 9), acumulable con otros bonificadores de velocidad.",
  },
  {
    level: 4,
    name: "Dedicación del Cazador",
    description: "El sabueso de sangre suma su modificador de Constitución a las salvaciones de Voluntad contra ataques o conjuros de su marca.",
  },
  {
    level: 4,
    name: "Marca (2)",
    description: "El sabueso de sangre puede tener designadas 2 marcas simultáneamente.",
  },
  {
    level: 4,
    name: "Moverse como el Viento",
    description: "El sabueso de sangre no sufre el penalizador de -5 en Esconderse o Moverse Sigilosamente al moverse a velocidad normal, y solo -10 (en vez de -20) al correr.",
  },
  {
    level: 5,
    name: "Golpe Incapacitante",
    description: "Cada ataque exitoso del sabueso de sangre contra su marca (cuerpo a cuerpo o a distancia hasta 9 m) inflige 2 puntos adicionales de daño de Fuerza, como el ataque furtivo del pícaro.",
  },
  {
    level: 5,
    name: "Rastrear lo sin Rastro",
    description: "El sabueso de sangre puede rastrear a una criatura bajo el efecto de paso sin rastro, con un penalizador de -20 a la prueba de Supervivencia.",
  },
  {
    level: 6,
    name: "Ver Invisibilidad",
    description: "El sabueso de sangre se beneficia de un efecto constante de ver invisibilidad, pero solo revela a sus marcas invisibles.",
  },
  {
    level: 6,
    name: "Mente Protegida",
    description: "El sabueso de sangre obtiene resistencia a conjuros de adivinación igual a 15 + su nivel de clase (no se acumula con otra resistencia a conjuros).",
  },
  {
    level: 7,
    name: "Localizar Criatura",
    description: "Una vez al día, el sabueso de sangre puede lanzar localizar criatura como conjuro, con nivel de lanzador igual a su nivel de personaje.",
  },
  {
    level: 7,
    name: "Marca (3)",
    description: "El sabueso de sangre puede tener designadas 3 marcas simultáneamente.",
  },
  {
    level: 8,
    name: "Libertad de Movimiento",
    description: "El sabueso de sangre se beneficia automáticamente del efecto de libertad de movimiento, activo hasta un total de 1 asalto por punto de su modificador de Sabiduría al día (mínimo 1 asalto), con nivel de lanzador igual a su nivel de clase.",
  },
  {
    level: 9,
    name: "Olfato",
    description: "El sabueso de sangre obtiene la capacidad extraordinaria de olfato.",
  },
  {
    level: 10,
    name: "Encontrar el Camino",
    description: "Dos veces al día, el sabueso de sangre puede usar encontrar el camino como conjuro, con nivel de lanzador igual a su nivel de clase.",
  },
  {
    level: 10,
    name: "Marca (4)",
    description: "El sabueso de sangre puede tener designadas hasta 4 marcas simultáneamente.",
  },
];


export const CAD_CLASSES: ClassDef[] = [
  {
    id: "cad-scout",
    name: "Batidor (Scout)",
    source: "complete-adventurer",
    description:
      "Un experto en el combate en movimiento, capaz de golpear con fuerza y desaparecer de nuevo entre la maleza antes de que el enemigo pueda reaccionar. Combina la movilidad del guardabosques con la letalidad furtiva del pícaro.",
    hitDie: 8,
    skillPointsPerLevel: 6,
    classSkills: [
      "balance",
      "climb",
      "craft",
      "handle-animal",
      "hide",
      "jump",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-nature",
      "listen",
      "move-silently",
      "profession",
      "ride",
      "search",
      "spot",
      "survival",
      "swim",
      "tumble",
      "use-rope",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "buena", will: "mala" },
    weaponProficiencies: [
      "Armas simples",
      "Cimitarra",
      "Espada corta",
      "Arco corto",
      "Lanza corta",
      "Jabalina",
    ],
    armorProficiencies: ["Armadura ligera"],
    features: SCOUT_FEATURES,
    maxLevel: 20,
  },
  {
    id: "cad-swashbuckler",
    name: "Espadachín (Swashbuckler)",
    source: "complete-adventurer",
    description:
      "Un duelista temerario que confía en la rapidez de su acero y en su propio ingenio más que en la fuerza bruta o la armadura pesada, esquivando los golpes enemigos con una gracia casi sobrenatural.",
    hitDie: 10,
    skillPointsPerLevel: 4,
    classSkills: [
      "appraise",
      "balance",
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "escape-artist",
      "gather-information",
      "intimidate",
      "jump",
      "knowledge-local",
      "knowledge-nobility-royalty",
      "perform",
      "profession",
      "ride",
      "sense-motive",
      "spot",
      "swim",
      "tumble",
      "use-rope",
    ],
    babProgression: "completa",
    saves: { fort: "mala", ref: "buena", will: "mala" },
    weaponProficiencies: ["Armas simples", "Armas marciales"],
    armorProficiencies: ["Armadura ligera"],
    features: SWASHBUCKLER_FEATURES,
    choices: SWASHBUCKLER_CHOICES,
    maxLevel: 20,
  },
  {
    id: "cad-exemplar",
    name: "Ejemplar (Exemplar)",
    source: "complete-adventurer",
    description:
      "Un maestro tan consumado en una única habilidad que ha trascendido los límites de sus compañeros de clase, convirtiendo su pericia en algo que roza lo legendario.",
    hitDie: 6,
    skillPointsPerLevel: 8,
    classSkills: [
      "appraise",
      "balance",
      "bluff",
      "climb",
      "concentration",
      "craft",
      "decipher-script",
      "diplomacy",
      "disable-device",
      "disguise",
      "escape-artist",
      "forgery",
      "gather-information",
      "handle-animal",
      "heal",
      "hide",
      "intimidate",
      "jump",
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
      "move-silently",
      "open-lock",
      "perform",
      "profession",
      "ride",
      "search",
      "sense-motive",
      "sleight-of-hand",
      "spellcraft",
      "spot",
      "survival",
      "swim",
      "tumble",
      "use-magic-device",
      "use-rope",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: EXEMPLAR_FEATURES,
    choices: EXEMPLAR_CHOICES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Diplomacia: 6 rangos",
        check: (ctx) => (ctx.skillRanks["diplomacy"] ?? 0) >= 6,
      },
      {
        description: "13 rangos en cualquier otra habilidad",
        check: (ctx) => Object.values(ctx.skillRanks).some((r) => r >= 13),
      },
      {
        description: "Especialización en Habilidad (en cualquier habilidad)",
        check: (ctx) => ctx.featIds.has("skill-focus"),
      },
    ],
  },
  {
    id: "cad-ghost-faced-killer",
    name: "Asesino Fantasma (Ghost-Faced Killer)",
    source: "complete-adventurer",
    description:
      "Un asesino silencioso entrenado en una escuela legendaria que combina las artes marciales con un sigilo casi sobrenatural, capaz de parecer que se desvanece en el aire en pleno combate.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "bluff",
      "climb",
      "concentration",
      "hide",
      "intimidate",
      "jump",
      "listen",
      "move-silently",
      "open-lock",
      "search",
      "spot",
      "swim",
      "tumble",
    ],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "mala" },
    weaponProficiencies: ["Armas simples", "Armas marciales"],
    armorProficiencies: ["Armadura ligera"],
    features: GHOST_FACED_KILLER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +5",
        check: (ctx) => ctx.babTotal >= 5,
      },
      {
        description: "Alineamiento: cualquier malvado",
      },
      {
        description: "Esconderse: 6 rangos",
        check: (ctx) => (ctx.skillRanks["hide"] ?? 0) >= 6,
      },
      {
        description: "Concentración: 4 rangos",
        check: (ctx) => (ctx.skillRanks["concentration"] ?? 0) >= 4,
      },
      {
        description: "Intimidar: 8 rangos",
        check: (ctx) => (ctx.skillRanks["intimidate"] ?? 0) >= 8,
      },
      {
        description: "Moverse Sigilosamente: 6 rangos",
        check: (ctx) => (ctx.skillRanks["move-silently"] ?? 0) >= 6,
      },
      {
        description: "Iniciativa Mejorada",
        check: (ctx) => ctx.featIds.has("improved-initiative"),
      },
      {
        description: "Ataque Poderoso",
        check: (ctx) => ctx.featIds.has("power-attack"),
      },
    ],
  },
  {
    id: "cad-spymaster",
    name: "Maestro de Espías (Spymaster)",
    source: "complete-adventurer",
    description:
      "El jefe de una red de espionaje que ha convertido la manipulación, el engaño y la recolección de información en un arte, moviendo los hilos de sus contactos desde las sombras.",
    hitDie: 6,
    skillPointsPerLevel: 8,
    classSkills: [
      "appraise",
      "balance",
      "bluff",
      "climb",
      "decipher-script",
      "diplomacy",
      "disable-device",
      "disguise",
      "escape-artist",
      "forgery",
      "gather-information",
      "hide",
      "intimidate",
      "jump",
      "knowledge-geography",
      "knowledge-history",
      "knowledge-local",
      "knowledge-nobility-royalty",
      "listen",
      "move-silently",
      "open-lock",
      "search",
      "sense-motive",
      "sleight-of-hand",
      "spot",
      "swim",
      "use-magic-device",
      "use-rope",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "buena", will: "mala" },
    weaponProficiencies: ["Armas simples", "Armas marciales"],
    armorProficiencies: ["Armadura ligera", "Armadura media"],
    features: SPYMASTER_FEATURES,
    maxLevel: 7,
    isPrestige: true,
    prerequisites: [
      {
        description: "Engañar: 8 rangos",
        check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 8,
      },
      {
        description: "Diplomacia: 4 rangos",
        check: (ctx) => (ctx.skillRanks["diplomacy"] ?? 0) >= 4,
      },
      {
        description: "Disfrazarse: 8 rangos",
        check: (ctx) => (ctx.skillRanks["disguise"] ?? 0) >= 8,
      },
      {
        description: "Falsificar: 4 rangos",
        check: (ctx) => (ctx.skillRanks["forgery"] ?? 0) >= 4,
      },
      {
        description: "Reunir Información: 4 rangos",
        check: (ctx) => (ctx.skillRanks["gather-information"] ?? 0) >= 4,
      },
      {
        description: "Averiguar Intenciones: 4 rangos",
        check: (ctx) => (ctx.skillRanks["sense-motive"] ?? 0) >= 4,
      },
      {
        description: "Especialización en Habilidad (Engañar)",
        check: (ctx) => ctx.featIds.has("skill-focus"),
      },
    ],
  },
  {
    id: "cad-tempest",
    name: "Tempestad (Tempest)",
    source: "complete-adventurer",
    description:
      "Un guerrero que ha llevado el combate con dos armas a su máxima expresión, convirtiendo el ataque y la defensa simultáneos con acero en ambas manos en un torbellino letal.",
    hitDie: 10,
    skillPointsPerLevel: 2,
    classSkills: ["balance", "climb", "craft", "jump", "sleight-of-hand", "tumble"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "mala", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: TEMPEST_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +6",
        check: (ctx) => ctx.babTotal >= 6,
      },
      {
        description: "Esquiva",
        check: (ctx) => ctx.featIds.has("dodge"),
      },
      {
        description: "Combate con Dos Armas",
        check: (ctx) => ctx.featIds.has("two-weapon-fighting"),
      },
      {
        description: "Combate con Dos Armas Mejorado",
        check: (ctx) => ctx.featIds.has("improved-two-weapon-fighting"),
      },
      {
        description: "Movilidad",
        check: (ctx) => ctx.featIds.has("mobility"),
      },
      {
        description: "Ataque en Carrera",
        check: (ctx) => ctx.featIds.has("spring-attack"),
      },
    ],
  },
  {
    id: "cad-bloodhound",
    name: "Sabueso de Sangre (Bloodhound)",
    source: "complete-adventurer",
    description:
      "Un cazarrecompensas y rastreador implacable, especializado en localizar y dar caza a un fugitivo concreto hasta los confines del mundo.",
    hitDie: 10,
    skillPointsPerLevel: 6,
    classSkills: [
      "bluff",
      "climb",
      "diplomacy",
      "disguise",
      "gather-information",
      "heal",
      "hide",
      "intimidate",
      "jump",
      "listen",
      "move-silently",
      "open-lock",
      "ride",
      "search",
      "sense-motive",
      "spot",
      "survival",
      "swim",
      "use-rope",
    ],
    babProgression: "completa",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: ["Armas simples", "Armas marciales"],
    armorProficiencies: ["Armadura ligera"],
    features: BLOODHOUND_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +4",
        check: (ctx) => ctx.babTotal >= 4,
      },
      {
        description: "Reunir Información: 4 rangos",
        check: (ctx) => (ctx.skillRanks["gather-information"] ?? 0) >= 4,
      },
      {
        description: "Moverse Sigilosamente: 4 rangos",
        check: (ctx) => (ctx.skillRanks["move-silently"] ?? 0) >= 4,
      },
      {
        description: "Supervivencia: 4 rangos",
        check: (ctx) => (ctx.skillRanks["survival"] ?? 0) >= 4,
      },
      {
        description: "Aguante",
        check: (ctx) => ctx.featIds.has("endurance"),
      },
      {
        description: "Rastrear",
        check: (ctx) => ctx.featIds.has("track"),
      },
    ],
  },
];
