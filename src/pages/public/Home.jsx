import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import buveetteBg from '../../assets/buv_background.jpg'; // ✅ IMPORT IMAGE

/* ─────────────────────────────────────────────
   DESIGN TOKENS — Foodzand palette CLAIR
───────────────────────────────────────────── */
const C = {
  red:      "#e8270d",
  redDk:    "#f11418",
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

/* ─────────────────────────────────────────────
   FONT LOADER — Poppins exclusively
───────────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
}

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${C.bg}; font-family: 'Poppins', sans-serif; overflow-x: hidden; color: ${C.text}; }
  a { text-decoration: none; transition: opacity 0.2s; }
  ::selection { background: ${C.red}33; color: ${C.text}; }

  @keyframes gradientDrift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes floatUp {
    0%   { transform: translateY(110vh) rotate(0deg); opacity: 0; }
    8%   { opacity: 1; }
    92%  { opacity: 1; }
    100% { transform: translateY(-120px) rotate(200deg); opacity: 0; }
  }
  @keyframes driftL { 0%,100%{ margin-left:0 } 50%{ margin-left:-40px } }
  @keyframes driftR { 0%,100%{ margin-left:0 } 50%{ margin-left: 40px } }
  @keyframes ticker  { from{ transform:translateX(0) } to{ transform:translateX(-33.33%) } }
  @keyframes pulse   { 0%,100%{ opacity:1; transform:scale(1) } 50%{ opacity:0.7; transform:scale(1.15) } }
  @keyframes blobFloat {
    0%,100%{ transform: translate(0,0) scale(1); }
    33%    { transform: translate(30px,-20px) scale(1.05); }
    66%    { transform: translate(-20px,15px) scale(0.96); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes fadeSlideUp {
    from { opacity:0; transform:translateY(32px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity:0; transform: scale(0.88); }
    to   { opacity:1; transform: scale(1); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes borderPulse {
    0%,100%{ border-color: ${C.red}44; }
    50%    { border-color: ${C.red}bb; }
  }
  @keyframes badgePop {
    0%  { transform:scale(0.7); opacity:0; }
    70% { transform:scale(1.1); }
    100%{ transform:scale(1);   opacity:1; }
  }
  @keyframes countUp {
    from { opacity:0; transform: translateY(12px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes waveScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .nav-link:hover { color: ${C.redDk} !important; }
  .menu-card:hover .card-icon { transform: scale(1.15) rotate(-8deg) !important; }
  .step-card:hover { border-color: ${C.red}88 !important; }
  .step-card:hover .step-num  { background: ${C.red} !important; color: #fff !important; }
  .stat-card:hover { transform: translateY(-8px) scale(1.03) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important; }

  @media (max-width: 768px) {
    .hero-grid   { flex-direction: column !important; text-align: center !important; }
    .hero-btns   { justify-content: center !important; }
    .stats-grid  { grid-template-columns: repeat(2,1fr) !important; }
    .steps-grid  { grid-template-columns: 1fr !important; }
    .menu-grid   { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .stats-grid  { grid-template-columns: 1fr !important; }
  }
`;

/* ─────────────────────────────────────────────
   SVG ICONS (professional, stroke-based)
───────────────────────────────────────────── */
const Icon = {
  Coffee: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
    </svg>
  ),
  Pizza: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10"/>
      <path d="m2 12 10 10L22 12"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Bowl: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 2 2 6 2 11h20c0-5-4.5-9-10-9z"/>
      <path d="M2 11c0 5.5 4.5 9 10 9s10-3.5 10-9"/>
      <path d="M9 11v2"/><path d="M12 11v4"/><path d="M15 11v2"/>
    </svg>
  ),
  Burger: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11h18"/><path d="M3 14h18"/>
      <path d="M5 17v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1"/>
      <path d="M5 7V6a7 7 0 0 1 14 0v1"/>
    </svg>
  ),
  Drink: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 2 1.5 15a2 2 0 0 0 2 1.8h5a2 2 0 0 0 2-1.8L18 2"/>
      <path d="M6 2h12"/><path d="M8 10h8"/>
    </svg>
  ),
  Croissant: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 21.16 2 19 2 16a2 2 0 0 1 2.6-2.89z"/>
      <path d="m10.5 9.5-1-2.29C9.2 6.48 9.45 6 10 6c.75 0 1.88 1.46 2.76 3.12"/>
      <path d="M16.5 7.5c-.39-.39-1-.39-1.4 0l-6.6 6.6a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l6.6-6.6c.39-.39.39-1 0-1.4z"/>
    </svg>
  ),
  Cake: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1"/>
      <path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/>
      <path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>
    </svg>
  ),
  Sandwich: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"/>
      <path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83"/>
      <path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3z"/>
    </svg>
  ),
  BubbleTea: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2h8l1 6H7L8 2z"/>
      <path d="M7 8c0 6 2 12 5 12s5-6 5-12"/>
      <circle cx="10" cy="14" r="1"/><circle cx="14" cy="13" r="1"/><circle cx="12" cy="16" r="1"/>
    </svg>
  ),
  Utensils: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/>
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
    </svg>
  ),
  Cart: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  ),
  Clock: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Check: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  Users: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Phone: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
    </svg>
  ),
  Zap: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Star: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Arrow: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  Flame: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/>
    </svg>
  ),
  Leaf: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  ),
  Plus: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Menu: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
    </svg>
  ),
  X: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  MapPin: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Mail: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   ANIMATED BLOB CANVAS BACKGROUND
