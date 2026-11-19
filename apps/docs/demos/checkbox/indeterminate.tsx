"use client";

import { Checkbox, Label } from "@astrafoundry/design/ui";
import { useState } from "react";

const files = ["brief.md", "logo.svg", "notes.txt"];

export default function CheckboxIndeterminate() {
  const [chosen, setChosen] = useState(["brief.md"]);
  const all = chosen.length === files.length;
  return (
    <div className="flex flex-col gap-2.5">
      <Label>
        <Checkbox
          checked={all}
          indeterminate={!all && chosen.length > 0}
          onCheckedChange={(checked) => setChosen(checked ? files : [])}
        />
        All files
      </Label>
      <div className="flex flex-col gap-2.5 pl-7">
        {files.map((file) => (
          <Label key={file}>
            <Checkbox
              checked={chosen.includes(file)}
              onCheckedChange={(checked) =>
                setChosen((c) => (checked ? [...c, file] : c.filter((f) => f !== file)))
              }
            />
            <span className="font-mono text-[13px]">{file}</span>
          </Label>
        ))}
      </div>
    </div>
  );
}
