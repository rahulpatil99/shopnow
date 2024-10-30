// src/contexts/CartProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import config from "../Config/config";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token, isAuthenticated } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);
  const customerId = 1;

  const fetchCartCount = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${config.REACT_APP_API_URL}/cart/count?userId=${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const count = await response.json();
        setCartCount(count);
      } else {
        console.error(`Failed to fetch cart count. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartCount();  // Fetch count after login
    }
    else{
      setCartCount(0);
    }
  }, [isAuthenticated, token]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
