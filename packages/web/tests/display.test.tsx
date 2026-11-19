import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Badge,
  Card,
  CardDescription,
  CardTitle,
  Empty,
  Meter,
  Progress,
  Separator,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../src/ui/index.js";
import { Calendar, DatePicker } from "../src/ui/calendar.js";

afterEach(cleanup);

describe("display", () => {
  it("a card is flat content with a hairline, never raised", () => {
    render(
      <Card data-testid="card">
        <CardTitle>Usage</CardTitle>
        <CardDescription>This month</CardDescription>
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card.className).toContain("bg-card");
    expect(card.className).toContain("border-border");
    expect(card.className).not.toContain("material");
  });

  it("an alert is a status with a dot, its text in ink", () => {
    render(
      <Alert tone="danger">
        <AlertTitle>Sync failed</AlertTitle>
        <AlertDescription>Check your connection.</AlertDescription>
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert.querySelector(".bg-danger")).toBeTruthy();
    expect(screen.getByText("Sync failed").className).not.toMatch(/text-danger/);
  });

  it("a badge never spends the primary yellow", () => {
    render(
      <>
        <Badge>Draft</Badge>
        <Badge variant="outline">Beta</Badge>
        <Badge tone="success">Live</Badge>
      </>,
    );
    for (const text of ["Draft", "Beta", "Live"]) {
      expect(screen.getByText(text).closest("span")!.className).not.toMatch(/primary/);
    }
  });

  it("an avatar falls back to initials", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByText("AL")).toBeTruthy();
  });

  it("progress and meter report their values", () => {
    render(
      <>
        <Progress value={40} aria-label="Upload" />
        <Meter value={0.7} min={0} max={1} aria-label="Storage" />
      </>,
    );
    expect(
      screen.getByRole("progressbar", { name: "Upload" }).getAttribute("aria-valuenow"),
    ).toBe("40");
    expect(screen.getByRole("meter", { name: "Storage" })).toBeTruthy();
  });

  it("a separator, a skeleton and an empty state", () => {
    render(
      <>
        <Separator />
        <Skeleton data-testid="skeleton" />
        <Empty title="No projects yet" description="Create one to start." />
      </>,
    );
    expect(screen.getByRole("separator")).toBeTruthy();
    expect(screen.getByTestId("skeleton").getAttribute("aria-hidden")).toBe("true");
    expect(screen.getByRole("heading", { name: "No projects yet" })).toBeTruthy();
  });

  it("a table has headers and cells with tabular figures", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead align="end">Seats</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Atlas</TableCell>
            <TableCell align="end">12</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(screen.getByText("12").className).toContain("tabular-nums");
  });

  it("a hovered row is a rounded face, its hairlines hidden, not a square band", () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-testid="row">
            <TableCell>Atlas</TableCell>
            <TableCell>12</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const row = screen.getByTestId("row");
    // The row paints nothing itself; its cells do, rounded at the ends.
    expect(row.className).not.toMatch(/hover:bg-/);
    expect(row.className).toContain("hover:border-transparent");
    expect(row.className).toContain("has-[+tr:hover]:border-transparent");
    const cell = screen.getByText("Atlas");
    expect(cell.className).toContain("group-hover/row:bg-flat-face");
    expect(cell.className).toContain("first:rounded-l-[16px]");
    expect(cell.className).toContain("last:rounded-r-[16px]");
  });
});

describe("dates", () => {
  it("a calendar chooses a day, the choice filled with ink", async () => {
    const user = userEvent.setup();
    let picked: Date | undefined;
    render(
      <Calendar
        mode="single"
        defaultMonth={new Date(2026, 10, 1)}
        onSelect={(day: Date | undefined) => {
          picked = day;
        }}
      />,
    );
    await user.click(screen.getByRole("button", { name: /November 18th, 2026/ }));
    expect(picked?.getDate()).toBe(18);
  });

  it("a date picker opens a calendar in a raised popover", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        label="Due date"
        placeholder="Pick a date"
        defaultMonth={new Date(2026, 10, 1)}
        format={(day) => day.toISOString().slice(0, 10)}
      />,
    );
    const trigger = screen.getByRole("button", { name: /Due date/ });
    await user.click(trigger);
    await user.click(await screen.findByRole("button", { name: /November 18th, 2026/ }));
    expect(trigger.textContent).toContain("2026-11-1");
  });
});
