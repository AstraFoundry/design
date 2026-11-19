"use client";

import { Button } from "@astrafoundry/design/ui";
import { useState } from "react";

export default function ButtonLoading() {
  const [saving, setSaving] = useState(false);
  return (
    <Button
      loading={saving}
      onClick={() => {
        setSaving(true);
        setTimeout(() => setSaving(false), 1600);
      }}
    >
      Save changes
    </Button>
  );
}
