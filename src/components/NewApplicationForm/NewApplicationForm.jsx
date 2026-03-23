import { useState } from "react";
import "./NewApplicationForm.css";

export default function NewApplicationForm() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "",
    jobUrl: "",
    dateApplied: "",
    notes: "",
    contactName: "",
    contactEmail: "",
  });

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const createNewApp = async (event) => {
    // event.preventDefault();

    try {
      const res = await fetch(`${API}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed request");

      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="formOverlay">
      <form className="formContent" onSubmit={createNewApp}>
        <h3>New Application</h3>

        <section className="formGrid">
          <label>
            Company
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </label>

          <label>
            Role
            <input name="role" value={formData.role} onChange={handleChange} />
          </label>

          <label>
            Status
            <input
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
          </label>

          <label>
            Job URL
            <input
              type="url"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleChange}
            />
          </label>

          <label>
            Date Applied
            <input
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
            />
          </label>

          <label>
            Notes
            <input
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </label>

          <label>
            Contact Name
            <input
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
            />
          </label>

          <label>
            Contact Email
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
            />
          </label>
        </section>

        <section className="formActions">
          <button type="submit">Save</button>
          <button type="button">Cancel</button>
        </section>
      </form>
    </section>
  );
}
