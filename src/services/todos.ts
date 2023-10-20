import { Todo, TodoState } from "types/todo.ts";
import sleep from "utils/sleep.ts";

const BASE_URL = "http://localhost:3001/todos";

export const fetchTodos = async (state: TodoState = "all"): Promise<Todo[]> => {
  await sleep(500);
  const queries = state === "all" ? "" : `?completed=${state === "completed"}`;
  const response = await fetch(`${BASE_URL}/${queries}`);
  if (!response.ok) throw new Error("Failed to fetch todos!");
  return response.json();
};

export const toggleTodoStatus = async (todoId: number, completed: boolean) => {
  await sleep(500);
  const response = await fetch(`${BASE_URL}/${todoId}`, {
    method: "PATCH",
    body: JSON.stringify({ completed }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const createTodo = async (title: string) => {
  await sleep(500);
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify({ title, completed: false }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const deleteTodo = async (id: number) => {
  await sleep(500);
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
