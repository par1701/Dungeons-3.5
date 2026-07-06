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
  const dexMod = abilityModifier(finalScores.dex);
  const grapple = bab + abilityModifier(finalScores.str) - sizeModifier(size);

  const equippedWeapons = character.equipment
    .filter((e) => e.equipped && e.itemKind === "weapon")
    .map((e) => findWeapon(e.itemId))
    .filter((w): w is NonNullable<typeof w> => Boolean(w))
    .map((w) => computeWeaponAttack(w, bab, finalScores, size));

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
              </Text>
              <Text style={{ fontSize: 7, textAlign: "center" }}>
                Tocar {ac.touch} · Desprevenido {ac.flatFooted}
              </Text>
            </Panel>
            <Panel title="Salvaciones">
              <Text>Fortaleza: {saves.fort >= 0 ? `+${saves.fort}` : saves.fort}</Text>
              <Text>Reflejos: {saves.ref >= 0 ? `+${saves.ref}` : saves.ref}</Text>
              <Text>Voluntad: {saves.will >= 0 ? `+${saves.will}` : saves.will}</Text>
            </Panel>
          </View>
          <View style={{ flex: 1 }}>
            <Panel title="Ataque">
              <Text>Bonif. ataque base: +{bab}</Text>
              <Text>Golpe de presa: {grapple >= 0 ? `+${grapple}` : grapple}</Text>
              <Text>Iniciativa: {dexMod >= 0 ? `+${dexMod}` : dexMod}</Text>
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
          {equippedWeapons.length === 0 ? (
            <Text>Sin armas equipadas.</Text>
          ) : (
            <>
              <View style={styles.tableHeaderRow}>
                <Text style={styles.cell}>Arma</Text>
                <Text style={styles.smallCell}>Bonif.</Text>
                <Text style={styles.cell}>Daño</Text>
                <Text style={styles.smallCell}>Crítico</Text>
              </View>
              {equippedWeapons.map((w) => (
                <View style={styles.tableRow} key={w.itemId}>
                  <Text style={styles.cell}>{w.name}</Text>
                  <Text style={styles.smallCell}>{w.attackBonus >= 0 ? `+${w.attackBonus}` : w.attackBonus}</Text>
                  <Text style={styles.cell}>{w.damage}</Text>
                  <Text style={styles.smallCell}>{w.critical}</Text>
                </View>
              ))}
            </>
          )}
        </Panel>

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

        <Text style={styles.sectionTitle}>Dotes</Text>
        {character.feats.map((f) => {
          const feat = findFeat(f.featId);
          return (
            <Text key={f.featId}>
              • {feat?.name ?? f.featId}: {feat?.benefit ?? ""}
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
              return (
                <View key={i} style={{ marginBottom: 3 }}>
                  <Text style={{ fontWeight: 700 }}>
                    [Nv.{s.level}] {spell?.name ?? s.spellId} ({s.classId})
                  </Text>
                  {spell && (
                    <Text>
                      {spell.school} · {spell.castingTime} · {spell.range} · {spell.duration} · Salv.{" "}
                      {spell.savingThrow} · RC {spell.spellResistance} — {spell.description}
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
