import type { VariantRule } from "../../types";

export const COMPLETE_DIVINE_VARIANT_RULES: VariantRule[] = [
  {
    id: "vr-cdv-destroy-undead",
    name: "Variante: Destruir no-muertos",
    source: "complete-divine",
    category: "combate",
    description:
      "Regla variante opcional que sustituye el funcionamiento normal de Expulsar no-muertos para todos los personajes con ese rasgo (clérigos, paladines, etc.). En vez de una tirada para ahuyentar, expulsar no-muertos se convierte en una acción estándar que causa una ráfaga de energía en un radio de 9 m (30 pies): 1d6 de daño por nivel de clérigo a todos los no-muertos en el área, con salvación de Voluntad (CD 10 + nivel de clérigo + modificador de Carisma) para reducirlo a la mitad. Un clérigo malvado (o uno bueno que sustituya sus conjuros preparados por inflingir heridas) cura a los no-muertos en el área en vez de dañarlos.",
    defaultEnabled: false,
  },
];
