"use client";

import {
  Button,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldLabel,
  Input,
} from "@astrafoundry/design/ui";

export default function DialogBasic() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Invite people</DialogTrigger>
      <DialogPopup closeLabel="Close">
        <DialogTitle>Invite people</DialogTitle>
        <DialogDescription>
          They get an email with a link to join the workspace.
        </DialogDescription>
        <Field className="mt-5">
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="name@company.com" />
        </Field>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Send invite</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
