"use client";

import { Button } from "@astrafoundry/design/ui";

export default function ButtonSizes() {
  return (
    <>
      <Button variant="secondary" size="sm">
        Small
      </Button>
      <Button variant="secondary" size="md">
        Medium
      </Button>
      <Button variant="secondary" size="lg">
        Large
      </Button>
    </>
  );
}
