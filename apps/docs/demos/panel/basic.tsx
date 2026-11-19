"use client";

import { Button, IconButton, Panel, Segmented } from "@astrafoundry/design/ui";
import { Camera, Download } from "lucide-react";

export default function PanelBasic() {
  return (
    <Panel className="flex w-72 flex-col gap-2">
      <Segmented
        label="Orientation"
        value="portrait"
        onValueChange={() => {}}
        options={[
          { value: "portrait", label: "Portrait" },
          { value: "landscape", label: "Landscape" },
        ]}
        className="w-full"
      />
      <div className="flex gap-2">
        <Button className="flex-1">
          <Camera aria-hidden className="size-4" /> Capture
        </Button>
        <IconButton label="Download">
          <Download aria-hidden />
        </IconButton>
      </div>
    </Panel>
  );
}
