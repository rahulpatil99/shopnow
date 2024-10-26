import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUserCircle,
  faBox,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div style={styles.dashboard}>
      {/* Sidebar */}
      <aside
        style={{
          ...styles.sidebar,
          width: isCollapsed ? "60px" : "200px",
        }}
      >
        <button
          onClick={toggleSidebar}
          style={{
            ...styles.toggleButton,
            left: isCollapsed ? "15px" : "170px", // Dynamically set left position
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <nav style={styles.nav}>
          <Link to="/admin/users" style={styles.link}>
            {!isCollapsed ? (
              <span style={styles.linkText}>User Management</span>
            ) : (
              <FontAwesomeIcon icon={faUserCircle} />
            )}
          </Link>
          <Link to="/admin/users" style={styles.link}>
            {!isCollapsed ? (
              <span style={styles.linkText}>Order Management</span>
            ) : (
              <FontAwesomeIcon icon={faShoppingCart} />
            )}
          </Link>
          <Link to="/admin/users" style={styles.link}>
            {!isCollapsed ? (
              <span style={styles.linkText}>Product Management</span>
            ) : (
              <FontAwesomeIcon icon={faBox} />
            )}
          </Link>
        </nav>
      </aside>
    </div>
  );
};

const styles = {
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
  },
  sidebar: {
    backgroundColor: "#282c34",
    color: "#fff",
    padding: "20px",
    height: "100vh",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    transition: "width 0.3s ease",
    position: "relative",
  },
  toggleButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    fontSize: "1.2rem",
    position: "absolute",
    top: "10px",
    transition: "left 0.3s",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    marginTop: "50px", // Space for toggle button
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    padding: "15px 0",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "padding 0.3s",
  },
  linkText: {
    transition: "opacity 0.3s",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#fff",
  },
};

export default DashboardSidebar;
