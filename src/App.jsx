import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard/Dashboard";
import Applications from "./components/Applications";
import ApplicationDetail from "./components/ApplicationDetail";
import EditApplication from "./components/EditApplication";
import Layout from "./components/Layout";
import { useState } from "react";

export default function App() {
  // Step 1: Initialize auth token state from localStorage so refreshes keep login state.
  const [token, setToken] = useState(localStorage.getItem(`token`));

  // Step 2: Render app shell (shared navbar + routed page content).
  return (
    <>
      {/* Step 2a: Always render navbar and pass auth state/actions to it. */}
      <Navbar token={token} setToken={setToken} />

      {/* Step 2b: Render route-driven page content. */}
      <main>
        <Routes>
          {/* Step 3: Public route for landing page. */}
          <Route path="/" element={<Homepage />} />

          {/* Step 4: Public route for user registration (needs setToken on success). */}
          <Route path="/register" element={<Register setToken={setToken} />} />

          {/* Step 5: Public route for user login (needs setToken on success). */}
          <Route path="/login" element={<LogIn setToken={setToken} />} />

          {/* Step 6: Protected route group guarded by Layout token check. */}
          <Route element={<Layout token={token} />}>
            {/* Step 6a: Protected dashboard page. */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Step 6b: Protected applications list page. */}
            <Route path="/applications" element={<Applications />} />

            {/* Step 6d: Protected single-application detail page. */}
            <Route path="/applications/:id" element={<ApplicationDetail />} />

            {/* Step 6e: Protected edit-application page. */}
            <Route
              path="/applications/:id/edit"
              element={<EditApplication />}
            />
          </Route>
        </Routes>
      </main>
    </>
  );
}
