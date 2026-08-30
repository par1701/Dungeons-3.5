import { useState } from "react";
import { findFeat, getEnabledFeats, getEnabledClasses, getEnabledSkills, getEnabledWeapons } from "../../data";
import { getSourceBook } from "../../data/sourcebooks";
import type { StepProps } from "./types";
import type { FeatPrereqContext, FeatType } from "../../types";
import {
  computeBabTotal,
  computeFeatSlots,
  computeFinalAbilityScores,
  flattenSkillRanksForPrereqs,
  getAllKnownFeatIds,
  getBonusFeatsFromClasses,
  isHumanRace,
  totalCharacterLevel,
} from "../../engine/derive";
import { findRace } from "../../data";

const CATEGORY_ORDER: FeatType[] = ["general", "combate", "metamagia", "creacion_objetos", "especial"];
const CATEGORY_LABELS: Record<FeatType, string> = {
  general: "Generales",
  combate: "De combate",
  metamagia: "Metamágicas",
  creacion_objetos: "De creación de objetos",
  especial: "Especiales",
};

type SortMode = "alfabetico" | "libro";

// Dotes cuyo texto de "selection" debe coincidir con el nombre exacto de un
// arma para que el motor de reglas le aplique el bonificador correspondiente
// (Soltura/Especialización con un Arma, Crítico Mejorado/Potenciado...).
const WEAPON_SELECTION_FEAT_IDS = new Set([
  "weapon-focus",
  "greater-weapon-focus",
  "weapon-specialization",
  "greater-weapon-specialization",
  "improved-critical",
  "cw-power-critical",
]);

// Dotes cuyo texto de "selection" debe ser uno de los tres tipos de daño.
const DAMAGE_TYPE_SELECTION_FEAT_IDS = new Set(["phb2-melee-weapon-mastery", "phb2-ranged-weapon-mastery"]);
const DAMAGE_TYPE_OPTIONS = ["Contundente", "Perforante", "Cortante"];

// Dotes cuyo texto de "selection" debe coincidir con el nombre exacto de una habilidad para que el motor de
// reglas le aplique el bonificador correspondiente (Soltura con una Habilidad). Las habilidades con
// especialización (Artesanía, Interpretar, Oficio) quedan fuera: la dote se ligaría a una especialidad concreta
// (p.ej. "Oficio (Herrería)") que este selector de una sola línea no puede representar.
const SKILL_SELECTION_FEAT_IDS = new Set(["skill-focus"]);

