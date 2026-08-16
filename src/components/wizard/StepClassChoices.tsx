import { findFeat, getEnabledClasses } from "../../data";
import type { StepProps } from "./types";
import { getUnlockedClassFeatureChoices, findChoiceValue } from "../../engine/derive";
import type { ClassFeatureChoice } from "../../types";

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
  const unlocked = getUnlockedClassFeatureChoices(character.classLevels, classes);

  function setChoice(classId: string, choiceId: string, level: number, value: string) {
    onChange((c) => {
      const idx = c.classFeatureChoices.findIndex(
        (cc) => cc.classId === classId && cc.choiceId === choiceId && cc.level === level,
      );
      const next = [...c.classFeatureChoices];
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
          const current = findChoiceValue(character.classFeatureChoices, classId, choice.id, level) ?? "";
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
                  const featIds = featOptionsFor(choice, classId, character.classFeatureChoices);
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
