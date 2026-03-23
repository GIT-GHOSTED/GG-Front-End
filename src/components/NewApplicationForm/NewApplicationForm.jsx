//TODO ADD BETTER COMMENTS
import { useState, useEffect } from "react";
import "./NewApplicationForm.css";

export default function NewApplicationForm() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [dateApplied, setdateApplied] = useState("");
  const [notes, setNotes] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  return (
    <section className="formOverlay">
      <form className="formContent">
        <h3>New Application</h3>

        <section className="formGrid">
          <label>
            Company
            <input type="text" />
          </label>

          <label>
            Role
            <input type="text" />
          </label>

          <label>
            Status
            <input type="text" />
          </label>

          <label>
            Job URL
            <input type="url" />
          </label>

          <label>
            Date Applied
            <input type="date" />
          </label>

          <label>
            Notes
            <input type="text" />
          </label>

          <label>
            Contact Name
            <input type="text" />
          </label>

          <label>
            Contact Email
            <input type="email" />
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
