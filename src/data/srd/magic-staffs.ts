import type { MagicItemReference } from "../../types";

// Bastones (staffs) del SRD. Cada bastón tiene 50 cargas al crearse, CA 7,
// 10 pg, dureza 5 y CD de rotura 24; usa la característica y dotes del
// portador para fijar la CD de salvación de sus conjuros (el portador puede
// aplicar su propio nivel de conjurador si es mayor que el del bastón). No
// se incluyen varitas (wands) ni bastones de mando (rods): están fuera del
// alcance de este catálogo.
export const SRD_STAFFS: MagicItemReference[] = [
  {
    id: "staff-of-abjuration",
    name: "Bastón de Abjuración (Staff of Abjuration)",
    source: "srd",
    category: "baculo",
    price: "65.000 po",
    casterLevel: 13,
    description:
      "Bastón con 50 cargas que permite lanzar escudo (1 carga), resistencia a energía (1 carga), dispersar magia (1 carga), globo menor de invulnerabilidad (2 cargas), destierro (2 cargas) o repulsión (3 cargas).",
  },
  {
    id: "staff-of-charming",
    name: "Bastón de Encantar (Staff of Charming)",
    source: "srd",
    category: "baculo",
    price: "16.500 po",
    casterLevel: 8,
    description:
      "Bastón con 50 cargas que permite lanzar encantar persona (1 carga) o encantar monstruo (2 cargas).",
  },
  {
    id: "staff-of-conjuration",
    name: "Bastón de Conjuración (Staff of Conjuration)",
    source: "srd",
    category: "baculo",
    price: "65.000 po",
    casterLevel: 13,
    description:
      "Bastón con 50 cargas que permite lanzar sirviente invisible (1 carga), convocar enjambre (1 carga), nube apestosa (1 carga), creación menor (2 cargas), nube fétida mortal (2 cargas) o convocar monstruo VI (3 cargas).",
  },
  {
    id: "staff-of-defense",
    name: "Bastón de Defensa (Staff of Defense)",
    source: "srd",
    category: "baculo",
    price: "58.250 po",
    casterLevel: 15,
    description:
      "Bastón con 50 cargas que permite lanzar escudo (1 carga), escudo de la fe (1 carga), escudo ajeno (1 carga) o escudo de la ley (3 cargas). Requiere que el creador sea de alineamiento legal.",
  },
  {
    id: "staff-of-divination",
    name: "Bastón de Adivinación (Staff of Divination)",
    source: "srd",
    category: "baculo",
    price: "73.500 po",
    casterLevel: 13,
    description:
      "Bastón con 50 cargas que permite lanzar detectar puertas secretas (1 carga), localizar objeto (1 carga), lenguas (1 carga), localizar criatura (2 cargas), ojos observadores (2 cargas) o visión verdadera (3 cargas).",
  },
  {
    id: "staff-of-earth-and-stone",
    name: "Bastón de Tierra y Piedra (Staff of Earth and Stone)",
    source: "srd",
    category: "baculo",
    price: "80.500 po",
    casterLevel: 11,
    description:
      "Bastón con 50 cargas que permite lanzar paso a través de muros (1 carga) o mover tierra (1 carga).",
  },
  {
    id: "staff-of-enchantment",
    name: "Bastón de Hechizar (Staff of Enchantment)",
    source: "srd",
    category: "baculo",
    price: "65.000 po",
    casterLevel: 13,
    description:
      "Bastón con 50 cargas que permite lanzar sueño (1 carga), risa horrible (1 carga), sugestión (1 carga), desesperación agobiante (2 cargas), niebla mental (2 cargas) o sugestión en masa (3 cargas).",
  },
  {
    id: "staff-of-evocation",
    name: "Bastón de Evocación (Staff of Evocation)",
    source: "srd",
    category: "baculo",
    price: "65.000 po",
    casterLevel: 13,
    description:
      "Bastón con 50 cargas que permite lanzar proyectil mágico (1 carga), destrozar (1 carga), bola de fuego (1 carga), tormenta de hielo (2 cargas), muro de fuerza (2 cargas) o cadena de rayos (3 cargas).",
  },
  {
    id: "staff-of-fire",
    name: "Bastón de Fuego (Staff of Fire)",
    source: "srd",
    category: "baculo",
    price: "17.750 po",
    casterLevel: 8,
    description:
      "Bastón con 50 cargas que permite lanzar manos ardientes (1 carga), bola de fuego (1 carga) o muro de fuego (2 cargas).",
  },
  {
    id: "staff-of-frost",
    name: "Bastón de Escarcha (Staff of Frost)",
    source: "srd",
    category: "baculo",
    price: "56.250 po",
    casterLevel: 10,
    description:
      "Bastón con 50 cargas que permite lanzar tormenta de hielo (1 carga), muro de hielo (1 carga) o cono de frío (2 cargas).",
  },
  {
    id: "staff-of-healing",
    name: "Bastón de Curación (Staff of Healing)",
    source: "srd",
    category: "baculo",
    price: "27.750 po",
    casterLevel: 8,
    description:
      "Bastón con 50 cargas que permite lanzar restauración menor (1 carga), curar heridas graves (1 carga), remover ceguera/sordera (2 cargas) o remover enfermedad (3 cargas).",
  },
  {
    id: "staff-of-illusion",
    name: "Bastón de Ilusión (Staff of Illusion)",
    source: "srd",
    category: "baculo",
    price: "65.000 po",
    casterLevel: 13,
    description:
      "Bastón con 50 cargas que permite lanzar disfrazarse (1 carga), imagen especular (1 carga), imagen mayor (1 carga), patrón de arcoíris (2 cargas), imagen persistente (2 cargas) o confundir (3 cargas).",
  },
  {
    id: "staff-of-illumination",
    name: "Bastón de Iluminación (Staff of Illumination)",
    source: "srd",
    category: "baculo",
    price: "48.250 po",
    casterLevel: 15,
    description:
      "Bastón con 50 cargas que permite lanzar luces danzantes (1 carga), destello (1 carga), luz del día (2 cargas) o resplandor solar (3 cargas).",
  },
  {
    id: "staff-of-life",
    name: "Bastón de Vida (Staff of Life)",
    source: "srd",
    category: "baculo",
    price: "155.750 po",
    casterLevel: 13,
    description:
      "Bastón con 50 cargas que permite lanzar curar (1 carga) o resurrección (5 cargas).",
  },
  {
    id: "staff-of-necromancy",
    name: "Bastón de Nigromancia (Staff of Necromancy)",
    source: "srd",
    category: "baculo",
    price: "65.000 po",
    casterLevel: 13,
    description:
      "Bastón con 50 cargas que permite lanzar causar miedo (1 carga), toque de gul (1 carga), detener a los no muertos (1 carga), enervación (2 cargas), olas de fatiga (2 cargas) o círculo de la muerte (3 cargas).",
  },
  {
    id: "staff-of-passage",
    name: "Bastón de Paso (Staff of Passage)",
    source: "srd",
    category: "baculo",
    price: "170.500 po",
    casterLevel: 17,
    description:
      "Bastón con 50 cargas que permite lanzar puerta dimensional (1 carga), paso a través de muros (1 carga), puerta de fase (2 cargas), teletransporte mayor (2 cargas) o proyección astral (2 cargas).",
  },
  {
    id: "staff-of-power",
    name: "Bastón de Poder (Staff of Power)",
    source: "srd",
    category: "baculo",
    price: "211.000 po",
    casterLevel: 15,
    description:
      "Bastón con 50 cargas que permite lanzar proyectil mágico (1 carga), rayo de debilidad potenciado a nivel 5 (1 carga), llama continua (1 carga), levitar (1 carga), relámpago potenciado a nivel 5 (1 carga), bola de fuego potenciada a nivel 5 (1 carga), cono de frío (2 cargas), inmovilizar monstruo (2 cargas), muro de fuerza (con radio de 10 pies alrededor del lanzador únicamente, 2 cargas) o globo de invulnerabilidad (2 cargas). Sin gastar cargas otorga +2 de suerte a la CA y a las salvaciones, y funciona como un cuarto de báculo +2; gastando 1 carga como acción gratuita, causa daño doble (x3 en golpe crítico) durante 1 asalto. Puede usarse para un golpe de represalia rompiendo el bastón (acción estándar, sin prueba de Fuerza si es deliberado): libera todas las cargas restantes en un radio de 30 pies, infligiendo 8 puntos de daño por carga a quienes estén a 2 casillas o menos, 6 por carga a 3-4 casillas y 4 por carga a 5-6 casillas (salvación de Reflejos CD 17 reduce el daño a la mitad); quien lo rompe tiene 50% de probabilidad de viajar a otro plano, o de lo contrario muere en la explosión. Sin cargas sigue siendo un cuarto de báculo +2, pero ya no permite el golpe de represalia.",
  },
  {
    id: "staff-of-size-alteration",
    name: "Bastón de Alteración de Tamaño (Staff of Size Alteration)",
    source: "srd",
    category: "baculo",
    price: "29.000 po",
    casterLevel: 8,
    description:
      "Bastón con 50 cargas que permite lanzar agrandar persona (1 carga), reducir persona (1 carga), encoger objeto (1 carga), agrandar persona en masa (1 carga) o reducir persona en masa (1 carga).",
  },
  {
    id: "staff-of-swarming-insects",
    name: "Bastón de Insectos Enjambre (Staff of Swarming Insects)",
    source: "srd",
    category: "baculo",
    price: "24.750 po",
    casterLevel: 9,
    description:
      "Bastón con 50 cargas que permite lanzar convocar enjambre (1 carga) o plaga de insectos (3 cargas).",
  },
  {
    id: "staff-of-transmutation",
    name: "Bastón de Transmutación (Staff of Transmutation)",
    source: "srd",
    category: "baculo",
    price: "65.000 po",
    casterLevel: 13,
    description:
      "Bastón con 50 cargas que permite lanzar retirada expeditiva (1 carga), alterar propia forma (1 carga), parpadeo (1 carga), metamorfosear (2 cargas), metamorfosis nociva (2 cargas) o disgregar (3 cargas).",
  },
  {
    id: "staff-of-the-woodlands",
    name: "Bastón de los Bosques (Staff of the Woodlands)",
    source: "srd",
    category: "baculo",
    price: "101.250 po",
    casterLevel: 13,
    description:
      "Bastón con 50 cargas que permite lanzar encantar animal (1 carga), hablar con los animales (1 carga), piel de corteza (2 cargas), muro de espinas (3 cargas), convocar aliado natural VI (3 cargas) o animar plantas (4 cargas). Sin gastar cargas, funciona además como un cuarto de báculo +2 y permite lanzar pasar sin rastro a voluntad; ambas habilidades siguen funcionando aunque se agoten las cargas.",
  },
];
