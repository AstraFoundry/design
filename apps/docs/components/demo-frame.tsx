"use client";

import {
  IconButton,
  Panel,
  Segmented,
  Tooltip,
  TooltipProvider,
} from "@astrafoundry/design/ui";
import { Layers, Moon, RotateCcw, Square, Sun } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { CodeActions, CodeBlock } from "./code-block";
import { useDocsLang } from "./lang";

const WrapContext = createContext(false);

/** The code view of a demo: flush in its card, wrapped as its toolbar says. */
export function DemoCode(props: ComponentProps<"pre">) {
  return (
    <CodeBlock variant="flush" actions="none" wrap={useContext(WrapContext)} {...props} />
  );
}

const COPY = {
  zh: {
    view: "视图",
    preview: "预览",
    code: "代码",
    material: "材质",
    flat: "平面",
    raised: "浮起",
    dark: "在暗色中预览",
    light: "在亮色中预览",
    replay: "重新播放",
  },
  en: {
    view: "View",
    preview: "Preview",
    code: "Code",
    material: "Material",
    flat: "Flat",
    raised: "Raised",
    dark: "Preview in dark",
    light: "Preview in light",
    replay: "Replay",
  },
} as const;

export interface DemoFrameProps {
  children: ReactNode;
  /** The highlighted source, rendered on the server. */
  code: ReactNode;
  /** The plain source, for the copy button. */
  source: string;
  /** Show a replay button: the demo plays something when it appears. */
  replay?: boolean;
  /** Show a flat/raised switch: the demo is set on the page or in a Panel. */
  material?: boolean;
  /** Which material to start with. */
  defaultMaterial?: "flat" | "raised";
  /** Center the demo, or start it at the top left. */
  align?: "center" | "start";
  /** Minimum height of the stage, in px. */
  height?: number;
}

/**
 * A live demo: the stage, a toolbar to switch to the code, flip the stage
 * to the other scheme, set it in a raised panel, and replay it.
 */
export function DemoFrame({
  children,
  code,
  source,
  replay = false,
  material = false,
  defaultMaterial = "flat",
  align = "center",
  height = 240,
}: DemoFrameProps) {
  const lang = useDocsLang();
  const t = COPY[lang];
  const [view, setView] = useState<"preview" | "code">("preview");
  const [dark, setDark] = useState<boolean | null>(null);
  const [layer, setLayer] = useState(defaultMaterial);
  const [key, setKey] = useState(0);
  const [wrap, setWrap] = useState(false);

  // The page's scheme, read on the client; the stage can show the other one.
  const [pageDark, setPageDark] = useState(false);
  useEffect(() => {
    const read = () => setPageDark(document.documentElement.classList.contains("dark"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  const showsDark = dark ?? pageDark;
  const scheme = dark === null ? undefined : dark ? "dark" : "light";
  const stage = (
    <div
      key={key}
      className={
        align === "center"
          ? "flex flex-wrap items-center justify-center gap-4"
          : "flex flex-col items-start gap-4"
      }
    >
      {children}
    </div>
  );

  return (
    <TooltipProvider>
      <div className="not-prose my-6 overflow-hidden rounded-continuous-3xl border border-border bg-card">
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
          <Segmented
            label={t.view}
            value={view}
            onValueChange={setView}
            options={[
              { value: "preview", label: t.preview },
              { value: "code", label: t.code },
            ]}
          />
          <div className="flex items-center gap-1">
            {view === "code" ? (
              <CodeActions wrap={wrap} onWrapChange={setWrap} getText={() => source} />
            ) : (
              <>
                {material ? (
                  <Segmented
                    label={t.material}
                    value={layer}
                    onValueChange={setLayer}
                    iconOnly
                    options={[
                      { value: "flat", label: t.flat, icon: <Square aria-hidden /> },
                      { value: "raised", label: t.raised, icon: <Layers aria-hidden /> },
                    ]}
                  />
                ) : null}
                {replay ? (
                  <Tooltip content={t.replay}>
                    <IconButton
                      label={t.replay}
                      variant="ghost"
                      size="sm"
                      onClick={() => setKey((k) => k + 1)}
                    >
                      <RotateCcw aria-hidden />
                    </IconButton>
                  </Tooltip>
                ) : null}
                <Tooltip content={showsDark ? t.light : t.dark}>
                  <IconButton
                    label={showsDark ? t.light : t.dark}
                    variant="ghost"
                    size="sm"
                    aria-pressed={dark !== null}
                    className="aria-pressed:bg-flat-face-pressed aria-pressed:text-foreground"
                    onClick={() => setDark(!showsDark)}
                  >
                    {showsDark ? <Sun aria-hidden /> : <Moon aria-hidden />}
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
        </div>
        {view === "preview" ? (
          <div
            className={`${scheme ?? ""} bg-dot-grid flex items-center justify-center bg-canvas p-8 text-foreground`}
            style={{ minHeight: height }}
          >
            {material && layer === "raised" ? (
              <Panel className="w-full max-w-xl p-5">{stage}</Panel>
            ) : (
              <div className="w-full">{stage}</div>
            )}
          </div>
        ) : (
          <WrapContext.Provider value={wrap}>{code}</WrapContext.Provider>
        )}
      </div>
    </TooltipProvider>
  );
}
