"use client";

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { DayPicker, type DayPickerProps, type Locale } from "react-day-picker";
import { cn } from "../lib/cn.js";
import { fieldClasses } from "./styles.js";
import { Popover, PopoverPopup, PopoverTrigger } from "./popover.js";

/**
 * Class names for react-day-picker in Sunbeam: 36px days on 10px corners,
 * today ringed in ink, the chosen day filled with ink, a range a flat fill.
 */
const CLASSES: DayPickerProps["classNames"] = {
  root: "relative w-fit text-sm text-foreground",
  months: "relative flex flex-col gap-6 sm:flex-row",
  month: "flex flex-col gap-3",
  month_caption: "flex h-9 items-center px-1 font-medium",
  caption_label: "text-sm font-medium",
  nav: "absolute top-0 right-0 flex h-9 items-center gap-1",
  button_previous:
    "inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-flat-face-hover hover:text-foreground disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-ring",
  button_next:
    "inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-flat-face-hover hover:text-foreground disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-ring",
  month_grid: "border-collapse",
  weekdays: "flex",
  weekday:
    "flex size-9 items-center justify-center text-xs font-medium text-muted-foreground",
  week: "mt-0.5 flex",
  day: "group relative size-9 p-0 text-center",
  day_button: cn(
    "inline-flex size-9 items-center justify-center rounded-lg text-sm tabular-nums",
    "transition-[background-color,color,scale] duration-(--duration-press) ease-out active:scale-95",
    "hover:bg-flat-face-hover focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
  ),
  today: "[&>button]:shadow-[inset_0_0_0_1px_var(--foreground)]",
  selected:
    "[&>button]:bg-foreground [&>button]:text-background [&>button]:hover:bg-foreground [&>button]:shadow-none",
  range_middle:
    "[&>button]:rounded-none [&>button]:bg-flat-face-pressed! [&>button]:text-foreground!",
  range_start: "[&>button]:rounded-r-none",
  range_end: "[&>button]:rounded-l-none",
  outside: "text-faint",
  disabled: "opacity-40 [&>button]:pointer-events-none",
  hidden: "invisible",
};

export type CalendarProps = DayPickerProps;

/**
 * A month of days to choose from: one day, several, or a range. Built on
 * react-day-picker, an optional peer dependency; install it to use this.
 */
export function Calendar({ className, classNames, ...rest }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("p-1", className)}
      classNames={{ ...CLASSES, ...classNames }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft aria-hidden className="size-4" />
          ) : (
            <ChevronRight aria-hidden className="size-4" />
          ),
      }}
      {...(rest as ComponentProps<typeof DayPicker>)}
    />
  );
}

export interface DatePickerProps {
  /** Names the field. It is also shown before the date. */
  label: string;
  /** Shown when no date is chosen. */
  placeholder: string;
  /** Writes a chosen date, in the page's language. */
  format: (day: Date) => string;
  /**
   * The calendar's language: month and weekday names, the first day of the
   * week, and its navigation labels. Import it from `react-day-picker/locale`.
   */
  locale?: Partial<Locale>;
  /** The chosen day; pass `null` for none. Omit to let the picker keep it. */
  value?: Date | null;
  defaultValue?: Date;
  onValueChange?: (day: Date | undefined) => void;
  defaultMonth?: Date;
  disabled?: boolean;
  /** Anything else the calendar takes: `labels`, `disabled` days, `startMonth`… */
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "locale">;
  className?: string;
}

/** A field that opens a calendar in a raised popover and shows the chosen day. */
export function DatePicker({
  label,
  placeholder,
  format,
  locale,
  value,
  defaultValue,
  onValueChange,
  defaultMonth,
  disabled,
  calendarProps,
  className,
}: DatePickerProps) {
  const [inner, setInner] = useState<Date | undefined>(defaultValue);
  const [open, setOpen] = useState(false);
  const day = value === undefined ? inner : (value ?? undefined);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        aria-label={day ? `${label}: ${format(day)}` : label}
        className={cn(
          fieldClasses,
          "inline-flex h-10 min-w-48 items-center gap-2 text-left",
          "data-popup-open:outline-2 data-popup-open:outline-offset-1 data-popup-open:outline-ring",
          className,
        )}
      >
        <CalendarDays aria-hidden className="size-4 text-muted-foreground" />
        <span className={cn("truncate", !day && "text-muted-foreground")}>
          {day ? format(day) : placeholder}
        </span>
      </PopoverTrigger>
      <PopoverPopup align="start" className="p-3">
        <Calendar
          {...(calendarProps as object)}
          mode="single"
          required
          locale={locale}
          selected={day}
          defaultMonth={day ?? defaultMonth}
          onSelect={(next: Date | undefined) => {
            // Choosing the chosen day again keeps it: required mode never
            // clears, so a tap to confirm does not lose the date.
            if (!next) return;
            setInner(next);
            onValueChange?.(next);
            setOpen(false);
          }}
        />
      </PopoverPopup>
    </Popover>
  );
}
