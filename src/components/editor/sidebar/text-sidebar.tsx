"use client";

import { ActiveTool, Editor } from "@/types/editor";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";

interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const TextSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TextSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white dark:bg-slate-600 relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "text" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Text" description="Add text to your canvas" />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button
            className=" w-full hover:opacity-70 dark:bg-slate-800 dark:text-white dark:hover:opacity-70"
            onClick={() => editor?.addText("Textbox")}
          >
            Textbox
          </Button>
          <Button
            size="lg"
            className=" w-full h-16 bg-slate-200 text-black hover:bg-slate-300 dark:bg-slate-500 dark:text-white dark:hover:opacity-70"
            onClick={() =>
              editor?.addText("Heading", { fontSize: 80, fontWeight: 700 })
            }
          >
            <span className="text-3xl font-bold"> Heading</span>
          </Button>
          <Button
            size="lg"
            className=" w-full h-16 bg-slate-200 text-black hover:bg-slate-300 dark:bg-slate-500 dark:text-white dark:hover:opacity-70"
            onClick={() =>
              editor?.addText("Subheading", { fontSize: 44, fontWeight: 600 })
            }
          >
            <span className="text-xl font-semibold"> Subheading</span>
          </Button>
          <Button
            size="lg"
            className=" w-full h-16 bg-slate-200 text-black hover:bg-slate-300 dark:bg-slate-500 dark:text-white dark:hover:opacity-70"
            onClick={() => editor?.addText("Paragraph", { fontSize: 32 })}
          >
            Paragraph
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default TextSidebar;
