import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/api";

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

  bg:       "#FFF7ED",
  bgAlt:    "#FFE8CC",
  card:     "#FFFFFF",
  surface:  "#FFF1E6",

  text:     "#1F1F1F",
  textSoft: "#4A4A4A",
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

/* ── Animated Background Orbs ── */
function BackgroundOrbs() {
  return (
    <>
      <style>{`
        @keyframes orbFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-20px) scale(1.05); }
          66%      { transform: translate(-15px,25px) scale(0.95); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-25px,30px) scale(1.08); }
          66%      { transform: translate(20px,-15px) scale(0.92); }
        }
        @keyframes orbFloat3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(15px,15px) scale(1.04); }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
      <div style={{
        position:"fixed", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0,
        background: C.bg,
      }}>
        {/* Orb 1 */}
        <div style={{
          position:"absolute", top:"-10%", right:"-5%",
          width:480, height:480,
          borderRadius:"50%",
          background:`radial-gradient(circle, rgba(232,39,42,0.12) 0%, rgba(232,39,42,0.04) 60%, transparent 100%)`,
          animation:"orbFloat1 14s ease-in-out infinite",
          filter:"blur(2px)",
        }}/>
        {/* Orb 2 */}
        <div style={{
          position:"absolute", bottom:"-15%", left:"-8%",
          width:420, height:420,
          borderRadius:"50%",
          background:`radial-gradient(circle, rgba(249,192,33,0.1) 0%, rgba(249,192,33,0.02) 60%, transparent 100%)`,
          animation:"orbFloat2 18s ease-in-out infinite",
          filter:"blur(4px)",
        }}/>
        {/* Orb 3 */}
        <div style={{
          position:"absolute", top:"40%", left:"60%",
          width:260, height:260,
          borderRadius:"50%",
          background:`radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)`,
          animation:"orbFloat3 10s ease-in-out infinite",
        }}/>
        {/* Grid pattern */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`
            linear-gradient(rgba(232,39,42,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,39,42,0.03) 1px, transparent 1px)
          `,
          backgroundSize:"60px 60px",
        }}/>
      </div>
    </>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Appeler l'API
      const response = await loginUser({ email, password });

      // Récupérer le token et les données de l'utilisateur
      const { token, user } = response.data;

      // Stocker le token et l'utilisateur
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Mettre à jour le contexte
      login(token, user.role);

      // Rediriger
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      // Afficher l'erreur
      const errorMessage = err.response?.data?.message || 
                          "Email ou mot de passe incorrect.";
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

  const iconWrapStyle = {
    position: "absolute",
    left: "0.85rem",
    top: "25%",
    transform: "translateY(0)",
    color: C.muted,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
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
        .login-btn-inner { display:flex; align-items:center; justify-content:center; gap:8px; }
        .login-btn { transition: all 0.3s cubic-bezier(.23,1,.32,1) !important; }
        .login-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, ${C.redLt}, ${C.red}) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 32px ${C.redGlow} !important;
        }
        .login-btn:active:not(:disabled) { transform: translateY(0px) !important; }
        .login-btn:disabled { opacity:0.65; cursor:not-allowed; }
        .footer-link { transition: color 0.2s; }
        .footer-link:hover { color: ${C.redDk} !important; }
        .spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <BackgroundOrbs />

      {/* Card */}
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
            Connexion
          </h1>
        </div>

        <p style={{
          color: C.muted,
          fontSize: "0.9rem",
          marginBottom: "1.75rem",
          fontWeight: 500,
          fontFamily: "'Poppins', sans-serif",
          margin: "0 0 1.75rem 0",
        }}>
          Bon retour ! Commandez en quelques clics.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label style={{
            display: "block",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: C.textSoft,
            marginBottom: "0.45rem",
            letterSpacing: "0.01em",
            fontFamily: "'Poppins', sans-serif",
          }}>
            Adresse e-mail
          </label>
          <div style={{ position: "relative" }}>
            <div style={iconWrapStyle}>
              <IconMail />
            </div>
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
            display: "block",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: C.textSoft,
            marginBottom: "0.45rem",
            letterSpacing: "0.01em",
            fontFamily: "'Poppins', sans-serif",
          }}>
            Mot de passe
          </label>
          <div style={{ position: "relative" }}>
            <div style={iconWrapStyle}>
              <IconLock />
            </div>
            <input
              type="password"
              style={inputStyle("password")}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(232,39,42,0.08)",
              border: `1px solid rgba(232,39,42,0.25)`,
              color: C.red,
              borderRadius: "10px",
              padding: "0.65rem 1rem",
              fontSize: "0.85rem",
              marginBottom: "1.25rem",
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif",
              animation: "fadeSlideUp 0.3s ease",
            }}>
              <IconAlertCircle />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="login-btn"
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
              marginTop: "0.25rem",
              boxShadow: `0 4px 16px ${C.redGlow}`,
            }}
          >
            <div className="login-btn-inner">
              {loading
                ? <><div className="spinner"/><span>Connexion...</span></>
                : <><span>Se connecter</span><IconArrowRight /></>
              }
            </div>
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          margin: "1.5rem 0",
        }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <span style={{ color: C.muted, fontSize: "0.75rem", fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>ou</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: C.textSoft, margin: 0, fontFamily: "'Poppins', sans-serif" }}>
          Pas encore de compte ?{" "}
          <Link to="/register" className="footer-link" style={{
            color: C.red,
            fontWeight: 700,
            textDecoration: "none",
          }}>
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;