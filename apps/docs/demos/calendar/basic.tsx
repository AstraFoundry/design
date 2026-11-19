"use client";

import { Calendar } from "@astrafoundry/design/ui/calendar";
import { useState } from "react";

export default function CalendarBasic() {
  const [day, setDay] = useState<Date | undefined>(new Date());
  return <Calendar mode="single" selected={day} onSelect={setDay} />;
}
