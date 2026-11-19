"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  createContext,
  useContext,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";
import { buttonClasses, iconButtonClasses } from "./button-styles.js";
import { focusRing, popupClasses } from "./styles.js";

/* ------------------------------------------------------------------ Tabs */

export type TabsVariant = "segmented" | "underline";

const TabsVariantContext = createContext<TabsVariant>("underline");

/** Views of one thing, one shown at a time. */
export const Tabs = BaseTabs.Root;

export interface TabsListProps extends ComponentProps<typeof BaseTabs.List> {
  /**
   * `underline` (the default) for a page's sections, a flat strip with an
   * ink line under the chosen tab. `segmented` for a few views of one
   * panel: a recessed track whose chosen tab is its one raised face, every
   * tab as wide as the widest.
   */
  /**
   * The arrow keys show each tab as they reach it; on by default, since
   * Sunbeam's panels are quick to show. Turn it off for panels that load.
   */
  activateOnFocus?: boolean;
  variant?: TabsVariant;
}

export function TabsList({
  className,
  children,
  variant = "underline",
  activateOnFocus = true,
  ...rest
}: TabsListProps) {
  const segmented = variant === "segmented";
  return (
    <TabsVariantContext.Provider value={variant}>
      <BaseTabs.List
        className={cn(
          "relative z-0",
          segmented
            ? "material-well inline-grid shrink-0 auto-cols-fr grid-flow-col gap-1 rounded-full p-1"
            : "flex items-center gap-5 border-b border-border",
          className as string,
        )}
        activateOnFocus={activateOnFocus}
        {...rest}
      >
        {children}
        <BaseTabs.Indicator
          className={cn(
            "absolute left-0 -z-10 w-(--active-tab-width) translate-x-(--active-tab-left)",
            "transition-[translate,width] duration-(--duration-indicator) motion-reduce:transition-none",
            segmented
              ? "material-thumb top-1 h-8 rounded-full ease-spring"
              : "-bottom-px h-0.5 rounded-full bg-foreground ease-in-out",
          )}
        />
      </BaseTabs.List>
    </TabsVariantContext.Provider>
  );
}

export function Tab({ className, ...rest }: ComponentProps<typeof BaseTabs.Tab>) {
  const variant = useContext(TabsVariantContext);
  return (
    <BaseTabs.Tab
      className={cn(
        "inline-flex select-none items-center justify-center gap-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground",
        "transition-colors duration-(--duration-press) ease-out hover:text-foreground data-active:text-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4",
        variant === "segmented" ? "h-8 rounded-full px-3" : "h-10 rounded-sm",
        focusRing,
        className as string,
      )}
      {...rest}
    />
  );
}

export function TabPanel({ className, ...rest }: ComponentProps<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel
      className={cn(
        "pt-4 outline-none focus-visible:outline-2 focus-visible:outline-ring",
        className as string,
      )}
      {...rest}
    />
  );
}

/* ------------------------------------------------- Accordion, Collapsible */

/** Questions and answers, or sections, one open at a time unless `multiple`. */
export function Accordion({
  className,
  ...rest
}: ComponentProps<typeof BaseAccordion.Root>) {
  return (
    <BaseAccordion.Root
      className={cn("flex w-full flex-col", className as string)}
      {...rest}
    />
  );
}

export function AccordionItem({
  className,
  ...rest
}: ComponentProps<typeof BaseAccordion.Item>) {
  return (
    <BaseAccordion.Item
      className={cn("border-b border-border", className as string)}
      {...rest}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...rest
}: ComponentProps<typeof BaseAccordion.Trigger>) {
  return (
    <BaseAccordion.Header className="m-0">
      <BaseAccordion.Trigger
        className={cn(
          "group flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium text-foreground",
          focusRing,
          className as string,
        )}
        {...rest}
      >
        {children}
        <ChevronDown
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-(--duration-collapse) ease-in-out group-data-panel-open:rotate-180"
        />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

const panelMotion = cn(
  "overflow-hidden transition-[height,opacity] ease-in-out",
  "duration-(--duration-collapse) data-ending-style:duration-(--duration-collapse-exit)",
  "data-starting-style:opacity-0 data-ending-style:opacity-0",
);

export function AccordionPanel({
  className,
  children,
  ...rest
}: ComponentProps<typeof BaseAccordion.Panel>) {
  return (
    <BaseAccordion.Panel
      className={cn(
        panelMotion,
        "h-(--accordion-panel-height) data-starting-style:h-0 data-ending-style:h-0",
      )}
      {...rest}
    >
      <div
        className={cn(
          "pb-4 text-sm leading-relaxed text-muted-foreground",
          className as string,
        )}
      >
        {children}
      </div>
    </BaseAccordion.Panel>
  );
}

/** Shows and hides one region. */
export const Collapsible = BaseCollapsible.Root;

export function CollapsibleTrigger({
  className,
  ...rest
}: ComponentProps<typeof BaseCollapsible.Trigger>) {
  return (
    <BaseCollapsible.Trigger
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium",
        focusRing,
        className as string,
      )}
      {...rest}
    />
  );
}

