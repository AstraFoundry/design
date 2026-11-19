"use client";

import { IconButton, Tooltip } from "@astrafoundry/design/ui";
import { Check, Copy } from "lucide-react";
import { useRef, useState, type ComponentProps } from "react";
import { UI } from "@/lib/i18n-ui";
import { useDocsLang } from "./lang";

/**
 * A highlighted code block: a card with a hairline and 14px corners, its
 * copy button a ghost icon button that turns into a check for a moment.
 */
export function CodeBlock({ children, className, ...rest }: ComponentProps<"pre">) {
  const t = UI[useDocsLang()];
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  return (
    <div className="group not-prose relative my-5 overflow-hidden rounded-continuous-xl border border-border bg-card">
      <pre
        ref={ref}
        className={
          "shiki overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-relaxed [&_code]:font-mono " +
          (className ?? "")
        }
        {...rest}
      >
        {children}
      </pre>
      <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-(--duration-press) group-hover:opacity-100 focus-within:opacity-100">
        <Tooltip content={copied ? t.copied : t.copy}>
          <IconButton
            label={copied ? t.copied : t.copy}
            variant="secondary"
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
