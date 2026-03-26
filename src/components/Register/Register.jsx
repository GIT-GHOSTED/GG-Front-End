import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { api } from "../../services/api";
import lightGhost from "../../../img/Light-Ghost.png";
import darkGhost from "../../../img/Dark-Ghost.png";
import "./Register.css";

export default function Register({ setToken, themeMode }) {
  // Track user input values for registration credentials.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Track user-facing error and loading states.
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Prepare navigation after successful registration.
  const navigate = useNavigate();

  // Handle form submission to create a new user account.
  const handleSubmit = async (event) => {
    // Prevent default page refresh behavior.
    event.preventDefault();

    // Reset previous errors and start loading state.
    setError("");
    setLoading(true);

    try {
      // Send register request to API with entered credentials.
      const token = await api.register(email, password);

      // Save auth token in app state and localStorage.
      setToken(token);
      localStorage.setItem("token", token);

      // Redirect to dashboard after successful registration.
      navigate("/dashboard");
    } catch (err) {
      // Show API error message when registration fails.
      setError(err.message);
    } finally {
      // End loading state whether request succeeds or fails.
      setLoading(false);
    }
  };

  // Render registration page UI.
  return (
    <section className="register">
      {/* Logo button that navigates back to home page - switches between light/dark mode */}
      <Link to="/" className="register-logo-link">
        <img
          className="register-logo"
          src={themeMode === "dark" ? darkGhost : lightGhost}
          alt="GG logo"
        />
      </Link>

      {/* Show registration page heading. */}
      <h2>Register</h2>

      {/* Show error text when an error exists. */}
      {error ? <p className="register-error">{error}</p> : null}

      {/* Render controlled registration form. */}
      <form onSubmit={handleSubmit}>
        {/* Capture user email input. */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {/* Capture user password input. */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {/* Submit registration request; disable while loading. */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </section>
  );
}
