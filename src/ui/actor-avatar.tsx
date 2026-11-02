import { cn } from "../lib/cn.js";

export type ActorKind = "person" | "agent";

export interface ActorAvatarProps {
  name: string;
  kind: ActorKind;
  size?: "sm" | "md";
  className?: string;
}

const SIZE = {
  sm: "size-6 text-[12px]",
  md: "size-8 text-sm",
} as const;

/**
 * People are round, agents are rounded squares with the Sunbeam accent, so
 * the two read apart at a glance.
 */
export function ActorAvatar({ name, kind, size = "md", className }: ActorAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center font-medium select-none",
        kind === "agent"
          ? "rounded-md bg-accent text-accent-foreground"
          : "rounded-full bg-secondary text-secondary-foreground",
        SIZE[size],
        className,
      )}
    >
      {name.charAt(0)}
    </span>
  );
}
