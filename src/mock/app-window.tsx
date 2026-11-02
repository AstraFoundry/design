import type { ReactNode } from "react";
import { MockFrame } from "./mock-frame.js";

export interface AppWindowProps {
  label: string;
  /** Short title in the app's own header strip. */
  title?: ReactNode;
  /** Right side of the header strip (view switchers, presence). */
  actions?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}

/**
 * A web app window for demos. The chrome is the app's own header strip rather
 * than a fake browser.
 */
export function AppWindow({
  label,
  title,
  actions,
  className,
  bodyClassName,
  children,
}: AppWindowProps) {
  const chrome =
    title || actions ? (
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-border px-4">
        <div className="min-w-0 flex-1 truncate text-sm font-medium">{title}</div>
        {actions ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>
    ) : null;
  return (
    <MockFrame
      label={label}
      chrome={chrome}
      className={className}
      bodyClassName={bodyClassName}
    >
      {children}
    </MockFrame>
  );
}
