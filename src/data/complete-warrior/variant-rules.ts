import type { VariantRule } from "../../types";

export const COMPLETE_WARRIOR_VARIANT_RULES: VariantRule[] = [
  {
    id: "vr-cw-ranger-no-spells",
    name: "Variante de clase: Explorador sin conjuros",
    source: "complete-warrior",
    category: "clase",
    description:
      "Versión alternativa del explorador que renuncia por completo a sus conjuros divinos. A cambio obtiene Movimiento rápido (+3 m/+10 pies de velocidad sin armadura pesada ni carga pesada) en el nivel 6, y Bendición de la naturaleza (+4 a Constitución, Destreza o Sabiduría durante 1 minuto por nivel, 1/día) en el nivel 11. Conserva el resto de rasgos de explorador sin cambios, incluido el compañero animal. Es incompatible con Campeón de lo Salvaje (Complete Champion): ambas sustituyen el mismo rasgo de conjuros, así que solo puede activarse una de las dos.",
    defaultEnabled: false,
    exclusiveGroup: "explorador_sin_conjuros",
  },
  {
    id: "vr-cw-paladin-no-spells",
    name: "Variante de clase: Paladín sin conjuros",
    source: "complete-warrior",
    category: "clase",
    description:
      "Versión alternativa del paladín que renuncia por completo a sus conjuros divinos. A cambio obtiene Arma bendita (armas cuerpo a cuerpo cuentan como de alineamiento bueno para superar la reducción de daño) en el nivel 6, Poder divino (+4 a Fuerza, Sabiduría o Carisma durante 1 minuto por nivel, 1/día) en el nivel 11, y Atender a la montura (la Imposición de manos cura x5 puntos de golpe cuando se usa sobre la montura especial) en el nivel 13. Conserva el resto de rasgos de paladín sin cambios, incluida la montura especial.",
    defaultEnabled: false,
  },
];
