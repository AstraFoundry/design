"use client";

import { Button, IconButton } from "@astrafoundry/design/ui";
import { Download, Plus, Share } from "lucide-react";

export default function ButtonWithIcon() {
  return (
    <>
      <Button>
        <Plus aria-hidden className="size-4" />
        New project
      </Button>
      <Button variant="secondary">
        <Download aria-hidden className="size-4" />
        Export
      </Button>
      <IconButton label="Share">
        <Share aria-hidden />
      </IconButton>
    </>
  );
}
