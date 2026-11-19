import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  // The design package ships TypeScript sources; Next compiles them.
  transpilePackages: ["@astrafoundry/design"],
  experimental: {
    // The package's sources import siblings as `./x.js` (NodeNext style);
    // let webpack find the `.ts`/`.tsx` file behind each.
    extensionAlias: { ".js": [".tsx", ".ts", ".js"] },
  },
};

export default withMDX(config);
