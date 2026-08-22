import type { ClassDef, ClassFeature } from "../../types";

// Clases de prestigio de Complete Champion (2007).
//
// Solo se incluye aquí Puño del Bosque, la única clase de prestigio de
// Complete Champion verificada frente a la ficha de referencia
// (docs/prestige/fist-of-the-forest.md). Otras clases que se habían añadido
// anteriormente a este archivo (Contemplativo, Oráculo Divino, Hospitalario,
// Exorcista Sagrado, Puño Sagrado) no pertenecen en realidad a Complete
// Champion — no aparecen en su lista real de 9 clases de prestigio (Fist of
// the Forest, Forest Reeve, Holt Warden, Mythic Exemplar, Ordained Champion,
// Paragnostic Apostle, Paragnostic Initiate, Sanctified One, Squire of
// Legend) — y sus mecánicas tampoco coincidían con ninguna ficha de
// referencia disponible, así que se retiraron en vez de mantener contenido
// sin verificar. Oráculo Divino y Exorcista Sagrado ya existen, correctamente
// filiados, en src/data/complete-divine/classes.ts.

// ---------------------------------------------------------------------------
// Puño del Bosque (Fist of the Forest)
// ---------------------------------------------------------------------------

const FIST_OF_THE_FOREST_FEATURES: ClassFeature[] = [
  {
    level: 1,
    name: "Bonificador a la CA",
    description:
      "Mientras vaya sin armadura y sin escudo, suma su modificador de Constitución a la Clase de Armadura, como el rasgo homónimo del monje.",
  },
  {
    level: 1,
    name: "Movimiento rápido",
    description:
      "Su velocidad terrestre base aumenta por encima de lo normal para su raza, como el rasgo del bárbaro; se acumula con otros bonificadores a la velocidad que ya posea.",
  },
  {
    level: 1,
    name: "Trance feral (1/día)",
    description:
      "Una vez al día puede entrar en un trance de combate: gana +4 a Destreza y +2 al daño con golpes desarmados, además de un ataque de mordisco por asalto (1d6 + modificador de Fuerza). Dura 3 + modificador de Constitución asaltos y causa fatiga al terminar.",
  },
  {
    level: 1,
    name: "Vida primitiva",
    description:
      "Debe dormir al aire libre y obtener su comida por caza, recolección, mendicidad o robo. Comprar comida o dormir bajo techo más de tres veces al mes desactiva todos sus rasgos de clase hasta que cumpla 30 días consecutivos de vida primitiva o haga penitencia.",
  },
  {
    level: 1,
    name: "Daño desarmado (1d8)",
    description: "Sus golpes desarmados infligen 1d8 de daño.",
  },
  {
    level: 2,
    name: "Evasión sobrenatural",
    description:
      "No puede quedar desprevenido (flat-footed). Si ya poseía esta capacidad, obtiene la versión mejorada.",
  },
  {
    level: 2,
    name: "Golpe indómito",
    description:
      "Sus golpes desarmados se tratan como armas mágicas a efectos de superar la reducción de daño. Si ya son mágicos, se tratan además como de toque fantasmal (ghost touch) menor.",
  },
  {
    level: 3,
    name: "Trance feral (2/día)",
    description: "Puede entrar en trance feral hasta dos veces al día.",
  },
  {
    level: 3,
    name: "Olfato",
    description: "Obtiene la capacidad extraordinaria de olfato (Scent), como muchos animales.",
  },
  {
    level: 3,
    name: "Daño desarmado (1d10)",
    description: "El daño de sus golpes desarmados aumenta a 1d10.",
  },
];

export const CC_CLASSES: ClassDef[] = [
  {
    id: "cc-fist-of-the-forest",
    name: "Puño del Bosque (Fist of the Forest)",
    source: "complete-champion",
    description:
      "Un guerrero que ha adoptado el estilo de vida y el ferocidad de los animales del bosque, luchando desarmado con la aprobación de los Guardianes de lo Verde.",
    hitDie: 10,
    skillPointsPerLevel: 2,
    classSkills: [
      "balance",
      "climb",
      "handle-animal",
      "intimidate",
      "jump",
      "listen",
      "move-silently",
      "sense-motive",
      "spot",
      "survival",
      "swim",
    ],
    babProgression: "completa",
    saves: { fort: "buena", ref: "buena", will: "mala" },
    weaponProficiencies: [],
    armorProficiencies: [],
    features: FIST_OF_THE_FOREST_FEATURES,
    maxLevel: 3,
    isPrestige: true,
    prerequisites: [
      {
        description: "Bonificador base de ataque +4",
        check: (ctx) => ctx.babTotal >= 4,
      },
      {
        description: "Gran Fortaleza",
        check: (ctx) => ctx.featIds.has("great-fortitude"),
      },
      {
        description: "Impacto sin Arma Mejorado",
        check: (ctx) => ctx.featIds.has("improved-unarmed-strike"),
      },
      {
        description: "Ataque Poderoso",
        check: (ctx) => ctx.featIds.has("power-attack"),
      },
      {
        description: "Manejar Animales: 4 rangos",
        check: (ctx) => (ctx.skillRanks["handle-animal"] ?? 0) >= 4,
      },
      {
        description: "Supervivencia: 4 rangos",
        check: (ctx) => (ctx.skillRanks["survival"] ?? 0) >= 4,
      },
      {
        description:
          "Debe ganar la aprobación de los líderes de una banda de Guardianes de lo Verde como \"puño del bosque\" y adoptar el estilo de vida de un animal",
      },
    ],
  },
];
