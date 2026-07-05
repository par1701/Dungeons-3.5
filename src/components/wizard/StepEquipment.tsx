import { useState } from "react";
import { getEnabledArmors, getEnabledGear, getEnabledWeapons, findRace } from "../../data";
import type { StepProps } from "./types";
import { applyRacialAdjustments, computeCarryingCapacity } from "../../engine/derive";
import type { CharacterEquipmentItem } from "../../types";

type Tab = "weapon" | "armor" | "gear";

export default function StepEquipment({ character, onChange }: StepProps) {
  const [tab, setTab] = useState<Tab>("weapon");
  const weapons = getEnabledWeapons(character.activeSourceBooks);
  const armors = getEnabledArmors(character.activeSourceBooks);
  const gear = getEnabledGear(character.activeSourceBooks);
  const race = findRace(character.raceId);
  const finalScores = applyRacialAdjustments(character.abilityScores, race);
  const carrying = computeCarryingCapacity(finalScores.str, race?.size ?? "Mediano");

  function addItem(itemId: string, itemKind: Tab) {
    onChange((c) => {
      const existing = c.equipment.find((e) => e.itemId === itemId && e.itemKind === itemKind);
      if (existing) {
        return {
          ...c,
          equipment: c.equipment.map((e) =>
            e.itemId === itemId && e.itemKind === itemKind ? { ...e, quantity: e.quantity + 1 } : e,
          ),
        };
      }
      const item: CharacterEquipmentItem = { itemId, itemKind, quantity: 1, equipped: itemKind !== "gear" };
      return { ...c, equipment: [...c.equipment, item] };
    });
  }

  function updateItem(index: number, patch: Partial<CharacterEquipmentItem>) {
    onChange((c) => ({
      ...c,
      equipment: c.equipment.map((e, i) => (i === index ? { ...e, ...patch } : e)),
    }));
  }

  function removeItem(index: number) {
    onChange((c) => ({ ...c, equipment: c.equipment.filter((_, i) => i !== index) }));
  }

  function findItemData(itemId: string, kind: Tab) {
    if (kind === "weapon") return weapons.find((w) => w.id === itemId);
    if (kind === "armor") return armors.find((a) => a.id === itemId);
    return gear.find((g) => g.id === itemId);
  }

  const totalWeight = character.equipment.reduce((sum, e) => {
    const data = findItemData(e.itemId, e.itemKind);
    return sum + (data?.weight ?? 0) * e.quantity;
  }, 0);

  const totalCost = character.equipment.reduce((sum, e) => {
    const data = findItemData(e.itemId, e.itemKind);
    return sum + (data?.cost ?? 0) * e.quantity;
  }, 0);

  const catalog = tab === "weapon" ? weapons : tab === "armor" ? armors : gear;

  return (
    <div>
      <h2>Equipo</h2>
      <div className="form-row" style={{ maxWidth: 200 }}>
        <label>Oro disponible (po)</label>
        <input
          type="number"
          value={character.gold}
          onChange={(e) => onChange((c) => ({ ...c, gold: Number(e.target.value) }))}
        />
      </div>
      <p className="muted">
        Peso total: {totalWeight.toFixed(1)} lb (ligera ≤ {carrying.light} · media ≤ {carrying.medium} · pesada ≤{" "}
        {carrying.heavy}) — Coste total: {totalCost.toFixed(2)} po
        {totalCost > character.gold && <span style={{ color: "var(--danger)" }}> (supera el oro disponible)</span>}
      </p>

      <div className="wizard-steps">
        {(["weapon", "armor", "gear"] as Tab[]).map((t) => (
          <button
            key={t}
            className={`wizard-step-pill ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "weapon" ? "Armas" : t === "armor" ? "Armaduras" : "Equipo general"}
          </button>
        ))}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Coste</th>
            <th>Peso</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {catalog.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.cost} po</td>
              <td>{item.weight} lb</td>
              <td>
                <button className="btn" onClick={() => addItem(item.id, tab)}>
                  + Añadir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: 20 }}>Inventario</h3>
      {character.equipment.length === 0 ? (
        <p className="muted">Sin objetos añadidos.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Objeto</th>
              <th>Cantidad</th>
              <th>Equipado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {character.equipment.map((e, i) => {
              const data = findItemData(e.itemId, e.itemKind);
              return (
                <tr key={`${e.itemId}-${i}`}>
                  <td>{data?.name ?? e.itemId}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      style={{ width: 60 }}
                      value={e.quantity}
                      onChange={(ev) => updateItem(i, { quantity: Math.max(1, Number(ev.target.value)) })}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={e.equipped}
                      onChange={(ev) => updateItem(i, { equipped: ev.target.checked })}
                    />
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => removeItem(i)}>
                      Quitar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
