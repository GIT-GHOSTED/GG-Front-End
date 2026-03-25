import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ApplicationsProvider } from "./context/applicationsContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ApplicationsProvider>
        <App />
      </ApplicationsProvider>
    </StrictMode>
  </BrowserRouter>,
);
