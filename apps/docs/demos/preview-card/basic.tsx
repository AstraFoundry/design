"use client";

import {
  Avatar,
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@astrafoundry/design/ui";

export default function PreviewCardBasic() {
  return (
    <p className="text-sm text-muted-foreground">
      Reviewed by{" "}
      <PreviewCard>
        <PreviewCardTrigger href="#ada">Ada Lovelace</PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex gap-3">
            <Avatar name="Ada Lovelace" size="lg" />
            <div>
              <p className="text-sm font-medium text-foreground">Ada Lovelace</p>
              <p className="text-sm text-muted-foreground">Design engineer · Lyra</p>
            </div>
          </div>
        </PreviewCardPopup>
      </PreviewCard>{" "}
      yesterday.
    </p>
  );
}
