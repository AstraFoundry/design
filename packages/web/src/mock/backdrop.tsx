import type { CSSProperties } from "react";
import { cn } from "../lib/cn.js";
import { backdropImages } from "./backdrops.generated.js";

export type BackdropId = keyof typeof backdropImages;

/** Viewports that get the portrait crop instead of the wide one. */
export const BACKDROP_TALL_MEDIA = "(max-width: 767px) and (orientation: portrait)";

export interface BackdropProps {
  id: BackdropId;
  /** Public URL prefix the site serves `assets:build` output from. */
  basePath?: string;
  /** `sizes` for the wide crop. Defaults to the full viewport width. */
  sizes?: string;
  /** Above-the-fold backdrops load eagerly with high fetch priority. */
  priority?: boolean;
  className?: string;
}

/**
 * A soft photograph behind mock UI. Decorative: hidden from assistive
 * technology. Shows the dominant color and a blurred placeholder until the
 * AVIF/WebP crop for the viewport has loaded. Fills its positioned parent.
 */
export function Backdrop({
  id,
  basePath = "/backdrops",
  sizes = "100vw",
  priority = false,
  className,
}: BackdropProps) {
  const image = backdropImages[id];
  if (!image)
    throw new Error(`Backdrop: unknown backdrop "${String(id)}". Run assets:build.`);

  const url = (name: string) => `${basePath}/${id}/${name}`;
  const wideSet = (format: "avif" | "webp") =>
    image.wide
      .map((size) => `${url(`wide-${size.width}.${format}`)} ${size.width}w`)
      .join(", ");
  const tall = `tall-${image.tall.width}`;
  const [fallback] = image.wide;

  const style: CSSProperties = {
    backgroundColor: image.color,
    backgroundImage: `url(${image.placeholder})`,
    backgroundPosition: image.position,
    backgroundSize: "cover",
  };

  return (
    <div
      aria-hidden="true"
      data-backdrop={id}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={style}
    >
      <picture>
        <source
          type="image/avif"
          media={BACKDROP_TALL_MEDIA}
          srcSet={url(`${tall}.avif`)}
        />
        <source
          type="image/webp"
          media={BACKDROP_TALL_MEDIA}
          srcSet={url(`${tall}.webp`)}
        />
        <source type="image/avif" srcSet={wideSet("avif")} sizes={sizes} />
        <source type="image/webp" srcSet={wideSet("webp")} sizes={sizes} />
        <img
          src={url(`wide-${fallback.width}.webp`)}
          alt=""
          width={fallback.width}
          height={fallback.height}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          draggable={false}
          className="size-full object-cover"
          style={{ objectPosition: image.position }}
        />
      </picture>
    </div>
  );
}
