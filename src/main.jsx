import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, MemoryRouter } from "react-router";
import { ApplicationsProvider } from "./context/applicationsContext.jsx";

// Detect if the app is running inside a Chrome extension popup
const isPopup = window.location.href.startsWith("chrome-extension://");

// Choose the router depending on environment
const Router = isPopup ? MemoryRouter : BrowserRouter;

createRoot(document.getElementById("root")).render(
  <Router>
    <StrictMode>
      <ApplicationsProvider>
        <App />
      </ApplicationsProvider>
    </StrictMode>
  </Router>,
);
