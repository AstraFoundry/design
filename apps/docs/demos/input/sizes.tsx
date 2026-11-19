"use client";

import { Input } from "@astrafoundry/design/ui";

export default function InputSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Input size="sm" aria-label="Small" placeholder="Small" />
      <Input aria-label="Medium" placeholder="Medium" />
      <Input size="lg" aria-label="Large" placeholder="Large" />
    </div>
  );
}