export function CollapsiblePanel({
  className,
  ...rest
}: ComponentProps<typeof BaseCollapsible.Panel>) {
  return (
    <BaseCollapsible.Panel
      className={cn(
        panelMotion,
        "h-(--collapsible-panel-height) data-starting-style:h-0 data-ending-style:h-0",
        className as string,
      )}
      {...rest}
    />
  );
}

/* ------------------------------------------------------------ ScrollArea */

/** A scrolling region with thin overlay scrollbars that show while used. */
export function ScrollArea({
  className,
  children,
  ...rest
}: ComponentProps<typeof BaseScrollArea.Root>) {
  const bar = cn(
    "flex touch-none p-0.5 opacity-0 transition-opacity duration-(--duration-popup) select-none",
    "data-hovering:opacity-100 data-scrolling:opacity-100 data-scrolling:duration-0",
    "data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col",
  );
  return (
    <BaseScrollArea.Root
      className={cn("relative overflow-hidden", className as string)}
      {...rest}
    >
      <BaseScrollArea.Viewport className="size-full overscroll-contain rounded-[inherit] outline-none focus-visible:outline-2 focus-visible:outline-ring">
        {children}
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar orientation="vertical" className={bar}>
        <BaseScrollArea.Thumb className="w-full rounded-full bg-foreground/25" />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Scrollbar orientation="horizontal" className={bar}>
        <BaseScrollArea.Thumb className="h-full rounded-full bg-foreground/25" />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  );
}

/* ------------------------------------------------------------ Breadcrumb */

export interface BreadcrumbProps extends ComponentPropsWithoutRef<"nav"> {
  /** Names the trail, as "Breadcrumb". */
  label: string;
}

/** The path to the current page. */
export function Breadcrumb({ label, className, children, ...rest }: BreadcrumbProps) {
  return (
    <nav aria-label={label} className={className} {...rest}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {children}
      </ol>
    </nav>
  );
}

export function BreadcrumbItem({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"li">) {
  return (
    <li
      className={cn(
        "inline-flex items-center gap-1.5 [&:not(:first-child)]:before:content-['/'] before:text-faint",
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
}

export function BreadcrumbLink({ className, ...rest }: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "rounded-sm transition-colors hover:text-foreground",
        focusRing,
        className,
      )}
      {...rest}
    />
  );
}

export function BreadcrumbPage({ className, ...rest }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      aria-current="page"
      className={cn("font-medium text-foreground", className)}
      {...rest}
    />
  );
}

/* ------------------------------------------------------------ Pagination */

export interface PaginationProps extends Omit<
  ComponentPropsWithoutRef<"nav">,
  "children"
> {
  page: number;
  pageCount: number;
  /** The URL of a page. */
  href: (page: number) => string;
  labels: {
    nav: string;
    previous: string;
    next: string;
    page: (page: number) => string;
  };
  /** Pages shown either side of the current one; 1 by default. */
  siblings?: number;
}

/** The pages to show: first, last, the current one's neighbors, and gaps. */
export function paginationRange(page: number, pageCount: number, siblings = 1) {
  const pages: (number | "gap")[] = [];
  const from = Math.max(2, page - siblings);
  const to = Math.min(pageCount - 1, page + siblings);
  pages.push(1);
  if (from > 2) pages.push(from === 3 ? 2 : "gap");
  for (let p = from; p <= to; p++) pages.push(p);
  if (to < pageCount - 1) pages.push(to === pageCount - 2 ? pageCount - 1 : "gap");
  if (pageCount > 1) pages.push(pageCount);
  return pages;
}

/**
 * Pages of a list as links. The current page is a flat solid face; the
 * others have none until hovered. Every page button is the same width.
 */
export function Pagination({
  page,
  pageCount,
  href,
  labels,
  siblings = 1,
  className,
  ...rest
}: PaginationProps) {
  const pages = paginationRange(page, pageCount, siblings);
  const step = (target: number, label: string, icon: ReactNode) =>
    target < 1 || target > pageCount ? (
      <span aria-hidden className={iconButtonClasses("ghost", "sm", "opacity-40")}>
        {icon}
      </span>
    ) : (
      <a
        href={href(target)}
        aria-label={label}
        className={iconButtonClasses("ghost", "sm")}
      >
        {icon}
      </a>
    );
  return (
    <nav aria-label={labels.nav} className={className} {...rest}>
      <ul className="flex items-center gap-1">
        <li>{step(page - 1, labels.previous, <ChevronLeft aria-hidden />)}</li>
        {pages.map((p, index) => (
          <li key={p === "gap" ? `gap-${index}` : p}>
            {p === "gap" ? (
              <span
                aria-hidden
                className="inline-flex w-8 justify-center text-sm text-faint"
              >
                …
              </span>
            ) : (
              <a
                href={href(p)}
                aria-label={labels.page(p)}
                aria-current={p === page ? "page" : undefined}
                className={cn(
                  buttonClasses("ghost", "sm", "min-w-8 px-0 tabular-nums"),
                  "aria-[current=page]:material-thumb aria-[current=page]:text-foreground",
                )}
              >
                {p}
              </a>
            )}
          </li>
        ))}
        <li>{step(page + 1, labels.next, <ChevronRight aria-hidden />)}</li>
      </ul>
    </nav>
  );
}

