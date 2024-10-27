import config from '../Config/config'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from 'react-router-dom'


const Card = ({
  productsId,
  img,
  productTitle,
  description,
  price,
  isProductLike,
  discount,
  onRemove
}) => {
  const [productId,setProductId] = useState(productsId);
  const [userId,setUserId] = useState(1);
  const [productLike, setProductLike] = useState(isProductLike);
  const [discountedPrice, setDiscountedPrice] = useState(price);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const navigate = useNavigate();
  const { setCartCount } = useOutletContext();

  console.log(productId);
  useEffect(() => {
    PriceFinder();

    // Update mobile state on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [price, discount]);

  const handleNavigate = () => {
    navigate("./productDetails");
  };

  const PriceFinder = () => {
    if (discount > 0) {
      setDiscountedPrice(price - (price * discount) / 100);
    } else {
      setDiscountedPrice(price);
    }
  };

  const likeToggle = () => {
    
    updateLike();
    if(productLike) 
      onRemove(productId);
    setProductLike(!productLike);
  };
  
  const addToCart = async () =>{
    
    const cartPayload ={
      userId,
      productId,
    }
    const url = config.REACT_APP_API_URL+"/cart/addproduct";
    
    try{
      const response = await fetch(url,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartPayload)
      });
      if (!response.ok) {
        throw new Error(`Failed to add product to cart. Status: ${response.status}`);
      }
      
      const json = await response.json();
      setCartCount(prevCount => prevCount + 1); // Increment the cart count
      console.log('Product added to cart:', json);
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  }
  
  const updateLike = async () =>{
    
    const cartPayload ={
      userId,
      productId,
    }
    const url = config.REACT_APP_API_URL+"/wishlist/update";
    
    try{
      const response = await fetch(url,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartPayload)
      });
      if (!response.ok) {
        throw new Error(`Failed to product like. Status: ${response.status}`);
      }
      
      const json = await response.json();
      console.log('Product like updated:', json);
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  }
  
  // Styles object
  const styles = {
    container: {
      height: "auto",
      width: "200px", // Default width for larger screens
      // maxWidth: "14rem",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.3s",
      padding: "30px",
      margin: "10px",
    },
    mobile: {
      margin: "auto",
      width: "250px", // Full width for mobile devices
    },
    likeContainer: {
      position: "absolute",
      top: "20px",
      right: "20px",
      fontSize: "1.8rem",
      zIndex: 1,
    },
    productImg: {
      height: "10rem",
      width: "100%",
      objectFit: "cover",
    },
    title: {
      fontSize: "1.2rem",
      margin: "10px 0",
      color: "#333",
    },
    description: {
      fontSize: "0.9rem",
      margin: "10px 0",
      color: "#555",
    },
    priceContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "5px 0",
    },
    discountedPrice: {
      fontSize: "1.2rem",
      color: "#333",
      fontWeight: "bold",
    },
    originalPrice: {
      fontSize: "1.2rem",
      color: "#888",
      textDecoration: "line-through",
    },
    discount: {
      fontSize: "1.2rem",
      color: "lightgreen",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      width: "100%", // Make button full width
    },
  };

  if(!productsId) return (<div>loading..</div>);
  return (
    <div
      style={{
        ...styles.container,
        ...(isMobile ? styles.mobile : {}), // Apply mobile styles if on a mobile device
      }}
      onClick={handleNavigate}
    >
      <div style={styles.likeContainer}>
        <FontAwesomeIcon
          icon={solidHeart}
          style={{
            color: productLike ? "red" : "lightgray",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering handleNavigate
            likeToggle();
          }}
        />
      </div>
      <img src={logo} style={styles.productImg} alt={productTitle} />
      <h3 style={styles.title}>{productTitle}</h3>
      <p style={styles.description}>{description}</p>
      <div style={styles.priceContainer}>
        <span style={styles.discountedPrice}>
          ${discountedPrice}
        </span>
        {discount > 0 && (
          <>
            <span style={styles.originalPrice}>${price}</span>
            <span style={styles.discount}>{discount}% off</span>
          </>
        )}
      </div>
      <button style={styles.button} onClick={(e) => {
        e.stopPropagation();
            addToCart();
              setCartCount(prevCount => prevCount + 1); // Increment the cart count
          }}>Add to Cart{productId}</button>
    </div>
  );
};

export default Card;
