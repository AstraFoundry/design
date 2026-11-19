"use client";

import { Calendar } from "@astrafoundry/design/ui/calendar";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export default function CalendarRange() {
  const today = new Date();
  const [range, setRange] = useState<DateRange | undefined>({
    from: today,
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
  });
  return <Calendar mode="range" selected={range} onSelect={setRange} />;
}
