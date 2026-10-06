"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import type { GrowthEventName } from "@/content/growth-config";
import { trackGrowthEvent } from "@/lib/growth/track";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: GrowthEventName;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export function TrackedLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackGrowthEvent(eventName, eventParams);
    onClick?.(event);
  };

  return <a {...props} onClick={handleClick} />;
}
