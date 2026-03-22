import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </>
  );
}
