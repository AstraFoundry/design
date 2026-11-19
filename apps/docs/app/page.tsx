import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sunbeam" };

/** A static site has no middleware: the root sends the reader to Chinese. */
export default function Root() {
  return (
    <html lang="zh-CN">
      <head>
        <meta httpEquiv="refresh" content="0; url=/zh/" />
        <link rel="canonical" href="/zh/" />
      </head>
      <body>
        <a href="/zh/">Sunbeam</a>
      </body>
    </html>
  );
}
