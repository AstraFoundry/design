"use client";

import { IconButton, ScrollArea, Tooltip } from "@astrafoundry/design/ui";
import { Check, Copy, WrapText } from "lucide-react";
import { useRef, useState, type ComponentProps } from "react";
import { UI } from "@/lib/i18n-ui";
import { useDocsLang } from "./lang";

export interface CodeBlockProps extends ComponentProps<"pre"> {
  /**
   * `card` (the default) is a block in running text: a card with a
   * hairline. `flush` fills its container, as the code view of a demo.
   */
  variant?: "card" | "flush";
  /**
   * Where the wrap and copy buttons go. `overlay` (the default) floats them
   * at the block's top end; a container that has a toolbar of its own puts
   * them there with CodeActions and passes `none`.
   */
  actions?: "overlay" | "none";
  /** Wrap long lines, when the actions live elsewhere. */
  wrap?: boolean;
}

/** The wrap-lines and copy buttons of a code block. */
export function CodeActions({
  wrap,
  onWrapChange,
  getText,
}: {
  wrap: boolean;
  onWrapChange: (wrap: boolean) => void;
  getText: () => string;
}) {
  const t = UI[useDocsLang()];
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-1">
      <Tooltip content={wrap ? t.unwrap : t.wrap}>
        <IconButton
          label={wrap ? t.unwrap : t.wrap}
          variant="ghost"
          size="sm"
          aria-pressed={wrap}
          className="aria-pressed:bg-flat-face-pressed aria-pressed:text-foreground"
          onClick={() => onWrapChange(!wrap)}
        >
          <WrapText aria-hidden />
        </IconButton>
      </Tooltip>
      <Tooltip content={copied ? t.copied : t.copy}>
        <IconButton
          label={copied ? t.copied : t.copy}
          variant="ghost"
          size="sm"
          onClick={async () => {
            await navigator.clipboard.writeText(getText());
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
        >
          {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
        </IconButton>
      </Tooltip>
    </div>
  );
}

/**
 * A highlighted code block. Its scrollbars float and show only while it
 * scrolls. Two ghost buttons at its top end, shown on hover or focus: one
 * wraps long lines, one copies the code and turns into a check a moment.
 */
export function CodeBlock({
  children,
  className,
  variant = "card",
  actions = "overlay",
  wrap: wrapProp,
  ...rest
}: CodeBlockProps) {
  const ref = useRef<HTMLPreElement>(null);
  const [wrapState, setWrap] = useState(false);
  const wrap = wrapProp ?? wrapState;
  const flush = variant === "flush";
  return (
    <div
      className={
        "group not-prose relative " +
        (flush
          ? "bg-card"
          : "my-5 overflow-hidden rounded-continuous-xl border border-border bg-card")
      }
    >
      <ScrollArea viewportClassName={flush ? "max-h-[32rem]" : "max-h-[36rem]"}>
        <pre
          ref={ref}
          className={
            "shiki m-0 px-5 py-4 font-mono text-[13px] leading-relaxed [&_code]:font-mono " +
            (actions === "overlay" ? "pr-24 " : "") +
            (wrap ? "whitespace-pre-wrap break-words" : "w-max min-w-full") +
            " " +
            (className ?? "")
          }
          {...rest}
        >
          {children}
        </pre>
      </ScrollArea>
      {actions === "overlay" ? (
        <div className="absolute top-2.5 right-2.5 z-20 opacity-0 transition-opacity duration-(--duration-press) group-hover:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100 [&_button]:size-7 [&_svg]:size-3.5!">
          <CodeActions
            wrap={wrap}
            onWrapChange={setWrap}
            getText={() => ref.current?.textContent ?? ""}
          />
        </div>
      ) : null}
    </div>
  );
}
