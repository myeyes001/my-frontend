import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const REVENUE_DATA = [
  { day: "Lun", revenue: 1200 },
  { day: "Mar", revenue: 1850 },
  { day: "Mer", revenue: 1600 },
  { day: "Jeu", revenue: 2100 },
  { day: "Ven", revenue: 2800 },
  { day: "Sam", revenue: 900 },
  { day: "Dim", revenue: 400 },
];

const ORDERS_DATA = [
  { day: "Lun", orders: 18 },
  { day: "Mar", orders: 25 },
  { day: "Mer", orders: 22 },
  { day: "Jeu", orders: 30 },
  { day: "Ven", orders: 38 },
  { day: "Sam", orders: 12 },
  { day: "Dim", orders: 6 },
];

const CATEGORY_DATA = [
  { name: "Fast-food", value: 42, color: "#E8272A" },
  { name: "Boissons",  value: 28, color: "#8B5CF6" },
  { name: "Desserts",  value: 18, color: "#F9C021" },
  { name: "Repas",     value: 12, color: "#22C55E" },
];

const TOP_PRODUCTS = [
  { name: "Burger Maison",   orders: 156, revenue: "4,680 DH", trend: "+12%" },
  { name: "Pizza Margherita",orders: 132, revenue: "3,300 DH", trend: "+8%"  },
  { name: "Café Latte",      orders: 245, revenue: "2,940 DH", trend: "+22%" },
  { name: "Bowl Méditerranéen",orders: 89, revenue: "2,848 DH", trend: "+5%"  },
  { name: "Croissant Beurre",orders: 178, revenue: "1,246 DH", trend: "+15%" },
];

const PEAK_HOURS = [
  { hour: "08h", orders: 8 },
  { hour: "09h", orders: 12 },
  { hour: "10h", orders: 6 },
  { hour: "11h", orders: 15 },
  { hour: "12h", orders: 35 },
  { hour: "13h", orders: 28 },
  { hour: "14h", orders: 10 },
  { hour: "15h", orders: 5 },
  { hour: "16h", orders: 8 },
  { hour: "17h", orders: 3 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: 12, padding: "0.65rem 0.9rem",
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      fontFamily: "'Poppins', sans-serif", fontSize: "0.78rem",
    }}>
      <div style={{ fontWeight: 700, marginBottom: 2 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {p.value}{p.dataKey === "revenue" ? " DH" : ""}
        </div>
      ))}
    </div>
  );
};

function AdminAnalytics() {
  const [period, setPeriod] = useState("semaine");

  return (
    <div className="admin-animate-in">
      <div className="admin-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 className="admin-page-title">Analytiques</h1>
          <p className="admin-page-subtitle">Statistiques et performances de votre buvette</p>
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {["semaine", "mois", "année"].map(p => (
            <button key={p}
              onClick={() => setPeriod(p)}
              className={`admin-btn admin-btn-sm ${period === p ? "admin-btn-primary" : "admin-btn-outline"}`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats */}
      <div className="admin-stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { label: "Revenu total",   value: "10,850 DH", delta: "+18%", deltaType: "up",   color: "#E8272A" },
          { label: "Commandes",      value: "151",       delta: "+24",  deltaType: "up",   color: "#22C55E" },
          { label: "Panier moyen",   value: "71.9 DH",   delta: "+5%",  deltaType: "up",   color: "#F9C021" },
          { label: "Taux de retrait",value: "96%",       delta: "+2%",  deltaType: "up",   color: "#8B5CF6" },
        ].map(s => (
          <div key={s.label} className="admin-stat-card">
            <div className="admin-stat-top">
              <div className="admin-stat-icon" style={{
                background: `${s.color}12`, border: `1px solid ${s.color}30`, color: s.color,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
              </div>
              <span className={`admin-stat-delta ${s.deltaType}`}>{s.delta}</span>
            </div>
            <div className="admin-stat-value">{s.value}</div>
            <div className="admin-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
        {/* Revenue chart */}
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">💰 Revenus de la semaine</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={REVENUE_DATA} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "rgba(0,0,0,0.45)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "rgba(0,0,0,0.45)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" name="Revenu" fill="#E8272A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie */}
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">📊 Répartition par catégorie</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                {CATEGORY_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginTop: "0.5rem" }}>
            {CATEGORY_DATA.map(c => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.72rem", fontWeight: 600, color: "rgba(0,0,0,0.55)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
                {c.name} ({c.value}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        {/* Orders line chart */}
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">📈 Commandes par jour</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ORDERS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "rgba(0,0,0,0.45)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "rgba(0,0,0,0.45)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="orders" name="Commandes" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: "#22C55E", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Peak hours bar chart */}
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">⏰ Heures de pointe</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PEAK_HOURS} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "rgba(0,0,0,0.45)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "rgba(0,0,0,0.45)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="orders" name="Commandes" fill="#F9C021" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top products table */}
      <div className="admin-table-wrap" style={{ marginTop: "1.25rem" }}>
        <div className="admin-table-toolbar">
          <h3 className="admin-section-title" style={{ margin: 0 }}>🏆 Top produits</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Produit</th>
              <th>Commandes</th>
              <th>Revenu</th>
              <th>Tendance</th>
            </tr>
          </thead>
          <tbody>
            {TOP_PRODUCTS.map((p, i) => (
              <tr key={i}>
                <td>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: i === 0 ? "linear-gradient(135deg, #F9C021, #E0A800)" : i === 1 ? "rgba(0,0,0,0.06)" : i === 2 ? "rgba(205,127,50,0.15)" : "rgba(0,0,0,0.03)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "0.72rem",
                    color: i === 0 ? "#fff" : "rgba(0,0,0,0.4)",
                  }}>
                    {i + 1}
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td>{p.orders}</td>
                <td style={{ fontWeight: 700, color: "#E8272A" }}>{p.revenue}</td>
                <td><span className="admin-badge admin-badge-success">{p.trend}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminAnalytics;