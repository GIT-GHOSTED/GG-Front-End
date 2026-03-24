import { Link } from "react-router";
import { useState } from "react";
import NewApplicationForm from "./NewApplicationForm/NewApplicationForm";
import { useApplications } from "../context/applicationsContext";

export default function Applications() {
  // Step 1: Use context to get applications
  const { applications } = useApplications();

  // Step 2: Track whether the new application form is open
  const [showForm, setShowForm] = useState(false);

  // Step 3: Render the applications list UI
  return (
    <section style={{ padding: "1rem" }}>
      <h2>Applications</h2>

      {/* Step 3a: Show message if no applications exist */}
      {applications.length === 0 ? <p>No applications yet.</p> : null}

      {/* Step 3b: Render each application */}
      <ul>
        {applications.map((application) => (
          <li key={application.id}>
            {application.company} - {application.role} ({application.status}){" "}
            <Link to={`/applications/${application.id}`}>View</Link>
          </li>
        ))}
      </ul>

      {/* Step 3c: Button to toggle new application form */}
      <button onClick={() => setShowForm(!showForm)}>New Application</button>

      {/* Step 3d: Render the form if showForm is true */}
      {showForm && (
        <NewApplicationForm showForm={showForm} setShowForm={setShowForm} />
      )}
    </section>
  );
}
