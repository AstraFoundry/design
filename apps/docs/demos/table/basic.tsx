"use client";

import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@astrafoundry/design/ui";

const deploys = [
  { name: "atlas-web", region: "Frankfurt", time: "1m 12s", status: "success" },
  { name: "atlas-api", region: "Singapore", time: "2m 40s", status: "success" },
  { name: "beacon", region: "Tokyo", time: "0m 58s", status: "danger" },
] as const;

export default function TableBasic() {
  return (
    <Card className="w-full max-w-xl p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Region</TableHead>
            <TableHead align="end">Build</TableHead>
            <TableHead align="end">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deploys.map((d) => (
            <TableRow key={d.name}>
              <TableCell className="font-medium">{d.name}</TableCell>
              <TableCell className="text-muted-foreground">{d.region}</TableCell>
              <TableCell align="end">{d.time}</TableCell>
              <TableCell align="end">
                <Badge tone={d.status}>
                  {d.status === "success" ? "Ready" : "Failed"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
