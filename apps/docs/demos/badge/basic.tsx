"use client";

import { Badge } from "@astrafoundry/design/ui";

export default function BadgeBasic() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Draft</Badge>
      <Badge variant="outline">Beta</Badge>
      <Badge tone="success">Live</Badge>
      <Badge tone="danger">Failed</Badge>
      <Badge tone="info" variant="outline">
        Syncing
      </Badge>
      <Badge className="tabular-nums">12</Badge>
    </div>
  );
}
