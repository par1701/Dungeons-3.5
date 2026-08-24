import type { ClassDef, ClassFeature, ClassFeatureChoice, FeatPrereqContext } from "../../types";

// Clases de prestigio de Complete Arcane (2004).
//
// No se incluye al Brujo (Warlock): su magia funciona mediante invocaciones a
// voluntad, un subsistema que nuestro modelo de datos (SpellcastingInfo basado
// en conjuros por día) no soporta todavía.
//
// Tampoco se incluye al Mago Wu Jen: para representarlo con fidelidad haría
// falta modelar sus "secretos elementales" y su lista de conjuros propia con
// precisión, y no hay confianza suficiente en esos detalles como para no
// arriesgarse a inventar contenido. Se prioriza omitir antes que inventar.
//
// La mayoría de las clases de prestigio de este archivo pertenecen a la
// categoría de PrCs que avanzan el nivel de lanzador de una clase arcana que
// el personaje ya poseía, en vez de tener su propia tabla independiente de
// conjuros por día. Como el sistema todavía no automatiza "avanzar el nivel
// de lanzador de otra clase", ese efecto se documenta como un rasgo de clase
// (ClassFeature) de texto en cada nivel, y el campo `spellcasting` se omite a
// propósito. Un pequeño número de clases (Acorde Sublime, Arcanamach Suelio)
// tienen en cambio su propia tabla independiente de conjuros por día; por la
// misma limitación del motor, esa tabla también se documenta como texto en
// vez de modelarse con `spellcasting`.
//
// Incantatriz (ca-incantatrix) y Maestro Pálido (ca-pale-master) no tienen
// documento de referencia en docs/prestige/ (no existe incantatrix.md ni
// pale-master.md pese a que ambas pertenecen a Complete Arcane). Se dejan tal
// cual están, sin verificar ni modificar, siguiendo la política de no
// arriesgarse a corregir sin una fuente fiable.

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

const ARCANE_METAMAGIC_FEAT_IDS = [
  "empower-spell",
  "enlarge-spell",
  "extend-spell",
  "heighten-spell",
  "maximize-spell",
  "quicken-spell",
  "silent-spell",
  "still-spell",
  "widen-spell",
];

function countMatchingFeats(featIds: Set<string>, candidates: string[]): number {
  return candidates.filter((id) => featIds.has(id)).length;
}

// ---------------------------------------------------------------------------
// Acólito de la Piel (Acolyte of the Skin)
// ---------------------------------------------------------------------------

const ACOLYTE_OF_THE_SKIN_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Vestir Demonio",
    description:
      "El acólito de la piel invoca la esencia de un ser feérico o demoníaco y la lleva puesta como una segunda piel: obtiene +1 a la bonificación de armadura natural, +2 inherente a Destreza y visión en la oscuridad hasta 18 m.",
  },
  {
    level: 1,
    name: "Veneno (1/día)",
    description:
      "Puede usar veneno una vez al día como si fuera un lanzador de conjuros de nivel 8; la CD de salvación es 14 + su modificador de la característica de lanzamiento principal.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "En los niveles 2º, 4º, 6º, 8º y 10º de acólito de la piel, el personaje obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase). Los niveles impares no otorgan este beneficio.",
  },
  {
    level: 2,
    name: "Resistente al Fuego",
    description: "Obtiene resistencia al fuego 10.",
  },
  {
    level: 3,
    name: "Mirada Diabólica",
    description:
      "Una vez al día como acción estándar, puede afectar a una criatura visible dentro de 30 m (no requiere que el objetivo la vea, pero sí línea de efecto). El objetivo queda conmocionado durante 10 minutos y debe superar una salvación de Voluntad (CD 10 + nivel de clase + modificador de Carisma) o queda aturdido: 10 asaltos si tiene 50 pg o menos, 3 asaltos si tiene 51-100 pg, 2 asaltos si tiene 101-150 pg, o 1 asalto si tiene 151 pg o más. Es un efecto de miedo que afecta a la mente.",
  },
  {
    level: 5,
    name: "Adaptación de Piel",
    description:
      "La bonificación de armadura natural mejora a +2, gana +2 inherente a Constitución y la visión en la oscuridad se extiende a 36 m.",
  },
  {
    level: 5,
    name: "Veneno (2/día)",
    description: "Puede usar la habilidad de Veneno dos veces al día en vez de una.",
  },
  {
    level: 6,
    name: "Resistente al Frío",
    description: "Obtiene resistencia al frío 10.",
  },
  {
    level: 7,
    name: "Mirada del Abismo",
    description:
      "Una vez al día como acción estándar, proyecta dos rayos (alcance 30 m) que requieren un ataque de toque a distancia cada uno y causan 8d6 de daño de fuego; puede dirigir cada rayo a un objetivo distinto.",
  },
  {
    level: 9,
    name: "Invocar Demonio",
    description:
      "Una vez al día puede invocar un babau (si su piel es demoníaca) o un diablo de cadenas (si es diabólica), que le obedece y regresa automáticamente tras 1 hora; el nivel de lanzador para este efecto es igual a su nivel de lanzador de conjuros.",
  },
  {
    level: 10,
    name: "Simbiosis Diabólica",
    description:
      "Su tipo de criatura cambia a monstruo exterior y gana reducción de daño 10/bueno; a diferencia de otros monstruos exteriores, sigue pudiendo ser resucitado o devuelto a la vida con normalidad.",
  },
];

// ---------------------------------------------------------------------------
// Alienista (Alienist)
// ---------------------------------------------------------------------------

const ALIENIST_CHOICES: ClassFeatureChoice[] = [
  {
    id: "secreto-metamagico",
    featureName: "Secreto Metamágico",
    levels: [3, 7],
    label: "Secreto metamágico (dote de metamagia adicional)",
    kind: "dote_categoria",
    featCategoryOptions: ["metamagia"],
  },
];

const ALIENIST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Habilidades de Familiar",
    description:
      "Los niveles de alienista se suman a los de cualquier clase que otorgue familiar para determinar la armadura natural, la Inteligencia y las habilidades especiales del familiar; no otorga un familiar por sí sola.",
  },
  {
    level: 1,
    name: "Invocar Alienígena",
    description:
      "Cuando el alienista lanzaría un conjuro de invocar monstruo para invocar una criatura celestial, feérica o diabólica, en su lugar invoca la versión pseudonatural de esa criatura, perdiendo la capacidad de invocar la versión normal con esos conjuros.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de alienista (1º a 10º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 2,
    name: "Bendición Alienígena",
    description: "Gana +1 de bonificación de intuición a todas las salvaciones, pero pierde permanentemente 2 puntos de Sabiduría.",
  },
  {
    level: 3,
    name: "Secreto Metamágico",
    description: "Puede elegir cualquier dote de metamagia como dote de bonificación, aunque no cumpla sus prerrequisitos.",
  },
  {
    level: 4,
    name: "Certeza Demente",
    description:
      "Gana 3 puntos de golpe adicionales, pero sufre un penalizador de -4 en Engañar, Diplomacia y Trato con Animales al tratar con criaturas que no sean pseudonaturales.",
  },
  {
    level: 5,
    name: "Familiar Pseudonatural",
    description: "Si tiene un familiar, este obtiene la plantilla pseudonatural además de sus poderes normales.",
  },
  {
    level: 6,
    name: "Invocación Extra",
    description:
      "Gana un espacio de conjuro adicional en su nivel más alto, utilizable solo para lanzar un conjuro de invocar monstruo; el espacio migra al nuevo nivel más alto conforme sube de nivel.",
  },
  {
    level: 7,
    name: "Secreto Metamágico (2.º)",
    description: "Puede elegir una segunda dote de metamagia como dote de bonificación, aunque no cumpla sus prerrequisitos.",
  },
  {
    level: 8,
    name: "Certeza Insana",
    description:
      "Gana 3 puntos de golpe adicionales más (6 en total desde nivel 4), y el penalizador contra criaturas no pseudonaturales en Engañar, Diplomacia y Trato con Animales aumenta a -10.",
  },
  {
    level: 9,
    name: "Cuerpo Atemporal",
    description:
      "No sufre penalizadores de característica por envejecimiento y no puede ser envejecido mágicamente; las bonificaciones por envejecimiento siguen acumulándose y los penalizadores ya sufridos permanecen.",
  },
  {
    level: 10,
    name: "Trascendencia Alienígena",
    description:
      "Su tipo cambia a monstruo exterior; gana reducción de daño 10/mágico y resistencia a ácido 10 y electricidad 10. Sufre -4 en Disfrazarse para ocultar su naturaleza, pero gana +2 de circunstancia en pruebas basadas en Carisma con seres afines al Reino Lejano y en Intimidar contra quienes se la revele.",
  },
];

// ---------------------------------------------------------------------------
// Sabio Argénteo (Argent Savant)
// ---------------------------------------------------------------------------

const ARGENT_SAVANT_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Especialización en Fuerza",
    description:
      "Gana +2 de competencia en las tiradas de ataque con conjuros de fuerza, y +1 por dado de daño en conjuros con el descriptor de fuerza (o +1 al daño total si el conjuro no expresa el daño en dados).",
  },
  {
    level: 2,
    name: "Armadura de Fuerza",
    description:
      "Si un conjuro de fuerza que lanza otorga una bonificación de armadura o de escudo a la Clase de Armadura, esa bonificación aumenta en +2 (por ejemplo, armadura del mago pasa de +4 a +6).",
  },
  {
    level: 2,
    name: "Progresión de Conjuros Arcanos",
    description:
      "En los niveles 2º a 5º, el sabio argénteo obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase). El nivel 1º no otorga este beneficio.",
  },
  {
    level: 3,
    name: "Fuerza Perdurable",
    description:
      "La duración de sus conjuros de fuerza se duplica (como con la dote Extender Conjuro, sin cambiar nivel ni tiempo de lanzamiento), y la CD para contrarrestarlos o disiparlos aumenta en +4.",
  },
  {
    level: 4,
    name: "Ablación de Fuerza",
    description:
      "Resta su nivel de clase al daño que recibe de cualquier conjuro o efecto de fuerza (un conjuro con múltiples ataques, como proyectil mágico, resta el nivel una sola vez del daño total, no de cada proyectil).",
  },
  {
    level: 5,
    name: "Liberar Fuerza",
    description:
      "Como acción estándar, puede intentar disipar un único conjuro o efecto de fuerza dentro de 18 m (incluso los normalmente inmunes a disipar magia, como muro de fuerza) mediante una prueba de nivel de lanzador (CD 11 + nivel del lanzador contrario). Si tiene éxito, el efecto se disipa de inmediato y causa 1d6 de daño de fuerza por nivel del conjuro disipado a todas las criaturas y objetos en 3 m del lugar del efecto liberado.",
  },
];

// ---------------------------------------------------------------------------
// Mago de Sangre (Blood Magus)
// ---------------------------------------------------------------------------

