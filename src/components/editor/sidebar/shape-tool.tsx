import { LucideIcon } from "lucide-react";
import React from "react";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

interface ShapeToolProps {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
}

const ShapeTool = ({ onClick, icon: Icon, iconClassName }: ShapeToolProps) => {
  return (
    <button
      onClick={onClick}
      className="aspect-square border rounded-md p-5 bg-slate-100 hover:opacity-70 dark:bg-slate-500 dark:hover:opacity-70"
    >
      <Icon className={cn("h-full w-full text-black", iconClassName)} />
    </button>
  );
};

export default ShapeTool;
