import {
  Checkbox,
  FormControlLabel,
  IconButton,
  ListItem,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { Todo } from "types/todo.ts";
import useRemoveTodo from "hooks/useRemoveTodo.ts";
import useToggleTodo from "hooks/useToggleTodo.ts";

export default function TodoItem({ completed, id, title }: Todo) {
  const { disabledToggle, toggle } = useToggleTodo(id, completed);

  const { disabledRemove, remove } = useRemoveTodo(id);

  const toggleWithPending =
    disabledToggle || disabledRemove ? undefined : () => toggle();

  return (
    <ListItem>
      <Stack
        spacing={4}
        direction="row"
        justifyContent="space-between"
        width="100%"
        onClick={toggleWithPending}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              disabled={disabledToggle || disabledRemove}
            />
          }
          label={title}
        />
        <IconButton aria-label="delete" disabled={disabledRemove}>
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
