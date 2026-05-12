import { useState } from "react";

const MOCK_PRODUCTS = [
  { id: 1, name: "Pizza Margherita",   category: "Fast-food", price: 25, emoji: "🍕", stock: true,  description: "Tomate, mozzarella, basilic" },
  { id: 2, name: "Sandwich Club",      category: "Fast-food", price: 18, emoji: "🥪", stock: true,  description: "Poulet grillé, salade, tomate" },
  { id: 3, name: "Espresso Puro",      category: "Boissons",  price: 8,  emoji: "☕", stock: true,  description: "Espresso double crème" },
  { id: 4, name: "Jus d'Orange",       category: "Boissons",  price: 12, emoji: "🍊", stock: false, description: "Pressé à la minute" },
  { id: 5, name: "Croissant Beurre",   category: "Desserts",  price: 7,  emoji: "🥐", stock: true,  description: "Beurré, feuilleté, doré" },
  { id: 6, name: "Cheesecake Premium", category: "Desserts",  price: 20, emoji: "🍰", stock: true,  description: "Fruits rouges, fromage frais" },
  { id: 7, name: "Salade César",       category: "Repas",     price: 22, emoji: "🥗", stock: true,  description: "Laitue, parmesan, croûtons" },
  { id: 8, name: "Burger Maison",      category: "Fast-food", price: 30, emoji: "🍔", stock: true,  description: "Steak haché, cheddar, pickles" },
];

function AdminProducts() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const filtered = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditProduct(null); setShowModal(true); };
  const openEdit = (p) => { setEditProduct(p); setShowModal(true); };

  return (
    <div className="admin-animate-in">
      <div className="admin-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 className="admin-page-title">Gestion des Produits</h1>
          <p className="admin-page-subtitle">Gérez vos repas, boissons et snacks</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Ajouter un produit
        </button>
      </div>

      {/* Stats mini */}
      <div className="admin-stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: "1.5rem" }}>
        {[
          { label: "Total produits",    value: MOCK_PRODUCTS.length,                              color: "#E8272A" },
          { label: "Disponibles",       value: MOCK_PRODUCTS.filter(p => p.stock).length,          color: "#22C55E" },
          { label: "En rupture",        value: MOCK_PRODUCTS.filter(p => !p.stock).length,         color: "#F9C021" },
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
          <div className="admin-table-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Rechercher un produit..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ fontSize: "0.78rem", color: "rgba(0,0,0,0.4)", fontWeight: 600 }}>
            {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">🍽️</div>
            <div className="admin-empty-text">Aucun produit trouvé</div>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id}>
                  <td style={{ width: 50, textAlign: "center" }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: "linear-gradient(135deg, #FEE2E2 0%, #FFF1E6 100%)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.25rem", border: "1px solid rgba(232,39,42,0.1)",
                    }}>
                      {product.emoji}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{product.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(0,0,0,0.4)" }}>{product.description}</div>
                  </td>
                  <td><span className="admin-badge admin-badge-neutral">{product.category}</span></td>
                  <td style={{ fontWeight: 700, color: "#E8272A" }}>{product.price} DH</td>
                  <td>
                    <span className={`admin-badge ${product.stock ? "admin-badge-success" : "admin-badge-danger"}`}>
                      {product.stock ? "Disponible" : "Rupture"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => openEdit(product)}>Modifier</button>
                      <button className="admin-btn admin-btn-sm admin-btn-danger">Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{editProduct ? "Modifier le produit" : "Ajouter un produit"}</h3>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Nom du produit</label>
                <input className="admin-form-input" defaultValue={editProduct?.name || ""} placeholder="Ex: Pizza Margherita" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Prix (DH)</label>
                  <input className="admin-form-input" type="number" defaultValue={editProduct?.price || ""} placeholder="25" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Catégorie</label>
                  <select className="admin-form-select" defaultValue={editProduct?.category || ""}>
                    <option value="">Sélectionner</option>
                    <option value="Fast-food">Fast-food</option>
                    <option value="Boissons">Boissons</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Repas">Repas</option>
                  </select>
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <input className="admin-form-input" defaultValue={editProduct?.description || ""} placeholder="Description courte..." />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-outline" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="admin-btn admin-btn-primary">{editProduct ? "Enregistrer" : "Ajouter"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;