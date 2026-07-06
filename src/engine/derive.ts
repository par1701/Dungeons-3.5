import type {
  Ability,
  AbilityScores,
  Armor,
  Character,
  CharacterClassLevel,
  ClassDef,
  Race,
  SaveProgression,
  Weapon,
} from "../types";

const SKILL_KEY_SEPARATOR = "::";

/** Compone la clave usada en `CharacterSkillRanks` para una habilidad con especialización (Oficio, Profesión, Interpretar). */
export function makeSkillKey(skillId: string, specialization?: string): string {
  return specialization ? `${skillId}${SKILL_KEY_SEPARATOR}${specialization}` : skillId;
}

/** Descompone una clave de `CharacterSkillRanks` en el id de habilidad base y su especialización, si tiene. */
export function parseSkillKey(key: string): { skillId: string; specialization?: string } {
  const idx = key.indexOf(SKILL_KEY_SEPARATOR);
  if (idx === -1) return { skillId: key };
  return { skillId: key.slice(0, idx), specialization: key.slice(idx + SKILL_KEY_SEPARATOR.length) };
}

/**
 * Aplana `CharacterSkillRanks` a un mapa `idHabilidad -> rangos` usable para
 * comprobar prerrequisitos (ej. "Interpretar 9 rangos"). Para habilidades con
 * especialización se toma el máximo entre todas sus especialidades, que es
 * como el SRD interpreta ese tipo de requisito.
 */
export function flattenSkillRanksForPrereqs(skillRanks: Record<string, number>): Record<string, number> {
  const flattened: Record<string, number> = {};
  for (const [key, ranks] of Object.entries(skillRanks)) {
    const { skillId } = parseSkillKey(key);
    flattened[skillId] = Math.max(flattened[skillId] ?? 0, ranks);
  }
  return flattened;
}

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

// Tabla estándar de compra por puntos (25 puntos) del SRD 3.5.
export const POINT_BUY_COST: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 6,
  15: 8,
  16: 10,
  17: 13,
  18: 16,
};

export function pointBuyTotalCost(scores: AbilityScores): number {
  return (Object.values(scores) as number[]).reduce((sum, score) => {
    const clamped = Math.min(18, Math.max(8, score));
    return sum + (POINT_BUY_COST[clamped] ?? 0);
  }, 0);
}

export function applyRacialAdjustments(base: AbilityScores, race?: Race): AbilityScores {
  if (!race) return { ...base };
  const result: AbilityScores = { ...base };
  (Object.entries(race.abilityAdjustments) as [Ability, number][]).forEach(([ability, delta]) => {
    result[ability] = result[ability] + delta;
  });
  return result;
}

function classDefFor(classId: string, classes: ClassDef[]): ClassDef | undefined {
  return classes.find((c) => c.id === classId);
}

export function totalCharacterLevel(classLevels: CharacterClassLevel[]): number {
  return classLevels.reduce((sum, cl) => sum + cl.level, 0);
}

export function computeBabTotal(classLevels: CharacterClassLevel[], classes: ClassDef[]): number {
  return classLevels.reduce((sum, cl) => {
    const def = classDefFor(cl.classId, classes);
    if (!def) return sum;
    switch (def.babProgression) {
      case "completa":
        return sum + cl.level;
      case "tres_cuartos":
        return sum + Math.floor((cl.level * 3) / 4);
      case "media":
        return sum + Math.floor(cl.level / 2);
      default:
        return sum;
    }
  }, 0);
}

function baseSaveForClassLevel(level: number, progression: SaveProgression): number {
  return progression === "buena" ? Math.floor(level / 2) + 2 : Math.floor(level / 3);
}

export function computeBaseSave(
  save: "fort" | "ref" | "will",
  classLevels: CharacterClassLevel[],
  classes: ClassDef[],
): number {
  return classLevels.reduce((sum, cl) => {
    const def = classDefFor(cl.classId, classes);
    if (!def) return sum;
    return sum + baseSaveForClassLevel(cl.level, def.saves[save]);
  }, 0);
}

export interface SaveTotals {
  fort: number;
  ref: number;
  will: number;
}

