"use client";

import { Tab, TabPanel, Tabs, TabsList } from "@astrafoundry/design/ui";

export default function TabsUnderline() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList aria-label="Project">
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="settings">Settings</Tab>
      </TabsList>
      <TabPanel value="overview" className="text-sm text-muted-foreground">
        Twelve open tasks, three due this week.
      </TabPanel>
      <TabPanel value="activity" className="text-sm text-muted-foreground">
        Ada merged the onboarding copy an hour ago.
      </TabPanel>
      <TabPanel value="settings" className="text-sm text-muted-foreground">
        Visible to the whole workspace.
      </TabPanel>
    </Tabs>
  );
}
