"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  CopyIcon,
  FileIcon,
  Loader,
  MoreHorizontal,
  Pencil,
  Search,
  Trash,
} from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useConfirm } from "@/hooks/use-confirm";

import { useDuplicateProject } from "@/queries/projects/use-duplicate-project";
import { useDeleteProject } from "@/queries/projects/use-delete-project";
import { useGetProjects } from "@/queries/projects/use-get-projects";
import { useNameUpdateProject } from "@/queries/projects/use-name-update-project";
import { Input } from "../ui/input";

const ProjectsSection = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Do you want to delete this project?",
    "This project will be deleted."
  );

  const router = useRouter();

  const duplicateMutation = useDuplicateProject();
  const removeMutation = useDeleteProject();
  const updateNameMutation = useNameUpdateProject();

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState<string>("");

  const onCopy = (id: string) => {
    duplicateMutation.mutate({ id });
  };

  const onDelete = async (id: string) => {
    const ok = await confirm();

    if (ok) {
      removeMutation.mutate({ id });
    }
  };

  const onEdit = (id: string, currentName: string) => {
    setEditingProjectId(id);
    setNewProjectName(currentName);
  };

  const handleNameUpdate = () => {
    if (editingProjectId) {
      updateNameMutation.mutate({ id: editingProjectId, name: newProjectName });
      setEditingProjectId(null);
    }
  };

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();

  if (status === "pending") {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Recent projects</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Recent projects</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <AlertTriangle className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Failed to load projects
          </p>
        </div>
      </div>
    );
  }

  if (!data.pages.length || !data.pages[0].data.length) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Recent projects</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <Search className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">No projects found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ConfirmDialog />
      <h3 className="font-semibold text-lg">Recent projects</h3>
      <Table>
        <TableBody>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell
                    onClick={() => router.push(`/editor/${project.id}`)}
                    className="font-medium flex items-center gap-x-2 cursor-pointer"
                  >
                    <FileIcon className="size-6" />
                    {project.name}
                  </TableCell>
                  <TableCell
                    onClick={() => router.push(`/editor/${project.id}`)}
                    className="hidden md:table-cell cursor-pointer"
                  >
                    {project.width} x {project.height} px
                  </TableCell>
                  <TableCell
                    onClick={() => router.push(`/editor/${project.id}`)}
                    className="hidden md:table-cell cursor-pointer"
                  >
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="flex items-center justify-end">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button disabled={false} size="icon" variant="ghost">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-60 dark:bg-slate-700"
                      >
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={duplicateMutation.isPending}
                          onClick={() => onCopy(project.id)}
                        >
                          <CopyIcon className="size-4 mr-2" />
                          Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={removeMutation.isPending}
                          onClick={() => onDelete(project.id)}
                        >
                          <Trash className="size-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={updateNameMutation.isPending}
                          onClick={() => onEdit(project.id, project.name)}
                        >
                          <Pencil className="size-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      {editingProjectId && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-slate-800 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Project Name</h3>
            <Input
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="mb-4 border-gray-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 dark:bg-zinc-800"
              placeholder="Enter new project name"
            />
            <div className="flex justify-end gap-x-3">
              <Button
                variant="destructive"
                onClick={() => setEditingProjectId(null)}
                className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleNameUpdate}
                disabled={updateNameMutation.isPending}
                className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
      {hasNextPage && (
        <div className="w-full flex items-center justify-center pt-4">
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
