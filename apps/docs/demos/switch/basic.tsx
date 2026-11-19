"use client";

import { Label, Switch } from "@astrafoundry/design/ui";

export default function SwitchBasic() {
  return (
    <div className="flex flex-col gap-4">
      <Label className="gap-3">
        <Switch defaultChecked /> Sync over cellular
      </Label>
      <Label className="gap-3">
        <Switch size="sm" /> Compact mode
      </Label>
      <Label className="gap-3">
        <Switch disabled /> Beta features
      </Label>
    </div>
  );
}
