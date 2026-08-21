import type { ClassFeatureChoiceOption } from "../../types";

// Los 22 dominios núcleo del clérigo (SRD/Manual del Jugador). Cada opción
// resume el poder otorgado y los 9 conjuros de dominio (uno por nivel de
// conjuro 1-9) en su descripción, usando los mismos nombres de conjuro ya
// establecidos en src/data/srd/spells.ts cuando el conjuro existe en la app.
// Algunos conjuros de dominio no están todavía en la base de datos de
// conjuros de esta app (p.ej. varias variantes de "Círculo mágico contra X"
// o "Disipar X", o los conjuros de Bigby); se listan aquí de todos modos
// como referencia textual, aunque no sean seleccionables como conjuro
// independiente en el asistente.
export const SRD_DOMAIN_OPTIONS: ClassFeatureChoiceOption[] = [
  {
    id: "aire",
    label: "Aire",
    description:
      "Poder otorgado: puede expulsar o destruir criaturas de tierra como un clérigo bueno expulsa no-muertos, o reprender/dominar/animar criaturas de aire como un clérigo malvado reprende no-muertos (3 + Car veces/día). Conjuros de dominio: 1.º Niebla de Obscurecimiento, 2.º Muro de Viento, 3.º Forma Gaseosa, 4.º Caminar por el Aire, 5.º Controlar los Vientos, 6.º Relámpago Zigzagueante, 7.º Controlar el Clima, 8.º Torbellino, 9.º Enjambre Elemental.",
  },
  {
    id: "animal",
    label: "Animal",
    description:
      "Poder otorgado: puede usar hablar con los animales una vez al día como conjuro. Conocimiento (naturaleza) se añade a sus habilidades de clase. Conjuros de dominio: 1.º Calmar Animales, 2.º Inmovilizar Animal, 3.º Dominar Animal, 4.º Convocar Aliado Natural IV, 5.º Comunión con la Naturaleza, 6.º Caparazón Antivida, 7.º Formas de Animal, 8.º Convocar Aliado Natural VIII, 9.º Cambiar de Forma.",
  },
  {
    id: "caos",
    label: "Caos",
    description:
      "Poder otorgado: lanza los conjuros con descriptor de Caos a +1 nivel de lanzador. Conjuros de dominio: 1.º Protección contra la Ley, 2.º Estallar, 3.º Círculo Mágico contra la Ley, 4.º Martillo del Caos, 5.º Disipar la Ley, 6.º Animar los Objetos, 7.º Palabra del Caos, 8.º Manto del Caos, 9.º Convocar Monstruo IX.",
  },
  {
    id: "muerte",
    label: "Muerte",
    description:
      "Poder otorgado: una vez al día puede usar un toque de muerte (ataque de toque cuerpo a cuerpo; 1d6 de daño por nivel de clérigo, la criatura muere sin salvación si el total iguala o supera sus puntos de golpe actuales). Conjuros de dominio: 1.º Causar Miedo, 2.º Toque de la Muerte, 3.º Reanimar a los Muertos, 4.º Custodia contra la Muerte, 5.º Rematar a los Vivos, 6.º Crear Muertos Vivientes, 7.º Destrucción, 8.º Crear No Muerto Mayor, 9.º Aullido de la Bansi.",
  },
  {
    id: "destruccion",
    label: "Destrucción",
    description:
      "Poder otorgado: una vez al día obtiene el poder de castigo (un ataque cuerpo a cuerpo con +4 a la tirada de ataque y bonificador al daño igual a su nivel de clérigo). Conjuros de dominio: 1.º Infligir Heridas Leves, 2.º Estallar, 3.º Contagio, 4.º Infligir Heridas Críticas, 5.º Infligir Heridas Leves en Masa, 6.º Dañar, 7.º Desintegrar, 8.º Terremoto, 9.º Implosión.",
  },
  {
    id: "tierra",
    label: "Tierra",
    description:
      "Poder otorgado: puede expulsar o destruir criaturas de aire como un clérigo bueno expulsa no-muertos, o reprender/dominar/animar criaturas de tierra como un clérigo malvado reprende no-muertos (3 + Car veces/día). Conjuros de dominio: 1.º Piedra Mágica, 2.º Ablandar Tierra y Piedra, 3.º Transformar Piedra, 4.º Púas de Piedra, 5.º Muro de Piedra, 6.º Piel Pétrea, 7.º Terremoto, 8.º Cuerpo Férreo, 9.º Enjambre Elemental.",
  },
  {
    id: "maldad",
    label: "Maldad",
    description:
      "Poder otorgado: lanza los conjuros con descriptor de Mal a +1 nivel de lanzador. Conjuros de dominio: 1.º Protección contra el Bien, 2.º Profanar, 3.º Círculo Mágico contra el Bien, 4.º Azote Sacrílego, 5.º Disipar el Bien, 6.º Crear Muertos Vivientes, 7.º Blasfemia, 8.º Aura Sacrílega, 9.º Convocar Monstruo IX.",
  },
  {
    id: "fuego",
    label: "Fuego",
    description:
      "Poder otorgado: puede expulsar o destruir criaturas de agua como un clérigo bueno expulsa no-muertos, o reprender/dominar/animar criaturas de fuego como un clérigo malvado reprende no-muertos (3 + Car veces/día). Conjuros de dominio: 1.º Manos Ardientes, 2.º Flamear, 3.º Resistir Energía, 4.º Muro de Fuego, 5.º Escudo de Fuego, 6.º Semillas de Fuego, 7.º Tormenta de Fuego, 8.º Nube Incendiaria, 9.º Enjambre Elemental.",
  },
  {
    id: "bondad",
    label: "Bondad",
    description:
      "Poder otorgado: lanza los conjuros con descriptor de Bien a +1 nivel de lanzador. Conjuros de dominio: 1.º Protección contra el Mal, 2.º Auxilio Divino, 3.º Círculo Mágico contra el Mal, 4.º Azote Sagrado, 5.º Disipar el Mal, 6.º Barrera de Cuchillas, 7.º Palabra Sagrada, 8.º Aura Sagrada, 9.º Convocar Monstruo IX.",
  },
  {
    id: "curacion",
    label: "Curación",
    description:
      "Poder otorgado: lanza los conjuros de curación a +1 nivel de lanzador. Conjuros de dominio: 1.º Curar Heridas Leves, 2.º Curar Heridas Moderadas, 3.º Curar Heridas Graves, 4.º Curar Heridas Críticas, 5.º Curar Heridas Leves en Masa, 6.º Sanar, 7.º Regenerar, 8.º Curar Heridas Críticas en Masa, 9.º Sanar en Grupo.",
  },
  {
    id: "conocimiento",
    label: "Conocimiento",
    description:
      "Poder otorgado: añade todas las habilidades de Saber a su lista de habilidades de clase; lanza los conjuros de adivinación a +1 nivel de lanzador. Conjuros de dominio: 1.º Detectar Puertas Secretas, 2.º Detectar Pensamientos, 3.º Clariaudiencia/Clarividencia, 4.º Adivinación, 5.º Visión Verdadera, 6.º Encontrar la Senda, 7.º Conocimiento de Leyendas, 8.º Discernir Ubicación, 9.º Presciencia.",
  },
  {
    id: "ley",
    label: "Ley",
    description:
      "Poder otorgado: lanza los conjuros con descriptor de Ley a +1 nivel de lanzador. Conjuros de dominio: 1.º Protección contra el Caos, 2.º Calmar Emociones, 3.º Círculo Mágico contra el Caos, 4.º Ira del Orden, 5.º Disipar el Caos, 6.º Inmovilizar Monstruo, 7.º Máxima, 8.º Escudo de la Ley, 9.º Convocar Monstruo IX.",
  },
  {
    id: "suerte",
    label: "Suerte",
    description:
      "Poder otorgado: una vez al día puede repetir una tirada que acabe de hacer, antes de que se conozca el resultado. Conjuros de dominio: 1.º Escudo de Entropía, 2.º Auxilio Divino, 3.º Protección contra la Energía, 4.º Libertad de Movimiento, 5.º Romper Encantamiento, 6.º Doble Engañoso, 7.º Retorno de Conjuros, 8.º Momento de Presciencia, 9.º Milagro.",
  },
  {
    id: "magia",
    label: "Magia",
    description:
      "Poder otorgado: puede usar pergaminos, varitas y objetos similares como un mago de la mitad de su nivel de clérigo (mínimo 1). Conjuros de dominio: 1.º Aura Mágica, 2.º Identificar, 3.º Disipar Magia, 4.º Imbuir Aptitud para los Conjuros, 5.º Resistencia a Conjuros, 6.º Campo Antimagia, 7.º Retorno de Conjuros, 8.º Protección contra Conjuros, 9.º Disyunción del Mago.",
  },
  {
    id: "plantas",
    label: "Plantas",
    description:
      "Poder otorgado: puede reprender o dominar criaturas de tipo planta como un clérigo malvado reprende no-muertos (3 + Car veces/día); Conocimiento (naturaleza) se añade a sus habilidades de clase. Conjuros de dominio: 1.º Enmarañar, 2.º Piel Robliza, 3.º Crecimiento Vegetal, 4.º Comandar Plantas, 5.º Muro de Espinas, 6.º Repeler Madera, 7.º Animar las Plantas, 8.º Controlar Plantas, 9.º Convocar Montículos Ambulantes.",
  },
  {
    id: "proteccion",
    label: "Protección",
    description:
      "Poder otorgado: como habilidad sobrenatural, al tocar a alguien le concede un bonificador de resistencia igual a su nivel de clérigo en su siguiente tirada de salvación. Conjuros de dominio: 1.º Santuario, 2.º Escudar a Otro, 3.º Protección contra la Energía, 4.º Inmunidad a Conjuros, 5.º Resistencia a Conjuros, 6.º Campo Antimagia, 7.º Rechazo, 8.º Mente en Blanco, 9.º Esfera Prismática.",
  },
  {
    id: "fuerza",
    label: "Fuerza",
    description:
      "Poder otorgado: una vez al día, como acción gratuita, gana un bonificador de mejora a la Fuerza igual a su nivel de clérigo durante 1 asalto. Conjuros de dominio: 1.º Agrandar Persona, 2.º Fuerza de Toro, 3.º Vestidura Mágica, 4.º Inmunidad a Conjuros, 5.º Poder de la Justicia, 6.º Piel Pétrea, 7.º Mano Aferradora de Bigby, 8.º Puño Cerrado de Bigby, 9.º Mano Aplastante de Bigby.",
  },
  {
    id: "sol",
    label: "Sol",
    description:
      "Poder otorgado: una vez al día puede realizar una expulsión mayor contra no-muertos: los no-muertos que serían expulsados quedan destruidos en su lugar. Conjuros de dominio: 1.º Soportar los Elementos, 2.º Calentar Metal, 3.º Luz Abrasadora, 4.º Escudo de Fuego, 5.º Descarga Flamígera, 6.º Semillas de Fuego, 7.º Rayo Solar, 8.º Explosión Solar, 9.º Esfera Prismática.",
  },
  {
    id: "viaje",
    label: "Viaje",
    description:
      "Poder otorgado: durante 1 asalto por nivel de clérigo al día (en total), puede actuar con normalidad pese a efectos que impidan el movimiento, como si tuviera libertad de movimiento. Conjuros de dominio: 1.º Zancada Prodigiosa, 2.º Localizar Objeto, 3.º Volar, 4.º Puerta Dimensional, 5.º Teleportar, 6.º Encontrar la Senda, 7.º Teleportar Mayor, 8.º Puerta en Fase, 9.º Proyección Astral.",
  },
  {
    id: "engano",
    label: "Engaño",
    description:
      "Poder otorgado: añade Engañar, Disfrazarse y Esconderse a sus habilidades de clase. Conjuros de dominio: 1.º Disfrazarse, 2.º Invisibilidad, 3.º Indetectabilidad, 4.º Confusión, 5.º Ofuscar Videncia, 6.º Doble Engañoso, 7.º Pantalla, 8.º Polimorfar Cualquier Cosa, 9.º Detener el Tiempo.",
  },
  {
    id: "guerra",
    label: "Guerra",
    description:
      "Poder otorgado: obtiene gratis Competencia con Armas Marciales (con el arma predilecta de su deidad, si la necesita) y Especialización con un Arma con esa misma arma. Conjuros de dominio: 1.º Arma Mágica, 2.º Arma Espiritual, 3.º Vestidura Mágica, 4.º Poder Divino, 5.º Descarga Flamígera, 6.º Barrera de Cuchillas, 7.º Palabra de Poder Cegador, 8.º Palabra de Poder Aturdidor, 9.º Palabra de Poder Mortal.",
  },
  {
    id: "agua",
    label: "Agua",
    description:
      "Poder otorgado: puede expulsar o destruir criaturas de fuego como un clérigo bueno expulsa no-muertos, o reprender/dominar/animar criaturas de agua como un clérigo malvado reprende no-muertos (3 + Car veces/día). Conjuros de dominio: 1.º Niebla de Obscurecimiento, 2.º Nube Brumosa, 3.º Respiración Acuática, 4.º Controlar las Aguas, 5.º Tormenta de Hielo, 6.º Cono de Frío, 7.º Bruma Ácida, 8.º Horrible Marchitamiento, 9.º Enjambre Elemental.",
  },
];
