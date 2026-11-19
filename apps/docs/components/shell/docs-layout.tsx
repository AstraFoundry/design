import type * as PageTree from "fumadocs-core/page-tree";
import type { ReactNode } from "react";
import { DocsHeader } from "./header";
import { ScrollArea } from "@astrafoundry/design/ui";
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
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-64 shrink-0 border-r border-border lg:block">
          <ScrollArea className="h-full">
            <DocsSidebar tree={tree} className="h-auto w-full overflow-visible py-6" />
          </ScrollArea>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </>
  );
}
