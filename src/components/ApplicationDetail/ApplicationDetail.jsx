import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import "./ApplicationDetail.css";

/**
 * Format a date value as Month Day, Year (e.g., January 1, 2025).
 *
 * @param {string|Date|null|undefined} value - Date value from API or DB.
 * @returns {string} Formatted date string or '-' if invalid.
 */
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

/**
 * Application detail page that fetches and renders a single application.
 *
 * @returns {JSX.Element} The application detail view.
 */
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

  /**
   * Delete the current application and navigate back to the applications list.
   */
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

  // Step 6: Render detail screen UI.
  return (
    <section className="application-detail">
      <div className="application-detail-header">
        <h2>Application Detail</h2>
        {/* Step 6d: Provide edit and delete actions. */}
        <div className="application-detail-actions">
          <Link to={`/applications/${id}/edit`}>Edit</Link>
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {/* Step 6a: Show loading message while data is being fetched. */}
      {loading ? <p>Loading...</p> : null}

      {/* Step 6b: Show error message when an error exists. */}
      {error ? <p className="application-detail-error">{error}</p> : null}

      {/* Step 6c: Show application fields when data exists. */}
      {application ? (
        <>
          <div className="application-detail-content">
            <div className="application-info-block">
              <div className="info-grid">
                <div className="info-field">
                  <label>Company</label>
                  <span>{application.company}</span>
                </div>
                <div className="info-field">
                  <label>Role</label>
                  <span>{application.role}</span>
                </div>
                <div className="info-field">
                  <label>Status</label>
                  <span>{application.status}</span>
                </div>
                <div className="info-field">
                  <label>Job URL</label>
                  <span>{application.job_url}</span>
                </div>
                <div className="info-field">
                  <label>Date Applied</label>
                  <span>{formatDateDMY(application.date_applied)}</span>
                </div>
                <div className="info-field">
                  <label>Contact Name</label>
                  <span>{application.contact_name}</span>
                </div>
                <div className="info-field">
                  <label>Contact Email</label>
                  <span>{application.contact_email}</span>
                </div>
                <div className="info-field">
                  <label>Follow-up Date</label>
                  <span>{formatDateDMY(application.followup_date)}</span>
                </div>
              </div>
            </div>
            <div className="notes-section">
              <label>Notes</label>
              <div className="notes-content">
                {application.notes || "No notes available."}
              </div>
            </div>
          </div>
          {/* Back button at bottom */}
          <div className="back-button-container">
            <Link to="/applications" className="back-button">
              Back
            </Link>
          </div>
        </>
      ) : null}
    </section>
  );
}
