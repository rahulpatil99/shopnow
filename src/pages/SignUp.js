// src/pages/SignUp.js

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "1.5rem",
    color: "#333",
    fontSize: "1.75rem",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    width: "100%",
  },
  label: {
    color: "#555",
    fontSize: "0.9rem",
    marginBottom: "0.3rem",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#4e54c8",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  linkText: {
    marginTop: "1rem",
    color: "#4e54c8",
    fontSize: "0.9rem",
  },
};

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    alert("Sign up successful!");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              {...register("email", { required: true })}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
          >
            Sign Up
          </button>
        </form>
        <p style={styles.linkText}>
          Already have an account?{" "}
          <a href="/login" style={styles.linkText}>Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