export function computeSaveTotals(
  classLevels: CharacterClassLevel[],
  classes: ClassDef[],
  abilityScores: AbilityScores,
): SaveTotals {
  return {
    fort: computeBaseSave("fort", classLevels, classes) + abilityModifier(abilityScores.con),
    ref: computeBaseSave("ref", classLevels, classes) + abilityModifier(abilityScores.dex),
    will: computeBaseSave("will", classLevels, classes) + abilityModifier(abilityScores.wis),
  };
}

/** Puntos de habilidad totales disponibles a lo largo de la vida del personaje, sin repartir. */
export function computeTotalSkillPoints(
  classLevels: CharacterClassLevel[],
  classes: ClassDef[],
  intScore: number,
  isHuman: boolean,
): number {
  const intMod = abilityModifier(intScore);
  let firstClassHandled = false;
  let total = 0;
  classLevels.forEach((cl) => {
    const def = classDefFor(cl.classId, classes);
    if (!def) return;
    for (let lvl = 1; lvl <= cl.level; lvl++) {
      const perLevel = Math.max(1, def.skillPointsPerLevel + intMod + (isHuman ? 1 : 0));
      if (!firstClassHandled) {
        // el primer nivel del personaje multiplica por 4 los puntos de habilidad
        total += perLevel * 4;
        firstClassHandled = true;
      } else {
        total += perLevel;
      }
    }
  });
  return total;
}

export function computeMaxHp(
  classLevels: CharacterClassLevel[],
  classes: ClassDef[],
  hpRolls: number[],
  conScore: number,
  useAverage: boolean,
  maxFirstLevel: boolean,
): number {
  const conMod = abilityModifier(conScore);
  let hp = 0;
  let levelIndex = 0;
  classLevels.forEach((cl) => {
    const def = classDefFor(cl.classId, classes);
    if (!def) return;
    for (let lvl = 1; lvl <= cl.level; lvl++) {
      const isFirstOverall = levelIndex === 0;
      let roll: number;
      if (isFirstOverall && maxFirstLevel) {
        roll = def.hitDie;
      } else if (useAverage) {
        roll = Math.floor(def.hitDie / 2) + 1;
      } else {
        roll = hpRolls[levelIndex] ?? Math.floor(def.hitDie / 2) + 1;
      }
      hp += roll + conMod;
      levelIndex++;
    }
  });
  return Math.max(1, hp);
}

// Bonificador de competencia unificado (regla 3.5: siempre +2 desde nivel 1).
export function proficiencyBonusPlaceholder(): number {
  return 0;
}

const SIZE_MODIFIER: Record<string, number> = {
  Fino: 8,
  Diminuto: 4,
  Diminuta: 4,
  Pequeño: 1,
  Mediano: 0,
  Grande: -1,
  Enorme: -2,
  Descomunal: -4,
  Colosal: -8,
};

/** Modificador de tamaño (idéntico para Clase de Armadura y para tiradas de ataque). */
export function sizeModifier(size: string): number {
  return SIZE_MODIFIER[size] ?? 0;
}

export interface ArmorClassInputs {
  armorBonus: number;
  shieldBonus: number;
  dexScore: number;
  maxDexBonus: number | null;
  sizeModifier: number;
  naturalArmor: number;
  deflection: number;
  misc: number;
}

export function computeArmorClass(inputs: ArmorClassInputs): {
  total: number;
  touch: number;
  flatFooted: number;
} {
  const dexMod = abilityModifier(inputs.dexScore);
  const cappedDex = inputs.maxDexBonus === null ? dexMod : Math.min(dexMod, inputs.maxDexBonus);
  const total =
    10 +
    inputs.armorBonus +
    inputs.shieldBonus +
    cappedDex +
    inputs.sizeModifier +
    inputs.naturalArmor +
    inputs.deflection +
    inputs.misc;
  const touch = 10 + cappedDex + inputs.sizeModifier + inputs.deflection + inputs.misc;
  const flatFooted = total - (cappedDex > 0 ? cappedDex : 0);
  return { total, touch, flatFooted };
}

/** Bonus spells por nivel de conjuro según la puntuación de característica clave (tabla SRD). */
export function bonusSpellsForLevel(abilityMod: number, spellLevel: number): number {
  if (spellLevel <= 0) return 0;
  if (abilityMod < spellLevel) return 0;
  return Math.floor((abilityMod - spellLevel) / 4) + 1;
}

