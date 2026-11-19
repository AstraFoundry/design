"use client";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Search } from "lucide-react";
import { useRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { useSchemeClass } from "./scheme.js";
import { groupLabelClasses, itemClasses, separatorClasses } from "./styles.js";

export interface CommandProps<Item> extends Omit<
  BaseAutocomplete.Root.Props<Item>,
  "open" | "onOpenChange" | "children" | "items"
> {
  /** The commands to filter: a flat array, or groups of `{ items }`. */
  items: readonly Item[];
  /** Whether the palette is open. Bind a shortcut such as ⌘K to it. */
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Names the search field. */
  label: string;
  placeholder?: string;
  /** Shown when nothing matches. */
  empty?: ReactNode;
  /** A row under the list, as keyboard hints. */
  footer?: ReactNode;
  /** The list: a CommandList, with groups and items. */
  children: ReactNode;
  className?: string;
}

/**
 * A command palette: a raised dialog holding a search field and the list it
 * filters, the first match always highlighted so Enter runs it.
 */
export function Command<Item>({
  open,
  onOpenChange,
  label,
  placeholder,
  empty,
  footer,
  children,
  className,
  ...rest
}: CommandProps<Item>) {
  const scheme = useSchemeClass();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <BaseDialog.Root open={open} onOpenChange={(next) => onOpenChange?.(next)}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="backdrop-motion fixed inset-0 z-50" />
        <BaseDialog.Viewport className="fixed inset-0 z-50 flex justify-center px-4 pt-[min(20dvh,10rem)]">
          <BaseDialog.Popup
            data-material="raised"
            aria-label={label}
            initialFocus={inputRef}
            className={cn(
              scheme,
              "material-panel dialog-motion flex h-fit max-h-[min(30rem,70dvh)] w-full max-w-xl flex-col overflow-hidden rounded-continuous-[22px] text-foreground outline-none",
              className,
            )}
          >
            <BaseAutocomplete.Root
              open
              inline
              autoHighlight="always"
              keepHighlight
              {...rest}
            >
              <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-border px-4">
                <Search aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                <BaseAutocomplete.Input
                  ref={inputRef}
                  aria-label={label}
                  placeholder={placeholder}
                  className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground/80"
                />
              </div>
              {empty ? (
                <BaseAutocomplete.Empty className="px-4 py-6 text-center text-sm text-muted-foreground empty:hidden">
                  {empty}
                </BaseAutocomplete.Empty>
              ) : null}
              {children}
              {footer ? (
                <div className="flex h-10 shrink-0 items-center gap-3 border-t border-border px-4 text-xs text-muted-foreground">
                  {footer}
                </div>
              ) : null}
            </BaseAutocomplete.Root>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export function CommandList({
  className,
  ...rest
}: ComponentProps<typeof BaseAutocomplete.List>) {
  return (
    <BaseAutocomplete.List
      className={cn(
        "min-h-0 flex-1 scroll-py-1.5 overflow-y-auto overscroll-contain p-1.5 outline-none data-empty:hidden",
        className as string,
      )}
      {...rest}
    />
  );
}

export interface CommandItemProps extends ComponentProps<typeof BaseAutocomplete.Item> {
  shortcut?: ReactNode;
}

export function CommandItem({
  className,
  children,
  shortcut,
  ...rest
}: CommandItemProps) {
  return (
    <BaseAutocomplete.Item
      className={cn(itemClasses, "h-9", className as string)}
      {...rest}
    >
      {children}
      {shortcut ? (
        <span className="ml-auto pl-4 text-xs tracking-wide text-muted-foreground">
          {shortcut}
        </span>
      ) : null}
    </BaseAutocomplete.Item>
  );
}

export const CommandGroup = BaseAutocomplete.Group;
export const CommandCollection = BaseAutocomplete.Collection;

export function CommandGroupLabel({
  className,
  ...rest
}: ComponentProps<typeof BaseAutocomplete.GroupLabel>) {
  return (
    <BaseAutocomplete.GroupLabel
      className={cn(groupLabelClasses, className as string)}
      {...rest}
    />
  );
}

export function CommandSeparator({
  className,
  ...rest
}: ComponentProps<typeof BaseAutocomplete.Separator>) {
  return (
    <BaseAutocomplete.Separator
      className={cn(separatorClasses, "mx-0", className as string)}
      {...rest}
    />
  );
}