/* -------------------------------------------------------- NavigationMenu */

/** A site's top navigation, whose headings open raised panels of links. */
export function NavigationMenu({
  className,
  children,
  ...rest
}: ComponentProps<typeof BaseNavigationMenu.Root>) {
  return (
    <BaseNavigationMenu.Root className={cn("relative", className as string)} {...rest}>
      <BaseNavigationMenu.List className="flex items-center gap-1">
        {children}
      </BaseNavigationMenu.List>
      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner
          className="z-50 h-(--positioner-height) w-(--positioner-width) transition-[top,left,right,bottom,width,height] duration-(--duration-popup) ease-out data-instant:transition-none"
          sideOffset={8}
          collisionPadding={16}
        >
          <BaseNavigationMenu.Popup
            data-material="raised"
            className={cn(
              popupClasses,
              "relative h-(--popup-height) w-(--popup-width) overflow-hidden rounded-continuous-[22px] p-0",
              "transition-[width,height,opacity,scale] duration-(--duration-popup)",
            )}
          >
            <BaseNavigationMenu.Viewport className="relative size-full overflow-hidden" />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  );
}

export const NavigationMenuItem = BaseNavigationMenu.Item;

export function NavigationMenuTrigger({
  className,
  children,
  ...rest
}: ComponentProps<typeof BaseNavigationMenu.Trigger>) {
  return (
    <BaseNavigationMenu.Trigger
      className={cn(
        buttonClasses(
          "ghost",
          "sm",
          "text-foreground data-popup-open:bg-flat-face-hover",
        ),
        className as string,
      )}
      {...rest}
    >
      {children}
      <BaseNavigationMenu.Icon className="flex transition-transform duration-(--duration-popup) data-popup-open:rotate-180">
        <ChevronDown aria-hidden className="size-3.5" />
      </BaseNavigationMenu.Icon>
    </BaseNavigationMenu.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...rest
}: ComponentProps<typeof BaseNavigationMenu.Content>) {
  return (
    <BaseNavigationMenu.Content
      className={cn(
        "w-max max-w-[min(40rem,calc(100vw-2rem))] p-2 transition-[opacity,translate] duration-(--duration-popup) ease-out",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        "data-[activation-direction=left]:data-starting-style:-translate-x-4 data-[activation-direction=right]:data-starting-style:translate-x-4",
        className as string,
      )}
      {...rest}
    />
  );
}

export function NavigationMenuLink({
  className,
  ...rest
}: ComponentProps<typeof BaseNavigationMenu.Link>) {
  return (
    <BaseNavigationMenu.Link
      className={cn(
        "block rounded-[14px] px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-flat-face-hover",
        focusRing,
        className as string,
      )}
      {...rest}
    />
  );
}

/* --------------------------------------------------------------- Sidebar */

/** A window's side navigation: flat chrome, grouped links, one current. */
export function Sidebar({ className, ...rest }: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      data-material="flat"
      className={cn(
        "flex h-full w-60 shrink-0 flex-col gap-5 overflow-y-auto p-3",
        className,
      )}
      {...rest}
    />
  );
}

export interface SidebarSectionProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "title"
> {
  title?: ReactNode;
}

export function SidebarSection({
  title,
  className,
  children,
  ...rest
}: SidebarSectionProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...rest}>
      {title ? (
        <div className="px-2.5 pb-1 text-xs font-medium text-muted-foreground">
          {title}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export interface SidebarItemProps extends ComponentPropsWithoutRef<"a"> {
  current?: boolean;
  icon?: ReactNode;
  /** A count or status at the row's end. */
  badge?: ReactNode;
}

/** A row; the current one is a flat solid face, as a chosen segment is. */
export function SidebarItem({
  current,
  icon,
  badge,
  className,
  children,
  ...rest
}: SidebarItemProps) {
  return (
    <a
      aria-current={current ? "page" : undefined}
      className={cn(
        "flex h-8 items-center gap-2.5 rounded-lg border border-transparent px-2.5 text-sm text-muted-foreground transition-colors",
        "hover:bg-flat-face-hover hover:text-foreground",
        "aria-[current=page]:material-thumb aria-[current=page]:font-medium aria-[current=page]:text-foreground",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        focusRing,
        className,
      )}
      {...rest}
    >
      {icon}
      <span className="truncate">{children}</span>
      {badge ? (
        <span className="ml-auto text-xs tabular-nums text-muted-foreground">
          {badge}
        </span>
      ) : null}
    </a>
  );
}
