import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTodoStatus } from "services/todos.ts";

export default function useToggleTodo(id: number, completed: boolean) {
  const client = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: () => toggleTodoStatus(id, !completed),
    onSuccess: () => client.invalidateQueries({ queryKey: ["todos"] }),
  });

  return {
    disabledToggle: isPending,
    toggle: mutate,
  };
}
