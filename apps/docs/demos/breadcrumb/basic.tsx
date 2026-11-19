"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@astrafoundry/design/ui";

export default function BreadcrumbBasic() {
  return (
    <Breadcrumb label="Breadcrumb">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Atlas</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage>Settings</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
