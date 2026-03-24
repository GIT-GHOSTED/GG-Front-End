import { Link, useParams, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { api } from "../services/api";

// Step 1: Convert raw database/API date values into a readable UI format.
function formatDateDMY(value) {
  // Step 1a: If there is no date value, show a fallback.
  if (!value) return "-";

  // Step 1b: Create a Date object from the incoming value.
  const date = new Date(value);

  // Step 1c: Guard against invalid date values.
  if (Number.isNaN(date.getTime())) return "-";

  // Step 1d: Return formatted date as "Month Day, Year".
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ApplicationDetail() {
  // Step 2: Read the application ID from the route URL.
  const { id } = useParams();

  // Step 3: Create local state for application data and UI status.
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  // Step 4: Load the application when the component mounts or ID changes.
  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      const data = await api.getApplicationById(id, token);
      setApplication(data.application);
    }

    load();

    // ⭐ If we came back from EditApplication, refetch again
    if (location.state?.updated) {
      load();
    }
  }, [id, location.state]);
  // Step 5: Delete handler for the current application.
  const handleDelete = async () => {
    // Step 5a: Get auth token from localStorage.
    const token = localStorage.getItem("token");

    // Step 5b: Stop and show message if user is not authenticated.
    if (!token) {
      setError("Please log in.");
      return;
    }

    try {
      // Step 5c: Send delete request to the API.
      await api.deleteApplication(id, token);

      // Step 5d: Redirect user back to applications list after delete.
      window.location.assign("/applications");
    } catch (err) {
      // Step 5e: Show delete error message.
      setError(err.message);
    }
  };

  // Step 6: Render detail screen UI.
  return (
    <section style={{ padding: "1rem" }}>
      <h2>Application Detail</h2>

      {/* Step 6a: Show loading message while data is being fetched. */}
      {loading ? <p>Loading...</p> : null}

      {/* Step 6b: Show error message when an error exists. */}
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      {/* Step 6c: Show application fields when data exists. */}
      {application ? (
        <>
          <p>Company: {application.company}</p>
          <p>Role: {application.role}</p>
          <p>Status: {application.status}</p>
          <p>Date applied: {formatDateDMY(application.date_applied)}</p>
          <p>Notes: {application.notes || "-"}</p>
        </>
      ) : null}

      {/* Step 6d: Provide edit, back, and delete actions. */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <Button color="purple" variant="solid">
          <Link to={`/applications/${id}/edit`}>Edit</Link>
        </Button>
        <Button color="purple" variant="solid">
          <Link to="/applications">Back</Link>
        </Button>
        <Button color="purple" variant="solid" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </section>
  );
}
