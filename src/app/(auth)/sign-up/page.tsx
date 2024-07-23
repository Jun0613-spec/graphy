import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

import SignUpCard from "@/components/auth/sign-up-card";

const SignUpPage = async () => {
  const session = await auth();

  if (session) redirect("/");

  return <SignUpCard />;
};

export default SignUpPage;
