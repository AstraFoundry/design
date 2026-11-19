"use client";

import { Label, Radio, RadioGroup } from "@astrafoundry/design/ui";

export default function RadioGroupBasic() {
  return (
    <RadioGroup aria-label="Plan" defaultValue="team">
      <Label>
        <Radio value="solo" /> Solo
      </Label>
      <Label>
        <Radio value="team" /> Team
      </Label>
      <Label>
        <Radio value="enterprise" /> Enterprise
      </Label>
    </RadioGroup>
  );
}
