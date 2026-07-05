import { getEnabledRaces } from "../../data";
import type { StepProps } from "./types";

export default function StepRace({ character, onChange }: StepProps) {
  const races = getEnabledRaces(character.activeSourceBooks);

  return (
    <div>
      <h2>Raza</h2>
      <p className="muted">Selecciona la raza de tu personaje.</p>
      <div className="grid grid-2">
        {races.map((race) => (
          <div
            key={race.id}
            className={`card selectable-row ${character.raceId === race.id ? "selected" : ""}`}
            onClick={() => onChange((c) => ({ ...c, raceId: race.id }))}
          >
            <h3>{race.name}</h3>
            <p className="muted">{race.description}</p>
            <div>
              <span className="tag">{race.size}</span>
              <span className="tag">Vel. {race.speed} pies</span>
            </div>
            <div style={{ marginTop: 8 }}>
              {Object.entries(race.abilityAdjustments).length === 0 ? (
                <span className="muted">Sin ajustes de característica</span>
              ) : (
                Object.entries(race.abilityAdjustments).map(([ab, val]) => (
                  <span className="tag" key={ab}>
                    {ab.toUpperCase()} {val! > 0 ? `+${val}` : val}
                  </span>
                ))
              )}
            </div>
            {character.raceId === race.id && (
              <ul style={{ marginTop: 10, paddingLeft: 18 }}>
                {race.traits.map((t) => (
                  <li key={t.name}>
                    <strong>{t.name}:</strong> {t.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
