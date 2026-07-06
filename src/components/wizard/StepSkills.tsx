import { useState } from "react";
import { getEnabledClasses, getEnabledSkills } from "../../data";
import type { StepProps } from "./types";
import {
  abilityModifier,
  applyRacialAdjustments,
  computeTotalSkillPoints,
  isHumanRace,
  makeSkillKey,
  parseSkillKey,
  totalCharacterLevel,
} from "../../engine/derive";
import { findRace } from "../../data";

export default function StepSkills({ character, onChange }: StepProps) {
  const [newSpecialization, setNewSpecialization] = useState<Record<string, string>>({});
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

  const spentPoints = Object.entries(character.skillRanks).reduce((sum, [key, ranks]) => {
    const { skillId } = parseSkillKey(key);
    const isClassSkill = classSkillIds.has(skillId);
    return sum + ranks * (isClassSkill ? 1 : 2);
  }, 0);

  function setRank(key: string, ranks: number) {
    onChange((c) => ({ ...c, skillRanks: { ...c.skillRanks, [key]: Math.max(0, ranks) } }));
  }

  function removeSpecialization(key: string) {
    onChange((c) => {
      const next = { ...c.skillRanks };
      delete next[key];
      return { ...c, skillRanks: next };
    });
  }

  function addSpecialization(skillId: string) {
    const label = (newSpecialization[skillId] ?? "").trim();
    if (!label) return;
    const key = makeSkillKey(skillId, label);
    onChange((c) => ({ ...c, skillRanks: { ...c.skillRanks, [key]: c.skillRanks[key] ?? 1 } }));
    setNewSpecialization((prev) => ({ ...prev, [skillId]: "" }));
  }

  const maxClassRank = level + 3;
  const maxCrossClassRank = Math.floor((level + 3) / 2);

  const regularSkills = skills.filter((s) => !s.requiresSpecialization);
  const specializedSkills = skills.filter((s) => s.requiresSpecialization);

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
          {regularSkills.map((skill) => {
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

      <h3 style={{ marginTop: 20 }}>Habilidades con especialización</h3>
      <p className="muted">
        Oficio, Profesión e Interpretar exigen elegir una especialidad libre (ej. "Herrería", "Marinero", "Danza") y
        pueden tomarse varias veces, cada una con sus propios rangos.
      </p>
      {specializedSkills.map((skill) => {
        const isClassSkill = classSkillIds.has(skill.id);
        const max = isClassSkill ? maxClassRank : maxCrossClassRank;
        const mod = abilityModifier(finalScores[skill.keyAbility]);
        const entries = Object.keys(character.skillRanks)
          .map((key) => ({ key, ...parseSkillKey(key) }))
          .filter((e) => e.skillId === skill.id && e.specialization);

        return (
          <div className="card" key={skill.id}>
            <h4 style={{ margin: "0 0 8px" }}>
              {skill.name} ({skill.keyAbility.toUpperCase()}) {skill.trainedOnly && <span className="tag">Entrenada</span>}
            </h4>
            {entries.length === 0 && <p className="muted">Sin especialidades añadidas todavía.</p>}
            {entries.map(({ key, specialization }) => {
              const ranks = character.skillRanks[key] ?? 0;
              return (
                <div key={key} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                  <strong style={{ minWidth: 160 }}>
                    {skill.name} ({specialization})
                  </strong>
                  <input
                    type="number"
                    min={0}
                    max={max}
                    style={{ width: 64 }}
                    value={ranks}
                    onChange={(e) => setRank(key, Number(e.target.value))}
                  />
                  <span className="muted">
                    Mod. {mod >= 0 ? `+${mod}` : mod} · Total {ranks + mod}
                  </span>
                  <button className="btn btn-danger" onClick={() => removeSpecialization(key)}>
                    Quitar
                  </button>
                </div>
              );
            })}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input
                placeholder="Nueva especialidad (ej. Herrería)"
                value={newSpecialization[skill.id] ?? ""}
                onChange={(e) => setNewSpecialization((prev) => ({ ...prev, [skill.id]: e.target.value }))}
              />
              <button className="btn" onClick={() => addSpecialization(skill.id)}>
                + Añadir especialidad
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
