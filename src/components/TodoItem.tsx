import {
  Checkbox,
  FormControlLabel,
  IconButton,
  ListItem,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Todo } from "types/todo.ts";
import { deleteTodo, toggleTodoStatus } from "services/todos.ts";

export default function TodoItem({ completed, id, title }: Todo) {
  const client = useQueryClient();

  const { mutate: toggle } = useMutation({
    mutationFn: () => toggleTodoStatus(id, !completed),
    onSuccess: () => client.invalidateQueries({ queryKey: ["todos"] }),
  });

  const { mutate: remove } = useMutation({
    mutationFn: () => deleteTodo(id),
    onSuccess: () => client.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <ListItem>
      <Stack
        spacing={4}
        direction="row"
        justifyContent="space-between"
        width="100%"
        onClick={() => toggle()}
      >
        <FormControlLabel
          control={<Checkbox checked={completed} />}
          label={title}
        />
        <IconButton aria-label="delete">
          <DeleteIcon
            onClick={(event) => {
              event.stopPropagation();
              remove();
            }}
          />
        </IconButton>
      </Stack>
    </ListItem>
  );
}
