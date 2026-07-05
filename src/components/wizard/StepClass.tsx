import { getEnabledClasses } from "../../data";
import type { StepProps } from "./types";

export default function StepClass({ character, onChange }: StepProps) {
  const classes = getEnabledClasses(character.activeSourceBooks).filter((c) => !c.isPrestige);

  function setLevel(classId: string, level: number) {
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
      return { ...c, classLevels: [...c.classLevels, { classId, level }] };
    });
  }

  const totalLevel = character.classLevels.reduce((sum, cl) => sum + cl.level, 0);

  return (
    <div>
      <h2>Clase(s)</h2>
      <p className="muted">
        Elige una clase, o combina varias para un personaje multiclase. Nivel total actual:{" "}
        <strong>{totalLevel}</strong>
      </p>
      <div className="grid grid-2">
        {classes.map((cls) => {
          const current = character.classLevels.find((cl) => cl.classId === cls.id);
          return (
            <div key={cls.id} className={`card ${current ? "selected" : ""}`}>
              <h3>{cls.name}</h3>
              <p className="muted">{cls.description}</p>
              <div style={{ marginBottom: 8 }}>
                <span className="tag">Dado {`d${cls.hitDie}`}</span>
                <span className="tag">BAB {cls.babProgression.replace("_", " ")}</span>
                <span className="tag">{cls.skillPointsPerLevel} hab./nivel</span>
                {cls.spellcasting && <span className="tag">Lanza conjuros ({cls.spellcasting.type})</span>}
              </div>
              <div className="form-row" style={{ maxWidth: 160 }}>
                <label>Niveles en esta clase</label>
                <input
                  type="number"
                  min={0}
                  max={cls.maxLevel}
                  value={current?.level ?? 0}
                  onChange={(e) => setLevel(cls.id, Math.max(0, Math.min(cls.maxLevel, Number(e.target.value))))}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
