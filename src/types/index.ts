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
  | "complete-scoundrel"
  | "complete-mage"
  | "complete-psionic"
  | "phb2"
  | "dmg2"
  | "unearthed-arcana";

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

/**
 * Manifestación psiónica (Complete Psionic): en vez de conjuros por nivel,
 * el manifestador tiene una reserva de puntos de poder y conoce un número
 * fijo de poderes que puede manifestar gastando puntos según su nivel
 * (con la opción de "aumentar" gastando puntos extra, ver `PsionicPower.augment`).
 */
export interface ManifestingInfo {
  /** Habilidad usada para CD y puntos de poder. */
  ability: Ability;
  /** Id de la lista de poderes que usa esta clase (normalmente = classId). */
  powerListId: string;
  /** Nivel de poder máximo que puede llegar a manifestar (0-9). */
  maxPowerLevel: number;
  /** puntos de poder por día [nivel de clase] (sin contar el bonus por característica alta) */
  powerPointsPerDay: number[];
  /** poderes conocidos [nivel de clase][nivel de poder 0..9] */
  powersKnown: number[][];
  /** a qué nivel de clase empieza a manifestar poderes */
  startLevel: number;
}

export type CompanionKind = "animal_companion" | "familiar" | "special_mount";

export interface CompanionGrant {
  kind: CompanionKind;
  /** Nivel de esta clase a partir del cual se obtiene el compañero/familiar/montura. */
  startLevel: number;
  /**
   * Cómo se traduce el nivel de esta clase al "nivel efectivo" usado en las
   * tablas de progresión (la tabla de bonos de compañero animal está pensada
   * para nivel de druida; el explorador la usa con un desfase de -3).
   */
  effectiveLevelOffset: number;
}

/**
 * Elección propia de un rasgo de clase (p.ej. enemigo predilecto del
 * explorador, estilo de combate, dominios de clérigo, habilidad especial de
 * pícaro...). `levels` indica en qué niveles de esta clase se desbloquea una
 * nueva instancia de la elección (una elección repetible como "enemigo
 * predilecto" tiene varios niveles; una elección única como "dominios" solo
 * tiene uno).
 */
export type ClassFeatureChoiceKind = "texto_libre" | "lista_fija" | "dote_restringida" | "dote_categoria";

export interface ClassFeatureChoiceOption {
  id: string;
  label: string;
  /** Texto adicional opcional (p.ej. el poder otorgado por un dominio). */
  description?: string;
}

export interface ClassFeatureChoice {
  /** Id único dentro de la clase (p.ej. "enemigo-predilecto", "estilo-combate"). */
  id: string;
  /** Nombre del rasgo de clase asociado, solo para mostrarlo junto a la elección. */
  featureName: string;
  levels: number[];
  label: string;
  kind: ClassFeatureChoiceKind;
  /** Para kind "lista_fija". */
  options?: ClassFeatureChoiceOption[];
  /** Para kind "dote_restringida": ids de dote entre los que elegir; se conceden como dote real sin ocupar hueco normal. */
  featOptionIds?: string[];
  /**
   * Para kind "dote_restringida" cuando la lista de dotes disponibles depende
   * del valor elegido en otra elección anterior de la misma clase (p.ej. las
   * dotes de estilo de combate del explorador dependen de si eligió arquería
   * o dos armas). `dependsOn` es el id de esa otra elección.
   */
  featOptionsByDependency?: { dependsOn: string; options: Record<string, string[]> };
  /**
   * Para kind "dote_categoria": la dote elegida puede ser cualquiera de estos
   * tipos (p.ej. ["combate"] para "una dote de combate adicional que cumpla
   * sus requisitos"), siempre que el personaje cumpla sus prerrequisitos. A
   * diferencia de "dote_restringida", aquí no se waiven los prerrequisitos.
   */
  featCategoryOptions?: FeatType[];
  placeholder?: string;
  /**
   * Id de una regla variante (`VariantRule.id`) que debe estar activa para
   * que esta elección se ofrezca. Se usa para elecciones que solo existen
   * cuando un rasgo de clase alternativo sustituye al rasgo normal de la
   * clase (p.ej. las dotes de bonificación de Campeón de lo Salvaje, que
   * solo aplican si esa variante del explorador está activa).
   */
  requiresVariantRule?: string;
}

