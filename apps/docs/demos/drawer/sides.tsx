"use client";

import {
  Button,
  Drawer,
  DrawerDescription,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
  type DrawerSide,
} from "@astrafoundry/design/ui";

const sides: DrawerSide[] = ["bottom", "right", "left", "top"];

export default function DrawerSides() {
  return (
    <>
      {sides.map((side) => (
        <Drawer key={side} side={side}>
          <DrawerTrigger render={<Button variant="secondary" />}>
            {side[0]!.toUpperCase() + side.slice(1)}
          </DrawerTrigger>
          <DrawerPopup closeLabel="Close">
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>
              Swipe it back toward its edge to close it.
            </DrawerDescription>
          </DrawerPopup>
        </Drawer>
      ))}
    </>
  );
}
