import type { VariantRule } from "../../types";

export const COMPLETE_CHAMPION_VARIANT_RULES: VariantRule[] = [
  {
    id: "vr-cc-aligned-strike",
    name: "Rasgo de clase alternativo: Golpe alineado (guerrero)",
    source: "complete-champion",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el guerrero, que puede tomarse en vez de una de sus dotes de bonificación. Como acción gratuita, el guerrero puede alinear su arma con uno de los componentes de su propio alineamiento (por ejemplo, un guerrero caótico bueno puede elegir caótica o buena, pero no legal ni malvada), de forma que cuente con ese alineamiento a efectos de superar la reducción de daño. El efecto dura hasta que decide cambiarlo (también como acción gratuita), terminarlo, o hasta que deja de empuñar el arma.",
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
      "Rasgo de clase alternativo para el hechicero. En el nivel 5, en vez de aprender nuevos conjuros conocidos de nivel 1 y 2 ese nivel (y uno menos de conjuro conocido en cada nivel posterior), el hechicero elige un dominio de clérigo (compatible con su deidad, si venera a una) y obtiene su poder concedido, además de poder lanzar un conjuro de dominio de cada nivel de conjuro que pueda lanzar, una vez al día. Nota: esta app no modela un sistema de dominios para el clérigo, así que el dominio elegido y su poder concedido quedan a discreción del jugador/DJ.",
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
      "Rasgo de clase alternativo para el pícaro, que sustituye el Sentido de trampas (y sus mejoras en niveles superiores). El pícaro puede infligir daño de ataque furtivo a criaturas no muertas, algo que normalmente serían inmunes a él, pero solo con la mitad de sus dados de ataque furtivo (redondeando hacia abajo); sigue necesitando flanquear o que el objetivo esté desprevenido, como cualquier otro ataque furtivo.",
    defaultEnabled: false,
  },
  {
    id: "vr-cc-healing-hymn",
    name: "Rasgo de clase alternativo: Himno curativo (bardo)",
    source: "complete-champion",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el bardo, que sustituye Fascinar. Con al menos 3 rangos en una habilidad de Interpretar, los aliados que vean y oigan la actuación del bardo (mientras dure, y hasta 5 asaltos después) y lancen un conjuro de curación de la escuela de conjuración obtienen un bonificador sagrado (si el bardo es bueno o neutral) o profano (si es malvado) de +1 por cada rango de Interpretar del bardo al total de curación, limitado al bonificador máximo por nivel de lanzador que ese conjuro de curación pueda recibir normalmente. Si el bardo actúa durante 1 minuto completo antes de que sus aliados descansen, cada uno de ellos recupera puntos de golpe como si hubiera completado 24 horas de descanso (el doble de su propio nivel de personaje en puntos de golpe, no del nivel del bardo).",
    defaultEnabled: false,
  },
];
