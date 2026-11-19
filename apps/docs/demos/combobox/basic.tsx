"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@astrafoundry/design/ui";

const timezones = [
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Europe/Berlin",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
];

export default function ComboboxBasic() {
  return (
    <Combobox items={timezones}>
      <ComboboxInput
        aria-label="Time zone"
        placeholder="Search time zones"
        triggerLabel="Show time zones"
        clearLabel="Clear"
        className="w-64"
      />
      <ComboboxPopup empty="No matching time zone">
        <ComboboxList>
          {(zone: string) => (
            <ComboboxItem key={zone} value={zone}>
              {zone}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
