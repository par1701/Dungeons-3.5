import type { MagicItemProperty } from "../../types";

// Propiedades mágicas especiales de armas y armaduras/escudos del SRD
// (contenido abierto). Cada una lleva su bonificador de mejora equivalente,
// usado para calcular el precio total del objeto mágico:
//   Arma: (bono de mejora + Σ equivalentes)² × 2000 po + coste base + magistral
//   Armadura/escudo: (bono de mejora + Σ equivalentes)² × 1000 po + coste base + magistral
// (regla SRD: el objeto debe tener al menos +1 de bono de mejora para poder
// llevar una propiedad especial, y el bono total no puede superar +10).
//
// Ceremonial/Glamered, Sombra/Shadow, Pasos Silenciosos/Silent Moves y
// Resbaladiza/Slick usan un coste fijo en po (`flatCost`) en vez del sistema
// de bono equivalente habitual, verificado por separado (2700/3750/3750/3750
// po respectivamente). Se sigue omitiendo "Captura de Flechas" (Arrow
// Catching) por no tener su precio exacto confirmado.

export const SRD_WEAPON_PROPERTIES: MagicItemProperty[] = [
  { id: "flaming", name: "Flamígera", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "El arma arde en llamas sin consumirse, infligiendo 1d6 puntos de daño de fuego adicional con cada golpe." },
  { id: "frost", name: "Helada", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "El arma queda cubierta de escarcha, infligiendo 1d6 puntos de daño de frío adicional con cada golpe." },
  { id: "shock", name: "Descarga", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "El arma chisporrotea con electricidad, infligiendo 1d6 puntos de daño eléctrico adicional con cada golpe." },
  { id: "ghost-touch-weapon", name: "Toque Fantasmal", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "El arma puede golpear con normalidad a criaturas etéreas e incorpóreas." },
  { id: "keen", name: "Filo Superior", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "Duplica el margen de amenaza crítico natural de un arma cortante o perforante (no se acumula con otros efectos que dupliquen el margen de amenaza)." },
  { id: "merciful", name: "Misericordiosa", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "Inflige 1d6 puntos de daño adicional, pero todo el daño del arma (incluido este) se convierte en no letal; puede desactivarse a voluntad." },
  { id: "thundering", name: "Atronadora", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "Al golpear, produce un estruendo (salvación de Fortaleza o quedar aturdido 1 asalto y sordo 1d4d10 minutos)." },
  { id: "vicious", name: "Cruel", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "Inflige 2d6 puntos de daño adicional al objetivo, pero también 1d6 puntos de daño al propio portador con cada golpe." },
  { id: "throwing", name: "Arrojadiza", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "Un arma cuerpo a cuerpo gana un incremento de alcance de 3 m (10 pies) y puede lanzarse con normalidad." },
  { id: "returning", name: "de Retorno", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "Un arma arrojadiza vuelve a la mano del lanzador justo después de resolver el ataque." },
  { id: "distance", name: "de Distancia", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "Duplica el incremento de alcance de un arma a distancia." },
  { id: "seeking", name: "Certera", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "Un arma a distancia ignora la probabilidad de fallo por ocultación (no total) del objetivo." },
  { id: "spell-storing", name: "Almacenaconjuros", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "Puede almacenar un único conjuro de nivel 1 a 3 (lanzado sobre el arma por su portador), que se libera automáticamente en el siguiente golpe con éxito si el portador lo desea." },
  { id: "mighty-cleaving", name: "de Hendedura Portentosa", source: "srd", appliesTo: "arma", bonusEquivalent: 1, minEnhancementBonus: 1, description: "El portador con la dote Hendedura puede realizar un intento de hendedura adicional por asalto (solo uno adicional)." },
  { id: "bane", name: "Perdición", source: "srd", appliesTo: "arma", bonusEquivalent: 2, minEnhancementBonus: 1, description: "Elige un tipo y subtipo de criatura al crearla; +2 de mejora adicional y 2d6 de daño adicional contra ese tipo de criatura." },
  { id: "flaming-burst", name: "de Llamarada", source: "srd", appliesTo: "arma", bonusEquivalent: 2, minEnhancementBonus: 1, description: "Como Flamígera, y además inflige 1d10 puntos de daño de fuego adicional al confirmar un golpe crítico." },
  { id: "icy-burst", name: "de Ventisca", source: "srd", appliesTo: "arma", bonusEquivalent: 2, minEnhancementBonus: 1, description: "Como Helada, y además inflige 1d10 puntos de daño de frío adicional al confirmar un golpe crítico." },
  { id: "shocking-burst", name: "de Tormenta", source: "srd", appliesTo: "arma", bonusEquivalent: 2, minEnhancementBonus: 1, description: "Como Descarga, y además inflige 1d10 puntos de daño eléctrico adicional al confirmar un golpe crítico." },
  { id: "wounding", name: "Hiriente", source: "srd", appliesTo: "arma", bonusEquivalent: 2, minEnhancementBonus: 1, description: "Cada golpe con éxito inflige además 1 punto de daño de Constitución por desangramiento." },
  { id: "disruption", name: "de Disrupción", source: "srd", appliesTo: "arma", bonusEquivalent: 2, minEnhancementBonus: 1, description: "Un golpe crítico contra un no muerto lo destruye si falla una salvación de Voluntad (CD 14)." },
  { id: "holy", name: "Sagrada", source: "srd", appliesTo: "arma", bonusEquivalent: 2, minEnhancementBonus: 1, description: "El arma se considera de alineamiento Bueno a efectos de reducción de daño e inflige 2d6 de daño adicional contra criaturas Malas." },
  { id: "unholy", name: "Profana", source: "srd", appliesTo: "arma", bonusEquivalent: 2, minEnhancementBonus: 1, description: "El arma se considera de alineamiento Malo a efectos de reducción de daño e inflige 2d6 de daño adicional contra criaturas Buenas." },
  { id: "axiomatic", name: "Axiomática", source: "srd", appliesTo: "arma", bonusEquivalent: 2, minEnhancementBonus: 1, description: "El arma se considera de alineamiento Legal a efectos de reducción de daño e inflige 2d6 de daño adicional contra criaturas Caóticas." },
  { id: "anarchic", name: "Anárquica", source: "srd", appliesTo: "arma", bonusEquivalent: 2, minEnhancementBonus: 1, description: "El arma se considera de alineamiento Caótico a efectos de reducción de daño e inflige 2d6 de daño adicional contra criaturas Legales." },
  { id: "speed", name: "de Velocidad", source: "srd", appliesTo: "arma", bonusEquivalent: 3, minEnhancementBonus: 1, description: "El portador gana un ataque cuerpo a cuerpo adicional a su bonificador de ataque más alto cada vez que realiza una acción de ataque completo (como Prisa, pero solo para ataques con esta arma)." },
  { id: "brilliant-energy", name: "de Energía Brillante", source: "srd", appliesTo: "arma", bonusEquivalent: 4, minEnhancementBonus: 1, description: "El arma pasa a través de la armadura no viva, ignorando su bonificador de CA (aunque no la esquiva ni el Destreza); no afecta a criaturas no vivas ni sin armadura." },
  { id: "dancing", name: "Danzarina", source: "srd", appliesTo: "arma", bonusEquivalent: 4, minEnhancementBonus: 1, description: "Una vez por asalto como acción libre, el arma puede soltarse y luchar sola durante 4 asaltos, volando y atacando por su cuenta con el bono de mejora total del arma." },
  { id: "vorpal", name: "Vorpal", source: "srd", appliesTo: "arma", bonusEquivalent: 5, minEnhancementBonus: 1, description: "Solo armas cortantes. Al confirmar un golpe crítico, decapita al objetivo (si tiene cabeza y no es inmune), matándolo al instante." },
];

