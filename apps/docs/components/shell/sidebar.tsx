"use client";

import { Sidebar, SidebarItem, SidebarSection } from "@astrafoundry/design/ui";
import type * as PageTree from "fumadocs-core/page-tree";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { UI } from "@/lib/i18n-ui";
import { useDocsLang } from "../lang";

const normalize = (url: string) => url.replace(/\/$/, "");

/**
 * The docs' side navigation, built from the page tree with Sunbeam's
 * Sidebar: flat chrome, separators as section titles, the current page a
 * flat solid face.
 */
export function DocsSidebar({
  tree,
  onNavigate,
  className,
}: {
  tree: PageTree.Root;
  onNavigate?: () => void;
  className?: string;
}) {
  const t = UI[useDocsLang()];
  const path = normalize(usePathname());

  const item = (node: PageTree.Item) => (
    <SidebarItem
      key={node.url}
      href={node.url}
      current={normalize(node.url) === path}
      onClick={onNavigate}
      render={<Link href={node.url} />}
    >
      {node.name}
    </SidebarItem>
  );

  /**
   * The tree as a flat list of sections: a folder's name and each separator
   * start a new section, so every title gets the sidebar's own spacing.
   */
  const sections: { title?: ReactNode; items: PageTree.Item[] }[] = [];
  const walk = (nodes: PageTree.Node[], title?: ReactNode) => {
    let current = { title, items: [] as PageTree.Item[] };
    sections.push(current);
    for (const node of nodes) {
      if (node.type === "separator") {
        current = { title: node.name, items: [] };
        sections.push(current);
      } else if (node.type === "page") {
        current.items.push(node);
      } else if (node.type === "folder") {
        if (node.index) current.items.push(node.index);
        walk(node.children, node.name);
        current = { title: undefined, items: [] };
        sections.push(current);
      }
    }
  };
  walk(tree.children);

  // Bring the current page into view when the sidebar opens or the page changes.
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    ref.current
      ?.querySelector('[aria-current="page"]')
      ?.scrollIntoView({ block: "center" });
  }, [path]);

  return (
    <Sidebar ref={ref} aria-label={t.nav} className={className}>
      {sections
        .filter((section) => section.items.length > 0)
        .map((section, index) => (
          <SidebarSection key={index} title={section.title}>
            {section.items.map(item)}
          </SidebarSection>
        ))}
    </Sidebar>
  );
}
