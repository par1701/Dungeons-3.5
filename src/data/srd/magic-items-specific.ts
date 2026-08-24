import type { MagicItemReference } from "../../types";

// Armas y armaduras/escudos mágicos específicos del SRD 3.5: objetos con
// nombre propio y una combinación fija de propiedades (a diferencia de las
// propiedades de `magic-item-properties.ts`, que se combinan libremente al
// crear un arma o armadura mágica a medida). Varios son objetos maestros o
// de material especial sin magia real (adamantina, madera oscura, mithral,
// hierro frío, plata alquímica); esos no llevan `casterLevel`, `aura` ni
// `prerequisites`. Cuando la fuente da un "Precio" de mercado y un "Costo"
// de fabricación (en po + PX) por separado, el "Precio" va en el campo
// `price` y el "Costo" se menciona al final de `description`, ya que
// `MagicItemReference` no tiene un campo propio para el coste en PX.
export const SRD_SPECIFIC_MAGIC_ITEMS: MagicItemReference[] = [
  // --- Armaduras y Escudos Mágicos Específicos ---
  {
    id: "adamantine-breastplate",
    name: "Peto de Adamantina (Adamantine Breastplate)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "10,200 po",
    description:
      "Peto de adamantina. No es un objeto mágico: el material del que está forjado otorga por sí solo reducción de daño 2/—.",
  },
  {
    id: "banded-mail-of-luck",
    name: "Cota Bandeada de la Suerte (Banded Mail of Luck)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "18,900 po",
    casterLevel: 12,
    aura: "Encantamiento fuerte",
    prerequisites: "Craft Magic Arms and Armor, bless",
    description:
      "Cota bandeada +3 adornada con diez gemas de 100 po. Una vez por semana, el portador puede exigir que se repita una tirada de ataque hecha en su contra, debiendo aceptar el resultado de la repetición. Costo de creación: 10,150 po + 700 PX.",
  },
  {
    id: "breastplate-of-command",
    name: "Peto de Mando (Breastplate of Command)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "25,400 po",
    casterLevel: 15,
    aura: "Encantamiento fuerte",
    prerequisites: "Craft Magic Arms and Armor, mass charm monster",
    description:
      "Peto +2 finamente labrado que otorga +2 de competencia a las pruebas de Carisma (incluidas las de expulsar y las habilidades basadas en Carisma) y +2 de competencia a la puntuación de Liderazgo del portador. Las tropas amigas dentro de 360 pies se vuelven más valientes en su presencia. El portador pierde el efecto si intenta ocultarse o disfrazarse. Costo de creación: 10,975 po + 850 PX.",
  },
  {
    id: "celestial-armor",
    name: "Armadura Celestial (Celestial Armor)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "22,400 po",
    casterLevel: 5,
    aura: "Transmutación leve [bien]",
    prerequisites: "Craft Magic Arms and Armor, el creador debe ser bueno, fly",
    description:
      "Cota de malla +3 plateada o dorada, tan ligera que puede llevarse bajo ropa normal; Des máx +8, penalización de armadura –2, fallo de conjuro arcano 15%. Cuenta como armadura ligera y pesa 20 lb. Una vez al día, a la orden, permite al portador usar volar (fly) como el conjuro. Costo de creación: 12,550 po + 1,004 PX.",
  },
  {
    id: "demon-armor",
    name: "Armadura de Demonio (Demon Armor)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "52,260 po",
    casterLevel: 13,
    aura: "Nigromancia fuerte [mal]",
    prerequisites: "Craft Magic Arms and Armor, contagion",
    description:
      "Placa completa +4 rematada con un yelmo en forma de cabeza de demonio cornuda. Otorga al portador un ataque de garra que inflige 1d10 de daño, golpea como arma +1 y aflige como el conjuro contagio (Fortaleza CD 14 para negar). Cualquier portador que no sea malvado sufre un nivel negativo mientras la lleve puesta (no causa pérdida real de nivel y no puede superarse mientras se lleve). Costo de creación: 26,130 po + 2,090 PX.",
  },
  {
    id: "dragonhide-plate",
    name: "Placa de Piel de Dragón (Dragonhide Plate)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "3,300 po",
    description:
      "Placa completa hecha de piel de dragón curtida en vez de metal, lo que permite a los druidas llevarla sin infringir su restricción de no usar metal. No es un objeto mágico: en todo lo demás funciona como una placa completa maestra normal.",
  },
  {
    id: "dwarven-plate",
    name: "Placa Enana (Dwarven Plate)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "16,500 po",
    description:
      "Placa completa forjada en adamantina. No es un objeto mágico: el material del que está hecha otorga por sí solo reducción de daño 3/—.",
  },
  {
    id: "elven-chain",
    name: "Cota Élfica (Elven Chain)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "4,150 po",
    description:
      "Cota de malla de eslabones de mithral, extremadamente ligera. No es un objeto mágico: no reduce la velocidad del portador (30 pies para Medianos, 20 pies para Pequeños), fallo de conjuro arcano 20%, Des máx +4, penalización de armadura –2. Cuenta como armadura ligera y pesa 20 lb.",
  },
  {
    id: "mithral-full-plate-of-speed",
    name: "Placa Completa de Mithral de Velocidad (Mithral Full Plate of Speed)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "26,500 po",
    casterLevel: 5,
    aura: "Transmutación leve",
    prerequisites: "Craft Magic Arms and Armor, haste",
    description:
      "Placa completa de mithral +1. Como acción libre, el portador puede activarla para actuar como bajo el efecto de acelerar (haste) hasta 10 asaltos por día, no necesariamente consecutivos. Al estar hecha de mithral no reduce la velocidad del portador (20 pies para Medianos, 15 pies para Pequeños), fallo de conjuro arcano 25%, Des máx +3, penalización de armadura –3; cuenta como armadura media y pesa 25 lb.",
  },
  {
    id: "mithral-shirt",
    name: "Camisa de Mithral (Mithral Shirt)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "1,100 po",
    description:
      "Camisa de malla de eslabones de mithral, extremadamente ligera. No es un objeto mágico: no reduce la velocidad del portador (30 pies para Medianos, 20 pies para Pequeños), fallo de conjuro arcano 10%, Des máx +6, sin penalización de armadura. Cuenta como armadura ligera y pesa 10 lb.",
  },
  {
    id: "plate-armor-of-the-deep",
    name: "Placa Completa de las Profundidades (Plate Armor of the Deep)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "24,650 po",
    casterLevel: 11,
    aura: "Abjuración moderada",
    prerequisites: "Craft Magic Arms and Armor, freedom of movement, water breathing, tongues",
    description:
      "Placa completa +1 decorada con motivos de olas y peces. El portador se trata como si no llevara armadura a efectos de las pruebas de Natación, puede respirar bajo el agua indefinidamente y puede conversar con cualquier criatura que hable un idioma acuático. Costo de creación: 17,150 po + 600 PX.",
  },
  {
    id: "rhino-hide",
    name: "Piel de Rinoceronte (Rhino Hide)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "5,165 po",
    casterLevel: 9,
    aura: "Transmutación moderada",
    prerequisites: "Craft Magic Arms and Armor, bull's strength",
    description:
      "Armadura de piel +2 confeccionada con piel de rinoceronte. Además del bono de mejora +2 a la CA, tiene penalización de armadura –1 y añade 2d6 de daño adicional a cualquier ataque de carga exitoso del portador, incluida una carga montada. Costo de creación: 2,665 po + 200 PX.",
  },
  {
    id: "darkwood-buckler",
    name: "Broquel de Madera Oscura (Darkwood Buckler)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "205 po",
    description:
      "Escudo ligero tallado en madera oscura. No es un objeto mágico y no otorga bono de mejora, pero es mucho más ligero que uno normal (2.5 lb) y no impone penalización de armadura.",
  },
  {
    id: "darkwood-shield",
    name: "Escudo de Madera Oscura (Darkwood Shield)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "257 po",
    description:
      "Escudo pesado tallado en madera oscura. No es un objeto mágico y no otorga bono de mejora, pero es mucho más ligero que uno normal (5 lb) y no impone penalización de armadura.",
  },
  {
    id: "lions-shield",
    name: "Escudo del León (Lion's Shield)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "9,170 po",
    casterLevel: 10,
    aura: "Conjuración moderada",
    prerequisites: "Craft Magic Arms and Armor, summon nature's ally IV",
    description:
      "Escudo pesado de acero +2 forjado con forma de cabeza de león rugiente. Hasta tres veces por día, como acción libre, la cabeza de león puede atacar por su cuenta con el BAB completo del portador (incluidos sus ataques múltiples), infligiendo 2d6 de daño, de forma independiente a las acciones normales del portador. Costo de creación: 4,670 po + 360 PX.",
  },
  {
    id: "mithral-heavy-shield",
    name: "Escudo Pesado de Mithral (Mithral Heavy Shield)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "1,020 po",
    description:
      "Escudo pesado forjado en mithral, mucho más ligero que uno de acero estándar. No es un objeto mágico: fallo de conjuro arcano 5%, sin penalización de armadura, y pesa solo 5 lb.",
  },
  {
    id: "casters-shield",
    name: "Escudo del Lanzador (Caster's Shield)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "3,153 po (más el valor del conjuro inscrito, si lo hay)",
    casterLevel: 6,
    aura: "Abjuración moderada",
    prerequisites: "Craft Magic Arms and Armor, Scribe Scroll, el creador debe ser al menos nivel 6",
    description:
      "Escudo ligero de madera +1 con una tira de cuero en la que un lanzador de conjuros puede inscribir un solo conjuro de hasta 3er nivel, como en un pergamino, a mitad del costo de materiales base y el mismo costo en PX y componentes; la tira es reutilizable tras gastar el conjuro. Fallo de conjuro arcano 5%. Costo de creación: 1,653 po + 120 PX.",
  },
  {
    id: "spined-shield",
    name: "Escudo Espinoso (Spined Shield)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "5,580 po",
    casterLevel: 6,
    aura: "Evocación moderada",
    prerequisites: "Craft Magic Arms and Armor, magic missile",
    description:
      "Escudo pesado de acero +1 cubierto de espinas, que funciona además como un escudo con pincho normal. Hasta tres veces por día, a la orden, el portador puede disparar una espina con bono de mejora +1, incremento de alcance 120 pies, que inflige 1d10 de daño (19–20/x2); las espinas se regeneran cada día. Costo de creación: 2,740 po + 223 PX.",
  },
  {
    id: "winged-shield",
    name: "Escudo Alado (Winged Shield)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "17,257 po",
    casterLevel: 5,
    aura: "Transmutación leve",
    prerequisites: "Craft Magic Arms and Armor, fly",
    description:
      "Escudo pesado de madera redondo con bono de mejora +3, adornado con alas emplumadas. Una vez al día puede volar (como el conjuro) llevando al portador: hasta 133 lb de carga a 60 pies por asalto, o hasta 266 lb a 40 pies por asalto. Costo de creación: 8,628 po y 5 pp (plata) + 690 PX.",
  },
  {
    id: "absorbing-shield",
    name: "Escudo Absorbente (Absorbing Shield)",
    source: "srd",
    category: "armadura_o_escudo_especifica",
    price: "50,170 po",
    casterLevel: 17,
    aura: "Transmutación fuerte",
    prerequisites: "Craft Magic Arms and Armor, disintegrate",
    description:
      "Escudo pesado de acero +1, de un negro que parece absorber la luz. Una vez cada dos días, a la orden, puede desintegrar un objeto que toque, como el conjuro desintegrar, requiriendo un ataque de contacto cuerpo a cuerpo. Costo de creación: 25,170 po + 2,000 PX.",
  },

  // --- Armas Mágicas Específicas ---
  {
    id: "adamantine-battleaxe",
    name: "Hacha de Batalla de Adamantina (Adamantine Battleaxe)",
    source: "srd",
    category: "arma_especifica",
    price: "3,010 po",
    description:
      "Hacha de batalla forjada en adamantina. No es un objeto mágico: como arma maestra, otorga +1 de mejora a las tiradas de ataque.",
  },
  {
    id: "adamantine-dagger",
    name: "Daga de Adamantina (Adamantine Dagger)",
    source: "srd",
    category: "arma_especifica",
    price: "3,002 po",
    description:
      "Daga forjada en adamantina. No es un objeto mágico: como arma maestra, otorga +1 de mejora a las tiradas de ataque.",
  },
  {
    id: "assassins-dagger",
    name: "Daga del Asesino (Assassin's Dagger)",
    source: "srd",
    category: "arma_especifica",
    price: "18,302 po",
    casterLevel: 9,
    aura: "Nigromancia moderada",
    prerequisites: "Craft Magic Arms and Armor, slay living",
    description:
      "Daga curva +2 que otorga +1 a la CD de la salvación de Fortaleza que fuerza el ataque de muerte de un asesino. Costo de creación: 9,302 po + 720 PX.",
  },
  {
    id: "dagger-of-venom",
    name: "Daga de Veneno (Dagger of Venom)",
    source: "srd",
    category: "arma_especifica",
    price: "8,302 po",
    casterLevel: 5,
    aura: "Nigromancia leve",
    prerequisites: "Craft Magic Arms and Armor, poison",
    description:
      "Daga negra +1 de filo aserrado. Una vez por día, permite aplicar un efecto de veneno (como el conjuro, CD 14) a una criatura golpeada; se activa como acción libre en el mismo asalto del golpe. Costo de creación: 4,302 po + 320 PX.",
  },
  {
    id: "dwarven-thrower",
    name: "Lanzadora Enana (Dwarven Thrower)",
    source: "srd",
    category: "arma_especifica",
    price: "60,312 po",
    casterLevel: 10,
    aura: "Evocación moderada",
    prerequisites: "Craft Magic Arms and Armor, el creador debe ser enano de nivel 10 o superior",
    description:
      "Funciona como un martillo de guerra +2; en manos de un enano gana +1 adicional de mejora (total +3) y la propiedad retornante. Puede lanzarse con un incremento de alcance de 30 pies, infligiendo 2d8 de daño adicional contra gigantes o 1d8 contra cualquier otro objetivo. Costo de creación: 30,312 po + 2,400 PX.",
  },
  {
    id: "flame-tongue",
    name: "Lengua de Fuego (Flame Tongue)",
    source: "srd",
    category: "arma_especifica",
    price: "20,715 po",
    casterLevel: 12,
    aura: "Evocación moderada",
    prerequisites: "Craft Magic Arms and Armor, scorching ray, y flame blade/flame strike/fireball",
    description:
      "Espada larga +1 flamígera explosiva. Una vez por día puede lanzar un rayo de fuego a un objetivo dentro de 30 pies (ataque de contacto a distancia) que inflige 4d6 de daño de fuego. Costo de creación: 10,515 po + 816 PX.",
  },
  {
    id: "frost-brand",
    name: "Marca de Escarcha (Frost Brand)",
    source: "srd",
    category: "arma_especifica",
    price: "54,475 po",
    casterLevel: 14,
    aura: "Evocación fuerte",
    prerequisites: "Craft Magic Arms and Armor, ice storm, dispel magic, protection from energy",
    description:
      "Espadón +3 helado. Emite luz como una antorcha cuando la temperatura baja de 0°F (no puede ocultarse ni apagarse en esas condiciones). Protege al portador del fuego, absorbiendo los primeros 10 puntos de daño de fuego de cada asalto, y extingue fuegos no mágicos en su área. Como acción estándar puede disipar conjuros de fuego duraderos (no instantáneos) con una tirada de disipar magia de 1d20+14 contra CD 11 + el nivel de conjurador del conjuro. Costo de creación: 27,375 po y 5 pp (plata) + 2,179 PX.",
  },
  {
    id: "holy-avenger",
    name: "Vengador Sagrado (Holy Avenger)",
    source: "srd",
    category: "arma_especifica",
    price: "120,630 po",
    casterLevel: 18,
    aura: "Abjuración fuerte",
    prerequisites: "Craft Magic Arms and Armor, holy aura, el creador debe ser bueno",
    description:
      "Espada larga de hierro frío +2 que se convierte en espada larga sagrada +5 de hierro frío en manos de un paladín. Otorga resistencia a conjuros 5 + el nivel del paladín, tanto a este como a los aliados adyacentes. El paladín puede lanzar disipar magia mayor (solo la variante de área) una vez por asalto como acción estándar, al nivel de su clase. Costo de creación: 60,630 po + 4,800 PX.",
  },
  {
    id: "javelin-of-lightning",
    name: "Jabalina del Relámpago (Javelin of Lightning)",
    source: "srd",
    category: "arma_especifica",
    price: "1,500 po",
    casterLevel: 5,
    aura: "Evocación leve",
    prerequisites: "Craft Magic Arms and Armor, lightning bolt",
    description:
      "Al ser lanzada, se transforma en un rayo relámpago que inflige 5d6 de daño (salvación de Reflejos CD 14 para reducirlo a la mitad); la jabalina se consume en el ataque. Costo de creación: 750 po + 30 PX.",
  },
  {
    id: "life-drinker",
    name: "Bebedora de Vida (Life-Drinker)",
    source: "srd",
    category: "arma_especifica",
    price: "40,320 po",
    casterLevel: 13,
    aura: "Nigromancia fuerte",
    prerequisites: "Craft Magic Arms and Armor, enervation",
    description:
      "Hachón +1, favorecido por no-muertos y constructos, que no sufren la desventaja habitual al usarla. Al infligir daño, otorga dos niveles negativos al objetivo, como si hubiera sido golpeado por un no-muerto (un día después, el objetivo debe salvar Fortaleza CD 16 por cada nivel negativo o perder un nivel de personaje). Cada vez que inflige daño, el arma otorga también un nivel negativo temporal (dura 1 hora) al propio portador. Costo de creación: 20,320 po + 1,600 PX.",
  },
  {
    id: "luck-blade",
    name: "Espada de la Suerte (Luck Blade)",
    source: "srd",
    category: "arma_especifica",
    price: "22,060 po (0 deseos), 62,360 po (1 deseo), 102,660 po (2 deseos), 142,960 po (3 deseos)",
    casterLevel: 17,
    aura: "Evocación fuerte",
    prerequisites: "Craft Magic Arms and Armor, wish o miracle",
    description:
      "Espada corta +2 que otorga +1 de suerte a todas las salvaciones del portador. Una vez por día permite repetir una tirada propia, debiendo aceptar el nuevo resultado. Puede contener hasta 3 deseos (si se determina al azar, 1d4–1, con un mínimo de 0). Al gastar el último deseo almacenado, el arma sigue funcionando como espada corta +2 con el bono de suerte y la repetición diaria.",
  },
  {
    id: "mace-of-smiting",
    name: "Maza de Destrucción (Mace of Smiting)",
    source: "srd",
    category: "arma_especifica",
    price: "75,312 po",
    casterLevel: 11,
    aura: "Transmutación moderada",
    prerequisites: "Craft Magic Arms and Armor, disintegrate",
    description:
      "Maza pesada de adamantina +3, con +5 de mejora adicional contra constructos. Un golpe crítico contra un constructo lo destruye por completo, sin salvación. Un golpe crítico contra un exterior inflige x4 de daño en vez de x2. Costo de creación: 39,312 po + 2,880 PX.",
  },
  {
    id: "mace-of-terror",
    name: "Maza del Terror (Mace of Terror)",
    source: "srd",
    category: "arma_especifica",
    price: "38,552 po",
    casterLevel: 13,
    aura: "Nigromancia fuerte",
    prerequisites: "Craft Magic Arms and Armor, fear",
    description:
      "Maza pesada +2. A la orden, transforma la apariencia del portador en una ilusión de horror: las criaturas vivas en un cono de 30 pies deben salvar Voluntad CD 16 o quedar aterrorizadas como por el conjuro miedo (parcial), sufriendo –2 a las salvaciones y huyendo. Usable hasta 3 veces por día. Costo de creación: 19,276 po + 1,542 PX.",
  },
  {
    id: "masterwork-cold-iron-longsword",
    name: "Espada Larga de Hierro Frío Maestra (Masterwork Cold Iron Longsword)",
    source: "srd",
    category: "arma_especifica",
    price: "330 po",
    description:
      "Espada larga forjada en hierro frío. No es un objeto mágico: como arma maestra, otorga +1 de mejora a las tiradas de ataque.",
  },
  {
    id: "nine-lives-stealer",
    name: "Ladrona de Nueve Vidas (Nine Lives Stealer)",
    source: "srd",
    category: "arma_especifica",
    price: "23,057 po",
    casterLevel: 13,
    aura: "Nigromancia fuerte [mal]",
    prerequisites: "Craft Magic Arms and Armor, finger of death",
    description:
      "Espada larga que funciona siempre como +2, con el poder añadido de arrebatar la fuerza vital de un oponente hasta 9 veces (tras la novena vez queda como una simple espada larga +2). El efecto requiere un golpe crítico; la víctima puede salvar Fortaleza CD 20 para evitar la muerte, en cuyo caso no se gasta ningún uso y se aplica el daño normal del crítico. Es un arma maligna: cualquier personaje bueno que la empuñe recibe dos niveles negativos, que persisten mientras la lleve (sin causar pérdida real de nivel). Costo de creación: 11,528 po y 5 pp (plata) + 922 PX.",
  },
  {
    id: "oathbow",
    name: "Arco del Juramento (Oathbow)",
    source: "srd",
    category: "arma_especifica",
    price: "25,600 po",
    casterLevel: 15,
    aura: "Evocación fuerte",
    prerequisites: "Craft Magic Arms and Armor, el creador debe ser elfo",
    description:
      "Arco compuesto largo +2 (bono de Fuerza +2) de manufactura élfica. Una vez por día, tras jurar en voz alta destruir a un objetivo (acción libre), el arco gana un enemigo jurado: contra este, su bono de mejora sube a +5 y sus flechas infligen 2d6 de daño adicional (multiplicador de crítico x4 en vez de x3). Contra cualquier otro objetivo funciona solo como arma maestra, y mientras dura el juramento el portador sufre –1 al ataque con cualquier otra arma. El efecto dura 7 días o hasta que el enemigo jurado muera; el arco solo puede tener un enemigo jurado a la vez y no puede jurar de nuevo hasta 24 horas después. Costo de creación: 13,100 po + 1,000 PX.",
  },
  {
    id: "rapier-of-puncturing",
    name: "Estoque de Punción (Rapier of Puncturing)",
    source: "srd",
    category: "arma_especifica",
    price: "50,320 po",
    casterLevel: 13,
    aura: "Nigromancia fuerte",
    prerequisites: "Craft Magic Arms and Armor, harm",
    description:
      "Estoque hiriente +2. Tres veces por día permite realizar un ataque de contacto que drena sangre, infligiendo 1d6 de daño de Constitución; las criaturas inmunes a golpes críticos son inmunes a este daño. Costo de creación: 25,320 po + 2,000 PX.",
  },
  {
    id: "screaming-bolt",
    name: "Saeta Chillona (Screaming Bolt)",
    source: "srd",
    category: "arma_especifica",
    price: "267 po",
    casterLevel: 5,
    aura: "Encantamiento leve",
    prerequisites: "Craft Magic Arms and Armor, doom",
    description:
      "Virote de ballesta +2 que, al ser disparado, emite un grito que fuerza a los enemigos del portador situados dentro de 20 pies de su trayectoria a salvar Voluntad CD 14 o quedar sacudidos, un efecto de miedo que afecta la mente. Costo de creación: 128 po y 5 pp (plata) + 10 PX.",
  },
  {
    id: "shatterspike",
    name: "Rompeaceros (Shatterspike)",
    source: "srd",
    category: "arma_especifica",
    price: "4,315 po",
    casterLevel: 13,
    aura: "Evocación fuerte",
    prerequisites: "requiere Fuerza 13, Craft Magic Arms and Armor, Power Attack, Improved Sunder, shatter",
    description:
      "Sin la dote Sunder Mejorado, funciona solo como una espada larga +1. Con la dote, añade +4 (incluyendo su propio bono de mejora) a la tirada opuesta al intentar romper el arma de un enemigo, infligiendo 1d8+4 más el modificador de Fuerza del portador al arma objetivo, aunque aún debe superarse su dureza. Puede dañar armas con bono de mejora +4 o inferior. Pesa 4 lb. Costo de creación: 2,315 po + 160 PX.",
  },
  {
    id: "shifters-sorrow",
    name: "Pesar del Cambiante (Shifter's Sorrow)",
    source: "srd",
    category: "arma_especifica",
    price: "12,780 po",
    casterLevel: 15,
    aura: "Transmutación fuerte",
    prerequisites: "Craft Magic Arms and Armor, baleful polymorph",
    description:
      "Espada de dos hojas +1/+1 con hojas de plata alquímica. Inflige 2d6 de daño adicional contra criaturas con el subtipo cambiaformas. Al golpear a un cambiaformas, o a una criatura en una forma alternativa (como un druida en forma salvaje), el objetivo debe salvar Voluntad CD 15 o revertir a su forma natural. Pesa 10 lb. Costo de creación: 6,780 po + 480 PX.",
  },
  {
    id: "silver-dagger-masterwork",
    name: "Daga de Plata Maestra (Silver Dagger, Masterwork)",
    source: "srd",
    category: "arma_especifica",
    price: "322 po",
    description:
      "Daga maestra forjada en plata alquímica. No es un objeto mágico: como arma maestra, otorga +1 de mejora a las tiradas de ataque.",
  },
  {
    id: "slaying-arrow",
    name: "Flecha Asesina (Slaying Arrow)",
    source: "srd",
    category: "arma_especifica",
    price: "2,282 po (normal) o 4,057 po (mayor)",
    casterLevel: 13,
    aura: "Nigromancia fuerte",
    prerequisites: "Craft Magic Arms and Armor, finger of death (normal) o heightened finger of death (mayor)",
    description:
      "Flecha +1 asignada al azar a un tipo o subtipo de criatura concreto. Si golpea a una criatura de ese tipo, el objetivo debe salvar Fortaleza CD 20 o morir al instante (o ser destruido, si no está vivo). Afecta incluso a criaturas normalmente exentas de salvaciones de Fortaleza, como no-muertos o constructos, y es un efecto de muerte contra criaturas vivas (por lo que protección contra la muerte, death ward, la bloquea). La versión mayor usa CD 23. Costo de creación: 1,144 po y 5 pp (plata) + 91 PX (normal) o 2,032 po + 162 PX (mayor).",
  },
  {
    id: "sleep-arrow",
    name: "Flecha del Sueño (Sleep Arrow)",
    source: "srd",
    category: "arma_especifica",
    price: "132 po",
    casterLevel: 5,
    aura: "Encantamiento leve",
    prerequisites: "Craft Magic Arms and Armor, sleep",
    description:
      "Flecha +1 blanca que, si impacta, inflige daño no letal equivalente al daño letal normal en vez de daño real, y fuerza una salvación de Voluntad CD 11 o el objetivo cae dormido. Costo de creación: 69 po y 5 pp (plata) + 5 PX.",
  },
  {
    id: "sun-blade",
    name: "Espada de Sol (Sun Blade)",
    source: "srd",
    category: "arma_especifica",
    price: "50,335 po",
    casterLevel: 10,
    aura: "Evocación moderada",
    prerequisites: "Craft Magic Arms and Armor, daylight, el creador debe ser bueno",
    description:
      "Del tamaño de una espada bastarda, pero se empuña y se percibe como una espada corta (la competencia y las dotes de Enfoque/Especialización en Arma de ambas armas se aplican, sin acumularse entre sí). En combate normal equivale a una espada bastarda +2; contra criaturas malvadas su bono de mejora sube a +4. Contra criaturas del Plano de Energía Negativa o no-muertos inflige el doble de daño (multiplicador de crítico x3 en vez de x2). Una vez por día, el portador puede blandirla y pronunciar una palabra de mando para que emita luz de pleno día en un radio de 60 pies, que comienza en 10 pies y se expande 5 pies por asalto durante 10 asaltos. Es un arma de alineamiento bueno; cualquier criatura malvada que la empuñe recibe un nivel negativo que persiste mientras la sostenga. Costo de creación: 25,335 po + 2,000 PX.",
  },
  {
    id: "sword-of-life-stealing",
    name: "Espada que Roba la Vida (Sword of Life Stealing)",
    source: "srd",
    category: "arma_especifica",
    price: "25,715 po",
    casterLevel: 17,
    aura: "Nigromancia fuerte",
    prerequisites: "Craft Magic Arms and Armor, enervation",
    description:
      "Espada larga de hierro negro +2 que otorga un nivel negativo a la víctima al conseguir un golpe crítico; por cada nivel negativo otorgado, el portador gana 1d6 puntos de golpe temporales, que duran 24 horas. Un día después de recibir el golpe, el objetivo debe salvar Fortaleza CD 16 por cada nivel negativo o perder un nivel de personaje. Costo de creación: 12,857 po y 5 pp (plata) + 1,029 PX.",
  },
  {
    id: "sword-of-the-planes",
    name: "Espada de los Planos (Sword of the Planes)",
    source: "srd",
    category: "arma_especifica",
    price: "22,315 po",
    casterLevel: 15,
    aura: "Evocación fuerte",
    prerequisites: "Craft Magic Arms and Armor, plane shift",
    description:
      "Espada larga con bono de mejora +1 en el Plano Material. En cualquier Plano Elemental, o contra elementales mientras está en el Plano Material, es +2. En el Plano Astral o el Etéreo, o contra nativos de esos planos, es +3. En cualquier otro plano, o contra cualquier exterior, funciona como +4. Costo de creación: 11,157 po y 5 pp (plata) + 893 PX.",
  },
  {
    id: "sword-of-subtlety",
    name: "Espada de la Sutileza (Sword of Subtlety)",
    source: "srd",
    category: "arma_especifica",
    price: "22,310 po",
    casterLevel: 7,
    aura: "Ilusión moderada",
    prerequisites: "Craft Magic Arms and Armor, blur",
    description:
      "Espada corta +1 de hoja gris opaca que otorga +4 a las tiradas de ataque y de daño del portador al realizar un ataque furtivo con ella. Costo de creación: 11,155 po + 892 PX.",
  },
  {
    id: "sylvan-scimitar",
    name: "Cimitarra Silvana (Sylvan Scimitar)",
    source: "srd",
    category: "arma_especifica",
    price: "47,315 po",
    casterLevel: 11,
    aura: "Evocación moderada",
    prerequisites: "Craft Magic Arms and Armor, divine power o el creador debe ser druida de nivel 7",
    description:
      "Cimitarra +3 que, usada al aire libre en clima templado, otorga al portador el uso de la dote Cleave (aunque no la posea) e inflige 1d6 de daño adicional. Costo de creación: 23,657 po y 5 pp (plata) + 1,893 PX.",
  },
  {
    id: "trident-of-fish-command",
    name: "Tridente para Convocar Peces (Trident of Fish Command)",
    source: "srd",
    category: "arma_especifica",
    price: "18,650 po",
    casterLevel: 7,
    aura: "Encantamiento moderado",
    prerequisites: "Craft Magic Arms and Armor, speak with animals",
    description:
      "Tridente +1 con asta de 6 pies. Permite encantar hasta 14 dados de golpe de animales acuáticos (salvación de Voluntad CD 16 para negar, +5 si están siendo atacados), sin que ninguno quede a más de 30 pies de otro; usable hasta 3 veces por día. El portador puede comunicarse con los animales encantados como con el conjuro hablar con los animales. Los animales que superan la salvación quedan libres de control, pero no se acercan a menos de 10 pies del tridente. Costo de creación: 9,325 po + 746 PX.",
  },
  {
    id: "trident-of-warning",
    name: "Tridente de Aviso (Trident of Warning)",
    source: "srd",
    category: "arma_especifica",
    price: "10,115 po",
    casterLevel: 7,
    aura: "Adivinación moderada",
    prerequisites: "Craft Magic Arms and Armor, locate creature",
    description:
      "Tridente +2 que, además de sus propiedades normales, permite determinar la ubicación, profundidad, tipo y número de depredadores acuáticos en un radio de 680 pies. Debe sostenerse y apuntarse, y requiere 1 asalto de uso para escanear un hemisferio completo de 680 pies de radio. Costo de creación: 5,057 po y 5 pp (plata) + 405 PX.",
  },
];
