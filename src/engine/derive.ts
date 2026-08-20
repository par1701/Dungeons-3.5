import type {
  Ability,
  AbilityScores,
  Armor,
  Character,
  CharacterClassFeatureChoice,
  CharacterClassLevel,
  CharacterEquipmentItem,
  CharacterFeatChoice,
  ClassDef,
  ClassFeatureChoice,
  MagicItemProperty,
  Race,
  SaveProgression,
  SpecialMaterial,
  Weapon,
  WeaponType,
} from "../types";
import {
  computeArmorEquipmentBonuses,
  computeCompositeBowEffect,
  computeItemDisplayName,
  computeWeaponEquipmentBonuses,
  resolveMaterial,
  resolveProperties,
} from "./itemEnhancements";

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
  bonusSkillPoints = 0,
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
  return total + bonusSkillPoints;
}

export function computeMaxHp(
  classLevels: CharacterClassLevel[],
  classes: ClassDef[],
  hpRolls: number[],
  conScore: number,
  useAverage: boolean,
  maxFirstLevel: boolean,
  stalwartSorcerer = false,
  manualBonusHp = 0,
): number {
  const conMod = abilityModifier(conScore);
  let hp = 0;
  let levelIndex = 0;
  classLevels.forEach((cl) => {
    const def = classDefFor(cl.classId, classes);
    if (!def) return;
    // Complete Mage: rasgo alternativo "Hechicero Firme" (reduce el máximo de
    // conjuros conocidos en 1, mínimo 1, a cambio de +2 pg por nivel de hechicero).
    const bonusHp = stalwartSorcerer && cl.classId === "sorcerer" ? 2 : 0;
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
      hp += roll + conMod + bonusHp;
      levelIndex++;
    }
  });
  return Math.max(1, hp + manualBonusHp);
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

// Complete Champion: rasgo de clase alternativo "Campeón de lo Salvaje" del
// explorador, que cambia sus conjuros divinos por dotes de bonificación.
const CHAMPION_OF_THE_WILD_FEAT_LEVELS = [4, 8, 11, 14];

// Complete Warrior (2003): variantes de explorador y paladín sin conjuros,
// que cambian su lanzamiento de conjuros divinos por un pequeño número de
// dones fijos a niveles concretos, en vez de dotes de bonificación.
const CW_RANGER_NO_SPELLS_FEATURES: { level: number; name: string; description: string }[] = [
  {
    level: 6,
    name: "Movimiento rápido",
    description:
      "El explorador ha renunciado a sus conjuros divinos. A cambio, obtiene un bonificador de +3 m (+10 pies) a su velocidad base, siempre que no lleve armadura pesada ni carga pesada.",
  },
  {
    level: 11,
    name: "Bendición de la naturaleza",
    description:
      "Una vez al día, como acción estándar, el explorador obtiene un bonificador de +4 a Constitución, Destreza o Sabiduría (a elegir en el momento de usarlo), que dura 1 minuto por nivel de explorador.",
  },
];

const CW_PALADIN_NO_SPELLS_FEATURES: { level: number; name: string; description: string }[] = [
  {
    level: 6,
    name: "Arma bendita",
    description:
      "El paladín ha renunciado a sus conjuros divinos. A cambio, las armas cuerpo a cuerpo que empuña se consideran de alineamiento bueno a efectos de superar la reducción de daño.",
  },
  {
    level: 11,
    name: "Poder divino",
    description:
      "Una vez al día, como acción estándar, el paladín obtiene un bonificador de +4 a Fuerza, Sabiduría o Carisma (a elegir en el momento de usarlo), que dura 1 minuto por nivel de paladín.",
  },
  {
    level: 13,
    name: "Atender a la montura",
    description:
      "Cuando el paladín usa Imposición de manos para curar a su montura especial, cada punto de curación gastado restaura 5 puntos de golpe en vez de 1.",
  },
];

