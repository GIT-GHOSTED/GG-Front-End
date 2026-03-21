import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function LogIn({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = await api.login(email, password);
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: "1rem" }}>
      <h2>Log In</h2>
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Log In"}
        </button>
      </form>
    </section>
  );
}
