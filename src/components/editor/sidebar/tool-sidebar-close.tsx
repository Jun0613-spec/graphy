import { ArrowLeft } from "lucide-react";
import React from "react";

interface ToolSidebarCloseProps {
  onClick: () => void;
}

const ToolSidebarClose = ({ onClick }: ToolSidebarCloseProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-3 top-8 transform -translate-y-1/2 flex items-center justify-center px-1   group "
    >
      <ArrowLeft className="size-5 group-hover:opacity-75 transition" />
    </button>
  );
};

export default ToolSidebarClose;
