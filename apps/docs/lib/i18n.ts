import { defineI18n } from "fumadocs-core/i18n";

/** Chinese is the default; every URL carries its language, as /zh/… and /en/…. */
export const i18n = defineI18n({
  defaultLanguage: "zh",
  languages: ["zh", "en"],
  hideLocale: "never",
  parser: "dot",
});

export type Lang = (typeof i18n.languages)[number];
