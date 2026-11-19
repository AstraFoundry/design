"use client";

import { Kbd } from "@astrafoundry/design/ui";

export default function KbdBasic() {
  return (
    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
      Press <Kbd>⌘</Kbd>
      <Kbd>K</Kbd> to search
    </p>
  );
}
