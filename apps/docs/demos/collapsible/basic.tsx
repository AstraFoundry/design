"use client";

import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@astrafoundry/design/ui";
import { ChevronRight } from "lucide-react";

export default function CollapsibleBasic() {
  return (
    <Collapsible className="w-full max-w-sm">
      <CollapsibleTrigger className="group text-foreground">
        <ChevronRight
          aria-hidden
          className="size-4 transition-transform duration-(--duration-collapse) group-data-panel-open:rotate-90"
        />
        Advanced options
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <p className="pt-2 pl-6 text-sm text-muted-foreground">
          Build cache, environment variables and the deploy region.
        </p>
      </CollapsiblePanel>
    </Collapsible>
  );
}
