import { findRace, getEnabledClasses, getEnabledCompanions, getEnabledFeats } from "../../data";
import type { StepProps } from "./types";
import type { CharacterClassLevel, CharacterCompanion, CompanionGrant, CompanionKind, Feat, FeatPrereqContext } from "../../types";
import {
  COMPANION_TRICKS,
  computeAnimalCompanionBonus,
  computeCompanionDerivedStats,
  computeFamiliarDerivedStats,
  computeFamiliarGrantedAbilities,
  computeSpecialMountBonus,
  effectiveCompanionLevel,
  type CompanionDerivedStats,
} from "../../engine/companions";
import { computeFinalAbilityScores, computeMaxHp, totalCharacterLevel } from "../../engine/derive";

const KIND_LABELS: Record<CompanionKind, string> = {
  animal_companion: "Compañero animal",
  familiar: "Familiar",
  special_mount: "Montura especial",
};

export default function StepCompanions({ character, onChange }: StepProps) {
  const classes = getEnabledClasses(character.activeSourceBooks);
  const companions = getEnabledCompanions(character.activeSourceBooks);

  const grants = character.classLevels
    .map((cl) => {
      const def = classes.find((c) => c.id === cl.classId);
      if (!def?.companionGrant || cl.level < def.companionGrant.startLevel) return null;
      return { classId: cl.classId, className: def.name, grant: def.companionGrant };
    })
    .filter((g): g is NonNullable<typeof g> => g !== null);

  if (grants.length === 0) {
    return (
      <div>
        <h2>Compañeros, familiares y monturas especiales</h2>
        <p className="muted">Ninguna de las clases seleccionadas otorga un compañero, familiar o montura a este nivel.</p>
      </div>
    );
  }

  function setCompanion(classId: string, baseCreatureId: string, kind: CompanionKind) {
    onChange((c) => {
      const existing = c.companions.find((comp) => comp.masterClassId === classId);
      if (existing) {
        return {
          ...c,
          companions: c.companions.map((comp) =>
            comp.masterClassId === classId ? { ...comp, baseCreatureId } : comp,
          ),
        };
      }
      return {
        ...c,
        companions: [
          ...c.companions,
          { id: `comp-${classId}`, kind, baseCreatureId, name: "", masterClassId: classId },
        ],
      };
    });
  }

  function setCompanionName(classId: string, name: string) {
    onChange((c) => ({
      ...c,
      companions: c.companions.map((comp) => (comp.masterClassId === classId ? { ...comp, name } : comp)),
    }));
  }

  function removeCompanion(classId: string) {
    onChange((c) => ({ ...c, companions: c.companions.filter((comp) => comp.masterClassId !== classId) }));
  }

  function toggleTrick(classId: string, trickId: string, maxTricks: number) {
    onChange((c) => ({
      ...c,
      companions: c.companions.map((comp) => {
        if (comp.masterClassId !== classId) return comp;
        const current = comp.tricks ?? [];
        if (current.includes(trickId)) return { ...comp, tricks: current.filter((t) => t !== trickId) };
        if (current.length >= maxTricks) return comp;
        return { ...comp, tricks: [...current, trickId] };
      }),
    }));
  }

  function setCompanionFeat(classId: string, slotIndex: number, featId: string) {
    onChange((c) => ({
      ...c,
      companions: c.companions.map((comp) => {
        if (comp.masterClassId !== classId) return comp;
        const next = [...(comp.featIds ?? [])];
        next[slotIndex] = featId;
        return { ...comp, featIds: next };
      }),
    }));
  }

  const totalLevel = totalCharacterLevel(character.classLevels);
  const race = findRace(character.raceId);
  const finalScores = computeFinalAbilityScores(character.abilityScores, race, character.equipment);
  const masterHp = computeMaxHp(
    character.classLevels,
    classes,
    character.hpRolls,
    finalScores.con,
    character.activeVariantRules.includes("vr-hp-average"),
    character.activeVariantRules.includes("vr-max-hp-first-level"),
    character.activeVariantRules.includes("vr-cm-stalwart-sorcerer"),
    character.bonusHp,
  );
  const allFeats = getEnabledFeats(character.activeSourceBooks);

  /** Dotes que el compañero ya cumple según su propio bloque de estadísticas calculado (Fue/Des/BAB/DG totales). */
  function eligibleCompanionFeats(stats: CompanionDerivedStats, chosenFeatIds: string[]) {
    const ctx: FeatPrereqContext = {
      abilityScores: stats.finalAbilityScores,
      babTotal: stats.bab,
      classLevels: {},
      totalCharacterLevel: stats.totalHitDice,
      featIds: new Set(chosenFeatIds),
      skillRanks: {},
      casterLevel: 0,
    };
    return allFeats
      .filter((f) => f.prerequisites.every((p) => !p.check || p.check(ctx)))
      .sort((a, b) => a.name.localeCompare(b.name, "es"));
  }

  return (
    <div>
      <h2>Compañeros, familiares y monturas especiales</h2>
      {grants.map(({ classId, className, grant }) => {
        const current = character.companions.find((comp) => comp.masterClassId === classId);
        const options = companions.filter((base) => {
          if (base.kind !== grant.kind) return false;
          if (grant.kind === "animal_companion") {
            const effLevel = effectiveCompanionLevel(character.classLevels, grant, classId);
            return base.minEffectiveLevel <= effLevel;
          }
          return true;
        });
        const baseCreature = current ? companions.find((c) => c.id === current.baseCreatureId) : undefined;

        return (
          <div className="card" key={classId}>
            <h3>
              {KIND_LABELS[grant.kind]} ({className})
            </h3>

            <div className="grid grid-3" style={{ marginBottom: 12 }}>
              {options.map((base) => (
                <div
                  key={base.id}
                  className={`card selectable-row ${current?.baseCreatureId === base.id ? "selected" : ""}`}
                  onClick={() => setCompanion(classId, base.id, grant.kind)}
                >
                  <strong>{base.name}</strong>
                  <div className="muted">{base.description}</div>
                </div>
              ))}
            </div>

            {current && (
              <div className="form-row" style={{ maxWidth: 300 }}>
                <label>Nombre propio</label>
                <input value={current.name} onChange={(e) => setCompanionName(classId, e.target.value)} />
                <button className="btn btn-danger" style={{ marginTop: 8 }} onClick={() => removeCompanion(classId)}>
                  Quitar
                </button>
              </div>
            )}

            {baseCreature && grant.kind === "animal_companion" && (
              <AnimalCompanionBonusPreview classLevels={character.classLevels} classId={classId} grant={grant} />
            )}
            {baseCreature && grant.kind === "familiar" && (
              <div className="muted">
                <strong>Habilidades otorgadas al amo (nivel de personaje {totalLevel}):</strong>
                <ul>
                  {computeFamiliarGrantedAbilities(totalLevel).map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
            {baseCreature && grant.kind === "special_mount" && (
              <SpecialMountBonusPreview classLevels={character.classLevels} classId={classId} />
            )}
            {baseCreature &&
              current &&
              (() => {
                let stats: CompanionDerivedStats;
                let bonusTricks = 0;
                if (grant.kind === "animal_companion") {
                  const effLevel = effectiveCompanionLevel(character.classLevels, grant, classId);
                  const bonus = computeAnimalCompanionBonus(effLevel);
                  bonusTricks = bonus.bonusTricks;
                  stats = computeCompanionDerivedStats(baseCreature, bonus.hitDiceBonus, bonus.naturalArmorBonus, bonus.abilityBonus);
                } else if (grant.kind === "familiar") {
                  stats = computeFamiliarDerivedStats(baseCreature, totalLevel, masterHp, character.classLevels, classes);
                } else {
                  const paladinLevel = character.classLevels.find((cl) => cl.classId === classId)?.level ?? 0;
                  const bonus = computeSpecialMountBonus(paladinLevel);
                  if (!bonus) return null;
                  stats = computeCompanionDerivedStats(baseCreature, bonus.hitDiceBonus, bonus.naturalArmorBonus, bonus.strBonus, bonus.intScore);
                }
                const eligibleFeats = eligibleCompanionFeats(stats, current.featIds ?? []);
                return (
                  <CompanionTricksAndFeats
                    current={current}
                    stats={stats}
                    showTricks={grant.kind === "animal_companion"}
                    bonusTricks={bonusTricks}
                    eligibleFeats={eligibleFeats}
                    onToggleTrick={(trickId) => toggleTrick(classId, trickId, bonusTricks)}
                    onSetFeat={(slotIndex, featId) => setCompanionFeat(classId, slotIndex, featId)}
                  />
                );
              })()}
          </div>
        );
      })}
    </div>
  );
}

function CompanionTricksAndFeats({
  current,
  stats,
  showTricks,
  bonusTricks,
  eligibleFeats,
  onToggleTrick,
  onSetFeat,
}: {
  current: CharacterCompanion;
  stats: CompanionDerivedStats;
  showTricks: boolean;
  bonusTricks: number;
  eligibleFeats: Feat[];
  onToggleTrick: (trickId: string) => void;
  onSetFeat: (slotIndex: number, featId: string) => void;
}) {
  const chosenTricks = current.tricks ?? [];
  const chosenFeats = current.featIds ?? [];
  return (
    <div style={{ marginTop: 8 }}>
      {showTricks && bonusTricks > 0 && (
        <div className="form-row">
          <label>
            Trucos de bonificación ({chosenTricks.length}/{bonusTricks})
          </label>
          <p className="muted" style={{ margin: "0 0 4px" }}>
            El druida los enseña gratis, sin tiempo de entrenamiento ni pruebas de Adiestrar Animales.
          </p>
          <div className="grid grid-3">
            {COMPANION_TRICKS.map((t) => {
              const checked = chosenTricks.includes(t.id);
              const disabled = !checked && chosenTricks.length >= bonusTricks;
              return (
                <label key={t.id} title={t.description} style={{ opacity: disabled ? 0.5 : 1 }}>
                  <input type="checkbox" checked={checked} disabled={disabled} onChange={() => onToggleTrick(t.id)} /> {t.name}
                </label>
              );
            })}
          </div>
        </div>
      )}
      {stats.featCount > 0 && (
        <div className="form-row">
          <label>Dotes ({stats.featCount} en total según sus DG)</label>
          <p className="muted" style={{ margin: "0 0 4px" }}>
            El bloque base ya puede incluir alguna de estas dotes (reflejada en sus ataques o cualidades especiales);
            deja sin elegir los huecos que ya cubra el bloque base.
          </p>
          <div className="grid grid-2">
            {Array.from({ length: stats.featCount }).map((_, i) => (
              <select key={i} value={chosenFeats[i] ?? ""} onChange={(e) => onSetFeat(i, e.target.value)}>
                <option value="">— Sin elegir —</option>
                {eligibleFeats.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AnimalCompanionBonusPreview({
  classLevels,
  classId,
  grant,
}: {
  classLevels: CharacterClassLevel[];
  classId: string;
  grant: CompanionGrant;
}) {
  const effLevel = effectiveCompanionLevel(classLevels, grant, classId);
  const bonus = computeAnimalCompanionBonus(effLevel);
  return (
    <div className="muted">
      <strong>Bonos por nivel de amo (nivel efectivo {effLevel}):</strong>
      <ul>
        <li>+{bonus.hitDiceBonus} dados de golpe</li>
        <li>+{bonus.naturalArmorBonus} armadura natural</li>
        <li>+{bonus.abilityBonus} a Fuerza y Destreza</li>
        <li>{bonus.bonusTricks} trucos de bonificación</li>
        {bonus.special.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

function SpecialMountBonusPreview({
  classLevels,
  classId,
}: {
  classLevels: CharacterClassLevel[];
  classId: string;
}) {
  const paladinLevel = classLevels.find((cl) => cl.classId === classId)?.level ?? 0;
  const bonus = computeSpecialMountBonus(paladinLevel);
  if (!bonus) return null;
  return (
    <div className="muted">
      <strong>Bonos por nivel de paladín ({paladinLevel}):</strong>
      <ul>
        <li>+{bonus.hitDiceBonus} dados de golpe</li>
        <li>+{bonus.strBonus} a Fuerza</li>
        <li>Inteligencia {bonus.intScore}</li>
        <li>+{bonus.naturalArmorBonus} armadura natural</li>
        {bonus.special.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
