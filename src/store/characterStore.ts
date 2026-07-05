import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Character } from "../types";

function generateId(): string {
  return `pj-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createBlankCharacter(overrides?: Partial<Character>): Character {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    name: "Nuevo personaje",
    playerName: "",
    alignment: "Neutral",
    deity: "",
    age: 20,
    gender: "",
    height: "",
    weight: "",
    raceId: "human",
    classLevels: [],
    abilityScores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    abilityGenerationMethod: "compra_puntos",
    skillRanks: {},
    feats: [],
    spells: [],
    equipment: [],
    gold: 0,
    hpRolls: [],
    notes: "",
    activeSourceBooks: ["srd"],
    activeVariantRules: ["vr-ability-point-buy", "vr-multiclass-xp-penalty", "vr-max-hp-first-level"],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

interface CharacterStoreState {
  characters: Character[];
  addCharacter: (character: Character) => void;
  updateCharacter: (id: string, updater: (c: Character) => Character) => void;
  deleteCharacter: (id: string) => void;
  getCharacter: (id: string) => Character | undefined;
  importCharacter: (json: string) => { ok: true; character: Character } | { ok: false; error: string };
  exportCharacter: (id: string) => string | null;
}

export const useCharacterStore = create<CharacterStoreState>()(
  persist(
    (set, get) => ({
      characters: [],
      addCharacter: (character) =>
        set((state) => ({ characters: [...state.characters, character] })),
      updateCharacter: (id, updater) =>
        set((state) => ({
          characters: state.characters.map((c) =>
            c.id === id ? { ...updater(c), updatedAt: new Date().toISOString() } : c,
          ),
        })),
      deleteCharacter: (id) =>
        set((state) => ({ characters: state.characters.filter((c) => c.id !== id) })),
      getCharacter: (id) => get().characters.find((c) => c.id === id),
      exportCharacter: (id) => {
        const character = get().characters.find((c) => c.id === id);
        if (!character) return null;
        return JSON.stringify(character, null, 2);
      },
      importCharacter: (json) => {
        try {
          const parsed = JSON.parse(json);
          if (!parsed || typeof parsed !== "object" || !parsed.raceId || !Array.isArray(parsed.classLevels)) {
            return { ok: false, error: "El archivo no tiene el formato de personaje esperado." };
          }
          const character: Character = {
            ...createBlankCharacter(),
            ...parsed,
            id: generateId(),
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({ characters: [...state.characters, character] }));
          return { ok: true, character };
        } catch {
          return { ok: false, error: "No se pudo interpretar el archivo como JSON válido." };
        }
      },
    }),
    { name: "dnd35-characters" },
  ),
);
