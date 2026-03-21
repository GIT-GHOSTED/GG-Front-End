import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <section style={{ padding: "1rem" }}>
      <h1>Welcome to Git Ghosted</h1>
      <h2>Track your job applications and never Git Ghosted again!</h2>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <Link to="/register">Get Started</Link>
        <Link to="/login">Sign In</Link>
      </div>
    </section>
  );
}
