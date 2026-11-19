"use client";

import { Tab, TabPanel, Tabs, TabsList } from "@astrafoundry/design/ui";

export default function TabsSegmented() {
  return (
    <Tabs defaultValue="preview" className="flex flex-col items-center">
      <TabsList aria-label="View" variant="segmented">
        <Tab value="preview">Preview</Tab>
        <Tab value="code">Code</Tab>
        <Tab value="history">History</Tab>
      </TabsList>
      <TabPanel value="preview" className="text-sm text-muted-foreground">
        The rendered page.
      </TabPanel>
      <TabPanel value="code" className="text-sm text-muted-foreground">
        The page's source.
      </TabPanel>
      <TabPanel value="history" className="text-sm text-muted-foreground">
        Eight versions.
      </TabPanel>
    </Tabs>
  );
}
