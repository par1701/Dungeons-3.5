import { findRace, getEnabledClasses } from "../../data";
import type { StepProps } from "./types";
import type { ClassDef, FeatPrereqContext } from "../../types";
import { applyRacialAdjustments, computeBabTotal, totalCharacterLevel } from "../../engine/derive";

export default function StepClass({ character, onChange }: StepProps) {
  const allClasses = getEnabledClasses(character.activeSourceBooks);
  const baseClasses = allClasses.filter((c) => !c.isPrestige);
  const prestigeClasses = allClasses.filter((c) => c.isPrestige);
  const race = findRace(character.raceId);
  const finalScores = applyRacialAdjustments(character.abilityScores, race);

  function setLevel(classId: string, level: number, maxLevel: number) {
    onChange((c) => {
      const existing = c.classLevels.find((cl) => cl.classId === classId);
      if (level <= 0) {
        return { ...c, classLevels: c.classLevels.filter((cl) => cl.classId !== classId) };
      }
      if (existing) {
        return {
          ...c,
          classLevels: c.classLevels.map((cl) => (cl.classId === classId ? { ...cl, level } : cl)),
        };
      }
      return { ...c, classLevels: [...c.classLevels, { classId, level: Math.min(level, maxLevel) }] };
    });
  }

  const totalLevel = totalCharacterLevel(character.classLevels);

  const ctx: FeatPrereqContext = {
    abilityScores: finalScores,
    babTotal: computeBabTotal(character.classLevels, allClasses),
    classLevels: Object.fromEntries(character.classLevels.map((cl) => [cl.classId, cl.level])),
    totalCharacterLevel: totalLevel,
    featIds: new Set(character.feats.map((f) => f.featId)),
    skillRanks: character.skillRanks,
    casterLevel: totalLevel,
  };

  function renderClassCard(cls: ClassDef, unmet: string[] = []) {
    const current = character.classLevels.find((cl) => cl.classId === cls.id);
    return (
      <div key={cls.id} className={`card ${current ? "selected" : ""}`}>
        <h3>
          {cls.name} {cls.source !== "srd" && <span className="tag">{cls.source}</span>}
        </h3>
        <p className="muted">{cls.description}</p>
        <div style={{ marginBottom: 8 }}>
          <span className="tag">Dado {`d${cls.hitDie}`}</span>
          <span className="tag">BAB {cls.babProgression.replace("_", " ")}</span>
          <span className="tag">{cls.skillPointsPerLevel} hab./nivel</span>
          {cls.spellcasting && <span className="tag">Lanza conjuros ({cls.spellcasting.type})</span>}
        </div>
        {cls.prerequisites && cls.prerequisites.length > 0 && (
          <div className="muted">Requisitos: {cls.prerequisites.map((p) => p.description).join("; ")}</div>
        )}
        {unmet.length > 0 && (
          <div style={{ color: "var(--danger)", fontSize: "0.85rem" }}>⚠ No cumple: {unmet.join("; ")}</div>
        )}
        <div className="form-row" style={{ maxWidth: 160 }}>
          <label>Niveles en esta clase</label>
          <input
            type="number"
            min={0}
            max={cls.maxLevel}
            value={current?.level ?? 0}
            onChange={(e) => setLevel(cls.id, Math.max(0, Math.min(cls.maxLevel, Number(e.target.value))), cls.maxLevel)}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Clase(s)</h2>
      <p className="muted">
        Elige una clase, o combina varias para un personaje multiclase. Nivel total actual:{" "}
        <strong>{totalLevel}</strong>
      </p>
      <div className="grid grid-2">{baseClasses.map((cls) => renderClassCard(cls))}</div>

      {prestigeClasses.length > 0 && (
        <>
          <h2 style={{ marginTop: 24 }}>Clases de prestigio</h2>
          <p className="muted">Requieren cumplir ciertos requisitos antes de poder entrar en ellas.</p>
          <div className="grid grid-2">
            {prestigeClasses.map((cls) => {
              const unmet = (cls.prerequisites ?? []).filter((p) => p.check && !p.check(ctx)).map((p) => p.description);
              return renderClassCard(cls, unmet);
            })}
          </div>
        </>
      )}
    </div>
  );
}
