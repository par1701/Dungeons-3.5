import { useState } from "react";
import { getEnabledFeats, getEnabledClasses } from "../../data";
import type { StepProps } from "./types";
import type { FeatPrereqContext } from "../../types";
import {
  applyRacialAdjustments,
  computeBabTotal,
  computeFeatSlots,
  flattenSkillRanksForPrereqs,
  isHumanRace,
  totalCharacterLevel,
} from "../../engine/derive";
import { findRace } from "../../data";

export default function StepFeats({ character, onChange }: StepProps) {
  const [search, setSearch] = useState("");
  const feats = getEnabledFeats(character.activeSourceBooks);
  const classes = getEnabledClasses(character.activeSourceBooks);
  const race = findRace(character.raceId);
  const finalScores = applyRacialAdjustments(character.abilityScores, race);

  const featSlots = computeFeatSlots(character.classLevels, isHumanRace(race));
  const takenIds = new Set(character.feats.map((f) => f.featId));

  const ctx: FeatPrereqContext = {
    abilityScores: finalScores,
    babTotal: computeBabTotal(character.classLevels, classes),
    classLevels: Object.fromEntries(character.classLevels.map((cl) => [cl.classId, cl.level])),
    totalCharacterLevel: totalCharacterLevel(character.classLevels),
    featIds: takenIds,
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
          const taken = takenIds.has(feat.id);
          const unmet = feat.prerequisites.filter((p) => p.check && !p.check(ctx));
          return (
            <div
              key={feat.id}
              className={`card selectable-row ${taken ? "selected" : ""}`}
              onClick={() => toggleFeat(feat.id)}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
