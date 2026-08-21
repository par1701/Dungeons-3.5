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
  findWondrousItem,
  getEnabledClasses,
} from "../data";
import {
  abilityModifier,
  computeBabTotal,
  computeBaseSave,
  computeCarryingCapacity,
  computeCharacterArmorClass,
  computeEquipmentPassiveBonuses,
  computeFinalAbilityScores,
  computeFlurryOfBlowsSequence,
  computeInitiativeBonus,
  computeMaxHp,
  computeRapidShotSequence,
  computeSaveTotals,
  computeRangeIncrementAttackBonuses,
  computeTwoWeaponFightingOption,
  computeWeaponAttack,
  annotateSpellDescription,
  findChoiceValue,
  getAllKnownFeatIds,
  getBonusFeatsFromClasses,
  getCadTempestSteelDanceReduction,
  getCasterLevelForClass,
  getContemplativeStoneWillBonus,
  getDivineGraceBonus,
  getFavoredEnemyBonuses,
  getScoutBattleBonus,
  getSoulknifeMindBladeBonus,
  getUnlockedClassFeatureChoices,
  getUnlockedClassFeatures,
  monkUnarmedDamage,
  parseSkillKey,
  resolveSpellDuration,
  resolveSpellRange,
  sizeModifier,
  totalCharacterLevel,
} from "../engine/derive";
import { computeWondrousItemMarketPrice } from "../engine/itemEnhancements";
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
  const finalScores = computeFinalAbilityScores(character.abilityScores, race, character.equipment);
  const equipmentBonuses = computeEquipmentPassiveBonuses(character.equipment);
  const level = totalCharacterLevel(character.classLevels);
  const bab = computeBabTotal(character.classLevels, classes);
  const saves = computeSaveTotals(character.classLevels, classes, finalScores, equipmentBonuses.saveResistance);
  const hp = computeMaxHp(
    character.classLevels,
    classes,
    character.hpRolls,
    finalScores.con,
    character.activeVariantRules.includes("vr-hp-average"),
    character.activeVariantRules.includes("vr-max-hp-first-level"),
    character.activeVariantRules.includes("vr-cm-stalwart-sorcerer"),
    character.bonusHp,
  );
  const carrying = computeCarryingCapacity(finalScores.str, size);
  const classSummary = character.classLevels
    .map((cl) => `${findClass(cl.classId)?.name ?? cl.classId} ${cl.level}`)
    .join(" / ");
  const unlockedFeatures = getUnlockedClassFeatures(character.classLevels, classes, character.activeVariantRules);
  const classFeatureChoices = character.classFeatureChoices ?? [];
  const favoredEnemyBonuses = getFavoredEnemyBonuses(classFeatureChoices);
  const unlockedChoices = getUnlockedClassFeatureChoices(character.classLevels, classes, character.activeVariantRules);
  const bonusFeats = getBonusFeatsFromClasses(character.classLevels, classes, classFeatureChoices, character.activeVariantRules);

  const equippedArmorItems = character.equipment
    .filter((e) => e.equipped && e.itemKind === "armor")
    .map((e) => ({ armor: findArmor(e.itemId), item: e }))
    .filter((x): x is { armor: NonNullable<ReturnType<typeof findArmor>>; item: (typeof character.equipment)[number] } => Boolean(x.armor));
  const bodyArmor = equippedArmorItems.find((x) => x.armor.category !== "escudo");
  const shield = equippedArmorItems.find((x) => x.armor.category === "escudo");
  const wearingMediumOrHeavyArmor = bodyArmor?.armor.category === "media" || bodyArmor?.armor.category === "pesada";
  const wearingHeavyShield = Boolean(shield && shield.armor.armorBonus >= 2);

  const rawEquippedWeapons = character.equipment
    .filter((e) => e.equipped && e.itemKind === "weapon")
    .map((e) => ({ weapon: findWeapon(e.itemId), item: e }))
    .filter((x): x is { weapon: NonNullable<ReturnType<typeof findWeapon>>; item: (typeof character.equipment)[number] } => Boolean(x.weapon));
  const meleeWeaponCount = rawEquippedWeapons.filter((x) => x.weapon.type === "cuerpo_a_cuerpo").length;

  const ac = computeCharacterArmorClass(
    finalScores,
    size,
    { bodyArmor, shield },
    character.activeVariantRules.includes("vr-ua-armor-as-dr"),
    character.bonusInsightAC,
    equipmentBonuses.deflection,
    equipmentBonuses.naturalArmor,
    character.classLevels,
    meleeWeaponCount,
  );

  const equippedWeapons = rawEquippedWeapons.map((x) =>
    computeWeaponAttack(
      x.weapon,
      bab,
      finalScores,
      size,
      character.feats,
      x.item,
      character.classLevels,
      classFeatureChoices,
      wearingMediumOrHeavyArmor,
      wearingHeavyShield,
    ),
  );

  // Cuchillo del Alma: la hoja mental no es un objeto del inventario, sino un
  // arma psiónica siempre disponible desde nivel 1 (funciona como una espada
  // corta), con un bono de mejora al ataque y al daño según el nivel.
  const soulknifeLevel = character.classLevels.find((cl) => cl.classId === "cps-soulknife")?.level ?? 0;
  const mindBladeBonus = getSoulknifeMindBladeBonus(character.classLevels);
  const mindBladeBaseWeapon = soulknifeLevel > 0 ? findWeapon("short-sword") : undefined;
  const mindBladeAttack = mindBladeBaseWeapon
    ? {
        ...computeWeaponAttack(
          mindBladeBaseWeapon,
          bab,
          finalScores,
          size,
          character.feats,
          mindBladeBonus > 0
            ? { itemId: "short-sword", itemKind: "weapon" as const, quantity: 1, equipped: true, enhancementBonus: mindBladeBonus }
            : undefined,
          character.classLevels,
          classFeatureChoices,
          wearingMediumOrHeavyArmor,
          wearingHeavyShield,
        ),
        itemId: "mind-blade",
        name: mindBladeBonus > 0 ? `Hoja Mental +${mindBladeBonus}` : "Hoja Mental",
      }
    : undefined;
  const allAttacks = mindBladeAttack ? [...equippedWeapons, mindBladeAttack] : equippedWeapons;

  const meleeAttackBonus = bab + abilityModifier(finalScores.str) + sizeModifier(size);
  const rangedAttackBonus = bab + abilityModifier(finalScores.dex) + sizeModifier(size);
  const grapple = bab + abilityModifier(finalScores.str) + sizeModifier(size) * -1;
  const dexMod = abilityModifier(finalScores.dex);

  // Opciones de ataque activables por dotes/estilos de combate.
  const knownFeatIds = getAllKnownFeatIds(character.feats, character.classLevels, classes, classFeatureChoices, character.activeVariantRules);
  const initiativeBonus = computeInitiativeBonus(knownFeatIds, character.classLevels);
  const initiative = dexMod + initiativeBonus;
  const rangedWeapons = equippedWeapons.filter((w) => w.type === "distancia" && w.rangeIncrement);
  const meleeWeapons = equippedWeapons.filter((w) => w.type === "cuerpo_a_cuerpo");
  const monkLevel = character.classLevels.find((cl) => cl.classId === "monk")?.level ?? 0;
  const unarmedAttackBonus = bab + abilityModifier(finalScores.str) + sizeModifier(size);
  const steelDanceReduction = getCadTempestSteelDanceReduction(character.classLevels);
  const twoWeaponOption =
    meleeWeapons.length >= 2
      ? computeTwoWeaponFightingOption(
          meleeWeapons[0].attackBonus,
          meleeWeapons[1].attackBonus,
          bab,
          false,
          knownFeatIds.has("two-weapon-fighting"),
          knownFeatIds.has("improved-two-weapon-fighting"),
          knownFeatIds.has("greater-two-weapon-fighting"),
          steelDanceReduction.primary,
          steelDanceReduction.offHand,
        )
      : null;
  const twoWeaponOptionLight =
    meleeWeapons.length >= 2
      ? computeTwoWeaponFightingOption(
          meleeWeapons[0].attackBonus,
          meleeWeapons[1].attackBonus,
          bab,
          true,
          knownFeatIds.has("two-weapon-fighting"),
          knownFeatIds.has("improved-two-weapon-fighting"),
          knownFeatIds.has("greater-two-weapon-fighting"),
          steelDanceReduction.primary,
          steelDanceReduction.offHand,
        )
      : null;
  const fmtSeq = (seq: number[]) => seq.map((b) => (b >= 0 ? `+${b}` : b)).join("/");
  const showAttackOptions =
    (rangedWeapons.length > 0 && (knownFeatIds.has("rapid-shot") || knownFeatIds.has("manyshot"))) ||
    monkLevel > 0 ||
    Boolean(twoWeaponOption);

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
      if (e.itemKind === "maravilloso") {
        const w = findWondrousItem(e.itemId);
        return sum + (w ? computeWondrousItemMarketPrice(w, e) : 0) * e.quantity;
      }
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
                <div className="part"><span className="num">{ac.naturalArmorBonus}</span><span className="lbl">Natural</span></div>
                <div className="part"><span className="num">{ac.deflectionBonus}</span><span className="lbl">Desviación</span></div>
                <div className="part"><span className="num">{ac.insightBonus}</span><span className="lbl">Perspicacia</span></div>
                <div className="part"><span className="num">{ac.monkWisdomBonus + ac.dervishGraceBonus + ac.tempestDefenseBonus}</span><span className="lbl">Clase</span></div>
              </div>
              <p className="muted" style={{ textAlign: "center", margin: 0 }}>
                CA a distancia: {ac.touch} · CA desprevenido: {ac.flatFooted}
              </p>
              {ac.damageReduction > 0 && (
                <p className="muted" style={{ textAlign: "center", margin: 0 }}>
                  Reducción de daño: {ac.damageReduction}/-
                </p>
              )}
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
                    <td>{computeBaseSave("fort", character.classLevels, classes)}</td>
                    <td>{abilityModifier(finalScores.con)}</td>
                  </tr>
                  <tr>
                    <td>Reflejos (Des)</td>
                    <td><strong>{saves.ref >= 0 ? `+${saves.ref}` : saves.ref}</strong></td>
                    <td>{computeBaseSave("ref", character.classLevels, classes)}</td>
                    <td>{dexMod}</td>
                  </tr>
                  <tr>
                    <td>Voluntad (Sab)</td>
                    <td><strong>{saves.will >= 0 ? `+${saves.will}` : saves.will}</strong></td>
                    <td>{computeBaseSave("will", character.classLevels, classes)}</td>
                    <td>{abilityModifier(finalScores.wis)}</td>
                  </tr>
                </tbody>
              </table>
              {(equipmentBonuses.saveResistance > 0 ||
                getDivineGraceBonus(character.classLevels, finalScores) > 0 ||
                getScoutBattleBonus(character.classLevels) > 0 ||
                getContemplativeStoneWillBonus(character.classLevels) > 0) && (
                <p className="muted" style={{ margin: "6px 0 0" }}>
                  Incluye
                  {equipmentBonuses.saveResistance > 0 ? ` resistencia +${equipmentBonuses.saveResistance} (equipo);` : ""}
                  {getDivineGraceBonus(character.classLevels, finalScores) > 0
                    ? ` Gracia Divina +${getDivineGraceBonus(character.classLevels, finalScores)} (Fort/Ref/Vol);`
                    : ""}
                  {getScoutBattleBonus(character.classLevels) > 0
                    ? ` Bono de Batalla +${getScoutBattleBonus(character.classLevels)} (Fort);`
                    : ""}
                  {getContemplativeStoneWillBonus(character.classLevels) > 0
                    ? ` Voluntad de Piedra +${getContemplativeStoneWillBonus(character.classLevels)} (Vol);`
                    : ""}
                </p>
              )}
            </Panel>

            <Panel title="Iniciativa y velocidad">
              <p style={{ margin: 0 }}>
                Iniciativa: <strong>{initiative >= 0 ? `+${initiative}` : initiative}</strong> ({dexMod >= 0 ? `+${dexMod}` : dexMod} Des
                {initiativeBonus !== 0 ? `, ${initiativeBonus >= 0 ? "+" : ""}${initiativeBonus} otros` : ""}) · Velocidad:{" "}
                <strong>{race?.speed ?? 30} pies</strong>
              </p>
            </Panel>
          </div>

          <div>
            <Panel title="Ataque">
              <p style={{ margin: 0 }}>
                Bonif. ataque base: <strong>+{bab}</strong>
                <br />
                Cuerpo a cuerpo: <strong>{meleeAttackBonus >= 0 ? `+${meleeAttackBonus}` : meleeAttackBonus}</strong>
                <br />
                A distancia: <strong>{rangedAttackBonus >= 0 ? `+${rangedAttackBonus}` : rangedAttackBonus}</strong>
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
          {allAttacks.length === 0 ? (
            <p className="muted">Sin armas equipadas.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Arma</th>
                  <th>Ataque completo</th>
                  <th>Daño</th>
                  <th>Crítico</th>
                  <th>Alcance</th>
                  <th>Cualidades</th>
                </tr>
              </thead>
              <tbody>
                {allAttacks.map((w) => (
                  <tr key={w.itemId}>
                    <td>{w.name}</td>
                    <td>{w.fullAttackSequence.map((b) => (b >= 0 ? `+${b}` : b)).join("/")}</td>
                    <td>{w.damage}</td>
                    <td>{w.critical}</td>
                    <td>{w.rangeIncrement ? `${w.rangeIncrement} pies` : "—"}</td>
                    <td>
                      {w.specialMaterial?.name}
                      {w.specialMaterial && w.magicProperties.length > 0 ? ", " : ""}
                      {w.magicProperties.map((p) => p.name).join(", ")}
                      {!w.specialMaterial && w.magicProperties.length === 0 && "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {allAttacks
            .filter((w) => w.magicProperties.length > 0 || w.specialMaterial)
            .map((w) => (
              <div key={`${w.itemId}-qualities`} className="muted" style={{ marginTop: 8, fontSize: "0.85rem" }}>
                <strong>{w.name}:</strong>
                {w.specialMaterial && (
                  <div>
                    {w.specialMaterial.name}: {w.specialMaterial.description}
                  </div>
                )}
                {w.magicProperties.map((p) => (
                  <div key={p.id}>
                    {p.name}: {p.description}
                  </div>
                ))}
              </div>
            ))}
          {allAttacks
            .filter((w) => w.rangeIncrement)
            .map((w) => (
              <p key={w.itemId} className="muted" style={{ marginTop: 8, marginBottom: 0 }}>
                <strong>{w.name} por distancia</strong> (-{w.rangePenaltyHalved ? 1 : 2} acumulativo por incremento de{" "}
                {w.rangeIncrement} pies, máx. 10
                {w.rangePenaltyHalved ? " (penalizador reducido a la mitad por el Iniciado de la Orden del Arco)" : ""}
                {knownFeatIds.has("point-blank-shot") ? "; incluye +1 ataque/daño de Disparo a Bocajarro a 9 m (30 pies) o menos" : ""}
                ):{" "}
                {computeRangeIncrementAttackBonuses(w.attackBonus, w.rangeIncrement!, knownFeatIds.has("point-blank-shot"), w.rangePenaltyHalved)
                  .map(
                    (r) =>
                      `${r.distanceFeet}p ${r.attackBonus >= 0 ? "+" : ""}${r.attackBonus}${r.damageBonus > 0 ? ` (daño +${r.damageBonus})` : ""}`,
                  )
                  .join(" · ")}
              </p>
            ))}
        </Panel>

        {showAttackOptions && (
          <Panel title="Opciones de ataque">
            <p className="muted" style={{ marginTop: 0 }}>
              Rutinas de ataque alternativas disponibles por dotes o rasgos de clase, en vez del ataque completo
              normal de arriba.
            </p>
            {knownFeatIds.has("rapid-shot") &&
              rangedWeapons.map((w) => (
                <p key={`rapid-${w.itemId}`}>
                  <strong>Disparo Rápido ({w.name}):</strong> {fmtSeq(computeRapidShotSequence(w.attackBonus, bab))}
                </p>
              ))}
            {knownFeatIds.has("manyshot") &&
              rangedWeapons.map((w) => (
                <p key={`manyshot-${w.itemId}`}>
                  <strong>Multidisparo ({w.name}):</strong> ataque único a {w.attackBonus >= 0 ? "+" : ""}
                  {w.attackBonus} con 2 flechas{bab >= 11 ? " (3 si el objetivo está a 9 m o menos)" : ""}, objetivo a
                  9 m o menos.
                </p>
              ))}
            {monkLevel > 0 && (
              <p>
                <strong>Ráfaga de Golpes (desarmado, {monkUnarmedDamage(monkLevel)}):</strong>{" "}
                {fmtSeq(computeFlurryOfBlowsSequence(unarmedAttackBonus, monkLevel, bab))}
              </p>
            )}
            {twoWeaponOption && twoWeaponOptionLight && (
              <div>
                <p style={{ marginBottom: 4 }}>
                  <strong>
                    Combate con dos armas ({meleeWeapons[0].name} / {meleeWeapons[1].name}):
                  </strong>
                </p>
                <p className="muted" style={{ margin: 0 }}>
                  Mano secundaria no ligera: mano principal {fmtSeq(twoWeaponOption.primary)} · mano secundaria{" "}
                  {fmtSeq(twoWeaponOption.offHand)}
                </p>
                <p className="muted" style={{ margin: 0 }}>
                  Mano secundaria ligera: mano principal {fmtSeq(twoWeaponOptionLight.primary)} · mano secundaria{" "}
                  {fmtSeq(twoWeaponOptionLight.offHand)}
                </p>
              </div>
            )}
          </Panel>
        )}
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

        {unlockedChoices.filter((uc) => uc.choice.kind !== "dote_restringida").length > 0 && (
          <Panel title="Elecciones de clase">
            <ul>
              {unlockedChoices
                .filter((uc) => uc.choice.kind !== "dote_restringida")
                .map((uc, i) => {
                  const value = findChoiceValue(classFeatureChoices, uc.classId, uc.choice.id, uc.level);
                  const selectedOption = uc.choice.options?.find((o) => o.id === value);
                  const optionLabel = uc.choice.kind === "lista_fija" ? selectedOption?.label : value;
                  return (
                    <li key={i}>
                      <strong>
                        {uc.choice.label} ({uc.className} {uc.level}):
                      </strong>{" "}
                      {optionLabel || <span className="muted">sin elegir</span>}
                      {selectedOption?.description && (
                        <div className="muted" style={{ marginTop: 2 }}>
                          {selectedOption.description}
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
            {favoredEnemyBonuses.length > 0 && (
              <p className="muted" style={{ marginTop: 8, marginBottom: 0 }}>
                <strong>Bono total contra enemigos predilectos:</strong>{" "}
                {favoredEnemyBonuses.map((fe) => `${fe.enemy} +${fe.bonus}`).join(" · ")}
              </p>
            )}
          </Panel>
        )}

        <Panel title="Dotes">
          <ul>
            {character.feats.map((f, i) => {
              const feat = findFeat(f.featId);
              return (
                <li key={`${f.featId}-${i}`}>
                  <strong>
                    {feat?.name ?? f.featId}
                    {f.selection ? ` (${f.selection})` : ""}:
                  </strong>{" "}
                  {feat?.benefit ?? ""}
                </li>
              );
            })}
            {bonusFeats.map((bf, i) => {
              const feat = findFeat(bf.featId);
              return (
                <li key={`bonus-${i}`}>
                  <strong>{feat?.name ?? bf.featId}</strong>{" "}
                  <span className="muted">
                    (dote de bonificación — {bf.sourceLabel}, {bf.className} {bf.level})
                  </span>
                  : {feat?.benefit ?? ""}
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
                const casterLevel = getCasterLevelForClass(s.classId, character.classLevels, classes);
                const resolvedRange = spell ? resolveSpellRange(spell.range, casterLevel) : null;
                const resolvedDuration = spell ? resolveSpellDuration(spell.duration, casterLevel) : null;
                return (
                  <li key={i} style={{ marginBottom: 6 }}>
                    <strong>
                      [Nv.{s.level}] {spell?.name ?? s.spellId} ({s.classId})
                      {casterLevel > 0 ? ` · NL ${casterLevel}` : ""}
                    </strong>
                    {spell && (
                      <div className="muted">
                        {spell.school}
                        {spell.subschool ? ` (${spell.subschool})` : ""} · {spell.castingTime} · Alcance:{" "}
                        {spell.range}
                        {resolvedRange ? ` → ${resolvedRange}` : ""} · Duración: {spell.duration}
                        {resolvedDuration ? ` → ${resolvedDuration}` : ""} · Salv. {spell.savingThrow} · RC{" "}
                        {spell.spellResistance}
                        <br />
                        {annotateSpellDescription(spell.description, casterLevel)}
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
                if (e.itemKind === "maravilloso") {
                  const w = findWondrousItem(e.itemId);
                  const bonus = e.enhancementBonus ?? w?.minBonus ?? 0;
                  return (
                    <tr key={i}>
                      <td>{w ? `${w.name} +${bonus}` : e.itemId}</td>
                      <td>{e.quantity}</td>
                      <td>—</td>
                      <td>{e.equipped ? "Sí" : "No"}</td>
                    </tr>
                  );
                }
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
