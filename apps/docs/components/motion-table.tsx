import sunbeam from "@astrafoundry/design/tokens/sunbeam.json";

const motion = (sunbeam as unknown as { motion: Record<string, string> }).motion;

/**
 * Motion of one component: `rows` is a list of
 * [moment, duration token, curve, what moves].
 */
export function MotionTable({
  rows,
  head = ["Moment", "Duration", "Curve", "Moves"],
}: {
  rows: [string, string, string, string][];
  head?: [string, string, string, string];
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-flat-face text-left text-xs text-muted-foreground">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([moment, token, curve, moves]) => (
            <tr key={moment} className="border-t border-border">
              <td className="px-4 py-2.5 text-foreground">{moment}</td>
              <td className="px-4 py-2.5 font-mono text-xs tabular-nums">
                {motion[token] ?? token}
                <span className="ml-2 text-muted-foreground">--duration-{token}</span>
              </td>
              <td className="px-4 py-2.5 font-mono text-xs">--ease-{curve}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{moves}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