const BLOOD_MAGUS_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Componente de Sangre",
    description:
      "Como acción gratuita, puede sustituir un componente material de un conjuro por una gota de su propia sangre, sufriendo 1 punto de daño no reducible por reducción de daño, para aumentar el nivel de lanzador del conjuro en +1. Los componentes materiales costosos (más de 1 po) deben seguir aportándose.",
  },
  {
    level: 1,
    name: "Lanzamiento Resistente",
    description:
      "Al calcular la CD de una prueba de Concentración por daño recibido mientras lanza, mantiene o dirige un conjuro, resta su nivel de clase al daño de cada fuente que le impacta durante la acción.",
  },
  {
    level: 1,
    name: "Restañar",
    description: "Se estabiliza automáticamente al caer por debajo de 0 puntos de golpe; aun así muere a -10 pg o menos.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "En todos los niveles excepto el 5º y el 10º, el mago de sangre obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 2,
    name: "Escarificación",
    description:
      "Puede inscribir conjuros en su propia piel (sin causar daño) como si tuviera la dote Inscribir Pergamino, con las mismas reglas, costos en po y en PX; solo él puede leer sus propias cicatrices, hasta un máximo de 6 activas a la vez.",
  },
  {
    level: 3,
    name: "Toque de Muerte",
    description: "Puede usar toque de muerte como conjuro una vez al día.",
  },
  {
    level: 4,
    name: "Trago de Sangre",
    description:
      "Puede almacenar conjuros de hasta nivel 3 en su propia sangre, como con la dote Elaborar Pociones, con las mismas reglas y excepciones: el máximo de tragos almacenados a la vez es igual a su nivel de mago de sangre más su puntuación de Constitución; consumir un trago es una acción estándar que provoca ataques de oportunidad; otra criatura puede beber una onza de su sangre (acción completa, requiere herida abierta o 1 punto de daño infligido) para recibir el efecto; el trago pierde potencia en 1 asalto si no se extrae fresco.",
  },
  {
    level: 5,
    name: "Homúnculo",
    description:
      "Puede dar vida a un homúnculo con su sangre sin cumplir sus prerrequisitos normales, sacrificando permanentemente 1 punto de golpe; el proceso toma 1 hora. Tocando al homúnculo puede transferirle sus propias heridas, hasta 1 pg por nivel por toque. El homúnculo avanza 1 dado de golpe por cada nivel de clase ganado, hasta un máximo de 6 DG a nivel 9. Si el homúnculo es destruido, sufre 2d10 de daño; su propia muerte mata al homúnculo. Solo puede tener uno a la vez.",
  },
  {
    level: 6,
    name: "Conjuro Buscasangre",
    description:
      "Hiriéndose (acción gratuita, 3 puntos de daño no reducibles por reducción de daño), puede imbuir un conjuro para que cause 1d6 de daño extra a cada objetivo que sufra daño de puntos de golpe por el conjuro; no afecta daño de característica ni drenaje. Constructos, elementales, cieno, plantas, no muertos y criaturas sin sangre son inmunes.",
  },
  {
    level: 7,
    name: "Más Espesa que el Agua",
    description: "Gana reducción de daño 1/contundente.",
  },
  {
    level: 8,
    name: "Despertar Sangre",
    description:
      "Una vez al día, un ataque de toque cuerpo a cuerpo exitoso causa 10d10 de daño instantáneo agitando la sangre del objetivo; constructos, elementales, cieno, plantas, no muertos y criaturas sin sangre son inmunes.",
  },
  {
    level: 9,
    name: "Infusión",
    description: "Obtiene un incremento permanente de 2 puntos a su Constitución tras consumir una destilación única de su propia sangre.",
  },
  {
    level: 10,
    name: "Caminata de Sangre",
    description:
      "Una vez al día como acción estándar que no provoca ataques de oportunidad, puede entrar en una criatura viva de tamaño igual o mayor al suyo (salvo elemental, cieno, planta, no muerto o sin sangre) y viajar instantáneamente a otra criatura viva en el mismo plano. Al salir puede optar por una salida sangrienta, causando 10d6 de daño a la criatura anfitriona (salvación de Fortaleza CD 10 + nivel de clase + modificador de Constitución para reducirlo o evitarlo), debiendo él mismo superar una salvación de Fortaleza CD 15 o quedar aturdido 1 asalto.",
  },
];

// ---------------------------------------------------------------------------
// Maestro de Efigies (Effigy Master)
// ---------------------------------------------------------------------------

const EFFIGY_MASTER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Crear Efigie",
    description:
      "Aprende el proceso ritual para crear efigies: pequeños constructos de arcilla, madera o metal con un vínculo telepático a su creador, capaces de moverse, espiar y transmitirle lo que ven y oyen dentro de un alcance limitado, sin necesitar la dote Crear Constructo. Suma su nivel de clase a su nivel de lanzador para determinar el máximo de dados de golpe de la efigie que puede crear. Requiere una prueba de Oficio (carpintería, cuero o metal) CD 15.",
  },
  {
    level: 2,
    name: "Progresión de Conjuros Arcanos",
    description:
      "En los niveles 2º a 5º, el maestro de efigies obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase). El nivel 1º no otorga este beneficio.",
  },
  {
    level: 3,
    name: "Efigie Mejorada",
    description:
      "Puede mejorar una efigie otorgándole +2 de competencia permanente a ataques, daño y salvaciones; requiere un día de trabajo y 100 po de suministros por dado de golpe de la efigie, sin costo en puntos de experiencia.",
  },
  {
    level: 5,
    name: "Vínculo con la Efigie",
    description:
      "Mediante un ritual de 1 hora puede crear un vínculo sobrenatural con una efigie: siente su condición y puede espiarla una vez al día como con escudriñar. Gana además +1 de bonificación de moral a salvaciones y a pruebas de nivel de lanzador mientras esté a 1,5 m de la efigie vinculada. Solo puede estar vinculado a una efigie a la vez.",
  },
];

// ---------------------------------------------------------------------------
// Erudito Elemental (Elemental Savant)
// ---------------------------------------------------------------------------

const ELEMENTAL_SAVANT_CHOICES: ClassFeatureChoice[] = [
  {
    id: "vinculo-elemental",
    featureName: "Especialidad Elemental",
    levels: [1],
    label: "Elemento y energía asociada",
    kind: "lista_fija",
    options: [
      { id: "aire", label: "Aire", description: "Energía asociada: electricidad." },
      { id: "agua", label: "Agua", description: "Energía asociada: frío." },
      { id: "fuego", label: "Fuego", description: "Energía asociada: fuego." },
      { id: "tierra", label: "Tierra", description: "Energía asociada: ácido." },
    ],
  },
];

const ELEMENTAL_SAVANT_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Especialidad Elemental",
    description:
      "Al entrar en la clase, elige un elemento y su energía asociada (aire = electricidad, tierra = ácido, fuego = fuego, agua = frío), que debe coincidir con la dote Sustitución de Energía que posee. Los conjuros que normalmente causan daño de energía cambian su descriptor y tipo de daño al elegido (los conjuros sin daño de energía no cambian).",
  },
  {
    level: 1,
    name: "Resistencia a la Energía 5",
    description: "Gana resistencia 5 al tipo de energía elegido.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "En todos los niveles excepto el 5º y el 10º, el erudito elemental obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 2,
    name: "Inmunidad al Sueño",
    description: "Se vuelve inmune a los efectos de sueño.",
  },
  {
    level: 3,
    name: "Penetración de Energía +2",
    description:
      "Gana +2 de competencia en las pruebas de nivel de lanzador para superar la resistencia a conjuros al lanzar conjuros de su energía elegida; se acumula con Penetración de Conjuros y Penetración de Conjuros Superior.",
  },
  {
    level: 4,
    name: "Resistencia a la Energía 10",
    description: "La resistencia a la energía elegida aumenta a 10.",
  },
  {
    level: 5,
    name: "Enfoque de Energía +1",
    description:
      "La CD de salvación de sus conjuros con el descriptor de su energía elegida aumenta en +1; se acumula con Enfoque de Conjuros y Enfoque de Conjuros Superior.",
  },
  {
    level: 6,
    name: "Visión en la Oscuridad",
    description: "Obtiene visión en la oscuridad hasta 18 m.",
  },
  {
    level: 7,
    name: "Resistencia a la Energía 20",
    description: "La resistencia a la energía elegida aumenta a 20.",
  },
  {
    level: 8,
    name: "Penetración de Energía +4",
    description: "El bonificador de Penetración de Energía aumenta a +4.",
  },
  {
    level: 9,
    name: "Inmunidad a Parálisis y Veneno",
    description: "Se vuelve inmune a los efectos de parálisis y veneno.",
  },
  {
    level: 10,
    name: "Perfección Elemental",
    description:
      "Su tipo cambia a elemental; ya no necesita comer, dormir ni respirar (aunque debe descansar para recuperar conjuros); gana inmunidad a aturdimiento y ya no sufre daño extra por golpe crítico o flanqueo; obtiene velocidad, modos de movimiento, ataques naturales, ataques especiales y cualidades especiales de un elemental Mediano del tipo correspondiente a su especialidad; gana +2 de circunstancia en pruebas basadas en Carisma con criaturas de su mismo subtipo elemental u otros eruditos elementales del mismo elemento; conserva su alma y puede ser resucitado con normalidad.",
  },
  {
    level: 10,
    name: "Enfoque de Energía +2",
    description: "El bonificador total de Enfoque de Energía aumenta a +2.",
  },
  {
    level: 10,
    name: "Inmunidad a la Energía",
    description: "Se vuelve inmune al tipo de energía asociado a su elemento elegido.",
  },
];

// ---------------------------------------------------------------------------
// Puño Iluminado (Enlightened Fist)
// ---------------------------------------------------------------------------

const ENLIGHTENED_FIST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Golpe Ki",
    description: "Sus ataques desarmados se tratan como armas mágicas a efectos de superar la reducción de daño.",
  },
  {
    level: 1,
    name: "Habilidades de Monje",
    description:
      "Suma su nivel de clase a su nivel de monje para determinar la bonificación de Clase de Armadura basada en clase, el daño desarmado, la bonificación de velocidad sin armadura y los usos diarios de Golpe Aturdidor; si no tiene niveles de monje, obtiene esos beneficios como un monje de su nivel de puño iluminado, pero sin sumar el bono de Sabiduría a la Clase de Armadura. No cuenta estos niveles para otros rasgos de monje.",
  },
  {
    level: 2,
    name: "Puño de Energía",
    description:
      "Una vez por asalto como acción gratuita, puede gastar un uso diario de Golpe Aturdidor para imbuir sus golpes desarmados con electricidad o fuego (a elección) durante 1 asalto; cada golpe desarmado exitoso causa 1d6 de daño extra de ese tipo.",
  },
  {
    level: 2,
    name: "Progresión de Conjuros Arcanos",
    description:
      "En todos los niveles excepto el 1º y el 6º, el puño iluminado obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 3,
    name: "Puño Arcano",
    description:
      "Puede gastar un uso diario de Golpe Aturdidor para lanzar y entregar un conjuro de toque como parte de un ataque completo desarmado, mediante cualquiera de sus golpes desarmados de esa acción.",
  },
  {
    level: 5,
    name: "Rejuvenecimiento Arcano",
    description:
      "Como acción estándar, puede sacrificar un conjuro preparado o un espacio de conjuro no usado para curarse una cantidad de puntos de golpe igual al nivel del conjuro.",
  },
  {
    level: 6,
    name: "Puño de Energía (Estallido)",
    description:
      "Al lograr un golpe crítico con Puño de Energía activo, causa además 1d10 de daño extra de energía (2d10 si el multiplicador de crítico es ×3, 3d10 si es ×4).",
  },
  {
    level: 7,
    name: "Contener Rayo",
    description:
      "Puede lanzar cualquier conjuro de rayo como conjuro de toque, entregándolo con un ataque de toque o normal, y puede mantener la carga como un conjuro de toque; combinable con Puño Arcano.",
  },
  {
    level: 9,
    name: "Alma de Diamante",
    description: "Gana resistencia a conjuros igual a 10 más la suma de sus niveles de monje y de puño iluminado.",
  },
];

// ---------------------------------------------------------------------------
// Hilandera del Destino (Fatespinner)
// ---------------------------------------------------------------------------

