import { Minus, Square, X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { MockFrame } from "./mock-frame.js";

export type DesktopPlatform = "macos" | "windows";

export interface DesktopWindowProps {
  label: string;
  platform?: DesktopPlatform;
  title?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}

/** Window controls drawn in ink, not system colors, so the demo stays on-palette. */
function Controls({ platform }: { platform: DesktopPlatform }) {
  if (platform === "macos") {
    return (
      <div className="flex shrink-0 items-center gap-2" aria-hidden="true">
        {[0, 1, 2].map((key) => (
          <span key={key} className="size-3 rounded-full bg-muted-foreground/25" />
        ))}
      </div>
    );
  }
  return (
    <div
      className="flex shrink-0 items-center gap-4 text-muted-foreground"
      aria-hidden="true"
    >
      <Minus className="size-3.5" strokeWidth={1.5} />
      <Square className="size-3" strokeWidth={1.5} />
      <X className="size-3.5" strokeWidth={1.5} />
    </div>
  );
}

/** A native desktop window for demos of desktop products. */
export function DesktopWindow({
  label,
  platform = "macos",
  title,
  className,
  bodyClassName,
  children,
}: DesktopWindowProps) {
  const chrome = (
    <div
      className={cn(
        "flex h-9 shrink-0 items-center gap-3 border-b border-border bg-muted/60 px-3.5",
        platform === "windows" && "flex-row-reverse",
      )}
    >
      <Controls platform={platform} />
      <div
        className={cn(
          "min-w-0 flex-1 truncate text-xs font-medium text-muted-foreground",
          platform === "macos" ? "pr-[52px] text-center" : "text-left",
        )}
      >
        {title}
      </div>
    </div>
  );
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
