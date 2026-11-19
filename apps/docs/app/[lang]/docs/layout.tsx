import type { ReactNode } from "react";
import { DocsLayout } from "@/components/shell/docs-layout";
import { source } from "@/lib/source";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  return <DocsLayout tree={source.getPageTree(lang)}>{children}</DocsLayout>;
}