/** Rasgos de clase ya obtenidos según el nivel actual de cada clase del personaje. */
export function getUnlockedClassFeatures(
  classLevels: CharacterClassLevel[],
  classes: ClassDef[],
  activeVariantRules: string[] = [],
): UnlockedClassFeature[] {
  const championOfTheWild = activeVariantRules.includes("vr-cc-champion-of-the-wild");
  const cwRangerNoSpells = activeVariantRules.includes("vr-cw-ranger-no-spells");
  const cwPaladinNoSpells = activeVariantRules.includes("vr-cw-paladin-no-spells");
  return classLevels.flatMap((cl) => {
    const def = classes.find((c) => c.id === cl.classId);
    if (!def) return [];
    const isRangerSpellless = (championOfTheWild || cwRangerNoSpells) && def.id === "ranger";
    const features: UnlockedClassFeature[] = def.features
      .filter((f) => f.level <= cl.level)
      .filter((f) => !(isRangerSpellless && f.name === "Conjuros divinos"))
      .map((f) => ({ classId: def.id, className: def.name, level: f.level, name: f.name, description: f.description }));
    if (championOfTheWild && def.id === "ranger") {
      for (const level of CHAMPION_OF_THE_WILD_FEAT_LEVELS.filter((l) => l <= cl.level)) {
        features.push({
          classId: def.id,
          className: def.name,
          level,
          name: "Dote de bonificación (Campeón de lo Salvaje)",
          description:
            "El explorador ha renunciado a sus conjuros divinos para convertirse en un maestro de las armas. Obtiene una dote de bonificación elegida entre Combate a Ciegas, Amaño en Combate, Ojos en la Nuca, Desarmar Mejorado, Enemigo Predilecto Mejorado, Finta Mejorada, Derribar Mejorado, o de la lista propia de su estilo de combate.",
        });
      }
    }
    if (cwRangerNoSpells && def.id === "ranger") {
      for (const f of CW_RANGER_NO_SPELLS_FEATURES.filter((f) => f.level <= cl.level)) {
        features.push({ classId: def.id, className: def.name, level: f.level, name: f.name, description: f.description });
      }
    }
    if (cwPaladinNoSpells && def.id === "paladin") {
      for (const f of CW_PALADIN_NO_SPELLS_FEATURES.filter((f) => f.level <= cl.level)) {
        features.push({ classId: def.id, className: def.name, level: f.level, name: f.name, description: f.description });
      }
    }
    return features.sort((a, b) => a.level - b.level);
  });
}

export interface UnlockedClassFeatureChoice {
  classId: string;
  className: string;
  /** Nivel de esta clase en el que se desbloqueó esta instancia concreta (para elecciones repetibles). */
  level: number;
  choice: ClassFeatureChoice;
}

/** Instancias de elecciones de rasgo de clase (enemigo predilecto, dominios, dotes de lista restringida...) ya desbloqueadas según el nivel actual. */
export function getUnlockedClassFeatureChoices(
  classLevels: CharacterClassLevel[],
  classes: ClassDef[],
): UnlockedClassFeatureChoice[] {
  return classLevels.flatMap((cl) => {
    const def = classes.find((c) => c.id === cl.classId);
    if (!def?.choices) return [];
    return def.choices.flatMap((choice) =>
      choice.levels
        .filter((level) => level <= cl.level)
        .map((level) => ({ classId: def.id, className: def.name, level, choice })),
    );
  });
}

/** Valor guardado por el jugador para una instancia concreta de elección, si existe. */
export function findChoiceValue(
  choices: CharacterClassFeatureChoice[],
  classId: string,
  choiceId: string,
  level: number,
): string | undefined {
  return choices.find((c) => c.classId === classId && c.choiceId === choiceId && c.level === level)?.value;
}

export interface BonusFeatEntry {
  classId: string;
  className: string;
  level: number;
  featId: string;
  /** Nombre de la elección/rasgo que la concede, para mostrarla en la ficha. */
  sourceLabel: string;
}

