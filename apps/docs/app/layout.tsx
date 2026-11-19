import type { ReactNode } from "react";
import "./global.css";

/** The language layouts below render <html>; this only loads the styles. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
