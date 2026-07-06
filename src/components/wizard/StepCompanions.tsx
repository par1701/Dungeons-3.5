import { getEnabledClasses, getEnabledCompanions } from "../../data";
import type { StepProps } from "./types";
import type { CharacterClassLevel, CompanionGrant, CompanionKind } from "../../types";
import {
  computeAnimalCompanionBonus,
  computeFamiliarGrantedAbilities,
  computeSpecialMountBonus,
  effectiveCompanionLevel,
} from "../../engine/companions";
import { totalCharacterLevel } from "../../engine/derive";

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

  const totalLevel = totalCharacterLevel(character.classLevels);

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
          </div>
        );
      })}
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
