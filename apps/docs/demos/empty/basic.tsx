"use client";

import { Button, Empty } from "@astrafoundry/design/ui";
import { FolderPlus } from "lucide-react";

export default function EmptyBasic() {
  return (
    <Empty
      icon={<FolderPlus aria-hidden />}
      title="Projects will show up here"
      description="Projects keep a team's documents, boards and agents together."
      action={<Button>New project</Button>}
    />
  );
}
