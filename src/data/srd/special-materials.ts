import type { SpecialMaterial } from "../../types";

// Materiales especiales del SRD (contenido abierto). Solo se incluyen los
// cinco materiales núcleo con reglas de coste y efectos bien documentadas
// (Adamantina, Hierro Frío, Madera Oscura, Mithral, Plata Alquímica).
//
// Simplificaciones deliberadas, documentadas para no dar una falsa
// sensación de precisión:
// - El modelo de datos de esta app no distingue armas ligeras / a una mano /
//   a dos manos, así que el recargo de Plata Alquímica (que en el SRD varía
//   según esa categoría: +20 po ligera, +90 po a una mano, +180 po a dos
//   manos) se aproxima con la tarifa intermedia de "a una mano" (+90 po)
//   para toda arma cuerpo a cuerpo, y con +2 po (tarifa de munición) para
//   armas a distancia que disparan munición perdible. No se modela un
//   recargo distinto para munición individual.
// - La Madera Oscura solo tiene sentido en objetos de madera (arcos,
//   bastones, escudos de madera...); el motor no restringe qué arma puede
//   llevarla, así que queda como nota narrativa en `restrictions`.
const CP = 500; // po/libra de mithral
const DP = 10; // po/libra de madera oscura

export const SRD_SPECIAL_MATERIALS: SpecialMaterial[] = [
  {
    id: "mithral",
    name: "Mithral",
    source: "srd",
    appliesTo: ["armadura"],
    description:
      "Metal plateado, ligero como la tela pero resistente como el acero. Las armaduras y escudos de mithral son siempre de calidad magistral.",
    armorCostPerPound: CP,
    weightMultiplier: 0.5,
    armorCheckPenaltyReduction: 3,
    maxDexBonusIncrease: 2,
    arcaneSpellFailureReduction: 10,
    restrictions:
      "A efectos de velocidad y otras limitaciones por peso, una armadura de mithral se trata como si perteneciera a una categoría más ligera (la pesada como media, la media como ligera); la ligera sigue siendo ligera. Esta app no ajusta automáticamente la categoría de movimiento.",
  },
  {
    id: "adamantine",
    name: "Adamantina",
    source: "srd",
    appliesTo: ["arma", "armadura"],
    description:
      "Metal negro extremadamente duro. Las armas y armaduras de adamantina son siempre de calidad magistral (el coste de fabricación magistral ya está incluido en el recargo).",
    weaponCostBonus: 3000,
    weaponAttackBonus: 1,
    armorCostBonusByCategory: { ligera: 5000, media: 10000, pesada: 15000, escudo: 5000 },
    armorCheckPenaltyReduction: 1,
    damageReductionByArmorCategory: { ligera: 1, media: 2, pesada: 3, escudo: 0 },
    hardnessNote:
      "Un arma de adamantina ignora hasta 20 puntos de dureza de un objeto al intentar romperlo o desarmar/sunder.",
  },
  {
    id: "cold-iron",
    name: "Hierro Frío",
    source: "srd",
    appliesTo: ["arma"],
    description:
      "Hierro forjado a baja temperatura que atraviesa la reducción de daño de ciertos seres feéricos y demoníacos. Solo aplicable a armas con partes metálicas.",
    weaponCostMultiplier: 2,
    restrictions:
      "Solo objetos con partes metálicas pueden fabricarse en hierro frío. Si el objeto ya es mágico, encantarlo con hierro frío añade 2000 po adicionales al coste (no calculado automáticamente aquí).",
  },
  {
    id: "alchemical-silver",
    name: "Plata Alquímica",
    source: "srd",
    appliesTo: ["arma"],
    description:
      "Plata unida mediante alquimia a un arma de acero, capaz de atravesar la reducción de daño de licántropos y otras criaturas vulnerables a la plata. El portador sufre -1 a las tiradas de daño con un arma plateada (mínimo 1 punto).",
    weaponCostBonus: 90,
    restrictions:
      "No puede aplicarse a armas sin partes metálicas ni a objetos ya fabricados en otro material especial (adamantina, hierro frío, mithral). El recargo real del SRD depende del tamaño del arma (20 po ligera / 90 po a una mano / 180 po a dos manos); esta app usa la tarifa intermedia para toda arma cuerpo a cuerpo.",
  },
  {
    id: "darkwood",
    name: "Madera Oscura",
    source: "srd",
    appliesTo: ["arma", "armadura"],
    description:
      "Madera mágica, dura pero extremadamente ligera. Los objetos de madera oscura son siempre de calidad magistral.",
    weaponCostPerPound: DP,
    armorCostPerPound: DP,
    weightMultiplier: 0.5,
    armorCheckPenaltyReduction: 2,
    hardnessNote: "Dureza 5, 10 puntos de golpe por pulgada de grosor.",
    restrictions:
      "Solo aplicable a objetos de madera o mayoritariamente de madera (arcos, bastones, escudos de madera...). La reducción de penalizador de armadura de 2 puntos solo tiene efecto real en escudos de madera.",
  },
];

export const SRD_SPECIAL_MATERIAL_IDS = SRD_SPECIAL_MATERIALS.map((m) => m.id);
