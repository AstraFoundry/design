"use client";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  DialogFooter,
} from "@astrafoundry/design/ui";
import { Trash2 } from "lucide-react";

export default function AlertDialogBasic() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="secondary" />}>
        <Trash2 aria-hidden className="size-4" /> Delete project
      </AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogTitle>Delete “Atlas” for everyone?</AlertDialogTitle>
        <AlertDialogDescription>
          Its files, comments and history are removed. This cannot be undone.
        </AlertDialogDescription>
        <DialogFooter>
          <AlertDialogClose render={<Button variant="ghost" />}>Keep it</AlertDialogClose>
          <AlertDialogClose render={<Button variant="secondary" />}>
            <Trash2 aria-hidden className="size-4" /> Delete
          </AlertDialogClose>
        </DialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
