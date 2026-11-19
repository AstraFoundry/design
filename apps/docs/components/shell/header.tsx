"use client";

import {
  Drawer,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
  IconButton,
  LinkButton,
  iconButtonClasses,
} from "@astrafoundry/design/ui";
import type * as PageTree from "fumadocs-core/page-tree";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { gitHubUrl } from "@/lib/site";
import { UI } from "@/lib/i18n-ui";
import { useDocsLang } from "../lang";
import { Logo } from "../logo";
import { DocsLocaleSwitch } from "./locale-switch";
import { DocsSearch } from "./search";
import { DocsSidebar } from "./sidebar";
import { ThemeSwitch } from "./theme-switch";

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[18px]" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

/**
 * The docs' header: flat chrome with a hairline. The brand, the two
 * sections, search, and the language, theme and GitHub controls; below
 * `lg` a menu button opens the navigation in a drawer.
 */
export function DocsHeader({ tree }: { tree?: PageTree.Root }) {
  const lang = useDocsLang();
  const t = UI[lang];
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const section = (href: string) => path.startsWith(href);
  const nav = [
    {
      href: `/${lang}/docs/`,
      label: t.docs,
      on: section(`/${lang}/docs`) && !section(`/${lang}/docs/components`),
    },
    {
      href: `/${lang}/docs/components/button/`,
      label: t.components,
      on: section(`/${lang}/docs/components`),
    },
  ];
  return (
    <header
      data-material="flat"
      className="sticky top-0 z-40 border-b border-border bg-background/90 supports-[backdrop-filter]:bg-background/80"
    >
      <div className="mx-auto flex h-14 max-w-[90rem] items-center gap-3 px-4 sm:px-6">
        {tree ? (
          <Drawer side="left" open={menu} onOpenChange={setMenu}>
            <DrawerTrigger
              render={
                <IconButton
                  label={t.menu}
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                />
              }
            >
              <Menu aria-hidden />
            </DrawerTrigger>
            <DrawerPopup closeLabel={t.closeMenu} className="p-2 pt-12">
              <DrawerTitle className="sr-only">{t.nav}</DrawerTitle>
              <DocsSidebar
                tree={tree}
                onNavigate={() => setMenu(false)}
                className="w-full p-1"
              />
            </DrawerPopup>
          </Drawer>
        ) : null}
        <Link
          href={`/${lang}/`}
          className="flex shrink-0 items-center gap-2 rounded-full text-[15px] font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Logo className="size-5" />
          Sunbeam
        </Link>
        <nav aria-label={t.docs} className="ml-4 hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <LinkButton
              key={item.href}
              href={item.href}
              variant="ghost"
              size="sm"
              aria-current={item.on ? "page" : undefined}
              className="aria-[current=page]:text-foreground"
              as={Link}
            >
              {item.label}
            </LinkButton>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <DocsSearch className="hidden w-56 sm:flex" />
          <DocsSearch compact className="sm:hidden" />
          <DocsLocaleSwitch />
          <ThemeSwitch />
          <a
            href={gitHubUrl}
            aria-label={t.github}
            className={iconButtonClasses("ghost", "sm")}
          >
            <GitHubMark />
          </a>
        </div>
      </div>
    </header>
  );
}
