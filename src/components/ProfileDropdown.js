// ProfileDropdown.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    navigate("/"+option)
    setIsOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const styles = {
    dropdown: {
      color:'black',
      position: 'relative',
      display: 'inline-block',
    },
    button: {
      backgroundColor: '#282c34',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      cursor: 'pointer',
      borderRadius: '5px',
    },
    buttonHover: {
      // backgroundColor: '#0056b3',
    },
    menu: {
      position: 'absolute',
      top: '100%', // Align below the button
      left: '0', // Align to the right
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 1, // Ensure it's above other elements
      width: '150px',
    },
    option: {
      padding: '10px',
      cursor: 'pointer',
    },
    optionHover: {
      backgroundColor: '#f1f1f1', // Change background on hover
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

  return (
    <div style={styles.dropdown} ref={dropdownRef}>
      <button 
        onClick={toggleDropdown} 
        style={styles.button} 
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
      >
        <FontAwesomeIcon icon={faUserCircle} style={styles.loginIcon} />
        Profile
      </button>
      {isOpen && (
        <div style={styles.menu}>
          <div 
            onClick={() => handleOptionClick('wishlist')} 
            style={styles.option}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.optionHover.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            WishList
          </div>
          <div 
            onClick={() => handleOptionClick('orders')} 
            style={styles.option}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.optionHover.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            Orders
          </div>
          <div 
            onClick={() => handleOptionClick('logout')} 
            style={styles.option}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.optionHover.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
