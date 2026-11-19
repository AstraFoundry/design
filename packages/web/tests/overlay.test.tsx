import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Command,
  CommandItem,
  CommandList,
  ContextMenu,
  ContextMenuPopup,
  ContextMenuItem,
  ContextMenuTrigger,
  Dialog,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
  LocaleSwitch,
  Menu,
  Menubar,
  MenuCheckboxItem,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
  Popover,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
  ToastProvider,
  Tooltip,
  useToast,
} from "../src/ui/index.js";

afterEach(cleanup);

const raisedLayer = (element: HTMLElement) => {
  const layer = element.closest("[data-material]");
  expect(layer?.getAttribute("data-material")).toBe("raised");
  expect(layer?.className).toContain("material-panel");
};

describe("popovers", () => {
  it("a popover opens as a raised layer and closes on Escape, returning focus", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger render={<Button variant="secondary" />}>Share</PopoverTrigger>
        <PopoverPopup>
          <PopoverTitle>Share this page</PopoverTitle>
        </PopoverPopup>
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "Share" });
    await user.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Share this page" });
    raisedLayer(dialog);
    expect(dialog.className).toContain("popup-motion");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(document.activeElement).toBe(trigger);
  });

  it("a tooltip is an ink label shown on focus, without material", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Copy link" delay={0}>
        <Button variant="secondary">Copy</Button>
      </Tooltip>,
    );
    await user.tab();
    const tip = await screen.findByText("Copy link");
    expect(tip.className).toContain("bg-foreground");
    expect(tip.closest("[data-material]")?.getAttribute("data-material")).not.toBe(
      "raised",
    );
  });

  it("a preview card opens from its link", async () => {
    const user = userEvent.setup();
    render(
      <PreviewCard>
        <PreviewCardTrigger href="#lyra" delay={0}>
          Lyra
        </PreviewCardTrigger>
        <PreviewCardPopup>Lyra writes with you.</PreviewCardPopup>
      </PreviewCard>,
    );
    await user.hover(screen.getByRole("link", { name: "Lyra" }));
    raisedLayer(await screen.findByText("Lyra writes with you."));
  });
});

describe("menus", () => {
  it("a menu is a raised list walked by the arrow keys", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuTrigger render={<Button variant="secondary" />}>Actions</MenuTrigger>
        <MenuPopup>
          <MenuItem>Rename</MenuItem>
          <MenuItem>Duplicate</MenuItem>
          <MenuSeparator />
          <MenuCheckboxItem defaultChecked>Pinned</MenuCheckboxItem>
        </MenuPopup>
      </Menu>,
    );
    screen.getByRole("button", { name: "Actions" }).focus();
    await user.keyboard("{Enter}");
    const menu = await screen.findByRole("menu");
    raisedLayer(menu);
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
    expect(
      screen
        .getByRole("menuitemcheckbox", { name: "Pinned" })
        .getAttribute("aria-checked"),
    ).toBe("true");
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement?.textContent).toBe("Duplicate");
  });

  it("a context menu opens where the pointer asks for it", async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu>
        <ContextMenuTrigger>Canvas</ContextMenuTrigger>
        <ContextMenuPopup>
          <ContextMenuItem>Paste</ContextMenuItem>
        </ContextMenuPopup>
      </ContextMenu>,
    );
    await user.pointer({ keys: "[MouseRight]", target: screen.getByText("Canvas") });
    raisedLayer(await screen.findByRole("menu"));
  });

  it("a menubar is a flat strip of menus", () => {
    render(
      <Menubar aria-label="Editor">
        <Menu>
          <MenuTrigger>File</MenuTrigger>
          <MenuPopup>
            <MenuItem>New</MenuItem>
          </MenuPopup>
        </Menu>
      </Menubar>,
    );
    const bar = screen.getByRole("menubar", { name: "Editor" });
    expect(bar.getAttribute("data-material")).toBe("flat");
  });
});

