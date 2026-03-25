import { useState } from "react";
import "./NewApplicationForm.css";
import { useApplications } from "../../context/applicationsContext";

//* Component renders a form that allows user to create and submit
//* a new job application
export default function NewApplicationForm({ showForm, setShowForm }) {
  //* useState object stores all form input values for a new application
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

  //* Retrieve API base URL from environment variables
  const API = import.meta.env.VITE_API_URL;

  //* Retrieve stored authentication token for authorized requests
  const token = localStorage.getItem("token");

  //* Function from context used to refresh applications after new
  //* one is added
  const { loadApplications } = useApplications();

  //* Handles input changes by updating corresponding field in formData state
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //* Handles form submission; sends POST request to create new application
  const createNewApp = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${API}/applications`, {
        method: "POST",
        headers: {
          //* Specifies JSON data format and includes authorization token
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        //* Converts formData object into JSON string for request body
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
              <option value={"Applied"}>Applied</option>
              <option value={"Interview"}>Interview</option>
              <option value={"Offered"}>Offered</option>
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
