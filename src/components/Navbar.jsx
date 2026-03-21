import { Link } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <Link to="/">Git Ghosted</Link>

      <div style={{ display: "flex", gap: "1rem" }}>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/applications">Applications</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
