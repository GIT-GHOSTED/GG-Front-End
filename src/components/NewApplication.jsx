import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function NewApplication() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Saved",
    date_applied: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

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
      await api.createApplication(
        {
          ...formData,
          date_applied: formData.date_applied || null,
        },
        token,
      );
      navigate("/applications");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const setField = (field) => (event) => {
    setFormData((previous) => ({ ...previous, [field]: event.target.value }));
  };

  return (
    <section style={{ padding: "1rem" }}>
      <h2>New Application</h2>
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={setField("company")}
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={setField("role")}
          required
        />
        <select value={formData.status} onChange={setField("status")}>
          <option>Saved</option>
          <option>Applied</option>
          <option>Phone Screen</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input
          type="date"
          value={formData.date_applied}
          onChange={setField("date_applied")}
        />
        <textarea
          placeholder="Notes"
          value={formData.notes}
          onChange={setField("notes")}
        />
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </section>
  );
}
