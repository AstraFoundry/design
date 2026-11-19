"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { DocsLang } from "@/lib/lang";

export type { DocsLang };

const LangContext = createContext<DocsLang>("zh");

export function LangProvider({
  lang,
  children,
}: {
  lang: DocsLang;
  children: ReactNode;
}) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

/** The page's language, for copy inside client components. */
export function useDocsLang(): DocsLang {
  return useContext(LangContext);
}
