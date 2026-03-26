import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { api } from "../../services/api";
import lightGhost from "../../../img/Light-Ghost.png";
import darkGhost from "../../../img/Dark-Ghost.png";
import "./Login.css";

export default function LogIn({ setToken, themeMode }) {
  //Track user input values for login credentials.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Track user-facing error and loading states.
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Prepare navigation after successful login.
  const navigate = useNavigate();

  //Handle form submission for login.
  const handleSubmit = async (event) => {
    //Prevent default page refresh.
    event.preventDefault();

    //Reset previous errors and start loading state.
    setError("");
    setLoading(true);

    try {
      //Send login request to API with entered credentials.
      const token = await api.login(email, password);

      //Save token in app state and localStorage.
      setToken(token);
      localStorage.setItem("token", token);

      //Redirect to dashboard after successful login.
      navigate("/dashboard");
    } catch (err) {
      //Show API error message if login fails.
      setError(err.message);
    } finally {
      //End loading state whether request succeeds or fails.
      setLoading(false);
    }
  };

  //Render login page UI.
  return (
    <section className="login">
      {/* Logo button that navigates back to home page - switches between light/dark mode */}
      <Link to="/" className="login-logo-link">
        <img
          className="login-logo"
          src={themeMode === "dark" ? darkGhost : lightGhost}
          alt="GG logo"
        />
      </Link>
      
      <h2>Log In</h2>

      {/* Show error text when an error exists. */}
      {error ? <p className="login-error">{error}</p> : null}

      {/* Render controlled login form bound to component state. */}
      <form onSubmit={handleSubmit}>
        {/* Capture the user's email value. */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {/* Capture the user's password value. */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {/* Submit credentials and show loading label while request is in progress. */}
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Log In"}
        </button>
      </form>
    </section>
  );
}
