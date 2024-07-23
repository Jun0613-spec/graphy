import React from "react";

import UserButton from "@/components/user-button";
import Logo from "../sidebar/logo";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center p-4 h-[68px]">
      <div className="lg:hidden block">
        <Logo />
      </div>

      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
