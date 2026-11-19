"use client";

import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardTitle,
  Meter,
} from "@astrafoundry/design/ui";

export default function CardBasic() {
  return (
    <Card className="w-full max-w-sm">
      <div className="flex items-start justify-between">
        <div>
          <CardTitle>Storage</CardTitle>
          <CardDescription>7.2 GB of 10 GB used</CardDescription>
        </div>
        <Badge tone="success">Healthy</Badge>
      </div>
      <Meter className="mt-5" value={72} aria-label="Storage used" />
      <Button variant="secondary" size="sm" className="mt-5">
        Manage storage
      </Button>
    </Card>
  );
}
