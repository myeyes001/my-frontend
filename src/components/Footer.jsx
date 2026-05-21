

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

const IconUtensils = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
  </svg>
);

const IconMail = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const IconPhone = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.93 3.36a2 2 0 0 1 1.99-2.18H6a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.61-.61a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const IconMapPin = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const CONTACT_ITEMS = [
  { Icon: IconMail,   text: "contact@foodzand.ma" },
  { Icon: IconPhone,  text: "+212 6 XX XX XX XX" },
  { Icon: IconMapPin, text: "Université [Nom], Ville" },
];

function Footer() {
  return (
    <footer style={{
      background: C.bg,
      color: C.text,
      padding: "4rem 2rem 2rem",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Poppins', sans-serif",
    }}>
      {/* Radial glows */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(circle at 30% 70%, rgba(232,39,42,0.08) 0%, transparent 50%),
                     radial-gradient(circle at 70% 30%, rgba(249,192,33,0.06) 0%, transparent 50%)`,
      }}/>

      <div style={{
        maxWidth: 800, margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "3rem",
        position: "relative", 
        zIndex: 1,
      }}>

        {/* Brand */}
        <div style={{ maxWidth: 500 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", justifyContent: "center" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: `linear-gradient(135deg, ${C.red}, ${C.redDk})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: C.white,
            }}>
              <IconUtensils />
            </div>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: C.text }}>
              Foodzand
            </span>
          </div>
          <p style={{ fontSize: "0.9rem", color: C.muted, lineHeight: 1.65, margin: 0 }}>
            Votre buvette universitaire réinventée. Commandez vos repas chauds, snacks et boissons en quelques clics, disponibles du lundi au vendredi.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700, fontSize: "0.8rem", color: C.red,
            marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.08em",
          }}>
            Contact
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            {CONTACT_ITEMS.map(({ Icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ color: C.red, flexShrink: 0, display: "flex" }}><Icon /></span>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem", color: C.textSoft }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: `1px solid ${C.border}`,
        marginTop: "3rem", paddingTop: "1.5rem",
        textAlign: "center", position: "relative", zIndex: 1,
      }}>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", color: C.muted, margin: 0 }}>
          © 2026 Foodzand. Tous droits réservés. Développé avec soin pour les étudiants.
        </p>
      </div>
    </footer>
  );
}

export default Footer;