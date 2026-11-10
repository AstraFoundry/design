import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/cn.js";

/** The two surface materials: see tokens/material.css. */
export type Material = "flat" | "raised";

export interface PanelProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * `raised` (the default) floats the panel above the page and raises every
   * control inside it. `flat` keeps it on the page: a card with a hairline
   * edge, whose controls stay flat.
   */
  material?: Material;
  /**
   * Shows the panel in this color scheme whatever the page's, as a dark
   * panel over a light page. Leave it out to follow the page.
   */
  scheme?: "light" | "dark";
}

/**
 * A layer of controls. Its corners curve continuously where the browser
 * can, and its 8px inset keeps them concentric with the 40px pills inside:
 * 28px outer radius − 8px inset = 20px, a pill's radius.
 */
export function Panel({ material = "raised", scheme, className, ...rest }: PanelProps) {
  return (
    <div
      data-material={material}
      className={cn(
        "rounded-continuous-tile p-2 text-foreground",
        material === "raised" ? "material-panel" : "border border-border bg-card",
        scheme,
        className,
      )}
      {...rest}
    />
  );
}
