import type { MagicItemReference } from "../../types";

// Artefactos del SRD: reliquias legendarias sin tabla de generación
// aleatoria, pensadas para introducirse en una campaña solo por decisión
// deliberada del narrador. No tienen precio de mercado ni pueden fabricarse
// por los medios normales de creación de objetos mágicos, así que ningún
// entrada de este catálogo lleva `prerequisites`. Los artefactos menores no
// son necesariamente únicos; los artefactos mayores sí lo son, y cada uno
// debería tener un único método de destrucción específico (la fuente no
// detalla el método concreto para los artefactos mayores listados aquí).
export const SRD_ARTIFACTS: MagicItemReference[] = [
  {
    id: "book-of-infinite-spells",
    name: "Libro de Conjuros Infinitos",
    source: "srd",
    category: "artefacto_menor",
    price: "Sin precio de mercado",
    casterLevel: 18,
    aura: "Potente (todas las escuelas)",
    description:
      "Otorga a cualquier personaje de cualquier clase la capacidad de usar los conjuros de sus páginas; un personaje que no pueda lanzar conjuros normalmente sufre 1 nivel negativo mientras el libro esté en su posesión o mientras use su poder. Contiene 1d8+22 páginas, cada una arcana o divina. Las páginas solo avanzan (nunca se puede retroceder); si se cierra el libro, vuelve a abrirse por la misma página. Al pasar la última página, el libro desaparece. El dueño puede lanzar una vez al día el conjuro de la página actual (hasta 4 veces al día si el conjuro está en la lista de conjuros de su clase); no necesita tener el libro encima para usar su poder. Cada vez que se lanza un conjuro hay probabilidad de que la página cambie sola: 10% si un lanzador de conjuros usa un conjuro de su propia clase y nivel, 20% si no es de su clase o nivel, 25% si un no-lanzador emplea un conjuro divino, y 30% si un no-lanzador emplea un conjuro arcano. Cada uso se trata como si fuera un pergamino a efectos de tiempo de lanzamiento y fallo de conjuro.",
  },
  {
    id: "deck-of-many-things",
    name: "Baraja de Muchas Cosas (Deck of Many Things)",
    source: "srd",
    category: "artefacto_menor",
    price: "Sin precio de mercado",
    casterLevel: 20,
    aura: "Potente (todas las escuelas)",
    description:
      "Contiene 22 cartas o placas; al robar una carta, su magia se aplica de inmediato al personaje, para bien o para mal. El jugador debe anunciar cuántas cartas robará antes de empezar; deben robarse dentro de 1 hora entre sí y nunca puede robar más cartas de las anunciadas (salvo que salga el Bufón, que permite robar 2 cartas adicionales). Cada carta robada se repone en la baraja, salvo el Bufón y el Loco, que se descartan. Las 22 cartas y sus efectos: Equilibrio (cambio instantáneo de alineamiento; si el personaje no actúa conforme al nuevo alineamiento, gana un nivel negativo); Cometa (debe derrotar en solitario al próximo monstruo hostil que encuentre o pierde el beneficio, y si lo logra gana experiencia suficiente para subir de nivel); Calabozo (encarcelamiento como el conjuro aprisionamiento o por un ser poderoso, con pérdida de todo su equipo y conjuros; no se roban más cartas); Euríale (maldición permanente de -1 a todas las salvaciones, solo eliminable con la carta de los Destinos o una deidad); Los Destinos (permite evitar cualquier situación, incluso instantánea, una vez, reescribiendo la realidad, solo para impedir o revertir algo, nunca para provocarlo, y solo para quien robó la carta); Llamas (enemistad con un ser feérico o extraplanar determinado al azar, que no termina hasta que uno de los dos muera; ataca al personaje o le complica la vida en 1d20 días); Bufón (pierde 10.000 puntos de experiencia y debe robar de nuevo obligatoriamente; siempre se descarta al salir); Gema (gana 25 joyas de 2.000 po cada una, o 50 gemas de 1.000 po cada una); Idiota (drena de inmediato 1d4+1 puntos de Inteligencia de forma permanente; puede robar una carta adicional de forma opcional); Bufón de la Corte (gana 10.000 puntos de experiencia o dos robos adicionales opcionales de la baraja; siempre se descarta al salir); Llave (obtiene un arma mágica mayor utilizable por el personaje, que aparece de la nada en su mano); Caballero (gana el servicio leal de por vida de un guerrero de nivel 4, de su misma raza y género, que aparece de la nada); Luna (concede 1d4 deseos, como el conjuro de nivel 9 de mago, que deben usarse dentro de un número de minutos igual al número recibido); Pícaro (un aliado PNJ, preferiblemente un secuaz, se vuelve hostil en secreto hasta revelarse en el peor momento; si no tiene secuaces, se sustituye por la enemistad de algún personaje o entidad poderosa); Ruina (pierde de inmediato toda su riqueza y propiedades no mágicas); Calavera (debe enfrentarse en solitario a un espectro terrible no-muerto inmune a expulsar; si otros ayudan, también deben enfrentar espectros propios; si el personaje muere, queda destruido para siempre, irrecuperable incluso con deseo o milagro); Estrella (gana un bonificador inherente de +2 a una puntuación de característica elegida, que no puede dividirse entre dos); Sol (obtiene un objeto maravilloso mediano útil y 50.000 puntos de experiencia); Garras (todos los objetos mágicos que posee desaparecen de inmediato e irrevocablemente); Trono (obtiene +6 a Diplomacia y un pequeño castillo que aparece donde el personaje elija, decidiéndolo en la siguiente hora); Visir (puede pedir, una sola vez y dentro de un año, la respuesta completa a cualquier pregunta o problema); El Vacío (el cuerpo del personaje sigue funcionando como en coma, pero su alma queda atrapada en otro lugar o plano; ni deseo ni milagro la recuperan, aunque revelan el plano; no se roban más cartas).",
  },
  {
    id: "hammer-of-thunderbolts",
    name: "Martillo de los Truenos (Hammer of Thunderbolts)",
    source: "srd",
    category: "artefacto_menor",
    price: "Sin precio de mercado",
    casterLevel: 20,
    aura: "Evocación, necromancia y transmutación fuertes",
    description:
      "Martillo de guerra Grande +3 arrojadizo que regresa, e inflige 4d6 de daño en cualquier golpe. Si su portador lleva además un cinturón de fuerza de gigante y guanteletes de poder de ogro, y sabe que el arma es un martillo de los truenos (no solo un martillo +3), obtiene su efecto completo: bonificador de mejora total +5, los bonificadores del cinturón y los guanteletes se acumulan (solo usando esta arma), y mata a cualquier gigante al que golpee (una salvación de Fortaleza CD 20 evita la muerte, no el daño). Al ser arrojado con éxito, emite un gran trueno que aturde a todas las criaturas en 90 pies durante 1 ronda (una salvación de Fortaleza CD 15 lo evita). Su incremento de alcance es de 30 pies.",
  },
  {
    id: "philosophers-stone",
    name: "Piedra Filosofal (Philosopher's Stone)",
    source: "srd",
    category: "artefacto_menor",
    price: "Sin precio de mercado",
    casterLevel: 20,
    aura: "Transmutación fuerte",
    description:
      "Roca negruzca de aspecto ordinario; al romperla (CD 20) revela una cavidad con azogue mágico que permite a cualquier lanzador arcano transmutar hasta 5.000 libras de hierro en plata, o hasta 1.000 libras de plomo en oro. El azogue se vuelve inestable tras abrir la piedra y pierde su potencia en 24 horas, plazo en el que deben realizarse todas las transmutaciones. Mezclado con una poción de curación mientras sigue potente, crea un óleo de la vida que actúa como resurrección verdadera sobre cualquier cadáver rociado.",
  },
  {
    id: "sphere-of-annihilation",
    name: "Esfera de Aniquilación (Sphere of Annihilation)",
    source: "srd",
    category: "artefacto_menor",
    price: "Sin precio de mercado",
    casterLevel: 20,
    aura: "Transmutación fuerte",
    description:
      "Globo de negrura absoluta de 2 pies de diámetro; en realidad es un agujero en la continuidad del multiverso. Cualquier materia que la toque es succionada al vacío y destruida por completo (solo la intervención directa de una deidad puede restaurar a un personaje aniquilado). Es estática salvo que se mueva mediante esfuerzo mental (una acción de movimiento): la prueba de control es 1d20 + nivel de personaje + modificador de Inteligencia contra CD 30; con éxito puede moverse como acción gratuita. El control puede establecerse desde hasta 40 pies, y una vez establecido debe mantenerse cada ronda (CD 30); mientras se mantenga, puede ejercerse desde 40 pies más 10 pies por nivel de personaje. La velocidad de la esfera es de 10 pies más 5 pies por cada 5 puntos en que el resultado de control supere 30. Si la prueba falla, la esfera se desliza 10 pies hacia quien intentaba moverla (o hacia quien obtuvo el resultado más bajo, si hay disputa de control). Si se le lanza el conjuro puerta dimensional, hay 50% de probabilidad de que la destruya, 35% de que no haga nada, y 15% de que se abra una grieta que envía todo en un radio de 180 pies a otro plano. Si una vara de cancelación la toca, ambas se anulan en una explosión de 2d6×10 de daño en un radio de 60 pies. Dispersar magia y disyunción del mago no le afectan.",
  },
  {
    id: "staff-of-the-magi",
    name: "Bastón de los Magos (Staff of the Magi)",
    source: "srd",
    category: "artefacto_menor",
    price: "Sin precio de mercado",
    casterLevel: 20,
    aura: "Potente (todas las escuelas)",
    description:
      "Bastón de madera con herrajes de hierro y runas. Sin gasto de cargas permite lanzar detectar magia, agrandar persona (Fortaleza CD 15), inmovilizar portal, luz, armadura del mago y mano de mago. Gastando 1 carga permite lanzar dispersar magia, bola de fuego 10d6 (Reflejos CD 17 mitad), tormenta de hielo, invisibilidad, abrir cerradura, relámpago 10d6 (Reflejos CD 17 mitad), paso a través de muros, pirotecnia (Voluntad o Fortaleza CD 16), muro de fuego o telaraña. Gastando 2 cargas permite lanzar convocar monstruos IX, viaje entre planos (Voluntad CD 21) o telequinesia de hasta 400 libras (Voluntad CD 19). Otorga resistencia a conjuros 23 al portador; si este la baja voluntariamente, el bastón puede absorber energía de conjuros arcanos dirigidos contra su portador (como una vara de absorción), pero convierte los niveles de conjuro absorbidos en cargas, no en energía utilizable. Si supera el límite de 50 cargas, explota como un golpe retributivo. El portador puede romper el bastón deliberadamente para liberar todas sus cargas en un radio de 30 pies: quienes estén a 10 pies o menos sufren daño igual a 8 veces el número de cargas, entre 11 y 20 pies 6 veces las cargas, y entre 21 y 30 pies 4 veces las cargas (una salvación de Reflejos CD 17 reduce el daño a la mitad). Quien rompe el bastón tiene 50% de probabilidad de viajar a otro plano; si no, la liberación de energía lo destruye.",
  },
  {
    id: "talisman-of-pure-good",
    name: "Talismán del Bien Puro (Talisman of Pure Good)",
    source: "srd",
    category: "artefacto_menor",
    price: "Sin precio de mercado",
    casterLevel: 18,
    aura: "Evocación fuerte [bien]",
    description:
      "Un lanzador divino bueno (legal bueno, neutral bueno o caótico bueno) puede abrir una grieta llameante a los pies de un lanzador divino malvado situado hasta a 100 pies, que es tragado para siempre hacia el centro de la tierra; el objetivo obtiene una salvación de Reflejos CD 19 para escapar, salvo que el usuario sea excepcionalmente puro, en cuyo caso debe además encontrarse sobre suelo sólido. Tiene 6 cargas. Un lanzador divino neutral que lo toque sufre 6d6 de daño; uno malvado sufre 8d6; el resto de personajes no se ven afectados.",
  },
  {
    id: "talisman-of-the-sphere",
    name: "Talismán de la Esfera (Talisman of the Sphere)",
    source: "srd",
    category: "artefacto_menor",
    price: "Sin precio de mercado",
    casterLevel: 16,
    aura: "Transmutación fuerte",
    description:
      "Bucle y asa de adamantina; inútil para quien no lance conjuros arcanos (quien no puede lanzarlos sufre 5d6 de daño solo por sostenerlo). En manos de un lanzador arcano que controle una esfera de aniquilación, duplica su modificador de control, duplicando tanto el bonificador de Inteligencia como el nivel de personaje aplicados. Si establece control, solo necesita comprobarlo cada dos rondas; si no lo establece, la esfera se mueve hacia él.",
  },
  {
    id: "talisman-of-reluctant-wishes",
    name: "Talismán de los Deseos Reticentes (Talisman of Reluctant Wishes)",
    source: "srd",
    category: "artefacto_menor",
    price: "Sin precio de mercado",
    casterLevel: 20,
    aura: "Conjuración fuerte",
    description:
      "Apariencia idéntica a una piedra de control de elementales de tierra. Al tocarlo se hace una prueba de Carisma CD 15: si falla, actúa como una piedra de peso (descartarlo o destruirlo inflige 5d6 de daño y lo hace desaparecer). Si tiene éxito, permanece con el personaje 5d6 horas o hasta que use un deseo con él, lo que ocurra antes. Con un 20 natural, el personaje no puede desprenderse de él durante tantos meses como puntos de Carisma tenga, y el talismán le concede un deseo por cada 6 puntos de Carisma; además se calienta y palpita cuando su poseedor está a menos de 20 pies de una trampa mecánica o mágica (solo si lo lleva encima). En cualquier caso desaparece al expirar su plazo, dejando un diamante de 10.000 po.",
  },
  {
    id: "talisman-of-ultimate-evil",
    name: "Talismán del Mal Absoluto (Talisman of Ultimate Evil)",
    source: "srd",
    category: "artefacto_menor",
    price: "Sin precio de mercado",
    casterLevel: 18,
    aura: "Evocación fuerte [malvado]",
    description:
      "Contraparte malvada del talismán del bien puro: un lanzador divino malvado abre una grieta llameante a los pies de un lanzador divino bueno situado hasta a 100 pies (una salvación de Reflejos CD 19 la evita, salvo que el usuario sea excepcionalmente perverso), tragando a la víctima hacia el centro de la tierra. Tiene 6 cargas: un lanzador divino neutral que lo toque sufre 6d6 de daño, y uno bueno sufre 8d6.",
  },
  {
    id: "moaning-diamond",
    name: "El Diamante Gemidor (The Moaning Diamond)",
    source: "srd",
    category: "artefacto_mayor",
    price: "Sin precio de mercado",
    description:
      "Diamante sin tallar del tamaño de un puño humano que emite constantemente un gemido lastimero, pese a lo cual no es maligno. Tres veces al día su portador puede invocar dar forma a la piedra afectando hasta 5.000 pies cúbicos de material. También puede convocar un elemental de tierra anciano con el máximo de puntos de golpe posible, que sirve al invocador hasta morir; solo puede haber uno convocado a la vez, y tras su muerte no puede convocarse otro hasta pasadas 24 horas. La fuente consultada no especifica un método de destrucción para este artefacto.",
  },
  {
    id: "orbs-of-dragonkind",
    name: "Las Orbes de la Estirpe Dracónica (The Orbs of Dragonkind)",
    source: "srd",
    category: "artefacto_mayor",
    price: "Sin precio de mercado",
    description:
      "Diez orbes, una por cada variedad importante de dragón cromático y metálico; cada una contiene la esencia y personalidad de un dragón anciano de esa variedad. Su portador puede dominar (como dominar monstruo) a dragones de esa variedad situados dentro de 500 pies (salvación de Voluntad CD 25, sin resistencia a conjuros aplicable). Cada orbe otorga a su portador la CA y los bonificadores de salvación del dragón interior, sustituyendo los propios cuando sean mejores o peores. El portador es inmune al arma de aliento (solo esa) de la variedad correspondiente, y puede usar el arma de aliento del dragón de la orbe tres veces al día. Todas las orbes permiten comunicación verbal y visual entre sus portadores. El portador percibe dragones en 10 millas en todo momento (100 millas para la variedad propia); a menos de 1 milla de un dragón de su variedad, puede determinar su ubicación y edad exactas. El portador se gana la enemistad eterna de toda la estirpe dracónica. Cada orbe otorga además un poder individual invocable una vez por ronda a nivel de lanzador 10: la Negra permite volar (Voluntad CD 17); la Azul, prisa (Fortaleza CD 17); la de Latón, teletransportar (Voluntad CD 19); la de Bronce, escrutar (Voluntad CD 18); la de Cobre, sugestión (Voluntad CD 17); la de Oro puede invocar una vez al día cualquier poder de las demás orbes (incluidos dominar y arma de aliento, aunque no la CA, salvaciones ni inmunidad) y puede dominar a otro portador de orbe dentro de 1 milla (Voluntad CD 23); la Verde otorga mano espectral; la Roja, muro de fuego; la de Plata, curar heridas críticas (Voluntad CD 18 mitad); y la Blanca, protección contra energía (frío) (Fortaleza CD 17). La fuente consultada no especifica un método de destrucción para este artefacto.",
  },
  {
    id: "saints-mace",
    name: "La Maza del Santo (The Saint's Mace)",
    source: "srd",
    category: "artefacto_mayor",
    price: "Sin precio de mercado",
    description:
      "Aparenta ser un simple garrote gastado, pero es una maza pesada +5 con las habilidades especiales sagrada, axiomática y de disrupción. Su portador puede proyectar luz cegadora a voluntad, a nivel de lanzador 20. La fuente consultada no especifica un método de destrucción para este artefacto.",
  },
  {
    id: "shadowstaff",
    name: "El Bastón de Sombras (The Shadowstaff)",
    source: "srd",
    category: "artefacto_mayor",
    price: "Sin precio de mercado",
    description:
      "Forjado entrelazando hebras de sombra; vuelve a su portador ligeramente sombrío e incorpóreo, dando +4 a la CA y a las salvaciones de Reflejos (se acumula con otros bonificadores). Sin embargo, a plena luz (como la del sol, no una antorcha) o en oscuridad absoluta, da -2 a las tiradas de ataque, salvaciones y pruebas de habilidad. Poderes adicionales: convocar sombras (3 veces al día, 2d4 sombras inmunes a expulsión que sirven como si fueran convocadas por convocar monstruos V a nivel de lanzador 20); convocar pesadumbra (1 vez al mes, convoca un nightcrawler nightshade como si fuera convocar monstruos IX a nivel de lanzador 20); forma de sombra (3 veces al día, como forma gaseosa); y rayo de sombra (3 veces al día, inflige 10d6 de daño de frío a un único objetivo a hasta 100 pies). La fuente consultada no especifica un método de destrucción para este artefacto.",
  },
  {
    id: "shield-of-the-sun",
    name: "El Escudo del Sol (The Shield of the Sun)",
    source: "srd",
    category: "artefacto_mayor",
    price: "Sin precio de mercado",
    description:
      "Escudo grande +5 con el símbolo del sol; permite a su portadora lanzar conjuros como una paladina de nivel 20 con Sabiduría 20 (estos conjuros se acumulan con los que ya tenga cada día, incluso si ya es paladina). Otorga resistencia a conjuros 15 y absorbe los primeros 10 puntos de daño de cualquier ataque de energía (fuego, frío, ácido, electricidad o sónico). A cambio, una vez al año su dueña debe cumplir una misión, sin salvación posible para evitarla, por orden de una deidad legal buena. Un personaje malvado o caótico (legal malvado, neutral malvado, caótico malvado, caótico neutral o caótico bueno) sufre 4 niveles negativos al intentar usarlo; estos nunca producen pérdida de nivel real, persisten mientras lo sostenga, no se eliminan ni con restauración, y desaparecen al guardar o soltar el escudo. La fuente consultada no especifica un método de destrucción para este artefacto.",
  },
];
