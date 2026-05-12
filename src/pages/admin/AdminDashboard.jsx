import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AdminStyles.css";

/* ── SVG Icons for sidebar ── */
const Icons = {
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/>
      <rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>
    </svg>
  ),
  Orders: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
    </svg>
  ),
  Products: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
    </svg>
  ),
  Categories: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2H2v10h10V2z"/><path d="M22 12H12v10h10V12z"/>
      <circle cx="17" cy="7" r="5"/><path d="m2 22 10-10"/>
    </svg>
  ),
  Slots: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Analytics: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Home: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
};

const NAV_ITEMS = [
  { label: "Dashboard",     path: "/admin",            Icon: Icons.Dashboard },
  { label: "Commandes",     path: "/admin/orders",     Icon: Icons.Orders },
  { label: "Produits",      path: "/admin/products",   Icon: Icons.Products },
  { label: "Catégories",    path: "/admin/categories", Icon: Icons.Categories },
  { label: "Créneaux",      path: "/admin/slots",      Icon: Icons.Slots },
  { label: "Utilisateurs",  path: "/admin/users",      Icon: Icons.Users },
  { label: "Analytiques",   path: "/admin/analytics",  Icon: Icons.Analytics },
];

const STAT_COLORS = {
  red:    { bg: "rgba(232,39,42,0.08)",  border: "rgba(232,39,42,0.2)",  color: "#E8272A" },
  green:  { bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.2)",  color: "#22C55E" },
  yellow: { bg: "rgba(249,192,33,0.08)", border: "rgba(249,192,33,0.2)", color: "#F9C021" },
  purple: { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)", color: "#8B5CF6" },
};

const STATS = [
  { label: "Commandes aujourd'hui", value: "24",    delta: "+3",    deltaType: "up",      theme: "red",    Icon: Icons.Orders },
  { label: "Revenus (DH)",          value: "1,840", delta: "+12%",  deltaType: "up",      theme: "green",  Icon: Icons.Analytics },
  { label: "Produits actifs",       value: "38",    delta: "stable",deltaType: "neutral", theme: "yellow", Icon: Icons.Products },
  { label: "Utilisateurs",          value: "312",   delta: "+7",    deltaType: "up",      theme: "purple", Icon: Icons.Users },
];

function AdminDashboard() {
  const location = useLocation();
  const { logout } = useAuth();
  const isDashboardRoot = location.pathname === "/admin";

  return (
    <div className="admin-layout">
      {/* ── Sidebar ── */}
      <aside className="admin-side">
        <div className="admin-side-header">
          <Link to="/" className="admin-side-brand">
            <div className="admin-side-brand-icon">B</div>
            <span className="admin-side-brand-text">
              Buvette <span>Univ</span>
            </span>
          </Link>
          <p className="admin-side-badge">Administration</p>
        </div>

        <nav className="admin-side-nav">
          <p className="admin-side-nav-label">Menu principal</p>
          {NAV_ITEMS.map(({ label, path, Icon }) => (
            <Link
              key={path}
              to={path}
              className={`admin-side-link ${location.pathname === path ? "active" : ""}`}
            >
              <Icon />
              {label}
            </Link>
          ))}
        </nav>

        <div className="admin-side-footer">
          <button className="admin-side-logout" onClick={logout}>
            <Icons.Logout /> Déconnexion
          </button>
          <Link to="/" className="admin-side-back">
            <Icons.Home style={{ width: 14, height: 14, display: "inline", verticalAlign: "-2px", marginRight: 4 }} />
            Retour au site
          </Link>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="admin-main">
        {isDashboardRoot ? (
          <div className="admin-animate-in">
            <div className="admin-page-header">
              <h1 className="admin-page-title">Dashboard</h1>
              <p className="admin-page-subtitle">Vue d'ensemble — aujourd'hui</p>
            </div>

            {/* Stats */}
            <div className="admin-stats-grid">
              {STATS.map(({ label, value, delta, deltaType, theme, Icon }) => {
                const t = STAT_COLORS[theme];
                return (
                  <div key={label} className="admin-stat-card">
                    <div className="admin-stat-top">
                      <div className="admin-stat-icon" style={{
                        background: t.bg, border: `1px solid ${t.border}`, color: t.color,
                      }}>
                        <Icon />
                      </div>
                      <span className={`admin-stat-delta ${deltaType}`}>{delta}</span>
                    </div>
                    <div className="admin-stat-value">{value}</div>
                    <div className="admin-stat-label">{label}</div>
                  </div>
                );
              })}
            </div>

            {/* Quick links */}
            <p className="admin-section-title">Accès rapide</p>
            <div className="admin-quick-grid">
              {NAV_ITEMS.slice(1).map(({ label, path, Icon }) => {
                const colors = ["#E8272A","#22C55E","#F9C021","#8B5CF6","#F59E0B","#3B82F6"];
                const idx = NAV_ITEMS.findIndex(n => n.path === path) - 1;
                const c = colors[idx % colors.length];
                return (
                  <Link key={path} to={path} className="admin-quick-link">
                    <div className="admin-quick-link-icon" style={{
                      background: `${c}14`, border: `1px solid ${c}30`, color: c,
                    }}>
                      <Icon />
                    </div>
                    <span className="admin-quick-link-label">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;