"use client";

import { DatePicker } from "@astrafoundry/design/ui/calendar";

const format = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export default function DatePickerBasic() {
  return (
    <DatePicker
      label="Due date"
      placeholder="Pick a date"
      format={(day) => format.format(day)}
    />
  );
}
