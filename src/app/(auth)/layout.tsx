import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[url(/bg.jpg)] bg-object min-h-screen flex flex-col justify-center items-center">
      <div className="z-10 w-full max-w-lg px-6 py-12">{children}</div>
      <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,.4),rgba(0,0,0,.8))] z-[1]" />
    </div>
  );
};

export default AuthLayout;
