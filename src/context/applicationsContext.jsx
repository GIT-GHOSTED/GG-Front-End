import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
const ApplicationsContext = createContext();

export function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const loadApplications = async () => {
    // Step 4b: If no token, stop early and ask user to log in.
    if (!token) {
      setError("Please log in.");
      setLoading(false);
      return;
    }

    try {
      // Step 4c: Request applications from the backend API.
      const data = await api.getApplications(token);

      // Step 4d: Save returned applications (or fallback to empty array).
      setApplications(data.applications || []);
    } catch (err) {
      // Step 4e: Show fetch error if request fails.
      setError(err.message);
    } finally {
      // Step 4f: End loading state after request finishes.
      setLoading(false);
    }
  };

  useEffect(() => {
    // Step 4g: Run the async loader.
    loadApplications();
  }, [token]);

  const value = {
    applications: applications,
    setApplications: setApplications,
    loadApplications: loadApplications,
    error: error,
    loading: loading,
  };

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export const useApplications = () => useContext(ApplicationsContext);
