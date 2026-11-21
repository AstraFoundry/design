"use client";

import {
  Button,
  Command,
  CommandCollection,
  CommandGroup,
  CommandGroupLabel,
  CommandItem,
  CommandList,
  Kbd,
} from "@astrafoundry/design/ui";
import { useEffect, useState } from "react";

const groups = [
  { label: "Create", items: ["New project", "New document", "New board"] },
  { label: "Go to", items: ["Settings", "Billing", "Members"] },
];

export default function CommandBasic() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open commands <Kbd>⌘K</Kbd>
      </Button>
      <Command
        open={open}
        onOpenChange={setOpen}
        items={groups}
        label="Commands"
        placeholder="Type a command"
        empty="Try another command"
        footer={
          <>
            <span className="flex items-center gap-1">
              <Kbd>↵</Kbd> run
            </span>
            <span className="flex items-center gap-1">
              <Kbd>esc</Kbd> close
            </span>
          </>
        }
      >
        <CommandList>
          {(group: (typeof groups)[number]) => (
            <CommandGroup key={group.label} items={group.items}>
              <CommandGroupLabel>{group.label}</CommandGroupLabel>
              <CommandCollection>
                {(item: string) => (
                  <CommandItem key={item} value={item} onClick={() => setOpen(false)}>
                    {item}
                  </CommandItem>
                )}
              </CommandCollection>
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </>
  );
}