describe("dialogs", () => {
  it("a dialog is a raised layer over an ink scrim, named by its title, closed by its labelled button", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger render={<Button />}>Invite</DialogTrigger>
        <DialogPopup closeLabel="Close">
          <DialogTitle>Invite people</DialogTitle>
          <DialogDescription>They get an email with a link.</DialogDescription>
        </DialogPopup>
      </Dialog>,
    );
    await user.click(screen.getByRole("button", { name: "Invite" }));
    const dialog = await screen.findByRole("dialog", { name: "Invite people" });
    raisedLayer(dialog);
    expect(dialog.className).toContain("dialog-motion");
    expect(document.querySelector(".backdrop-motion")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("an alert dialog asks before something that cannot be undone", async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="secondary" />}>
          Delete
        </AlertDialogTrigger>
        <AlertDialogPopup>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            Its files are removed for everyone.
          </AlertDialogDescription>
          <AlertDialogClose render={<Button variant="secondary" />}>
            Cancel
          </AlertDialogClose>
        </AlertDialogPopup>
      </AlertDialog>,
    );
    await user.click(screen.getByRole("button", { name: "Delete" }));
    raisedLayer(await screen.findByRole("alertdialog", { name: "Delete this project?" }));
  });

  it("a drawer slides from the side it names", async () => {
    const user = userEvent.setup();
    render(
      <Drawer side="right">
        <DrawerTrigger render={<Button variant="secondary" />}>Filters</DrawerTrigger>
        <DrawerPopup closeLabel="Close">
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerPopup>
      </Drawer>,
    );
    await user.click(screen.getByRole("button", { name: "Filters" }));
    const drawer = await screen.findByRole("dialog", { name: "Filters" });
    raisedLayer(drawer);
    expect(drawer.getAttribute("data-side")).toBe("right");
    expect(drawer.className).toContain("drawer-motion");
  });
});

describe("toasts", () => {
  function Notify() {
    const toast = useToast();
    return (
      <Button
        onClick={() =>
          toast.add({ title: "Saved", description: "All changes are synced." })
        }
      >
        Save
      </Button>
    );
  }

  it("a toast is announced and dismissed by its labelled button", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider closeLabel="Dismiss">
        <Notify />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Save" }));
    const title = await screen.findByText("Saved");
    raisedLayer(title);
    // The close button joins the accessibility tree once the stack is expanded.
    await user.hover(title);
    await user.click(await screen.findByRole("button", { name: "Dismiss" }));
    await waitFor(() => expect(screen.queryByText("Saved")).toBeNull());
  });
});

describe("command", () => {
  it("a command palette filters its actions as you type", async () => {
    const user = userEvent.setup();
    const items = ["New file", "Open settings", "Share"];
    render(
      <Command open items={items} label="Command" placeholder="Type a command">
        <CommandList>
          {(item: string) => (
            <CommandItem key={item} value={item}>
              {item}
            </CommandItem>
          )}
        </CommandList>
      </Command>,
    );
    const input = await screen.findByRole("combobox", { name: "Command" });
    raisedLayer(input);
    // Opening the palette puts the cursor in its search field, ready to type.
    await waitFor(() => expect(document.activeElement).toBe(input));
    await user.type(input, "set");
    await waitFor(() =>
      expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual([
        "Open settings",
      ]),
    );
  });
});

describe("locale switch", () => {
  it("opens the locales in a raised popover of links", async () => {
    const user = userEvent.setup();
    render(
      <LocaleSwitch
        label="Language"
        links={[
          { locale: "en", tag: "en", name: "English", href: "/en", current: true },
          { locale: "zh", tag: "zh-CN", name: "简体中文", href: "/zh", current: false },
        ]}
      />,
    );
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Language" }));
    });
    const link = await screen.findByRole("link", { name: "简体中文" });
    raisedLayer(link);
    expect(
      screen.getByRole("link", { name: "English" }).getAttribute("aria-current"),
    ).toBe("true");
  });
});
