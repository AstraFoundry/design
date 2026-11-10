// @vitest-environment node
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  BackdropBuildError,
  focalCrop,
  readyEntries,
  WIDE_ASPECT,
} from "../scripts/build-backdrops.mjs";

const entry = (id: string, status: string) => ({
  id,
  status,
  source: `source/${id}.jpg`,
  focalPoint: { x: 0.5, y: 0.5 },
});

describe("readyEntries", () => {
  const root = mkdtempSync(path.join(tmpdir(), "backdrops-"));
  mkdirSync(path.join(root, "source"));
  writeFileSync(path.join(root, "source/present.jpg"), "");

  it("returns ready entries and skips pending ones without a source", () => {
    const manifest = {
      backdrops: [entry("present", "ready"), entry("later", "pending-source")],
    };
    expect(readyEntries(manifest, root).map((item: { id: string }) => item.id)).toEqual([
      "present",
    ]);
  });

  it("fails clearly when a ready entry has no original", () => {
    const manifest = { backdrops: [entry("absent", "ready")] };
    expect(() => readyEntries(manifest, root)).toThrow(BackdropBuildError);
    expect(() => readyEntries(manifest, root)).toThrow(
      /"absent" is ready but its original/,
    );
  });

  it("rejects duplicate ids and unknown statuses", () => {
    expect(() =>
      readyEntries(
        { backdrops: [entry("present", "ready"), entry("present", "ready")] },
        root,
      ),
    ).toThrow(/duplicate/);
    expect(() => readyEntries({ backdrops: [entry("present", "draft")] }, root)).toThrow(
      /unknown status/,
    );
  });
});

describe("focalCrop", () => {
  it("takes the full width of a portrait source, centered on the focal point", () => {
    const crop = focalCrop(2400, 3600, WIDE_ASPECT, { x: 0.5, y: 0.42 });
    expect(crop.width).toBe(2400);
    expect(crop.height).toBe(Math.round(2400 / WIDE_ASPECT));
    expect(crop.top).toBe(Math.round(0.42 * 3600 - crop.height / 2));
    expect(crop.focal.y).toBeCloseTo(0.5);
  });

  it("clamps to the edges and reports where the focal point lands", () => {
    const crop = focalCrop(3000, 1000, 1, { x: 0.95, y: 0.5 });
    expect(crop).toMatchObject({ left: 2000, top: 0, width: 1000, height: 1000 });
    expect(crop.focal.x).toBeCloseTo(0.85);
  });
});
