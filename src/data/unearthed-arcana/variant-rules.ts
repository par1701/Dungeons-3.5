import type { VariantRule } from "../../types";

export const UNEARTHED_ARCANA_VARIANT_RULES: VariantRule[] = [
  {
    id: "vr-ua-armor-as-dr",
    name: "Armadura como reducción de daño",
    source: "unearthed-arcana",
    category: "combate",
    description:
      "En vez de sumar por completo su bonificador a la Clase de Armadura, cada pieza de armadura y cada escudo convierte la mitad de ese bonificador (redondeando hacia abajo) en Reducción de Daño /-, y solo la otra mitad sigue sumando a la CA. Por ejemplo, un cuero tachonado (+3 CA) pasa a dar +2 CA y RD 1/-. El bonificador de mejora mágica de una armadura o escudo, si lo tiene, sigue sumando siempre a la CA y nunca a la RD. Esta RD se acumula con cualquier otra RD \"/-\" que ya tenga el personaje (como la de bárbaro), a diferencia de la mayoría de RD con tipo, que no se acumulan entre sí.",
    defaultEnabled: false,
  },
];