export function spellsPerDayForClassLevel(
  def: ClassDef,
  classLevel: number,
  abilityScores: AbilityScores,
): number[] | null {
  if (!def.spellcasting) return null;
  const table = def.spellcasting.spellsPerDay[classLevel];
  if (!table) return null;
  const abilityMod = abilityModifier(abilityScores[def.spellcasting.ability]);
  return table.map((base, spellLevel) => {
    if (base <= 0 && spellLevel > 0) return 0;
    return base + bonusSpellsForLevel(abilityMod, spellLevel);
  });
}

/**
 * Puntos de poder bonus por característica alta (Complete Psionic / XPH):
 * equivalen a la suma de los conjuros bonus "virtuales" de cada nivel de
 * poder, convertidos a puntos según su coste (2×nivel−1 puntos de poder).
 */
export function bonusPowerPoints(abilityMod: number, maxPowerLevel: number): number {
  let bonus = 0;
  for (let lvl = 1; lvl <= maxPowerLevel; lvl++) {
    bonus += bonusSpellsForLevel(abilityMod, lvl) * (2 * lvl - 1);
  }
  return bonus;
}

export function powerPointsForClassLevel(
  def: ClassDef,
  classLevel: number,
  abilityScores: AbilityScores,
): number | null {
  if (!def.manifesting) return null;
  const base = def.manifesting.powerPointsPerDay[classLevel];
  if (base === undefined) return null;
  const abilityMod = abilityModifier(abilityScores[def.manifesting.ability]);
  return base + bonusPowerPoints(abilityMod, def.manifesting.maxPowerLevel);
}

/** Coste en puntos de poder para manifestar un poder de un nivel dado (mínimo, sin aumentar). */
export function powerPointCost(powerLevel: number): number {
  return powerLevel <= 0 ? 0 : 2 * powerLevel - 1;
}

const CARRY_CAPACITY_STR: Record<number, [number, number, number]> = {
  1: [3, 6, 10],
  2: [6, 13, 20],
  3: [10, 20, 30],
  4: [13, 26, 40],
  5: [16, 33, 50],
  6: [20, 40, 60],
  7: [23, 46, 70],
  8: [26, 53, 80],
  9: [30, 60, 90],
  10: [33, 66, 100],
  11: [38, 76, 115],
  12: [43, 86, 130],
  13: [50, 100, 150],
  14: [58, 116, 175],
  15: [66, 133, 200],
  16: [76, 153, 230],
  17: [86, 173, 260],
  18: [100, 200, 300],
  19: [116, 233, 350],
  20: [133, 266, 400],
};

const SIZE_CARRY_MULTIPLIER: Record<string, number> = {
  Fino: 0.125,
  Diminuto: 0.25,
  Diminuta: 0.25,
  Pequeño: 0.75,
  Mediano: 1,
  Grande: 2,
  Enorme: 4,
  Descomunal: 8,
  Colosal: 16,
};

export function computeCarryingCapacity(
  strScore: number,
  size: string,
): { light: number; medium: number; heavy: number; maxLoad: number } {
  let str = strScore;
  let multiplier = 1;
  if (str > 20) {
    // Extrapolación SRD: cada +10 a Str por encima de 20 multiplica x4 la carga base de Str 20.
    const extra = str - 20;
    multiplier = Math.pow(4, Math.floor(extra / 10));
    str = 20 + (extra % 10);
  }
  str = Math.max(1, Math.min(20, str));
  const [light, medium, heavy] = CARRY_CAPACITY_STR[str] ?? CARRY_CAPACITY_STR[20];
  const sizeMult = SIZE_CARRY_MULTIPLIER[size] ?? 1;
  return {
    light: light * multiplier * sizeMult,
    medium: medium * multiplier * sizeMult,
    heavy: heavy * multiplier * sizeMult,
    maxLoad: heavy * multiplier * sizeMult,
  };
}

export function isHumanRace(race?: Race): boolean {
  return race?.id === "human";
}

export interface UnlockedClassFeature {
  classId: string;
  className: string;
  level: number;
  name: string;
  description: string;
}

