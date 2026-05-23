import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/api";

const C = {
  red: "#E8272A",
  redDk: "#C01F22",
  redGlow: "rgba(232,39,42,0.25)",

  bg: "#FFF7ED",
  card: "#FFFFFF",
  surface: "#FFF1E6",

  text: "#1F1F1F",
  textSoft: "#4A4A4A",
  muted: "rgba(0,0,0,0.50)",

  border: "rgba(0,0,0,0.08)",

  white: "#FFFFFF",
};

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [mounted, setMounted] = useState(false);

  const [focusedField, setFocusedField] =
    useState(null);

  const { login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {

    const t = setTimeout(() => {
      setMounted(true);
    }, 50);

    return () => clearTimeout(t);

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      // LOGIN API
      const response =
        await loginUser({
          email,
          password,
        });

      // TOKEN + USER
      const token = response.data.token;
      const user = response.data.user;

      // SAVE TOKEN
      localStorage.setItem(
        "auth_token",
        token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );

      // CONTEXT LOGIN
      login(token, {
        name: user.name,
        email: user.email,
        role: user.role,
      });

      // REFRESH
      window.location.reload();

      // REDIRECT
      navigate(
        user.role === "admin"
          ? "/admin"
          : "/"
      );

    } catch (err) {

      const errorMessage =
        err.response?.data?.message ||
        "Email ou mot de passe incorrect.";

      setError(errorMessage);

    } finally {

      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "15px 18px",
    border:
      focusedField === field
        ? `2px solid ${C.red}`
        : `1px solid ${C.border}`,
    borderRadius: "14px",
    fontSize: "15px",
    background: C.surface,
    outline: "none",
    marginBottom: "20px",
    transition: "0.2s",
  });

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: C.bg,
        padding: "20px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: C.card,
          borderRadius: "28px",
          padding: "40px",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.08)",

          opacity: mounted ? 1 : 0,

          transform: mounted
            ? "translateY(0)"
            : "translateY(20px)",

          transition: "0.5s",
        }}
      >

        {/* TITLE */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >

          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "20px",
              background: C.red,
              color: "white",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            B
          </div>

          <h1
            style={{
              margin: 0,
              color: C.text,
            }}
          >
            Connexion
          </h1>

          <p
            style={{
              color: C.muted,
              marginTop: "10px",
            }}
          >
            Connectez-vous à votre compte
          </p>

        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            onFocus={() =>
              setFocusedField("email")
            }
            onBlur={() =>
              setFocusedField(null)
            }
            style={inputStyle("email")}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            onFocus={() =>
              setFocusedField("password")
            }
            onBlur={() =>
              setFocusedField(null)
            }
            style={inputStyle("password")}
            required
          />

          {
            error && (

              <div
                style={{
                  background: "#ffe5e5",
                  color: C.red,
                  padding: "12px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {error}
              </div>

            )
          }

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "14px",
              background: C.red,
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow:
                `0 10px 30px ${C.redGlow}`,
            }}
          >

            {
              loading
                ? "Connexion..."
                : "Se connecter"
            }

          </button>

        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: C.textSoft,
          }}
        >

          Pas encore de compte ?{" "}

          <Link
            to="/register"
            style={{
              color: C.red,
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            S'inscrire
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;