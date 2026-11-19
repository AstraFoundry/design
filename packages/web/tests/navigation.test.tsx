import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  Pagination,
  ScrollArea,
  Sidebar,
  SidebarItem,
  SidebarSection,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from "../src/ui/index.js";

afterEach(cleanup);

describe("tabs", () => {
  it("moves between tabs with the arrows and shows the chosen panel", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="overview">
        <TabsList aria-label="Project">
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
        </TabsList>
        <TabPanel value="overview">Summary</TabPanel>
        <TabPanel value="activity">Recent changes</TabPanel>
      </Tabs>,
    );
    const overview = screen.getByRole("tab", { name: "Overview" });
    expect(overview.getAttribute("aria-selected")).toBe("true");
    await user.click(overview);
    await user.keyboard("{ArrowRight}");
    expect(
      screen.getByRole("tab", { name: "Activity" }).getAttribute("aria-selected"),
    ).toBe("true");
    expect(screen.getByRole("tabpanel").textContent).toBe("Recent changes");
  });

  it("segmented tabs sit in a well with equal widths; underline tabs are flat", () => {
    render(
      <>
        <Tabs defaultValue="a">
          <TabsList aria-label="Segmented" variant="segmented">
            <Tab value="a">A</Tab>
          </TabsList>
        </Tabs>
        <Tabs defaultValue="a">
          <TabsList aria-label="Underline" variant="underline">
            <Tab value="a">A</Tab>
          </TabsList>
        </Tabs>
      </>,
    );
    const segmented = screen.getByRole("tablist", { name: "Segmented" });
    expect(segmented.className).toContain("material-well");
    expect(segmented.className).toContain("auto-cols-fr");
    const thumb = segmented.querySelector(".material-thumb")!;
    // The raised thumb slides on the spring, like Segmented's and ToggleGroup's.
    expect(thumb.className).toContain("ease-spring");
    const underline = screen.getByRole("tablist", { name: "Underline" });
    expect(underline.className).not.toContain("material-well");
  });
});

describe("disclosure", () => {
  it("an accordion opens one item and closes the others", async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>What is Sunbeam?</AccordionTrigger>
          <AccordionPanel>A design system.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Who uses it?</AccordionTrigger>
          <AccordionPanel>AstraFoundry.</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );
    const first = screen.getByRole("button", { name: "What is Sunbeam?" });
    const second = screen.getByRole("button", { name: "Who uses it?" });
    await user.click(first);
    expect(first.getAttribute("aria-expanded")).toBe("true");
    await user.click(second);
    expect(second.getAttribute("aria-expanded")).toBe("true");
    expect(first.getAttribute("aria-expanded")).toBe("false");
  });

  it("a collapsible toggles its panel", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsiblePanel>More</CollapsiblePanel>
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "Details" });
    await user.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("More")).toBeTruthy();
  });
});

describe("navigation", () => {
  it("a breadcrumb marks the current page", () => {
    render(
      <Breadcrumb label="Breadcrumb">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    expect(screen.getByText("Settings").getAttribute("aria-current")).toBe("page");
  });

  it("pagination links each page and marks the current one", () => {
    render(
      <Pagination
        page={4}
        pageCount={10}
        href={(page) => `/posts?page=${page}`}
        labels={{
          nav: "Pages",
          previous: "Previous page",
          next: "Next page",
          page: (n) => `Page ${n}`,
        }}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Pages" })).toBeTruthy();
    const current = screen.getByRole("link", { name: "Page 4" });
    expect(current.getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("link", { name: "Next page" }).getAttribute("href")).toBe(
      "/posts?page=5",
    );
    // The first, the last and the neighbors show; the rest fold into an ellipsis.
    expect(screen.getByRole("link", { name: "Page 1" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Page 10" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Page 7" })).toBeNull();
  });

  it("a navigation menu opens its content in a raised layer", async () => {
    const user = userEvent.setup();
    render(
      <NavigationMenu aria-label="Main">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/lyra">Lyra</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Products" }));
    const link = await screen.findByRole("link", { name: "Lyra" });
    expect(link.closest("[data-material]")?.getAttribute("data-material")).toBe("raised");
  });

  it("a sidebar is flat chrome whose current item is marked", () => {
    render(
      <Sidebar aria-label="Workspace">
        <SidebarSection title="Projects">
          <SidebarItem href="/a" current>
            Atlas
          </SidebarItem>
          <SidebarItem href="/b">Beacon</SidebarItem>
        </SidebarSection>
      </Sidebar>,
    );
    const nav = screen.getByRole("navigation", { name: "Workspace" });
    expect(nav.getAttribute("data-material")).toBe("flat");
    expect(screen.getByRole("link", { name: "Atlas" }).getAttribute("aria-current")).toBe(
      "page",
    );
  });

  it("a sidebar item and a breadcrumb link render through the app's own link", () => {
    function AppLink(props: React.ComponentProps<"a">) {
      return <a data-router="yes" {...props} />;
    }
    render(
      <>
        <Sidebar aria-label="Nav">
          <SidebarItem href="/a" current render={<AppLink />}>
            Atlas
          </SidebarItem>
        </Sidebar>
        <Breadcrumb label="Trail">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" render={<AppLink />}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </>,
    );
    const atlas = screen.getByRole("link", { name: "Atlas" });
    expect(atlas.getAttribute("data-router")).toBe("yes");
    expect(atlas.getAttribute("aria-current")).toBe("page");
    expect(atlas.className).toContain("aria-[current=page]:material-thumb");
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("data-router")).toBe(
      "yes",
    );
  });

  it("a sidebar section title reads as a heading, not as another row", () => {
    render(
      <Sidebar aria-label="Nav">
        <SidebarSection title="Projects">
          <SidebarItem href="/a">Atlas</SidebarItem>
        </SidebarSection>
      </Sidebar>,
    );
    const title = screen.getByText("Projects");
    const row = screen.getByRole("link", { name: "Atlas" });
    // Ink and semibold, where rows are muted and regular.
    expect(title.className).toContain("text-foreground");
    expect(title.className).toContain("font-semibold");
    expect(row.className).toContain("text-muted-foreground");
    expect(row.className).not.toContain("font-semibold");
    // Sections stand apart from one another.
    expect(title.closest("nav")!.className).toContain("gap-5");
  });

  it("a scroll area's bars float over the content and show only while used", () => {
    render(
      <ScrollArea className="h-20" viewportClassName="max-h-20" data-testid="area">
        <p>Long content</p>
      </ScrollArea>,
    );
    const area = screen.getByTestId("area");
    const viewport = screen.getByText("Long content").parentElement!;
    expect(viewport.className).toContain("max-h-20");
    // No native bars: Sunbeam draws its own thin ones over the content.
    expect(viewport.className).toContain("scrollbar-hide");
    const bars = area.querySelectorAll("[data-orientation]");
    for (const bar of bars) {
      expect(bar.className).toContain("absolute");
      expect(bar.className).toContain("opacity-0");
      expect(bar.className).toContain("data-scrolling:opacity-100");
    }
  });

  it("a scroll area wraps its content", () => {
    render(
      <ScrollArea className="h-20">
        <p>Long content</p>
      </ScrollArea>,
    );
    expect(screen.getByText("Long content")).toBeTruthy();
  });
});
