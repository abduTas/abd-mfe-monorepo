import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { getStore } from "@/store";
import App from "@/App";
import "@/app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={getStore()}>
      <App />
    </Provider>
  </StrictMode>,
);
