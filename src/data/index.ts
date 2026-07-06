import type { Armor, ClassDef, CompanionBaseCreature, Feat, GearItem, PsionicPower, Race, Skill, SourceBookId, Spell, Weapon } from "../types";
import { SRD_RACES } from "./srd/races";
import { SRD_COMPANIONS } from "./srd/companions";
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
import { CS_CLASSES } from "./complete-scoundrel/classes";
import { CS_FEATS } from "./complete-scoundrel/feats";
import { CM_CLASSES } from "./complete-mage/classes";
import { CM_FEATS } from "./complete-mage/feats";
import { CM_SPELLS } from "./complete-mage/spells";
import { CPS_CLASSES } from "./complete-psionic/classes";
import { CPS_PRESTIGE_CLASSES } from "./complete-psionic/prestige-classes";
import { CPS_FEATS } from "./complete-psionic/feats";
import { CPS_POWERS } from "./complete-psionic/powers";
import { PHB2_FEATS } from "./phb2/feats";

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
  ...CS_CLASSES,
  ...CM_CLASSES,
  ...CPS_CLASSES,
  ...CPS_PRESTIGE_CLASSES,
];
export const ALL_FEATS: Feat[] = [
  ...SRD_FEATS,
  ...CW_FEATS,
  ...CA_FEATS,
  ...CDV_FEATS,
  ...CAD_FEATS,
  ...CC_FEATS,
  ...CS_FEATS,
  ...CM_FEATS,
  ...CPS_FEATS,
  ...PHB2_FEATS,
];
export const ALL_SKILLS: Skill[] = [...SRD_SKILLS];
export const ALL_SPELLS: Spell[] = [...SRD_SPELLS, ...CA_SPELLS, ...CDV_SPELLS, ...CM_SPELLS];
export const ALL_WEAPONS: Weapon[] = [...SRD_WEAPONS];
export const ALL_ARMORS: Armor[] = [...SRD_ARMORS];
export const ALL_GEAR: GearItem[] = [...SRD_GEAR];
export const ALL_POWERS: PsionicPower[] = [...CPS_POWERS];
export const ALL_COMPANIONS: CompanionBaseCreature[] = [...SRD_COMPANIONS];

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
export function getEnabledPowers(enabled: SourceBookId[]): PsionicPower[] {
  return bySource(ALL_POWERS, enabled);
}
export function getEnabledCompanions(enabled: SourceBookId[]): CompanionBaseCreature[] {
  return bySource(ALL_COMPANIONS, enabled);
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
export function findPower(id: string): PsionicPower | undefined {
  return ALL_POWERS.find((p) => p.id === id);
}
export function findCompanion(id: string): CompanionBaseCreature | undefined {
  return ALL_COMPANIONS.find((c) => c.id === id);
}
export function findWeapon(id: string): Weapon | undefined {
  return ALL_WEAPONS.find((w) => w.id === id);
}
export function findArmor(id: string): Armor | undefined {
  return ALL_ARMORS.find((a) => a.id === id);
}
export function findGear(id: string): GearItem | undefined {
  return ALL_GEAR.find((g) => g.id === id);
}
