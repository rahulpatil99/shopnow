import React, { useState, useEffect } from "react";

const ProceedPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    pinCode: "",
    state: "",
    city: "",
    address: "",
    addressType: "",
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order placed with data: ", formData);
    handlePayment();
  };

  // Razorpay payment integration
  const handlePayment = () => {
    const options = {
      key: "rzp_test_1D8D2Jb0YOToTX", // Replace with your Razorpay key
      amount: 50000, // Amount in paise
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      handler: function (response) {
        console.log(response);
        alert("Payment Successful!");
      },
      prefill: {
        name: formData.fullName,
        email: "example@example.com",
        contact: formData.phoneNumber,
      },
      theme: {
        color: "#F37254",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Handle window resize event for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={isMobile ? styles.containerMobile : styles.container}>
      <h2>Proceed to Payment</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <div style={isMobile ? styles.column : styles.row}>
          <input
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            value={formData.pinCode}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="address"
          placeholder="House No., Building Name, Road Name, Area, Colony"
          value={formData.address}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <select
          name="addressType"
          value={formData.addressType}
          onChange={handleChange}
          required
          style={styles.select}
        >
          <option value="">Select Address Type</option>
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="hotel">Hotel</option>
        </select>
        <button type="submit" style={styles.button}>
          Save Address & Proceed to Payment
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    border: "1px solid #f0f0f0",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  containerMobile: {
    padding: "10px",
    maxWidth: "100%",
    margin: "0 auto",
    border: "none",
    backgroundColor: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  textarea: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    height: "100px",
  },
  select: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
};

export default ProceedPage;
