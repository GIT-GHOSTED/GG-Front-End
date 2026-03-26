import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import "./ApplicationDetail.css";

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

  // Step 4: Load the application when the component mounts or ID changes.
  useEffect(() => {
    async function loadApplication() {
      // Step 4a: Get auth token from localStorage.
      const token = localStorage.getItem("token");

      // Step 4b: Stop and show message if user is not authenticated.
      if (!token) {
        setError("Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Step 4c: Request the application record from the API.
        const data = await api.getApplicationById(id, token);

        // Step 4d: Save returned application in state.
        setApplication(data.application);
      } catch (err) {
        // Step 4e: Show request error message.
        setError(err.message);
      } finally {
        // Step 4f: End loading state regardless of success/failure.
        setLoading(false);
      }
    }

    // Step 4g: Execute the async loader.
    loadApplication();
  }, [id]);

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
    <section className="application-detail">
      <h2>Application Detail</h2>

      {/* Step 6a: Show loading message while data is being fetched. */}
      {loading ? <p>Loading...</p> : null}

      {/* Step 6b: Show error message when an error exists. */}
      {error ? <p className="application-detail-error">{error}</p> : null}

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
      <div className="application-detail-actions">
        <Link to={`/applications/${id}/edit`}>Edit</Link>
        <Link to="/applications">Back</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </section>
  );
}
