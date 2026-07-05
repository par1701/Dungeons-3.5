import { useParams, Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useCharacterStore } from "../store/characterStore";
import { findClass, findFeat, findPower, findRace, findSkill, findSpell, getEnabledClasses } from "../data";
import {
  abilityModifier,
  applyRacialAdjustments,
  computeBabTotal,
  computeCarryingCapacity,
  computeMaxHp,
  computeSaveTotals,
  totalCharacterLevel,
} from "../engine/derive";
import CharacterSheetDocument from "../pdf/CharacterSheetDocument";

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
  const carrying = computeCarryingCapacity(finalScores.str, race?.size ?? "Mediano");
  const classSummary = character.classLevels
    .map((cl) => `${findClass(cl.classId)?.name ?? cl.classId} ${cl.level}`)
    .join(" / ");

  const abilities: [string, keyof typeof finalScores][] = [
    ["Fuerza", "str"],
    ["Destreza", "dex"],
    ["Constitución", "con"],
    ["Inteligencia", "int"],
    ["Sabiduría", "wis"],
    ["Carisma", "cha"],
  ];

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
        <h2>{character.name}</h2>
        <p>
          {race?.name ?? character.raceId} · {classSummary || "Sin clase"} · Nivel {level} · {character.alignment}
          <br />
          Jugador/a: {character.playerName} · Deidad: {character.deity}
        </p>

        <div className="sheet-grid">
          {abilities.map(([label, key]) => (
            <div className="sheet-box" key={key}>
              <span className="label">{label}</span>
              <span className="value">{finalScores[key]}</span>
              <span className="label">
                Mod. {abilityModifier(finalScores[key]) >= 0 ? "+" : ""}
                {abilityModifier(finalScores[key])}
              </span>
            </div>
          ))}
        </div>

        <div className="sheet-grid">
          <div className="sheet-box">
            <span className="label">Puntos de golpe</span>
            <span className="value">{hp}</span>
          </div>
          <div className="sheet-box">
            <span className="label">Bonif. ataque base</span>
            <span className="value">+{bab}</span>
          </div>
          <div className="sheet-box">
            <span className="label">Carga máxima</span>
            <span className="value">{carrying.heavy} lb</span>
          </div>
        </div>

        <div className="sheet-grid">
          <div className="sheet-box">
            <span className="label">Fortaleza</span>
            <span className="value">{saves.fort >= 0 ? "+" : ""}{saves.fort}</span>
          </div>
          <div className="sheet-box">
            <span className="label">Reflejos</span>
            <span className="value">{saves.ref >= 0 ? "+" : ""}{saves.ref}</span>
          </div>
          <div className="sheet-box">
            <span className="label">Voluntad</span>
            <span className="value">{saves.will >= 0 ? "+" : ""}{saves.will}</span>
          </div>
        </div>

        <h3>Habilidades</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Habilidad</th>
              <th>Rangos</th>
              <th>Mod.</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(character.skillRanks)
              .filter(([, ranks]) => ranks > 0)
              .map(([skillId, ranks]) => {
                const skill = findSkill(skillId);
                const mod = skill ? abilityModifier(finalScores[skill.keyAbility]) : 0;
                return (
                  <tr key={skillId}>
                    <td>{skill?.name ?? skillId}</td>
                    <td>{ranks}</td>
                    <td>{mod >= 0 ? `+${mod}` : mod}</td>
                    <td>{ranks + mod}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <h3>Dotes</h3>
        <ul>
          {character.feats.map((f) => (
            <li key={f.featId}>{findFeat(f.featId)?.name ?? f.featId}</li>
          ))}
        </ul>

        {character.spells.length > 0 && (
          <>
            <h3>Conjuros</h3>
            <ul>
              {character.spells.map((s, i) => (
                <li key={i}>
                  [Nv.{s.level}] {findSpell(s.spellId)?.name ?? s.spellId} ({s.classId})
                </li>
              ))}
            </ul>
          </>
        )}

        {character.powers.length > 0 && (
          <>
            <h3>Poderes psiónicos</h3>
            <ul>
              {character.powers.map((p, i) => (
                <li key={i}>
                  [Nv.{p.level}] {findPower(p.powerId)?.name ?? p.powerId} ({p.classId})
                </li>
              ))}
            </ul>
          </>
        )}

        <h3>Equipo</h3>
        <ul>
          {character.equipment.map((e, i) => (
            <li key={i}>
              {e.itemId} x{e.quantity} {e.equipped ? "(equipado)" : ""}
            </li>
          ))}
        </ul>
        <p>Oro: {character.gold} po</p>

        {character.notes && (
          <>
            <h3>Notas</h3>
            <p>{character.notes}</p>
          </>
        )}
      </div>
    </div>
  );
}
