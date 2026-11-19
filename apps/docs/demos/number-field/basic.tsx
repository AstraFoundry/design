"use client";

import { Field, FieldLabel, NumberField } from "@astrafoundry/design/ui";

export default function NumberFieldBasic() {
  return (
    <Field>
      <FieldLabel>Seats</FieldLabel>
      <NumberField
        defaultValue={5}
        min={1}
        max={50}
        decrementLabel="Fewer seats"
        incrementLabel="More seats"
      />
    </Field>
  );
}
