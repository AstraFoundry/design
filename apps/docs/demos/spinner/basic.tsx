"use client";

import { Spinner } from "@astrafoundry/design/ui";

export default function SpinnerBasic() {
  return (
    <div className="flex items-center gap-6 text-muted-foreground">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" label="Loading results" />
    </div>
  );
}