/**
 * Todas las dotes de bonificación que el personaje ya tiene "gratis" gracias a
 * sus clases: tanto las automáticas (`bonusFeatGrants`, p.ej. Seguir Rastro)
 * como las elegidas de una lista restringida (`ClassFeatureChoice` de tipo
 * "dote_restringida", p.ej. artes marciales del monje). No ocupan hueco de
 * dote normal, así que se mantienen aparte de `character.feats`.
 */
export function getBonusFeatsFromClasses(
  classLevels: CharacterClassLevel[],
  classes: ClassDef[],
  classFeatureChoices: CharacterClassFeatureChoice[],
): BonusFeatEntry[] {
  const entries: BonusFeatEntry[] = [];
  classLevels.forEach((cl) => {
    const def = classes.find((c) => c.id === cl.classId);
    if (!def) return;
    for (const grant of def.bonusFeatGrants ?? []) {
      if (grant.level <= cl.level) {
        entries.push({ classId: def.id, className: def.name, level: grant.level, featId: grant.featId, sourceLabel: def.name });
      }
    }
    for (const choice of def.choices ?? []) {
      if (choice.kind !== "dote_restringida") continue;
      for (const level of choice.levels.filter((l) => l <= cl.level)) {
        const value = findChoiceValue(classFeatureChoices, def.id, choice.id, level);
        if (value) {
          entries.push({ classId: def.id, className: def.name, level, featId: value, sourceLabel: choice.label });
        }
      }
    }
  });
  return entries;
}

/**
 * Ids de todas las dotes que el personaje posee, ya sean elegidas normalmente
 * o concedidas gratis por sus clases (automáticas o de lista restringida).
 * Debe usarse para comprobar prerrequisitos de otras dotes o de clases de
 * prestigio, para que una dote de bonificación (p.ej. Disparo Rápido del
 * estilo de combate del explorador) cuente igual que si se hubiera elegido
 * como dote normal.
 */
export function getAllKnownFeatIds(
  feats: CharacterFeatChoice[],
  classLevels: CharacterClassLevel[],
  classes: ClassDef[],
  classFeatureChoices: CharacterClassFeatureChoice[],
): Set<string> {
  const ids = new Set(feats.map((f) => f.featId));
  for (const bf of getBonusFeatsFromClasses(classLevels, classes, classFeatureChoices)) {
    ids.add(bf.featId);
  }
  return ids;
}

const FIGHTER_BONUS_FEAT_LEVELS = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

export function computeFeatSlots(
  classLevels: CharacterClassLevel[],
  isHuman: boolean,
  championOfTheWildRanger = false,
  bonusFeatSlots = 0,
): number {
  const level = totalCharacterLevel(classLevels);
  if (level <= 0) return bonusFeatSlots;
  let slots = 1;
  for (let l = 3; l <= level; l += 3) slots++;
  if (isHuman) slots++;
  const fighterLevel = classLevels.find((cl) => cl.classId === "fighter")?.level ?? 0;
  slots += FIGHTER_BONUS_FEAT_LEVELS.filter((l) => l <= fighterLevel).length;
  if (championOfTheWildRanger) {
    const rangerLevel = classLevels.find((cl) => cl.classId === "ranger")?.level ?? 0;
    slots += CHAMPION_OF_THE_WILD_FEAT_LEVELS.filter((l) => l <= rangerLevel).length;
  }
  return slots + bonusFeatSlots;
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
    character.activeVariantRules.includes("vr-cm-stalwart-sorcerer"),
    character.bonusHp,
  );
  const carrying = computeCarryingCapacity(finalAbilityScores.str, race?.size ?? "Mediano");
  return { finalAbilityScores, bab, saves, level, hp, carrying };
}

export interface EquippedArmorPiece {
  armor: Armor;
  item?: CharacterEquipmentItem;
}

export interface EquippedArmorPieces {
  bodyArmor?: EquippedArmorPiece;
  shield?: EquippedArmorPiece;
}

