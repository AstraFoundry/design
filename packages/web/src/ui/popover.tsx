"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";
import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { useSchemeClass } from "./scheme.js";
import { popupClasses } from "./styles.js";

interface PositionProps {
  side?: "top" | "bottom" | "left" | "right" | "inline-start" | "inline-end";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

/* --------------------------------------------------------------- Popover */

/** A raised layer of content opened by a button: settings, a share sheet. */
export const Popover = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverClose = BasePopover.Close;

export interface PopoverPopupProps
  extends ComponentProps<typeof BasePopover.Popup>, PositionProps {}

/**
 * The popover's raised layer. Its 22px corners less its 8px inset are the
 * 14px of the controls inside; it grows from its trigger on a spring.
 */
export function PopoverPopup({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset,
  ...rest
}: PopoverPopupProps) {
  const scheme = useSchemeClass();
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        className="z-50"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <BasePopover.Popup
          data-material="raised"
          className={cn(
            scheme,
            popupClasses,
            "max-w-(--available-width) rounded-continuous-[22px] p-4",
            className as string,
          )}
          {...rest}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export function PopoverTitle({
  className,
  ...rest
}: ComponentProps<typeof BasePopover.Title>) {
  return (
    <BasePopover.Title
      className={cn("text-sm font-medium text-foreground", className as string)}
      {...rest}
    />
  );
}

export function PopoverDescription({
  className,
  ...rest
}: ComponentProps<typeof BasePopover.Description>) {
  return (
    <BasePopover.Description
      className={cn("text-sm text-muted-foreground", className as string)}
      {...rest}
    />
  );
}

/* --------------------------------------------------------------- Tooltip */

/**
 * Share one Provider across a toolbar so moving between its buttons shows
 * each tip at once, without waiting for the delay again.
 */
export const TooltipProvider = BaseTooltip.Provider;

export interface TooltipProps extends PositionProps {
  /** The tip: a few words naming what the trigger does. */
  content: ReactNode;
  /** The trigger: one focusable element. */
  children: ReactElement;
  /** Milliseconds before the tip shows; 500 by default. */
  delay?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * A short ink label for a control that shows only an icon. It carries no
 * material: tooltips sit above everything and say one thing, quickly.
 */
export function Tooltip({
  content,
  children,
  delay = 500,
  side = "top",
  align = "center",
  sideOffset = 6,
  alignOffset,
  open,
  onOpenChange,
  className,
}: TooltipProps) {
  const scheme = useSchemeClass();
  return (
    <BaseTooltip.Root open={open} onOpenChange={onOpenChange}>
      <BaseTooltip.Trigger delay={delay} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          className="z-50"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <BaseTooltip.Popup
            className={cn(
              scheme,
              "tooltip-motion max-w-64 rounded-lg bg-foreground px-2 py-1 text-xs leading-snug font-medium text-background",
              className,
            )}
          >
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

/* ----------------------------------------------------------- PreviewCard */

/** A raised preview of a link's destination, on hover or focus. */
export const PreviewCard = BasePreviewCard.Root;

export function PreviewCardTrigger({
  className,
  ...rest
}: ComponentProps<typeof BasePreviewCard.Trigger>) {
  return (
    <BasePreviewCard.Trigger
      className={cn(
        "font-medium text-foreground underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground",
        className as string,
      )}
      {...rest}
    />
  );
}

export interface PreviewCardPopupProps
  extends ComponentProps<typeof BasePreviewCard.Popup>, PositionProps {}

export function PreviewCardPopup({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset,
  ...rest
}: PreviewCardPopupProps) {
  const scheme = useSchemeClass();
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        className="z-50"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <BasePreviewCard.Popup
          data-material="raised"
          className={cn(
            scheme,
            popupClasses,
            "w-72 rounded-continuous-[22px] p-4",
            className as string,
          )}
          {...rest}
        />
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}
