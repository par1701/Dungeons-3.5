import type { AbilityScores, CharacterClassLevel, ClassDef, CompanionAttack, CompanionBaseCreature, CompanionGrant } from "../types";
import { abilityModifier, computeBabTotal, computeBaseSave, grappleSizeModifier, sizeModifier } from "./derive";

export interface CompanionBonus {
  effectiveLevel: number;
  hitDiceBonus: number;
  naturalArmorBonus: number;
  abilityBonus: number; // se suma a Fuerza y Destreza del compañero
  bonusTricks: number;
  special: string[];
}

export interface CompanionTrick {
  id: string;
  name: string;
  description: string;
}

/** Lista estándar de trucos que un animal puede aprender (habilidad Adiestrar Animales, SRD). */
export const COMPANION_TRICKS: CompanionTrick[] = [
  { id: "attack", name: "Atacar", description: "El animal ataca a los enemigos que le señales, o a cualquiera que te ataque a ti o a él; también puede enseñarse a atacar solo a un tipo concreto de criatura." },
  { id: "come", name: "Venir", description: "El animal viene hacia ti, incluso si normalmente no lo haría." },
  { id: "defend", name: "Defender", description: "El animal te defiende a ti (o se defiende a sí mismo), incluso sin que se lo ordenes, si normalmente no lo haría." },
  { id: "down", name: "Echarse", description: "El animal se tumba y permanece quieto, soltando cualquier cosa que llevase en la boca." },
  { id: "fetch", name: "Buscar", description: "El animal recoge un objeto concreto, lo sostiene en la boca o entre las garras, y vuelve contigo." },
  { id: "guard", name: "Guardar", description: "El animal permanece en un lugar y evita que otros se acerquen, atacando a los intrusos." },
  { id: "heel", name: "Junto", description: "El animal sigue de cerca a su amo, incluso pasando junto a otros animales o personas." },
  { id: "perform", name: "Actuar", description: "El animal realiza un pequeño repertorio de trucos o acrobacias al recibir la orden." },
  { id: "seek", name: "Buscar Rastro", description: "El animal explora un área a tu alrededor en busca de cualquier criatura viva." },
  { id: "stay", name: "Quieto", description: "El animal permanece en el sitio que le indiques hasta que lo llames o vayas a buscarlo." },
  { id: "track", name: "Rastrear", description: "El animal sigue un rastro con el olfato." },
  { id: "work", name: "Trabajar", description: "El animal tira o carga con normalidad, con o sin jinete." },
];

// Glosario de cualidades especiales recurrentes (raciales de las criaturas
// base, y las otorgadas por la tabla de progresión de compañero animal /
// montura especial), para no tener que consultar el manual. Las entradas con
// número o calidad variable (velocidad de vuelo/nado/trepa/excavar, alcance
// de vista ciega) se buscan por prefijo, ya que el propio nombre de la
// cualidad ya incluye ese valor concreto.
const SPECIAL_QUALITY_GLOSSARY: Record<string, string> = {
  "visión con poca luz":
    "Puede ver el doble de lejos que un humano con luz tenue (luz de luna, antorchas, etc.), conservando distinciones de color y detalle en esas condiciones.",
  olfato:
    "Puede detectar enemigos por el olfato dentro de 9 m (30 pies, o 4,5 m contra el viento, 18 m a favor del viento), distinguir la dirección aproximada de un olor a partir de 1,5 m, y rastrear por olfato.",
  "aguantar la respiración":
    "Puede contener la respiración durante un número de asaltos igual a 5 veces su puntuación de Constitución antes de arriesgarse a ahogarse.",
  "derribo (trip)":
    "Si acierta su ataque de mordisco, puede intentar un derribo (con +2 al modificador de la prueba) como acción libre, sin hacer una prueba de ataque de toque ni provocar ataque de oportunidad; si el intento falla, el objetivo no puede derribarlo en respuesta.",
  ferocidad: "Sigue luchando sin penalización por las tiradas de ataque, aunque esté agonizando o incapacitado.",
  "furia (rage)":
    "Una vez por combate, si sufre daño en combate, puede entrar en furia durante varios asaltos: gana un bonificador de moral a Fuerza y Constitución y a las salvaciones de Voluntad, pero sufre una penalización a la CA, igual que la furia del bárbaro.",
  "agarre mejorado":
    "Si acierta un ataque con la parte del cuerpo indicada, puede iniciar una presa como acción libre sin necesidad de una prueba de agarre para asir, y sin provocar ataque de oportunidad.",
  embestida:
    "Si carga, puede realizar un ataque completo (todos sus ataques naturales) al final de la carga, en vez de un único ataque como es normal al cargar.",
  "adiestrado para la guerra":
    "No se asusta ante situaciones de combate y puede llevar a un jinete a la batalla sin necesidad de pruebas de Montar adicionales por el fragor de la lucha.",
  "puede imitar habla simple":
    "Puede repetir unas pocas palabras o frases sencillas en un idioma que haya oído, aunque sin comprender realmente su significado.",
  // Progresión de compañero animal (SRD, ver docs/animalcompanions/reglas.md).
  "vínculo (compartir conjuros)":
    "El amo puede manejar a su compañero como acción gratuita, o instarlo como acción de movimiento, incluso sin rangos en Adiestrar Animales, y obtiene +4 de circunstancia en Adiestrar Animales y empatía salvaje referidas a él (Vínculo). Además, cualquier conjuro que el amo se lance a sí mismo también afecta al compañero si está a 1,5 m o menos al lanzarlo, incluso si el conjuro no afectaría normalmente a animales; o puede lanzar sobre el compañero como conjuro de toque un conjuro dirigido a «Vos» (Compartir conjuros).",
  evasión:
    "Si sufre un ataque que permite una salvación de Reflejos para reducir el daño a la mitad, no sufre ningún daño si la salvación tiene éxito.",
  devoción: "Obtiene +4 de bonificador moral en las tiradas de salvación de Voluntad contra conjuros y efectos de encantamiento.",
  multiataque:
    "Si tiene tres o más ataques naturales, obtiene la dote Ataque Múltiple como dote de bonificación (si no la tenía ya); si no cumple ese requisito, en su lugar obtiene un segundo ataque con su arma natural principal, con un penalizador de -5.",
  "evasión mejorada":
    "Ante un ataque que permite una salvación de Reflejos para reducir el daño a la mitad, no sufre ningún daño si la salvación tiene éxito, y solo la mitad del daño si falla (incluso estando desprevenido).",
  // Progresión de montura especial del paladín (SRD).
  "vínculo empático": "El paladín tiene un vínculo empático con su montura hasta 1,5 km (1 milla) de distancia, y puede percibir lo que percibe la montura estando dentro de ese alcance.",
};

