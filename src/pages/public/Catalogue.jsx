import { useState, useEffect } from "react";
import catalogueBg from '../../assets/black-back.jpg';

// Import des images
import pizzaImg from '../../assets/Pizza Margherita.jpg';
import sandwichImg from '../../assets/sandwich.jpg';
import espressoImg from '../../assets/espresso.jpg';
import jusImg from '../../assets/jus.jpg';
import croissantImg from '../../assets/croissant.jpg';
import cheesecakeImg from '../../assets/cheesecake.jpg';
import saladeImg from '../../assets/salade.jpg';
import burgerImg from '../../assets/burger.jpg';
import theImg from '../../assets/the.jpg';
import tarteImg from '../../assets/tarte.jpg';
import buddhaImg from '../../assets/buddha.jpg';
import brownieImg from '../../assets/brownie.jpg';

/* ── Mock Products ── */
const MOCK_PRODUCTS = [
  { id: 1, name: "Pizza Margherita", category: "Fast-food", price: 25, image: pizzaImg, description: "Tomate, mozzarella, basilic frais" },
  { id: 2, name: "Sandwich", category: "Fast-food", price: 18, image: sandwichImg, description: "Poulet grillé, salade, tomate" },
  { id: 3, name: "Espresso", category: "Boissons", price: 8, image: espressoImg, description: "Espresso avec une touche de crème" },
  { id: 4, name: "Jus d'Orange Frais", category: "Boissons", price: 12, image: jusImg, description: "Pressé à la minute" },
  { id: 5, name: "Croissant", category: "Desserts", price: 7, image: croissantImg, description: "Beurré, feuilleté, doré" },
  { id: 6, name: "Cheesecake", category: "Desserts", price: 20, image: cheesecakeImg, description: "Fruits rouges, fromage frais" },
  { id: 7, name: "Salade", category: "Repas", price: 22, image: saladeImg, description: "Laitue, parmesan, croûtons" },
  { id: 8, name: "Burger", category: "Fast-food", price: 30, image: burgerImg, description: "Steak haché, cheddar, pickles" },
  { id: 9, name: "Thé marocain", category: "Boissons", price: 10, image: theImg, description: "Vert premium, fouetté" },
  { id: 10, name: "Tarte aux fraises", category: "Desserts", price: 18, image: tarteImg, description: "Pâte brisée, pommes caramélisées" },
  { id: 11, name: "Buddha Bowl", category: "Repas", price: 28, image: buddhaImg, description: "Riz, légumes, sauce tahini" },
  { id: 12, name: "Brownie Chocolat", category: "Desserts", price: 12, image: brownieImg, description: "Coulant, riche, intense" },
];

const CATEGORIES = ["Tous", "Fast-food", "Boissons", "Desserts", "Repas"];

/* ── SVG Icons ── */
const IconSearch = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
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

/* ── Product Card ── */
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
        transition: "all 0.4s",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        animation: `fadeInUp 0.6s ease ${delay}ms both`,
        transform: isHovered ? "translateY(-12px)" : "translateY(0)",
        borderColor: isHovered ? "#EF4444" : "#F3F4F6",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ width: "100%", height: "200px", overflow: "hidden", background: "#F3F4F6" }}>
        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: isHovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.4s" }} />
      </div>
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#EF4444", background: "rgba(239,68,68,0.1)", padding: "0.4rem 0.8rem", borderRadius: "6px", marginBottom: "0.5rem" }}>{product.category}</span>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1F2937", margin: "0.75rem 0 0.5rem" }}>{product.name}</h3>
        <p style={{ fontSize: "0.85rem", color: "#9CA3AF", margin: "0 0 1rem", flexGrow: 1 }}>{product.description}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid #F3F4F6" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#EF4444" }}>{product.price} DH</span>
          <button style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#EF4444", border: "none", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <IconArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Catalogue Page ── */
export default function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [search, setSearch] = useState("");
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => { const timer = setTimeout(() => setHeaderVisible(true), 100); return () => clearTimeout(timer); }, []);

  const filtered = MOCK_PRODUCTS.filter(p => (selectedCategory === "Tous" || p.category === selectedCategory) && p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #FFFFFF 0%, #F8F9FB 50%, #F3F4F8 100%)", fontFamily: "'Poppins', sans-serif", color: "#1F2937", overflowX: "hidden" }}>
      
      {/* Header */}
      <header style={{ position: "relative", padding: "5rem 2rem 4rem", overflow: "hidden", marginBottom: "3rem", opacity: headerVisible ? 1 : 0, transform: headerVisible ? "none" : "translateY(-30px)", transition: "all 0.8s", backgroundImage: `url(${catalogueBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "0.75rem", color: "#FFFFFF" }}>Découvrez Notre Catalogue</h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", fontWeight: 500, margin: 0 }}>Une sélection culinaire pour tous vos moments de la journée</p>
        </div>
      </header>

      {/* Controls */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        <input type="text" placeholder="Rechercher un produit..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: "250px", maxWidth: "400px", padding: "0.9rem 1rem", borderRadius: "14px", border: "2px solid #E5E7EB", fontSize: "0.95rem" }} />
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: "0.65rem 1.4rem", borderRadius: "50px", border: selectedCategory === cat ? "none" : "2px solid #E5E7EB", background: selectedCategory === cat ? "#EF4444" : "#FFFFFF", color: selectedCategory === cat ? "#FFF" : "#6B7280" }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 4rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.75rem" }}>
        {filtered.map((product, index) => <ProductCard key={product.id} product={product} delay={index * 50} />)}
      </div>
    </div>
  );
}