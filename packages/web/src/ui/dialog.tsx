"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { X } from "lucide-react";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { useSchemeClass } from "./scheme.js";
import { iconButtonClasses } from "./button-styles.js";

/* ---------------------------------------------------------------- shared */

function CloseButton({
  label,
  Close,
}: {
  label: string;
  Close: typeof BaseDialog.Close;
}) {
  return (
    <Close
      aria-label={label}
      className={iconButtonClasses("ghost", "sm", "absolute top-3 right-3")}
    >
      <X aria-hidden />
    </Close>
  );
}

const titleClasses = "text-lg leading-snug font-medium text-balance text-foreground";
const descriptionClasses =
  "mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground";

/** The row of buttons that ends a dialog: right-aligned, primary last. */
export function DialogFooter({ className, ...rest }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...rest}
    />
  );
}

/* ---------------------------------------------------------------- Dialog */

/** A raised layer that takes the focus until it is answered or closed. */
export const Dialog = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;

export interface DialogPopupProps extends ComponentProps<typeof BaseDialog.Popup> {
  /** Names the close button in the corner. Omit it to show no button. */
  closeLabel?: string;
  size?: "sm" | "md" | "lg";
}

const DIALOG_SIZE = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" } as const;

/**
 * The dialog's raised layer, centered over an ink scrim. It rises from
 * 0.96 on a spring and leaves faster; its corners are the tile radius.
 */
export function DialogPopup({
  className,
  children,
  closeLabel,
  size = "md",
  ...rest
}: DialogPopupProps) {
  const scheme = useSchemeClass();
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="backdrop-motion fixed inset-0 z-50" />
      <BaseDialog.Viewport className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4">
        <BaseDialog.Popup
          data-material="raised"
          className={cn(
            scheme,
            "material-panel dialog-motion relative w-full rounded-continuous-tile p-6 text-foreground outline-none",
            DIALOG_SIZE[size],
            className as string,
          )}
          {...rest}
        >
          {children}
          {closeLabel ? (
            <CloseButton label={closeLabel} Close={BaseDialog.Close} />
          ) : null}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
}

export function DialogTitle({
  className,
  ...rest
}: ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      className={cn(titleClasses, "pr-8", className as string)}
      {...rest}
    />
  );
}

export function DialogDescription({
  className,
  ...rest
}: ComponentProps<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description
      className={cn(descriptionClasses, className as string)}
      {...rest}
    />
  );
}

/* ----------------------------------------------------------- AlertDialog */

/**
 * A dialog that asks before something that cannot be undone. It does not
 * close on an outside click; its title states the consequence.
 */
export const AlertDialog = BaseAlertDialog.Root;
export const AlertDialogTrigger = BaseAlertDialog.Trigger;
export const AlertDialogClose = BaseAlertDialog.Close;

export function AlertDialogPopup({
  className,
  ...rest
}: ComponentProps<typeof BaseAlertDialog.Popup>) {
  const scheme = useSchemeClass();
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className="backdrop-motion fixed inset-0 z-50" />
      <BaseAlertDialog.Viewport className="fixed inset-0 z-50 grid place-items-center p-4">
        <BaseAlertDialog.Popup
          data-material="raised"
          className={cn(
            scheme,
            "material-panel dialog-motion relative w-full max-w-sm rounded-continuous-tile p-6 text-foreground outline-none",
            className as string,
          )}
          {...rest}
        />
      </BaseAlertDialog.Viewport>
    </BaseAlertDialog.Portal>
  );
}

export function AlertDialogTitle({
  className,
  ...rest
}: ComponentProps<typeof BaseAlertDialog.Title>) {
  return (
    <BaseAlertDialog.Title className={cn(titleClasses, className as string)} {...rest} />
  );
}

export function AlertDialogDescription({
  className,
  ...rest
}: ComponentProps<typeof BaseAlertDialog.Description>) {
  return (
    <BaseAlertDialog.Description
      className={cn(descriptionClasses, className as string)}
      {...rest}
    />
  );
}

/* ---------------------------------------------------------------- Drawer */

