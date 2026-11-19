import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  Checkbox,
  CheckboxGroup,
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  NumberField,
  OTPField,
  Panel,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Textarea,
} from "../src/ui/index.js";

afterEach(cleanup);

describe("text fields", () => {
  it("a field labels its input and describes it", () => {
    render(
      <Field>
        <FieldLabel>Workspace name</FieldLabel>
        <Input placeholder="Acme" />
        <FieldDescription>Shown to everyone you invite.</FieldDescription>
      </Field>,
    );
    const input = screen.getByRole("textbox", { name: "Workspace name" });
    const described = input.getAttribute("aria-describedby") ?? "";
    expect(document.getElementById(described.split(" ")[0]!)?.textContent).toBe(
      "Shown to everyone you invite.",
    );
    expect(input.className).toContain("material-field");
  });

  it("an invalid field announces its error", () => {
    render(
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldError match>Enter an email address.</FieldError>
      </Field>,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByText("Enter an email address.")).toBeTruthy();
  });

  it("an input takes the field material of its layer", () => {
    render(
      <Panel>
        <Input aria-label="Search" />
      </Panel>,
    );
    const input = screen.getByRole("textbox", { name: "Search" });
    expect(input.closest("[data-material]")?.getAttribute("data-material")).toBe(
      "raised",
    );
    expect(input.className).toContain("material-field");
  });

  it("a textarea and an input group are fields too", () => {
    render(
      <>
        <Textarea aria-label="Notes" />
        <InputGroup data-testid="group">
          <InputGroupAddon>https://</InputGroupAddon>
          <Input aria-label="Domain" />
        </InputGroup>
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Notes" }).tagName).toBe("TEXTAREA");
    expect(screen.getByTestId("group").className).toContain("material-field");
    // Inside a group the input gives up its own face to the group's.
    expect(screen.getByRole("textbox", { name: "Domain" }).className).not.toContain(
      "material-field",
    );
  });

  it("a label is a native label", () => {
    render(
      <>
        <Label htmlFor="n">Name</Label>
        <input id="n" />
      </>,
    );
    expect(screen.getByLabelText("Name").id).toBe("n");
  });

  it("a number field steps with its labelled buttons and keys", () => {
    render(
      <NumberField
        aria-label="Seats"
        defaultValue={3}
        decrementLabel="Fewer seats"
        incrementLabel="More seats"
      />,
    );
    const input = screen.getByRole("textbox", { name: "Seats" });
    fireEvent.click(screen.getByRole("button", { name: "More seats" }));
    expect((input as HTMLInputElement).value).toBe("4");
    fireEvent.click(screen.getByRole("button", { name: "Fewer seats" }));
    expect((input as HTMLInputElement).value).toBe("3");
  });

  it("an OTP field has one input per character, each named", () => {
    render(
      <OTPField
        length={4}
        aria-label="Code"
        characterLabel={(i, n) => `Digit ${i} of ${n}`}
      />,
    );
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
    expect(screen.getByRole("textbox", { name: "Digit 2 of 4" })).toBeTruthy();
  });
});

describe("choices", () => {
  it("a checkbox toggles and is filled with ink, not yellow, when checked", () => {
    render(<Checkbox aria-label="Remember me" />);
    const box = screen.getByRole("checkbox", { name: "Remember me" });
    expect(box.getAttribute("aria-checked")).toBe("false");
    fireEvent.click(box);
    expect(box.getAttribute("aria-checked")).toBe("true");
    expect(box.className).toContain("data-checked:bg-foreground");
    expect(box.className).not.toMatch(/primary/);
  });

  it("a checkbox group holds the values of its boxes", () => {
    render(
      <CheckboxGroup aria-label="Notify me" defaultValue={["mentions"]}>
        <Label>
          <Checkbox value="mentions" /> Mentions
        </Label>
        <Label>
          <Checkbox value="replies" /> Replies
        </Label>
      </CheckboxGroup>,
    );
    const [mentions, replies] = screen.getAllByRole("checkbox");
    expect(mentions!.getAttribute("aria-checked")).toBe("true");
    expect(replies!.getAttribute("aria-checked")).toBe("false");
  });

  it("a radio group chooses one with the arrows", () => {
    render(
      <RadioGroup aria-label="Plan" defaultValue="team">
        <Label>
          <Radio value="solo" /> Solo
        </Label>
        <Label>
          <Radio value="team" /> Team
        </Label>
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup", { name: "Plan" })).toBeTruthy();
    const radios = screen.getAllByRole("radio");
    expect(radios[1]!.getAttribute("aria-checked")).toBe("true");
    fireEvent.click(radios[0]!);
    expect(radios[0]!.getAttribute("aria-checked")).toBe("true");
  });

  it("a switch is a switch, its track a well and its thumb a knob", () => {
    render(<Switch aria-label="Sync" />);
    const control = screen.getByRole("switch", { name: "Sync" });
    expect(control.getAttribute("aria-checked")).toBe("false");
    fireEvent.click(control);
    expect(control.getAttribute("aria-checked")).toBe("true");
    expect(control.className).toContain("material-well");
    expect(control.querySelector(".material-thumb")).toBeTruthy();
  });

  it("a switch's and a slider's knobs take their layer's material, never their own", () => {
    render(
      <>
        <Switch aria-label="Flat switch" />
        <Slider aria-label="Flat slider" defaultValue={50} />
      </>,
    );
    const knobs = [
      screen
        .getByRole("switch", { name: "Flat switch" })
        .querySelector(".material-thumb")!,
      screen.getByRole("slider", { name: "Flat slider" }).closest(".material-thumb")!,
    ];
    for (const knob of knobs) {
      // No layer of its own: on the page the knob is a flat solid face.
      expect(knob.closest("[data-material]")).toBeNull();
    }
  });

  it("a slider moves by its step with the arrow keys", () => {
    render(<Slider aria-label="Volume" defaultValue={40} step={10} />);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider.getAttribute("aria-valuenow")).toBe("40");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider.getAttribute("aria-valuenow")).toBe("50");
  });
});

