import { getEnabledClasses, getEnabledSpells } from "../../data";
import type { StepProps } from "./types";
import { applyRacialAdjustments, spellsPerDayForClassLevel } from "../../engine/derive";
import { findRace } from "../../data";

export default function StepSpells({ character, onChange }: StepProps) {
  const classes = getEnabledClasses(character.activeSourceBooks);
  const spells = getEnabledSpells(character.activeSourceBooks);
  const race = findRace(character.raceId);
  const finalScores = applyRacialAdjustments(character.abilityScores, race);

  const casterClassLevels = character.classLevels.filter((cl) => {
    const def = classes.find((c) => c.id === cl.classId);
    return def?.spellcasting && cl.level >= (def.spellcasting.startLevel ?? 1);
  });

  if (casterClassLevels.length === 0) {
    return (
      <div>
        <h2>Conjuros</h2>
        <p className="muted">Ninguna de las clases seleccionadas lanza conjuros a este nivel.</p>
      </div>
    );
  }

  function toggleSpell(classId: string, spellId: string, level: number) {
    onChange((c) => {
      const exists = c.spells.some((s) => s.classId === classId && s.spellId === spellId);
      return {
        ...c,
        spells: exists
          ? c.spells.filter((s) => !(s.classId === classId && s.spellId === spellId))
          : [...c.spells, { classId, spellId, level }],
      };
    });
  }

  return (
    <div>
      <h2>Conjuros</h2>
      {casterClassLevels.map((cl) => {
        const def = classes.find((c) => c.id === cl.classId)!;
        const perDay = spellsPerDayForClassLevel(def, cl.level, finalScores);
        const selectedForClass = character.spells.filter((s) => s.classId === cl.classId);
        return (
          <div className="card" key={cl.classId}>
            <h3>
              {def.name} (nivel de clase {cl.level}) — {def.spellcasting?.type}
            </h3>
            {perDay && (
              <p className="muted">
                Conjuros por día: {perDay.map((n, i) => `Nv.${i}: ${n}`).join(" · ")}
              </p>
            )}
            {Array.from({ length: (def.spellcasting?.maxSpellLevel ?? 0) + 1 }).map((_, spellLevel) => {
              const options = spells.filter((sp) => sp.levelByClass[cl.classId] === spellLevel);
              if (options.length === 0) return null;
              const selectedCount = selectedForClass.filter((s) => s.level === spellLevel).length;
              return (
                <div key={spellLevel} style={{ marginBottom: 10 }}>
                  <strong>Nivel {spellLevel}</strong>{" "}
                  <span className="muted">({selectedCount} seleccionados)</span>
                  <div className="grid grid-3">
                    {options.map((sp) => {
                      const selected = character.spells.some(
                        (s) => s.classId === cl.classId && s.spellId === sp.id,
                      );
                      return (
                        <label
                          key={sp.id}
                          className={`tag`}
                          style={{
                            cursor: "pointer",
                            background: selected ? "var(--accent)" : undefined,
                            color: selected ? "white" : undefined,
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{ marginRight: 4 }}
                            checked={selected}
                            onChange={() => toggleSpell(cl.classId, sp.id, spellLevel)}
                          />
                          {sp.name}
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