const FATESPINNER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Hilar Destino",
    description:
      "Cada día dispone de un número de puntos de hilo igual a su nivel de clase; como acción gratuita puede gastar puntos de hilo, punto por punto, para aumentar la CD de salvación de un conjuro que lance. Se recupera al recuperar sus conjuros del día.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "En los niveles 1º a 4º, la hilandera del destino obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase). El nivel 5º no otorga este beneficio.",
  },
  {
    level: 2,
    name: "Dedo Caprichoso del Destino",
    description:
      "Una vez al día como acción inmediata, con línea de visión, puede forzar a otra criatura (aliada o enemiga) a repetir una tirada que acaba de hacer; la criatura debe aceptar el resultado de la repetición, sea mejor o peor.",
  },
  {
    level: 3,
    name: "Hilar Sino",
    description:
      "Puede aplicar puntos de hilo (del mismo reservorio diario), punto por punto, para aumentar cualquier prueba de habilidad, tirada de ataque o salvación propia, antes de tirar los dados.",
  },
  {
    level: 4,
    name: "Negar Destino",
    description:
      "Una vez al día, la primera prueba para estabilizarse mientras está inconsciente y muriendo tiene éxito automático; las pruebas posteriores en el mismo período de 24 horas se hacen con normalidad.",
  },
  {
    level: 4,
    name: "Resistir Destino",
    description: "Una vez al día puede repetir una tirada que acaba de hacer, debiendo aceptar el nuevo resultado aunque sea peor.",
  },
  {
    level: 5,
    name: "Sellar Destino",
    description:
      "Una vez al día como acción gratuita, elige una criatura visible en 9 m con dados de golpe iguales o menores a los suyos; le impone un penalizador de -10 o una bonificación de +10 (a elección) en su próxima salvación, con efecto durante solo 1 asalto. Si el objetivo tiene más dados de golpe que la hilandera, la habilidad falla pero no se gasta el uso diario.",
  },
];

// ---------------------------------------------------------------------------
// Geómetra (Geometer)
// ---------------------------------------------------------------------------

const GEOMETER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Glifo de Guarda",
    description: "Añade glifo de guarda a su libro de conjuros como conjuro arcano de nivel 3, pudiendo prepararlo y lanzarlo con normalidad.",
  },
  {
    level: 1,
    name: "Trazar Glifo de Conjuro",
    description:
      "Un glifo de conjuro es un diagrama arcano que sustituye los componentes verbales y materiales de un conjuro concreto: al lanzar un conjuro preparado junto con su glifo, se lanza como si tuviera la dote Conjuro Silencioso y sustituye los componentes materiales (salvo un foco). Se elige usarlo al lanzar el conjuro y se consume al usarse. Prepararlo toma 1 hora y tintas especiales que cuestan 25 po por nivel del conjuro.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de geómetra (1º a 5º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 2,
    name: "Libro de Geometría",
    description:
      "Cada conjuro que aprende requiere solo una página en su libro de conjuros (sigue tomando 24 horas y 100 po por página); la CD de Conocimiento de Conjuros para que alguien ajeno a esta clase descifre o prepare desde su libro aumenta en +5.",
  },
  {
    level: 3,
    name: "Visión de Sigilos",
    description:
      "Puede usar Buscar para detectar trampas mágicas basadas en runas, glifos, sigilos o símbolos como lo haría un pícaro, con un bono igual a su nivel de lanzador; si pasa a menos de 3 m de una de estas trampas sin buscar activamente, obtiene igualmente una prueba de Buscar.",
  },
  {
    level: 4,
    name: "Pasar Sigilo",
    description:
      "Como acción estándar puede intentar suprimir una guarda mágica escrita (símbolo, sigilo, runa o glifo) mediante una prueba de nivel (CD 6 + nivel de lanzador del creador); si tiene éxito, suprime el efecto mientras mantenga la concentración. Debe poder ver el dispositivo.",
  },
  {
    level: 5,
    name: "Glifo de Conjuro Potente",
    description: "Al preparar un glifo de conjuro para un conjuro, su nivel de lanzador se trata como +1 más alto para ese conjuro.",
  },
  {
    level: 5,
    name: "Glifo de Guarda Mayor",
    description: "Añade glifo de guarda mayor a su libro de conjuros como conjuro arcano de nivel 6.",
  },
];

// ---------------------------------------------------------------------------
// Adepto de la Estrella Verde (Green Star Adept)
// ---------------------------------------------------------------------------

const GREEN_STAR_ADEPT_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Reducción de Daño",
    description:
      "Reducción de daño 1/adamantina a nivel 1, que mejora en 1 punto por cada nivel adicional, hasta 10/adamantina a nivel 10.",
  },
  {
    level: 1,
    name: "Nivel de Lanzador Mejorado",
    description:
      "Suma su nivel de clase a su nivel de lanzador de una clase arcana que ya poseyera antes de entrar en la clase de prestigio, para determinar su nivel de lanzador efectivo (pero no el nivel de conjuro máximo accesible).",
  },
  {
    level: 1,
    name: "Dependencia de Estelmetal",
    description:
      "Al ganar un nivel más allá del 1º, no obtiene los rasgos de clase de ese nivel hasta realizar un ritual de 24 horas con 1 libra de estelmetal y otros reactivos que cuestan 1000 po; el bonificador base de ataque, las salvaciones, las habilidades y las dotes o incrementos de característica no dependen de este ritual.",
  },
  {
    level: 1,
    name: "Rigor de Estelmetal 1",
    description: "+1 a Fuerza, -1 a Destreza (mínimo 3) y +1 a la bonificación de armadura natural.",
  },
  {
    level: 2,
    name: "Ataque Natural",
    description:
      "Gana un ataque de puñetazo que causa daño contundente como una maza de su tamaño (1d4 Pequeño, 1d6 Mediano, 1d8 Grande) más 1,5 veces su modificador de Fuerza.",
  },
  {
    level: 2,
    name: "Metabolismo Antinatural +2",
    description: "Gana +2 a las salvaciones contra veneno, sueño, parálisis, aturdimiento, enfermedad, efectos de muerte y necromancia.",
  },
  {
    level: 2,
    name: "Progresión de Conjuros Arcanos",
    description:
      "En los niveles pares (2º, 4º, 6º, 8º y 10º), el adepto de la estrella verde obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase). Los niveles impares no otorgan este beneficio.",
  },
  {
    level: 3,
    name: "Fortificación (25%)",
    description: "25% de probabilidad de negar un golpe crítico o ataque furtivo (el daño se recalcula normalmente).",
  },
  {
    level: 4,
    name: "Visión de Otro Mundo",
    description: "Gana visión en la oscuridad hasta 18 m y visión en penumbra.",
  },
  {
    level: 4,
    name: "Rigor de Estelmetal 2",
    description: "+1 adicional a Fuerza y +1 adicional a la bonificación de armadura natural.",
  },
  {
    level: 5,
    name: "Metabolismo Antinatural +4",
    description: "El bonificador de Metabolismo Antinatural aumenta a +4.",
  },
  {
    level: 6,
    name: "Fortificación (50%)",
    description: "La probabilidad de Fortificación aumenta al 50%.",
  },
  {
    level: 7,
    name: "Metabolismo Nulo",
    description:
      "No necesita respirar, comer ni dormir; es inmune a venenos inhalados, ahogamiento, asfixia y efectos de sueño (aunque debe descansar 8 horas para recuperar conjuros); ya no sufre fatiga ni agotamiento.",
  },
  {
    level: 7,
    name: "Rigor de Estelmetal 4",
    description: "+2 adicional a Fuerza (total +4), -1 adicional a Destreza (total -2, mínimo 3) y +2 adicional a armadura natural (total +4).",
  },
  {
    level: 8,
    name: "Metabolismo Antinatural +6",
    description: "El bonificador de Metabolismo Antinatural aumenta a +6.",
  },
  {
    level: 9,
    name: "Fortificación (75%)",
    description: "La probabilidad de Fortificación aumenta al 75%.",
  },
  {
    level: 10,
    name: "Perfección Esmeralda",
    description:
      "Su tipo cambia a constructo: pierde su puntuación de Constitución (gana puntos de golpe de bonificación según su tamaño), gana inmunidad a veneno, parálisis, aturdimiento, enfermedad, ataque furtivo extra, efectos de muerte y necromancia; ya no sana por sí mismo (debe usar reparar daños o su Reparación Rápida); ya no sufre golpes críticos, daño no letal ni drenaje de característica o de energía; ya no muere por daño masivo, pero es destruido a 0 pg; no sufre penalizadores por envejecimiento ni puede ser envejecido mágicamente.",
  },
  {
    level: 10,
    name: "Reparación Rápida",
    description: "Repara 1 punto de daño por hora de descanso, mientras tenga al menos 1 punto de golpe.",
  },
  {
    level: 10,
    name: "Rigor de Estelmetal 6",
    description: "+2 adicional a Fuerza (total +6), -1 adicional a Destreza (total -3, mínimo 3) y +2 adicional a armadura natural (total +6).",
  },
];

// ---------------------------------------------------------------------------
// Iniciada del Velo Séptuple (Initiate of the Sevenfold Veil)
// ---------------------------------------------------------------------------

const INITIATE_OF_THE_SEVENFOLD_VEIL_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Warding (1/día)",
    description:
      "Puede crear una warding que imbuye con un velo conocido; dura hasta ser disipada. Existen tres formas: Personal (esfera que la envuelve, otorga ocultación, dura 1 minuto/nivel), de Área (esfera de 4,5-6 m que protege a los aliados adyacentes, dura 1 minuto/nivel) y de Muro (hasta 3 m de largo y 1,5 m de alto por nivel, dura 10 minutos/nivel). La CD de salvación de una warding es 18 + su modificador de la característica de conjuración primaria.",
  },
  {
    level: 1,
    name: "Abjuración Incontestable",
    description: "Suma su nivel de clase a la CD para disipar cualquier conjuro o efecto de abjuración que haya creado.",
  },
  {
    level: 1,
    name: "Velo Rojo",
    description:
      "Equivalente a un conjuro de nivel 4. Bloquea ataques a distancia no mágicos; cruzarlo inflige 20 puntos de daño de fuego (Reflejos mitad).",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de iniciada del velo séptuple (1º a 7º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 2,
    name: "Golpe Irrefutable +2",
    description: "Gana +2 a las tiradas de nivel de conjurador para contrarrestar o disipar conjuros de abjuración.",
  },
  {
    level: 2,
    name: "Velo Naranja",
    description:
      "Equivalente a un conjuro de nivel 5. Detiene ataques a distancia mágicos (proyectiles, rayos) salvo proyectil mágico; cruzarlo inflige 40 puntos de daño de ácido (Reflejos mitad).",
  },
  {
    level: 3,
    name: "Warding (2/día)",
    description: "Puede crear una warding dos veces al día.",
  },
  {
    level: 3,
    name: "Velo Amarillo",
    description:
      "Equivalente a un conjuro de nivel 6. Impide el paso de gases y nubes, anula la petrificación y otorga inmunidad al veneno introducido desde fuera; cruzarlo inflige 80 puntos de daño eléctrico (Reflejos mitad).",
  },
  {
    level: 4,
    name: "Warding Reactiva",
    description: "Puede levantar una warding como acción inmediata, tras que un oponente inicie una acción pero antes de que se complete.",
  },
  {
    level: 4,
    name: "Velo Verde",
    description:
      "Equivalente a un conjuro de nivel 6. Detiene armas de aliento; cruzarlo es un efecto de veneno que obliga a una salvación de Fortaleza o muerte (éxito: 1d6 de daño a Constitución).",
  },
  {
    level: 5,
    name: "Warding (3/día)",
    description: "Puede crear una warding tres veces al día.",
  },
  {
    level: 5,
    name: "Velo Azul",
    description:
      "Equivalente a un conjuro de nivel 6. Bloquea adivinaciones y efectos que afectan a la mente; cruzarlo obliga a una salvación de Fortaleza o el objetivo queda petrificado.",
  },
  {
    level: 6,
    name: "Golpe Irrefutable +4",
    description: "El bonificador de Golpe Irrefutable aumenta a +4.",
  },
  {
    level: 6,
    name: "Warding Doble",
    description:
      "Puede levantar dos velos a la vez al crear una warding (cuenta como un solo uso de la habilidad). El velo menos poderoso siempre se considera exterior al más poderoso; para anular la warding entera, primero debe negarse el velo exterior.",
  },
  {
    level: 6,
    name: "Velo Índigo",
    description:
      "Equivalente a un conjuro de nivel 7. Impide el paso de conjuros y habilidades sobrenaturales; cruzarlo obliga a una salvación de Voluntad o el objetivo queda confuso.",
  },
  {
    level: 7,
    name: "Perdición Calidoscópica",
    description:
      "Equivalente a un conjuro de nivel 9. Una vez al día como acción estándar, designa una criatura en 18 m y vuelve en su contra los efectos mágicos que la afectan, como un disipar magia mayor dirigido; por cada conjuro o efecto negado, se activa un velo sobre la víctima (en orden de rojo a violeta, uno por conjuro negado), permitiendo la salvación normal de cada velo.",
  },
  {
    level: 7,
    name: "Velo Violeta",
    description:
      "Equivalente a un conjuro de nivel 8. Destruye objetos y efectos que la cruzan (como desintegrar); las criaturas vivas deben salvar Voluntad o ser desplazadas a un lugar o plano aleatorio (como viaje entre planos).",
  },
  {
    level: 7,
    name: "Warding (4/día)",
    description: "Puede crear una warding cuatro veces al día.",
  },
];

