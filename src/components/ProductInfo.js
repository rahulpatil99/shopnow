import React from "react";

const ProductInfo = ({ product }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.productTitle}>{product.name}</h2>
      <p style={styles.ratings}>
        {product.ratings.average} ⭐ | {product.ratings.totalReviews} Reviews
      </p>
      <p style={styles.price}>
        <span style={styles.discountedPrice}>₹{product.discountedPrice}</span>
        <span style={styles.originalPrice}> ₹{product.price}</span>
        <span style={styles.discountPercentage}> {product.discount}% off</span>
      </p>
      <button style={styles.addToCartButton}>Add to Cart</button>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "20px",
    height: "auto", // Adjust height to fit content
    textAlign: "center", // Center the text
  },
  productTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  ratings: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  price: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
  },
  discountedPrice: {
    color: "#d9534f", // Color for discounted price
    fontWeight: "bold",
  },
  originalPrice: {
    textDecoration: "line-through",
    marginLeft: "8px",
    color: "#999", // Lighter color for original price
  },
  discountPercentage: {
    color: "#388e3c", // Highlight discount percentage
    marginLeft: "8px",
  },
  addToCartButton: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ProductInfo;
