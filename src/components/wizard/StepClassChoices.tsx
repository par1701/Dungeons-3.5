import { findFeat, findRace, getEnabledClasses, getEnabledFeats } from "../../data";
import type { StepProps } from "./types";
import {
  computeBabTotal,
  computeFinalAbilityScores,
  findChoiceValue,
  flattenSkillRanksForPrereqs,
  getAllKnownFeatIds,
  getUnlockedClassFeatureChoices,
  totalCharacterLevel,
} from "../../engine/derive";
import type { ClassFeatureChoice, FeatPrereqContext } from "../../types";

/** Busca el valor de una elección de la misma clase sin importar el nivel (para elecciones únicas de las que dependen otras, p.ej. estilo de combate). */
function findAnyChoiceValue(
  choices: { classId: string; choiceId: string; value: string }[],
  classId: string,
  choiceId: string,
): string | undefined {
  return choices.find((c) => c.classId === classId && c.choiceId === choiceId)?.value;
}

function featOptionsFor(
  choice: ClassFeatureChoice,
  classId: string,
  classFeatureChoices: { classId: string; choiceId: string; value: string }[],
): string[] {
  if (choice.featOptionsByDependency) {
    const { dependsOn, options } = choice.featOptionsByDependency;
    const dependencyValue = findAnyChoiceValue(classFeatureChoices, classId, dependsOn);
    return dependencyValue ? (options[dependencyValue] ?? []) : [];
  }
  return choice.featOptionIds ?? [];
}

export default function StepClassChoices({ character, onChange }: StepProps) {
  const classes = getEnabledClasses(character.activeSourceBooks);
  const unlocked = getUnlockedClassFeatureChoices(character.classLevels, classes, character.activeVariantRules);
  const classFeatureChoices = character.classFeatureChoices ?? [];

  const race = findRace(character.raceId);
  const finalScores = computeFinalAbilityScores(character.abilityScores, race, character.equipment);
  const totalLevel = totalCharacterLevel(character.classLevels);
  const ctx: FeatPrereqContext = {
    abilityScores: finalScores,
    babTotal: computeBabTotal(character.classLevels, classes),
    classLevels: Object.fromEntries(character.classLevels.map((cl) => [cl.classId, cl.level])),
    totalCharacterLevel: totalLevel,
    featIds: getAllKnownFeatIds(character.feats, character.classLevels, classes, classFeatureChoices, character.activeVariantRules),
    skillRanks: flattenSkillRanksForPrereqs(character.skillRanks),
    casterLevel: totalLevel,
  };
  const allFeats = getEnabledFeats(character.activeSourceBooks);

  /** Dotes de una categoría (tipo) dada que el personaje ya cumple, para "dote_categoria" (a diferencia de "dote_restringida", aquí no se waivean los prerrequisitos). */
  function categoryFeatOptions(choice: ClassFeatureChoice): string[] {
    const categories = choice.featCategoryOptions ?? [];
    return allFeats
      .filter((f) => f.types.some((t) => categories.includes(t)))
      .filter((f) => f.prerequisites.every((p) => !p.check || p.check(ctx)))
      .sort((a, b) => a.name.localeCompare(b.name, "es"))
      .map((f) => f.id);
  }

  function setChoice(classId: string, choiceId: string, level: number, value: string) {
    onChange((c) => {
      const existing = c.classFeatureChoices ?? [];
      const idx = existing.findIndex(
        (cc) => cc.classId === classId && cc.choiceId === choiceId && cc.level === level,
      );
      const next = [...existing];
      if (idx >= 0) next[idx] = { ...next[idx], value };
      else next.push({ classId, choiceId, level, value });
      return { ...c, classFeatureChoices: next };
    });
  }

  if (unlocked.length === 0) {
    return (
      <div>
        <h2>Elecciones de clase</h2>
        <p className="muted">Ninguna de las clases seleccionadas tiene elecciones propias que hacer a este nivel.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Elecciones de clase</h2>
      <p className="muted">
        Algunos rasgos de clase requieren elegir algo concreto (enemigo predilecto, estilo de combate, dotes de una
        lista restringida, dominios...). Complétalos aquí; las dotes elegidas de listas restringidas se conceden
        gratis, sin ocupar hueco de dote normal.
      </p>
      <div className="class-choices-list">
      {unlocked
        .sort((a, b) => a.level - b.level)
        .map(({ classId, className, level, choice }) => {
          const current = findChoiceValue(classFeatureChoices, classId, choice.id, level) ?? "";
          const key = `${classId}-${choice.id}-${level}`;
          return (
            <div className="card" key={key}>
              <h3>
                {choice.label}{" "}
                <span className="tag">
                  {className} {level}
                </span>
              </h3>
              <p className="muted">Rasgo: {choice.featureName}</p>
              {choice.kind === "texto_libre" && (
                <input
                  style={{ width: "100%", padding: 8, border: "1px solid var(--border)", borderRadius: 6 }}
                  placeholder={choice.placeholder}
                  value={current}
                  onChange={(e) => setChoice(classId, choice.id, level, e.target.value)}
                />
              )}
              {choice.hint && (
                <p className="muted" style={{ marginTop: 6, fontSize: "0.85rem" }}>
                  {choice.hint}
                </p>
              )}
              {choice.kind === "lista_fija" && (
                <>
                  <select
                    style={{ width: "100%", padding: 8, border: "1px solid var(--border)", borderRadius: 6 }}
                    value={current}
                    onChange={(e) => setChoice(classId, choice.id, level, e.target.value)}
                  >
                    <option value="">— Sin elegir —</option>
                    {choice.options?.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {(() => {
                    const desc = choice.options?.find((o) => o.id === current)?.description;
                    return desc ? (
                      <p className="muted" style={{ marginTop: 6 }}>
                        {desc}
                      </p>
                    ) : null;
                  })()}
                </>
              )}
              {choice.kind === "dote_restringida" &&
                (() => {
                  const featIds = featOptionsFor(choice, classId, classFeatureChoices);
                  if (featIds.length === 0) {
                    return (
                      <p className="muted">
                        Elige primero {choice.featOptionsByDependency ? "la elección de la que depende esta dote" : "una opción"}.
                      </p>
                    );
                  }
                  return (
                    <select
                      style={{ width: "100%", padding: 8, border: "1px solid var(--border)", borderRadius: 6 }}
                      value={current}
                      onChange={(e) => setChoice(classId, choice.id, level, e.target.value)}
                    >
                      <option value="">— Sin elegir —</option>
                      {featIds.map((featId) => {
                        const feat = findFeat(featId);
                        return (
                          <option key={featId} value={featId}>
                            {feat?.name ?? featId}
                          </option>
                        );
                      })}
                    </select>
                  );
                })()}
              {choice.kind === "dote_categoria" &&
                (() => {
                  const featIds = categoryFeatOptions(choice);
                  return (
                    <>
                      <select
                        style={{ width: "100%", padding: 8, border: "1px solid var(--border)", borderRadius: 6 }}
                        value={current}
                        onChange={(e) => setChoice(classId, choice.id, level, e.target.value)}
                      >
                        <option value="">— Sin elegir —</option>
                        {featIds.map((featId) => {
                          const feat = findFeat(featId);
                          return (
                            <option key={featId} value={featId}>
                              {feat?.name ?? featId}
                            </option>
                          );
                        })}
                      </select>
                      <p className="muted" style={{ marginTop: 6 }}>
                        Solo se listan las dotes cuyos prerrequisitos ya cumples.
                      </p>
                    </>
                  );
                })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
