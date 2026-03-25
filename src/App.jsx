import { Routes, Route } from "react-router";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard/Dashboard";
import Applications from "./components/Applications";
import ApplicationDetail from "./components/ApplicationDetail";
import EditApplication from "./components/EditApplication";
import Layout from "./components/Layout";
import { useState, useEffect } from "react";
import { ConfigProvider, Switch, theme as antdTheme } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

export default function App() {
  // Step 1: Initialize auth token state from localStorage so refreshes keep login state.
  const [token, setToken] = useState(localStorage.getItem(`token`));
  // Step 1a: Initialize color theme mode from localStorage (defaults to dark).
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "dark",
  );

  // Step 1b: Toggle between dark and light mode and persist preference.
  const handleToggleTheme = (checked) => {
    const nextTheme = checked ? "dark" : "light";
    setThemeMode(nextTheme);
    localStorage.setItem("themeMode", nextTheme);
  };

  // Step 1c: Sync selected theme to body attribute for global page/background styling.
  useEffect(() => {
    document.body.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  // Step 2: Render app shell (shared navbar + routed page content).
  return (
    /* Ant Design ConfigProvider wraps entire app and applies the current theme algorithm. */
    <ConfigProvider
      theme={{
        algorithm:
          themeMode === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      {/* Global light/dark mode toggle switch positioned at top-right of viewport. */}
      <div
        style={{
          position: "fixed",
          top: 12,
          right: 12,
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* Icon visually indicates current theme: Moon for dark mode, Sun for light mode. */}
        {themeMode === "dark" ? <MoonOutlined /> : <SunOutlined />}
        {/* Ant Design Switch component controlled by themeMode state.  */}
        <Switch
          checked={themeMode === "dark"}
          onChange={handleToggleTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>

      {/* Step 2: Render route-driven page content. */}
      <main>
        <Routes>
          {/* Step 3: Public route for landing page. */}
          <Route path="/" element={<Homepage />} />

          {/* Step 4: Public route for user registration (needs setToken on success). */}
          <Route path="/register" element={<Register setToken={setToken} />} />

          {/* Step 5: Public route for user login (needs setToken on success). */}
          <Route path="/login" element={<LogIn setToken={setToken} />} />

          {/* Step 6: Protected route group guarded by Layout token check. */}
          <Route
            element={
              <Layout token={token} setToken={setToken} themeMode={themeMode} />
            }
          >
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
    </ConfigProvider>
  );
}
