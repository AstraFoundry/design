"use client";

import {
  Command,
  CommandItem,
  CommandList,
  IconButton,
  Kbd,
} from "@astrafoundry/design/ui";
import { useStaticSearch } from "fumadocs-core/search/client";
import { FileText, Hash, Search as SearchIcon, Text } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UI } from "@/lib/i18n-ui";
import { useDocsLang } from "../lang";

interface Hit {
  id: string;
  url: string;
  type: "page" | "heading" | "text";
  content: string;
}

const ICON = { page: FileText, heading: Hash, text: Text } as const;

/** Text of a search hit: its markup stripped, for the list and for matching. */
const plain = (value: unknown) =>
  typeof value === "string" ? value.replace(/<[^>]+>/g, "") : String(value ?? "");

/**
 * The docs search: a field in the header that opens Sunbeam's Command, ⌘K
 * from anywhere. Results come from the site's static search index.
 */
export function DocsSearch({
  className,
  compact = false,
}: {
  className?: string;
  /** An icon button, for narrow headers. */
  compact?: boolean;
}) {
  const lang = useDocsLang();
  const t = UI[lang];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { search, setSearch, query } = useDocsSearchState(lang);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Rows of tables (prop tables, key tables) are left out: the palette
  // lists pages, headings and text, each a line.
  const hits: Hit[] = (query.data?.items ?? [])
    .filter((item): item is Extract<typeof item, { url: string }> => "url" in item)
    .map((item) => ({
      id: item.id,
      url: item.url,
      type: item.type,
      content: plain(item.content),
    }))
    .filter((hit) => hit.content.trim().length > 0);

  return (
    <>
      {compact ? (
        <IconButton
          label={t.searchDocs}
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
          className={className}
        >
          <SearchIcon aria-hidden />
        </IconButton>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t.searchDocs}
          className={
            "material-field flex h-9 w-full min-w-0 items-center gap-2 rounded-full px-3 text-sm text-muted-foreground " +
            "transition-colors duration-(--duration-press) hover:text-foreground " +
            "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring " +
            (className ?? "")
          }
        >
          <SearchIcon aria-hidden className="size-4 shrink-0" />
          <span className="flex-1 truncate text-left">{t.search}</span>
          <span className="hidden items-center gap-0.5 sm:flex">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>
      )}
      <Command
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setSearch("");
        }}
        items={hits}
        label={t.searchDocs}
        placeholder={t.searchPlaceholder}
        empty={search ? t.noResults : undefined}
        value={search}
        onValueChange={(value: string) => setSearch(value)}
        filter={null}
        itemToStringValue={(hit: Hit) => hit.content}
        footer={
          <>
            <span className="flex items-center gap-1">
              <Kbd>↵</Kbd> {t.run}
            </span>
            <span className="flex items-center gap-1">
              <Kbd>esc</Kbd> {t.close}
            </span>
          </>
        }
      >
        <CommandList>
          {(hit: Hit) => {
            const Icon = ICON[hit.type];
            return (
              <CommandItem
                key={hit.id}
                value={hit}
                onClick={() => {
                  setOpen(false);
                  router.push(hit.url);
                }}
                className={hit.type === "page" ? "font-medium" : "pl-7"}
              >
                <Icon aria-hidden />
                <span className="truncate">{hit.content}</span>
              </CommandItem>
            );
          }}
        </CommandList>
      </Command>
    </>
  );
}

function useDocsSearchState(locale: string) {
  const query = useStaticSearch({ locale });
  return { search: query.search, setSearch: query.onSearchChange, query };
}
