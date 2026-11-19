/** A row of color tokens, each a swatch on both schemes. */
export function TokenSwatches({ names }: { names: string[] }) {
  return (
    <div className="not-prose my-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {names.map((name) => (
        <div
          key={name}
          className="overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="grid h-16 grid-cols-2">
            <div className="light" style={{ background: `var(--${name})` }} />
            <div className="dark" style={{ background: `var(--${name})` }} />
          </div>
          <div className="px-3 py-2 font-mono text-xs text-muted-foreground">
            --{name}
          </div>
        </div>
      ))}
    </div>
  );
}
