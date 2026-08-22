import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Character } from "../types";
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

const styles = StyleSheet.create({
  page: { padding: 26, fontSize: 8.5, fontFamily: "Helvetica" },
  title: { fontSize: 16, fontWeight: 700, marginBottom: 2 },
  fieldGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 10, borderBottom: "1pt solid #333", paddingBottom: 8 },
  field: { minWidth: 90 },
  row: { flexDirection: "row", marginBottom: 8, gap: 6 },
  col: { flex: 1, gap: 6 },
  box: { border: "1pt solid #333", borderRadius: 3, padding: 6, flex: 1 },
  label: { fontSize: 6.5, textTransform: "uppercase", color: "#555" },
  value: { fontSize: 13, fontWeight: 700 },
  panel: { border: "1.2pt solid #111", borderRadius: 4, marginBottom: 8 },
  panelTitle: { backgroundColor: "#111", color: "white", fontSize: 8, fontWeight: 700, textTransform: "uppercase", padding: "3 6" },
  panelBody: { padding: 6 },
  sectionTitle: { fontSize: 11, fontWeight: 700, marginTop: 10, marginBottom: 4, borderBottom: "1pt solid #333" },
  tableRow: { flexDirection: "row", borderBottom: "0.5pt solid #ccc", paddingVertical: 2 },
  tableHeaderRow: { flexDirection: "row", borderBottom: "1pt solid #333", paddingVertical: 2, fontWeight: 700 },
  cell: { flex: 2 },
  smallCell: { flex: 1, textAlign: "center" },
});

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.panel} wrap={false}>
      <Text style={styles.panelTitle}>{title}</Text>
      <View style={styles.panelBody}>{children}</View>
    </View>
  );
}

