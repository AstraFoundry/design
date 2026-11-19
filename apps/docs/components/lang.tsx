"use client";

import { useI18n } from "fumadocs-ui/contexts/i18n";

export type DocsLang = "zh" | "en";

/** The page's language, for copy inside client components. */
export function useDocsLang(): DocsLang {
  const { locale } = useI18n();
  return locale === "en" ? "en" : "zh";
}