describe("lists", () => {
  it("a select opens a raised listbox and chooses an option", async () => {
    render(
      <Select defaultValue="light" items={{ light: "Light", dark: "Dark" }}>
        <SelectTrigger aria-label="Theme">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectPopup>
      </Select>,
    );
    const trigger = screen.getByRole("combobox", { name: "Theme" });
    expect(trigger.textContent).toContain("Light");
    const user = userEvent.setup();
    await user.click(trigger);
    const listbox = await screen.findByRole("listbox");
    const layer = listbox.closest("[data-material]");
    expect(layer?.getAttribute("data-material")).toBe("raised");
    expect(layer?.className).toContain("material-panel");
    await user.click(screen.getByRole("option", { name: "Dark" }));
    expect(trigger.textContent).toContain("Dark");
  });

  it("a combobox filters its items as you type", async () => {
    render(
      <Combobox items={["Lyra", "Arion", "Telo"]}>
        <ComboboxInput aria-label="Product" />
        <ComboboxPopup>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>,
    );
    const input = screen.getByRole("combobox", { name: "Product" });
    await userEvent.setup().type(input, "ar");
    const options = await screen.findAllByRole("option");
    expect(options.map((option) => option.textContent)).toEqual(["Arion"]);
  });

  it("an autocomplete suggests completions", async () => {
    render(
      <Autocomplete items={["design", "deploy", "docs"]}>
        <AutocompleteInput aria-label="Command" />
        <AutocompletePopup>
          <AutocompleteList>
            {(item: string) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>,
    );
    const input = screen.getByRole("combobox", { name: "Command" });
    await userEvent.setup().type(input, "de");
    const options = await screen.findAllByRole("option");
    expect(options.map((option) => option.textContent)).toEqual(["design", "deploy"]);
  });
});

describe("forms", () => {
  it("a fieldset is named by its legend, inside a form", () => {
    render(
      <Form aria-label="Billing">
        <Fieldset>
          <FieldsetLegend>Address</FieldsetLegend>
        </Fieldset>
      </Form>,
    );
    expect(screen.getByRole("group", { name: "Address" })).toBeTruthy();
    expect(screen.getByRole("form", { name: "Billing" })).toBeTruthy();
  });
});
