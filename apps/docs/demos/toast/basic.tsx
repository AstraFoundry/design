"use client";

import { Button, ToastProvider, useToast } from "@astrafoundry/design/ui";

function Actions() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        onClick={() =>
          toast.add({
            title: "Saved",
            description: "All changes are synced.",
            type: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.add({
            title: "Couldn't sync",
            description: "Check your connection and try again.",
            type: "danger",
          })
        }
      >
        Failure
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1800)), {
            loading: { title: "Exporting…" },
            success: { title: "Export ready", description: "atlas.zip, 4.2 MB" },
            error: { title: "Export failed" },
          })
        }
      >
        Promise
      </Button>
    </div>
  );
}

export default function ToastBasic() {
  return (
    <ToastProvider closeLabel="Dismiss">
      <Actions />
    </ToastProvider>
  );
}
