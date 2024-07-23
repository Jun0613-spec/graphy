import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

import SignInCard from "@/components/auth/sign-in-card";

const SignInPage = async () => {
  const session = await auth();

  if (session) redirect("/");

  return <SignInCard />;
};

export default SignInPage;
