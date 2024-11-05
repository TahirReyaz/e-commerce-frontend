import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";
import { LoadingBarProvider } from "./components/LoadingBar";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <LoadingBarProvider>
      <App />
    </LoadingBarProvider>
  </QueryClientProvider>
);
