import type { Armor, GearItem, Weapon } from "../../types";

// Tabla completa de armas del SRD 3.5 (contenido de juego abierto).
export const SRD_WEAPONS: Weapon[] = [
  // ----- Armas Simples: cuerpo a cuerpo ligeras -----
  { id: "dagger", name: "Daga", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d3", damageMedium: "1d4", critical: "19-20/x2", rangeIncrement: 10, weight: 1, cost: 2, damageType: "P o E" },
  { id: "punching-dagger", name: "Daga de Puño", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d3", damageMedium: "1d4", critical: "x3", weight: 2, cost: 2, damageType: "P" },
  { id: "gauntlet", name: "Guante", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d2", damageMedium: "1d3", critical: "x2", weight: 1, cost: 2, damageType: "C" },
  { id: "spiked-gauntlet", name: "Guante con Pinchos", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d3", damageMedium: "1d4", critical: "x2", weight: 1, cost: 5, damageType: "P" },
  { id: "light-mace", name: "Maza Ligera", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "x2", weight: 4, cost: 5, damageType: "C" },
  { id: "sickle", name: "Hoz", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "x2", weight: 2, cost: 6, damageType: "E" },

  // ----- Armas Simples: cuerpo a cuerpo a una mano -----
  { id: "club", name: "Garrote", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrement: 10, weight: 3, cost: 0, damageType: "C" },
  { id: "heavy-mace", name: "Maza Pesada", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "1d8", critical: "x2", weight: 8, cost: 12, damageType: "C" },
  { id: "morningstar", name: "Lucero del Alba", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "1d8", critical: "x2", weight: 6, cost: 8, damageType: "C y P" },
  { id: "shortspear", name: "Lanza Corta", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "x3", rangeIncrement: 20, weight: 3, cost: 1, damageType: "P" },

  // ----- Armas Simples: cuerpo a cuerpo a dos manos -----
  { id: "longspear", name: "Lanza Larga", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "1d8", critical: "x3", weight: 9, cost: 5, damageType: "P" },
  { id: "quarterstaff", name: "Bastón", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "x2", weight: 4, cost: 0, damageType: "C" },
  { id: "spear", name: "Lanza", source: "srd", category: "simple", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "1d8", critical: "x3", rangeIncrement: 20, weight: 6, cost: 2, damageType: "P" },

  // ----- Armas Simples: a distancia -----
  { id: "heavy-crossbow", name: "Ballesta Pesada", source: "srd", category: "simple", type: "distancia", damageSmall: "1d8", damageMedium: "1d10", critical: "19-20/x2", rangeIncrement: 120, weight: 8, cost: 50, damageType: "P" },
  { id: "light-crossbow", name: "Ballesta Ligera", source: "srd", category: "simple", type: "distancia", damageSmall: "1d6", damageMedium: "1d8", critical: "19-20/x2", rangeIncrement: 80, weight: 4, cost: 35, damageType: "P" },
  { id: "dart", name: "Dardo", source: "srd", category: "simple", type: "distancia", damageSmall: "1d3", damageMedium: "1d4", critical: "x2", rangeIncrement: 20, weight: 0.5, cost: 0.5, damageType: "P" },
  { id: "javelin", name: "Jabalina", source: "srd", category: "simple", type: "distancia", damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrement: 30, weight: 2, cost: 1, damageType: "P" },
  { id: "sling", name: "Honda", source: "srd", category: "simple", type: "distancia", damageSmall: "1d3", damageMedium: "1d4", critical: "x2", rangeIncrement: 50, weight: 0, cost: 0, damageType: "C" },

  // ----- Armas Marciales: cuerpo a cuerpo ligeras -----
  { id: "handaxe", name: "Hacha de Mano", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "x3", rangeIncrement: 10, weight: 3, cost: 6, damageType: "E" },
  { id: "kukri", name: "Kukri", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d3", damageMedium: "1d4", critical: "18-20/x2", weight: 2, cost: 8, damageType: "E" },
  { id: "light-hammer", name: "Martillo Ligero", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d3", damageMedium: "1d4", critical: "x2", rangeIncrement: 20, weight: 2, cost: 1, damageType: "C" },
  { id: "light-pick", name: "Pico de Guerra Ligero", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d3", damageMedium: "1d4", critical: "x4", weight: 3, cost: 4, damageType: "P" },
  { id: "sap", name: "Cachiporra", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "x2", weight: 2, cost: 1, damageType: "C" },
  { id: "short-sword", name: "Espada Corta", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "19-20/x2", weight: 2, cost: 10, damageType: "P" },

  // ----- Armas Marciales: cuerpo a cuerpo a una mano -----
  { id: "battleaxe", name: "Hacha de Batalla", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "1d8", critical: "x3", weight: 6, cost: 10, damageType: "E" },
  { id: "flail", name: "Mangual", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "1d8", critical: "x2", weight: 5, cost: 8, damageType: "C" },
  { id: "longsword", name: "Espada Larga", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "1d8", critical: "19-20/x2", weight: 4, cost: 15, damageType: "E" },
  { id: "heavy-pick", name: "Pico de Guerra Pesado", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "x4", weight: 6, cost: 8, damageType: "P" },
  { id: "rapier", name: "Estoque", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "18-20/x2", weight: 2, cost: 20, damageType: "P" },
  { id: "scimitar", name: "Cimitarra", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "18-20/x2", weight: 4, cost: 15, damageType: "E" },
  { id: "trident", name: "Tridente", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "1d8", critical: "x2", rangeIncrement: 10, weight: 4, cost: 15, damageType: "P" },
  { id: "warhammer", name: "Martillo de Guerra", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "1d8", critical: "x3", weight: 5, cost: 12, damageType: "C" },

  // ----- Armas Marciales: cuerpo a cuerpo a dos manos -----
  { id: "falchion", name: "Alfanje", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "2d4", critical: "18-20/x2", weight: 8, cost: 75, damageType: "E" },
  { id: "glaive", name: "Guja", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d8", damageMedium: "1d10", critical: "x3", weight: 10, cost: 8, damageType: "E" },
  { id: "greataxe", name: "Hacha Mayor", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d10", damageMedium: "1d12", critical: "x3", weight: 12, cost: 20, damageType: "E" },
  { id: "greatclub", name: "Garrote Mayor", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d8", damageMedium: "1d10", critical: "x2", weight: 8, cost: 5, damageType: "C" },
  { id: "heavy-flail", name: "Mayal", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d8", damageMedium: "1d10", critical: "19-20/x2", weight: 10, cost: 15, damageType: "C" },
  { id: "guisarme", name: "Guisarma", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "2d4", critical: "x3", weight: 12, cost: 9, damageType: "E" },
  { id: "halberd", name: "Alabarda", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d8", damageMedium: "1d10", critical: "x3", weight: 12, cost: 10, damageType: "P o E" },
  { id: "lance", name: "Lanza de Caballería", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "1d8", critical: "x3", weight: 10, cost: 10, damageType: "P" },
  { id: "ranseur", name: "Ranseur", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "2d4", critical: "x3", weight: 12, cost: 10, damageType: "P" },
  { id: "scythe", name: "Guadaña", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "2d4", critical: "x4", weight: 10, cost: 18, damageType: "P o E" },
  { id: "greatsword", name: "Espada a Dos Manos", source: "srd", category: "marcial", type: "cuerpo_a_cuerpo", damageSmall: "1d10", damageMedium: "2d6", critical: "19-20/x2", weight: 8, cost: 50, damageType: "E" },

  // ----- Armas Marciales: a distancia -----
  { id: "longbow", name: "Arco Largo", source: "srd", category: "marcial", type: "distancia", damageSmall: "1d6", damageMedium: "1d8", critical: "x3", rangeIncrement: 100, weight: 3, cost: 75, damageType: "P" },
  { id: "composite-longbow", name: "Arco Largo Compuesto", source: "srd", category: "marcial", type: "distancia", damageSmall: "1d6", damageMedium: "1d8", critical: "x3", rangeIncrement: 110, weight: 3, cost: 100, damageType: "P" },
  { id: "shortbow", name: "Arco Corto", source: "srd", category: "marcial", type: "distancia", damageSmall: "1d4", damageMedium: "1d6", critical: "x3", rangeIncrement: 60, weight: 2, cost: 30, damageType: "P" },
  { id: "composite-shortbow", name: "Arco Corto Compuesto", source: "srd", category: "marcial", type: "distancia", damageSmall: "1d4", damageMedium: "1d6", critical: "x3", rangeIncrement: 70, weight: 2, cost: 75, damageType: "P" },

  // ----- Armas Exóticas: cuerpo a cuerpo ligeras -----
  { id: "kama", name: "Kama", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "x2", weight: 2, cost: 2, damageType: "E" },
  { id: "nunchaku", name: "Nunchaku", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "x2", weight: 2, cost: 2, damageType: "C" },
  { id: "sai", name: "Sai", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d3", damageMedium: "1d4", critical: "x2", weight: 1, cost: 1, damageType: "C" },
  { id: "siangham", name: "Siangham", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d4", damageMedium: "1d6", critical: "x2", weight: 1, cost: 3, damageType: "P" },

  // ----- Armas Exóticas: cuerpo a cuerpo a una mano -----
  { id: "whip", name: "Látigo", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d2", damageMedium: "1d3", critical: "x2", weight: 2, cost: 1, damageType: "E" },
  { id: "spiked-chain", name: "Cadena con Pinchos", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d6", damageMedium: "2d4", critical: "x2", weight: 10, cost: 25, damageType: "P" },
  { id: "bastard-sword", name: "Espada Bastarda", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d8", damageMedium: "1d10", critical: "19-20/x2", weight: 6, cost: 35, damageType: "E" },

  // ----- Armas Exóticas: cuerpo a cuerpo a dos manos -----
  { id: "dwarven-waraxe", name: "Hacha de Guerra Enana", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d8", damageMedium: "1d10", critical: "x3", weight: 8, cost: 30, damageType: "E" },
  { id: "orc-double-axe", name: "Hacha Doble Orca", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d6/1d6", damageMedium: "1d8/1d8", critical: "x3", weight: 15, cost: 60, damageType: "E" },
  { id: "two-bladed-sword", name: "Espada de Dos Hojas", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d6/1d6", damageMedium: "1d8/1d8", critical: "19-20/x2", weight: 10, cost: 100, damageType: "E" },
  { id: "dire-flail", name: "Mangual Doble", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d6/1d6", damageMedium: "1d8/1d8", critical: "x2", weight: 10, cost: 90, damageType: "C" },
  { id: "gnome-hooked-hammer", name: "Martillo Ganchudo Gnomo", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d6/1d4", damageMedium: "1d8/1d6", critical: "x3/x4", weight: 6, cost: 20, damageType: "C y P" },
  { id: "dwarven-urgrosh", name: "Urgrosh Enano", source: "srd", category: "exotica", type: "cuerpo_a_cuerpo", damageSmall: "1d6/1d4", damageMedium: "1d8/1d6", critical: "x3", weight: 12, cost: 50, damageType: "P o E" },

  // ----- Armas Exóticas: a distancia -----
  { id: "hand-crossbow", name: "Ballesta de Mano", source: "srd", category: "exotica", type: "distancia", damageSmall: "1d3", damageMedium: "1d4", critical: "19-20/x2", rangeIncrement: 30, weight: 2, cost: 100, damageType: "P" },
  { id: "repeating-heavy-crossbow", name: "Ballesta Pesada Repetidora", source: "srd", category: "exotica", type: "distancia", damageSmall: "1d8", damageMedium: "1d10", critical: "19-20/x2", rangeIncrement: 120, weight: 12, cost: 400, damageType: "P" },
  { id: "repeating-light-crossbow", name: "Ballesta Ligera Repetidora", source: "srd", category: "exotica", type: "distancia", damageSmall: "1d6", damageMedium: "1d8", critical: "19-20/x2", rangeIncrement: 80, weight: 6, cost: 250, damageType: "P" },
  { id: "shuriken", name: "Shuriken", source: "srd", category: "exotica", type: "distancia", damageSmall: "1", damageMedium: "1d2", critical: "x2", rangeIncrement: 10, weight: 0, cost: 1, damageType: "P" },
  { id: "net", name: "Red", source: "srd", category: "exotica", type: "distancia", damageSmall: "-", damageMedium: "-", critical: "-", rangeIncrement: 10, weight: 6, cost: 20, damageType: "-" },
];

// Tabla completa de armaduras y escudos del SRD 3.5 (contenido de juego abierto).
export const SRD_ARMORS: Armor[] = [
  // ----- Armaduras Ligeras -----
  { id: "padded", name: "Armadura Acolchada", source: "srd", category: "ligera", armorBonus: 1, maxDexBonus: 8, armorCheckPenalty: 0, arcaneSpellFailure: 5, speed30: 30, speed20: 20, weight: 10, cost: 5 },
  { id: "leather", name: "Armadura de Cuero", source: "srd", category: "ligera", armorBonus: 2, maxDexBonus: 6, armorCheckPenalty: 0, arcaneSpellFailure: 10, speed30: 30, speed20: 20, weight: 15, cost: 10 },
  { id: "studded-leather", name: "Cuero Tachonado", source: "srd", category: "ligera", armorBonus: 3, maxDexBonus: 5, armorCheckPenalty: -1, arcaneSpellFailure: 15, speed30: 30, speed20: 20, weight: 20, cost: 25 },
  { id: "chain-shirt", name: "Camisote de Mallas", source: "srd", category: "ligera", armorBonus: 4, maxDexBonus: 4, armorCheckPenalty: -2, arcaneSpellFailure: 20, speed30: 30, speed20: 20, weight: 25, cost: 100 },

  // ----- Armaduras Medias -----
  { id: "hide", name: "Armadura de Pieles", source: "srd", category: "media", armorBonus: 3, maxDexBonus: 4, armorCheckPenalty: -3, arcaneSpellFailure: 20, speed30: 20, speed20: 15, weight: 25, cost: 15 },
  { id: "scale-mail", name: "Cota de Escamas", source: "srd", category: "media", armorBonus: 4, maxDexBonus: 3, armorCheckPenalty: -4, arcaneSpellFailure: 25, speed30: 20, speed20: 15, weight: 30, cost: 50 },
  { id: "chainmail", name: "Cota de Mallas", source: "srd", category: "media", armorBonus: 5, maxDexBonus: 2, armorCheckPenalty: -5, arcaneSpellFailure: 30, speed30: 20, speed20: 15, weight: 40, cost: 150 },
  { id: "breastplate", name: "Coraza", source: "srd", category: "media", armorBonus: 5, maxDexBonus: 3, armorCheckPenalty: -4, arcaneSpellFailure: 25, speed30: 20, speed20: 15, weight: 30, cost: 200 },

  // ----- Armaduras Pesadas -----
  { id: "splint-mail", name: "Armadura Laminada", source: "srd", category: "pesada", armorBonus: 6, maxDexBonus: 0, armorCheckPenalty: -7, arcaneSpellFailure: 40, speed30: 20, speed20: 15, weight: 45, cost: 200 },
  { id: "banded-mail", name: "Cota de Bandas", source: "srd", category: "pesada", armorBonus: 6, maxDexBonus: 1, armorCheckPenalty: -6, arcaneSpellFailure: 35, speed30: 20, speed20: 15, weight: 35, cost: 250 },
  { id: "half-plate", name: "Armadura de Placas y Mallas", source: "srd", category: "pesada", armorBonus: 7, maxDexBonus: 0, armorCheckPenalty: -7, arcaneSpellFailure: 40, speed30: 20, speed20: 15, weight: 50, cost: 600 },
  { id: "full-plate", name: "Armadura Completa", source: "srd", category: "pesada", armorBonus: 8, maxDexBonus: 1, armorCheckPenalty: -6, arcaneSpellFailure: 35, speed30: 20, speed20: 15, weight: 50, cost: 1500 },

  // ----- Escudos -----
  { id: "small-wooden-shield", name: "Escudo Pequeño de Madera", source: "srd", category: "escudo", armorBonus: 1, maxDexBonus: null, armorCheckPenalty: -1, arcaneSpellFailure: 5, speed30: 30, speed20: 20, weight: 5, cost: 3 },
  { id: "small-steel-shield", name: "Escudo Pequeño de Metal", source: "srd", category: "escudo", armorBonus: 1, maxDexBonus: null, armorCheckPenalty: -1, arcaneSpellFailure: 5, speed30: 30, speed20: 20, weight: 6, cost: 9 },
  { id: "large-wooden-shield", name: "Escudo Grande de Madera", source: "srd", category: "escudo", armorBonus: 2, maxDexBonus: null, armorCheckPenalty: -2, arcaneSpellFailure: 15, speed30: 30, speed20: 20, weight: 10, cost: 7 },
  { id: "large-steel-shield", name: "Escudo Grande de Metal", source: "srd", category: "escudo", armorBonus: 2, maxDexBonus: null, armorCheckPenalty: -2, arcaneSpellFailure: 15, speed30: 30, speed20: 20, weight: 15, cost: 20 },
  { id: "tower-shield", name: "Escudo Torre", source: "srd", category: "escudo", armorBonus: 4, maxDexBonus: 2, armorCheckPenalty: -10, arcaneSpellFailure: 50, speed30: 30, speed20: 20, weight: 45, cost: 30 },
];

// Equipo de aventurero núcleo del SRD 3.5 (contenido de juego abierto).
export const SRD_GEAR: GearItem[] = [
  { id: "backpack", name: "Mochila", source: "srd", cost: 2, weight: 2, description: "Permite llevar hasta el doble de la carga habitual antes de que el peso extra cuente como carga adicional." },
  { id: "bedroll", name: "Saco de Dormir", source: "srd", cost: 0.1, weight: 5, description: "Manta enrollada para dormir a la intemperie." },
  { id: "hemp-rope-50ft", name: "Cuerda de Cáñamo (15 m)", source: "srd", cost: 1, weight: 10, description: "Cuerda resistente; tiene 2 puntos de golpe y se puede romper con una prueba de Fuerza CD 23." },
  { id: "silk-rope-50ft", name: "Cuerda de Seda (15 m)", source: "srd", cost: 10, weight: 5, description: "Más ligera y resistente que el cáñamo; otorga +2 a las pruebas de Uso de Cuerdas relacionadas." },
  { id: "torch", name: "Antorcha", source: "srd", cost: 0.01, weight: 1, description: "Ilumina en un radio de 6 m durante 1 hora; también puede usarse como arma improvisada de fuego." },
  { id: "hooded-lantern", name: "Linterna Sorda", source: "srd", cost: 7, weight: 2, description: "Ilumina en un radio de 9 m; un frasco de aceite la alimenta durante 6 horas." },
  { id: "oil-flask", name: "Frasco de Aceite", source: "srd", cost: 0.1, weight: 1, description: "Combustible para lámparas y linternas; también puede arrojarse como arma improvisada de fuego." },
  { id: "trail-rations", name: "Raciones de Viaje (1 día)", source: "srd", cost: 0.5, weight: 1, description: "Comida no perecedera para un día de viaje." },
  { id: "waterskin", name: "Odre de Agua", source: "srd", cost: 1, weight: 4, description: "Recipiente de cuero para transportar agua, lleno pesa unas 4 libras." },
  { id: "thieves-tools", name: "Ganzúas", source: "srd", cost: 30, weight: 1, description: "Herramientas necesarias para las pruebas de Abrir Cerraduras." },
  { id: "thieves-tools-masterwork", name: "Ganzúas Maestras", source: "srd", cost: 100, weight: 2, description: "Herramientas de calidad superior que otorgan +2 de circunstancias a Abrir Cerraduras." },
  { id: "healers-kit", name: "Kit de Sanador", source: "srd", cost: 50, weight: 1, description: "Vendas y ungüentos para pruebas de Sanar; tiene 10 usos." },
  { id: "tent", name: "Tienda de Campaña", source: "srd", cost: 10, weight: 20, description: "Refugio de lona para una persona." },
  { id: "manacles", name: "Grilletes", source: "srd", cost: 15, weight: 2, description: "Restringen a un prisionero; CD 20 para escapar o CD 26 para romperlos." },
  { id: "manacles-masterwork", name: "Grilletes Maestros", source: "srd", cost: 50, weight: 2, description: "Grilletes de calidad superior; +2 a la CD para escapar de ellos." },
  { id: "lock-simple", name: "Cerradura Simple", source: "srd", cost: 20, weight: 1, description: "Cerradura de calidad ordinaria; CD 20 para forzarla." },
  { id: "lock-good", name: "Cerradura Buena", source: "srd", cost: 40, weight: 1, description: "Cerradura de buena calidad; CD 25 para forzarla." },
  { id: "lock-amazing", name: "Cerradura Excelente", source: "srd", cost: 80, weight: 1, description: "Cerradura de calidad excepcional; CD 30 para forzarla." },
  { id: "grappling-hook", name: "Gancho de Escalada", source: "srd", cost: 1, weight: 4, description: "Se lanza atado a una cuerda para asegurar un ascenso." },
  { id: "steel-mirror", name: "Espejo de Acero Pulido", source: "srd", cost: 10, weight: 0.5, description: "Permite ver alrededor de esquinas o evitar la mirada de criaturas peligrosas." },
  { id: "chalk", name: "Tiza (una unidad)", source: "srd", cost: 0.01, weight: 0, description: "Sirve para marcar superficies." },
  { id: "paper", name: "Papel (una hoja)", source: "srd", cost: 0.4, weight: 0, description: "Hoja de papel para escribir." },
  { id: "parchment", name: "Pergamino (una hoja)", source: "srd", cost: 0.2, weight: 0, description: "Hoja de pergamino para escribir o inscribir conjuros." },
  { id: "ink", name: "Tinta (frasco)", source: "srd", cost: 8, weight: 0, description: "Frasco de tinta negra, suficiente para muchas páginas de escritura." },
  { id: "inkpen", name: "Pluma de Escribir", source: "srd", cost: 0.1, weight: 0, description: "Pluma tallada para escribir con tinta." },
  { id: "hammer", name: "Martillo", source: "srd", cost: 0.5, weight: 2, description: "Herramienta común, útil para clavar piquetas." },
  { id: "piton", name: "Piqueta (unidad)", source: "srd", cost: 0.1, weight: 0.5, description: "Clavo metálico para asegurar cuerdas en superficies verticales." },
  { id: "signal-whistle", name: "Silbato de Señales", source: "srd", cost: 0.8, weight: 0, description: "Emite un pitido agudo para dar alarma o coordinar señales." },
  { id: "flint-and-steel", name: "Yesquero", source: "srd", cost: 1, weight: 0, description: "Pedernal y eslabón para encender fuego." },
  { id: "candle", name: "Vela", source: "srd", cost: 0.01, weight: 0, description: "Ilumina un radio de 1,5 m durante 1 hora." },
  { id: "sheet-cloth", name: "Retal de Tela (3 x 1,8 m)", source: "srd", cost: 0.1, weight: 2, description: "Lienzo de tela útil como sábana, toldo improvisado o material de camuflaje." },
  { id: "sack", name: "Saco", source: "srd", cost: 0.1, weight: 0.5, description: "Saco de tela capaz de contener hasta 1 pie cúbico de material." },
  { id: "crowbar", name: "Palanca", source: "srd", cost: 2, weight: 5, description: "Otorga +2 de circunstancias a las pruebas de Fuerza para forzar puertas o cofres." },
  { id: "shovel", name: "Pala", source: "srd", cost: 2, weight: 8, description: "Herramienta para cavar." },
  { id: "holy-symbol-wooden", name: "Símbolo Sagrado de Madera", source: "srd", cost: 1, weight: 0, description: "Foco divino tallado en madera para lanzar conjuros de clérigo o paladín." },
  { id: "holy-symbol-silver", name: "Símbolo Sagrado de Plata", source: "srd", cost: 25, weight: 1, description: "Foco divino de plata para lanzar conjuros de clérigo o paladín." },
  { id: "spell-component-pouch", name: "Bolsa de Componentes", source: "srd", cost: 5, weight: 2, description: "Contiene los componentes materiales comunes necesarios para lanzar conjuros arcanos." },
  { id: "spellbook-blank", name: "Libro de Conjuros en Blanco (100 páginas)", source: "srd", cost: 15, weight: 3, description: "Libro en blanco donde un mago inscribe los conjuros que aprende." },
  { id: "map-scroll-case", name: "Estuche para Mapas o Pergaminos", source: "srd", cost: 1, weight: 0.5, description: "Tubo de cuero o metal que protege mapas y pergaminos." },
  { id: "soap", name: "Jabón", source: "srd", cost: 0.5, weight: 1, description: "Barra de jabón para el aseo personal." },
  { id: "fishhook", name: "Anzuelo", source: "srd", cost: 0.1, weight: 0, description: "Anzuelo de metal para pescar." },
  { id: "iron-pot", name: "Olla de Hierro", source: "srd", cost: 0.8, weight: 5, description: "Olla para cocinar sobre una fogata." },
];
