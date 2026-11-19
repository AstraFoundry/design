"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { buttonClasses, iconButtonClasses } from "./button-styles.js";
import { Spinner } from "./toggle.js";

export type ToastManager = ReturnType<typeof BaseToast.createToastManager>;

/** A toast manager to add toasts from outside React, as from a fetch wrapper. */
export const createToastManager = BaseToast.createToastManager;

/**
 * Add, update and close toasts. `add({ title, description, type })` returns
 * the toast's id; `type` is "success", "danger", "info" or "loading".
 */
export const useToast = BaseToast.useToastManager;

export interface ToastProviderProps {
  /** Names each toast's close button. */
  closeLabel: string;
  /** Milliseconds a toast stays; 5000 by default, 0 to keep it. */
  timeout?: number;
  /** How many toasts show at once before the oldest go; 3 by default. */
  limit?: number;
  /** A manager made with createToastManager, to add toasts from anywhere. */
  toastManager?: ToastManager;
  /** Where the stack sits; bottom-right by default. */
  position?: "bottom-right" | "bottom-center" | "top-center";
  children?: ReactNode;
}

const POSITION = {
  "bottom-right": "right-4 bottom-4 sm:right-6 sm:bottom-6",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6",
  "top-center": "top-4 left-1/2 -translate-x-1/2 sm:top-6",
} as const;

/**
 * Hosts toasts: brief raised notes stacked at the edge of the screen,
 * announced to assistive technology. Hover or focus the stack to fan it
 * out; swipe a toast away or press its close button.
 */
export function ToastProvider({
  closeLabel,
  timeout = 5000,
  limit = 3,
  toastManager,
  position = "bottom-right",
  children,
}: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout} limit={limit} toastManager={toastManager}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport
          data-position={position}
          className={cn(
            "fixed z-[60] w-[calc(100vw-2rem)] sm:w-[22rem] outline-none",
            POSITION[position],
          )}
        >
          <ToastList closeLabel={closeLabel} top={position === "top-center"} />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

const DOT: Record<string, string> = {
  success: "bg-success",
  danger: "bg-danger",
  error: "bg-danger",
  info: "bg-info",
};

function ToastList({ closeLabel, top }: { closeLabel: string; top: boolean }) {
  const { toasts } = BaseToast.useToastManager();
  return toasts.map((toast) => (
    <BaseToast.Root
      key={toast.id}
      toast={toast}
      swipeDirection={top ? ["up", "right"] : ["down", "right"]}
      data-material="raised"
      data-edge={top ? "top" : "bottom"}
      className="material-panel toast-motion absolute inset-x-0 rounded-continuous-[22px] text-foreground select-none"
    >
      <BaseToast.Content className="flex items-start gap-3 overflow-hidden p-3.5 pr-11 transition-opacity duration-(--duration-toast) data-behind:opacity-0 data-expanded:opacity-100">
        {toast.type === "loading" ? (
          <Spinner size="sm" className="mt-0.5 text-muted-foreground" />
        ) : toast.type && DOT[toast.type] ? (
          <span
            aria-hidden
            className={cn("mt-1.5 size-2 shrink-0 rounded-full", DOT[toast.type])}
          />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <BaseToast.Title className="text-sm font-medium text-foreground" />
          <BaseToast.Description className="text-sm text-pretty text-muted-foreground" />
          {toast.actionProps ? (
            <BaseToast.Action
              className={buttonClasses("secondary", "sm", "mt-2 self-start")}
            />
          ) : null}
        </div>
        <BaseToast.Close
          aria-label={closeLabel}
          className={iconButtonClasses("ghost", "sm", "absolute top-2 right-2 size-7")}
        >
          <X aria-hidden className="size-3.5" />
        </BaseToast.Close>
      </BaseToast.Content>
    </BaseToast.Root>
  ));
}
