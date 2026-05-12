import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const T = {
  blue:   "#d82323",
  blueDk: "#9ce7bf",
  blueLt: "#edd0c0",
  gray50: "#f0e0cb",
  gray100:"#f6dfc9",
  gray200:"#E5E7EB",
  gray400:"#9CA3AF",
  gray600:"#4B5563",
  gray800:"#1F2937",
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLink = (to, label) => ({
    style: {
      fontSize: "0.88rem",
      fontWeight: isActive(to) ? 600 : 400,
      color: isActive(to) ? T.blue : T.gray600,
      textDecoration: "none",
      paddingBottom: 2,
      borderBottom: isActive(to) ? `2px solid ${T.blue}` : "2px solid transparent",
      transition: "all 0.2s",
    },
  });

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#ffffff",
      borderBottom: `1px solid ${T.gray100}`,
      boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 1.5rem", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9, background: T.blue,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: "1.1rem",
            boxShadow: `0 4px 12px rgba(37,99,235,0.3)`,
          }}>B</div>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: T.gray800 }}>
            Buvette <span style={{ color: T.blue }}>Univ</span>
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link to="/" {...navLink("/", "Accueil")}>Accueil</Link>
          <Link to="/catalogue" {...navLink("/catalogue", "Catalogue")}>Catalogue</Link>
          {user && (
            <Link to="/mes-commandes" {...navLink("/mes-commandes", "Mes commandes")}>
              Mes commandes
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin" {...navLink("/admin", "Admin")} style={{ ...navLink("/admin").style, color: T.blueDk }}>
              Dashboard
            </Link>
          )}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", position: "relative" }}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: T.blueLt, border: `2px solid ${T.blue}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.82rem", color: T.blue,
                  cursor: "pointer",
                }}
              >
                {initials}
              </button>

              {menuOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 10px)", right: 0,
                  background: "#f3debe", borderRadius: 12, border: `1px solid ${T.gray200}`,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)", minWidth: 180,
                  overflow: "hidden", zIndex: 200,
                }}>
                  <div style={{ padding: "0.75rem 1rem", borderBottom: `1px solid ${T.gray100}` }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: T.gray800 }}>{user.name}</div>
                    <div style={{ fontSize: "0.75rem", color: T.gray400 }}>{user.email}</div>
                  </div>
                  {[["Mon profil", "/profil"], ["Mes commandes", "/mes-commandes"]].map(([label, path]) => (
                    <Link key={path} to={path} onClick={() => setMenuOpen(false)} style={{
                      display: "block", padding: "0.7rem 1rem",
                      fontSize: "0.85rem", color: T.gray600, textDecoration: "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = T.gray50}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      {label}
                    </Link>
                  ))}
                  <button onClick={() => { logout(); setMenuOpen(false); }} style={{
                    width: "100%", padding: "0.7rem 1rem", textAlign: "left",
                    background: "none", border: "none", borderTop: `1px solid ${T.gray100}`,
                    fontSize: "0.85rem", color: "#EF4444", cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                  }}>
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link to="/login" style={{
                padding: "8px 16px", borderRadius: 9,
                border: `1.5px solid ${T.gray200}`, color: T.gray600,
                fontSize: "0.85rem", fontWeight: 600, textDecoration: "none",
                background: "#fdfdfd", transition: "all 0.2s",
              }}>
                Connexion
              </Link>
              <Link to="/register" style={{
                padding: "8px 16px", borderRadius: 9,
                background: T.blue, color: "#fdfbf8",
                fontSize: "0.85rem", fontWeight: 600, textDecoration: "none",
                boxShadow: `0 4px 12px rgba(37,99,235,0.3)`, transition: "all 0.2s",
              }}>
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}