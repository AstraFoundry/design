"use client";

import { Button, Switch } from "@astrafoundry/design/ui";
import { useState } from "react";

const curves = [
  ["out", "Entering, moving"],
  ["spring", "Small things appearing"],
  ["in-out", "Changing shape on screen"],
  ["drawer", "Sheets and drawers"],
] as const;

export default function MotionCurves() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      {curves.map(([name, use]) => (
        <div key={name} className="flex items-center gap-4">
          <code className="w-28 shrink-0 text-xs text-muted-foreground">
            --ease-{name}
          </code>
          <div className="material-well relative h-8 flex-1 rounded-full">
            <span
              className="material-thumb absolute top-1 left-1 size-6 rounded-full transition-[left] duration-[600ms]"
              style={{
                left: on ? "calc(100% - 1.75rem)" : "0.25rem",
                transitionTimingFunction: `var(--ease-${name})`,
              }}
            />
          </div>
          <span className="hidden w-44 text-xs text-muted-foreground sm:block">
            {use}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" onClick={() => setOn((v) => !v)}>
          Play
        </Button>
        <Switch aria-label="Spring detent" />
      </div>
    </div>
  );
}
