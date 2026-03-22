import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function NewApplication() {
  // Step 1: Initialize form state for a new application record.
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Saved",
    date_applied: "",
    notes: "",
  });

  // Step 2: Track user-facing errors and submit/loading state.
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Step 3: Prepare navigation after successful creation.
  const navigate = useNavigate();

  // Step 4: Handle form submission to create a new application.
  const handleSubmit = async (event) => {
    // Step 4a: Prevent full page refresh on submit.
    event.preventDefault();

    // Step 4b: Read auth token for protected API endpoint.
    const token = localStorage.getItem("token");

    // Step 4c: Stop early if user is not authenticated.
    if (!token) {
      setError("Please log in.");
      return;
    }

    // Step 4d: Clear previous error and enter saving state.
    setError("");
    setSaving(true);

    try {
      // Step 4e: Send create request; convert empty date string to null.
      await api.createApplication(
        {
          ...formData,
          date_applied: formData.date_applied || null,
        },
        token,
      );

      // Step 4f: Navigate to applications list after successful create.
      navigate("/applications");
    } catch (err) {
      // Step 4g: Show error if API request fails.
      setError(err.message);
    } finally {
      // Step 4h: End saving state in all cases.
      setSaving(false);
    }
  };

  // Step 5: Generic input handler for controlled form fields.
  const setField = (field) => (event) => {
    // Step 5a: Merge previous state with the updated field value.
    setFormData((previous) => ({ ...previous, [field]: event.target.value }));
  };

  // Step 6: Render the new-application form UI.
  return (
    <section style={{ padding: "1rem" }}>
      {/* Step 6a0: Show page title for create flow. */}
      <h2>New Application</h2>

      {/* Step 6a: Show error message when one exists. */}
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      {/* Step 6b: Render controlled form connected to state and submit handler. */}
      <form onSubmit={handleSubmit}>
        {/* Step 6c: Capture company name input. */}
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={setField("company")}
          required
        />

        {/* Step 6d: Capture role/title input. */}
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={setField("role")}
          required
        />

        {/* Step 6e: Capture application status from dropdown options. */}
        <select value={formData.status} onChange={setField("status")}>
          {/* Step 6e1: Saved = drafted application not yet submitted. */}
          <option>Saved</option>
          {/* Step 6e2: Applied = application has been submitted. */}
          <option>Applied</option>
          {/* Step 6e3: Phone Screen = recruiter/intro call stage. */}
          <option>Phone Screen</option>
          {/* Step 6e4: Interview = active interview loop stage. */}
          <option>Interview</option>
          {/* Step 6e5: Offer = offer received stage. */}
          <option>Offer</option>
          {/* Step 6e6: Rejected = closed with rejection stage. */}
          <option>Rejected</option>
        </select>

        {/* Step 6f: Capture optional date applied value. */}
        <input
          type="date"
          value={formData.date_applied}
          onChange={setField("date_applied")}
        />

        {/* Step 6g: Capture optional notes value. */}
        <textarea
          placeholder="Notes"
          value={formData.notes}
          onChange={setField("notes")}
        />

        {/* Step 6h: Submit form; disable button while save request is in progress. */}
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </section>
  );
}
