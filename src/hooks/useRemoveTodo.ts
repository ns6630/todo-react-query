import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "services/todos.ts";

export default function useRemoveTodo(id: number) {
  const client = useQueryClient();

  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: () => deleteTodo(id),
    onSuccess: () => client.invalidateQueries({ queryKey: ["todos"] }),
  });

  return {
    disabledRemove: isPending || isSuccess,
    remove: mutate,
  };
}
