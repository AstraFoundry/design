"use client";

import { Avatar } from "@astrafoundry/design/ui";

export default function AvatarBasic() {
  return (
    <div className="flex items-center gap-3">
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Grace Hopper" />
      <Avatar name="Alan Turing" size="lg" />
      <div className="flex -space-x-2">
        {["Ada Lovelace", "Grace Hopper", "Alan Turing", "Katherine Johnson"].map(
          (name) => (
            <Avatar key={name} name={name} className="ring-2 ring-card" />
          ),
        )}
      </div>
    </div>
  );
}