export default function StepFeats({ character, onChange }: StepProps) {
  const [search, setSearch] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [categoryFilter, setCategoryFilter] = useState<FeatType | "todas">("todas");
  const [sortMode, setSortMode] = useState<SortMode>("alfabetico");
  const [hideUnmet, setHideUnmet] = useState(false);
  const feats = getEnabledFeats(character.activeSourceBooks);
  const classes = getEnabledClasses(character.activeSourceBooks);
  const weaponNames = [...new Set(getEnabledWeapons(character.activeSourceBooks).map((w) => w.name))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );
  const skillNames = getEnabledSkills(character.activeSourceBooks)
    .filter((s) => !s.requiresSpecialization)
    .map((s) => s.name)
    .sort((a, b) => a.localeCompare(b, "es"));
  const race = findRace(character.raceId);
  const finalScores = computeFinalAbilityScores(character.abilityScores, race, character.equipment);

  const featSlots = computeFeatSlots(character.classLevels, isHumanRace(race), character.bonusFeatSlots);
  const classFeatureChoices = character.classFeatureChoices ?? [];
  const bonusFeats = getBonusFeatsFromClasses(character.classLevels, classes, classFeatureChoices, character.activeVariantRules);
  const bonusFeatByFeatId = new Map(bonusFeats.map((bf) => [bf.featId, bf]));
  const ctx: FeatPrereqContext = {
    abilityScores: finalScores,
    babTotal: computeBabTotal(character.classLevels, classes, race),
    classLevels: Object.fromEntries(character.classLevels.map((cl) => [cl.classId, cl.level])),
    totalCharacterLevel: totalCharacterLevel(character.classLevels),
    featIds: getAllKnownFeatIds(character.feats, character.classLevels, classes, classFeatureChoices, character.activeVariantRules),
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

  const filtered = feats
    .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    .filter((f) => categoryFilter === "todas" || f.types.includes(categoryFilter))
    .filter((f) => {
      if (!hideUnmet) return true;
      if (character.feats.some((cf) => cf.featId === f.id) && !f.stackable) return true;
      return f.prerequisites.every((p) => !p.check || p.check(ctx));
    });

  type Group = { key: string; label: string; feats: typeof filtered };
  let groups: Group[];
  if (sortMode === "libro") {
    const bySource = new Map<string, typeof filtered>();
    for (const f of filtered) {
      const arr = bySource.get(f.source) ?? [];
      arr.push(f);
      bySource.set(f.source, arr);
    }
    groups = Array.from(bySource.entries())
      .map(([sourceId, list]) => ({
        key: sourceId,
        label: getSourceBook(sourceId)?.name ?? sourceId,
        feats: [...list].sort((a, b) => a.name.localeCompare(b.name, "es")),
      }))
      .sort((a, b) => a.label.localeCompare(b.label, "es"));
  } else {
    const byCategory = new Map<FeatType, typeof filtered>();
    for (const f of filtered) {
      const primary = f.types[0] ?? "general";
      const arr = byCategory.get(primary) ?? [];
      arr.push(f);
      byCategory.set(primary, arr);
    }
    groups = CATEGORY_ORDER.filter((cat) => byCategory.has(cat)).map((cat) => ({
      key: cat,
      label: CATEGORY_LABELS[cat],
      feats: [...(byCategory.get(cat) ?? [])].sort((a, b) => a.name.localeCompare(b.name, "es")),
    }));
  }

  return (
    <div>
      <h2>Dotes</h2>
      <p className={character.feats.length > featSlots ? "" : "muted"} style={character.feats.length > featSlots ? { color: "var(--danger)" } : {}}>
        Dotes seleccionadas: {character.feats.length} / {featSlots} disponibles según nivel y raza
      </p>
      {character.feats.length > 0 && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ marginTop: 0 }}>Dotes ya seleccionadas ({character.feats.length})</h3>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {character.feats
              .map((cf, index) => ({ ...cf, index }))
              .sort((a, b) => (findFeat(a.featId)?.name ?? a.featId).localeCompare(findFeat(b.featId)?.name ?? b.featId, "es"))
              .map((cf) => {
                const feat = findFeat(cf.featId);
                return (
                  <li key={cf.index} style={{ marginBottom: 4 }}>
                    <strong>{feat?.name ?? cf.featId}</strong>
                    {cf.selection ? ` (${cf.selection})` : ""}{" "}
                    <button
                      className="btn btn-danger"
                      style={{ padding: "0 6px", fontSize: "0.75rem" }}
                      onClick={() => onChange((c) => ({ ...c, feats: c.feats.filter((_, i) => i !== cf.index) }))}
                    >
                      Quitar
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
      {bonusFeats.length > 0 && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ marginTop: 0 }}>Dotes obtenidas gratis por clase ({bonusFeats.length})</h3>
          <p className="muted" style={{ marginTop: 0 }}>
            No ocupan hueco de dote normal; se eligen en "Elecciones de clase".
          </p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {bonusFeats.map((bf, i) => {
              const feat = findFeat(bf.featId);
              return (
                <li key={i}>
                  <strong>{feat?.name ?? bf.featId}</strong> — {bf.sourceLabel} ({bf.className} {bf.level})
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <input
        className="form-row"
        style={{ padding: 8, border: "1px solid var(--border)", borderRadius: 6, width: "100%", marginBottom: 12 }}
        placeholder="Buscar dote..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="form-row" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          Agrupar por:
          <select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)}>
            <option value="alfabetico">Categoría</option>
            <option value="libro">Libro de origen</option>
          </select>
        </label>
        {sortMode === "alfabetico" && (
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            Categoría:
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as FeatType | "todas")}>
              <option value="todas">Todas</option>
              {CATEGORY_ORDER.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </label>
        )}
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={hideUnmet} onChange={(e) => setHideUnmet(e.target.checked)} />
          Ocultar dotes sin requisitos cumplidos
        </label>
      </div>
      {groups.map((group) => (
        <div key={group.key} style={{ marginBottom: 20 }}>
          <h3 style={{ borderBottom: "1px solid var(--border)", paddingBottom: 4, marginBottom: 10 }}>
            {group.label} <span className="muted">({group.feats.length})</span>
          </h3>
          <div className="grid grid-2">
            {group.feats.map((feat) => {
          const instances = character.feats
            .map((f, i) => ({ ...f, index: i }))
            .filter((f) => f.featId === feat.id);
          const taken = instances.length > 0;
          const unmet = feat.prerequisites.filter((p) => p.check && !p.check(ctx));
          const grantedElsewhere = !feat.stackable ? bonusFeatByFeatId.get(feat.id) : undefined;
          const blocked = Boolean(grantedElsewhere) && !taken;
          return (
            <div
              key={feat.id}
              className={`card selectable-row ${taken ? "selected" : ""}`}
              onClick={feat.stackable || blocked ? undefined : () => toggleFeat(feat.id)}
              style={feat.stackable || blocked ? { opacity: blocked ? 0.6 : 1 } : { cursor: "pointer" }}
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
              {grantedElsewhere && (
                <div className="muted" style={{ fontSize: "0.85rem" }}>
                  {taken ? "⚠ También la tienes gratis por: " : "Ya la tienes gratis por: "}
                  {grantedElsewhere.sourceLabel} ({grantedElsewhere.className} {grantedElsewhere.level})
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
                    {WEAPON_SELECTION_FEAT_IDS.has(feat.id) ||
                    DAMAGE_TYPE_SELECTION_FEAT_IDS.has(feat.id) ||
                    SKILL_SELECTION_FEAT_IDS.has(feat.id) ? (
                      <select
                        style={{ flex: 1, minWidth: 0, padding: 6, border: "1px solid var(--border)", borderRadius: 6 }}
                        value={drafts[feat.id] ?? ""}
                        onChange={(e) => setDrafts((d) => ({ ...d, [feat.id]: e.target.value }))}
                      >
                        <option value="" disabled>
                          {WEAPON_SELECTION_FEAT_IDS.has(feat.id)
                            ? "-- Elige un arma --"
                            : SKILL_SELECTION_FEAT_IDS.has(feat.id)
                              ? "-- Elige una habilidad --"
                              : "-- Elige un tipo de daño --"}
                        </option>
                        {(WEAPON_SELECTION_FEAT_IDS.has(feat.id)
                          ? weaponNames
                          : SKILL_SELECTION_FEAT_IDS.has(feat.id)
                            ? skillNames
                            : DAMAGE_TYPE_OPTIONS
                        ).map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        style={{ flex: 1, minWidth: 0, padding: 6, border: "1px solid var(--border)", borderRadius: 6 }}
                        placeholder="Arma, habilidad, escuela... (opcional)"
                        value={drafts[feat.id] ?? ""}
                        onChange={(e) => setDrafts((d) => ({ ...d, [feat.id]: e.target.value }))}
                      />
                    )}
                    <button
                      className="btn"
                      disabled={
                        (WEAPON_SELECTION_FEAT_IDS.has(feat.id) ||
                          DAMAGE_TYPE_SELECTION_FEAT_IDS.has(feat.id) ||
                          SKILL_SELECTION_FEAT_IDS.has(feat.id)) &&
                        !(drafts[feat.id] ?? "").trim()
                      }
                      onClick={() => addFeatInstance(feat.id, (drafts[feat.id] ?? "").trim())}
                    >
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
      ))}
    </div>
  );
}
