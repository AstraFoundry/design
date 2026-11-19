"use client";

import { ScrollArea, Separator } from "@astrafoundry/design/ui";

const tags = Array.from({ length: 40 }, (_, i) => `v0.${40 - i}.0`);

export default function ScrollAreaBasic() {
  return (
    <ScrollArea className="h-64 w-48 rounded-2xl border border-border bg-card">
      <div className="p-4">
        <p className="mb-3 text-sm font-medium">Releases</p>
        {tags.map((tag, index) => (
          <div key={tag}>
            {index > 0 ? <Separator className="my-2" /> : null}
            <p className="font-mono text-[13px] text-muted-foreground">{tag}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
