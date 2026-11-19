"use client";

import { Alert, AlertDescription, AlertTitle } from "@astrafoundry/design/ui";

export default function AlertTones() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert tone="info">
        <AlertTitle>Maintenance on Sunday</AlertTitle>
        <AlertDescription>Sync pauses from 02:00 to 02:30 UTC.</AlertDescription>
      </Alert>
      <Alert tone="success">
        <AlertTitle>Domain verified</AlertTitle>
        <AlertDescription>acme.dev now points to this workspace.</AlertDescription>
      </Alert>
      <Alert tone="danger">
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Update the card on file to keep your plan.</AlertDescription>
      </Alert>
    </div>
  );
}
