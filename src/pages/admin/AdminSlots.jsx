import { useState } from "react";

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const DAY_COLORS = { Lundi: "#E8272A", Mardi: "#F9C021", Mercredi: "#22C55E", Jeudi: "#8B5CF6", Vendredi: "#F59E0B" };

const MOCK_SLOTS = [
  { id: 1, day: "Lundi",    start: "08:00", end: "09:00", capacity: 15, booked: 12 },
  { id: 2, day: "Lundi",    start: "09:00", end: "10:00", capacity: 15, booked: 8  },
  { id: 3, day: "Lundi",    start: "12:00", end: "13:00", capacity: 20, booked: 20 },
  { id: 4, day: "Mardi",    start: "08:00", end: "09:00", capacity: 15, booked: 5  },
  { id: 5, day: "Mardi",    start: "12:00", end: "13:00", capacity: 20, booked: 14 },
  { id: 6, day: "Mercredi", start: "10:00", end: "11:00", capacity: 15, booked: 10 },
  { id: 7, day: "Mercredi", start: "12:00", end: "13:00", capacity: 20, booked: 18 },
  { id: 8, day: "Jeudi",    start: "08:00", end: "09:00", capacity: 15, booked: 7  },
  { id: 9, day: "Jeudi",    start: "13:00", end: "14:00", capacity: 15, booked: 3  },
  { id: 10, day: "Vendredi", start: "12:00", end: "13:00", capacity: 25, booked: 22 },
];

function AdminSlots() {
  const [selectedDay, setSelectedDay] = useState("Tous");
  const [showModal, setShowModal] = useState(false);
  const [editSlot, setEditSlot] = useState(null);

  const filtered = selectedDay === "Tous" ? MOCK_SLOTS : MOCK_SLOTS.filter(s => s.day === selectedDay);

  const openAdd = () => { setEditSlot(null); setShowModal(true); };
  const openEdit = (s) => { setEditSlot(s); setShowModal(true); };

  return (
    <div className="admin-animate-in">
      <div className="admin-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 className="admin-page-title">Gestion des Créneaux</h1>
          <p className="admin-page-subtitle">Configurez les créneaux de retrait pour les commandes</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Ajouter un créneau
        </button>
      </div>

      {/* Day filter pills */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <button
          onClick={() => setSelectedDay("Tous")}
          className={`admin-btn admin-btn-sm ${selectedDay === "Tous" ? "admin-btn-primary" : "admin-btn-outline"}`}
        >
          Tous les jours
        </button>
        {DAYS.map(day => (
          <button key={day}
            onClick={() => setSelectedDay(day)}
            className={`admin-btn admin-btn-sm ${selectedDay === day ? "admin-btn-primary" : "admin-btn-outline"}`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Slots grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1rem",
      }}>
        {filtered.map(slot => {
          const pct = Math.round((slot.booked / slot.capacity) * 100);
          const isFull = pct >= 100;
          const c = DAY_COLORS[slot.day] || "#E8272A";

          return (
            <div key={slot.id} className="admin-stat-card" style={{ padding: "1.5rem", position: "relative", overflow: "hidden" }}>
              {/* Decorative corner */}
              <div style={{
                position: "absolute", top: -10, right: -10,
                width: 50, height: 50, borderRadius: "50%",
                background: `${c}0a`, border: `1px solid ${c}12`,
              }}/>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{
                  background: `${c}14`, color: c, border: `1px solid ${c}30`,
                  borderRadius: 8, padding: "0.2rem 0.65rem",
                  fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.04em",
                }}>
                  {slot.day}
                </span>
                {isFull && (
                  <span className="admin-badge admin-badge-danger">Complet</span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span style={{ fontWeight: 700, fontSize: "1.15rem", color: "#1F1F1F" }}>
                  {slot.start} — {slot.end}
                </span>
              </div>

              {/* Capacity bar */}
              <div style={{ marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "rgba(0,0,0,0.45)", marginBottom: "0.35rem" }}>
                  <span>Réservé: {slot.booked}/{slot.capacity}</span>
                  <span style={{ fontWeight: 700, color: isFull ? "#E8272A" : c }}>{pct}%</span>
                </div>
                <div style={{
                  height: 6, borderRadius: 3,
                  background: "rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${Math.min(pct, 100)}%`, height: "100%",
                    borderRadius: 3,
                    background: isFull
                      ? "linear-gradient(90deg, #E8272A, #FF5558)"
                      : `linear-gradient(90deg, ${c}, ${c}cc)`,
                    transition: "width 0.5s ease",
                  }}/>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => openEdit(slot)}>
                  Modifier
                </button>
                <button className="admin-btn admin-btn-sm admin-btn-danger">
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="admin-empty" style={{ marginTop: "2rem" }}>
          <div className="admin-empty-icon">🕐</div>
          <div className="admin-empty-text">Aucun créneau pour ce jour</div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{editSlot ? "Modifier le créneau" : "Nouveau créneau"}</h3>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Jour</label>
                <select className="admin-form-select" defaultValue={editSlot?.day || ""}>
                  <option value="">Sélectionner un jour</option>
                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Heure début</label>
                  <input className="admin-form-input" type="time" defaultValue={editSlot?.start || ""} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Heure fin</label>
                  <input className="admin-form-input" type="time" defaultValue={editSlot?.end || ""} />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Capacité maximale</label>
                <input className="admin-form-input" type="number" defaultValue={editSlot?.capacity || 15} placeholder="15" />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-outline" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="admin-btn admin-btn-primary">{editSlot ? "Enregistrer" : "Créer"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSlots;