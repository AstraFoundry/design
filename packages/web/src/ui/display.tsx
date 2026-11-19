"use client";

import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { Meter as BaseMeter } from "@base-ui/react/meter";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/cn.js";

/* ------------------------------------------------------------------ Card */

/**
 * Solid content on the page: a card with a hairline. Cards are content,
 * not controls, so they never take the raised material.
 */
export function Card({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-continuous-3xl border border-border bg-card p-6 text-card-foreground",
        className,
      )}
      {...rest}
    />
  );
}

export function CardTitle({ className, ...rest }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn(
        "text-base leading-snug font-medium text-balance text-foreground",
        className,
      )}
      {...rest}
    />
  );
}

export function CardDescription({ className, ...rest }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("mt-1 text-sm text-pretty text-muted-foreground", className)}
      {...rest}
    />
  );
}

/* ---------------------------------------------------------------- Status */

export type Tone = "neutral" | "success" | "danger" | "info";

const DOT: Record<Tone, string> = {
  neutral: "bg-faint",
  success: "bg-success",
  danger: "bg-danger",
  info: "bg-info",
};

/** A status dot: status colors mark dots and icons, never running text. */
export function StatusDot({
  tone = "neutral",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("size-2 shrink-0 rounded-full", DOT[tone], className)}
    />
  );
}

export interface AlertProps extends ComponentPropsWithoutRef<"div"> {
  tone?: Tone;
  /** An icon in place of the status dot. */
  icon?: ReactNode;
}

/**
 * A message about the page or a task. Danger alerts interrupt (role alert);
 * the others are polite status messages.
 */
export function Alert({
  tone = "neutral",
  icon,
  className,
  children,
  ...rest
}: AlertProps) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-foreground",
        className,
      )}
      {...rest}
    >
      <span className="flex h-5 items-center [&_svg]:size-4">
        {icon ?? <StatusDot tone={tone} />}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">{children}</div>
    </div>
  );
}

export function AlertTitle({ className, ...rest }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("font-medium text-foreground", className)} {...rest} />;
}

export function AlertDescription({ className, ...rest }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-pretty text-muted-foreground", className)} {...rest} />;
}

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  /** `soft` (the default) is a quiet fill; `outline` a hairline. */
  variant?: "soft" | "outline";
  /** A status dot before the text. */
  tone?: Tone;
}

/**
 * A short label: a state, a count, a category. Never yellow: yellow is for
 * the one primary action.
 */
export function Badge({
  variant = "soft",
  tone,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center gap-1.5 rounded-full px-2 text-xs font-medium whitespace-nowrap",
        variant === "soft"
          ? "bg-secondary text-secondary-foreground"
          : "border border-border text-muted-foreground",
        className,
      )}
      {...rest}
    >
      {tone ? <StatusDot tone={tone} className="size-1.5" /> : null}
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- Avatar */

export interface AvatarProps extends Omit<
  ComponentProps<typeof BaseAvatar.Root>,
  "children"
> {
  /** The person's or team's name: the image's alt text, and the initials. */
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}

const AVATAR_SIZE = {
  sm: "size-6 text-[10px]",
  md: "size-8 text-xs",
  lg: "size-10 text-sm",
} as const;

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters =
    parts.length > 1
      ? [parts[0]![0], parts[parts.length - 1]![0]]
      : [...(parts[0] ?? "")].slice(0, 2);
  return letters.join("").toUpperCase();
}

/** A round picture of a person, or their initials while it loads or fails. */
export function Avatar({ name, src, size = "md", className, ...rest }: AvatarProps) {
  return (
    <BaseAvatar.Root
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary align-middle font-medium text-secondary-foreground select-none",
        "outline outline-1 -outline-offset-1 outline-image-outline",
        AVATAR_SIZE[size],
        className as string,
      )}
      {...rest}
    >
      {src ? (
        <BaseAvatar.Image src={src} alt={name} className="size-full object-cover" />
      ) : null}
      <BaseAvatar.Fallback aria-label={src ? undefined : name}>
        {initials(name)}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}

/* ------------------------------------------------------------- Separator */

export function Separator({ className, ...rest }: ComponentProps<typeof BaseSeparator>) {
  return (
    <BaseSeparator
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        className as string,
      )}
      {...rest}
    />
  );
}

/* -------------------------------------------------------------- Skeleton */

/**
 * A placeholder in the shape of content that is loading. It shimmers once
 * a second, the loop Sunbeam allows for real waiting.
 */
export function Skeleton({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse rounded-md bg-muted motion-reduce:animate-none",
        className,
      )}
      {...rest}
    />
  );
}

