// Tipos centrales del sistema de reglas de D&D 3.5.
// Todo el contenido de reglas (razas, clases, dotes, conjuros, equipo) se modela
// con estos tipos para que distintos libros de origen (SRD, Complete X, PHB2, DMG2)
// puedan convivir y activarse/desactivarse de forma independiente.

export type Ability = "str" | "dex" | "con" | "int" | "wis" | "cha";

export type AbilityScores = Record<Ability, number>;

export type Size =
  | "Fino"
  | "Diminuto"
  | "Diminuta"
  | "Pequeño"
  | "Mediano"
  | "Grande"
  | "Enorme"
  | "Descomunal"
  | "Colosal";

export type SourceBookId =
  | "srd"
  | "complete-warrior"
  | "complete-arcane"
  | "complete-divine"
  | "complete-adventurer"
  | "complete-champion"
  | "phb2"
  | "dmg2";

export interface SourceBook {
  id: SourceBookId;
  name: string;
  shortName: string;
  description: string;
  /** Si el libro ya tiene contenido cargado en la app o es un stub para el futuro. */
  implemented: boolean;
  /** Activado por defecto al crear un personaje nuevo. */
  defaultEnabled: boolean;
}

export type SaveProgression = "buena" | "mala";
export type BabProgression = "completa" | "tres_cuartos" | "media";

export interface ClassFeature {
  level: number;
  name: string;
  description: string;
}

export type SpellcastingType = "preparado" | "espontaneo" | "ninguno";

export interface SpellcastingInfo {
  type: SpellcastingType;
  /** Habilidad usada para CD y bonus de conjuros por día. */
  ability: Ability;
  /** Id de la lista de conjuros que usa esta clase (normalmente = classId). */
  spellListId: string;
  /** Nivel de conjuro máximo que puede llegar a lanzar (0-9). */
  maxSpellLevel: number;
  /** conjuros por día [nivel de clase][nivel de conjuro 0..9] */
  spellsPerDay: number[][];
  /** conjuros conocidos (solo espontáneos/bardos); prepared no lo usa */
  spellsKnown?: number[][];
  /** a qué nivel de clase empieza a lanzar conjuros */
  startLevel: number;
}

export interface ClassDef {
  id: string;
  name: string;
  source: SourceBookId;
  description: string;
  hitDie: number;
  skillPointsPerLevel: number;
  classSkills: string[]; // ids de Skill
  babProgression: BabProgression;
  saves: Record<"fort" | "ref" | "will", SaveProgression>;
  weaponProficiencies: string[];
  armorProficiencies: string[];
  spellcasting?: SpellcastingInfo;
  features: ClassFeature[]; // rasgos de clase por nivel (texto)
  maxLevel: number;
  isPrestige?: boolean;
}

export interface RaceTrait {
  name: string;
  description: string;
}

export interface Race {
  id: string;
  name: string;
  source: SourceBookId;
  size: Size;
  speed: number;
  abilityAdjustments: Partial<Record<Ability, number>>;
  traits: RaceTrait[];
  automaticLanguages: string[];
  bonusLanguages: string[];
  favoredClass: string; // id de clase o "cualquiera"
  levelAdjustment: number;
  description: string;
}

export type FeatType =
  | "general"
  | "combate"
  | "metamagia"
  | "creacion_objetos"
  | "especial";

export interface FeatPrerequisite {
  description: string;
  // predicado opcional evaluado contra el personaje derivado; si falta, es solo informativo
  check?: (ctx: FeatPrereqContext) => boolean;
}

export interface FeatPrereqContext {
  abilityScores: AbilityScores;
  babTotal: number;
  classLevels: Record<string, number>;
  totalCharacterLevel: number;
  featIds: Set<string>;
  skillRanks: Record<string, number>;
  casterLevel: number;
}

export interface Feat {
  id: string;
  name: string;
  source: SourceBookId;
  types: FeatType[];
  description: string;
  benefit: string;
  prerequisites: FeatPrerequisite[];
  fighterBonusFeat: boolean;
  stackable: boolean;
}

