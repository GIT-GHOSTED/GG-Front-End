import { Link } from "react-router";
import { useState } from "react";
import NewApplicationForm from "../NewApplicationForm/NewApplicationForm";
import { useApplications } from "../../context/applicationsContext";
import { Button, Input } from "antd";
import "./Applications.css";

export default function Applications() {
  // Step 1: Use context to get applications
  const { applications } = useApplications();

  // Step 2: Track whether the new application form is open
  const [showForm, setShowForm] = useState(false);

  //  Search bar input
  const [searchInput, setSearchInput] = useState("");

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

  //Filter applications based on the search input (company or role)
  const filteredApplications = applications.filter((application) => {
    const search = searchInput.toLowerCase();

    return (
      application.company?.toLowerCase().includes(search) ||
      application.role?.toLowerCase().includes(search)
    );
  });

  // Step 3: Render the applications grid UI
  return (
    <section className="applications">
      <div className="applications-header">
        {/* Top row */}
        <div className="applications-header-top">
          <h2>Applications</h2>

          <Button type="primary" onClick={() => setShowForm(!showForm)}>
            New Application
          </Button>
        </div>

        {/* Bottom row */}
        <div className="applications-header-bottom">
          {/* Search bar form Ant-d */}
          <Input
            placeholder="Search by company or role..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            allowClear
          />
        </div>
      </div>

      {/* Step 3a: Show message if no applications exist */}
      {filteredApplications.length === 0 ? (
        <p className="no-applications">
          {applications.length === 0
            ? "No applications yet."
            : "No matching applications found."}
        </p>
      ) : (
        /* Step 3b: Render applications in grid format */
        <div className="applications-grid">
          {filteredApplications.map((application) => (
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
