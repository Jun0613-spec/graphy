import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-2 hover:opacity-75 transition h-[68px] px-4">
        <div className="size-8 relative">
          <Image src="/logo.svg" alt="logo" fill />
        </div>
        <h1 className="text-xl font-bold">Graphy</h1>
      </div>
    </Link>
  );
};

export default Logo;
