"use client";

import { Button, IconButton, Panel, Segmented, Switch } from "@astrafoundry/design/ui";
import { Download } from "lucide-react";

function Controls() {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex gap-2">
        <Button>Capture</Button>
        <Button variant="secondary">Cancel</Button>
        <IconButton label="Download">
          <Download aria-hidden />
        </IconButton>
      </div>
      <div className="flex items-center gap-3">
        <Segmented
          label="Mode"
          value="photo"
          onValueChange={() => {}}
          options={[
            { value: "photo", label: "Photo" },
            { value: "video", label: "Video" },
          ]}
        />
        <Switch aria-label="Timer" defaultChecked />
      </div>
    </div>
  );
}

export default function Materials() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">Flat</p>
        <div data-material="flat" className="rounded-continuous-tile p-2">
          <Controls />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">Raised</p>
        <Panel>
          <Controls />
        </Panel>
      </div>
    </div>
  );
}
