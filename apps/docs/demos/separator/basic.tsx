"use client";

import { Separator } from "@astrafoundry/design/ui";

export default function SeparatorBasic() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 text-sm">
      <p className="font-medium">Sunbeam</p>
      <Separator />
      <div className="flex h-5 items-center gap-3 text-muted-foreground">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Tokens</span>
        <Separator orientation="vertical" />
        <span>MyGo</span>
      </div>
    </div>
  );
}
