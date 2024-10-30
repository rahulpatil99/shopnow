import config from '../Config/config';
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from '../contexts/CartProvider';
import {AuthContext} from '../contexts/AuthProvider';

const OrderCard = ({
  items,
  deliveryCharges,
  packagingCharges,
  freeDeliveryLimit,
  onRemove,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscountedPrice, setDiscountedPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [productItems, setProductItems] = useState(items);
  const [savedAmount, setSavedAmount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const navigate = useNavigate();
  const {setCartCount} = useContext(CartContext);
  const [token,setToken] = useState(null);
  const { isAuthenticated} = useContext(AuthContext)

  const updateQuantity= async(productId,quantity)=>{
    const url = config.REACT_APP_API_URL+"/cart/update/quantity";
    const userId = 1;
    const cartPayload ={
      userId,
      productId,
      quantity
    }
  
    try{
      const response = await fetch(url,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+token
        },
        body: JSON.stringify(cartPayload)
      });
      if (!response.ok) {
        throw new Error(`Failed to add product to cart. Status: ${response.status}`);
      }
  
      const json = await response.json();
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  
  }

  const handleQuantityChange = (index, value) => {
    const products = [...productItems];
    const quantity = Number(value);
    if (quantity > 0 && quantity < 11) {
      //setCartCount(prev=> prev + (quantity - products[index].quantity))
      products[index].quantity = quantity;
      updateQuantity( products[index].productId,quantity);
      setProductItems(products);
    }
  };
  
  const handleRemove = (productId) => {
    setCartCount(prev => prev - productItems.filter((i)=> i.productId == productId)[0].quantity);
    onRemove(productId); // Notify parent component if needed
    const newItems = productItems.filter((item) => item.productId !== productId);
    setProductItems(newItems);
  };

  const findDiscountedPrice = (item) => {
    return (item.price - (item.price * item.discount) / 100) * item.quantity;
  };

  const findItemCount = () => {
    const totalItems = productItems.reduce(
      (prev, item) => prev + item.quantity,
      0
    );
    setTotalItem(totalItems);
  };

  const findTotalPrice = () => {
    const totalPrice = productItems.reduce(
      (prev, item) => prev + Number(item.price) * Number(item.quantity),
      0
    );
    const totalDiscountedPrice = productItems.reduce(
      (prev, item) =>
        prev +
        Number(((item.price * item.discount) / 100) * Number(item.quantity)),
      0
    );
    const discount =
      totalPrice > 0
        ? ((totalPrice - totalDiscountedPrice) * 100) / totalPrice
        : 0;
    const finalamount =
      totalPrice + packagingCharges - Number(totalDiscountedPrice);
    if (freeDeliveryLimit > totalPrice) {
      setFinalAmount(finalamount + deliveryCharges);
      setSavedAmount(totalDiscountedPrice);
    } else {
      setFinalAmount(finalamount);
      setSavedAmount(totalDiscountedPrice + deliveryCharges);
    }
    setTotalPrice(totalPrice);
    setDiscountedPrice(totalDiscountedPrice);
  };

  const proceedToBuy = () => {
    navigate("/DeliveryAddresses");
  };

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
    setToken(localStorage.getItem('jwtToken'));
    if (items.length === 0) {
      // Don't calculate prices if there are no items
      return;
    }
    
    findItemCount();
    findTotalPrice();

    // Update mobile state on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [productItems,token,isAuthenticated]);

  return (
    <div style={styles.container}>
      <div style={styles.cartContainer}>
        <h1 style={styles.header}>
          {totalItem > 0 ? "Your Cart" : "Your Cart is empty"}
        </h1>
        {totalItem > 0 ? <div style={styles.lightLineDiv} /> : <></>}
        {productItems.map((item, index) => (
          <>
            <div key={item.productId} style={styles.productContainer}>
              <img
                src={logo}
                alt={item.productName}
                style={{
                  ...styles.productImg,
                  ...(isMobile ? styles.mobileProductImg : {}),
                }}
              />
              <div style={styles.productDetailContainer}>
                <h2 style={styles.productTitle}>{item.productName}</h2>
                <div style={styles.priceContainer}>
                  <span style={styles.discountedPrice}>
                    ${findDiscountedPrice(item).toFixed(2)}
                  </span>
                  {item.discount > 0 && (
                    <>
                      <span style={styles.originalPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <span style={styles.discount}>{item.discount}% off</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div style={styles.quantityContainer}>
              <label style={styles.quantityLabel}>Quantity:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                style={styles.quantityInput}
              />
              <button
                style={styles.removeButton}
                onClick={() => handleRemove(item.productId)}
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  style={{ marginRight: "5px" }}
                />
                Remove
              </button>
            </div>
            <div style={styles.lightLineDiv}></div>
          </>
        ))}

        {totalItem > 0 && (
          <div style={styles.totalContainer}>
            <span style={styles.discountedPrice}>
              Total: ${totalPrice - totalDiscountedPrice}
            </span>
          </div>
        )}
      </div>
      {
        totalItem > 0 ? (
          <div
            style={{
              ...styles.priceDetailsContainer,
              ...(isMobile ? styles.mobilePriceDetailsContainer : {}),
            }}
          >
            <div style={styles.priceDetail}>
              <label style={styles.priceDetailLabel}>
                Price ({totalItem} {totalItem > 1 ? "items" : "item"})
              </label>
              <label style={styles.priceDetailValue}>
                ${totalPrice.toFixed(2)}
              </label>
            </div>
            {totalDiscountedPrice ? (
              <div style={styles.priceDetail}>
                <label style={styles.priceDetailLabel}>Discount</label>
                <label style={styles.priceDetailValue}>
                  -${totalDiscountedPrice.toFixed(2)}
                </label>
              </div>
            ) : (
              <></>
            )}
            <div style={styles.priceDetail}>
              <label style={styles.priceDetailLabel}>Delivery Charges</label>
              <label style={styles.priceDetailValue}>
                {freeDeliveryLimit <= totalPrice ? (
                  <>
                    <span style={styles.originalPrice}>${deliveryCharges}</span>
                    <span style={styles.discount}>FREE</span>
                  </>
                ) : (
                  <>${deliveryCharges}</>
                )}
              </label>
            </div>
            <div style={styles.priceDetail}>
              <label style={styles.priceDetailLabel}>Packaging Fee</label>
              <label style={styles.priceDetailValue}>${packagingCharges}</label>
            </div>
            <div style={styles.priceDetail}>
              <label style={styles.priceDetailLabel}>Total Amount</label>
              <label style={styles.priceDetailValue}>${finalAmount}</label>
            </div>
            {savedAmount > 0 ? (
              <div style={styles.priceDetail}>
                <label>
                  You will save ${savedAmount.toFixed(2)} on this order
                </label>
              </div>
            ) : (
              <></>
            )}
            <button style={styles.buyButton} onClick={() => proceedToBuy()}>
              <FontAwesomeIcon
                icon={faShoppingCart}
                style={{ marginRight: "5px" }}
              />
              Proceed To Buy
            </button>
          </div>
        ) : (
          <></>
        ) //if order is empty
      }
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  cartContainer: {
    width: "80%",
    maxWidth: "950px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    margin: "10px",
  },
  productContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "10px",
    justifyContent: "flex-start",
  },
  productDetailContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "50%",
    padding: "15px",
  },
  priceDetailsContainer: {
    backgroundColor: "red",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "300px",
  },
  mobilePriceDetailsContainer: {
    flex: 1,
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    gap: 5,
  },
  productImg: {
    width: "200px",
    objectFit: "cover",
  },
  mobileProductImg: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
  },
  productTitle: {
    minWidth: "250px",
    textAlign: "left", // Ensure text is left-aligned
  },
  header: {
    textAlign: "left", // Ensure text is left-aligned
  },
  quantityLabel: {
    marginRight: "10px",
  },
  quantityInput: {
    width: "50px",
    marginRight: "10px",
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
  removeButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buyButton: {
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  totalContainer: {
    display: "flex",
    justifyContent: "flex-end", // Pushes items to the edges
    marginTop: "15px",
    paddingRight: "50px",
    fontWeight: "bold",
  },
  priceDetail: {
    display: "flex",
    margin: "2px 0",
  },
  priceDetailLabel: {
    width: "140px",
  },
  priceDetailValue: {
    flex: 1,
  },
  lightLineDiv: {
    height: "1px", // Thickness of the line
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Light gray color
    margin: "10px 0", // Space around the line
  },
};

export default OrderCard;
