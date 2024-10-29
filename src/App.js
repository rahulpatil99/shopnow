import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import DashboardLayout from "./layout/DashboardLayout";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ProceedPage from "./pages/ProceedPage";
import DeliveryAddresses from "./pages/DeliveryAddresses";
import UserList from "./pages/UserList";
// import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
//import './App.css';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const loginOpen = () => setIsLogin(true);
  const loginClose = () => setIsLogin(false);
  return (
    <Router>
      <Routes>
        {/* Public layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/DeliveryAddresses" element={<DeliveryAddresses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route
            path="/login"
            element={<Login isOpen={loginOpen} onClose={loginClose} />}
          /> */}
          <Route path="/ProductDetails" element={<ProductDetails />} />
          <Route path="/ProceedPage" element={<ProceedPage />} />
        </Route>
        {/* Admin Layout */}
        <Route path="/admin" element={<DashboardLayout />}>
          {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </Router>
    // <UserList/>
  );
};

export default App;
