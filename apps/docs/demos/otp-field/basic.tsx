"use client";

import { OTPField } from "@astrafoundry/design/ui";

export default function OTPFieldBasic() {
  return (
    <OTPField
      length={6}
      groupSize={3}
      aria-label="Verification code"
      characterLabel={(index, length) => `Character ${index} of ${length}`}
    />
  );
}
