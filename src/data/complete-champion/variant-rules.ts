import type { VariantRule } from "../../types";

export const COMPLETE_CHAMPION_VARIANT_RULES: VariantRule[] = [
  {
    id: "vr-cc-champion-of-the-wild",
    name: "Rasgo de clase alternativo: Campeón de lo Salvaje (explorador)",
    source: "complete-champion",
    category: "clase",
    description:
      "Rasgo de clase alternativo para el explorador. Renuncia por completo a su capacidad de lanzar conjuros divinos (no obtiene la característica \"Conjuros divinos\" de nivel 4 ni ninguna progresión de conjuros posterior), pero a cambio obtiene una dote de bonificación en los niveles 4, 8, 11 y 14, elegida entre Combate a Ciegas, Amaño en Combate, Ojos en la Nuca, Desarmar Mejorado, Enemigo Predilecto Mejorado, Finta Mejorada, Derribar Mejorado, o de la lista propia de su estilo de combate (arquería o combate con dos armas). Conserva el resto de rasgos de explorador sin cambios, incluido el compañero animal.",
    defaultEnabled: false,
  },
];
