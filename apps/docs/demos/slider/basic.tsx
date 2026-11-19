"use client";

import { Slider } from "@astrafoundry/design/ui";

export default function SliderBasic() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-8">
      <Slider aria-label="Volume" defaultValue={60} />
      <Slider
        aria-label="Price range"
        thumbLabels={["Minimum price", "Maximum price"]}
        defaultValue={[20, 70]}
      />
    </div>
  );
}
