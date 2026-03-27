import { useNavigate } from "react-router";
import { Button } from "antd";
import lightGhost from "../../../img/Light-Ghost.png";
import darkGhost from "../../../img/Dark-Ghost.png";
import "./Homepage.css";

export default function Homepage({ themeMode }) {
  const navigate = useNavigate();

  // Step 1: Render the homepage container.
  return (
    <section className="homepage">
      {/* Step 1a: Display large theme-aware logo at top. */}
      <div className="homepage-logo-container">
        <img
          className="homepage-logo"
          src={themeMode === "dark" ? darkGhost : lightGhost}
          alt="Git Ghosted logo"
        />
      </div>

      {/* Step 2: Show the primary app welcome message. */}
      <h1>Welcome to Git Ghosted</h1>

      {/* Step 3: Show supporting tagline describing app purpose. */}
      <h2>Track your job applications and never Git Ghosted again!</h2>

      {/* Step 4: Render quick navigation buttons for new and returning users. */}
      <div className="homepage-links">
        {/* Step 4a: Navigate new users to registration flow. */}
        <Button type="primary" onClick={() => navigate("/register")}>
          Get Started
        </Button>

        {/* Step 4b: Navigate existing users to login flow. */}
        <Button type="primary" onClick={() => navigate("/login")}>
          Sign In
        </Button>
      </div>
    </section>
  );
}
