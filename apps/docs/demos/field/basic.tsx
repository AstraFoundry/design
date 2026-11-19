"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
} from "@astrafoundry/design/ui";

export default function FieldBasic() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>Workspace name</FieldLabel>
      <Input placeholder="Acme" required />
      <FieldDescription>Shown to everyone you invite.</FieldDescription>
      <FieldError match="valueMissing">Give the workspace a name.</FieldError>
    </Field>
  );
}
