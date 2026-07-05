import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCharacterStore } from "../store/characterStore";
import { findRace } from "../data";
import { totalCharacterLevel } from "../engine/derive";

export default function CharacterListPage() {
  const characters = useCharacterStore((s) => s.characters);
  const deleteCharacter = useCharacterStore((s) => s.deleteCharacter);
  const exportCharacter = useCharacterStore((s) => s.exportCharacter);
  const importCharacter = useCharacterStore((s) => s.importCharacter);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);

  function handleExport(id: string, name: string) {
    const json = exportCharacter(id);
    if (!json) return;
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/[^a-z0-9-_]+/gi, "_") || "personaje"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    setImportError(null);
    fileInputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const text = await file.text();
    const result = importCharacter(text);
    if (!result.ok) {
      setImportError(result.error);
    }
  }

  function handleDelete(id: string, name: string) {
    if (confirm(`¿Eliminar el personaje "${name}"? Esta acción no se puede deshacer.`)) {
      deleteCharacter(id);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <h1>Mis personajes</h1>
        <div className="char-actions">
          <button className="btn" onClick={handleImportClick}>
            Importar JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Link to="/personajes/nuevo" className="btn btn-primary">
            + Crear personaje
          </Link>
        </div>
      </div>

      {importError && (
        <div className="card" style={{ borderColor: "var(--danger)", color: "var(--danger)" }}>
          {importError}
        </div>
      )}

      <div className="card">
        {characters.length === 0 ? (
          <div className="empty-state">
            <p>Todavía no tienes personajes guardados.</p>
          </div>
        ) : (
          characters.map((c) => {
            const race = findRace(c.raceId);
            const level = totalCharacterLevel(c.classLevels);
            const classSummary = c.classLevels.map((cl) => `${cl.classId} ${cl.level}`).join(" / ");
            return (
              <div className="char-list-item" key={c.id}>
                <div>
                  <strong>{c.name}</strong>
                  <div className="muted">
                    {race?.name ?? c.raceId} · Nivel {level}
                    {classSummary ? ` · ${classSummary}` : ""}
                  </div>
                </div>
                <div className="char-actions">
                  <Link to={`/personajes/${c.id}/hoja`} className="btn">
                    Ver hoja
                  </Link>
                  <Link to={`/personajes/${c.id}/editar`} className="btn">
                    Editar
                  </Link>
                  <button className="btn" onClick={() => handleExport(c.id, c.name)}>
                    Exportar
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(c.id, c.name)}>
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
