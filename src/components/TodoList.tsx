import {
  Alert,
  AlertTitle,
  CircularProgress,
  Divider,
  List,
} from "@mui/material";

import { TodoState } from "types/todo.ts";
import { useTodosQuery } from "hooks/useTodosQuery.ts";
import TodoItem from "components/TodoItem.tsx";

export type TodoListProps = {
  state: TodoState;
};

export default function TodoList({ state }: TodoListProps) {
  const { data, error, isError, isLoading, isSuccess } = useTodosQuery(state);

  if (isLoading) return <CircularProgress sx={{ margin: "2rem auto" }} />;

  if (isError)
    return (
      <Alert severity="error" sx={{ margin: "2rem 0" }}>
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    );

  return (
    <List sx={{ overflow: "auto" }}>
      {isSuccess &&
        data.map((todo) => (
          <>
            <TodoItem key={todo.id} {...todo} />
            <Divider />
          </>
        ))}
    </List>
  );
}
