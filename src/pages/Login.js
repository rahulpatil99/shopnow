// src/pages/Login.js

import React, { useState,useEffect,useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate,useLocation } from "react-router-dom";
import config from "../Config/config";
import { AuthContext } from "../contexts/AuthProvider";

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
  buttonHover: {
    backgroundColor: "#3b40a2",
  },
  linkText: {
    marginTop: "1rem",
    color: "#4e54c8",
    fontSize: "0.9rem",
  },
};

const Login = () => {
  const { register, handleSubmit } = useForm();
  //const [token,setToken] = useState(null);
  const { login,token } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const getToken = async (data) =>{
      const url = config.REACT_APP_API_URL+'/authentication/token';
      try{
      const response = await fetch(url,{
        method:'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        alert("Invalid credentials.");
        throw new Error(`Failed to c. Status: ${response.status}`);
      }
  
      const json = await response.json();
      login(json.token);
      navigate(from);

    } catch (error) {
      console.error('Error authorization:', error.message);
    }
  }

  useEffect(()=>{
    if(token){
      alert("Login successful!");
      navigate(from);
    }
  },[token,navigate])
  const onSubmit = (data) => {
    getToken(data);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              {...register("username", { required: true })}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              {...register("password", { required: true })}
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={{ ...styles.button }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Login
          </button>
        </form>
        <p style={styles.linkText}>
          Don't have an account?{" "}
          <a href="/signup" style={styles.linkText}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
