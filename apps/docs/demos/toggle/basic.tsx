"use client";

import { Toggle } from "@astrafoundry/design/ui";
import { Bold, Italic, Underline } from "lucide-react";

export default function ToggleBasic() {
  return (
    <div className="flex gap-1">
      <Toggle aria-label="Bold" defaultPressed>
        <Bold aria-hidden />
      </Toggle>
      <Toggle aria-label="Italic">
        <Italic aria-hidden />
      </Toggle>
      <Toggle aria-label="Underline">
        <Underline aria-hidden />
      </Toggle>
    </div>
  );
}
