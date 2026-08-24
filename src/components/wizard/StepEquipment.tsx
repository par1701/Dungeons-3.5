import { Fragment, useMemo, useState } from "react";
import {
  findWondrousItem,
  getEnabledArmors,
  getEnabledGear,
  getEnabledMagicItemProperties,
  getEnabledMagicItemReferences,
  getEnabledSpecialMaterials,
  getEnabledWeapons,
  getEnabledWondrousItems,
  findRace,
} from "../../data";
import type { StepProps } from "./types";
import { computeCarryingCapacity, computeFinalAbilityScores } from "../../engine/derive";
import {
  computeArmorMarketPrice,
  computeItemDisplayName,
  computeItemWeight,
  computeWeaponMarketPrice,
  computeWondrousItemMarketPrice,
  isEnhancedItem,
  propertiesApplicableTo,
} from "../../engine/itemEnhancements";
import type { BodySlot, CharacterEquipmentItem, MagicItemReferenceCategory } from "../../types";

type Tab = "weapon" | "armor" | "gear" | "wondrous" | "reference";

const TAB_TO_KIND: Record<Exclude<Tab, "reference">, CharacterEquipmentItem["itemKind"]> = {
  weapon: "weapon",
  armor: "armor",
  gear: "gear",
  wondrous: "maravilloso",
};

const BODY_SLOT_LABELS: Record<BodySlot, string> = {
  cabeza: "Cabeza",
  cuello: "Cuello",
  hombros: "Hombros",
  cintura: "Cintura",
  munecas: "Muñecas",
  manos: "Manos",
  anillo: "Anillo (hasta 2)",
  pies: "Pies",
};

const MAGIC_ITEM_CATEGORY_LABELS: Record<MagicItemReferenceCategory, string> = {
  arma_especifica: "Arma específica",
  armadura_o_escudo_especifica: "Armadura/escudo específico",
  maravilloso: "Objeto maravilloso",
  anillo: "Anillo",
  baston_de_mando: "Bastón de mando (rod)",
  baculo: "Báculo (staff)",
  pocion_o_aceite: "Poción o aceite",
  maldito: "Objeto maldito",
  artefacto_menor: "Artefacto menor",
  artefacto_mayor: "Artefacto mayor",
};