/* ------------------------------------------------------ Progress, Meter */

/**
 * How far a task has run. The bar is ink; it turns yellow only when the
 * progress is itself the screen's result, by passing `tone="result"`.
 */
export function Progress({
  className,
  tone = "ink",
  ...rest
}: ComponentProps<typeof BaseProgress.Root> & { tone?: "ink" | "result" }) {
  return (
    <BaseProgress.Root className={cn("w-full", className as string)} {...rest}>
      <BaseProgress.Track className="material-well h-1.5 w-full overflow-hidden rounded-full">
        <BaseProgress.Indicator
          className={cn(
            "block h-full rounded-full transition-[width] duration-(--duration-indicator) ease-out",
            "data-indeterminate:w-1/3 data-indeterminate:animate-pulse",
            tone === "result" ? "bg-primary" : "bg-foreground",
          )}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}

/** A measurement within a known range, as storage used. */
export function Meter({ className, ...rest }: ComponentProps<typeof BaseMeter.Root>) {
  return (
    <BaseMeter.Root className={cn("w-full", className as string)} {...rest}>
      <BaseMeter.Track className="material-well h-1.5 w-full overflow-hidden rounded-full">
        <BaseMeter.Indicator className="block h-full rounded-full bg-foreground transition-[width] duration-(--duration-indicator) ease-out" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}

/* ----------------------------------------------------------------- Table */

/** A table of records on a card, hairlines between rows, figures aligned. */
export function Table({ className, ...rest }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn("w-full caption-bottom border-collapse text-sm", className)}
        {...rest}
      />
    </div>
  );
}

export function TableHeader({ className, ...rest }: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead className={cn("[&_tr]:border-b [&_tr]:border-border", className)} {...rest} />
  );
}

export function TableBody({ className, ...rest }: ComponentPropsWithoutRef<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...rest} />;
}

/**
 * A row. Hovered or selected, its cells form one rounded face, concentric
 * with the card, and the hairlines above and below it step aside so the
 * face is not cut by square lines.
 */
export function TableRow({ className, ...rest }: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className={cn(
        "group/row border-b border-border transition-colors duration-(--duration-press)",
        "hover:border-transparent has-[+tr:hover]:border-transparent",
        "data-[state=selected]:border-transparent has-[+tr[data-state=selected]]:border-transparent",
        className,
      )}
      {...rest}
    />
  );
}

/**
 * The rounded face a hovered or selected row's cells share: 16px, the
 * 24px card's corner less its 8px inset.
 */
const rowFace = cn(
  "transition-colors duration-(--duration-press) first:rounded-l-[16px] last:rounded-r-[16px]",
  "group-hover/row:bg-flat-face group-data-[state=selected]/row:bg-flat-face-hover",
);

type Align = "start" | "center" | "end";
const ALIGN: Record<Align, string> = {
  start: "text-left",
  center: "text-center",
  end: "text-right",
};

export function TableHead({
  className,
  align = "start",
  ...rest
}: Omit<ComponentPropsWithoutRef<"th">, "align"> & { align?: Align }) {
  return (
    <th
      className={cn(
        "h-10 px-3 text-xs font-medium whitespace-nowrap text-muted-foreground",
        ALIGN[align],
        className,
      )}
      {...rest}
    />
  );
}

export function TableCell({
  className,
  align = "start",
  ...rest
}: Omit<ComponentPropsWithoutRef<"td">, "align"> & { align?: Align }) {
  return (
    <td
      className={cn(
        "h-11 px-3 text-foreground tabular-nums",
        rowFace,
        ALIGN[align],
        className,
      )}
      {...rest}
    />
  );
}

export function TableCaption({
  className,
  ...rest
}: ComponentPropsWithoutRef<"caption">) {
  return (
    <caption
      className={cn("mt-3 text-[13px] text-muted-foreground", className)}
      {...rest}
    />
  );
}

/* ----------------------------------------------------------------- Empty */

export interface EmptyProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  /** The next step, as one primary button. */
  action?: ReactNode;
}

/** What a place holds before it holds anything, and how to start. */
export function Empty({
  title,
  description,
  icon,
  action,
  className,
  ...rest
}: EmptyProps) {
  return (
    <div
      className={cn("flex flex-col items-center gap-3 px-6 py-12 text-center", className)}
      {...rest}
    >
      {icon ? (
        <div className="material-well mb-1 flex size-12 items-center justify-center rounded-2xl text-muted-foreground [&_svg]:size-5">
          {icon}
        </div>
      ) : null}
      <h3 className="text-base font-medium text-balance text-foreground">{title}</h3>
      {description ? (
        <p className="max-w-sm text-sm text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