// ---------------------------------------------------------------------------
// Mago de la Orden Arcana (Mage of the Arcane Order)
// ---------------------------------------------------------------------------

const MAGE_OF_THE_ARCANE_ORDER_CHOICES: ClassFeatureChoice[] = [
  {
    id: "dote-metamagia-gratuita",
    featureName: "Dote de Metamagia Gratuita",
    levels: [2, 9],
    label: "Dote de metamagia gratuita",
    kind: "dote_categoria",
    featCategoryOptions: ["metamagia"],
  },
];

const MAGE_OF_THE_ARCANE_ORDER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Miembro del Gremio",
    description:
      "Paga 30 po al mes de cuota y cumple sus deberes (aparecer en el campus al menos cada seis meses, aceptar comisiones). Con más de 3 meses de atraso pierde la membresía y el acceso a la Reserva de Conjuros, aunque no pierde los conjuros ni dotes ya ganados. Puede alojarse en el campus por 5 po/día y usar la biblioteca y los laboratorios comunes.",
  },
  {
    level: 1,
    name: "Reserva de Conjuros I",
    description:
      "Puede invocar conjuros de nivel 1º a 3º de una reserva común llamada Reserva de Conjuros (Spellpool), usando un foco especial recibido en la iniciación, siempre que tenga un espacio de conjuro sin usar del nivel adecuado. El número de niveles de conjuro que puede invocar por día es igual o menor a la mitad de su nivel de conjurador (redondeado hacia abajo, mínimo 1). Invocar requiere una acción de asalto completo concentrándose en el foco (provoca ataques de oportunidad); el conjuro aparece en su mente al inicio de su siguiente turno y se pierde si no se lanza en un número de minutos igual a su nivel de conjurador. Cada invocación genera una deuda: debe devolver un conjuro preparado (o combinación) cuyo total de niveles sea igual, en un número de días igual a su nivel de clase, o pierde el acceso hasta pagar (y es expulsado si la deuda no se paga en un año).",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de mago de la orden arcana (1º a 10º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 2,
    name: "Dote de Metamagia Gratuita",
    description: "Gana una dote de metamagia a su elección como dote adicional, siempre que cumpla sus prerrequisitos.",
  },
  {
    level: 3,
    name: "Idioma Adicional",
    description: "Aprende un nuevo idioma.",
  },
  {
    level: 4,
    name: "Reserva de Conjuros II",
    description: "El acceso a la Reserva de Conjuros se amplía a conjuros de nivel 4º a 6º.",
  },
  {
    level: 5,
    name: "Nuevo Conjuro",
    description:
      "Puede copiar un conjuro del libro de conjuros de otro mago sin necesidad de una prueba de Conocimiento de Conjuros; los magos especialistas no pueden aprender conjuros de escuelas prohibidas; quienes no usan libros de conjuros no obtienen este beneficio.",
  },
  {
    level: 6,
    name: "Idioma Adicional",
    description: "Aprende un segundo idioma nuevo.",
  },
  {
    level: 7,
    name: "Reserva de Conjuros III",
    description: "El acceso a la Reserva de Conjuros se amplía a conjuros de nivel 7º a 9º.",
  },
  {
    level: 8,
    name: "Nuevo Conjuro",
    description: "Puede copiar un segundo conjuro del libro de conjuros de otro mago, como en el nivel 5º.",
  },
  {
    level: 9,
    name: "Dote de Metamagia Gratuita",
    description: "Gana una segunda dote de metamagia a su elección como dote adicional, siempre que cumpla sus prerrequisitos.",
  },
  {
    level: 10,
    name: "Regente",
    description:
      "Obtiene el estatus de regente y un bonificador de competencia de +2 en las pruebas de interacción basadas en Carisma con miembros de menor nivel de la Orden.",
  },
];

// ---------------------------------------------------------------------------
// Maestro Transmogrificador (Master Transmogrifist)
// ---------------------------------------------------------------------------

const MASTER_TRANSMOGRIFIST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Cambio Extendido",
    description:
      "Los conjuros de transmutación que usa para adoptar una forma favorecida (alterar el yo, metamorfosear, metamorfosear cualquier objeto, cambiaformas) reciben automáticamente el beneficio de la dote Extender Conjuro, sin aumentar el nivel del conjuro, el tiempo de lanzamiento ni requerir preparación especial.",
  },
  {
    level: 1,
    name: "Forma Favorecida",
    description:
      "Al entrar en la clase elige tres formas favorecidas (criaturas específicas asumibles mediante metamorfosear, excluyendo su propio tipo); gana una forma adicional en cada nivel impar posterior (cuatro en 3º, cinco en 5º, seis en 7º, siete en 9º). Una vez por nivel más allá del 1º puede reemplazar una forma elegida previamente.",
  },
  {
    level: 2,
    name: "Manifestar Sentidos",
    description:
      "Al asumir una forma favorecida obtiene también sus sentidos extraordinarios (percepción ciega, visión ciega, visión en la oscuridad, visión en penumbra, olfato, sentido sísmico).",
  },
  {
    level: 2,
    name: "Progresión de Conjuros Arcanos",
    description:
      "En los niveles 2º, 3º, 5º, 6º, 8º y 9º, el maestro transmogrificador obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase). Los niveles 1º, 4º, 7º y 10º no otorgan este beneficio.",
  },
  {
    level: 3,
    name: "Maestría en Batalla +2",
    description: "Gana +2 de competencia en las tiradas de ataque mientras está en una forma favorecida.",
  },
  {
    level: 4,
    name: "Cambio Sin Esfuerzo",
    description:
      "Aplica automáticamente los beneficios de las dotes Conjuro Quieto y Conjuro Silencioso a sus conjuros de transmutación para adoptar formas favorecidas, sin aumentar el nivel del conjuro, el tiempo de lanzamiento ni requerir preparación especial.",
  },
  {
    level: 5,
    name: "Metamorfo",
    description: "Obtiene el subtipo cambiaformas; sus usos de alterar el yo pueden hacerse permanentes hasta ser descartados o disipados.",
  },
  {
    level: 6,
    name: "Maestría en Batalla +4",
    description: "El bonificador de Maestría en Batalla aumenta a +4.",
  },
  {
    level: 7,
    name: "Cambio Reflexivo",
    description:
      "Una vez al día puede transformarse en una forma favorecida mediante un conjuro de transmutación como acción inmediata, en respuesta a la acción de otra criatura (pierde su siguiente acción). Si ya está bajo cambiaformas, puede usar esta habilidad sin límite por asalto, perdiendo su siguiente acción en cada uso.",
  },
  {
    level: 8,
    name: "Manifestar Cualidades",
    description: "Obtiene todas las cualidades especiales extraordinarias de las formas favorecidas que asume.",
  },
  {
    level: 9,
    name: "Maestría en Batalla +6",
    description: "El bonificador de Maestría en Batalla aumenta a +6.",
  },
  {
    level: 10,
    name: "Variedad Infinita",
    description:
      "Puede crear formas combinadas usando una forma favorecida como base y añadiendo un solo aspecto de una segunda forma asumible: reemplazar armadura natural, añadir modos de movimiento, añadir tipos de ataque natural, añadir ataques o cualidades especiales extraordinarias, o reemplazar puntuaciones de característica física si ambas formas comparten el mismo tamaño.",
  },
];

// ---------------------------------------------------------------------------
// Doblegador de Mentes (Mindbender)
// ---------------------------------------------------------------------------

const MINDBENDER_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Telepatía",
    description: "Puede comunicarse telepáticamente con cualquier criatura con lenguaje dentro de 30 m.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "En los niveles impares (1º, 3º, 5º, 7º y 9º), el doblegador de mentes obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase). Los niveles pares no otorgan este beneficio.",
  },
  {
    level: 2,
    name: "Impulso de Habilidad",
    description: "Suma la mitad de su nivel de clase como bonificación de competencia en Engañar, Diplomacia, Intimidar y Averiguar Intenciones.",
  },
  {
    level: 2,
    name: "Empujar la Mente Débil (1/día)",
    description:
      "Puede influir en una criatura viva de tamaño Grande o menor; funciona como sugestión, salvo que el alcance es 30 m y la duración 5 horas más 1 hora por nivel de clase. Una salvación de Voluntad CD 13 + modificador de la característica de conjuración primaria anula el efecto.",
  },
  {
    level: 3,
    name: "Leer Mente (2/día)",
    description:
      "Dos veces al día puede leer los pensamientos superficiales de una criatura viva dentro de 30 m como acción estándar (requiere visión), hasta 10 minutos con concentración. Una salvación de Voluntad CD 12 + modificador de la característica de conjuración primaria anula el efecto.",
  },
  {
    level: 4,
    name: "Hechizo Eterno (1)",
    description:
      "Una vez al día puede hechizar a una sola criatura Grande o menor dentro de 30 m como con hechizar monstruo, con duración permanente. Una salvación de Voluntad CD 14 + modificador de la característica de conjuración primaria anula el efecto. Solo puede tener una criatura así hechizada a la vez.",
  },
  {
    level: 5,
    name: "Empujar la Mente Débil (2/día)",
    description: "Puede usar Empujar la Mente Débil dos veces al día.",
  },
  {
    level: 6,
    name: "Poder de Encantamiento +2",
    description: "Suma +2 a su nivel de conjurador para conjuros de encantamiento.",
  },
  {
    level: 6,
    name: "Hechizo Eterno (2)",
    description: "Puede mantener dos criaturas hechizadas permanentemente a la vez.",
  },
  {
    level: 7,
    name: "Dominar",
    description:
      "Una vez al día puede dominar a una sola criatura Grande o menor dentro de 30 m como con dominar monstruo, con duración de 24 horas. Una salvación de Voluntad CD 19 + modificador de la característica de conjuración primaria anula el efecto.",
  },
  {
    level: 7,
    name: "Leer Mente (4/día)",
    description: "Puede usar Leer Mente cuatro veces al día.",
  },
  {
    level: 8,
    name: "Hechizo Eterno (3)",
    description: "Puede mantener tres criaturas hechizadas permanentemente a la vez.",
  },
  {
    level: 8,
    name: "Empujar la Mente Débil (3/día)",
    description: "Puede usar Empujar la Mente Débil tres veces al día.",
  },
  {
    level: 10,
    name: "Poder de Encantamiento +4",
    description: "El bonificador de Poder de Encantamiento aumenta a +4.",
  },
  {
    level: 10,
    name: "Hechizo Eterno (4)",
    description: "Puede mantener cuatro criaturas hechizadas permanentemente a la vez.",
  },
  {
    level: 10,
    name: "Esclavo (Thrall)",
    description: "Puede hacer permanente la duración de su habilidad Dominar, pero solo sobre un objetivo a la vez.",
  },
];

