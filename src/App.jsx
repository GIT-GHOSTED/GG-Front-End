import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Applications from "./components/Applications";
import NewApplication from "./components/NewApplication";
import ApplicationDetail from "./components/ApplicationDetail";
import EditApplication from "./components/EditApplication";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem(`token`));
  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/login" element={<LogIn setToken={setToken} />} />
          <Route element={<Layout token={token} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/new" element={<NewApplication />} />
            <Route path="/applications/:id" element={<ApplicationDetail />} />
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
