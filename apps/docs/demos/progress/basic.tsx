"use client";

import { Meter, Progress } from "@astrafoundry/design/ui";
import { useEffect, useState } from "react";

export default function ProgressBasic() {
  const [value, setValue] = useState(12);
  useEffect(() => {
    if (value >= 100) return;
    const id = setTimeout(() => setValue((v) => Math.min(100, v + 11)), 400);
    return () => clearTimeout(id);
  }, [value]);
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span>Uploading</span>
          <span className="tabular-nums text-muted-foreground">{value}%</span>
        </div>
        <Progress
          value={value}
          aria-label="Upload"
          tone={value >= 100 ? "result" : "ink"}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm">Seats</span>
        <Meter value={18} max={25} aria-label="Seats used" />
      </div>
    </div>
  );
}
