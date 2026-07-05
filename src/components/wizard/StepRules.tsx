import { SOURCE_BOOKS } from "../../data/sourcebooks";
import { VARIANT_RULES } from "../../data/variantRules";
import type { StepProps } from "./types";
import type { AbilityGenerationMethod, SourceBookId } from "../../types";

const ABILITY_METHOD_BY_VARIANT_ID: Record<string, AbilityGenerationMethod> = {
  "vr-ability-point-buy": "compra_puntos",
  "vr-ability-standard-array": "conjunto_estandar",
  "vr-ability-roll-4d6": "tirada_4d6",
  "vr-ability-roll-2d6-6": "tirada_2d6_mas_6",
  "vr-ability-manual": "manual",
};

export default function StepRules({ character, onChange }: StepProps) {
  function toggleSource(id: SourceBookId) {
    onChange((c) => {
      const active = c.activeSourceBooks.includes(id);
      return {
        ...c,
        activeSourceBooks: active
          ? c.activeSourceBooks.filter((s) => s !== id)
          : [...c.activeSourceBooks, id],
      };
    });
  }

  function toggleVariant(id: string, exclusiveGroup?: string) {
    onChange((c) => {
      let rules = c.activeVariantRules;
      const active = rules.includes(id);
      if (exclusiveGroup) {
        const groupIds = VARIANT_RULES.filter((v) => v.exclusiveGroup === exclusiveGroup).map((v) => v.id);
        rules = rules.filter((r) => !groupIds.includes(r));
        if (!active) rules = [...rules, id];
      } else {
        rules = active ? rules.filter((r) => r !== id) : [...rules, id];
      }
      const abilityMethodChanged = exclusiveGroup === "generacion_habilidades" && !active;
      return {
        ...c,
        activeVariantRules: rules,
        abilityGenerationMethod: abilityMethodChanged
          ? ABILITY_METHOD_BY_VARIANT_ID[id] ?? c.abilityGenerationMethod
          : c.abilityGenerationMethod,
      };
    });
  }

  const grouped = new Map<string, typeof VARIANT_RULES>();
  VARIANT_RULES.forEach((vr) => {
    const key = vr.category;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(vr);
  });

  const categoryLabels: Record<string, string> = {
    puntuaciones_habilidad: "Generación de características",
    raza: "Razas",
    clase: "Clases",
    combate: "Combate",
    magia: "Magia",
    otro: "Otras reglas",
  };

  return (
    <div>
      <h2>Libros de origen</h2>
      <p className="muted">Elige qué libros aportan contenido disponible para este personaje.</p>
      <div className="grid grid-2">
        {SOURCE_BOOKS.map((book) => (
          <label
            key={book.id}
            className="card"
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              opacity: book.implemented ? 1 : 0.5,
              cursor: book.implemented ? "pointer" : "not-allowed",
            }}
          >
            <input
              type="checkbox"
              disabled={!book.implemented}
              checked={character.activeSourceBooks.includes(book.id)}
              onChange={() => toggleSource(book.id)}
            />
            <span>
              <strong>{book.name}</strong>
              <div className="muted">{book.description}</div>
              {!book.implemented && <span className="tag">Próximamente</span>}
            </span>
          </label>
        ))}
      </div>

      <h2 style={{ marginTop: 24 }}>Reglas variantes</h2>
      {[...grouped.entries()].map(([category, rules]) => (
        <div className="card" key={category}>
          <h3>{categoryLabels[category] ?? category}</h3>
          {rules.map((vr) => {
            const enabled = vr.source === "srd" || character.activeSourceBooks.includes(vr.source);
            return (
              <label
                key={vr.id}
                style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8, opacity: enabled ? 1 : 0.4 }}
              >
                <input
                  type={vr.exclusiveGroup ? "radio" : "checkbox"}
                  name={vr.exclusiveGroup}
                  disabled={!enabled}
                  checked={character.activeVariantRules.includes(vr.id)}
                  onChange={() => toggleVariant(vr.id, vr.exclusiveGroup)}
                />
                <span>
                  <strong>{vr.name}</strong>
                  <div className="muted">{vr.description}</div>
                </span>
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
}
