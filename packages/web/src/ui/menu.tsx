"use client";

import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Check, ChevronRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn.js";
import {
  groupLabelClasses,
  itemClasses,
  popupClasses,
  separatorClasses,
} from "./styles.js";

interface PositionProps {
  side?: "top" | "bottom" | "left" | "right" | "inline-start" | "inline-end";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

/* ------------------------------------------------------------------ Menu */

/** A raised list of actions opened by a button. */
export const Menu = BaseMenu.Root;
export const MenuTrigger = BaseMenu.Trigger;
export const MenuGroup = BaseMenu.Group;
export const MenuRadioGroup = BaseMenu.RadioGroup;
export const MenuSubmenu = BaseMenu.SubmenuRoot;

export interface MenuPopupProps
  extends ComponentProps<typeof BaseMenu.Popup>, PositionProps {}

function MenuLayer({
  className,
  children,
  ...rest
}: ComponentProps<typeof BaseMenu.Popup>) {
  return (
    <BaseMenu.Popup
      data-material="raised"
      className={cn(popupClasses, "min-w-44", className as string)}
      {...rest}
    >
      {children}
    </BaseMenu.Popup>
  );
}

/** The raised list. Its 14px corners less its 4px inset are its rows' 10px. */
export function MenuPopup({
  side = "bottom",
  align = "start",
  sideOffset = 6,
  alignOffset,
  ...rest
}: MenuPopupProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className="z-50 outline-none"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <MenuLayer {...rest} />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export interface MenuItemProps extends ComponentProps<typeof BaseMenu.Item> {
  /** A shortcut shown at the row's end, as ⌘D. */
  shortcut?: ReactNode;
}

/** An action. Icons go first among its children; a shortcut goes last. */
export function MenuItem({ className, children, shortcut, ...rest }: MenuItemProps) {
  return (
    <BaseMenu.Item className={cn(itemClasses, className as string)} {...rest}>
      {children}
      {shortcut ? <MenuShortcut>{shortcut}</MenuShortcut> : null}
    </BaseMenu.Item>
  );
}

export function MenuLinkItem({
  className,
  ...rest
}: ComponentProps<typeof BaseMenu.LinkItem>) {
  return <BaseMenu.LinkItem className={cn(itemClasses, className as string)} {...rest} />;
}

function MenuShortcut({ children }: { children: ReactNode }) {
  return (
    <span className="ml-auto pl-4 text-xs tracking-wide text-muted-foreground">
      {children}
    </span>
  );
}

const indicatorItem = "pl-8";
const indicator = "absolute left-2.5 flex text-foreground";

/** An item that turns a setting on and off, with a check while on. */
export function MenuCheckboxItem({
  className,
  children,
  ...rest
}: ComponentProps<typeof BaseMenu.CheckboxItem>) {
  return (
    <BaseMenu.CheckboxItem
      className={cn(itemClasses, indicatorItem, className as string)}
      {...rest}
    >
      <BaseMenu.CheckboxItemIndicator className={indicator}>
        <Check aria-hidden className="text-foreground!" />
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

/** One choice of a MenuRadioGroup, with an ink dot while chosen. */
export function MenuRadioItem({
  className,
  children,
  ...rest
}: ComponentProps<typeof BaseMenu.RadioItem>) {
  return (
    <BaseMenu.RadioItem
      className={cn(itemClasses, indicatorItem, className as string)}
      {...rest}
    >
      <BaseMenu.RadioItemIndicator
        className={cn(indicator, "size-4 items-center justify-center")}
      >
        <span className="size-1.5 rounded-full bg-foreground" />
      </BaseMenu.RadioItemIndicator>
      {children}
    </BaseMenu.RadioItem>
  );
}

export function MenuGroupLabel({
  className,
  ...rest
}: ComponentProps<typeof BaseMenu.GroupLabel>) {
  return (
    <BaseMenu.GroupLabel
      className={cn(groupLabelClasses, className as string)}
      {...rest}
    />
  );
}

export function MenuSeparator({
  className,
  ...rest
}: ComponentProps<typeof BaseMenu.Separator>) {
  return (
    <BaseMenu.Separator className={cn(separatorClasses, className as string)} {...rest} />
  );
}

/** The row that opens a submenu, with a chevron at its end. */
export function MenuSubmenuTrigger({
  className,
  children,
  ...rest
}: ComponentProps<typeof BaseMenu.SubmenuTrigger>) {
  return (
    <BaseMenu.SubmenuTrigger
      className={cn(
        itemClasses,
        "data-popup-open:bg-flat-face-hover",
        className as string,
      )}
      {...rest}
    >
      {children}
      <ChevronRight aria-hidden className="ml-auto" />
    </BaseMenu.SubmenuTrigger>
  );
}

/** A submenu's raised list, set beside its row. */
export function MenuSubmenuPopup({
  side = "inline-end",
  align = "start",
  sideOffset = 2,
  alignOffset = -5,
  ...rest
}: MenuPopupProps) {
  return (
    <MenuPopup
      side={side}
      align={align}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      {...rest}
    />
  );
}

/* ----------------------------------------------------------- ContextMenu */

/** A menu opened by a right click or a long press on its trigger area. */
export const ContextMenu = BaseContextMenu.Root;
export const ContextMenuTrigger = BaseContextMenu.Trigger;

/** The context menu's raised list, at the pointer. */
export function ContextMenuPopup({
  className,
  ...rest
}: ComponentProps<typeof BaseMenu.Popup>) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner className="z-50 outline-none">
        <MenuLayer className={className} {...rest} />
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}

export const ContextMenuItem = MenuItem;
export const ContextMenuCheckboxItem = MenuCheckboxItem;
export const ContextMenuRadioItem = MenuRadioItem;
export const ContextMenuSeparator = MenuSeparator;
export const ContextMenuGroup = MenuGroup;
export const ContextMenuGroupLabel = MenuGroupLabel;

/* --------------------------------------------------------------- Menubar */

export type MenubarProps = ComponentProps<typeof BaseMenubar>;

/**
 * An application's menu strip: flat chrome holding menus that open as
 * raised layers. Put a Menu in it for each heading, and give each
 * MenuTrigger `menubarTriggerClasses`.
 */
export function Menubar({ className, ...rest }: MenubarProps) {
  return (
    <BaseMenubar
      data-material="flat"
      className={cn("flex items-center gap-0.5", className as string)}
      {...rest}
    />
  );
}

/** The look of a menu heading in a Menubar. */
export const menubarTriggerClasses = cn(
  "inline-flex h-8 items-center rounded-lg px-2.5 text-sm font-medium text-foreground outline-none select-none",
  "hover:bg-flat-face-hover data-popup-open:bg-flat-face-hover",
  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
);
