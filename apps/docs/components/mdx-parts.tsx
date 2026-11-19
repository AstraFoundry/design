import { Alert, AlertDescription } from "@astrafoundry/design/ui";
import type { ComponentProps, ReactNode } from "react";

/** A Markdown table on a card with hairlines, its header a flat fill. */
export function MdxTable(props: ComponentProps<"table">) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-continuous-2xl border border-border bg-card">
      <table
        className="w-full border-collapse text-sm [&_td]:border-t [&_td]:border-border [&_td]:px-4 [&_td]:py-2.5 [&_td]:align-top [&_th]:bg-flat-face [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-medium [&_th]:text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[12px]"
        {...props}
      />
    </div>
  );
}

/** A note set off from the text: Sunbeam's Alert, its tone a dot. */
export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warn" | "error" | "success";
  title?: ReactNode;
  children: ReactNode;
}) {
  const tone =
    type === "error" || type === "warn"
      ? "danger"
      : type === "success"
        ? "success"
        : "info";
  return (
    <Alert tone={tone} className="not-prose my-6">
      {title ? <p className="font-medium">{title}</p> : null}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}

/** Numbered steps on a hairline: each number an ink dot on the line. */
export function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 border-l border-border pl-6 [counter-reset:step]">
      {children}
    </div>
  );
}

export function Step({ children }: { children: ReactNode }) {
  return (
    <div className="relative pb-6 text-[15px] leading-relaxed last:pb-0 [counter-increment:step] before:absolute before:top-0 before:-left-[2.3rem] before:flex before:size-6 before:items-center before:justify-center before:rounded-full before:bg-foreground before:text-xs before:font-medium before:text-background before:tabular-nums before:content-[counter(step)] [&_p]:my-1">
      {children}
    </div>
  );
}

export interface TypeNode {
  type: ReactNode;
  description?: ReactNode;
  default?: ReactNode;
  required?: boolean;
}

/** A component's props: name, type, default and what each does. */
export function TypeTable({
  type,
  head,
}: {
  type: Record<string, TypeNode>;
  head?: [string, string, string];
}) {
  const columns = head ?? ["Prop", "Type", "Default"];
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-continuous-2xl border border-border bg-card">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-flat-face text-left text-xs text-muted-foreground">
            {columns.map((h) => (
              <th key={h} className="px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(type).map(([name, node]) => (
            <tr key={name} className="border-t border-border align-top">
              <td className="px-4 py-3 font-mono text-[13px] font-medium whitespace-nowrap">
                {name}
              </td>
              <td className="px-4 py-3">
                <code className="font-mono text-[12px] text-muted-foreground">
                  {node.type}
                </code>
                {node.description ? (
                  <p className="mt-1 text-[13px] text-foreground">{node.description}</p>
                ) : null}
              </td>
              <td className="px-4 py-3 font-mono text-[12px] whitespace-nowrap text-muted-foreground">
                {node.default ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
