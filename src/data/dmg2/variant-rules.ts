import type { VariantRule } from "../../types";

// Reglas variantes de "Dungeon Master's Guide II" (2005).
//
// DMG2 es principalmente un manual para el director de juego, pero incluye
// varios subsistemas opcionales que afectan directamente a la creación y
// evolución de personajes jugadores. Contenido redactado con palabras propias
// a partir del recuerdo del manual (no es una copia literal del texto
// original).
//
// Convenciones (iguales a las de `data/variantRules.ts`):
// - `id` con prefijo `vr-dmg2-`.
// - Solo se incluyen reglas de las que hay razonable certeza de que
//   pertenecen a este libro y no a Unearthed Arcana, Eberron Campaign
//   Setting, d20 Modern u otro manual distinto.
// - `exclusiveGroup` solo se usa cuando la regla sustituye por completo a un
//   sistema estándar (aunque ese sistema estándar no exista como entrada
//   explícita en la lista de reglas variantes).
export const DMG2_VARIANT_RULES: VariantRule[] = [
  {
    id: "vr-dmg2-action-points",
    name: "Puntos de Acción",
    source: "dmg2",
    category: "otro",
    description:
      "El personaje dispone de una reserva de Puntos de Acción, calculada como 5 + la mitad de su nivel de personaje (redondeando hacia abajo), que se recalcula (sin acumularse) cada vez que sube de nivel. Gastando un punto de acción se tira 1d6 y se suma el resultado a una tirada de d20 ya realizada (ataque, salvación o prueba de característica/habilidad) o a una tirada de daño.",
    defaultEnabled: false,
  },
  {
    id: "vr-dmg2-reputation",
    name: "Reputación",
    source: "dmg2",
    category: "otro",
    description:
      "El personaje tiene una puntuación de Reputación, inicialmente baja, que crece cuando sus hazañas se hacen conocidas (derrotar a enemigos peligrosos, completar misiones destacadas, actos públicos notables). La Reputación otorga un bonificador en pruebas de Diplomacia y Engañar frente a PNJ que hayan oído hablar del personaje, y puede provocar reacciones iniciales distintas (admiración, temor) al conocerlo.",
    defaultEnabled: false,
  },
  {
    id: "vr-dmg2-affiliation-score",
    name: "Puntuación de Afiliación",
    source: "dmg2",
    category: "otro",
    description:
      "Al pertenecer a una organización (orden militar, gremio, templo, sociedad secreta) el personaje lleva una Puntuación de Afiliación con esa organización, que sube al servir a sus intereses y baja al perjudicarlos. Con una puntuación suficientemente alta el personaje puede reclamar beneficios concretos definidos por esa organización, como préstamos de dinero, tropas de apoyo, información o conjuros de cortesía.",
    defaultEnabled: false,
  },
  {
    id: "vr-dmg2-backgrounds-contacts",
    name: "Trasfondos y Contactos",
    source: "dmg2",
    category: "otro",
    description:
      "Al crear el personaje se elige un trasfondo regional u organizativo (por ejemplo huérfano callejero, veterano de guerra o aprendiz de gremio) que otorga un pequeño beneficio mecánico, como un rango de clase adicional en una habilidad concreta. Junto al trasfondo se obtiene un Contacto, un PNJ vinculado a esa historia al que el personaje puede recurrir entre aventuras en busca de información, favores o ayuda.",
    defaultEnabled: false,
  },
  {
    id: "vr-dmg2-abstract-wealth",
    name: "Riqueza Abstracta",
    source: "dmg2",
    category: "otro",
    description:
      "En vez de anotar cada moneda y objeto poseído, el personaje tiene un Bono de Riqueza que resume sus posesiones líquidas. Para adquirir un objeto se realiza una prueba de Riqueza (d20 + bono) contra una CD basada en su coste, y las compras más caras reducen temporalmente ese bono; es una adaptación del sistema de riqueza abstracta de d20 Modern pensada para agilizar la contabilidad económica en campañas largas.",
    defaultEnabled: false,
    exclusiveGroup: "sistema_riqueza",
  },
  {
    id: "vr-dmg2-retraining",
    name: "Reentrenamiento",
    source: "dmg2",
    category: "clase",
    description:
      "Entre aventuras, si dispone de tiempo libre y de un maestro o instructor adecuado, un personaje puede reentrenar: sustituir una dote, redistribuir unos rangos de habilidad o incluso cambiar el último nivel de clase obtenido por otro distinto, pagando un coste en oro y tiempo de entrenamiento proporcional a lo que se sustituye. Permite corregir elecciones de construcción del personaje sin necesidad de justificarlas mediante la trama.",
    defaultEnabled: false,
  },
  {
    id: "vr-dmg2-beyond-good-evil",
    name: "Alineamiento: más allá del bien y el mal",
    source: "dmg2",
    category: "otro",
    description:
      "En vez de encajar al personaje en una de las nueve casillas clásicas de ley/caos y bien/mal, esta variante trata el alineamiento como dos ejes numéricos graduados (por ejemplo de -10 a +10), permitiendo matizar personajes casi neutrales o en proceso de cambiar de alineamiento. El comportamiento del personaje mueve su posición en ambos ejes de forma gradual en vez de provocar un cambio brusco de casilla.",
    defaultEnabled: false,
    exclusiveGroup: "sistema_alineamiento",
  },
];
