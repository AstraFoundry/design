"use client";

import { TextReveal } from "@astrafoundry/design/beui/motion/text-reveal";

export default function TextRevealDemo() {
  return (
    <TextReveal
      as="p"
      text="Clear, quick and precise."
      className="font-display text-4xl tracking-tight"
    />
  );
}
