import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../components/UserLayout";

import burger from "../../assets/burger.jpg";
import pizza from "../../assets/Pizza Margherita.jpg";
import jus from "../../assets/jus.jpg";

function Dashboard() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <UserLayout>
      <div style={{ paddingBottom: "120px" }}>
        {/* HERO SECTION */}
        <div
          style={{
            background: "linear-gradient(135deg, #ff3131, #ff6b6b)",
            borderRadius: "25px",
            padding: "30px",
            color: "white",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "22px",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            Bonjour Mohamed
          </h1>

          <p style={{ fontSize: "14px", opacity: 0.9 }}>
            Commandez votre repas préféré rapidement.
          </p>
        </div>

        {/* TITLE */}
        <h2
          style={{
            marginBottom: "25px",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          Popular Foods
        </h2>

        {/* FOOD GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "25px",
          }}
        >
          {/* BURGER */}
          <div
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
            style={{
              background: "#fff",
              borderRadius: "25px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            <img
              src={burger}
              alt=""
              style={{ width: "100%", height: "220px", objectFit: "cover" }}
            />
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>Burger Classic</h3>
              <p style={{ color: "#777", marginBottom: "15px" }}>Double steak + fromage</p>
              <h2 style={{ color: "#ff3131", marginBottom: "20px" }}>45 DH</h2>
              <button
                onClick={() => addToCart("Burger")}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "14px",
                  background: "#ff3131",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Ajouter au panier
              </button>
            </div>
          </div>

          {/* PIZZA */}
          <div
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
            style={{
              background: "#fff",
              borderRadius: "25px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            <img
              src={pizza}
              alt=""
              style={{ width: "100%", height: "220px", objectFit: "cover" }}
            />
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>Pizza Margherita</h3>
              <p style={{ color: "#777", marginBottom: "15px" }}>Fromage italien</p>
              <h2 style={{ color: "#ff3131", marginBottom: "20px" }}>60 DH</h2>
              <button
                onClick={() => addToCart("Pizza")}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "14px",
                  background: "#ff3131",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Ajouter au panier
              </button>
            </div>
          </div>

          {/* JUS */}
          <div
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
            style={{
              background: "#fff",
              borderRadius: "25px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            <img
              src={jus}
              alt=""
              style={{ width: "100%", height: "220px", objectFit: "cover" }}
            />
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>Fresh Juice</h3>
              <p style={{ color: "#777", marginBottom: "15px" }}>Orange & fruits</p>
              <h2 style={{ color: "#ff3131", marginBottom: "20px" }}>20 DH</h2>
              <button
                onClick={() => addToCart("Juice")}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "14px",
                  background: "#ff3131",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Ajouter au panier
              </button>
            </div>
          </div>

        </div>
      </div>
    </UserLayout>
  );
}

export default Dashboard;