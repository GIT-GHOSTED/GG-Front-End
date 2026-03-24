import { Link } from "react-router";
import { Button } from "antd";
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
    <nav>
      {/* Step 2a: Render brand/home link. */}
      <Link to="/">
        <img src={gitGhost} />
      </Link>

      {/* Step 2b: Render right-side nav items based on auth state. */}
      <div style={{ display: "flex", gap: "1rem" }}>
        {token ? (
          <>
            {/* Step 2c: Authenticated links/actions. */}
            <Button color="purple" variant="solid">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button color="purple" variant="solid">
              <Link to="/applications">Applications</Link>
            </Button>

            {/* Step 2d: User hyperlinks. */}
            <Button color="purple" variant="solid">
              <Link to="https://www.linkedin.com/feed/">LinkedIn</Link>
            </Button>
            <Button color="purple" variant="solid">
              <Link to="https://www.ziprecruiter.com/">ZipRecruiter</Link>
            </Button>
            <Button color="purple" variant="solid">
              <Link to="https://www.indeed.com/">Indeed</Link>
            </Button>

            {/* Step 2e: Logout button. */}
            <Button color="purple" variant="solid" onClick={handleLogout}>
              Logout
            </Button>
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
