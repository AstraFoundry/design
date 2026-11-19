"use client";

import { Field, FieldLabel, Textarea } from "@astrafoundry/design/ui";

export default function TextareaBasic() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>Release notes</FieldLabel>
      <Textarea placeholder="What changed in this version?" />
    </Field>
  );
}
