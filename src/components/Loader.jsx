function Loader({ text = "Chargement..." }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .loader-ring {
          width: 44px;
          height: 44px;
          border: 3px solid rgba(232,93,4,0.15);
          border-top-color: #e85d04;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
      `}</style>
      <div className="loader-ring"></div>
      <p style={{
        marginTop: "1rem",
        color: "#8a7060",
        fontSize: "0.875rem",
        fontWeight: 500,
        animation: "pulse 1.5s ease-in-out infinite",
      }}>
        {text}
      </p>
    </div>
  );
}

export default Loader;