// ---------------------------------------------------------------------------
// Buscadora de la Canción (Seeker of the Song)
// ---------------------------------------------------------------------------

const SEEKER_OF_THE_SONG_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Éxtasis de la Canción (+2 CA)",
    description:
      "Otorga un bonificador de intuición de +2 a la Clase de Armadura mientras usa música búdica, música de búsqueda o una habilidad similar.",
  },
  {
    level: 1,
    name: "Progresión de Música Búdica",
    description:
      "Los niveles de buscadora de la canción se suman a los niveles de bardo a efectos de determinar los usos diarios de música búdica y de música de búsqueda; no otorga una tabla de conjuros propia. Los efectos de música de búsqueda usan los rangos de Interpretar del personaje (no su nivel de clase) para calcular el daño y la CD de salvación.",
  },
  {
    level: 1,
    name: "Melodía Ardiente",
    description:
      "Un uso de música de búsqueda que otorga resistencia al fuego 15 al usuario y a los aliados en 9 m, o lanza un cono de 9 m que inflige 6d6 de daño de fuego (Reflejos CD 10 + rangos de Interpretar, mitad con éxito).",
  },
  {
    level: 2,
    name: "Combinar Canciones",
    description: "Puede combinar dos tipos de música búdica o de búsqueda simultáneamente.",
  },
  {
    level: 2,
    name: "Canción de Deshacer",
    description:
      "Consume un uso de música búdica; una prueba de Interpretar inflige 1d8 de daño por nivel de clase a todos los constructos en una explosión de 9 m, sin salvación.",
  },
  {
    level: 3,
    name: "Endecha de la Pérdida Helada",
    description:
      "Otorga resistencia al frío 15 al usuario y a los aliados en 9 m; puede lanzar una línea de 18 m que inflige 10d6 de daño de frío y causa fatiga (Fortaleza CD 10 + rangos de Interpretar, mitad de daño y anula la fatiga con éxito).",
  },
  {
    level: 4,
    name: "Éxtasis de la Canción (+2 a salvaciones)",
    description: "El Éxtasis de la Canción añade también +2 de bonificación de intuición a las salvaciones.",
  },
  {
    level: 4,
    name: "Canción de la Vida",
    description:
      "Otorga inmunidad a veneno y enfermedad al usuario y a los aliados en 9 m; puede curar a un aliado tocado una cantidad de puntos de golpe igual al resultado de su prueba de Interpretar.",
  },
  {
    level: 5,
    name: "Subvocalizar",
    description: "Puede comenzar nuevas canciones como acción rápida.",
  },
  {
    level: 5,
    name: "Himno del Trueno y el Dolor",
    description:
      "Otorga resistencia a la electricidad 15 al usuario y a los aliados en 9 m; puede disparar un rayo (alcance 6 m, toque a distancia) que inflige 10d6 de daño eléctrico y luego salta a hasta 3 objetivos secundarios a mitad de daño.",
  },
  {
    level: 6,
    name: "Himno de la Muerte de Conjuros",
    description:
      "Las criaturas dentro del alcance auditivo que intenten lanzar conjuros deben hacer una prueba de Concentración opuesta a la prueba de Interpretar de la buscadora; si fallan, pierden el espacio de conjuro.",
  },
  {
    level: 7,
    name: "Éxtasis de la Canción (RD 2/-)",
    description: "El Éxtasis de la Canción otorga además reducción de daño 2/-.",
  },
  {
    level: 7,
    name: "Balada de la Agonía Renacida",
    description:
      "Otorga resistencia al ácido 15 al usuario y a los aliados en 9 m; puede disparar un rayo (alcance 18 m, toque a distancia) que inflige 10d6 de daño de ácido inmediato y otros 10d6 una ronda después.",
  },
  {
    level: 8,
    name: "Aria de Todas Partes",
    description: "Consume un uso de música búdica para teletransportarse hasta 7,5 m más 1,5 m por nivel de clase, solo a sí misma.",
  },
  {
    level: 9,
    name: "Endecha de la Muerte del Canto",
    description:
      "Otorga resistencia sónica 15 al usuario y a los aliados en 9 m; suprime el uso de música búdica o de búsqueda de otras criaturas dentro de 9 m salvo que ganen una prueba de Interpretar opuesta a la suya. Puede disparar un rayo (alcance 18 m, toque a distancia) que inflige 15d6 de daño sónico.",
  },
  {
    level: 10,
    name: "Éxtasis de la Canción (Libertad de Movimiento)",
    description: "El Éxtasis de la Canción otorga además el efecto de libertad de movimiento.",
  },
  {
    level: 10,
    name: "Nota de la Soledad",
    description:
      "Las criaturas extraplanares dentro de 18 m deben hacer una salvación de Voluntad (CD 10 + rangos de Interpretar + 1 por dado de golpe) o son enviadas instantáneamente a su plano de origen.",
  },
];

// ---------------------------------------------------------------------------
// Acorde Sublime (Sublime Chord)
// ---------------------------------------------------------------------------

const SUBLIME_CHORD_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Saber Búdico",
    description: "Suma su nivel de acorde sublime a las pruebas de saber búdico; el bonificador total es nivel de bardo + nivel de acorde sublime + modificador de Inteligencia.",
  },
  {
    level: 1,
    name: "Música Búdica",
    description: "Amplía su repertorio de música búdica; los usos diarios son iguales a los de su nivel de bardo más la mitad de su nivel de acorde sublime (redondeado hacia abajo).",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Propia",
    description:
      "El acorde sublime posee su propia tabla de conjuros por día para niveles 4º a 9º (no es una simple adición de un nivel a una clase existente); se combina con los niveles en otras clases conjuradoras arcanas para determinar el nivel de conjurador. Por nivel de acorde sublime (4º/5º/6º/7º/8º/9º): 1º = 2/1/—/—/—/—; 2º = 2/2/—/—/—/—; 3º = 3/2/1/—/—/—; 4º = 3/3/2/—/—/—; 5º = 3/3/2/1/—/—; 6º = 4/3/3/2/—/—; 7º = 4/4/3/2/1/—; 8º = 4/4/3/3/2/—; 9º = 4/4/4/3/2/1; 10º = 5/4/4/3/3/2.",
  },
  {
    level: 2,
    name: "Canción del Poder Arcano",
    description:
      "Requiere 12 o más rangos de Interpretar. Como acción de movimiento, potencia el siguiente conjuro que lance antes de que termine su siguiente turno; el nivel de conjurador aumenta +0/+1/+2/+4 según el resultado de su prueba de Interpretar (9 o menos / 10-19 / 20-29 / 30 o más).",
  },
  {
    level: 6,
    name: "Canción de la Intemporalidad",
    description:
      "Requiere 16 o más rangos de Interpretar. Como acción estándar, un objetivo dentro de 18 m debe hacer una salvación de Voluntad (CD 10 + nivel de acorde sublime + modificador de Carisma) o queda congelado en el tiempo, incapaz de actuar e inmune a daño y conjuros, durante hasta 1 minuto por nivel.",
  },
  {
    level: 10,
    name: "Canción del Fuego Cósmico",
    description:
      "Requiere 20 o más rangos de Interpretar. Cuesta 2 usos de música búdica; crea una propagación de fuego de radio 6 m dentro de 30 m que inflige daño igual al resultado de su prueba de Interpretar; las criaturas afectadas hacen una salvación de Reflejos (CD 10 + nivel de acorde sublime + modificador de Carisma) para reducir el daño a la mitad.",
  },
];

// ---------------------------------------------------------------------------
// Arcanamach Suelio (Suel Arcanamach)
// ---------------------------------------------------------------------------

const SUEL_ARCANAMACH_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Ignorar Fallo de Conjuro (5%)",
    description:
      "La probabilidad de fallo de conjuro arcano por armadura o escudo se reduce un 5%, aumentando otro 5% cada tres niveles (10% en nivel 4, 15% en nivel 7, 20% en nivel 10); solo se aplica a los conjuros de arcanamach.",
  },
  {
    level: 1,
    name: "Conjuros Tenaces",
    description: "La CD para disipar los conjuros de arcanamach aumenta en 6.",
  },
  {
    level: 1,
    name: "Conjuros de Arcanamach",
    description:
      "El arcanamach suelio tiene su propia progresión de conjuros por día para niveles 1º a 5º, independiente de cualquier otra clase lanzadora (el documento de referencia no especifica más detalles sobre lista de conjuros, conjuros conocidos ni característica de conjuración usados para esta progresión). Por nivel de arcanamach suelio (1º/2º/3º/4º/5º): 1º = 1/—/—/—/—; 2º = 1/0/—/—/—; 3º = 2/1/—/—/—; 4º = 2/2/0/—/—; 5º = 3/2/1/—/—; 6º = 3/3/2/0/—; 7º = 3/3/2/1/—; 8º = 4/3/3/2/0; 9º = 4/4/3/2/1; 10º = 4/4/3/3/2.",
  },
  {
    level: 2,
    name: "Golpe Disipador (1/día)",
    description:
      "Una vez al día, un golpe cuerpo a cuerpo exitoso desencadena un disipar magia mayor dirigido, con una prueba de disipación de 1d20 + nivel de clase + 6; la habilidad se consume aunque el objetivo no tenga efectos que disipar.",
  },
  {
    level: 3,
    name: "Fortaleza de Conjuro Extendida",
    description:
      "Los conjuros de arcanamach que se lanza a sí mismo duplican su duración como con la dote Extender Conjuro; los conjuros con múltiples objetivos solo se extienden para el propio lanzador.",
  },
  {
    level: 4,
    name: "Ignorar Fallo de Conjuro (10%)",
    description: "La reducción del fallo de conjuro arcano aumenta al 10%.",
  },
  {
    level: 6,
    name: "Golpe Disipador (2/día)",
    description: "Puede usar Golpe Disipador dos veces al día.",
  },
  {
    level: 7,
    name: "Ignorar Fallo de Conjuro (15%)",
    description: "La reducción del fallo de conjuro arcano aumenta al 15%.",
  },
  {
    level: 10,
    name: "Golpe Disipador (3/día)",
    description: "Puede usar Golpe Disipador tres veces al día.",
  },
  {
    level: 10,
    name: "Ignorar Fallo de Conjuro (20%)",
    description: "La reducción del fallo de conjuro arcano aumenta al 20%.",
  },
];

// ---------------------------------------------------------------------------
// Guía Viajera (Wayfarer Guide)
// ---------------------------------------------------------------------------

const WAYFARER_GUIDE_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Capacidad Aumentada",
    description:
      "Al lanzar conjuros de teleportación que permiten llevar compañeros dispuestos, puede transportar una criatura Mediana adicional por nivel de clase.",
  },
  {
    level: 1,
    name: "Alcance Mejorado",
    description: "El alcance de sus conjuros de teleportación aumenta un 50%.",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "En los niveles 1º y 3º, la guía viajera obtiene un nivel de lanzador arcano adicional en una clase de lanzador arcano que ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase). El nivel 2º no otorga este beneficio.",
  },
  {
    level: 2,
    name: "Teletransporte Extra",
    description: "Gana un espacio de conjuro de nivel 5 adicional, utilizable únicamente para lanzar teletransportar.",
  },
  {
    level: 3,
    name: "Precisión Mejorada",
    description:
      "Al lanzar conjuros de teleportación cuyo destino se determina al azar, tira dos veces y elige el resultado que prefiera.",
  },
];

