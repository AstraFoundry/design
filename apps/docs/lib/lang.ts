export type DocsLang = "zh" | "en";

export function toLang(value: string): DocsLang {
  return value === "en" ? "en" : "zh";
}
