"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// Environments without `matchMedia` (jsdom, very old browsers) have no
// preference to report, so they read as motion allowed.
const supported = () => typeof window.matchMedia === "function";

function subscribe(onChange: () => void): () => void {
  if (!supported()) return () => {};
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * Local replacement for Motion's `useReducedMotion`, which is `null` on the
 * server and the real preference on the client's first render. Components
 * that render different markup under reduced motion then failed to hydrate for
 * those users. This reads `false` on the server and during hydration, then
 * re-renders with the preference, so the first client render matches the HTML.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => supported() && window.matchMedia(QUERY).matches,
    () => false,
  );
}
