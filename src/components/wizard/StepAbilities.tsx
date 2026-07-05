import { useState } from "react";
import type { StepProps } from "./types";
import type { Ability } from "../../types";
import { abilityModifier, applyRacialAdjustments, pointBuyTotalCost } from "../../engine/derive";
import { findRace } from "../../data";

const ABILITY_LABELS: Record<Ability, string> = {
  str: "Fuerza",
  dex: "Destreza",
  con: "Constitución",
  int: "Inteligencia",
  wis: "Sabiduría",
  cha: "Carisma",
};

const ABILITIES: Ability[] = ["str", "dex", "con", "int", "wis", "cha"];
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const POINT_BUY_BUDGET = 25;

function rollAbilityScore(method: "tirada_4d6" | "tirada_2d6_mas_6"): number {
  const d6 = () => Math.ceil(Math.random() * 6);
  if (method === "tirada_2d6_mas_6") return d6() + d6() + 6;
  const rolls = [d6(), d6(), d6(), d6()].sort((a, b) => b - a);
  return rolls[0] + rolls[1] + rolls[2];
}

export default function StepAbilities({ character, onChange }: StepProps) {
  const [pool, setPool] = useState<number[]>(
    character.abilityGenerationMethod === "conjunto_estandar" ? STANDARD_ARRAY : [],
  );
  const [poolAssignment, setPoolAssignment] = useState<Partial<Record<Ability, number>>>({});

  const method = character.abilityGenerationMethod;
  const race = findRace(character.raceId);
  const finalScores = applyRacialAdjustments(character.abilityScores, race);

  function setScore(ability: Ability, value: number) {
    onChange((c) => ({ ...c, abilityScores: { ...c.abilityScores, [ability]: value } }));
  }

  function assignFromPool(ability: Ability, index: number) {
    setPoolAssignment((prev) => ({ ...prev, [ability]: index }));
    setScore(ability, pool[index]);
  }

  function reroll() {
    const values = ABILITIES.map(() =>
      rollAbilityScore(method === "tirada_2d6_mas_6" ? "tirada_2d6_mas_6" : "tirada_4d6"),
    );
    setPool(values);
    setPoolAssignment({});
  }

  const usedIndices = new Set(Object.values(poolAssignment));

  const pointCost = pointBuyTotalCost(character.abilityScores);

  return (
    <div>
      <h2>Características</h2>
      <p className="muted">
        Método de generación seleccionado en el paso de reglas:{" "}
        <strong>
          {
            {
              compra_puntos: "Compra por puntos",
              conjunto_estandar: "Conjunto estándar",
              tirada_4d6: "4d6 (descartando el menor)",
              tirada_2d6_mas_6: "2d6+6",
              manual: "Manual",
            }[method]
          }
        </strong>
      </p>

      {method === "compra_puntos" && (
        <p className={pointCost > POINT_BUY_BUDGET ? "" : "muted"} style={pointCost > POINT_BUY_BUDGET ? { color: "var(--danger)" } : {}}>
          Puntos gastados: {pointCost} / {POINT_BUY_BUDGET}
        </p>
      )}

      {(method === "tirada_4d6" || method === "tirada_2d6_mas_6") && (
        <div style={{ marginBottom: 12 }}>
          <button className="btn" onClick={reroll}>
            🎲 Tirar características
          </button>
          {pool.length > 0 && <span className="muted" style={{ marginLeft: 10 }}>Valores: {pool.join(", ")}</span>}
        </div>
      )}

      <div className="grid grid-3">
        {ABILITIES.map((ability) => {
          const base = character.abilityScores[ability];
          const mod = abilityModifier(finalScores[ability]);
          return (
            <div className="card" key={ability}>
              <label style={{ fontWeight: 600 }}>{ABILITY_LABELS[ability]}</label>

              {method === "compra_puntos" && (
                <input
                  type="number"
                  min={8}
                  max={18}
                  value={base}
                  onChange={(e) => setScore(ability, Number(e.target.value))}
                />
              )}

              {method === "manual" && (
                <input type="number" min={1} max={30} value={base} onChange={(e) => setScore(ability, Number(e.target.value))} />
              )}

              {(method === "conjunto_estandar" || method === "tirada_4d6" || method === "tirada_2d6_mas_6") && (
                <select
                  value={poolAssignment[ability] ?? ""}
                  onChange={(e) => assignFromPool(ability, Number(e.target.value))}
                  disabled={pool.length === 0}
                >
                  <option value="" disabled>
                    Elegir valor
                  </option>
                  {pool.map((v, i) => (
                    <option key={i} value={i} disabled={usedIndices.has(i) && poolAssignment[ability] !== i}>
                      {v}
                    </option>
                  ))}
                </select>
              )}

              <div className="muted" style={{ marginTop: 6 }}>
                Base {base} · Final {finalScores[ability]} · Mod {mod >= 0 ? `+${mod}` : mod}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
