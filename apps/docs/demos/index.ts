import type { ComponentType } from "react";
import buttonVariants from "./button/variants";

/** Every demo, by its path under demos/. */
export const demos: Record<string, ComponentType> = {
  "button/variants": buttonVariants,
};
