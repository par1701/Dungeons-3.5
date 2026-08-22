import type {
  Ability,
  AbilityScores,
  Armor,
  ArmorCategory,
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
  wondrousItemBonus,
} from "./itemEnhancements";
import { findWondrousItem } from "../data";

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

export interface EquipmentPassiveBonuses {
  /** Bonificador de desviación a la CA (p.ej. Anillo de Protección). */
  deflection: number;
  /** Bonificador de armadura natural (p.ej. Amuleto de Armadura Natural). */
  naturalArmor: number;
  /** Bonificador de resistencia a las tiradas de salvación (p.ej. Capa de Resistencia). */
  saveResistance: number;
  /** Bonificadores de mejora a características por objetos maravillosos equipados. */
  abilityBonuses: Partial<Record<Ability, number>>;
}

/**
 * Bonificadores "pasivos" que aportan los objetos maravillosos equipados
 * (itemKind "maravilloso"): CA de desviación/armadura natural, resistencia a
 * salvaciones, y mejora de características. Como todos son bonificadores de
 * tipo mejora/desviación/armadura natural/resistencia, dos objetos que
 * afecten al mismo apartado no se suman entre sí: solo se aplica el mayor
 * (esto además es coherente con las ranuras de cuerpo, que ya impiden llevar
 * dos objetos que compitan por la misma ranura salvo los anillos).
 */
export function computeEquipmentPassiveBonuses(equipment: CharacterEquipmentItem[]): EquipmentPassiveBonuses {
  let deflection = 0;
  let naturalArmor = 0;
  let saveResistance = 0;
  const abilityBonuses: Partial<Record<Ability, number>> = {};
  for (const item of equipment) {
    if (!item.equipped || item.itemKind !== "maravilloso") continue;
    const def = findWondrousItem(item.itemId);
    if (!def) continue;
    const bonus = wondrousItemBonus(def, item);
    if (def.category === "ca_desviacion") deflection = Math.max(deflection, bonus);
    else if (def.category === "ca_natural") naturalArmor = Math.max(naturalArmor, bonus);
    else if (def.category === "salvaciones_resistencia") saveResistance = Math.max(saveResistance, bonus);
    else if (def.category === "caracteristica" && def.ability) {
      abilityBonuses[def.ability] = Math.max(abilityBonuses[def.ability] ?? 0, bonus);
    }
  }
  return { deflection, naturalArmor, saveResistance, abilityBonuses };
}

