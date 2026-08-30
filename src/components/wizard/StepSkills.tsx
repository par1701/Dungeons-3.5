import { useState } from "react";
import { getEnabledClasses, getEnabledSkills } from "../../data";
import type { StepProps } from "./types";
import {
  abilityModifier,
  computeFeatSkillBonus,
  computeFinalAbilityScores,
  computeTotalSkillPoints,
  getBonusFeatsFromClasses,
  isHumanRace,
  makeSkillKey,
  parseSkillKey,
  totalCharacterLevel,
} from "../../engine/derive";
import { findRace } from "../../data";
import type { Skill } from "../../types";

export default function StepSkills({ character, onChange }: StepProps) {
  const [newSpecialization, setNewSpecialization] = useState<Record<string, string>>({});
  const classes = getEnabledClasses(character.activeSourceBooks);
  const skills = getEnabledSkills(character.activeSourceBooks);
  const race = findRace(character.raceId);
  const finalScores = computeFinalAbilityScores(character.abilityScores, race, character.equipment);
  const level = totalCharacterLevel(character.classLevels);

  // Unión de las listas de habilidades de clase de todas las clases del personaje: según el SRD, una habilidad es
  // "de clase" para el personaje (cuesta 1 punto/rango) si lo es para CUALQUIERA de sus clases, sin importar en
  // qué nivel se ganaron los puntos gastados en ella.
  const classSkillIds = new Set(
    character.classLevels.flatMap((cl) => classes.find((c) => c.id === cl.classId)?.classSkills ?? []),
  );

  const bonusFeats = getBonusFeatsFromClasses(character.classLevels, classes, character.classFeatureChoices ?? [], character.activeVariantRules);

  const totalPoints = computeTotalSkillPoints(
    character.classLevels,
    classes,
    finalScores.int,
    isHumanRace(race),
    character.bonusSkillPoints,
    race,
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

  // Clases del personaje, en el orden en que se añadieron (sin repetir), para agrupar la tabla por clase.
  const classIdsInOrder: string[] = [];
  for (const cl of character.classLevels) {
    if (!classIdsInOrder.includes(cl.classId)) classIdsInOrder.push(cl.classId);
  }
  const classesInOrder = classIdsInOrder
    .map((id) => classes.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // Para cada habilidad de clase, qué clases del personaje la favorecen (para la nota "también es de clase para...").
  const classSkillOwnerNames = new Map<string, string[]>();
  for (const cls of classesInOrder) {
    for (const skillId of cls.classSkills) {
      const owners = classSkillOwnerNames.get(skillId) ?? [];
      owners.push(cls.name);
      classSkillOwnerNames.set(skillId, owners);
    }
  }

  // Reparte cada habilidad en el bloque de la primera clase (por orden de adquisición) que la tenga como propia;
  // el resto queda en el bloque final de habilidades transclase para todas las clases del personaje. El coste en
  // puntos y el rango máximo no dependen de este agrupamiento visual, solo de `classSkillIds` (la unión de arriba).
  const assignedSkillIds = new Set<string>();
  type SkillGroup = { label: string; note?: string; regular: Skill[]; specialized: Skill[] };
  const groups: SkillGroup[] = [];
  for (const cls of classesInOrder) {
    const regular = regularSkills.filter((s) => cls.classSkills.includes(s.id) && !assignedSkillIds.has(s.id));
    const specialized = specializedSkills.filter((s) => cls.classSkills.includes(s.id) && !assignedSkillIds.has(s.id));
    regular.forEach((s) => assignedSkillIds.add(s.id));
    specialized.forEach((s) => assignedSkillIds.add(s.id));
    if (regular.length > 0 || specialized.length > 0) {
      groups.push({ label: `Habilidades de clase: ${cls.name}`, regular, specialized });
    }
  }
  const leftoverRegular = regularSkills.filter((s) => !assignedSkillIds.has(s.id));
  const leftoverSpecialized = specializedSkills.filter((s) => !assignedSkillIds.has(s.id));
  if (leftoverRegular.length > 0 || leftoverSpecialized.length > 0) {
    groups.push({
      label: classesInOrder.length > 0 ? "Habilidades transclase" : "Todas las habilidades",
      note: classesInOrder.length > 0 ? "No son de clase para ninguna de tus clases actuales: cuestan el doble." : undefined,
      regular: leftoverRegular,
      specialized: leftoverSpecialized,
    });
  }

  function renderRegularSkillTable(regular: Skill[], groupLabel: string) {
    if (regular.length === 0) return null;
    return (
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
          {regular.map((skill) => {
            const isClassSkill = classSkillIds.has(skill.id);
            const ranks = character.skillRanks[skill.id] ?? 0;
            const mod = abilityModifier(finalScores[skill.keyAbility]);
            const featBonus = computeFeatSkillBonus(skill.id, character.feats, bonusFeats);
            const max = isClassSkill ? maxClassRank : maxCrossClassRank;
            const otherOwners = (classSkillOwnerNames.get(skill.id) ?? []).filter((n) => `Habilidades de clase: ${n}` !== groupLabel);
            return (
              <tr key={skill.id}>
                <td>
                  {skill.name} {skill.trainedOnly && <span className="tag">Entrenada</span>}
                  {otherOwners.length > 0 && (
                    <div className="muted" style={{ fontSize: "0.78rem" }}>
                      también de clase para: {otherOwners.join(", ")}
                    </div>
                  )}
                  {featBonus > 0 && (
                    <div className="muted" style={{ fontSize: "0.78rem" }}>
                      +{featBonus} de competencia por dote (incluido en el total)
                    </div>
                  )}
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
                <td>{ranks + mod + featBonus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  function renderSpecializedSkillCards(specialized: Skill[]) {
    return specialized.map((skill) => {
      const isClassSkill = classSkillIds.has(skill.id);
      const max = isClassSkill ? maxClassRank : maxCrossClassRank;
      const mod = abilityModifier(finalScores[skill.keyAbility]);
      const featBonus = computeFeatSkillBonus(skill.id, character.feats, bonusFeats);
      const entries = Object.keys(character.skillRanks)
        .map((key) => ({ key, ...parseSkillKey(key) }))
        .filter((e) => e.skillId === skill.id && e.specialization);

      return (
        <div className="card" key={skill.id}>
          <h4 style={{ margin: "0 0 8px" }}>
            {skill.name} ({skill.keyAbility.toUpperCase()}) {skill.trainedOnly && <span className="tag">Entrenada</span>} ·{" "}
            {isClassSkill ? "de clase" : "transclase"}
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
                  Mod. {mod >= 0 ? `+${mod}` : mod}
                  {featBonus > 0 ? ` + ${featBonus} dote` : ""} · Total {ranks + mod + featBonus}
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
    });
  }

  return (
    <div>
      <h2>Habilidades</h2>
      <p className={spentPoints > totalPoints ? "" : "muted"} style={spentPoints > totalPoints ? { color: "var(--danger)" } : {}}>
        Puntos de habilidad gastados: {spentPoints} / {totalPoints}
      </p>
      <p className="muted">
        Agrupadas por la clase que las favorece. Los rangos y el coste son compartidos por todo el personaje: una
        habilidad cuesta 1 punto/rango si es de clase para cualquiera de tus clases, y 2 si no lo es para ninguna.
      </p>
      <p className="muted">
        Oficio, Profesión e Interpretar exigen elegir una especialidad libre (ej. "Herrería", "Marinero", "Danza") y
        pueden tomarse varias veces, cada una con sus propios rangos.
      </p>

      {groups.map((group) => (
        <div key={group.label} style={{ marginTop: 20 }}>
          <h3>{group.label}</h3>
          {group.note && <p className="muted">{group.note}</p>}
          {renderRegularSkillTable(group.regular, group.label)}
          {group.specialized.length > 0 && (
            <>
              {group.regular.length > 0 && <div style={{ height: 8 }} />}
              {renderSpecializedSkillCards(group.specialized)}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
