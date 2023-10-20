import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "services/todos.ts";
import { Todo } from "types/todo.ts";
import { Button, Input, Stack } from "@mui/material";

export default function NewTodo() {
  const [title, setTitle] = useState("");

  const client = useQueryClient();

  const { mutate: create } = useMutation({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      client.setQueriesData<Todo[]>(
        { queryKey: ["todos", "all"] },
        (oldTodos = []) => {
          return [...oldTodos, newTodo];
        },
      );
      client.setQueriesData<Todo[]>(
        { queryKey: ["todos", "open"] },
        (oldTodos = []) => {
          return [...oldTodos, newTodo];
        },
      );
      // return client.invalidateQueries({
      //   queryKey: ["todos"],
      // });
    },
  });

  const submit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (title) {
      create(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={submit}>
      <Stack direction="row">
        <Input
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(event.currentTarget.value)
          }
          placeholder="new todo..."
        />
        <Button type="submit">Add todo</Button>
      </Stack>
    </form>
  );
}
