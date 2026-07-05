import { getEnabledClasses, getEnabledSkills } from "../../data";
import type { StepProps } from "./types";
import { abilityModifier, applyRacialAdjustments, computeTotalSkillPoints, isHumanRace, totalCharacterLevel } from "../../engine/derive";
import { findRace } from "../../data";

export default function StepSkills({ character, onChange }: StepProps) {
  const classes = getEnabledClasses(character.activeSourceBooks);
  const skills = getEnabledSkills(character.activeSourceBooks);
  const race = findRace(character.raceId);
  const finalScores = applyRacialAdjustments(character.abilityScores, race);
  const level = totalCharacterLevel(character.classLevels);

  const classSkillIds = new Set(
    character.classLevels.flatMap((cl) => classes.find((c) => c.id === cl.classId)?.classSkills ?? []),
  );

  const totalPoints = computeTotalSkillPoints(
    character.classLevels,
    classes,
    character.abilityScores.int,
    isHumanRace(race),
  );

  const spentPoints = Object.entries(character.skillRanks).reduce((sum, [skillId, ranks]) => {
    const isClassSkill = classSkillIds.has(skillId);
    return sum + ranks * (isClassSkill ? 1 : 2);
  }, 0);

  function setRank(skillId: string, ranks: number) {
    onChange((c) => ({ ...c, skillRanks: { ...c.skillRanks, [skillId]: Math.max(0, ranks) } }));
  }

  const maxClassRank = level + 3;
  const maxCrossClassRank = Math.floor((level + 3) / 2);

  return (
    <div>
      <h2>Habilidades</h2>
      <p className={spentPoints > totalPoints ? "" : "muted"} style={spentPoints > totalPoints ? { color: "var(--danger)" } : {}}>
        Puntos de habilidad gastados: {spentPoints} / {totalPoints}
      </p>
      <table className="data-table">
        <thead>
          <tr>
            <th>Habilidad</th>
            <th>Clave</th>
            <th>Clase</th>
            <th>Rangos</th>
            <th>Mod. característica</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => {
            const isClassSkill = classSkillIds.has(skill.id);
            const ranks = character.skillRanks[skill.id] ?? 0;
            const mod = abilityModifier(finalScores[skill.keyAbility]);
            const max = isClassSkill ? maxClassRank : maxCrossClassRank;
            return (
              <tr key={skill.id}>
                <td>
                  {skill.name} {skill.trainedOnly && <span className="tag">Entrenada</span>}
                </td>
                <td>{skill.keyAbility.toUpperCase()}</td>
                <td>{isClassSkill ? "Sí" : "No"}</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    max={max}
                    style={{ width: 64 }}
                    value={ranks}
                    onChange={(e) => setRank(skill.id, Number(e.target.value))}
                  />
                </td>
                <td>{mod >= 0 ? `+${mod}` : mod}</td>
                <td>{ranks + mod}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
