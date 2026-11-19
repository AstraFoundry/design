"use client";

import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
  Form,
  Input,
  Textarea,
} from "@astrafoundry/design/ui";
import { useState } from "react";

export default function FormBasic() {
  const [sent, setSent] = useState(false);
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <Fieldset>
        <FieldsetLegend>Request access</FieldsetLegend>
        <Field name="name">
          <FieldLabel>Name</FieldLabel>
          <Input required />
          <FieldError match="valueMissing">Tell us your name.</FieldError>
        </Field>
        <Field name="email">
          <FieldLabel>Work email</FieldLabel>
          <Input type="email" required />
          <FieldError match="typeMismatch">Enter a full email address.</FieldError>
        </Field>
        <Field name="note">
          <FieldLabel>What will you build?</FieldLabel>
          <Textarea />
        </Field>
      </Fieldset>
      <Button type="submit" className="self-start">
        {sent ? "Request sent" : "Send request"}
      </Button>
    </Form>
  );
}
