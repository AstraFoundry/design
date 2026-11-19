"use client";

import { Field as BaseField } from "@base-ui/react/field";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { Form as BaseForm } from "@base-ui/react/form";
import { Input as BaseInput } from "@base-ui/react/input";
import {
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
  type ComponentProps,
} from "react";
import { cn } from "../lib/cn.js";
import { fieldClasses } from "./styles.js";

/* Inside an InputGroup an input gives its face to the group. */
const GroupContext = createContext(false);

export type LabelProps = ComponentPropsWithoutRef<"label">;

/** A native label in the control-label type. */
export function Label({ className, ...rest }: LabelProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-foreground select-none",
        "has-[[data-disabled]]:opacity-50",
        className,
      )}
      {...rest}
    />
  );
}

export type FieldProps = ComponentProps<typeof BaseField.Root>;

/**
 * Groups one control with its label, description and error, wiring their
 * ids so assistive technology reads them together. Validation comes from
 * Base UI's Field: `invalid`, `validate`, or the control's own constraints.
 */
export function Field({ className, ...rest }: FieldProps) {
  return (
    <BaseField.Root
      className={cn("flex flex-col items-start gap-1.5", className as string)}
      {...rest}
    />
  );
}

export type FieldLabelProps = ComponentProps<typeof BaseField.Label>;

export function FieldLabel({ className, ...rest }: FieldLabelProps) {
  return (
    <BaseField.Label
      className={cn(
        "text-sm font-medium text-foreground data-disabled:opacity-50",
        className as string,
      )}
      {...rest}
    />
  );
}

export type FieldDescriptionProps = ComponentProps<typeof BaseField.Description>;

export function FieldDescription({ className, ...rest }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      className={cn(
        "text-[13px] leading-snug text-muted-foreground",
        className as string,
      )}
      {...rest}
    />
  );
}

export type FieldErrorProps = ComponentProps<typeof BaseField.Error>;

/**
 * The field's error in running text color with a danger dot, since status
 * colors mark icons and dots only, never text.
 */
export function FieldError({ className, children, ...rest }: FieldErrorProps) {
  return (
    <BaseField.Error
      className={cn(
        "flex items-center gap-1.5 text-[13px] leading-snug text-foreground",
        className as string,
      )}
      {...rest}
    >
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-danger" />
      {children}
    </BaseField.Error>
  );
}

export type FieldsetProps = ComponentProps<typeof BaseFieldset.Root>;

export function Fieldset({ className, ...rest }: FieldsetProps) {
  return (
    <BaseFieldset.Root
      className={cn("flex min-w-0 flex-col gap-4 border-0 p-0", className as string)}
      {...rest}
    />
  );
}

export type FieldsetLegendProps = ComponentProps<typeof BaseFieldset.Legend>;

export function FieldsetLegend({ className, ...rest }: FieldsetLegendProps) {
  return (
    <BaseFieldset.Legend
      className={cn("text-base font-medium text-foreground", className as string)}
      {...rest}
    />
  );
}

export type FormProps = ComponentProps<typeof BaseForm>;

/** A form whose fields show their server and client errors. */
export function Form({ className, ...rest }: FormProps) {
  return (
    <BaseForm className={cn("flex flex-col gap-5", className as string)} {...rest} />
  );
}

export type InputProps = Omit<ComponentProps<typeof BaseInput>, "size"> & {
  size?: "sm" | "md" | "lg";
};

const INPUT_SIZE = { sm: "h-8", md: "h-10", lg: "h-12 text-base" } as const;

/**
 * A single-line text field. On the page it is solid content with a
 * hairline; inside a raised layer it is recessed.
 */
export function Input({ className, size = "md", ...rest }: InputProps) {
  const grouped = useContext(GroupContext);
  return (
    <BaseInput
      className={cn(
        grouped
          ? "h-full min-w-0 flex-1 bg-transparent px-0 text-sm text-foreground outline-none placeholder:text-muted-foreground/80"
          : [fieldClasses, INPUT_SIZE[size]],
        className as string,
      )}
      {...rest}
    />
  );
}

export type TextareaProps = ComponentPropsWithoutRef<"textarea">;

/** A multi-line text field that grows with its content where it can. */
export function Textarea({ className, ...rest }: TextareaProps) {
  return (
    <BaseField.Control
      render={<textarea />}
      className={cn(
        fieldClasses,
        "min-h-20 resize-y py-2.5 leading-relaxed field-sizing-content",
        className,
      )}
      {...(rest as ComponentProps<typeof BaseField.Control>)}
    />
  );
}

export interface InputGroupProps extends ComponentPropsWithoutRef<"div"> {
  size?: "sm" | "md" | "lg";
}

/**
 * One field face holding an input with addons beside it: a prefix, an
 * icon, a button. Focus inside rings the whole group.
 */
export function InputGroup({ className, size = "md", ...rest }: InputGroupProps) {
  return (
    <GroupContext.Provider value={true}>
      <div
        className={cn(
          fieldClasses,
          INPUT_SIZE[size],
          "flex items-center gap-2 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-ring",
          "has-[[aria-invalid=true]]:outline-2 has-[[aria-invalid=true]]:outline-danger",
          className,
        )}
        {...rest}
      />
    </GroupContext.Provider>
  );
}

export type InputGroupAddonProps = ComponentPropsWithoutRef<"span">;

/** Text or an icon beside the input of a group. */
export function InputGroupAddon({ className, ...rest }: InputGroupAddonProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center text-sm text-muted-foreground [&_svg]:size-4",
        className,
      )}
      {...rest}
    />
  );
}
