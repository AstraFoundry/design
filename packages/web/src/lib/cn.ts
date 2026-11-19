import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge that knows Sunbeam's own utilities, so a later
 * `rounded-continuous-*` replaces an earlier one (and a plain `rounded-*`)
 * instead of both staying and the stylesheet's order deciding.
 */
const merge = extendTailwindMerge<"rounded-continuous">({
  extend: {
    classGroups: {
      "rounded-continuous": [
        { "rounded-continuous": [(value: string) => value.length > 0] },
      ],
    },
    conflictingClassGroups: {
      "rounded-continuous": ["rounded"],
      rounded: ["rounded-continuous"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return merge(clsx(inputs));
}
