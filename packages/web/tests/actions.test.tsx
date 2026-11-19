import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  Button,
  Kbd,
  Panel,
  Spinner,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
} from "../src/ui/index.js";

afterEach(cleanup);

describe("actions", () => {
  it("a loading button is busy and cannot be pressed again", () => {
    let presses = 0;
    render(
      <Button loading onClick={() => presses++}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(button.getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(button);
    expect(presses).toBe(0);
    expect(button.querySelector("[data-slot=spinner]")).toBeTruthy();
  });

  it("a spinner is hidden from assistive technology unless it is labelled", () => {
    render(
      <>
        <Spinner data-testid="quiet" />
        <Spinner label="Loading results" />
      </>,
    );
    expect(screen.getByTestId("quiet").getAttribute("aria-hidden")).toBe("true");
    expect(screen.getByRole("status", { name: "Loading results" })).toBeTruthy();
  });

  it("a toggle reports whether it is pressed", () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    const toggle = screen.getByRole("button", { name: "Bold" });
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
  });

  it("a toggle group is a well of equal segments whose one thumb slides to the pressed one", () => {
    render(
      <ToggleGroup aria-label="Align" defaultValue={["left"]}>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>,
    );
    const group = screen.getByRole("group", { name: "Align" });
    expect(group.className).toContain("material-well");
    expect(group.className).toContain("auto-cols-fr");
    const thumb = group.querySelector<HTMLElement>("[data-slot=thumb]")!;
    expect(thumb.className).toContain("material-thumb");
    expect(thumb.style.getPropertyValue("--index")).toBe("0");
    expect(thumb.style.getPropertyValue("--count")).toBe("3");
    const left = screen.getByRole("button", { name: "Left" });
    expect(left.getAttribute("aria-pressed")).toBe("true");
    expect(left.className).not.toContain("material-thumb");
    fireEvent.click(screen.getByRole("button", { name: "Right" }));
    expect(thumb.style.getPropertyValue("--index")).toBe("2");
  });

  it("a toggle group that allows several keeps a face on each pressed item", () => {
    render(
      <ToggleGroup aria-label="Style" multiple defaultValue={["bold"]}>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>,
    );
    const group = screen.getByRole("group", { name: "Style" });
    expect(group.querySelector("[data-slot=thumb]")).toBeNull();
    expect(screen.getByRole("button", { name: "Bold" }).className).toContain(
      "data-pressed:material-thumb",
    );
  });

  it("a toolbar is a flat row of buttons", () => {
    render(
      <Panel>
        <Toolbar aria-label="Format">
          <ToolbarButton>Bold</ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton>Link</ToolbarButton>
        </Toolbar>
      </Panel>,
    );
    const toolbar = screen.getByRole("toolbar", { name: "Format" });
    // A toolbar is chrome: flat even inside a raised layer.
    expect(toolbar.getAttribute("data-material")).toBe("flat");
    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByRole("separator")).toBeTruthy();
  });

  it("a key is a kbd element", () => {
    render(<Kbd>⌘K</Kbd>);
    expect(screen.getByText("⌘K").tagName).toBe("KBD");
  });
});