───────────────────────────────────────────── */
function BlobCanvas({ colors }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.15, y: 0.3,  r: 340, speed: 0.00035, phase: 0,   color: colors[0] },
      { x: 0.8,  y: 0.2,  r: 260, speed: 0.00028, phase: 2.1, color: colors[1] },
      { x: 0.5,  y: 0.7,  r: 400, speed: 0.00022, phase: 4.2, color: colors[2] },
      { x: 0.88, y: 0.65, r: 200, speed: 0.00045, phase: 1.0, color: colors[0] },
      { x: 0.2,  y: 0.75, r: 290, speed: 0.00032, phase: 3.3, color: colors[1] },
    ];

    const draw = (ts) => {
      const t = ts * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach((b) => {
        const cx = (b.x + Math.sin(t * b.speed * 1000 + b.phase) * 0.12) * canvas.width;
        const cy = (b.y + Math.cos(t * b.speed * 1000 + b.phase + 1) * 0.10) * canvas.height;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r);
        grd.addColorStop(0, b.color);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [colors]);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0,
    }} />
  );
}

/* ─────────────────────────────────────────────
   FLOATING FOOD PARTICLES
───────────────────────────────────────────── */
const FLOAT_ICONS = [
  Icon.Coffee, Icon.Pizza, Icon.Bowl, Icon.Burger, Icon.Drink,
  Icon.Croissant, Icon.Cake, Icon.Sandwich, Icon.BubbleTea, Icon.Utensils,
  Icon.Coffee, Icon.Pizza, Icon.Bowl, Icon.Burger, Icon.Flame,
  Icon.Croissant, Icon.Leaf, Icon.Sandwich,
];

function FloatingParticles({ light = false }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        Ic: FLOAT_ICONS[i % FLOAT_ICONS.length],
        left: `${4 + Math.random() * 92}%`,
        dur: `${14 + Math.random() * 18}s`,
        delay: `${-Math.random() * 24}s`,
        size: 14 + Math.random() * 14,
        opacity: 0.06 + Math.random() * 0.14,
        drift: Math.random() > 0.5 ? "driftL" : "driftR",
      }))
    );
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute", left: p.left, bottom: "-80px",
          opacity: p.opacity,
          color: light ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.85)",
          animation: `floatUp ${p.dur} ${p.delay} linear infinite, ${p.drift} ${p.dur} ${p.delay} ease-in-out infinite`,
        }}>
          <p.Ic width={p.size} height={p.size} />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVEAL ON SCROLL
