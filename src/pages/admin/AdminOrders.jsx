import { useState } from "react";

const MOCK_ORDERS = [
  { id: 1001, client: "Youssef El Amri",   date: "2026-05-10", total: "85 DH",  status: "en_cours",  items: 3 },
  { id: 1002, client: "Sara Benali",        date: "2026-05-10", total: "42 DH",  status: "prete",     items: 2 },
  { id: 1003, client: "Ahmed Tazi",         date: "2026-05-10", total: "120 DH", status: "livree",    items: 5 },
  { id: 1004, client: "Fatima Zahra",       date: "2026-05-09", total: "35 DH",  status: "annulee",   items: 1 },
  { id: 1005, client: "Karim Idrissi",      date: "2026-05-09", total: "68 DH",  status: "en_cours",  items: 3 },
  { id: 1006, client: "Nadia Ouazzani",     date: "2026-05-09", total: "95 DH",  status: "prete",     items: 4 },
  { id: 1007, client: "Omar Chraibi",       date: "2026-05-08", total: "55 DH",  status: "livree",    items: 2 },
  { id: 1008, client: "Leila Mansouri",     date: "2026-05-08", total: "110 DH", status: "livree",    items: 4 },
];

const STATUS_MAP = {
  en_cours: { label: "En cours",  cls: "admin-badge-warning" },
  prete:    { label: "Prête",     cls: "admin-badge-info" },
  livree:   { label: "Livrée",    cls: "admin-badge-success" },
  annulee:  { label: "Annulée",   cls: "admin-badge-danger" },
};

const FILTERS = ["Tous", "en_cours", "prete", "livree", "annulee"];
const FILTER_LABELS = { Tous: "Tous", en_cours: "En cours", prete: "Prête", livree: "Livrée", annulee: "Annulée" };

function AdminOrders() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = MOCK_ORDERS.filter(o => {
    const matchSearch = o.client.toLowerCase().includes(search.toLowerCase()) || String(o.id).includes(search);
    const matchFilter = filter === "Tous" || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="admin-animate-in">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Gestion des Commandes</h1>
        <p className="admin-page-subtitle">Suivez et gérez toutes les commandes en temps réel</p>
      </div>

      {/* Stats row */}
      <div className="admin-stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { label: "Total",     value: MOCK_ORDERS.length,                                    color: "#E8272A" },
          { label: "En cours",  value: MOCK_ORDERS.filter(o => o.status === "en_cours").length, color: "#F9C021" },
          { label: "Prêtes",    value: MOCK_ORDERS.filter(o => o.status === "prete").length,    color: "#8B5CF6" },
          { label: "Livrées",   value: MOCK_ORDERS.filter(o => o.status === "livree").length,   color: "#22C55E" },
        ].map(s => (
          <div key={s.label} className="admin-stat-card" style={{ padding: "1.15rem 1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%", background: s.color,
                boxShadow: `0 0 8px ${s.color}50`,
              }} />
              <div>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#1F1F1F" }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(0,0,0,0.45)", fontWeight: 500 }}>{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`admin-btn admin-btn-sm ${filter === f ? "admin-btn-primary" : "admin-btn-outline"}`}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>
          <div className="admin-table-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Rechercher par nom ou #ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">📦</div>
            <div className="admin-empty-text">Aucune commande trouvée</div>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Client</th>
                <th>Date</th>
                <th>Articles</th>
                <th>Total</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => {
                const st = STATUS_MAP[order.status];
                return (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 700, color: "#E8272A" }}>#{order.id}</td>
                    <td style={{ fontWeight: 600 }}>{order.client}</td>
                    <td style={{ color: "rgba(0,0,0,0.5)" }}>{order.date}</td>
                    <td>{order.items} article{order.items > 1 ? "s" : ""}</td>
                    <td style={{ fontWeight: 700 }}>{order.total}</td>
                    <td><span className={`admin-badge ${st.cls}`}>{st.label}</span></td>
                    <td>
                      <button className="admin-btn admin-btn-sm admin-btn-outline"
                        onClick={() => setSelectedOrder(order)}>
                        Détails
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="admin-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Commande #{selectedOrder.id}</h3>
              <button className="admin-modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Client</label>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{selectedOrder.client}</div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Date</label>
                  <div style={{ fontSize: "0.9rem" }}>{selectedOrder.date}</div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Total</label>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#E8272A" }}>{selectedOrder.total}</div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Statut</label>
                  <span className={`admin-badge ${STATUS_MAP[selectedOrder.status].cls}`}>
                    {STATUS_MAP[selectedOrder.status].label}
                  </span>
                </div>
              </div>
              <div className="admin-form-group" style={{ marginTop: "0.5rem" }}>
                <label className="admin-form-label">Changer le statut</label>
                <select className="admin-form-select" defaultValue={selectedOrder.status}>
                  <option value="en_cours">En cours</option>
                  <option value="prete">Prête</option>
                  <option value="livree">Livrée</option>
                  <option value="annulee">Annulée</option>
                </select>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-outline" onClick={() => setSelectedOrder(null)}>Fermer</button>
              <button className="admin-btn admin-btn-primary">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;