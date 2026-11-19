"use client";

import {
  Menu,
  Menubar,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
  menubarTriggerClasses,
} from "@astrafoundry/design/ui";

const menus = {
  File: ["New", "Open…", "-", "Export"],
  Edit: ["Undo", "Redo", "-", "Find"],
  View: ["Zoom in", "Zoom out"],
};

export default function MenubarBasic() {
  return (
    <Menubar aria-label="Editor">
      {Object.entries(menus).map(([title, items]) => (
        <Menu key={title}>
          <MenuTrigger className={menubarTriggerClasses}>{title}</MenuTrigger>
          <MenuPopup>
            {items.map((item, index) =>
              item === "-" ? (
                <MenuSeparator key={index} />
              ) : (
                <MenuItem key={item}>{item}</MenuItem>
              ),
            )}
          </MenuPopup>
        </Menu>
      ))}
    </Menubar>
  );
}
