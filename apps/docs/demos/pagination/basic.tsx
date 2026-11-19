"use client";

import { Pagination } from "@astrafoundry/design/ui";

export default function PaginationBasic() {
  return (
    <Pagination
      page={6}
      pageCount={20}
      href={(page) => `#page-${page}`}
      labels={{
        nav: "Pages",
        previous: "Previous page",
        next: "Next page",
        page: (page) => `Page ${page}`,
      }}
    />
  );
}
