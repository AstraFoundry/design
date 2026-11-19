"use client";

import { ThinkingShimmer } from "@astrafoundry/design/beui/agents/loading-states";
import { TextShimmer } from "@astrafoundry/design/beui/motion/text-shimmer";

export default function AgentDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <ThinkingShimmer>Thinking</ThinkingShimmer>
      <TextShimmer className="text-sm">Reading 12 files…</TextShimmer>
    </div>
  );
}
