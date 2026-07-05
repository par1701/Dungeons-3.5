import type { Armor, ClassDef, Feat, GearItem, Race, Skill, SourceBookId, Spell, Weapon } from "../types";
import { SRD_RACES } from "./srd/races";
import { SRD_SKILLS } from "./srd/skills";
import { SRD_SPELLS } from "./srd/spells";
import { SRD_CLASSES_A } from "./srd/classes-a";
import { SRD_CLASSES_B } from "./srd/classes-b";
import { SRD_CLASSES_C } from "./srd/classes-c";
import { SRD_FEATS } from "./srd/feats";
import { SRD_WEAPONS, SRD_ARMORS, SRD_GEAR } from "./srd/equipment";
import { CW_CLASSES } from "./complete-warrior/classes";
import { CW_FEATS } from "./complete-warrior/feats";
import { CA_CLASSES } from "./complete-arcane/classes";
import { CA_FEATS } from "./complete-arcane/feats";
import { CA_SPELLS } from "./complete-arcane/spells";
import { CDV_CLASSES } from "./complete-divine/classes";
import { CDV_FEATS } from "./complete-divine/feats";
import { CDV_SPELLS } from "./complete-divine/spells";
import { CAD_CLASSES } from "./complete-adventurer/classes";
import { CAD_FEATS } from "./complete-adventurer/feats";
import { CC_CLASSES } from "./complete-champion/classes";
import { CC_FEATS } from "./complete-champion/feats";

export const ALL_RACES: Race[] = [...SRD_RACES];
export const ALL_CLASSES: ClassDef[] = [
  ...SRD_CLASSES_A,
  ...SRD_CLASSES_B,
  ...SRD_CLASSES_C,
  ...CW_CLASSES,
  ...CA_CLASSES,
  ...CDV_CLASSES,
  ...CAD_CLASSES,
  ...CC_CLASSES,
];
export const ALL_FEATS: Feat[] = [...SRD_FEATS, ...CW_FEATS, ...CA_FEATS, ...CDV_FEATS, ...CAD_FEATS, ...CC_FEATS];
export const ALL_SKILLS: Skill[] = [...SRD_SKILLS];
export const ALL_SPELLS: Spell[] = [...SRD_SPELLS, ...CA_SPELLS, ...CDV_SPELLS];
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
