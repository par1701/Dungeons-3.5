import type { VariantRule } from "../types";
import { PHB2_VARIANT_RULES } from "./phb2/variant-rules";
import { DMG2_VARIANT_RULES } from "./dmg2/variant-rules";

// Reglas variantes disponibles para activar/desactivar al crear un personaje.
// Cada libro (Complete X, PHB2, DMG2) añade las suyas en su propio archivo
// src/data/<libro>/variant-rules.ts y se combinan aquí, siempre que su
// SourceBook correspondiente tenga implemented=true.
const CORE_VARIANT_RULES: VariantRule[] = [
  {
    id: "vr-ability-point-buy",
    name: "Generación de características: Compra por puntos",
    source: "srd",
    category: "puntuaciones_habilidad",
    description:
      "Repartir un total de puntos (por defecto 25, nivel de campaña estándar) entre las seis características usando el coste por punto.",
    defaultEnabled: true,
    exclusiveGroup: "generacion_habilidades",
  },
  {
    id: "vr-ability-standard-array",
    name: "Generación de características: Conjunto estándar",
    source: "srd",
    category: "puntuaciones_habilidad",
    description: "Asignar libremente los valores 15, 14, 13, 12, 10, 8 entre las seis características.",
    defaultEnabled: false,
    exclusiveGroup: "generacion_habilidades",
  },
  {
    id: "vr-ability-roll-4d6",
    name: "Generación de características: 4d6 (descartando el menor)",
    source: "srd",
    category: "puntuaciones_habilidad",
    description:
      "Tirar 4d6 y sumar los tres dados más altos, seis veces, asignando los resultados a las características.",
    defaultEnabled: false,
    exclusiveGroup: "generacion_habilidades",
  },
  {
    id: "vr-ability-roll-2d6-6",
    name: "Generación de características: 2d6+6",
    source: "srd",
    category: "puntuaciones_habilidad",
    description:
      "Tirar 2d6+6 seis veces para obtener personajes más poderosos desde el inicio.",
    defaultEnabled: false,
    exclusiveGroup: "generacion_habilidades",
  },
  {
    id: "vr-ability-manual",
    name: "Generación de características: Manual",
    source: "srd",
    category: "puntuaciones_habilidad",
    description: "Introducir manualmente los seis valores de característica.",
    defaultEnabled: false,
    exclusiveGroup: "generacion_habilidades",
  },
  {
    id: "vr-multiclass-xp-penalty",
    name: "Penalización de experiencia por multiclase",
    source: "srd",
    category: "clase",
    description:
      "Aplica la penalización de experiencia por combinar clases distintas a la clase favorecida cuando la diferencia de niveles supera 1.",
    defaultEnabled: true,
  },
  {
    id: "vr-hp-average",
    name: "Puntos de golpe promedio por nivel",
    source: "srd",
    category: "clase",
    description:
      "En vez de tirar el dado de golpe en cada nivel, usar el valor promedio (redondeado hacia arriba) para agilizar la creación de personajes.",
    defaultEnabled: false,
  },
  {
    id: "vr-max-hp-first-level",
    name: "Puntos de golpe máximos en primer nivel",
    source: "srd",
    category: "clase",
    description: "El personaje recibe el máximo de su dado de golpe en el primer nivel de su primera clase.",
    defaultEnabled: true,
  },
];

// PHB2 y DMG2 describen el mismo subsistema de Puntos de Acción; se agrupan
// como mutuamente excluyentes para que no se activen los dos a la vez.
const ACTION_POINTS_GROUP = "sistema_puntos_accion";

export const VARIANT_RULES: VariantRule[] = [
  ...CORE_VARIANT_RULES,
  ...PHB2_VARIANT_RULES.map((vr) =>
    vr.id === "vr-phb2-action-points" ? { ...vr, exclusiveGroup: ACTION_POINTS_GROUP } : vr,
  ),
  ...DMG2_VARIANT_RULES.map((vr) =>
    vr.id === "vr-dmg2-action-points" ? { ...vr, exclusiveGroup: ACTION_POINTS_GROUP } : vr,
  ),
];

export function getEnabledVariantIds(overrides?: Record<string, boolean>): string[] {
  return VARIANT_RULES.filter((vr) => overrides?.[vr.id] ?? vr.defaultEnabled).map((vr) => vr.id);
}
