import React, { useState } from "react";
import Modal from "react-modal";

// Set Modal root to the app element
Modal.setAppElement("#root");

const Login = ({ isOpen, onClose }) => {
  const [isOtpMode, setIsOtpMode] = useState(false);

  const toggleOtpMode = () => {
    setIsOtpMode(!isOtpMode);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Login Modal"
      style={styles.modal}
    >
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <h2 style={styles.title}>Login</h2>
          <p style={styles.description}>
            Get access to your Orders, Wishlist and Recommendations
          </p>
        </div>
        <div style={styles.rightSection}>
          <form style={styles.form}>
            {!isOtpMode ? (
              <>
                <input
                  type="text"
                  placeholder="Enter Email/Mobile Number"
                  style={styles.input}
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  style={styles.input}
                />
                <button style={styles.loginButton}>Login</button>
                <p style={styles.or}>OR</p>
                <button style={styles.otpButton} onClick={toggleOtpMode}>
                  Request OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  style={styles.input}
                />
                <button style={styles.otpButton}>Request OTP</button>
              </>
            )}
          </form>
          <p style={styles.newUser}>
            New to ShopNow?{" "}
            <span style={styles.createAccount}>Create an account</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

const styles = {
  modal: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "70%",
      width: "70%",
      margin: "auto",
      padding: 0,
      borderRadius: "8px",
      border: "none",
      overflow: "hidden",
    },
  },
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
  leftSection: {
    backgroundColor: "#2874f0",
    padding: "30px",
    width: "35%",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "500",
  },
  description: {
    marginTop: "10px",
    fontSize: "1rem",
  },
  rightSection: {
    padding: "30px",
    width: "65%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  loginButton: {
    padding: "10px",
    backgroundColor: "#fb641b",
    color: "white",
    fontSize: "1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  otpButton: {
    padding: "10px",
    backgroundColor: "white",
    color: "#2874f0",
    fontSize: "1rem",
    border: "1px solid #2874f0",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  or: {
    textAlign: "center",
    margin: "10px 0",
  },
  terms: {
    fontSize: "0.85rem",
    color: "#878787",
    marginTop: "20px",
  },
  newUser: {
    fontSize: "0.9rem",
    marginTop: "20px",
  },
  createAccount: {
    color: "#2874f0",
    cursor: "pointer",
  },
  link: {
    color: "#2874f0",
    cursor: "pointer",
  },
};

export default Login;
