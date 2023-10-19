import { useQuery } from "@tanstack/react-query";

import { TodoState } from "types/todo.ts";
import { fetchTodos } from "services/todos.ts";

export const useTodosQuery = (state: TodoState) => {
  return useQuery({
    queryFn: () => fetchTodos(state),
    queryKey: ["todos", state],
    staleTime: 1000 * 5,
  });
};
