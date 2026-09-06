import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { logout as logoutAPI } from "../services/authService.js";
import toast from "react-hot-toast";
import "../styles/navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutAPI();
    } catch {}
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <span>&lt;/&gt; CodeTranslator</span>
          <span className="navbar-brand-badge">AI 3.6</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`navbar-link ${isActive("/") ? "active" : ""}`}>
            ⚡ Workspace
          </Link>
          <Link
            to="/history"
            className={`navbar-link ${isActive("/history") ? "active" : ""}`}
          >
            📜 History
          </Link>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-user-card">
          {user?.picture ? (
            <img src={user.picture} alt={user?.name} className="navbar-avatar" />
          ) : (
            <div className="navbar-avatar-placeholder">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <span className="navbar-username">{user?.name || "Developer"}</span>
        </div>

        <button className="navbar-logout" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