───────────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const hidden = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", scale: "scale(0.88)" }[direction];
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : hidden,
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(.23,1,.32,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ target, suffix = "", duration = 1800 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const pct = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - pct, 3);
          setValue(Math.round(eased * target));
          if (pct < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{value}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   CTA BUTTON
───────────────────────────────────────────── */
function CTAButton({ to, children, variant = "primary", style: extraStyle = {} }) {
  const [h, setH] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: "9px",
    padding: "15px 32px", borderRadius: "14px",
    fontFamily: "'Poppins', sans-serif", fontWeight: 700,
    fontSize: "0.95rem", letterSpacing: "0.01em",
    textDecoration: "none", cursor: "pointer",
    transition: "all 0.3s cubic-bezier(.23,1,.32,1)",
    border: "none",
  };
  const styles = {
    primary: {
      background: h
        ? `linear-gradient(135deg, ${C.redLt}, ${C.red})`
        : `linear-gradient(135deg, ${C.red}, ${C.redDk})`,
      color: "#fff",
      boxShadow: h ? `0 16px 48px ${C.redGlow}, 0 0 0 2px ${C.red}55` : `0 6px 28px ${C.redGlow}`,
      transform: h ? "translateY(-4px) scale(1.03)" : "none",
    },
    secondary: {
      background: h ? "rgba(0,0,0,0.06)" : "transparent",
      color: C.text,
      border: "1.5px solid rgba(0,0,0,0.18)",
      transform: h ? "translateY(-2px)" : "none",
    },
    yellow: {
      background: h
        ? `linear-gradient(135deg, #FFD84D, ${C.yellow})`
        : `linear-gradient(135deg, ${C.yellow}, ${C.yellowDk})`,
      color: C.text,
      boxShadow: h ? `0 16px 40px rgba(249,192,33,0.35)` : `0 6px 24px rgba(249,192,33,0.25)`,
      transform: h ? "translateY(-4px) scale(1.03)" : "none",
    },
  };
  return (
    <Link to={to} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...base, ...styles[variant], ...extraStyle }}>
      {children}
    </Link>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION — AVEC IMAGE DE BACKGROUND ✅
