"use client";

import {
  Field,
  FieldLabel,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@astrafoundry/design/ui";

const regions = {
  fra: "Frankfurt",
  sin: "Singapore",
  iad: "Washington, D.C.",
  hnd: "Tokyo",
};

export default function SelectBasic() {
  return (
    <Field>
      <FieldLabel>Region</FieldLabel>
      <Select items={regions} defaultValue="fra">
        <SelectTrigger className="w-56">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {Object.entries(regions).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </Field>
  );
}
