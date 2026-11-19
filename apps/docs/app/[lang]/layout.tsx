import type { Metadata } from "next";
import type { ReactNode } from "react";
import { toLang } from "@/lib/lang";
import { Providers } from "@/components/shell/providers";
import { display, mono, sans } from "@/lib/fonts";
import { i18n } from "@/lib/i18n";
import { UI } from "@/lib/i18n-ui";

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
  const lang = toLang((await params).lang);
  return (
    <html
      lang={lang === "zh" ? "zh-CN" : "en"}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#content"
          className="sr-only z-50 rounded-full bg-foreground px-4 py-2 text-sm text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {UI[lang].skip}
        </a>
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
