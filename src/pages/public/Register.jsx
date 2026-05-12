import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────
   DESIGN TOKENS — Foodzand palette CLAIR
───────────────────────────────────────────── */
const C = {
  red:      "#E8272A",
  redDk:    "#C01F22",
  redLt:    "#FF5558",
  redGlow:  "rgba(232,39,42,0.25)",
  yellow:   "#F9C021",
  yellowDk: "#E0A800",
  yellowLt: "#FFF0B3",
  green:    "#22C55E",
  greenDk:  "#16A34A",
  greenLt:  "#DCFCE7",

  /* Fonds clairs (pas de blanc pur) */
  bg:       "#FFF7ED",        // crème chaud principal
  bgAlt:    "#FFE8CC",        // crème légèrement plus foncé
  card:     "#FFFFFF",         // blanc cassé pur pour cartes
  surface:  "#FFF1E6",        // surface légère

  /* Textes */
  text:     "#1F1F1F",        // presque noir
  textSoft: "#4A4A4A",        // gris foncé
  muted:    "rgba(0,0,0,0.50)",
  border:   "rgba(0,0,0,0.08)",
  borderDk: "rgba(0,0,0,0.14)",
  white:    "#FFFFFF",
};

/* ── SVG Icons ── */
const IconUtensils = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
  </svg>
);
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconAlertCircle = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);
const IconZap = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconList = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const IconBell = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

/* ── Background ── */
function BackgroundOrbs() {
  return (
    <div style={{
      position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0,
      background: C.bg,
    }}>
      <style>{`
        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-15px,25px) scale(0.95)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-25px,30px) scale(1.08)} 66%{transform:translate(20px,-15px) scale(0.92)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(15px,15px) scale(1.04)} }
      `}</style>
      <div style={{
        position:"absolute", top:"-5%", left:"-8%",
        width:460, height:460, borderRadius:"50%",
        background:`radial-gradient(circle, rgba(232,39,42,0.12) 0%, rgba(232,39,42,0.04) 60%, transparent 100%)`,
        animation:"orbFloat2 16s ease-in-out infinite", filter:"blur(3px)",
      }}/>
      <div style={{
        position:"absolute", bottom:"-10%", right:"-5%",
        width:400, height:400, borderRadius:"50%",
        background:`radial-gradient(circle, rgba(249,192,33,0.1) 0%, rgba(249,192,33,0.02) 60%, transparent 100%)`,
        animation:"orbFloat1 12s ease-in-out infinite", filter:"blur(2px)",
      }}/>
      <div style={{
        position:"absolute", top:"35%", right:"30%",
        width:220, height:220, borderRadius:"50%",
        background:`radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)`,
        animation:"orbFloat3 9s ease-in-out infinite",
      }}/>
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`linear-gradient(rgba(232,39,42,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(232,39,42,0.03) 1px,transparent 1px)`,
        backgroundSize:"60px 60px",
      }}/>
    </div>
  );
}

