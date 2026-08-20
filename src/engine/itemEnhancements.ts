import type { Armor, ArmorCategory, CharacterEquipmentItem, MagicItemProperty, SpecialMaterial, Weapon } from "../types";
import { findMagicItemProperty, findSpecialMaterial } from "../data";

/** Resuelve los ids de `magicPropertyIds` de un objeto equipado a sus `MagicItemProperty` completos. */
export function resolveProperties(item: CharacterEquipmentItem): MagicItemProperty[] {
  return (item.magicPropertyIds ?? [])
    .map((id) => findMagicItemProperty(id))
    .filter((p): p is MagicItemProperty => Boolean(p));
}

/** Resuelve el `specialMaterialId` de un objeto equipado a su `SpecialMaterial` completo, si tiene. */
export function resolveMaterial(item: CharacterEquipmentItem): SpecialMaterial | undefined {
  return item.specialMaterialId ? findSpecialMaterial(item.specialMaterialId) : undefined;
}

export interface WeaponEquipmentBonuses {
  attackBonus: number;
  damageBonus: number;
  doubledThreatRange: boolean;
  rangeIncrementMultiplier: number;
}

/**
 * Bonificadores de ataque/daño/crítico/alcance que aporta el bono de mejora
 * mágica, el material especial y las propiedades mágicas de un arma
 * equipada.
 *
 * El bonificador de competencia de la calidad magistral (+1 al ataque), el
 * bonificador de mejora mágica y el bonificador de ataque inherente de la
 * adamantina (+1, también de tipo "mejora" según el SRD) son todos del mismo
 * tipo de bonificador y por tanto NO se suman entre sí: solo se aplica el
 * mayor de los tres. La calidad magistral queda además implícita en
 * cualquier objeto con bono de mejora mágica (los objetos mágicos son
 * siempre magistrales), así que no hace falta comprobar `item.masterwork`
 * por separado en ese caso.
 */
export function computeWeaponEquipmentBonuses(item: CharacterEquipmentItem): WeaponEquipmentBonuses {
  const enhancement = item.enhancementBonus ?? 0;
  const material = resolveMaterial(item);
  const properties = resolveProperties(item);
  const masterworkAttackBonus = item.masterwork ? 1 : 0;
  const attackBonus = Math.max(enhancement, material?.weaponAttackBonus ?? 0, masterworkAttackBonus);
  return {
    attackBonus,
    damageBonus: enhancement,
    doubledThreatRange: properties.some((p) => p.id === "keen"),
    rangeIncrementMultiplier: properties.some((p) => p.id === "distance") ? 2 : 1,
  };
}

export interface CompositeBowEffect {
  damageBonus: number;
  attackPenalty: number;
}

/**
 * Efecto de la calificación de Fuerza de un arco compuesto (regla SRD): el
 * arco añade al daño el bono de Fuerza del portador hasta el límite de su
 * calificación (0 por defecto en un arco comprado sin especificar, +100 po
 * por cada punto de calificación adicional). Si el bono de Fuerza real del
 * portador es menor que la calificación del arco, sufre -2 a las tiradas de
 * ataque con él por no poder tensarlo del todo.
 */
export function computeCompositeBowEffect(weapon: Weapon, item: CharacterEquipmentItem, strMod: number): CompositeBowEffect {
  if (!weapon.isComposite) return { damageBonus: 0, attackPenalty: 0 };
  const rating = item.strengthRating ?? 0;
  return {
    damageBonus: Math.max(0, Math.min(strMod, rating)),
    attackPenalty: strMod < rating ? -2 : 0,
  };
}

export interface ArmorEquipmentBonuses {
  acBonus: number;
  armorCheckPenaltyReduction: number;
  maxDexBonusIncrease: number;
  arcaneSpellFailureReduction: number;
  damageReduction: number;
}

/** Bonificadores de CA/penalización/Destreza máxima/fallo arcano/RD que aporta el bono de mejora mágica y el material especial de una armadura o escudo equipado. */
export function computeArmorEquipmentBonuses(item: CharacterEquipmentItem, category: ArmorCategory): ArmorEquipmentBonuses {
  const enhancement = item.enhancementBonus ?? 0;
  const material = resolveMaterial(item);
  return {
    acBonus: enhancement,
    armorCheckPenaltyReduction: material?.armorCheckPenaltyReduction ?? 0,
    maxDexBonusIncrease: material?.maxDexBonusIncrease ?? 0,
    arcaneSpellFailureReduction: material?.arcaneSpellFailureReduction ?? 0,
    damageReduction: material?.damageReductionByArmorCategory?.[category] ?? 0,
  };
}

