import { Link } from "react-router";
import { useState } from "react";
import NewApplicationForm from "../NewApplicationForm/NewApplicationForm";
import { useApplications } from "../../context/applicationsContext";
import { Button } from "antd";
import "./Applications.css";

export default function Applications() {
  // Step 1: Use context to get applications
  const { applications } = useApplications();

  // Step 2: Track whether the new application form is open
  const [showForm, setShowForm] = useState(false);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper function to get status badge class
  const getStatusClass = (status) => {
    return `status-badge status-${status?.toLowerCase() || "applied"}`;
  };

  // Step 3: Render the applications grid UI
  return (
    <section className="applications">
      <div className="applications-header">
        <h2>Applications</h2>
        <Button type="primary" onClick={() => setShowForm(!showForm)}>
          New Application
        </Button>
      </div>

      {/* Step 3a: Show message if no applications exist */}
      {applications.length === 0 ? (
        <p className="no-applications">No applications yet.</p>
      ) : (
        /* Step 3b: Render applications in grid format */
        <div className="applications-grid">
          {applications.map((application) => (
            <div key={application.id} className="application-card">
              <div className="card-header">
                <h3 className="company-name">{application.company}</h3>
                <span className={getStatusClass(application.status)}>
                  {application.status}
                </span>
              </div>
              <div className="card-body">
                <div className="field">
                  <span className="label">Role:</span>
                  <span className="value">{application.role}</span>
                </div>
                <div className="field">
                  <span className="label">Date Applied:</span>
                  <span className="value">
                    {formatDate(application.date_applied)}
                  </span>
                </div>
              </div>
              <div className="card-footer">
                <Link to={`/applications/${application.id}`}>
                  <Button type="primary" ghost size="small">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 3c: Render the form if showForm is true */}
      {showForm && (
        <NewApplicationForm showForm={showForm} setShowForm={setShowForm} />
      )}
    </section>
  );
}
