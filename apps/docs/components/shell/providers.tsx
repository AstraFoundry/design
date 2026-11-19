"use client";

import { ToastProvider, TooltipProvider } from "@astrafoundry/design/ui";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { LangProvider, type DocsLang } from "../lang";
import { UI } from "@/lib/i18n-ui";

/** Theme, language, tooltips and toasts for every page. */
export function Providers({ lang, children }: { lang: DocsLang; children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <LangProvider lang={lang}>
        <TooltipProvider>
          <ToastProvider closeLabel={UI[lang].close}>{children}</ToastProvider>
        </TooltipProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