/**
 * Regla variante de Unearthed Arcana "Armadura como reducción de daño":
 * la mitad del bonificador de armadura (redondeando hacia abajo) se convierte
 * en RD/-, y el resto sigue sumando a la CA.
 */
function splitArmorBonusForDamageReduction(bonus: number): { acBonus: number; damageReduction: number } {
  const damageReduction = Math.floor(bonus / 2);
  return { acBonus: bonus - damageReduction, damageReduction };
}

export function computeCharacterArmorClass(
  finalScores: AbilityScores,
  size: string,
  equipped: EquippedArmorPieces,
  armorAsDamageReduction = false,
  insightBonus = 0,
): {
  total: number;
  touch: number;
  flatFooted: number;
  armorBonus: number;
  shieldBonus: number;
  maxDexBonus: number | null;
  damageReduction: number;
  insightBonus: number;
} {
  const bodyEquip = equipped.bodyArmor?.item ? computeArmorEquipmentBonuses(equipped.bodyArmor.item, equipped.bodyArmor.armor.category) : undefined;
  const shieldEquip = equipped.shield?.item ? computeArmorEquipmentBonuses(equipped.shield.item, equipped.shield.armor.category) : undefined;
  const rawArmorBonus = equipped.bodyArmor?.armor.armorBonus ?? 0;
  const rawShieldBonus = equipped.shield?.armor.armorBonus ?? 0;
  let armorBonus = rawArmorBonus;
  let shieldBonus = rawShieldBonus;
  let damageReduction = (bodyEquip?.damageReduction ?? 0) + (shieldEquip?.damageReduction ?? 0);
  if (armorAsDamageReduction) {
    const bodySplit = splitArmorBonusForDamageReduction(rawArmorBonus);
    const shieldSplit = splitArmorBonusForDamageReduction(rawShieldBonus);
    armorBonus = bodySplit.acBonus;
    shieldBonus = shieldSplit.acBonus;
    damageReduction += bodySplit.damageReduction + shieldSplit.damageReduction;
  }
  armorBonus += bodyEquip?.acBonus ?? 0;
  shieldBonus += shieldEquip?.acBonus ?? 0;
  const maxDexLimits = [
    equipped.bodyArmor?.armor.maxDexBonus === null || equipped.bodyArmor?.armor.maxDexBonus === undefined
      ? undefined
      : equipped.bodyArmor.armor.maxDexBonus + (bodyEquip?.maxDexBonusIncrease ?? 0),
    equipped.shield?.armor.maxDexBonus === null || equipped.shield?.armor.maxDexBonus === undefined
      ? undefined
      : equipped.shield.armor.maxDexBonus + (shieldEquip?.maxDexBonusIncrease ?? 0),
  ].filter((v): v is number => v !== undefined);
  const maxDexBonus = maxDexLimits.length > 0 ? Math.min(...maxDexLimits) : null;
  const ac = computeArmorClass({
    armorBonus,
    shieldBonus,
    dexScore: finalScores.dex,
    maxDexBonus,
    sizeModifier: sizeModifier(size),
    naturalArmor: 0,
    deflection: 0,
    misc: insightBonus,
  });
  return { ...ac, armorBonus, shieldBonus, maxDexBonus, damageReduction, insightBonus };
}

export interface WeaponAttackSummary {
  itemId: string;
  name: string;
  type: WeaponType;
  attackBonus: number;
  damage: string;
  critical: string;
  rangeIncrement?: number;
  /** Bonificadores de ataque de cada ataque iterativo en un ataque completo (p.ej. [+12, +7, +2]). */
  fullAttackSequence: number[];
  /** Propiedades mágicas especiales resueltas del arma equipada (Flamígera, Hiriente...), para mostrar su efecto en la hoja. */
  magicProperties: MagicItemProperty[];
  /** Material especial resuelto del arma equipada, si tiene. */
  specialMaterial?: SpecialMaterial;
}

