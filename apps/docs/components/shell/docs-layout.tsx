import type * as PageTree from "fumadocs-core/page-tree";
import type { ReactNode } from "react";
import { DocsHeader } from "./header";
import { DocsSidebar } from "./sidebar";

/**
 * The docs frame: header, a sticky sidebar from `lg`, and the page. All
 * of it is Sunbeam's flat chrome; only the demos inside raise anything.
 */
export function DocsLayout({
  tree,
  children,
}: {
  tree: PageTree.Root;
  children: ReactNode;
}) {
  return (
    <>
      <DocsHeader tree={tree} />
      <div className="mx-auto flex w-full max-w-[90rem] flex-1">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border lg:block">
          <DocsSidebar tree={tree} className="w-full py-6" />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </>
  );
}
