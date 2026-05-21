import React, { useState } from "react";
import UserLayout from "../../components/UserLayout";

function Profile() {

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  // Nombre produits panier
  const cartCount = cart.length;

  // Total dépensé
  const totalSpent = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  // Rating dynamique
  let rating = 0;

  if (orders.length >= 1) rating = 3.5;
  if (orders.length >= 3) rating = 4.2;
  if (orders.length >= 5) rating = 4.7;
  if (orders.length >= 10) rating = 5;

  const [name, setName] = useState(
    localStorage.getItem("userName") || "Mohamed User"
  );

  const [email, setEmail] = useState(
    localStorage.getItem("userEmail") || "mohamed@gmail.com"
  );

  const [phone, setPhone] = useState(
    localStorage.getItem("userPhone") || "+212 6 00 00 00 00"
  );

  const [editing, setEditing] = useState(false);

  const saveProfile = () => {

    localStorage.setItem("userName", name);

    localStorage.setItem("userEmail", email);

    localStorage.setItem("userPhone", phone);

    setEditing(false);

    alert("Profil mis à jour ✅");
  };

  return (
    <UserLayout>

      <div
        style={{
          padding: "40px",
          paddingBottom: "120px",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            background: "linear-gradient(135deg, #ff3131, #ff7b7b)",
            borderRadius: "35px",
            padding: "50px 40px",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "30px",
            marginBottom: "40px",
            boxShadow: "0 15px 40px rgba(255,49,49,0.30)",
            position: "relative",
            overflow: "hidden",
          }}
        >

          <div
            style={{
              position: "absolute",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              top: "-70px",
              right: "-70px",
            }}
          />

          {/* AVATAR */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "white",
              color: "#ff3131",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "50px",
              fontWeight: "bold",
              zIndex: 2,
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            {name.charAt(0)}
          </div>

          {/* USER INFO */}
          <div style={{ zIndex: 2 }}>

            <h1
              style={{
                fontSize: "42px",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              {name}
            </h1>

            <p
              style={{
                fontSize: "18px",
                opacity: 0.95,
                marginBottom: "15px",
              }}
            >
              Étudiant • Université
            </p>

            <div
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.18)",
                padding: "10px 18px",
                borderRadius: "14px",
                fontWeight: "bold",
              }}
            >
              ⭐ Premium Client
            </div>

          </div>

        </div>

        {/* PROFILE CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
          }}
        >

          {/* PERSONAL INFO */}
          <div
            style={{
              background: "#fff",
              borderRadius: "25px",
              padding: "30px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >

            <h2
              style={{
                marginBottom: "25px",
                color: "#ff3131",
              }}
            >
              Informations personnelles
            </h2>

            {/* NAME */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#888" }}>
                Nom complet
              </p>

              {editing ? (
                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    marginTop: "8px",
                  }}
                />
              ) : (
                <h3>{name}</h3>
              )}
            </div>

            {/* EMAIL */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#888" }}>
                Email
              </p>

              {editing ? (
                <input
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    marginTop: "8px",
                  }}
                />
              ) : (
                <h3>{email}</h3>
              )}
            </div>

            {/* PHONE */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#888" }}>
                Téléphone
              </p>

              {editing ? (
                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    marginTop: "8px",
                  }}
                />
              ) : (
                <h3>{phone}</h3>
              )}
            </div>

            {/* BUTTONS */}
            {!editing ? (

              <button
                onClick={() => setEditing(true)}
                style={{
                  marginTop: "10px",
                  padding: "14px 22px",
                  border: "none",
                  borderRadius: "14px",
                  background: "#ff3131",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                Modifier Profil
              </button>

            ) : (

              <button
                onClick={saveProfile}
                style={{
                  marginTop: "10px",
                  padding: "14px 22px",
                  border: "none",
                  borderRadius: "14px",
                  background: "#22c55e",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                Sauvegarder ✅
              </button>

            )}

          </div>

          {/* STATS */}
          <div
            style={{
              background: "#fff",
              borderRadius: "25px",
              padding: "30px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >

            <h2
              style={{
                marginBottom: "25px",
                color: "#ff3131",
              }}
            >
              Activité
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >

              {/* CART */}
              <div
                style={{
                  background: "#f5f5f5",
                  padding: "20px",
                  borderRadius: "18px",
                }}
              >
                <h1 style={{ color: "#ff3131" }}>
                  {cartCount}
                </h1>

                <p>Produits dans le panier</p>
              </div>

              {/* TOTAL */}
              <div
                style={{
                  background: "#f5f5f5",
                  padding: "20px",
                  borderRadius: "18px",
                }}
              >
                <h1 style={{ color: "#ff3131" }}>
                  {totalSpent} DH
                </h1>

                <p>Total dépensé</p>
              </div>

              {/* RATING */}
              <div
                style={{
                  background: "#f5f5f5",
                  padding: "20px",
                  borderRadius: "18px",
                }}
              >
                <h1 style={{ color: "#ff3131" }}>
                  {rating} ★
                </h1>

                <p>Évaluation</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </UserLayout>
  );
}

export default Profile;