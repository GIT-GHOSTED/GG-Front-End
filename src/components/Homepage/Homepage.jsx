import { Link } from "react-router";
import "./Homepage.css";

export default function Homepage() {
  // Step 1: Render the homepage container.
  return (
    <section className="homepage">
      {/* Step 2: Show the primary app welcome message. */}
      <h1>Welcome to Git Ghosted</h1>

      {/* Step 3: Show supporting tagline describing app purpose. */}
      <h2>Track your job applications and never Git Ghosted again!</h2>

      {/* Step 4: Render quick navigation links for new and returning users. */}
      <div className="homepage-links">
        {/* Step 4a: Navigate new users to registration flow. */}
        <Link to="/register">Get Started</Link>

        {/* Step 4b: Navigate existing users to login flow. */}
        <Link to="/login">Sign In</Link>
      </div>
    </section>
  );
}
