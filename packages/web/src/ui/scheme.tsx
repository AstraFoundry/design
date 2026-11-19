"use client";

import { createContext, useContext } from "react";

export type Scheme = "light" | "dark";

/**
 * The color scheme a part of the page shows in when it differs from the
 * page's, as a dark Panel on a light page. Popups render into `body`, out
 * of that part's DOM, so they read it here and carry the scheme with them.
 */
export const SchemeContext = createContext<Scheme | undefined>(undefined);

/** The scheme class a popup opened from here should carry, or "". */
export function useSchemeClass(): string {
  return useContext(SchemeContext) ?? "";
}
