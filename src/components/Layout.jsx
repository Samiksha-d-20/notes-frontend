import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Layout.css";

export default function Layout() {
  const { user, logout } = useAuth();
  const displayName = user?.name || user?.email || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-left">
            <NavLink
              to="/"
              end
              className="navbar-brand"
              aria-label="Notes App home">
              <span className="brand-mark">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true">
                  <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v16.5a2.5 2.5 0 0 0-2.5-2.5H5z" />
                  <path d="M5 4.5v15A2.5 2.5 0 0 0 7.5 22H19" />
                  <path d="M9 6h6M9 9h6" />
                </svg>
              </span>
              <span>Notes App</span>
            </NavLink>

            <div className="navbar-links">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }>
                Notes
              </NavLink>

              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }>
                Create
              </NavLink>
            </div>
          </div>

          <div className="navbar-right">
            {user && (
              <span className="welcome-text">
                Welcome back, <strong>{displayName}</strong>
              </span>
            )}
            <div
              className="user-menu"
              aria-label={`Signed in as ${displayName}`}>
              <span className="user-avatar">{initials}</span>
              <svg
                className="user-chevron"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
