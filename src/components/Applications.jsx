import { Link } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Applications() {
  // Step 1: Store the fetched applications list.
  const [applications, setApplications] = useState([]);

  // Step 2: Track whether the page is still loading data.
  const [loading, setLoading] = useState(true);

  // Step 3: Track any user-facing error message.
  const [error, setError] = useState("");

  // Step 4: Fetch applications once when this page loads.
  useEffect(() => {
    async function loadApplications() {
      // Step 4a: Get auth token from localStorage.
      const token = localStorage.getItem("token");

      // Step 4b: If no token, stop early and ask user to log in.
      if (!token) {
        setError("Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Step 4c: Request applications from the backend API.
        const data = await api.getApplications(token);

        // Step 4d: Save returned applications (or fallback to empty array).
        setApplications(data.applications || []);
      } catch (err) {
        // Step 4e: Show fetch error if request fails.
        setError(err.message);
      } finally {
        // Step 4f: End loading state after request finishes.
        setLoading(false);
      }
    }

    // Step 4g: Run the async loader.
    loadApplications();
  }, []);

  // Step 5: Render the applications list UI.
  return (
    <section style={{ padding: "1rem" }}>
      <h2>Applications</h2>

      {/* Step 5a: Link to the create-new-application form. */}
      <Link to="/applications/new">Create new application</Link>

      {/* Step 5b: Show loading indicator while fetching data. */}
      {loading ? <p>Loading...</p> : null}

      {/* Step 5c: Show error message when one exists. */}
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      {/* Step 5d: Render each application as a list item with a detail link. */}
      <ul>
        {applications.map((application) => (
          <li key={application.id}>
            {application.company} - {application.role} ({application.status}){" "}
            <Link to={`/applications/${application.id}`}>View</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
