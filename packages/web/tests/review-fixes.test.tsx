import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { cn } from "../src/lib/cn.js";
import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Form,
  Input,
  Popover,
  PopoverPopup,
  PopoverTrigger,
  Panel,
} from "../src/ui/index.js";
import { DatePicker } from "../src/ui/calendar.js";

afterEach(cleanup);

describe("review fixes", () => {
  it("a field error with no children shows the message Base UI provides", () => {
    render(
      <Form errors={{ email: "Taken already" }}>
        <Field name="email">
          <FieldLabel>Email</FieldLabel>
          <Input />
          <FieldError />
        </Field>
      </Form>,
    );
    expect(screen.getByText("Taken already")).toBeTruthy();
  });

  it("a later rounded-continuous class wins over an earlier one", () => {
    expect(cn("rounded-continuous-xl", "rounded-continuous-[22px]")).toBe(
      "rounded-continuous-[22px]",
    );
  });

  it("a loading button keeps the keyboard focus and ignores presses", async () => {
    const user = userEvent.setup();
    let presses = 0;
    const { rerender } = render(<Button onClick={() => presses++}>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    button.focus();
    rerender(
      <Button loading onClick={() => presses++}>
        Save
      </Button>,
    );
    expect(document.activeElement).toBe(button);
    expect(button.getAttribute("aria-disabled")).toBe("true");
    await user.click(button);
    expect(presses).toBe(0);
  });

  it("a date picker speaks the page's language", async () => {
    const user = userEvent.setup();
    const { zhCN } = await import("react-day-picker/locale");
    render(
      <DatePicker
        label="截止日期"
        placeholder="选择日期"
        locale={zhCN}
        defaultMonth={new Date(2026, 10, 1)}
        format={(d) => d.toISOString().slice(0, 10)}
      />,
    );
    await user.click(screen.getByRole("button", { name: /截止日期/ }));
    expect(await screen.findByText(/2026年11月|十一月/)).toBeTruthy();
  });

  it("a popover inside a dark panel opens dark", async () => {
    const user = userEvent.setup();
    render(
      <Panel scheme="dark">
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverPopup>Inside</PopoverPopup>
        </Popover>
      </Panel>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    const popup = (await screen.findByText("Inside")).closest("[data-material]")!;
    expect(popup.closest(".dark")).toBeTruthy();
  });
});
