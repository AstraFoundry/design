import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Demo } from "./demo";
import { DoDont } from "./do-dont";
import { KeyTable } from "./key-table";
import { MotionTable } from "./motion-table";
import { TokenSwatches } from "./token-swatches";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Demo,
    DoDont,
    KeyTable,
    MotionTable,
    Step,
    Steps,
    Tab,
    Tabs,
    TokenSwatches,
    TypeTable,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
