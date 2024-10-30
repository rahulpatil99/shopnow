import config from '../Config/config'
import React,{useState,useEffect,useContext} from 'react';
import Card from '../components/Card';
import { CartContext } from "../contexts/CartProvider";
import { AuthContext } from '../contexts/AuthProvider';
import { useNavigate } from "react-router-dom";


const WishList = () =>{

  const [product,setProduct] = useState(null);
  const [customerId,setCustomerId] = useState(1);
//  const [token,setToken] = useState(null);
  const { isAuthenticated} = useContext(AuthContext)
  const { SetCartCount } = useContext(CartContext);
  const navigate = useNavigate();


  const getWishListData = async () =>{
    const url = config.REACT_APP_API_URL+"/wishlist/"+customerId;
    const token =    localStorage.getItem('jwtToken');
    try{
    const response = await fetch(url,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
       'Authorization' : 'Bearer '+token
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to get Wish List. Status: ${response.status}`);
    }

    const json = await response.json();
    setProduct(json);
  } catch (error) {
    console.error('Error get Wish List:', error.message);
  }
  }

  const handleUnlikeProduct = (productId)=>{
    const products = [...product]
    const newProductList = products.filter((item)=>item.productId != productId)
    setProduct(newProductList)
  }

  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/login')
    }
      getWishListData();
    },[isAuthenticated])

    if(!product) return (<div>loading..</div>)

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>
        Your WishList

      </h3>
      <div style={styles.cardContainer}>

    {product.map((product)=>(
      <Card
      key={product.productId}
      productsId={product.productId}
      img={product.imgUrl}
      productTitle={product.productName}
      description={product.description}
      price={product.price}
      isProductLike={product.isProductLike}
      discount={product.discount}
      onRemove={handleUnlikeProduct}
      />
      
    ))}
    </div>
  </div>
  );
}

const styles={
container:{
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection:'column',
  maxWidth: "950px",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  padding: "30px",
  margin: "10px",
},
heading:{
  color: '#333',
  fontSize: '24px',
  marginBottom: '20px',
},
cardContainer:{
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px', // Set a specific gap between items
  padding: '16px', 
}
}

export default WishList;