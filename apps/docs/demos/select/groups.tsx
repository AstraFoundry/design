"use client";

import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@astrafoundry/design/ui";

export default function SelectGroups() {
  return (
    <Select defaultValue={null}>
      <SelectTrigger aria-label="Model" className="w-56">
        <SelectValue placeholder="Choose a model" />
      </SelectTrigger>
      <SelectPopup>
        <SelectGroup>
          <SelectGroupLabel>Fast</SelectGroupLabel>
          <SelectItem value="haiku">Haiku</SelectItem>
          <SelectItem value="flash">Flash</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Capable</SelectGroupLabel>
          <SelectItem value="opus">Opus</SelectItem>
          <SelectItem value="sonnet">Sonnet</SelectItem>
        </SelectGroup>
      </SelectPopup>
    </Select>
  );
}
