import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";

export const display = Fraunces({ subsets: ["latin"], variable: "--font-latin-display" });
export const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-latin-sans",
});
export const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-latin-mono" });
