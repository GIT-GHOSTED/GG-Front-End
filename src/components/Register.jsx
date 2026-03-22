import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Register({ setToken }) {
  // Step 1: Track user input values for registration credentials.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2: Track user-facing error and loading states.
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 3: Prepare navigation after successful registration.
  const navigate = useNavigate();

  // Step 4: Handle form submission to create a new user account.
  const handleSubmit = async (event) => {
    // Step 4a: Prevent default page refresh behavior.
    event.preventDefault();

    // Step 4b: Reset previous errors and start loading state.
    setError("");
    setLoading(true);

    try {
      // Step 4c: Send register request to API with entered credentials.
      const token = await api.register(email, password);

      // Step 4d: Save auth token in app state and localStorage.
      setToken(token);
      localStorage.setItem("token", token);

      // Step 4e: Redirect to dashboard after successful registration.
      navigate("/dashboard");
    } catch (err) {
      // Step 4f: Show API error message when registration fails.
      setError(err.message);
    } finally {
      // Step 4g: End loading state whether request succeeds or fails.
      setLoading(false);
    }
  };

  // Step 5: Render registration page UI.
  return (
    <section style={{ padding: "1rem" }}>
      {/* Step 5a: Show registration page heading. */}
      <h2>Register</h2>

      {/* Step 5b: Show error text when an error exists. */}
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      {/* Step 5c: Render controlled registration form. */}
      <form onSubmit={handleSubmit}>
        {/* Step 5d: Capture user email input. */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {/* Step 5e: Capture user password input. */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {/* Step 5f: Submit registration request; disable while loading. */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </section>
  );
}
