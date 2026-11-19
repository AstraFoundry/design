"use client";

import { Checkbox, CheckboxGroup, Label } from "@astrafoundry/design/ui";

export default function CheckboxBasic() {
  return (
    <CheckboxGroup aria-label="Notify me about" defaultValue={["mentions"]}>
      <Label>
        <Checkbox value="mentions" /> Mentions
      </Label>
      <Label>
        <Checkbox value="replies" /> Replies to my comments
      </Label>
      <Label>
        <Checkbox value="digest" disabled /> Weekly digest
      </Label>
    </CheckboxGroup>
  );
}
