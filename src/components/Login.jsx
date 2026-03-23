import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function LogIn({ setToken }) {
  // Step 1: Track user input values for login credentials.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2: Track user-facing error and loading states.
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 3: Prepare navigation after successful login.
  const navigate = useNavigate();

  // Step 4: Handle form submission for login.
  const handleSubmit = async (event) => {
    // Step 4a: Prevent default page refresh.
    event.preventDefault();

    // Step 4b: Reset previous errors and start loading state.
    setError("");
    setLoading(true);

    try {
      // Step 4c: Send login request to API with entered credentials.
      const token = await api.login(email, password);

      // Step 4d: Save token in app state and localStorage.
      setToken(token);
      localStorage.setItem("token", token);

      // Step 4e: Redirect to dashboard after successful login.
      navigate("/dashboard");
    } catch (err) {
      // Step 4f: Show API error message if login fails.
      setError(err.message);
    } finally {
      // Step 4g: End loading state whether request succeeds or fails.
      setLoading(false);
    }
  };

  // Step 5: Render login page UI.
  return (
    <section style={{ padding: "1rem" }}>
      <h2>Log In</h2>

      {/* Step 5a: Show error text when an error exists. */}
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      {/* Step 5b: Render controlled login form bound to component state. */}
      <form onSubmit={handleSubmit}>
        {/* Step 5c: Capture the user's email value. */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {/* Step 5d: Capture the user's password value. */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {/* Step 5e: Submit credentials and show loading label while request is in progress. */}
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Log In"}
        </button>
      </form>
    </section>
  );
}
