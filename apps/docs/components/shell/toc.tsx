"use client";

import {
  AnchorProvider,
  TOCItem,
  useActiveAnchors,
  type TOCItemType,
} from "fumadocs-core/toc";
import type { ReactNode } from "react";
import { UI } from "@/lib/i18n-ui";
import { useDocsLang } from "../lang";

/**
 * The page's headings, beside the content from `xl`. The heading in view
 * is ink with a short ink line before it; the others are muted.
 */
export function DocsToc({ toc, children }: { toc: TOCItemType[]; children: ReactNode }) {
  return (
    <AnchorProvider toc={toc} single>
      {children}
    </AnchorProvider>
  );
}

export function TocList({ toc }: { toc: TOCItemType[] }) {
  const t = UI[useDocsLang()];
  if (toc.length === 0) return null;
  return (
    <nav aria-label={t.toc} className="flex flex-col gap-1 text-[13px]">
      <p className="mb-2 text-xs font-medium text-muted-foreground">{t.toc}</p>
      {toc.map((item) => {
        return (
          <TOCItem
            key={item.url}
            href={item.url}
            className={
              "relative block rounded-sm py-1 text-muted-foreground transition-colors duration-(--duration-press) hover:text-foreground " +
              "focus-visible:outline-2 focus-visible:outline-ring " +
              "before:absolute before:top-1/2 before:-left-3 before:h-3.5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-foreground before:opacity-0 before:transition-opacity before:duration-(--duration-indicator) " +
              "data-[active=true]:text-foreground data-[active=true]:before:opacity-100"
            }
            style={{ paddingLeft: `${(item.depth - 2) * 12}px` }}
          >
            {item.title}
          </TOCItem>
        );
      })}
    </nav>
  );
}