/**
 * Secuencia de ataques de un ataque completo según el bonificador base de
 * ataque (regla SRD: un ataque adicional por cada +5 de BBA completo, cada
 * uno con -5 acumulativo respecto al anterior). El número de ataques depende
 * del BBA puro; los valores de cada ataque parten del bonificador de ataque
 * ya modificado del arma (con característica, tamaño, etc.).
 */
export function computeFullAttackSequence(weaponAttackBonus: number, bab: number): number[] {
  const count = bab > 0 ? Math.floor((bab - 1) / 5) + 1 : 1;
  return Array.from({ length: count }, (_, i) => weaponAttackBonus - 5 * i);
}

const DIACRITIC_MARKS_RE = /[̀-ͯ]/g;

/** Normaliza un texto para comparaciones tolerantes a mayúsculas/acentos (nombres de arma, tipos de daño elegidos en dotes). */
function normalizeForMatch(text: string): string {
  return text.trim().toLowerCase().normalize("NFD").replace(DIACRITIC_MARKS_RE, "");
}

const DAMAGE_TYPE_LABEL_TO_CODE: Record<string, string> = {
  contundente: "C",
  perforante: "P",
  cortante: "E",
};

/** Amplía el rango de amenaza de una notación de crítico ("x2", "19-20/x2") al doble de números que ya lo amenazan (Crítico Mejorado). */
function doubleCriticalThreatRange(critical: string): string {
  const rangeMatch = critical.match(/^(\d+)-20\/x(\d+)$/);
  const simpleMatch = critical.match(/^x(\d+)$/);
  let low: number;
  let mult: string;
  if (rangeMatch) {
    low = parseInt(rangeMatch[1], 10);
    mult = rangeMatch[2];
  } else if (simpleMatch) {
    low = 20;
    mult = simpleMatch[1];
  } else {
    return critical;
  }
  const count = 20 - low + 1;
  const newLow = Math.max(1, 20 - count * 2 + 1);
  return newLow >= 20 ? `x${mult}` : `${newLow}-20/x${mult}`;
}

export interface WeaponFeatBonuses {
  attackBonus: number;
  damageBonus: number;
  doubledThreatRange: boolean;
  extraRangeIncrementFeet: number;
}

/**
 * Bonificadores que las dotes de arma concreta (Soltura, Especialización,
 * Crítico Mejorado, Maestría con Armas de PHB2) aportan a un arma dada,
 * comparando el nombre del arma (o el tipo de daño elegido) con el texto
 * libre guardado en `selection` de cada instancia de dote del personaje.
 */
export function getWeaponFeatBonuses(weapon: Weapon, feats: CharacterFeatChoice[]): WeaponFeatBonuses {
  const weaponNameNorm = normalizeForMatch(weapon.name);
  const weaponDamageCodes = weapon.damageType.split(/[^a-zA-Z]+/).filter(Boolean);
  let attackBonus = 0;
  let damageBonus = 0;
  let doubledThreatRange = false;
  let extraRangeIncrementFeet = 0;

  for (const f of feats) {
    const selection = f.selection ? normalizeForMatch(f.selection) : "";
    if (selection && selection === weaponNameNorm) {
      if (f.featId === "weapon-focus" || f.featId === "greater-weapon-focus") attackBonus += 1;
      if (f.featId === "weapon-specialization" || f.featId === "greater-weapon-specialization") damageBonus += 2;
      if (f.featId === "improved-critical") doubledThreatRange = true;
    }
    if (selection && (f.featId === "phb2-melee-weapon-mastery" || f.featId === "phb2-ranged-weapon-mastery")) {
      const code = DAMAGE_TYPE_LABEL_TO_CODE[selection];
      if (code && weaponDamageCodes.includes(code)) {
        attackBonus += 2;
        damageBonus += 2;
        if (f.featId === "phb2-ranged-weapon-mastery") extraRangeIncrementFeet += 20;
      }
    }
  }
  return { attackBonus, damageBonus, doubledThreatRange, extraRangeIncrementFeet };
}

