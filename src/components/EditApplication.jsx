import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Input, Select } from "antd";
import { api } from "../services/api";

// Step 1: Normalize incoming date values to the YYYY-MM-DD format required by input[type="date"].
function toDateInputValue(value) {
  // Step 1a: Return empty when no value exists.
  if (!value) return "";

  // Step 1b: Convert raw value to a Date object.
  const date = new Date(value);

  // Step 1c: Guard against invalid date values.
  if (Number.isNaN(date.getTime())) return "";

  // Step 1d: Return only the date portion (YYYY-MM-DD).
  return date.toISOString().slice(0, 10);
}

export default function EditApplication() {
  // Step 2: Read the application ID from the route.
  const { id } = useParams();

  // Step 3: Initialize form state for editable application fields.
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Saved",
    date_applied: "",
    notes: "",
  });

  // Step 4: Track page loading status while fetching existing application data.
  const [loading, setLoading] = useState(true);

  // Step 5: Track submit status while sending update requests.
  const [saving, setSaving] = useState(false);

  // Step 6: Track and display user-facing error messages.
  const [error, setError] = useState("");

  // Step 7: Prepare navigation after successful update.
  const navigate = useNavigate();

  // Step 8: Load the current application once on mount (or when ID changes).
  useEffect(() => {
    async function loadApplication() {
      // Step 8a: Read auth token for protected API call.
      const token = localStorage.getItem("token");

      // Step 8b: Stop early if user is not authenticated.
      if (!token) {
        setError("Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Step 8c: Request application details by ID.
        const data = await api.getApplicationById(id, token);
        const application = data.application;

        // Step 8d: Fill form fields with existing values and safe fallbacks.
        setFormData({
          company: application.company || "",
          role: application.role || "",
          status: application.status || "Saved",
          date_applied: toDateInputValue(application.date_applied),
          notes: application.notes || "",
        });
      } catch (err) {
        // Step 8e: Show error if fetch fails.
        setError(err.message);
      } finally {
        // Step 8f: End loading state in all cases.
        setLoading(false);
      }
    }

    // Step 8g: Execute loader.
    loadApplication();
  }, [id]);

  // Step 9: Generic field updater to keep each input controlled.
  const setField = (field) => (event) => {
    // Step 9a: Merge previous form data with the updated field value.
    setFormData((previous) => ({ ...previous, [field]: event.target.value }));
  };

  // Step 10: Submit updated application data to the API.
  const handleSubmit = async (event) => {
    // Step 10a: Prevent full page refresh.
    event.preventDefault();

    // Step 10b: Read auth token for protected update endpoint.
    const token = localStorage.getItem("token");

    // Step 10c: Stop early if not authenticated.
    if (!token) {
      setError("Please log in.");
      return;
    }

    // Step 10d: Reset previous errors and set saving state.
    setError("");
    setSaving(true);

    try {
      // Step 10e: Send full update payload; convert empty date string to null.
      await api.updateApplication(
        id,
        {
          ...formData,
          date_applied: formData.date_applied || null,
        },
        token,
      );

      // Step 10f: Navigate back to the application detail page after success.
      navigate(`/applications/${id}`, { state: { updated: true } });
    } catch (err) {
      // Step 10g: Show update error message.
      setError(err.message);
    } finally {
      // Step 10h: End saving state in all cases.
      setSaving(false);
    }
  };

  // Step 11: Render the edit form UI.
  return (
    <section style={{ padding: "1rem", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Edit Application #{id}</h2>

      {/* Step 11a: Show loading message while initial data is being fetched. */}
      {loading ? <p>Loading...</p> : null}

      {/* Step 11b: Show error message when one exists. */}
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      {/* Step 11c: Controlled form bound to formData state and submit handler. */}
      <form onSubmit={handleSubmit}>
        {/* Step 11d: Edit company value. */}
        <Input
          placeholder="Basic usage"
          type="text"
          value={formData.company}
          onChange={setField("company")}
          required
        />

        {/* Step 11e: Edit role value. */}
        <Input
          placeholder="Basic usage"
          type="text"
          value={formData.role}
          onChange={setField("role")}
          required
        />

        {/* Step 11f: Edit pipeline status value. */}
        <select value={formData.status} onChange={setField("status")}>
          <option>Saved</option>
          <option>Applied</option>
          <option>Phone Screen</option>
          <option>Interview</option>
          <option>Offered</option>
          <option>Rejected</option>
        </select>

        {/* Step 11g: Edit date applied value using date input format. */}
        <Input
          type="date"
          value={formData.date_applied}
          onChange={setField("date_applied")}
        />

        {/* Step 11h: Edit notes value. */}
        <Input
          rows={4}
          maxLength={6}
          placeholder="Notes"
          value={formData.notes}
          onChange={setField("notes")}
        />

        {/* Step 11i: Submit updates; disable button while request is saving. */}
        <Button
          color="purple"
          variant="solid"
          htmlType="submit"
          disabled={saving}
        >
          {saving ? "Updating..." : "Update"}
        </Button>
      </form>
    </section>
  );
}
