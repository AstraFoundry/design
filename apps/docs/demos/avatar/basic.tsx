"use client";

import { Avatar, AvatarGroup } from "@astrafoundry/design/ui";

const team = ["Ada Lovelace", "Grace Hopper", "Alan Turing", "Katherine Johnson"];

export default function AvatarBasic() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <Avatar name="Ada Lovelace" size="sm" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Alan Turing" size="lg" />
      </div>
      <AvatarGroup
        label="Reviewers"
        style={{ ["--avatar-cutout" as string]: "var(--canvas)" }}
      >
        {team.map((name) => (
          <Avatar key={name} name={name} />
        ))}
      </AvatarGroup>
    </div>
  );
}
