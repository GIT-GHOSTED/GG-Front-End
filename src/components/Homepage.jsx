import { Link } from "react-router";
import { Button } from "antd";

export default function Homepage() {
  // Step 1: Render the homepage container.
  return (
    <section style={{ padding: "1rem" }}>
      {/* Step 2: Show the primary app welcome message. */}
      <h1>Welcome to Git Ghosted</h1>

      {/* Step 3: Show supporting tagline describing app purpose. */}
      <h2>Track your job applications and never Git Ghosted again!</h2>

      {/* Step 4: Render quick navigation links for new and returning users. */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        {/* Step 4a: Navigate new users to registration flow. */}
        <Button color="purple" variant="solid">
          <Link to="/register">Get Started</Link>
        </Button>

        {/* Step 4b: Navigate existing users to login flow. */}
        <Button color="purple" variant="solid">
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
    </section>
  );
}
