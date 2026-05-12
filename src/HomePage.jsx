import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const FOOD_ICONS = ["🍕","☕","🥗","🍔","🧃","🥤","🍩","🌮","🍜","🥪","🍰","🧋","🥐","🍣","🫖"];
const ORANGE = "#e85d04";
const ORANGE_LIGHT = "#ff7c26";
const BROWN_DARK = "#1a0a00";
const BROWN_MID = "#2d1200";
const BROWN_CARD = "rgba(45,18,0,0.7)";

/* ─────────────────────────────────────────────
   FONT LOADER
───────────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
}

/* ─────────────────────────────────────────────
   ANIMATED BLOB BACKGROUND
───────────────────────────────────────────── */
function BlobBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.15, y: 0.25, r: 320, speed: 0.0004, phase: 0,    color: "rgba(232,93,4,0.13)" },
      { x: 0.75, y: 0.15, r: 260, speed: 0.0003, phase: 2.1,  color: "rgba(232,93,4,0.09)" },
      { x: 0.55, y: 0.65, r: 380, speed: 0.00025,phase: 4.2,  color: "rgba(255,124,38,0.07)" },
      { x: 0.85, y: 0.55, r: 200, speed: 0.0005, phase: 1.0,  color: "rgba(232,93,4,0.11)" },
      { x: 0.25, y: 0.75, r: 280, speed: 0.00035,phase: 3.3,  color: "rgba(255,124,38,0.08)" },
    ];

    const draw = (ts) => {
      timeRef.current = ts * 0.001;
      const t = timeRef.current;
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
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────────── */
function FloatingParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const count = 18;
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        icon: FOOD_ICONS[i % FOOD_ICONS.length],
        left: `${5 + Math.random() * 90}%`,
        animDuration: `${12 + Math.random() * 16}s`,
        animDelay: `${-Math.random() * 20}s`,
        size: `${1.2 + Math.random() * 1.4}rem`,
        opacity: 0.12 + Math.random() * 0.22,
        drift: Math.random() > 0.5 ? "driftL" : "driftR",
      }))
    );
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
        }
        @keyframes driftL {
          0%, 100% { margin-left: 0; }
          50%       { margin-left: -40px; }
        }
        @keyframes driftR {
          0%, 100% { margin-left: 0; }
          50%       { margin-left: 40px; }
        }
      `}</style>
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:1 }}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.left,
              bottom: "-60px",
              fontSize: p.size,
              opacity: p.opacity,
              animation: `floatUp ${p.animDuration} ${p.animDelay} linear infinite, ${p.drift} ${p.animDuration} ${p.animDelay} ease-in-out infinite`,
              filter: "blur(0.3px)",
              userSelect: "none",
            }}
          >
            {p.icon}
          </div>
        ))}
      </div>
    </>
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
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
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   GLASS CARD
───────────────────────────────────────────── */
function GlassCard({ children, style = {}, hover = true }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: hovered
          ? "rgba(232,93,4,0.14)"
          : "rgba(255,255,255,0.04)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: `1px solid ${hovered ? "rgba(232,93,4,0.45)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "20px",
        padding: "2rem",
        transition: "all 0.35s cubic-bezier(.23,1,.32,1)",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "none",
        boxShadow: hovered
          ? "0 20px 60px rgba(232,93,4,0.2), 0 0 0 1px rgba(232,93,4,0.3)"
          : "0 4px 24px rgba(0,0,0,0.3)",
        cursor: "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVEAL ON SCROLL
───────────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const hidden = {
    up:    "translateY(40px)",
    left:  "translateX(-40px)",
    right: "translateX(40px)",
    scale: "scale(0.9)",
  }[direction];

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hidden,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(.23,1,.32,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TICKER TAPE
───────────────────────────────────────────── */
function TickerTape() {
  const items = [
    "☕ Café Express", "🍕 Pizza du Jour", "🥗 Bowl Frais", "🧋 Bubble Tea",
    "🥐 Viennoiseries", "🍔 Burger Maison", "🌮 Tacos Campus", "🍰 Desserts",
  ];
  const repeated = [...items, ...items, ...items];
  return (
    <>
      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
      `}</style>
      <div style={{
        width: "100%", overflow: "hidden",
        background: ORANGE,
        padding: "10px 0",
        borderTop: "1px solid rgba(255,255,255,0.15)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
      }}>
        <div style={{
          display: "flex", gap: "3rem", whiteSpace: "nowrap",
          animation: "ticker 28s linear infinite",
          width: "max-content",
        }}>
          {repeated.map((item, i) => (
            <span key={i} style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#fff",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const parallaxX = (mousePos.x - 0.5) * 24;
  const parallaxY = (mousePos.y - 0.5) * 16;

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, #3d1500 0%, #1a0800 40%, #0d0400 100%)`,
        transition: "background 0.1s ease",
      }}
    >
      <BlobBackground />
      <FloatingParticles />

      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(232,93,4,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232,93,4,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2, textAlign: "center",
        padding: "2rem",
        transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`,
        transition: "transform 0.1s ease",
      }}>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(232,93,4,0.15)",
          border: "1px solid rgba(232,93,4,0.4)",
          borderRadius: "100px",
          padding: "6px 18px",
          marginBottom: "2rem",
          backdropFilter: "blur(12px)",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 8px #4ade80" }} />
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", letterSpacing: "0.06em" }}>
            Service opérationnel · Commandez maintenant
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2.8rem, 7vw, 6rem)",
          lineHeight: 1.05,
          color: "#fff",
          margin: 0,
          transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.4}px)`,
          transition: "transform 0.08s ease",
        }}>
          La buvette de{" "}
          <span style={{
            background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_LIGHT} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "inline-block",
          }}>
            votre campus
          </span>
          ,<br />réinventée.
        </h1>

        <p style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          color: "rgba(255,255,255,0.6)",
          maxWidth: 580,
          margin: "1.8rem auto 2.8rem",
          lineHeight: 1.7,
          fontWeight: 300,
        }}>
          Repas chauds, boissons fraîches et snacks livrés en quelques clics.
          Commandez, récupérez, savourez — sans attente.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <HoverButton to="/catalogue" primary>
            🍽️ Explorer le catalogue
          </HoverButton>
          <HoverButton to="/register" primary={false}>
            S'inscrire gratuitement →
          </HoverButton>
        </div>

        {/* Social proof */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "0.8rem", marginTop: "2.5rem",
        }}>
          <div style={{ display: "flex" }}>
            {["🧑‍🎓", "👩‍🏫", "🧑‍💻", "👩‍🔬", "🧑‍🎨"].map((e, i) => (
              <div key={i} style={{
                width: 34, height: 34, borderRadius: "50%",
                background: `hsl(${20 + i * 12}, 70%, ${30 + i * 5}%)`,
                border: "2px solid #1a0800",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem", marginLeft: i > 0 ? -10 : 0, zIndex: 5 - i,
              }}>
                {e}
              </div>
            ))}
          </div>
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
            +500 étudiants commandent déjà chaque jour
          </span>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
        background: "linear-gradient(to bottom, transparent, #100600)",
        zIndex: 3, pointerEvents: "none",
      }} />
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOVER BUTTON
───────────────────────────────────────────── */
function HoverButton({ children, to, primary = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "14px 28px", borderRadius: "12px",
        fontFamily: "Syne, sans-serif", fontWeight: 700,
        fontSize: "0.95rem", letterSpacing: "0.02em",
        textDecoration: "none",
        transition: "all 0.3s cubic-bezier(.23,1,.32,1)",
        ...(primary
          ? {
              background: hovered
                ? `linear-gradient(135deg, ${ORANGE_LIGHT}, ${ORANGE})`
                : `linear-gradient(135deg, ${ORANGE}, #b84000)`,
              color: "#fff",
              boxShadow: hovered
                ? `0 12px 40px rgba(232,93,4,0.5), 0 0 0 2px rgba(232,93,4,0.3)`
                : `0 4px 20px rgba(232,93,4,0.3)`,
              transform: hovered ? "translateY(-3px) scale(1.03)" : "none",
            }
          : {
              background: hovered ? "rgba(255,255,255,0.1)" : "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.25)",
              transform: hovered ? "translateY(-2px)" : "none",
            }),
      }}
    >
      {children}
    </Link>
  );
}

