import { useState, useEffect } from "react";

/* ── Mock Data ── */
const MOCK_PRODUCTS = [
  { id: 1, name: "Pizza Margherita", category: "Fast-food", price: 25, emoji: "🍕", description: "Tomate, mozzarella, basilic frais" },
  { id: 2, name: "Sandwich Club", category: "Fast-food", price: 18, emoji: "🥪", description: "Poulet grillé, salade, tomate" },
  { id: 3, name: "Espresso Puro", category: "Boissons", price: 8, emoji: "☕", description: "Espresso avec une touche de crème" },
  { id: 4, name: "Jus d'Orange Frais", category: "Boissons", price: 12, emoji: "🍊", description: "Pressé à la minute" },
  { id: 5, name: "Croissant Beurre", category: "Desserts", price: 7, emoji: "🥐", description: "Beurré, feuilleté, doré" },
  { id: 6, name: "Cheesecake Premium", category: "Desserts", price: 20, emoji: "🍰", description: "Fruits rouges, fromage frais" },
  { id: 7, name: "Salade César", category: "Repas", price: 22, emoji: "🥗", description: "Laitue, parmesan, croûtons" },
  { id: 8, name: "Burger Maison", category: "Fast-food", price: 30, emoji: "🍔", description: "Steak haché, cheddar, pickles" },
  { id: 9, name: "Thé Matcha", category: "Boissons", price: 10, emoji: "🍵", description: "Vert premium, fouetté" },
  { id: 10, name: "Tarte aux Pommes", category: "Desserts", price: 18, emoji: "🥧", description: "Pâte brisée, pommes caramélisées" },
  { id: 11, name: "Buddha Bowl", category: "Repas", price: 28, emoji: "🍲", description: "Riz, légumes, sauce tahini" },
  { id: 12, name: "Brownie Chocolat", category: "Desserts", price: 12, emoji: "🍫", description: "Coulant, riche, intense" },
];

const CATEGORIES = ["Tous", "Fast-food", "Boissons", "Desserts", "Repas"];

/* ── SVG Icons ── */
const IconSearch = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconFilter = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);

const IconX = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ── Product Card Component ── */
function ProductCard({ product, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        background: "#FFFFFF",
        borderRadius: "18px",
        overflow: "hidden",
        border: "2px solid #F3F4F6",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        animation: `fadeInUp 0.6s ease ${delay}ms both`,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={() => setIsHovered(true)}
      className="product-card"
    >
      {/* Emoji Container */}
      <div style={{
        width: "80px",
        height: "80px",
        background: "linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%)",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.25rem",
        border: "2px solid rgba(239, 68, 68, 0.15)",
      }}>
        <span style={{
          fontSize: "2.5rem",
          display: "block",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: isHovered ? "scale(1.15) rotate(5deg)" : "scale(1)",
        }}>
          {product.emoji}
        </span>
      </div>

      {/* Content */}
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{
          display: "inline-block",
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#EF4444",
          background: "rgba(239, 68, 68, 0.1)",
          padding: "0.4rem 0.8rem",
          borderRadius: "6px",
          marginBottom: "0.5rem",
        }}>
          {product.category}
        </span>
      </div>

      <h3 style={{
        fontSize: "1.15rem",
        fontWeight: 700,
        color: "#1F2937",
        margin: "0.75rem 0 0.5rem",
        lineHeight: 1.4,
      }}>
        {product.name}
      </h3>

      <p style={{
        fontSize: "0.85rem",
        color: "#9CA3AF",
        margin: "0 0 1rem",
        lineHeight: 1.5,
        flexGrow: 1,
      }}>
        {product.description}
      </p>

      {/* Price & Button */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "1rem",
        borderTop: "1px solid #F3F4F6",
      }}>
        <span style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#EF4444",
        }}>
          {product.price} DH
        </span>
        <button style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
          border: "none",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
          padding: 0,
          transform: isHovered ? "translateX(4px)" : "none",
        }}>
          <IconArrowRight />
        </button>
      </div>

      {/* Shine effect */}
      {isHovered && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)",
          pointerEvents: "none",
          animation: "shine 0.6s ease",
        }}></div>
      )}

      {/* Hover effect */}
      {isHovered && (
        <style>{`
          @keyframes cardHover {
            to {
              border-color: #EF4444;
              transform: translateY(-12px);
              box-shadow: 0 20px 48px rgba(239, 68, 68, 0.2);
            }
          }
        `}</style>
      )}
    </div>
  );
}

