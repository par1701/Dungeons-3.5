import type { VariantRule } from "../../types";

export const COMPLETE_MAGE_VARIANT_RULES: VariantRule[] = [
  {
    id: "vr-cm-stalwart-sorcerer",
    name: "Rasgo de clase alternativo: Hechicero firme (hechicero)",
    source: "complete-mage",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el hechicero. Reduce en 1 (mínimo 1) el número máximo de conjuros conocidos por nivel de conjuro, a cambio de +2 puntos de golpe por cada nivel de hechicero. Esta app aplica automáticamente el bonificador de puntos de golpe al activar la regla; la reducción de conjuros conocidos debe respetarse manualmente al elegir conjuros en el asistente.",
    defaultEnabled: false,
  },
  {
    id: "vr-cm-arcane-hunter",
    name: "Rasgo de clase alternativo: Cazador arcano (explorador)",
    source: "complete-mage",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el explorador. En el nivel 1, en vez de elegir un tipo de enemigo predilecto normal, el explorador obtiene automáticamente como enemigo predilecto a los lanzadores de conjuros arcanos (cualquier criatura que lance conjuros arcanos o use invocaciones), con los bonificadores habituales del rasgo.",
    defaultEnabled: false,
  },
  {
    id: "vr-cm-armored-mage",
    name: "Rasgo de clase alternativo: Mago armado (guerrero)",
    source: "complete-mage",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el guerrero. Renuncia a la competencia con armadura media y pesada, pero puede lanzar conjuros arcanos de nivel igual o inferior a su nivel de guerrero + 1 mientras lleve armadura ligera sin sufrir la probabilidad de fallo de conjuro arcano por llevarla. Solo resulta útil si el personaje es multiclase con una clase de lanzador arcano.",
    defaultEnabled: false,
  },
  {
    id: "vr-cm-divine-counterspell",
    name: "Rasgo de clase alternativo: Contraconjuro divino (clérigo)",
    source: "complete-mage",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el clérigo, que sustituye Expulsar/Reprender no-muertos. El clérigo puede gastar uno de sus usos diarios de expulsar (normalmente 3 + su modificador de Carisma) para contrarrestar un conjuro, usando su nivel de clérigo como nivel de lanzador a efectos de la comprobación de contraconjuro.",
    defaultEnabled: false,
  },
  {
    id: "vr-cm-divine-magician",
    name: "Rasgo de clase alternativo: Mago divino (clérigo)",
    source: "complete-mage",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el clérigo. Renuncia al dominio de Conocimiento (o a uno de sus dos dominios, según la interpretación) a cambio de poder preparar conjuros de mago de las escuelas de abjuración, adivinación o nigromancia como si fueran conjuros de clérigo. Esta app no modela un sistema de dominios para el clérigo, así que su aplicación exacta queda a discreción del jugador/DJ.",
    defaultEnabled: false,
  },
  {
    id: "vr-cm-soulwarp-strike",
    name: "Rasgo de clase alternativo: Golpe de alma retorcida (monje)",
    source: "complete-mage",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el monje, que sustituye una de sus dotes de bonificación. Una vez al día por cada nivel de monje, un golpe desarmado con éxito puede nausear al objetivo (o dejarlo enfermo si supera una tirada de salvación) durante un breve periodo de tiempo.",
    defaultEnabled: false,
  },
  {
    id: "vr-cm-spellbreaker-song",
    name: "Rasgo de clase alternativo: Canción rompeconjuros (bardo)",
    source: "complete-mage",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el bardo, que sustituye Contracanción. Mientras el bardo interpreta esta actuación, los lanzadores de conjuros enemigos dentro del alcance sufren una probabilidad del 20% de fallo de conjuro al intentar lanzar cualquier conjuro.",
    defaultEnabled: false,
  },
];