/* ─────────────────────────────────────────────
   STATS SECTION
───────────────────────────────────────────── */
function StatsSection() {
  const stats = [
    { value: 500, suffix: "+", label: "Étudiants actifs", icon: "🧑‍🎓" },
    { value: 30,  suffix: "+", label: "Produits frais",   icon: "🥗" },
    { value: 98,  suffix: "%", label: "Satisfaction",     icon: "⭐" },
    { value: 5,   suffix: "mn", label: "Temps de retrait", icon: "⚡" },
  ];

  return (
    <section style={{
      padding: "6rem 2rem",
      background: BROWN_MID,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(232,93,4,0.06) 0%, transparent 60%),
                          radial-gradient(circle at 80% 50%, rgba(232,93,4,0.04) 0%, transparent 60%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <p style={{
            textAlign: "center",
            fontFamily: "Syne, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: ORANGE,
            marginBottom: "0.5rem",
          }}>
            En chiffres
          </p>
          <h2 style={{
            textAlign: "center",
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#fff",
            marginBottom: "3.5rem",
          }}>
            La buvette qui fait la différence
          </h2>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
        }}>
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} direction="up">
              <GlassCard style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                <div style={{
                  fontFamily: "Syne, sans-serif", fontWeight: 800,
                  fontSize: "2.8rem", color: ORANGE, lineHeight: 1,
                }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{
                  fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.55)", marginTop: "0.5rem",
                }}>
                  {s.label}
                </div>
              </GlassCard>
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
    { icon: "📱", title: "Parcourez le catalogue", desc: "Découvrez nos repas chauds, snacks et boissons disponibles du lundi au vendredi." },
    { icon: "🛒", title: "Ajoutez au panier",       desc: "Choisissez vos articles, personnalisez votre commande et validez en un clic." },
    { icon: "⏱️", title: "Choisissez le créneau",   desc: "Sélectionnez l'heure de retrait qui vous convient selon votre emploi du temps." },
    { icon: "🎉", title: "Récupérez & savourez",    desc: "Votre commande est prête à l'heure. Récupérez sans file d'attente." },
  ];

  return (
    <section style={{
      padding: "7rem 2rem",
      background: BROWN_DARK,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <p style={{
            textAlign: "center", fontFamily: "Syne, sans-serif",
            fontSize: "0.75rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: ORANGE, marginBottom: "0.5rem",
          }}>
            Comment ça marche
          </p>
          <h2 style={{
            textAlign: "center", fontFamily: "Syne, sans-serif",
            fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#fff", marginBottom: "4rem",
          }}>
            Commander n'a jamais été aussi simple
          </h2>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          position: "relative",
        }}>
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.12} direction="up">
              <GlassCard>
                <div style={{
                  width: 52, height: 52,
                  background: `linear-gradient(135deg, ${ORANGE}, #b84000)`,
                  borderRadius: "14px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.6rem", marginBottom: "1.2rem",
                  boxShadow: `0 8px 24px rgba(232,93,4,0.35)`,
                }}>
                  {s.icon}
                </div>
                <div style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "0.65rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: ORANGE, marginBottom: "0.5rem",
                }}>
                  Étape {i + 1}
                </div>
                <h3 style={{
                  fontFamily: "Syne, sans-serif", fontWeight: 700,
                  fontSize: "1.1rem", color: "#fff", marginBottom: "0.75rem",
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.65, fontWeight: 300,
                }}>
                  {s.desc}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MENU PREVIEW
