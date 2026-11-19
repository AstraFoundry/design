import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";
import { CodeBlock } from "./code-block";
import { Demo } from "./demo";
import { DoDont } from "./do-dont";
import { KeyTable } from "./key-table";
import { Callout, MdxTable, Step, Steps, TypeTable } from "./mdx-parts";
import { MotionTable } from "./motion-table";
import { TokenSwatches } from "./token-swatches";

function Heading({
  as: Tag,
  id,
  children,
  ...rest
}: ComponentProps<"h2"> & { as: "h2" | "h3" }) {
  return (
    <Tag id={id} className="group" {...rest}>
      {children}
      {id ? (
        <a
          href={`#${id}`}
          aria-hidden
          tabIndex={-1}
          className="ml-2 font-normal text-faint no-underline opacity-0 transition-opacity group-hover:opacity-100"
        >
          #
        </a>
      ) : null}
    </Tag>
  );
}

function A({ href = "", ...rest }: ComponentProps<"a">) {
  return href.startsWith("/") || href.startsWith("#") || href.startsWith(".") ? (
    <Link href={href} {...rest} />
  ) : (
    <a href={href} target="_blank" rel="noreferrer" {...rest} />
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    h2: (props: ComponentProps<"h2">) => <Heading as="h2" {...props} />,
    h3: (props: ComponentProps<"h3">) => <Heading as="h3" {...props} />,
    a: A,
    pre: CodeBlock,
    table: MdxTable,
    Callout,
    Demo,
    DoDont,
    KeyTable,
    MotionTable,
    Step,
    Steps,
    TokenSwatches,
    TypeTable,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
