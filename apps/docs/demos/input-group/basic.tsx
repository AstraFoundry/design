"use client";

import { Button, Input, InputGroup, InputGroupAddon } from "@astrafoundry/design/ui";
import { Search } from "lucide-react";

export default function InputGroupBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <InputGroup>
        <InputGroupAddon>
          <Search aria-hidden />
        </InputGroupAddon>
        <Input aria-label="Search" placeholder="Search projects" />
      </InputGroup>
      <InputGroup className="pr-1">
        <InputGroupAddon>https://</InputGroupAddon>
        <Input aria-label="Domain" placeholder="acme.dev" />
        <Button size="sm" variant="secondary" className="h-7">
          Verify
        </Button>
      </InputGroup>
    </div>
  );
}
