import { Container, Stack } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import NewTodo from "components/NewTodo.tsx";
import TodoViewer from "components/TodoViewer.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Container
        sx={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Stack spacing={4} sx={{ maxHeight: "100%" }}>
          <NewTodo />
          <TodoViewer />
        </Stack>
      </Container>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
