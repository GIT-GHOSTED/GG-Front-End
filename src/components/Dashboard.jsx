import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <section style={{ padding: "1rem" }}>
      <h2>Dashboard</h2>
      <p>Welcome back. Use the links below to manage your applications.</p>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <Link to="/applications">All applications</Link>
        <Link to="/applications/new">Add application</Link>
      </div>
    </section>
  );
}