export const SRD_ARMOR_PROPERTIES: MagicItemProperty[] = [
  { id: "light-fortification", name: "Fortificación Ligera", source: "srd", appliesTo: "armadura_o_escudo", bonusEquivalent: 1, minEnhancementBonus: 1, description: "25% de probabilidad de anular un golpe crítico o ataque furtivo contra el portador, resolviéndolo como daño normal." },
  { id: "bashing", name: "de Golpe", source: "srd", appliesTo: "armadura_o_escudo", bonusEquivalent: 1, minEnhancementBonus: 1, description: "Solo escudos. El golpe con el escudo se trata como si fuera magistral y aplica el bono de mejora del escudo también al ataque y al daño del golpe con escudo.", restrictions: "Solo aplicable a escudos." },
  { id: "arrow-deflection", name: "de Repulsión de Proyectiles", source: "srd", appliesTo: "armadura_o_escudo", bonusEquivalent: 2, minEnhancementBonus: 1, description: "Solo escudos. Una vez por asalto, el escudo anula por completo un ataque a distancia con arma o proyectil que impactaría al portador, de forma similar a la dote Desviar Flechas.", restrictions: "Solo aplicable a escudos." },
  { id: "moderate-fortification", name: "Fortificación Moderada", source: "srd", appliesTo: "armadura_o_escudo", bonusEquivalent: 3, minEnhancementBonus: 1, description: "75% de probabilidad de anular un golpe crítico o ataque furtivo contra el portador, resolviéndolo como daño normal." },
  { id: "ghost-touch-armor", name: "Toque Fantasmal", source: "srd", appliesTo: "armadura_o_escudo", bonusEquivalent: 3, minEnhancementBonus: 1, description: "El portador puede ser tocado con normalidad por criaturas incorpóreas, y la armadura protege incluso mientras el portador está parcialmente en el Plano Etéreo." },
  { id: "heavy-fortification", name: "Fortificación Pesada", source: "srd", appliesTo: "armadura_o_escudo", bonusEquivalent: 5, minEnhancementBonus: 1, description: "100% de probabilidad de anular un golpe crítico o ataque furtivo contra el portador, resolviéndolo como daño normal." },
  { id: "glamered", name: "Ceremonial", source: "srd", appliesTo: "armadura_o_escudo", bonusEquivalent: 0, flatCost: 2700, minEnhancementBonus: 1, description: "Bajo una orden mental, la armadura cambia su aspecto al de una prenda de ropa normal (conservando su peso y propiedades), y puede revertirse igual de rápido." },
  { id: "shadow", name: "de Sombra", source: "srd", appliesTo: "armadura_o_escudo", bonusEquivalent: 0, flatCost: 3750, minEnhancementBonus: 1, description: "Armadura de un negro absoluto que otorga +5 de bonificador de competencia a las pruebas de Esconderse." },
  { id: "silent-moves", name: "Pasos Silenciosos", source: "srd", appliesTo: "armadura_o_escudo", bonusEquivalent: 0, flatCost: 3750, minEnhancementBonus: 1, description: "Armadura bien engrasada y construida para no hacer ruido, otorgando +5 de bonificador de competencia a las pruebas de Moverse Sigilosamente." },
  { id: "slick", name: "Resbaladiza", source: "srd", appliesTo: "armadura_o_escudo", bonusEquivalent: 0, flatCost: 3750, minEnhancementBonus: 1, description: "Armadura cubierta de un aceite resbaladizo permanente que otorga +5 de bonificador de competencia a las pruebas de Escapismo." },
];

export const SRD_MAGIC_ITEM_PROPERTIES: MagicItemProperty[] = [...SRD_WEAPON_PROPERTIES, ...SRD_ARMOR_PROPERTIES];
export const SRD_MAGIC_ITEM_PROPERTY_IDS = SRD_MAGIC_ITEM_PROPERTIES.map((p) => p.id);
