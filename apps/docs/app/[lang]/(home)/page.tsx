import { Backdrop } from "@astrafoundry/design/mock";
import { LinkButton } from "@astrafoundry/design/ui";
import { Showcase } from "@/components/home/showcase";
import type { DocsLang } from "@/components/lang";

const COPY = {
  zh: {
    title: "清晰，\u200b明快，\u200b精确。",
    lead: "Sunbeam 是 AstraFoundry 的设计系统：为高效交互而生，60 多个基于 Base UI 的组件，平面与浮起两种材质，一套快而有落点的动效。",
    start: "开始使用",
    components: "浏览组件",
    wall: "每一个都能用",
    wallLead: "下面不是截图。按一下、拖一下、打开菜单试试。",
    pillars: [
      ["墨色，一抹黄", "选中、开启、勾选都是墨色。黄色只给一屏中唯一的主操作。"],
      ["平面与浮起", "材质跟着层走：外框是平面，浮动层和其中的控件是浮起。"],
      ["快而有落点", "100ms 内回应；浮层从触发点用 spring 长出，离开更快。"],
      ["照片里的摩擦", "人文主义的质感来自印象派式的照片背景，UI 保持干净。"],
    ],
    caption: "照片，而不是渐变",
  },
  en: {
    title: "Clear, quick and precise.",
    lead: "Sunbeam is AstraFoundry's design system for fast interaction: over 60 components on Base UI, two materials, flat and raised, and quick motion that lands.",
    start: "Get started",
    components: "Browse components",
    wall: "Every one of them works",
    wallLead: "These are not pictures. Press, drag, open a menu.",
    pillars: [
      [
        "Ink, and one yellow",
        "Chosen, on and checked are ink. Yellow is for the one primary action on a screen.",
      ],
      [
        "Flat and raised",
        "Material follows the layer: chrome is flat; floating layers and their controls are raised.",
      ],
      [
        "Quick, and it lands",
        "Answers within 100ms; popups grow from their trigger on a spring and leave faster.",
      ],
      [
        "Friction in the photograph",
        "The humanist texture comes from impressionist photographs; the UI stays clean.",
      ],
    ],
    caption: "Photographs, not gradients",
  },
} as const;

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: DocsLang = raw === "en" ? "en" : "zh";
  const t = COPY[lang];
  return (
    <main className="flex flex-1 flex-col">
      <section className="px-4 pt-4 sm:px-6">
        <div className="relative mx-auto flex min-h-[32rem] max-w-6xl flex-col justify-between overflow-hidden rounded-continuous-3xl p-6 sm:p-10 lg:rounded-continuous-stage lg:p-14">
          <Backdrop id="gladiolus" priority />
          <div className="relative max-w-xl rounded-[22px] bg-substrate-focus p-6 text-substrate-focus-ink shadow-5 sm:p-8">
            <h1 className="font-display text-4xl tracking-tight text-balance break-keep sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-4 text-pretty text-substrate-focus-ink/70">{t.lead}</p>
            <div className="light mt-6 flex flex-wrap gap-2">
              <LinkButton href={`/${lang}/docs`}>{t.start}</LinkButton>
              <LinkButton href={`/${lang}/docs/components/button`} variant="secondary">
                {t.components}
              </LinkButton>
            </div>
          </div>
          <p className="relative mt-10 text-lg text-substrate-tint-muted">{t.caption}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl tracking-tight">{t.wall}</h2>
        <p className="mt-2 text-muted-foreground">{t.wallLead}</p>
        <div className="bg-dot-grid mt-8 rounded-continuous-3xl border border-border bg-canvas p-4 sm:p-6">
          <Showcase lang={lang} />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-px overflow-hidden rounded-continuous-3xl border border-border bg-border px-0 sm:grid-cols-2 lg:grid-cols-4 mb-20">
        {t.pillars.map(([title, text]) => (
          <div key={title} className="bg-card p-6">
            <h3 className="font-medium">{title}</h3>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