/* ── Main Catalogue Component ── */
export default function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [search, setSearch] = useState("");
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchCat = selectedCategory === "Tous" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #FFFFFF 0%, #F8F9FB 50%, #F3F4F8 100%)",
      fontFamily: "'Poppins', sans-serif",
      color: "#1F2937",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        * { box-sizing: border-box; }

        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }

        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 40px); }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .category-btn {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .category-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(239, 68, 68, 0.05);
          transition: left 0.3s;
          z-index: -1;
        }

        .category-btn:hover::before {
          left: 0;
        }

        .category-btn:hover {
          border-color: #EF4444 !important;
          color: #EF4444 !important;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
        }

        .category-btn.active {
          pointer-events: none;
        }
      `}</style>

      {/* ── Header ── */}
      <header style={{
        position: "relative",
        padding: "5rem 2rem 4rem",
        overflow: "hidden",
        marginBottom: "3rem",
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? "none" : "translateY(-30px)",
        transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFF 50%, #F0F4FF 100%)",
          borderBottom: "1px solid rgba(239, 68, 68, 0.1)",
        }}></div>

        {/* Orbs */}
        <div style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.6,
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)",
          animation: "floatOrb1 8s ease-in-out infinite",
        }}></div>

        <div style={{
          position: "absolute",
          bottom: "-15%",
          left: "-5%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.6,
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
          animation: "floatOrb2 10s ease-in-out infinite",
        }}></div>

        {/* Grid pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}></div>

        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}>
          <h1 style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.2,
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
            animation: "slideDown 0.6s ease 0.3s both",
            background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Découvrez Notre Catalogue
          </h1>
          <p style={{
            fontSize: "1.1rem",
            color: "#6B7280",
            fontWeight: 500,
            margin: 0,
            animation: "slideDown 0.6s ease 0.4s both",
          }}>
            Une sélection culinaire pour tous vos moments de la journée
          </p>
        </div>
      </header>

      {/* ── Controls Section ── */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        flexWrap: "wrap",
        animation: "slideDown 0.6s ease 0.5s both",
      }}>
        {/* Search Bar */}
        <div style={{ position: "relative", flex: 1, minWidth: "250px", maxWidth: "400px" }}>
          <div style={{
            position: "absolute",
            left: "1.2rem",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9CA3AF",
            pointerEvents: "none",
            transition: "color 0.3s",
          }}>
            <IconSearch />
          </div>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.9rem 3rem 0.9rem 3.2rem",
              border: "2px solid #E5E7EB",
              borderRadius: "14px",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 500,
              background: "#FFFFFF",
              color: "#1F2937",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#EF4444";
              e.target.style.boxShadow = "0 0 0 4px rgba(239, 68, 68, 0.1), 0 4px 16px rgba(239, 68, 68, 0.15)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#E5E7EB";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              e.target.style.transform = "translateY(0)";
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "#F3F4F6",
                border: "none",
                color: "#9CA3AF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                padding: 0,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#E5E7EB";
                e.target.style.color = "#6B7280";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#F3F4F6";
                e.target.style.color = "#9CA3AF";
              }}
            >
              <IconX />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", animation: "slideDown 0.6s ease 0.6s both" }}>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={isActive ? "category-btn active" : "category-btn"}
                style={{
                  padding: "0.65rem 1.4rem",
                  border: isActive ? "none" : "2px solid #E5E7EB",
                  borderRadius: "50px",
                  background: isActive
                    ? "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                    : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#6B7280",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 700 : 600,
                  cursor: isActive ? "default" : "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  boxShadow: isActive ? "0 8px 24px rgba(239, 68, 68, 0.35)" : "0 0 0 transparent",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: "0.6rem 1.2rem",
          background: "linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%)",
          border: "2px solid #FECACA",
          borderRadius: "50px",
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#EF4444",
          animation: "slideDown 0.6s ease 0.6s both",
        }}>
          <IconFilter />
          <span>{filtered.length} produit{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* ── Products Grid or Empty State ── */}
      {filtered.length === 0 ? (
        <div style={{
          maxWidth: "500px",
          margin: "4rem auto",
          padding: "3rem 2rem",
          textAlign: "center",
          animation: "fadeInUp 0.6s ease",
        }}>
          <div style={{
            fontSize: "5rem",
            marginBottom: "1.5rem",
            animation: "bounce 2s ease-in-out infinite",
          }}>
            🔍
          </div>
          <h2 style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#1F2937",
            margin: "0 0 0.75rem",
          }}>
            Aucun produit trouvé
          </h2>
          <p style={{
            fontSize: "1rem",
            color: "#9CA3AF",
            margin: "0 0 1.5rem",
            fontWeight: 500,
          }}>
            Essayez une autre catégorie ou un autre mot-clé
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                padding: "0.85rem 2rem",
                background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "12px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: "0 4px 16px rgba(239, 68, 68, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 8px 24px rgba(239, 68, 68, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 16px rgba(239, 68, 68, 0.3)";
              }}
            >
              Effacer la recherche
            </button>
          )}
        </div>
      ) : (
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem 4rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.75rem",
        }}>
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} delay={index * 50} />
          ))}
        </div>
      )}
    </div>
  );
}
