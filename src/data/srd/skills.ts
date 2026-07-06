import type { Skill } from "../../types";

// Lista completa de habilidades del SRD 3.5 (contenido de juego abierto).
// Nombres verificados contra el uso consolidado de la comunidad hispana de
// D&D 3.5 (nivel20.com, rincondeldm.com, hojas de personaje oficiales en
// español) en julio de 2026, no contra el libro impreso.
export const SRD_SKILLS: Skill[] = [
  { id: "appraise", name: "Tasación", keyAbility: "int", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Estimar el valor monetario de un objeto." },
  { id: "balance", name: "Equilibrio", keyAbility: "dex", trainedOnly: false, armorCheckPenalty: true, source: "srd", description: "Mantenerse en pie sobre superficies inestables o resbaladizas." },
  { id: "bluff", name: "Engañar", keyAbility: "cha", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Engañar con palabras o gestos." },
  { id: "climb", name: "Trepar", keyAbility: "str", trainedOnly: false, armorCheckPenalty: true, source: "srd", description: "Escalar superficies verticales." },
  { id: "concentration", name: "Concentración", keyAbility: "con", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Mantener la concentración al lanzar conjuros bajo distracción o daño." },
  { id: "craft", name: "Artesanía", keyAbility: "int", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Crear objetos de un oficio concreto (se elige la especialidad al comprar rangos).", requiresSpecialization: true },
  { id: "decipher-script", name: "Descifrar Escritura", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Comprender textos en clave, dañados o en idiomas desconocidos." },
  { id: "diplomacy", name: "Diplomacia", keyAbility: "cha", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Persuadir e influir en la actitud de otros." },
  { id: "disable-device", name: "Inutilizar Mecanismo", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Desactivar trampas mecánicas y mecanismos." },
  { id: "disguise", name: "Disfrazarse", keyAbility: "cha", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Cambiar la apariencia propia." },
  { id: "escape-artist", name: "Escapismo", keyAbility: "dex", trainedOnly: false, armorCheckPenalty: true, source: "srd", description: "Escapar de ataduras, presas o espacios estrechos." },
  { id: "forgery", name: "Falsificar", keyAbility: "int", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Crear documentos falsos." },
  { id: "gather-information", name: "Reunir Información", keyAbility: "cha", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Recabar rumores y datos hablando con la gente." },
  { id: "handle-animal", name: "Trato con Animales", keyAbility: "cha", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Adiestrar y controlar animales." },
  { id: "heal", name: "Sanar", keyAbility: "wis", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Primeros auxilios y tratamiento de heridas y venenos." },
  { id: "hide", name: "Esconderse", keyAbility: "dex", trainedOnly: false, armorCheckPenalty: true, source: "srd", description: "Pasar desapercibido a la vista." },
  { id: "intimidate", name: "Intimidar", keyAbility: "cha", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Coaccionar mediante amenazas." },
  { id: "jump", name: "Saltar", keyAbility: "str", trainedOnly: false, armorCheckPenalty: true, source: "srd", description: "Saltar distancias horizontales o verticales." },
  { id: "knowledge-arcana", name: "Saber (Arcano)", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Saber sobre magia, criaturas mágicas y planos relacionados." },
  { id: "knowledge-architecture-engineering", name: "Saber (Arquitectura e Ingeniería)", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Saber sobre estructuras y construcciones." },
  { id: "knowledge-dungeoneering", name: "Saber (Mazmorras)", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Saber sobre criaturas y peligros subterráneos." },
  { id: "knowledge-geography", name: "Saber (Geografía)", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Saber sobre tierras, climas y pueblos." },
  { id: "knowledge-history", name: "Saber (Historia)", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Saber sobre sucesos históricos." },
  { id: "knowledge-local", name: "Saber (Local)", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Saber sobre la región donde se vive." },
  { id: "knowledge-nature", name: "Saber (Naturaleza)", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Saber sobre flora, fauna y fenómenos naturales." },
  { id: "knowledge-nobility-royalty", name: "Saber (Nobleza y Realeza)", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Saber sobre linajes, heráldica y protocolo." },
  { id: "knowledge-the-planes", name: "Saber (Planos)", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Saber sobre los planos de existencia." },
  { id: "knowledge-religion", name: "Saber (Religión)", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Saber sobre deidades y prácticas religiosas." },
  { id: "listen", name: "Escuchar", keyAbility: "wis", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Detectar sonidos." },
  { id: "move-silently", name: "Moverse Sigilosamente", keyAbility: "dex", trainedOnly: false, armorCheckPenalty: true, source: "srd", description: "Moverse sin hacer ruido." },
  { id: "open-lock", name: "Abrir Cerraduras", keyAbility: "dex", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Forzar cerraduras con ganzúas." },
  { id: "perform", name: "Interpretar", keyAbility: "cha", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Actuar, tocar música, bailar o narrar (se elige especialidad).", requiresSpecialization: true },
  { id: "profession", name: "Oficio", keyAbility: "wis", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Ejercer un oficio para ganarse la vida (se elige especialidad).", requiresSpecialization: true },
  { id: "ride", name: "Montar", keyAbility: "dex", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Montar y controlar una montura." },
  { id: "search", name: "Buscar", keyAbility: "int", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Encontrar detalles ocultos examinando activamente." },
  { id: "sense-motive", name: "Averiguar Intenciones", keyAbility: "wis", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Detectar mentiras y motivaciones ocultas." },
  { id: "sleight-of-hand", name: "Juego de Manos", keyAbility: "dex", trainedOnly: true, armorCheckPenalty: true, source: "srd", description: "Robar objetos u ocultarlos sobre uno mismo." },
  { id: "spellcraft", name: "Conocimiento de Conjuros", keyAbility: "int", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Identificar conjuros y objetos mágicos." },
  { id: "spot", name: "Avistar", keyAbility: "wis", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Detectar algo visualmente." },
  { id: "survival", name: "Supervivencia", keyAbility: "wis", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Sobrevivir en la naturaleza, rastrear y orientarse." },
  { id: "swim", name: "Nadar", keyAbility: "str", trainedOnly: false, armorCheckPenalty: true, source: "srd", description: "Nadar y mantenerse a flote." },
  { id: "tumble", name: "Piruetas", keyAbility: "dex", trainedOnly: true, armorCheckPenalty: true, source: "srd", description: "Realizar volteretas para evitar ataques o caer sin daño." },
  { id: "use-magic-device", name: "Usar Objeto Mágico", keyAbility: "cha", trainedOnly: true, armorCheckPenalty: false, source: "srd", description: "Utilizar objetos mágicos sin cumplir sus requisitos." },
  { id: "use-rope", name: "Uso de Cuerdas", keyAbility: "dex", trainedOnly: false, armorCheckPenalty: false, source: "srd", description: "Atar nudos y utilizar cuerdas eficazmente." },
];

export const SRD_SKILL_IDS = SRD_SKILLS.map((s) => s.id);
