import { findNeighbour } from "fumadocs-core/page-tree";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toLang } from "@/lib/lang";
import { getMDXComponents } from "@/components/mdx";
import { Prose } from "@/components/prose";
import { DocsToc, TocList } from "@/components/shell/toc";
import { UI } from "@/lib/i18n-ui";
import { source } from "@/lib/source";

type Params = Promise<{ lang: string; slug?: string[] }>;

export default async function Page({ params }: { params: Params }) {
  const { lang: raw, slug } = await params;
  const lang = toLang(raw);
  const t = UI[lang];
  const page = source.getPage(slug, lang);
  if (!page) notFound();
  const MDX = page.data.body;
  const toc = page.data.toc;
  const { previous, next } = findNeighbour(source.getPageTree(lang), page.url);
  const section = page.slugs[0] === "components" ? t.components : t.docs;

  return (
    <DocsToc toc={toc}>
      <div className="flex gap-10 px-5 py-10 sm:px-10 lg:py-14">
        <main id="content" className="mx-auto w-full min-w-0 max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">{section}</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-balance sm:text-[2.75rem]">
            {page.data.title}
          </h1>
          {page.data.description ? (
            <p className="mt-3 text-lg text-pretty text-muted-foreground">
              {page.data.description}
            </p>
          ) : null}
          <Prose className="mt-10">
            <MDX components={getMDXComponents()} />
          </Prose>
          <nav
            aria-label={`${t.previous} / ${t.next}`}
            className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
          >
            {[previous, next].map((item, index) =>
              item ? (
                <Link
                  key={item.url}
                  href={item.url}
                  className={
                    "group flex flex-col gap-1 rounded-continuous-2xl border border-border bg-card p-4 transition-colors duration-(--duration-press) hover:bg-flat-face focus-visible:outline-2 focus-visible:outline-ring " +
                    (index === 1 ? "items-end text-right sm:col-start-2" : "")
                  }
                >
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {index === 0 ? <ArrowLeft aria-hidden className="size-3.5" /> : null}
                    {index === 0 ? t.previous : t.next}
                    {index === 1 ? <ArrowRight aria-hidden className="size-3.5" /> : null}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ) : (
                <span key={index} />
              ),
            )}
          </nav>
        </main>
        <aside className="sticky top-24 hidden h-fit max-h-[calc(100dvh-8rem)] w-52 shrink-0 overflow-y-auto pl-3 xl:block">
          <TocList toc={toc} />
        </aside>
      </div>
    </DocsToc>
  );
}

export function generateStaticParams() {
  return source.generateParams("slug", "lang");
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}
