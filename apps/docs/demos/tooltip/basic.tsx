"use client";

import { IconButton, Tooltip, TooltipProvider } from "@astrafoundry/design/ui";
import { Copy, Download, Trash2 } from "lucide-react";

const actions = [
  { label: "Copy", icon: Copy },
  { label: "Download", icon: Download },
  { label: "Move to trash", icon: Trash2 },
];

export default function TooltipBasic() {
  return (
    <TooltipProvider>
      <div className="flex gap-2">
        {actions.map(({ label, icon: Icon }) => (
          <Tooltip key={label} content={label}>
            <IconButton label={label}>
              <Icon aria-hidden />
            </IconButton>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
