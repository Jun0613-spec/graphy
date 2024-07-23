"use client";

import React, { useState } from "react";

import { ActiveTool, Editor } from "@/types/editor";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";

import { useGenerateImage } from "@/queries/ai/use-generate-image";

import { usePaywall } from "@/hooks/subscription/use-paywall";

interface AiSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const AiSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarProps) => {
  const { shouldBlock, triggerPaywall } = usePaywall();
  const mutation = useGenerateImage();

  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    mutation.mutate(
      { prompt: value },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      }
    );
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white dark:bg-slate-600 relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <form onSubmit={onSubmit} className="p-4 space-y-6">
            <Textarea
              disabled={mutation.isPending}
              placeholder="ex) An astronaut riding a horse on mars, hd, dramatic lighting"
              cols={30}
              rows={10}
              required
              minLength={3}
              className="dark:bg-slate-700"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <Button
              disabled={mutation.isPending}
              type="submit"
              className="w-full 
              bg-emerald-500 
              hover:bg-emerald-500/90  
              dark:bg-emerald-600 
              dark:hover:bg-emerald-600/90 
              text-white"
            >
              Generate
            </Button>
          </form>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default AiSidebar;
