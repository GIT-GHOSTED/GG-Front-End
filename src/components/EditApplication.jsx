import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

function toDateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export default function EditApplication() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Saved",
    date_applied: "",
    notes: "",
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
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadApplication();
  }, [id]);

  const setField = (field) => (event) => {
    setFormData((previous) => ({ ...previous, [field]: event.target.value }));
  };

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
          ...formData,
          date_applied: formData.date_applied || null,
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

  return (
    <section style={{ padding: "1rem" }}>
      <h2>Edit Application #{id}</h2>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.company}
          onChange={setField("company")}
          required
        />
        <input
          type="text"
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
          {saving ? "Updating..." : "Update"}
        </button>
      </form>
    </section>
  );
}
