import { NavLink, Outlet } from "react-router-dom";
import "./Layout.scss";

const navItems = [
  { to: "/", label: "Dashboard", icon: "📊" },
  { to: "/editable", label: "Editable Dashboard", icon: "✏️" },
  { to: "/explore", label: "Question Explorer", icon: "🔍" },
  { to: "/collections", label: "Collections", icon: "📁" },
  { to: "/theme", label: "Theme Playground", icon: "🎨" },
  { to: "/checklist", label: "Requirements Checklist", icon: "✅" },
];

export default function Layout() {
  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="sidebar__brand">
          <h2>Metabase POC</h2>
          <span>OT4R Embedded Analytics</span>
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar__link${isActive ? " sidebar__link--active" : ""}`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="sidebar__footer">
          Connected to Metabase
          <br />
          {import.meta.env.VITE_METABASE_INSTANCE_URL || "http://localhost:3000"}
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
