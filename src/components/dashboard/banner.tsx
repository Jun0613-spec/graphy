"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

import { useCreateProject } from "@/queries/projects/use-create-project";

const Banner = () => {
  const router = useRouter();
  const mutation = useCreateProject();

  const onClick = () => {
    mutation.mutate(
      {
        name: "Untitled project",
        json: "",
        width: 900,
        height: 1200,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };
  return (
    <div className="text-white aspect-[5/1] min-h-[248px] flex gap-x-6 p-6 items-center rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500  dark:from-emerald-950 dark:via-emerald-900 dark:to-emerald-800">
      <div className="rounded-full size-28 items-center justify-center bg-white/50 dark:bg-white/25 hidden md:flex">
        <div className="rounded-full size-20 flex items-center justify-center bg-white dark:bg-neutral-200">
          <Sparkles className="h-20 text-emerald-500 fill-emerald-500/90 dark:text-emerald-700 dark:fill-emerald-700/90" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-xl md:text-3xl font-semibold">
          Bring Your Ideas to Life with Graphic Design
        </h1>
        <p className="text-xs md:text-sm mb-2">
          Turn inspiration into stunning designs. Upload your images and start
          creating today.
        </p>
        <Button
          disabled={mutation.isPending}
          onClick={onClick}
          className="w-[160px] hover:bg-black/60 dark:bg-black dark:text-white dark:hover:text-white/60 "
        >
          Start creating
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Banner;