/** ¿El objeto tiene algún tipo de mejora especial (magistral, material especial o mágica)? */
export function isEnhancedItem(item: CharacterEquipmentItem): boolean {
  return Boolean(item.masterwork || item.specialMaterialId || (item.enhancementBonus ?? 0) > 0 || (item.magicPropertyIds?.length ?? 0) > 0);
}

/** Nombre para mostrar de un objeto equipado, incluyendo magistral/material/bono de mejora/propiedades ("Espada Larga +1 Flamígera de Adamantina"). */
export function computeItemDisplayName(baseName: string, item: CharacterEquipmentItem): string {
  const material = resolveMaterial(item);
  const properties = resolveProperties(item);
  const enhancement = item.enhancementBonus ?? 0;
  const parts: string[] = [baseName];
  if (enhancement > 0) parts.push(`+${enhancement}`);
  for (const p of properties) parts.push(p.name);
  if (!enhancement && properties.length === 0 && item.masterwork) parts.push("(magistral)");
  if (material) parts.push(`de ${material.name}`);
  if (item.strengthRating) parts.push(`(Fuerza +${item.strengthRating})`);
  return parts.join(" ");
}

/** Peso final de un objeto equipado, aplicando el multiplicador de peso del material especial, si tiene. */
export function computeItemWeight(baseWeight: number, item: CharacterEquipmentItem): number {
  const material = resolveMaterial(item);
  return material?.weightMultiplier ? baseWeight * material.weightMultiplier : baseWeight;
}

const MASTERWORK_WEAPON_COST = 300;
const MASTERWORK_ARMOR_COST = 150;

function magicBonusEquivalent(item: CharacterEquipmentItem): number {
  const enhancement = item.enhancementBonus ?? 0;
  const properties = resolveProperties(item);
  return enhancement + properties.reduce((sum, p) => sum + p.bonusEquivalent, 0);
}

/** Suma de los costes fijos (no equivalentes de bono) de las propiedades mágicas del objeto, p.ej. Ceremonial o Sombra. */
function flatPropertyCost(item: CharacterEquipmentItem): number {
  return resolveProperties(item).reduce((sum, p) => sum + (p.flatCost ?? 0), 0);
}

const COMPOSITE_BOW_COST_PER_STRENGTH_POINT = 100;

/** Precio de mercado final de un arma equipada, incluyendo magistral, material especial, calificación de Fuerza (arcos compuestos) y mejora/propiedades mágicas. */
export function computeWeaponMarketPrice(weapon: Weapon, item: CharacterEquipmentItem): number {
  const material = resolveMaterial(item);
  let base = weapon.cost;
  if (material?.weaponCostMultiplier) base *= material.weaponCostMultiplier;
  if (material?.weaponCostBonus) base += material.weaponCostBonus;
  if (material?.weaponCostPerPound) base += material.weaponCostPerPound * weapon.weight;
  if (weapon.isComposite) base += (item.strengthRating ?? 0) * COMPOSITE_BOW_COST_PER_STRENGTH_POINT;

  const totalBonus = magicBonusEquivalent(item);
  if (totalBonus > 0) {
    return base + MASTERWORK_WEAPON_COST + totalBonus * totalBonus * 2000 + flatPropertyCost(item);
  }
  return base + (item.masterwork ? MASTERWORK_WEAPON_COST : 0);
}

/** Precio de mercado final de una armadura/escudo equipado, incluyendo magistral, material especial y mejora/propiedades mágicas. */
export function computeArmorMarketPrice(armor: Armor, item: CharacterEquipmentItem): number {
  const material = resolveMaterial(item);
  let base = armor.cost;
  if (material?.armorCostBonusByCategory?.[armor.category]) base += material.armorCostBonusByCategory[armor.category]!;
  if (material?.armorCostPerPound) base += material.armorCostPerPound * armor.weight;

  const totalBonus = magicBonusEquivalent(item);
  if (totalBonus > 0) {
    return base + MASTERWORK_ARMOR_COST + totalBonus * totalBonus * 1000 + flatPropertyCost(item);
  }
  return base + (item.masterwork ? MASTERWORK_ARMOR_COST : 0);
}

/** Filtra qué propiedades mágicas de un catálogo son aplicables a un tipo de arma/armadura dados (para no ofrecer, p.ej., propiedades de armadura al configurar un arma). */
export function propertiesApplicableTo(properties: MagicItemProperty[], kind: "arma" | "armadura_o_escudo"): MagicItemProperty[] {
  return properties.filter((p) => p.appliesTo === kind);
}
