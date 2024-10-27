import config from '../Config/config'
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom"; // If you're using React Router for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const [cartCount,setCartCount] = useState(0);
  const customerId = 1;

  // Function to fetch cart count from backend
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
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>ShopNow</h1>
      </div>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>
          Home
        </Link>
        <div style={styles.loginContainer}>
          {/* <Link to="/login" style={styles.navLink}> */}
          <ProfileDropdown />
          {/* </Link> */}
        </div>

        <div style={styles.cartIconContainer}>
          <Link to="/cart" style={styles.navLink}>
            {" "}
            <FontAwesomeIcon icon={faShoppingCart} style={styles.cartIcon} />
            <span style={styles.cartCount}>{cartCount}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white",
    flexWrap: "wrap", // Allows items to wrap on smaller screens
  },
  logoContainer: {
    flex: "1 1 100%", // Takes full width on small screens
  },
  logo: {
    margin: "0",
    fontSize: "1.5rem",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    flex: "1 1 auto", // Allows the nav to grow and shrink
    justifyContent: "flex-end", // Aligns items to the right
    flexWrap: "wrap", // Wraps nav links on smaller screens
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
    fontSize: "1rem",
  },

  cartIconContainer: {
    position: "relative",
    cursor: "pointer",
    width: "20px",
    height: "20px",
    left: "-10px",
  },
  loginContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: "15px",
  },
  loginIcon: {
    marginRight: "5px",
  },
  cartCount: {
    position: "absolute",
    backgroundColor: "red",
    color: "white",
    top: "-15px",
    right: "-20px",
    borderRadius: "50%",
    padding: "3px 6px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    lineHeight: "1rem",
  },
};

export default Header;
