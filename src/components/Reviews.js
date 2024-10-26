import React from "react";

const Reviews = ({ reviewData }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Customer Reviews</h2>
      {reviewData.map((review) => (
        <div key={review.id} style={styles.reviewContainer}>
          <div style={styles.header}>
            <span style={styles.reviewer}>{review.reviewer}</span>
            <span style={styles.rating}>Rating: {review.rating} ★</span>
          </div>
          <p style={styles.reviewText}>{review.review}</p>
          <span style={styles.date}>{review.date}</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "16px",
    backgroundColor: "#fff",
    border: "1px solid #f0f0f0",
    borderRadius: "8px",
    marginTop: "20px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#333",
  },
  reviewContainer: {
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "12px",
    marginBottom: "12px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  reviewer: {
    fontWeight: "bold",
    color: "#333",
  },
  rating: {
    color: "#FFA500", // Gold color for ratings
  },
  reviewText: {
    color: "#555",
    marginBottom: "8px",
  },
  date: {
    fontSize: "12px",
    color: "#aaa",
  },
};

export default Reviews;
