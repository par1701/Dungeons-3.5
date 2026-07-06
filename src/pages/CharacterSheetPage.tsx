import type { ReactNode } from "react";
import { useParams, Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useCharacterStore } from "../store/characterStore";
import {
  findArmor,
  findClass,
  findCompanion,
  findFeat,
  findGear,
  findPower,
  findRace,
  findSkill,
  findSpell,
  findWeapon,
  getEnabledClasses,
} from "../data";
import {
  abilityModifier,
  applyRacialAdjustments,
  computeBabTotal,
  computeCarryingCapacity,
  computeCharacterArmorClass,
  computeMaxHp,
  computeSaveTotals,
  computeWeaponAttack,
  getUnlockedClassFeatures,
  parseSkillKey,
  sizeModifier,
  totalCharacterLevel,
} from "../engine/derive";
import {
  computeAnimalCompanionBonus,
  computeFamiliarGrantedAbilities,
  computeSpecialMountBonus,
  effectiveCompanionLevel,
} from "../engine/companions";
import CharacterSheetDocument from "../pdf/CharacterSheetDocument";

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="sheet-field">
      <span className="label">{label}</span>
      <span className="value">{value || " "}</span>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="sheet-panel">
      <div className="sheet-panel-title">{title}</div>
      <div className="sheet-panel-body">{children}</div>
    </div>
  );
}

