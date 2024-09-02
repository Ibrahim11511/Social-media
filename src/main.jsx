import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./context/userContext.jsx";
import { AlertContextProvider } from "./context/alertContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </UserContextProvider>
  </StrictMode>
);
