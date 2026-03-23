import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { useState } from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./components/Homepage.jsx";

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/login" element={<LogIn setToken={setToken} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </>
  );
}
