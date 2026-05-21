import Dashboard from "./pages/user/Dashboard";
import Cart from "./pages/user/Cart";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Catalogue from "./pages/public/Catalogue";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminSlots from "./pages/admin/AdminSlots";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public routes (with Navbar + Footer) ── */}
         <Route path="/" element={<><Navbar /><Dashboard /><Footer /></>} />
          <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
          <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
          <Route path="/catalogue" element={<><Navbar /><Catalogue /><Footer /></>} />
          <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />

<Route path="/orders" element={<><Navbar /><Orders /><Footer /></>} />

<Route path="/profile" element={<><Navbar /><Profile /><Footer /></>} />
          {/* ── Admin routes (own layout, no Navbar/Footer) ── */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="slots" element={<AdminSlots />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;