/** Rasgos de clase ya obtenidos según el nivel actual de cada clase del personaje. */
export function getUnlockedClassFeatures(
  classLevels: CharacterClassLevel[],
  classes: ClassDef[],
): UnlockedClassFeature[] {
  return classLevels.flatMap((cl) => {
    const def = classes.find((c) => c.id === cl.classId);
    if (!def) return [];
    return def.features
      .filter((f) => f.level <= cl.level)
      .map((f) => ({ classId: def.id, className: def.name, level: f.level, name: f.name, description: f.description }));
  });
}

const FIGHTER_BONUS_FEAT_LEVELS = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

export function computeFeatSlots(classLevels: CharacterClassLevel[], isHuman: boolean): number {
  const level = totalCharacterLevel(classLevels);
  if (level <= 0) return 0;
  let slots = 1;
  for (let l = 3; l <= level; l += 3) slots++;
  if (isHuman) slots++;
  const fighterLevel = classLevels.find((cl) => cl.classId === "fighter")?.level ?? 0;
  slots += FIGHTER_BONUS_FEAT_LEVELS.filter((l) => l <= fighterLevel).length;
  return slots;
}

export function deriveCharacterSummary(
  character: Character,
  classes: ClassDef[],
  race: Race | undefined,
) {
  const finalAbilityScores = applyRacialAdjustments(character.abilityScores, race);
  const bab = computeBabTotal(character.classLevels, classes);
  const saves = computeSaveTotals(character.classLevels, classes, finalAbilityScores);
  const level = totalCharacterLevel(character.classLevels);
  const hp = computeMaxHp(
    character.classLevels,
    classes,
    character.hpRolls,
    finalAbilityScores.con,
    character.activeVariantRules.includes("vr-hp-average"),
    character.activeVariantRules.includes("vr-max-hp-first-level"),
  );
  const carrying = computeCarryingCapacity(finalAbilityScores.str, race?.size ?? "Mediano");
  return { finalAbilityScores, bab, saves, level, hp, carrying };
}

export interface EquippedArmorPieces {
  bodyArmor?: Armor;
  shield?: Armor;
}

export function computeCharacterArmorClass(
  finalScores: AbilityScores,
  size: string,
  equipped: EquippedArmorPieces,
): { total: number; touch: number; flatFooted: number; armorBonus: number; shieldBonus: number; maxDexBonus: number | null } {
  const armorBonus = equipped.bodyArmor?.armorBonus ?? 0;
  const shieldBonus = equipped.shield?.armorBonus ?? 0;
  const maxDexLimits = [equipped.bodyArmor?.maxDexBonus, equipped.shield?.maxDexBonus].filter(
    (v): v is number => v !== undefined && v !== null,
  );
  const maxDexBonus = maxDexLimits.length > 0 ? Math.min(...maxDexLimits) : null;
  const ac = computeArmorClass({
    armorBonus,
    shieldBonus,
    dexScore: finalScores.dex,
    maxDexBonus,
    sizeModifier: sizeModifier(size),
    naturalArmor: 0,
    deflection: 0,
    misc: 0,
  });
  return { ...ac, armorBonus, shieldBonus, maxDexBonus };
}

export interface WeaponAttackSummary {
  itemId: string;
  name: string;
  attackBonus: number;
  damage: string;
  critical: string;
  rangeIncrement?: number;
}

export function computeWeaponAttack(
  weapon: Weapon,
  bab: number,
  finalScores: AbilityScores,
  size: string,
): WeaponAttackSummary {
  const abilityMod = weapon.type === "distancia" ? abilityModifier(finalScores.dex) : abilityModifier(finalScores.str);
  const attackBonus = bab + abilityMod + sizeModifier(size);
  const damageMod = weapon.type === "distancia" ? 0 : abilityModifier(finalScores.str);
  const damage = damageMod === 0 ? weapon.damageMedium : `${weapon.damageMedium}${damageMod > 0 ? "+" : ""}${damageMod}`;
  return {
    itemId: weapon.id,
    name: weapon.name,
    attackBonus,
    damage,
    critical: weapon.critical,
    rangeIncrement: weapon.rangeIncrement,
  };
}
