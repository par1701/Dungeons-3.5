import type { Character } from "../../types";

export interface StepProps {
  character: Character;
  onChange: (updater: (c: Character) => Character) => void;
}
