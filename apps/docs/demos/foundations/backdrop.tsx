"use client";

import { Backdrop } from "@astrafoundry/design/mock";
import { Button } from "@astrafoundry/design/ui";

export default function BackdropDemo() {
  return (
    <div className="relative flex h-80 w-full items-center overflow-hidden rounded-continuous-3xl p-8">
      <Backdrop id="gladiolus" />
      <div className="relative flex max-w-sm flex-col gap-3 rounded-[22px] bg-substrate-focus p-5 text-substrate-focus-ink shadow-5">
        <p className="text-lg">Set the card on the gladiolus photo.</p>
        <Button className="self-start">Apply</Button>
      </div>
      <p className="absolute bottom-8 left-8 text-lg text-substrate-tint-muted">
        Photographs, not gradients
      </p>
    </div>
  );
}
