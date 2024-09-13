import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$patch"],
  200
>;

export const useNameUpdateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    { id: string; name: string }
  >({
    mutationFn: async ({ id, name }) => {
      const response = await client.api.projects[":id"].$patch({
        param: { id },
        json: { name },
      });

      if (!response.ok) throw new Error("Failed to update project name");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", { id: data.id }] });
      toast.success("Project name updated successfully");
    },
    onError: () => {
      toast.error("Failed to update project name");
    },
  });

  return mutation;
};