export type DrawerSide = "top" | "right" | "bottom" | "left";

const SideContext = createContext<DrawerSide>("bottom");

const SWIPE = { top: "up", right: "right", bottom: "down", left: "left" } as const;

export interface DrawerProps extends Omit<
  ComponentProps<typeof BaseDrawer.Root>,
  "swipeDirection"
> {
  /** The edge the drawer slides from, and is swiped back to. */
  side?: DrawerSide;
}

/**
 * A raised sheet that slides in from an edge and follows the finger when
 * swiped away. From the bottom it is a mobile sheet; from a side, a panel.
 */
export function Drawer({ side = "bottom", ...rest }: DrawerProps) {
  return (
    <SideContext.Provider value={side}>
      <BaseDrawer.Root swipeDirection={SWIPE[side]} {...rest} />
    </SideContext.Provider>
  );
}

export const DrawerTrigger = BaseDrawer.Trigger;
export const DrawerClose = BaseDrawer.Close;

const DRAWER_SIDE: Record<DrawerSide, string> = {
  bottom: cn(
    "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-[28px] border-b-0 pb-[max(1.5rem,env(safe-area-inset-bottom))]",
    "data-starting-style:[transform:translateY(100%)] data-ending-style:[transform:translateY(100%)]",
  ),
  top: cn(
    "inset-x-0 top-0 max-h-[85dvh] rounded-b-[28px] border-t-0",
    "data-starting-style:[transform:translateY(-100%)] data-ending-style:[transform:translateY(-100%)]",
  ),
  right: cn(
    "inset-y-2 right-2 w-[min(24rem,calc(100vw-1rem))] rounded-continuous-tile",
    "data-starting-style:[transform:translateX(calc(100%+1rem))] data-ending-style:[transform:translateX(calc(100%+1rem))]",
  ),
  left: cn(
    "inset-y-2 left-2 w-[min(24rem,calc(100vw-1rem))] rounded-continuous-tile",
    "data-starting-style:[transform:translateX(calc(-100%-1rem))] data-ending-style:[transform:translateX(calc(-100%-1rem))]",
  ),
};

export interface DrawerPopupProps extends ComponentProps<typeof BaseDrawer.Popup> {
  /** Names the close button in the corner. Omit it to show no button. */
  closeLabel?: string;
}

export function DrawerPopup({
  className,
  children,
  closeLabel,
  ...rest
}: DrawerPopupProps) {
  const scheme = useSchemeClass();
  const side = useContext(SideContext);
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className="backdrop-motion fixed inset-0 z-50" />
      <BaseDrawer.Viewport className="fixed inset-0 z-50">
        <BaseDrawer.Popup
          data-material="raised"
          data-side={side}
          className={cn(
            scheme,
            "material-panel drawer-motion fixed flex flex-col overflow-y-auto overscroll-contain p-6 text-foreground outline-none",
            DRAWER_SIDE[side],
            className as string,
          )}
          {...rest}
        >
          {side === "bottom" ? (
            <div
              aria-hidden
              className="mx-auto -mt-3 mb-4 h-1 w-10 shrink-0 rounded-full bg-border"
            />
          ) : null}
          {children}
          {closeLabel ? (
            <CloseButton
              label={closeLabel}
              Close={BaseDrawer.Close as typeof BaseDialog.Close}
            />
          ) : null}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
}

export function DrawerTitle({
  className,
  ...rest
}: ComponentProps<typeof BaseDrawer.Title>) {
  return (
    <BaseDrawer.Title
      className={cn(titleClasses, "pr-8", className as string)}
      {...rest}
    />
  );
}

export function DrawerDescription({
  className,
  ...rest
}: ComponentProps<typeof BaseDrawer.Description>) {
  return (
    <BaseDrawer.Description
      className={cn(descriptionClasses, className as string)}
      {...rest}
    />
  );
}

/** Sheet is a Drawer from the right, the usual side panel. */
export function Sheet(
  props: Omit<DrawerProps, "side"> & { side?: DrawerSide; children?: ReactNode },
) {
  return <Drawer side="right" {...props} />;
}
