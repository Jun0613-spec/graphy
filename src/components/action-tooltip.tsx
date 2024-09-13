"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionTooltipProps {
  children: React.ReactNode;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  delay?: number;
}

const ActionTooltip = ({
  children,
  label,
  side,
  delay,
}: ActionTooltipProps) => (
  <TooltipProvider>
    <Tooltip delayDuration={delay ?? 25}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>
        <p className="font-semibold text-sm">{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default ActionTooltip;
