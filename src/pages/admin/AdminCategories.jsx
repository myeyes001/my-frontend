import { useState } from "react";

const MOCK_CATEGORIES = [
  { id: 1, name: "Fast-food",  emoji: "🍔", products: 12, description: "Burgers, pizzas, sandwichs et tacos", color: "#E8272A" },
  { id: 2, name: "Boissons",   emoji: "☕", products: 8,  description: "Café, jus, thé et boissons fraîches",  color: "#8B5CF6" },
  { id: 3, name: "Desserts",   emoji: "🍰", products: 10, description: "Pâtisseries, gâteaux et viennoiseries", color: "#F9C021" },
  { id: 4, name: "Repas",      emoji: "🥗", products: 8,  description: "Bowls, salades et plats chauds",        color: "#22C55E" },
];

function AdminCategories() {
  const [showModal, setShowModal] = useState(false);
  const [editCat, setEditCat] = useState(null);

  const openAdd = () => { setEditCat(null); setShowModal(true); };
  const openEdit = (c) => { setEditCat(c); setShowModal(true); };

  return (
    <div className="admin-animate-in">
      <div className="admin-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 className="admin-page-title">Gestion des Catégories</h1>
          <p className="admin-page-subtitle">Organisez vos produits par catégorie alimentaire</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Ajouter une catégorie
        </button>
      </div>

      {/* Category cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1.25rem",
      }}>
        {MOCK_CATEGORIES.map(cat => (
          <div key={cat.id} className="admin-stat-card" style={{ padding: "1.5rem", position: "relative", overflow: "hidden" }}>
            {/* Decorative accent */}
            <div style={{
              position: "absolute", top: -15, right: -15,
              width: 60, height: 60, borderRadius: "50%",
              background: `${cat.color}0c`, border: `1px solid ${cat.color}15`,
            }} />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: `${cat.color}12`, border: `1px solid ${cat.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem",
              }}>
                {cat.emoji}
              </div>
              <div style={{
                background: `${cat.color}12`, border: `1px solid ${cat.color}30`,
                borderRadius: 8, padding: "0.2rem 0.6rem",
                fontSize: "0.7rem", fontWeight: 700, color: cat.color,
              }}>
                {cat.products} produits
              </div>
            </div>

            <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "#1F1F1F", margin: "0 0 0.3rem" }}>
              {cat.name}
            </h3>
            <p style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.45)", margin: "0 0 1.25rem", lineHeight: 1.5 }}>
              {cat.description}
            </p>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => openEdit(cat)}>
                Modifier
              </button>
              <button className="admin-btn admin-btn-sm admin-btn-danger">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{editCat ? "Modifier la catégorie" : "Nouvelle catégorie"}</h3>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Nom de la catégorie</label>
                <input className="admin-form-input" defaultValue={editCat?.name || ""} placeholder="Ex: Fast-food" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <input className="admin-form-input" defaultValue={editCat?.description || ""} placeholder="Description courte..." />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Emoji</label>
                  <input className="admin-form-input" defaultValue={editCat?.emoji || ""} placeholder="🍔" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Couleur</label>
                  <input className="admin-form-input" type="color" defaultValue={editCat?.color || "#E8272A"} style={{ padding: "0.4rem", height: 42 }} />
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-outline" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="admin-btn admin-btn-primary">{editCat ? "Enregistrer" : "Créer"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;