export function computeWeaponAttack(
  weapon: Weapon,
  bab: number,
  finalScores: AbilityScores,
  size: string,
  feats: CharacterFeatChoice[] = [],
  equipmentItem?: CharacterEquipmentItem,
): WeaponAttackSummary {
  const abilityMod = weapon.type === "distancia" ? abilityModifier(finalScores.dex) : abilityModifier(finalScores.str);
  const featBonuses = getWeaponFeatBonuses(weapon, feats);
  const equipBonuses = equipmentItem
    ? computeWeaponEquipmentBonuses(equipmentItem)
    : { attackBonus: 0, damageBonus: 0, doubledThreatRange: false, rangeIncrementMultiplier: 1 };
  const compositeBow = equipmentItem
    ? computeCompositeBowEffect(weapon, equipmentItem, abilityModifier(finalScores.str))
    : { damageBonus: 0, attackPenalty: 0 };
  const attackBonus =
    bab + abilityMod + sizeModifier(size) + featBonuses.attackBonus + equipBonuses.attackBonus + compositeBow.attackPenalty;
  const damageMod =
    (weapon.type === "distancia" ? 0 : abilityModifier(finalScores.str)) +
    featBonuses.damageBonus +
    equipBonuses.damageBonus +
    compositeBow.damageBonus;
  const damage = damageMod === 0 ? weapon.damageMedium : `${weapon.damageMedium}${damageMod > 0 ? "+" : ""}${damageMod}`;
  const critical =
    featBonuses.doubledThreatRange || equipBonuses.doubledThreatRange ? doubleCriticalThreatRange(weapon.critical) : weapon.critical;
  const rangeIncrement = weapon.rangeIncrement
    ? (weapon.rangeIncrement + featBonuses.extraRangeIncrementFeet) * equipBonuses.rangeIncrementMultiplier
    : weapon.rangeIncrement;
  const name = equipmentItem ? computeItemDisplayName(weapon.name, equipmentItem) : weapon.name;
  return {
    itemId: weapon.id,
    name,
    type: weapon.type,
    attackBonus,
    damage,
    critical,
    rangeIncrement,
    fullAttackSequence: computeFullAttackSequence(attackBonus, bab),
    magicProperties: equipmentItem ? resolveProperties(equipmentItem) : [],
    specialMaterial: equipmentItem ? resolveMaterial(equipmentItem) : undefined,
  };
}

/**
 * Bonificador de ataque a distancia según el incremento de alcance (regla
 * SRD: -2 acumulativo por cada incremento completo más allá del primero,
 * hasta un máximo de 10 incrementos). Si el personaje tiene Disparo a
 * Bocajarro, se suma +1 al ataque y al daño dentro de los 9 m (30 pies), con
 * independencia del incremento de alcance propio del arma: dentro de un
 * mismo incremento el penalizador por distancia es el mismo a cualquier
 * distancia, pero Disparo a Bocajarro solo se aplica hasta 30 pies exactos,
 * así que cuando el alcance del arma supera esa distancia (arcos, hondas,
 * ballestas...) se añade una fila propia para ese caso, ya que de lo
 * contrario nunca aparecería reflejado en la tabla de incrementos.
 */
export function computeRangeIncrementAttackBonuses(
  baseAttackBonus: number,
  rangeIncrement: number,
  hasPointBlankShot = false,
): { increment: number; distanceFeet: number; attackBonus: number; damageBonus: number }[] {
  const results: { increment: number; distanceFeet: number; attackBonus: number; damageBonus: number }[] = [];
  if (hasPointBlankShot && rangeIncrement > 30) {
    results.push({ increment: 0, distanceFeet: 30, attackBonus: baseAttackBonus + 1, damageBonus: 1 });
  }
  for (let increment = 1; increment <= 10; increment++) {
    const distanceFeet = rangeIncrement * increment;
    const pointBlankBonus = hasPointBlankShot && distanceFeet <= 30 ? 1 : 0;
    results.push({
      increment,
      distanceFeet,
      attackBonus: baseAttackBonus - 2 * (increment - 1) + pointBlankBonus,
      damageBonus: pointBlankBonus,
    });
  }
  return results;
}

