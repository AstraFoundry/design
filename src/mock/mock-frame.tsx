import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface MockFrameProps {
  /** Describes what the scripted demo shows; it is the demo's only accessible text. */
  label: string;
  className?: string;
  bodyClassName?: string;
  /** Title strip; omitted when empty. */
  chrome?: ReactNode;
  children: ReactNode;
}

/**
 * The solid window surface shared by mock windows. The demo is announced as
 * one image with `label`; its contents are `inert`, so fake controls never
 * take focus or clicks.
 */
export function MockFrame({
  label,
  className,
  bodyClassName,
  chrome,
  children,
}: MockFrameProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-5",
        className,
      )}
    >
      <div inert className="flex min-h-0 flex-1 flex-col">
        {chrome}
        <div className={cn("flex min-h-0 flex-1 flex-col", bodyClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
