import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const DashboardHeader = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>ShopNow</h1>
      </div>
      <nav style={styles.nav}>
        <div style={styles.loginContainer}>
          <Link to="/login" style={styles.navLink}>
            <FontAwesomeIcon icon={faUserCircle} style={styles.loginIcon} />
            <span>Login</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white",
    flexWrap: "wrap", // Allows items to wrap on smaller screens
  },
  logoContainer: {
    flex: "1 1 100%", // Takes full width on small screens
  },
  logo: {
    margin: "0",
    fontSize: "1.5rem",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    flex: "1 1 auto", // Allows the nav to grow and shrink
    justifyContent: "flex-end", // Aligns items to the right
    flexWrap: "wrap", // Wraps nav links on smaller screens
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
    fontSize: "1rem",
  },
  loginContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: "15px",
  },
  loginIcon: {
    marginRight: "5px",
  },
};

export default DashboardHeader;
