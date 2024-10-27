import React,{useEffect, useState} from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import config from "../Config/config";

const PublicLayout = () => {
  const [cartCount,setCartCount] = useState(0);
  const customerId = 1;

  const fetchCartCount = async ()=>{
    const url = config.REACT_APP_API_URL;
    try {
      const response = await fetch(url+`/cart/count?userId=${customerId}`);
      const count = await response.json();
      setCartCount(count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  }

  useEffect(()=>{
    fetchCartCount();
  },[])


  return (
    <div>
      <Header cartCount ={cartCount}/>
      <main>
        <Outlet  context ={{setCartCount}} /> {/* This will render the current route's component */}
      </main>
    </div>
  );
};

export default PublicLayout;