const PERKS = [
  { icon: <IconZap />,  text: "Commandes en ligne rapides" },
  { icon: <IconList />, text: "Historique & suivi de commandes" },
  { icon: <IconBell />, text: "Notifications en temps réel" },
];

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  // ✅ Appeler le hook ICI, au niveau du composant
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // ✅ handleSubmit utilise 'login' depuis l'extérieur
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Appeler l'API
      const response = await registerUser({ name, email, password });

      // Récupérer le token et les données de l'utilisateur
      const { token, user } = response.data;

      // Stocker le token et l'utilisateur
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Mettre à jour le contexte
      login(token, user.role);

      // Rediriger vers le login
      navigate("/login");
    } catch (err) {
      // Afficher l'erreur
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors?.email?.[0] ||
                          "Une erreur est survenue.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "0.75rem 1rem 0.75rem 2.75rem",
    border: `1.5px solid ${focusedField === field ? C.red : error ? "#FCA5A5" : C.border}`,
    borderRadius: "12px",
    fontSize: "0.9rem",
    fontFamily: "'Poppins', sans-serif",
    color: C.text,
    background: focusedField === field ? C.white : C.surface,
    outline: "none",
    boxSizing: "border-box",
    marginBottom: "1.25rem",
    transition: "all 0.25s cubic-bezier(.23,1,.32,1)",
    boxShadow: focusedField === field
      ? `0 0 0 3.5px ${C.red}20, 0 1px 6px rgba(232,39,42,0.1)`
      : "0 1px 3px rgba(0,0,0,0.04)",
  });

  const iconWrap = {
    position: "absolute", left: "0.85rem", top: "25%",
    transform: "translateY(0)", color: C.muted,
    display: "flex", pointerEvents: "none",
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "'Poppins', sans-serif",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        .reg-btn { transition: all 0.3s cubic-bezier(.23,1,.32,1) !important; }
        .reg-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, ${C.redLt}, ${C.red}) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 32px ${C.redGlow} !important;
        }
        .reg-btn:disabled { opacity:0.65; cursor:not-allowed; }
        .footer-link:hover { color: ${C.redDk} !important; }
        .spinner { width:18px; height:18px; border:2.5px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.7s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes perkIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <BackgroundOrbs />

      <div style={{
        position: "relative",
        zIndex: 1,
        background: `rgba(255,255,255,0.95)`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: "28px",
        padding: "2.5rem",
        width: "100%",
        maxWidth: "440px",
        boxShadow: `0 24px 80px ${C.redGlow}, 0 1px 0 rgba(255,255,255,0.8) inset`,
        border: `1px solid ${C.border}`,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(.23,1,.32,1)",
      }}>

        {/* Header avec Logo et Titre */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}>
          {/* Logo mark */}
          <div style={{
            width: 52, height: 52,
            background: `linear-gradient(135deg, ${C.red}, ${C.redDk})`,
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: C.white,
            boxShadow: `0 8px 24px ${C.redGlow}`,
            flexShrink: 0,
          }}>
            <IconUtensils />
          </div>
          
          {/* Title */}
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "1.75rem",
            color: C.text,
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            S'inscrire
          </h1>
        </div>

        <p style={{
          color: C.muted,
          fontSize: "0.9rem",
          marginBottom: "1.75rem",
          fontWeight: 500,
          fontFamily: "'Poppins', sans-serif",
        }}>
          Rejoignez la communauté et commandez en ligne.
        </p>

        {/* Perks */}
        <div style={{
          display: "flex", flexDirection: "column", gap: "0.45rem",
          padding: "1rem 1.1rem",
          background: `rgba(232,39,42,0.05)`,
          borderRadius: "14px",
          border: `1px solid rgba(232,39,42,0.15)`,
          marginBottom: "1.75rem",
        }}>
          {PERKS.map(({ icon, text }, i) => (
            <div key={text} style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              fontSize: "0.82rem", color: C.textSoft, fontWeight: 500,
              fontFamily: "'Poppins', sans-serif",
              animation: `perkIn 0.4s ease ${0.15 + i * 0.1}s both`,
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%",
                background: C.red, color: C.white,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {icon}
              </span>
              {text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <label style={{
            display:"block", fontSize:"0.8rem", fontWeight:600, 
            color:C.textSoft, marginBottom:"0.45rem",
            letterSpacing: "0.01em",
            fontFamily: "'Poppins', sans-serif",
          }}>
            Nom complet
          </label>
          <div style={{ position: "relative" }}>
            <div style={iconWrap}><IconUser /></div>
            <input
              type="text"
              style={inputStyle("name")}
              placeholder="Votre nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              required
            />
          </div>

          {/* Email */}
          <label style={{
            display:"block", fontSize:"0.8rem", fontWeight:600, 
            color:C.textSoft, marginBottom:"0.45rem",
            letterSpacing: "0.01em",
            fontFamily: "'Poppins', sans-serif",
          }}>
            Adresse e-mail
          </label>
          <div style={{ position: "relative" }}>
            <div style={iconWrap}><IconMail /></div>
            <input
              type="email"
              style={inputStyle("email")}
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              required
            />
          </div>

          {/* Password */}
          <label style={{
            display:"block", fontSize:"0.8rem", fontWeight:600, 
            color:C.textSoft, marginBottom:"0.45rem",
            letterSpacing: "0.01em",
            fontFamily: "'Poppins', sans-serif",
          }}>
            Mot de passe
          </label>
          <div style={{ position: "relative" }}>
            <div style={iconWrap}><IconLock /></div>
            <input
              type="password"
              style={inputStyle("password")}
              placeholder="Minimum 8 caractères"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              minLength={8}
              required
            />
          </div>

          {error && (
            <div style={{
              display:"flex", alignItems:"center", gap:"0.5rem",
              background:"rgba(232,39,42,0.08)", border:`1px solid rgba(232,39,42,0.25)`,
              color:C.red, borderRadius:"10px",
              padding:"0.65rem 1rem", fontSize:"0.85rem",
              marginBottom:"1.25rem", fontWeight:500,
              fontFamily: "'Poppins', sans-serif",
            }}>
              <IconAlertCircle />{error}
            </div>
          )}

          <button
            type="submit"
            className="reg-btn"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.85rem",
              background: `linear-gradient(135deg, ${C.red}, ${C.redDk})`,
              color: C.white,
              border: "none",
              borderRadius: "13px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              boxShadow: `0 4px 16px ${C.redGlow}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {loading
              ? <><div className="spinner" /><span>Création...</span></>
              : <><span>Créer mon compte</span><IconArrowRight /></>
            }
          </button>
        </form>

        <p style={{
          marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", 
          color: C.textSoft, fontFamily: "'Poppins', sans-serif"
        }}>
          Déjà inscrit ?{" "}
          <Link to="/login" className="footer-link" style={{
            color: C.red, fontWeight: 700, textDecoration: "none",
            transition: "color 0.2s",
          }}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;