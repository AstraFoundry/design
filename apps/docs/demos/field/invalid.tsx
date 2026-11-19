"use client";

import { Field, FieldError, FieldLabel, Input } from "@astrafoundry/design/ui";

export default function FieldInvalid() {
  return (
    <Field invalid className="w-full max-w-xs">
      <FieldLabel>Email</FieldLabel>
      <Input defaultValue="ada@" />
      <FieldError match>Enter a full email address.</FieldError>
    </Field>
  );
}
