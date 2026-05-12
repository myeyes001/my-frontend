import { useState } from "react";

const T = {
  blue:    "#2563EB",
  blueDk:  "#1E40AF",
  blueLt:  "#DBEAFE",
  blueXlt: "#EFF6FF",
  green:   "#10B981",
  greenLt: "#D1FAE5",
  orange:  "#F59E0B",
  orangeLt:"#FEF3C7",
  red:     "#EF4444",
  redLt:   "#FEE2E2",
  gray50:  "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray400: "#9CA3AF",
  gray600: "#4B5563",
  gray800: "#1F2937",
};

export default function ProductCard({ product, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!product.stock) return;
    setAdded(true);
    onAddToCart?.(product);
    setTimeout(() => setAdded(false), 1500);
  };

  const tagColors = {
    Healthy:   { bg: T.greenLt,  color: T.green  },
    Populaire: { bg: T.orangeLt, color: T.orange  },
    Nouveau:   { bg: T.blueLt,   color: T.blue    },
    Promo:     { bg: T.orangeLt, color: T.orange  },
    Boisson:   { bg: T.blueLt,   color: T.blue    },
    Frais:     { bg: T.greenLt,  color: T.green   },
    Matin:     { bg: T.orangeLt, color: T.orange  },
  };
  const tagStyle = tagColors[product.tag] ?? { bg: T.gray100, color: T.gray600 };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${hovered ? T.blue : T.gray200}`,
        boxShadow: hovered
          ? "0 12px 36px rgba(37,99,235,0.14)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-5px)" : "none",
        transition: "all 0.25s cubic-bezier(.23,1,.32,1)",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Image zone */}
      <div style={{
        background: hovered ? T.blueLt : T.blueXlt,
        padding: "1.75rem",
        textAlign: "center",
        fontSize: "3rem",
        position: "relative",
        transition: "background 0.2s",
        userSelect: "none",
      }}>
        <span style={{
          display: "inline-block",
          transform: hovered ? "scale(1.12)" : "scale(1)",
          transition: "transform 0.25s ease",
        }}>
          {product.emoji || product.img || "🍽️"}
        </span>

        {/* Stock badge */}
        <span style={{
          position: "absolute", top: 10, left: 10,
          background: product.stock ? T.greenLt : T.redLt,
          color: product.stock ? T.green : T.red,
          borderRadius: 6, padding: "3px 9px",
          fontSize: "0.68rem", fontWeight: 600,
        }}>
          {product.stock ? "✓ Disponible" : "✕ Rupture"}
        </span>

        {/* Category tag */}
        {product.tag && (
          <span style={{
            position: "absolute", top: 10, right: 10,
            background: tagStyle.bg, color: tagStyle.color,
            borderRadius: 6, padding: "3px 9px",
            fontSize: "0.68rem", fontWeight: 600,
          }}>
            {product.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1rem 1.1rem 1.1rem", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Category */}
        <div style={{ fontSize: "0.7rem", fontWeight: 500, color: T.gray400, marginBottom: 4 }}>
          {product.categorie || product.cat || "Produit"}
        </div>

        {/* Name */}
        <div style={{ fontWeight: 700, fontSize: "0.97rem", color: T.gray800, marginBottom: "0.5rem", lineHeight: 1.3 }}>
          {product.nom || product.name}
        </div>

        {/* Description */}
        {product.description && (
          <div style={{ fontSize: "0.78rem", color: T.gray400, lineHeight: 1.55, marginBottom: "0.6rem", flex: 1 }}>
            {product.description.slice(0, 72)}{product.description.length > 72 ? "…" : ""}
          </div>
        )}

        {/* Rating */}
        {product.rating && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: "0.75rem" }}>
            <span style={{ color: T.orange, fontSize: "0.8rem" }}>
              {"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}
            </span>
            <span style={{ fontSize: "0.72rem", color: T.gray400, fontWeight: 500 }}>
              {product.rating} ({product.reviews ?? 0} avis)
            </span>
          </div>
        )}

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <div>
            {product.oldPrice && (
              <div style={{ fontSize: "0.75rem", color: T.gray400, textDecoration: "line-through" }}>
                {product.oldPrice} Dh
              </div>
            )}
            <div style={{ fontWeight: 800, fontSize: "1.2rem", color: T.orange }}>
              {product.prix || product.price}{" "}
              <span style={{ fontSize: "0.75rem", fontWeight: 500, color: T.gray400 }}>Dh</span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.stock}
            style={{
              padding: added ? "8px 14px" : "9px 16px",
              borderRadius: 9,
              border: "none",
              background: !product.stock
                ? T.gray100
                : added
                  ? T.green
                  : hovered ? T.blueDk : T.blue,
              color: !product.stock ? T.gray400 : "#fff",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "0.82rem",
              cursor: product.stock ? "pointer" : "not-allowed",
              boxShadow: product.stock && !added
                ? `0 4px 14px rgba(37,99,235,0.3)`
                : added ? `0 4px 14px rgba(16,185,129,0.3)` : "none",
              transition: "all 0.25s ease",
              transform: added ? "scale(1.05)" : "scale(1)",
              whiteSpace: "nowrap",
            }}
          >
            {!product.stock ? "Indisponible" : added ? "✓ Ajouté !" : "+ Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}