export interface Skill {
  id: string;
  name: string;
  keyAbility: Ability;
  trainedOnly: boolean;
  armorCheckPenalty: boolean;
  description: string;
  source: SourceBookId;
}

export type MagicSchool =
  | "Abjuración"
  | "Adivinación"
  | "Conjuración"
  | "Encantamiento"
  | "Evocación"
  | "Ilusión"
  | "Nigromancia"
  | "Transmutación"
  | "Universal";

export interface Spell {
  id: string;
  name: string;
  source: SourceBookId;
  school: MagicSchool;
  subschool?: string;
  descriptors: string[];
  levelByClass: Record<string, number>; // classId -> nivel de conjuro
  components: string;
  castingTime: string;
  range: string;
  target: string;
  duration: string;
  savingThrow: string;
  spellResistance: string;
  description: string;
}

export type WeaponCategory = "simple" | "marcial" | "exotica";
export type WeaponType = "cuerpo_a_cuerpo" | "distancia";

export interface Weapon {
  id: string;
  name: string;
  source: SourceBookId;
  category: WeaponCategory;
  type: WeaponType;
  damageSmall: string;
  damageMedium: string;
  critical: string;
  rangeIncrement?: number;
  weight: number;
  cost: number; // en po
  damageType: string; // C, P, E o combinaciones
}

export type ArmorCategory = "ligera" | "media" | "pesada" | "escudo";

export interface Armor {
  id: string;
  name: string;
  source: SourceBookId;
  category: ArmorCategory;
  armorBonus: number;
  maxDexBonus: number | null;
  armorCheckPenalty: number;
  arcaneSpellFailure: number;
  speed30: number;
  speed20: number;
  weight: number;
  cost: number;
}

export interface GearItem {
  id: string;
  name: string;
  source: SourceBookId;
  cost: number;
  weight: number;
  description: string;
}

export type VariantRuleCategory =
  | "puntuaciones_habilidad"
  | "raza"
  | "clase"
  | "combate"
  | "magia"
  | "otro";

export interface VariantRule {
  id: string;
  name: string;
  source: SourceBookId;
  category: VariantRuleCategory;
  description: string;
  defaultEnabled: boolean;
  /** Si es true, esta y otras reglas del mismo `exclusiveGroup` son mutuamente excluyentes. */
  exclusiveGroup?: string;
}

export type AbilityGenerationMethod =
  | "compra_puntos"
  | "conjunto_estandar"
  | "tirada_4d6"
  | "tirada_2d6_mas_6"
  | "manual";

export interface CharacterClassLevel {
  classId: string;
  level: number;
}

export interface CharacterFeatChoice {
  featId: string;
  /** para dotes con opciones (ej. Especialización en Arma [Espada larga]) */
  selection?: string;
  levelTaken: number;
}

export interface CharacterSkillRanks {
  [skillId: string]: number;
}

export interface CharacterSpellSelection {
  classId: string;
  spellId: string;
  level: number;
}

export interface CharacterEquipmentItem {
  itemId: string;
  itemKind: "weapon" | "armor" | "gear";
  quantity: number;
  equipped: boolean;
  masterwork?: boolean;
}

export interface Character {
  id: string;
  name: string;
  playerName: string;
  alignment: string;
  deity: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  raceId: string;
  classLevels: CharacterClassLevel[];
  abilityScores: AbilityScores;
  abilityGenerationMethod: AbilityGenerationMethod;
  skillRanks: CharacterSkillRanks;
  feats: CharacterFeatChoice[];
  spells: CharacterSpellSelection[];
  equipment: CharacterEquipmentItem[];
  gold: number;
  hpRolls: number[]; // hp tirados/asignados por nivel
  notes: string;
  activeSourceBooks: SourceBookId[];
  activeVariantRules: string[];
  createdAt: string;
  updatedAt: string;
}
