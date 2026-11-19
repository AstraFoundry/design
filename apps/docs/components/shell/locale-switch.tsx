"use client";

import { LocaleSwitch } from "@astrafoundry/design/ui";
import { usePathname } from "next/navigation";
import { UI } from "@/lib/i18n-ui";
import { useDocsLang, type DocsLang } from "../lang";

const LANGS: { locale: DocsLang; tag: string }[] = [
  { locale: "zh", tag: "zh-CN" },
  { locale: "en", tag: "en" },
];

/** The current page in the other language, through Sunbeam's LocaleSwitch. */
export function DocsLocaleSwitch() {
  const lang = useDocsLang();
  const path = usePathname();
  const rest = path.replace(/^\/(zh|en)(?=\/|$)/, "");
  return (
    <LocaleSwitch
      label={UI[lang].language}
      links={LANGS.map(({ locale, tag }) => ({
        locale,
        tag,
        name: UI[locale].langName,
        href: `/${locale}${rest || "/"}`,
        current: locale === lang,
      }))}
    />
  );
}
