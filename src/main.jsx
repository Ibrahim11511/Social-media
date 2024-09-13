import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./context/userContext.jsx";
import { ForcedRenderProvider } from "./context/forcedRender.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <ForcedRenderProvider>
        <App />
      </ForcedRenderProvider>
    </UserContextProvider>
  </StrictMode>
);
