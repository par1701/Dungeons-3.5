import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Character } from "../types";
import { findClass, findFeat, findPower, findRace, findSkill, findSpell, getEnabledClasses } from "../data";
import {
  abilityModifier,
  applyRacialAdjustments,
  computeBabTotal,
  computeMaxHp,
  computeSaveTotals,
  getUnlockedClassFeatures,
  parseSkillKey,
  totalCharacterLevel,
} from "../engine/derive";

const styles = StyleSheet.create({
  page: { padding: 28, fontSize: 9, fontFamily: "Helvetica" },
  title: { fontSize: 16, fontWeight: 700, marginBottom: 2 },
  subtitle: { fontSize: 10, marginBottom: 10, color: "#444" },
  row: { flexDirection: "row", marginBottom: 8, gap: 6 },
  box: { border: "1pt solid #333", borderRadius: 3, padding: 6, flex: 1 },
  label: { fontSize: 7, textTransform: "uppercase", color: "#555" },
  value: { fontSize: 13, fontWeight: 700 },
  sectionTitle: { fontSize: 11, fontWeight: 700, marginTop: 10, marginBottom: 4, borderBottom: "1pt solid #333" },
  tableRow: { flexDirection: "row", borderBottom: "0.5pt solid #ccc", paddingVertical: 2 },
  cell: { flex: 1 },
  smallCell: { width: 40, textAlign: "center" },
});

export default function CharacterSheetDocument({ character }: { character: Character }) {
  const classes = getEnabledClasses(character.activeSourceBooks);
  const race = findRace(character.raceId);
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
  const classSummary = character.classLevels
    .map((cl) => `${findClass(cl.classId)?.name ?? cl.classId} ${cl.level}`)
    .join(" / ");
  const unlockedFeatures = getUnlockedClassFeatures(character.classLevels, classes);

  const abilities: [string, number][] = [
    ["Fuerza", finalScores.str],
    ["Destreza", finalScores.dex],
    ["Constitución", finalScores.con],
    ["Inteligencia", finalScores.int],
    ["Sabiduría", finalScores.wis],
    ["Carisma", finalScores.cha],
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{character.name || "Personaje sin nombre"}</Text>
        <Text style={styles.subtitle}>
          {race?.name ?? character.raceId} · {classSummary || "Sin clase"} · Nivel {level} ·{" "}
          {character.alignment} · Jugador: {character.playerName}
        </Text>

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
          <View style={styles.box}>
            <Text style={styles.label}>Puntos de golpe</Text>
            <Text style={styles.value}>{hp}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Bonif. ataque base</Text>
            <Text style={styles.value}>+{bab}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Salvación Fortaleza</Text>
            <Text style={styles.value}>{saves.fort >= 0 ? `+${saves.fort}` : saves.fort}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Salvación Reflejos</Text>
            <Text style={styles.value}>{saves.ref >= 0 ? `+${saves.ref}` : saves.ref}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Salvación Voluntad</Text>
            <Text style={styles.value}>{saves.will >= 0 ? `+${saves.will}` : saves.will}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Habilidades</Text>
        {Object.entries(character.skillRanks)
          .filter(([, ranks]) => ranks > 0)
          .map(([key, ranks]) => {
            const { skillId, specialization } = parseSkillKey(key);
            const skill = findSkill(skillId);
            const mod = skill ? abilityModifier(finalScores[skill.keyAbility]) : 0;
            const label = skill ? (specialization ? `${skill.name} (${specialization})` : skill.name) : key;
            return (
              <View style={styles.tableRow} key={key}>
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

        {character.spells.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Conjuros</Text>
            {character.spells.map((s, i) => (
              <Text key={i}>
                • [Nv.{s.level}] {findSpell(s.spellId)?.name ?? s.spellId} ({s.classId})
              </Text>
            ))}
          </>
        )}

        {character.powers.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Poderes psiónicos</Text>
            {character.powers.map((p, i) => (
              <Text key={i}>
                • [Nv.{p.level}] {findPower(p.powerId)?.name ?? p.powerId} ({p.classId})
              </Text>
            ))}
          </>
        )}

        <Text style={styles.sectionTitle}>Equipo</Text>
        {character.equipment.map((e, i) => (
          <Text key={i}>
            • {e.itemId} x{e.quantity} {e.equipped ? "(equipado)" : ""}
          </Text>
        ))}
        <Text style={{ marginTop: 4 }}>Oro: {character.gold} po</Text>

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
