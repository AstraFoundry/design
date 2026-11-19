"use client";

import { ToggleGroup, ToggleGroupItem } from "@astrafoundry/design/ui";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

export default function ToggleGroupBasic() {
  return (
    <ToggleGroup aria-label="Text alignment" defaultValue={["left"]}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
