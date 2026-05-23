import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const T = {
  red: "#ff3131",
  redLight: "#ffe5e5",
  gray100: "#E5E7EB",
  gray400: "#9CA3AF",
  gray600: "#4B5563",
  gray800: "#1F2937",
};

export default function Navbar() {

  const { user, logout } = useAuth();

  const location = useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const isActive = (path) =>
    location.pathname === path;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (

    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#fff",
        borderBottom:
          `1px solid ${T.gray100}`,
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >

      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "0 25px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >

        {/* LOGO */}

        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >

          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: T.red,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            B
          </div>

          <h2
            style={{
              margin: 0,
              color: T.gray800,
              fontSize: "34px",
            }}
          >
            Buvette
            <span
              style={{
                color: T.red,
              }}
            >
              Univ
            </span>
          </h2>

        </Link>

        {/* MENU */}

        <div
          style={{
            display: "flex",
            gap: "40px",
          }}
        >

          <Link
            to="/"
            style={{
              textDecoration: "none",
              color:
                isActive("/")
                  ? T.red
                  : T.gray600,
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            Accueil
          </Link>

          <Link
            to="/catalogue"
            style={{
              textDecoration: "none",
              color:
                isActive("/catalogue")
                  ? T.red
                  : T.gray600,
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            Catalogue
          </Link>

          {
            user && (

              <Link
                to="/orders"
                style={{
                  textDecoration: "none",
                  color:
                    isActive("/orders")
                      ? T.red
                      : T.gray600,
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Mes commandes
              </Link>

            )
          }

        </div>

        {/* RIGHT */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            position: "relative",
          }}
        >

          {
            user ? (

              <>
                {/* AVATAR */}

                <button
                  onClick={() =>
                    setMenuOpen(!menuOpen)
                  }
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    border: "none",
                    background: T.red,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "22px",
                    cursor: "pointer",
                  }}
                >
                  {initials}
                </button>

                {/* USER */}

                <div>

                  <h4
                    style={{
                      margin: 0,
                      fontSize: "20px",
                      color: T.gray800,
                    }}
                  >
                    {user.name}
                  </h4>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: T.gray400,
                    }}
                  >
                    Connecté
                  </p>

                </div>

                {/* DROPDOWN */}

                {
                  menuOpen && (

                    <div
                      style={{
                        position: "absolute",
                        top: "75px",
                        right: 0,
                        width: "280px",
                        background: "#fff",
                        borderRadius: "22px",
                        boxShadow:
                          "0 10px 30px rgba(0,0,0,0.12)",
                        overflow: "hidden",
                      }}
                    >

                      {/* TOP */}

                      <div
                        style={{
                          padding: "22px",
                          borderBottom:
                            `1px solid ${T.gray100}`,
                        }}
                      >

                        <h3
                          style={{
                            margin: 0,
                            marginBottom: "6px",
                          }}
                        >
                          {user.name}
                        </h3>

                        <p
                          style={{
                            margin: 0,
                            color: T.gray400,
                            fontSize: "15px",
                          }}
                        >
                          {user.email}
                        </p>

                      </div>

                      {/* PROFILE */}

                      <Link
                        to="/profile"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        style={{
                          display: "block",
                          padding: "20px 22px",
                          textDecoration: "none",
                          color: T.gray600,
                          fontSize: "18px",
                          fontWeight: "500",
                        }}
                      >
                        Mon profil
                      </Link>

                      {/* ORDERS */}

                      <Link
                        to="/orders"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        style={{
                          display: "block",
                          padding: "20px 22px",
                          textDecoration: "none",
                          color: T.gray600,
                          fontSize: "18px",
                          fontWeight: "500",
                        }}
                      >
                        Mes commandes
                      </Link>

                      {/* LOGOUT */}

                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                        style={{
                          width: "100%",
                          border: "none",
                          background: "#fff5f5",
                          color: "#ef4444",
                          padding: "18px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        Déconnexion
                      </button>

                    </div>

                  )
                }

              </>

            ) : (

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >

                <Link
                  to="/login"
                  style={{
                    padding: "12px 22px",
                    borderRadius: "14px",
                    border:
                      `1px solid ${T.gray100}`,
                    textDecoration: "none",
                    color: T.gray600,
                    fontWeight: "600",
                  }}
                >
                  Connexion
                </Link>

                <Link
                  to="/register"
                  style={{
                    padding: "12px 22px",
                    borderRadius: "14px",
                    background: T.red,
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  S'inscrire
                </Link>

              </div>

            )
          }

        </div>

      </div>

    </nav>
  );
}