"use client";

import { Segmented } from "@astrafoundry/design/ui";
import { useState } from "react";

export default function SegmentedBasic() {
  const [view, setView] = useState("week");
  return (
    <Segmented
      label="Range"
      value={view}
      onValueChange={setView}
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
    />
  );
}
