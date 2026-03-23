import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  // Rendering the dashboard container.
  return (
    <section style={{ padding: "1rem" }}>
      {/* Showing the dashboard heading. */}
      <h2>Dashboard</h2>

      {/* Showing a short instruction for the user. */}
      <p>Welcome back. Use the links below to manage your applications.</p>

      <section className="appDetails">
        <DataBox number={7} tag={"Active"} />
        <DataBox number={2} tag={"Interviews"} />
        <DataBox number={1} tag={"Offers"} />
        <DataBox number={3} tag={"follow ups"} />
      </section>

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

function DataBox({ number, tag }) {
  return (
    <section className="dataBox">
      <p>{tag}</p>
      <p>{number}</p>
    </section>
  );
}
