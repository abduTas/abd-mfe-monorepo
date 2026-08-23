import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { getStore } from "sharedState/store";
import App from "@/App";
import "@abd/design-system/styles";
import "@/app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={getStore()}>
      <App />
    </Provider>
  </StrictMode>,
);
