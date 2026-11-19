"use client";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronsUpDown, X } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { useSchemeClass } from "./scheme.js";
import {
  fieldClasses,
  groupLabelClasses,
  itemClasses,
  popupClasses,
  separatorClasses,
} from "./styles.js";

/** Where a list's popup sits relative to its anchor. */
interface PositionProps {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

/* ---------------------------------------------------------------- Select */

/** Choose one value (or several, with `multiple`) from a short list. */
export const Select = BaseSelect.Root;

export type SelectTriggerProps = ComponentProps<typeof BaseSelect.Trigger> & {
  size?: "sm" | "md" | "lg";
};

const TRIGGER_SIZE = { sm: "h-8", md: "h-10", lg: "h-12 text-base" } as const;

/** The field that shows the choice and opens the list. */
export function SelectTrigger({
  className,
  children,
  size = "md",
  ...rest
}: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      className={cn(
        fieldClasses,
        TRIGGER_SIZE[size],
        "inline-flex min-w-40 items-center justify-between gap-2 text-left select-none",
        "data-popup-open:outline-2 data-popup-open:outline-offset-1 data-popup-open:outline-ring",
        className as string,
      )}
      {...rest}
    >
      {children}
      <BaseSelect.Icon className="flex text-muted-foreground">
        <ChevronsUpDown aria-hidden className="size-4" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

export type SelectValueProps = ComponentProps<typeof BaseSelect.Value>;

export function SelectValue({ className, ...rest }: SelectValueProps) {
  return (
    <BaseSelect.Value
      className={cn(
        "truncate data-placeholder:text-muted-foreground",
        className as string,
      )}
      {...rest}
    />
  );
}

export interface SelectPopupProps
  extends ComponentProps<typeof BaseSelect.Popup>, PositionProps {
  /**
   * Set the popup over the trigger with the chosen item aligned to it, as
   * macOS does. Off by default: the list drops below.
   */
  alignItemWithTrigger?: boolean;
}

/** The raised list of a select. */
export function SelectPopup({
  className,
  children,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  alignItemWithTrigger = false,
  ...rest
}: SelectPopupProps) {
  const scheme = useSchemeClass();
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        className="z-50 outline-none"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
      >
        <BaseSelect.Popup
          data-material="raised"
          className={cn(
            scheme,
            popupClasses,
            "min-w-(--anchor-width) data-[side=none]:min-w-[calc(var(--anchor-width)+8px)]",
            className as string,
          )}
          {...rest}
        >
          <BaseSelect.List className="max-h-(--available-height) scroll-py-1 overflow-y-auto overscroll-contain">
            {children}
          </BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export type SelectItemProps = ComponentProps<typeof BaseSelect.Item>;

/** An option: its label, and a check when it is the choice. */
export function SelectItem({ className, children, ...rest }: SelectItemProps) {
  return (
    <BaseSelect.Item className={cn(itemClasses, "pr-8", className as string)} {...rest}>
      <BaseSelect.ItemText className="truncate">{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="absolute right-2.5 flex">
        <Check aria-hidden className="text-foreground!" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}

export const SelectGroup = BaseSelect.Group;

export function SelectGroupLabel({
  className,
  ...rest
}: ComponentProps<typeof BaseSelect.GroupLabel>) {
  return (
    <BaseSelect.GroupLabel
      className={cn(groupLabelClasses, className as string)}
      {...rest}
    />
  );
}

export function SelectSeparator({
  className,
  ...rest
}: ComponentProps<typeof BaseSelect.Separator>) {
  return (
    <BaseSelect.Separator
      className={cn(separatorClasses, className as string)}
      {...rest}
    />
  );
}

/* -------------------------------------------------------------- Combobox */

/** Choose from a list filtered by what is typed. */
export const Combobox = BaseCombobox.Root;

export interface ComboboxInputProps extends Omit<
  ComponentProps<typeof BaseCombobox.Input>,
  "size"
> {
  size?: "sm" | "md" | "lg";
  /** Names the button that opens the list. Omit it to show no button. */
  triggerLabel?: string;
  /** Names the button that clears the input. Omit it to show no button. */
  clearLabel?: string;
}

/** The field you type into, with optional open and clear buttons. */
export function ComboboxInput({
  className,
  size = "md",
  triggerLabel,
  clearLabel,
  ...rest
}: ComboboxInputProps) {
  return (
    <BaseCombobox.InputGroup
      className={cn(
        fieldClasses,
        TRIGGER_SIZE[size],
        "flex items-center gap-1 pr-1.5 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-ring",
        className as string,
      )}
    >
      <BaseCombobox.Input
        className="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/80"
        {...rest}
      />
      {clearLabel ? (
        <BaseCombobox.Clear
          aria-label={clearLabel}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-flat-face-hover hover:text-foreground"
        >
          <X aria-hidden className="size-3.5" />
        </BaseCombobox.Clear>
      ) : null}
      {triggerLabel ? (
        <BaseCombobox.Trigger
          aria-label={triggerLabel}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-flat-face-hover hover:text-foreground"
        >
          <ChevronsUpDown aria-hidden className="size-4" />
        </BaseCombobox.Trigger>
      ) : null}
    </BaseCombobox.InputGroup>
  );
}

export interface ComboboxPopupProps
  extends ComponentProps<typeof BaseCombobox.Popup>, PositionProps {
  /** Shown when nothing matches. */
  empty?: ReactNode;
}

/** The raised list of a combobox. */
export function ComboboxPopup({
  className,
  children,
  empty,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  ...rest
}: ComboboxPopupProps) {
  const scheme = useSchemeClass();
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        className="z-50 outline-none"
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BaseCombobox.Popup
          data-material="raised"
          className={cn(
            scheme,
            popupClasses,
            "w-(--anchor-width) max-w-(--available-width)",
            className as string,
          )}
          {...rest}
        >
          {empty ? (
            <BaseCombobox.Empty className="px-2.5 py-2 text-sm text-muted-foreground empty:hidden">
              {empty}
            </BaseCombobox.Empty>
          ) : null}
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

export function ComboboxList({
  className,
  ...rest
}: ComponentProps<typeof BaseCombobox.List>) {
  return (
    <BaseCombobox.List
      className={cn(
        "max-h-[min(22rem,var(--available-height))] scroll-py-1 overflow-y-auto overscroll-contain outline-none data-empty:hidden",
        className as string,
      )}
      {...rest}
    />
  );
}

export function ComboboxItem({
  className,
  children,
  ...rest
}: ComponentProps<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item className={cn(itemClasses, "pr-8", className as string)} {...rest}>
      {children}
      <BaseCombobox.ItemIndicator className="absolute right-2.5 flex">
        <Check aria-hidden className="text-foreground!" />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
}

export const ComboboxGroup = BaseCombobox.Group;

export function ComboboxGroupLabel({
  className,
  ...rest
}: ComponentProps<typeof BaseCombobox.GroupLabel>) {
  return (
    <BaseCombobox.GroupLabel
      className={cn(groupLabelClasses, className as string)}
      {...rest}
    />
  );
}

/* ---------------------------------------------------------- Autocomplete */

/** A text field that suggests completions; what is typed is the value. */
export const Autocomplete = BaseAutocomplete.Root;

export interface AutocompleteInputProps extends Omit<
  ComponentProps<typeof BaseAutocomplete.Input>,
  "size"
> {
  size?: "sm" | "md" | "lg";
}

export function AutocompleteInput({
  className,
  size = "md",
  ...rest
}: AutocompleteInputProps) {
  return (
    <BaseAutocomplete.Input
      className={cn(fieldClasses, TRIGGER_SIZE[size], className as string)}
      {...rest}
    />
  );
}

export interface AutocompletePopupProps
  extends ComponentProps<typeof BaseAutocomplete.Popup>, PositionProps {
  empty?: ReactNode;
}

export function AutocompletePopup({
  className,
  children,
  empty,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  ...rest
}: AutocompletePopupProps) {
  const scheme = useSchemeClass();
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        className="z-50 outline-none"
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BaseAutocomplete.Popup
          data-material="raised"
          className={cn(
            scheme,
            popupClasses,
            "w-(--anchor-width) max-w-(--available-width)",
            className as string,
          )}
          {...rest}
        >
          {empty ? (
            <BaseAutocomplete.Empty className="px-2.5 py-2 text-sm text-muted-foreground empty:hidden">
              {empty}
            </BaseAutocomplete.Empty>
          ) : null}
          {children}
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  );
}

export function AutocompleteList({
  className,
  ...rest
}: ComponentProps<typeof BaseAutocomplete.List>) {
  return (
    <BaseAutocomplete.List
      className={cn(
        "max-h-[min(22rem,var(--available-height))] scroll-py-1 overflow-y-auto overscroll-contain outline-none data-empty:hidden",
        className as string,
      )}
      {...rest}
    />
  );
}

export function AutocompleteItem({
  className,
  ...rest
}: ComponentProps<typeof BaseAutocomplete.Item>) {
  return (
    <BaseAutocomplete.Item className={cn(itemClasses, className as string)} {...rest} />
  );
}

export const AutocompleteGroup = BaseAutocomplete.Group;

export function AutocompleteGroupLabel({
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
