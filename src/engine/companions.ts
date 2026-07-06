import type { CharacterClassLevel, ClassDef, CompanionGrant } from "../types";

export interface CompanionBonus {
  effectiveLevel: number;
  hitDiceBonus: number;
  naturalArmorBonus: number;
  abilityBonus: number; // se suma a Fuerza y Destreza del compañero
  bonusTricks: number;
  special: string[];
}

// Tabla de bonos de compañero animal del SRD (Manual del Jugador), indexada
// por nivel efectivo (nivel de druida, o nivel de explorador con el desfase
// que ya aplica `effectiveCompanionLevel`).
const ANIMAL_COMPANION_TABLE: CompanionBonus[] = [
  { effectiveLevel: 1, hitDiceBonus: 0, naturalArmorBonus: 0, abilityBonus: 0, bonusTricks: 1, special: ["Vínculo (compartir conjuros)"] },
  { effectiveLevel: 3, hitDiceBonus: 2, naturalArmorBonus: 2, abilityBonus: 1, bonusTricks: 2, special: ["Evasión"] },
  { effectiveLevel: 5, hitDiceBonus: 4, naturalArmorBonus: 4, abilityBonus: 1, bonusTricks: 3, special: [] },
  { effectiveLevel: 7, hitDiceBonus: 6, naturalArmorBonus: 6, abilityBonus: 2, bonusTricks: 4, special: ["Devoción"] },
  { effectiveLevel: 9, hitDiceBonus: 8, naturalArmorBonus: 8, abilityBonus: 2, bonusTricks: 5, special: [] },
  { effectiveLevel: 11, hitDiceBonus: 10, naturalArmorBonus: 10, abilityBonus: 3, bonusTricks: 6, special: ["Multiataque"] },
  { effectiveLevel: 13, hitDiceBonus: 12, naturalArmorBonus: 12, abilityBonus: 3, bonusTricks: 7, special: [] },
  { effectiveLevel: 15, hitDiceBonus: 14, naturalArmorBonus: 14, abilityBonus: 4, bonusTricks: 8, special: ["Evasión mejorada"] },
  { effectiveLevel: 17, hitDiceBonus: 16, naturalArmorBonus: 16, abilityBonus: 4, bonusTricks: 9, special: [] },
  { effectiveLevel: 19, hitDiceBonus: 18, naturalArmorBonus: 18, abilityBonus: 5, bonusTricks: 10, special: [] },
];

export function effectiveCompanionLevel(classLevels: CharacterClassLevel[], grant: CompanionGrant, classId: string): number {
  const cl = classLevels.find((c) => c.classId === classId);
  if (!cl || cl.level < grant.startLevel) return 0;
  return Math.max(1, cl.level + grant.effectiveLevelOffset);
}

export function computeAnimalCompanionBonus(effectiveLevel: number): CompanionBonus {
  let best = ANIMAL_COMPANION_TABLE[0];
  for (const row of ANIMAL_COMPANION_TABLE) {
    if (row.effectiveLevel <= effectiveLevel) best = row;
  }
  // acumula las especiales de todos los umbrales alcanzados, no solo el actual
  const special = ANIMAL_COMPANION_TABLE.filter((r) => r.effectiveLevel <= effectiveLevel).flatMap((r) => r.special);
  return { ...best, special };
}

/** Habilidades que el familiar otorga a su amo según el nivel de personaje del amo (SRD). */
export function computeFamiliarGrantedAbilities(masterLevel: number): string[] {
  const abilities = ["Vínculo empático (a cualquier distancia en el mismo plano)", "Alerta (mientras el familiar esté cerca)"];
  if (masterLevel >= 1) abilities.push("Compartir conjuros con el familiar");
  if (masterLevel >= 3) abilities.push("Administrar conjuros de toque a través del familiar");
  if (masterLevel >= 5) abilities.push("Hablar con el familiar en un idioma especial");
  if (masterLevel >= 7) abilities.push("Hablar con animales de la misma especie que el familiar");
  if (masterLevel >= 9) abilities.push("Resistencia a conjuros = nivel de amo + 5");
  if (masterLevel >= 11) abilities.push("Explorar a través de los sentidos del familiar (escrutar)");
  return abilities;
}

export interface SpecialMountBonus {
  paladinLevel: number;
  hitDiceBonus: number;
  strBonus: number;
  intScore: number;
  naturalArmorBonus: number;
  special: string[];
}

// Tabla de montura especial del paladín (SRD).
const SPECIAL_MOUNT_TABLE: SpecialMountBonus[] = [
  { paladinLevel: 5, hitDiceBonus: 2, strBonus: 0, intScore: 6, naturalArmorBonus: 0, special: ["Vínculo empático", "Evasión mejorada"] },
  { paladinLevel: 8, hitDiceBonus: 4, strBonus: 2, intScore: 6, naturalArmorBonus: 0, special: ["Mandar a otras criaturas de su especie"] },
  { paladinLevel: 11, hitDiceBonus: 6, strBonus: 2, intScore: 6, naturalArmorBonus: 2, special: [] },
  { paladinLevel: 15, hitDiceBonus: 8, strBonus: 4, intScore: 6, naturalArmorBonus: 2, special: ["Resistencia a conjuros = nivel de paladín + 5"] },
  { paladinLevel: 18, hitDiceBonus: 10, strBonus: 4, intScore: 6, naturalArmorBonus: 4, special: ["Velocidad mejorada (+10 pies)"] },
];

export function computeSpecialMountBonus(paladinLevel: number): SpecialMountBonus | null {
  let best: SpecialMountBonus | null = null;
  for (const row of SPECIAL_MOUNT_TABLE) {
    if (row.paladinLevel <= paladinLevel) best = row;
  }
  if (!best) return null;
  const special = SPECIAL_MOUNT_TABLE.filter((r) => r.paladinLevel <= paladinLevel).flatMap((r) => r.special);
  return { ...best, special };
}

export function findCompanionGrant(classes: ClassDef[], classId: string): CompanionGrant | undefined {
  return classes.find((c) => c.id === classId)?.companionGrant;
}
