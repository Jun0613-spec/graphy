"use client";

import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import Logo from "./logo";

const Navbar = () => {
  return (
    <nav className="bg-slate-50 dark:bg-slate-700 w-full flex items-center p-4 h-16 gap-x-8 border-b lg:pl-9">
      <Logo />
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
