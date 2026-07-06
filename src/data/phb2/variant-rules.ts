import type { VariantRule } from "../../types";

// Reglas variantes de Player's Handbook II (2006) relacionadas con la
// creación y progresión de personajes.
//
// Son solo metadatos descriptivos (id, nombre, descripción) que se muestran
// como opciones activables al crear un personaje; no implementan por sí
// mismas la lógica de motor de cálculo (p. ej. combinar dos progresiones de
// clase para un personaje gestalt). Esa lógica se añadirá más adelante en el
// motor de reglas cuando corresponda.
export const PHB2_VARIANT_RULES: VariantRule[] = [
  {
    id: "vr-phb2-gestalt",
    name: "Personajes gestalt",
    source: "phb2",
    category: "clase",
    description:
      "Cada personaje avanza simultáneamente en dos clases al mismo nivel de personaje, combinando lo mejor de ambas: se queda con el mejor bonificador base de ataque, la mejor progresión de cada salvación y los rasgos de clase de ambas progresiones nivel a nivel. Los puntos de habilidad, las dotes y los conjuros conocidos/preparados no se combinan y siguen las reglas normales de multiclase para cada lado del gestalt.",
    defaultEnabled: false,
  },
  {
    id: "vr-phb2-aging-effects",
    name: "Envejecimiento gradual",
    source: "phb2",
    category: "puntuaciones_habilidad",
    description:
      "En vez de aplicar de golpe los ajustes de característica del personaje al alcanzar cada categoría de edad (mediana edad, viejo, venerable), estos se reparten en incrementos más pequeños y progresivos a lo largo de los años, reflejando un declive físico y una mejora mental más graduales.",
    defaultEnabled: false,
  },
  {
    id: "vr-phb2-background-packages",
    name: "Paquetes de trasfondo",
    source: "phb2",
    category: "otro",
    description:
      "Al crear el personaje, se puede elegir un paquete de trasfondo temático (soldado, criminal, noble, artesano, etc.) que agrupa de forma rápida un pequeño conjunto de habilidades de clase recomendadas, un rasgo de trasfondo menor y equipo inicial acorde, en vez de construir el origen del personaje desde cero.",
    defaultEnabled: false,
  },
  {
    id: "vr-phb2-action-points",
    name: "Puntos de acción",
    source: "phb2",
    category: "otro",
    description:
      "Los personajes reciben una reserva de puntos de acción (renovada según su nivel de personaje) que pueden gastar para sumar un dado de bonificación a una tirada de ataque, prueba de habilidad, salvación o similar. Regla tomada de la ambientación de Eberron e incluida en PHB2 como opción para cualquier campaña.",
    defaultEnabled: false,
  },
  {
    id: "vr-phb2-flexible-languages",
    name: "Idiomas adicionales flexibles",
    source: "phb2",
    category: "otro",
    description:
      "En vez de limitar los idiomas de bonificación a la lista fija de la raza del personaje, este puede gastar puntos de habilidad en cualquier momento (no solo al crear el personaje) para aprender un idioma adicional, siempre que tenga acceso a alguien que se lo enseñe.",
    defaultEnabled: false,
  },
];
