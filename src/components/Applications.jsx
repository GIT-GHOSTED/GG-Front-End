import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadApplications() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in.");
        setLoading(false);
        return;
      }
      try {
        const data = await api.getApplications(token);
        setApplications(data.applications || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadApplications();
  }, []);

  return (
    <section style={{ padding: "1rem" }}>
      <h2>Applications</h2>
      <Link to="/applications/new">Create new application</Link>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
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
