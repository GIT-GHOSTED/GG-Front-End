import { useState } from "react";
import "./NewApplicationForm.css";
import { useApplications } from "../../context/applicationsContext";

/**
 * New application form modal.
 *
 * @param {{showForm: boolean, setShowForm: Function}} props
 * @returns {JSX.Element}
 */
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
    followUpDate: "",
  });

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const { loadApplications } = useApplications();

  /**
   * Update form state on changes.
   *
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} event
   */
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Submit new application form and persist to API.
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const createNewApp = async (event) => {
    console.log(formData); //fix DELETE
    event.preventDefault();

    try {
      const res = await fetch(`${API}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      //* Throws error if request fails
      if (!res.ok) throw new Error("Failed request");

      //* Reload updated applications list after successful submission
      await loadApplications();

      //* Closes form modal after submission
      setShowForm(!showForm);

      //* Parses response data (not directly used here but ensures completion)
      await res.json();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    //* Overlay container that displays form as modal on screen
    <section className="formOverlay">
      {/* //* Form container that holds all input fields and actions */}
      <form className="formContent" onSubmit={createNewApp}>
        <h3>New Application</h3>

        {/* //* Grid layout used to organize all form input fields */}
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
            {/* //* Implements dropdown menu */}
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {/* //* Gives all these status options for dropdown menu*/}
              <option value={""}>Select Status</option>
              <option value={"applied"}>Applied</option>
              <option value={"interviewed"}>Interviewed</option>
              <option value={"offered"}>Offered</option>
              <option value={"rejected"}>Rejected</option>
              <option value={"ghosted"}>Ghosted</option>
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

          <label>
            Follow-up Date
            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
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
        </section>

        {/* //* Section contains action buttons for submitting or closing form */}
        <section className="formActions">
          <button type="submit">Save</button>

          {/* //* Cancels form and closes modal without saving data */}
          <button type="button" onClick={() => setShowForm(!showForm)}>
            Cancel
          </button>
        </section>
      </form>
    </section>
  );
}