// ---------------------------------------------------------------------------
// Mago Salvaje (Wild Mage)
// ---------------------------------------------------------------------------

const WILD_MAGE_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Magia Salvaje",
    description:
      "Reduce su nivel de conjurador en 3 para todos los conjuros que lanza a partir de entonces; sin embargo, cada vez que lanza un conjuro, suma 1d6 a ese nivel de conjurador ajustado (resultado neto entre -2 y +3 respecto a su nivel de conjurador base).",
  },
  {
    level: 1,
    name: "Progresión de Conjuros Arcanos",
    description:
      "Cada nivel de mago salvaje (1º a 10º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
  },
  {
    level: 2,
    name: "Reflector Aleatorio (1/día)",
    description:
      "Como acción inmediata, puede redirigir un ataque a distancia, un ataque de toque a distancia o un conjuro de un solo objetivo dirigido contra ella para que impacte en su lugar a una criatura aleatoria dentro de 6 m (incluyéndose a sí misma o a sus aliados).",
  },
  {
    level: 3,
    name: "Estudiante del Caos",
    description:
      "Cuando activa un efecto aleatorio de un objeto mágico, puede tirar dos veces y elegir el resultado que prefiera (se aplica a objetos con efectos aleatorizados, no a objetos de determinación única).",
  },
  {
    level: 5,
    name: "Reflector Aleatorio (2/día)",
    description: "Puede usar Reflector Aleatorio dos veces al día.",
  },
  {
    level: 6,
    name: "Mente Caótica",
    description: "Obtiene inmunidad a los efectos de confusión y locura, y protección continua equivalente a no detección.",
  },
  {
    level: 8,
    name: "Reflector Aleatorio (3/día)",
    description: "Puede usar Reflector Aleatorio tres veces al día.",
  },
  {
    level: 9,
    name: "Dweomer Temerario",
    description:
      "Puede sacrificar un conjuro preparado o un espacio de conjuro (mínimo de nivel 1) para desencadenar un efecto de vara de las maravillas; puede aplicar la opción de repetir tirada de Estudiante del Caos.",
  },
  {
    level: 10,
    name: "Golpe Salvaje",
    description:
      "Una vez al día puede afectar a una sola criatura dentro de 18 m sin salvación; el objetivo queda rodeado por un aura resplandeciente durante 2d6 asaltos. Mientras dura, cada vez que la criatura afectada lanza un conjuro o usa una habilidad sobrenatural similar a un conjuro, tiene un 50% de probabilidad de que la acción falle y en su lugar se desencadene un efecto aleatorio de vara de las maravillas.",
  },
];

