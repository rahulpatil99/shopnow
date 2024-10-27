import config from '../Config/config'
import React,{useState,useEffect} from 'react';
import Card from '../components/Card';

const WishList = () =>{

  const [product,setProduct] = useState(null);
  const [customerId,setCustomerId] = useState(1);

  const getWishListData = async () =>{
    const url = config.REACT_APP_API_URL+"/wishlist/"+customerId;
    
    try{
    const response = await fetch(url,{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
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
    getWishListData();
    },[])

    if(!product) return (<div>loading..</div>)

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        Your WishList
      </div>
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
header:{

},
cardContainer:{
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px', // Set a specific gap between items
  //justifyContent: 'space-between',

  padding: '16px',
  //width: "95%",
 
}
}

export default WishList;