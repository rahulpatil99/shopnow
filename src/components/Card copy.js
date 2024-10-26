import React, { useState } from 'react';
import logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

const Card = ({ img, productTitle, description, price, isProductLike,discount }) => {
    const [productLike, setProductLike] = useState(isProductLike);
    //const [discount,setDiscount] = useState(discount);
    const [discountedPrice,setDiscountedPrice] = useState(price);

    const PriceFinder = () =>{
        if(discount>0) setDiscountedPrice((price*discount)/100);
    }

    const likeToggle = () => {
        setProductLike(!productLike);
    };

    return (
        <div style={styles.container}>
            <div style={styles.likeContainer}>
                <FontAwesomeIcon
                    icon={solidHeart}
                    style={{ color: productLike ? 'red' : 'lightgray', cursor: 'pointer' }}
                    onClick={likeToggle}
                />
            </div>
            <img src={logo} style={styles.productImg} alt={productTitle} />
            <h3 style={styles.title}>{productTitle}</h3>
            <p style={styles.description}>{description}</p>
            <div style={styles.priceContainer}>
                <span style={styles.discountedPrice}>${discountedPrice}</span>
                {discount>0 ? <span style={styles.originalPrice}>${price}</span>:<></>}
                {discount>0 ? <span style={styles.discount}>{discount}% off</span>:<></>}
            </div>
            <button style={styles.button}>Add to Cart</button>
        </div>
    );
};

const styles = {
    container: {
        height: '20rem',
        width: '14rem',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
        position: 'relative', // Position relative for absolute positioning of like icon
        overflow: 'hidden', // Hide overflow
        transition: 'transform 0.3s', // Smooth transition for hover effect
    },
    likeContainer: {
        position: 'absolute', // Position it absolutely within the card
        top: '10px',
        right: '10px',
        fontSize: '1.5rem',
        zIndex: 1, // Ensure the like icon is above other elements
    },
    productImg: {
        height: '10rem',
        width: '100%', // Full width of the card
        objectFit: 'cover', // Cover the area without distortion
    },
    title: {
        fontSize: '1.2rem',
        margin: '10px 0',
        color: '#333', // Dark gray color
    },
    description: {
        fontSize: '0.9rem',
        margin: '10px 0',
        color: '#555', // Medium gray color
    },
    priceContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px', // Space between original and discounted price
        padding:'5px'
    },
    discountedPrice: {
        fontSize: '1.2rem',
        color: '#333', // Dark gray color
        fontWeight: 'bold',
    },
    originalPrice: {
        fontSize: '1.2rem',
        color: '#888', // Lighter gray
        textDecoration: 'line-through',
    },
    discount:{
        fontSize: '1.2rem',
        color: 'lightgreen', // Lighter gray
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#007BFF', // Bootstrap primary color
        color: '#fff', // White text
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default Card;
