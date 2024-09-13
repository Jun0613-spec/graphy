"use client";

import { RefreshCw } from "lucide-react";
import { useTheme } from "next-themes";
import { FaCheck } from "react-icons/fa6";

import { cn } from "@/lib/utils";

import ActionTooltip from "./action-tooltip";

const Appearance = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex gap-5">
        <ActionTooltip label="Light" side="top">
          <button
            className={cn(
              "rounded-full h-12 w-12 bg-white border-neutral-500 border-2 flex items-center justify-center relative",
              theme === "light" && "border-emerald-500"
            )}
            onClick={() => setTheme("light")}
          >
            {theme === "light" && (
              <FaCheck className="text-emerald-500 absolute right-0 top-0" />
            )}
          </button>
        </ActionTooltip>
        <ActionTooltip label="Dark" side="top">
          <button
            className={cn(
              "rounded-full h-12 w-12 bg-black border-neutral-700 border-2 flex items-center justify-center relative",
              theme === "dark" && "border-emerald-500"
            )}
            onClick={() => setTheme("dark")}
          >
            {theme === "dark" && (
              <FaCheck className="text-emerald-500 absolute right-0 top-0" />
            )}
          </button>
        </ActionTooltip>
        <ActionTooltip label="System" side="top">
          <button
            className={cn(
              "rounded-full h-12 w-12 bg-black text-white border-2 flex items-center justify-center relative",
              theme === "system" && "border-emerald-500"
            )}
            onClick={() => setTheme("system")}
          >
            {theme === "system" && (
              <FaCheck className="text-emerald-400  absolute top-0 right-0" />
            )}
            <RefreshCw className="text-white" size={20} />
          </button>
        </ActionTooltip>
      </div>
    </>
  );
};

export default Appearance;
