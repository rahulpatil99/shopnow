import config  from '../Config/config'
import React,{useState,useEffect, useContext} from 'react'
import Card from '../components/Card'
import { AuthContext } from "../contexts/AuthProvider";



const Home =() => {
  const [products,setProducts] = useState(null);
  const {token } = useContext(AuthContext);
  
  const getAllDataWithUserData = async ()=> {
    const token = localStorage.getItem('jwtToken');
    const url = config.REACT_APP_API_URL+"/product/getAll/1";
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+token
        }
      });
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      setProducts(json);
    } catch (error) {
      console.error("Error fetching data: ", error.message);
    }
  }

  const getAllData = async ()=> {
    const url = config.REACT_APP_API_URL+"/product/getAll";
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      setProducts(json);
    } catch (error) {
      console.error("Error fetching data: ", error.message);
    }
  }

  const onDeleted = () =>{

  }

  useEffect(()=>{
    
    // setToken(localStorage.getItem('jwtToken'));
    if(token){
      getAllDataWithUserData()
    }
    else{
      getAllData();
    }
    // }
  },[token]);
  
  if(!products) return (<div>loading..</div>)
    
   return (
    <div style={styles.container}>
      {products.map((product)=>(
        <Card
        key={product.productId}
        productsId={product.productId}
        img={product.imgUrl}
        productTitle={product.productName}
        description={product.description}
        price={product.price}
        isProductLike={product.isProductLike}
        discount={product.discount}
        onRemove={onDeleted}
        />

      ))}
    </div>
  );
}

const styles ={
    container:{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px', // Set a specific gap between items
        padding: '16px',
    }
}

export default Home;
