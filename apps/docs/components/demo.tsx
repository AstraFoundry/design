import { readFile } from "node:fs/promises";
import path from "node:path";
import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc";
import { demos } from "@/demos";
import { DemoFrame, type DemoFrameProps } from "./demo-frame";

export interface DemoProps extends Omit<DemoFrameProps, "children" | "code"> {
  /** The demo's path under demos/, without the extension, as "button/variants". */
  name: keyof typeof demos;
}

/** A live demo and its source, read from demos/<name>.tsx at build time. */
export async function Demo({ name, ...rest }: DemoProps) {
  const Component = demos[name];
  if (!Component) throw new Error(`Demo "${name}" is not registered in demos/index.ts`);
  const file = path.join(process.cwd(), "demos", `${name}.tsx`);
  const source = (await readFile(file, "utf8")).trim();
  return (
    <DemoFrame
      code={<ServerCodeBlock lang="tsx" code={source} codeblock={{ allowCopy: true }} />}
      {...rest}
    >
      <Component />
    </DemoFrame>
  );
}
