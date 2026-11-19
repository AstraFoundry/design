"use client";

import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@astrafoundry/design/ui";

const tags = ["design", "deploy", "docs", "dashboard", "data", "debug"];

export default function AutocompleteBasic() {
  return (
    <Autocomplete items={tags}>
      <AutocompleteInput aria-label="Tag" placeholder="Add a tag" className="w-64" />
      <AutocompletePopup empty="No matching tag">
        <AutocompleteList>
          {(tag: string) => (
            <AutocompleteItem key={tag} value={tag}>
              {tag}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  );
}
