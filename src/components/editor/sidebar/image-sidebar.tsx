"use client";

import Image from "next/image";

import { ActiveTool, Editor } from "@/types/editor";

import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/uploadthing";

import { ScrollArea } from "@/components/ui/scroll-area";

import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";

import { images } from "@/data";

interface ImageSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const ImageSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ImageSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <aside
      className={cn(
        "bg-white dark:bg-slate-600 relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "images" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add images to your canvas"
      />
      <div className="p-4 border-b">
        <UploadButton
          content={{
            button: "Upload Image",
          }}
          appearance={{
            button:
              "w-full px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-md transition duration-300 ease-in-out hover:bg-emerald-600  dark:bg-emerald-600 dark:hover:bg-emerald-700 ",

            allowedContent: "hidden",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            editor?.addImage(res[0].url);
          }}
        />
      </div>

      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {images.map((image) => {
              return (
                <button
                  onClick={() => editor?.addImage(image.url)}
                  key={image.id}
                  className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
                >
                  <Image
                    src={image.url}
                    alt="images"
                    fill
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default ImageSidebar;