export default function CharacterSheetPage() {
  const { id } = useParams();
  const character = useCharacterStore((s) => (id ? s.getCharacter(id) : undefined));

  if (!character) {
    return (
      <div className="empty-state">
        <p>No se encontró ese personaje.</p>
        <Link to="/personajes" className="btn">
          Volver a mis personajes
        </Link>
      </div>
    );
  }

  const classes = getEnabledClasses(character.activeSourceBooks);
  const race = findRace(character.raceId);
  const size = race?.size ?? "Mediano";
  const finalScores = applyRacialAdjustments(character.abilityScores, race);
  const level = totalCharacterLevel(character.classLevels);
  const bab = computeBabTotal(character.classLevels, classes);
  const saves = computeSaveTotals(character.classLevels, classes, finalScores);
  const hp = computeMaxHp(
    character.classLevels,
    classes,
    character.hpRolls,
    finalScores.con,
    character.activeVariantRules.includes("vr-hp-average"),
    character.activeVariantRules.includes("vr-max-hp-first-level"),
  );
  const carrying = computeCarryingCapacity(finalScores.str, size);
  const classSummary = character.classLevels
    .map((cl) => `${findClass(cl.classId)?.name ?? cl.classId} ${cl.level}`)
    .join(" / ");
  const unlockedFeatures = getUnlockedClassFeatures(character.classLevels, classes);

  const equippedArmorItems = character.equipment
    .filter((e) => e.equipped && e.itemKind === "armor")
    .map((e) => findArmor(e.itemId))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const bodyArmor = equippedArmorItems.find((a) => a.category !== "escudo");
  const shield = equippedArmorItems.find((a) => a.category === "escudo");
  const ac = computeCharacterArmorClass(finalScores, size, { bodyArmor, shield });

  const equippedWeapons = character.equipment
    .filter((e) => e.equipped && e.itemKind === "weapon")
    .map((e) => findWeapon(e.itemId))
    .filter((w): w is NonNullable<typeof w> => Boolean(w))
    .map((w) => computeWeaponAttack(w, bab, finalScores, size));

  const grapple = bab + abilityModifier(finalScores.str) + sizeModifier(size) * -1;
  const dexMod = abilityModifier(finalScores.dex);

  const abilities: [string, keyof typeof finalScores][] = [
    ["Fuerza", "str"],
    ["Destreza", "dex"],
    ["Constitución", "con"],
    ["Inteligencia", "int"],
    ["Sabiduría", "wis"],
    ["Carisma", "cha"],
  ];

  const totalGold =
    character.gold -
    character.equipment.reduce((sum, e) => {
      const data =
        e.itemKind === "weapon" ? findWeapon(e.itemId) : e.itemKind === "armor" ? findArmor(e.itemId) : findGear(e.itemId);
      return sum + (data?.cost ?? 0) * e.quantity;
    }, 0);

  return (
    <div>
      <div className="char-actions no-print" style={{ marginBottom: 16 }}>
        <Link to={`/personajes/${character.id}/editar`} className="btn">
          Editar
        </Link>
        <button className="btn btn-primary" onClick={() => window.print()}>
          Imprimir
        </button>
        <PDFDownloadLink
          document={<CharacterSheetDocument character={character} />}
          fileName={`${character.name || "personaje"}.pdf`}
          className="btn"
        >
          {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
        </PDFDownloadLink>
      </div>

      <div className="sheet">
        <div className="sheet-title-block">
          <div className="char-name">{character.name || "Personaje sin nombre"}</div>
          <div className="sheet-field-grid">
            <Field label="Clase y nivel" value={classSummary || "Sin clase"} />
            <Field label="Raza" value={race?.name ?? character.raceId} />
            <Field label="Alineamiento" value={character.alignment} />
            <Field label="Deidad" value={character.deity} />
            <Field label="Jugador/a" value={character.playerName} />
            <Field label="Tamaño" value={size} />
            <Field label="Edad" value={character.age} />
            <Field label="Género" value={character.gender} />
            <Field label="Altura" value={character.height} />
            <Field label="Peso" value={character.weight} />
          </div>
        </div>

        <div className="sheet-columns-3">
          <div className="ability-scores-col">
            {abilities.map(([label, key]) => {
              const mod = abilityModifier(finalScores[key]);
              return (
                <div className="ability-score-box" key={key}>
                  <span className="ability-name">{label}</span>
                  <span className="ability-score">{finalScores[key]}</span>
                  <span className="ability-mod">
                    {mod >= 0 ? `+${mod}` : mod}
                  </span>
                </div>
              );
            })}
          </div>

          <div>
            <Panel title="Clase de armadura">
              <div className="stat-total">
                <span className="value">{ac.total}</span>
                <span className="label">CA total</span>
              </div>
              <div className="stat-breakdown">
                <div className="part"><span className="num">10</span><span className="lbl">Base</span></div>
                <div className="part"><span className="num">{ac.armorBonus}</span><span className="lbl">Armadura</span></div>
                <div className="part"><span className="num">{ac.shieldBonus}</span><span className="lbl">Escudo</span></div>
                <div className="part"><span className="num">{ac.maxDexBonus === null ? dexMod : Math.min(dexMod, ac.maxDexBonus)}</span><span className="lbl">Des</span></div>
                <div className="part"><span className="num">{sizeModifier(size)}</span><span className="lbl">Tamaño</span></div>
                <div className="part"><span className="num">0</span><span className="lbl">Natural</span></div>
                <div className="part"><span className="num">0</span><span className="lbl">Otros</span></div>
              </div>
              <p className="muted" style={{ textAlign: "center", margin: 0 }}>
                CA a distancia: {ac.touch} · CA desprevenido: {ac.flatFooted}
              </p>
            </Panel>

            <Panel title="Salvaciones">
              <table className="data-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Total</th>
                    <th>Base</th>
                    <th>Hab.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fortaleza (Con)</td>
                    <td><strong>{saves.fort >= 0 ? `+${saves.fort}` : saves.fort}</strong></td>
                    <td>{saves.fort - abilityModifier(finalScores.con)}</td>
                    <td>{abilityModifier(finalScores.con)}</td>
                  </tr>
                  <tr>
                    <td>Reflejos (Des)</td>
                    <td><strong>{saves.ref >= 0 ? `+${saves.ref}` : saves.ref}</strong></td>
                    <td>{saves.ref - dexMod}</td>
                    <td>{dexMod}</td>
                  </tr>
                  <tr>
                    <td>Voluntad (Sab)</td>
                    <td><strong>{saves.will >= 0 ? `+${saves.will}` : saves.will}</strong></td>
                    <td>{saves.will - abilityModifier(finalScores.wis)}</td>
                    <td>{abilityModifier(finalScores.wis)}</td>
                  </tr>
                </tbody>
              </table>
            </Panel>

            <Panel title="Iniciativa y velocidad">
              <p style={{ margin: 0 }}>
                Iniciativa: <strong>{dexMod >= 0 ? `+${dexMod}` : dexMod}</strong> (Des) · Velocidad:{" "}
                <strong>{race?.speed ?? 30} pies</strong>
              </p>
            </Panel>
          </div>

          <div>
            <Panel title="Ataque">
              <p style={{ margin: 0 }}>
                Bonif. ataque base: <strong>+{bab}</strong>
                <br />
                Golpe de presa: <strong>{grapple >= 0 ? `+${grapple}` : grapple}</strong>
              </p>
            </Panel>
            <Panel title="Puntos de golpe">
              <div className="stat-total">
                <span className="value">{hp}</span>
                <span className="label">PG máximos</span>
              </div>
            </Panel>
            <Panel title="Carga">
              <p className="muted" style={{ margin: 0 }}>
                Ligera ≤ {carrying.light} lb · Media ≤ {carrying.medium} lb · Pesada ≤ {carrying.heavy} lb
              </p>
            </Panel>
          </div>
        </div>

        <Panel title="Ataques">
          {equippedWeapons.length === 0 ? (
            <p className="muted">Sin armas equipadas.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Arma</th>
                  <th>Bonif. ataque</th>
                  <th>Daño</th>
                  <th>Crítico</th>
                  <th>Alcance</th>
                </tr>
              </thead>
              <tbody>
                {equippedWeapons.map((w) => (
                  <tr key={w.itemId}>
                    <td>{w.name}</td>
                    <td>{w.attackBonus >= 0 ? `+${w.attackBonus}` : w.attackBonus}</td>
                    <td>{w.damage}</td>
                    <td>{w.critical}</td>
                    <td>{w.rangeIncrement ? `${w.rangeIncrement} pies` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Panel>

        <Panel title="Habilidades">
          <table className="data-table sheet-skills">
            <thead>
              <tr>
                <th>De clase</th>
                <th>Habilidad</th>
                <th>Total</th>
                <th>Rangos</th>
                <th>Mod.</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(character.skillRanks)
                .filter(([, ranks]) => ranks > 0)
                .map(([key, ranks]) => {
                  const { skillId, specialization } = parseSkillKey(key);
                  const skill = findSkill(skillId);
                  const isClassSkill = character.classLevels.some((cl) =>
                    classes.find((c) => c.id === cl.classId)?.classSkills.includes(skillId),
                  );
                  const mod = skill ? abilityModifier(finalScores[skill.keyAbility]) : 0;
                  const label = skill ? (specialization ? `${skill.name} (${specialization})` : skill.name) : key;
                  return (
                    <tr key={key}>
                      <td className="class-skill-mark">{isClassSkill ? "✓" : ""}</td>
                      <td>{label}</td>
                      <td>
                        <strong>{ranks + mod}</strong>
                      </td>
                      <td>{ranks}</td>
                      <td>{mod >= 0 ? `+${mod}` : mod}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Panel>

        {race && race.traits.length > 0 && (
          <Panel title="Rasgos raciales">
            <p className="muted" style={{ marginTop: 0 }}>
              Incluye bonificadores condicionales que solo se aplican en las circunstancias descritas.
            </p>
            <ul>
              {race.traits.map((t) => (
                <li key={t.name}>
                  <strong>{t.name}:</strong> {t.description}
                </li>
              ))}
            </ul>
          </Panel>
        )}

        {unlockedFeatures.length > 0 && (
          <Panel title="Rasgos de clase">
            <ul>
              {unlockedFeatures.map((f, i) => (
                <li key={i}>
                  <strong>
                    {f.name} ({f.className} {f.level}):
                  </strong>{" "}
                  {f.description}
                </li>
              ))}
            </ul>
          </Panel>
        )}

        <Panel title="Dotes">
          <ul>
            {character.feats.map((f) => {
              const feat = findFeat(f.featId);
              return (
                <li key={f.featId}>
                  <strong>{feat?.name ?? f.featId}:</strong> {feat?.benefit ?? ""}
                </li>
              );
            })}
          </ul>
        </Panel>

        {character.companions.length > 0 && (
          <Panel title="Compañeros, familiares y monturas especiales">
            {character.companions.map((comp) => {
              const base = findCompanion(comp.baseCreatureId);
              if (!base) return null;
              const grant = classes.find((c) => c.id === comp.masterClassId)?.companionGrant;
              return (
                <div key={comp.id} style={{ marginBottom: 12 }}>
                  <h4 style={{ margin: "0 0 4px" }}>
                    {comp.name || base.name} — {base.name} ({comp.masterClassId})
                  </h4>
                  <p className="muted" style={{ margin: "0 0 4px" }}>
                    {base.size} · {base.baseHitDice}d{base.hitDie} DG · Vel. {base.baseSpeed} pies · Armadura natural +
                    {base.baseNaturalArmor}
                  </p>
                  <p style={{ margin: "0 0 4px" }}>
                    <strong>Ataques:</strong>{" "}
                    {base.attacks.map((a) => `${a.name} (${a.damage})`).join(", ") || "—"}
                  </p>
                  {base.specialQualities.length > 0 && (
                    <p style={{ margin: "0 0 4px" }}>
                      <strong>Cualidades especiales:</strong> {base.specialQualities.join(", ")}
                    </p>
                  )}
                  {base.skillBonuses.length > 0 && (
                    <p style={{ margin: "0 0 4px" }}>
                      <strong>Bonos de habilidad:</strong> {base.skillBonuses.join(", ")}
                    </p>
                  )}
                  {grant?.kind === "animal_companion" &&
                    (() => {
                      const effLevel = effectiveCompanionLevel(character.classLevels, grant, comp.masterClassId);
                      const bonus = computeAnimalCompanionBonus(effLevel);
                      return (
                        <p className="muted" style={{ margin: 0 }}>
                          Bonos por nivel de amo (nivel efectivo {effLevel}): +{bonus.hitDiceBonus} DG, +
                          {bonus.naturalArmorBonus} armadura natural, +{bonus.abilityBonus} Fue/Des,{" "}
                          {bonus.bonusTricks} trucos de bonificación
                          {bonus.special.length > 0 ? `, ${bonus.special.join(", ")}` : ""}.
                        </p>
                      );
                    })()}
                  {grant?.kind === "familiar" && (
                    <p className="muted" style={{ margin: 0 }}>
                      Habilidades otorgadas al amo: {computeFamiliarGrantedAbilities(level).join(", ")}.
                    </p>
                  )}
                  {grant?.kind === "special_mount" &&
                    (() => {
                      const paladinLevel = character.classLevels.find((cl) => cl.classId === comp.masterClassId)?.level ?? 0;
                      const bonus = computeSpecialMountBonus(paladinLevel);
                      if (!bonus) return null;
                      return (
                        <p className="muted" style={{ margin: 0 }}>
                          Bonos por nivel de paladín: +{bonus.hitDiceBonus} DG, +{bonus.strBonus} Fue, Int{" "}
                          {bonus.intScore}, +{bonus.naturalArmorBonus} armadura natural
                          {bonus.special.length > 0 ? `, ${bonus.special.join(", ")}` : ""}.
                        </p>
                      );
                    })()}
                </div>
              );
            })}
          </Panel>
        )}

        {character.spells.length > 0 && (
          <Panel title="Conjuros">
            <ul>
              {character.spells.map((s, i) => {
                const spell = findSpell(s.spellId);
                return (
                  <li key={i} style={{ marginBottom: 6 }}>
                    <strong>
                      [Nv.{s.level}] {spell?.name ?? s.spellId} ({s.classId})
                    </strong>
                    {spell && (
                      <div className="muted">
                        {spell.school}
                        {spell.subschool ? ` (${spell.subschool})` : ""} · {spell.castingTime} · {spell.range} ·{" "}
                        {spell.duration} · Salv. {spell.savingThrow} · RC {spell.spellResistance}
                        <br />
                        {spell.description}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Panel>
        )}

        {character.powers.length > 0 && (
          <Panel title="Poderes psiónicos">
            <ul>
              {character.powers.map((p, i) => {
                const power = findPower(p.powerId);
                return (
                  <li key={i} style={{ marginBottom: 6 }}>
                    <strong>
                      [Nv.{p.level}] {power?.name ?? p.powerId} ({p.classId})
                    </strong>
                    {power && (
                      <div className="muted">
                        {power.discipline} · {power.manifestingTime} · {power.range} · {power.duration} · Salv.{" "}
                        {power.savingThrow} · RP {power.powerResistance}
                        <br />
                        {power.description}
                        {power.augment && (
                          <>
                            <br />
                            <em>Aumentar: {power.augment}</em>
                          </>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Panel>
        )}

        <Panel title="Equipo">
          <table className="data-table">
            <thead>
              <tr>
                <th>Objeto</th>
                <th>Cant.</th>
                <th>Peso</th>
                <th>Equipado</th>
              </tr>
            </thead>
            <tbody>
              {character.equipment.map((e, i) => {
                const data =
                  e.itemKind === "weapon"
                    ? findWeapon(e.itemId)
                    : e.itemKind === "armor"
                      ? findArmor(e.itemId)
                      : findGear(e.itemId);
                return (
                  <tr key={i}>
                    <td>{data?.name ?? e.itemId}</td>
                    <td>{e.quantity}</td>
                    <td>{data ? (data.weight * e.quantity).toFixed(1) : "—"} lb</td>
                    <td>{e.equipped ? "Sí" : "No"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p style={{ marginTop: 8 }}>Oro restante: {totalGold.toFixed(2)} po</p>
        </Panel>

        {character.notes && (
          <Panel title="Notas">
            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{character.notes}</p>
          </Panel>
        )}
      </div>
    </div>
  );
}