/** Puntuaciones de característica finales: base + ajustes raciales + mejora de objetos maravillosos equipados. */
export function computeFinalAbilityScores(
  base: AbilityScores,
  race: Race | undefined,
  equipment: CharacterEquipmentItem[] = [],
): AbilityScores {
  const racial = applyRacialAdjustments(base, race);
  const { abilityBonuses } = computeEquipmentPassiveBonuses(equipment);
  const result: AbilityScores = { ...racial };
  (Object.entries(abilityBonuses) as [Ability, number][]).forEach(([ability, bonus]) => {
    result[ability] = result[ability] + bonus;
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

const PALADIN_DIVINE_GRACE_LEVEL = 2;

/** Gracia Divina (paladín, nivel 2): bono de Carisma (si es positivo) a las tres salvaciones. */
export function getDivineGraceBonus(classLevels: CharacterClassLevel[], abilityScores: AbilityScores): number {
  const level = classLevels.find((cl) => cl.classId === "paladin")?.level ?? 0;
  if (level < PALADIN_DIVINE_GRACE_LEVEL) return 0;
  return Math.max(0, abilityModifier(abilityScores.cha));
}

const SCOUT_BATTLE_BONUS_LEVEL = 2;

/** Bono de Batalla (batidor, Complete Adventurer, nivel 2): bono de competencia a Fortaleza igual a la mitad del nivel de batidor (mínimo +1). */
export function getScoutBattleBonus(classLevels: CharacterClassLevel[]): number {
  const level = classLevels.find((cl) => cl.classId === "cad-scout")?.level ?? 0;
  if (level < SCOUT_BATTLE_BONUS_LEVEL) return 0;
  return Math.max(1, Math.floor(level / 2));
}

const IMPROVED_INITIATIVE_BONUS = 4;
const BLOODED_INITIATIVE_BONUS = 2;

/**
 * Bonificador total a las tiradas de iniciativa: Iniciativa Mejorada (+4),
 * Curtido en Sangre (+2, Complete Scoundrel) y el Bono de Batalla del
 * batidor (competencia, igual a la mitad de su nivel de batidor, mínimo
 * +1). `knownFeatIds` debe incluir tanto las dotes elegidas normalmente
 * como las concedidas gratis por clase (`getAllKnownFeatIds`), ya que
 * Iniciativa Mejorada puede obtenerse como dote de bonificación restringida
 * (p.ej. derviche, sabueso de sangre).
 */
export function computeInitiativeBonus(knownFeatIds: Set<string>, classLevels: CharacterClassLevel[]): number {
  let bonus = 0;
  if (knownFeatIds.has("improved-initiative")) bonus += IMPROVED_INITIATIVE_BONUS;
  if (knownFeatIds.has("cs-blooded")) bonus += BLOODED_INITIATIVE_BONUS;
  bonus += getScoutBattleBonus(classLevels);
  return bonus;
}

export function computeSaveTotals(
  classLevels: CharacterClassLevel[],
  classes: ClassDef[],
  abilityScores: AbilityScores,
  resistanceBonus = 0,
): SaveTotals {
  const divineGrace = getDivineGraceBonus(classLevels, abilityScores);
  const battleBonus = getScoutBattleBonus(classLevels);
  return {
    fort:
      computeBaseSave("fort", classLevels, classes) +
      abilityModifier(abilityScores.con) +
      resistanceBonus +
      divineGrace +
      battleBonus,
    ref: computeBaseSave("ref", classLevels, classes) + abilityModifier(abilityScores.dex) + resistanceBonus + divineGrace,
    will:
      computeBaseSave("will", classLevels, classes) +
      abilityModifier(abilityScores.wis) +
      resistanceBonus +
      divineGrace,
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
  /** Bonificador de esquiva estándar (se pierde igual que la Destreza cuando el personaje está desprevenido). */
  dodge?: number;
}

export function computeArmorClass(inputs: ArmorClassInputs): {
  total: number;
  touch: number;
  flatFooted: number;
} {
  const dexMod = abilityModifier(inputs.dexScore);
  const cappedDex = inputs.maxDexBonus === null ? dexMod : Math.min(dexMod, inputs.maxDexBonus);
  const dodge = inputs.dodge ?? 0;
  const total =
    10 +
    inputs.armorBonus +
    inputs.shieldBonus +
    cappedDex +
    inputs.sizeModifier +
    inputs.naturalArmor +
    inputs.deflection +
    inputs.misc +
    dodge;
  const touch = 10 + cappedDex + inputs.sizeModifier + inputs.deflection + inputs.misc + dodge;
  const flatFooted = total - (cappedDex > 0 ? cappedDex : 0) - dodge;
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
 * Nivel de lanzador de un personaje en una clase concreta: nivel de esa
 * clase menos el nivel en que empieza a lanzar conjuros, más 1 (p.ej. un
 * paladín de nivel 7, que empieza a lanzar en nivel 4, tiene nivel de
 * lanzador 4). Devuelve 0 si la clase no lanza conjuros o el personaje aún
 * no ha alcanzado su nivel inicial de lanzamiento.
 */
export function getCasterLevelForClass(classId: string, classLevels: CharacterClassLevel[], classes: ClassDef[]): number {
  const cl = classLevels.find((c) => c.classId === classId);
  const def = classDefFor(classId, classes);
  if (!cl || !def?.spellcasting) return 0;
  const startLevel = def.spellcasting.startLevel;
  if (cl.level < startLevel) return 0;
  return cl.level - startLevel + 1;
}

const SPANISH_UNIT_PLURALS: Record<string, [string, string]> = {
  pie: ["pie", "pies"],
  pies: ["pie", "pies"],
  milla: ["milla", "millas"],
  millas: ["milla", "millas"],
  asalto: ["asalto", "asaltos"],
  asaltos: ["asalto", "asaltos"],
  minuto: ["minuto", "minutos"],
  minutos: ["minuto", "minutos"],
  hora: ["hora", "horas"],
  horas: ["hora", "horas"],
  día: ["día", "días"],
  días: ["día", "días"],
};

function formatUnit(amount: number, unit: string): string {
  const [singular, plural] = SPANISH_UNIT_PLURALS[unit.toLowerCase()] ?? [unit, unit];
  const rounded = Math.round(amount * 10) / 10;
  const label = rounded === 1 ? singular : plural;
  return `${rounded % 1 === 0 ? rounded : rounded.toFixed(1)} ${label}`;
}

function parseSpanishNumber(raw: string): number {
  return parseFloat(raw.replace(",", "."));
}

const RANGE_SCALING_RE =
  /(?:(\d+(?:[.,]\d+)?)\s*(pies|millas?)\s*\+\s*)?(\d+(?:[.,]\d+)?)\s*(pies|millas?)\s*\/\s*(?:(\d+)\s*)?nivele?s?/i;

/**
 * Resuelve el alcance de un conjuro (p.ej. "Media (100 pies + 10 pies/nivel)")
 * al valor total en pies/millas para un nivel de lanzador concreto. Devuelve
 * null si el alcance no depende del nivel (nada que resolver: la ficha ya
 * muestra el valor final).
 */
export function resolveSpellRange(range: string, casterLevel: number): string | null {
  const m = RANGE_SCALING_RE.exec(range);
  if (!m) return null;
  const [, flatRaw, flatUnit, scaleRaw, scaleUnit, divisorRaw] = m;
  const divisor = divisorRaw ? parseInt(divisorRaw, 10) : 1;
  const flat = flatRaw ? parseSpanishNumber(flatRaw) : 0;
  const scale = parseSpanishNumber(scaleRaw);
  const total = flat + scale * Math.floor(casterLevel / divisor);
  return formatUnit(total, flatUnit ?? scaleUnit);
}

const DURATION_TERM_RE =
  /(\d+(?:[.,]\d+)?)\s*(asaltos?|minutos?|horas?|d[ií]as?)(?:\s*\/\s*(?:(\d+)\s*)?nivele?s?)?/gi;

/**
 * Resuelve la duración de un conjuro (p.ej. "1 minuto/nivel" o
 * "1 asalto + 1 asalto/3 niveles") al valor total para un nivel de
 * lanzador concreto. Devuelve null si la duración no depende del nivel.
 */
export function resolveSpellDuration(duration: string, casterLevel: number): string | null {
  let hasScaling = false;
  let unit: string | null = null;
  let total = 0;
  for (const m of duration.matchAll(DURATION_TERM_RE)) {
    const [, amountRaw, termUnit, divisorRaw] = m;
    const normalizedUnit = termUnit.toLowerCase().replace(/s$/, "");
    if (unit && normalizedUnit !== unit) continue; // unidad distinta a la principal: se ignora por seguridad
    unit = normalizedUnit;
    const amount = parseSpanishNumber(amountRaw);
    if (divisorRaw !== undefined || m[0].includes("/")) {
      hasScaling = true;
      const divisor = divisorRaw ? parseInt(divisorRaw, 10) : 1;
      total += amount * Math.floor(casterLevel / divisor);
    } else {
      total += amount;
    }
  }
  if (!hasScaling || !unit) return null;
  return formatUnit(total, unit);
}

// Requiere que el propio dado (NdM) sea lo que escala, con un límite expresado
// también en dados del mismo tamaño (p.ej. "1d6 ... por nivel (máximo 10d6)").
// La comprobación negativa evita confundirlo con el patrón de bonificador
// plano por nivel ("1d8 +1 por nivel, máximo +5"), donde el dado es fijo y
// solo el "+1" escala.
const DICE_PER_LEVEL_RE =
  /(\d+)d(\d+)(?!\s*\+\s*\d)[^().]*?por (?:cada (dos|tres|cuatro) niveles|nivel(?:\s+del?\s+lanzador)?)[^().]*?\(máximo\s+(\d+)d\2\)/gi;
// Bonificador plano que escala por nivel (o cada N niveles), con o sin límite
// expresado como "+K" (p.ej. "+1 por nivel del lanzador (máximo +5)" en las
// curaciones básicas, o "+1 por cada dos niveles" sin límite en Hoja de Llama).
const BONUS_PER_LEVEL_RE =
  /\+(\d+)\s+por (?:cada (dos|tres|cuatro) niveles|nivel(?:\s+del?\s+lanzador)?)(?:[^().]*?\(máximo\s+\+(\d+)\)|)/gi;
const DIVISOR_WORDS: Record<string, number> = { dos: 2, tres: 3, cuatro: 4 };

/**
 * Añade, entre corchetes tras cada fragmento reconocible de daño/curación
 * escalado por nivel dentro de la descripción de un conjuro, el valor ya
 * resuelto para el nivel de lanzador indicado (p.ej. "1d6 por nivel
 * (máximo 10d6)" -> "...(máximo 10d6) [a nivel de lanzador 7: 7d6]").
 * Los fragmentos que no encajan con ninguno de los dos patrones reconocidos
 * (dados por nivel, bonificador plano por nivel) se dejan tal cual.
 */
export function annotateSpellDescription(description: string, casterLevel: number): string {
  let out = description.replace(DICE_PER_LEVEL_RE, (match, baseDice, dieSize, divisorWord, cap) => {
    const divisor = divisorWord ? DIVISOR_WORDS[divisorWord] : 1;
    const diceCount = Math.min(parseInt(baseDice, 10) * Math.floor(casterLevel / divisor), parseInt(cap, 10));
    if (diceCount <= 0) return match;
    return `${match} [a nivel de lanzador ${casterLevel}: ${diceCount}d${dieSize}]`;
  });
  out = out.replace(BONUS_PER_LEVEL_RE, (match, perLevel, divisorWord, cap) => {
    const divisor = divisorWord ? DIVISOR_WORDS[divisorWord] : 1;
    let bonus = parseInt(perLevel, 10) * Math.floor(casterLevel / divisor);
    if (cap) bonus = Math.min(bonus, parseInt(cap, 10));
    if (bonus <= 0) return match;
    return `${match} [a nivel de lanzador ${casterLevel}: +${bonus}]`;
  });
  return out;
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
            "El explorador ha renunciado a sus conjuros divinos para convertirse en un maestro de las armas. Obtiene una dote de bonificación elegida entre Lucha a Ciegas, Pericia en Combate, Desarme Mejorado, Enemigo Predilecto Mejorado, Finta Mejorada, Derribo Mejorado, o de la lista propia de su estilo de combate. Elígela en \"Elecciones de clase\".",
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
  activeVariantRules: string[] = [],
): UnlockedClassFeatureChoice[] {
  return classLevels.flatMap((cl) => {
    const def = classes.find((c) => c.id === cl.classId);
    if (!def?.choices) return [];
    return def.choices
      .filter((choice) => !choice.requiresVariantRule || activeVariantRules.includes(choice.requiresVariantRule))
      .flatMap((choice) =>
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
  activeVariantRules: string[] = [],
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
      if (choice.kind !== "dote_restringida" && choice.kind !== "dote_categoria") continue;
      if (choice.requiresVariantRule && !activeVariantRules.includes(choice.requiresVariantRule)) continue;
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

export interface FavoredEnemyBonus {
  /** Texto tal cual se escribió la primera vez que se eligió este enemigo predilecto. */
  enemy: string;
  /** Bono total contra este enemigo: +2 por cada vez que se eligió/reforzó. */
  bonus: number;
  /** Niveles de la clase en los que se eligió o reforzó este enemigo predilecto. */
  levels: number[];
}

/**
 * Agrega las elecciones de "enemigo predilecto" del explorador (niveles 1,
 * 5, 10, 15 y 20) en un bono por enemigo. Según el SRD, en cada uno de esos
 * niveles el jugador elige entre seleccionar un enemigo predilecto nuevo (a
 * +2) o reforzar en +2 uno ya elegido antes, en vez de añadir uno distinto:
 * esta app modela esa elección simplemente dejando repetir el mismo texto en
 * un nivel posterior (comparado sin mayúsculas/acentos), y cada repetición
 * suma otro +2 al bono total de ese enemigo.
 */
export function getFavoredEnemyBonuses(
  classFeatureChoices: CharacterClassFeatureChoice[],
  classId = "ranger",
  choiceId = "enemigo-predilecto",
): FavoredEnemyBonus[] {
  const entries = classFeatureChoices
    .filter((c) => c.classId === classId && c.choiceId === choiceId && c.value.trim())
    .sort((a, b) => a.level - b.level);
  const byKey = new Map<string, FavoredEnemyBonus>();
  for (const entry of entries) {
    const key = normalizeForMatch(entry.value);
    const existing = byKey.get(key);
    if (existing) {
      existing.bonus += 2;
      existing.levels.push(entry.level);
    } else {
      byKey.set(key, { enemy: entry.value.trim(), bonus: 2, levels: [entry.level] });
    }
  }
  return Array.from(byKey.values());
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
  activeVariantRules: string[] = [],
): Set<string> {
  const ids = new Set(feats.map((f) => f.featId));
  for (const bf of getBonusFeatsFromClasses(classLevels, classes, classFeatureChoices, activeVariantRules)) {
    ids.add(bf.featId);
  }
  return ids;
}

const FIGHTER_BONUS_FEAT_LEVELS = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
// Ejemplar (Complete Adventurer): "Dote Adicional" en los niveles 4 y 8, sin
// restricción de lista (a diferencia de la mayoría de dotes de bonificación
// de clase, que sí están restringidas y por tanto se modelan como elección
// "dote_restringida"/"dote_categoria" en vez de un hueco genérico).
const EXEMPLAR_BONUS_FEAT_LEVELS = [4, 8];

export function computeFeatSlots(classLevels: CharacterClassLevel[], isHuman: boolean, bonusFeatSlots = 0): number {
  const level = totalCharacterLevel(classLevels);
  if (level <= 0) return bonusFeatSlots;
  let slots = 1;
  for (let l = 3; l <= level; l += 3) slots++;
  if (isHuman) slots++;
  const fighterLevel = classLevels.find((cl) => cl.classId === "fighter")?.level ?? 0;
  slots += FIGHTER_BONUS_FEAT_LEVELS.filter((l) => l <= fighterLevel).length;
  const exemplarLevel = classLevels.find((cl) => cl.classId === "cad-exemplar")?.level ?? 0;
  slots += EXEMPLAR_BONUS_FEAT_LEVELS.filter((l) => l <= exemplarLevel).length;
  return slots + bonusFeatSlots;
}

export function deriveCharacterSummary(
  character: Character,
  classes: ClassDef[],
  race: Race | undefined,
) {
  const finalAbilityScores = computeFinalAbilityScores(character.abilityScores, race, character.equipment);
  const equipmentBonuses = computeEquipmentPassiveBonuses(character.equipment);
  const bab = computeBabTotal(character.classLevels, classes);
  const saves = computeSaveTotals(character.classLevels, classes, finalAbilityScores, equipmentBonuses.saveResistance);
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

const MONK_AC_BONUS_LEVEL = 1;
const MONK_FLAT_AC_BONUS_LEVELS: [level: number, bonus: number][] = [
  [5, 1],
  [10, 2],
  [15, 3],
  [20, 4],
];

/**
 * CA sin armadura (monje, nivel 1): bono de Sabiduría (si es positivo) a la
 * CA mientras no lleve armadura ni escudo, más un bono fijo adicional de +1
 * a +4 según el nivel de monje (desde nivel 5). Según el SRD este bono se
 * aplica incluso contra ataques de toque o estando desprevenido (a
 * diferencia de un bonificador de esquiva normal), así que se suma al
 * bloque "misc" de `computeArmorClass`, no al de esquiva. No se modela aquí
 * la pérdida del bono por llevar carga media o pesada, ya que la ficha no
 * calcula la carga actual del personaje.
 */
function getMonkUnarmoredAcBonus(classLevels: CharacterClassLevel[], abilityScores: AbilityScores, wearingArmorOrShield: boolean): number {
  const level = classLevels.find((cl) => cl.classId === "monk")?.level ?? 0;
  if (level < MONK_AC_BONUS_LEVEL || wearingArmorOrShield) return 0;
  let flatBonus = 0;
  for (const [reqLevel, b] of MONK_FLAT_AC_BONUS_LEVELS) if (level >= reqLevel) flatBonus = b;
  return Math.max(0, abilityModifier(abilityScores.wis)) + flatBonus;
}

const DERVISH_GRACE_LEVELS: [level: number, bonus: number][] = [
  [3, 1],
  [6, 2],
  [8, 3],
  [10, 4],
];

/**
 * Gracia en la Danza (derviche, Complete Warrior, nivel 3+): bono de esquiva
 * a la CA mientras lleve como máximo armadura ligera y ningún escudo. Según
 * el SRD, este bono se aplica incluso contra ataques de toque o estando
 * desprevenido, así que se suma al bloque "misc", no al de esquiva estándar.
 */
function getDervishGraceBonus(classLevels: CharacterClassLevel[], bodyArmorCategory: ArmorCategory | undefined, hasShield: boolean): number {
  const level = classLevels.find((cl) => cl.classId === "cw-dervish")?.level ?? 0;
  if (level < 3 || hasShield) return 0;
  if (bodyArmorCategory && bodyArmorCategory !== "ligera") return 0;
  let bonus = 0;
  for (const [reqLevel, b] of DERVISH_GRACE_LEVELS) if (level >= reqLevel) bonus = b;
  return bonus;
}

const TEMPEST_DEFENSE_LEVELS: [level: number, bonus: number][] = [
  [1, 1],
  [3, 2],
  [5, 3],
];

/**
 * Defensa de la Tempestad (tempestad, Complete Adventurer, nivel 1+): bono de
 * esquiva a la CA mientras empuñe un arma doble o dos armas; se pierde con
 * armadura media o pesada. Es un bonificador de esquiva normal (se pierde
 * estando desprevenido), a diferencia del de Gracia en la Danza del
 * derviche. Se aproxima "empuñar dos armas" con el número de armas cuerpo a
 * cuerpo equipadas simultáneamente, ya que el catálogo no distingue las
 * armas dobles.
 */
function getTempestDefenseBonus(classLevels: CharacterClassLevel[], bodyArmorCategory: ArmorCategory | undefined, meleeWeaponCount: number): number {
  const level = classLevels.find((cl) => cl.classId === "cad-tempest")?.level ?? 0;
  if (level < 1 || meleeWeaponCount < 2) return 0;
  if (bodyArmorCategory === "media" || bodyArmorCategory === "pesada") return 0;
  let bonus = 0;
  for (const [reqLevel, b] of TEMPEST_DEFENSE_LEVELS) if (level >= reqLevel) bonus = b;
  return bonus;
}

const SUEL_ARCANAMACH_DR_LEVELS: [level: number, dr: number][] = [
  [6, 2],
  [10, 4],
];

/** Reducción de Daño del arcanamach suelio (Complete Mage, nivel 6+): RD X/- fija. */
function getSuelArcanamachDamageReduction(classLevels: CharacterClassLevel[]): number {
  const level = classLevels.find((cl) => cl.classId === "cm-suel-arcanamach")?.level ?? 0;
  let dr = 0;
  for (const [reqLevel, d] of SUEL_ARCANAMACH_DR_LEVELS) if (level >= reqLevel) dr = d;
  return dr;
}

export function computeCharacterArmorClass(
  finalScores: AbilityScores,
  size: string,
  equipped: EquippedArmorPieces,
  armorAsDamageReduction = false,
  insightBonus = 0,
  deflectionBonus = 0,
  naturalArmorBonus = 0,
  classLevels: CharacterClassLevel[] = [],
  meleeWeaponCount = 0,
): {
  total: number;
  touch: number;
  flatFooted: number;
  armorBonus: number;
  shieldBonus: number;
  maxDexBonus: number | null;
  damageReduction: number;
  insightBonus: number;
  deflectionBonus: number;
  naturalArmorBonus: number;
  monkWisdomBonus: number;
  dervishGraceBonus: number;
  tempestDefenseBonus: number;
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
  damageReduction = Math.max(damageReduction, getSuelArcanamachDamageReduction(classLevels));
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
  const bodyArmorCategory = equipped.bodyArmor?.armor.category;
  const wearingArmorOrShield = Boolean(equipped.bodyArmor) || Boolean(equipped.shield);
  const monkWisdomBonus = getMonkUnarmoredAcBonus(classLevels, finalScores, wearingArmorOrShield);
  const dervishGraceBonus = getDervishGraceBonus(classLevels, bodyArmorCategory, Boolean(equipped.shield));
  const tempestDefenseBonus = getTempestDefenseBonus(classLevels, bodyArmorCategory, meleeWeaponCount);
  const ac = computeArmorClass({
    armorBonus,
    shieldBonus,
    dexScore: finalScores.dex,
    maxDexBonus,
    sizeModifier: sizeModifier(size),
    naturalArmor: naturalArmorBonus,
    deflection: deflectionBonus,
    misc: insightBonus + monkWisdomBonus + dervishGraceBonus,
    dodge: tempestDefenseBonus,
  });
  return {
    ...ac,
    armorBonus,
    shieldBonus,
    maxDexBonus,
    damageReduction,
    insightBonus,
    deflectionBonus,
    naturalArmorBonus,
    monkWisdomBonus,
    dervishGraceBonus,
    tempestDefenseBonus,
  };
}

export interface WeaponAttackSummary {
  itemId: string;
  name: string;
  type: WeaponType;
  attackBonus: number;
  damage: string;
  critical: string;
  rangeIncrement?: number;
  /** Iniciado de la Orden del Arco: penalizador por incremento de alcance reducido a la mitad para este arma. */
  rangePenaltyHalved: boolean;
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

// Complete Warrior: nombres de arma reales que corresponden a cada opción de
// "tipo de arco" elegida al entrar en la clase de prestigio Iniciado de la
// Orden del Arco (rasgo "Maestría con el arco elegido", nivel 1).
const BOW_INITIATE_WEAPON_NAMES: Record<string, string> = {
  corto: "Arco corto",
  "corto-compuesto": "Arco corto compuesto",
  largo: "Arco largo",
  "largo-compuesto": "Arco largo compuesto",
};

export interface BowInitiateBonuses {
  attackBonus: number;
  damageBonus: number;
  rangePenaltyHalved: boolean;
}

const BOW_INITIATE_GREATER_WEAPON_FOCUS_LEVEL = 4;
const BOW_INITIATE_GREATER_WEAPON_FOCUS_ATTACK = 1;

/**
 * Bonificador de la dote gratuita Soltura Mayor con un Arma (Greater
 * Weapon Focus, +1 a las tiradas de ataque) que el Iniciado de la Orden
 * del Arco obtiene en nivel 4 para el tipo de arco elegido al entrar en la
 * clase (rasgo "Precisión a distancia", nivel 1). Esa dote necesita un
 * arma concreta seleccionada (`selection`) para que `getWeaponFeatBonuses`
 * la aplique, y las dotes de bonificación de clase no llevan selección
 * propia, así que su efecto numérico se añade aquí directamente sobre el
 * arco ya elegido. El resto de rasgos de la clase (Precisión a Distancia,
 * daño adicional de tipo ataque furtivo) no se calculan automáticamente,
 * igual que el Ataque Furtivo del pícaro: se muestran como texto en la
 * ficha, no se suman a la tirada de daño.
 */
export function getBowInitiateBonuses(
  weapon: Weapon,
  classLevels: CharacterClassLevel[],
  classFeatureChoices: CharacterClassFeatureChoice[],
): BowInitiateBonuses {
  const none = { attackBonus: 0, damageBonus: 0, rangePenaltyHalved: false };
  const level = classLevels.find((cl) => cl.classId === "cw-order-of-the-bow-initiate")?.level ?? 0;
  if (level < BOW_INITIATE_GREATER_WEAPON_FOCUS_LEVEL) return none;
  const chosenBowType = findChoiceValue(classFeatureChoices, "cw-order-of-the-bow-initiate", "tipo-arco", 1);
  const chosenWeaponName = chosenBowType ? BOW_INITIATE_WEAPON_NAMES[chosenBowType] : undefined;
  if (!chosenWeaponName || normalizeForMatch(weapon.name) !== normalizeForMatch(chosenWeaponName)) return none;
  return { attackBonus: BOW_INITIATE_GREATER_WEAPON_FOCUS_ATTACK, damageBonus: 0, rangePenaltyHalved: false };
}

const SWASHBUCKLER_GRACE_LEVEL = 1;

/**
 * Gracia (espadachín, Complete Adventurer, nivel 1): suma el modificador de
 * Destreza (si es positivo, además del de Fuerza) al daño cuerpo a cuerpo,
 * mientras no lleve armadura media o pesada ni un escudo pesado. El
 * catálogo no distingue si un arma cuerpo a cuerpo es ligera o se empuña a
 * una mano, así que se aplica a cualquier arma cuerpo a cuerpo equipada
 * (simplificación documentada, igual que otras aproximaciones de este
 * motor cuando el catálogo no registra el dato exacto).
 */
function getSwashbucklerGraceDamageBonus(
  weapon: Weapon,
  classLevels: CharacterClassLevel[],
  abilityScores: AbilityScores,
  wearingMediumOrHeavyArmor: boolean,
  wearingHeavyShield: boolean,
): number {
  const level = classLevels.find((cl) => cl.classId === "cad-swashbuckler")?.level ?? 0;
  if (level < SWASHBUCKLER_GRACE_LEVEL || weapon.type !== "cuerpo_a_cuerpo" || wearingMediumOrHeavyArmor || wearingHeavyShield) return 0;
  return Math.max(0, abilityModifier(abilityScores.dex));
}

export function computeWeaponAttack(
  weapon: Weapon,
  bab: number,
  finalScores: AbilityScores,
  size: string,
  feats: CharacterFeatChoice[] = [],
  equipmentItem?: CharacterEquipmentItem,
  classLevels: CharacterClassLevel[] = [],
  classFeatureChoices: CharacterClassFeatureChoice[] = [],
  wearingMediumOrHeavyArmor = false,
  wearingHeavyShield = false,
): WeaponAttackSummary {
  const abilityMod = weapon.type === "distancia" ? abilityModifier(finalScores.dex) : abilityModifier(finalScores.str);
  const featBonuses = getWeaponFeatBonuses(weapon, feats);
  const equipBonuses = equipmentItem
    ? computeWeaponEquipmentBonuses(equipmentItem)
    : { attackBonus: 0, damageBonus: 0, doubledThreatRange: false, rangeIncrementMultiplier: 1 };
  const compositeBow = equipmentItem
    ? computeCompositeBowEffect(weapon, equipmentItem, abilityModifier(finalScores.str))
    : { damageBonus: 0, attackPenalty: 0 };
  const bowInitiate = getBowInitiateBonuses(weapon, classLevels, classFeatureChoices);
  const swashbucklerGrace = getSwashbucklerGraceDamageBonus(weapon, classLevels, finalScores, wearingMediumOrHeavyArmor, wearingHeavyShield);
  const attackBonus =
    bab +
    abilityMod +
    sizeModifier(size) +
    featBonuses.attackBonus +
    equipBonuses.attackBonus +
    compositeBow.attackPenalty +
    bowInitiate.attackBonus;
  const damageMod =
    (weapon.type === "distancia" ? 0 : abilityModifier(finalScores.str)) +
    featBonuses.damageBonus +
    equipBonuses.damageBonus +
    compositeBow.damageBonus +
    swashbucklerGrace +
    bowInitiate.damageBonus;
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
    rangePenaltyHalved: bowInitiate.rangePenaltyHalved,
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
  rangePenaltyHalved = false,
): { increment: number; distanceFeet: number; attackBonus: number; damageBonus: number }[] {
  const results: { increment: number; distanceFeet: number; attackBonus: number; damageBonus: number }[] = [];
  const perIncrementPenalty = rangePenaltyHalved ? 1 : 2;
  if (hasPointBlankShot && rangeIncrement > 30) {
    results.push({ increment: 0, distanceFeet: 30, attackBonus: baseAttackBonus + 1, damageBonus: 1 });
  }
  for (let increment = 1; increment <= 10; increment++) {
    const distanceFeet = rangeIncrement * increment;
    const pointBlankBonus = hasPointBlankShot && distanceFeet <= 30 ? 1 : 0;
    results.push({
      increment,
      distanceFeet,
      attackBonus: baseAttackBonus - perIncrementPenalty * (increment - 1) + pointBlankBonus,
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

const CAD_TEMPEST_STEEL_DANCE_LEVEL = 2;
const CAD_TEMPEST_STEEL_DANCE_PRIMARY_REDUCTION = 2;
const CAD_TEMPEST_STEEL_DANCE_OFFHAND_REDUCTION = 6;

/**
 * Danza de Acero (tempestad, Complete Adventurer, nivel 2): reduce en 2 la
 * penalización de combate con dos armas al ataque de la mano principal, y en
 * 6 la de la mano secundaria, además de cualquier reducción por dotes.
 */
export function getCadTempestSteelDanceReduction(classLevels: CharacterClassLevel[]): { primary: number; offHand: number } {
  const level = classLevels.find((cl) => cl.classId === "cad-tempest")?.level ?? 0;
  if (level < CAD_TEMPEST_STEEL_DANCE_LEVEL) return { primary: 0, offHand: 0 };
  return { primary: CAD_TEMPEST_STEEL_DANCE_PRIMARY_REDUCTION, offHand: CAD_TEMPEST_STEEL_DANCE_OFFHAND_REDUCTION };
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
  extraPrimaryReduction = 0,
  extraOffHandReduction = 0,
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
  primaryPenalty = Math.max(0, primaryPenalty - extraPrimaryReduction);
  offHandPenalty = Math.max(0, offHandPenalty - extraOffHandReduction);
  const primary = computeFullAttackSequence(primaryBaseBonus - primaryPenalty, bab);
  const offHandCount = 1 + (hasImproved ? 1 : 0) + (hasGreater ? 1 : 0);
  const offHand = Array.from({ length: offHandCount }, (_, i) => offHandBaseBonus - offHandPenalty - 5 * i);
  return { primary, offHand };
}

const SOULKNIFE_MIND_BLADE_BONUS_LEVELS: [level: number, bonus: number][] = [
  [4, 1],
  [8, 2],
  [12, 3],
  [16, 4],
  [20, 5],
];

/**
 * Mejora de la Hoja Mental (cuchillo del alma, Complete Psionic, nivel 4+):
 * bono de mejora al ataque y al daño de la hoja mental. La hoja mental en sí
 * (disponible desde nivel 1, funciona como una espada corta) se representa
 * reutilizando la "Espada Corta" del catálogo con este bono aplicado como si
 * fuera un bono de mejora mágica, ya que no es un arma comprable normal.
 */
export function getSoulknifeMindBladeBonus(classLevels: CharacterClassLevel[]): number {
  const level = classLevels.find((cl) => cl.classId === "cps-soulknife")?.level ?? 0;
  let bonus = 0;
  for (const [reqLevel, b] of SOULKNIFE_MIND_BLADE_BONUS_LEVELS) if (level >= reqLevel) bonus = b;
  return bonus;
}
