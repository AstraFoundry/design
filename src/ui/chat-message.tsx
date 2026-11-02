"use client";

import type { ReactNode } from "react";
import {
  Message,
  MessageBubble,
  MessageBubbleContent,
  MessageContent,
  MessageHeader,
} from "../beui/components/agents/message.js";
import { ActorAvatar, type ActorKind } from "./actor-avatar.js";

export interface ChatMessageProps {
  name: string;
  kind: ActorKind;
  /** Agent role shown next to the name. */
  role?: string;
  /** Messages from the viewer align to the end. */
  own?: boolean;
  animateIn?: boolean;
  children?: ReactNode;
  /** Content rendered under the bubble (activity, plans, tool output). */
  after?: ReactNode;
}

/**
 * One conversation row for product demos, built on beUI's message primitives:
 * avatar, name and role, then a bubble that pops in from its own side.
 */
export function ChatMessage({
  name,
  kind,
  role,
  own = false,
  animateIn = true,
  children,
  after,
}: ChatMessageProps) {
  return (
    <Message from={own ? "user" : "assistant"} animateIn={animateIn} aria-label={name}>
      {own ? null : <ActorAvatar name={name} kind={kind} size="sm" className="mt-5" />}
      <MessageContent>
        {own ? null : (
          <MessageHeader className="text-xs">
            <span className="font-medium text-foreground">{name}</span>
            {role ? <span>{role}</span> : null}
          </MessageHeader>
        )}
        {children ? (
          <MessageBubble variant={own ? "solid" : "soft"} animateIn={animateIn}>
            <MessageBubbleContent className="max-w-[92%]">
              {children}
            </MessageBubbleContent>
          </MessageBubble>
        ) : null}
        {after ? <div className="w-full max-w-[92%]">{after}</div> : null}
      </MessageContent>
    </Message>
  );
}
