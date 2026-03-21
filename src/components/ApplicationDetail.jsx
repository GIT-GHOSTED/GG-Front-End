import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

function formatDateDMY(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ApplicationDetail() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadApplication() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in.");
        setLoading(false);
        return;
      }
      try {
        const data = await api.getApplicationById(id, token);
        setApplication(data.application);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadApplication();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in.");
      return;
    }
    try {
      await api.deleteApplication(id, token);
      window.location.assign("/applications");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section style={{ padding: "1rem" }}>
      <h2>Application Detail</h2>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      {application ? (
        <>
          <p>Company: {application.company}</p>
          <p>Role: {application.role}</p>
          <p>Status: {application.status}</p>
          <p>Date applied: {formatDateDMY(application.date_applied)}</p>
          <p>Notes: {application.notes || "-"}</p>
        </>
      ) : null}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <Link to={`/applications/${id}/edit`}>Edit</Link>
        <Link to="/applications">Back</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </section>
  );
}
