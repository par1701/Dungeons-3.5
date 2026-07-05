import type { StepProps } from "./types";

export default function StepDetails({ character, onChange }: StepProps) {
  function set<K extends keyof typeof character>(key: K, value: (typeof character)[K]) {
    onChange((c) => ({ ...c, [key]: value }));
  }

  return (
    <div>
      <h2>Detalles del personaje</h2>
      <div className="grid grid-2">
        <div className="form-row">
          <label>Nombre del personaje</label>
          <input value={character.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div className="form-row">
          <label>Nombre del jugador/a</label>
          <input value={character.playerName} onChange={(e) => set("playerName", e.target.value)} />
        </div>
        <div className="form-row">
          <label>Alineamiento</label>
          <select value={character.alignment} onChange={(e) => set("alignment", e.target.value)}>
            {[
              "Legal Bueno",
              "Neutral Bueno",
              "Caótico Bueno",
              "Legal Neutral",
              "Neutral",
              "Caótico Neutral",
              "Legal Malvado",
              "Neutral Malvado",
              "Caótico Malvado",
            ].map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Deidad</label>
          <input value={character.deity} onChange={(e) => set("deity", e.target.value)} />
        </div>
        <div className="form-row">
          <label>Edad</label>
          <input type="number" value={character.age} onChange={(e) => set("age", Number(e.target.value))} />
        </div>
        <div className="form-row">
          <label>Género</label>
          <input value={character.gender} onChange={(e) => set("gender", e.target.value)} />
        </div>
        <div className="form-row">
          <label>Altura</label>
          <input value={character.height} onChange={(e) => set("height", e.target.value)} />
        </div>
        <div className="form-row">
          <label>Peso</label>
          <input value={character.weight} onChange={(e) => set("weight", e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <label>Notas / trasfondo</label>
        <textarea rows={6} value={character.notes} onChange={(e) => set("notes", e.target.value)} />
      </div>
    </div>
  );
}
