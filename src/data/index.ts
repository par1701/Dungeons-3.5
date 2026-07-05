import type { Armor, ClassDef, Feat, GearItem, Race, Skill, SourceBookId, Spell, Weapon } from "../types";
import { SRD_RACES } from "./srd/races";
import { SRD_SKILLS } from "./srd/skills";

// TODO: se completan automáticamente cuando terminan de generarse los datos
// de clases/dotes/conjuros/equipo del SRD (ver src/data/srd/*).
const SRD_CLASSES: ClassDef[] = [];
const SRD_FEATS: Feat[] = [];
const SRD_SPELLS: Spell[] = [];
const SRD_WEAPONS: Weapon[] = [];
const SRD_ARMORS: Armor[] = [];
const SRD_GEAR: GearItem[] = [];

export const ALL_RACES: Race[] = [...SRD_RACES];
export const ALL_CLASSES: ClassDef[] = [...SRD_CLASSES];
export const ALL_FEATS: Feat[] = [...SRD_FEATS];
export const ALL_SKILLS: Skill[] = [...SRD_SKILLS];
export const ALL_SPELLS: Spell[] = [...SRD_SPELLS];
export const ALL_WEAPONS: Weapon[] = [...SRD_WEAPONS];
export const ALL_ARMORS: Armor[] = [...SRD_ARMORS];
export const ALL_GEAR: GearItem[] = [...SRD_GEAR];

function bySource<T extends { source: SourceBookId }>(items: T[], enabled: SourceBookId[]): T[] {
  return items.filter((item) => enabled.includes(item.source));
}

export function getEnabledRaces(enabled: SourceBookId[]): Race[] {
  return bySource(ALL_RACES, enabled);
}
export function getEnabledSkills(enabled: SourceBookId[]): Skill[] {
  return bySource(ALL_SKILLS, enabled);
}
export function getEnabledClasses(enabled: SourceBookId[]): ClassDef[] {
  return bySource(ALL_CLASSES, enabled);
}
export function getEnabledFeats(enabled: SourceBookId[]): Feat[] {
  return bySource(ALL_FEATS, enabled);
}
export function getEnabledSpells(enabled: SourceBookId[]): Spell[] {
  return bySource(ALL_SPELLS, enabled);
}
export function getEnabledWeapons(enabled: SourceBookId[]): Weapon[] {
  return bySource(ALL_WEAPONS, enabled);
}
export function getEnabledArmors(enabled: SourceBookId[]): Armor[] {
  return bySource(ALL_ARMORS, enabled);
}
export function getEnabledGear(enabled: SourceBookId[]): GearItem[] {
  return bySource(ALL_GEAR, enabled);
}

export function findRace(id: string): Race | undefined {
  return ALL_RACES.find((r) => r.id === id);
}
export function findClass(id: string): ClassDef | undefined {
  return ALL_CLASSES.find((c) => c.id === id);
}
export function findSkill(id: string): Skill | undefined {
  return ALL_SKILLS.find((s) => s.id === id);
}
export function findFeat(id: string): Feat | undefined {
  return ALL_FEATS.find((f) => f.id === id);
}
export function findSpell(id: string): Spell | undefined {
  return ALL_SPELLS.find((s) => s.id === id);
}
