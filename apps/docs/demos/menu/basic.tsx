"use client";

import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuPopup,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "@astrafoundry/design/ui";
import { ChevronDown, Copy, Pencil, Share, Trash2 } from "lucide-react";

export default function MenuBasic() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        Actions <ChevronDown aria-hidden className="size-4" />
      </MenuTrigger>
      <MenuPopup>
        <MenuItem shortcut="⌘R">
          <Pencil aria-hidden /> Rename
        </MenuItem>
        <MenuItem shortcut="⌘D">
          <Copy aria-hidden /> Duplicate
        </MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger>
            <Share aria-hidden /> Share
          </MenuSubmenuTrigger>
          <MenuSubmenuPopup>
            <MenuItem>Copy link</MenuItem>
            <MenuItem>Invite people</MenuItem>
          </MenuSubmenuPopup>
        </MenuSubmenu>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>View</MenuGroupLabel>
          <MenuCheckboxItem defaultChecked>Show grid</MenuCheckboxItem>
          <MenuCheckboxItem>Snap to grid</MenuCheckboxItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem>
          <Trash2 aria-hidden /> Move to trash
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}