export const CA_CLASSES: ClassDef[] = [
  {
    id: "ca-acolyte-of-the-skin",
    name: "Acólito de la Piel (Acolyte of the Skin)",
    source: "complete-arcane",
    description:
      "Un lanzador que se somete a un ritual de vinculación con la esencia de un ser feérico o demoníaco invocado, llevándola como una segunda piel que poco a poco lo transforma.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "intimidate", "knowledge-arcana", "knowledge-the-planes", "profession", "spellcraft"],
    babProgression: "tres_cuartos",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: ACOLYTE_OF_THE_SKIN_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento: cualquiera no bueno" },
      {
        description: "Saber (Planos): 6 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-the-planes"] ?? 0) >= 6,
      },
      {
        description: "Nivel de lanzador (conjuros o habilidades sobrenaturales) 5º",
        check: (ctx) => ctx.casterLevel >= 5,
      },
      { description: "Haber hecho contacto pacífico con un monstruo exterior malvado invocado" },
      { description: "Someterse al Ritual de Vinculación" },
    ],
  },
  {
    id: "ca-alienist",
    name: "Alienista (Alienist)",
    source: "complete-arcane",
    description:
      "Un lanzador de conjuros de invocación que ha establecido contacto con el Reino Lejano, transformando poco a poco a sí mismo y a las criaturas que invoca en algo ajeno a este mundo.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "gather-information",
      "knowledge-arcana",
      "knowledge-architecture-engineering",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-history",
      "knowledge-local",
      "knowledge-nature",
      "knowledge-nobility-royalty",
      "knowledge-religion",
      "knowledge-the-planes",
      "listen",
      "profession",
      "spellcraft",
      "spot",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: ALIENIST_FEATURES,
    choices: ALIENIST_CHOICES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento: cualquiera no legal" },
      {
        description: "Saber (Planos): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-the-planes"] ?? 0) >= 8,
      },
      {
        description: "Aumentar Invocación (Augment Summoning)",
        check: hasFeat("augment-summoning"),
      },
      { description: "Capacidad de lanzar al menos un conjuro de invocación de nivel 3 o superior" },
      { description: "Haber hecho contacto pacífico con un alienista o una criatura pseudonatural" },
    ],
  },
  {
    id: "ca-argent-savant",
    name: "Sabio Argénteo (Argent Savant)",
    source: "complete-arcane",
    description:
      "Un especialista arcano que domina el descriptor de fuerza, capaz de blindar sus conjuros de fuerza contra la disipación e incluso de liberar la energía atrapada en efectos de fuerza ajenos.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "knowledge-arcana",
      "knowledge-architecture-engineering",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-history",
      "knowledge-local",
      "knowledge-nature",
      "knowledge-nobility-royalty",
      "knowledge-religion",
      "knowledge-the-planes",
      "profession",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: ARGENT_SAVANT_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Arcano): 6 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 6,
      },
      {
        description: "Conocimiento de Conjuros: 12 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 12,
      },
      { description: "Capacidad de lanzar al menos cinco conjuros con el descriptor de fuerza, uno de nivel 5 o superior" },
    ],
  },
  {
    id: "ca-blood-magus",
    name: "Mago de Sangre (Blood Magus)",
    source: "complete-arcane",
    description:
      "Un lanzador arcano que ha muerto y regresado de la muerte, y que desde entonces canaliza su magia a través de su propia sangre, dispuesto a sangrar por cada efecto adicional que arranca a sus conjuros.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: ["bluff", "concentration", "craft", "heal", "spellcraft"],
    babProgression: "media",
    saves: { fort: "buena", ref: "mala", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: BLOOD_MAGUS_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento: cualquiera excepto legal bueno" },
      {
        description: "Concentración: 4 rangos",
        check: (ctx) => (ctx.skillRanks["concentration"] ?? 0) >= 4,
      },
      {
        description: "Gran Fortaleza y Resistencia (Toughness)",
        check: (ctx) => ctx.featIds.has("great-fortitude") && ctx.featIds.has("toughness"),
      },
      {
        description: "Nivel de lanzador arcano 5º",
        check: (ctx) => ctx.casterLevel >= 5,
      },
      { description: "El personaje debe haber muerto y haber sido devuelto a la vida" },
    ],
  },
  {
    id: "ca-effigy-master",
    name: "Maestro de Efigies (Effigy Master)",
    source: "complete-arcane",
    description:
      "Un lanzador arcano que domina el arte ritual de crear efigies: pequeños constructos vinculados a su mente, capaces de espiar, explorar y actuar como sus ojos y oídos a distancia.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "knowledge-arcana",
      "knowledge-architecture-engineering",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-history",
      "knowledge-local",
      "knowledge-nature",
      "knowledge-nobility-royalty",
      "knowledge-religion",
      "knowledge-the-planes",
      "profession",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: EFFIGY_MASTER_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Oficio (cuero, metal o carpintería): 10 rangos",
        check: (ctx) => (ctx.skillRanks["craft"] ?? 0) >= 10,
      },
      {
        description: "Saber (Arcano): 5 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 5,
      },
      {
        description: "Conocimiento de Conjuros: 5 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 5,
      },
      {
        description: "Usar Objetos Mágicos: 2 rangos",
        check: (ctx) => (ctx.skillRanks["use-magic-device"] ?? 0) >= 2,
      },
      {
        description: "Crear Objeto Maravilloso (Craft Wondrous Item)",
        check: hasFeat("craft-wondrous-item"),
      },
      { description: "Debe tener el conjuro simulacro en la lista de conjuros de alguna de sus clases, pueda lanzarlo o no" },
    ],
  },
  {
    id: "ca-elemental-savant",
    name: "Erudito Elemental (Elemental Savant)",
    source: "complete-arcane",
    description:
      "Un especialista arcano que ata su magia y, poco a poco, su propio cuerpo a uno de los cuatro elementos clásicos (aire, agua, fuego o tierra), volviéndose cada vez más ajeno a la carne mortal.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "knowledge-arcana", "knowledge-the-planes", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: ELEMENTAL_SAVANT_FEATURES,
    choices: ELEMENTAL_SAVANT_CHOICES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Arcano): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 8,
      },
      {
        description: "Saber (Planos): 4 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-the-planes"] ?? 0) >= 4,
      },
      {
        description: "Sustitución de Energía (ácido, frío, electricidad o fuego)",
        check: hasFeat("ca-energy-substitution"),
      },
      {
        description:
          "Capacidad de lanzar al menos tres conjuros que compartan el descriptor de energía elegido, al menos uno de nivel 3 o superior",
      },
      { description: "Haber hecho contacto pacífico con un elemental o un monstruo exterior con subtipo elemental" },
    ],
  },
  {
    id: "ca-enlightened-fist",
    name: "Puño Iluminado (Enlightened Fist)",
    source: "complete-arcane",
    description:
      "Un lanzador arcano que combina el estudio de la magia con la disciplina marcial del monje, entregando sus conjuros a través de golpes desarmados envueltos en energía elemental.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "balance",
      "climb",
      "concentration",
      "craft",
      "escape-artist",
      "hide",
      "jump",
      "knowledge-arcana",
      "knowledge-religion",
      "listen",
      "move-silently",
      "profession",
      "spellcraft",
      "spot",
      "swim",
      "tumble",
    ],
    babProgression: "tres_cuartos",
    saves: { fort: "mala", ref: "buena", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: ENLIGHTENED_FIST_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Concentración: 8 rangos",
        check: (ctx) => (ctx.skillRanks["concentration"] ?? 0) >= 8,
      },
      {
        description: "Saber (Arcano): 5 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 5,
      },
      {
        description: "Conocimiento de Conjuros: 5 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 5,
      },
      {
        description: "Lanzar en Combate, Golpe Sin Armas Mejorado y Golpe Aturdidor",
        check: (ctx) =>
          ctx.featIds.has("combat-casting") && ctx.featIds.has("improved-unarmed-strike") && ctx.featIds.has("stunning-fist"),
      },
      {
        description: "Nivel de lanzador arcano 3º",
        check: (ctx) => ctx.casterLevel >= 3,
      },
    ],
  },
  {
    id: "ca-fatespinner",
    name: "Hilandera del Destino (Fatespinner)",
    source: "complete-arcane",
    description:
      "Una lanzadora arcana que ha aprendido a tirar de los hilos invisibles del azar y el destino, forzando el resultado de sucesos aparentemente aleatorios a su favor o en contra de sus enemigos.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["appraise", "concentration", "craft", "knowledge-arcana", "profession", "sleight-of-hand", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: FATESPINNER_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Arcano): 10 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 10,
      },
      { description: "Profesión (jugador): 5 rangos" },
      { description: "Capacidad de lanzar conjuros arcanos de nivel 4, incluyendo al menos un conjuro de adivinación" },
    ],
  },
  {
    id: "ca-geometer",
    name: "Geómetra (Geometer)",
    source: "complete-arcane",
    description:
      "Un lanzador arcano especializado en glifos, sigilos y guardas mágicas escritas, capaz de leer, suprimir y potenciar este tipo de magia como nadie más.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "decipher-script",
      "disable-device",
      "knowledge-arcana",
      "knowledge-architecture-engineering",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-history",
      "knowledge-local",
      "knowledge-nature",
      "knowledge-nobility-royalty",
      "knowledge-religion",
      "knowledge-the-planes",
      "profession",
      "search",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: GEOMETER_FEATURES,
    maxLevel: 5,
    isPrestige: true,
    prerequisites: [
      {
        description: "Descifrar Escritura: 9 rangos",
        check: (ctx) => (ctx.skillRanks["decipher-script"] ?? 0) >= 9,
      },
      {
        description: "Desactivar Mecanismos: 4 rangos",
        check: (ctx) => (ctx.skillRanks["disable-device"] ?? 0) >= 4,
      },
      {
        description: "Saber (Arcano): 9 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 9,
      },
      {
        description: "Buscar: 4 rangos",
        check: (ctx) => (ctx.skillRanks["search"] ?? 0) >= 4,
      },
      {
        description: "Inscribir Pergamino (Scribe Scroll)",
        check: hasFeat("scribe-scroll"),
      },
      { description: "Capacidad de preparar y lanzar conjuros arcanos de nivel 3" },
    ],
  },
  {
    id: "ca-green-star-adept",
    name: "Adepto de la Estrella Verde (Green Star Adept)",
    source: "complete-arcane",
    description:
      "Un lanzador arcano que consume estelmetal caído del cielo y se somete a una transformación progresiva hacia una naturaleza más dura, resistente y cada vez más ajena a la carne mortal.",
    hitDie: 8,
    skillPointsPerLevel: 2,
    classSkills: [
      "appraise",
      "concentration",
      "craft",
      "decipher-script",
      "knowledge-arcana",
      "knowledge-architecture-engineering",
      "knowledge-geography",
      "knowledge-history",
      "profession",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: ["armas simples"],
    armorProficiencies: [],
    features: GREEN_STAR_ADEPT_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +4",
        check: (ctx) => ctx.babTotal >= 4,
      },
      {
        description: "Descifrar Escritura: 2 rangos",
        check: (ctx) => (ctx.skillRanks["decipher-script"] ?? 0) >= 2,
      },
      {
        description: "Saber (Arcano): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 8,
      },
      {
        description: "Saber (Arquitectura e Ingeniería): 2 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-architecture-engineering"] ?? 0) >= 2,
      },
      {
        description: "Saber (Geografía): 2 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-geography"] ?? 0) >= 2,
      },
      {
        description: "Saber (Historia): 2 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-history"] ?? 0) >= 2,
      },
      {
        description: "Lanzar en Combate (Combat Casting)",
        check: hasFeat("combat-casting"),
      },
      {
        description: "Nivel de lanzador arcano 1º",
        check: (ctx) => ctx.casterLevel >= 1,
      },
      {
        description:
          "Debe conseguir al menos 2 onzas de estelmetal, pulverizarlo y consumirlo en una infusión especial preparada con reactivos arcanos que cuestan 1000 po y tarda una semana en prepararse",
      },
    ],
  },
  {
    id: "ca-incantatrix",
    name: "Incantatriz (Incantatrix)",
    source: "complete-arcane",
    description:
      "Una lanzadora arcana que ha llevado el estudio de la metamagia a un nivel casi instintivo, capaz de retorcer sus conjuros sobre la marcha y de tomar prestados hechizos de otras tradiciones arcanas.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "knowledge-arcana", "knowledge-the-planes", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: [
      {
        level: 1,
        name: "Metamagia Instantánea",
        description:
          "Una vez al día, la incantatriz puede aplicar cualquier dote de metamagia que conozca a un conjuro que esté lanzando sin incrementar el tiempo de lanzamiento, gastando en su lugar un espacio de conjuro dos niveles por encima del ajuste normal de esa dote de metamagia.",
      },
      {
        level: 1,
        name: "Progresión de Conjuros Arcanos",
        description:
          "Cada nivel de incantatriz (1º a 10º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
      },
      {
        level: 2,
        name: "Aprendizaje Avanzado",
        description:
          "Una vez por nivel de incantatriz, al ganar acceso a nuevos conjuros la incantatriz puede añadir a su lista de conjuros conocidos o a su libro de conjuros un conjuro arcano que no pertenezca a la lista de su clase, tratándolo como si perteneciera a ella.",
      },
      {
        level: 3,
        name: "Ataque Disipador",
        description:
          "La incantatriz puede canalizar un efecto de disipar magia a través de un ataque de toque cuerpo a cuerpo, en vez de dirigirlo como un conjuro normal.",
      },
      {
        level: 4,
        name: "Metamagia Instantánea Mejorada",
        description: "La incantatriz puede usar la Metamagia Instantánea dos veces por día.",
      },
      {
        level: 5,
        name: "Multitarea Arcana",
        description:
          'La incantatriz puede mantener activo un conjuro de duración "concentración" mientras lanza otro conjuro, siempre que supere una prueba de Concentración con CD 20 + el nivel del segundo conjuro.',
      },
      {
        level: 6,
        name: "Aprendizaje Avanzado Mejorado",
        description: "La incantatriz puede usar Aprendizaje Avanzado dos veces por nivel de clase.",
      },
      {
        level: 7,
        name: "Metamagia Instantánea Superior",
        description: "La incantatriz puede usar la Metamagia Instantánea tres veces por día.",
      },
      {
        level: 8,
        name: "Disipación Mayor",
        description: "El Ataque Disipador de la incantatriz funciona como disipar magia mayor.",
      },
      {
        level: 9,
        name: "Metamagia Instantánea Máxima",
        description: "La incantatriz puede usar la Metamagia Instantánea cuatro veces por día.",
      },
      {
        level: 10,
        name: "Maestría en Metamagia",
        description:
          "Una vez al día, la incantatriz puede aplicar una dote de metamagia a un conjuro sin ningún coste adicional de espacio de conjuro.",
      },
    ],
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Conocimiento de Conjuros: 12 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 12,
      },
      {
        description: "Saber (Arcano): 4 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 4,
      },
      {
        description: "Dos dotes de metamagia cualesquiera",
        check: (ctx) => countMatchingFeats(ctx.featIds, ARCANE_METAMAGIC_FEAT_IDS) >= 2,
      },
      {
        description: "Nivel de lanzador arcano 5",
        check: (ctx) => ctx.casterLevel >= 5,
      },
    ],
  },
  {
    id: "ca-initiate-of-the-sevenfold-veil",
    name: "Iniciada del Velo Séptuple (Initiate of the Sevenfold Veil)",
    source: "complete-arcane",
    description:
      "Una especialista en abjuración que domina siete velos de protección de creciente poder, capaz de erigir barreras que castigan a quien las cruza y de invertir la magia dirigida contra ella.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: [
      "appraise",
      "concentration",
      "craft",
      "decipher-script",
      "knowledge-arcana",
      "knowledge-architecture-engineering",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-history",
      "knowledge-local",
      "knowledge-nature",
      "knowledge-nobility-royalty",
      "knowledge-religion",
      "knowledge-the-planes",
      "profession",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: INITIATE_OF_THE_SEVENFOLD_VEIL_FEATURES,
    maxLevel: 7,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Arcano): 12 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 12,
      },
      {
        description: "Saber (Naturaleza): 4 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-nature"] ?? 0) >= 4,
      },
      {
        description: "Conocimiento de Conjuros: 12 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 12,
      },
      {
        description: "Enfoque de Conjuro Mayor (abjuración), Enfoque de Conjuro (abjuración) y Especialización en Habilidad (Conocimiento de Conjuros)",
        check: (ctx) =>
          ctx.featIds.has("greater-spell-focus") && ctx.featIds.has("spell-focus") && ctx.featIds.has("skill-focus"),
      },
      { description: "Capacidad de lanzar cinco conjuros de abjuración, incluyendo al menos dos de nivel 4 o superior" },
    ],
  },
  {
    id: "ca-mage-of-the-arcane-order",
    name: "Mago de la Orden Arcana (Mage of the Arcane Order)",
    source: "complete-arcane",
    description:
      "Un lanzador arcano iniciado en una orden gremial que comparte una Reserva de Conjuros común entre sus miembros, permitiéndole invocar hechizos que otro miembro conoce a cambio de una deuda de conjuros.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "decipher-script",
      "knowledge-arcana",
      "knowledge-architecture-engineering",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-history",
      "knowledge-local",
      "knowledge-nature",
      "knowledge-nobility-royalty",
      "knowledge-religion",
      "knowledge-the-planes",
      "profession",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: MAGE_OF_THE_ARCANE_ORDER_FEATURES,
    choices: MAGE_OF_THE_ARCANE_ORDER_CHOICES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Arcano): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 8,
      },
      { description: "Conjuro Cooperativo (Cooperative Spell) y Enfoque de Escuela Metamágica (o cualquier otra dote de metamagia)" },
      { description: "Capacidad de preparar y lanzar conjuros arcanos de nivel 2" },
      { description: "Debe pagar una cuota de iniciación de 750 po" },
    ],
  },
  {
    id: "ca-master-transmogrifist",
    name: "Maestro Transmogrificador (Master Transmogrifist)",
    source: "complete-arcane",
    description:
      "Un lanzador arcano que ha refinado el arte de la metamorfosis hasta poder adoptar un pequeño repertorio de formas favorecidas con una facilidad y una fidelidad fuera del alcance de un transmutador corriente.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: ["bluff", "concentration", "craft", "disguise", "knowledge-arcana", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: MASTER_TRANSMOGRIFIST_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento: cualquiera no legal" },
      {
        description: "Engañar: 2 rangos",
        check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 2,
      },
      {
        description: "Disfrazarse: 5 rangos",
        check: (ctx) => (ctx.skillRanks["disguise"] ?? 0) >= 5,
      },
      {
        description: "Sin Necesidad de Componentes (Eschew Materials)",
        check: hasFeat("eschew-materials"),
      },
      { description: "Capacidad de lanzar alterar el yo y metamorfosear" },
    ],
  },
  {
    id: "ca-mindbender",
    name: "Doblegador de Mentes (Mindbender)",
    source: "complete-arcane",
    description:
      "Un lanzador arcano especializado en encantamiento que se abre camino con manipulación mental, empujando voluntades débiles y, con el tiempo, esclavizando por completo la mente de sus víctimas.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: [
      "bluff",
      "concentration",
      "diplomacy",
      "intimidate",
      "knowledge-arcana",
      "knowledge-architecture-engineering",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-history",
      "knowledge-local",
      "knowledge-nature",
      "knowledge-nobility-royalty",
      "knowledge-religion",
      "knowledge-the-planes",
      "profession",
      "sense-motive",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: MINDBENDER_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento: cualquiera no bueno" },
      {
        description: "Engañar: 4 rangos",
        check: (ctx) => (ctx.skillRanks["bluff"] ?? 0) >= 4,
      },
      {
        description: "Diplomacia: 4 rangos",
        check: (ctx) => (ctx.skillRanks["diplomacy"] ?? 0) >= 4,
      },
      {
        description: "Intimidar: 4 rangos",
        check: (ctx) => (ctx.skillRanks["intimidate"] ?? 0) >= 4,
      },
      {
        description: "Averiguar Intenciones: 4 rangos",
        check: (ctx) => (ctx.skillRanks["sense-motive"] ?? 0) >= 4,
      },
      {
        description: "Capacidad de lanzar o usar persona amistosa (o similar); nivel de lanzador arcano 5º",
        check: (ctx) => ctx.casterLevel >= 5,
      },
    ],
  },
  {
    id: "ca-pale-master",
    name: "Maestro Pálido (Pale Master)",
    source: "complete-arcane",
    description:
      "Un nigromante que se aventura por la senda que separa la vida de la no vida, ligando su propio cuerpo a los poderes de los no muertos a los que sirve y crea.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: ["concentration", "craft", "knowledge-arcana", "knowledge-religion", "profession", "spellcraft"],
    babProgression: "media",
    saves: { fort: "buena", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: [
      {
        level: 1,
        name: "Aliado Sin Vida",
        description:
          "Los no muertos que el maestro pálido crea o controla mediante animar muertos u otros efectos similares ganan un bonificador de +2 a los puntos de golpe por dado de golpe.",
      },
      {
        level: 1,
        name: "Progresión de Conjuros Arcanos",
        description:
          "Cada nivel de maestro pálido (1º a 10º) otorga un nivel de lanzador arcano adicional a una clase de lanzador arcano que el personaje ya poseyera antes de entrar en la clase de prestigio, exactamente como si hubiera obtenido un nivel en dicha clase a efectos de conjuros por día, conjuros conocidos y nivel de lanzador (pero no otros rasgos de esa clase).",
      },
      {
        level: 2,
        name: "Toque Gélido",
        description:
          "El maestro pálido puede realizar un ataque de toque cuerpo a cuerpo que inflige 1d6 puntos de daño de frío, un número de veces por día igual a 3 + su modificador de Carisma.",
      },
      {
        level: 3,
        name: "Resistencia a la Energía (frío) 10",
        description: "El maestro pálido obtiene resistencia al frío 10 mientras su cuerpo se aletarga.",
      },
      {
        level: 4,
        name: "Aura de Repugnancia",
        description:
          "Los animales se niegan a acercarse voluntariamente al maestro pálido a menos que superen una tirada de salvación de Voluntad (CD 10 + la mitad del nivel de clase del maestro pálido + su modificador de Carisma).",
      },
      {
        level: 5,
        name: "Vida Parcialmente Sin Vida",
        description:
          "El cuerpo del maestro pálido empieza a asemejarse al de un no muerto: se vuelve inmune a los efectos de fatiga y agotamiento, y no necesita respirar.",
      },
      {
        level: 6,
        name: "Toque Gélido Mejorado",
        description: "El daño del Toque Gélido aumenta a 2d6 puntos de daño de frío.",
      },
      {
        level: 7,
        name: "Servidores Especiales",
        description:
          "Los esqueletos y zombis que el maestro pálido crea mediante sus conjuros son más resistentes de lo habitual, ganando un dado de golpe adicional y un bonificador de +2 a la Clase de Armadura natural.",
      },
      {
        level: 8,
        name: "Resistencia a la Energía (frío) 20",
        description: "La resistencia al frío del maestro pálido aumenta a 20.",
      },
      {
        level: 9,
        name: "Inmunidades Sin Vida",
        description:
          "El maestro pálido se vuelve inmune a los efectos de veneno, sueño mágico y parálisis, reflejo de su naturaleza cada vez más alejada de la vida.",
      },
      {
        level: 10,
        name: "Naturaleza Casi Sin Vida",
        description:
          "El maestro pálido completa su transformación parcial: es inmune a los golpes críticos y a los ataques furtivos, y obtiene un bonificador de +4 de competencia a las tiradas de salvación contra efectos de muerte y agotamiento de niveles de energía.",
      },
    ],
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Conocimiento de Conjuros: 5 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 5,
      },
      {
        description: "Saber (Arcano): 8 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 8,
      },
      {
        description: "Capacidad de lanzar el conjuro arcano animar muertos",
      },
      {
        description: "Nivel de lanzador arcano 5",
        check: (ctx) => ctx.casterLevel >= 5,
      },
    ],
  },
  {
    id: "ca-seeker-of-the-song",
    name: "Buscadora de la Canción (Seeker of the Song)",
    source: "complete-arcane",
    description:
      "Una bardo que ha sido expuesta a la música primal que precede a la magia búdica, y que aprende a interpretar melodías capaces de dañar, curar y proteger con un poder que va más allá de la música búdica ordinaria.",
    hitDie: 6,
    skillPointsPerLevel: 4,
    classSkills: [
      "climb",
      "concentration",
      "craft",
      "diplomacy",
      "jump",
      "knowledge-arcana",
      "listen",
      "perform",
      "profession",
      "ride",
      "sense-motive",
      "spot",
      "swim",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: SEEKER_OF_THE_SONG_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Arcano): 13 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 13,
      },
      {
        description: "Interpretar: 13 rangos",
        check: (ctx) => (ctx.skillRanks["perform"] ?? 0) >= 13,
      },
      {
        description: "Especialización en Habilidad (Interpretar, cualquiera)",
        check: hasFeat("skill-focus"),
      },
      {
        description:
          "Debe poseer la habilidad de música búdica y haber sido expuesta a la música primal escuchando a otra buscadora de la canción usar una habilidad de música de búsqueda",
      },
    ],
  },
  {
    id: "ca-sublime-chord",
    name: "Acorde Sublime (Sublime Chord)",
    source: "complete-arcane",
    description:
      "Un bardo (u otro lanzador arcano espontáneo dado a la interpretación) que ha tocado la música primigenia que dio forma al mundo, y que aprende a extraer de ella magia que en teoría no le pertenece.",
    hitDie: 6,
    skillPointsPerLevel: 4,
    classSkills: [
      "concentration",
      "craft",
      "decipher-script",
      "diplomacy",
      "knowledge-arcana",
      "knowledge-architecture-engineering",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-history",
      "knowledge-local",
      "knowledge-nature",
      "knowledge-nobility-royalty",
      "knowledge-religion",
      "knowledge-the-planes",
      "listen",
      "perform",
      "profession",
      "search",
      "spellcraft",
      "spot",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: SUBLIME_CHORD_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Arcano): 13 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 13,
      },
      {
        description: "Escuchar: 13 rangos",
        check: (ctx) => (ctx.skillRanks["listen"] ?? 0) >= 13,
      },
      {
        description: "Interpretar: 10 rangos",
        check: (ctx) => (ctx.skillRanks["perform"] ?? 0) >= 10,
      },
      { description: "Profesión (astrólogo): 6 rangos" },
      {
        description: "Conocimiento de Conjuros: 6 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 6,
      },
      { description: "Capacidad de lanzar conjuros arcanos de nivel 3" },
      { description: "Debe poseer la habilidad de música búdica" },
    ],
  },
  {
    id: "ca-suel-arcanamach",
    name: "Arcanamach Suelio (Suel Arcanamach)",
    source: "complete-arcane",
    description:
      "Un guerrero-lanzador de tradición suel que combina la espada y el conjuro en un mismo instante de combate, sacrificando parte de su progresión mágica a cambio de una versatilidad marcial mucho mayor que la de un simple lanzador.",
    hitDie: 8,
    skillPointsPerLevel: 4,
    classSkills: [
      "bluff",
      "climb",
      "concentration",
      "craft",
      "disguise",
      "escape-artist",
      "hide",
      "jump",
      "knowledge-arcana",
      "knowledge-history",
      "knowledge-the-planes",
      "listen",
      "move-silently",
      "profession",
      "search",
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
    features: SUEL_ARCANAMACH_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Bonificador base de ataque +6", check: (ctx) => ctx.babTotal >= 6 },
      { description: "Concentración: 4 rangos", check: (ctx) => (ctx.skillRanks["concentration"] ?? 0) >= 4 },
      { description: "Saltar: 4 rangos", check: (ctx) => (ctx.skillRanks["jump"] ?? 0) >= 4 },
      { description: "Conocimiento de Conjuros: 5 rangos", check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 5 },
      { description: "Piruetas: 4 rangos", check: (ctx) => (ctx.skillRanks["tumble"] ?? 0) >= 4 },
      {
        description: "Lanzar en Combate (Combat Casting) y Voluntad de Hierro (Iron Will)",
        check: (ctx) => ctx.featIds.has("combat-casting") && ctx.featIds.has("iron-will"),
      },
      { description: "Idioma: suel antiguo (Ancient Suloise)" },
      { description: "Competencia con al menos cuatro armas marciales o exóticas" },
      { description: "Debe leer el Grimorio Arcanamacha (una semana de estudio ininterrumpido) o entrenar con un instructor calificado (cuatro semanas)" },
    ],
  },
  {
    id: "ca-wayfarer-guide",
    name: "Guía Viajera (Wayfarer Guide)",
    source: "complete-arcane",
    description:
      "Un lanzador arcano miembro de la Unión de Viajeros que ha perfeccionado el arte de la teleportación, capaz de llevar consigo a más compañeros, más lejos y con más precisión que un lanzador corriente.",
    hitDie: 6,
    skillPointsPerLevel: 2,
    classSkills: [
      "concentration",
      "craft",
      "knowledge-arcana",
      "knowledge-architecture-engineering",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-history",
      "knowledge-local",
      "knowledge-nature",
      "knowledge-nobility-royalty",
      "knowledge-religion",
      "knowledge-the-planes",
      "profession",
      "spellcraft",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "mala", will: "buena" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: WAYFARER_GUIDE_FEATURES,
    maxLevel: 3,
    isPrestige: true,
    prerequisites: [
      {
        description: "Saber (Arcano): 10 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-arcana"] ?? 0) >= 10,
      },
      {
        description: "Saber (Geografía): 10 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-geography"] ?? 0) >= 10,
      },
      { description: "Capacidad de lanzar teletransportar" },
      { description: "Debe unirse a la Unión de Viajeros (puede abandonarla después sin perder niveles de clase)" },
    ],
  },
  {
    id: "ca-wild-mage",
    name: "Mago Salvaje (Wild Mage)",
    source: "complete-arcane",
    description:
      "Un lanzador arcano caótico que ha aprendido a soltar las riendas de su magia, aceptando un elemento de azar en cada conjuro a cambio de un poder impredecible pero a veces mucho mayor.",
    hitDie: 4,
    skillPointsPerLevel: 2,
    classSkills: [
      "bluff",
      "concentration",
      "craft",
      "intimidate",
      "knowledge-arcana",
      "knowledge-architecture-engineering",
      "knowledge-dungeoneering",
      "knowledge-geography",
      "knowledge-history",
      "knowledge-local",
      "knowledge-nature",
      "knowledge-nobility-royalty",
      "knowledge-religion",
      "knowledge-the-planes",
      "profession",
      "spellcraft",
      "use-magic-device",
    ],
    babProgression: "media",
    saves: { fort: "mala", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: WILD_MAGE_FEATURES,
    maxLevel: 10,
    isPrestige: true,
    prerequisites: [
      { description: "Alineamiento: cualquiera caótico" },
      {
        description: "Saber (Planos): 4 rangos",
        check: (ctx) => (ctx.skillRanks["knowledge-the-planes"] ?? 0) >= 4,
      },
      {
        description: "Conocimiento de Conjuros: 8 rangos",
        check: (ctx) => (ctx.skillRanks["spellcraft"] ?? 0) >= 8,
      },
      {
        description: "Usar Objetos Mágicos: 4 rangos",
        check: (ctx) => (ctx.skillRanks["use-magic-device"] ?? 0) >= 4,
      },
      {
        description: "Aptitud Mágica y Enfoque de Escuela Metamágica (o cualquier otra dote de metamagia)",
        check: (ctx) => ctx.featIds.has("magical-aptitude") && countMatchingFeats(ctx.featIds, ARCANE_METAMAGIC_FEAT_IDS) >= 1,
      },
    ],
  },
];
