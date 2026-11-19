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
  ...rest
}: CodeBlockProps) {
  const t = UI[useDocsLang()];
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const [wrap, setWrap] = useState(false);
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
            "shiki m-0 px-5 py-4 pr-24 font-mono text-[13px] leading-relaxed [&_code]:font-mono " +
            (wrap ? "whitespace-pre-wrap break-words" : "w-max min-w-full") +
            " " +
            (className ?? "")
          }
          {...rest}
        >
          {children}
        </pre>
      </ScrollArea>
      <div className="absolute top-2.5 right-2.5 z-20 flex gap-1 opacity-0 transition-opacity duration-(--duration-press) group-hover:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100">
        <Tooltip content={wrap ? t.unwrap : t.wrap}>
          <IconButton
            label={wrap ? t.unwrap : t.wrap}
            variant="ghost"
            size="sm"
            aria-pressed={wrap}
            className="size-7 aria-pressed:bg-flat-face-pressed aria-pressed:text-foreground"
            onClick={() => setWrap((w) => !w)}
          >
            <WrapText aria-hidden className="size-3.5" />
          </IconButton>
        </Tooltip>
        <Tooltip content={copied ? t.copied : t.copy}>
          <IconButton
            label={copied ? t.copied : t.copy}
            variant="ghost"
            size="sm"
            className="size-7"
            onClick={async () => {
              await navigator.clipboard.writeText(ref.current?.textContent ?? "");
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
          >
            {copied ? (
              <Check aria-hidden className="size-3.5" />
            ) : (
              <Copy aria-hidden className="size-3.5" />
            )}
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
