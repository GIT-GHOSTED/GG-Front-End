import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { api } from "../../services/api";
import "../NewApplicationForm/NewApplicationForm.css";

/**
 * Convert a value to YYYY-MM-DD for date input compatibility.
 *
 * @param {string|Date|null|undefined} value
 * @returns {string}
 */
function toDateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

/**
 * Edit application form page.
 *
 * @returns {JSX.Element}
 */
export default function EditApplication() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Saved",
    date_applied: "",
    notes: "",
    contactName: "",
    contactEmail: "",
    followUpDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        const application = data.application;

        setFormData({
          company: application.company || "",
          role: application.role || "",
          status: application.status || "Saved",
          date_applied: toDateInputValue(application.date_applied),
          notes: application.notes || "",
          contactName: application.contactName || "",
          contactEmail: application.contactEmail || "",
          followUpDate: toDateInputValue(application.followUpDate),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadApplication();
  }, [id]);

  /**
   * Controlled form field update handler.
   *
   * @param {string} field
   * @returns {function(React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>): void}
   */
  const setField = (field) => (event) => {
    setFormData((previous) => ({ ...previous, [field]: event.target.value }));
  };

  /**
   * Submit API request to update application details.
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      await api.updateApplication(
        id,
        {
          company: formData.company,
          role: formData.role,
          status: formData.status,
          dateApplied: formData.date_applied || null,
          notes: formData.notes,
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          followUpDate: formData.followUpDate || null,
        },
        token,
      );

      navigate(`/applications/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Step 11: Render the edit form UI.
  return (
    <section className="edit-application">
      <h3>Edit Application #{id}</h3>

      {/* Step 11a: Show loading message while initial data is being fetched. */}
      {loading ? <p>Loading...</p> : null}

      {/* Step 11b: Show error message when one exists. */}
      {error ? <p className="edit-application-error">{error}</p> : null}

      {/* Step 11c: Controlled form bound to formData state and submit handler. */}
      <form className="formContent" onSubmit={handleSubmit}>
        {/* Grid layout used to organize all form input fields */}
        <section className="formGrid">
          <label>
            Company
            <input
              type="text"
              value={formData.company}
              onChange={setField("company")}
              required
            />
          </label>

          <label>
            Role
            <input
              type="text"
              value={formData.role}
              onChange={setField("role")}
              required
            />
          </label>

          <label>
            Status
            <select value={formData.status} onChange={setField("status")}>
              <option value="applied">Applied</option>
              <option value="interview">Interviewed</option>
              <option value="offer">Offered</option>
              <option value="rejected">Rejected</option>
              <option value="ghosted">Ghosted</option>
            </select>
          </label>

          <label>
            Date Applied
            <input
              type="date"
              value={formData.date_applied}
              onChange={setField("date_applied")}
            />
          </label>

          <label>
            Notes
            <textarea
              placeholder="Notes"
              value={formData.notes}
              onChange={setField("notes")}
            />
          </label>

          <label>
            Contact Name
            <input
              type="text"
              value={formData.contactName}
              onChange={setField("contactName")}
            />
          </label>

          <label>
            Contact Email
            <input
              type="email"
              value={formData.contactEmail}
              onChange={setField("contactEmail")}
            />
          </label>

          <label>
            Follow Up Date
            <input
              type="date"
              value={formData.followUpDate}
              onChange={setField("followUpDate")}
            />
          </label>
        </section>

        {/* Section contains action buttons for submitting or canceling */}
        <section className="formActions">
          <button type="submit" disabled={saving}>
            {saving ? "Updating..." : "Update"}
          </button>
          <button type="button" onClick={() => navigate(`/applications/${id}`)}>
            Cancel
          </button>
        </section>
      </form>
    </section>
  );
}
