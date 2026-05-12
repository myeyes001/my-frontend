import { useState } from "react";

const MOCK_USERS = [
  { id: 1, name: "Youssef El Amri",  email: "youssef@univ.ma",  role: "admin",    created: "2026-01-15", orders: 45 },
  { id: 2, name: "Sara Benali",       email: "sara@univ.ma",     role: "etudiant", created: "2026-02-10", orders: 23 },
  { id: 3, name: "Ahmed Tazi",        email: "ahmed@univ.ma",    role: "etudiant", created: "2026-02-28", orders: 67 },
  { id: 4, name: "Fatima Zahra",      email: "fatima@univ.ma",   role: "etudiant", created: "2026-03-05", orders: 12 },
  { id: 5, name: "Karim Idrissi",     email: "karim@univ.ma",    role: "etudiant", created: "2026-03-18", orders: 34 },
  { id: 6, name: "Nadia Ouazzani",    email: "nadia@univ.ma",    role: "admin",    created: "2026-01-20", orders: 8 },
  { id: 7, name: "Omar Chraibi",      email: "omar@univ.ma",     role: "etudiant", created: "2026-04-02", orders: 19 },
  { id: 8, name: "Leila Mansouri",    email: "leila@univ.ma",    role: "etudiant", created: "2026-04-15", orders: 56 },
];

const ROLE_MAP = {
  admin:    { label: "Admin",    cls: "admin-badge-danger" },
  etudiant: { label: "Étudiant", cls: "admin-badge-success" },
};

function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Tous");
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = MOCK_USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "Tous" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="admin-animate-in">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Gestion des Utilisateurs</h1>
        <p className="admin-page-subtitle">Gérez les comptes étudiants et administrateurs</p>
      </div>

      {/* Mini stats */}
      <div className="admin-stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: "1.5rem" }}>
        {[
          { label: "Total utilisateurs", value: MOCK_USERS.length, color: "#8B5CF6" },
          { label: "Admins",             value: MOCK_USERS.filter(u => u.role === "admin").length, color: "#E8272A" },
          { label: "Étudiants",          value: MOCK_USERS.filter(u => u.role === "etudiant").length, color: "#22C55E" },
        ].map(s => (
          <div key={s.label} className="admin-stat-card" style={{ padding: "1.15rem 1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%", background: s.color,
                boxShadow: `0 0 8px ${s.color}50`,
              }}/>
              <div>
                <div style={{ fontSize: "1.35rem", fontWeight: 800 }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(0,0,0,0.45)", fontWeight: 500 }}>{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["Tous", "admin", "etudiant"].map(r => (
              <button key={r} onClick={() => setRoleFilter(r)}
                className={`admin-btn admin-btn-sm ${roleFilter === r ? "admin-btn-primary" : "admin-btn-outline"}`}
              >
                {r === "Tous" ? "Tous" : r === "admin" ? "Admins" : "Étudiants"}
              </button>
            ))}
          </div>
          <div className="admin-table-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Rechercher par nom ou email..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">👥</div>
            <div className="admin-empty-text">Aucun utilisateur trouvé</div>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Inscrit le</th>
                <th>Commandes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => {
                const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
                const role = ROLE_MAP[user.role];
                return (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: 38, height: 38, borderRadius: 12,
                          background: user.role === "admin"
                            ? "linear-gradient(135deg, rgba(232,39,42,0.1), rgba(232,39,42,0.05))"
                            : "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.05))",
                          border: `1px solid ${user.role === "admin" ? "rgba(232,39,42,0.2)" : "rgba(34,197,94,0.2)"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 700, fontSize: "0.72rem",
                          color: user.role === "admin" ? "#E8272A" : "#22C55E",
                        }}>
                          {initials}
                        </div>
                        <span style={{ fontWeight: 600 }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.82rem" }}>{user.email}</td>
                    <td><span className={`admin-badge ${role.cls}`}>{role.label}</span></td>
                    <td style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.82rem" }}>{user.created}</td>
                    <td style={{ fontWeight: 600 }}>{user.orders}</td>
                    <td>
                      <button className="admin-btn admin-btn-sm admin-btn-outline"
                        onClick={() => setSelectedUser(user)}>
                        Voir
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* User detail modal */}
      {selectedUser && (
        <div className="admin-modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Profil utilisateur</h3>
              <button className="admin-modal-close" onClick={() => setSelectedUser(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 20, margin: "0 auto 0.75rem",
                  background: selectedUser.role === "admin"
                    ? "linear-gradient(135deg, #E8272A, #C01F22)"
                    : "linear-gradient(135deg, #22C55E, #16A34A)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 800, fontSize: "1.1rem",
                  boxShadow: selectedUser.role === "admin"
                    ? "0 8px 24px rgba(232,39,42,0.25)"
                    : "0 8px 24px rgba(34,197,94,0.25)",
                }}>
                  {selectedUser.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>{selectedUser.name}</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(0,0,0,0.45)" }}>{selectedUser.email}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Rôle</label>
                  <select className="admin-form-select" defaultValue={selectedUser.role}>
                    <option value="etudiant">Étudiant</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Commandes</label>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#E8272A", paddingTop: "0.35rem" }}>
                    {selectedUser.orders}
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-danger">Suspendre</button>
              <button className="admin-btn admin-btn-primary">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;