const SPECIAL_QUALITY_PREFIXES: [prefix: string, description: string][] = [
  ["volar", "Tiene velocidad de vuelo, con la maniobrabilidad indicada entre paréntesis."],
  ["nadar", "Tiene velocidad de nado: siempre puede tomar 10 al nadar, y gana +8 de bonificador racial a las pruebas de Nadar para tareas especiales o evitar peligros."],
  ["trepar", "Tiene velocidad de trepar: siempre puede tomar 10 al trepar, y gana +8 de bonificador racial a las pruebas de Trepar para tareas especiales o evitar peligros."],
  ["excavar", "Tiene velocidad de excavar, que le permite abrirse camino a través de tierra blanda o arena (no roca sólida, salvo que se indique lo contrario)."],
  ["vista ciega", "Puede detectar y ubicar con precisión a criaturas y objetos cercanos sin depender de la vista (ignora ocultación e invisibilidad), dentro del alcance indicado."],
  ["desgarrar", "Si mantiene una presa (tras un Agarre Mejorado exitoso), puede hacer además dos ataques de garra automáticos con las patas traseras, con el daño indicado, sin necesidad de una tirada de ataque."],
];

/** Explicación en lenguaje llano de una cualidad especial (racial o de progresión de compañero), o undefined si no está catalogada. */
export function describeSpecialQuality(quality: string): string | undefined {
  const key = quality.trim().toLowerCase();
  if (SPECIAL_QUALITY_GLOSSARY[key]) return SPECIAL_QUALITY_GLOSSARY[key];
  const prefixMatch = SPECIAL_QUALITY_PREFIXES.find(([prefix]) => key.startsWith(prefix));
  return prefixMatch?.[1];
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

// ---------------------------------------------------------------------
// Bloque de estadísticas jugables (PG, CA, ataque base, presa, salvaciones,
// iniciativa y ataques ya recalculados), para no tener que consultar el
// manual de monstruos en mesa.
// ---------------------------------------------------------------------

export interface CompanionDerivedStats {
  totalHitDice: number;
  finalAbilityScores: AbilityScores;
  hp: number;
  ac: number;
  touchAc: number;
  flatFootedAc: number;
  naturalArmorTotal: number;
  bab: number;
  grapple: number;
  fort: number;
  ref: number;
  will: number;
  initiative: number;
  attacks: CompanionAttack[];
  featCount: number;
}

function parseDamageDie(damage: string): { dice: string; mod: number } | null {
  const m = /^(\d+d\d+)([+-]\d+)?$/.exec(damage.trim());
  if (!m) return null;
  return { dice: m[1], mod: m[2] ? parseInt(m[2], 10) : 0 };
}

function formatDamage(dice: string, mod: number): string {
  return mod === 0 ? dice : `${dice}${mod > 0 ? "+" : ""}${mod}`;
}

/**
 * Recalcula los ataques base de la criatura tras los bonos de DG extra y de
 * característica por nivel de amo, desplazando solo lo que realmente cambia
 * (ataque base y característica) sobre el valor ya correcto de partida, en
 * vez de recalcular desde cero — así se conserva cualquier bonificador ya
 * incluido en el dato base que no depende del nivel de amo (p.ej. Enfoque en
 * un Arma, o el uso de Destreza en vez de Fuerza por Soltura en Combate).
 *
 * El ataque con mayor bonificador de la lista original se trata como
 * "principal" (característica completa al ataque y al daño); el resto,
 * como "secundario" (característica completa al ataque —el penalizador de
 * ataque natural secundario es un -5 fijo, no relacionado con la
 * característica— pero solo la mitad, redondeada hacia abajo, al daño),
 * según la regla SRD de ataques naturales múltiples.
 */
export function computeCompanionAttacks(baseAttacks: CompanionAttack[], babDelta: number, abilityDelta: number): CompanionAttack[] {
  if (baseAttacks.length === 0) return [];
  const maxBonus = Math.max(...baseAttacks.map((a) => a.bonus));
  return baseAttacks.map((atk) => {
    const isPrimary = atk.bonus === maxBonus;
    const damageDelta = isPrimary ? abilityDelta : Math.floor(abilityDelta / 2);
    const parsed = parseDamageDie(atk.damage);
    const damage = parsed ? formatDamage(parsed.dice, parsed.mod + damageDelta) : atk.damage;
    return { ...atk, bonus: atk.bonus + babDelta + abilityDelta, damage };
  });
}

/** Ataque base "de tipo Animal" (progresión de 3/4, igual que un druida del mismo nivel que los DG totales de la criatura). */
export function computeCompanionBab(totalHitDice: number): number {
  return Math.floor((totalHitDice * 3) / 4);
}

/** Salvación base "de tipo Animal" (buena Fortaleza/Reflejos, mala Voluntad), antes del modificador de característica. */
export function computeCompanionBaseSaves(totalHitDice: number): { fort: number; ref: number; will: number } {
  const good = Math.floor(totalHitDice / 2) + 2;
  const poor = Math.floor(totalHitDice / 3);
  return { fort: good, ref: good, will: poor };
}

/** Dotes totales de una criatura según sus DG (1 a 1 DG, +1 dote cada 3 DG completos adicionales), regla estándar de avance de monstruos. */
export function computeCompanionFeatCount(totalHitDice: number): number {
  if (totalHitDice <= 0) return 0;
  return 1 + Math.floor((totalHitDice - 1) / 3);
}

/**
 * Bloque de estadísticas completo de un compañero animal o montura especial
 * ya avanzado por nivel de amo, a partir del bloque base de la criatura (a
 * su nivel de DG inicial) y los bonos ya calculados (DG extra, ajuste de
 * armadura natural, ajuste de característica aplicado a Fuerza y Destreza
 * por igual, e Inteligencia fija si la regla la especifica, como en la
 * montura especial del paladín).
 */
export function computeCompanionDerivedStats(
  base: CompanionBaseCreature,
  hitDiceBonus: number,
  naturalArmorBonus: number,
  abilityBonus: number,
  intOverride?: number,
): CompanionDerivedStats {
  const totalHitDice = base.baseHitDice + hitDiceBonus;
  const finalAbilityScores: AbilityScores = {
    ...base.baseAbilityScores,
    str: base.baseAbilityScores.str + abilityBonus,
    dex: base.baseAbilityScores.dex + abilityBonus,
    int: intOverride !== undefined ? Math.max(base.baseAbilityScores.int, intOverride) : base.baseAbilityScores.int,
  };
  const conMod = abilityModifier(finalAbilityScores.con);
  const dexMod = abilityModifier(finalAbilityScores.dex);
  const strMod = abilityModifier(finalAbilityScores.str);
  const hp = Math.max(1, Math.floor(totalHitDice * (base.hitDie / 2 + 0.5)) + totalHitDice * conMod);
  const naturalArmorTotal = base.baseNaturalArmor + naturalArmorBonus;
  const sizeMod = sizeModifier(base.size);
  const ac = 10 + dexMod + sizeMod + naturalArmorTotal;
  const touchAc = 10 + dexMod + sizeMod;
  const flatFootedAc = ac - (dexMod > 0 ? dexMod : 0);
  const bab = computeCompanionBab(totalHitDice);
  const babDelta = bab - computeCompanionBab(base.baseHitDice);
  const grapple = bab + strMod + grappleSizeModifier(base.size);
  const baseSaves = computeCompanionBaseSaves(totalHitDice);
  return {
    totalHitDice,
    finalAbilityScores,
    hp,
    ac,
    touchAc,
    flatFootedAc,
    naturalArmorTotal,
    bab,
    grapple,
    fort: baseSaves.fort + conMod,
    ref: baseSaves.ref + dexMod,
    will: baseSaves.will + abilityModifier(finalAbilityScores.wis),
    initiative: dexMod,
    attacks: computeCompanionAttacks(base.attacks, babDelta, abilityBonus),
    featCount: computeCompanionFeatCount(totalHitDice),
  };
}

export interface FamiliarProgression {
  naturalArmorAdj: number;
  intScore: number;
}

// Tabla de familiares del SRD (Manual del Jugador), indexada por nivel de
// personaje del amo: ajuste de armadura natural e Inteligencia del familiar.
// Las demás columnas de esta tabla (habilidades otorgadas al amo) ya están
// en `computeFamiliarGrantedAbilities`.
const FAMILIAR_TABLE: [minMasterLevel: number, naturalArmorAdj: number, intScore: number][] = [
  [1, 0, 6],
  [3, 1, 7],
  [5, 2, 8],
  [7, 3, 9],
  [9, 4, 10],
  [11, 5, 11],
  [13, 6, 12],
  [15, 7, 13],
  [17, 8, 14],
  [19, 9, 15],
];

/** Ajuste de armadura natural e Inteligencia del familiar según el nivel de personaje del amo (tabla SRD de familiares). */
export function computeFamiliarProgression(masterLevel: number): FamiliarProgression {
  let best = FAMILIAR_TABLE[0];
  for (const row of FAMILIAR_TABLE) if (row[0] <= masterLevel) best = row;
  return { naturalArmorAdj: best[1], intScore: best[2] };
}

/**
 * Bloque de estadísticas de un familiar, aplicando sus reglas especiales del
 * SRD: usa el mayor de sus propios DG o el nivel de personaje del amo a
 * efectos de DG totales; tiene la mitad de los puntos de golpe totales del
 * amo (o los suyos propios si fuesen más altos); usa el mejor ataque base y
 * la mejor salvación base entre las suyas propias y las del amo (aplicando
 * siempre su propio modificador de característica); y su armadura natural e
 * Inteligencia suben según el nivel del amo (tabla de familiares).
 */
export function computeFamiliarDerivedStats(
  base: CompanionBaseCreature,
  masterLevel: number,
  masterHp: number,
  masterClassLevels: CharacterClassLevel[],
  masterClasses: ClassDef[],
): CompanionDerivedStats {
  const progression = computeFamiliarProgression(masterLevel);
  const totalHitDice = Math.max(base.baseHitDice, masterLevel);
  const finalAbilityScores: AbilityScores = {
    ...base.baseAbilityScores,
    int: Math.max(base.baseAbilityScores.int, progression.intScore),
  };
  const conMod = abilityModifier(finalAbilityScores.con);
  const dexMod = abilityModifier(finalAbilityScores.dex);
  const strMod = abilityModifier(finalAbilityScores.str);
  const ownHp = Math.max(1, Math.floor(base.baseHitDice * (base.hitDie / 2 + 0.5)) + base.baseHitDice * conMod);
  const hp = Math.max(ownHp, Math.floor(masterHp / 2));
  const naturalArmorTotal = base.baseNaturalArmor + progression.naturalArmorAdj;
  const sizeMod = sizeModifier(base.size);
  const ac = 10 + dexMod + sizeMod + naturalArmorTotal;
  const touchAc = 10 + dexMod + sizeMod;
  const flatFootedAc = ac - (dexMod > 0 ? dexMod : 0);
  const ownBab = computeCompanionBab(base.baseHitDice);
  const bab = Math.max(ownBab, computeBabTotal(masterClassLevels, masterClasses));
  const babDelta = bab - ownBab;
  const grapple = bab + strMod + grappleSizeModifier(base.size);
  const ownSaves = computeCompanionBaseSaves(base.baseHitDice);
  const masterBaseFort = computeBaseSave("fort", masterClassLevels, masterClasses);
  const masterBaseRef = computeBaseSave("ref", masterClassLevels, masterClasses);
  const masterBaseWill = computeBaseSave("will", masterClassLevels, masterClasses);
  return {
    totalHitDice,
    finalAbilityScores,
    hp,
    ac,
    touchAc,
    flatFootedAc,
    naturalArmorTotal,
    bab,
    grapple,
    fort: Math.max(ownSaves.fort, masterBaseFort) + conMod,
    ref: Math.max(ownSaves.ref, masterBaseRef) + dexMod,
    will: Math.max(ownSaves.will, masterBaseWill) + abilityModifier(finalAbilityScores.wis),
    initiative: dexMod,
    attacks: computeCompanionAttacks(base.attacks, babDelta, 0),
    featCount: computeCompanionFeatCount(totalHitDice),
  };
}
