"use client";

import { Sidebar, SidebarItem, SidebarSection } from "@astrafoundry/design/ui";
import { Folder, Home, Inbox, Settings } from "lucide-react";

export default function SidebarBasic() {
  return (
    <div className="h-80 overflow-hidden rounded-2xl border border-border bg-background">
      <Sidebar aria-label="Workspace">
        <SidebarSection>
          <SidebarItem href="#" icon={<Home aria-hidden />} current>
            Home
          </SidebarItem>
          <SidebarItem href="#" icon={<Inbox aria-hidden />} badge="4">
            Inbox
          </SidebarItem>
        </SidebarSection>
        <SidebarSection title="Projects">
          <SidebarItem href="#" icon={<Folder aria-hidden />}>
            Atlas
          </SidebarItem>
          <SidebarItem href="#" icon={<Folder aria-hidden />}>
            Beacon
          </SidebarItem>
        </SidebarSection>
        <SidebarSection className="mt-auto">
          <SidebarItem href="#" icon={<Settings aria-hidden />}>
            Settings
          </SidebarItem>
        </SidebarSection>
      </Sidebar>
    </div>
  );
}
