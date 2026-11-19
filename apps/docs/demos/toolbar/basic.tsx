"use client";

import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  Tooltip,
  TooltipProvider,
} from "@astrafoundry/design/ui";
import { Bold, Code, Italic, Link, List } from "lucide-react";

const tools = [
  { label: "Bold", icon: Bold },
  { label: "Italic", icon: Italic },
  { label: "Code", icon: Code },
];

export default function ToolbarBasic() {
  return (
    <TooltipProvider>
      <Toolbar aria-label="Formatting">
        {tools.map(({ label, icon: Icon }) => (
          <Tooltip key={label} content={label}>
            <ToolbarButton aria-label={label} className="w-8 px-0">
              <Icon aria-hidden className="size-4" />
            </ToolbarButton>
          </Tooltip>
        ))}
        <ToolbarSeparator />
        <ToolbarButton>
          <Link aria-hidden className="size-4" /> Link
        </ToolbarButton>
        <ToolbarButton>
          <List aria-hidden className="size-4" /> List
        </ToolbarButton>
      </Toolbar>
    </TooltipProvider>
  );
}
