import { i18nProvider } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SearchDialog } from "@/components/search";
import { display, mono, sans } from "@/lib/fonts";
import { i18n } from "@/lib/i18n";
import { translations } from "@/lib/layout.shared";

export const metadata: Metadata = {
  title: { default: "Sunbeam", template: "%s · Sunbeam" },
  description:
    "AstraFoundry's design system: clear, quick interaction in warm ink and one yellow.",
};

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function LangLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  return (
    <html
      lang={lang === "zh" ? "zh-CN" : "en"}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider
          i18n={i18nProvider(translations, lang)}
          search={{ SearchDialog }}
          theme={{ attribute: "class", defaultTheme: "light", enableSystem: true }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
