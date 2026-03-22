import { Link } from "react-router-dom";

export default function Dashboard() {
  // Step 1: Render the dashboard container.
  return (
    <section style={{ padding: "1rem" }}>
      {/* Step 2: Show the dashboard heading. */}
      <h2>Dashboard</h2>

      {/* Step 3: Show a short instruction for the user. */}
      <p>Welcome back. Use the links below to manage your applications.</p>

      {/* Step 4: Render quick navigation links for application actions. */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        {/* Step 4a: Go to the full applications list. */}
        <Link to="/applications">All applications</Link>

        {/* Step 4b: Go to the form for creating a new application. */}
        <Link to="/applications/new">Add application</Link>
      </div>
    </section>
  );
}