// ---------------------------------------------------------------------------
// Opciones de ataque activables por dotes o estilos de combate: rutinas de
// ataque alternativas de mecánica fija (no las que reparten un bonificador
// variable entre ataque y otra cosa, como Ataque Poderoso o Amaño en
// Combate, que dependen de cuánto decida ceder el jugador cada turno).
// ---------------------------------------------------------------------------

/**
 * Disparo Rápido (Rapid Shot): un ataque a distancia adicional a la mayor
 * bonificación, y -2 a todos los ataques a distancia de ese turno.
 */
export function computeRapidShotSequence(weaponAttackBonus: number, bab: number): number[] {
  const iterative = computeFullAttackSequence(weaponAttackBonus, bab).map((b) => b - 2);
  return [weaponAttackBonus - 2, ...iterative];
}

/** Daño desarmado del monje por nivel de monje (tamaño Mediano). */
const MONK_UNARMED_DAMAGE: Record<number, string> = {
  1: "1d6",
  4: "1d8",
  8: "1d10",
  12: "2d6",
  16: "2d8",
  20: "2d10",
};

export function monkUnarmedDamage(monkLevel: number): string {
  if (monkLevel <= 0) return "1d3";
  const thresholds = [20, 16, 12, 8, 4, 1];
  const level = thresholds.find((t) => monkLevel >= t) ?? 1;
  return MONK_UNARMED_DAMAGE[level];
}

/**
 * Ráfaga de Golpes (Flurry of Blows) del monje: un ataque desarmado
 * adicional a la mayor bonificación; penalizador de -2 a todos los ataques
 * de ese turno en niveles 1-4, -1 en niveles 5-8, sin penalizador desde el 9.
 */
export function computeFlurryOfBlowsSequence(unarmedAttackBonus: number, monkLevel: number, bab: number): number[] {
  const penalty = monkLevel >= 9 ? 0 : monkLevel >= 5 ? 1 : 2;
  const iterative = computeFullAttackSequence(unarmedAttackBonus, bab).map((b) => b - penalty);
  return [unarmedAttackBonus - penalty, ...iterative];
}

export interface TwoWeaponFightingOption {
  primary: number[];
  offHand: number[];
}

/**
 * Combate con dos armas: penalizadores según la Tabla de combate con dos
 * armas del SRD (mano principal/mano secundaria), y ataques adicionales de
 * mano secundaria por Combate con Dos Armas Mejorado/Superior.
 */
export function computeTwoWeaponFightingOption(
  primaryBaseBonus: number,
  offHandBaseBonus: number,
  bab: number,
  offHandLight: boolean,
  hasTwoWeaponFightingFeat: boolean,
  hasImproved: boolean,
  hasGreater: boolean,
): TwoWeaponFightingOption {
  let primaryPenalty: number;
  let offHandPenalty: number;
  if (hasTwoWeaponFightingFeat && offHandLight) {
    primaryPenalty = 2;
    offHandPenalty = 2;
  } else if (hasTwoWeaponFightingFeat) {
    primaryPenalty = 4;
    offHandPenalty = 4;
  } else if (offHandLight) {
    primaryPenalty = 4;
    offHandPenalty = 8;
  } else {
    primaryPenalty = 6;
    offHandPenalty = 10;
  }
  const primary = computeFullAttackSequence(primaryBaseBonus - primaryPenalty, bab);
  const offHandCount = 1 + (hasImproved ? 1 : 0) + (hasGreater ? 1 : 0);
  const offHand = Array.from({ length: offHandCount }, (_, i) => offHandBaseBonus - offHandPenalty - 5 * i);
  return { primary, offHand };
}
