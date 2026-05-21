import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBox,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const UserLayout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: "20px" }}>
      {/* Contenu principal */}
      <div
        style={{
          width: "100%",
          maxWidth: "1500px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          minHeight: "100vh",
          position: "relative",
          paddingBottom: "80px", // espace pour le bottom nav
        }}
      >
        {children}
      </div>

      {/* Bottom Navigation */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#fff",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "10px 0",
          borderTop: "1px solid #e0e0e0",
          zIndex: 1000,
        }}
      >
        <Link to="/" style={{ textAlign: "center", color: "#ff3131" }}>
          <FontAwesomeIcon icon={faHome} size="lg" />
          <div style={{ fontSize: "12px" }}>Home</div>
        </Link>
        <Link to="/orders" style={{ textAlign: "center", color: "#333" }}>
          <FontAwesomeIcon icon={faBox} size="lg" />
          <div style={{ fontSize: "12px" }}>Orders</div>
        </Link>
        <Link to="/cart" style={{ textAlign: "center", color: "#333" }}>
          <FontAwesomeIcon icon={faCartShopping} size="lg" />
          <div style={{ fontSize: "12px" }}>Cart</div>
        </Link>
        <Link to="/profile" style={{ textAlign: "center", color: "#333" }}>
          <FontAwesomeIcon icon={faUser} size="lg" />
          <div style={{ fontSize: "12px" }}>Profile</div>
        </Link>
      </div>
    </div>
  );
};

export default UserLayout;