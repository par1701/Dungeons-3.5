import { useState } from "react";
import { getEnabledFeats, getEnabledClasses } from "../../data";
import type { StepProps } from "./types";
import type { FeatPrereqContext } from "../../types";
import {
  applyRacialAdjustments,
  computeBabTotal,
  computeFeatSlots,
  flattenSkillRanksForPrereqs,
  getAllKnownFeatIds,
  isHumanRace,
  totalCharacterLevel,
} from "../../engine/derive";
import { findRace } from "../../data";

export default function StepFeats({ character, onChange }: StepProps) {
  const [search, setSearch] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const feats = getEnabledFeats(character.activeSourceBooks);
  const classes = getEnabledClasses(character.activeSourceBooks);
  const race = findRace(character.raceId);
  const finalScores = applyRacialAdjustments(character.abilityScores, race);

  const featSlots = computeFeatSlots(
    character.classLevels,
    isHumanRace(race),
    character.activeVariantRules.includes("vr-cc-champion-of-the-wild"),
    character.bonusFeatSlots,
  );
  const ctx: FeatPrereqContext = {
    abilityScores: finalScores,
    babTotal: computeBabTotal(character.classLevels, classes),
    classLevels: Object.fromEntries(character.classLevels.map((cl) => [cl.classId, cl.level])),
    totalCharacterLevel: totalCharacterLevel(character.classLevels),
    featIds: getAllKnownFeatIds(character.feats, character.classLevels, classes, character.classFeatureChoices ?? []),
    skillRanks: flattenSkillRanksForPrereqs(character.skillRanks),
    casterLevel: totalCharacterLevel(character.classLevels),
  };

  function toggleFeat(featId: string) {
    onChange((c) => {
      const taken = c.feats.some((f) => f.featId === featId);
      return {
        ...c,
        feats: taken
          ? c.feats.filter((f) => f.featId !== featId)
          : [...c.feats, { featId, levelTaken: totalCharacterLevel(c.classLevels) }],
      };
    });
  }

  function addFeatInstance(featId: string, selection: string) {
    onChange((c) => ({
      ...c,
      feats: [...c.feats, { featId, selection: selection || undefined, levelTaken: totalCharacterLevel(c.classLevels) }],
    }));
    setDrafts((d) => ({ ...d, [featId]: "" }));
  }

  function removeFeatInstance(featId: string, instanceIndex: number) {
    onChange((c) => {
      let seen = -1;
      return {
        ...c,
        feats: c.feats.filter((f) => {
          if (f.featId !== featId) return true;
          seen++;
          return seen !== instanceIndex;
        }),
      };
    });
  }

  const filtered = feats.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h2>Dotes</h2>
      <p className={character.feats.length > featSlots ? "" : "muted"} style={character.feats.length > featSlots ? { color: "var(--danger)" } : {}}>
        Dotes seleccionadas: {character.feats.length} / {featSlots} disponibles según nivel y raza
      </p>
      <input
        className="form-row"
        style={{ padding: 8, border: "1px solid var(--border)", borderRadius: 6, width: "100%", marginBottom: 12 }}
        placeholder="Buscar dote..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-2">
        {filtered.map((feat) => {
          const instances = character.feats
            .map((f, i) => ({ ...f, index: i }))
            .filter((f) => f.featId === feat.id);
          const taken = instances.length > 0;
          const unmet = feat.prerequisites.filter((p) => p.check && !p.check(ctx));
          return (
            <div
              key={feat.id}
              className={`card selectable-row ${taken ? "selected" : ""}`}
              onClick={feat.stackable ? undefined : () => toggleFeat(feat.id)}
              style={feat.stackable ? {} : { cursor: "pointer" }}
            >
              <h3>{feat.name}</h3>
              <p className="muted">{feat.benefit}</p>
              {feat.prerequisites.length > 0 && (
                <div className="muted">
                  Requisitos: {feat.prerequisites.map((p) => p.description).join("; ")}
                </div>
              )}
              {unmet.length > 0 && (
                <div style={{ color: "var(--danger)", fontSize: "0.85rem" }}>
                  ⚠ No cumple: {unmet.map((p) => p.description).join("; ")}
                </div>
              )}
              {feat.stackable && (
                <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 8 }}>
                  {instances.length > 0 && (
                    <ul style={{ margin: "0 0 8px", paddingLeft: 18 }}>
                      {instances.map((inst, order) => (
                        <li key={inst.index}>
                          {inst.selection || <span className="muted">(sin especificar)</span>}{" "}
                          <button
                            className="btn btn-danger"
                            style={{ padding: "0 6px", fontSize: "0.75rem" }}
                            onClick={() => removeFeatInstance(feat.id, order)}
                          >
                            Quitar
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div style={{ display: "flex", gap: 6 }}>
                    <input
                      style={{ flex: 1, padding: 6, border: "1px solid var(--border)", borderRadius: 6 }}
                      placeholder="Arma, habilidad, escuela... (opcional)"
                      value={drafts[feat.id] ?? ""}
                      onChange={(e) => setDrafts((d) => ({ ...d, [feat.id]: e.target.value }))}
                    />
                    <button className="btn" onClick={() => addFeatInstance(feat.id, (drafts[feat.id] ?? "").trim())}>
                      + Añadir
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
