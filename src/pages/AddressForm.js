import React, { useState } from "react";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    pinCode: "",
    state: "",
    city: "",
    houseNo: "",
    buildingName: "",
    roadName: "",
    addressType: "home", // default type
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Shipping Address</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="pinCode"
          placeholder="Pin Code"
          value={formData.pinCode}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <div style={styles.rowContainer}>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            style={styles.rowInput}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            style={styles.rowInput}
            required
          />
        </div>
        <input
          type="text"
          name="houseNo"
          placeholder="House No."
          value={formData.houseNo}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="buildingName"
          placeholder="Building Name"
          value={formData.buildingName}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="roadName"
          placeholder="Road Name, Area, Colony"
          value={formData.roadName}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <div style={styles.addressTypeContainer}>
          <label>
            <input
              type="radio"
              name="addressType"
              value="home"
              checked={formData.addressType === "home"}
              onChange={handleChange}
            />
            Home
          </label>
          <label>
            <input
              type="radio"
              name="addressType"
              value="work"
              checked={formData.addressType === "work"}
              onChange={handleChange}
            />
            Work
          </label>
          <label>
            <input
              type="radio"
              name="addressType"
              value="hotel"
              checked={formData.addressType === "hotel"}
              onChange={handleChange}
            />
            Hotel
          </label>
        </div>
        <button type="submit" style={styles.saveButton}>
          Save Address
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #f0f0f0",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  rowContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  rowInput: {
    flex: "1",
    marginRight: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  addressTypeContainer: {
    marginBottom: "20px",
  },
  saveButton: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default AddressForm;
