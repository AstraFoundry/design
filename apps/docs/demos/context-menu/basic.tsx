"use client";

import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@astrafoundry/design/ui";

export default function ContextMenuBasic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-full max-w-sm items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground select-none">
        Right-click or long-press here
      </ContextMenuTrigger>
      <ContextMenuPopup>
        <ContextMenuItem shortcut="⌘V">Paste</ContextMenuItem>
        <ContextMenuItem>Paste as plain text</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Select all</ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>
  );
}
