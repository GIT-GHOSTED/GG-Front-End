import { Link } from "react-router-dom";

export default function Dashboard() {
  // Rendering the dashboard container.
  return (
    <section style={{ padding: "1rem" }}>
      {/* Showing the dashboard heading. */}
      <h2>Dashboard</h2>

      {/* Showing a short instruction for the user. */}
      <p>Welcome back. Use the links below to manage your applications.</p>

      {/* Rendering quick navigation links for application actions. */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        {/* Goes to the full applications list. */}
        <Link to="/applications">All applications</Link>

        {/* Goes to the form for creating a new application. */}
        <Link to="/applications/new">Add application</Link>
      </div>
    </section>
  );
}
