import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Layout.css";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <nav className="navbar">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
          Home
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
          Create Note
        </NavLink>

        {user && <span>Welcome, {user.name}</span>}

        <button onClick={logout}>Logout</button>
      </nav>

      <Outlet />
    </div>
  );
}
