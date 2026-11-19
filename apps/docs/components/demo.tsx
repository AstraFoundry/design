import { readFile } from "node:fs/promises";
import path from "node:path";
import { highlight } from "fumadocs-core/highlight";
import { CodeBlock } from "./code-block";
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
      code={await highlight(source, {
        lang: "tsx",
        themes: { light: "github-light", dark: "github-dark-default" },
        defaultColor: false,
        components: { pre: (props) => <CodeBlock variant="flush" {...props} /> },
      })}
      {...rest}
    >
      <Component />
    </DemoFrame>
  );
}
