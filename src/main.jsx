import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

// Step 1: Find the root DOM element and create a React root instance.
createRoot(document.getElementById("root")).render(
  // Step 2: Enable client-side routing across the app.
  <BrowserRouter>
    {/* Step 3: Wrap app in StrictMode for extra development checks. */}
    <StrictMode>
      {/* Step 4: Render the top-level App component. */}
      <App />
    </StrictMode>
  </BrowserRouter>,
);
