"use client";

import { IconButton, Segmented } from "@astrafoundry/design/ui";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { UI } from "@/lib/i18n-ui";
import { useDocsLang } from "../lang";

const ORDER = ["light", "dark", "system"] as const;

/**
 * Light, dark or system, as a segmented control of icons; `compact`, one
 * icon button that steps through them, for narrow headers.
 */
export function ThemeSwitch({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const t = UI[useDocsLang()];
  const { theme, setTheme } = useTheme();
  // The theme is known only on the client; render "system" until then.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const value = mounted ? (theme ?? "system") : "system";
  if (compact) {
    const index = ORDER.indexOf(value as (typeof ORDER)[number]);
    const Icon = value === "light" ? Sun : value === "dark" ? Moon : Monitor;
    const names = { light: t.light, dark: t.dark, system: t.system };
    return (
      <IconButton
        label={`${t.theme}: ${names[value as keyof typeof names] ?? t.system}`}
        variant="ghost"
        size="sm"
        className={className}
        onClick={() => setTheme(ORDER[(index + 1) % ORDER.length]!)}
      >
        <Icon aria-hidden />
      </IconButton>
    );
  }
  return (
    <Segmented
      label={t.theme}
      value={value}
      onValueChange={setTheme}
      iconOnly
      className={className}
      options={[
        { value: "light", label: t.light, icon: <Sun aria-hidden /> },
        { value: "dark", label: t.dark, icon: <Moon aria-hidden /> },
        { value: "system", label: t.system, icon: <Monitor aria-hidden /> },
      ]}
    />
  );
}
