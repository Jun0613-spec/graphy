"use client";

import React from "react";
import Link from "next/link";
import { CircleAlert, Loader } from "lucide-react";

import Editor from "@/components/editor/editor";

import { Button } from "@/components/ui/button";

import { useGetProject } from "@/queries/projects/use-get-project";

interface EditorProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const EditorProjectIdPage = ({ params }: EditorProjectIdPageProps) => {
  const { data, isLoading, isError } = useGetProject(params.projectId);

  if (isLoading || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col gap-y-5 items-center justify-center">
        <CircleAlert className="size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Not found project</p>
        <Button asChild variant="secondary">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Editor initialData={data} />
    </>
  );
};

export default EditorProjectIdPage;
