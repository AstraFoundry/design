import { readFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BackdropCard } from "../src/mock/backdrop-card.js";

function render(guides = false) {
  const host = document.createElement("div");
  host.innerHTML = renderToStaticMarkup(
    <BackdropCard
      backdrop="gladiolus"
      wordmarkAs="h1"
      wordmark="Sunbeam"
      mark={<span data-mark />}
      before={{ title: "Token", detail: "--yellow-500" }}
      focus="Focus"
      after={{ title: "Skill" }}
      status="Applied"
      caption="Caption"
      guides={guides}
    />,
  );
  return host;
}

describe("BackdropCard", () => {
  it("keeps the wordmark and caption as real text", () => {
    const host = render();
    expect(host.querySelector("h1")?.textContent).toBe("Sunbeam");
    expect(host.querySelector("p:last-of-type")?.textContent).toBe("Caption");
  });

  it("hides the decorative focus row from assistive technology", () => {
    const row = render().querySelector("[inert]");
    expect(row?.getAttribute("aria-hidden")).toBe("true");
    expect(row?.textContent).toContain("Focus");
    expect(row?.textContent).toContain("Applied");
  });

  it("draws the four numbered zones only with guides", () => {
    const zones = (host: HTMLElement) =>
      [...host.querySelectorAll("span.font-mono")].map((zone) => zone.textContent);
    expect(zones(render())).toEqual([]);
    expect(zones(render(true)).sort()).toEqual(["1", "2", "3", "4"]);
  });
});

describe("Sunbeam skill", () => {
  const skill = readFileSync(path.join(__dirname, "../skills/sunbeam/SKILL.md"), "utf8");

  it("has skill frontmatter", () => {
    expect(skill).toMatch(/^---\nname: sunbeam\ndescription: .+\n---\n/);
  });

  it("carries the generated token tables", () => {
    expect(skill).toContain("| `--yellow-500`");
    expect(skill).toContain("| `--art-panel`");
  });
});
