import type { VariantRule } from "../../types";

export const COMPLETE_WARRIOR_VARIANT_RULES: VariantRule[] = [
  {
    id: "vr-cw-champion-of-the-wild",
    name: "Rasgo de clase alternativo: Campeón de lo Salvaje (explorador)",
    source: "complete-warrior",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el explorador. Renuncia por completo a su capacidad de lanzar conjuros divinos (no obtiene la característica \"Conjuros divinos\" de nivel 4 ni ninguna progresión de conjuros posterior), pero a cambio obtiene una dote de bonificación en los niveles 4, 8, 11 y 14, elegida entre Lucha a Ciegas, Pericia en Combate, Desarme Mejorado, Enemigo Predilecto Mejorado, Finta Mejorada, Derribo Mejorado, o de la lista propia de su estilo de combate (arquería o combate con dos armas) — elígela en \"Elecciones de clase\" una vez alcanzado cada nivel. Conserva el resto de rasgos de explorador sin cambios, incluido el compañero animal. Es incompatible con la variante de explorador sin conjuros de este mismo libro: ambas sustituyen el mismo rasgo de conjuros, así que solo puede activarse una de las dos.",
    defaultEnabled: false,
    exclusiveGroup: "explorador_sin_conjuros",
  },
  {
    id: "vr-cw-ranger-no-spells",
    name: "Variante de clase: Explorador sin conjuros",
    source: "complete-warrior",
    category: "clase",
    description:
      "Versión alternativa del explorador que renuncia por completo a sus conjuros divinos. A cambio obtiene Movimiento rápido (+3 m/+10 pies de velocidad sin armadura pesada ni carga pesada) en el nivel 6, Bendición de la naturaleza (+4 a Constitución, Destreza o Sabiduría durante 1 minuto por nivel, 1/día) en el nivel 11, Toque curativo (neutralizar veneno o eliminar enfermedad, 1/día, NL igual a la mitad del nivel de explorador) en el nivel 13, y Libertad de movimiento (sobre sí mismo, 1/día, NL igual a la mitad del nivel de explorador) en el nivel 16. Conserva el resto de rasgos de explorador sin cambios, incluido el compañero animal. Es incompatible con Campeón de lo Salvaje (Complete Champion): ambas sustituyen el mismo rasgo de conjuros, así que solo puede activarse una de las dos.",
    defaultEnabled: false,
    exclusiveGroup: "explorador_sin_conjuros",
  },
  {
    id: "vr-cw-paladin-no-spells",
    name: "Variante de clase: Paladín sin conjuros",
    source: "complete-warrior",
    category: "clase",
    description:
      "Versión alternativa del paladín que renuncia por completo a sus conjuros divinos. A cambio obtiene Arma bendita (armas cuerpo a cuerpo cuentan como de alineamiento bueno para superar la reducción de daño) en el nivel 6, Poder divino (+4 a Fuerza, Sabiduría o Carisma durante 1 minuto por nivel, 1/día) en el nivel 11, Atender a la montura (la Imposición de manos cura x5 puntos de golpe cuando se usa sobre la montura especial, y puede gastarse también para curar condiciones adversas de la montura) en el nivel 13, y Espada sagrada (arma sagrada, 1/día, NL igual a la mitad del nivel de paladín) en el nivel 16. Conserva el resto de rasgos de paladín sin cambios, incluida la montura especial.",
    defaultEnabled: false,
  },
];
