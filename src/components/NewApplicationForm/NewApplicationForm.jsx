import { useState } from "react";
import { Button } from "antd";
import "./NewApplicationForm.css";

export default function NewApplicationForm({ showForm, setShowForm }) {
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
    event.preventDefault(); // stop page reload

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

      // ❗ Replace this with what you actually want to do:
      // e.g. close the form, refresh list, etc.
      console.log("Created new application:", data);

      setShowForm(false); // example action
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
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value={""}>Select Status</option>
              <option value={"Applied"}>Applied</option>
              <option value={"Interview"}>Interview</option>
              <option value={"Offered"}>Offer</option>
              <option value={"Rejected"}>Rejected</option>
              <option value={"Ghosted"}>Ghosted</option>
            </select>
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
          <Button htmlType="submit">Save</Button>
          <Button type="button" onClick={() => setShowForm(!showForm)}>
            Cancel
          </Button>
        </section>
      </form>
    </section>
  );
}
