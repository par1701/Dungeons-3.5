import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCharacterStore, createBlankCharacter } from "../store/characterStore";
import type { Character } from "../types";
import StepRules from "../components/wizard/StepRules";
import StepRace from "../components/wizard/StepRace";
import StepClass from "../components/wizard/StepClass";
import StepAbilities from "../components/wizard/StepAbilities";
import StepSkills from "../components/wizard/StepSkills";
import StepFeats from "../components/wizard/StepFeats";
import StepSpells from "../components/wizard/StepSpells";
import StepPowers from "../components/wizard/StepPowers";
import StepCompanions from "../components/wizard/StepCompanions";
import StepEquipment from "../components/wizard/StepEquipment";
import StepDetails from "../components/wizard/StepDetails";

const STEPS = [
  { id: "reglas", label: "Reglas", Component: StepRules },
  { id: "raza", label: "Raza", Component: StepRace },
  { id: "clase", label: "Clase", Component: StepClass },
  { id: "caracteristicas", label: "Características", Component: StepAbilities },
  { id: "habilidades", label: "Habilidades", Component: StepSkills },
  { id: "dotes", label: "Dotes", Component: StepFeats },
  { id: "conjuros", label: "Conjuros", Component: StepSpells },
  { id: "poderes", label: "Poderes psiónicos", Component: StepPowers },
  { id: "companeros", label: "Compañeros", Component: StepCompanions },
  { id: "equipo", label: "Equipo", Component: StepEquipment },
  { id: "detalles", label: "Detalles", Component: StepDetails },
] as const;

export default function CharacterWizardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = useCharacterStore((s) => (id ? s.getCharacter(id) : undefined));
  const addCharacter = useCharacterStore((s) => s.addCharacter);
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  const [draft, setDraft] = useState<Character>(() => existing ?? createBlankCharacter());
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (existing) setDraft(existing);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo debe resincronizar al cambiar de personaje, no en cada edición
  }, [existing?.id]);

  const isEditing = Boolean(id);

  const handleChange = (updater: (c: Character) => Character) => {
    setDraft((prev) => updater(prev));
  };

  function handleSave() {
    if (isEditing && id) {
      updateCharacter(id, () => draft);
    } else {
      addCharacter(draft);
    }
    navigate(`/personajes/${draft.id}/hoja`);
  }

  const Step = useMemo(() => STEPS[stepIndex].Component, [stepIndex]);

  return (
    <div>
      <h1>{isEditing ? `Editando: ${draft.name}` : "Crear personaje"}</h1>
      <div className="wizard-steps no-print">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            className={`wizard-step-pill ${i === stepIndex ? "active" : i < stepIndex ? "done" : ""}`}
            onClick={() => setStepIndex(i)}
          >
            {i + 1}. {s.label}
          </button>
        ))}
      </div>

      <div className="card">
        <Step character={draft} onChange={handleChange} />
      </div>

      <div className="wizard-actions no-print">
        <button className="btn" disabled={stepIndex === 0} onClick={() => setStepIndex((i) => Math.max(0, i - 1))}>
          ← Anterior
        </button>
        {stepIndex < STEPS.length - 1 ? (
          <button className="btn btn-primary" onClick={() => setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))}>
            Siguiente →
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleSave}>
            Guardar personaje
          </button>
        )}
      </div>
    </div>
  );
}
