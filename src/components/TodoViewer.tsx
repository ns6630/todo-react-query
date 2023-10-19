import { useState } from "react";
import { Button, ButtonGroup, Stack } from "@mui/material";

import { TodoState } from "types/todo.ts";
import TodoList from "components/TodoList.tsx";

export default function TodoViewer() {
  const [view, setView] = useState<TodoState>("all");

  return (
    <Stack sx={{ overflow: "hidden" }}>
      <ButtonGroup>
        <Button
          variant={view === "all" ? "outlined" : "contained"}
          onClick={() => setView("all")}
        >
          all
        </Button>
        <Button
          variant={view === "open" ? "outlined" : "contained"}
          onClick={() => setView("open")}
        >
          open
        </Button>
        <Button
          variant={view === "completed" ? "outlined" : "contained"}
          onClick={() => setView("completed")}
        >
          completed
        </Button>
      </ButtonGroup>

      <TodoList state={view} />
    </Stack>
  );
}