───────────────────────────────────────────── */
function MenuPreview() {
  const items = [
    { emoji: "🥗", name: "Bowl Méditerranéen",  price: "32 Dh", tag: "Healthy",   color: "#166534" },
    { emoji: "🍕", name: "Pizza Margarita",      price: "28 Dh", tag: "Populaire", color: "#b45309" },
    { emoji: "☕", name: "Café Latte",            price: "12 Dh", tag: "Boisson",   color: "#7c3aed" },
    { emoji: "🍔", name: "Burger Campus",        price: "35 Dh", tag: "Nouveau",   color: ORANGE },
    { emoji: "🧋", name: "Bubble Tea Mangue",    price: "20 Dh", tag: "Frais",     color: "#0891b2" },
    { emoji: "🥐", name: "Viennoiserie du Matin",price: "8 Dh",  tag: "Matin",     color: "#b45309" },
  ];

  return (
    <section style={{
      padding: "7rem 2rem",
      background: BROWN_MID,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <p style={{
            textAlign: "center", fontFamily: "Syne, sans-serif",
            fontSize: "0.75rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: ORANGE, marginBottom: "0.5rem",
          }}>
            Au menu aujourd'hui
          </p>
          <h2 style={{
            textAlign: "center", fontFamily: "Syne, sans-serif",
            fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#fff", marginBottom: "3.5rem",
          }}>
            Nos incontournables
          </h2>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <MenuCard item={item} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link
              to="/catalogue"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: `linear-gradient(135deg, ${ORANGE}, #b84000)`,
                color: "#fff", padding: "16px 36px",
                borderRadius: "14px", textDecoration: "none",
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem",
                boxShadow: `0 12px 40px rgba(232,93,4,0.35)`,
                transition: "all 0.3s ease",
              }}
            >
              Voir tout le catalogue 🍽️
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MenuCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(232,93,4,0.1)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(232,93,4,0.4)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "18px",
        padding: "1.5rem",
        display: "flex", alignItems: "center", gap: "1.2rem",
        transition: "all 0.3s cubic-bezier(.23,1,.32,1)",
        transform: hovered ? "translateX(6px)" : "none",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{
        width: 64, height: 64, flexShrink: 0, borderRadius: "16px",
        background: hovered ? `${item.color}28` : "rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "2rem",
        transition: "all 0.3s ease",
        transform: hovered ? "scale(1.12) rotate(-4deg)" : "none",
      }}>
        {item.emoji}
      </div>
      <div style={{ flex: 1 }}>
        <span style={{
          display: "inline-block",
          background: `${item.color}22`,
          color: item.color, border: `1px solid ${item.color}44`,
          borderRadius: "6px", padding: "2px 8px",
          fontSize: "0.65rem", fontFamily: "Syne, sans-serif",
          fontWeight: 700, letterSpacing: "0.06em",
          textTransform: "uppercase", marginBottom: "0.4rem",
        }}>
          {item.tag}
        </span>
        <div style={{
          fontFamily: "Syne, sans-serif", fontWeight: 600,
          fontSize: "1rem", color: "#fff",
        }}>
          {item.name}
        </div>
      </div>
      <div style={{
        fontFamily: "Syne, sans-serif", fontWeight: 800,
        fontSize: "1.1rem", color: ORANGE, flexShrink: 0,
      }}>
        {item.price}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────── */
function CTABanner() {
  const [hovered, setHovered] = useState(false);
  return (
    <section style={{
      padding: "7rem 2rem",
      background: BROWN_DARK,
      position: "relative", overflow: "hidden",
    }}>
      {/* Animated bg circles */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(232,93,4,0.12) 0%, transparent 70%)`,
        animation: "pulse 4s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
          50%       { transform: translate(-50%,-50%) scale(1.15); opacity: 1; }
        }
      `}</style>

      <div style={{
        maxWidth: 700, margin: "0 auto", textAlign: "center",
        position: "relative", zIndex: 1,
      }}>
        <Reveal>
          <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>🚀</div>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "#fff", lineHeight: 1.1, marginBottom: "1.2rem",
          }}>
            Prêt à commander<br />
            <span style={{
              background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              votre prochain repas ?
            </span>
          </h2>
          <p style={{
            fontFamily: "DM Sans, sans-serif", fontSize: "1.05rem",
            color: "rgba(255,255,255,0.55)", marginBottom: "2.5rem",
            lineHeight: 1.7, fontWeight: 300,
          }}>
            Rejoignez des centaines d'étudiants qui mangent mieux, plus vite et sans stress grâce à Buvette Univ.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/register"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: hovered
                  ? `linear-gradient(135deg, ${ORANGE_LIGHT}, ${ORANGE})`
                  : `linear-gradient(135deg, ${ORANGE}, #b84000)`,
                color: "#fff", padding: "18px 40px",
                borderRadius: "14px", textDecoration: "none",
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem",
                boxShadow: hovered
                  ? `0 20px 60px rgba(232,93,4,0.5)`
                  : `0 10px 35px rgba(232,93,4,0.35)`,
                transform: hovered ? "translateY(-4px) scale(1.03)" : "none",
                transition: "all 0.3s cubic-bezier(.23,1,.32,1)",
              }}
            >
              Créer mon compte gratuitement
            </Link>
            <Link
              to="/catalogue"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "transparent",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "18px 32px",
                borderRadius: "14px", textDecoration: "none",
                fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
            >
              Explorer le menu
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE (root)
───────────────────────────────────────────── */
export default function HomePage() {
  useFonts();

  // Global styles injection
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; background: ${BROWN_DARK}; }
      a { transition: opacity 0.2s; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ background: BROWN_DARK, minHeight: "100vh" }}>
      <HeroSection />
      <TickerTape />
      <StatsSection />
      <HowItWorks />
      <MenuPreview />
      <CTABanner />
    </div>
  );
}