───────────────────────────────────────────── */
function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);

  const onMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  }, []);

  const px = (mouse.x - 0.5) * 28;
  const py = (mouse.y - 0.5) * 18;

  return (
    <section ref={heroRef} onMouseMove={onMove} style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      // ✅ BACKGROUND IMAGE
      backgroundImage: `url(${buveetteBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      paddingTop: "0rem",
    }}>

      {/* ✅ OVERLAY SOMBRE */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0, 0, 0, 0.55)",
        zIndex: 0.5,
      }} />

      <BlobCanvas colors={[
        "rgba(232,39,42,0.10)",
        "rgba(249,192,33,0.07)",
        "rgba(34,197,94,0.06)",
      ]} />
      <FloatingParticles light />

      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(232,39,42,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232,39,42,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2, textAlign: "center", padding: "2rem 2rem 4rem",
        maxWidth: 820, margin: "0 auto",
        transform: `translate(${px * 0.25}px, ${py * 0.25}px)`,
        transition: "transform 0.1s ease",
      }}>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 900,
          fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)", lineHeight: 1.02,
          // ✅ TEXTE BLANC
          color: "#FFFFFF",
          marginBottom: "0.3rem",
          letterSpacing: "-0.03em",
          animation: "fadeSlideUp 0.75s cubic-bezier(.23,1,.32,1) 0.35s both",
          transform: `translate(${px * 0.45}px, ${py * 0.35}px)`,
          transition: "transform 0.1s ease",
          // ✅ SHADOW POUR LISIBILITÉ
          textShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}>
          Votre énergie{" "}
          <span style={{
            background: `linear-gradient(135deg, ${C.red} 0%, ${C.yellowDk} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            display: "inline-block",
          }}>
            au quotidien
          </span>
          {" "}
          <span style={{
            background: `linear-gradient(135deg, ${C.yellowDk} 0%, #fbbf24 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            commence ici
          </span>
        </h1>

        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          // ✅ BLANC TRANSPARENT
          color: "rgba(255, 255, 255, 0.9)",
          maxWidth: 560, margin: "1.8rem auto 3rem",
          lineHeight: 1.8, fontWeight: 400,
          animation: "fadeSlideUp 0.75s cubic-bezier(.23,1,.32,1) 0.5s both",
          // ✅ SHADOW
          textShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}>
          Commandez en ligne et récupérez votre repas sans attente
        </p>

        {/* CTAs */}
        <div className="hero-btns" style={{
          display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap",
          animation: "fadeSlideUp 0.75s cubic-bezier(.23,1,.32,1) 0.65s both",
        }}>
          <CTAButton to="/catalogue" variant="secondary"
            style={{ padding: "17px 36px", fontSize: "1rem" }}>
            <Icon.Utensils width={17} height={17} />
            Voir le menu
          </CTAButton>
        </div>

        {/* Trust badges */}
        <div style={{
          display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap",
          marginTop: "3rem",
          animation: "fadeSlideUp 0.75s cubic-bezier(.23,1,.32,1) 0.8s both",
        }}>
          {[
            { icon: Icon.Star,  text: "4.9 / 5 satisfaction" },
            { icon: Icon.Clock, text: "Retrait en 5 minutes" },
            { icon: Icon.Leaf,  text: "Produits frais du jour" },
          ].map(({ icon: Ic, text }) => (
            <span key={text} style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontFamily: "'Poppins', sans-serif", fontSize: "0.82rem",
              // ✅ BLANC TRANSPARENT
              color: "rgba(255, 255, 255, 0.8)", fontWeight: 500,
              // ✅ SHADOW
              textShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}>
              <Ic width={14} height={14} style={{ color: C.yellowDk }} />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 140,
        background: `linear-gradient(to bottom, transparent, ${C.bg})`,
        zIndex: 3, pointerEvents: "none",
      }} />
    </section>
  );
}

/* ─────────────────────────────────────────────
   TICKER TAPE
───────────────────────────────────────────── */
const TICKER_ITEMS = [
  { Ic: Icon.Coffee,    label: "Café Express"    },
  { Ic: Icon.Pizza,     label: "Pizza du Jour"   },
  { Ic: Icon.Bowl,      label: "Bowl Frais"      },
  { Ic: Icon.BubbleTea, label: "Bubble Tea"      },
  { Ic: Icon.Croissant, label: "Viennoiseries"   },
  { Ic: Icon.Burger,    label: "Burger Maison"   },
  { Ic: Icon.Sandwich,  label: "Tacos Campus"    },
  { Ic: Icon.Cake,      label: "Desserts Maison" },
  { Ic: Icon.Flame,     label: "Plats Chauds"    },
  { Ic: Icon.Leaf,      label: "Options Healthy" },
];

function TickerTape() {
  const triple = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      width: "100%", overflow: "hidden",
      background: `linear-gradient(135deg, ${C.red}, ${C.redDk})`,
      padding: "13px 0",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    }}>
      <div style={{
        display: "flex", gap: "3.5rem", whiteSpace: "nowrap",
        animation: "ticker 28s linear infinite",
        width: "max-content",
      }}>
        {triple.map(({ Ic, label }, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            fontFamily: "'Poppins', sans-serif", fontWeight: 700,
            fontSize: "0.78rem", color: "#fff",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            <Ic width={13} height={13} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STATS SECTION
───────────────────────────────────────────── */
function StatsSection() {
  const stats = [
    { value: 500, suffix: "+",  label: "Étudiants actifs",  Ic: Icon.Users, color: C.red    },
    { value: 30,  suffix: "+",  label: "Produits frais",    Ic: Icon.Bowl,  color: C.green  },
    { value: 98,  suffix: "%",  label: "Satisfaction",      Ic: Icon.Check, color: C.yellow },
    { value: 5,   suffix: "mn", label: "Temps de retrait",  Ic: Icon.Zap,   color: C.red    },
  ];

  return (
    <section style={{ padding: "6rem 2rem", background: C.bgAlt, position: "relative", overflow: "hidden" }}>
      <BlobCanvas colors={[
        "rgba(239, 58, 58, 0.06)",
        "rgba(249,192,33,0.04)",
        "rgba(34,197,94,0.04)",
      ]} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <p style={{
            textAlign: "center", fontFamily: "'Poppins', sans-serif",
            fontSize: "0.7rem", letterSpacing: "0.22em",
            textTransform: "uppercase", color: C.red, marginBottom: "0.5rem", fontWeight: 700,
          }}>En chiffres</p>
          <h2 style={{
            textAlign: "center", fontFamily: "'Poppins', sans-serif",
            fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            color: C.text, marginBottom: "3.5rem", letterSpacing: "-0.02em",
          }}>
            La buvette qui fait <span style={{ color: C.red }}>la différence</span>
          </h2>
        </Reveal>
        <div className="stats-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem",
        }}>
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} direction="up">
              <div className="stat-card" style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: "20px", padding: "2rem 1.5rem",
                textAlign: "center",
                transition: "all 0.35s cubic-bezier(.23,1,.32,1)",
                cursor: "default",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}>
                <div style={{
                  width: 52, height: 52, margin: "0 auto 1.2rem",
                  background: `${s.color}15`,
                  borderRadius: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: s.color, border: `1px solid ${s.color}30`,
                }}>
                  <s.Ic width={24} height={24} />
                </div>
                <div style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 800,
                  fontSize: "2.6rem", color: C.text, lineHeight: 1,
                }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{
                  fontFamily: "'Poppins', sans-serif", fontSize: "0.85rem",
                  color: C.muted, marginTop: "0.5rem", fontWeight: 500,
                }}>
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { Ic: Icon.Phone,    title: "Parcourez le catalogue",  desc: "Découvrez nos repas chauds, snacks et boissons disponibles du lundi au vendredi." },
    { Ic: Icon.Cart,     title: "Ajoutez au panier",       desc: "Choisissez vos articles, personnalisez votre commande et validez en un clic." },
    { Ic: Icon.Clock,    title: "Choisissez le créneau",   desc: "Sélectionnez l'heure de retrait qui vous convient selon votre emploi du temps." },
    { Ic: Icon.Check,    title: "Récupérez & savourez",    desc: "Votre commande est prête à l'heure. Récupérez sans aucune file d'attente." },
  ];

  const colors = [C.red, C.yellowDk, C.green, C.red];

  return (
    <section id="how" style={{ padding: "7rem 2rem", background: C.bgAlt, position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <p style={{
            textAlign: "center", fontFamily: "'Poppins', sans-serif",
            fontSize: "0.7rem", letterSpacing: "0.22em",
            textTransform: "uppercase", color: C.yellowDk, marginBottom: "0.5rem", fontWeight: 700,
          }}>Comment ça marche</p>
          <h2 style={{
            textAlign: "center", fontFamily: "'Poppins', sans-serif",
            fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            color: C.text, marginBottom: "4rem", letterSpacing: "-0.02em",
          }}>
            Commander n'a jamais été aussi <span style={{ color: C.red }}>simple</span>
          </h2>
        </Reveal>

        <div className="steps-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem",
        }}>
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.12} direction="up">
              <div className="step-card" style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: "20px", padding: "2rem 1.5rem",
                position: "relative", overflow: "hidden",
                transition: "all 0.35s cubic-bezier(.23,1,.32,1)",
                cursor: "default",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                display: "flex", flexDirection: "column",
                height: "100%",
              }}>
                {/* Step number */}
                <div className="step-num" style={{
                  width: 36, height: 36, borderRadius: "10px",
                  background: `${colors[i]}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: colors[i], fontSize: "0.7rem", fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800, letterSpacing: "0.05em",
                  border: `1px solid ${colors[i]}40`,
                  marginBottom: "1.25rem",
                  transition: "all 0.3s ease",
                }}>
                  {`0${i + 1}`}
                </div>
                <div style={{
                  width: 48, height: 48, borderRadius: "14px",
                  background: `linear-gradient(135deg, ${colors[i]}18, ${colors[i]}0c)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: colors[i], marginBottom: "1.2rem",
                  border: `1px solid ${colors[i]}30`,
                }}>
                  <s.Ic width={24} height={24} />
                </div>
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 700,
                  fontSize: "1rem", color: C.text, marginBottom: "0.75rem",
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontFamily: "'Poppins', sans-serif", fontSize: "0.85rem",
                  color: C.muted, lineHeight: 1.75, fontWeight: 400,
                  flex: 1,
                }}>
                  {s.desc}
                </p>
                {/* Accent corner */}
                <div style={{
                  position: "absolute", bottom: -20, right: -20,
                  width: 80, height: 80, borderRadius: "50%",
                  background: `${colors[i]}0a`,
                  border: `1px solid ${colors[i]}12`,
                }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MENU CARD
───────────────────────────────────────────── */
const ICON_MAP = {
  "🥗": Icon.Bowl,
  "🍕": Icon.Pizza,
  "☕": Icon.Coffee,
  "🍔": Icon.Burger,
  "🧋": Icon.BubbleTea,
  "🥐": Icon.Croissant,
};

const TAG_COLORS = {
  "Healthy":   { bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.35)",   text: "#16a34a" },
  "Populaire": { bg: "rgba(249,192,33,0.12)",   border: "rgba(249,192,33,0.35)",  text: "#d97706" },
  "Boisson":   { bg: "rgba(139,92,246,0.12)",   border: "rgba(139,92,246,0.35)",  text: "#7c3aed" },
  "Nouveau":   { bg: "rgba(232,39,42,0.12)",    border: "rgba(232,39,42,0.35)",   text: "#dc2626" },
  "Frais":     { bg: "rgba(56,189,248,0.12)",   border: "rgba(56,189,248,0.35)",  text: "#0284c7" },
  "Matin":     { bg: "rgba(251,146,60,0.12)",   border: "rgba(251,146,60,0.35)",  text: "#c2410c" },
};

function MenuCard({ item, index }) {
  const [h, setH] = useState(false);
  const Ic = ICON_MAP[item.emoji] || Icon.Utensils;
  const tag = TAG_COLORS[item.tag] || TAG_COLORS["Nouveau"];

  return (
    <div className="menu-card" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: h ? C.card : C.surface,
        border: `1px solid ${h ? C.red + "55" : C.border}`,
        borderRadius: "20px", padding: "1.5rem",
        display: "flex", flexDirection: "column", gap: "1rem",
        transition: "all 0.35s cubic-bezier(.23,1,.32,1)",
        transform: h ? "translateY(-6px)" : "none",
        boxShadow: h ? `0 20px 50px rgba(0,0,0,0.08), 0 0 0 1px ${C.red}18` : "0 4px 16px rgba(0,0,0,0.03)",
        cursor: "pointer",
        position: "relative", overflow: "hidden",
      }}>

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        {/* Icon */}
        <div className="card-icon" style={{
          width: 58, height: 58, borderRadius: "16px", flexShrink: 0,
          background: h ? `${item.color}20` : "rgba(0,0,0,0.04)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: h ? item.color : "rgba(0,0,0,0.35)",
          border: `1px solid ${h ? item.color + "40" : "rgba(0,0,0,0.07)"}`,
          transition: "all 0.35s cubic-bezier(.23,1,.32,1)",
        }}>
          <Ic width={26} height={26} />
        </div>

        {/* Tag */}
        <span style={{
          background: tag.bg, color: tag.text, border: `1px solid ${tag.border}`,
          borderRadius: "8px", padding: "3px 10px",
          fontSize: "0.62rem", fontFamily: "'Poppins', sans-serif",
          fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          {item.tag}
        </span>
      </div>

      {/* Name + price */}
      <div>
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 700,
          fontSize: "1rem", color: C.text, marginBottom: "0.3rem",
        }}>
          {item.name}
        </div>
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem",
          color: C.muted, fontWeight: 400,
        }}>
          {item.desc}
        </div>
      </div>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", marginTop: "auto" }}>
        <span style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 800,
          fontSize: "1.2rem", color: C.redDk,
        }}>
          {item.price}
        </span>
      </div>

      {/* Hover glow accent */}
      <div style={{
        position: "absolute", bottom: -30, right: -30,
        width: 100, height: 100, borderRadius: "50%",
        background: `${item.color}0a`,
        transition: "opacity 0.3s", opacity: h ? 1 : 0,
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MENU PREVIEW
───────────────────────────────────────────── */
function MenuPreview() {
  const items = [
    { emoji: "🥗", name: "Bowl Méditerranéen",   price: "32 Dh", tag: "Healthy",   color: "#22c55e", desc: "Riz, légumes grillés, sauce tahini" },
    { emoji: "🍕", name: "Pizza Margarita",       price: "28 Dh", tag: "Populaire", color: "#f59e0b", desc: "Tomate, mozzarella, basilic frais"   },
    { emoji: "☕", name: "Café Latte",             price: "12 Dh", tag: "Boisson",   color: "#a78bfa", desc: "Espresso double, lait vapeur"         },
    { emoji: "🍔", name: "Burger Campus",         price: "35 Dh", tag: "Nouveau",   color: C.red,     desc: "Steak 120g, cheddar, sauce maison"   },
    { emoji: "🧋", name: "Bubble Tea Mangue",     price: "20 Dh", tag: "Frais",     color: "#38bdf8", desc: "Thé vert, perles tapioca, mangue"    },
    { emoji: "🥐", name: "Viennoiserie du Matin", price: "8 Dh",  tag: "Matin",     color: "#fb923c", desc: "Croissant pur beurre, fait maison"   },
  ];

  return (
    <section style={{ padding: "7rem 2rem", background: C.bgAlt, position: "relative", overflow: "hidden" }}>
      <BlobCanvas colors={[
        "rgba(232,39,42,0.06)",
        "rgba(249,192,33,0.04)",
        "rgba(34,197,94,0.04)",
      ]} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <p style={{
            textAlign: "center", fontFamily: "'Poppins', sans-serif",
            fontSize: "0.7rem", letterSpacing: "0.22em",
            textTransform: "uppercase", color: C.greenDk, marginBottom: "0.5rem", fontWeight: 700,
          }}>Au menu aujourd'hui</p>
          <h2 style={{
            textAlign: "center", fontFamily: "'Poppins', sans-serif",
            fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            color: C.text, marginBottom: "3.5rem", letterSpacing: "-0.02em",
          }}>
            Nos <span style={{ color: C.red }}>incontournables</span>
          </h2>
        </Reveal>

        <div className="menu-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem",
        }}>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.09}>
              <MenuCard item={item} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <CTAButton to="/catalogue" variant="yellow" style={{ padding: "17px 40px", fontSize: "1rem" }}>
              <Icon.Utensils width={18} height={18} />
              Voir tout le catalogue
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────── */
function CTABanner() {
  return (
    <section style={{
      padding: "7rem 2rem",
      background: `linear-gradient(135deg, #FAF0ED 0%, ${C.bg} 50%, #EDF5ED 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      <BlobCanvas colors={[
        "rgba(232,39,42,0.12)",
        "rgba(249,192,33,0.08)",
        "rgba(34,197,94,0.10)",
      ]} />
      <FloatingParticles light />

      {/* Decorative ring */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500, height: 500, borderRadius: "50%",
        border: `1px solid ${C.red}18`,
        animation: "spin 30s linear infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 650, height: 650, borderRadius: "50%",
        border: `1px solid ${C.yellow}10`,
        animation: "spin 45s linear infinite reverse",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Reveal>
          {/* Icon */}
          <div style={{
            width: 76, height: 76, margin: "0 auto 2rem",
            background: `linear-gradient(135deg, ${C.red}, ${C.redDk})`,
            borderRadius: "24px",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", boxShadow: `0 20px 56px ${C.redGlow}`,
          }}>
            <Icon.Flame width={34} height={34} />
          </div>

          <h2 style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 900,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: C.text, lineHeight: 1.08, marginBottom: "1.2rem",
            letterSpacing: "-0.03em",
          }}>
            Prêt à commander{" "}
            <span style={{
              background: `linear-gradient(135deg, ${C.red} 0%, ${C.yellowDk} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              votre prochain repas ?
            </span>
          </h2>
          <p style={{
            fontFamily: "'Poppins', sans-serif", fontSize: "1.05rem",
            color: C.muted, marginBottom: "2.8rem",
            lineHeight: 1.8, fontWeight: 400,
          }}>
            Rejoignez des centaines d'étudiants qui mangent mieux, plus vite et sans stress grâce à Foodzand.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <CTAButton to="/register" variant="primary" style={{ padding: "18px 42px", fontSize: "1.05rem" }}>
              Créer mon compte gratuitement
              <Icon.Arrow width={18} height={18} />
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
export default function HomePage() {
  useFonts();

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", position: "relative" }}>
      <HeroSection />
      <TickerTape />
      <StatsSection />
      <HowItWorks />
      <MenuPreview />
      <CTABanner />
    </div>
  );
}