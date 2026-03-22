import { Link } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  // Step 1: Define logout behavior.
  const handleLogout = () => {
    // Step 1a: Clear auth token from app state.
    setToken(null);

    // Step 1b: Remove persisted token from localStorage.
    localStorage.removeItem("token");
  };

  // Step 2: Render navigation bar layout.
  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      {/* Step 2a: Render brand/home link. */}
      <Link to="/">Git Ghosted</Link>

      {/* Step 2b: Render right-side nav items based on auth state. */}
      <div style={{ display: "flex", gap: "1rem" }}>
        {token ? (
          <>
            {/* Step 2c: Authenticated links/actions. */}
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/applications">Applications</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {/* Step 2d: Guest links for authentication routes. */}
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
