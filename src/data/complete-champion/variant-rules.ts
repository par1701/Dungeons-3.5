import type { VariantRule } from "../../types";

export const COMPLETE_CHAMPION_VARIANT_RULES: VariantRule[] = [
  {
    id: "vr-cc-champion-of-the-wild",
    name: "Rasgo de clase alternativo: Campeón de lo Salvaje (explorador)",
    source: "complete-champion",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el explorador. Renuncia por completo a su capacidad de lanzar conjuros divinos (no obtiene la característica \"Conjuros divinos\" de nivel 4 ni ninguna progresión de conjuros posterior), pero a cambio obtiene una dote de bonificación en los niveles 4, 8, 11 y 14, elegida entre Lucha a Ciegas, Pericia en Combate, Desarme Mejorado, Enemigo Predilecto Mejorado, Finta Mejorada, Derribo Mejorado, o de la lista propia de su estilo de combate (arquería o combate con dos armas) — elígela en \"Elecciones de clase\" una vez alcanzado cada nivel. Conserva el resto de rasgos de explorador sin cambios, incluido el compañero animal. Es incompatible con la variante de explorador sin conjuros de Complete Warrior: ambas sustituyen el mismo rasgo de conjuros, así que solo puede activarse una de las dos.",
    defaultEnabled: false,
    exclusiveGroup: "explorador_sin_conjuros",
  },
  {
    id: "vr-cc-aligned-strike",
    name: "Rasgo de clase alternativo: Golpe alineado (guerrero)",
    source: "complete-champion",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el guerrero, que puede tomarse en vez de una de sus dotes de bonificación. Como acción gratuita, el guerrero puede alinear su arma como buena, malvada, legal o caótica, de forma que cuente con ese alineamiento a efectos de superar la reducción de daño.",
    defaultEnabled: false,
  },
  {
    id: "vr-cc-resolute",
    name: "Rasgo de clase alternativo: Resuelto (guerrero)",
    source: "complete-champion",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el guerrero, que puede tomarse en vez de una de sus dotes de bonificación. Como acción inmediata, el guerrero puede reducir a la mitad su bonificador de ataque hasta su siguiente turno y añadir esa misma cantidad como bonificador a una tirada de salvación de Voluntad.",
    defaultEnabled: false,
  },
  {
    id: "vr-cc-holy-strike",
    name: "Rasgo de clase alternativo: Golpe sagrado (monje)",
    source: "complete-champion",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el monje, que sustituye el Golpe de ki (mágico). Los ataques desarmados y armas de monje del personaje se consideran de alineamiento bueno a efectos de superar la reducción de daño, y causan +1d6 de daño adicional contra criaturas malvadas.",
    defaultEnabled: false,
  },
  {
    id: "vr-cc-pool-of-healing",
    name: "Rasgo de clase alternativo: Charca de curación (clérigo)",
    source: "complete-champion",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el clérigo. Renuncia a uno de sus espacios de conjuro de nivel 4 a cambio de una reserva diaria de curación igual a (nivel de clérigo + 1) × 5 puntos de golpe, que puede repartir mediante toques igual que la Imposición de manos del paladín.",
    defaultEnabled: false,
  },
  {
    id: "vr-cc-domain-access",
    name: "Rasgo de clase alternativo: Acceso a dominio (hechicero)",
    source: "complete-champion",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el hechicero. En el nivel 5, en vez de aprender nuevos conjuros conocidos de nivel 1 y 2 ese nivel (y uno menos de conjuro conocido en cada nivel posterior), el hechicero obtiene acceso a un dominio de clérigo, incluyendo su conjuro de dominio una vez al día por cada nivel de conjuro que pueda lanzar. Nota: esta app no modela un sistema de dominios para el clérigo, así que el dominio elegido queda a discreción del jugador/DJ.",
    defaultEnabled: false,
  },
  {
    id: "vr-cc-spontaneous-divination",
    name: "Rasgo de clase alternativo: Adivinación espontánea (mago)",
    source: "complete-champion",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el mago, que sustituye una de sus dotes de bonificación. El mago puede sacrificar un conjuro ya preparado para lanzar en su lugar, de forma espontánea, cualquier conjuro de la escuela de adivinación de nivel igual o inferior que tenga en su libro de conjuros.",
    defaultEnabled: false,
  },
  {
    id: "vr-cc-deaths-ruin",
    name: "Rasgo de clase alternativo: Ruina de la muerte (pícaro)",
    source: "complete-champion",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el pícaro, que sustituye el Sentido de trampas. El pícaro puede aplicar la mitad de sus dados de ataque furtivo (redondeando hacia abajo) contra no-muertos, sin necesidad de flanquear ni de ninguna otra condición que normalmente requeriría el ataque furtivo.",
    defaultEnabled: false,
  },
  {
    id: "vr-cc-healing-hymn",
    name: "Rasgo de clase alternativo: Himno curativo (bardo)",
    source: "complete-champion",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el bardo, que sustituye Fascinar. Con al menos 3 rangos en una habilidad de Interpretar, los aliados que vean y oigan la actuación del bardo y lancen un conjuro de curación de la escuela de conjuración obtienen un bonificador sagrado o profano de +1 por cada rango de Interpretar del bardo al total de curación. Si el bardo actúa durante 1 minuto completo antes de que sus aliados descansen, estos recuperan puntos de golpe como si hubieran descansado 24 horas completas (2 × nivel de bardo puntos de golpe).",
    defaultEnabled: false,
  },
];
