import { useState } from "react";
import { Routes, Route } from "react-router-dom";

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
          <Route elemnt={<Layout token={token} />}></Route>
        </Routes>
      </main>
    </>
  );
}
