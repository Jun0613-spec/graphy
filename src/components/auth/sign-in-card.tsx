"use client";

import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";

const SignInCard = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const params = useSearchParams();
  const error = params.get("error");

  const onProviderSignIn = (provider: "github" | "google") => {
    signIn(provider, { callbackUrl: "/" });
  };

  const onCredentialSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="bg-white dark:bg-neutral-800 w-full h-full max-w-md p-8">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to Graphy!
          </CardTitle>
          <CardDescription className="text-center text-neutral-600 dark:text-neutral-500 ">
            Sign in with your email or social account to continue
          </CardDescription>
        </CardHeader>
        {/* Error Handling */}
        {error && (
          <div className="bg-destructive/15 dark:bg-red-900 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive dark:text-red-300 mb-6">
            <CircleAlert className="size-4" />
            <p>Invalid email or password</p>
          </div>
        )}
        <CardContent className="space-y-6 px-0 pb-0">
          <form onSubmit={onCredentialSignIn} className="space-y-3">
            <div>
              <Label className="block mb-1 text-neutral-700 dark:text-neutral-300">
                Email
              </Label>
              <Input
                className="mt-1 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400 border dark:border-neutral-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                required
              />
            </div>
            <div>
              <Label className="block mb-1 text-neutral-700 dark:text-neutral-300">
                Password
              </Label>
              <Input
                className="mt-1 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400 border dark:border-neutral-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-500/90 dark:bg-emerald-700 dark:hover:bg-emerald-700/70 dark:text-white"
              size="lg"
            >
              Continue
            </Button>
          </form>

          <Separator className="dark:bg-neutral-700" />

          <div className="flex flex-col gap-y-3">
            <Button
              onClick={() => onProviderSignIn("github")}
              variant="outline"
              size="lg"
              className="w-full relative bg-black text-white hover:bg-black/70 hover:text-white dark:bg-neutral-950 dark:hover:bg-neutral-800"
            >
              <FaGithub className="mr-2 size-5 top-2.5 left-2.5 absolute" />
              Continue with Github
            </Button>
            <Button
              onClick={() => onProviderSignIn("google")}
              variant="outline"
              size="lg"
              className="w-full relative dark:bg-slate-100 dark:text-black dark:hover:bg-slate-200"
            >
              <FcGoogle className="mr-2 size-5 top-2.5 left-2.5 absolute" />
              Continue with Google
            </Button>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up">
              <span className="text-sky-700 dark:text-sky-600 hover:underline">
                Sign up
              </span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInCard;
