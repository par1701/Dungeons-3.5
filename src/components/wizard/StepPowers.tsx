import { getEnabledClasses, getEnabledPowers, findRace } from "../../data";
import type { StepProps } from "./types";
import { applyRacialAdjustments, powerPointsForClassLevel } from "../../engine/derive";

function reachableMaxLevel(powersKnownRow: number[] | undefined, fallbackMax: number): number {
  if (!powersKnownRow) return fallbackMax;
  for (let lvl = powersKnownRow.length - 1; lvl >= 0; lvl--) {
    if (powersKnownRow[lvl] > 0) return lvl;
  }
  return 0;
}

export default function StepPowers({ character, onChange }: StepProps) {
  const classes = getEnabledClasses(character.activeSourceBooks);
  const powers = getEnabledPowers(character.activeSourceBooks);
  const race = findRace(character.raceId);
  const finalScores = applyRacialAdjustments(character.abilityScores, race);

  const manifesterClassLevels = character.classLevels.filter((cl) => {
    const def = classes.find((c) => c.id === cl.classId);
    return def?.manifesting && cl.level >= (def.manifesting.startLevel ?? 1);
  });

  if (manifesterClassLevels.length === 0) {
    return (
      <div>
        <h2>Poderes psiónicos</h2>
        <p className="muted">Ninguna de las clases seleccionadas manifiesta poderes psiónicos a este nivel.</p>
      </div>
    );
  }

  function togglePower(classId: string, powerId: string, level: number) {
    onChange((c) => {
      const exists = c.powers.some((p) => p.classId === classId && p.powerId === powerId);
      return {
        ...c,
        powers: exists
          ? c.powers.filter((p) => !(p.classId === classId && p.powerId === powerId))
          : [...c.powers, { classId, powerId, level }],
      };
    });
  }

  return (
    <div>
      <h2>Poderes psiónicos</h2>
      {manifesterClassLevels.map((cl) => {
        const def = classes.find((c) => c.id === cl.classId)!;
        const manifesting = def.manifesting!;
        const powerPoints = powerPointsForClassLevel(def, cl.level, finalScores);
        const powersKnownRow = manifesting.powersKnown[cl.level];
        const maxLevel = reachableMaxLevel(powersKnownRow, manifesting.maxPowerLevel);
        const selectedForClass = character.powers.filter((p) => p.classId === cl.classId);

        return (
          <div className="card" key={cl.classId}>
            <h3>
              {def.name} (nivel de clase {cl.level})
            </h3>
            {powerPoints !== null && <p className="muted">Puntos de poder por día: {powerPoints}</p>}
            {Array.from({ length: maxLevel + 1 }).map((_, powerLevel) => {
              const options = powers.filter((p) => p.levelByClass[cl.classId] === powerLevel);
              if (options.length === 0) return null;
              const knownAtLevel = powersKnownRow?.[powerLevel] ?? 0;
              const selectedCount = selectedForClass.filter((p) => p.level === powerLevel).length;
              return (
                <div key={powerLevel} style={{ marginBottom: 10 }}>
                  <strong>Nivel {powerLevel}</strong>{" "}
                  <span className="muted">
                    ({selectedCount}
                    {knownAtLevel > 0 ? ` / ${knownAtLevel} conocidos` : " seleccionados"})
                  </span>
                  <div className="grid grid-3">
                    {options.map((power) => {
                      const selected = character.powers.some(
                        (p) => p.classId === cl.classId && p.powerId === power.id,
                      );
                      return (
                        <label
                          key={power.id}
                          className="tag"
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
                            onChange={() => togglePower(cl.classId, power.id, powerLevel)}
                          />
                          {power.name}
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
