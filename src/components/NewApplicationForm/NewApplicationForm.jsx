import { useState, useEffect } from "react";

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
    <section>
      <h1>NEW APPLICATION FORM</h1>
      {/* <form>
            <label>
                <
            </label>
        </form> */}
    </section>
  );
}