/** Dote de bonificación automática (sin elección) otorgada por una clase, p.ej. Seguir Rastro del explorador. */
export interface ClassBonusFeatGrant {
  level: number;
  featId: string;
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
  manifesting?: ManifestingInfo;
  companionGrant?: CompanionGrant;
  features: ClassFeature[]; // rasgos de clase por nivel (texto)
  /** Elecciones propias de esta clase que el jugador debe hacer al alcanzar ciertos niveles. */
  choices?: ClassFeatureChoice[];
  /** Dotes de bonificación automáticas (sin elección) otorgadas por esta clase. */
  bonusFeatGrants?: ClassBonusFeatGrant[];
  maxLevel: number;
  isPrestige?: boolean;
  /** Requisitos de entrada (solo relevante para clases de prestigio). */
  prerequisites?: FeatPrerequisite[];
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
  /**
   * Habilidades como Oficio, Profesión e Interpretar exigen elegir una
   * especialización libre (ej. "Oficio (Herrería)") y pueden tomarse varias
   * veces, cada una con sus propios rangos. En `CharacterSkillRanks` estas se
   * guardan con clave compuesta "idHabilidad::especialización".
   */
  requiresSpecialization?: boolean;
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

export type PsionicDiscipline =
  | "Clarividencia"
  | "Metacreatividad"
  | "Psicocinesis"
  | "Psicometabolismo"
  | "Psicoportación"
  | "Telepatía"
  | "Adivinación"
  | "Universal";

export interface PsionicPower {
  id: string;
  name: string;
  source: SourceBookId;
  discipline: PsionicDiscipline;
  subdiscipline?: string;
  descriptors: string[];
  levelByClass: Record<string, number>; // classId -> nivel del poder
  display: string; // análogo a "components" en conjuros (Vi/Au/Ma/Ol/Ma)
  manifestingTime: string;
  range: string;
  target: string;
  duration: string;
  savingThrow: string;
  powerResistance: string;
  description: string;
  /** Cómo mejora el poder si se gastan puntos de poder adicionales. */
  augment?: string;
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
  /** Arco compuesto: puede fabricarse con una calificación de Fuerza (ver `CharacterEquipmentItem.strengthRating`) que añade el bono de Fuerza al daño hasta ese límite. */
  isComposite?: boolean;
}

/**
 * Material especial de fabricación (mithral, adamantina, hierro frío...).
 * El coste se modela como recargo fijo en po dependiente del tipo de objeto
 * al que se aplica (un arma cuesta lo mismo sea cual sea su categoría; una
 * armadura/escudo depende de su categoría, ya que el recargo real del SRD
 * escala con el peso/tamaño del objeto base).
 */
export interface SpecialMaterial {
  id: string;
  name: string;
  source: SourceBookId;
  appliesTo: ("arma" | "armadura")[];
  description: string;
  /** Recargo fijo en po para un arma fabricada con este material. */
  weaponCostBonus?: number;
  /** Recargo en po por libra de peso del arma (p.ej. mithral, madera oscura). */
  weaponCostPerPound?: number;
  /** Multiplicador sobre el coste base del arma (p.ej. hierro frío: ×2); se aplica junto a los anteriores. */
  weaponCostMultiplier?: number;
  /** Bonificador de ataque plano, no mágico, inherente al material (p.ej. +1 de la adamantina). */
  weaponAttackBonus?: number;
  /** Recargo en po para una armadura/escudo, según su categoría (ArmorCategory). */
  armorCostBonusByCategory?: Partial<Record<ArmorCategory, number>>;
  /** Recargo en po por libra de peso de la armadura/escudo (p.ej. mithral, madera oscura). */
  armorCostPerPound?: number;
  /** Multiplicador de peso del objeto (p.ej. 0.5 para mithral o madera oscura). */
  weightMultiplier?: number;
  /** Reducción del penalizador de armadura (valor positivo que se resta al penalizador, p.ej. 3 para mithral). */
  armorCheckPenaltyReduction?: number;
  /** Incremento del bonificador máximo de Destreza permitido. */
  maxDexBonusIncrease?: number;
  /** Reducción del porcentaje de fallo de conjuros arcanos (puntos porcentuales). */
  arcaneSpellFailureReduction?: number;
  /** Reducción de daño natural (no mágica) que otorga una armadura de este material, según su categoría. */
  damageReductionByArmorCategory?: Partial<Record<ArmorCategory, number>>;
  /** Dureza y puntos de golpe especiales del objeto (informativo). */
  hardnessNote?: string;
  /** Requisitos o restricciones narrativas (p.ej. "solo armas cortantes o perforantes"). */
  restrictions?: string;
}

/**
 * Propiedad mágica especial de un arma o armadura/escudo (Flamígera, Hiriente,
 * Guarnecida...), con su coste equivalente en bonificador de mejora para el
 * cálculo de precio de objetos mágicos del DMG.
 */
export interface MagicItemProperty {
  id: string;
  name: string;
  source: SourceBookId;
  appliesTo: "arma" | "armadura_o_escudo";
  /** Bonificador de mejora equivalente que suma al total para el cálculo de precio ((bono total)² × 2000 po armas / × 1000 po armaduras). 0 si esta propiedad usa `flatCost` en su lugar. */
  bonusEquivalent: number;
  /** Coste fijo en po, para propiedades que no usan el sistema de bono equivalente (p.ej. Ceremonial, Sombra). Se suma directamente al precio final, sin elevarlo al cuadrado. */
  flatCost?: number;
  /** Bonificador de mejora mágica mínimo requerido en el objeto base para poder añadir esta propiedad. */
  minEnhancementBonus?: number;
  description: string;
  restrictions?: string;
}

/** Ranura de cuerpo para objetos maravillosos: solo puede llevarse un objeto por ranura, salvo "anillo" (hasta 2). */
export type BodySlot = "cabeza" | "cuello" | "hombros" | "cintura" | "munecas" | "manos" | "anillo" | "pies";

/** Qué modifica un objeto maravilloso, para saber dónde aplicar su bonificador. */
export type WondrousItemCategory = "ca_desviacion" | "ca_natural" | "salvaciones_resistencia" | "caracteristica";

/**
 * Objeto mágico "pasivo" que se lleva puesto en una ranura de cuerpo
 * concreta (anillo de protección, capa de resistencia, cinturón de
 * característica...), con un bonificador configurable dentro de un rango y
 * un coste que escala con su cuadrado, igual que las dotes de arma/armadura.
 */
export interface WondrousItem {
  id: string;
  name: string;
  source: SourceBookId;
  bodySlot: BodySlot;
  category: WondrousItemCategory;
  /** Solo para category "caracteristica": qué puntuación modifica. */
  ability?: Ability;
  description: string;
  minBonus: number;
  maxBonus: number;
  bonusStep: number;
  /** Coste = (bono)² × este valor, en po (2000 para CA, 1000 para salvaciones/características). */
  costPerBonusSquared: number;
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

export interface CompanionAttack {
  name: string;
  bonus: number;
  damage: string;
}

/**
 * Bloque de estadísticas base (a su nivel de dado de golpe inicial en el
 * Manual de Monstruos) de una criatura usable como compañero animal,
 * familiar o montura especial. La hoja de personaje muestra este bloque
 * junto con los bonos por nivel de amo correspondientes (ver
 * `engine/companions.ts`), en vez de precalcular cada combinación posible.
 */
export interface CompanionBaseCreature {
  id: string;
  name: string;
  source: SourceBookId;
  kind: CompanionKind;
  size: Size;
  baseHitDice: number;
  hitDie: number;
  baseAbilityScores: AbilityScores;
  baseNaturalArmor: number;
  baseSpeed: number;
  attacks: CompanionAttack[];
  specialQualities: string[];
  skillBonuses: string[];
  /** Nivel efectivo mínimo (según la tabla de compañero animal) al que se puede elegir; 1 para familiares/montura. */
  minEffectiveLevel: number;
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

export interface CharacterPowerSelection {
  classId: string;
  powerId: string;
  level: number;
}

/** Valor elegido por el jugador para una `ClassFeatureChoice` concreta de una clase. */
export interface CharacterClassFeatureChoice {
  classId: string;
  choiceId: string;
  /** Nivel de esta clase en el que se tomó esta instancia (para elecciones repetibles). */
  level: number;
  /** Texto libre, id de opción de lista fija, o id de dote, según el "kind" de la elección. */
  value: string;
}

export interface CharacterEquipmentItem {
  itemId: string;
  itemKind: "weapon" | "armor" | "gear" | "maravilloso";
  quantity: number;
  equipped: boolean;
  masterwork?: boolean;
  /** Id de un `SpecialMaterial` (solo aplicable a armas/armaduras). */
  specialMaterialId?: string;
  /** Bonificador de mejora mágica (0-5 en armas/armaduras). Para objetos maravillosos (itemKind "maravilloso"), es el nivel de bonificador elegido dentro del rango del objeto. */
  enhancementBonus?: number;
  /** Ids de `MagicItemProperty` aplicadas a este objeto. */
  magicPropertyIds?: string[];
  /** Solo arcos compuestos: calificación de Fuerza fabricada (0 por defecto), +100 po por punto. */
  strengthRating?: number;
}

export interface CharacterCompanion {
  id: string;
  kind: CompanionKind;
  baseCreatureId: string;
  /** Nombre propio elegido por el jugador para el compañero/familiar/montura. */
  name: string;
  /** Clase del personaje que otorga este compañero (druida, explorador, paladín, mago, hechicero...). */
  masterClassId: string;
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
  powers: CharacterPowerSelection[];
  classFeatureChoices: CharacterClassFeatureChoice[];
  companions: CharacterCompanion[];
  equipment: CharacterEquipmentItem[];
  gold: number;
  hpRolls: number[]; // hp tirados/asignados por nivel
  notes: string;
  activeSourceBooks: SourceBookId[];
  activeVariantRules: string[];
  /** Ajustes manuales del DJ: dotes, puntos de golpe, puntos de habilidad y bonificador de perspicacia a la CA adicionales fuera de las reglas normales. */
  bonusFeatSlots: number;
  bonusHp: number;
  bonusSkillPoints: number;
  bonusInsightAC: number;
  createdAt: string;
  updatedAt: string;
}
