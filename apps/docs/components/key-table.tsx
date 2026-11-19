import { Kbd } from "@astrafoundry/design/ui";

/** Keys and what they do: `rows` is a list of [keys, action]. */
export function KeyTable({
  rows,
  keyLabel = "Key",
  actionLabel = "Action",
}: {
  rows: [string, string][];
  keyLabel?: string;
  actionLabel?: string;
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-flat-face text-left text-xs text-muted-foreground">
          <tr>
            <th className="w-48 px-4 py-2 font-medium">{keyLabel}</th>
            <th className="px-4 py-2 font-medium">{actionLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([keys, action]) => (
            <tr key={keys} className="border-t border-border">
              <td className="px-4 py-2.5">
                <span className="flex flex-wrap gap-1">
                  {keys.split(" ").map((k) => (
                    <Kbd key={k}>{k}</Kbd>
                  ))}
                </span>
              </td>
              <td className="px-4 py-2.5 text-foreground">{action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