export default function StepEquipment({ character, onChange }: StepProps) {
  const [tab, setTab] = useState<Tab>("weapon");
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [referenceCategory, setReferenceCategory] = useState<MagicItemReferenceCategory | "todas">("todas");
  const [referenceSearch, setReferenceSearch] = useState("");
  const weapons = getEnabledWeapons(character.activeSourceBooks);
  const armors = getEnabledArmors(character.activeSourceBooks);
  const gear = getEnabledGear(character.activeSourceBooks);
  const wondrousItems = getEnabledWondrousItems(character.activeSourceBooks);
  const materials = getEnabledSpecialMaterials(character.activeSourceBooks);
  const magicProperties = getEnabledMagicItemProperties(character.activeSourceBooks);
  const magicItemReferences = getEnabledMagicItemReferences(character.activeSourceBooks);
  const filteredReferences = useMemo(() => {
    const search = referenceSearch.trim().toLowerCase();
    return magicItemReferences.filter((m) => {
      if (referenceCategory !== "todas" && m.category !== referenceCategory) return false;
      if (search && !m.name.toLowerCase().includes(search)) return false;
      return true;
    });
  }, [magicItemReferences, referenceCategory, referenceSearch]);
  const race = findRace(character.raceId);
  const finalScores = computeFinalAbilityScores(character.abilityScores, race, character.equipment);
  const carrying = computeCarryingCapacity(finalScores.str, race?.size ?? "Mediano");

  /**
   * Al equipar un objeto maravilloso, desequipa automáticamente los objetos
   * que ya ocupaban su misma ranura de cuerpo por encima del límite permitido
   * (1 por ranura, salvo "anillo" que permite 2), reproduciendo así los
   * conflictos reales de ranura del RAW (p.ej. no se pueden llevar a la vez
   * un Amuleto de Vigor y un Periapto de Sabiduría, ambos de cuello).
   */
  function applyWondrousSlotConflicts(equipment: CharacterEquipmentItem[], targetIndex: number): CharacterEquipmentItem[] {
    const target = equipment[targetIndex];
    const def = wondrousItems.find((w) => w.id === target.itemId) ?? findWondrousItem(target.itemId);
    if (!def) return equipment;
    const slotLimit = def.bodySlot === "anillo" ? 2 : 1;
    let remaining = slotLimit - 1;
    return equipment.map((e, i) => {
      if (i === targetIndex) return e;
      if (e.itemKind !== "maravilloso" || !e.equipped) return e;
      const otherDef = wondrousItems.find((w) => w.id === e.itemId) ?? findWondrousItem(e.itemId);
      if (otherDef?.bodySlot !== def.bodySlot) return e;
      if (remaining > 0) {
        remaining--;
        return e;
      }
      return { ...e, equipped: false };
    });
  }

  function addItem(itemId: string, itemKind: CharacterEquipmentItem["itemKind"]) {
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
      const wondrousDef = itemKind === "maravilloso" ? wondrousItems.find((w) => w.id === itemId) : undefined;
      const item: CharacterEquipmentItem = {
        itemId,
        itemKind,
        quantity: 1,
        equipped: itemKind !== "gear",
        ...(wondrousDef ? { enhancementBonus: wondrousDef.minBonus } : {}),
      };
      const equipment = [...c.equipment, item];
      return {
        ...c,
        equipment: itemKind === "maravilloso" ? applyWondrousSlotConflicts(equipment, equipment.length - 1) : equipment,
      };
    });
  }

  function updateItem(index: number, patch: Partial<CharacterEquipmentItem>) {
    onChange((c) => ({
      ...c,
      equipment: c.equipment.map((e, i) => (i === index ? { ...e, ...patch } : e)),
    }));
  }

  function setEquipped(index: number, equipped: boolean) {
    onChange((c) => {
      const equipment = c.equipment.map((e, i) => (i === index ? { ...e, equipped } : e));
      if (equipped && c.equipment[index]?.itemKind === "maravilloso") {
        return { ...c, equipment: applyWondrousSlotConflicts(equipment, index) };
      }
      return { ...c, equipment };
    });
  }

  function removeItem(index: number) {
    onChange((c) => ({ ...c, equipment: c.equipment.filter((_, i) => i !== index) }));
  }

  function toggleExpanded(index: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function toggleMagicProperty(index: number, propertyId: string, current: CharacterEquipmentItem) {
    const ids = current.magicPropertyIds ?? [];
    const magicPropertyIds = ids.includes(propertyId) ? ids.filter((id) => id !== propertyId) : [...ids, propertyId];
    updateItem(index, { magicPropertyIds });
  }

  function findItemData(itemId: string, kind: "weapon" | "armor" | "gear") {
    if (kind === "weapon") return weapons.find((w) => w.id === itemId);
    if (kind === "armor") return armors.find((a) => a.id === itemId);
    return gear.find((g) => g.id === itemId);
  }

  /** Coste unitario final de un objeto del inventario, incluyendo magistral/material/mejora mágica para armas y armaduras, o el nivel de bono elegido para objetos maravillosos. */
  function itemUnitPrice(e: CharacterEquipmentItem): number {
    if (e.itemKind === "weapon") {
      const w = weapons.find((x) => x.id === e.itemId);
      return w ? computeWeaponMarketPrice(w, e) : 0;
    }
    if (e.itemKind === "armor") {
      const a = armors.find((x) => x.id === e.itemId);
      return a ? computeArmorMarketPrice(a, e) : 0;
    }
    if (e.itemKind === "maravilloso") {
      const w = wondrousItems.find((x) => x.id === e.itemId);
      return w ? computeWondrousItemMarketPrice(w, e) : 0;
    }
    return gear.find((g) => g.id === e.itemId)?.cost ?? 0;
  }

  /** Peso unitario final, aplicando el multiplicador de peso del material especial en armas/armaduras. Los objetos maravillosos no llevan peso propio en este catálogo. */
  function itemUnitWeight(e: CharacterEquipmentItem): number {
    if (e.itemKind === "maravilloso") return 0;
    const data = findItemData(e.itemId, e.itemKind);
    if (!data) return 0;
    return e.itemKind === "weapon" || e.itemKind === "armor" ? computeItemWeight(data.weight, e) : data.weight;
  }

  const totalWeight = character.equipment.reduce((sum, e) => sum + itemUnitWeight(e) * e.quantity, 0);
  const totalCost = character.equipment.reduce((sum, e) => sum + itemUnitPrice(e) * e.quantity, 0);

  const catalog = tab === "weapon" ? weapons : tab === "armor" ? armors : tab === "gear" ? gear : [];

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
        {(["weapon", "armor", "gear", "wondrous", "reference"] as Tab[]).map((t) => (
          <button
            key={t}
            className={`wizard-step-pill ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "weapon"
              ? "Armas"
              : t === "armor"
                ? "Armaduras"
                : t === "gear"
                  ? "Equipo general"
                  : t === "wondrous"
                    ? "Objetos maravillosos"
                    : "Catálogo mágico (consulta)"}
          </button>
        ))}
      </div>

      {tab === "reference" ? (
        <div>
          <p className="muted">
            Catálogo de referencia del SRD (armas/armaduras específicas con nombre propio, objetos maravillosos,
            anillos, bastones de mando, báculos, pociones, objetos malditos y artefactos). Es solo consulta: precio,
            NC y efecto, sin automatización mecánica en la hoja ni integración con el inventario.
          </p>
          <div className="grid grid-2" style={{ maxWidth: 600, marginBottom: 12 }}>
            <div className="form-row">
              <label>Categoría</label>
              <select
                value={referenceCategory}
                onChange={(e) => setReferenceCategory(e.target.value as MagicItemReferenceCategory | "todas")}
              >
                <option value="todas">Todas</option>
                {Object.entries(MAGIC_ITEM_CATEGORY_LABELS).map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label>Buscar por nombre</label>
              <input
                type="text"
                value={referenceSearch}
                onChange={(e) => setReferenceSearch(e.target.value)}
                placeholder="p.ej. bolsa, anillo de..."
              />
            </div>
          </div>
          <p className="muted">{filteredReferences.length} objetos.</p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>NC</th>
              </tr>
            </thead>
            <tbody>
              {filteredReferences.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.name}
                    <div className="muted" style={{ fontSize: "0.8rem" }}>
                      {m.description}
                      {m.prerequisites && (
                        <>
                          <br />
                          <em>Prerrequisitos: {m.prerequisites}</em>
                        </>
                      )}
                    </div>
                  </td>
                  <td>{MAGIC_ITEM_CATEGORY_LABELS[m.category]}</td>
                  <td>{m.price}</td>
                  <td>{m.casterLevel ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : tab === "wondrous" ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ranura</th>
              <th>Coste</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {wondrousItems.map((w) => {
              const minCost = w.minBonus * w.minBonus * w.costPerBonusSquared;
              const maxCost = w.maxBonus * w.maxBonus * w.costPerBonusSquared;
              return (
                <tr key={w.id}>
                  <td>
                    {w.name}
                    <div className="muted" style={{ fontSize: "0.8rem" }}>
                      {w.description}
                    </div>
                  </td>
                  <td>{BODY_SLOT_LABELS[w.bodySlot]}</td>
                  <td>{minCost === maxCost ? `${minCost} po` : `${minCost}–${maxCost} po`}</td>
                  <td>
                    <button className="btn" onClick={() => addItem(w.id, "maravilloso")}>
                      + Añadir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
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
                  <button className="btn" onClick={() => addItem(item.id, TAB_TO_KIND[tab])}>
                    + Añadir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
              <th>Coste</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {character.equipment.map((e, i) => {
              if (e.itemKind === "maravilloso") {
                const w = wondrousItems.find((x) => x.id === e.itemId) ?? findWondrousItem(e.itemId);
                const bonus = e.enhancementBonus ?? w?.minBonus ?? 0;
                const bonusOptions: number[] = [];
                if (w) {
                  for (let n = w.minBonus; n <= w.maxBonus; n += w.bonusStep) bonusOptions.push(n);
                }
                return (
                  <tr key={`${e.itemId}-${i}`}>
                    <td>
                      {w ? `${w.name} +${bonus}` : e.itemId}
                      {w && (
                        <div className="muted" style={{ fontSize: "0.8rem" }}>
                          Ranura: {BODY_SLOT_LABELS[w.bodySlot]}
                        </div>
                      )}
                    </td>
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
                      <input type="checkbox" checked={e.equipped} onChange={(ev) => setEquipped(i, ev.target.checked)} />
                    </td>
                    <td>{itemUnitPrice(e).toFixed(2)} po</td>
                    <td style={{ display: "flex", gap: 6 }}>
                      {w && bonusOptions.length > 1 && (
                        <select
                          value={bonus}
                          onChange={(ev) => updateItem(i, { enhancementBonus: Number(ev.target.value) })}
                        >
                          {bonusOptions.map((n) => (
                            <option key={n} value={n}>
                              +{n}
                            </option>
                          ))}
                        </select>
                      )}
                      <button className="btn btn-danger" onClick={() => removeItem(i)}>
                        Quitar
                      </button>
                    </td>
                  </tr>
                );
              }
              const data = findItemData(e.itemId, e.itemKind);
              const canEnhance = e.itemKind === "weapon" || e.itemKind === "armor";
              const displayName = data && canEnhance ? computeItemDisplayName(data.name, e) : (data?.name ?? e.itemId);
              const applicableMaterials = materials.filter((m) => m.appliesTo.includes(e.itemKind === "weapon" ? "arma" : "armadura"));
              const applicableProperties = propertiesApplicableTo(
                magicProperties,
                e.itemKind === "weapon" ? "arma" : "armadura_o_escudo",
              );
              const enhancementBonus = e.enhancementBonus ?? 0;
              return (
                <Fragment key={`${e.itemId}-${i}`}>
                  <tr>
                    <td>
                      {displayName}
                      {canEnhance && isEnhancedItem(e) && (
                        <span className="tag" style={{ marginLeft: 6 }}>
                          especial
                        </span>
                      )}
                    </td>
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
                    <td>{itemUnitPrice(e).toFixed(2)} po</td>
                    <td style={{ display: "flex", gap: 6 }}>
                      {canEnhance && (
                        <button className="btn" onClick={() => toggleExpanded(i)}>
                          {expanded.has(i) ? "Ocultar" : "Mejorar"}
                        </button>
                      )}
                      <button className="btn btn-danger" onClick={() => removeItem(i)}>
                        Quitar
                      </button>
                    </td>
                  </tr>
                  {canEnhance && expanded.has(i) && (
                    <tr key={`${e.itemId}-${i}-detail`}>
                      <td colSpan={5}>
                        <div className="grid grid-3" style={{ alignItems: "start" }}>
                          <div className="form-row">
                            <label>
                              <input
                                type="checkbox"
                                checked={e.masterwork ?? false}
                                onChange={(ev) => updateItem(i, { masterwork: ev.target.checked })}
                              />{" "}
                              Calidad magistral
                            </label>
                            <p className="muted" style={{ margin: 0 }}>
                              {e.itemKind === "weapon" ? "+300 po, +1 al ataque (no mágico)." : "+150 po."} Un bono de
                              mejora mágica ya incluye la calidad magistral automáticamente.
                            </p>
                          </div>
                          <div className="form-row">
                            <label>Material especial</label>
                            <select
                              value={e.specialMaterialId ?? ""}
                              onChange={(ev) => updateItem(i, { specialMaterialId: ev.target.value || undefined })}
                            >
                              <option value="">Ninguno</option>
                              {applicableMaterials.map((m) => (
                                <option key={m.id} value={m.id}>
                                  {m.name}
                                </option>
                              ))}
                            </select>
                            {e.specialMaterialId && (
                              <p className="muted" style={{ margin: 0 }}>
                                {materials.find((m) => m.id === e.specialMaterialId)?.description}
                              </p>
                            )}
                          </div>
                          <div className="form-row">
                            <label>Bono de mejora mágica</label>
                            <select
                              value={enhancementBonus}
                              onChange={(ev) => updateItem(i, { enhancementBonus: Number(ev.target.value) || undefined })}
                            >
                              {[0, 1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>
                                  {n === 0 ? "Ninguno" : `+${n}`}
                                </option>
                              ))}
                            </select>
                          </div>
                          {e.itemKind === "weapon" && data && "isComposite" in data && data.isComposite && (
                            <div className="form-row">
                              <label>Calificación de Fuerza (arco compuesto)</label>
                              <input
                                type="number"
                                min={0}
                                value={e.strengthRating ?? 0}
                                onChange={(ev) => updateItem(i, { strengthRating: Math.max(0, Number(ev.target.value)) || undefined })}
                              />
                              <p className="muted" style={{ margin: 0 }}>
                                +100 po por punto. Añade el bono de Fuerza al daño hasta este límite; si tu bono de
                                Fuerza real es menor, sufres -2 al ataque con este arco.
                              </p>
                            </div>
                          )}
                        </div>
                        {applicableProperties.length > 0 && (
                          <div style={{ marginTop: 10 }}>
                            <p className="muted" style={{ margin: "0 0 4px" }}>
                              Propiedades mágicas especiales (requieren al menos +1 de mejora mágica en el objeto):
                            </p>
                            <div className="grid grid-3">
                              {applicableProperties.map((p) => {
                                const checked = (e.magicPropertyIds ?? []).includes(p.id);
                                const disabled = !checked && enhancementBonus < (p.minEnhancementBonus ?? 1);
                                return (
                                  <label key={p.id} style={{ opacity: disabled ? 0.5 : 1 }} title={p.description}>
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      disabled={disabled}
                                      onChange={() => toggleMagicProperty(i, p.id, e)}
                                    />{" "}
                                    {p.name} ({p.flatCost ? `+${p.flatCost} po` : `+${p.bonusEquivalent}`})
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
