"use client";

import {
  Button,
  Input,
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@astrafoundry/design/ui";

export default function PopoverBasic() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary" />}>Share</PopoverTrigger>
      <PopoverPopup className="w-80">
        <PopoverTitle>Share this board</PopoverTitle>
        <PopoverDescription>Anyone with the link can view it.</PopoverDescription>
        <div className="mt-3 flex gap-2">
          <Input aria-label="Link" readOnly defaultValue="https://astra.so/b/7k2" />
          <Button>Copy</Button>
        </div>
      </PopoverPopup>
    </Popover>
  );
}
