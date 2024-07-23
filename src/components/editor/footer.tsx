"use client";

import React from "react";
import { Minimize2Icon, ZoomInIcon, ZoomOutIcon } from "lucide-react";

import Hint from "../hint";

import { Button } from "../ui/button";
import { Editor } from "@/types/editor";

interface FooterProps {
  editor: Editor | undefined;
}

const Footer = ({ editor }: FooterProps) => {
  return (
    <footer className="h-[52px] w-full  border-t bg-slate-50 dark:bg-slate-700 flex items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px-4 flex-row-reverse">
      <Hint label="Reset" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.autoZoom()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <Minimize2Icon className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom in" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomIn()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <ZoomInIcon className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom out" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomOut()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <ZoomOutIcon className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
};

export default Footer;