export default function CharacterSheetDocument({ character }: { character: Character }) {
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
  const dexMod = abilityModifier(finalScores.dex);
  const meleeAttackBonus = bab + abilityModifier(finalScores.str) + sizeModifier(size);
  const rangedAttackBonus = bab + abilityModifier(finalScores.dex) + sizeModifier(size);
  const grapple = bab + abilityModifier(finalScores.str) - sizeModifier(size);

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
    (knownFeatIds.has("rapid-shot") && rangedWeapons.length > 0) ||
    (knownFeatIds.has("manyshot") && rangedWeapons.length > 0) ||
    monkLevel > 0 ||
    Boolean(twoWeaponOption);

  const abilities: [string, number][] = [
    ["Fuerza", finalScores.str],
    ["Destreza", finalScores.dex],
    ["Constitución", finalScores.con],
    ["Inteligencia", finalScores.int],
    ["Sabiduría", finalScores.wis],
    ["Carisma", finalScores.cha],
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
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{character.name || "Personaje sin nombre"}</Text>
        <View style={styles.fieldGrid}>
          <Text style={styles.field}>Clase y nivel: {classSummary || "Sin clase"}</Text>
          <Text style={styles.field}>Raza: {race?.name ?? character.raceId}</Text>
          <Text style={styles.field}>Alineamiento: {character.alignment}</Text>
          <Text style={styles.field}>Deidad: {character.deity}</Text>
          <Text style={styles.field}>Jugador/a: {character.playerName}</Text>
          <Text style={styles.field}>Tamaño: {size}</Text>
        </View>

        <View style={styles.row}>
          {abilities.map(([name, score]) => (
            <View style={styles.box} key={name}>
              <Text style={styles.label}>{name}</Text>
              <Text style={styles.value}>{score}</Text>
              <Text style={styles.label}>
                Mod. {abilityModifier(score) >= 0 ? `+${abilityModifier(score)}` : abilityModifier(score)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Panel title="Clase de armadura">
              <Text style={{ fontSize: 16, fontWeight: 700, textAlign: "center" }}>{ac.total}</Text>
              <Text style={{ fontSize: 7, textAlign: "center" }}>
                10 base + {ac.armorBonus} armadura + {ac.shieldBonus} escudo +{" "}
                {ac.maxDexBonus === null ? dexMod : Math.min(dexMod, ac.maxDexBonus)} Des + {sizeModifier(size)} tamaño
                {ac.naturalArmorBonus !== 0 ? ` + ${ac.naturalArmorBonus} natural` : ""}
                {ac.deflectionBonus !== 0 ? ` + ${ac.deflectionBonus} desviación` : ""}
                {ac.insightBonus !== 0 ? ` + ${ac.insightBonus} perspicacia` : ""}
                {ac.monkWisdomBonus + ac.dervishGraceBonus + ac.tempestDefenseBonus !== 0
                  ? ` + ${ac.monkWisdomBonus + ac.dervishGraceBonus + ac.tempestDefenseBonus} clase`
                  : ""}
              </Text>
              <Text style={{ fontSize: 7, textAlign: "center" }}>
                Tocar {ac.touch} · Desprevenido {ac.flatFooted}
              </Text>
              {ac.damageReduction > 0 && <Text style={{ fontSize: 7, textAlign: "center" }}>RD: {ac.damageReduction}/-</Text>}
            </Panel>
            <Panel title="Salvaciones">
              <Text>
                Fortaleza: {saves.fort >= 0 ? `+${saves.fort}` : saves.fort} (base{" "}
                {computeBaseSave("fort", character.classLevels, classes)})
              </Text>
              <Text>
                Reflejos: {saves.ref >= 0 ? `+${saves.ref}` : saves.ref} (base{" "}
                {computeBaseSave("ref", character.classLevels, classes)})
              </Text>
              <Text>
                Voluntad: {saves.will >= 0 ? `+${saves.will}` : saves.will} (base{" "}
                {computeBaseSave("will", character.classLevels, classes)})
              </Text>
              {(equipmentBonuses.saveResistance > 0 ||
                getDivineGraceBonus(character.classLevels, finalScores) > 0 ||
                getScoutBattleBonus(character.classLevels) > 0) && (
                <Text style={{ fontSize: 6.5 }}>
                  Incluye
                  {equipmentBonuses.saveResistance > 0 ? ` resistencia +${equipmentBonuses.saveResistance};` : ""}
                  {getDivineGraceBonus(character.classLevels, finalScores) > 0
                    ? ` Gracia Divina +${getDivineGraceBonus(character.classLevels, finalScores)};`
                    : ""}
                  {getScoutBattleBonus(character.classLevels) > 0 ? ` Bono de Batalla +${getScoutBattleBonus(character.classLevels)};` : ""}
                </Text>
              )}
            </Panel>
          </View>
          <View style={{ flex: 1 }}>
            <Panel title="Ataque">
              <Text>Bonif. ataque base: +{bab}</Text>
              <Text>Cuerpo a cuerpo: {meleeAttackBonus >= 0 ? `+${meleeAttackBonus}` : meleeAttackBonus}</Text>
              <Text>A distancia: {rangedAttackBonus >= 0 ? `+${rangedAttackBonus}` : rangedAttackBonus}</Text>
              <Text>Golpe de presa: {grapple >= 0 ? `+${grapple}` : grapple}</Text>
              <Text>Iniciativa: {initiative >= 0 ? `+${initiative}` : initiative}</Text>
              <Text>Velocidad: {race?.speed ?? 30} pies</Text>
            </Panel>
            <Panel title="Puntos de golpe y carga">
              <Text>PG máximos: {hp}</Text>
              <Text>
                Carga: ligera hasta {carrying.light} · media hasta {carrying.medium} · pesada hasta {carrying.heavy} lb
              </Text>
            </Panel>
          </View>
        </View>

        <Panel title="Ataques">
          {allAttacks.length === 0 ? (
            <Text>Sin armas equipadas.</Text>
          ) : (
            <>
              <View style={styles.tableHeaderRow}>
                <Text style={styles.cell}>Arma</Text>
                <Text style={styles.smallCell}>Ataque completo</Text>
                <Text style={styles.cell}>Daño</Text>
                <Text style={styles.smallCell}>Crítico</Text>
                <Text style={styles.smallCell}>Alcance</Text>
              </View>
              {allAttacks.map((w) => (
                <View style={styles.tableRow} key={w.itemId}>
                  <Text style={styles.cell}>{w.name}</Text>
                  <Text style={styles.smallCell}>{w.fullAttackSequence.map((b) => (b >= 0 ? `+${b}` : b)).join("/")}</Text>
                  <Text style={styles.cell}>{w.damage}</Text>
                  <Text style={styles.smallCell}>{w.critical}</Text>
                  <Text style={styles.smallCell}>{w.rangeIncrement ? `${w.rangeIncrement} p` : "—"}</Text>
                </View>
              ))}
              {allAttacks
                .filter((w) => w.magicProperties.length > 0 || w.specialMaterial)
                .map((w) => (
                  <Text key={`${w.itemId}-qualities`} style={{ fontSize: 7 }}>
                    {w.name}: {[w.specialMaterial?.name, ...w.magicProperties.map((p) => `${p.name} (${p.description})`)]
                      .filter(Boolean)
                      .join("; ")}
                  </Text>
                ))}
              {allAttacks
                .filter((w) => w.rangeIncrement)
                .map((w) => (
                  <Text key={w.itemId} style={{ fontSize: 7 }}>
                    {w.name} por distancia (-{w.rangePenaltyHalved ? 1 : 2}/incremento de {w.rangeIncrement} pies
                    {w.rangePenaltyHalved ? "; penalizador a la mitad (Iniciado de la Orden del Arco)" : ""}
                    {knownFeatIds.has("point-blank-shot") ? "; +1 ataque/daño a 30 pies o menos" : ""}):{" "}
                    {computeRangeIncrementAttackBonuses(w.attackBonus, w.rangeIncrement!, knownFeatIds.has("point-blank-shot"), w.rangePenaltyHalved)
                      .map(
                        (r) =>
                          `${r.distanceFeet}p ${r.attackBonus >= 0 ? "+" : ""}${r.attackBonus}${r.damageBonus > 0 ? ` (d+${r.damageBonus})` : ""}`,
                      )
                      .join(" · ")}
                  </Text>
                ))}
            </>
          )}
        </Panel>

        {showAttackOptions && (
          <Panel title="Opciones de ataque">
            <Text style={{ fontSize: 7, marginBottom: 4 }}>
              Rutinas de ataque alternativas por dotes o rasgos de clase, en vez del ataque completo normal.
            </Text>
            {knownFeatIds.has("rapid-shot") &&
              rangedWeapons.map((w) => (
                <Text key={`rapid-${w.itemId}`}>
                  Disparo Rápido ({w.name}): {fmtSeq(computeRapidShotSequence(w.attackBonus, bab))}
                </Text>
              ))}
            {knownFeatIds.has("manyshot") &&
              rangedWeapons.map((w) => (
                <Text key={`manyshot-${w.itemId}`}>
                  Multidisparo ({w.name}): ataque único a {w.attackBonus >= 0 ? "+" : ""}
                  {w.attackBonus} con 2 flechas{bab >= 11 ? " (3 si el objetivo está a 9 m o menos)" : ""}, objetivo a
                  9 m o menos.
                </Text>
              ))}
            {monkLevel > 0 && (
              <Text>
                Ráfaga de Golpes (desarmado, {monkUnarmedDamage(monkLevel)}):{" "}
                {fmtSeq(computeFlurryOfBlowsSequence(unarmedAttackBonus, monkLevel, bab))}
              </Text>
            )}
            {twoWeaponOption && twoWeaponOptionLight && (
              <>
                <Text>
                  Combate con dos armas ({meleeWeapons[0].name} / {meleeWeapons[1].name}):
                </Text>
                <Text style={{ fontSize: 7 }}>
                  Mano secundaria no ligera: principal {fmtSeq(twoWeaponOption.primary)} · secundaria{" "}
                  {fmtSeq(twoWeaponOption.offHand)}
                </Text>
                <Text style={{ fontSize: 7 }}>
                  Mano secundaria ligera: principal {fmtSeq(twoWeaponOptionLight.primary)} · secundaria{" "}
                  {fmtSeq(twoWeaponOptionLight.offHand)}
                </Text>
              </>
            )}
          </Panel>
        )}

        <Text style={styles.sectionTitle}>Habilidades</Text>
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
              <View style={styles.tableRow} key={key}>
                <Text style={styles.smallCell}>{isClassSkill ? "✓" : ""}</Text>
                <Text style={styles.cell}>{label}</Text>
                <Text style={styles.smallCell}>Rangos {ranks}</Text>
                <Text style={styles.smallCell}>Total {ranks + mod}</Text>
              </View>
            );
          })}

        {race && race.traits.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Rasgos raciales</Text>
            {race.traits.map((t) => (
              <Text key={t.name}>
                • {t.name}: {t.description}
              </Text>
            ))}
          </>
        )}

        {unlockedFeatures.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Rasgos de clase</Text>
            {unlockedFeatures.map((f, i) => (
              <Text key={i}>
                • {f.name} ({f.className} {f.level}): {f.description}
              </Text>
            ))}
          </>
        )}

        {unlockedChoices.filter((uc) => uc.choice.kind !== "dote_restringida").length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Elecciones de clase</Text>
            {unlockedChoices
              .filter((uc) => uc.choice.kind !== "dote_restringida")
              .map((uc, i) => {
                const value = findChoiceValue(classFeatureChoices, uc.classId, uc.choice.id, uc.level);
                const selectedOption = uc.choice.options?.find((o) => o.id === value);
                const optionLabel = uc.choice.kind === "lista_fija" ? selectedOption?.label : value;
                return (
                  <Text key={i} style={{ fontSize: 7 }}>
                    • {uc.choice.label} ({uc.className} {uc.level}): {optionLabel || "sin elegir"}
                    {selectedOption?.description ? ` — ${selectedOption.description}` : ""}
                  </Text>
                );
              })}
            {favoredEnemyBonuses.length > 0 && (
              <Text style={{ fontSize: 7 }}>
                Bono total contra enemigos predilectos: {favoredEnemyBonuses.map((fe) => `${fe.enemy} +${fe.bonus}`).join(" · ")}
              </Text>
            )}
          </>
        )}

        <Text style={styles.sectionTitle}>Dotes</Text>
        {character.feats.map((f, i) => {
          const feat = findFeat(f.featId);
          return (
            <Text key={`${f.featId}-${i}`}>
              • {feat?.name ?? f.featId}
              {f.selection ? ` (${f.selection})` : ""}: {feat?.benefit ?? ""}
            </Text>
          );
        })}
        {bonusFeats.map((bf, i) => {
          const feat = findFeat(bf.featId);
          return (
            <Text key={`bonus-${i}`}>
              • {feat?.name ?? bf.featId} (dote de bonificación — {bf.sourceLabel}, {bf.className} {bf.level}):{" "}
              {feat?.benefit ?? ""}
            </Text>
          );
        })}

        {character.companions.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Compañeros, familiares y monturas especiales</Text>
            {character.companions.map((comp) => {
              const base = findCompanion(comp.baseCreatureId);
              if (!base) return null;
              const grant = classes.find((c) => c.id === comp.masterClassId)?.companionGrant;
              return (
                <View key={comp.id} style={{ marginBottom: 4 }}>
                  <Text style={{ fontWeight: 700 }}>
                    {comp.name || base.name} — {base.name} ({comp.masterClassId})
                  </Text>
                  <Text>
                    {base.size} · {base.baseHitDice}d{base.hitDie} DG · Vel. {base.baseSpeed} pies · Ataques:{" "}
                    {base.attacks.map((a) => `${a.name} (${a.damage})`).join(", ") || "—"}
                  </Text>
                  {grant?.kind === "animal_companion" &&
                    (() => {
                      const effLevel = effectiveCompanionLevel(character.classLevels, grant, comp.masterClassId);
                      const bonus = computeAnimalCompanionBonus(effLevel);
                      return (
                        <Text>
                          Bonos (nivel efectivo {effLevel}): +{bonus.hitDiceBonus} DG, +{bonus.naturalArmorBonus} armadura
                          natural, +{bonus.abilityBonus} Fue/Des, {bonus.bonusTricks} trucos.
                        </Text>
                      );
                    })()}
                  {grant?.kind === "familiar" && <Text>Otorga: {computeFamiliarGrantedAbilities(level).join(", ")}.</Text>}
                  {grant?.kind === "special_mount" &&
                    (() => {
                      const paladinLevel = character.classLevels.find((cl) => cl.classId === comp.masterClassId)?.level ?? 0;
                      const bonus = computeSpecialMountBonus(paladinLevel);
                      if (!bonus) return null;
                      return (
                        <Text>
                          Bonos: +{bonus.hitDiceBonus} DG, +{bonus.strBonus} Fue, Int {bonus.intScore}, +
                          {bonus.naturalArmorBonus} armadura natural.
                        </Text>
                      );
                    })()}
                </View>
              );
            })}
          </>
        )}

        {character.spells.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Conjuros</Text>
            {character.spells.map((s, i) => {
              const spell = findSpell(s.spellId);
              const casterLevel = getCasterLevelForClass(s.classId, character.classLevels, classes);
              const resolvedRange = spell ? resolveSpellRange(spell.range, casterLevel) : null;
              const resolvedDuration = spell ? resolveSpellDuration(spell.duration, casterLevel) : null;
              return (
                <View key={i} style={{ marginBottom: 3 }}>
                  <Text style={{ fontWeight: 700 }}>
                    [Nv.{s.level}] {spell?.name ?? s.spellId} ({s.classId})
                    {casterLevel > 0 ? ` · NL ${casterLevel}` : ""}
                  </Text>
                  {spell && (
                    <Text>
                      {spell.school} · {spell.castingTime} · Alcance: {spell.range}
                      {resolvedRange ? ` → ${resolvedRange}` : ""} · Duración: {spell.duration}
                      {resolvedDuration ? ` → ${resolvedDuration}` : ""} · Salv. {spell.savingThrow} · RC{" "}
                      {spell.spellResistance} — {annotateSpellDescription(spell.description, casterLevel)}
                    </Text>
                  )}
                </View>
              );
            })}
          </>
        )}

        {character.powers.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Poderes psiónicos</Text>
            {character.powers.map((p, i) => {
              const power = findPower(p.powerId);
              return (
                <View key={i} style={{ marginBottom: 3 }}>
                  <Text style={{ fontWeight: 700 }}>
                    [Nv.{p.level}] {power?.name ?? p.powerId} ({p.classId})
                  </Text>
                  {power && (
                    <Text>
                      {power.discipline} · {power.manifestingTime} · {power.range} · {power.duration} · Salv.{" "}
                      {power.savingThrow} · RP {power.powerResistance} — {power.description}
                    </Text>
                  )}
                </View>
              );
            })}
          </>
        )}

        <Text style={styles.sectionTitle}>Equipo</Text>
        {character.equipment.map((e, i) => {
          if (e.itemKind === "maravilloso") {
            const w = findWondrousItem(e.itemId);
            const bonus = e.enhancementBonus ?? w?.minBonus ?? 0;
            return (
              <Text key={i}>
                • {w ? `${w.name} +${bonus}` : e.itemId} x{e.quantity} {e.equipped ? "(equipado)" : ""}
              </Text>
            );
          }
          const data =
            e.itemKind === "weapon" ? findWeapon(e.itemId) : e.itemKind === "armor" ? findArmor(e.itemId) : findGear(e.itemId);
          return (
            <Text key={i}>
              • {data?.name ?? e.itemId} x{e.quantity} {e.equipped ? "(equipado)" : ""}
            </Text>
          );
        })}
        <Text style={{ marginTop: 4 }}>Oro restante: {totalGold.toFixed(2)} po</Text>

        {character.notes && (
          <>
            <Text style={styles.sectionTitle}>Notas</Text>
            <Text>{character.notes}</Text>
          </>
        )}
      </Page>
    </Document>
  );
}
