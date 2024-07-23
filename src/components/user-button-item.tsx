import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface UserbuttonItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  onClick?: () => void;
}

const UserbuttonItem = ({
  icon: Icon,
  label,
  href,
  onClick,
}: UserbuttonItemProps) => {
  return (
    <Link href={href} onClick={onClick} className="w-full">
      <div className="flex items-center ">
        <Icon className="size-4 mr-2" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

export default UserbuttonItem;
