"use client";

import { IconButton, Tooltip } from "@astrafoundry/design/ui";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { UI } from "@/lib/i18n-ui";
import { useDocsLang } from "../lang";

const ORDER = ["light", "dark", "system"] as const;
type Choice = (typeof ORDER)[number];
const ICON = { light: Sun, dark: Moon, system: Monitor } as const;

/**
 * One button that steps through light, dark and system. The icon shows the
 * current choice and turns into the next on a short spring; the tooltip
 * names the choice and what a press does.
 */
export function ThemeSwitch({ className }: { className?: string }) {
  const t = UI[useDocsLang()];
  const { theme, setTheme } = useTheme();
  // The theme is known only on the client; show "system" until then.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current: Choice =
    mounted && ORDER.includes(theme as Choice) ? (theme as Choice) : "system";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]!;
  const name = { light: t.light, dark: t.dark, system: t.system };
  const label = `${t.theme}: ${name[current]}`;
  return (
    <Tooltip content={`${label} → ${name[next]}`}>
      <IconButton
        label={label}
        variant="ghost"
        size="sm"
        className={className}
        onClick={() => setTheme(next)}
      >
        <span className="relative grid size-[18px] place-items-center">
          {ORDER.map((choice) => {
            const Icon = ICON[choice];
            const on = choice === current;
            return (
              <Icon
                key={choice}
                aria-hidden
                className={
                  "absolute size-[18px] transition-[opacity,rotate,scale] duration-(--duration-toggle) ease-spring motion-reduce:transition-none " +
                  (on
                    ? "scale-100 rotate-0 opacity-100"
                    : "scale-50 -rotate-90 opacity-0")
                }
              />
            );
          })}
        </span>
      </IconButton>
    </Tooltip>
  );
}
