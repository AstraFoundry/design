import type { ReactNode } from "react";
import { DocsHeader } from "@/components/shell/header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocsHeader />
      {children}
    </>
  );
}
