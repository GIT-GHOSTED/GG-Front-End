import { Link } from "react-router";
import gitGhost from "../../img/Dark-Ghost.png";

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
        padding: "1rem",
      }}
    >
      {/* Step 2a: Render brand/home link. */}
      <Link to="/">
        <img src={gitGhost} />
      </Link>

      {/* Step 2b: Render right-side nav items based on auth state. */}
      <div style={{ display: "flex", gap: "1rem" }}>
        {token ? (
          <>
            {/* Step 2c: Authenticated links/actions. */}
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/applications">Applications</Link>
            <Link to="https://www.linkedin.com/feed/">LinkedIn</Link>
            <Link to="https://www.ziprecruiter.com/">ZipRecruiter</Link>
            <Link to="https://www.indeed.com/">Indeed</Link>
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
