import type { Feat, FeatPrereqContext } from "../../types";

// Dotes de Player's Handbook II (2006).
//
// Convenciones (iguales a src/data/srd/feats.ts):
// - `id` en kebab-case basado en el nombre en inglés del libro, con prefijo
//   `phb2-` para distinguirlas de las dotes homónimas de otros libros.
// - `prerequisites[].check` solo se define para prerrequisitos mecánicos
//   simples y verificables (puntuación de característica, BAB, dote previa).
//   Los prerrequisitos raciales o de trasfondo (que este modelo de datos no
//   rastrea: no hay campo de raza en `FeatPrereqContext`) quedan solo como
//   texto descriptivo.
// - No se duplica ninguna dote ya presente en el SRD ni en ningún libro
//   Complete ya cargado (verificado contra los `feats.ts` existentes).
// - PHB2 dedica un capítulo relativamente breve a dotes nuevas (la mayor
//   parte del libro son trasfondos, clases base, conjuros y clases de
//   prestigio). Se ha preferido incluir un conjunto más reducido de dotes de
//   las que hay confianza razonable en cuanto a existencia y mecánica, en
//   vez de completar la cuota inventando o adivinando el resto.

const hasFeat = (id: string) => (ctx: FeatPrereqContext) => ctx.featIds.has(id);

export const PHB2_FEATS: Feat[] = [
  {
    id: "phb2-able-learner",
    name: "Aprendiz Aventajado",
    source: "phb2",
    types: ["general"],
    description: "Absorbe conocimientos nuevos con la misma facilidad sin importar su campo de origen.",
    benefit:
      "Al invertir rangos en una habilidad que no es de clase para usted, paga el mismo coste en puntos de habilidad que si fuera una habilidad de clase (normalmente 1 punto por rango en vez de 2). El límite máximo de rangos en una habilidad que no es de clase sigue siendo el habitual (la mitad del que tendría si fuera de clase).",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-actor",
    name: "Actor",
    source: "phb2",
    types: ["general"],
    description: "Un talento natural para meterse en la piel de otro personaje.",
    benefit:
      "+2 de bonificador de competencia en las pruebas de Farsantear y Disfrazarse relacionadas con interpretar un papel o hacerse pasar por otra persona, y +2 en Interpretar cuando la actuación consiste en representar un personaje.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-cosmopolitan",
    name: "Cosmopolita",
    source: "phb2",
    types: ["general"],
    description: "Una educación amplia, ganada viajando o creciendo en un cruce de caminos de culturas.",
    benefit:
      "Elija una habilidad; pasa a ser una habilidad de clase para usted sin importar su clase. Además, aprende un idioma adicional de su elección.",
    prerequisites: [],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-combat-archery",
    name: "Arquería en Combate",
    source: "phb2",
    types: ["combate"],
    description: "Sabe disparar el arco sin bajar la guardia frente a quien lo amenaza cuerpo a cuerpo.",
    benefit:
      "No provoca ataques de oportunidad por disparar un arma a distancia mientras se encuentra en una casilla amenazada por un enemigo cuerpo a cuerpo.",
    prerequisites: [
      { description: "Disparo a Bocajarro", check: hasFeat("point-blank-shot") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-twisted-charge",
    name: "Carga Sinuosa",
    source: "phb2",
    types: ["combate"],
    description: "Un experto en el arte de la carga que sabe quebrar la trayectoria sin perder el ímpetu.",
    benefit:
      "Al cargar, puede mover en dos tramos rectos con una única inflexión (en vez de una sola línea recta) para llegar hasta su objetivo, siempre que ambos tramos cumplan los requisitos normales de una carga. Sufre un -2 a la CA hasta su siguiente turno, igual que en una carga normal.",
    prerequisites: [
      { description: "Esquiva", check: hasFeat("dodge") },
      { description: "Movilidad", check: hasFeat("mobility") },
      {
        description: "Bonificador base de ataque +6",
        check: (ctx: FeatPrereqContext) => ctx.babTotal >= 6,
      },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-insightful-reflexes",
    name: "Reflejos Perspicaces",
    source: "phb2",
    types: ["combate"],
    description: "Anticipa el peligro con la mente antes de que el cuerpo pueda reaccionar.",
    benefit:
      "Usa su modificador de Inteligencia, en vez de su modificador de Destreza, para determinar el número de ataques de oportunidad adicionales que le concede Reflejos de Combate.",
    prerequisites: [
      { description: "Reflejos de Combate", check: hasFeat("combat-reflexes") },
    ],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-extend-rage",
    name: "Furia Prolongada",
    source: "phb2",
    types: ["general"],
    description: "La ira, una vez desatada, tarda más en apagarse.",
    benefit: "Cada vez que entra en furia, esta dura 5 asaltos más de lo normal.",
    prerequisites: [{ description: "Capacidad de entrar en furia" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-bred-for-war",
    name: "Criado para la Guerra",
    source: "phb2",
    types: ["especial"],
    description: "Generaciones de conflicto han forjado un instinto marcial innato en su sangre orca.",
    benefit:
      "+1 de bonificador de competencia al ataque cuando carga, y competencia con el hacha doble orca.",
    prerequisites: [{ description: "Ser semiorco" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-daylight-adaptation",
    name: "Adaptación a la Luz Diurna",
    source: "phb2",
    types: ["especial"],
    description: "El cuerpo se acostumbra poco a poco al resplandor que antes resultaba insoportable.",
    benefit:
      "Deja de sufrir el rasgo racial de sensibilidad a la luz (penalizador en Avistar y Buscar, y deslumbramiento bajo luz solar intensa). Conserva la visión en la oscuridad y demás rasgos raciales con normalidad.",
    prerequisites: [{ description: "Rasgo racial de sensibilidad a la luz" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-pass-for-human",
    name: "Pasar por Humano",
    source: "phb2",
    types: ["especial"],
    description: "Ha aprendido a disimular los rasgos que delatan su ascendencia no humana.",
    benefit:
      "Obtiene un bonificador de +10 en las pruebas de Disfrazarse para hacerse pasar por un humano, y las demás criaturas necesitan superar una prueba de Avistar más difícil de lo normal para notar cualquier rasgo físico no humano evidente.",
    prerequisites: [{ description: "Raza distinta de humano, de apariencia mayormente humana (ej. semielfo, semiorco)" }],
    fighterBonusFeat: false,
    stackable: false,
  },
  {
    id: "phb2-dragontouched",
    name: "Marcado por el Dragón",
    source: "phb2",
    types: ["especial"],
    description:
      "Un vínculo, ya sea de sangre o de fe, lo conecta con el legado de un linaje dracónico concreto.",
    benefit:
      "Elige un tipo de dragón asociado a su linaje o a la deidad dracónica que venera. Obtiene un rasgo menor propio de ese linaje (por ejemplo, un bonificador a una característica, resistencia a un tipo de energía, o una habilidad especial menor de baja potencia), determinado por el tipo elegido. Esta dote puede tomarse varias veces, escogiendo cada vez un tipo de dragón distinto.",
    prerequisites: [
      {
        description:
          "Ser venerador de una deidad dracónica (Io, Astilabor, Bahamut, Tiamat u otra similar) o tener un dragón como progenitor",
      },
    ],
    fighterBonusFeat: false,
    stackable: true,
  },
];
