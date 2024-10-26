import React from "react";

const ElectronicProductDetails = ({ product }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Product Specifications</h2>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Name:</label>
        <span style={styles.value}>{product.name}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Brand:</label>
        <span style={styles.value}>{product.brand}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Currency:</label>
        <span style={styles.value}>{product.currency}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Availability:</label>
        <span style={styles.value}>{product.availability}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Display:</label>
        <span style={styles.value}>{product.specifications.display}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>RAM:</label>
        <span style={styles.value}>{product.specifications.ram}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Storage:</label>
        <span style={styles.value}>{product.specifications.storage}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Battery:</label>
        <span style={styles.value}>{product.specifications.battery}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Processor:</label>
        <span style={styles.value}>{product.specifications.processor}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Camera:</label>
        <span style={styles.value}>{product.specifications.camera.rear}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Release Date:</label>
        <span style={styles.value}>{product.releaseDate}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Color Options:</label>
        <span style={styles.value}>{product.colorOptions.join(", ")}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Warranty:</label>
        <span style={styles.value}>{product.warranty}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Weight:</label>
        <span style={styles.value}>{product.weight}</span>
      </div>
      <div style={styles.rowContainer}>
        <label style={styles.label}>Dimensions:</label>
        <span style={styles.value}>{product.dimensions}</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    //flex: "1 1 300px", // Allows responsive resizing
    padding: "20px",
    border: "1px solid #f0f0f0",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#333",
  },
  rowContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    fontSize: "14px",
    color: "#333",
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    color: "#555",
  },
};

export default ElectronicProductDetails;
