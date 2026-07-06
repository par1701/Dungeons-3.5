import type { ClassDef } from "../../types";

// Clases de Complete Adventurer (2005).
//
// Se incluyen dos clases base centradas en el combate ágil y furtivo
// (Explorador Furtivo y Espadachín) y un puñado de clases de prestigio
// representativas del libro, elegidas por ser razonablemente conocidas y
// por poder documentarse con confianza.
//
// Igual que en complete-arcane/classes.ts, cuando una clase de prestigio se
// limita a hacer progresar el ataque furtivo o el nivel de lanzador de una
// clase que el personaje ya posee, ese efecto se documenta como un rasgo de
// clase (ClassFeature) de texto en vez de automatizarse, porque el modelo de
// datos todavía no soporta "tomar prestada" la progresión de otra clase.
//
// Las progresiones numéricas de Golpe de Escaramuza (Explorador Furtivo) y
// de Gracia / Bono de Perspicacia (Espadachín) son aproximadas: siguen el
// espíritu de las clases originales, pero se ha priorizado una progresión
// razonable y jugable sobre la reproducción exacta tabla por tabla.

// ---------------------------------------------------------------------------
// Explorador Furtivo (Scout)
// ---------------------------------------------------------------------------

const SCOUT_FEATURES = [
  {
    level: 1,
    name: "Golpe de Escaramuza +1d6/+1 CA",
    description:
      "Si el explorador se mueve al menos 3 metros durante su turno antes de realizar un ataque cuerpo a cuerpo o a distancia (y no tiene un aliado que le ayude a flanquear, ni recurre a él para determinar el flanqueo), inflige 1d6 puntos de daño adicional con ese ataque y obtiene un bonificador de +1 a la Clase de Armadura hasta el comienzo de su siguiente turno. No funciona si el explorador lleva armadura media o pesada, ni si está inmovilizado o no puede moverse libremente.",
  },
  {
    level: 1,
    name: "Detectar Trampas",
    description:
      "El explorador puede usar la habilidad Buscar para localizar trampas mágicas con CD 25 o más, igual que un pícaro.",
  },
  {
    level: 2,
    name: "Bono de Batalla",
    description:
      "El explorador obtiene un bonificador de competencia a las tiradas de iniciativa y a las tiradas de salvación de Fortaleza igual a la mitad de su nivel de explorador (redondeando hacia abajo, mínimo +1).",
  },
  {
    level: 3,
    name: "Movimiento Rápido",
    description: "La velocidad base del explorador aumenta en 3 metros mientras no lleve una carga pesada ni armadura media o pesada.",
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
      "El explorador conserva su bonificador de Destreza a la Clase de Armadura incluso cuando es sorprendido o atacado por un enemigo invisible (salvo que esté inmovilizado).",
  },
  {
    level: 6,
    name: "Camuflaje",
    description: "El explorador puede usar la habilidad Esconderse incluso mientras es observado, siempre que se encuentre en un entorno natural que le proporcione algún tipo de cobertura o distracción visual.",
  },
  {
    level: 7,
    name: "Golpe de Escaramuza +2d6/+2 CA",
    description: "El bonificador de Clase de Armadura del Golpe de Escaramuza aumenta a +2.",
  },
  {
    level: 8,
    name: "Paso Certero",
    description: "El explorador ignora el terreno difícil de origen natural (no mágico) al moverse, y puede atravesar zonas de vegetación densa a su velocidad normal.",
  },
  {
    level: 9,
    name: "Esquiva Sobrenatural Mejorada",
    description:
      "El explorador ya no puede perder su bono de Destreza a la Clase de Armadura por estar flanqueado, excepto ante un atacante que sea pícaro y tenga al menos 4 niveles de pícaro más que él.",
  },
  {
    level: 10,
    name: "Golpe de Escaramuza +3d6/+2 CA",
    description: "El daño adicional del Golpe de Escaramuza aumenta a 3d6.",
  },
  {
    level: 11,
    name: "Sentido Ciego 3 m",
    description: "El explorador desarrolla una percepción tan aguda de su entorno inmediato que puede detectar criaturas a 3 metros sin necesidad de verlas, mediante el oído, el olfato y las vibraciones.",
  },
  {
    level: 13,
    name: "Golpe de Escaramuza +3d6/+3 CA",
    description: "El bonificador de Clase de Armadura del Golpe de Escaramuza aumenta a +3.",
  },
  {
    level: 14,
    name: "Camuflaje Superior",
    description: "El bonificador que el explorador obtiene por Camuflaje se convierte en la capacidad de esconderse incluso sin ningún tipo de cobertura, siempre que no esté completamente a la vista en campo abierto.",
  },
  {
    level: 16,
    name: "Golpe de Escaramuza +4d6/+3 CA",
    description: "El daño adicional del Golpe de Escaramuza aumenta a 4d6.",
  },
  {
    level: 17,
    name: "Sentido Ciego 9 m",
    description: "El alcance del Sentido Ciego del explorador aumenta a 9 metros.",
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
    description: "El espadachín obtiene Finta como Sabio en Combate o Especialización en Arma como dote de bonificación (a elegir) para el arma que empuñe con mayor frecuencia.",
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
// Exemplar
// ---------------------------------------------------------------------------

const EXEMPLAR_FEATURES = [
  {
    level: 1,
    name: "Habilidad Insigne",
    description:
      "Al entrar en la clase, el exemplar elige una habilidad en la que tenga al menos 12 rangos: se convierte en su \"habilidad insigne\". El exemplar obtiene un bonificador de +2 a las pruebas de esa habilidad.",
  },
  {
    level: 1,
    name: "Progresión de Clase Base",
    description:
      "Cada nivel de exemplar cuenta como un nivel de la clase base que el exemplar poseyera antes de entrar en la clase de prestigio a efectos de rasgos de clase dependientes del nivel (por ejemplo, ataque furtivo de pícaro, torrente de golpes de monje o estilo de combate de guardabosques), aunque no otorga puntos de golpe, bonificador base de ataque ni salvaciones de esa clase.",
  },
  {
    level: 2,
    name: "Resistencia a Fatiga",
    description: "El exemplar es inmune a los efectos de fatiga y agotamiento inducidos por el uso extremo de su habilidad insigne (por ejemplo, correr, trepar o luchar sin descanso).",
  },
  {
    level: 3,
    name: "Habilidad Insigne Mejorada",
    description: "El bonificador a la habilidad insigne aumenta a +4.",
  },
  {
    level: 4,
    name: "Dote Adicional",
    description: "El exemplar obtiene una dote adicional que cumpla sus requisitos.",
  },
  {
    level: 5,
    name: "Hazaña Legendaria",
    description: "Una vez por día, el exemplar puede realizar una prueba de su habilidad insigne con un bonificador de competencia adicional igual a su nivel de exemplar, representando un golpe de suerte o pericia sobrehumana.",
  },
  {
    level: 6,
    name: "Habilidad Insigne Superior",
    description: "El bonificador a la habilidad insigne aumenta a +6.",
  },
  {
    level: 7,
    name: "Resistencia a la Muerte Súbita",
    description: "El exemplar obtiene un bonificador de +2 de competencia a las tiradas de salvación contra efectos de muerte instantánea y contra golpes críticos que le reduzcan a menos de 0 puntos de golpe.",
  },
  {
    level: 8,
    name: "Dote Adicional",
    description: "El exemplar obtiene una segunda dote adicional que cumpla sus requisitos.",
  },
  {
    level: 9,
    name: "Hazaña Legendaria Mejorada",
    description: "El exemplar puede usar la Hazaña Legendaria dos veces al día.",
  },
  {
    level: 10,
    name: "Leyenda Viviente",
    description: "El bonificador a la habilidad insigne aumenta a +8 y el exemplar se convierte en una leyenda reconocida en su campo: quienes hayan oído hablar de sus hazañas reaccionan ante él con una actitud inicial mejorada.",
  },
];

// ---------------------------------------------------------------------------
// Asesino de Rostro Fantasma (Ghost-Faced Killer)
// ---------------------------------------------------------------------------

const GHOST_FACED_KILLER_FEATURES = [
  {
    level: 1,
    name: "Progresión de Ataque Furtivo",
    description:
      "Cada nivel de asesino de rostro fantasma otorga al personaje el mismo daño adicional de ataque furtivo que habría obtenido si ese nivel se hubiera tomado en una clase con ataque furtivo que ya poseyera (pícaro, ninja de la luna creciente, etc.), sumándose a cualquier ataque furtivo previo.",
  },
  {
    level: 1,
    name: "Bono de Clase de Armadura",
    description: "Mientras no lleve armadura ni escudo, el asesino de rostro fantasma suma su modificador de Sabiduría (si es positivo) como bonificador de perspicacia a la Clase de Armadura.",
  },
  {
    level: 2,
    name: "Uso de Venenos",
    description: "El asesino de rostro fantasma puede aplicar veneno a un arma sin riesgo de envenenarse a sí mismo accidentalmente.",
  },
  {
    level: 3,
    name: "Paso Fantasmal",
    description: "Un número de veces por día igual a su modificador de Sabiduría (mínimo 1), el asesino de rostro fantasma puede desaparecer brevemente y reaparecer a hasta 3 metros de distancia, como una versión menor del conjuro parpadeo dimensional, como acción rápida.",
  },
  {
    level: 4,
    name: "Velocidad de Trepa",
    description: "El asesino de rostro fantasma obtiene una velocidad de trepa igual a la mitad de su velocidad base, y puede tomar 10 en las pruebas de Trepar incluso bajo amenaza o distracción.",
  },
  {
    level: 5,
    name: "Ataque Certero Silencioso",
    description: "Cuando el asesino de rostro fantasma inflige daño de ataque furtivo con un arma que cause daño no letal o con un ataque desarmado, puede optar por dejar a la víctima inconsciente en vez de infligir el daño normal, sin penalización.",
  },
  {
    level: 6,
    name: "Uno con las Sombras",
    description: "El asesino de rostro fantasma obtiene un bonificador de +4 de competencia a las pruebas de Esconderse mientras permanece inmóvil en una zona de penumbra o sombra.",
  },
  {
    level: 8,
    name: "Paso Fantasmal Mejorado",
    description: "El alcance del Paso Fantasmal aumenta a 9 metros y puede usarse como acción gratuita una vez por asalto.",
  },
  {
    level: 10,
    name: "Golpe del Espectro",
    description: "Una vez al día, el asesino de rostro fantasma puede realizar un único ataque cuerpo a cuerpo contra el que el objetivo no puede beneficiarse de ningún bonificador de Destreza a la Clase de Armadura ni de resistencia al daño que no sea contra armas mágicas, sea cual sea su naturaleza.",
  },
];

// ---------------------------------------------------------------------------
// Ninja de la Luna Creciente (Ninja of the Crescent Moon)
// ---------------------------------------------------------------------------

const NINJA_OF_THE_CRESCENT_MOON_FEATURES = [
  {
    level: 1,
    name: "Progresión de Ataque Furtivo",
    description:
      "Cada nivel de ninja de la luna creciente otorga al personaje el mismo daño adicional de ataque furtivo que habría obtenido si ese nivel se hubiera tomado en una clase con ataque furtivo que ya poseyera, sumándose a cualquier ataque furtivo previo.",
  },
  {
    level: 1,
    name: "Camuflaje Lunar",
    description: "Durante la noche o bajo luz tenue, el ninja de la luna creciente obtiene un bonificador de +4 de competencia a las pruebas de Esconderse y Moverse Sigilosamente.",
  },
  {
    level: 2,
    name: "Sin Rastro",
    description: "El ninja de la luna creciente deja tan pocas huellas que quienes intenten Seguir Rastros suyos sufren una penalización de -10 a la prueba.",
  },
  {
    level: 3,
    name: "Oscuridad a Voluntad",
    description: "El ninja de la luna creciente puede lanzar oscuridad (como conjuro, nivel de lanzador igual a su nivel de clase) a voluntad.",
  },
  {
    level: 5,
    name: "Rayo de Luna",
    description: "Una vez por asalto, el ninja de la luna creciente puede canalizar un rayo de luz plateada mediante un ataque de toque a distancia (alcance 18 metros) que inflige 1d6 puntos de daño por cada dos niveles de clase; los no muertos y las criaturas vulnerables a la plata sufren el doble de daño.",
  },
  {
    level: 7,
    name: "Invisibilidad a Voluntad",
    description: "El ninja de la luna creciente puede lanzar invisibilidad sobre sí mismo (como conjuro, nivel de lanzador igual a su nivel de clase) a voluntad.",
  },
  {
    level: 10,
    name: "Manto de la Luna Nueva",
    description: "Durante la noche, el ninja de la luna creciente puede adoptar una forma gaseosa (como el conjuro forma gaseosa) durante 1 asalto por nivel de clase, una vez al día.",
  },
];

// ---------------------------------------------------------------------------
// Maestro de Espías (Spymaster)
// ---------------------------------------------------------------------------

const SPYMASTER_FEATURES = [
  {
    level: 1,
    name: "Red de Contactos",
    description:
      "El maestro de espías ha cultivado una red de informadores. Una vez por semana (por nivel de maestro de espías) puede invertir tiempo y una pequeña suma de dinero para obtener del director de juego un rumor o dato útil relacionado con su investigación actual, sujeto a que exista alguien en la zona que pueda saberlo.",
  },
  {
    level: 1,
    name: "Farsa Perfecta",
    description: "El maestro de espías obtiene un bonificador de +2 de competencia a las pruebas de Engañar, Disfrazarse y Reunir Información.",
  },
  {
    level: 2,
    name: "Detectar Mentiras",
    description: "Un número de veces por día igual a su modificador de Carisma (mínimo 1), el maestro de espías puede usar detectar mentiras (como el conjuro) al escuchar la respuesta de una criatura a una única pregunta.",
  },
  {
    level: 3,
    name: "Farsa Perfecta Mejorada",
    description: "El bonificador de Farsa Perfecta aumenta a +4.",
  },
  {
    level: 4,
    name: "Identidad Falsa",
    description: "El maestro de espías puede mantener una identidad alternativa completa; mientras la interpreta, las pruebas de Averiguar Intenciones u otros medios para desenmascararlo sufren una CD adicional de +5.",
  },
  {
    level: 6,
    name: "Nunca a Flor de Piel",
    description: "El maestro de espías es inmune a los efectos que detectan directamente su alineamiento o sus emociones (como detectar el mal o el conjuro sondear pensamientos, en lo que respecta a percibir su lealtad), a menos que el conjuro sea de nivel superior a la mitad de su nivel de clase.",
  },
  {
    level: 8,
    name: "Farsa Perfecta Superior",
    description: "El bonificador de Farsa Perfecta aumenta a +6.",
  },
  {
    level: 10,
    name: "El Espía que Nunca Estuvo Allí",
    description: "Una vez al día, el maestro de espías puede hacer que un testigo que lo haya visto claramente dude por completo de haberlo visto, como si se le hubiera aplicado un efecto de modificación de memoria limitado a ese único recuerdo (sujeto al arbitrio del director de juego).",
  },
];

// ---------------------------------------------------------------------------
// Tempestad (Tempest)
// ---------------------------------------------------------------------------

const TEMPEST_FEATURES = [
  {
    level: 1,
    name: "Defensa de Dos Armas Mejorada",
    description: "Mientras lucha con un arma en cada mano, la tempestad obtiene un bonificador de +1 a la Clase de Armadura, que se suma a cualquier otro bonificador por combatir con dos armas.",
  },
  {
    level: 2,
    name: "Danza de Acero",
    description: "La tempestad reduce en 2 la penalización por combatir con dos armas al ataque con su arma principal y en 6 la penalización al ataque con su arma secundaria, además de cualquier reducción por dotes de combate con dos armas.",
  },
  {
    level: 3,
    name: "Defensa de Dos Armas Mejorada +2",
    description: "El bonificador a la Clase de Armadura por luchar con dos armas aumenta a +2.",
  },
  {
    level: 4,
    name: "Torbellino de Acero",
    description: "Una vez por combate, la tempestad puede realizar un ataque adicional con su arma secundaria contra un enemigo que ya haya atacado ese asalto, como acción gratuita.",
  },
  {
    level: 5,
    name: "Ojo de la Tempestad",
    description: "La tempestad ya no puede ser flanqueada mientras empuñe un arma en cada mano, y el bonificador a la Clase de Armadura por luchar con dos armas aumenta a +3.",
  },
];

export const CAD_CLASSES: ClassDef[] = [
  {
    id: "cad-scout",
    name: "Explorador Furtivo (Scout)",
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
    maxLevel: 20,
  },
  {
    id: "cad-exemplar",
    name: "Exemplar",
    source: "complete-adventurer",
    description:
      "Un maestro tan consumado en una única habilidad que ha trascendido los límites de sus compañeros de clase, convirtiendo su pericia en algo que roza lo legendario.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "balance",
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "hide",
      "intimidate",
      "jump",
      "knowledge-local",
      "move-silently",
      "perform",
      "profession",
      "sense-motive",
      "spot",
      "swim",
      "tumble",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: EXEMPLAR_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Al menos 12 rangos en una habilidad cualquiera, elegida como habilidad insigne al entrar en la clase",
      },
      {
        description: "Dos dotes cualesquiera",
        check: (ctx) => ctx.featIds.size >= 2,
      },
      {
        description: "Reputación +4 (regla opcional de reputación, a discreción del director de juego)",
      },
    ],
  },
  {
    id: "cad-ghost-faced-killer",
    name: "Asesino de Rostro Fantasma (Ghost-Faced Killer)",
    source: "complete-adventurer",
    description:
      "Un asesino silencioso entrenado en una escuela legendaria que combina las artes marciales con un sigilo casi sobrenatural, capaz de parecer que se desvanece en el aire en pleno combate.",
    hitDie: 8,
    skillPointsPerLevel: 6,
    classSkills: [
      "balance",
      "climb",
      "craft",
      "escape-artist",
      "hide",
      "jump",
      "listen",
      "move-silently",
      "perform",
      "sense-motive",
      "spot",
      "tumble",
      "use-rope",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: GHOST_FACED_KILLER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Equilibrio 8 rangos",
        check: (ctx) => (ctx.skillRanks["balance"] ?? 0) >= 8,
      },
      {
        description: "Esconderse 8 rangos",
        check: (ctx) => (ctx.skillRanks["hide"] ?? 0) >= 8,
      },
      {
        description: "Moverse Sigilosamente 8 rangos",
        check: (ctx) => (ctx.skillRanks["move-silently"] ?? 0) >= 8,
      },
      {
        description: "Ataque Desarmado a Mano Limpia",
        check: (ctx) => ctx.featIds.has("improved-unarmed-strike"),
      },
      {
        description: "Ataque furtivo +2d6 o superior",
      },
    ],
  },
  {
    id: "cad-ninja-of-the-crescent-moon",
    name: "Ninja de la Luna Creciente (Ninja of the Crescent Moon)",
    source: "complete-adventurer",
    description:
      "Un espía y asesino iniciado en una sociedad secreta que venera la luna, capaz de mezclarse con la oscuridad y de canalizar una luz plateada contra sus enemigos.",
    hitDie: 6,
    skillPointsPerLevel: 6,
    classSkills: [
      "balance",
      "bluff",
      "climb",
      "craft",
      "disguise",
      "escape-artist",
      "hide",
      "jump",
      "listen",
      "move-silently",
      "search",
      "sense-motive",
      "spot",
      "tumble",
      "use-rope",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: NINJA_OF_THE_CRESCENT_MOON_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Esconderse 8 rangos",
        check: (ctx) => (ctx.skillRanks["hide"] ?? 0) >= 8,
      },
      {
        description: "Moverse Sigilosamente 8 rangos",
        check: (ctx) => (ctx.skillRanks["move-silently"] ?? 0) >= 8,
      },
      {
        description: "Finta con Armas Ligeras (Weapon Finesse)",
        check: (ctx) => ctx.featIds.has("weapon-finesse"),
      },
      {
        description: "Ataque furtivo +1d6 o superior",
      },
      {
        description: "Alineamiento no legal",
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
      "bluff",
      "diplomacy",
      "disguise",
      "forgery",
      "gather-information",
      "hide",
      "intimidate",
      "knowledge-local",
      "knowledge-nobility-royalty",
      "listen",
      "move-silently",
      "perform",
      "profession",
      "search",
      "sense-motive",
      "spot",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: SPYMASTER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Engañar 9 rangos",
        check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 9,
      },
      {
        description: "Diplomacia 9 rangos",
        check: (ctx) => (ctx.skillRanks["diplomacy"] ?? 0) >= 9,
      },
      {
        description: "Reunir Información 9 rangos",
        check: (ctx) => (ctx.skillRanks["gather-information"] ?? 0) >= 9,
      },
      {
        description: "Averiguar Intenciones 4 rangos",
        check: (ctx) => (ctx.skillRanks["sense-motive"] ?? 0) >= 4,
      },
      {
        description: "Poseer o dirigir una red de contactos e informadores propia (a discreción del director de juego)",
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
    skillPointsPerLevel: 4,
    classSkills: ["balance", "climb", "craft", "jump", "profession", "ride", "swim", "tumble"],
    babProgression: "completa",
    saves: { fort: "buena", ref: "buena", will: "mala" },
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
        description: "Amenaza (Dodge)",
        check: (ctx) => ctx.featIds.has("dodge"),
      },
      {
        description: "Combatir con Dos Armas (Two-Weapon Fighting)",
        check: (ctx) => ctx.featIds.has("two-weapon-fighting"),
      },
      {
        description: "Ataque Especializado con cualquier arma",
        check: (ctx) => ctx.featIds.has("weapon-focus"),
      },
    ],
  },
];
