import { Check, X } from "lucide-react";
import type { ReactNode } from "react";

export interface DoDontProps {
  doLabel?: string;
  dontLabel?: string;
  /** What to do, with a picture of it as children of `doExample`. */
  do: ReactNode;
  dont: ReactNode;
  doExample?: ReactNode;
  dontExample?: ReactNode;
}

/** A rule beside the habit it replaces. */
export function DoDont({
  doLabel = "Do",
  dontLabel = "Don't",
  do: doText,
  dont,
  doExample,
  dontExample,
}: DoDontProps) {
  const column = (ok: boolean, label: string, text: ReactNode, example?: ReactNode) => (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      {example ? (
        <div className="bg-dot-grid flex min-h-36 items-center justify-center gap-3 border-b border-border bg-canvas p-6">
          {example}
        </div>
      ) : null}
      <div className="flex gap-2.5 p-4 text-sm">
        <span
          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${ok ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"}`}
        >
          {ok ? (
            <Check aria-hidden className="size-3" />
          ) : (
            <X aria-hidden className="size-3" />
          )}
        </span>
        <div>
          <p className="font-medium text-foreground">{label}</p>
          <div className="mt-0.5 text-muted-foreground">{text}</div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
      {column(true, doLabel, doText, doExample)}
      {column(false, dontLabel, dont, dontExample)}
    </div>
  );
}
