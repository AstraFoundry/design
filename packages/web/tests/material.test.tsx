import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup } from "@testing-library/react";
import { Button } from "../src/ui/button.js";
import { IconButton } from "../src/ui/icon-button.js";
import { Panel } from "../src/ui/panel.js";
import { Segmented } from "../src/ui/segmented.js";
import { LocaleSwitch } from "../src/ui/locale-switch.js";
import {
  CenterMorphModal,
  CenterMorphModalContent,
} from "../src/beui/components/motion/center-morph-modal.js";

afterEach(cleanup);

describe("materials", () => {
  it("a panel is a raised layer by default, and flat on request", () => {
    const { container } = render(
      <>
        <Panel data-testid="raised" />
        <Panel data-testid="flat" material="flat" />
      </>,
    );
    const raised = screen.getByTestId("raised");
    const flat = screen.getByTestId("flat");
    expect(raised.dataset.material).toBe("raised");
    expect(raised.className).toContain("material-panel");
    expect(raised.className).toContain("rounded-continuous-tile");
    expect(flat.dataset.material).toBe("flat");
    expect(flat.className).not.toContain("material-panel");
    expect(container.querySelectorAll("[data-material]")).toHaveLength(2);
  });

  it("a panel can take a scheme of its own, as a dark panel on a light page", () => {
    render(<Panel data-testid="panel" scheme="dark" />);
    expect(screen.getByTestId("panel").classList.contains("dark")).toBe(true);
  });

  it("buttons take their layer's material through one face class", () => {
    render(
      <Panel>
        <Button>Capture</Button>
        <Button variant="secondary">Cancel</Button>
        <IconButton label="Download">
          <svg />
        </IconButton>
      </Panel>,
    );
    expect(screen.getByRole("button", { name: "Capture" }).className).toContain(
      "material-face-primary",
    );
    expect(screen.getByRole("button", { name: "Cancel" }).className).toMatch(
      /(^| )material-face( |$)/,
    );
    const icon = screen.getByRole("button", { name: "Download" });
    expect(icon.className).toContain("material-face");
    expect(icon.className).toContain("size-10");
  });
});

describe("Segmented", () => {
  function Picker({ iconOnly = false }: { iconOnly?: boolean }) {
    const [value, setValue] = useState<"theme" | "image">("image");
    return (
      <Segmented
        label="Background"
        value={value}
        onValueChange={setValue}
        iconOnly={iconOnly}
        options={[
          { value: "theme", label: "Theme", icon: <svg /> },
          { value: "image", label: "Image", icon: <svg /> },
        ]}
      />
    );
  }

  it("is a radio group whose chosen segment is the raised thumb", () => {
    render(<Picker />);
    expect(screen.getByRole("radiogroup", { name: "Background" })).toBeTruthy();
    const image = screen.getByRole("radio", { name: "Image" });
    const theme = screen.getByRole("radio", { name: "Theme" });
    expect(image.getAttribute("aria-checked")).toBe("true");
    expect(image.className).toContain("material-thumb");
    expect(image.tabIndex).toBe(0);
    expect(theme.tabIndex).toBe(-1);
    expect(theme.className).not.toContain("material-thumb");
    // Equal columns, so the raised pill keeps its size as the choice moves.
    expect(screen.getByRole("radiogroup").className).toContain("auto-cols-fr");
    // A tight flex row must not squeeze the segments, their labels or icons.
    expect(screen.getByRole("radiogroup").className).toContain("shrink-0");
    expect(image.className).toContain("[&_svg]:shrink-0");
  });

  it("chooses with a click and with the arrows, Home and End", () => {
    render(<Picker />);
    const theme = screen.getByRole("radio", { name: "Theme" });
    const image = screen.getByRole("radio", { name: "Image" });
    fireEvent.click(theme);
    expect(theme.getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(theme, { key: "ArrowRight" });
    expect(image.getAttribute("aria-checked")).toBe("true");
    expect(document.activeElement).toBe(image);
    fireEvent.keyDown(image, { key: "ArrowRight" });
    expect(theme.getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(theme, { key: "End" });
    expect(image.getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(image, { key: "Home" });
    expect(theme.getAttribute("aria-checked")).toBe("true");
  });

  it("names icon-only segments by their labels", () => {
    render(<Picker iconOnly />);
    const theme = screen.getByRole("radio", { name: "Theme" });
    expect(theme.textContent).toBe("");
  });
});

describe("floating layers", () => {
  it("raises an open dialog and its close button, over an unblurred scrim", async () => {
    render(
      <CenterMorphModal open onOpenChange={() => {}}>
        <CenterMorphModalContent
          ariaLabel="Confirm"
          closeButtonLabel="Close"
          backdropLabel="Dismiss"
        >
          <p>Body</p>
        </CenterMorphModalContent>
      </CenterMorphModal>,
    );
    const dialog = await screen.findByRole("dialog", { name: "Confirm" });
    expect(dialog.getAttribute("data-material")).toBe("raised");
    expect(dialog.className).toContain("material-panel");
    expect(screen.getByRole("button", { name: "Close" }).className).toContain(
      "material-face",
    );
    expect(document.body.innerHTML).not.toContain("backdrop-blur");
  });

  it("raises the locale popover", async () => {
    // jsdom has no ResizeObserver; the popover measures its trigger with one.
    globalThis.ResizeObserver ??= class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
    render(
      <LocaleSwitch
        label="Language"
        links={[{ locale: "en", tag: "en", name: "English", href: "/", current: true }]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Language" }));
    const popover = await screen.findByRole("dialog");
    expect(popover.getAttribute("data-material")).toBe("raised");
    expect(popover.className).toContain("material-panel");
  });
});
