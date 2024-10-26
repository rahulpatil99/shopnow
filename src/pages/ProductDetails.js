import React, { useState, useEffect } from "react";
import ElectronicProductDetails from "../components/ElectronicProductDetails";
import Reviews from "../components/Reviews";
import ProductInfo from "../components/ProductInfo";

import logo from "../logo.svg";

const ProductDetails = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

  const products = {
    id: "1",
    name: "Model X1",
    brand: "Brand A",
    discountedPrice: 559.99,
    discount: 20,
    price: 699.99,
    currency: "Rupees",
    availability: "In Stock",
    specifications: {
      display: "6.5 inches, AMOLED",
      ram: "8 GB",
      storage: "128 GB",
      battery: "4500 mAh",
      processor: "Octa-core 2.84 GHz",
      camera: {
        rear: "64 MP + 12 MP + 5 MP",
        front: "32 MP",
      },
    },
    image: "https://example.com/images/model-x1.jpg",
    ratings: {
      average: 4.5,
      totalReviews: 150,
    },
    releaseDate: "2023-05-15",
    colorOptions: ["Black", "Silver", "Blue"],
    warranty: "1 year",
    weight: "180 g",
    dimensions: "160 x 74 x 8 mm",
  };

  const reviewData = [
    {
      id: 1,
      reviewer: "Alice Johnson",
      rating: 4.5,
      review:
        "Great product! The display is stunning and performance is smooth.",
      date: "2023-08-15",
    },
    {
      id: 2,
      reviewer: "Bob Smith",
      rating: 4.0,
      review: "Good value for the price, but the battery could be better.",
      date: "2023-09-10",
    },
    {
      id: 3,
      reviewer: "Carol Lee",
      rating: 5.0,
      review: "Absolutely love this phone! The camera quality is amazing.",
      date: "2023-09-20",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.productImgContainer,
          position: isMobile ? "static" : "sticky",
          top: isMobile ? "auto" : "20px",
        }}
      >
        <img src={logo} style={styles.productImg} alt={products.name} />
        <ProductInfo product={products} />
      </div>
      <div style={styles.specificationContainer}>
        <ElectronicProductDetails product={products} />
        <Reviews reviewData={reviewData} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
    margin: "0 auto",
    maxWidth: "1200px",
    padding: "20px",
  },
  productImgContainer: {
    flex: "1 1 300px",
    border: "1px solid #f0f0f0",
    flexDirection: "column",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    height: "fit-content", // Adjust height to fit content
  },
  productImg: {
    width: "100%",
    height: "auto", // Maintain aspect ratio
    maxHeight: "300px", // Limit max height
    objectFit: "cover",
    borderRadius: "8px", // Add border radius to the image
    marginBottom: "16px", // Space between image and info
  },
  specificationContainer: {
    flex: "1 1 300px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "16px",
    border: "1px solid #f0f0f0",
  },
};

export default ProductDetails;
